import{r as e,A as s,_ as t,bd as o,be as i,a9 as r,j as l,B as d,Q as a,O as n,V as c,W as m,D as p,h as x,M as f,c as j,m as h}from"./index-f2321b57.js";import Y from"./detail-20d4626e.js";import u from"./addOrUpdate-876a5cf6.js";import{workLogAllApi as y,workLogDeleteApi as g}from"./api-ea5a9222.js";import{C as D}from"./index-e51db6e5.js";import{P as M}from"./PlusOutlined-0e19b652.js";import{E as k}from"./EditOutlined-1e526840.js";import{D as v}from"./DeleteOutlined-10e7bcc5.js";import{M as b}from"./MoreOutlined-609bba84.js";import"./FileView-b3b24bb9.js";import"./index-d54aef2b.js";import"./api-960f9a69.js";import"./FileUploadCom-3c65d1d1.js";import"./utils-5a18e36f.js";import"./MoreOutlined-49b0b054.js";var w=function(i,r){return e.createElement(s,t({},i,{ref:r,icon:o}))};
/**![left](data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTAiIGhlaWdodD0iNTAiIGZpbGw9IiNjYWNhY2EiIHZpZXdCb3g9IjY0IDY0IDg5NiA4OTYiIGZvY3VzYWJsZT0iZmFsc2UiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTcyNCAyMTguM1YxNDFjMC02LjctNy43LTEwLjQtMTIuOS02LjNMMjYwLjMgNDg2LjhhMzEuODYgMzEuODYgMCAwMDAgNTAuM2w0NTAuOCAzNTIuMWM1LjMgNC4xIDEyLjkuNCAxMi45LTYuM3YtNzcuM2MwLTQuOS0yLjMtOS42LTYuMS0xMi42bC0zNjAtMjgxIDM2MC0yODEuMWMzLjgtMyA2LjEtNy43IDYuMS0xMi42eiIgLz48L3N2Zz4=) */const C=e.forwardRef(w);var I=function(o,r){return e.createElement(s,t({},o,{ref:r,icon:i}))};
/**![right](data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTAiIGhlaWdodD0iNTAiIGZpbGw9IiNjYWNhY2EiIHZpZXdCb3g9IjY0IDY0IDg5NiA4OTYiIGZvY3VzYWJsZT0iZmFsc2UiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTc2NS43IDQ4Ni44TDMxNC45IDEzNC43QTcuOTcgNy45NyAwIDAwMzAyIDE0MXY3Ny4zYzAgNC45IDIuMyA5LjYgNi4xIDEyLjZsMzYwIDI4MS4xLTM2MCAyODEuMWMtMy45IDMtNi4xIDcuNy02LjEgMTIuNlY4ODNjMCA2LjcgNy43IDEwLjQgMTIuOSA2LjNsNDUwLjgtMzUyLjFhMzEuOTYgMzEuOTYgMCAwMDAtNTAuNHoiIC8+PC9zdmc+) */const O=e.forwardRef(I),L=["星期天","星期一","星期二","星期三","星期四","星期五","星期六"],E=s=>{const[t,o]=e.useState(),[i,n]=e.useState(),c=async(e,s)=>{let t=await y({startDay:e,endDay:s});n(t.data)};if(e.useEffect((()=>{const e=r().startOf("week"),s=[];for(let t=0;t<7;t++)s.push(e.add(t,"day"));o(s),c(s[0].format("YYYY-MM-DD"),s[s.length-1].format("YYYY-MM-DD"))}),[]),!t)return null;if(!i)return null;const m=async()=>{c(t[0].format("YYYY-MM-DD"),t[t.length-1].format("YYYY-MM-DD"))};return l.jsxs("div",{style:{display:"flex",flexDirection:"column",height:"100%",overflowY:"hidden"},children:[l.jsxs("div",{style:{textAlign:"center"},children:[l.jsx(d,{type:"link",icon:l.jsx(C,{}),onClick:()=>{const e=t[0].add(-7,"day"),s=[];for(let t=0;t<7;t++)s.push(e.add(t,"day"));o(s),c(s[0].format("YYYY-MM-DD"),s[s.length-1].format("YYYY-MM-DD"))}}),t[0].format("YYYY-MM-DD")," ~ ",t[t.length-1].format("YYYY-MM-DD"),l.jsx(d,{type:"link",icon:l.jsx(O,{}),onClick:()=>{const e=t[6].add(1,"day"),s=[];for(let t=0;t<7;t++)s.push(e.add(t,"day"));o(s),c(s[0].format("YYYY-MM-DD"),s[s.length-1].format("YYYY-MM-DD"))}})]}),l.jsx("div",{style:{flexGrow:1,display:"flex",gap:"2px",overflowY:"auto"},children:l.jsx(a,{onDragEnd:async e=>{},children:t.map(((e,s)=>l.jsx(S,{title:l.jsxs("div",{children:[L[e.day()]," ",e.format("YYYY-MM-DD")," "]}),list:i.filter((s=>s.day===e.format("YYYY-MM-DD"))),droppableId:e.format("YYYY-MM-DD"),reloadList:m},s)))})})]})},S=({title:s,list:t,droppableId:o,reloadList:i})=>{const r=t.reduce(((e,s)=>e+Number(s.hours)),0),[a,x]=e.useState(!1),[f,j]=e.useState(),[h,Y]=e.useState(n.close);return l.jsxs("div",{style:{width:"14%",border:"1px solid #f0f0f0",borderRadius:"4px",padding:"10px"},onMouseEnter:()=>{x(!0)},onMouseLeave:()=>{x(!1)},children:[l.jsx(c,{droppableId:o,children:e=>l.jsxs("div",{...e.droppableProps,ref:e.innerRef,style:{minHeight:"300px"},children:[l.jsxs("div",{style:{textAlign:"center",fontStyle:"italic",fontWeight:"bold"},children:[s," ",r,"/8"]}),l.jsx("div",{style:{marginTop:"10px",marginBottom:"10px"},children:l.jsx(d,{style:{width:"100%",visibility:a?"visible":"hidden"},icon:l.jsx(M,{}),type:"primary",onClick:()=>Y(n.add)})}),t.map(((e,s)=>l.jsx(m,{draggableId:e.workLogId.toString(),index:s,children:s=>l.jsx("div",{ref:s.innerRef,...s.draggableProps,...s.dragHandleProps,style:{...s.draggableProps.style,marginBottom:"10px",backgroundColor:"#f9f9f9",padding:"3px",borderRadius:"4px",boxShadow:"0 1px 3px rgba(0,0,0,0.1)"},children:l.jsx(N,{item:e,reloadList:i},e.workLogId)})},e.workLogId))),e.placeholder]})}),l.jsx(p,{title:h==n.edit?"编辑":"新增",open:h!==n.close,width:"50%",destroyOnClose:!0,maskClosable:!1,onClose:()=>Y(n.close),footer:null,children:l.jsx("div",{children:l.jsx(u,{detailId:f??0,operateEnum:h,setAddOrUpdateModalFn:Y,reloadTable:()=>{i()},day:o})})})]})},N=s=>{const t=s.item,[o,i]=e.useState(n.close),[r,a]=e.useState(n.close);return l.jsxs("div",{children:[l.jsxs(D,{title:l.jsx("a",{className:"mmm-ellipsis",onClick:()=>{i(n.edit)},children:s.item.issueName}),size:"small",extra:l.jsx("div",{className:"mmm-hover-pointer",children:l.jsx(x,{placement:"rightTop",trigger:"click",content:l.jsxs("div",{children:[l.jsx(d,{type:"link",icon:l.jsx(k,{}),onClick:()=>a(n.edit)}),l.jsx(d,{type:"link",icon:l.jsx(v,{}),onClick:()=>(async e=>{f?.confirm({title:"是否确认删除",icon:null,onOk:async()=>{let t=await g({workLogId:e.workLogId});j(t)||(h.success(t.msg),s.reloadList())}})})(t)})]}),children:l.jsx(b,{style:{width:"20px"}})})}),children:[l.jsxs("div",{children:["工时：",s.item.hours,"/时"]}),l.jsxs("div",{children:["项目：",s.item.projectName]}),l.jsxs("div",{className:"mmm-ellipsis",children:["描述：",s.item.remarks]})]}),l.jsx(p,{title:"配置详情",open:o!==n.close,width:"75%",destroyOnClose:!0,maskClosable:!1,onClose:()=>i(n.close),footer:null,children:l.jsx("div",{children:l.jsx(Y,{detailId:t.workLogId})})}),l.jsx(p,{title:r==n.edit?"配置编辑":"配置新增",open:r!==n.close,width:"50%",destroyOnClose:!0,maskClosable:!1,onClose:()=>a(n.close),footer:null,children:l.jsx("div",{children:l.jsx(u,{detailId:t.workLogId??0,operateEnum:r,setAddOrUpdateModalFn:a,reloadTable:()=>{s.reloadList()}})})})]})};export{E as default};
