import * as d3 from "d3";

const salesGraph = () => {
  const sales = [
    { product: 'Hoodie', count: 7 },
    { product: 'Jacket', count: 6 },
    { product: 'Snuggie', count: 9 },
  ];

  const svg = d3.select('#sampleGraph').select('svg');
  console.log(svg.size());
  // 1 -- one <svg> element exists

  const rects = svg.selectAll('rect')
    .data(sales);

  console.log(rects.size());
  // 0 -- no <rect> elements exist yet!

  const newRects = rects.enter();


  // recall that scales are functions that map from
  // data space to screen space
  const maxCount = d3.max(sales, function (d, i) {
    return d.count;
  });
  const x = d3.scaleLinear()
    .range([0, 300])
    .domain([0, maxCount]);

  const y = d3.scaleOrdinal()
    .range([0, 75])
    .domain(sales.map(function (d, i) {
      return d.product;
    }));

  newRects.append('rect')
    .attr('x', x(0))
    .attr('y', function (d, i) {
      return y(d.product);
    })
    .attr('height', y.range())
    .attr('width', function (d, i) {
      return x(d.count);
    });
  // Run the loop
  // renderChart();
};

export default salesGraph;