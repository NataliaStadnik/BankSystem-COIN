import Plotly from 'plotly.js-dist-min';

export function renderBarChart(container, data, arg = null) {
  const layouts = {
    height: 200,
    showlegend: false,
    yaxis: {
      color: '#000000',
      gridcolor: '#fff',
      side: 'right',
      ticksuffix: '₽',
      rangebreaks: {
        values: [0, 200],
      },
    },

    font: {
      family: 'sans-serif',
      size: 18,
      weight: 700,
    },
    margin: {
      l: 0,
      r: 80,
      b: 40,
      t: 20,
      pad: 5,
    },
    ...arg,
  };
  const config = {
    displayModeBar: false,
    responsive: true,
  };

  try {
    Plotly.newPlot(container, data, layouts, config);
  }
  catch (err) {
    console.log(err.message)
  }
}
