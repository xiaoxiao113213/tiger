import{i as t,u as e,j as r,B as n}from"./index-10719960.js";var l={color:void 0,size:void 0,className:void 0,style:void 0,attr:void 0},o=t.createContext&&t.createContext(l),a=globalThis&&globalThis.__assign||function(){return a=Object.assign||function(t){for(var e,r=1,n=arguments.length;r<n;r++)for(var l in e=arguments[r])Object.prototype.hasOwnProperty.call(e,l)&&(t[l]=e[l]);return t},a.apply(this,arguments)},i=globalThis&&globalThis.__rest||function(t,e){var r={};for(var n in t)Object.prototype.hasOwnProperty.call(t,n)&&e.indexOf(n)<0&&(r[n]=t[n]);if(null!=t&&"function"==typeof Object.getOwnPropertySymbols){var l=0;for(n=Object.getOwnPropertySymbols(t);l<n.length;l++)e.indexOf(n[l])<0&&Object.prototype.propertyIsEnumerable.call(t,n[l])&&(r[n[l]]=t[n[l]])}return r};function s(e){return e&&e.map((function(e,r){return t.createElement(e.tag,a({key:r},e.attr),s(e.child))}))}function c(e){return function(r){return t.createElement(u,a({attr:a({},e.attr)},r),s(e.child))}}function u(e){var r=function(r){var n,l=e.attr,o=e.size,s=e.title,c=i(e,["attr","size","title"]),u=o||r.size||"1em";return r.className&&(n=r.className),e.className&&(n=(n?n+" ":"")+e.className),t.createElement("svg",a({stroke:"currentColor",fill:"currentColor",strokeWidth:"0"},r.attr,l,c,{className:n,style:a(a({color:e.color||r.color},r.style),e.style),height:u,width:u,xmlns:"http://www.w3.org/2000/svg"}),s&&t.createElement("title",null,s),e.children)};return void 0!==o?t.createElement(o.Consumer,null,(function(t){return r(t)})):r(l)}function f(t){return c({tag:"svg",attr:{viewBox:"0 0 24 24"},child:[{tag:"path",attr:{fill:"none",d:"M0 0h24v24H0z"}},{tag:"path",attr:{d:"M17.77 3.77L16 2 6 12l10 10 1.77-1.77L9.54 12z"}}]})(t)}function h({onClick:t}){const{t:l}=e();return r.jsx(n,{block:!0,type:"link",onClick:t,children:r.jsxs("div",{className:"flex items-center justify-center hover:underline",children:[r.jsx(f,{}),r.jsx("span",{className:"text-sm",children:l("sys.login.backSignIn")})]})})}export{h as ReturnButton};
