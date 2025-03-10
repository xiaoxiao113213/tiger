import{r as e,j as i,a7 as s,S as t,B as l,a8 as r,m as a}from"./index-1fe6dff8.js";import{l as o}from"./index-953dfacc.js";import{deptPageApi as p}from"./api-0a5cfd87.js";import{roleAllApi as n}from"./api-b0087b33.js";import{projectPermissionGetApi as d,projectPermissionUpdateApi as m}from"./api-7922a999.js";import"./Title-952b03be.js";import"./Input-f98aea5e.js";import"./TextArea-08e23fd4.js";import"./Password-ff2218fe.js";import"./QRCodeSVG-710d84ab.js";import"./TaobaoOutlined-8cd58809.js";import"./FileZipFilled-3c93b810.js";import"./BranchesOutlined-c52fb168.js";import"./RightSquareTwoTone-e5897024.js";import"./FileUnknownTwoTone-791de7ab.js";import"./MinusCircleOutlined-47af1d51.js";import"./MoreOutlined-49b0b054.js";import"./PlusCircleOutlined-a72eecfb.js";import"./PlusSquareTwoTone-f51424a0.js";import"./RetweetOutlined-9d2a328f.js";import"./SendOutlined-86da6479.js";import"./TableOutlined-67e609f9.js";const u=u=>{const[j]=o.Form.useForm(),[c,h]=e.useState([]),[b,T]=e.useState([]),[x,y]=e.useState([]);e.useEffect((()=>{(async()=>{p({}).then((e=>{h(e.data)})),r().then((e=>{T(e.data)})),n({}).then((e=>{y(e.data)})),d({bizType:u.bizType,bizTypeId:u.bizTypeId}).then((e=>{j.setFieldsValue(e.data)}))})()}),[]);return i.jsxs("div",{children:[i.jsx("h1",{style:{color:"blue"},children:"人员设置"}),i.jsxs("div",{children:[i.jsxs(o.Form,{form:j,children:[i.jsx(o.Form.Item,{label:"部门（选中之后，只有直属这个部门的人才有效，子部门需要单独选）",name:"deptIds",rules:[{required:!1}],labelCol:{span:24},wrapperCol:{span:24},children:i.jsx(s,{style:{width:"100%"},placeholder:"请选择部门",treeDefaultExpandAll:!0,fieldNames:{label:"name",value:"id"},treeData:c,multiple:!0,showSearch:!0,treeNodeFilterProp:"name"})}),i.jsx(o.Form.Item,{label:"人员",name:"userIds",rules:[{required:!1}],labelCol:{span:24},wrapperCol:{span:24},children:i.jsx(t,{style:{width:"100%"},mode:"multiple",showSearch:!0,optionFilterProp:"label",placeholder:"请选择人员",options:b})}),i.jsx(o.Form.Item,{label:"角色",name:"roleIds",rules:[{required:!1}],labelCol:{span:24},wrapperCol:{span:24},children:i.jsx(t,{style:{width:"100%"},mode:"multiple",showSearch:!0,optionFilterProp:"name",fieldNames:{label:"name",value:"id"},placeholder:"请选择角色",options:x})})]}),i.jsx("div",{style:{marginTop:"20px",display:"flex",justifyContent:"center"},children:i.jsx(l,{type:"primary",onClick:async()=>{if(!(await j.validateFields().catch((()=>!1))))return;const e=await j.getFieldsValue();await m({...e,bizType:u.bizType,bizTypeId:u.bizTypeId}),a.success("保存成功"),u.closeFn()},children:"保存"})})]})]})};export{u as default};
