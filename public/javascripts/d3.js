
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
};

// Create new chart
export const createD3 = () => {
  const nodes = Object.values(window.nodes),
    links = Object.values(window.links);

  let width = window.innerWidth,
  height = window.innerHeight;

  // set svg to be height and width
  const svg = d3.select('#d3-canvas')
    .append('svg')
    .attr('width', width)
    .attr('height', height)
    .data(nodes);

  // set force simulation
  const simulation = d3.forceSimulation()
    .force('charge', d3.forceManyBody().strength(-15)) 
    .force('center', d3.forceCenter(width / 2, height / 2));

  // select colors
  function getNodeColor(node) {
    switch (node.priority) {
      case 1:
        return '#C60F7B';
      case 2:
        return '#face1a';
      case 3:
        return '#13ebc0';
      default:
        return '#13ebc0';
    }
  }

  // NODES
  const nodeElements = svg.append('g')
    .selectAll('circle')
    .data(nodes)
    .enter().append('circle')
      .attr('r', 25)
      .attr('fill', getNodeColor)
      .attr('class', 'node')
      .on('click', node => node.onClick());

  const textElements = svg.append('g')
    .selectAll('text')
    .data(nodes)
    .enter().append('text')
      .text(node => node.name)
      .attr('font-size', 15)
      .attr('dx', 5)
      .attr('dy', 37)
      .attr('class', 'node-text')
      .style('fill', '#e2e5e4')
      .style("text-anchor", "middle");

  // IMAGES

  var images = svg.select('circle').enter().append("svg:image")
    .attr("xlink:href", node => node.images[2].url)
    .attr("x", d => d.x)
    .attr("y", d => d.y)
    .attr("height", 50)
    .attr("width", 50);



    // FORCE SIM
  simulation.nodes(nodes).on('tick', () => {
    nodeElements
      .attr('cx', node => node.x)
      .attr('cy', node => node.y);
    textElements
      .attr('x', node => node.x)
      .attr('y', node => node.y);
  });

// LINKS

  simulation.force('link', d3.forceLink()
    .id(link => link.id)
    .strength(link => link.strength));

  const linkElements = svg.append('g')
  .selectAll('line')
  .data(links)
  .enter().append('line')
    .attr('stroke-width', 1)
    .attr('stroke', '#E5E5E5');

  linkElements
  .attr('x1', link => {
    return link.source.x
  })
  .attr('y1', link => link.source.y)
  .attr('x2', link => link.target.x)
  .attr('y2', link => link.target.y);

  simulation.force('link').link(links);






};