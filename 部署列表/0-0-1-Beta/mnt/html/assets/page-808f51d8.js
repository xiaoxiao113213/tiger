import{r as e,O as t,j as a,P as s,B as l,D as i,aC as o,M as r,c as d,m as n}from"./index-03adb9ee.js";import c from"./detail-e8e29617.js";import p from"./addOrUpdate-b1b7e2e0.js";import{taskPageApi as u,taskDeleteApi as m}from"./api-fa7fbf76.js";import{P as x}from"./PlusOutlined-b4032aa8.js";import"./FileView-c1d4a884.js";import"./index-88ad5331.js";import"./index-3585a1a3.js";import"./index-a2b78009.js";import"./EditOutlined-d7a61630.js";import"./FileUploadCom-56501644.js";import"./utils-20c57c3a.js";const y=y=>{const h=e.useRef(),[j,T]=e.useState(t.close),[f,b]=e.useState(),[g,I]=e.useState(t.close),k=e=>{b(e?.taskId),I(e?t.edit:t.add)};e.useEffect((()=>{"1"==y.tagNum&&h.current?.reload()}),[y.tagNum]);const C=[{title:"去除已完成",dataIndex:"isOver",valueType:"select",copyable:!1,search:!0,hideInTable:!0,initialValue:"0",valueEnum:{0:{text:"去除"}}},{title:"名称",dataIndex:"name",valueType:"text",copyable:!1,search:!1},{title:"描述",dataIndex:"remarks",valueType:"text",copyable:!1,search:!1,ellipsis:!0},{title:"开始时间",dataIndex:"startTime",valueType:"date",copyable:!1,search:!1},{title:"结束时间",dataIndex:"endTime",valueType:"date",copyable:!1,search:!1},{title:"进度",dataIndex:"progress",valueType:"text",copyable:!1,search:!1,render:(e,t,s)=>a.jsx(o,{type:"circle",percent:e,size:"small"})},{title:"创建时间",dataIndex:"createTime",valueType:"text",copyable:!1,search:!1},{title:"更新时间",dataIndex:"updateTime",valueType:"text",copyable:!1,search:!1},{title:"操作",valueType:"option",key:"option",width:120,render:(e,s,l,i)=>[a.jsx("a",{onClick:()=>(e=>{b(e.taskId),T(t.detail)})(s),children:"详情"},"detail"),a.jsx("a",{onClick:()=>k(s),children:"编辑"},"edit"),a.jsx("a",{onClick:()=>(async e=>{r?.confirm({title:"是否确认删除",icon:null,onOk:async()=>{let t=await m({taskId:e.taskId});d(t)||(n.success(t.msg),h.current?.reload())}})})(s),children:"删除"},"del")]}];return a.jsxs("div",{children:[a.jsx(s,{columns:C,actionRef:h,cardBordered:!0,params:{},request:async(e={},t,a)=>{let s={pageNum:e.current,pageSize:e.pageSize,pageSort:t},l=await u({...e,...s});return{data:l.data.list,success:1e3===l.code,total:l.data.total}},editable:{type:"multiple"},columnsState:{persistenceKey:"task-pro-table",persistenceType:"localStorage",onChange(e){}},rowKey:"taskId",search:{labelWidth:"auto",defaultCollapsed:!1},options:{setting:{listsHeight:400}},form:{syncToUrl:!1},pagination:{defaultPageSize:10,showSizeChanger:!0},dateFormatter:"string",headerTitle:"配置列表",toolBarRender:()=>[a.jsx(l,{icon:a.jsx(x,{}),onClick:()=>{k()},type:"primary",children:"新建"},"button")]}),a.jsx(i,{title:"详情",open:j!==t.close,width:"50%",destroyOnClose:!0,maskClosable:!1,onClose:()=>T(t.close),footer:null,children:a.jsx("div",{children:a.jsx(c,{detailId:f})})}),a.jsx(i,{title:g==t.edit?"编辑":"新增",open:g!==t.close,width:"50%",destroyOnClose:!0,maskClosable:!1,onClose:()=>I(t.close),footer:null,children:a.jsx("div",{children:a.jsx(p,{detailId:f??0,operateEnum:g,setAddOrUpdateModalFn:I,reloadTable:()=>{h.current?.reload()}})})})]})};export{y as default};
