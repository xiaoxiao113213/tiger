import{F as e,r as a,j as l,S as s,O as t,I as r,R as i,$ as d,B as n,c as o,Y as c,m as u}from"./index-03adb9ee.js";import{dicValueGetOneApi as m,dicValueUpdateApi as p,dicValueSaveApi as x}from"./api-654a9a38.js";import{dicAll as j}from"./dicApi-3ecc5ba9.js";const h=h=>{const[f]=e.useForm(),[b,I]=a.useState(),[w,y]=a.useState("#A5D886"),[g,A]=a.useState([]);return a.useEffect((()=>((async()=>{if(h.operateEnum===t.edit){let e=await m({id:h.detailId});I(e.data),f.setFieldsValue(e.data),y(e.data.color)}else I({color:"#A5D886"});const e=await j({});if(o(e))return[];let a=e.data.map((e=>({value:e.id,label:e.name})));A(a)})(),()=>{})),[]),l.jsx("div",{children:l.jsxs(e,{form:f,labelCol:{flex:"20%"},wrapperCol:{flex:"80%"},children:[l.jsx(e.Item,{label:"字典",name:"dicId",rules:[{required:!0}],initialValue:h.dicId,children:l.jsx(s,{placeholder:"请输入",options:g,disabled:h.operateEnum===t.edit})}),l.jsx(e.Item,{label:"字典名称",name:"label",rules:[{required:!0}],children:l.jsx(r,{placeholder:"请输入"})}),l.jsx(e.Item,{label:"字典值",name:"value",rules:[{required:!0}],children:l.jsx(r,{})}),l.jsx(e.Item,{label:"状态",name:"disabled",rules:[{required:!0}],initialValue:0,children:l.jsxs(i.Group,{children:[l.jsx(i,{value:0,children:" 启用 "}),l.jsx(i,{value:1,children:" 禁用 "})]})}),b&&l.jsx(e.Item,{label:"颜色",name:"color1",children:l.jsx(d,{showText:!0,defaultValue:b.color,onChange:(e,a)=>{y(a)}})}),l.jsx(e.Item,{label:"备注",name:"remarks",children:l.jsx(r.TextArea,{allowClear:!0})}),l.jsxs(e.Item,{wrapperCol:{offset:8,span:16},style:{textAlign:"right"},children:[l.jsx(n,{type:"default",onClick:()=>{h.setAddOrUpdateModalFn(t.close)},style:{marginRight:20},children:"取消"}),l.jsx(n,{type:"primary",onClick:async()=>{if(h.operateEnum===t.detail)return;if(!(await f.validateFields().catch((()=>!1))))return;const e=await(f?.getFieldsValue());c(e),e.color=w;let a={};h.operateEnum===t.edit?a=await p({...e,id:h.detailId}):h.operateEnum===t.add&&(a=await x({...e})),1e3===a?.code&&(u.success(a?.msg),h.reloadTable(),h.setAddOrUpdateModalFn(t.close))},children:"确定"})]})]})})};export{h as default};
