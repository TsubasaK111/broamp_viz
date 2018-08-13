import * as d3 from "d3";

const sampleGraph = () => {
  const numbers = [5, 4, 10, 1];
  const datum = [
    { date: '2014-01-01', amount: 10 },
    { date: '2014-02-01', amount: 20 },
    { date: '2014-03-01', amount: 40 },
    { date: '2014-04-01', amount: 80 },
  ]

  console.log(d3.min(numbers));
  console.log(d3.max(datum, (data) => data.amount));
  console.log(d3.extent(datum, (data) => data.amount));

  const yScale = d3.scaleLinear()
    .domain([0, 80]) // $0 to $80
    .range([200, 0]); // Seems backwards because SVG is y-down

  console.log(yScale(0), yScale(80));

  const yScale2 = d3.scaleLinear()
    .domain(d3.extent(datum, (data) => data.amount))
    .range([200, 0]);

  console.log(yScale2(0), yScale2(80));

  const xScale = d3.scaleTime()
    .domain([
      new Date(Date.parse('2014-01-01')),
      new Date(Date.parse('2014-04-01'))
    ])
    .range([0, 300]);

  console.log(xScale(new Date(Date.parse('2014-02-01'))));

  const xAxis = d3.axisBottom(xScale)
    .ticks(4); // specify the number of ticks

  const svg = d3.select('#sampleGraph')
    .append('svg')        // create an <svg> element
    .attr('width', 300) // set its dimentions
    .attr('height', 150);

  svg.append('g')            // create a <g> element
    .attr('class', 'x axis') // specify classes
    .call(xAxis);            // let the axis do its thing
  }


export default sampleGraph;
