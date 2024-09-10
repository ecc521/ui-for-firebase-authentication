const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const webpackDevServer = require('webpack-dev-server');

const config = {
  mode: "development",
  entry: {
    app: './tests/testpage.js',
  },
  devtool: 'inline-source-map',
  devServer: {
    static: './devsvr',
    hot: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'UI Test for Firebase Authentication',

    }),
  ],
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  },
};


const compiler = webpack(config);

// `hot` and `client` options are disabled because we added them manually
const server = new webpackDevServer({ hot: false, client: false }, compiler);

(async () => {
  await server.start();
  console.log('dev server is running');
})();