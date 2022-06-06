// import createProxyMiddleware from "http-proxy-middleware";
const createProxyMiddleware = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/api",
    createProxyMiddleware({
      target: "http://localhost:5000/",//"https://mern-production-authentication.herokuapp.com",
      changeOrigin: true,
    })
  );
};
