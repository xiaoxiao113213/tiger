import{r as e,O as t,j as a,P as l,B as d,D as s,M as o,c as i,m as n}from"./index-1fe6dff8.js";import r from"./detail-9cf50b74.js";import c from"./addOrUpdate-508fa677.js";import{tableFieldPageApi as p,tableFieldDeleteApi as u}from"./api-6bb52dc3.js";import{P as x}from"./PlusOutlined-73232e7a.js";import"./index-262ec5ed.js";import"./index-80d88ab0.js";import"./index-adfb8488.js";import"./EditOutlined-fbc989f8.js";const y=()=>{const y=e.useRef(),[h,b]=e.useState(t.close),[m,I]=e.useState(),[f,g]=e.useState(t.close),j=e=>{I(e?.tableFieldId),g(e?t.edit:t.add)};e.useEffect((()=>{}),[]);const T=[{title:"tableFieldId",dataIndex:"tableFieldId",valueType:"text",copyable:!1,search:!1},{title:"tableId",dataIndex:"tableId",valueType:"text",copyable:!1,search:!1},{title:"databaseBoardId",dataIndex:"databaseBoardId",valueType:"text",copyable:!1,search:!1},{title:"code",dataIndex:"code",valueType:"text",copyable:!1,search:!1},{title:"desc",dataIndex:"desc",valueType:"text",copyable:!1,search:!1},{title:"type",dataIndex:"type",valueType:"text",copyable:!1,search:!1},{title:"length",dataIndex:"length",valueType:"text",copyable:!1,search:!1},{title:"decimal",dataIndex:"decimal",valueType:"text",copyable:!1,search:!1},{title:"flagNotNull",dataIndex:"flagNotNull",valueType:"text",copyable:!1,search:!1},{title:"flagKey",dataIndex:"flagKey",valueType:"text",copyable:!1,search:!1},{title:"defaultValue",dataIndex:"defaultValue",valueType:"text",copyable:!1,search:!1},{title:"flagAutoIncrement",dataIndex:"flagAutoIncrement",valueType:"text",copyable:!1,search:!1},{title:"flagUnsigned",dataIndex:"flagUnsigned",valueType:"text",copyable:!1,search:!1},{title:"操作",valueType:"option",key:"option",width:120,render:(e,l,d,s)=>[a.jsx("a",{onClick:()=>(e=>{I(e.tableFieldId),b(t.detail)})(l),children:"详情"},"detail"),a.jsx("a",{onClick:()=>j(l),children:"编辑"},"edit"),a.jsx("a",{onClick:()=>(async e=>{o?.confirm({title:"是否确认删除",icon:null,onOk:async()=>{let t=await u({tableFieldId:e.tableFieldId});i(t)||(n.success(t.msg),y.current?.reload())}})})(l),children:"删除"},"del")]}];return a.jsxs("div",{children:[a.jsx(l,{columns:T,actionRef:y,cardBordered:!0,params:{},request:async(e={},t,a)=>{let l={pageNum:e.current,pageSize:e.pageSize,pageSort:t},d=await p({...e,...l});return{data:d.data.list,success:1e3===d.code,total:d.data.total}},editable:{type:"multiple"},columnsState:{persistenceKey:"tableField-pro-table",persistenceType:"localStorage",onChange(e){}},rowKey:"tableFieldId",search:{labelWidth:"auto",defaultCollapsed:!1},options:{setting:{listsHeight:400}},form:{syncToUrl:!1},pagination:{defaultPageSize:10,showSizeChanger:!0},dateFormatter:"string",headerTitle:"配置列表",toolBarRender:()=>[a.jsx(d,{icon:a.jsx(x,{}),onClick:()=>{j()},type:"primary",children:"新建"},"button")]}),a.jsx(s,{title:"配置详情",open:h!==t.close,width:"75%",destroyOnClose:!0,maskClosable:!1,onClose:()=>b(t.close),footer:null,children:a.jsx("div",{children:a.jsx(r,{detailId:m})})}),a.jsx(s,{title:f==t.edit?"配置编辑":"配置新增",open:f!==t.close,width:"50%",destroyOnClose:!0,maskClosable:!1,onClose:()=>g(t.close),footer:null,children:a.jsx("div",{children:a.jsx(c,{detailId:m??0,operateEnum:f,setAddOrUpdateModalFn:g,reloadTable:()=>{y.current?.reload()}})})})]})};export{y as default};
