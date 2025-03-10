import{r as e,O as a,j as t,T as d,a3 as i,P as l,B as s,D as r,c as o,M as n,m as c}from"./index-1fe6dff8.js";import u from"./addOrUpdate-63295785.js";import{dicAll as p}from"./dicApi-b68549fb.js";import{dicValuePageApi as m,dicValueDeleteApi as h}from"./api-749a10a7.js";import{P as x}from"./PlusOutlined-73232e7a.js";const f=f=>{const g=e.useRef(),[y,j]=e.useState(),[b,I]=e.useState(16),[S,T]=e.useState(a.close),[v,C]=e.useState([]),k=e=>{j(e?.id),T(e?a.edit:a.add)},w=async()=>{const e=await p({});if(o(e))return[];let a=e.data.map((e=>({value:e.id,label:e.name,code:e.code})));return C(a),a};e.useEffect((()=>{w(),I(f.dicId)}),[]);const O=[{title:"字典",dataIndex:"dic",initialValue:f.dicId,align:"left",valueType:"select",hideInTable:!0,request:async()=>w(),formItemProps:{rules:[{required:!0,message:"此项为必填项"}]}},{title:"字典标签名称",dataIndex:"label",valueType:"text",align:"left",formItemProps:{rules:[{required:!0,message:"此项为必填项"}]}},{title:"字典值key",dataIndex:"value",align:"left",valueType:"text"},{disable:!0,title:"状态",dataIndex:"disabled",search:!1,render:(e,{disabled:a})=>0===a?t.jsx(d,{color:"green",children:"启用"}):t.jsx(d,{color:"red",children:"禁用"})},{disable:!0,title:"颜色",dataIndex:"color",search:!1,render:(e,{color:a})=>t.jsx(d,{color:a??"",children:"颜色"})},{title:"备注",dataIndex:"remarks",valueType:"text",search:!1},{title:"操作",valueType:"option",key:"option",width:80,render:(e,a,d,l)=>[t.jsx("a",{onClick:()=>k(a),hidden:i("dic:edit"),children:"编辑"},"log"),t.jsx("a",{onClick:()=>(async e=>{n?.confirm({title:"是否确认删除",icon:null,onOk:async()=>{let a=await h({id:e.id});o(a)||(c.success(a.msg),g.current?.reload())}})})(a),hidden:i("dic:del"),children:"删除"},"rebuild")]}];return t.jsxs("div",{children:[t.jsx(l,{columns:O,actionRef:g,cardBordered:!0,params:{},request:async(e={},a,t)=>{let d={pageNum:e.current,pageSize:e.pageSize,pageSort:a,dicId:b},i=await m({...e,...d});return{data:i.data.list,success:1e3===i.code,total:i.data.total}},editable:{type:"multiple"},columnsState:{persistenceKey:"pro-table-singe-demos",persistenceType:"localStorage",onChange(e){}},rowKey:"id",search:{labelWidth:"auto",defaultCollapsed:!1},options:{setting:{listsHeight:400}},form:{syncToUrl:!1,onValuesChange:(e,a)=>{e.dic&&(I(e.dic),g.current?.reload())}},pagination:{defaultPageSize:20,showSizeChanger:!0},dateFormatter:"string",headerTitle:`字典值列表     ${v.find((e=>e.value==b))?.code}`,toolBarRender:()=>[t.jsx(s,{icon:t.jsx(x,{}),onClick:()=>{k()},type:"primary",hidden:i("dic:edit"),children:"新建"},"button")]}),t.jsx(r,{title:S==a.edit?"字典编辑":"字典新增",open:S!==a.close,width:"50%",destroyOnClose:!0,maskClosable:!1,onClose:()=>T(a.close),footer:null,children:t.jsx("div",{children:t.jsx(u,{dicId:b,detailId:y??0,operateEnum:S,setAddOrUpdateModalFn:T,reloadTable:()=>{g.current?.reload()}})})})]})};export{f as default};
