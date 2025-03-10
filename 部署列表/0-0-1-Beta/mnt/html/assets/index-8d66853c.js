import{r as e,ba as t,at as a,b8 as n,b9 as o,bg as r,bh as i,bV as l,bW as s,bs as d,K as c,bc as b,a$ as g}from"./index-52537ad8.js";var p=globalThis&&globalThis.__rest||function(e,t){var a={};for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&t.indexOf(n)<0&&(a[n]=e[n]);if(null!=e&&"function"==typeof Object.getOwnPropertySymbols){var o=0;for(n=Object.getOwnPropertySymbols(e);o<n.length;o++)t.indexOf(n[o])<0&&Object.prototype.propertyIsEnumerable.call(e,n[o])&&(a[n[o]]=e[n[o]])}return a};const m=n=>{var{prefixCls:o,className:r,hoverable:i=!0}=n,l=p(n,["prefixCls","className","hoverable"]);const{getPrefixCls:s}=e.useContext(t),d=s("card",o),c=a(`${d}-grid`,r,{[`${d}-grid-hoverable`]:i});return e.createElement("div",Object.assign({},l,{className:c}))},$=e=>{const{antCls:t,componentCls:a,headerHeight:n,cardPaddingBase:o,tabsMarginBottom:r}=e;return Object.assign(Object.assign({display:"flex",justifyContent:"center",flexDirection:"column",minHeight:n,marginBottom:-1,padding:`0 ${i(o)}`,color:e.colorTextHeading,fontWeight:e.fontWeightStrong,fontSize:e.headerFontSize,background:e.headerBg,borderBottom:`${i(e.lineWidth)} ${e.lineType} ${e.colorBorderSecondary}`,borderRadius:`${i(e.borderRadiusLG)} ${i(e.borderRadiusLG)} 0 0`},l()),{"&-wrapper":{width:"100%",display:"flex",alignItems:"center"},"&-title":Object.assign(Object.assign({display:"inline-block",flex:1},s),{[`\n          > ${a}-typography,\n          > ${a}-typography-edit-content\n        `]:{insetInlineStart:0,marginTop:0,marginBottom:0}}),[`${t}-tabs-top`]:{clear:"both",marginBottom:r,color:e.colorText,fontWeight:"normal",fontSize:e.fontSize,"&-bar":{borderBottom:`${i(e.lineWidth)} ${e.lineType} ${e.colorBorderSecondary}`}}})},h=e=>{const{cardPaddingBase:t,colorBorderSecondary:a,cardShadow:n,lineWidth:o}=e;return{width:"33.33%",padding:t,border:0,borderRadius:0,boxShadow:`\n      ${i(o)} 0 0 0 ${a},\n      0 ${i(o)} 0 0 ${a},\n      ${i(o)} ${i(o)} 0 0 ${a},\n      ${i(o)} 0 0 0 ${a} inset,\n      0 ${i(o)} 0 0 ${a} inset;\n    `,transition:`all ${e.motionDurationMid}`,"&-hoverable:hover":{position:"relative",zIndex:1,boxShadow:n}}},u=e=>{const{componentCls:t,iconCls:a,actionsLiMargin:n,cardActionsIconSize:o,colorBorderSecondary:r,actionsBg:s}=e;return Object.assign(Object.assign({margin:0,padding:0,listStyle:"none",background:s,borderTop:`${i(e.lineWidth)} ${e.lineType} ${r}`,display:"flex",borderRadius:`0 0 ${i(e.borderRadiusLG)} ${i(e.borderRadiusLG)}`},l()),{"& > li":{margin:n,color:e.colorTextDescription,textAlign:"center","> span":{position:"relative",display:"block",minWidth:e.calc(e.cardActionsIconSize).mul(2).equal(),fontSize:e.fontSize,lineHeight:e.lineHeight,cursor:"pointer","&:hover":{color:e.colorPrimary,transition:`color ${e.motionDurationMid}`},[`a:not(${t}-btn), > ${a}`]:{display:"inline-block",width:"100%",color:e.colorTextDescription,lineHeight:i(e.fontHeight),transition:`color ${e.motionDurationMid}`,"&:hover":{color:e.colorPrimary}},[`> ${a}`]:{fontSize:o,lineHeight:i(e.calc(o).mul(e.lineHeight).equal())}},"&:not(:last-child)":{borderInlineEnd:`${i(e.lineWidth)} ${e.lineType} ${r}`}}})},y=e=>Object.assign(Object.assign({margin:`${i(e.calc(e.marginXXS).mul(-1).equal())} 0`,display:"flex"},l()),{"&-avatar":{paddingInlineEnd:e.padding},"&-detail":{overflow:"hidden",flex:1,"> div:not(:last-child)":{marginBottom:e.marginXS}},"&-title":Object.assign({color:e.colorTextHeading,fontWeight:e.fontWeightStrong,fontSize:e.fontSizeLG},s),"&-description":{color:e.colorTextDescription}}),f=e=>{const{componentCls:t,cardPaddingBase:a,colorFillAlter:n}=e;return{[`${t}-head`]:{padding:`0 ${i(a)}`,background:n,"&-title":{fontSize:e.fontSize}},[`${t}-body`]:{padding:`${i(e.padding)} ${i(a)}`}}},v=e=>{const{componentCls:t}=e;return{overflow:"hidden",[`${t}-body`]:{userSelect:"none"}}},S=e=>{const{componentCls:t,cardShadow:a,cardHeadPadding:n,colorBorderSecondary:o,boxShadowTertiary:s,cardPaddingBase:d,extraColor:c}=e;return{[t]:Object.assign(Object.assign({},r(e)),{position:"relative",background:e.colorBgContainer,borderRadius:e.borderRadiusLG,[`&:not(${t}-bordered)`]:{boxShadow:s},[`${t}-head`]:$(e),[`${t}-extra`]:{marginInlineStart:"auto",color:c,fontWeight:"normal",fontSize:e.fontSize},[`${t}-body`]:Object.assign({padding:d,borderRadius:`0 0 ${i(e.borderRadiusLG)} ${i(e.borderRadiusLG)}`},l()),[`${t}-grid`]:h(e),[`${t}-cover`]:{"> *":{display:"block",width:"100%",borderRadius:`${i(e.borderRadiusLG)} ${i(e.borderRadiusLG)} 0 0`}},[`${t}-actions`]:u(e),[`${t}-meta`]:y(e)}),[`${t}-bordered`]:{border:`${i(e.lineWidth)} ${e.lineType} ${o}`,[`${t}-cover`]:{marginTop:-1,marginInlineStart:-1,marginInlineEnd:-1}},[`${t}-hoverable`]:{cursor:"pointer",transition:`box-shadow ${e.motionDurationMid}, border-color ${e.motionDurationMid}`,"&:hover":{borderColor:"transparent",boxShadow:a}},[`${t}-contain-grid`]:{borderRadius:`${i(e.borderRadiusLG)} ${i(e.borderRadiusLG)} 0 0 `,[`${t}-body`]:{display:"flex",flexWrap:"wrap"},[`&:not(${t}-loading) ${t}-body`]:{marginBlockStart:e.calc(e.lineWidth).mul(-1).equal(),marginInlineStart:e.calc(e.lineWidth).mul(-1).equal(),padding:0}},[`${t}-contain-tabs`]:{[`> div${t}-head`]:{minHeight:0,[`${t}-head-title, ${t}-extra`]:{paddingTop:n}}},[`${t}-type-inner`]:f(e),[`${t}-loading`]:v(e),[`${t}-rtl`]:{direction:"rtl"}}},x=e=>{const{componentCls:t,cardPaddingSM:a,headerHeightSM:n,headerFontSizeSM:o}=e;return{[`${t}-small`]:{[`> ${t}-head`]:{minHeight:n,padding:`0 ${i(a)}`,fontSize:o,[`> ${t}-head-wrapper`]:{[`> ${t}-extra`]:{fontSize:e.fontSize}}},[`> ${t}-body`]:{padding:a}},[`${t}-small${t}-contain-tabs`]:{[`> ${t}-head`]:{[`${t}-head-title, ${t}-extra`]:{paddingTop:0,display:"flex",alignItems:"center"}}}}},O=n("Card",(e=>{const t=o(e,{cardShadow:e.boxShadowCard,cardHeadPadding:e.padding,cardPaddingBase:e.paddingLG,cardActionsIconSize:e.fontSize,cardPaddingSM:12});return[S(t),x(t)]}),(e=>({headerBg:"transparent",headerFontSize:e.fontSizeLG,headerFontSizeSM:e.fontSize,headerHeight:e.fontSizeLG*e.lineHeightLG+2*e.padding,headerHeightSM:e.fontSize*e.lineHeight+2*e.paddingXS,actionsBg:e.colorBgContainer,actionsLiMargin:`${e.paddingSM}px 0`,tabsMarginBottom:-e.padding-e.lineWidth,extraColor:e.colorText})));var j=globalThis&&globalThis.__rest||function(e,t){var a={};for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&t.indexOf(n)<0&&(a[n]=e[n]);if(null!=e&&"function"==typeof Object.getOwnPropertySymbols){var o=0;for(n=Object.getOwnPropertySymbols(e);o<n.length;o++)t.indexOf(n[o])<0&&Object.prototype.propertyIsEnumerable.call(e,n[o])&&(a[n[o]]=e[n[o]])}return a};const C=t=>{const{actionClasses:a,actions:n=[],actionStyle:o}=t;return e.createElement("ul",{className:a,style:o},n.map(((t,a)=>{const o=`action-${a}`;return e.createElement("li",{style:{width:100/n.length+"%"},key:o},e.createElement("span",null,t))})))},w=e.forwardRef(((n,o)=>{const{prefixCls:r,className:i,rootClassName:l,style:s,extra:p,headStyle:$={},bodyStyle:h={},title:u,loading:y,bordered:f=!0,size:v,type:S,cover:x,actions:w,tabList:z,children:T,activeTabKey:E,defaultActiveTabKey:B,tabBarExtraContent:N,hoverable:P,tabProps:L={},classNames:H,styles:R}=n,M=j(n,["prefixCls","className","rootClassName","style","extra","headStyle","bodyStyle","title","loading","bordered","size","type","cover","actions","tabList","children","activeTabKey","defaultActiveTabKey","tabBarExtraContent","hoverable","tabProps","classNames","styles"]),{getPrefixCls:W,direction:G,card:I}=e.useContext(t),k=e=>{var t;return a(null===(t=null==I?void 0:I.classNames)||void 0===t?void 0:t[e],null==H?void 0:H[e])},D=e=>{var t;return Object.assign(Object.assign({},null===(t=null==I?void 0:I.styles)||void 0===t?void 0:t[e]),null==R?void 0:R[e])},A=e.useMemo((()=>{let t=!1;return e.Children.forEach(T,(e=>{(null==e?void 0:e.type)===m&&(t=!0)})),t}),[T]),K=W("card",r),[_,q,F]=O(K),X=e.createElement(g,{loading:!0,active:!0,paragraph:{rows:4},title:!1},T),V=void 0!==E,J=Object.assign(Object.assign({},L),{[V?"activeKey":"defaultActiveKey"]:V?E:B,tabBarExtraContent:N});let Q;const U=d(v),Y=U&&"default"!==U?U:"large",Z=z?e.createElement(c,Object.assign({size:Y},J,{className:`${K}-head-tabs`,onChange:e=>{var t;null===(t=n.onTabChange)||void 0===t||t.call(n,e)},items:z.map((e=>{var{tab:t}=e,a=j(e,["tab"]);return Object.assign({label:t},a)}))})):null;if(u||p||Z){const t=a(`${K}-head`,k("header")),n=a(`${K}-head-title`,k("title")),o=a(`${K}-extra`,k("extra")),r=Object.assign(Object.assign({},$),D("header"));Q=e.createElement("div",{className:t,style:r},e.createElement("div",{className:`${K}-head-wrapper`},u&&e.createElement("div",{className:n,style:D("title")},u),p&&e.createElement("div",{className:o,style:D("extra")},p)),Z)}const ee=a(`${K}-cover`,k("cover")),te=x?e.createElement("div",{className:ee,style:D("cover")},x):null,ae=a(`${K}-body`,k("body")),ne=Object.assign(Object.assign({},h),D("body")),oe=e.createElement("div",{className:ae,style:ne},y?X:T),re=a(`${K}-actions`,k("actions")),ie=(null==w?void 0:w.length)?e.createElement(C,{actionClasses:re,actionStyle:D("actions"),actions:w}):null,le=b(M,["onTabChange"]),se=a(K,null==I?void 0:I.className,{[`${K}-loading`]:y,[`${K}-bordered`]:f,[`${K}-hoverable`]:P,[`${K}-contain-grid`]:A,[`${K}-contain-tabs`]:null==z?void 0:z.length,[`${K}-${U}`]:U,[`${K}-type-${S}`]:!!S,[`${K}-rtl`]:"rtl"===G},i,l,q,F),de=Object.assign(Object.assign({},null==I?void 0:I.style),s);return _(e.createElement("div",Object.assign({ref:o},le,{className:se,style:de}),Q,te,oe,ie))}));var z=globalThis&&globalThis.__rest||function(e,t){var a={};for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&t.indexOf(n)<0&&(a[n]=e[n]);if(null!=e&&"function"==typeof Object.getOwnPropertySymbols){var o=0;for(n=Object.getOwnPropertySymbols(e);o<n.length;o++)t.indexOf(n[o])<0&&Object.prototype.propertyIsEnumerable.call(e,n[o])&&(a[n[o]]=e[n[o]])}return a};const T=n=>{const{prefixCls:o,className:r,avatar:i,title:l,description:s}=n,d=z(n,["prefixCls","className","avatar","title","description"]),{getPrefixCls:c}=e.useContext(t),b=c("card",o),g=a(`${b}-meta`,r),p=i?e.createElement("div",{className:`${b}-meta-avatar`},i):null,m=l?e.createElement("div",{className:`${b}-meta-title`},l):null,$=s?e.createElement("div",{className:`${b}-meta-description`},s):null,h=m||$?e.createElement("div",{className:`${b}-meta-detail`},m,$):null;return e.createElement("div",Object.assign({},d,{className:g}),p,h)},E=w;E.Grid=m,E.Meta=T;const B=E;export{B as C};
