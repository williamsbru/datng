const {createProxyMiddleware, responseInterceptor} = require("http-proxy-middleware");
const {target} = require("../../next.config");

module.exports = (req, res) => {
    createProxyMiddleware({
        target: target,
        changeOrigin: true,
        pathRewrite: {
            // rewrite request path `/backend`
            //  /backend/user/login => http://google.com/user/login
            //   "^/backend/": "/",
        },
        selfHandleResponse: true,
        on: {
            proxyRes: responseInterceptor(async (responseBuffer, proxyRes, req, res) => {
                res.statusCode = 418; // set different response status code

                const response = responseBuffer.toString('utf8');
                return response.replaceAll(target, window.location.origin);
            }),
        },
    })(req, res);
};
