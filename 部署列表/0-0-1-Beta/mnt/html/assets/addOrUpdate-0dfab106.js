import{F as e,r as a,d as l,j as s,a7 as t,I as r,b as d,R as i,B as n,c,O as o,Y as u,m}from"./index-52537ad8.js";import{deptPageApi as x,deptGetOneApi as p,deptUpdateApi as h,deptSaveApi as j}from"./api-900906c9.js";const f=f=>{const[b]=e.useForm(),[I,w]=a.useState(l),[F,y]=a.useState([]);return a.useEffect((()=>((async()=>{if(x({}).then((e=>{if(c(e))return;let a=[{id:0,name:"顶级"}];a=a.concat(e.data),y(a)})),f.operateEnum===o.edit){let e=await p({id:f.detailId});w(e.data),b.setFieldsValue(e.data)}else b.setFieldsValue({sort:0,disabled:0})})(),()=>{})),[]),s.jsx("div",{children:s.jsxs(e,{form:b,labelCol:{flex:"10%"},wrapperCol:{flex:"90%"},children:[s.jsx(e.Item,{label:"父级部门",name:"parentId",rules:[{required:!0}],children:s.jsx(t,{showSearch:!0,placeholder:"请选择部门",treeDefaultExpandAll:!0,fieldNames:{label:"name",value:"id"},treeData:F})}),s.jsx(e.Item,{label:"名称",name:"name",rules:[{required:!0}],children:s.jsx(r,{placeholder:"请输入"})}),s.jsx(e.Item,{label:"排序",name:"sort",rules:[{required:!0}],children:s.jsx(d,{})}),s.jsx(e.Item,{label:"状态",name:"disabled",rules:[{required:!0}],children:s.jsxs(i.Group,{children:[s.jsx(i,{value:0,children:" 启用 "}),s.jsx(i,{value:1,children:" 禁用 "})]})}),s.jsx(e.Item,{label:"备注",name:"remarks",children:s.jsx(r.TextArea,{allowClear:!0})}),s.jsxs(e.Item,{wrapperCol:{offset:8,span:16},style:{textAlign:"right"},children:[s.jsx(n,{type:"default",onClick:()=>{f.setAddOrUpdateModalFn(o.close)},style:{marginRight:20},children:"取消"}),s.jsx(n,{type:"primary",onClick:async()=>{if(f.operateEnum===o.detail)return;if(!(await b.validateFields().catch((()=>!1))))return;const e=await(b?.getFieldsValue());u(e);let a={};f.operateEnum===o.edit?a=await h({...e,id:f.detailId}):f.operateEnum===o.add&&(a=await j({...e})),1e3===a?.code&&(m.success(a?.msg),f.reloadTable(),f.setAddOrUpdateModalFn(o.close))},children:"确定"})]})]})})};export{f as default};
