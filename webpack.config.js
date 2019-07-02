// 설정파일
const nodeExternals = require('webpack-node-externals')
const path = require('path')

module.exports = {
  target: 'node',
  externals: [nodeExternals()],
  entry: './src/main.js',
  output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'bundle.js',
  }
}