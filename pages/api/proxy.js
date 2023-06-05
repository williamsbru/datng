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

                        let response = responseBuffer.toString('utf8')

                        response = process.env.REPLACE.reduce((agg, item, index) => {
                            return response.replaceAll(agg[Object.keys(item)[0] + (index + 1)] , item[Object.keys(item)[0]])
                        }, {})

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
