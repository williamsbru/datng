<p align="center">🦄 PLEASE REMEMBER TO SMASH THE ⭐🔨 BUTTON AND <a href="https://github.com/sponsors/donspablo/dashboard">SUPPORT</a> 🌈 THANK YOU.</sub></sup></p>
<p align="center">📢<sub><sup> <i><b> YOUR SUPPORT IS GREATLY APPRECIATED / </b> <a href="https://www.patreon.com/donPabloNow">PATREON.COM/DONPABLONOW</a> / <b>BTC</b>  3HVNOVVMLHVEWQLSCCQX9DUA26P5PRCTNQ / <b>ETH</b> 0X3D288C7A673501294C9289C6FC42480A2EA61417 </i> </p>
  
<p align="center"><img src="https://user-images.githubusercontent.com/6468571/191125670-003a61ea-411f-42c0-b820-ad19124307a8.png"></img></p>

  | <p align="center"><img height="150px" src="https://user-images.githubusercontent.com/6468571/191125131-4e76fe43-770b-49e8-aa66-d1c8723f7e7a.png"></img></p><sub><sup><a href="https://github.com/4dboard/Proxy-yxorP">YXORP PROXY</a>: Web Proxy 🐮 yxorP: SAAS(y) Guzzler + App (GUI Dashboard incl.). Feature Rich, Multi-tenancy, Headless, Plug & Play, Augmentation & Content Spinning Web Proxy with Caching - PHP CURL+Composer are Optional. Leveraging SAAS architecture to provide multi-tenancy, multiple threads, caching, and an article spinner service.</sub></sup> | <p align="center"><img height="150px" src="https://user-images.githubusercontent.com/6468571/191125113-9d991af2-f911-43df-8994-a573aaf9a7ac.png"></img></p><sub><sup><a href="https://github.com/meanos/meanOs">MEANOS</a>: The operating system with the smallest memory footprint and the highest performance levels. NEW RELEASE A new version of the Web3 operating system will be released in the near future. https://mean.ơs.com. Operating systems have been subjected to significant revisions; if you would want to be informed when the subsequent version is made available, please subscribe.</sub></sup> |
|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|

# Next.js Website Proxy

## Quick start

Chinese Notice: 如果无法查看此文档中的图片,请下载次项目后在自己电脑查看此 README.md

1、Fork this repository  

2、rewrite target host name in api/proxy.js (default google.com)

```js
const { createProxyMiddleware } = require("http-proxy-middleware");

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
    pathRewrite: {
      // rewrite request path `/backend`
      //  /backend/user/login => http://google.com/user/login
      //   "^/backend/": "/",
    },
  })(req, res);
};

```


3、Registering your vercel account [vercel](https://vercel.com/)  
4、Binding your github account in vercel's settings.

![bind github account](./asset/224318.jpg)

5、To config your vercel Rep.

Import Git repository,steps: Overview=>Add New...=>Project.

![import git repository](./asset/224748.jpg)

Click Button "Continue with Github".

![looking your own rep](./asset/225212.jpg)

To import your repository forked,such as google etc.

![Click Deploy](./asset/225542.jpg)

Waiting for deploy process

![Deploy success](./asset/225816.jpg)

The domain vercel for you

In 2022, the vercel domain name in mainland China will be polluted by DNS, so you should register a domain name in mainland China. Usually, novices on major domain name platforms can get a domain name with one-year usage rights for 1 yuan.

![Vercel Domain](./asset/230030.jpg)

6、Register your own domain name and perform real-name registration according to the real-name registration rules of the domain name manager

No more elaboration, if you encounter problems, you can submit an issue, and some netizens will answer your questions with each other.

7、To config your own domain and cname

![](./asset/230712.jpg)
![](./asset/231001.jpg)

Manage your domain name

![](./asset/231513.jpg)

The TXT record needs to fill in the content provided by vercel above, and the cname is the same

![](./asset/231835.jpg)

8、Enjoy it

`https://google.{{mydomain}}.com`

![](./asset/232007.jpg)

![](./asset/232111.jpg)

9、Modify the default browser engine for your own service

![](./asset/232617.jpg)

![](./asset/232857.jpg)

Setting the default item

![](./asset/232826.jpg)

## Change which data center your service is in

This affects your ip address when you use google search

![](./asset/233500.jpg)
