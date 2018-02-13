const webpack = require('@cypress/webpack-preprocessor')

const options = {
// send in the options from your webpack.config.js, so it works the same
// as your app's code
	webpackOptions: require('../../../webpack.config'),
	watchOptions: {},
};

module.exports = webpack(options);