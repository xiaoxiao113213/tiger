import{r as e,d as t,j as l,T as o}from"./index-10719960.js";import{pipelineNodeGetOneApi as i}from"./api-8371e36c.js";import{P as r}from"./index-4b23e8f2.js";import"./index-30b704bf.js";import"./index-be16395f.js";import"./EditOutlined-34dfcda0.js";const a=a=>{const[n,d]=e.useState(t);return e.useEffect((()=>((async()=>{let e=await i({id:a.detailId});d(e.data)})(),()=>{})),[]),l.jsxs("div",{children:[l.jsxs(r,{column:2,title:"",tooltip:"",children:[l.jsx(r.Item,{label:"id",tooltip:"",valueType:"text",children:n.id},"id"),l.jsx(r.Item,{label:"名称",tooltip:"",valueType:"text",children:n.name},"name"),l.jsx(r.Item,{label:"工作目录",tooltip:"",valueType:"text",children:n.workDir},"workDir"),l.jsx(r.Item,{label:"描述",tooltip:"",valueType:"text",children:n.desc},"desc"),l.jsx(r.Item,{label:"状态",tooltip:"",children:0===n.status?l.jsx(o,{color:"red",children:"未在线"}):l.jsx(o,{color:"green",children:"已在线"})},"disabled"),l.jsx(r.Item,{label:"disabled",tooltip:"",valueType:"text",children:n.disabled},"disabled"),l.jsx(r.Item,{label:"是否禁用",tooltip:"",children:0===n.disabled?l.jsx(o,{color:"green",children:"启用中"}):l.jsx(o,{color:"red",children:"禁用中"})},"disabled"),l.jsx(r.Item,{label:"创建时间",tooltip:"",valueType:"text",children:n.createTime},"createTime"),l.jsx(r.Item,{label:"errorLog",tooltip:"",valueType:"text",children:n.errorLog},"errorLog"),l.jsx(r.Item,{label:"token",tooltip:"",valueType:"text",children:n.token},"token"),l.jsx(r.Item,{label:"标签",tooltip:"",valueType:"text",children:n.label},"label"),l.jsx(r.Item,{label:"并发工作数量",tooltip:"",valueType:"text",children:n.workNum},"workNum"),l.jsx(r.Item,{label:"优先级",tooltip:"",valueType:"text",children:n.priority},"priority"),l.jsx(r.Item,{label:"ip",tooltip:"",valueType:"text",children:n.ip},"ip")]}),l.jsxs(r,{column:1,title:"",tooltip:"",children:[l.jsx(r.Item,{label:"连接地址",tooltip:"",valueType:"text",copyable:!0,contentStyle:{backgroundColor:"lightcyan"},children:n.connectUrl},"connectUrl"),l.jsx(r.Item,{label:"连接地址",tooltip:"",valueType:"text",copyable:!0,contentStyle:{backgroundColor:"lightcyan"},children:n.connectUrl1},"connectUrl1")]})]})};export{a as default};
