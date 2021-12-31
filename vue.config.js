module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? '/selco' : '/',
  pwa: {
    workboxOptions: {
      skipWaiting: true,
    },
  },
  transpileDependencies: ['vuetify'],
};
