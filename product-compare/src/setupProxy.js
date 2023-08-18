const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    '/api/catalog',
    createProxyMiddleware({
      target: 'https://search.shopping.naver.com/',
      pathRewrite: {
        '^/catalog': '',
      },
    }),
  );
};