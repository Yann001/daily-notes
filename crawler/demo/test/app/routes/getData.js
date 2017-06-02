var express = require('express');
var url = require('url'); //解析操作url
var superagent = require('superagent'); //这三个外部依赖不要忘记npm install
var cheerio = require('cheerio');
var eventproxy = require('eventproxy');
var targetUrl = 'https://cnodejs.org/';
superagent.get(targetUrl)
  .end(function (err, res) {
    console.log(res);
  });

module.exports = superagent;
