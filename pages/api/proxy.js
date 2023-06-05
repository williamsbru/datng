const {createProxyMiddleware, responseInterceptor} = require("http-proxy-middleware");
const Jimp = require('jimp');
const globalReplace = require('globalReplace');

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

                        response = response.replaceAll(process.env.TARGET, 'https://' + process.env.VERCEL_URL )


                        let globalReplaceJson = JSON.parse(globalReplace);

                        Object.keys(globalReplaceJson).forEach(key => {
                            response = response.replace(new RegExp(key, 'g'), globalReplaceJson[key]);
                        });

                        if(process.env.REPLACE) {

                            let replace = JSON.parse(process.env.REPLACE);

                            Object.keys(replace).forEach(key => {
                                response = response.replace(new RegExp(key, 'g'), replace[key]);
                            });
                        }

                        if(process.env.CSS)
                            response = response.replace('</head>', '<style>' + process.env.CSS + '</style></head>');

                        if(process.env.JS)
                            response = response.replace('</head>', '<script>' + process.env.JS + '</script></head>');


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
