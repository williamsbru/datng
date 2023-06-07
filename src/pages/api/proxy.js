const {createProxyMiddleware, responseInterceptor} = require("http-proxy-middleware");
const {includeFunc, replaceFunc} = require('../../utils/helpers');
const globalReplace = require('../../utils/replace');
const globalSpin = require('../../utils/spin');
const Jimp = require('jimp');

module.exports = (req, res) => {
    createProxyMiddleware({
        changeOrigin: true,
        on: {
            proxyRes: responseInterceptor(async (responseBuffer, proxyRes, req, res) => {
                if (!['image/png', 'image/jpg', 'image/jpeg', 'image/gif'].includes(proxyRes.headers['content-type'])) return replaceFunc([globalReplace, process.env.REPLACE,(!process.env.SPINOFF) ? globalSpin : null], responseBuffer.toString('utf8')).replace(new RegExp('[A-Z][A-Z0-9]?-[A-Z0-9]{4,10}(?:-[1-9]d{0,3})?'), process.env.ANALYTICS).replace('</head>', '<script>' + includeFunc(process.env.JS) + '</script><style>' + includeFunc(process.env.CSS) + '</style></head>')
                let image = await Jimp.read(responseBuffer)
                image.flip(true, false).sepia().pixelate(1)
                return image.getBufferAsync(Jimp.AUTO)
            }),
        },
        selfHandleResponse: true,
        target: process.env.TARGET,
    })(req, res);
};
