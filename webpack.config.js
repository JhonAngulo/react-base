const HtmlWebpackPlugin = require('html-webpack-plugin')
const CompressionPlugin = require('compression-webpack-plugin')

const javascriptRules = {
  test: /\.js|jsx$/,
  exclude: /node_modules/,
  use: {
    loader: 'babel-loader',
    options: {
      presets: ['@babel/preset-react', '@babel/preset-env'],
      plugins: ['@babel/plugin-proposal-optional-chaining'],
    },
  },
}

const stylesRules = {
  test: /\.s[ac]ss$/i,
  use: ['style-loader', 'css-loader', 'sass-loader'],
}

const productionPlugins = [new CompressionPlugin()]

module.exports = (env, { mode }) => ({
  output: {
    filename: 'app.[contentHash].js',
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  module: {
    rules: [javascriptRules, stylesRules],
  },
  plugins: [
    mode === 'production' && [...productionPlugins],
    new HtmlWebpackPlugin({
      title: 'App Title',
      template: 'public/index.html',
    }),
  ].filter(item => console.log(item) ),
})
