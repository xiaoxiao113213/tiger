import{j as e,aa as i,O as t,B as n}from"./index-10719960.js";import{H as l,d as s}from"./index-937e9b10.js";/* empty css             */import{usePipelineContext as o}from"./context-c276b1a2.js";const d=({id:d,data:c,isConnectable:r})=>{const{nodeClickFn:a,pipelineOpenType:p}=o();return e.jsx(i,{title:e.jsxs("div",{children:[p!==t.detail&&e.jsxs("div",{children:[e.jsx("div",{children:e.jsx(n,{type:"link",onClick:()=>{a("修改",d)},children:"修改"})}),e.jsx("div",{children:e.jsx(n,{type:"link",onClick:()=>{a("添加子阶段",d)},children:"添加子阶段"})}),e.jsx("div",{children:e.jsx(n,{type:"link",onClick:()=>{a("添加步骤",d)},children:"添加执行步骤"})}),e.jsx("div",{children:e.jsx(n,{type:"link",onClick:()=>{a("删除",d)},children:"删除"})})]}),p===t.detail&&e.jsx("div",{children:e.jsx(n,{type:"link",onClick:()=>{a("详情",d)},children:"详情"})})]}),trigger:["contextMenu","click"],placement:"right",children:e.jsxs("div",{className:"text-updater-node my-node",style:{backgroundColor:"#c7e8a9",height:"100%",textAlign:"center",lineHeight:"40px",borderRadius:4,position:"relative"},onContextMenu:e=>{e.preventDefault()},children:[e.jsx(l,{type:"target",position:s.Left,isConnectable:r,style:{opacity:0}}),e.jsx(i,{title:c.label,children:e.jsx("div",{className:"nodrag  mmm-ellipsis",children:c.label})}),e.jsx(l,{id:"a",type:"source",position:s.Right,isConnectable:r,style:{opacity:0}}),e.jsx(l,{id:"b",type:"source",position:s.Bottom,isConnectable:r,style:{opacity:0,left:0}})]})})};export{d as default};
