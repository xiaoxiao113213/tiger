import{F as e,r as a,d as s,j as l,I as t,B as d,O as r,Y as i,m as o}from"./index-f2321b57.js";import{docGetOneApi as n,docUpdateApi as c,docSaveApi as m}from"./api-45f7a01a.js";const p=p=>{const[u]=e.useForm(),[x,f]=a.useState(s);return a.useEffect((()=>((async()=>{if(p.operateEnum===r.edit){let e=await n({docId:p.detailId});f(e.data),u.setFieldsValue(e.data)}else u.setFieldsValue(s())})(),()=>{})),[]),l.jsx("div",{children:l.jsxs(e,{form:u,labelCol:{flex:"10%"},wrapperCol:{flex:"90%"},children:[l.jsx(e.Item,{label:"名称",name:"name",rules:[{required:!0}],children:l.jsx(t,{placeholder:"请输入"})}),l.jsx(e.Item,{label:"描述",name:"remarks",rules:[{required:!0}],children:l.jsx(t.TextArea,{placeholder:"请输入"})}),l.jsxs(e.Item,{wrapperCol:{offset:8,span:16},style:{textAlign:"right"},children:[l.jsx(d,{type:"default",onClick:()=>{p.setAddOrUpdateModalFn(r.close)},style:{marginRight:20},children:"取消"}),l.jsx(d,{type:"primary",onClick:async()=>{if(!(await u.validateFields().catch((()=>!1))))return;const e=await(u?.getFieldsValue());let a;i(e),a=p.operateEnum===r.edit?await c({...e,docId:p.detailId}):await m({...e}),1e3===a.code&&(o.success(a.msg),p.reloadTable(),p.setAddOrUpdateModalFn(r.close))},children:"确定"})]})]})})};export{p as default};
