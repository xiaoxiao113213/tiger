import{r as e,A as s,_ as t,O as a,j as i,B as o,o as r,p as d,a$ as n,D as l}from"./index-52537ad8.js";import{docAllApi as c}from"./api-8d69c354.js";import p from"./addOrUpdate-8e71717a.js";import{C as j}from"./index-8d66853c.js";import{B as m}from"./BranchesOutlined-c52fb168.js";import{S as x}from"./SettingOutlined-04e6953d.js";import{E as f}from"./EditOutlined-4076ffe0.js";var h=function(a,i){return e.createElement(s,t({},a,{ref:i,icon:m}))};
/**![branches](data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTAiIGhlaWdodD0iNTAiIGZpbGw9IiNjYWNhY2EiIHZpZXdCb3g9IjY0IDY0IDg5NiA4OTYiIGZvY3VzYWJsZT0iZmFsc2UiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTc0MCAxNjFjLTYxLjggMC0xMTIgNTAuMi0xMTIgMTEyIDAgNTAuMSAzMy4xIDkyLjYgNzguNSAxMDYuOXY5NS45TDMyMCA2MDIuNFYzMTguMWM0NC4yLTE1IDc2LTU2LjkgNzYtMTA2LjEgMC02MS44LTUwLjItMTEyLTExMi0xMTJzLTExMiA1MC4yLTExMiAxMTJjMCA0OS4yIDMxLjggOTEgNzYgMTA2LjFWNzA2Yy00NC4yIDE1LTc2IDU2LjktNzYgMTA2LjEgMCA2MS44IDUwLjIgMTEyIDExMiAxMTJzMTEyLTUwLjIgMTEyLTExMmMwLTQ5LjItMzEuOC05MS03Ni0xMDYuMXYtMjcuOGw0MjMuNS0xMzguN2E1MC41MiA1MC41MiAwIDAwMzQuOS00OC4yVjM3OC4yYzQyLjktMTUuOCA3My42LTU3IDczLjYtMTA1LjIgMC02MS44LTUwLjItMTEyLTExMi0xMTJ6bS01MDQgNTFhNDguMDEgNDguMDEgMCAwMTk2IDAgNDguMDEgNDguMDEgMCAwMS05NiAwem05NiA2MDBhNDguMDEgNDguMDEgMCAwMS05NiAwIDQ4LjAxIDQ4LjAxIDAgMDE5NiAwem00MDgtNDkxYTQ4LjAxIDQ4LjAxIDAgMDEwLTk2IDQ4LjAxIDQ4LjAxIDAgMDEwIDk2eiIgLz48L3N2Zz4=) */const u=e.forwardRef(h),{Meta:v}=j,w=()=>{const[s,t]=e.useState([]),[m,h]=e.useState(),[w,C]=e.useState(a.close),O=async()=>{let e=await c({});t(e.data)};return e.useEffect((()=>{O()}),[]),i.jsxs(i.Fragment,{children:[i.jsx("div",{children:i.jsx(o,{type:"link",onClick:()=>{C(a.add)},children:"新增"})}),i.jsx(r,{gutter:16,children:s.map(((e,s)=>i.jsx(d,{span:8,children:i.jsx(j,{style:{marginTop:16},actions:[i.jsx(x,{},"setting"),i.jsx(f,{onClick:()=>{h(e.docId),C(a.edit)}},"edit"),i.jsx(u,{onClick:()=>{var s;s=e.docId,window.open(`/doc/doc?docId=${s}`)}},"ellipsis")],children:i.jsx(n,{loading:!1,avatar:!0,active:!0,children:i.jsx(v,{title:e.name,description:i.jsx("div",{style:{whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"},children:e.remarks})})})},s)},`${s}-col`)))}),i.jsx(l,{title:w==a.edit?"文档空间编辑":"文档空间新增",open:w!==a.close,width:"50%",destroyOnClose:!0,maskClosable:!1,onClose:()=>C(a.close),footer:null,children:i.jsx("div",{children:i.jsx(p,{detailId:m??0,operateEnum:w,setAddOrUpdateModalFn:C,reloadTable:O})})})]})};export{w as default};
