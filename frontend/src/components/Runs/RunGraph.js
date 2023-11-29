import * as d3 from 'd3';
import React, { useEffect, useRef } from 'react';

function RunGraph({ runningData }) {
  const svgRef = useRef();

  useEffect(() => {
    if (!runningData.length) return;

    // Assume runningData is an array of objects { date: 'YYYY-MM-DD', value: number }
    const margin = { top: 20, right: 20, bottom: 30, left: 50 };
    const width = 600 - margin.left - margin.right;
    const height = 400 - margin.top - margin.bottom;

    const svg = d3.select(svgRef.current)
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    // Create scales
    const xScale = d3.scaleTime()
      .domain(d3.extent(runningData, d => new Date(d.date)))
      .range([0, width]);

    const yScale = d3.scaleLinear()
      .domain([0, d3.max(runningData, d => d.value)])
      .range([height, 0]);

    // Create axes
    const xAxis = d3.axisBottom(xScale).ticks(5);
    const yAxis = d3.axisLeft(yScale);

    // Append axes to the svg
    svg.append('g')
      .attr('transform', `translate(0,${height})`)
      .call(xAxis);

    svg.append('g')
      .call(yAxis);

    // Draw line
    const line = d3.line()
      .x(d => xScale(new Date(d.date)))
      .y(d => yScale(d.value))
      .curve(d3.curveMonotoneX);

    svg.append('path')
      .datum(runningData)
      .attr('fill', 'none')
      .attr('stroke', 'steelblue')
      .attr('stroke-width', 2)
      .attr('d', line);
  }, [runningData]);

  return <svg ref={svgRef} />;
}

export default RunGraph;
