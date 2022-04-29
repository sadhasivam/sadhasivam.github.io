var legends = new Map();
legends.set("A", "Advocacy");
legends.set("B", "Business Engagement");
legends.set("C", "Collaboration");
legends.set("D", "Personal Growth");
legends.set("E", "Product Engineering");
legends.set("F", "Mentorship");
legends.set("G", "Technology");

let labels = [];
[...legends.keys()].forEach((key) => labels.push(key + " : " + legends.get(key)));
const config = {
  type: "doughnut",
  data: {
    labels: labels,
    datasets: [
      {
        label: "My Time",
        data: [50, 60, 40, 40, 50, 60, 30],
        backgroundColor: ["darkblue", "blue", "steelblue", "dodgerblue", "deepskyblue", "lightskyblue", "powderblue"],
        borderColor: ["white", "white", "white", "white", "white", "white"],
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

window.addEventListener("load",function(event) {
  Chart.register(ChartDataLabels);
  const ctx = document.getElementById("day-of-my-life-label");
  const myChart = new Chart(ctx, config);
});
