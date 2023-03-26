var legends = new Map();
legends.set("Work", ['Calls','Product Engg', 'Developmet', 'Technology', 'Mentorship']);
legends.set("Family", "Being myself");
legends.set("Stride", "Reading, Talk to peers, listening");
legends.set("Wellness", "Running, Martial Arts, Sleep");


let labels = [];
[...legends.keys()].forEach((key) => labels.push(`${key} : ${legends.get(key)}`));
const config = {
  type: "polarArea",
  data: {
    labels: labels,
    datasets: [
      {
        label: "My Time",
        data: [24,18, 15, 10],
        backgroundColor: ["Red", "green", "grey", "steelblue"],
        borderJoinStyle: "bevel",
        borderWidth: 1,
      },
    ],
  },
  options: {
    plugins: {
      legend: {
        display: true,
        position: "bottom",
        usePointStyle: true,
        point: { pointStyle: "star" },
        labels: {
          font: {
            size: "10px",
            family: "FiraGO",
          },
          color: "rgb(104, 119, 141)",
        },
      },
      datalabels: {
        display: true,
        anchor: "center",
        clamp: true,
        formatter: (val, ctx) => {
          //return ctx.chart.data.labels[ctx.dataIndex];
          return [...legends.keys()][ctx.dataIndex];
        },
        font: {
          size: "12px",
        },
        color: "#fff",
        backgroundColor: "blue",
      },
    },
    scales: {
      x: {
        grid: { drawBorder: false, display: false },
        ticks: {
          display: false, //this removed the labels on the x-axis
        },
      },
      y: {
        grid: { drawBorder: false, display: false },
        ticks: {
          display: false, //this removed the labels on the x-axis
        },
      },
    },
    responsive: true,
    legend: { position: "bottom", align: "start" },
    tooltip: { enabled: true },
  },
};

window.addEventListener("load", function (event) {
  Chart.register(ChartDataLabels);
  const ctx = document.getElementById("day-of-my-life-label");
  const myChart = new Chart(ctx, config);
});
