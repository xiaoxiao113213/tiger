import{r as e,O as t,i as s,j as i,D as o,M as r,c as n}from"./index-03adb9ee.js";import{u as l,H as a,d as p}from"./index-19b1aa5f.js";/* empty css                          */import{processPointDeleteApi as d,processPointUpdateApi as c}from"./pointApi-d758e390.js";import{M as j}from"./uilts-8b8185ea.js";import m from"./ApprovalNodeEdit-33e9adff.js";import{E as u,D as x}from"./EditTwoTone-4766d4eb.js";import{R as f}from"./RightCircleTwoTone-23a56810.js";import"./index-60bf4ee0.js";import"./Title-06decefc.js";import"./Input-51214805.js";import"./TextArea-24b2fc1a.js";import"./Password-e510335b.js";import"./QRCodeSVG-6b187ce2.js";import"./TaobaoOutlined-8cd58809.js";import"./FileZipFilled-01c99cd9.js";import"./BranchesOutlined-c52fb168.js";import"./RightSquareTwoTone-e5897024.js";import"./FileUnknownTwoTone-791de7ab.js";import"./MinusCircleOutlined-47af1d51.js";import"./MoreOutlined-49b0b054.js";import"./PlusCircleOutlined-a72eecfb.js";import"./PlusSquareTwoTone-f51424a0.js";import"./RetweetOutlined-9d2a328f.js";import"./SendOutlined-86da6479.js";import"./TableOutlined-67e609f9.js";import"./api-993dce33.js";import"./processApi-c91a24f3.js";import"./api-313fc500.js";function h({id:h,data:y,isConnectable:T}){l();const[C,w]=e.useState(t.close),[b,g]=e.useState(!1),[k,O]=e.useState(y.label),v=e.useRef(null),S=s.useContext(j),E=()=>{let e=v.current?.value||k;O(e),y.label=e,g(!1),c({processPointId:h,name:e})};return e.useEffect((()=>{if(b&&v.current){v.current.focus();const e=t=>{if("Enter"===t.key){try{v.current.removeEventListener("keydown",e)}catch(s){}E()}};return v.current.addEventListener("keydown",e),()=>{try{v.current.removeEventListener("keydown",e)}catch(t){}}}}),[b]),i.jsxs("div",{className:"text-updater-node",style:{backgroundColor:"#c7e8a9"},children:[i.jsx(a,{type:"target",position:p.Top,isConnectable:T}),i.jsx("div",{className:"nodrag",style:{width:150},children:i.jsxs("div",{children:[i.jsxs("label",{htmlFor:"text",style:{height:15,fontSize:10,display:"flex"},children:[!b&&i.jsxs("span",{style:{flex:5},children:[k,i.jsx(u,{onClick:()=>{g(!0)}})]}),b&&i.jsx("span",{style:{flex:1},children:i.jsx("input",{defaultValue:k,onBlur:()=>{E()},ref:v})}),i.jsx("span",{style:{flex:1,textAlign:"right"},children:i.jsx(x,{onClick:async()=>{r?.confirm({title:"是否确认删除",icon:null,onOk:async()=>{let e=await d({processPointId:h});n(e)||S.initData()}})}})})]}),i.jsx("hr",{style:{marginTop:0}}),i.jsxs("label",{htmlFor:"text",style:{height:15,fontSize:15,display:"flex"},children:[i.jsx("span",{style:{flex:1,color:"blue"},children:"设置审批人"}),i.jsx("span",{style:{flex:1,textAlign:"right"},children:i.jsx(f,{onClick:()=>{w(t.edit)}})})]})]})}),i.jsx(a,{type:"source",position:p.Bottom,isConnectable:T}),i.jsx(o,{title:"设置",open:C!==t.close,width:"70%",destroyOnClose:!0,maskClosable:!1,onClose:()=>w(t.close),footer:null,children:i.jsx("div",{children:i.jsx(m,{processPointId:h,closeSelf:()=>{w(t.close)}})})})]})}export{h as default};
