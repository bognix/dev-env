const path = require('path');
const {DefinePlugin, ContextReplacementPlugin} = require('webpack');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const {env} = require('./config/config');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
    template: './views/app.html',
    filename: 'app.html',
    inject: 'body',
});

const ExtractTextPluginConfig = new ExtractTextPlugin({
    filename: '[name].bundle.css',
    allChunks: true,
});

const DefinePluginConfig = new DefinePlugin({
    '$tripPlanner':{
        'ENV': JSON.stringify(env)
    },
    'process.env': {
        'NODE_ENV': JSON.stringify(env)
    }
});

const ContextReplacementPluginConfig = new ContextReplacementPlugin(/moment[\/\\]locale$/, /en/);

const UglifyJsPluginConfig = new UglifyJsPlugin({
    exclude: /node_modules/
});

const plugins = [
    HtmlWebpackPluginConfig,
    ExtractTextPluginConfig,
    DefinePluginConfig,
    ContextReplacementPluginConfig
];

const cssLoaderOptions = {};

if (env === 'production') {
    plugins.push(UglifyJsPluginConfig);
    cssLoaderOptions.minimize = true;
}

module.exports = {
    entry: {
        app: './public/scripts/app.js',
        print: './public/styles/print.sass'
    },
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/assets/'
    },
    module: {
        rules: [
            { test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/ },
            { test: /\.jsx$/, loader: 'babel-loader', exclude: /node_modules/ },
            {
                test: /\.(sass|scss)$/,
                loader: ExtractTextPlugin.extract({ fallback: 'style-loader', use: [{
                    loader: 'css-loader', options: cssLoaderOptions
                }, 'sass-loader'] })
            },
            {
                test: /.(ttf|otf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
                use: [{
                    loader: 'file-loader',
                    options: {
                        name: '[name].[ext]',
                        outputPath: 'fonts/',    // where the fonts will go
                    }
                }]
            }
        ]
    },
    plugins
};
