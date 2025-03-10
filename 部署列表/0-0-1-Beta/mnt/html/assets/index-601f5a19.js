import{w as e}from"./index-9747001a.js";import{c as t,E as n,S as r}from"./index-308ab40d.js";import{e as i}from"./index-aaa2f117.js";import{p as o}from"./index-c7af2da5.js";import{v as l}from"./index-1fe765b2.js";import{t as a}from"./index-5adc07c7.js";import"./index-f2321b57.js";const c=function(e,t,n,r,i){const o=s(t);if(null!=n&&("number"!=typeof n||n<0||n===Number.POSITIVE_INFINITY))throw new Error("Expected positive finite index for child node");if(!(null==r||r.type&&r.children))throw new Error("Expected parent node");if(!e||!e.type||"string"!=typeof e.type)return!1;if(null==r!=(null==n))throw new Error("Expected both parent and index");return o.call(i,e,n,r)},s=function(e){if(null==e)return p;if("string"==typeof e)return function(e){return t;function t(t){return p(t)&&t.tagName===e}}(e);if("object"==typeof e)return function(e){const t=[];let n=-1;for(;++n<e.length;)t[n]=s(e[n]);return u(r);function r(...e){let n=-1;for(;++n<t.length;)if(t[n].call(this,...e))return!0;return!1}}(e);if("function"==typeof e)return u(e);throw new Error("Expected function, string, or array as test")};function u(e){return function(t,...n){return p(t)&&Boolean(e.call(this,t,...n))}}function p(e){return Boolean(e&&"object"==typeof e&&"element"===e.type&&"string"==typeof e.tagName)}const d=s(["audio","canvas","embed","iframe","img","math","object","picture","svg","video"]),h=["address","article","aside","blockquote","body","br","caption","center","col","colgroup","dd","dialog","dir","div","dl","dt","figcaption","figure","footer","form","h1","h2","h3","h4","h5","h6","head","header","hgroup","hr","html","legend","li","li","listing","main","menu","nav","ol","optgroup","option","p","plaintext","pre","section","summary","table","tbody","td","td","tfoot","th","th","thead","tr","ul","wbr","xmp"],f=["button","input","select","textarea"],g=["area","base","basefont","dialog","datalist","head","link","meta","noembed","noframes","param","rp","script","source","style","template","track","title"],m=t(["doctype","comment"]);function y(e={}){const t=function(e){return t;function t(t){return String(t).replace(/[\t\n\v\f\r ]+/g,e)}}(e.newlines?A:I);return e=>{b(e,{collapse:t,whitespace:"normal"})}}function b(e,t){if("children"in e){const n=Object.assign({},t);return("root"===e.type||k(e))&&(n.before=!0,n.after=!0),n.whitespace=function(e,t){if("tagName"in e&&e.properties)switch(e.tagName){case"listing":case"plaintext":case"script":case"style":case"xmp":return"pre";case"nobr":return"nowrap";case"pre":return e.properties.wrap?"pre-wrap":"pre";case"td":case"th":return e.properties.noWrap?"nowrap":t.whitespace;case"textarea":return"pre-wrap"}return t.whitespace}(e,t),function(e,t){let n=t.before;const r=t.after,i=e.children;let o=i.length,l=-1;for(;++l<o;){const e=b(i[l],Object.assign({},t,{before:n,after:x(i,l,r)}));e.remove?(i.splice(l,1),l--,o--):e.ignore||(n=e.stripAtStart),v(i[l])&&(n=!1)}return{remove:!1,ignore:!1,stripAtStart:Boolean(n||r)}}(e,n)}if("text"===e.type){if("normal"===t.whitespace)return function(e,t){const n=t.collapse(e.value),r={remove:!1,ignore:!1,stripAtStart:!1};let i=0,o=n.length;t.before&&N(n.charAt(0))&&i++;i!==o&&N(n.charAt(o-1))&&(t.after?o--:r.stripAtStart=!0);i===o?r.remove=!0:e.value=n.slice(i,o);return r}(e,t);"nowrap"===t.whitespace&&(e.value=t.collapse(e.value))}return{remove:!1,ignore:m(e),stripAtStart:!1}}function x(e,t,n){for(;++t<e.length;){const n=e[t];let r=w(n);if(void 0===r&&"children"in n&&!S(n)&&(r=x(n.children,-1)),"boolean"==typeof r)return r}return n}function w(t){if("element"===t.type){if(v(t))return!1;if(k(t))return!0}else if("text"===t.type){if(!e(t))return!1}else if(!m(t))return!1}function v(e){return d(e)||c(e,f)}function k(e){return c(e,h)}function S(e){return Boolean("properties"in e&&e.properties&&e.properties.hidden)||m(e)||c(e,g)}function N(e){return" "===e||"\n"===e}function A(e){const t=/\r?\n|\r/.exec(e);return t?t[0]:" "}function I(){return" "}function j(e,t){const n=t.children||[],r=[];let i=-1;for(;++i<n.length;){const o=T(e,n[i],t);Array.isArray(o)?r.push(...o):o&&r.push(o)}let o=0,l=r.length;for(;o<l&&"break"===r[o].type;)o++;for(;l>o&&"break"===r[l-1].type;)l--;return 0===o&&l===r.length?r:r.slice(o,l)}const B={}.hasOwnProperty;function E(e,t){return e.wrapText?t:t.replace(/\r?\n|\r/g," ")}function T(e,t,n){let r;if("element"===t.type){if(t.properties&&"ignore"===t.properties.dataMdast)return;B.call(e.handlers,t.tagName)&&(r=e.handlers[t.tagName])}else B.call(e.handlers,t.type)&&(r=e.handlers[t.type]);return"function"==typeof r?r(e,t,n):function(e,t){if("string"==typeof t.value)return e(t,"text",E(e,t.value));return j(e,t)}(e,t)}const q={}.hasOwnProperty;function C(e,t){const n="string"==typeof t&&function(e){return Boolean(e&&"object"==typeof e&&"type"in e)}(e)&&"element"===e.type&&e.properties&&q.call(e.properties,t)&&e.properties[t];return null!=n&&!1!==n}const O=new Set(["pingback","prefetch","stylesheet"]);const P=s(["a","abbr","area","b","bdi","bdo","br","button","cite","code","data","datalist","del","dfn","em","i","input","ins","kbd","keygen","label","map","mark","meter","noscript","output","progress","q","ruby","s","samp","script","select","small","span","strong","sub","sup","template","textarea","time","u","var","wbr"]),U=s("meta");function F(e){return Boolean(function(e){return e&&"object"==typeof e&&"type"in e}(e)&&("text"===e.type||P(e)||d(e)||function(e){if(!c(e,"link"))return!1;if(C(e,"itemProp"))return!0;const t=(e.properties||{}).rel||[];let n=-1;if(!Array.isArray(t)||0===t.length)return!1;for(;++n<t.length;)if(!O.has(String(t[n])))return!1;return!0}(e)||U(e)&&C(e,"itemProp")))}function z(e){return M(e,(function(e){const t=e[0];if(1===e.length&&"text"===t.type&&(" "===t.value||"\n"===t.value))return[];return{type:"paragraph",children:e}}))}function R(e){let t,n=-1;for(;++n<e.length;)if(t=e[n],!W(t)||"children"in t&&R(t.children))return!0;return!1}function M(e,t,n){const r=n||Y,i=function(e){let t,n=[],r=-1;for(;++r<e.length;)t=e[r],"delete"!==t.type&&"link"!==t.type||!R(t.children)?n.push(t):n=n.concat(V(t));return n}(e);let o,l,a=[],c=-1;for(;++c<i.length;)l=i[c],W(l)?(o||(o=[]),o.push(l)):(o&&(a=a.concat(t(o)),o=void 0),a=a.concat(r(l)));return o&&(a=a.concat(t(o))),a}function V(e){return M(e.children,(function(t){const{children:n,...r}=e;return{...i(!0,{},r),children:t}}),(function(t){if("children"in t&&"children"in e){const{children:n,...r}=e;return{...t,children:[{...i(!0,{},r),children:t.children}]}}return{...t}}))}function W(e){return e.data&&e.data.hName?F({type:"element",tagName:e.data.hName,properties:{},children:[]}):o(e)}function Y(e){return e}function $(e,t){return z(j(e,t))}function _(e,t){return null==t?"":e.frozenBaseUrl?String(new URL(t,e.frozenBaseUrl)):t}const H=function(e,n,r){const i=t(r);if(!e||!e.type||!e.children)throw new Error("Expected parent node");if("number"==typeof n){if(n<0||n===Number.POSITIVE_INFINITY)throw new Error("Expected positive finite number as index")}else if((n=e.children.indexOf(n))<0)throw new Error("Expected child node or index");for(;++n<e.children.length;)if(i(e.children[n],n,e))return e.children[n];return null},L=/\n/g,D=/[\t ]+/g,G=s("br"),J=s("p"),K=s(["th","td"]),Q=s("tr"),X=s(["datalist","head","noembed","noframes","noscript","rp","script","style","template","title",function(e){return Boolean((e.properties||{}).hidden)},function(e){return"dialog"===e.tagName&&!(e.properties||{}).open}]),Z=s(["address","article","aside","blockquote","body","caption","center","dd","dialog","dir","dl","dt","div","figure","figcaption","footer","form,","h1","h2","h3","h4","h5","h6","header","hgroup","hr","html","legend","listing","main","menu","nav","ol","p","plaintext","pre","section","ul","xmp"]);function ee(e,t={}){const n="children"in e?e.children:[],r=Z(e),i=ie(e,{whitespace:t.whitespace||"normal",breakBefore:!1,breakAfter:!1}),o=[];"text"!==e.type&&"comment"!==e.type||o.push(...ne(e,{whitespace:i,breakBefore:!0,breakAfter:!0}));let l=-1;for(;++l<n.length;)o.push(...te(n[l],e,{whitespace:i,breakBefore:l?void 0:r,breakAfter:l<n.length-1?G(n[l+1]):r}));const a=[];let c;for(l=-1;++l<o.length;){const e=o[l];"number"==typeof e?void 0!==c&&e>c&&(c=e):e&&(void 0!==c&&c>-1&&a.push("\n".repeat(c)||" "),c=-1,a.push(e))}return a.join("")}function te(e,t,n){return"element"===e.type?function(e,t,n){const r=ie(e,n),i=e.children||[];let o,l,a=-1,c=[];if(X(e))return c;G(e)||Q(e)&&H(t,e,Q)?l="\n":J(e)?(o=2,l=2):Z(e)&&(o=1,l=1);for(;++a<i.length;)c=c.concat(te(i[a],e,{whitespace:r,breakBefore:a?void 0:o,breakAfter:a<i.length-1?G(i[a+1]):l}));K(e)&&H(t,e,K)&&c.push("\t");o&&c.unshift(o);l&&c.push(l);return c}(e,t,n):"text"===e.type?"normal"===n.whitespace?ne(e,n):function(e){return[String(e.value)]}(e):[]}function ne(e,t){const n=String(e.value),r=[],i=[];let o=0;for(;o<=n.length;){L.lastIndex=o;const e=L.exec(n),i=e&&"index"in e?e.index:n.length;r.push(re(n.slice(o,i).replace(/[\u061C\u200E\u200F\u202A-\u202E\u2066-\u2069]/g,""),0!==o||t.breakBefore,i!==n.length||t.breakAfter)),o=i+1}let l,a=-1;for(;++a<r.length;)8203===r[a].charCodeAt(r[a].length-1)||a<r.length-1&&8203===r[a+1].charCodeAt(0)?(i.push(r[a]),l=void 0):r[a]?("number"==typeof l&&i.push(l),i.push(r[a]),l=0):0!==a&&a!==r.length-1||i.push(0);return i}function re(e,t,n){const r=[];let i,o=0;for(;o<e.length;){D.lastIndex=o;const n=D.exec(e);i=n?n.index:e.length,o||i||!n||t||r.push(""),o!==i&&r.push(e.slice(o,i)),o=n?i+n[0].length:i}return o===i||n||r.push(""),r.join(" ")}function ie(e,t){if("element"===e.type){const n=e.properties||{};switch(e.tagName){case"listing":case"plaintext":case"xmp":return"pre";case"nobr":return"nowrap";case"pre":return n.wrap?"pre-wrap":"pre";case"td":case"th":return n.noWrap?"nowrap":t.whitespace;case"textarea":return"pre-wrap"}}return t.whitespace}const oe="language-",le=s("pre"),ae=s("code");function ce(e,t){const n=t.children;let r,i,o=-1;if(le(t))for(;++o<n.length;){const e=n[o];if(ae(e)&&e.properties&&e.properties.className&&Array.isArray(e.properties.className)){r=e.properties.className;break}}if(r)for(o=-1;++o<r.length;)if(String(r[o]).slice(0,9)===oe){i=String(r[o]).slice(9);break}return e(t,"code",{lang:i||null,meta:null},function(e){const t=String(e);let n=t.length;for(;n>0;){const e=t.codePointAt(n-1);if(void 0===e||10!==e&&13!==e)break;n--}return t.slice(0,n)}(E(e,ee(t))))}function se(e,t){return e(t,"delete",j(e,t))}function ue(e){let t=-1;if(e.length>1)for(;++t<e.length;)if(e[t].spread)return!0;return!1}function pe(e,t){const n=j(e,t);let r=-1;for(;++r<n.length;){const e=n[r];"listItem"!==e.type&&(n[r]={type:"listItem",spread:!1,checked:null,children:[e]})}return n}const de=s("div"),he=s("dt"),fe=s("dd");function ge(e,t){const n=pe(e,{type:"element",tagName:"x",children:t});return 0===n.length?[]:1===n.length?n[0].children:[{type:"list",ordered:!1,start:null,spread:ue(n),children:n}]}function me(e,t){return e(t,"emphasis",j(e,t))}function ye(e,t){const n=Number(t.tagName.charAt(1))||1,r=e.wrapText;e.wrapText=!1;const i=e(t,"heading",{depth:n},j(e,t));return e.wrapText=r,i}function be(e,t){const n=t.properties;return e(t,"image",{url:_(e,String(n.src||"")||null),title:n.title||null,alt:n.alt||""})}function xe(e,t){return e(t,"inlineCode",E(e,ee(t)))}const we=s("option");function ve(e,t,n){const r=n||t.properties;let i=ke(t);const o=Math.min(Number.parseInt(String(r.size),10),0)||(r.multiple?4:1);let l=-1;const a=[],c=[];for(;++l<i.length;)C(i[l],"selected")&&a.push(i[l]);for(i=(a.length>0?a:i).slice(0,o),l=-1;++l<i.length;){const t=i[l],n=E(e,ee(t)),r=t.properties,o=n||String(r.label||""),a=String(r.value||"")||n;c.push([a,o===a?null:o])}return c}function ke(e){const t=e.children;let n,r=-1,i=[];for(;++r<t.length;)n=t[r],Array.isArray(n.children)&&(i=i.concat(ke(n))),we(n)&&!C(n,"disabled")&&i.push(n);return i}const Se=s("datalist");const Ne=s("p"),Ae=s("input");function Ie(e,t){const n=t.children[0];let r,i,o=null;Ne(n)&&(r=n.children[0],Ae(r)&&r.properties&&("checkbox"===r.properties.type||"radio"===r.properties.type)&&(o=Boolean(r.properties.checked),i={...t,children:[{...n,children:n.children.slice(1)},...t.children.slice(1)]}));const l=$(e,i||t);return e(t,"listItem",{spread:l.length>1,checked:o},l)}const je=s("ol");function Be(e,t){const n=je(t),r=pe(e,t);let i=null;return n&&(i=C(t,"start")?Number.parseInt(String(t.properties.start),10):1),e(t,"list",{ordered:n,start:i,spread:ue(r)},r)}const Ee=s("source"),Te=s("video");function qe(e,t){let r=j(e,t);const i=t.properties,o=Te(t)&&String(i.poster||"");let c,s=String(i.src||""),u=-1,p=!1;if(l({type:"root",children:r},"link",(function(){return p=!0,n})),p||R(r))return r;for(;!s&&++u<t.children.length;)c=t.children[u],Ee(c)&&(s=String(c.properties.src||""));return o&&(r=[{type:"image",title:null,url:_(e,o),alt:a({children:r})}]),{type:"link",title:t.properties.title||null,url:_(e,s),children:r}}function Ce(e,t){const n=j(e,t);if(n.length>0)return e(t,"paragraph",n)}function Oe(e,t){return e(t,"strong",j(e,t))}function Pe(e,t){const n=e.wrapText;e.wrapText=!1;const r=e(t,"tableCell",j(e,t));if(t.properties&&(t.properties.rowSpan||t.properties.colSpan)){const e=r.data||(r.data={});t.properties.rowSpan&&(e.rowSpan=t.properties.rowSpan),t.properties.colSpan&&(e.colSpan=t.properties.colSpan)}return e.wrapText=n,r}const Ue=s("thead"),Fe=s("tr"),ze=s(["th","td"]);function Re(e){const t=[];let n,r,i=-1;for(;++i<e.length;)n=e[i],"tableCell"===n.type?(r&&(n.children.unshift(...r),r=void 0),t.push(n)):(r||(r=[]),r.push(n));return r&&(n=t[t.length-1],n||(n={type:"tableCell",children:[]},t.push(n)),n.children.push(...r)),t}const Me={root:function(e,t){let n=j(e,t);return(e.document||R(n))&&(n=z(n)),e(t,"root",n)},text:function(e,t){return e(t,"text",E(e,t.value))},comment:function(e,t){return e(t,"html","\x3c!--"+E(e,t.value)+"--\x3e")},doctype:Ve,applet:Ve,area:Ve,basefont:Ve,bgsound:Ve,caption:Ve,col:Ve,colgroup:Ve,command:Ve,content:Ve,datalist:Ve,dialog:Ve,element:Ve,embed:Ve,frame:Ve,frameset:Ve,isindex:Ve,keygen:Ve,link:Ve,math:Ve,menu:Ve,menuitem:Ve,meta:Ve,nextid:Ve,noembed:Ve,noframes:Ve,optgroup:Ve,option:Ve,param:Ve,script:Ve,shadow:Ve,source:Ve,spacer:Ve,style:Ve,svg:Ve,template:Ve,title:Ve,track:Ve,abbr:j,acronym:j,bdi:j,bdo:j,big:j,blink:j,button:j,canvas:j,cite:j,data:j,details:j,dfn:j,font:j,ins:j,label:j,map:j,marquee:j,meter:j,nobr:j,noscript:j,object:j,output:j,progress:j,rb:j,rbc:j,rp:j,rt:j,rtc:j,ruby:j,slot:j,small:j,span:j,sup:j,sub:j,tbody:j,tfoot:j,thead:j,time:j,address:$,article:$,aside:$,body:$,center:$,div:$,fieldset:$,figcaption:$,figure:$,form:$,footer:$,header:$,hgroup:$,html:$,legend:$,main:$,multicol:$,nav:$,picture:$,section:$,a:function(e,t){const n=t.properties;return e(t,"link",{title:n.title||null,url:_(e,String(n.href||"")||null)},j(e,t))},audio:qe,b:Oe,base:function(e,t){e.baseFound||(e.frozenBaseUrl=String(t.properties&&t.properties.href||"")||null,e.baseFound=!0)},blockquote:function(e,t){return e(t,"blockquote",$(e,t))},br:function(e,t){return e.wrapText?e(t,"break"):e(t,"text"," ")},code:xe,dir:Be,dl:function(e,t){const n=t.children;let r=-1,i=[];const o=[];let l,a,c={titles:[],definitions:[]};for(;++r<n.length;)l=n[r],i=i.concat(de(l)?l.children:l);for(r=-1;++r<i.length;)l=i[r],he(l)?(fe(i[r-1])&&(o.push(c),c={titles:[],definitions:[]}),c.titles.push(l)):c.definitions.push(l);o.push(c),r=-1;const s=[];for(;++r<o.length;)a=[...ge(e,o[r].titles),...ge(e,o[r].definitions)],a.length>0&&s.push({type:"listItem",spread:a.length>1,checked:null,children:a});if(s.length>0)return e(t,"list",{ordered:!1,start:null,spread:ue(s)},s)},dt:Ie,dd:Ie,del:se,em:me,h1:ye,h2:ye,h3:ye,h4:ye,h5:ye,h6:ye,hr:function(e,t){return e(t,"thematicBreak")},i:me,iframe:function(e,t){const n=t.properties,r=String(n.src||""),i=String(n.title||"");if(r&&i)return{type:"link",title:null,url:_(e,r),children:[{type:"text",value:E(e,i)}]}},img:be,image:be,input:function(e,t){const n=t.properties;let r=String(n.value||n.placeholder||"");const i=[],o=[];let l,a=[],c=-1;if(!n.disabled&&"hidden"!==n.type&&"file"!==n.type){if("checkbox"===n.type||"radio"===n.type)return e(t,"text",E(e,e[n.checked?"checked":"unchecked"]));if("image"===n.type)return n.alt||r?e(t,"image",{url:_(e,String(n.src||"")||null),title:E(e,String(n.title||""))||null,alt:E(e,String(n.alt||r))}):[];if(r?a=[[r,null]]:"password"!==n.type&&"file"!==n.type&&"submit"!==n.type&&"reset"!==n.type&&"button"!==n.type&&n.list&&(l=String(n.list).toUpperCase(),B.call(e.nodeById,l)&&Se(e.nodeById[l])&&(a=ve(e,e.nodeById[l],n))),0!==a.length){if("password"===n.type&&(a[0]=["•".repeat(a[0][0].length),null]),"url"===n.type||"email"===n.type){for(;++c<a.length;)r=_(e,a[c][0]),i.push(e(t,"link",{title:null,url:E(e,"email"===n.type?"mailto:"+r:r)},[{type:"text",value:E(e,a[c][1]||r)}])),c!==a.length-1&&i.push({type:"text",value:", "});return i}for(;++c<a.length;)o.push(a[c][1]?a[c][1]+" ("+a[c][0]+")":a[c][0]);return e(t,"text",E(e,o.join(", ")))}}},kbd:xe,li:Ie,listing:ce,mark:me,ol:Be,p:Ce,plaintext:ce,pre:ce,q:function(e,t){const n=e.quotes[e.qNesting%e.quotes.length];e.qNesting++;const r=j(e,t);return e.qNesting--,r.unshift({type:"text",value:n.charAt(0)}),r.push({type:"text",value:n.length>1?n.charAt(1):n}),r},s:se,samp:xe,select:function(e,t){const n=ve(e,t);let r=-1;const i=[];let o;for(;++r<n.length;)o=n[r],i.push(o[1]?o[1]+" ("+o[0]+")":o[0]);if(i.length>0)return e(t,"text",E(e,i.join(", ")))},strike:se,strong:Oe,summary:Ce,table:function(e,t){if(e.inTable)return e(t,"text",E(e,ee(t)));e.inTable=!0;const{headless:n,align:i}=function(e){let t=!0,n=0,i=0;const o=[null];return l(e,"element",(l=>{if("table"===l.tagName&&e!==l)return r;ze(l)&&l.properties?(o[i]||(o[i]=String(l.properties.align||"")||null),t&&n<2&&"th"===l.tagName&&(t=!1),i++):Ue(l)?t=!1:Fe(l)&&(n++,i=0)})),{align:o,headless:t}}(t),o=function(e,t){let n=-1;const r=[];let i;t&&r.push({type:"tableRow",children:[]});for(;++n<e.length;){const t=e[n];"tableRow"===t.type?(i&&(t.children.unshift(...i),i=void 0),r.push(t)):(i||(i=[]),i.push(t))}i&&r[r.length-1].children.push(...i);n=-1;for(;++n<r.length;)r[n].children=Re(r[n].children);return r}(j(e,t),n);let a=1,c=-1;for(;++c<o.length;){const e=o[c].children;let t=-1;for(;++t<e.length;){const n=e[t];if(n.data){const e=Number.parseInt(String(n.data.colSpan),10)||1,r=Number.parseInt(String(n.data.rowSpan),10)||1;if(e>1||r>1){let n=c-1;for(;++n<c+r;){let r=t-1;for(;++r<t+e&&o[n];){const e=[];n===c&&r===t||e.push({type:"tableCell",children:[]}),o[n].children.splice(r,0,...e)}}}"colSpan"in n.data&&delete n.data.colSpan,"rowSpan"in n.data&&delete n.data.rowSpan,0===Object.keys(n.data).length&&delete n.data}}e.length>a&&(a=e.length)}for(c=-1;++c<o.length;){const e=o[c].children;let t=e.length-1;for(;++t<a;)e.push({type:"tableCell",children:[]})}let s=i.length-1;for(;++s<a;)i.push(null);return e.inTable=!1,e(t,"table",{align:i},o)},td:Pe,textarea:function(e,t){return e(t,"text",E(e,ee(t)))},th:Pe,tr:function(e,t){return e(t,"tableRow",j(e,t))},tt:xe,u:me,ul:Be,var:xe,video:qe,wbr:function(e,t){return e(t,"text","​")},xmp:ce};function Ve(){}const We=t(["heading","paragraph","root"]);function Ye(e,t={}){const n={};let r;const i=Object.assign(((e,t,n,r)=>{let i;"string"==typeof n||Array.isArray(n)?(r=n,i={}):i=n;const o={type:t,...i};return"string"==typeof r?o.value=r:r&&(o.children=r),e.position&&(o.position=e.position),o}),{nodeById:n,baseFound:!1,inTable:!1,wrapText:!0,frozenBaseUrl:null,qNesting:0,handlers:t.handlers?{...Me,...t.handlers}:Me,document:t.document,checked:t.checked||"[x]",unchecked:t.unchecked||"[ ]",quotes:t.quotes||['"']});l(e,"element",(e=>{const t=e.properties&&"id"in e.properties&&String(e.properties.id).toUpperCase();t&&!B.call(n,t)&&(n[t]=e)})),y({newlines:!0===t.newlines})(e);const o=T(i,e,void 0);return r=o?Array.isArray(o)?{type:"root",children:o}:o:{type:"root",children:[]},l(r,"text",(function(e,t,n){if(null===t||!n)return;const r=n.children[t-1];if(r&&r.type===e.type)return r.value+=e.value,n.children.splice(t,1),r.position&&e.position&&(r.position.end=e.position.end),t-1;e.value=e.value.replace(/[\t ]*(\r?\n|\r)[\t ]*/,"$1"),n&&We(n)&&(t||(e.value=e.value.replace(/^[\t ]+/,"")),t===n.children.length-1&&(e.value=e.value.replace(/[\t ]+$/,"")));if(!e.value)return n.children.splice(t,1),t})),r}const $e=function(e,t){let n,r;return"function"==typeof e?(r=e,n=t||{}):n=e||{},void 0!==n.document&&null!==n.document||(n=Object.assign({},n,{document:!0})),r?function(e,t){return(n,r,i)=>{e.run(Ye(n,t),r,(e=>{i(e)}))}}(r,n):function(e={}){return t=>Ye(t,e)}(n)};export{j as all,$e as default,Me as defaultHandlers,T as one};
