!function(e){var t={};function n(r){if(t[r])return t[r].exports;var o=t[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)n.d(r,o,function(t){return e[t]}.bind(null,o));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=0)}([function(e,t,n){"use strict";n.r(t);const r=document.querySelector("#my-modal1"),o=document.querySelector("#my-modal2");var s=()=>{const e=document.querySelector("#dropdown"),t=document.querySelector(".projects-list"),n=document.querySelectorAll(".project-item"),s=document.querySelector(".project-title"),i=document.querySelector("#modal-btn"),l=document.querySelector("#add-list"),a=document.querySelectorAll(".close");function c(){r.style.display="none",o.style.display="none"}s.innerHTML="",s.innerHTML=""+n[0].innerHTML,e.classList.toggle("rotate"),l.classList.toggle("hidden"),t.style.height="0px",e.addEventListener("click",(function(){e.classList.toggle("rotate"),l.classList.toggle("hidden"),"0px"===t.style.height?t.style.height="130px":t.style.height="0px"})),l.addEventListener("click",(function(){r.style.display="block"})),i.addEventListener("click",(function(){o.style.display="block"})),window.addEventListener("click",(function(e){e.target!==r&&e.target!==o||(r.style.display="none",o.style.display="none")})),a.forEach(e=>e.addEventListener("click",c))};function i(e){this.title=e}function l(e,t,n,r,o){this.title=e,this.description=t,this.date=n,this.priority=r,this.id=Date.now().toString()}const a=document.querySelector(".projects-list"),c=document.querySelector(".tasklist"),d=document.querySelector("#task-card");let u=[],f=[];function g(e){let t=new i(e);var n;(n=t,u.some(e=>{if(e.title.toLowerCase()===n.title.toLowerCase())return!0}))||(u.push(t),h())}function p(e,t,n,r){let o=new l(e,t,n,r);var s;(s=o,f.some(e=>{if(e.title.toLowerCase()===s.title.toLowerCase())return!0}))||(f.push(o),h())}function h(){a.innerHTML="",c.innerHTML="",v(),u.forEach(e=>{a.innerHTML+=`\n        <li class="project-item">${e.title}</li>\n        `}),f.forEach((e,t)=>{c.innerHTML+=`\n        <li class="task-item" data-key=${t}>${e.title}</li>\n        `}),m(0)}function m(e){d.innerHTML="",v(),d.innerHTML+=`\n        <div class="task-content">\n            <h2 data-key="${f[e].id}">${f[e].title}</h2>\n            <h4>Priority - <button class="priority-btn"><span class="priority">${f[e].priority.charAt(0).toUpperCase()+f[e].priority.slice(1)}</span></button></h4>\n            <p class="description">${f[e].description}</p>\n            <p class="date-text">\n                Due date :\n            </p>\n            <div class="date">\n                ${f[e].date}\n            </div>\n        </div>\n\n        <footer class="btns">\n            <div class="task-btns">\n                <button id="btn-task" class="btn-delete">\n                    <span class="delete"><svg class="del-mark" width="24" height="24" viewBox="0 0 24 24"><defs><filter id="delete-task_icon_svg__svg-404750943-a" width="113.1%" height="186.8%" x="-6.6%" y="-43.4%" filterUnits="objectBoundingBox"><feOffset in="SourceAlpha" result="shadowOffsetOuter1"></feOffset><feGaussianBlur in="shadowOffsetOuter1" result="shadowBlurOuter1" stdDeviation="7.5"></feGaussianBlur><feColorMatrix in="shadowBlurOuter1" result="shadowMatrixOuter1" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.12 0"></feColorMatrix><feMerge><feMergeNode in="shadowMatrixOuter1"></feMergeNode><feMergeNode in="SourceGraphic"></feMergeNode></feMerge></filter><path id="delete-task_icon_svg__svg-404750943-b" d="M7.476 6.357l.09.077L11.8 10.67l4.234-4.235a.802.802 0 011.209 1.042l-.077.09L12.93 11.8l4.235 4.234a.802.802 0 01-1.042 1.209l-.09-.077L11.8 12.93l-4.234 4.235a.802.802 0 01-1.209-1.042l.077-.09L10.67 11.8 6.434 7.566a.802.802 0 011.042-1.209z"></path></defs><g fill="none" fill-rule="evenodd" filter="url(#delete-task_icon_svg__svg-404750943-a)" transform="translate(-52 -22)"><g transform="translate(52 22)"><mask id="delete-task_icon_svg__svg-404750943-c" fill="#fff"><use xlink:href="#delete-task_icon_svg__svg-404750943-b"></use></mask><use fill="currentColor" fill-rule="nonzero" xlink:href="#delete-task_icon_svg__svg-404750943-b"></use><g fill="currentColor" mask="url(#delete-task_icon_svg__svg-404750943-c)"><path d="M0 0h24v24H0z"></path></g></g></g></svg><span class="delete-panel">Delete task</span></span>\n                </button>\n                <button id="btn-task" class="btn-done">\n                    <span class="done"><svg class="del" width="24" height="24" viewBox="0 -1 24 23"><defs><filter id="mark-as-done_icon_svg__svg-253777825-a" width="113.1%" height="186.8%" x="-6.6%" y="-43.4%" filterUnits="objectBoundingBox"><feOffset in="SourceAlpha" result="shadowOffsetOuter1"></feOffset><feGaussianBlur in="shadowOffsetOuter1" result="shadowBlurOuter1" stdDeviation="7.5"></feGaussianBlur><feColorMatrix in="shadowBlurOuter1" result="shadowMatrixOuter1" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.12 0"></feColorMatrix><feMerge><feMergeNode in="shadowMatrixOuter1"></feMergeNode><feMergeNode in="SourceGraphic"></feMergeNode></feMerge></filter><path id="mark-as-done_icon_svg__svg-253777825-b" d="M19.234 6.434a.802.802 0 011.209 1.042l-.077.09-8.8 8.8a.8.8 0 01-1.042.077l-.09-.077-4-4a.802.802 0 011.042-1.209l.09.077L11 14.67l8.234-8.235z"></path></defs><g fill="none" fill-rule="evenodd" filter="url(#mark-as-done_icon_svg__svg-253777825-a)" transform="translate(-266 -22)"><g transform="translate(266 22)"><mask id="mark-as-done_icon_svg__svg-253777825-c" fill="#fff"><use xlink:href="#mark-as-done_icon_svg__svg-253777825-b"></use></mask><use fill="currentColor" fill-rule="nonzero" xlink:href="#mark-as-done_icon_svg__svg-253777825-b"></use><g fill="currentColor" mask="url(#mark-as-done_icon_svg__svg-253777825-c)"><path d="M1 0h24v24H1z"></path></g></g></g></svg><span class="delete-panel">Mark as done</span></span>\n                </button>\n            </div>\n        </footer>\n    `;const t=document.querySelector(".btn-delete"),n=document.querySelector(".priority-btn");t.addEventListener("click",(function(e){!function(e){const t=f.findIndex(t=>t.title===e.textContent);f.splice(t,1)}(e.currentTarget.parentNode.parentNode.parentNode.children[0].children[0]),location.reload(),h()})),n.addEventListener("click",(function(e){!function(e){const t=f.find(t=>t.title===e.textContent);"high"===t.priority?t.priority="low":"medium"===t.priority?t.priority="high":t.priority="medium"}(e.currentTarget.parentNode.parentNode.children[0]),location.reload(),h()})),"Low"===n.textContent?n.classList.toggle("low"):"Medium"===n.textContent?n.classList.toggle("medium"):n.classList.remove("medium")}function v(){localStorage.setItem("projectList",JSON.stringify(u)),localStorage.setItem("taskList",JSON.stringify(f))}!function(){let e=JSON.parse(localStorage.getItem("projectList")),t=JSON.parse(localStorage.getItem("taskList"));null==t||0===t.length?(p("Eat","Go eat burgers","28-08-2020","High"),localStorage.setItem("taskList",JSON.stringify(f))):(f=t,h()),null==e||0===e.length?(g("Work"),localStorage.setItem("projectList",JSON.stringify(u))):(u=e,h())}(),s();const y=document.querySelector("#project-form"),_=document.querySelector("#task-form"),k=document.querySelectorAll(".task-item"),L=(document.querySelector(".btn-delete"),document.querySelector(".btn-done"));document.querySelector(".priority-btn");y.addEventListener("submit",(function(e){e.preventDefault();g(this.elements.title.value),r.style.display="none",y.reset()})),_.addEventListener("submit",(function(e){e.preventDefault();p(this.elements.title.value,this.elements.description.value,this.elements.duedate.value,this.elements.priority.value),o.style.display="none",_.reset()})),k.forEach(e=>{e.addEventListener("click",(function(t){k.forEach(e=>e.classList.remove("selected")),e.classList.toggle("selected");m(e.dataset.key)}))}),L.addEventListener("click",(function(e){!function(e){const t=document.querySelectorAll(".task-item"),n=f.find(t=>t.title===e.textContent);t.forEach(e=>{e.textContent===n.title?e.classList.toggle("task-done"):e.classList.remove("task-done")})}(e.currentTarget.parentNode.parentNode.parentNode.children[0].children[0])}))}]);