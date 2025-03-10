import{r as e,O as t,i as a,j as s,P as r,B as l,a3 as o,D as i,m as n,T as c,M as d,c as u,d as p}from"./index-03adb9ee.js";import{projectReleasePageApi as m,projectReleaseUpdateStatusApi as j,projectReleaseDeleteApi as y,projectReleaseGetOneApi as x}from"./api-1ab525a4.js";import{F as h}from"./FileView-c1d4a884.js";import f from"./index-5c9d858f.js";import{P as I}from"./index-88ad5331.js";import b from"./addOrUpdate-afc02ca7.js";import{projectCustomFieldAllApi as g,projectCustomFieldSaveApi as v}from"./api-ad49bbe8.js";import{serverToClientValue as T,clientToServerValueItem as k}from"./Bo-c1a8a5bb.js";import S from"./formComponent-661a5f6d.js";import{p as R}from"./ProjectDic-714fe24d.js";import{P as w}from"./PlusOutlined-b4032aa8.js";import{T as C}from"./index-ecb2a4e6.js";const E=c=>{const p=e.useRef(),[x,h]=e.useState(t.close),[f,I]=e.useState(),[E,O]=e.useState(t.close),{ProjectList:P,ProjectMap:N,ProjectValueEnum:z}=R(),[F,L]=e.useState(!1),_=a.useRef(null),[D,M]=e.useState([]),[V,q]=e.useState(void 0);if(e.useEffect((()=>{P.length>0&&q(P[0].value)}),[P]),e.useEffect((()=>{"2"==c.tab&&V&&p.current?.reload()}),[c.tab]),0===P.length||!V)return s.jsx("div",{children:"loading"});const A=e=>{I(e?.projectReleaseId),O(e?t.edit:t.add)},K=async(e,t)=>{"start"===e?(await j({projectReleaseId:t.projectReleaseId,status:"1"}),p.current?.reload()):"success"===e?d?.confirm({title:"确认完成冲刺",icon:null,onOk:async()=>{let e=await j({projectReleaseId:t.projectReleaseId,status:"2"});u(e)||(n.success(e.msg),p.current?.reload())}}):"close"===e?d?.confirm({title:"确认关闭版本",icon:null,onOk:async()=>{let e=await j({projectReleaseId:t.projectReleaseId,status:"3"});u(e)||(n.success(e.msg),p.current?.reload())}}):"del"===e&&(async e=>{d?.confirm({title:"是否确认删除",icon:null,onOk:async()=>{let t=await y({projectReleaseId:e.projectReleaseId});u(t)||(n.success(t.msg),p.current?.reload())}})})(t)},U=[{title:"ID",dataIndex:"projectReleaseId",valueType:"text",copyable:!1,search:!1},{title:"项目",dataIndex:"projectId",valueType:"text",copyable:!1,search:!0,valueEnum:z,formItemProps:{rules:[{required:!0,message:"项目是必填项"}]},initialValue:V},{title:"状态",dataIndex:"status",valueType:"text",copyable:!1,valueEnum:{0:{text:"待开始",status:"Default"},1:{text:"冲刺中",status:"Processing"},2:{text:"已发布",status:"Success"},3:{text:"冲刺失败",status:"Error"}}},{title:"版本",dataIndex:"version",valueType:"text",copyable:!1,search:!1},{title:"描述",dataIndex:"remarks",valueType:"text",copyable:!1,search:!1,ellipsis:!0},{title:"创建人",dataIndex:"createBy",valueType:"text",copyable:!1,search:!1,render:(e,{createByAccount:t})=>t?.nickName},{title:"创建时间",dataIndex:"createTime",valueType:"text",copyable:!1,search:!1},{title:"操作",valueType:"option",key:"option",width:120,render:(e,a,r,l)=>[s.jsx("a",{onClick:()=>(e=>{I(e.projectReleaseId),h(t.detail)})(a),children:"详情"},"detail"),s.jsx("a",{onClick:()=>A(a),hidden:o("release:edit"),children:"编辑"},"edit"),s.jsx(C,{onSelect:e=>K(e,a),menus:[{key:"start",name:"冲刺",style:{color:"rgb(76, 157, 255)"},hidden:"0"!=a.status||o("release:edit")},{key:"success",name:"发布",style:{color:"green"},hidden:"1"!=a.status||o("release:edit")},{key:"close",name:"关闭",danger:!0,hidden:"2"==a.status||"3"==a.status||o("release:edit")},{key:"del",name:"删除",danger:!0,hidden:o("release:del")}]},"actionGroup")]}];return s.jsxs("div",{children:[s.jsx(r,{columns:U,actionRef:p,cardBordered:!0,params:{projectId:V},request:async(e={},t,a)=>{let s={pageNum:e.current,pageSize:e.pageSize,pageSort:t},r=await m({...e,...s});return{data:r.data.list,success:1e3===r.code,total:r.data.total}},editable:{type:"multiple"},columnsState:{persistenceKey:"projectRelease-pro-table",persistenceType:"localStorage",onChange(e){}},rowKey:"projectReleaseId",search:{labelWidth:"auto",defaultCollapsed:!1},options:{setting:{listsHeight:400}},form:{syncToUrl:!1,onValuesChange:(e,t)=>{e.projectId&&q(e.projectId)}},pagination:{defaultPageSize:10,showSizeChanger:!0},dateFormatter:"string",headerTitle:"列表",toolBarRender:()=>[s.jsx(l,{icon:s.jsx(w,{}),onClick:()=>{A()},type:"primary",hidden:o("release:edit"),children:"新建"},"button"),s.jsx(l,{onClick:async()=>{const e=await g({bizType:"1"});e.data.forEach((e=>{e.id=e.projectCustomFieldId+"";const t=e;t.notEditKeyName=!0,T(t)})),M(e.data),L(!0)},type:"primary",hidden:o("release:form"),children:"定义表单"},"button1")]}),s.jsx(i,{title:"详情",open:x!==t.close,width:"50%",destroyOnClose:!0,maskClosable:!1,onClose:()=>h(t.close),footer:null,children:s.jsx("div",{children:s.jsx(B,{detailId:f})})}),s.jsx(i,{title:E==t.edit?"编辑":"新增",open:E!==t.close,width:"50%",destroyOnClose:!0,maskClosable:!1,onClose:()=>O(t.close),footer:null,children:s.jsx("div",{children:s.jsx(b,{detailId:f??0,operateEnum:E,setAddOrUpdateModalFn:O,reloadTable:()=>{p.current?.reload()},defaultProjectId:V})})}),s.jsx(i,{title:"表单设计",open:F,onClose:()=>L(!1),extra:s.jsx(l,{onClick:async()=>{const e=_.current?.getFieldList();e&&(e.forEach((t=>{if(""===t.keyName)throw n.error("有字段的唯一标识为空"),new Error("有字段的唯一标识为空");const a=e.filter((e=>e.keyName===t.keyName));if(a.length>1)throw n.error(`有重复的唯一标识【${a[0].keyName}】`),new Error(`有重复的唯一标识【${a[0].keyName}】`);t.bizType="1"})),e.forEach((e=>{k(e)})),await v({bizType:"1",list:e}),L(!1))},type:"primary",children:"确定"}),width:"100%",destroyOnClose:!0,children:s.jsx(S,{ref:_,initFormDesign:D})})]})};function O(e){return"0"==e?s.jsx(c,{color:"blue",children:"待开始"}):"1"==e?s.jsx(c,{color:"green",children:"冲刺中"}):"2"==e?s.jsx(c,{color:"gray",children:"已发布"}):"3"==e?s.jsx(c,{color:"red",children:"关闭"}):s.jsx(c,{color:"red",children:"未知"})}const P=Object.freeze(Object.defineProperty({__proto__:null,default:E,getStatus:O},Symbol.toStringTag,{value:"Module"})),B=t=>{const[a,r]=e.useState(p);return e.useEffect((()=>((async()=>{let e=await x({projectReleaseId:t.detailId});r(e.data)})(),()=>{})),[]),s.jsxs("div",{children:[s.jsxs(I,{title:"",tooltip:"",children:[s.jsx(I.Item,{label:"ID",tooltip:"",valueType:"text",children:a.projectReleaseId},"projectReleaseId"),s.jsx(I.Item,{label:"status",tooltip:"",valueType:"text",children:O(a.status)},"status"),s.jsx(I.Item,{label:"version",tooltip:"",valueType:"text",children:a.version},"version"),s.jsx(I.Item,{label:"remarks",tooltip:"",valueType:"textarea",children:a.remarks},"remarks"),s.jsx(I.Item,{label:"createBy",tooltip:"",valueType:"text",children:a.createByAccount?.nickName},"createBy"),s.jsx(I.Item,{label:"createTime",tooltip:"",valueType:"text",children:a.createTime},"createTime"),s.jsx(I.Item,{label:"附件",tooltip:"",valueType:"text",children:s.jsx(h,{fileList:a?.fileList??[]})},"fileList")]}),s.jsx(f,{initFieldBoList:a.customFieldList??[]})]})},N=Object.freeze(Object.defineProperty({__proto__:null,default:B},Symbol.toStringTag,{value:"Module"}));export{E as L,N as d,P as l};
