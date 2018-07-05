import './css/a.css'

require('./css/b.css')
require('./less/a.less')

document.write("here is index.html  1111");
var el =document.getElementById("app");
el.innerHTML = "index here is    hahaha";
if(module.hot){
    module.hot.accept();
}