import{r as e,O as i,j as t,K as s,D as o,c as r,B as p}from"./index-1fe6dff8.js";import m from"./index-1ae88dc3.js";import d from"./index-5278e769.js";import l from"./index-533ccd10.js";import n from"./BuildModal-cd6d5943.js";import{pipelineGetOneApi as a}from"./pipeline-b29714ee.js";import"./index-0ee88e2d.js";import"./index-7ad95df9.js";import"./index-17637019.js";import"./PipelineBuildStatus-7922b5e5.js";import"./index-262ec5ed.js";import"./index-80d88ab0.js";import"./index-adfb8488.js";import"./EditOutlined-fbc989f8.js";import"./index-5f67b053.js";import"./TextArea-08e23fd4.js";import"./Input-f98aea5e.js";import"./index-ad901ab1.js";import"./Bo-9e2098a1.js";import"./index-f968f39f.js";import"./api-de7774c8.js";import"./api-f6cf4490.js";import"./pipelineBuildApi-244cc49e.js";import"./buildFlow-58a42584.js";import"./index-9cc62199.js";/* empty css              */import"./uilts-d0a0e0a8.js";import"./dataUtil-5d582940.js";import"./CustomEdge-26faa487.js";import"./StartNode-fa410e19.js";/* empty css             */import"./StageNode-df1c8005.js";import"./context-1bb94677.js";import"./StepNode-eadddb6f.js";import"./submitNowform-3c073972.js";import"./textSubmit-0f3171ae.js";import"./textAreaSubmit-d1dfc909.js";import"./SelectSubmit-9d579393.js";import"./MutSelectSubmit-5dc3359d.js";import"./DateSubmit-c557ba41.js";import"./NumberSubmit-de5567a9.js";import"./FileUploadSubmit-add66fc2.js";import"./PlusOutlined-73232e7a.js";const j=()=>{const[j,c]=e.useState(i.close),[x,u]=e.useState(0),[S,h]=e.useState(0),[b,f]=e.useState({}),y=[{key:"1",label:"构建列表",closeIcon:!1,children:t.jsx(m,{pipelineId:S,refresh:x})},{key:"2",label:"归档信息",closeIcon:!1,children:t.jsx(d,{})},{key:"3",label:"操作日志",closeIcon:!1,children:t.jsx(l,{pipelineId:S,refresh:x})}],I=t.jsx("div",{children:t.jsx(p,{type:"primary",onClick:async()=>{c(i.add)},style:{marginRight:10},children:"构建"})});return e.useEffect((()=>((async()=>{const e=new URLSearchParams(window.location.search),i=parseInt(e.get("pipelineId"));h(i);let t=await a({id:i});r(t)||f(t.data)})(),()=>{})),[]),t.jsxs("div",{children:[t.jsx("div",{children:t.jsx(s,{hideAdd:!0,type:"editable-card",defaultActiveKey:"1",items:y,onChange:e=>{},tabBarExtraContent:I})}),t.jsx("div",{children:t.jsx(o,{title:"构建流水线",open:j!==i.close,footer:!1,width:"75%",destroyOnClose:!0,maskClosable:!1,onClose:()=>c(i.close),children:t.jsx(n,{setBuildModalFn:c,detailId:S,reloadTable:()=>{c(i.close),u((e=>e+1))}})})})]})};export{j as default};
