import{at as e,b8 as t,b9 as a,i as n,ba as r,bb as l,bc as s}from"./index-f2321b57.js";const o=["wrap","nowrap","wrap-reverse"],c=["flex-start","flex-end","start","end","center","space-between","space-around","space-evenly","stretch","normal","left","right"],i=["center","start","end","flex-start","flex-end","self-start","self-end","baseline","normal","stretch"];function p(t,a){return e(Object.assign(Object.assign(Object.assign({},((e,t)=>{const a=!0===t.wrap?"wrap":t.wrap;return{[`${e}-wrap-${a}`]:a&&o.includes(a)}})(t,a)),((e,t)=>{const a={};return i.forEach((n=>{a[`${e}-align-${n}`]=t.align===n})),a[`${e}-align-stretch`]=!t.align&&!!t.vertical,a})(t,a)),((e,t)=>{const a={};return c.forEach((n=>{a[`${e}-justify-${n}`]=t.justify===n})),a})(t,a)))}const f=e=>{const{componentCls:t}=e;return{[t]:{display:"flex","&-vertical":{flexDirection:"column"},"&-rtl":{direction:"rtl"},"&:empty":{display:"none"}}}},g=e=>{const{componentCls:t}=e;return{[t]:{"&-gap-small":{gap:e.flexGapSM},"&-gap-middle":{gap:e.flexGap},"&-gap-large":{gap:e.flexGapLG}}}},u=e=>{const{componentCls:t}=e,a={};return o.forEach((e=>{a[`${t}-wrap-${e}`]={flexWrap:e}})),a},d=e=>{const{componentCls:t}=e,a={};return i.forEach((e=>{a[`${t}-align-${e}`]={alignItems:e}})),a},x=e=>{const{componentCls:t}=e,a={};return c.forEach((e=>{a[`${t}-justify-${e}`]={justifyContent:e}})),a},m=t("Flex",(e=>{const{paddingXS:t,padding:n,paddingLG:r}=e,l=a(e,{flexGapSM:t,flexGap:n,flexGapLG:r});return[f(l),g(l),u(l),d(l),x(l)]}),(()=>({})),{resetStyle:!1});var b=globalThis&&globalThis.__rest||function(e,t){var a={};for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&t.indexOf(n)<0&&(a[n]=e[n]);if(null!=e&&"function"==typeof Object.getOwnPropertySymbols){var r=0;for(n=Object.getOwnPropertySymbols(e);r<n.length;r++)t.indexOf(n[r])<0&&Object.prototype.propertyIsEnumerable.call(e,n[r])&&(a[n[r]]=e[n[r]])}return a};const y=n.forwardRef(((t,a)=>{const{prefixCls:o,rootClassName:c,className:i,style:f,flex:g,gap:u,children:d,vertical:x=!1,component:y="div"}=t,$=b(t,["prefixCls","rootClassName","className","style","flex","gap","children","vertical","component"]),{flex:j,direction:v,getPrefixCls:h}=n.useContext(r),O=h("flex",o),[w,C,G]=m(O),E=null!=x?x:null==j?void 0:j.vertical,N=e(i,c,null==j?void 0:j.className,O,C,G,p(O,t),{[`${O}-rtl`]:"rtl"===v,[`${O}-gap-${u}`]:l(u),[`${O}-vertical`]:E}),S=Object.assign(Object.assign({},null==j?void 0:j.style),f);return g&&(S.flex=g),u&&!l(u)&&(S.gap=u),w(n.createElement(y,Object.assign({ref:a,className:N,style:S},s($,["justify","wrap","align"])),d))}));export{y as F};
