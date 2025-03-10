import{F as e,r as t,O as i,i as s,aj as l,j as r,B as o,I as a,S as n,ab as p,D as m,ak as d,Y as c,al as u,m as j}from"./index-03adb9ee.js";import{isStage as f,getStageId as x,isStep as h,getStepId as S,isStart as y,getStage as g,getStageParent as b,getStep as C,getStepStage as N}from"./index-7ad95df9.js";import w from"./stageComponent-66e485ae.js";import I from"./stepComponent-9efb724d.js";import{pipelinePluginDetailGlobalParamApi as L}from"./api-8691a2b8.js";import{clientToServerValueItem as F,serverToClientValue as k}from"./Bo-c1a8a5bb.js";import v from"./PipelineFlow-a4f586d2.js";import{PipelineContext as O}from"./context-3c44e91e.js";import D from"./index-dc46b847.js";import T from"./formComponent-661a5f6d.js";import{pipelineUpdateApi as E,pipelineSaveApi as P,pipelineGetOneApi as A}from"./pipeline-ea2f224f.js";import{pipelineNodeAllApi as q}from"./api-fd3812b8.js";import{otherAccountAllApi as B}from"./api-e992af87.js";import{C as J}from"./index-3585a1a3.js";import"./index-173fa263.js";import"./submitNowform-fbdcf9ab.js";import"./textSubmit-bd6c5b40.js";import"./textAreaSubmit-3b52d66b.js";import"./SelectSubmit-4c180fb2.js";import"./MutSelectSubmit-064a257d.js";import"./DateSubmit-95284b79.js";import"./NumberSubmit-77884c9b.js";import"./FileUploadSubmit-e8f92bb2.js";import"./PlusOutlined-b4032aa8.js";import"./index-19b1aa5f.js";/* empty css              */import"./uilts-8b8185ea.js";import"./StartNode-c7411ad4.js";/* empty css             */import"./dataUtil-954be25d.js";import"./StageNode-e435ce7e.js";import"./StepNode-d82bcaf5.js";import"./CustomEdge-6ea755a4.js";import"./FileSubmit-a73b537e.js";import"./Title-06decefc.js";import"./Input-51214805.js";import"./TextArea-24b2fc1a.js";import"./customerFieldNew-4c66ff92.js";import"./customerText-d905b3cb.js";import"./customerTextArea-b54e4aae.js";import"./customerSelect-ae4ebf75.js";import"./MinusCircleOutlined-ad177d4a.js";import"./MinusCircleOutlined-47af1d51.js";import"./customerMutSelect-fbe47964.js";import"./CustomerFile-75bdcaec.js";import"./CustomerDate-852678e3.js";import"./customerNumber-dffe68a9.js";import"./DeleteOutlined-2f949a39.js";const M=M=>{const[V]=e.useForm(),[z,R]=t.useState(),[U,$]=t.useState(0),[G,H]=t.useState(0),[X,Y]=t.useState(i.close),[K,Q]=t.useState(i.close),[W,Z]=t.useState(!1),_=s.useRef(null),[ee]=e.useForm(),[te,ie]=t.useState([]),[se,le]=t.useState([]),[re,oe]=t.useState(),[ae,ne]=t.useState(),pe=()=>{M.pipelineId?(async e=>{const t=await A({id:e});if(1e3!==t?.code)return;R({...t.data});const i=t.data.globalParamList??[];i.forEach((e=>{k(e)})),ie(i),V?.setFieldsValue({...t.data}),t.data.permissionList})(M.pipelineId):R({pipelineStageList:[]}),le([{id:1,name:"软件1"},{id:3,name:"软件2"},{id:2,name:"软件3"}]),q({}).then((e=>{oe(e.data)})),B({}).then((e=>{e.data.forEach((e=>e.id=e.id+"")),ne(e.data)}))};if(t.useEffect((()=>{let e=l(z?.pipelineStageList??[]),t=[];return L(e.map((e=>e.pipelinePluginDetailId))).then((e=>{t=t.concat(e.data);let i=[];te&&te.forEach((e=>{if(0===e.pipelinePluginDetailId)i.push(e);else{t.find((t=>t.keyName===e.keyName&&t.pipelinePluginDetailId===e.pipelinePluginDetailId))&&i.push(e)}})),t.forEach((e=>{i.find((t=>t.keyName===e.keyName))||i.push(e)}));let s=i.filter((e=>0!==e.pipelinePluginDetailId));s.push(...i.filter((e=>0===e.pipelinePluginDetailId))),ie(s)})),()=>{}}),[K,z]),t.useEffect((()=>{pe()}),[]),!(z&&re&&ae&&se&&te))return r.jsx("div",{});const me=(e,t)=>{"详情"===e?f(t)?($(parseInt(x(t))),Y(i.detail)):h(t)&&(H(parseInt(S(t))),Q(i.detail)):"修改"===e?f(t)?($(parseInt(x(t))),Y(i.edit)):h(t)&&(H(parseInt(S(t))),Q(i.edit)):"添加子阶段"===e?f(t)?($(parseInt(x(t))),Y(i.add)):h(t)||y(t)&&($(0),Y(i.add)):"添加步骤"===e?f(t)&&($(parseInt(x(t))),Q(i.add)):"删除"===e&&(f(t)?R((e=>{let i=parseInt(x(t)),s=g(i,e.pipelineStageList),l=b(i,e.pipelineStageList,null);if(l){const e=l.sonStageList.indexOf(s);-1!==e&&l.sonStageList.splice(e,1)}else{const t=e.pipelineStageList.indexOf(s);-1!==t&&e.pipelineStageList.splice(t,1)}return JSON.parse(JSON.stringify(e))})):h(t)&&R((e=>{let i=parseInt(S(t)),s=C(i,e.pipelineStageList),l=N(i,e.pipelineStageList);const r=l.stepList.indexOf(s);return-1!==r&&l.stepList.splice(r,1),JSON.parse(JSON.stringify(e))})))};return r.jsxs("div",{children:[r.jsx("div",{style:{textAlign:"right"},children:r.jsx(o,{type:"primary",onClick:async()=>{if(!(await V.validateFields().catch((()=>!1))))return;const e=await(V?.getFieldsValue());c(e);const t=te.map((e=>{const t={...e};return F(t),t}));let i;if(z?.id){let s={...z,...e,globalParamList:t};i=await E(u(s))}else{let s={...z,...e,globalParamList:t};i=await P(u(s))}1e3===i?.code&&(j.success(i?.msg),M.reloadTable())},children:"保存"})}),r.jsxs(O.Provider,{value:{nodeClickFn:me,pipelineOpenType:M.openType},children:[r.jsx("div",{className:"mySpace mmm-bgcolor",children:r.jsx(J,{children:r.jsxs(e,{form:V,autoComplete:"off",disabled:M.openType===i.detail,labelCol:{flex:"23%"},wrapperCol:{flex:"77%"},children:[r.jsxs("div",{className:"myLine",children:[r.jsx(e.Item,{label:"流水线名称",name:"name",rules:[{required:!0}],children:r.jsx(a,{placeholder:"请输入",autoComplete:"new-password"})}),r.jsx(e.Item,{label:"所属软件",name:"softIds",rules:[{required:!0}],children:r.jsx(n,{mode:"multiple",options:se,fieldNames:{label:"name",value:"id"}})})]}),r.jsx("div",{className:"myLine",style:{width:"50%"},children:r.jsx(e.Item,{label:"执行机标签",name:"pipelineNodeLabel",rules:[{required:!0}],children:r.jsx(n,{options:re,fieldNames:{label:"label",value:"label"}})})})]})})}),r.jsx(p,{children:"全局参数"}),r.jsx(J,{title:r.jsxs("div",{style:{display:"flex",justifyContent:"space-between"},children:[r.jsx("span",{children:"表单设计"}),r.jsx(o,{type:"link",onClick:()=>Z(!0),children:"设计表单"})]}),children:r.jsx(e,{form:ee,validateTrigger:"false",onValuesChange:(e,t)=>{const i=te;i.forEach((t=>{e.hasOwnProperty(t.id)&&(t.value=e[t.id])})),ie(i)},children:te.map((e=>r.jsx(D,{initFieldBo:e},e.id)))})}),r.jsx(p,{children:"构建视图"}),r.jsx("div",{className:"mmm-bgcolor",children:r.jsx(J,{children:r.jsx("div",{children:r.jsx(v,{detail:z,nodeClickFn:me,openType:M.openType})})})}),r.jsx(m,{title:d(X)+"-阶段",open:X!==i.close,width:"50%",destroyOnClose:!0,maskClosable:!1,onClose:()=>Y(i.close),footer:null,children:r.jsx("div",{children:r.jsx(w,{detail:z,stageComponentOpenType:X,setStageComponentOpenTypeFn:Y,pipelineNodeList:re,id:U,setDetailFn:R})})}),r.jsx(m,{title:d(K)+"-步骤",open:K!==i.close,width:"70%",destroyOnClose:!0,maskClosable:!1,onClose:()=>Q(i.close),footer:null,children:r.jsx("div",{children:r.jsx(I,{detail:z,stepComponentOpenType:K,setStepComponentOpenTypeFn:Q,pipelineNodeList:re,stepId:G,stageId:U,setDetailFn:R,otherAccountList:ae})})}),r.jsx(m,{title:"表单设计",open:W,onClose:()=>Z(!1),extra:r.jsx(o,{onClick:()=>{const e=_.current?.getFieldList();if(!e)return;e.forEach((t=>{if(""===t.keyName)throw j.error("有字段的唯一标识为空"),new Error("有字段的唯一标识为空");const i=e.filter((e=>e.keyName===t.keyName));if(i.length>1)throw j.error(`有重复的唯一标识【${i[0].keyName}】`),new Error(`有重复的唯一标识【${i[0].keyName}】`)})),ie(e);const t={};e.forEach((e=>{t[e.id]=e.value})),ee.setFieldsValue(t),Z(!1)},type:"primary",children:"确定"}),width:"100%",destroyOnClose:!0,keyboard:!1,children:r.jsx(T,{ref:_,initFormDesign:te,showScope:!1,isEditScope:!1})},"formDesign")]})]})};export{M as default};
