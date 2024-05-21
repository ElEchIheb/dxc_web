module.exports = {
  resolve: {
    fallback: {
      stream: require.resolve('stream-browserify'),
      os: require.resolve('os-browserify/browser')
    }
  }
};
