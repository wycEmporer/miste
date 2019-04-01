var path = require("path");
var webpack = require("webpack");
var autoprefixer = require("autoprefixer");
var precss = require("precss");
var HtmlWebpackPlugin = require("html-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
// const rimraf = require('rimraf');
const CleanWebpackPlugin = require("clean-webpack-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

// const PrerenderSpaPlugin = require("prerender-spa-plugin");

const extractLess = new ExtractTextPlugin({
  filename: "[name].[contenthash].css",
});
module.exports = {
  entry: {
    main: "./src/main.js",
    vendor: ["babel-polyfill", 'vue', "vue-resource", "vuex", "underscore", "mint-ui", 'jsonp', "axios"]
  },
  output: {
    path: path.resolve(__dirname, "./build/dist/"),
    publicPath: "/dist/",
    filename: "js/[name].[chunkhash].js",
    chunkFilename: "js/[name].[chunkhash].js"
  },
  module: {
    rules: [{
        test: /\.vue$/,
        loader: "vue-loader",
        // options: {
        //   extractCSS: true
        // }
        options: {
          loaders: {
            less: ExtractTextPlugin.extract({
              loader: "css-loader!less-loader?indentSyntax",
              fallback: "vue-style-loader" // <- this is a dep of vue-loader, so no need to explicitly install if using npm3
            })
          }
        }
      },
      {
        test: /\.js$/,
        loader: "babel-loader",
        exclude: /node_modules/
      },
      {
        test: /\.(css|less)$/,
        use: extractLess.extract({
          use: [{
              loader: "css-loader",
              options: {
                importLoaders: 1
              }
            },
            {
              loader: "postcss-loader"
            },
            {
              loader: "less-loader",
              options: {
                importLoaders: 1
              }
            }
          ],
          fallback: "vue-style-loader"
        })
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2)$/,
        loader: "file-loader"
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: "file-loader",
        options: {
          name: "images/[hash].[ext]"
        }
      }
    ]
  },
  resolve: {
    extensions: ["css", ".js", ".vue", ".less"],
    alias: {
      vue$: "vue/dist/vue.esm.js",
      assets: path.resolve(__dirname, "./src/assets"),
      pages: path.resolve(__dirname, "./src/pages"),
      models: path.resolve(__dirname, "./src/models"),
      components: path.resolve(__dirname, "./src/components"),
      $vuex: path.resolve(__dirname, "./src/vuex"),
      config: path.resolve(__dirname, './src/config'),
      pdfFile: path.resolve(__dirname, './static/termsfile'),
      mixins: path.resolve(__dirname, './src/mixins'),
    }
  },
  performance: {
    hints: false
  },
  devtool: false,
  plugins: [
    // new BundleAnalyzerPlugin(),
    new CopyWebpackPlugin([
      {from: __dirname + '/static', to: __dirname + '/build/static', toType: 'dir'},
      {from: __dirname + '/bridge.html', to: __dirname + '/build/bridge.html'}
    ]),
    extractLess,
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      // minChunks: Infinity,
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'manifest',
    }),
    new HtmlWebpackPlugin({
      title: "HappyEasyGo",
      template: "./index.html",
      filename: path.resolve(__dirname, "./build/index.html"),
      // hash: true,
      xhtml: true
    }),
    new CleanWebpackPlugin(['build']),
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: '"production"'
      }
    }),
    new OptimizeCssAssetsPlugin({
      cssProcessorOptions: {
        // prevent cssnano recaculate z-index
        safe: true
      },
    }),
    new webpack.optimize.UglifyJsPlugin({
      // sourceMap: true,
      compress: {
        warnings: false
      }
    })
    // new PrerenderSpaPlugin(
    //   // Absolute path to compiled SPA
    //   path.join(__dirname, "./dist"),
    //   // List of routes to prerender
    //   ["/"]
    // ),
    // new webpack.LoaderOptionsPlugin({
    //   minimize: true
    // })
  ]
};

