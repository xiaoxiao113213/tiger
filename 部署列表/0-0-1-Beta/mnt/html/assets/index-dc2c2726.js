import{r as s,O as t,j as e,o as i,p as r,B as o,D as a}from"./index-52537ad8.js";import{getMyUseProcess as m}from"./processApi-46ba1e32.js";import l from"./AddInstance-89f1e5bc.js";import{C as d}from"./index-8d66853c.js";import"./Bo-cc27e439.js";import"./submitNowform-370ac6e7.js";import"./textSubmit-f698ce92.js";import"./textAreaSubmit-9cc0fcd3.js";import"./SelectSubmit-a0546f42.js";import"./MutSelectSubmit-978c5f1c.js";import"./DateSubmit-7515399a.js";import"./NumberSubmit-d54ed6cf.js";import"./FileUploadSubmit-1e28b47f.js";import"./PlusOutlined-0403edcb.js";import"./processInstanceApi-5b2286a5.js";import"./index-ec1d06fe.js";const n=n=>{const[p,c]=s.useState([]),[j,u]=s.useState(t.close),[x,b]=s.useState(0);return s.useEffect((()=>{"3"===n.tabId&&(async()=>{const s=await m();c(s.data)})()}),[n.tabId]),e.jsxs("div",{children:[e.jsx(i,{gutter:16,children:p.map(((s,i)=>e.jsx(r,{span:8,children:e.jsx(d,{title:e.jsxs("div",{children:[e.jsx("span",{children:s.name}),e.jsx("span",{style:{float:"right"},children:e.jsx(o,{type:"primary",onClick:()=>{b(s.processId),u(t.add)},children:"申请"})})]}),bordered:!1,children:s.remarks})},i)))}),e.jsx(a,{title:"申请",open:j!==t.close,width:"90%",destroyOnClose:!0,maskClosable:!1,onClose:()=>{u(t.close)},footer:null,children:e.jsx("div",{children:e.jsx(l,{processId:x,closeModal:()=>{u(t.close)}})})})]})};export{n as default};
