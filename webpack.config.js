const path = require('path');
const webpack = require('webpack');
const { merge } = require('webpack-merge');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const TARGET = process.env.TARGET;
const ROOT_PATH = path.resolve(__dirname);

const common = {
  entry: {
    'lib/lib': path.resolve(ROOT_PATH, 'src/index.js'),
  },
  output: {
    path: ROOT_PATH,
    filename: '[name].js',
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    modules: ['node_modules'],
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        loader: 'babel-loader',
        include: [path.resolve(ROOT_PATH, 'src'), path.resolve(ROOT_PATH, 'test')],
      },
      {
        test: /\.png$/i,
        type: 'asset',
        parser: {
          dataUrlCondition: {
            maxSize: 100000,
          },
        },
        exclude: /node_modules/,
      },
    ],
  },
};

if (TARGET === 'dev_js' || TARGET === 'dev_css') {
  module.exports = merge(common, {
    mode: 'development',
    entry: {
      demo: path.resolve(ROOT_PATH, `test/${TARGET}/demo.js`),
    },
    devtool: 'inline-source-map',
    devServer: {
      static: [path.resolve(ROOT_PATH, 'lib'), path.resolve(ROOT_PATH, 'test/index')],
      port: 3001,
      host: '0.0.0.0',
      historyApiFallback: true,
      hot: true,
      client: {
        progress: true,
      },
    },
    module: {
      rules: [
        {
          test: /\.less$/,
          loader: 'style-loader!css-loader!less-loader',
        },
      ],
    },
    plugins: [
      new webpack.HotModuleReplacementPlugin(),
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify('development'),
        __DEV__: JSON.stringify(true),
      }),
    ],
  });
}

if (TARGET === 'build_js' || TARGET === 'analyze') {
  module.exports = merge(common, {
    mode: 'production',
    output: {
      library: {
        type: 'commonjs2',
        export: 'default',
      },
      globalObject: 'this',
    },
    externals: {
      react: {
        root: 'React',
        commonjs2: 'react',
        commonjs: 'react',
        amd: 'react',
      },
      'react-dom': {
        root: 'ReactDOM',
        commonjs2: 'react-dom',
        commonjs: 'react-dom',
        amd: 'react-dom',
      },
      'react/jsx-runtime': {
        commonjs2: 'react/jsx-runtime',
        commonjs: 'react/jsx-runtime',
        amd: 'react/jsx-runtime',
      },
      'react/jsx-dev-runtime': {
        commonjs2: 'react/jsx-dev-runtime',
        commonjs: 'react/jsx-dev-runtime',
        amd: 'react/jsx-dev-runtime',
      },
    },
    plugins: [
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify('production'),
        __DEV__: JSON.stringify(false),
      }),
      ...(TARGET === 'analyze' ? [new BundleAnalyzerPlugin()] : []),
    ],
  });
}

if (TARGET === 'build_css') {
  module.exports = {
    entry: {
      style: './src/style/style.less',
      'high-res': './src/style/high-res.less',
      material: './src/style/material.less',
      bootstrap: './src/style/bootstrap.less',
      'semantic-ui': './src/style/semantic-ui.less',
      plain: './src/style/plain.less',
    },
    mode: 'production',
    output: {
      path: ROOT_PATH,
      filename: 'lib/[name].js',
    },
    resolve: {
      extensions: ['.js', '.jsx'],
      modules: ['node_modules'],
    },
    module: {
      rules: [
        {
          test: /\.png$/i,
          type: 'asset',
          parser: {
            dataUrlCondition: {
              maxSize: 100000,
            },
          },
          exclude: /node_modules/,
        },
        {
          test: /\.less$/,
          use: [
            MiniCssExtractPlugin.loader,
            'css-loader',
            'less-loader',
          ],
        },
      ],
    },
    plugins: [
      new MiniCssExtractPlugin({
        filename: 'lib/[name].css',
      }),
    ],
  };
}
