import{i as e,j as s,r as i,F as r,B as n,ab as d,Q as l,V as o,W as a}from"./index-f2321b57.js";import{C as c}from"./index-e51db6e5.js";const t=e.memo((()=>s.jsx("div",{children:s.jsx("h1",{children:"Child Component"})}))),x=()=>{const[e,x]=i.useState(1);i.useMemo((()=>s.jsx(t,{})),[e]);const[h,j]=i.useState("1"),[p]=r.useForm(),[m,f]=i.useState(["1","2","3"]);return s.jsxs("div",{children:[s.jsx("h1",{children:"Parent Component"}),s.jsx(n,{onClick:()=>{x(e+1)},children:"+1"}),s.jsx("div",{children:e}),s.jsxs("div",{children:[s.jsx("h2",{style:{color:"#151414"},children:"表单定义"}),s.jsx(d,{children:"表单（可直接拖拽排序,双击进入属性修改界面）"}),s.jsx("div",{className:"mmm-bgcolor",children:s.jsx(c,{title:s.jsxs("div",{children:["自定义表单 ",s.jsx(n,{type:"link",onClick:()=>{},children:"添加参数"})]}),children:s.jsx(r,{form:p,onValuesChange:(e,s)=>{},validateTrigger:"false",children:s.jsx(l,{onDragEnd:e=>{if(!e.destination)return;const s=[...m],[i]=s.splice(e.source.index,1);s.splice(e.destination.index,0,i),f(s)},children:s.jsx(o,{droppableId:"my-droppable",children:e=>s.jsxs("div",{ref:e.innerRef,...e.droppableProps,children:[m.map(((e,i)=>s.jsx(a,{draggableId:e,index:i,children:r=>s.jsx("div",{ref:r.innerRef,...r.draggableProps,...r.dragHandleProps,onClick:()=>{j(e)},onDoubleClick:()=>{},style:{border:h===e?"1px solid #8AA6EA":"none",borderRadius:5,...r.draggableProps.style},children:s.jsx("div",{style:{display:"flex"},children:s.jsx("span",{style:{flex:20},children:s.jsx(t,{})})},i)})},e))),e.placeholder]})})})},"pipelineEditForm")})})]})]})};export{t as ChildComponent,x as default};
