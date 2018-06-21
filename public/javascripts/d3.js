const nodes = window.nodes;

var width = 640,
height = 480;


// The `links` array contains objects with a `source` and a `target`
// property. The values of those properties are the indices in
// the `nodes` array of the two endpoints of the link.

var links = [
{ source: 0, target: 1 }
];

// Here's were the code begins. We start off by creating an SVG
// container to hold the visualization. We only need to specify
// the dimensions for this container.
export const tryd3 = () => {

  console.log(d3, 'd3');
}

var svg = d3.select('d3-canvas').append('svg')
.attr('width', width)
.attr('height', height)
.data(nodes);

// injexxt to d3-canvas