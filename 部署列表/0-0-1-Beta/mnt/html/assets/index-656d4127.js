import{r as e,O as t,j as i,P as s,B as o,a3 as a,D as l,ak as r,aD as n,M as d,m as p}from"./index-52537ad8.js";import m from"./BuildModal-949ec941.js";import{pipelinePageApi as c,pipelineUpdateDisabledApi as u,pipelineDeleteApi as j}from"./pipeline-5a55b6de.js";import{dicValueApi as h}from"./dicApi-f974ede5.js";import x from"./accountSetting-04b55448.js";import S from"./pipelineOtherAdd-e4a8db16.js";import y from"./pipelineMainAdd-db9c59bc.js";import{T as b}from"./index-d6118671.js";import{P as C}from"./PlusOutlined-0403edcb.js";import"./api-8573b5cc.js";import"./Bo-cc27e439.js";import"./pipelineBuildApi-4ee185cc.js";import"./submitNowform-370ac6e7.js";import"./textSubmit-f698ce92.js";import"./textAreaSubmit-9cc0fcd3.js";import"./SelectSubmit-a0546f42.js";import"./MutSelectSubmit-978c5f1c.js";import"./DateSubmit-7515399a.js";import"./NumberSubmit-d54ed6cf.js";import"./FileUploadSubmit-1e28b47f.js";import"./index-8d66853c.js";import"./index-385cacc2.js";import"./Title-0f7b284b.js";import"./Input-33d09d13.js";import"./TextArea-0027e4e6.js";import"./Password-207dd782.js";import"./QRCodeSVG-eefef35a.js";import"./TaobaoOutlined-8cd58809.js";import"./FileZipFilled-239e2818.js";import"./BranchesOutlined-c52fb168.js";import"./RightSquareTwoTone-e5897024.js";import"./FileUnknownTwoTone-791de7ab.js";import"./MinusCircleOutlined-47af1d51.js";import"./MoreOutlined-49b0b054.js";import"./PlusCircleOutlined-a72eecfb.js";import"./PlusSquareTwoTone-f51424a0.js";import"./RetweetOutlined-9d2a328f.js";import"./SendOutlined-86da6479.js";import"./TableOutlined-67e609f9.js";import"./api-900906c9.js";import"./api-29516818.js";import"./index-7ad95df9.js";import"./stageComponent-fe605383.js";import"./context-96d01b3e.js";import"./stepComponent-eac69a8d.js";import"./api-ed2ab3d9.js";import"./index-a6bd6bca.js";import"./PipelineFlow-2f0bf3ee.js";import"./index-f591dfb2.js";/* empty css              */import"./uilts-69ee15ee.js";import"./StartNode-63179638.js";/* empty css             */import"./dataUtil-725c2a7d.js";import"./StageNode-52a71548.js";import"./StepNode-2cb45518.js";import"./CustomEdge-74ff2b7a.js";import"./index-f6caee0f.js";import"./FileSubmit-f1303890.js";import"./formComponent-546559ea.js";import"./customerFieldNew-1985dcb7.js";import"./customerText-7f38fb85.js";import"./customerTextArea-84d38379.js";import"./customerSelect-aabfe871.js";import"./MinusCircleOutlined-37395b9b.js";import"./customerMutSelect-c1e3cf9e.js";import"./CustomerFile-7877d17f.js";import"./CustomerDate-9ed3e0ba.js";import"./customerNumber-33ced8f3.js";import"./DeleteOutlined-104cbf00.js";import"./api-222992e2.js";const w=()=>{const[t,i]=e.useState([]),[s,o]=e.useState(new Map),[a,l]=e.useState({});return e.useEffect((()=>{(async()=>{let e=await h({code:"pipeline_use_status"});e.data.forEach((e=>e.value=parseInt(e.value))),i(e.data);let t={},s=new Map;e.data.forEach((e=>{t[e.value]={text:e.label},s.set(e.value,e)})),o(s),l(t)})()}),[]),{PipelineUseStatusList:t,PipelineUseStatusMap:s,PipelineUseStatusValueEnum:a}},T=()=>{const h=e.useRef(),[T,f]=e.useState(t.close),[k,g]=e.useState(),[O,I]=e.useState(t.close);let{PipelineUseStatusValueEnum:B}=w();const[F,M]=e.useState(t.close),[P,v]=e.useState(t.close),z=(e,i)=>{switch(e){case"other":g(i.id),v(t.add);break;case"delete":(async e=>{d?.confirm({title:"是否删除该条数据",content:e.name,icon:null,onOk:async()=>{const t=await j({id:e?.id});1e3===t?.code&&(p.success(t?.msg),h?.current?.reload())}})})(i);break;case"permission":g(i.id),M(t.add)}},A=[{title:"ID",dataIndex:"id",width:"80px",valueType:"text",search:!1},{title:"名称",dataIndex:"name",render:(e,s)=>i.jsx("a",{style:{color:"#1668dc"},onClick:()=>(async e=>{g(e.id),f(t.detail)})(s),children:s.name})},{title:"状态",dataIndex:"disabled",search:!1,render:(e,{disabled:t,id:s})=>i.jsx(n,{defaultValue:0===t,onChange:e=>{((e,t)=>{u({id:e,disabled:t?0:1}).then((e=>{e.code}))})(s,e)}})},{title:"使用状态",search:!1,dataIndex:"useStatus",valueEnum:B},{title:"最后构建时长",search:!1,dataIndex:"lastBuildTotalTime"},{title:"最后构建结果",search:!1,dataIndex:"lastBuildStatus"},{title:"创建人",search:!1,dataIndex:"updateBy"},{title:"创建时间",search:!1,dataIndex:"createTime"},{title:"操作",valueType:"option",width:170,key:"operation",render:(e,s)=>[i.jsx(o,{onClick:()=>(async e=>{window.open("/pipelineBuild?pipelineId="+e.id,"_blank")})(s),size:"small",type:"link",children:"构建列表"},"buildList"),i.jsx(o,{onClick:()=>(async e=>{g(e.id),I(t.add)})(s),size:"small",type:"link",children:"构建"},"build"),i.jsx(o,{onClick:()=>(async e=>{g(e.id),f(t.edit)})(s),size:"small",type:"link",hidden:a("pipeline:edit"),children:"编辑"},"edit"),i.jsx(b,{onSelect:e=>z(e,s),menus:[{key:"permission",name:"权限",hidden:a("pipeline:permission")},{key:"other",name:"其他配置",hidden:a("pipeline:edit")},{key:"delete",name:"删除",danger:!0,hidden:a("pipeline:del")}]},"actionGroup")]}];return i.jsxs("div",{children:[i.jsx(s,{columns:A,actionRef:h,cardBordered:!0,params:{},request:async(e={},t,i)=>{let s={pageNum:e.current,pageSize:e.pageSize,pageSort:t},o=await c({...e,...s});return{data:o.data.list,success:1e3===o.code,total:o.data.total}},editable:{type:"multiple"},columnsState:{persistenceKey:"pipeline-pro-table",persistenceType:"localStorage",onChange(e){}},rowKey:"id",search:{labelWidth:"auto"},options:{setting:{listsHeight:400}},form:{syncToUrl:!1},pagination:{defaultPageSize:10,showSizeChanger:!0},dateFormatter:"string",headerTitle:"配置列表",toolBarRender:()=>[i.jsx(o,{icon:i.jsx(C,{}),onClick:()=>{(async()=>{g(void 0),f(t.add)})()},type:"primary",hidden:a("pipeline:add"),children:"新建"},"button")]}),i.jsx(l,{title:r(T),open:T!==t.close,width:"100%",destroyOnClose:!0,maskClosable:!1,onClose:()=>f(t.close),footer:null,keyboard:!1,children:i.jsx(y,{openType:T,pipelineId:k,reloadTable:()=>{f(t.close),h?.current?.reload()}})},"pipelineTab"),i.jsx(l,{title:"构建流水线",open:O!==t.close,footer:!1,width:"75%",destroyOnClose:!0,maskClosable:!1,onClose:()=>I(t.close),children:i.jsx(m,{setBuildModalFn:I,detailId:k,reloadTable:()=>{h?.current?.reload(),I(t.close)}})}),i.jsx(l,{title:"项目人员",open:F!==t.close,onClose:()=>M(t.close),width:"80%",destroyOnClose:!0,children:i.jsx(x,{pipelineId:k,closeFn:()=>M(t.close)})},"accountSetting"),i.jsx(l,{title:"其他配置",open:P!==t.close,onClose:()=>v(t.close),width:"80%",destroyOnClose:!0,children:i.jsx(S,{pipelineId:k,closeFn:()=>v(t.close)})},"otherSetting")]})};export{T as default};
