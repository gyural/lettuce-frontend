const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    '/api/catalog/',
    createProxyMiddleware({
      target: 'https://search.shopping.naver.com/catalog',
      changeOrigin: true, 
      pathRewrite: { 
        // 요청 경로에서 /api/catalog 제거하기
        '^/api/catalog': '',
      },
    }),
  );
};