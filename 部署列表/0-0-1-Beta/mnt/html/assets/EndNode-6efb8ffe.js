import{r as e,O as s,j as t,D as i}from"./index-10719960.js";import{u as o,H as l,d as r}from"./index-937e9b10.js";/* empty css                          */import n from"./EndNodeEdit-ccdfd0df.js";import{R as d}from"./RightCircleTwoTone-3aded87c.js";import"./index-c05d5723.js";import"./Title-5ea514a5.js";import"./Input-f4f01092.js";import"./TextArea-8948f20d.js";import"./Password-88bd354d.js";import"./QRCodeSVG-ffc224cf.js";import"./TaobaoOutlined-8cd58809.js";import"./FileZipFilled-2a2025c5.js";import"./BranchesOutlined-c52fb168.js";import"./RightSquareTwoTone-e5897024.js";import"./FileUnknownTwoTone-791de7ab.js";import"./MinusCircleOutlined-47af1d51.js";import"./MoreOutlined-49b0b054.js";import"./PlusCircleOutlined-a72eecfb.js";import"./PlusSquareTwoTone-f51424a0.js";import"./RetweetOutlined-9d2a328f.js";import"./SendOutlined-86da6479.js";import"./TableOutlined-67e609f9.js";import"./api-5bb72ee6.js";import"./processApi-c938a5c9.js";import"./api-990bd395.js";function a({id:a,data:p,isConnectable:j}){o();const[m,c]=e.useState(s.close),[u,x]=e.useState(!1);e.useState(p.label);const h=e.useRef(null);return e.useEffect((()=>{u&&h.current&&h.current.focus()}),[u]),t.jsxs("div",{className:"text-updater-node",children:[t.jsx(l,{type:"target",position:r.Top,isConnectable:j}),t.jsx("div",{className:"nodrag",style:{width:150},children:t.jsxs("div",{children:[t.jsx("label",{htmlFor:"text",style:{height:15,fontSize:10,display:"flex"},children:t.jsx("span",{style:{flex:5},children:"结束"})}),t.jsx("hr",{style:{marginTop:0}}),t.jsxs("label",{htmlFor:"text",style:{height:15,fontSize:15,display:"flex"},children:[t.jsx("span",{style:{flex:1,color:"blue"},children:"设置抄送人"}),t.jsx("span",{style:{flex:1,textAlign:"right"},children:t.jsx(d,{onClick:()=>{c(s.edit)}})})]})]})}),t.jsx(i,{title:"设置",open:m!==s.close,width:"70%",destroyOnClose:!0,maskClosable:!1,onClose:()=>c(s.close),footer:null,children:t.jsx("div",{children:t.jsx(n,{processPointId:a,closeSelf:()=>{c(s.close)}})})})]})}export{a as default};
