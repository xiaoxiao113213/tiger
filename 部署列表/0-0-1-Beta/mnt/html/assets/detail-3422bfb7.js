import{r as e,d as t,j as l,T as a}from"./index-03adb9ee.js";import{applicationGetOneApi as i}from"./api-d442e634.js";import{P as o}from"./index-88ad5331.js";import"./index-3585a1a3.js";import"./index-a2b78009.js";import"./EditOutlined-d7a61630.js";const r=r=>{const[s,d]=e.useState(t);return e.useEffect((()=>((async()=>{let e=await i({id:r.detailId});d(e.data)})(),()=>{})),[]),l.jsx("div",{children:l.jsxs(o,{column:2,title:"",tooltip:"",children:[l.jsx(o.Item,{label:"名称",tooltip:"",valueType:"text",children:s.name},"name"),l.jsx(o.Item,{label:"编码",tooltip:"",valueType:"text",children:s.code},"code"),l.jsx(o.Item,{label:"排序",tooltip:"",valueType:"text",children:s.sort},"label"),l.jsx(o.Item,{label:"状态",tooltip:"",children:0===s.disabled?l.jsx(a,{color:"green",children:"启用中"}):l.jsx(a,{color:"red",children:"禁用中"})},"disabled"),l.jsx(o.Item,{label:"创建时间",tooltip:"",valueType:"text",children:s.createTime},"createTime"),l.jsx(o.Item,{label:"创建人",tooltip:"",valueType:"text",children:s.createBy},"token"),l.jsx(o.Item,{label:"备注",tooltip:"",valueType:"textarea",children:s.remarks},"desc"),l.jsx(o.Item,{label:"密钥",tooltip:"",valueType:"textarea",copyable:!0,children:s.token},"token")]})})};export{r as default};
