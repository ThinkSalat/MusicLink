
//change svg size to rsize with window
// export const redraw = () => {
//   const svg = d3.select('svg');

//   let oldWidth = $('svg').width(),
//     oldHeight = $('svg').height();

//   let width = window.innerWidth,
//   height = window.innerHeight;

//   let widthDiff = oldWidth - width,
//     heightDiff = oldHeight - height;
  
//   svg.attr("width", width)
//     .attr("height", height);
  
//   // let centerW = Math.floor(window.innerWidth / 2),
//   // centerH = Math.floor(window.innerHeight / 2);
//   if (node[0]) console.log(Object.keys(node[0]));
//   nodes.forEach( node => {
//     node.x -= widthDiff;
//     node.y -= heightDiff;
//   });
// };

// clear nodes
export const clearNodes = () => {
  window.nodes = {};
  window.relatedArtists = {};
  window.processedArtists = {};
  window.links = {};
  d3.select('svg').remove();

  $('.artist-panel').css('display','none');
  $(".player-panel").css('display','none');
};

// Create new chart
export const createD3 = () => {
  const nodes = Object.values(window.nodes),
    links = Object.values(window.links);

  let width = window.innerWidth,
  height = window.innerHeight;

  const svg = d3.select('#d3-canvas')
    .append('svg')
    .attr('height', height)
    .attr('width', width)
    .append('g')
    .attr('transform', `translate(${width/2},${height/2})`);

    // for zoom
    // var points = d3.range(2000).map(phyllotaxis(10));

  var defs = svg.append('defs');

    // the simulation is a collection of forces about our simulation
    
  const simulation = d3.forceSimulation(nodes)
    .force('centerX', d3.forceX().strength(0.05))
    .force('centerY', d3.forceY().strength(0.05))
    .force('collide', d3.forceCollide(65))
    .force("center", d3.forceCenter(0, 0))
    .force('charge', d3.forceManyBody().strength(-105))
    .on("tick", ticked);

  const circles = svg.selectAll('circle')
    .data(nodes)
    .enter().append('circle')
    .attr('r', 40)
    .attr('cy', 100)
    .attr('cx', 300)
    .attr('fill', node => `url(#${node.id})`)
    .attr('class', 'node')
    .style('stroke-width', '5px')
    .style('stroke', getNodeColor)
    .on('click', node => node.onClick())
    .call(d3.drag()
    .on("start",dragstarted)
    .on("drag",dragged)
    .on("end",dragended));

  function dragstarted(d)
  { 
    simulation.restart();
    simulation.alpha(0.7);
    d.fx = d.x;
    d.fy = d.y;

  }

  function dragged(d)
  {
    d.fx = d3.event.x;
    d.fy = d3.event.y;
  }

  function dragended(d)
  {
    d.fx = null;
    d.fy = null;
    simulation.alphaTarget(0.1);
  }

  defs.selectAll('.artist-pattern')
    .data(nodes)
    .enter().append('pattern')
    .attr('class', 'artist-pattern')
    .attr('id', node => node.id)
    .attr('height', '100%')
    .attr('width', '100%')
    .attr('patternContentUnits', 'objectBoundingBox')
    .append('image')
    .attr('width', 1)
    .attr('height', 1)
    .attr('preserveAspectRatio', 'none')
    .attr('xmlns:link', "http://www.w3.org/1999/xlink")
    .attr('xlink:href', node => node.getIcon());


  const textElements = svg.append('g')
    .selectAll('text')
    .data(nodes)
    .enter().append('text')
      .text(node => node.name)
      .attr('font-size', 15)
      .attr('dx', 5)
      .attr('dy', 60)
      .attr('class', 'node-text')
      .style('fill', '#e2e5e4')
      .style("text-anchor", "middle");

  var link = svg.append("g")
    .attr("class", "links")
    .selectAll("line")
    .data(links)
    .enter().append("line")
    .attr("stroke-width", function(d) { return Math.sqrt(d.value); });

  function ticked() {
    circles
      .attr('cx', node => node.x)
      .attr('cy', node => node.y);

    textElements
      .attr('x', node => node.x)
      .attr('y', node => node.y);

      link
      .attr("x1", function(d) {return window.nodes[d.source].x;  })
      .attr("y1", function(d) { return window.nodes[d.source].y; })
      .attr("x2", function(d) { return window.nodes[d.target].x; })
      .attr("y2", function(d) { return window.nodes[d.target].y; });

  }

  // select colors
  function getNodeColor(node) {
    switch (node.priority) {
      case 1:
        return '#C60F7B';
      case 2:
        return '#face1a';
      case 3:
        // return '#13ebc0';
        return '#rgba(0, 0, 0, 0.0)';
      default:
        return '#13ebc0';
    }
  }


  //zoom stuff
//   svg.select('g').selectAll("circle")
//   .data(points)
// .enter().append("circle")
//   .attr("cx", function(d) { return d[0]; })
//   .attr("cy", function(d) { return d[1]; })
//   .attr("r", 2.5);


//   svg.append("rect")
//     .attr("width", width)
//     .attr("height", height)
//     .style("fill", "none")
//     .style("pointer-events", "all")
//     .call(d3.zoom()
//       .scaleExtent([1 / 2, 4])
//         .on("zoom", zoomed));

// function zoomed() {
//   svg.select('g').attr("transform", d3.event.transform);
// }

// function phyllotaxis(radius) {
//   var theta = Math.PI * (3 - Math.sqrt(5));
//   return function(i) {
//     var r = radius * Math.sqrt(i), a = theta * i;
//     return [
//       width / 2 + r * Math.cos(a),
//       height / 2 + r * Math.sin(a)
//     ];
//   };
// }

// LINKS






};