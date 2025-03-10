import{r as e,O as t,j as a,P as i,ah as s,B as o,a3 as n,D as l,M as d,ai as r,c,m as p}from"./index-1fe6dff8.js";import m from"./detail-ed6bf34e.js";import u from"./addOrUpdate-3809d139.js";import{a as h}from"./ApiBo-fe366348.js";import j from"./accountSetting-8ca657ac.js";import{b as x}from"./ApiBo-be5b8d9e.js";import{P as y}from"./PlusOutlined-73232e7a.js";import"./index-adfb8488.js";import"./index-953dfacc.js";import"./Title-952b03be.js";import"./Input-f98aea5e.js";import"./TextArea-08e23fd4.js";import"./Password-ff2218fe.js";import"./QRCodeSVG-710d84ab.js";import"./TaobaoOutlined-8cd58809.js";import"./FileZipFilled-3c93b810.js";import"./BranchesOutlined-c52fb168.js";import"./RightSquareTwoTone-e5897024.js";import"./FileUnknownTwoTone-791de7ab.js";import"./MinusCircleOutlined-47af1d51.js";import"./MoreOutlined-49b0b054.js";import"./PlusCircleOutlined-a72eecfb.js";import"./PlusSquareTwoTone-f51424a0.js";import"./RetweetOutlined-9d2a328f.js";import"./SendOutlined-86da6479.js";import"./TableOutlined-67e609f9.js";import"./api-0a5cfd87.js";import"./api-b0087b33.js";import"./api-7922a999.js";const T=()=>{const T=e.useRef(),[I,f]=e.useState(t.close),[b,C]=e.useState(),[S,w]=e.useState(t.close),[O,g]=e.useState(t.close),k=e=>{C(e?.machineId),w(e?t.edit:t.add)};e.useEffect((()=>{}),[]);const v=[{title:"ID",dataIndex:"machineId",valueType:"text",copyable:!1,search:!1},{title:"host",dataIndex:"host",valueType:"text",copyable:!1,search:!1},{title:"类型",dataIndex:"type",valueType:"text",copyable:!1,search:!1,valueEnum:h},{title:"创建人",dataIndex:"createBy",valueType:"text",copyable:!1,search:!1,render:(e,{createByAccount:t})=>t?.nickName},{title:"创建时间",dataIndex:"createTime",valueType:"text",copyable:!1,search:!1},{title:"更新人",dataIndex:"updateBy",valueType:"text",copyable:!1,search:!1,render:(e,{updateByAccount:t})=>t?.nickName},{title:"更新时间",dataIndex:"updateTime",valueType:"text",copyable:!1,search:!1},{title:"描述",dataIndex:"remarks",valueType:"text",copyable:!1,search:!1},{title:"是否在线",dataIndex:"isOnline",valueType:"text",copyable:!1,search:!1,valueEnum:{0:{text:"离线",status:"Error"},1:{text:"在线",status:"Success"}}},{title:"操作",valueType:"option",key:"option",render:(e,i,s,o)=>[a.jsx("a",{onClick:()=>{window.open(`/xterm?machineId=${i.machineId}`)},hidden:n("machine:list"),children:"终端"},"xterm"),a.jsx("a",{onClick:()=>{window.open(`/machine/file?machineId=${i.machineId}`)},hidden:n("machine:list"),children:"文件"},"file"),a.jsx("a",{onClick:()=>k(i),hidden:n("machine:edit"),children:"编辑"},"edit"),a.jsx("a",{onClick:()=>{C(i.machineId),g(t.add)},hidden:n("machine:permission"),children:"权限"},"edit"),a.jsx("a",{onClick:()=>(e=>{C(e.machineId),f(t.detail)})(i),children:"详情"},"detail"),a.jsx("a",{onClick:()=>(async e=>{d?.confirm({title:"是否确认删除",icon:null,onOk:async()=>{let t=await r({machineId:e.machineId});c(t)||(p.success(t.msg),T.current?.reload())}})})(i),hidden:n("machine:del"),children:"删除"},"del")]}];return a.jsxs("div",{children:[a.jsx(i,{columns:v,actionRef:T,cardBordered:!0,params:{},request:async(e={},t,a)=>{let i={pageNum:e.current,pageSize:e.pageSize,pageSort:t},o=await s({...e,...i});return{data:o.data.list,success:1e3===o.code,total:o.data.total}},editable:{type:"multiple"},columnsState:{persistenceKey:"machine-pro-table",persistenceType:"localStorage",onChange(e){}},rowKey:"machineId",search:{labelWidth:"auto",defaultCollapsed:!1},options:{setting:{listsHeight:400}},form:{syncToUrl:!1},pagination:{defaultPageSize:10,showSizeChanger:!0},dateFormatter:"string",headerTitle:"列表",toolBarRender:()=>[a.jsx(o,{icon:a.jsx(y,{}),onClick:()=>{k()},type:"primary",hidden:n("machine:edit"),children:"新建"},"button")]}),a.jsx(l,{title:"详情",open:I!==t.close,width:"75%",destroyOnClose:!0,maskClosable:!1,onClose:()=>f(t.close),footer:null,children:a.jsx("div",{children:a.jsx(m,{detailId:b})})}),a.jsx(l,{title:S==t.edit?"编辑":"新增",open:S!==t.close,width:"50%",destroyOnClose:!0,maskClosable:!1,onClose:()=>w(t.close),footer:null,children:a.jsx("div",{children:a.jsx(u,{detailId:b??0,operateEnum:S,setAddOrUpdateModalFn:w,reloadTable:()=>{T.current?.reload()}})})}),a.jsx(l,{title:"项目人员",open:O!==t.close,onClose:()=>g(t.close),width:"80%",destroyOnClose:!0,children:a.jsx(j,{bizType:x.Machine,bizTypeId:b,closeFn:()=>g(t.close)})},"accountSetting")]})};export{T as default};
