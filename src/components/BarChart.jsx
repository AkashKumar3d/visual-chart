import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const BarChart = ({ data }) => {
  const chartRef = useRef();

  useEffect(() => {
    // Set up the chart dimensions
    const width = 600;
    const height = 400;
    const margin = { top: 20, right: 30, bottom: 40, left: 40 };

    const svg = d3.select(chartRef.current)
      .attr('width', width)
      .attr('height', height);

    // Extract intensity values from the data
    const intensityValues = data.map(item => item.intensity);

    // Create scales for x and y axes
    const x = d3.scaleBand()
      .domain(data.map((_, index) => index))
      .range([margin.left, width - margin.right])
      .padding(0.1);

    const y = d3.scaleLinear()
      .domain([0, d3.max(intensityValues)])
      .nice()
      .range([height - margin.bottom, margin.top]);

    // Create the bars
    svg.selectAll('rect')
      .data(data)
      .enter().append('rect')
      .attr('x', (_, index) => x(index))
      .attr('y', item => y(item.intensity))
      .attr('width', x.bandwidth())
      .attr('height', item => height - margin.bottom - y(item.intensity))
      .attr('fill', 'steelblue');

    // Create x and y axes
    const xAxis = d3.axisBottom(x);
    const yAxis = d3.axisLeft(y);

    svg.append('g')
      .attr('class', 'x-axis')
      .attr('transform', `translate(0, ${height - margin.bottom})`)
      .call(xAxis);

    svg.append('g')
      .attr('class', 'y-axis')
      .attr('transform', `translate(${margin.left}, 0)`)
      .call(yAxis);
  }, [data]);

  return (
    <svg ref={chartRef}></svg>
  );
};

export default BarChart;
