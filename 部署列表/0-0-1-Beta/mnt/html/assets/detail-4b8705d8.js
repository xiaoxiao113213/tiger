import{r as e,d as t,j as l}from"./index-10719960.js";import{tableGetOneApi as a}from"./api-b9b0b7e7.js";import{P as d}from"./index-4b23e8f2.js";import"./index-30b704bf.js";import"./index-be16395f.js";import"./EditOutlined-34dfcda0.js";const i=i=>{const[o,s]=e.useState(t);return e.useEffect((()=>((async()=>{let e=await a({tableId:i.detailId});s(e.data)})(),()=>{})),[]),l.jsx("div",{children:l.jsxs(d,{column:2,title:"",tooltip:"",children:[l.jsx(d.Item,{label:"tableId",tooltip:"",valueType:"text",children:o.tableId},"tableId"),l.jsx(d.Item,{label:"code",tooltip:"",valueType:"text",children:o.code},"code"),l.jsx(d.Item,{label:"desc",tooltip:"",valueType:"text",children:o.desc},"desc"),l.jsx(d.Item,{label:"indexList",tooltip:"",valueType:"text",children:o.indexList},"indexList"),l.jsx(d.Item,{label:"databaseBoardId",tooltip:"",valueType:"text",children:o.databaseBoardId},"databaseBoardId"),l.jsx(d.Item,{label:"y",tooltip:"",valueType:"text",children:o.y},"y"),l.jsx(d.Item,{label:"x",tooltip:"",valueType:"text",children:o.x},"x"),l.jsx(d.Item,{label:"createTime",tooltip:"",valueType:"text",children:o.createTime},"createTime"),l.jsx(d.Item,{label:"createBy",tooltip:"",valueType:"text",children:o.createBy},"createBy"),l.jsx(d.Item,{label:"updateTime",tooltip:"",valueType:"text",children:o.updateTime},"updateTime"),l.jsx(d.Item,{label:"updateBy",tooltip:"",valueType:"text",children:o.updateBy},"updateBy"),l.jsx(d.Item,{label:"deleteFlag",tooltip:"",valueType:"text",children:o.deleteFlag},"deleteFlag")]})})};export{i as default};
