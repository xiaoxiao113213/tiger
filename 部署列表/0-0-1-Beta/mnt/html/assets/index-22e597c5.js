import{r as e,O as t,j as s,P as a,D as r,T as o}from"./index-03adb9ee.js";import{listOfApprovals as i}from"./processInstanceApi-c6750744.js";import{G as n}from"./ProcessInstanceStatusDic-d3db62f2.js";import l from"./detail-e680fdef.js";import"./dicApi-3ecc5ba9.js";import"./uilts-8b8185ea.js";import"./index-5c9d858f.js";import"./Bo-c1a8a5bb.js";import"./index-a2b78009.js";import"./pointList-ac4e12a3.js";import"./Timeline-17fa9b43.js";import"./index-405e7360.js";import"./index-88ad5331.js";import"./index-3585a1a3.js";import"./EditOutlined-d7a61630.js";const c=c=>{const d=e.useRef(),[p,u]=e.useState(t.close),[m,x]=e.useState(),{processInstanceStatusMap:j,processInstanceStatusList:y}=n();e.useEffect((()=>{"2"===c.tabId&&((async()=>{})(),d.current?.reload())}),[c.tabId]);const I=[{title:"ID",dataIndex:"processInstanceId",valueType:"text",copyable:!1,search:!1},{title:"标题",dataIndex:"title",valueType:"text",copyable:!1,search:!1,render:(e,a)=>s.jsx("a",{onClick:()=>(e=>{x(e.processInstanceId),u(t.detail)})(a),children:a.title})},{title:"status",dataIndex:"status",valueType:"text",copyable:!1,search:!1,render:(e,{status:t})=>{let a=y.find((e=>e.value===t));return s.jsxs(o,{color:a?.color,children:[" ",a?.label,"  "]})}},{title:"申请时间",dataIndex:"createTime",valueType:"text",copyable:!1,search:!1},{title:"申请人",dataIndex:"createBy",valueType:"text",copyable:!1,search:!1,render:(e,t)=>t.createByAccount.account},{title:"结束时间",dataIndex:"endTime",valueType:"text",copyable:!1,search:!1}];return s.jsxs("div",{children:[s.jsx(a,{columns:I,actionRef:d,cardBordered:!0,params:{},request:async(e={},t,s)=>{let a={pageNum:e.current,pageSize:e.pageSize,pageSort:t},r=await i({...e,...a});return{data:r.data.list,success:1e3===r.code,total:r.data.total}},editable:{type:"multiple"},columnsState:{persistenceKey:"processInstance-pro-table",persistenceType:"localStorage",onChange(e){}},rowKey:"processInstanceId",search:{labelWidth:"auto",defaultCollapsed:!1},options:{setting:{listsHeight:400}},form:{syncToUrl:!1},pagination:{defaultPageSize:10,showSizeChanger:!0},dateFormatter:"string",headerTitle:"配置列表",toolBarRender:()=>[]}),s.jsx(r,{title:"详情",open:p!==t.close,width:"85%",destroyOnClose:!0,maskClosable:!1,onClose:()=>u(t.close),footer:null,children:s.jsx("div",{children:s.jsx(l,{detailId:m})})})]})};export{c as default};
