import{r as e,d as t,j as l,aC as i}from"./index-03adb9ee.js";import{taskGetOneApi as s}from"./api-fa7fbf76.js";import{F as a}from"./FileView-c1d4a884.js";import{P as r}from"./index-88ad5331.js";import"./index-3585a1a3.js";import"./index-a2b78009.js";import"./EditOutlined-d7a61630.js";const o=o=>{const[m,p]=e.useState(t);return e.useEffect((()=>((async()=>{let e=await s({taskId:o.detailId});p(e.data)})(),()=>{})),[]),l.jsx("div",{children:l.jsxs(r,{column:1,title:"",tooltip:"",children:[l.jsx(r.Item,{label:"名称",tooltip:"",valueType:"text",children:m.name},"name"),l.jsx(r.Item,{label:"描述",tooltip:"",valueType:"text",children:m.remarks},"remarks"),l.jsx(r.Item,{label:"开始时间",tooltip:"",valueType:"date",children:m.startTime},"startTime"),l.jsx(r.Item,{label:"结束时间",tooltip:"",valueType:"date",children:m.endTime},"endTime"),l.jsx(r.Item,{label:"进度",tooltip:"",valueType:"text",children:l.jsx(i,{type:"circle",percent:m.progress,size:"small"})},"progress"),l.jsx(r.Item,{label:"附件",tooltip:"",valueType:"text",children:l.jsx(a,{fileList:m.fileList??[]})},"progress")]})})};export{o as default};
