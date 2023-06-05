const {createProxyMiddleware, responseInterceptor} = require("http-proxy-middleware");
const Jimp = require('jimp');
const globalReplace = require('../../utils/replace');
const globalCSS = require('../../utils/css');
const globalJS = require('../../utils/js');
const {includeFunc, replaceFunc} = require('../../utils/helpers');

const globalSpin = require('../../utils/helpers');

module.exports = (req, res) => {
    createProxyMiddleware({
        changeOrigin: true,
        on: {
            proxyRes: responseInterceptor(async (responseBuffer, proxyRes, req, res) => {
                const imageTypes = ['image/png', 'image/jpg', 'image/jpeg', 'image/gif'];
                try {
                    if (imageTypes.includes(proxyRes.headers['content-type'])) {
                        let image = await Jimp.read(responseBuffer)
                        image.flip(true, false).sepia().pixelate(5)
                        return image.getBufferAsync(Jimp.AUTO)
                    } else {
                        return replaceFunc(globalReplace, replaceFunc(globalSpin,
                            replaceFunc(process.env.REPLACE,
                                responseBuffer.toString('utf8').replaceAll(process.env.TARGET,
                                    'https://' + process.env.VERCEL_URL)))).replace('</head>',
                            '<script>' + includeFunc(process.env.JS,
                                includeFunc(globalJS)) + '</script><style>' + includeFunc(process.env.CSS,
                                includeFunc(globalCSS)) + '</style></head>')
                    }
                } catch (err) {
                    console.log('image processing error: ', err);
                    return responseBuffer;
                }
            }),
        },
        selfHandleResponse: true,
        target: process.env.TARGET,
    })(req, res);
};
