import{r as t,O as e,j as i,D as s}from"./index-52537ad8.js";import{u as o,H as n,d as r}from"./index-f591dfb2.js";import{d as l}from"./Title-0f7b284b.js";import{aiPipelinePointGetOneApi as a}from"./pointApi-af481cbb.js";import{getInputAllByPointApi as d}from"./varApi-14a5ea59.js";import p from"./endOutputForm-a4e0273d.js";import"./Input-33d09d13.js";import"./TextArea-0027e4e6.js";import"./ApiBo-a5a04398.js";import"./DeleteOutlined-104cbf00.js";function c({id:c,isConnectable:j}){o();const[m,x]=t.useState(e.close),[u,f]=t.useState(),[h,v]=t.useState([]),y=async()=>{const t=await d({aiPipelinePointId:c});v(t.data);const e=await a({aiPipelinePointId:c});f(e.data)};return i.jsxs("div",{children:[i.jsx("div",{style:{width:"100px",height:"40px",display:"flex",justifyContent:"center",alignItems:"center",textAlign:"center",fontSize:"medium",cursor:"pointer",backgroundColor:"#f0f0f0"},onClick:()=>{y(),x(e.add)},children:i.jsx("span",{children:"结束"})}),i.jsx(n,{type:"target",position:r.Left,isConnectable:j}),i.jsx(s,{title:"设置",open:m!==e.close,width:"800px",destroyOnClose:!0,maskClosable:!0,onClose:()=>x(e.close),footer:null,children:i.jsxs("div",{style:{},children:[i.jsx("div",{style:{},children:i.jsx(l,{level:4,children:"结束"})}),i.jsx("div",{children:u&&i.jsx(p,{point:u,getDetail:y,inputVarList:h,title:"最终输出："})})]})})]})}export{c as default};
