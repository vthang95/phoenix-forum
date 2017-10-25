const webpack = require("webpack")
const merge = require("webpack-merge")
const CopyWebpackPlugin = require("copy-webpack-plugin")
const ExtractTextPlugin = require("extract-text-webpack-plugin")

const dev = process.env.NODE_ENV !== 'production'

let common = {
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: [/node_modules/],
        loader: "babel-loader"
      },
      {
        test: /\.hbs$/,
        loader: "handlebars-loader"
      },
      {
        test: [/\.sass$/, /\.css$/],
        loader: ExtractTextPlugin.extract({use: "css-loader!sass-loader", fallback: "style-loader"})
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: "file-loader?name=/images/[name].[ext]"
      },
      {
        test: /\.(ttf|eot|svg|woff2?)$/,
        loader: "file-loader?name=/fonts/[name].[ext]",
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    })
  ]
}


if (!dev) common.plugins.push(
  new webpack.optimize.UglifyJsPlugin({
    compress: {warnings: false},
    output: {comments: false}
  })
)


module.exports = [
  merge(common, {
    entry: [
      "normalize.css",
      __dirname + "/admin/index.sass",
      __dirname + "/admin/index.js"
    ],
    module: {
      rules: [{
        test: /\.jsx$/,
        exclude: [/node_modules/],
        loader: "babel-loader"
      }]
    },
    output: {
      path: __dirname + "/../priv/static",
      filename: "js/admin.js"
    },
    resolve: {
      modules: [
        "node_modules",
        __dirname + "/admin"
      ]
    },
    plugins: [
      new CopyWebpackPlugin([{ from: __dirname + "/static"}]),
      new ExtractTextPlugin("css/admin.css")
    ]
  }),
  merge(common, {
    entry: [
      "normalize.css",
      __dirname + "/outside/outside.sass",
      __dirname + "/outside/outside.js"
    ],
    output: {
      path: __dirname + "/../priv/static",
      filename: "js/outside.js"
    },
    resolve: {
      modules: [
        "node_modules",
        __dirname + "/shared"
      ]
    },
    plugins: [
      new CopyWebpackPlugin([{ from: __dirname + "/static"}]),
      new ExtractTextPlugin("css/outside.css")
    ]
  }),
  merge(common, {
    entry: [
      "normalize.css",
      __dirname + "/shared/shared.sass",
      __dirname + "/shared/shared.js"
    ],
    output: {
      path: __dirname + "/../priv/static",
      filename: "js/shared.js"
    },
    resolve: {
      modules: [
        "node_modules",
        __dirname + "/shared"
      ]
    },
    plugins: [
      new CopyWebpackPlugin([{ from: __dirname + "/static"}]),
      new ExtractTextPlugin("css/shared.css")
    ]
  })
]
