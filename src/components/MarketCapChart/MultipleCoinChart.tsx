"use client";

import * as d3 from "d3";
import { useRef, useEffect, useState, useLayoutEffect } from "react";
import { coinIdList, coinIdListWithColors } from "./constants";

interface CoinMarketCapData {
  coinID: string;
  marketCaps: [number, number][];
}

interface LinePlotProps {
  data: CoinMarketCapData[];
  height?: number;
  marginTop?: number;
  marginRight?: number;
  marginBottom?: number;
  marginLeft?: number;
}

const formatCompact = (n: number) => {
  if (Math.abs(n) >= 1e12) return `${(n / 1e12).toFixed(1)}T`;
  if (Math.abs(n) >= 1e9) return `${(n / 1e9).toFixed(1)}B`;
  if (Math.abs(n) >= 1e6) return `${(n / 1e6).toFixed(1)}M`;
  if (Math.abs(n) >= 1e3) return `${(n / 1e3).toFixed(1)}K`;
  return `${n}`;
};

export default function LinePlot({
  data,
  height = 360,
  marginTop = 16,
  marginRight = 16,
  marginBottom = 28,
  marginLeft = 56,
}: LinePlotProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(720);

  useLayoutEffect(() => {
    if (!containerRef.current) return;
    const ro = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const w = Math.max(320, Math.floor(entry.contentRect.width));
        setWidth(w);
      }
    });
    ro.observe(containerRef.current);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    if (!svgRef.current) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    const x = d3
      .scaleTime()
      .domain([
        d3.min(
          data,
          (coinData) =>
            d3.min(coinData.marketCaps, (d) => new Date(d[0])) as Date
        ) as Date,
        d3.max(
          data,
          (coinData) =>
            d3.max(coinData.marketCaps, (d) => new Date(d[0])) as Date
        ) as Date,
      ])
      .range([marginLeft, width - marginRight]);

    const y = d3
      .scaleLinear()
      .domain([
        0,
        d3.max(
          data,
          (coinData) => d3.max(coinData.marketCaps, (d) => d[1]) as number
        ) as number,
      ])
      .nice()
      .range([height - marginBottom, marginTop]);

    const color = d3
      .scaleOrdinal<string>()
      .domain(coinIdList)
      .range(coinIdListWithColors.map((c) => c.color));

    const line = d3
      .line<[number, number]>()
      .curve(d3.curveMonotoneX)
      .x((d) => x(new Date(d[0]))!)
      .y((d) => y(d[1])!);

    const axisColor = "currentColor";

    // Horizontal grid lines
    const gridGroup = svg.append("g").attr("class", "grid");
    gridGroup
      .selectAll("line")
      .data(y.ticks(5))
      .enter()
      .append("line")
      .attr("x1", marginLeft)
      .attr("x2", width - marginRight)
      .attr("y1", (d) => y(d))
      .attr("y2", (d) => y(d))
      .attr("stroke", axisColor)
      .attr("stroke-opacity", 0.08)
      .attr("stroke-dasharray", "2 4");

    // X axis
    const xAxis = svg
      .append("g")
      .attr("transform", `translate(0,${height - marginBottom})`)
      .call(
        d3
          .axisBottom(x)
          .ticks(Math.max(4, Math.floor(width / 120)))
          .tickFormat((d) => d3.utcFormat("%b %y")(d as Date))
          .tickSize(0)
          .tickPadding(8)
      );
    xAxis.selectAll("text").attr("fill", axisColor).attr("opacity", 0.6).style("font-size", "11px");
    xAxis.select(".domain").attr("stroke-opacity", 0);

    // Y axis
    const yAxis = svg
      .append("g")
      .attr("transform", `translate(${marginLeft},0)`)
      .call(
        d3
          .axisLeft(y)
          .ticks(5)
          .tickFormat((d) => formatCompact(d as number))
          .tickSize(0)
          .tickPadding(8)
      );
    yAxis.selectAll("text").attr("fill", axisColor).attr("opacity", 0.6).style("font-size", "11px");
    yAxis.select(".domain").attr("stroke-opacity", 0);

    // Lines with subtle area fill for first coin
    data.forEach((coinData) => {
      const coinColor = color(coinData.coinID);

      svg
        .append("path")
        .datum(coinData.marketCaps)
        .attr("fill", "none")
        .attr("stroke", coinColor)
        .attr("stroke-width", 2)
        .attr("stroke-linejoin", "round")
        .attr("stroke-linecap", "round")
        .attr("d", line);
    });

    // Hover interactions
    const focus = svg
      .append("circle")
      .attr("r", 4)
      .attr("fill", "white")
      .attr("stroke", coinIdListWithColors[0].color)
      .attr("stroke-width", 2)
      .style("opacity", 0)
      .style("pointer-events", "none");

    const focusLine = svg
      .append("line")
      .attr("y1", marginTop)
      .attr("y2", height - marginBottom)
      .attr("stroke", axisColor)
      .attr("stroke-opacity", 0.2)
      .attr("stroke-dasharray", "2 4")
      .style("opacity", 0)
      .style("pointer-events", "none");

    const tooltip = d3.select(tooltipRef.current);
    const bisectDate = d3.bisector(
      (d: [number, number]) => new Date(d[0])
    ).left;

    svg
      .append("rect")
      .attr("width", Math.max(0, width - marginLeft - marginRight))
      .attr("height", Math.max(0, height - marginTop - marginBottom))
      .attr("transform", `translate(${marginLeft},${marginTop})`)
      .style("fill", "none")
      .style("pointer-events", "all")
      .on("mouseover", () => {
        focus.style("opacity", 1);
        focusLine.style("opacity", 1);
        tooltip.style("opacity", 1);
      })
      .on("mousemove", (event) => {
        const mouse = d3.pointer(event, svg.node());
        const mouseX = mouse[0];
        const xDate = x.invert(mouseX);
        const series = data[0];
        if (!series || series.marketCaps.length < 2) return;
        const index = bisectDate(series.marketCaps, xDate, 1);
        const d0 = series.marketCaps[index - 1];
        const d1 = series.marketCaps[index];
        if (!d0 || !d1) return;
        const d =
          xDate.getTime() - new Date(d0[0]).getTime() >
          new Date(d1[0]).getTime() - xDate.getTime()
            ? d1
            : d0;

        focus.attr("cx", x(new Date(d[0]))).attr("cy", y(d[1]));
        focusLine.attr("x1", x(new Date(d[0]))).attr("x2", x(new Date(d[0])));

        tooltip
          .html(
            `<div class="text-[11px] uppercase tracking-wider text-ink-muted">${d3.utcFormat(
              "%b %d, %Y"
            )(new Date(d[0]))}</div><div class="font-semibold mt-0.5">₹${formatCompact(
              d[1]
            )}</div>`
          )
          .style("left", `${mouse[0] + 12}px`)
          .style("top", `${mouse[1] - 8}px`);
      })
      .on("mouseout", () => {
        focus.style("opacity", 0);
        focusLine.style("opacity", 0);
        tooltip.style("opacity", 0);
      });
  }, [data, width, height, marginTop, marginRight, marginBottom, marginLeft]);

  return (
    <div ref={containerRef} className="relative w-full text-ink-secondary">
      <svg ref={svgRef} width={width} height={height} className="block" />
      <div
        ref={tooltipRef}
        className="absolute pointer-events-none surface-elevated rounded-md px-2.5 py-1.5 text-xs opacity-0 transition-opacity"
        style={{ transform: "translate(0, -100%)" }}
      />
    </div>
  );
}
