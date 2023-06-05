const {createProxyMiddleware} = require("http-proxy-middleware");

module.exports = (req, res) => {
    let target = "https://www.google.com/";//your website url
    //   if (
    //     req.url.startsWith("/api") ||
    //     req.url.startsWith("/auth") ||
    //     req.url.startsWith("/banner") ||
    //     req.url.startsWith("/CollegeTask")
    //   ) {
    //     target = "http://106.15.2.32:6969";
    //   }

    createProxyMiddleware({
        target,
        changeOrigin: true,
        selfHandleResponse: true,
    })(req, res);
};
