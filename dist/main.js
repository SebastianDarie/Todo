!function(e){var t={};function n(o){if(t[o])return t[o].exports;var r=t[o]={i:o,l:!1,exports:{}};return e[o].call(r.exports,r,r.exports,n),r.l=!0,r.exports}n.m=e,n.c=t,n.d=function(e,t,o){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:o})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var o=Object.create(null);if(n.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)n.d(o,r,function(t){return e[t]}.bind(null,r));return o},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=0)}([function(e,t){const n=document.querySelector("#dropdown"),o=document.querySelector(".projects-list"),r=document.querySelector("#my-modal1"),l=document.querySelector("#my-modal2"),c=document.querySelector("#modal-btn"),i=document.querySelector("#add-list"),u=document.querySelectorAll(".close");function d(){r.style.display="none",l.style.display="none"}n.classList.toggle("rotate"),i.classList.toggle("hidden"),o.style.height="0px",n.addEventListener("click",(function(){n.classList.toggle("rotate"),i.classList.toggle("hidden"),"0px"===o.style.height?o.style.height="130px":o.style.height="0px"})),i.addEventListener("click",(function(){r.style.display="block"})),c.addEventListener("click",(function(){l.style.display="block"})),window.addEventListener("click",(function(e){e.target!==r&&e.target!==l||(r.style.display="none",l.style.display="none")})),u.forEach(e=>e.addEventListener("click",d))}]);