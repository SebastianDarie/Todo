!function(e){var t={};function n(s){if(t[s])return t[s].exports;var r=t[s]={i:s,l:!1,exports:{}};return e[s].call(r.exports,r,r.exports,n),r.l=!0,r.exports}n.m=e,n.c=t,n.d=function(e,t,s){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:s})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var s=Object.create(null);if(n.r(s),Object.defineProperty(s,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)n.d(s,r,function(t){return e[t]}.bind(null,r));return s},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=0)}([function(e,t,n){"use strict";n.r(t);const s=document.querySelector("#my-modal1"),r=document.querySelector("#my-modal2");var o=()=>{const e=document.querySelector("#dropdown"),t=document.querySelector(".projects-list"),n=document.querySelectorAll(".project-item"),o=document.querySelector(".project-title"),i=document.querySelector("#modal-btn"),l=document.querySelector("#add-list"),a=document.querySelectorAll(".close");function c(){s.style.display="none",r.style.display="none"}o.innerHTML="",o.innerHTML=""+n[0].innerHTML,e.classList.toggle("rotate"),l.classList.toggle("hidden"),t.style.height="0px",e.addEventListener("click",(function(){e.classList.toggle("rotate"),l.classList.toggle("hidden"),"0px"===t.style.height?t.style.height="360px":t.style.height="0px"})),l.addEventListener("click",(function(){s.style.display="block"})),i.addEventListener("click",(function(){r.style.display="block"})),window.addEventListener("click",(function(e){e.target!==s&&e.target!==r||(s.style.display="none",r.style.display="none")})),a.forEach(e=>e.addEventListener("click",c))};function i(e){this.title=e}function l(e,t,n,s,r,o){this.title=e,this.description=t,this.date=n,this.priority=s,this.id=Date.now().toString()}const a=document.querySelector(".projects-list"),c=document.querySelector(".tasklist"),d=document.querySelector("#task-card");let u=[],f=[];function g(e){let t=new i(e);var n;(n=t,u.some(e=>{if(e.title.toLowerCase()===n.title.toLowerCase())return!0}))||(u.push(t),h())}function p(e,t,n,s){let r=new l(e,t,n,s);const o=document.querySelector(".project-title").textContent,i=u.findIndex(e=>e.title===o);var a;(r.project=o,a=r,f.some(e=>{if(e.title.toLowerCase()===a.title.toLowerCase())return!0}))||(f.push(r),h(),m(i))}function h(){a.innerHTML="",c.innerHTML="",v(),u.forEach((e,t)=>{a.innerHTML+=`\n        <li class="project-item" data-key=${t}>${e.title}</li>\n        `}),f.forEach((e,t)=>{c.innerHTML+=`\n        <li class="task-item" data-key=${t}>${e.title}</li>\n        `});const e=document.querySelectorAll(".project-item"),t=document.querySelectorAll(".task-item");e.forEach(t=>{t.addEventListener("click",(function(){e.forEach(e=>e.classList.remove("selected")),t.classList.toggle("selected");m(t.dataset.key)}))}),t.forEach(e=>{e.addEventListener("click",(function(){t.forEach(e=>e.classList.remove("selected")),e.classList.toggle("selected");y(e.dataset.key)}))}),y(0)}function m(e){const t=document.querySelector(".project-title");t.innerHTML="",t.innerHTML+=`<h2 class="project-title" data-key=${e}>${u[e].title}</h2>`;const n=u[e];let s=f.filter(e=>e.project===n.title);c.innerHTML="",s.forEach((e,t)=>{t=f.indexOf(e),c.innerHTML+=`\n        <li class="task-item" data-key=${t}>${e.title}</li>\n        `});const r=document.querySelectorAll(".task-item");r.forEach(e=>{e.addEventListener("click",(function(){r.forEach(e=>e.classList.remove("selected")),e.classList.toggle("selected");y(e.dataset.key)}))}),y(f.indexOf(s[0]))}function y(e){d.innerHTML="",v(),d.innerHTML+=`\n        <div class="task-content">\n            <h2 class="key" data-key="${f[e].id}">${f[e].title}</h2>\n            <h4>Priority - <button class="priority-btn"><span class="priority">${f[e].priority.charAt(0).toUpperCase()+f[e].priority.slice(1)}</span></button></h4>\n            <p class="description" contentEditable="true">${f[e].description}</p>\n            <p class="date-text">\n                Due date :\n            </p>\n            <div class="date" contentEditable="true">\n                ${f[e].date}\n            </div>\n        </div>\n\n        <footer class="btns">\n            <div class="task-btns">\n                <button id="btn-task" class="btn-delete">\n                    <span class="delete"><svg class="del-mark" width="24" height="24" viewBox="0 0 24 24"><defs><filter id="delete-task_icon_svg__svg-404750943-a" width="113.1%" height="186.8%" x="-6.6%" y="-43.4%" filterUnits="objectBoundingBox"><feOffset in="SourceAlpha" result="shadowOffsetOuter1"></feOffset><feGaussianBlur in="shadowOffsetOuter1" result="shadowBlurOuter1" stdDeviation="7.5"></feGaussianBlur><feColorMatrix in="shadowBlurOuter1" result="shadowMatrixOuter1" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.12 0"></feColorMatrix><feMerge><feMergeNode in="shadowMatrixOuter1"></feMergeNode><feMergeNode in="SourceGraphic"></feMergeNode></feMerge></filter><path id="delete-task_icon_svg__svg-404750943-b" d="M7.476 6.357l.09.077L11.8 10.67l4.234-4.235a.802.802 0 011.209 1.042l-.077.09L12.93 11.8l4.235 4.234a.802.802 0 01-1.042 1.209l-.09-.077L11.8 12.93l-4.234 4.235a.802.802 0 01-1.209-1.042l.077-.09L10.67 11.8 6.434 7.566a.802.802 0 011.042-1.209z"></path></defs><g fill="none" fill-rule="evenodd" filter="url(#delete-task_icon_svg__svg-404750943-a)" transform="translate(-52 -22)"><g transform="translate(52 22)"><mask id="delete-task_icon_svg__svg-404750943-c" fill="#fff"><use xlink:href="#delete-task_icon_svg__svg-404750943-b"></use></mask><use fill="currentColor" fill-rule="nonzero" xlink:href="#delete-task_icon_svg__svg-404750943-b"></use><g fill="currentColor" mask="url(#delete-task_icon_svg__svg-404750943-c)"><path d="M0 0h24v24H0z"></path></g></g></g></svg><span class="delete-panel">Delete task</span></span>\n                </button>\n                <button id="btn-task" class="btn-done">\n                    <span class="done"><svg class="del" width="24" height="24" viewBox="0 -1 24 23"><defs><filter id="mark-as-done_icon_svg__svg-253777825-a" width="113.1%" height="186.8%" x="-6.6%" y="-43.4%" filterUnits="objectBoundingBox"><feOffset in="SourceAlpha" result="shadowOffsetOuter1"></feOffset><feGaussianBlur in="shadowOffsetOuter1" result="shadowBlurOuter1" stdDeviation="7.5"></feGaussianBlur><feColorMatrix in="shadowBlurOuter1" result="shadowMatrixOuter1" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.12 0"></feColorMatrix><feMerge><feMergeNode in="shadowMatrixOuter1"></feMergeNode><feMergeNode in="SourceGraphic"></feMergeNode></feMerge></filter><path id="mark-as-done_icon_svg__svg-253777825-b" d="M19.234 6.434a.802.802 0 011.209 1.042l-.077.09-8.8 8.8a.8.8 0 01-1.042.077l-.09-.077-4-4a.802.802 0 011.042-1.209l.09.077L11 14.67l8.234-8.235z"></path></defs><g fill="none" fill-rule="evenodd" filter="url(#mark-as-done_icon_svg__svg-253777825-a)" transform="translate(-266 -22)"><g transform="translate(266 22)"><mask id="mark-as-done_icon_svg__svg-253777825-c" fill="#fff"><use xlink:href="#mark-as-done_icon_svg__svg-253777825-b"></use></mask><use fill="currentColor" fill-rule="nonzero" xlink:href="#mark-as-done_icon_svg__svg-253777825-b"></use><g fill="currentColor" mask="url(#mark-as-done_icon_svg__svg-253777825-c)"><path d="M1 0h24v24H1z"></path></g></g></g></svg><span class="delete-panel">Mark as done</span></span>\n                </button>\n            </div>\n        </footer>\n    `;const t=f[e].project,n=u.findIndex(e=>e.title===t),s=document.querySelector(".btn-done"),r=document.querySelector(".btn-delete"),o=document.querySelector(".priority-btn");s.addEventListener("click",(function(e){const t=document.querySelectorAll(".task-item");let n=e.currentTarget.parentNode.parentNode.parentNode.children[0].children[0];const s=f.find(e=>e.title===n.textContent);t.forEach(e=>{e.textContent===s.title?e.classList.toggle("task-done"):e.classList.remove("task-done")})})),r.addEventListener("click",(function(e){let t=e.currentTarget.parentNode.parentNode.parentNode.children[0].children[0];!function(e){f.splice(e,1)}(f.findIndex(e=>e.id===t.dataset.key)),h(),y(0),m(n)})),o.addEventListener("click",(function(e){let t=e.currentTarget.parentNode.parentNode.children[0];const n=f.findIndex(e=>e.id===t.dataset.key);!function(e){const t=f.find(t=>t.title===e.textContent);"high"===t.priority?t.priority="low":"medium"===t.priority?t.priority="high":t.priority="medium"}(t),y(n)})),"Low"===o.textContent?o.classList.toggle("low"):"Medium"===o.textContent?o.classList.toggle("medium"):o.classList.remove("medium")}function v(){localStorage.setItem("projectList",JSON.stringify(u)),localStorage.setItem("taskList",JSON.stringify(f))}!function(){let e=JSON.parse(localStorage.getItem("projectList")),t=JSON.parse(localStorage.getItem("taskList"));null==t||0===t.length?(p("Eat","Go eat burgers","28-08-2020","High"),localStorage.setItem("taskList",JSON.stringify(f))):(f=t,h()),null==e||0===e.length?(g("Work"),localStorage.setItem("projectList",JSON.stringify(u))):(u=e,h())}(),o();const k=document.querySelector("#project-form"),L=document.querySelector("#task-form"),_=document.querySelectorAll(".project-item"),S=document.querySelectorAll(".task-item");k.addEventListener("submit",(function(e){e.preventDefault();g(this.elements.title.value),s.style.display="none",k.reset()})),L.addEventListener("submit",(function(e){e.preventDefault();p(this.elements.title.value,this.elements.description.value,this.elements.duedate.value,this.elements.priority.value),r.style.display="none",L.reset()})),_.forEach(e=>{e.addEventListener("click",(function(){_.forEach(e=>e.classList.remove("selected")),e.classList.toggle("selected");m(e.dataset.key)}))}),S.forEach(e=>{e.addEventListener("click",(function(){S.forEach(e=>e.classList.remove("selected")),e.classList.toggle("selected");y(e.dataset.key)}))})}]);