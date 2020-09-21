This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

# 一个集电影资讯发牢骚于一体的 web 小应用，体验地址（速度较慢，耐心等待，遇到加载失败时请刷新。）

[电影、资讯、发牢骚]https://lightzhu.github.io/reantic

[项目地址] https://github.com/lightzhu/reantic.git

# 后台基于 Node.js,数据库 mongoDB

[后台地址]https://github.com/lightzhu/Movie_Crawler.git

# 前端效果

<div align="center">
<img src="https://cdn.jsdelivr.net/gh/lightzhu/public_cdn@0.6.5/image/github/mov1.jpg" height="568" width="320" >
<img src="https://cdn.jsdelivr.net/gh/lightzhu/public_cdn@0.6.5/image/github/mov2.jpg" height="568" width="320" >
</div>
<div align="center">
<img src="https://cdn.jsdelivr.net/gh/lightzhu/public_cdn@0.6.5/image/github/mov4.png" height="568" width="320" >
<img src="https://cdn.jsdelivr.net/gh/lightzhu/public_cdn@0.6.5/image/github/mov3.jpg" height="568" width="320" >
</div>
<div align="center">
<img src="https://cdn.jsdelivr.net/gh/lightzhu/public_cdn@0.7.0/image/github/mov5.png" height="568" width="320" >
</div>

## 项目路由

```
path='/'          app组件
path='/login'     登陆
path='/register'  注册
path='/flow'      兑换流量
path='/uploadfile'轻云-图床
```

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

暴露出所有的配置文件到 config 文件夹下

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

### .eslintignore

配置 eslint 忽略目录

### .prettiterrc

配置 prettiter 插件重写配置,解决 eslint 和 prettier 插件的一些冲突问题

### npm run eject

暴露 create app 内部配置，方便修改

### 安装 antd，并配置按需加载(安装 antd-mobile 是同样道理)

npm i babel-plugin-import --save-dev
方式一 重写.babelrc,需要将 package.json 里将 babel 选项剔除掉
方式二 直接在 package.json 里添加

```
"plugins": [
["import", {
"libraryName": "antd",
"libraryDirectory": "es",
"style": "css" // `style: true` 会加载 less 文件
}]
]

```

### 其他方式

安装 react-app-rewired customize-cra 并在 package.json 里修改配置
新建 config-overrides.js

### 关于 npm run build

执行 build 命令

将 package.json 的 homepage 配置成‘.’,代表将当前页面打包到相对路径下面，默认为‘’

将 package.json 的 homepage 配置成‘https://lightzhu.github.io/项目名’,代表将当前页面打homepage下面的文件夹

然后再执行一次部署 npm run deploy

### 三步解决.gitignore 文件不生效的问题

git rm -r --cached .
git add .
git commit -m 'update .gitignore'

### 通过 gh-pages -d build 的方式部署项目能请求到静态资源而不能执行 js 的问题

更改 history: 将 BrowserHistory 为 HashHistory

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `npm run build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify
