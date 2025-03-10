import{r as e,O as t,j as i,P as a,B as o,D as s,T as l,M as r,c as n,m as d}from"./index-52537ad8.js";import p from"./detail-a45ffada.js";import c from"./addOrUpdate-38ac067b.js";import{aiPipelinePageApi as m,aiPipelineDeleteApi as j}from"./api-56e9332f.js";import u from"./bord-a50fa015.js";import{P as x}from"./PlusOutlined-0403edcb.js";import"./index-ec1d06fe.js";import"./index-f591dfb2.js";import"./ApiBo-a5a04398.js";import"./pointApi-af481cbb.js";/* empty css              */import"./StartNode-6b960a2b.js";import"./Title-0f7b284b.js";import"./Input-33d09d13.js";import"./TextArea-0027e4e6.js";import"./varApi-14a5ea59.js";import"./DeleteOutlined-104cbf00.js";import"./EndNode-62af08d2.js";import"./endOutputForm-a4e0273d.js";import"./edgeApi-e0b4547c.js";import"./AiTextNode-e2bfedc7.js";import"./dicApi-f974ede5.js";import"./inputForm-3521c720.js";import"./outputForm-de3f692f.js";import"./TextAi1Test-900b3652.js";import"./index-cb54e3af.js";import"./FileUploadCom-4d839597.js";import"./utils-490c67f2.js";import"./RightSquareTwoTone-e5897024.js";import"./Timeline-03e196cc.js";import"./AiTextToPicNode-60ff4330.js";import"./inputForm-36d8b392.js";import"./outputForm-b4825cfa.js";import"./ChatModelDic-fb275920.js";import"./api-583dbce0.js";const y=()=>{const y=e.useRef(),[h,T]=e.useState(t.close),[C,I]=e.useState(),[f,g]=e.useState(t.close),[b,v]=e.useState(t.close),k=e=>{I(e?.aiPipelineId),g(e?t.edit:t.add)};e.useEffect((()=>{}),[]);const P=[{title:"ID",dataIndex:"aiPipelineId",valueType:"text",copyable:!1,search:!1},{title:"标题",dataIndex:"name",valueType:"text",copyable:!1,search:!1},{title:"描述",dataIndex:"remarks",valueType:"text",copyable:!1,search:!1,ellipsis:!0},{title:"创建人",dataIndex:"createBy",valueType:"text",copyable:!1,search:!1,render:(e,{createByAccount:t})=>t?.nickName},{title:"创建时间",dataIndex:"createTime",valueType:"text",copyable:!1,search:!1},{title:"更新人",dataIndex:"updateBy",valueType:"text",copyable:!1,search:!1,render:(e,{updateByAccount:t})=>t?.nickName},{title:"更新时间",dataIndex:"updateTime",valueType:"text",copyable:!1,search:!1},{title:"操作",valueType:"option",key:"option",render:(e,a,o,s)=>[i.jsx("a",{onClick:()=>{I(a.aiPipelineId),v(t.add)},children:"编排"},"pipeline"),i.jsx("a",{onClick:()=>(e=>{I(e.aiPipelineId),T(t.detail)})(a),children:"详情"},"detail"),i.jsx("a",{onClick:()=>k(a),children:"编辑"},"edit"),i.jsx("a",{onClick:()=>(async e=>{r?.confirm({title:"是否确认删除",icon:null,onOk:async()=>{let t=await j({aiPipelineId:e.aiPipelineId});n(t)||(d.success(t.msg),y.current?.reload())}})})(a),children:"删除"},"del")]}];return i.jsxs("div",{children:[i.jsx(a,{columns:P,actionRef:y,cardBordered:!0,params:{},request:async(e={},t,i)=>{let a={pageNum:e.current,pageSize:e.pageSize,pageSort:t},o=await m({...e,...a});return{data:o.data.list,success:1e3===o.code,total:o.data.total}},editable:{type:"multiple"},columnsState:{persistenceKey:"aiPipeline-pro-table",persistenceType:"localStorage",onChange(e){}},rowKey:"aiPipelineId",search:{labelWidth:"auto",defaultCollapsed:!1},options:{setting:{listsHeight:400}},form:{syncToUrl:!1},pagination:{defaultPageSize:10,showSizeChanger:!0},dateFormatter:"string",headerTitle:"列表",toolBarRender:()=>[i.jsx(o,{icon:i.jsx(x,{}),onClick:()=>{k()},type:"primary",children:"新建"},"button")]}),i.jsx(s,{title:"详情",open:h!==t.close,width:"75%",destroyOnClose:!0,maskClosable:!1,onClose:()=>T(t.close),footer:null,children:i.jsx("div",{children:i.jsx(p,{detailId:C})})}),i.jsx(s,{title:f==t.edit?"编辑":"新增",open:f!==t.close,width:"50%",destroyOnClose:!0,maskClosable:!1,onClose:()=>g(t.close),footer:null,children:i.jsx("div",{children:i.jsx(c,{detailId:C??0,operateEnum:f,setAddOrUpdateModalFn:g,reloadTable:()=>{y.current?.reload()}})})}),i.jsx(s,{title:i.jsxs("div",{style:{alignItems:"center",alignContent:"center",width:"100%"},children:[i.jsx("span",{children:"编排"}),i.jsx(l,{color:"red",style:{marginLeft:"30px"},children:"流水线的命名，描述，参数的命名和描述 至关重要，ai会去根据这些命名自动化的去赋予对应的参数值和调用"})]}),open:b!==t.close,width:"100%",destroyOnClose:!0,maskClosable:!1,onClose:()=>v(t.close),footer:null,children:i.jsx("div",{children:i.jsx(u,{aiPipelineId:C??0,closeModal:()=>v(t.close)})})})]})};export{y as default};
