import{r as e,d as t,j as l}from"./index-03adb9ee.js";import{messageGetOneApi as a}from"./api-6a07dbe1.js";import{P as i}from"./index-88ad5331.js";import"./index-3585a1a3.js";import"./index-a2b78009.js";import"./EditOutlined-d7a61630.js";const s=s=>{const[o,d]=e.useState(t);return e.useEffect((()=>((async()=>{let e=await a({messageId:s.detailId});d(e.data)})(),()=>{})),[]),l.jsx("div",{children:l.jsxs(i,{column:2,title:"",tooltip:"",children:[l.jsx(i.Item,{label:"messageId",tooltip:"",valueType:"text",children:o.messageId},"messageId"),l.jsx(i.Item,{label:"type",tooltip:"",valueType:"text",children:o.type},"type"),l.jsx(i.Item,{label:"status",tooltip:"",valueType:"text",children:o.status},"status"),l.jsx(i.Item,{label:"title",tooltip:"",valueType:"text",children:o.title},"title"),l.jsx(i.Item,{label:"msg",tooltip:"",valueType:"text",children:o.msg},"msg"),l.jsx(i.Item,{label:"createBy",tooltip:"",valueType:"text",children:o.createBy},"createBy"),l.jsx(i.Item,{label:"remarks",tooltip:"",valueType:"text",children:o.remarks},"remarks"),l.jsx(i.Item,{label:"bizId",tooltip:"",valueType:"text",children:o.bizId},"bizId"),l.jsx(i.Item,{label:"toAccountId",tooltip:"",valueType:"text",children:o.toAccountId},"toAccountId"),l.jsx(i.Item,{label:"createTime",tooltip:"",valueType:"text",children:o.createTime},"createTime"),l.jsx(i.Item,{label:"updateBy",tooltip:"",valueType:"text",children:o.updateBy},"updateBy"),l.jsx(i.Item,{label:"updateTime",tooltip:"",valueType:"text",children:o.updateTime},"updateTime"),l.jsx(i.Item,{label:"deleteFlag",tooltip:"",valueType:"text",children:o.deleteFlag},"deleteFlag")]})})};export{s as default};
