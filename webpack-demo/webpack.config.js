module.exports = {
  // “__dirname”是node.js中的一个全局变量，它指向当前执行脚本所在的目录
  entry: __dirname + '/app/main.js', // 唯一入口文件
  output: {
    path: __dirname + '/public', // 打包后文件存放的地方
    filename: 'bundle.js' // 打包后输出的文件名
  },
  // 生成Source Maps（使调试更容易）
  // 配置生成Source Maps，选择合适的选项[source-map|cheap-module-source-map|eval-source-map|cheap-module-eval-source-map]
  devtool: 'eval-source-map',
  devServer: {
    port: 8080, // 设置监听端口
    contentBase: './public', // 本地服务器所加载页面所在目录
    colors: true, // 终端输出结果为彩色
    historyApiFallback: true, // 不跳转
    inline: true // 实时刷新
  }
}