import{r as e,O as t,j as a,P as s,B as i,a3 as d,D as l,M as o,c as r,m as n}from"./index-10719960.js";import c from"./addOrUpdate-8b74fdf8.js";import p from"./index-8cac1eeb.js";import{dicPage as u,dicDel as m}from"./dicApi-19a4777b.js";import{P as h}from"./PlusOutlined-cc4f568a.js";import"./addOrUpdate-7f5c9aba.js";import"./api-bfd23b34.js";const x=()=>{const x=e.useRef();e.useState(t.close);const[y,j]=e.useState(),[f,g]=e.useState(t.close),[C,T]=e.useState(t.close),k=e=>{j(e?.id),g(e?t.edit:t.add)},S=async e=>{j(e.id),T(t.detail)};e.useEffect((()=>{}),[]);const b=[{title:"名称",dataIndex:"name",align:"left",valueType:"text",render:(e,t)=>a.jsx("a",{onClick:()=>S(t),children:t.name})},{title:"编码",dataIndex:"code",align:"left",valueType:"text",copyable:!0,render:(e,t)=>a.jsx("a",{onClick:()=>S(t),children:t.code})},{title:"备注",dataIndex:"remarks",valueType:"text",ellipsis:!0,search:!1},{title:"创建时间",key:"showTime",dataIndex:"createTime",valueType:"dateTime",sorter:!0,search:!1},{title:"创建人",dataIndex:"createBy",ellipsis:!0,search:!1,render:(e,t)=>t.createByAccount.account},{title:"操作",valueType:"option",key:"option",width:80,render:(e,t,s,i)=>[a.jsx("a",{onClick:()=>k(t),hidden:d("dic:edit"),children:"编辑"},"log"),a.jsx("a",{onClick:()=>(async e=>{o?.confirm({title:"是否确认删除",icon:null,onOk:async()=>{let t=await m({id:e.id});r(t)||(n.success(t.msg),x.current?.reload())}})})(t),hidden:d("dic:del"),children:"删除"},"rebuild")]}];return a.jsxs("div",{children:[a.jsx(s,{columns:b,actionRef:x,cardBordered:!0,params:{},request:async(e={},t,a)=>{let s={pageNum:e.current,pageSize:e.pageSize,pageSort:t},i=await u({...e,...s});return{data:i.data.list,success:1e3===i.code,total:i.data.total}},editable:{type:"multiple"},columnsState:{persistenceKey:"pro-table-singe-demos",persistenceType:"localStorage",onChange(e){}},rowKey:"id",search:{labelWidth:"auto",defaultCollapsed:!1},options:{setting:{listsHeight:400}},form:{syncToUrl:!1},pagination:{defaultPageSize:20,showSizeChanger:!0},dateFormatter:"string",headerTitle:"字典列表",toolBarRender:()=>[a.jsx(i,{icon:a.jsx(h,{}),onClick:()=>{k()},type:"primary",hidden:d("dic:edit"),children:"新建"},"button")]}),a.jsx(l,{title:"字典值详情",open:C!==t.close,width:"75%",destroyOnClose:!0,maskClosable:!1,onClose:()=>T(t.close),footer:null,children:a.jsx("div",{children:a.jsx(p,{dicId:y,setDicValueModalFn:T,operateEnum:C})})}),a.jsx(l,{title:f==t.edit?"字典编辑":"字典新增",open:f!==t.close,width:"50%",destroyOnClose:!0,maskClosable:!1,onClose:()=>g(t.close),footer:null,children:a.jsx("div",{children:a.jsx(c,{detailId:y??0,operateEnum:f,setAddOrUpdateModalFn:g,reloadTable:()=>{x.current?.reload()}})})})]})};export{x as default};
