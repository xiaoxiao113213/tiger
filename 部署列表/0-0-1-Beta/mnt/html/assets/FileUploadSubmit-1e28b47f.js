import{i as e,r as i,j as t,F as l,U as s,g as o}from"./index-52537ad8.js";import{P as a}from"./PlusOutlined-0403edcb.js";const r=e.memo((e=>{const[r,n]=i.useState([]);let d="";1==e.initFieldBo.scope&&(d="（全局）"),i.useEffect((()=>{null!=e.initFieldBo.value&&Array.isArray(e.initFieldBo.value)&&n(e.initFieldBo.value)}),[e.initFieldBo.value]);return t.jsx("div",{children:t.jsx(l.Item,{label:e.initFieldBo.name+d,name:e.initFieldBo.id,rules:[{required:1==e.initFieldBo.notNull}],tooltip:e.initFieldBo.desc,valuePropName:"fileList",getValueFromEvent:e=>Array.isArray(e)?e:e&&e.fileList,children:t.jsx(s,{action:"/devops-server/b/fileStore/upload/4/0",headers:{Authorization:o()?.accessToken??""},method:"POST",fileList:r,onChange:({file:e,fileList:i})=>{if(n(i),"done"===e.status){const i=e.response.data;e.data=i,e.url=i.fullPath}},listType:"picture-card",children:t.jsxs("button",{style:{border:0,background:"none"},type:"button",children:[t.jsx(a,{}),t.jsx("div",{style:{marginTop:8},children:"Upload"})]})})})})}));export{r as default};
