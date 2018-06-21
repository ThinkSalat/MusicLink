
export const createD3 = () => {

const nodes = window.nodes
// Set svg size to 80% of window
// const width = Math.floor(window.innerWidth * .8),
// height = Math.floor(window.innerHeight * .8);
let width = window.innerWidth -150,
height = window.innerHeight-120;

//  width = 1000;
// height = 1000;

// set svg to be height and width
const svg = d3.select('#d3-canvas')
  .append('svg')
  .attr('width', width)
  .attr('height', height)
  .data(window.nodes);

// set force simulation
const simulation = d3.forceSimulation()
.force('charge', d3.forceManyBody().strength(-20)) 
.force('center', d3.forceCenter(width / 2, height / 2));

// s stuff
function getNodeColor(node) {
  // return node.level === 1 ? 'red' : 'gray';
  return '#C60F7B';
}
console.log(nodes);
const nodeElements = svg.append('g')
  .selectAll('circle')
  .data(nodes)
  .enter().append('circle')
    .attr('r', 10)
    .attr('fill', getNodeColor);

const textElements = svg.append('g')
  .selectAll('text')
  .data(nodes)
  .enter().append('text')
    .text(node => node.label)
    .attr('font-size', 15)
    .attr('dx', 15)
    .attr('dy', 4);

simulation.nodes(nodes).on('tick', () => {
  nodeElements
    .attr('cx', node => node.x)
    .attr('cy', node => node.y);
  textElements
    .attr('x', node => node.x)
    .attr('y', node => node.y);
});

simulation.force('link', d3.forceLink()
  .id(link => link.id)
  .strength(link => link.strength))

  const linkElements = svg.append('g')
  .selectAll('line')
  .data(links)
  .enter().append('line')
    .attr('stroke-width', 1)
    .attr('stroke', '#E5E5E5')
}