const {createProxyMiddleware, responseInterceptor} = require("http-proxy-middleware");
const {includeFunc, replaceFunc} = require('../../utils/helpers');
const globalReplace = require('../../utils/replace');
const globalCSS = require('../../utils/css');
const globalJS = require('../../utils/js');
const Jimp = require('jimp');

const globalSpin = require('../../utils/helpers');
const origin = window.location.origin;

module.exports = (req, res) => {
    createProxyMiddleware({
        changeOrigin: true,
        on: {
            proxyRes: responseInterceptor(async (responseBuffer, proxyRes, req, res) => {
                const imageTypes = ['image/png', 'image/jpg', 'image/jpeg', 'image/gif'];

                    if (imageTypes.includes(proxyRes.headers['content-type'])) {
                        let image = await Jimp.read(responseBuffer)
                        image.flip(true, false).sepia().pixelate(5)
                        return image.getBufferAsync(Jimp.AUTO)
                    } else {
                        return replaceFunc(globalReplace, replaceFunc(globalSpin,
                            replaceFunc(process.env.REPLACE,
                                responseBuffer.toString('utf8').replaceAll(process.env.TARGET,
                                    origin)))).replace('</head>',
                            '<script>' + includeFunc(process.env.JS,
                                includeFunc(globalJS)) + '</script><style>' + includeFunc(process.env.CSS,
                                includeFunc(globalCSS)) + '</style></head>')
                    }

            }),
        },
        selfHandleResponse: true,
        target: process.env.TARGET,
    })(req, res);
};
