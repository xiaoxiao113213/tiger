import{F as e,r as a,j as l,a7 as s,R as r,I as t,b as d,B as i,c as n,O as c,Y as u,m as o,d as p}from"./index-52537ad8.js";import{modulePageApi as m,moduleGetOneApi as h,moduleUpdateApi as x,moduleSaveApi as j}from"./api-6777dbf2.js";const I=I=>{const[f]=e.useForm(),[b,v]=a.useState({}),[y,g]=a.useState([]);return a.useEffect((()=>((async()=>{if(m({applicationId:I.applicationId}).then((e=>{if(n(e))return;let a=[{id:0,name:"顶级",labelName:"顶级"}];a=a.concat(e.data),g(a)})),I.operateEnum===c.edit){let e=await h({id:I.detailId});v(e.data),f.setFieldsValue(e.data)}else f.setFieldsValue({sort:0,disabled:0,showFlag:1,type:0,parentId:I.parentId})})(),()=>{})),[]),l.jsx("div",{children:l.jsxs(e,{form:f,labelCol:{flex:"13%"},wrapperCol:{flex:"80%"},onValuesChange:(e,a)=>{v({...b,...e})},children:[l.jsx(e.Item,{label:"父级菜单",name:"parentId",rules:[{required:!0}],children:l.jsx(s,{showSearch:!0,placeholder:"请选择菜单",treeDefaultExpandAll:!0,fieldNames:{label:"labelName",value:"id"},treeData:y})}),l.jsx(e.Item,{label:"类型",name:"type",rules:[{required:!0}],children:l.jsxs(r.Group,{defaultValue:0,children:[l.jsx(r,{value:0,children:" 目录 "}),l.jsx(r,{value:1,children:" 菜单 "}),l.jsx(r,{value:2,children:" 按钮 "}),l.jsx(r,{value:3,children:" 独立页面 "})]})}),l.jsx(e.Item,{label:"名称",name:"name",rules:[{required:!0}],children:l.jsx(t,{placeholder:"请输入"})}),l.jsx(e.Item,{label:"权限编码",name:"permission",rules:[{required:!0}],tooltip:"也是路由地址  唯一性 ",children:l.jsx(t,{placeholder:"请输入"})}),(1===b.type||3===b.type)&&l.jsx(e.Item,{label:"页面路径地址",name:"component",rules:[{required:!0}],children:l.jsx(t,{placeholder:"请输入"})}),l.jsx(e.Item,{label:"排序",name:"sort",rules:[{required:!0}],children:l.jsx(d,{})}),l.jsx(e.Item,{label:"状态",name:"disabled",rules:[{required:!0}],children:l.jsxs(r.Group,{children:[l.jsx(r,{value:0,children:" 启用 "}),l.jsx(r,{value:1,children:" 禁用 "})]})}),l.jsx(e.Item,{label:"菜单展示",name:"showFlag",rules:[{required:!0}],children:l.jsxs(r.Group,{children:[l.jsx(r,{value:1,children:" 是 "}),l.jsx(r,{value:0,children:" 否 "})]})}),l.jsxs(e.Item,{wrapperCol:{offset:8,span:16},style:{textAlign:"right"},children:[l.jsx(i,{type:"default",onClick:()=>{I.setAddOrUpdateModalFn(c.close)},style:{marginRight:20},children:"取消"}),l.jsx(i,{type:"primary",onClick:async()=>{if(I.operateEnum===c.detail)return;if(!(await f.validateFields().catch((()=>!1))))return;const e=await(f?.getFieldsValue());u(e);let a=p();I.operateEnum===c.edit?a=await x({...e,id:I.detailId}):I.operateEnum===c.add&&(a=await j({...e,applicationId:I.applicationId})),1e3===a?.code&&(o.success(a?.msg),I.reloadTable(),I.setAddOrUpdateModalFn(c.close))},children:"确定"})]})]})})};export{I as default};
