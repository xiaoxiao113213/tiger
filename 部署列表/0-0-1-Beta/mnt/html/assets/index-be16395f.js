import{i as e,r as t,cd as n,bI as l,at as o,b9 as a,ba as r,bh as i,bX as s,bi as c,bb as d,bw as m,bt as b}from"./index-10719960.js";const p={xxl:3,xl:3,lg:3,md:3,sm:2,xs:1},g=e.createContext({});var y=globalThis&&globalThis.__rest||function(e,t){var n={};for(var l in e)Object.prototype.hasOwnProperty.call(e,l)&&t.indexOf(l)<0&&(n[l]=e[l]);if(null!=e&&"function"==typeof Object.getOwnPropertySymbols){var o=0;for(l=Object.getOwnPropertySymbols(e);o<l.length;o++)t.indexOf(l[o])<0&&Object.prototype.propertyIsEnumerable.call(e,l[o])&&(n[l[o]]=e[l[o]])}return n};function f(e,o,a){const r=t.useMemo((()=>o||l(a).map((e=>Object.assign(Object.assign({},null==e?void 0:e.props),{key:e.key})))),[o,a]);return t.useMemo((()=>r.map((t=>{var{span:l}=t,o=y(t,["span"]);return"filled"===l?Object.assign(Object.assign({},o),{filled:!0}):Object.assign(Object.assign({},o),{span:"number"==typeof l?l:n(e,l)})}))),[r,e])}var u=globalThis&&globalThis.__rest||function(e,t){var n={};for(var l in e)Object.prototype.hasOwnProperty.call(e,l)&&t.indexOf(l)<0&&(n[l]=e[l]);if(null!=e&&"function"==typeof Object.getOwnPropertySymbols){var o=0;for(l=Object.getOwnPropertySymbols(e);o<l.length;o++)t.indexOf(l[o])<0&&Object.prototype.propertyIsEnumerable.call(e,l[o])&&(n[l[o]]=e[l[o]])}return n};const $=(e,n)=>{const[l,o]=t.useMemo((()=>function(e,t){let n=[],l=[],o=!1,a=0;return e.filter((e=>e)).forEach((e=>{const{filled:r}=e,i=u(e,["filled"]);if(r)return l.push(i),n.push(l),l=[],void(a=0);const s=t-a;a+=e.span||1,a>=t?(a>t?(o=!0,l.push(Object.assign(Object.assign({},i),{span:s}))):l.push(i),n.push(l),l=[],a=0):l.push(i)})),l.length>0&&n.push(l),n=n.map((e=>{const n=e.reduce(((e,t)=>e+(t.span||1)),0);return n<t?(e[e.length-1].span=t-n+1,e):e})),[n,o]}(n,e)),[n,e]);return l},h=e=>{let{children:t}=e;return t};function O(e){return null!=e}const x=e=>{const{itemPrefixCls:n,component:l,span:a,className:r,style:i,labelStyle:s,contentStyle:c,bordered:d,label:m,content:b,colon:p,type:g}=e,y=l;return d?t.createElement(y,{className:o({[`${n}-item-label`]:"label"===g,[`${n}-item-content`]:"content"===g},r),style:i,colSpan:a},O(m)&&t.createElement("span",{style:s},m),O(b)&&t.createElement("span",{style:c},b)):t.createElement(y,{className:o(`${n}-item`,r),style:i,colSpan:a},t.createElement("div",{className:`${n}-item-container`},(m||0===m)&&t.createElement("span",{className:o(`${n}-item-label`,{[`${n}-item-no-colon`]:!p}),style:s},m),(b||0===b)&&t.createElement("span",{className:o(`${n}-item-content`),style:c},b)))};function S(e,n,l){let{colon:o,prefixCls:a,bordered:r}=n,{component:i,type:s,showLabel:c,showContent:d,labelStyle:m,contentStyle:b}=l;return e.map(((e,n)=>{let{label:l,children:p,prefixCls:g=a,className:y,style:f,labelStyle:u,contentStyle:$,span:h=1,key:O}=e;return"string"==typeof i?t.createElement(x,{key:`${s}-${O||n}`,className:y,style:f,labelStyle:Object.assign(Object.assign({},m),u),contentStyle:Object.assign(Object.assign({},b),$),span:h,colon:o,component:i,itemPrefixCls:g,bordered:r,label:c?l:null,content:d?p:null,type:s}):[t.createElement(x,{key:`label-${O||n}`,className:y,style:Object.assign(Object.assign(Object.assign({},m),f),u),span:1,colon:o,component:i[0],itemPrefixCls:g,bordered:r,label:l,type:"label"}),t.createElement(x,{key:`content-${O||n}`,className:y,style:Object.assign(Object.assign(Object.assign({},b),f),$),span:2*h-1,component:i[1],itemPrefixCls:g,bordered:r,content:p,type:"content"})]}))}const j=e=>{const n=t.useContext(g),{prefixCls:l,vertical:o,row:a,index:r,bordered:i}=e;return o?t.createElement(t.Fragment,null,t.createElement("tr",{key:`label-${r}`,className:`${l}-row`},S(a,e,Object.assign({component:"th",type:"label",showLabel:!0},n))),t.createElement("tr",{key:`content-${r}`,className:`${l}-row`},S(a,e,Object.assign({component:"td",type:"content",showContent:!0},n)))):t.createElement("tr",{key:r,className:`${l}-row`},S(a,e,Object.assign({component:i?["th","td"]:"td",type:"item",showLabel:!0,showContent:!0},n)))},v=e=>{const{componentCls:t,labelBg:n}=e;return{[`&${t}-bordered`]:{[`> ${t}-view`]:{border:`${c(e.lineWidth)} ${e.lineType} ${e.colorSplit}`,"> table":{tableLayout:"auto"},[`${t}-row`]:{borderBottom:`${c(e.lineWidth)} ${e.lineType} ${e.colorSplit}`,"&:last-child":{borderBottom:"none"},[`> ${t}-item-label, > ${t}-item-content`]:{padding:`${c(e.padding)} ${c(e.paddingLG)}`,borderInlineEnd:`${c(e.lineWidth)} ${e.lineType} ${e.colorSplit}`,"&:last-child":{borderInlineEnd:"none"}},[`> ${t}-item-label`]:{color:e.colorTextSecondary,backgroundColor:n,"&::after":{display:"none"}}}},[`&${t}-middle`]:{[`${t}-row`]:{[`> ${t}-item-label, > ${t}-item-content`]:{padding:`${c(e.paddingSM)} ${c(e.paddingLG)}`}}},[`&${t}-small`]:{[`${t}-row`]:{[`> ${t}-item-label, > ${t}-item-content`]:{padding:`${c(e.paddingXS)} ${c(e.padding)}`}}}}}},w=a("Descriptions",(e=>(e=>{const{componentCls:t,extraColor:n,itemPaddingBottom:l,itemPaddingEnd:o,colonMarginRight:a,colonMarginLeft:r,titleMarginBottom:d}=e;return{[t]:Object.assign(Object.assign(Object.assign({},i(e)),v(e)),{"&-rtl":{direction:"rtl"},[`${t}-header`]:{display:"flex",alignItems:"center",marginBottom:d},[`${t}-title`]:Object.assign(Object.assign({},s),{flex:"auto",color:e.titleColor,fontWeight:e.fontWeightStrong,fontSize:e.fontSizeLG,lineHeight:e.lineHeightLG}),[`${t}-extra`]:{marginInlineStart:"auto",color:n,fontSize:e.fontSize},[`${t}-view`]:{width:"100%",borderRadius:e.borderRadiusLG,table:{width:"100%",tableLayout:"fixed",borderCollapse:"collapse"}},[`${t}-row`]:{"> th, > td":{paddingBottom:l,paddingInlineEnd:o},"> th:last-child, > td:last-child":{paddingInlineEnd:0},"&:last-child":{borderBottom:"none","> th, > td":{paddingBottom:0}}},[`${t}-item-label`]:{color:e.colorTextTertiary,fontWeight:"normal",fontSize:e.fontSize,lineHeight:e.lineHeight,textAlign:"start","&::after":{content:'":"',position:"relative",top:-.5,marginInline:`${c(r)} ${c(a)}`},[`&${t}-item-no-colon::after`]:{content:'""'}},[`${t}-item-no-label`]:{"&::after":{margin:0,content:'""'}},[`${t}-item-content`]:{display:"table-cell",flex:1,color:e.contentColor,fontSize:e.fontSize,lineHeight:e.lineHeight,wordBreak:"break-word",overflowWrap:"break-word"},[`${t}-item`]:{paddingBottom:0,verticalAlign:"top","&-container":{display:"flex",[`${t}-item-label`]:{display:"inline-flex",alignItems:"baseline"},[`${t}-item-content`]:{display:"inline-flex",alignItems:"baseline",minWidth:"1em"}}},"&-middle":{[`${t}-row`]:{"> th, > td":{paddingBottom:e.paddingSM}}},"&-small":{[`${t}-row`]:{"> th, > td":{paddingBottom:e.paddingXS}}}})}})(r(e,{}))),(e=>({labelBg:e.colorFillAlter,titleColor:e.colorText,titleMarginBottom:e.fontSizeSM*e.lineHeightSM,itemPaddingBottom:e.padding,itemPaddingEnd:e.padding,colonMarginRight:e.marginXS,colonMarginLeft:e.marginXXS/2,contentColor:e.colorText,extraColor:e.colorText})));var E=globalThis&&globalThis.__rest||function(e,t){var n={};for(var l in e)Object.prototype.hasOwnProperty.call(e,l)&&t.indexOf(l)<0&&(n[l]=e[l]);if(null!=e&&"function"==typeof Object.getOwnPropertySymbols){var o=0;for(l=Object.getOwnPropertySymbols(e);o<l.length;o++)t.indexOf(l[o])<0&&Object.prototype.propertyIsEnumerable.call(e,l[o])&&(n[l[o]]=e[l[o]])}return n};const C=e=>{const{prefixCls:l,title:a,extra:r,column:i,colon:s=!0,bordered:c,layout:y,children:u,className:h,rootClassName:O,style:x,size:S,labelStyle:v,contentStyle:C,items:N}=e,P=E(e,["prefixCls","title","extra","column","colon","bordered","layout","children","className","rootClassName","style","size","labelStyle","contentStyle","items"]),{getPrefixCls:B,direction:M,descriptions:T}=t.useContext(d),k=B("descriptions",l),I=m(),L=t.useMemo((()=>{var e;return"number"==typeof i?i:null!==(e=n(I,Object.assign(Object.assign({},p),i)))&&void 0!==e?e:3}),[I,i]),z=f(I,N,u),W=b(S),H=$(L,z),[X,_,G]=w(k),R=t.useMemo((()=>({labelStyle:v,contentStyle:C})),[v,C]);return X(t.createElement(g.Provider,{value:R},t.createElement("div",Object.assign({className:o(k,null==T?void 0:T.className,{[`${k}-${W}`]:W&&"default"!==W,[`${k}-bordered`]:!!c,[`${k}-rtl`]:"rtl"===M},h,O,_,G),style:Object.assign(Object.assign({},null==T?void 0:T.style),x)},P),(a||r)&&t.createElement("div",{className:`${k}-header`},a&&t.createElement("div",{className:`${k}-title`},a),r&&t.createElement("div",{className:`${k}-extra`},r)),t.createElement("div",{className:`${k}-view`},t.createElement("table",null,t.createElement("tbody",null,H.map(((e,n)=>t.createElement(j,{key:n,index:n,colon:s,prefixCls:k,vertical:"vertical"===y,bordered:c,row:e})))))))))};C.Item=h;const N=C;export{N as D};
