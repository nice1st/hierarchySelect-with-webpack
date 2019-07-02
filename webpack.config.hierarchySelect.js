// 설정파일
const nodeExternals = require('webpack-node-externals')
const path = require('path')

module.exports = {
  target: 'node',
  externals: [nodeExternals()],
  entry: './src/js/HierarchySelect.js',
  output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'hierarchySelct.js',
      library: "ComponentModule",
      libraryTarget: "var",
      umdNamedDefine: true,
  }
}