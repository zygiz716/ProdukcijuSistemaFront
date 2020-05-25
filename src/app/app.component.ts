import {AfterViewInit, Component, ElementRef, ViewChild} from '@angular/core';
import * as d3 from 'd3';
import {PlanoVykdymasService} from "./services/plano-vykdymas.service";
import {ProdukcijaService} from "./services/produkcija.service";
import {Produkcija} from "./model/produkcija";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {
  title = 'bakalauras';
  @ViewChild('graphContainer') graphContainer: ElementRef;

  constructor(public grandineVykdymasService: PlanoVykdymasService,
              public produkcijaService: ProdukcijaService) {
  }

  width = 1000;
  height = 620;

  svg: any;
  force: any;
  path: any;
  circle: any;
  square: any;
  dragLine: any;


  // mouse event vars
  selectedNode: any;
  selectedLink: any;
  mousedownLink: any;
  mousedownNode: any;
  mouseupNode: any;


  AddNodesAndLinksAllProductions() {
    this.produkcijaService.getProdukcijos().subscribe(produkcijos => {
      this.grandineVykdymasService.zemelapioPavadinimas.next('Visos produkcijos');
      this.AddNodesAndLinks(produkcijos);
    })
  }

  AddNodesAndLinks(produkcijos: Produkcija[]) {

    this.grandineVykdymasService.nodes = [];
    this.grandineVykdymasService.nodes1 = [];
    this.grandineVykdymasService.links = [];
    this.selectedLink = null;
    produkcijos.forEach(produkcija => {
        let isvestis = this.grandineVykdymasService.nodes.filter(node => node.id === produkcija.isvestis);
        let produkcijosPavadinimas: any;
        if (isvestis.length === 0) {
          isvestis = [{id: produkcija.isvestis, reflexive: false, color: '00ff00', yraProdukcija: false}];
          this.grandineVykdymasService.nodes.push(isvestis[0]);
        }
      produkcijosPavadinimas = [{id: produkcija.pavadinimas, reflexive: true, color: 'ffffff', produkcijaId: produkcija.id, yraProdukcija: true}];
      this.grandineVykdymasService.nodes.push(produkcijosPavadinimas[0]);

        produkcija.ivestys.forEach(ivestis => {
          let gautaIvestis = this.grandineVykdymasService.nodes.filter(node => node.id === ivestis);
          if (gautaIvestis.length === 0) {
            gautaIvestis = [{id: ivestis, reflexive: false, color: '00ff00', yraProdukcija: false}];
            this.grandineVykdymasService.nodes.push(gautaIvestis[0]);
          }
          let linkas = [{
            source: gautaIvestis[0],
            target: produkcijosPavadinimas[0],
            left: false,
            right: true,
            produkcijaId: produkcija.id,
            ivestys: produkcija.ivestys,
            isvestis: produkcija.isvestis,
            kaina: produkcija.kaina,
            pavadinimas: produkcija.pavadinimas
          }];
          this.grandineVykdymasService.links.push(linkas[0]);
        });
      let linkas = [{
        source: produkcijosPavadinimas[0],
        target: isvestis[0],
        left: false,
        right: true,
        produkcijaId: produkcija.id,
        ivestys: produkcija.ivestys,
        isvestis: produkcija.isvestis,
        kaina: produkcija.kaina,
        pavadinimas: produkcija.pavadinimas
      }];
      this.grandineVykdymasService.links.push(linkas[0]);
      }
    );
    this.restart();
  }

  ngAfterViewInit() {
    if (this.grandineVykdymasService.rodytiAnimacijosLanga.value === true) {
    this.grandineVykdymasService.produkcijosRodymui.subscribe(value => {
      if (value.length > 0) {
        this.AddNodesAndLinks(value);
      } else {
        this.AddNodesAndLinksAllProductions();
      }
    });

    this.AddNodesAndLinksAllProductions();
    const rect = this.graphContainer.nativeElement.getBoundingClientRect();

    this.width = rect.width;

    this.svg = d3.select('#graphContainer')
      .attr('oncontextmenu', 'return false;')
      .attr('width', this.width)
      .attr('height', this.height);

    this.force = d3.forceSimulation()
      .force('link', d3.forceLink().id((d: any) => d.id).distance(150)) //Nustatomas vidutinis ryšio ilgis
      .force('charge', d3.forceManyBody().strength(-500)) //Nustatoma stūmos jėga, kuria objektai veikia vieni kitus
      .force('x', d3.forceX(this.width / 2)) //Traukos jėga į x ašies vidurį
      .force('y', d3.forceY(this.height / 2)) //Traukos jėga į y ašies vidurį
      .on('tick', () => this.tick()); // Atnaujinamos ryšių ir jų objektų koordinatės

    // define arrow markers for graph links
    this.svg.append('svg:defs').append('svg:marker')
      .attr('id', 'end-arrow')
      .attr('viewBox', '0 -5 10 10')
      .attr('refX', 6)
      .attr('markerWidth', 3)
      .attr('markerHeight', 3)
      .attr('orient', 'auto')
      .append('svg:path')
      .attr('d', 'M0,-5L10,0L0,5')
      .attr('fill', '#999');

    this.svg.append('svg:defs').append('svg:marker')
      .attr('id', 'start-arrow')
      .attr('viewBox', '0 -5 10 10')
      .attr('refX', 4)
      .attr('markerWidth', 3)
      .attr('markerHeight', 3)
      .attr('orient', 'auto')
      .append('svg:path')
      .attr('d', 'M10,-5L0,0L10,5')
      .attr('fill', '#999');


    // handles to link and node element groups
    this.path = this.svg.append('svg:g').selectAll('path');
    this.circle = this.svg.append('svg:g').selectAll('g');
    this.square = this.svg.append('svg:g').selectAll('g');

    /*    d3.select(window)
          .on('keydown', this.keydown)
          .on('keyup', this.keyup);*/
    this.restart();
  }
}


  // update force layout (called automatically each iteration)
  tick() {
    // draw directed edges with proper padding from node centers
    this.square.attr('transform', (d: { x: any; y: any; }) => `translate(${d.x-12},${d.y-12})`);
    this.path.attr('d', (d: any) => {
      const deltaX = d.target.x - d.source.x;
      const deltaY = d.target.y - d.source.y;
      const dist = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
      const normX = deltaX / (dist-10);
      const normY = deltaY / (dist-10);
      const sourcePadding = d.left ? 17 : 12;
      const targetPadding = d.right ? 17 : 12;
      const sourceX = d.source.x + (sourcePadding * normX);
      const sourceY = d.source.y + (sourcePadding * normY);
      const targetX = d.target.x - (targetPadding * normX);
      const targetY = d.target.y - (targetPadding * normY);

      return `M${sourceX},${sourceY}L${targetX},${targetY}`;
    });
    this.circle.attr('transform', (d: { x: any; y: any; }) => `translate(${d.x},${d.y})`);
  }


  restart() {
    // path (link) group
    this.path = this.path.data(this.grandineVykdymasService.links);

    // update existing links
    this.path.classed('selected', (d: any) => {
      if(this.selectedLink){
      return d.produkcijaId === this.selectedLink.produkcijaId;}
      return d === this.selectedLink;
    }
      )
      .style('marker-start', (d: { left: any; }) => d.left ? 'url(#start-arrow)' : '')
      .style('marker-end', (d: { right: any; }) => d.right ? 'url(#end-arrow)' : '')
      .text(function () {return 'd.type;'});

    // remove old links
    this.path.exit().remove();

    // add new links
    this.path = this.path.enter().append('svg:path')
      .attr('class', 'link')
      .classed('selected', (d: any) => d === this.selectedLink)
      .style('marker-start', (d: { left: any; }) => d.left ? 'url(#start-arrow)' : '')
      .style('marker-end', (d: { right: any; }) => d.right ? 'url(#end-arrow)' : '')
      .on('mousedown', (d: null) => {
        if (d3.event.ctrlKey) return;

        // select link
        this.mousedownLink = d;
        this.selectedLink = (this.mousedownLink === this.selectedLink) ? null : this.mousedownLink;
        this.selectedNode = null;
        this.restart();
      })
      .merge(this.path);
    // circle (node) group
    // NB: the function arg is crucial here! nodes are known by id, not by index!
    this.circle = this.circle.data(this.grandineVykdymasService.nodes.filter(node => node.yraProdukcija), (d: { id: any; }) => d.id);
    this.square = this.square.data(this.grandineVykdymasService.nodes.filter(node => !node.yraProdukcija), (d: { id: any; }) => d.id);

    // remove old nodes
    this.circle.exit().remove();
    this.square.exit().remove();

    // add new nodes
    const g = this.circle.enter().append('svg:g');
    const g1 = this.square.enter().append('svg:g');

    g1.append('svg:rect')
      .attr('class', 'node')
      .attr('width', 24)
      .attr('height', 24)
      .style('fill', (d: { color: string; }) => d.color)
      .style('stroke', '000000')
      .classed('reflexive', (d: { reflexive: any; }) => d.reflexive)

    g.append('svg:circle')
      .attr('class', 'node')
      .attr('r', 12)
      .style('fill', (d: { color: string; }) => d.color)
      .style('stroke', '000000')
      .classed('reflexive', (d: { reflexive: any; }) => d.reflexive)

      .on('mousedown', (d: any) => {
        if (d3.event.ctrlKey) return;

        // select node
        this.mousedownNode = d;
        this.selectedNode = (this.mousedownNode === this.selectedNode) ? null : this.mousedownNode;
        if (this.mousedownNode)
          this.selectedLink = null;

        this.path.classed('selected', (d1: any) => {
            if (this.mousedownNode) {
              if (d1.produkcijaId === this.mousedownNode.produkcijaId) {
                this.selectedLink = d1;
                return true;
              }
            }
            return false;
          }
        )
          .style('marker-start', (d: { left: any; }) => d.left ? 'url(#start-arrow)' : '')
          .style('marker-end', (d: { right: any; }) => d.right ? 'url(#end-arrow)' : '')
          .text(function () {
            return 'd.type;'
          });

        // reposition drag line
        this.dragLine
          .style('marker-end', 'url(#end-arrow)')
          .classed('hidden', false)
          .attr('d', `M${this.mousedownNode.x},${this.mousedownNode.y}L${this.mousedownNode.x},${this.mousedownNode.y}`);

        this.restart();
      })
      .on('mouseup', (dataItem: any) => {
        if (!this.mousedownNode) return;

        // needed by FF
        this.dragLine
          .classed('hidden', true)
          .style('marker-end', '');

        // add link to graph (update if exists)
        // NB: links are strictly source < target; arrows separately specified by booleans
        const isRight = this.mousedownNode.id < this.mouseupNode.id;
        const source = isRight ? this.mousedownNode : this.mouseupNode;
        const target = isRight ? this.mouseupNode : this.mousedownNode;

        const link = this.grandineVykdymasService.links.filter((l) => l.source === source && l.target === target)[0];
        if (link) {
          link[isRight ? 'right' : 'left'] = true;
        } else {
          this.grandineVykdymasService.links.push({source, target, left: !isRight, right: isRight});
        }

        // select new link
        this.selectedLink = link;
        this.selectedNode = null;
        this.restart();
      });

    // show node IDs
    g.append('svg:text')
      .attr('x', 0)
      .attr('y', 4)
      .attr('class', 'id')
      .text((d: { id: any; }) => d.id);

    g1.append('svg:text')
      .attr('x', 12)
      .attr('y', 16)
      .attr('class', 'id')
      .text((d: { id: any; }) => d.id);

    this.circle = g.merge(this.circle);
    this.square = g1.merge(this.square);

    // set the graph in motion
    this.force
      .nodes(this.grandineVykdymasService.nodes)
      .force('link').links(this.grandineVykdymasService.links);
    console.log(this.selectedNode);

    this.force.alphaTarget(0.3).restart();
  }
}

