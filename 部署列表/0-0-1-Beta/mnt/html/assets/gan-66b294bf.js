import{r as e,O as s,j as i,R as t,B as r,D as d,a9 as a,Q as l,V as o,W as n,aa as p}from"./index-1fe6dff8.js";import{V as c,G as x}from"./index.modern-4ba80f6d.js";import{taskAllApi as m,taskUpdateApi as h,updateSortApi as j}from"./api-54eb8f7f.js";import f from"./detail-ca339341.js";import g from"./addOrUpdate-a68f4479.js";import{F as u}from"./index-3ec7a6c9.js";import{E as v}from"./EditOutlined-fbc989f8.js";import"./FileView-40a1835a.js";import"./index-262ec5ed.js";import"./index-80d88ab0.js";import"./index-adfb8488.js";import"./FileUploadCom-a72168c5.js";import"./PlusOutlined-73232e7a.js";import"./utils-b346c468.js";const y=y=>{const[b,k]=e.useState(),[Y,C]=e.useState(c.Day),[M,w]=e.useState(),[S,E]=e.useState(s.close),[T,I]=e.useState(s.close),O=async()=>{const e=(await m({isOver:0})).data.map((e=>({id:e.taskId,type:"task",name:e.name,start:a(a(e.startTime).format("YYYY-MM-DD")).toDate(),end:a(a(e.endTime).format("YYYY-MM-DD 23:59:59")).toDate(),progress:e.progress,styles:{progressColor:"#ffbb54",progressSelectedColor:"#ff9e0d"},isDisabled:!1,remarks:e.remarks})));k(e)};if(e.useEffect((()=>{"2"==y.tagNum&&O()}),[y.tagNum]),!b)return null;if(0==b.length)return i.jsx("div",{children:"暂无未完成的任务"});const H=e=>{if(!e.destination)return;const s=Array.from(b),i=s[e.destination.index].id,t=s[e.source.index].id,[r]=s.splice(e.source.index,1);s.splice(e.destination.index,0,r),k(s),j({previousId:i,taskId:t})},P=({tasks:t,onDragEnd:r})=>i.jsx(l,{onDragEnd:r,children:i.jsx(o,{droppableId:"tasks",children:r=>i.jsxs("div",{ref:r.innerRef,...r.droppableProps,children:[t.map(((t,r)=>i.jsx(n,{draggableId:t.id,index:r,children:r=>e.createElement("div",{ref:r.innerRef,...r.draggableProps,...r.dragHandleProps,style:{...r.draggableProps.style,display:"flex",height:"50px",lineHeight:"50px",borderColor:"rgba(224,224,224,1)",backgroundColor:"#fff",...r.draggableProps.style},key:t.id,onClick:()=>{w(t.id),I(s.edit)}},i.jsx("div",{style:{width:180,border:"solid 0.5px",borderColor:"rgba(224,224,224,1)",padding:"8px",lineHeight:"50px"},className:"mmm-ellipsis mmm-hover-pointer",children:i.jsxs(p,{title:t.name,trigger:"hover",placement:"left",children:[t.name," "]})}))},t.id))),r.placeholder]})})});return i.jsxs("div",{style:{display:"flex",flexDirection:"column",height:"100%"},children:[i.jsxs("div",{style:{padding:"10px 0",backgroundColor:"#f5f5f5",flexShrink:0,display:"flex",justifyContent:"space-between"},children:[i.jsx(u,{vertical:!0,gap:"middle",children:i.jsxs(t.Group,{onChange:e=>{C(e.target.value)},defaultValue:c.Day,children:[i.jsx(t.Button,{value:c.Day,children:"天"}),i.jsx(t.Button,{value:c.Week,children:"周"}),i.jsx(t.Button,{value:c.Month,children:"月"}),i.jsx(t.Button,{value:c.Year,children:"年"})]})}),i.jsx("div",{children:i.jsx(r,{type:"primary",onClick:()=>{w(void 0),I(s.add)},children:"新建"})})]}),i.jsxs("div",{style:{overflowY:"auto",flexGrow:1},children:[" ",i.jsx(x,{tasks:b,viewMode:Y,locale:"zh-cn",listCellWidth:"150px",columnWidth:80,headerHeight:50,TaskListHeader:D,TaskListTable:()=>i.jsx(P,{tasks:b,onDragEnd:H}),onDateChange:e=>{const s=b.map((s=>s.id===e.id?{...s,start:a(a(e.start).format("YYYY-MM-DD")).toDate(),end:a(a(e.end).format("YYYY-MM-DD 23:59:59")).toDate()}:s));k(s),h({taskId:e.id,startTime:a(e.start).format("YYYY-MM-DD"),endTime:a(e.end).format("YYYY-MM-DD")})},TooltipContent:({task:e})=>i.jsxs("div",{style:{padding:"5px",backgroundColor:"#a0aaaf",border:"1px solid #ccc",borderRadius:"4px",maxWidth:"250px"},children:[i.jsx("strong",{children:e.name}),i.jsxs("div",{children:["开始时间: ",e.start.toLocaleDateString()]}),i.jsxs("div",{children:["结束时间: ",e.end.toLocaleDateString()]}),"milestone"!=e.type&&i.jsxs("div",{children:["进度: ",e.progress,"%"]}),i.jsxs("div",{children:["描述：",e.remarks]})]}),onDoubleClick:e=>{w(e.id),E(s.detail)},onSelect:(e,s)=>{w(s?e.id:void 0)}})]}),i.jsx(d,{title:i.jsxs("div",{style:{display:"flex",justifyContent:"space-between"},children:["详情",i.jsx("div",{className:"mmm-hover-pointer",children:i.jsx(v,{onClick:()=>{E(s.close),I(s.edit)}})})]}),open:S!==s.close,width:"50%",destroyOnClose:!0,maskClosable:!1,onClose:()=>E(s.close),footer:null,children:i.jsx("div",{children:i.jsx(f,{detailId:M})})}),i.jsx(d,{title:T==s.edit?"编辑":"新增",open:T!==s.close,width:"50%",destroyOnClose:!0,maskClosable:!1,onClose:()=>I(s.close),footer:null,children:i.jsx("div",{children:i.jsx(g,{detailId:M,operateEnum:T,setAddOrUpdateModalFn:I,reloadTable:O})})})]})},D=()=>i.jsx("div",{className:"mmm-hover-pointer",children:i.jsx("div",{style:{height:"50px",lineHeight:"50px",display:"flex"},children:i.jsx("div",{style:{width:180,border:"solid 0.5px",borderColor:"rgba(224,224,224,1)",padding:"8px"},children:"名称"})})});export{y as default};
