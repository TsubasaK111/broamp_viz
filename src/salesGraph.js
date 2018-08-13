import * as d3 from "d3";

const salesGraph = () => {
  const sales = [
    { product: 'Hoodie', count: 7 },
    { product: 'Jacket', count: 6 },
    { product: 'Snuggie', count: 9 },
  ];

  const svg = d3.select('svg');
  console.log(svg.size());
  // 1 -- one <svg> element exists

  const rects = svg.selectAll('rect')
    .data(sales);

  console.log(rects.size());
  // 0 -- no <rect> elements exist yet!

  // Run the loop
  // renderChart();
};

export default salesGraph;