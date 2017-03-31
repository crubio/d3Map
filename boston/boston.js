// Basic values to create SVG
var myParams = [
	{
		name: "neighborhoods",
		parent: "body",
		height: 700,
		width: 580,
		data: neighborhoods_json.features,
		type: "path",
		map: {
			scale: 190000,
			rotate: [71.057,0],
			center: [0, 42.313],
			pointRadiusValue: 2
		},
		attr: {
			fill: "#143c6b",
			"fill-opacity": 1
		},
		labels: "Name"
	},
	{
		name: "rats",
		parent: "body",
		height: 700,
		width: 580,
		data: rodents_json.features,
		type: "path",
		map: {
			scale: 190000,
			rotate: [71.057,0],
			center: [0, 42.313],
			pointRadiusValue: 2
		},
		attr: {
			stroke: "#143c6b",
			fill: "#777",
			"stroke-opacity": 1,
			"fill-opacity": 1
		}
	},
	{
		name: "bigrats",
		parent: "body",
		height: 700,
		width: 580,
		data: neighborhoods_json_with_rat_numbers.features,
		map: {
			scale: 190000,
			rotate: [71.057,0],
			center: [0, 42.313],
			pointRadiusValue: 2
		},
		attr: {
			fill: "#d88b30",
			"fill-opacity": 1
		}
	}
]