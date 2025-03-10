import{F as e,r as t,O as s,i as r,j as i,I as a,S as l,ab as o,B as n,D as m,d,Y as p,m as c}from"./index-10719960.js";import{pipeline_pluginGetOneApi as u,pipeline_pluginUpdateApi as j,pipeline_pluginSaveApi as x}from"./api-94733e85.js";import{otherAccountAllApi as h}from"./api-7031d208.js";import{C as f}from"./index-0e948b02.js";import{serverToClientValue as y,clientToServerValueItem as C}from"./Bo-bcadefc8.js";import S from"./formComponent-402c7b18.js";import b from"./index-fb93998c.js";import{C as g}from"./index-30b704bf.js";import"./Title-5ea514a5.js";import"./Input-f4f01092.js";import"./TextArea-8948f20d.js";import"./customerFieldNew-bd52e5d5.js";import"./customerText-ab37e497.js";import"./customerTextArea-fdf43c64.js";import"./customerSelect-0b789148.js";import"./MinusCircleOutlined-f32dd4d0.js";import"./MinusCircleOutlined-47af1d51.js";import"./PlusOutlined-cc4f568a.js";import"./customerMutSelect-2ed19145.js";import"./CustomerFile-b6b47294.js";import"./CustomerDate-c212afd9.js";import"./customerNumber-f42eabd0.js";import"./DeleteOutlined-91444ec2.js";import"./textSubmit-5aad76e3.js";import"./textAreaSubmit-e3064045.js";import"./SelectSubmit-fba154f7.js";import"./MutSelectSubmit-7d2986fa.js";import"./FileSubmit-52898802.js";import"./DateSubmit-7b5457eb.js";import"./NumberSubmit-61c4b5e2.js";const w=w=>{const[F]=e.useForm(),[k,O]=t.useState({params:[]}),[v,E]=t.useState([]),[N,T]=t.useState(),[A,I]=t.useState(s.close),[D,M]=t.useState(),[V,q]=t.useState([]),[B,L]=t.useState(!1),R=r.useRef(null),[z]=e.useForm(),J=e=>{T(e)};t.useEffect((()=>((async()=>{if(h({}).then((e=>{e.data.forEach((e=>e.id=e.id+"")),E(e.data)})),w.operateEnum===s.edit){let e=await u({id:w.detailId});O(e.data),e.data.params&&(e.data.params.forEach((e=>{y(e)})),q(e.data.params)),F.setFieldsValue(e.data),T(e.data.script)}else F.setFieldsValue(d()),T("")})(),()=>{})),[]);return i.jsxs("div",{children:[i.jsxs(e,{form:F,children:[i.jsx(e.Item,{label:"名称",name:"name",rules:[{required:!0}],children:i.jsx(a,{placeholder:"请输入"})}),i.jsx(e.Item,{label:"脚本类型",name:"scriptType",rules:[{required:!0}],children:i.jsx(l,{options:w.scriptTypeList})}),i.jsx(e.Item,{label:"资源类型",name:"type",rules:[{required:!0}],children:i.jsx(l,{options:w.typeList})}),i.jsx(e.Item,{label:"备注",name:"desc",children:i.jsx(a.TextArea,{allowClear:!0,autoSize:{minRows:2}})}),i.jsxs(o,{children:["脚本 ",i.jsx(n,{type:"link",onClick:()=>I(s.detail),children:"全屏"})]}),void 0!==N&&i.jsx(f,{value:N,language:"shell",onChange:J,reloadValue:D})]}),i.jsx(g,{title:i.jsxs("div",{style:{display:"flex",justifyContent:"space-between"},children:[i.jsx("span",{children:"表单设计"}),i.jsx(n,{type:"link",onClick:()=>L(!0),children:"设计表单"})]}),children:i.jsx(e,{form:z,validateTrigger:"false",onValuesChange:(e,t)=>{V.forEach((t=>{e.hasOwnProperty(t.id)&&(t.value=e[t.id])})),q(V)},children:V.map((e=>i.jsx(b,{initFieldBo:e},e.id)))})}),i.jsxs("div",{style:{textAlign:"center"},children:[i.jsx(n,{type:"default",onClick:()=>{w.setAddOrUpdateModalFn(s.close)},style:{marginRight:20},children:"取消"}),i.jsx(n,{type:"primary",onClick:async()=>{if(!(await F.validateFields().catch((()=>!1))))return;const e=await(F?.getFieldsValue());p(e);const t=JSON.parse(JSON.stringify(V));let r;t.forEach((e=>{C(e)})),r=w.operateEnum===s.edit?await j({...e,id:w.detailId,params:t,script:N}):await x({...e,params:t,script:N}),1e3===r.code&&(c.success(r.msg),w.reloadTable(),w.setAddOrUpdateModalFn(s.close))},children:"确定"})]}),i.jsx(m,{title:"脚本",open:A!==s.close,width:"100%",destroyOnClose:!0,maskClosable:!1,onClose:()=>{I(s.close),M((e=>(e??0)+1))},footer:null,children:void 0!==N&&i.jsx(f,{value:N,language:"shell",onChange:J,readOnly:!1})}),i.jsx(m,{title:"表单设计",open:B,onClose:()=>L(!1),extra:i.jsx(n,{onClick:()=>{const e=R.current?.getFieldList();if(!e)return;e.forEach((t=>{if(""===t.keyName)throw c.error("有字段的唯一标识为空"),new Error("有字段的唯一标识为空");const s=e.filter((e=>e.keyName===t.keyName));if(s.length>1)throw c.error(`有重复的唯一标识【${s[0].keyName}】`),new Error(`有重复的唯一标识【${s[0].keyName}】`)})),q(e);const t={};e.forEach((e=>{t[e.id]=e.value})),z.setFieldsValue(t),L(!1)},type:"primary",children:"确定"}),width:"100%",destroyOnClose:!0,keyboard:!1,children:i.jsx(S,{ref:R,initFormDesign:V,showScope:!0})})]})};export{w as default};
