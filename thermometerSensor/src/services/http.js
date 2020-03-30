require("dotenv").config();
const fetch = require("node-fetch");
const url = process.env.BREWERYAPI_URL
  ? process.env.BREWERYAPI_URL
  : "http://0.0.0.0:3000";
const host = `${url}/breweryApi`;
console.log(host);
const request = (path, body, method) => {
  let params = {
    credentials: "omit",
    headers: {
      "content-type": "application/json;charset=UTF-8",
      "sec-fetch-mode": "cors"
    },
    method: method,
    mode: "cors"
  };
  if (body) params.body = JSON.stringify(body);
  return fetch(`${host}${path}`, params).then(response => {
    // console.log(response);
    if (response.status === 201) return "Success";
    else return response;
  });
};

const post = (path, body) => request(path, body, "POST");

const put = (path, body) => {
  return request(path, body, "PUT");
};

const remove = path => request(path, null, "DELETE");

const http = {
  post: post,
  put: put,
  remove: remove
};

module.exports = http;
