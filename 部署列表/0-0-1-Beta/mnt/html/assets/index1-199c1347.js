import{r as e,j as d,Q as r,V as i,W as n}from"./index-10719960.js";import{d as s}from"./Title-5ea514a5.js";import"./Input-f4f01092.js";import"./TextArea-8948f20d.js";const l=[{id:"input-1",content:"Input Field"},{id:"select-1",content:"Select Field"},{id:"textarea-1",content:"Textarea"}],a=[],t=()=>{const[t]=e.useState(l),[o,p]=e.useState(a);return d.jsxs("div",{style:{display:"flex",justifyContent:"space-between",padding:"20px"},children:[d.jsx(r,{onDragEnd:e=>{const{source:d,destination:r}=e;if(r){if("controls"===d.droppableId&&"formDesign"===r.droppableId){const e=t[d.index],n={...e,id:(i=e.id,`${i}-${(new Date).getTime()}`)},s=[...o];s.splice(r.index,0,n),p(s)}var i;if("formDesign"===d.droppableId&&"formDesign"===r.droppableId){const e=Array.from(o),[i]=e.splice(d.index,1);e.splice(r.index,0,i),p(e)}}},children:d.jsxs("div",{style:{display:"flex",justifyContent:"space-between",flex:1},children:[d.jsx(i,{droppableId:"controls",isDropDisabled:!0,children:e=>d.jsxs("div",{...e.droppableProps,ref:e.innerRef,style:{width:200,padding:10,background:"#f0f0f0",borderRadius:"4px"},children:[d.jsx(s,{level:4,style:{textAlign:"center",marginBottom:"20px"},children:"控件选项"}),t.map(((e,r)=>d.jsx(n,{draggableId:e.id,index:r,children:r=>d.jsx("div",{ref:r.innerRef,...r.draggableProps,...r.dragHandleProps,style:{padding:10,margin:"0 0 10px 0",background:"#fff",border:"1px solid #ccc",borderRadius:"4px",...r.draggableProps.style},children:e.content})},e.id))),e.placeholder]})}),d.jsx(i,{droppableId:"formDesign",children:e=>d.jsxs("div",{...e.droppableProps,ref:e.innerRef,style:{width:"100%",padding:10,background:"#e8f5e9",margin:"0 20px",borderRadius:"4px"},children:[d.jsx(s,{level:4,style:{textAlign:"center"},children:"表单"}),o.length>0?o.map(((e,r)=>d.jsx(n,{draggableId:e.id,index:r,children:r=>d.jsx("div",{ref:r.innerRef,...r.draggableProps,...r.dragHandleProps,style:{padding:10,marginTop:10,background:"#fff",border:"1px solid #ccc",borderRadius:"4px",...r.draggableProps.style},children:e.content})},e.id))):d.jsx("p",{children:"拖拽控件到这里"}),e.placeholder]})})]})}),d.jsxs("div",{style:{width:200,padding:10,background:"#f9f9f9",border:"1px solid #ccc",borderRadius:"4px"},children:[d.jsx("h3",{children:"属性展示"}),d.jsx("p",{children:"在这里配置选中的控件属性"})]})]})};export{t as default};
