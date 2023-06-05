const {createProxyMiddleware, responseInterceptor} = require("http-proxy-middleware");
const Jimp = require('jimp');
const globalReplace = require('../../utils/replace');
const globalCSS = require('../../utils/css');
const globalJS = require('../../utils/js');
const globalSpin = require('../../utils/spin');

module.exports = (req, res) => {
    createProxyMiddleware({
        target: process.env.TARGET,
        changeOrigin: true,
        selfHandleResponse: true,
        on: {
            proxyRes: responseInterceptor(async (responseBuffer, proxyRes, req, res) => {
                const imageTypes = ['image/png', 'image/jpg', 'image/jpeg', 'image/gif'];
                try {
                    if (imageTypes.includes(proxyRes.headers['content-type'])) {
                        let image = await Jimp.read(responseBuffer)
                        image.flip(true, false).sepia().pixelate(5)
                        return image.getBufferAsync(Jimp.AUTO)
                    } else {

                        let response = responseBuffer.toString('utf8')

                        let replaceFunc = function (response, json) {
                            if (json) {
                                let data = JSON.parse(json)
                                Object.keys(data).forEach(key => {
                                    response = response.replace(new RegExp(key, 'g'), data[key]);
                                })
                            }
                            return response
                        }

                        let includeFunc = function (data, include = null) {
                            return include + (data && data != 'undefined' && data.length) ? (((include) ? ' ' : null) + data) : null;
                        }

                        response = response.replaceAll(process.env.TARGET, 'https://' + process.env.VERCEL_URL)

                        response = replaceFunc(replaceFunc(replaceFunc(response, process.env.REPLACE), globalSpin), globalReplace)

                        response = response.replace('</head>',
                            '<script>' +
                            includeFunc(process.env.JS, includeFunc(globalJS)) +
                            '</script><style>' +
                            includeFunc(process.env.CSS, includeFunc(globalCSS)) +
                            '</style></head>');

                        return response
                    }
                } catch (err) {
                    console.log('image processing error: ', err);
                    return responseBuffer;
                }
            }),
        },
    })(req, res);
};
