import{r as e,O as a,j as t,P as s,B as l,a3 as d,D as o,M as i,c as n,m as r}from"./index-f2321b57.js";import p from"./detail-665b0394.js";import c from"./addOrUpdate-92b5cecb.js";import{databaseConfigPageApi as u,databaseConfigDeleteApi as y}from"./api-6611f720.js";import{dicValueApi as m}from"./dicApi-6905b9c5.js";import{P as b}from"./PlusOutlined-0e19b652.js";import"./index-55f4da4c.js";import"./index-e51db6e5.js";import"./index-d54aef2b.js";import"./EditOutlined-1e526840.js";const f=()=>{const[a,t]=e.useState([]),[s,l]=e.useState(new Map),[d,o]=e.useState({});return e.useEffect((()=>{(async()=>{let e=await m({code:"database_type"});e.data.forEach((e=>e.value=parseInt(e.value))),t(e.data);let a={},s=new Map;e.data.forEach((e=>{a[e.value]={text:e.label},s.set(e.value,e)})),l(s),o(a)})()}),[]),{DatabaseTypeList:a,DatabaseTypeMap:s,DatabaseTypeValueEnum:d}},x=()=>{const m=e.useRef(),[x,h]=e.useState(a.close),[j,g]=e.useState(),[C,T]=e.useState(a.close),{DatabaseTypeList:v,DatabaseTypeValueEnum:I,DatabaseTypeMap:S}=f(),k=e=>{g(e?.databaseConfigId),T(e?a.edit:a.add)};e.useEffect((()=>{}),[]);const w=[{title:"库名称",dataIndex:"name",valueType:"text",copyable:!1,search:!1},{title:"类型",dataIndex:"type",valueType:"text",copyable:!1,search:!1,valueEnum:I},{title:"连接地址",dataIndex:"ip",valueType:"text",copyable:!1,search:!1},{title:"端口号",dataIndex:"port",valueType:"text",copyable:!1,search:!1},{title:"用户名",dataIndex:"username",valueType:"text",copyable:!1,search:!1},{title:"备注",dataIndex:"remarks",valueType:"text",copyable:!1,search:!1},{title:"操作",valueType:"option",key:"option",width:120,render:(e,s,l,o)=>[t.jsx("a",{onClick:()=>(e=>{g(e.databaseConfigId),h(a.detail)})(s),children:"详情"},"detail"),t.jsx("a",{onClick:()=>k(s),hidden:d("databaseConfig:edit"),children:"编辑"},"edit"),t.jsx("a",{onClick:()=>(async e=>{i?.confirm({title:"是否确认删除",icon:null,onOk:async()=>{let a=await y({databaseConfigId:e.databaseConfigId});n(a)||(r.success(a.msg),m.current?.reload())}})})(s),hidden:d("databaseConfig:del"),children:"删除"},"del")]}];return t.jsxs("div",{children:[t.jsx(s,{columns:w,actionRef:m,cardBordered:!0,params:{},request:async(e={},a,t)=>{let s={pageNum:e.current,pageSize:e.pageSize,pageSort:a},l=await u({...e,...s});return{data:l.data.list,success:1e3===l.code,total:l.data.total}},editable:{type:"multiple"},columnsState:{persistenceKey:"databaseConfig-pro-table",persistenceType:"localStorage",onChange(e){}},rowKey:"databaseConfigId",search:{labelWidth:"auto",defaultCollapsed:!1},options:{setting:{listsHeight:400}},form:{syncToUrl:!1},pagination:{defaultPageSize:10,showSizeChanger:!0},dateFormatter:"string",headerTitle:"配置列表",toolBarRender:()=>[t.jsx(l,{icon:t.jsx(b,{}),onClick:()=>{k()},type:"primary",hidden:d("databaseConfig:edit"),children:"新建"},"button")]}),t.jsx(o,{title:"配置详情",open:x!==a.close,width:"75%",destroyOnClose:!0,maskClosable:!1,onClose:()=>h(a.close),footer:null,children:t.jsx("div",{children:t.jsx(p,{detailId:j,DatabaseTypeMap:S})})}),t.jsx(o,{title:C===a.edit?"配置编辑":"配置新增",open:C!==a.close,width:"50%",destroyOnClose:!0,maskClosable:!1,onClose:()=>T(a.close),footer:null,children:t.jsx("div",{children:t.jsx(c,{detailId:j??0,operateEnum:C,setAddOrUpdateModalFn:T,reloadTable:()=>{m.current?.reload()},DatabaseTypeList:v})})})]})};export{x as default};
