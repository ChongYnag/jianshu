// 处理css
import csshook from 'css-modules-require-hook/preset';
// 处理图片
import assethook from 'asset-require-hook';

import { ServerStyleSheet } from 'styled-components';
assethook({
    extensions: ['png', 'jpg']
});
const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
// const userRoute = require("./userRoute");
const app = express();
const path = require('path');
app.use(cookieParser());
app.use(bodyParser.json());

// 引入css 和 js
import buildPath from '../build/asset-manifest.json';
import React from 'react';
import ReactDOM from 'react-dom';

import { BrowserRouter, Route, StaticRouter } from 'react-router-dom';
import { renderToString, renderToStaticMarkup } from 'react-dom/server';
import Header from "./../src/components/header";
import { Provider } from 'react-redux';
import store from "./../src/store/index";
import Home from './../src/pages/home';
import Detail from './../src/pages/detail';
import Login from './../src/pages/login';
import Write from './../src/pages/write';



// 用户接口模块
// app.use("/user",userRoute);

// 映射到build后的路径
//设置build以后的文件路径 项目上线用
app.use((req, res, next) => {
    if (req.url.startsWith('/user/') || req.url.startsWith('/static/')) {
        return next()
    }
    const sheet = new ServerStyleSheet();
    const context = {}
    const frontComponents = renderToString(sheet.collectStyles
        (<Provider store={store}>
            <StaticRouter
                location={req.url}
                context={context}>
                {/* <BrowserRouter> */}
                    <Header />
                    <Route path="/" exact component={Home} />
                    <Route path='/login' exact component={Login}></Route>
                    <Route path='/write' exact component={Write}></Route>
                    <Route path="/detail/:id" exact component={Detail} />
                {/* </BrowserRouter> */}
            </StaticRouter>
        </Provider>)
    );
    const styles = sheet.getStyleTags()
      // 新建骨架
      const _frontHtml = `<!DOCTYPE html>
      <html lang="en">
          <head>
              <meta charset="utf-8">
              <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
              <meta name="theme-color" content="#000000">
              <title>人才市场</title>
              ${styles}
          </head>
          <body>
              <noscript>
              You need to enable JavaScript to run this app.
              </noscript>
              <div id="root">${frontComponents}</div>
              <script src="${buildPath.files['main.js']}"></script>
          </body>
      </html>`
      res.send(_frontHtml)
    // return res.sendFile(path.resolve('build/index.html'))
})
app.use('/', express.static(path.resolve('build')))

app.listen("9000", function () {
    console.log("open Browser http://localhost:9000");
});