import{j as e,aa as t,B as i}from"./index-03adb9ee.js";import{H as n,d as s}from"./index-19b1aa5f.js";/* empty css             */import{usePipelineBuildContext as l}from"./context-b6a1069a.js";function o({id:o,data:r,isConnectable:d}){const{nodeClickFn:a}=l(),c=r.buildStatus,x=8===c||9===c?"mmm-content":"";return e.jsx(t,{title:e.jsxs("div",{children:[e.jsx("div",{children:e.jsx(i,{type:"link",onClick:()=>{a("日志",o)},children:"日志"})}),e.jsx("div",{children:e.jsx(i,{type:"link",onClick:()=>{a("详情",o)},children:"详情"})})]}),trigger:["contextMenu","click"],placement:"right",children:e.jsxs("div",{className:`text-updater-node my-node ${x}`,style:{backgroundColor:r?.bgColor??"#c7e8a9",height:"100%",textAlign:"center",lineHeight:"40px",borderRadius:20},onContextMenu:e=>{e.preventDefault()},children:[e.jsx(n,{type:"target",position:s.Left,isConnectable:d,style:{opacity:0}}),e.jsx("div",{className:"nodrag mmm-ellipsis",children:r.label})]})})}export{o as default};
