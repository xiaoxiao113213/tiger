import{F as e,r as a,d as s,j as l,I as t,B as r,O as d,Y as i,m as n}from"./index-f2321b57.js";import{dicGetOne as o,dicEditApi as c,dicSaveApi as m}from"./dicApi-6905b9c5.js";const u=u=>{const[p]=e.useForm(),[x,f]=a.useState(s);return a.useEffect((()=>((async()=>{if(u.operateEnum===d.edit){let e=await o({id:u.detailId});f(e.data),p.setFieldsValue(e.data)}else p.setFieldsValue({sort:0,disabled:0})})(),()=>{})),[]),l.jsx("div",{children:l.jsxs(e,{form:p,labelCol:{flex:"10%"},wrapperCol:{flex:"90%"},children:[l.jsx(e.Item,{label:"名称",name:"name",rules:[{required:!0}],children:l.jsx(t,{placeholder:"请输入"})}),l.jsx(e.Item,{label:"编码",name:"code",rules:[{required:!0}],children:l.jsx(t,{})}),l.jsx(e.Item,{label:"备注",name:"remarks",children:l.jsx(t.TextArea,{allowClear:!0})}),l.jsxs(e.Item,{wrapperCol:{offset:8,span:16},style:{textAlign:"right"},children:[l.jsx(r,{type:"default",onClick:()=>{u.setAddOrUpdateModalFn(d.close)},style:{marginRight:20},children:"取消"}),l.jsx(r,{type:"primary",onClick:async()=>{if(u.operateEnum===d.detail)return;if(!(await p.validateFields().catch((()=>!1))))return;const e=await(p?.getFieldsValue());i(e);let a={};u.operateEnum===d.edit?a=await c({...e,id:u.detailId}):u.operateEnum===d.add&&(a=await m({...e})),1e3===a?.code&&(n.success(a?.msg),u.reloadTable(),u.setAddOrUpdateModalFn(d.close))},children:"确定"})]})]})})};export{u as default};
