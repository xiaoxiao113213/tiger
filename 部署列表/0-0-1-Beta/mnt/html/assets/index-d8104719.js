import{r as e,O as t,j as a,P as l,B as s,D as d,T as i,M as r,c as o,m as n}from"./index-52537ad8.js";import c from"./detail-58ebc12c.js";import p from"./addOrUpdate-0a29e10c.js";import{pipelineNodePageApi as u,pipelineNodeDeleteApi as x}from"./api-222992e2.js";import{P as m}from"./PlusOutlined-0403edcb.js";import"./index-a5ca1b9c.js";import"./index-8d66853c.js";import"./index-ec1d06fe.js";import"./EditOutlined-4076ffe0.js";const h=()=>{const h=e.useRef(),[y,j]=e.useState(t.close),[b,f]=e.useState(),[g,C]=e.useState(t.close),T=e=>{f(e?.id),C(e?t.edit:t.add)};e.useEffect((()=>{}),[]);const I=[{title:"id",dataIndex:"id",valueType:"text",copyable:!1,search:!1},{title:"名称",dataIndex:"name",valueType:"text",copyable:!1},{title:"工作目录",dataIndex:"workDir",valueType:"text",copyable:!1,search:!1},{title:"是否禁用",dataIndex:"disabled",render:(e,{disabled:t})=>0===t?a.jsx(i,{color:"green",children:"启用"}):a.jsx(i,{color:"red",children:"禁用"})},{disable:!0,title:"状态",dataIndex:"status",search:!1,renderFormItem:(e,{defaultRender:t})=>t(e),render:(e,{status:t})=>0===t?a.jsx(i,{color:"red",children:"未在线"}):a.jsx(i,{color:"green",children:"已在线"})},{title:"标签",dataIndex:"label",valueType:"text",copyable:!1,search:!1},{title:"并行工作数量",dataIndex:"workNum",valueType:"text",copyable:!1,search:!1},{title:"优先级",dataIndex:"priority",valueType:"text",copyable:!1,search:!1},{title:"ip",dataIndex:"ip",valueType:"text",copyable:!1,search:!1},{title:"操作",valueType:"option",key:"option",width:120,render:(e,l,s,d)=>[a.jsx("a",{onClick:()=>(e=>{f(e.id),j(t.detail)})(l),children:"详情"},"detail"),a.jsx("a",{onClick:()=>T(l),children:"编辑"},"edit"),a.jsx("a",{onClick:()=>(async e=>{r?.confirm({title:"是否确认删除",icon:null,onOk:async()=>{let t=await x({id:e.id});o(t)||(n.success(t.msg),h.current?.reload())}})})(l),children:"删除"},"del")]}];return a.jsxs("div",{children:[a.jsx(l,{columns:I,actionRef:h,cardBordered:!0,params:{},request:async(e={},t,a)=>{let l={pageNum:e.current,pageSize:e.pageSize,pageSort:t},s=await u({...e,...l});return{data:s.data.list,success:1e3===s.code,total:s.data.total}},editable:{type:"multiple"},columnsState:{persistenceKey:"pipelineNode-pro-table",persistenceType:"localStorage",onChange(e){}},rowKey:"id",search:{labelWidth:"auto",defaultCollapsed:!1},options:{setting:{listsHeight:400}},form:{syncToUrl:!1},pagination:{defaultPageSize:10,showSizeChanger:!0},dateFormatter:"string",headerTitle:"配置列表",toolBarRender:()=>[a.jsx(s,{icon:a.jsx(m,{}),onClick:()=>{T()},type:"primary",children:"新建"},"button")]}),a.jsx(d,{title:"配置详情",open:y!==t.close,width:"75%",destroyOnClose:!0,maskClosable:!1,onClose:()=>j(t.close),footer:null,children:a.jsx("div",{children:a.jsx(c,{detailId:b})})}),a.jsx(d,{title:g==t.edit?"配置编辑":"配置新增",open:g!==t.close,width:"50%",destroyOnClose:!0,maskClosable:!1,onClose:()=>C(t.close),footer:null,children:a.jsx("div",{children:a.jsx(p,{detailId:b??0,operateEnum:g,setAddOrUpdateModalFn:C,reloadTable:()=>{h.current?.reload()}})})})]})};export{h as default};
