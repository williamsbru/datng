const {createProxyMiddleware, responseInterceptor} = require("http-proxy-middleware");
const Jimp = require('jimp');

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

                        let find = function(str, strReplace, strWith) {
                            let esc = strReplace.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
                            let reg = new RegExp(esc, 'ig');
                            return str.replace(reg, strWith);
                        };

                        let response = responseBuffer.toString('utf8')

                        let replace = JSON.parse(process.env.REPLACE);

                        Object.keys(replace).forEach(key => {
                            response = find(response, key, replace[key]);
                        });

                        return response.replaceAll(process.env.TARGET, 'https://' + process.env.VERCEL_URL )
                    }
                } catch (err) {
                    console.log('image processing error: ', err);
                    return responseBuffer;
                }
            }),
        },
    })(req, res);
};
