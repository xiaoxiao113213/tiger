import{r as t,F as e,j as a,B as i,O as s,m as r,Y as o,c as l}from"./index-f2321b57.js";import{otherAccountAllApi as m}from"./api-557990cc.js";import{pipelineGetOneApi as d}from"./pipeline-69e8b66b.js";import{serverToClientValue as n,clientToServerValueItem as p}from"./Bo-900708b2.js";import{pipelineBuildApi as c}from"./pipelineBuildApi-6237b796.js";import u from"./submitNowform-f35e2701.js";import{C as j}from"./index-e51db6e5.js";import"./textSubmit-4229c5b2.js";import"./textAreaSubmit-14d30dcb.js";import"./SelectSubmit-d0c3571a.js";import"./MutSelectSubmit-d4556965.js";import"./DateSubmit-41050df2.js";import"./NumberSubmit-9c6b3724.js";import"./FileUploadSubmit-a4029aca.js";import"./PlusOutlined-0e19b652.js";const f=f=>{const[b,x]=t.useState([]),[h,y]=t.useState(),[S,w]=t.useState([]),[g]=e.useForm();return t.useEffect((()=>((async()=>{m({}).then((t=>{t.data.forEach((t=>t.id=t.id+"")),x(t.data)}));const t=await d({id:f.detailId});1e3===t?.code&&(y(t.data),t.data.globalParamList&&(t.data.globalParamList.forEach((t=>{n(t)})),w(t.data.globalParamList)))})(),()=>{})),[f.detailId]),a.jsxs("div",{children:[h&&h.globalParamList&&a.jsx(j,{title:a.jsx("div",{style:{display:"flex",justifyContent:"space-between"},children:a.jsx("span",{children:"表单"})}),children:a.jsx(e,{form:g,children:S.map((t=>a.jsx(u,{initFieldBo:t},t.id)))})}),a.jsxs(e.Item,{wrapperCol:{offset:12,span:12},style:{marginTop:10},children:[a.jsx(i,{type:"default",onClick:()=>f.setBuildModalFn(s.close),children:"取消"}),a.jsx(i,{type:"primary",htmlType:"submit",onClick:async()=>{try{if(!(await g.validateFields().catch((()=>!1))))return void r.error("请填写必填项");const t=await(g?.getFieldsValue());o(t);let e=S.map((e=>{const a={...e};return a.value=t[e.id],p(a),{keyName:a.keyName,value:a.value}}));const a={};a.pipelineId=h?.id,a.params=e;const i=await c(a);if(l(i))return;r.info("触发成功"),f.reloadTable()}catch(t){}},style:{marginLeft:20},children:"确认"})]})]})};export{f as default};
