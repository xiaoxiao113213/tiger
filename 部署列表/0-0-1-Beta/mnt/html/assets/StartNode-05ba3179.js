import{j as e,O as t,aa as i,B as n}from"./index-1fe6dff8.js";import{H as s,d as o}from"./index-9cc62199.js";/* empty css             */import{usePipelineContext as l}from"./context-cf6d3647.js";function a({id:a,data:c,isConnectable:d}){const{nodeClickFn:r,pipelineOpenType:p}=l(),x=e=>{e.preventDefault()};return e.jsxs("div",{children:[p!==t.detail&&e.jsx(i,{title:e.jsx("div",{children:e.jsx("div",{children:e.jsx(n,{type:"link",onClick:()=>{r("添加子阶段",a)},children:"添加阶段"})})}),trigger:["contextMenu","click"],placement:"right",children:e.jsxs("div",{className:"text-updater-node my-node",style:{backgroundColor:"#c7e8a9",height:"100%",textAlign:"center",lineHeight:"40px"},onContextMenu:x,children:[e.jsx(s,{type:"target",position:o.Top,isConnectable:d,style:{opacity:0}}),e.jsx("div",{className:"nodrag",children:e.jsx("div",{children:c.label})}),e.jsx(s,{type:"source",position:o.Right,isConnectable:d,style:{opacity:0}})]})}),p===t.detail&&e.jsxs("div",{className:"text-updater-node my-node",style:{backgroundColor:"#c7e8a9",height:"100%",textAlign:"center",lineHeight:"40px"},onContextMenu:x,children:[e.jsx(s,{type:"target",position:o.Top,isConnectable:d,style:{opacity:0}}),e.jsx("div",{className:"nodrag  mmm-ellipsis",children:c.label}),e.jsx(s,{type:"source",position:o.Right,isConnectable:d,style:{opacity:0}})]})]})}export{a as default};
