import{r as e,d as t,j as l}from"./index-f2321b57.js";import{docGetOneApi as a}from"./api-45f7a01a.js";import{P as i}from"./index-55f4da4c.js";import"./index-e51db6e5.js";import"./index-d54aef2b.js";import"./EditOutlined-1e526840.js";const d=d=>{const[o,r]=e.useState(t);return e.useEffect((()=>((async()=>{let e=await a({docId:d.detailId});r(e.data)})(),()=>{})),[]),l.jsx("div",{children:l.jsxs(i,{column:2,title:"",tooltip:"",children:[l.jsx(i.Item,{label:"docId",tooltip:"",valueType:"text",children:o.docId},"docId"),l.jsx(i.Item,{label:"name",tooltip:"",valueType:"text",children:o.name},"name"),l.jsx(i.Item,{label:"remarks",tooltip:"",valueType:"text",children:o.remarks},"remarks"),l.jsx(i.Item,{label:"createTime",tooltip:"",valueType:"text",children:o.createTime},"createTime"),l.jsx(i.Item,{label:"createBy",tooltip:"",valueType:"text",children:o.createBy},"createBy"),l.jsx(i.Item,{label:"updateTime",tooltip:"",valueType:"text",children:o.updateTime},"updateTime"),l.jsx(i.Item,{label:"updateBy",tooltip:"",valueType:"text",children:o.updateBy},"updateBy"),l.jsx(i.Item,{label:"deleteFlag",tooltip:"",valueType:"text",children:o.deleteFlag},"deleteFlag")]})})};export{d as default};
