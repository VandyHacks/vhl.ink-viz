const makePlot = async () => {
  const url =
    "https://oazylu5q0a.execute-api.us-east-2.amazonaws.com/default/getVHLinkStats" +
    location.pathname;

  const data = await fetch(url)
    .then((r) => r.json())
    .then((j) => j.timesViz);

  console.log(data);
  const timestamps = Object.keys(data);
  const freq = Object.values(data);

  const times = timestamps.map((t) => new Date(Number(t) * 1000)); // convert to int then to ms then to date

  //   console.log(times);
  //   // e.g. ["1619817265", "1619817272", "1619817295", "1619817302", "1622149897", "1622149907", "1624994373", "1624994374"]
  //   console.log(freq);
  //   // e.g. [1, 1, 1, 1, 1, 1, 1, 1]

  let trace = [
    {
      x: times,
      y: freq,
      type: "scatter",
      mode: "markers",
      marker: { size: 8 },
    },
  ];

  let layout = {
    title: `vhl.ink analytics for ${location.pathname}`,
  };

  let config = { responsive: true };
  Plotly.newPlot("vhlink-viz", trace, layout, config);
};

(() => makePlot())();
