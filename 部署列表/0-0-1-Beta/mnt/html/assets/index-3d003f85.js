import{r as e,O as t,j as a,P as s,B as d,a3 as i,D as l,T as r,M as o,c as n,m as c}from"./index-f2321b57.js";import p from"./detail-77752901.js";import u from"./addOrUpdate-a60a83c5.js";import{deptPageApi as m,deptDeleteApi as x}from"./api-df708061.js";import{P as h}from"./PlusOutlined-0e19b652.js";import"./index-55f4da4c.js";import"./index-e51db6e5.js";import"./index-d54aef2b.js";import"./EditOutlined-1e526840.js";const j=()=>{const j=e.useRef(),[y,f]=e.useState(t.close),[g,T]=e.useState(),[C,b]=e.useState(t.close),k=e=>{T(e?.id),b(e?t.edit:t.add)};e.useEffect((()=>{}),[]);const v=[{title:"名称",dataIndex:"name",valueType:"text"},{title:"排序",dataIndex:"sort",valueType:"text",search:!1},{disable:!0,title:"状态",dataIndex:"disabled",search:!1,render:(e,{disabled:t})=>0===t?a.jsx(r,{color:"green",children:"启用"}):a.jsx(r,{color:"red",children:"禁用"})},{title:"备注",dataIndex:"remarks",valueType:"text",ellipsis:!0,width:80,search:!1},{title:"创建人",dataIndex:"createBy",ellipsis:!0,search:!1,render:(e,t)=>t.createByAccount.account},{title:"创建时间",key:"showTime",dataIndex:"createTime",valueType:"dateTime",sorter:!0,search:!1},{title:"操作",valueType:"option",key:"option",render:(e,s,d,l)=>[a.jsx("a",{onClick:()=>(e=>{T(e.id),f(t.detail)})(s),children:"详情"},"detail"),a.jsx("a",{onClick:()=>k(s),hidden:i("dept:edit"),children:"编辑"},"log"),a.jsx("a",{onClick:()=>(async e=>{o?.confirm({title:"是否确认删除",icon:null,onOk:async()=>{let t=await x({id:e.id});n(t)||(c.success(t.msg),j.current?.reload())}})})(s),hidden:i("dept:del"),children:"删除"},"rebuild")]}];return a.jsxs("div",{children:[a.jsx(s,{columns:v,actionRef:j,cardBordered:!0,params:{},request:async(e={},t,a)=>{let s={pageNum:e.current,pageSize:e.pageSize,pageSort:t},d=await m({...e,...s});return{data:d.data,success:1e3===d.code}},editable:{type:"multiple"},columnsState:{persistenceKey:"pro-table-singe-demos",persistenceType:"localStorage",onChange(e){}},rowKey:"id",search:{labelWidth:"auto",defaultCollapsed:!1},options:{setting:{listsHeight:400}},form:{syncToUrl:!1},pagination:!1,dateFormatter:"string",headerTitle:"部门列表",toolBarRender:()=>[a.jsx(d,{icon:a.jsx(h,{}),onClick:()=>{k()},type:"primary",hidden:i("dept:edit"),children:"新建"},"button")]}),a.jsx(l,{title:"部门详情",open:y!==t.close,width:"75%",destroyOnClose:!0,maskClosable:!1,onClose:()=>f(t.close),footer:null,children:a.jsx("div",{children:a.jsx(p,{detailId:g})})}),a.jsx(l,{title:C==t.edit?"部门编辑":"部门新增",open:C!==t.close,width:"50%",destroyOnClose:!0,maskClosable:!1,onClose:()=>b(t.close),footer:null,children:a.jsx("div",{children:a.jsx(u,{detailId:g??0,operateEnum:C,setAddOrUpdateModalFn:b,reloadTable:()=>{j.current?.reload()}})})})]})};export{j as default};
