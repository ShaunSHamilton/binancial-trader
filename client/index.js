// deno-lint-ignore-file no-window-prefix
window.addEventListener("load", () => {
  (async () => {
    const data = await d3.json("./assets/eth-gbp-001.json");
    // console.log(data);
    const chartElm = document.querySelector("#chart");
    const [width, height] = [chartElm.clientWidth, chartElm.clientHeight];
    const chart = BollingerChart(data, {
      x: (d) => d.CloseTime,
      y: (d) => Number(d.Close),
      width,
      height,
      yDomain: [
        d3.min(data, (d) => Number(d.Close)),
        d3.max(data, (d) => Number(d.Close)),
      ],
      strokeWidth: 1,
      N: 20,
      K: 2,
    });
    chartElm.appendChild(chart.node());
  })();
});

/**
 *
 * @callback x
 * @param {number[]} x - x-axis values
 * @returns x
 */

/**
 *
 * @callback y
 * @param {number[]} y - y-axis values
 * @returns Number(y)
 */

/**
 *
 * @param {any} data - The data containing at least asset value and time
 * @param {Object} param1 - The options related to the curve and bollinger bands
 * @param {x} x
 * @param {y} y
 * @param {number} N - Moving average period
 * @param {number} K - Standard deviations to offset each band
 * @param {d3.polyline} curve - A polyline
 * @param {number} marginTop - margin-top in px
 * @param {number} marginRight - margin-right in px
 * @param {number} marginBottom - margin-bottom in px
 * @param {number} marginLeft - margin-left in px
 * @param {number} width - width in px
 * @param {number} height - height in px
 * @param {[number, number]} xDomain - xmin and xmax
 * @param {[number, number]} xRange - left and right
 * @param {[number, number]} yDomain - ymin and ymax
 * @param {[number, number]} yRange - bottom and top
 * @param {string} yFormat - format specifier for y-axis
 * @param {string} yLabel - y-axis label
 * @param {[string, string, string, string]} colours - colours of bollenger lines
 * @param {number} strokeWidth - stroke-width in px
 * @param {string} strokeLinecap - line cap of bollenger lines
 * @param {string} strokeLinejoin - line join of bollenger lines
 * @returns SVGElement
 */
function BollingerChart(
  data,
  {
    x = ([x]) => x,
    y = ([, y]) => Number(y),
    N = 20,
    K = 2,
    curve = d3.curveLinear,
    marginTop = 20,
    marginRight = 30,
    marginBottom = 30,
    marginLeft = 40,
    width = 640,
    height = 400,
    xDomain,
    xRange = [marginLeft, width - marginRight],
    yDomain,
    yRange = [height - marginBottom, marginTop],
    yFormat,
    yLabel = "GBP",
    colours = ["yellow", "green", "blue", "red"],
    strokeWidth = 1.5,
    strokeLinecap = "round",
    strokeLinejoin = "round",
  } = {}
) {
  // Compute values.
  const X = d3.map(data, x);
  const Y = d3.map(data, y);
  // const I = d3.range(X.length);

  // Compute default domains.
  if (xDomain === undefined) xDomain = d3.extent(X);
  if (yDomain === undefined) yDomain = [0, d3.max(Y)];

  // Construct scales and axes.
  const xScale = d3.scaleUtc(xDomain, xRange);
  const yScale = d3.scaleLinear(yDomain, yRange);
  const xAxis = d3
    .axisBottom(xScale)
    .ticks(width / 80)
    .tickSizeOuter(0);
  const yAxis = d3.axisLeft(yScale).ticks(null, yFormat);

  // Construct a line generator.
  const line = d3
    .line()
    .defined((y, i) => !isNaN(X[i]) && !isNaN(y))
    .curve(curve)
    .x((_y, i) => xScale(X[i]))
    .y((y, _i) => yScale(y));

  function bollinger(N, K) {
    return (values) => {
      let i = 0;
      let sum = 0;
      let sum2 = 0;
      const Y = new Float64Array(values.length).fill(NaN);
      for (const n = Math.min(N - 1, values.length); i < n; ++i) {
        const value = values[i];
        (sum += value), (sum2 += value ** 2);
      }
      for (const n = values.length; i < n; ++i) {
        const value = values[i];
        (sum += value), (sum2 += value ** 2);
        const mean = sum / N;
        const deviation = Math.sqrt((sum2 - sum ** 2 / N) / (N - 1));
        Y[i] = mean + deviation * K;
        const value0 = values[i - N + 1];
        (sum -= value0), (sum2 -= value0 ** 2);
      }
      return Y;
    };
  }

  const svg = d3
    .create("svg")
    .attr("width", width)
    .attr("height", height)
    .attr("viewBox", [0, 0, width, height])
    .attr(
      "style",
      "max-width: 100%; height: auto; height: intrinsic; overflow: visible;"
    );

  svg
    .append("g")
    .attr("transform", `translate(0,${height - marginBottom})`)
    .call(xAxis);

  svg
    .append("g")
    .attr("transform", `translate(${marginLeft},0)`)
    .call(yAxis)
    .call((g) => g.select(".domain").remove())
    .call((g) =>
      g
        .selectAll(".tick line")
        .clone()
        .attr("x2", width - marginLeft - marginRight)
        .attr("stroke-opacity", 0.1)
    )
    .call((g) =>
      g
        .append("text")
        .attr("x", -marginLeft)
        .attr("y", 10)
        .attr("fill", "currentColor")
        .attr("text-anchor", "start")
        .text(yLabel)
    );

  svg
    .append("g")
    .attr("fill", "none")
    .attr("stroke-width", strokeWidth)
    .attr("stroke-linejoin", strokeLinejoin)
    .attr("stroke-linecap", strokeLinecap)
    .selectAll()
    .data([Y, ...[-K, 0, +K].map((K) => bollinger(N, K)(Y))])
    .join("path")
    .attr("stroke", (_d, i) => colours[i])
    .attr("d", line);

  return svg;
}
