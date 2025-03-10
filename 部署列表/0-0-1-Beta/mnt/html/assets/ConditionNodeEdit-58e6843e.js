import{r as e,j as l,S as s,b as r,I as t,B as i}from"./index-1fe6dff8.js";import{l as o}from"./index-953dfacc.js";import{getStartFormField as a,updatePointScript as n}from"./processApi-33853f9b.js";import{FormFieldTypeEnum as p}from"./Bo-9e2098a1.js";import{processPointGetOneApi as d}from"./pointApi-7316630f.js";import"./Title-952b03be.js";import"./Input-f98aea5e.js";import"./TextArea-08e23fd4.js";import"./Password-ff2218fe.js";import"./QRCodeSVG-710d84ab.js";import"./TaobaoOutlined-8cd58809.js";import"./FileZipFilled-3c93b810.js";import"./BranchesOutlined-c52fb168.js";import"./RightSquareTwoTone-e5897024.js";import"./FileUnknownTwoTone-791de7ab.js";import"./MinusCircleOutlined-47af1d51.js";import"./MoreOutlined-49b0b054.js";import"./PlusCircleOutlined-a72eecfb.js";import"./PlusSquareTwoTone-f51424a0.js";import"./RetweetOutlined-9d2a328f.js";import"./SendOutlined-86da6479.js";import"./TableOutlined-67e609f9.js";const m=m=>{const[u]=o.Form.useForm();e.useState("0");const[c,j]=e.useState([]);e.useEffect((()=>{(async()=>{a({processPointId:m.processPointId}).then((e=>{const l=e.data.filter((e=>e.type===p.number));j(l)}));let e=await d({processPointId:m.processPointId});u.setFieldsValue(e.data.script)})()}),[]);return l.jsxs("div",{children:[l.jsx("h1",{style:{color:"blue"},children:"表单中数字类型的字段可在此处进行加条件"}),l.jsx("br",{}),l.jsx("br",{}),l.jsxs("div",{children:[l.jsxs(o.Form,{form:u,children:[l.jsxs("div",{style:{display:"flex"},children:[l.jsx(o.Form.Item,{label:"",style:{flex:1},name:"uniqueCode",rules:[{required:!0}],labelCol:{span:24},wrapperCol:{span:24},children:l.jsx(s,{style:{width:"100%"},placeholder:"请选择通过条件",options:c,fieldNames:{label:"name",value:"uniqueCode"}})}),l.jsx(o.Form.Item,{style:{flex:1},label:"",name:"sign",rules:[{required:!0}],labelCol:{span:24},wrapperCol:{span:24},children:l.jsx(s,{style:{width:"100%"},placeholder:"请选择通过条件",options:[{value:">",label:">"},{value:">=",label:">="},{value:"<",label:"<"},{value:"<=",label:"<="},{value:"=",label:"="},{value:"!=",label:"!="}]})}),l.jsx(o.Form.Item,{style:{flex:1},label:"",name:"rightValue",rules:[{required:!1}],labelCol:{span:24},wrapperCol:{span:24},children:l.jsx(r,{style:{width:"100%"},placeholder:"请输入数字"})})]}),l.jsx(o.Form.Item,{label:"说明",name:"remarks",rules:[{required:!1}],labelCol:{span:24},wrapperCol:{span:24},children:l.jsx(t.TextArea,{style:{width:"100%"},placeholder:"请输入说明",autoSize:{minRows:3}})})]}),l.jsx("div",{style:{marginTop:"20px",display:"flex",justifyContent:"center"},children:l.jsx(i,{type:"primary",onClick:async()=>{if(!(await u.validateFields().catch((()=>!1))))return;const e=await u.getFieldsValue();await n({script:{...e},processPointId:m.processPointId}),m.closeSelf?.()},children:"保存"})})]})]})};export{m as default};
