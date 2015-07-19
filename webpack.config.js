var webpack = require("webpack");
var path = require("path");

module.exports = {
	target: "web",
	context: __dirname,
	entry: ["./src/client"],
	output: {
		path:          path.join(__dirname, "static/dist"),
		filename:      "client.js",
		chunkFilename: "[name].[id].js",
		publicPath:    "dist/"
	},
	plugins: [
		new webpack.NoErrorsPlugin()
	],
	module: {
		loaders: [
			{include: /\.json$/, loaders: ["json-loader"]},
			{include: /\.jsx?$/, loaders: ["babel-loader?stage=0&optional=runtime"], exclude: /node_modules/}
		]
	},
	resolve: {
		modulesDirectories: [
			"src",
			"node_modules",
			"web_modules"
		],
		extensions: ["", ".json", ".js", ".jsx"]
	},
	node: {
		__dirname: true,
		fs:        'empty'
	}
};
