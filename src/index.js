import './css/a.css'

require('./css/b.css')

document.write("here is index.html");
var el =document.getElementById("app");
el.innerHTML = "index here is";
if(module.hot){
    module.hot.accept();
}