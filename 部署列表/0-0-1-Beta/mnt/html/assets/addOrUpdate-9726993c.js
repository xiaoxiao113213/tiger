import{F as e,r as a,d as s,j as t,I as l,B as i,O as r,m as d}from"./index-10719960.js";import{aiPipelineGetOneApi as n,aiPipelineUpdateApi as o,aiPipelineSaveApi as c}from"./api-8df9ebdb.js";const m=m=>{const[p]=e.useForm(),[u,x]=a.useState(s);return a.useEffect((()=>((async()=>{if(m.operateEnum===r.edit){let e=await n({aiPipelineId:m.detailId});x(e.data),p.setFieldsValue(e.data)}else p.setFieldsValue(s())})(),()=>{})),[]),t.jsx("div",{children:t.jsxs(e,{form:p,labelCol:{flex:"10%"},wrapperCol:{flex:"90%"},children:[t.jsx(e.Item,{label:"标题",name:"name",rules:[{required:!0}],children:t.jsx(l,{placeholder:"请输入",maxLength:200,showCount:!0})}),t.jsx(e.Item,{label:"描述",name:"remarks",rules:[{required:!0}],children:t.jsx(l.TextArea,{placeholder:"请输入",maxLength:150,showCount:!0,autoSize:{minRows:3,maxRows:5}})}),t.jsxs(e.Item,{wrapperCol:{offset:8,span:16},style:{textAlign:"right"},children:[t.jsx(i,{type:"default",onClick:()=>{m.setAddOrUpdateModalFn(r.close)},style:{marginRight:20},children:"取消"}),t.jsx(i,{type:"primary",onClick:async()=>{if(!(await p.validateFields().catch((()=>!1))))return;const e=await(p?.getFieldsValue());let a;a=m.operateEnum===r.edit?await o({...e,aiPipelineId:m.detailId}):await c({...e}),1e3===a.code&&(d.success(a.msg),m.reloadTable(),m.setAddOrUpdateModalFn(r.close))},children:"确定"})]})]})})};export{m as default};
