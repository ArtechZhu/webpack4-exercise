import './css/a.css';

require('./css/b.css');
require('./less/a.less');

// const $ = require('jquery');
// import $ from 'jquery';




document.write("here is index.html  1111");
// var el =document.getElementById("app");
// el.innerHTML = "index here is    hahaha";

var $el = $("#app");
$el.text("here is app container.")
var result = [4,5,6].map(n=>n**2);



if(module.hot){
    module.hot.accept();
}