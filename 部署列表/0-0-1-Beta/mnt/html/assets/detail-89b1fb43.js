import{r as e,d as t,j as a,X as i,T as l,K as s,O as o,c as n}from"./index-f2321b57.js";import{menuApplicationTreeApi as r}from"./api-6523b4c3.js";import{roleGetOneApi as d}from"./api-5c5bfeed.js";import c from"./menuComponent-b9e327b2.js";import{P as p}from"./index-55f4da4c.js";import"./index-e51db6e5.js";import"./index-d54aef2b.js";import"./EditOutlined-1e526840.js";const m=m=>{const[x,j]=e.useState(!1),[u,h]=e.useState(t),[y,b]=e.useState([]),f=(e,t)=>{h((a=>(a.applicationList[t].checkedKeys=e,a)))};return e.useEffect((()=>((async()=>{j(!0);const e=await r({});if(n(e))return;let t=e.data,a=await d({id:m.detailId});h({...a.data,applicationList:t}),b(t),j(!1)})(),()=>{})),[]),a.jsx("div",{children:a.jsxs(i,{spinning:x,delay:500,children:[a.jsxs(p,{column:2,title:"",tooltip:"",children:[a.jsx(p.Item,{label:"名称",tooltip:"",valueType:"text",children:u.name},"name"),a.jsx(p.Item,{label:"编码",tooltip:"",valueType:"text",children:u.code},"code"),a.jsx(p.Item,{label:"排序",tooltip:"",valueType:"text",children:u.sort},"label"),a.jsx(p.Item,{label:"状态",tooltip:"",children:0===u.disabled?a.jsx(l,{color:"green",children:"启用中"}):a.jsx(l,{color:"red",children:"禁用中"})},"disabled"),a.jsx(p.Item,{label:"创建时间",tooltip:"",valueType:"text",children:u.createTime},"createTime"),a.jsx(p.Item,{label:"创建人",tooltip:"",valueType:"text",children:u.createBy},"token"),a.jsx(p.Item,{label:"备注",tooltip:"",valueType:"textarea",children:u.remarks},"desc")]}),a.jsx(s,{defaultActiveKey:"0",size:"large",children:y.map(((e,t)=>a.jsx(s.TabPane,{tab:e.name,children:a.jsx(c,{application:e,checkMenuIds:u?u.menu??[]:[],setDetailApplicationCheckKeysFn:f,applicationIndex:t,openType:o.detail})},t)))})]})})};export{m as default};
