"use client";
import * as d3 from "d3";
import { useRef, useEffect } from "react";
import { LinePlotProps } from "@/types/companyHoldings";

export default function LinePlot({
  data,
  width = 720,
  height = 400,
  marginTop = 20,
  marginRight = 0,
  marginBottom = 30,
  marginLeft = 105,
}: LinePlotProps) {
  const gx = useRef<SVGGElement>(null);
  const gy = useRef<SVGGElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);

  const x = d3
    .scaleTime()
    .domain(d3.extent(data, (d) => new Date(d[0])) as [Date, Date])
    .range([marginLeft, width - marginRight]);

  const y = d3
    .scaleLinear()
    .domain([d3.min(data, (d) => d[1]) || 0, d3.max(data, (d) => d[1]) || 0])
    .range([height - marginBottom, marginTop]);

  const line = d3
    .line<[number, number]>()
    .x((d) => x(new Date(d[0]))!)
    .y((d) => y(d[1])!);

  useEffect(() => {
    if (gx.current) {
      // d3.select(gx.current).call(d3.axisBottom(x));
      d3.select(gx.current).call(d3.axisBottom(x).ticks(6));

      d3.select(gx.current).selectAll(".tick line").attr("stroke", "#d1d5db");

      d3.select(gx.current).selectAll(".tick text").attr("fill", "#6b7280");

      d3.select(gx.current).select(".domain").attr("stroke", "#d1d5db");
    }
  }, [x]);

  useEffect(() => {
    if (gy.current) {
      d3.select(gy.current).call(d3.axisLeft(y).ticks(5));

      d3.select(gy.current).selectAll(".tick line").attr("stroke", "#d1d5db");

      d3.select(gy.current).selectAll(".tick text").attr("fill", "#6b7280");

      d3.select(gy.current).select(".domain").attr("stroke", "#d1d5db");
    }
  }, [y]);

  useEffect(() => {
    const svg = d3.select(svgRef.current);
    const tooltip = d3.select(tooltipRef.current);
    const bisectDate = d3.bisector(
      (d: [number, number]) => new Date(d[0])
    ).left;

    const focus = svg
      .append("circle")
      .attr("r", 5)
      .attr("fill", "none")
      .attr("stroke", "black")
      .style("opacity", 0);

    svg
      .append("rect")
      .attr("width", width - marginLeft - marginRight)
      .attr("height", height - marginTop - marginBottom)
      .attr("transform", `translate(${marginLeft},${marginTop})`)
      .style("fill", "none")
      .style("pointer-events", "all")
      .on("mouseover", () => {
        focus.style("opacity", 1);
        tooltip.style("opacity", 1);
      })
      .on("mousemove", (event) => {
        const mouse = d3.pointer(event, svg.node());
        const mouseX = mouse[0];
        const xDate = x.invert(mouseX);
        const index = bisectDate(data, xDate, 1);
        const d0 = data[index - 1];
        const d1 = data[index];
        const d =
          xDate.getTime() - new Date(d0[0]).getTime() >
          new Date(d1[0]).getTime() - xDate.getTime()
            ? d1
            : d0;

        focus.attr("cx", x(new Date(d[0]))).attr("cy", y(d[1]));

        tooltip
          .html(
            `Date: ${d3.utcFormat("%B %d, %Y")(
              new Date(d[0])
            )}<br>Value: ₹${d[1].toLocaleString("en-IN")}`
          )
          .style("left", `${mouse[0] + marginLeft + 10}px`)
          .style("top", `${mouse[1] + marginTop - 28}px`);
      })
      .on("mouseout", () => {
        focus.style("opacity", 0);
        tooltip.style("opacity", 0);
      });
  }, [
    data,
    height,
    marginBottom,
    marginLeft,
    marginRight,
    marginTop,
    width,
    x,
    y,
  ]);

  return (
    <div className="relative w-max">
      <svg
        ref={svgRef}
        width={width + marginLeft + marginRight}
        height={height}
      >
        <g ref={gx} transform={`translate(0,${height - marginBottom})`} />
        <g ref={gy} transform={`translate(${marginLeft},0)`} />
        <path
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          d={line(data) || ""}
        />
      </svg>
      <div
        className="absolute shadow-lg text-center w-max h-max p-2 font-medium text-sm bg-black text-white rounded-md pointer-events-none opacity-0"
        ref={tooltipRef}
      ></div>
    </div>
  );
}
