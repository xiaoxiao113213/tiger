import{r as e,g as t,j as a,F as s,U as i}from"./index-1fe6dff8.js";import{P as r}from"./PlusOutlined-73232e7a.js";const l=e.forwardRef(((l,o)=>{let n=t();const[d,u]=e.useState(l.initFileList?.map((e=>({data:e,uid:e.fileKey,name:e.fileName,status:"done",url:"/devops-server/public/biz/download/0/"+e.fileKey+"?token="+n?.fileToken})))??[]);e.useImperativeHandle(o,(()=>({getFileList:()=>d.map((e=>e.data))})));return a.jsx("div",{children:a.jsx(s.Item,{label:l.label,name:l.name,rules:[{required:l.required}],valuePropName:"fileList",getValueFromEvent:e=>Array.isArray(e)?e:e&&e.fileList,children:a.jsx(i,{action:"/devops-server/b/fileStore/upload/4/0",headers:{Authorization:t()?.accessToken??""},method:"POST",fileList:d,maxCount:l.maxCount,onChange:({file:e,fileList:t})=>{if(u(t),"done"===e.status){const t=e.response.data;e.data=t,e.url=t.fullPath}},accept:l.accept,listType:"picture-card",children:a.jsxs("button",{style:{border:0,background:"none"},type:"button",children:[a.jsx(r,{}),a.jsx("div",{style:{marginTop:8},children:"Upload"})]})})})})}));export{l as F};
