const config = {
	type: "doughnut",
	data: {
		labels: [
			"Mentorship",
			"Technology",
			"Product",
			"Business Engagement",
			"People",
			"Advocacy",
			"Personal Growth",
		],
		datasets: [
			{
				label: "My Time",
				data: [50, 60, 40, 40, 50, 60, 30],
				backgroundColor: [
					"darkblue",
					"blue",
					"steelblue",
					"dodgerblue",
					"deepskyblue",
					"lightskyblue",
					"powderblue",
				],
				borderColor: ["white", "white", "white", "white", "white", "white"],
				borderWidth: 1,
			},
		],
	},
	options: {
        plugins: {
            legend: {
                display: false,
            },
            datalabels: {
                display: true,
                anchor: "center",
                clamp: true,
                formatter: (val, ctx) => {
                  return ctx.chart.data.labels[ctx.dataIndex];
                },
                font: {
                    size: "5px"
                },
                color: "#fff",
                backgroundColor: "blue",
              },
        },
		datalabels: {
			display: true,
			formatter: (value) => {
				return ctx.chart.data.labels[ctx.dataIndex];
			},
			color: "#fff",
			backgroundColor: "#404040",
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
