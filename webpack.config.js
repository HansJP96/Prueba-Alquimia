const path = require('path');
const nodeExternals = require('webpack-node-externals');
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
  mode: 'development',
  devtool: 'cheap-module-source-map',
  target: 'node',
  entry: ['./app.js'],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'app.js',
    publicPath: 'views'
  },
  // Bundle '.ts' files as well as '.js' files.
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".json", ".html",".yaml"]
  },
  module: {
    // Use `ts-loader` on any file that ends in '.ts'
    rules: [
      {
        test: /\.(js|ts)$/,
        use: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.html$/,
        loader: "html-loader"
      },
    ],
  },
  optimization: {
    removeAvailableModules: false,
    removeEmptyChunks: false,
    splitChunks: false
  },
  externalsPresets: {
    node: true // in order to ignore built-in modules like path, fs, etc. 
  },
  externals: [nodeExternals()],
  plugins: [
    new CopyPlugin({
      patterns: [
        { from: "src/views", to: "views" }
      ],
    }),
  ],
};

/* externals: {
  express: 'commonjs express'
}, */

/* plugins: [
  new webpack.HotModuleReplacementPlugin({
    multiStep: true
  })
], */

/* devServer: {
  compress: true,
  liveReload: true,
  hot: true,
  port: 3001,
  proxy: {
    '/api': {
      target: 'http://localhost:3000',
      secure: false
    }
  }
}, */