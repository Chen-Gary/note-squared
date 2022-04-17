# Note$^2$: A Note-taking Application

## 1. Introduction

*Note*$^2$ (Note Squared) is web-based note-taking application.

This is a group project of *CSC4001-Software Engineering*, at CUHK(SZ).



## 2. Features & Demo

==...TODO==



## 3. Technology Stack

* Front-end: [Vue.js](https://vuejs.org/)
* Server-side: [Node.js - Express](http://expressjs.com/)
* Database: [MongoDB](https://www.mongodb.com/)



## 4. Run Project in Local Computer

Please refer to the following instructions to run our project in your local computer.

### 4.1 Run Front-end Locally

#### 4.1.1 Environment

* Node.js

#### 4.1.2 Launch Front-end

```bash
# open terminal in `front` directory
cd /note-squared/front

# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev
```

```bash
# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run unit tests
npm run unit

# run e2e tests
npm run e2e

# run all tests
npm test
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).



### 4.2 Run Server Locally

#### 4.2.1 Environment

* **Node.js**

  Server will run in **port 3000** (i.e. `localhost:3000`)

* **MongoDB**

  For simplicity, we kept all the configurations of MongoDB as default.

  * Make sure that **MongoDB daemon** is running in **port 27017**
  * This project do not set any user & password for the database
  * A database, named `note_squared`, will be created automatically after the server launches. You may check the data in it with MongoDB Compass.

#### 4.2.2 Launch Server

```bash
# open terminal in `server` directory
cd /note-squared/server

# install dependencies
npm install

# serve with hot reload at localhost:3000
npm run dev

# OR you can run server without hot reload, using the following command
npm run start
```



## 5. Developers

* [Chen-Gary](https://github.com/Chen-Gary)
* [Frida161](https://github.com/Frida161)
* [Timothy-197](https://github.com/Timothy-197)
* [LYNN-CHEN](https://github.com/LYNN-CHEN)
