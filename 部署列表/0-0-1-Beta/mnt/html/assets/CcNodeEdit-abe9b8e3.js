import{r as e,j as s,a7 as l,S as r,I as t,B as a,a8 as i}from"./index-10719960.js";import{l as o}from"./index-c05d5723.js";import{deptPageApi as n}from"./api-5bb72ee6.js";import{getPointSetApi as p,updatePointSetApi as d}from"./processApi-c938a5c9.js";import{roleAllApi as m}from"./api-990bd395.js";import"./Title-5ea514a5.js";import"./Input-f4f01092.js";import"./TextArea-8948f20d.js";import"./Password-88bd354d.js";import"./QRCodeSVG-ffc224cf.js";import"./TaobaoOutlined-8cd58809.js";import"./FileZipFilled-2a2025c5.js";import"./BranchesOutlined-c52fb168.js";import"./RightSquareTwoTone-e5897024.js";import"./FileUnknownTwoTone-791de7ab.js";import"./MinusCircleOutlined-47af1d51.js";import"./MoreOutlined-49b0b054.js";import"./PlusCircleOutlined-a72eecfb.js";import"./PlusSquareTwoTone-f51424a0.js";import"./RetweetOutlined-9d2a328f.js";import"./SendOutlined-86da6479.js";import"./TableOutlined-67e609f9.js";const u=u=>{const[c]=o.Form.useForm();e.useState("0");const[j,h]=e.useState([]),[x,w]=e.useState([]),[f,F]=e.useState([]);e.useEffect((()=>{(async()=>{n({}).then((e=>{h(e.data)})),i().then((e=>{w(e.data)})),m({}).then((e=>{F(e.data)})),p({processPointId:u.processPointId}).then((e=>{c.setFieldsValue(e.data)}))})()}),[]);return s.jsxs("div",{children:[s.jsx("h1",{style:{color:"blue"},children:"抄送人员设置"}),s.jsxs("div",{children:[s.jsxs(o.Form,{form:c,children:[s.jsx(o.Form.Item,{label:"部门",name:"deptIds",rules:[{required:!1}],labelCol:{span:24},wrapperCol:{span:24},children:s.jsx(l,{style:{width:"100%"},placeholder:"请选择部门",treeDefaultExpandAll:!0,fieldNames:{label:"name",value:"id"},treeData:j,multiple:!0})}),s.jsx(o.Form.Item,{label:"人员",name:"userIds",rules:[{required:!1}],labelCol:{span:24},wrapperCol:{span:24},children:s.jsx(r,{style:{width:"100%"},mode:"multiple",showSearch:!0,optionFilterProp:"label",placeholder:"请选择人员",options:x})}),s.jsx(o.Form.Item,{label:"角色",name:"roleIds",rules:[{required:!1}],labelCol:{span:24},wrapperCol:{span:24},children:s.jsx(r,{style:{width:"100%"},mode:"multiple",showSearch:!0,optionFilterProp:"name",fieldNames:{label:"name",value:"id"},placeholder:"请选择角色",options:f})}),s.jsx(o.Form.Item,{label:"说明",name:"remarks",rules:[{required:!1}],labelCol:{span:24},wrapperCol:{span:24},children:s.jsx(t.TextArea,{style:{width:"100%"},placeholder:"请输入说明",autoSize:{minRows:3}})})]}),s.jsx("div",{style:{marginTop:"20px",display:"flex",justifyContent:"center"},children:s.jsx(a,{type:"primary",onClick:async()=>{if(!(await c.validateFields().catch((()=>!1))))return;const e=await c.getFieldsValue();await d({...e,processPointId:u.processPointId}),u.closeSelf?.()},children:"保存"})})]})]})};export{u as default};
