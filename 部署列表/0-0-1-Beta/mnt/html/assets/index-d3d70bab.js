import{b8 as e,bg as o,bh as n,r as t,ba as r,at as i,bk as l,bJ as s,bK as a,bL as c,bM as d,bN as p,bO as m,bP as u,bQ as g,bR as b,bS as f,bT as v,bU as $,bB as h,bC as y}from"./index-03adb9ee.js";const C=(e,o,t,r,i)=>({background:e,border:`${n(r.lineWidth)} ${r.lineType} ${o}`,[`${i}-icon`]:{color:t}}),I=e=>{const{componentCls:n,motionDurationSlow:t,marginXS:r,marginSM:i,fontSize:l,fontSizeLG:s,lineHeight:a,borderRadiusLG:c,motionEaseInOutCirc:d,withDescriptionIconSize:p,colorText:m,colorTextHeading:u,withDescriptionPadding:g,defaultPadding:b}=e;return{[n]:Object.assign(Object.assign({},o(e)),{position:"relative",display:"flex",alignItems:"center",padding:b,wordWrap:"break-word",borderRadius:c,[`&${n}-rtl`]:{direction:"rtl"},[`${n}-content`]:{flex:1,minWidth:0},[`${n}-icon`]:{marginInlineEnd:r,lineHeight:0},"&-description":{display:"none",fontSize:l,lineHeight:a},"&-message":{color:u},[`&${n}-motion-leave`]:{overflow:"hidden",opacity:1,transition:`max-height ${t} ${d}, opacity ${t} ${d},\n        padding-top ${t} ${d}, padding-bottom ${t} ${d},\n        margin-bottom ${t} ${d}`},[`&${n}-motion-leave-active`]:{maxHeight:0,marginBottom:"0 !important",paddingTop:0,paddingBottom:0,opacity:0}}),[`${n}-with-description`]:{alignItems:"flex-start",padding:g,[`${n}-icon`]:{marginInlineEnd:i,fontSize:p,lineHeight:0},[`${n}-message`]:{display:"block",marginBottom:r,color:u,fontSize:s},[`${n}-description`]:{display:"block",color:m}},[`${n}-banner`]:{marginBottom:0,border:"0 !important",borderRadius:0}}},S=e=>{const{componentCls:o,colorSuccess:n,colorSuccessBorder:t,colorSuccessBg:r,colorWarning:i,colorWarningBorder:l,colorWarningBg:s,colorError:a,colorErrorBorder:c,colorErrorBg:d,colorInfo:p,colorInfoBorder:m,colorInfoBg:u}=e;return{[o]:{"&-success":C(r,t,n,e,o),"&-info":C(u,m,p,e,o),"&-warning":C(s,l,i,e,o),"&-error":Object.assign(Object.assign({},C(d,c,a,e,o)),{[`${o}-description > pre`]:{margin:0,padding:0}})}}},x=e=>{const{componentCls:o,iconCls:t,motionDurationMid:r,marginXS:i,fontSizeIcon:l,colorIcon:s,colorIconHover:a}=e;return{[o]:{"&-action":{marginInlineStart:i},[`${o}-close-icon`]:{marginInlineStart:i,padding:0,overflow:"hidden",fontSize:l,lineHeight:n(l),backgroundColor:"transparent",border:"none",outline:"none",cursor:"pointer",[`${t}-close`]:{color:s,transition:`color ${r}`,"&:hover":{color:a}}},"&-close-text":{color:s,transition:`color ${r}`,"&:hover":{color:a}}}}},E=e("Alert",(e=>[I(e),S(e),x(e)]),(e=>({withDescriptionIconSize:e.fontSizeHeading3,defaultPadding:`${e.paddingContentVerticalSM}px 12px`,withDescriptionPadding:`${e.paddingMD}px ${e.paddingContentHorizontalLG}px`})));var w=globalThis&&globalThis.__rest||function(e,o){var n={};for(var t in e)Object.prototype.hasOwnProperty.call(e,t)&&o.indexOf(t)<0&&(n[t]=e[t]);if(null!=e&&"function"==typeof Object.getOwnPropertySymbols){var r=0;for(t=Object.getOwnPropertySymbols(e);r<t.length;r++)o.indexOf(t[r])<0&&Object.prototype.propertyIsEnumerable.call(e,t[r])&&(n[t[r]]=e[t[r]])}return n};const O={success:p,info:m,error:u,warning:g},N=e=>{const{icon:o,prefixCls:n,type:r}=e,l=O[r]||null;return o?c(o,t.createElement("span",{className:`${n}-icon`},o),(()=>({className:i(`${n}-icon`,{[o.props.className]:o.props.className})}))):t.createElement(l,{className:`${n}-icon`})},j=e=>{const{isClosable:o,prefixCls:n,closeIcon:r,handleClose:i,ariaProps:l}=e,s=!0===r||void 0===r?t.createElement(d,null):r;return o?t.createElement("button",Object.assign({type:"button",onClick:i,className:`${n}-close-icon`,tabIndex:0},l),s):null},M=t.forwardRef(((e,o)=>{const{description:n,prefixCls:c,message:d,banner:p,className:m,rootClassName:u,style:g,onMouseEnter:b,onMouseLeave:f,onClick:v,afterClose:$,showIcon:h,closable:y,closeText:C,closeIcon:I,action:S,id:x}=e,O=w(e,["description","prefixCls","message","banner","className","rootClassName","style","onMouseEnter","onMouseLeave","onClick","afterClose","showIcon","closable","closeText","closeIcon","action","id"]),[M,k]=t.useState(!1),B=t.useRef(null);t.useImperativeHandle(o,(()=>({nativeElement:B.current})));const{getPrefixCls:H,direction:z,alert:P}=t.useContext(r),L=H("alert",c),[T,D,R]=E(L),W=o=>{var n;k(!0),null===(n=e.onClose)||void 0===n||n.call(e,o)},A=t.useMemo((()=>void 0!==e.type?e.type:p?"warning":"info"),[e.type,p]),G=t.useMemo((()=>!("object"!=typeof y||!y.closeIcon)||(!!C||("boolean"==typeof y?y:!1!==I&&null!=I||!!(null==P?void 0:P.closable)))),[C,I,y,null==P?void 0:P.closable]),X=!(!p||void 0!==h)||h,_=i(L,`${L}-${A}`,{[`${L}-with-description`]:!!n,[`${L}-no-icon`]:!X,[`${L}-banner`]:!!p,[`${L}-rtl`]:"rtl"===z},null==P?void 0:P.className,m,u,R,D),J=l(O,{aria:!0,data:!0}),K=t.useMemo((()=>{var e,o;return"object"==typeof y&&y.closeIcon?y.closeIcon:C||(void 0!==I?I:"object"==typeof(null==P?void 0:P.closable)&&(null===(e=null==P?void 0:P.closable)||void 0===e?void 0:e.closeIcon)?null===(o=null==P?void 0:P.closable)||void 0===o?void 0:o.closeIcon:null==P?void 0:P.closeIcon)}),[I,y,C,null==P?void 0:P.closeIcon]),Q=t.useMemo((()=>{const e=null!=y?y:null==P?void 0:P.closable;if("object"==typeof e){return w(e,["closeIcon"])}return{}}),[y,null==P?void 0:P.closable]);return T(t.createElement(s,{visible:!M,motionName:`${L}-motion`,motionAppear:!1,motionEnter:!1,onLeaveStart:e=>({maxHeight:e.offsetHeight}),onLeaveEnd:$},((o,r)=>{let{className:l,style:s}=o;return t.createElement("div",Object.assign({id:x,ref:a(B,r),"data-show":!M,className:i(_,l),style:Object.assign(Object.assign(Object.assign({},null==P?void 0:P.style),g),s),onMouseEnter:b,onMouseLeave:f,onClick:v,role:"alert"},J),X?t.createElement(N,{description:n,icon:e.icon,prefixCls:L,type:A}):null,t.createElement("div",{className:`${L}-content`},d?t.createElement("div",{className:`${L}-message`},d):null,n?t.createElement("div",{className:`${L}-description`},n):null),S?t.createElement("div",{className:`${L}-action`},S):null,t.createElement(j,{isClosable:G,prefixCls:L,closeIcon:K,handleClose:W,ariaProps:Q}))})))}));const k=function(e){function o(){var e,n,t,r;return y(this,o),n=this,r=arguments,t=b(t=o),(e=f(n,v()?Reflect.construct(t,r||[],b(n).constructor):t.apply(n,r))).state={error:void 0,info:{componentStack:""}},e}return $(o,e),h(o,[{key:"componentDidCatch",value:function(e,o){this.setState({error:e,info:o})}},{key:"render",value:function(){const{message:e,description:o,id:n,children:r}=this.props,{error:i,info:l}=this.state,s=(null==l?void 0:l.componentStack)||null,a=void 0===e?(i||"").toString():e,c=void 0===o?s:o;return i?t.createElement(M,{id:n,type:"error",message:a,description:t.createElement("pre",{style:{fontSize:"0.9em",overflowX:"auto"}},c)}):r}}])}(t.Component),B=M;B.ErrorBoundary=k;const H=B;export{H as A};
