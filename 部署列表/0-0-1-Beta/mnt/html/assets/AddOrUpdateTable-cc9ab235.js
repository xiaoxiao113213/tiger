import{r as e,F as l,j as a,I as s,S as t,$ as r,Y as n}from"./index-10719960.js";import{dicValueApi as o}from"./dicApi-19a4777b.js";const i=()=>{const[l,a]=e.useState([]),[s,t]=e.useState(new Map),[r,n]=e.useState({});return e.useEffect((()=>{(async()=>{let e=await o({code:"mysql_table_type"});a(e.data);let l={},s=new Map;e.data.forEach((e=>{l[e.value]={text:e.label},s.set(e.value,e)})),t(s),n(l)})()}),[]),{MysqlTableTypeList:l,MysqlTableTypeMap:s,MysqlTableTypeValueEnum:r}},d=o=>{const[d]=l.useForm(),{MysqlTableTypeList:u}=i(),[c,m]=e.useState(void 0),p=async()=>{const e=await(d?.getFieldsValue());n(e),o.setTable({...o.table,...e})};return e.useEffect((()=>(d.setFieldsValue(o.table),m(o.table.fillColor),()=>{})),[o.table]),a.jsx("div",{children:a.jsxs(l,{form:d,onChange:p,labelCol:{flex:"10%"},wrapperCol:{flex:"90%"},children:[a.jsx(l.Item,{label:"表名称",name:"code",rules:[{required:!0}],children:a.jsx(s,{placeholder:"请输入"})}),a.jsx(l.Item,{label:"引擎类型",name:"engineType",rules:[{required:!0}],children:a.jsx(t,{placeholder:"请输入",options:u,onChange:p})}),a.jsx(l.Item,{label:"表备注",name:"desc",rules:[{required:!1}],children:a.jsx(s,{placeholder:"请输入"})}),a.jsx(l.Item,{label:"业务描述",name:"remarks",rules:[{required:!1}],children:a.jsx(s.TextArea,{placeholder:"请输入",autoSize:{minRows:5}})}),a.jsx(l.Item,{label:"背景色",name:"color1",children:c?a.jsx(r,{defaultValue:c,onChange:(e,l)=>{m(l),o.setTable({...o.table,fillColor:l})}}):null})]})})};export{d as default};
