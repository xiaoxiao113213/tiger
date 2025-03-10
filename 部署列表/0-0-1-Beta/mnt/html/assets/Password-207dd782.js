import{bp as e,r as t,bq as a}from"./index-52537ad8.js";import{i as l,_ as s,A as o,o as r,f as n,I as u,D as f,r as i,d}from"./Input-33d09d13.js";var c={},p={exports:{}},v={},b={};Object.defineProperty(b,"__esModule",{value:!0});b.default={icon:{tag:"svg",attrs:{viewBox:"64 64 896 896",focusable:"false"},children:[{tag:"path",attrs:{d:"M942.2 486.2Q889.47 375.11 816.7 305l-50.88 50.88C807.31 395.53 843.45 447.4 874.7 512 791.5 684.2 673.4 766 512 766q-72.67 0-133.87-22.38L323 798.75Q408 838 512 838q288.3 0 430.2-300.3a60.29 60.29 0 000-51.5zm-63.57-320.64L836 122.88a8 8 0 00-11.32 0L715.31 232.2Q624.86 186 512 186q-288.3 0-430.2 300.3a60.3 60.3 0 000 51.5q56.69 119.4 136.5 191.41L112.48 835a8 8 0 000 11.31L155.17 889a8 8 0 0011.31 0l712.15-712.12a8 8 0 000-11.32zM149.3 512C232.6 339.8 350.7 258 512 258c54.54 0 104.13 9.36 149.12 28.39l-70.3 70.3a176 176 0 00-238.13 238.13l-83.42 83.42C223.1 637.49 183.3 582.28 149.3 512zm246.7 0a112.11 112.11 0 01146.2-106.69L401.31 546.2A112 112 0 01396 512z"}},{tag:"path",attrs:{d:"M508 624c-3.46 0-6.87-.16-10.25-.47l-52.82 52.82a176.09 176.09 0 00227.42-227.42l-52.82 52.82c.31 3.38.47 6.79.47 10.25a111.94 111.94 0 01-112 112z"}}]},name:"eye-invisible",theme:"outlined"};var m=l.default,x=e.default;Object.defineProperty(v,"__esModule",{value:!0}),v.default=void 0;var y=x(s),g=m(t),O=x(b),C=x(o),_=function(e,t){return g.createElement(C.default,(0,y.default)({},e,{ref:t,icon:O.default}))},j=g.forwardRef(_);v.default=j,function(e,t){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var a;const l=(a=v)&&a.__esModule?a:{default:a};t.default=l,e.exports=l}(p,p.exports);var M=p.exports,P={exports:{}},w={},z={};Object.defineProperty(z,"__esModule",{value:!0});z.default={icon:{tag:"svg",attrs:{viewBox:"64 64 896 896",focusable:"false"},children:[{tag:"path",attrs:{d:"M942.2 486.2C847.4 286.5 704.1 186 512 186c-192.2 0-335.4 100.5-430.2 300.3a60.3 60.3 0 000 51.5C176.6 737.5 319.9 838 512 838c192.2 0 335.4-100.5 430.2-300.3 7.7-16.2 7.7-35 0-51.5zM512 766c-161.3 0-279.4-81.8-362.7-254C232.6 339.8 350.7 258 512 258c161.3 0 279.4 81.8 362.7 254C791.5 684.2 673.4 766 512 766zm-4-430c-97.2 0-176 78.8-176 176s78.8 176 176 176 176-78.8 176-176-78.8-176-176-176zm0 288c-61.9 0-112-50.1-112-112s50.1-112 112-112 112 50.1 112 112-50.1 112-112 112z"}}]},name:"eye",theme:"outlined"};var h=l.default,E=e.default;Object.defineProperty(w,"__esModule",{value:!0}),w.default=void 0;var R=E(s),q=h(t),L=E(z),k=E(o),D=function(e,t){return q.createElement(k.default,(0,R.default)({},e,{ref:t,icon:L.default}))},I=q.forwardRef(D);w.default=I,function(e,t){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var a;const l=(a=w)&&a.__esModule?a:{default:a};t.default=l,e.exports=l}(P,P.exports);var N=P.exports,Q=e.default,S=l.default;Object.defineProperty(c,"__esModule",{value:!0});var $=c.default=void 0,A=S(t),B=A,T=Q(M),V=Q(N),U=Q(a),F=Q(r),G=i,H=d,J=Q(n),K=Q(u),W=Q(f);const X=e=>e?B.createElement(V.default,null):B.createElement(T.default,null),Y={click:"onClick",hover:"onMouseOver"},Z=B.forwardRef(((e,t)=>{const{disabled:a,action:l="click",visibilityToggle:s=!0,iconRender:o=X}=e,r=B.useContext(W.default),n=null!=a?a:r,u="object"==typeof s&&void 0!==s.visible,[f,i]=(0,A.useState)((()=>!!u&&s.visible)),d=(0,A.useRef)(null);B.useEffect((()=>{u&&i(s.visible)}),[u,s]);const c=(0,J.default)(d),p=()=>{n||(f&&c(),i((e=>{var t;const a=!e;return"object"==typeof s&&(null===(t=s.onVisibleChange)||void 0===t||t.call(s,a)),a})))},{className:v,prefixCls:b,inputPrefixCls:m,size:x}=e,y=function(e,t){var a={};for(var l in e)Object.prototype.hasOwnProperty.call(e,l)&&t.indexOf(l)<0&&(a[l]=e[l]);if(null!=e&&"function"==typeof Object.getOwnPropertySymbols){var s=0;for(l=Object.getOwnPropertySymbols(e);s<l.length;s++)t.indexOf(l[s])<0&&Object.prototype.propertyIsEnumerable.call(e,l[s])&&(a[l[s]]=e[l[s]])}return a}(e,["className","prefixCls","inputPrefixCls","size"]),{getPrefixCls:g}=B.useContext(H.ConfigContext),O=g("input",m),C=g("input-password",b),_=s&&(e=>{const t=Y[l]||"",a=o(f),s={[t]:p,className:`${e}-icon`,key:"passwordIcon",onMouseDown:e=>{e.preventDefault()},onMouseUp:e=>{e.preventDefault()}};return B.cloneElement(B.isValidElement(a)?a:B.createElement("span",null,a),s)})(C),j=(0,U.default)(C,v,{[`${C}-${x}`]:!!x}),M=Object.assign(Object.assign({},(0,F.default)(y,["suffix","iconRender","visibilityToggle"])),{type:f?"text":"password",className:j,prefixCls:O,suffix:_});return x&&(M.size=x),B.createElement(K.default,Object.assign({ref:(0,G.composeRef)(t,d)},M))}));$=c.default=Z;export{N as E,c as P,$ as d};
