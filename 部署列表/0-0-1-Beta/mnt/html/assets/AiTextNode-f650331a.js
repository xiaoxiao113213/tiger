import{r as e,O as t,j as i,h as s,B as a,D as o,F as n,I as l,S as r,aD as d,T as u}from"./index-1fe6dff8.js";import{u as m,H as p,d as c}from"./index-9cc62199.js";import{u as x}from"./ApiBo-7bf4b2f4.js";import{aiPipelinePointGetOneApi as h,aiPipelinePointDeleteApi as j,aiPipelinePointUpdateApi as f}from"./pointApi-9de20fe6.js";import{dicValueApi as g}from"./dicApi-b68549fb.js";import P from"./inputForm-3c8dd21e.js";import{getInputAllByPointApi as y}from"./varApi-95f79749.js";import w from"./outputForm-cbabbb73.js";import{D as C}from"./DeleteOutlined-916130f1.js";const v=()=>{const[t,i]=e.useState([]),[s,a]=e.useState({}),[o,n]=e.useState({});return e.useEffect((()=>{(async()=>{let e=await g({code:"qwen-text"});i(e.data);let t={},s={};e.data.forEach((e=>{t[e.value]={text:e.label},s[e.value]=e})),a(s),n(t)})()}),[]),{QwenTextList:t,QwenTextMap:s,QwenTextValueEnum:o}};function b({id:g,isConnectable:b}){m();const{deleteNode:I}=x(),[S,k]=e.useState(t.close),[A,V]=e.useState([]),[R,T]=e.useState(),{QwenTextList:q}=v(),D=async()=>{const e=await y({aiPipelinePointId:g});V(e.data);const t=await h({aiPipelinePointId:g});T(t.data)};if(e.useEffect((()=>{D()}),[]),!R)return i.jsx("div",{children:"加载中..."});const L=async e=>{await f(e)};return i.jsxs("div",{children:[i.jsx(s,{content:i.jsx(a,{icon:i.jsx(C,{}),type:"link",onClick:async()=>{await j({aiPipelinePointId:g}),I(g)}}),placement:"topRight",trigger:"contextMenu",children:i.jsxs("div",{style:{width:"150px",height:"40px",fontSize:"12px",cursor:"pointer",backgroundColor:"#5ba6ea",borderRadius:"5px"},onClick:async()=>{await D(),k(t.add)},children:[i.jsx("div",{children:i.jsx("span",{children:R?.title??"未命名"})}),i.jsxs("span",{children:["文本模型:",i.jsx("span",{children:R?.model})]})]})}),i.jsx(p,{type:"target",position:c.Left,isConnectable:b}),i.jsx(p,{type:"source",position:c.Right,isConnectable:b}),i.jsx(o,{title:"设置",open:S!==t.close,width:"1200px",zIndex:1e3,destroyOnClose:!0,maskClosable:!0,onClose:()=>k(t.close),footer:null,children:i.jsx("div",{style:{},children:R&&i.jsxs("div",{style:{},children:[i.jsx(n.Item,{label:"标题",name:"title",rules:[{required:!0}],children:i.jsx(l,{placeholder:"请输入",defaultValue:R?.title,maxLength:20,showCount:!0,onChange:e=>{R.title=e.target.value,L({aiPipelinePointId:g,title:e.target.value})}})}),i.jsx(n.Item,{label:"模型",name:"model",rules:[{required:!0}],children:i.jsx(r,{options:q,placeholder:"请选择",defaultValue:R?.model,onChange:e=>{R.model=e,L({aiPipelinePointId:g,model:e})}})}),i.jsx(n.Item,{label:"对话历史",name:"isHistory",rules:[{required:!0}],tooltip:"开启后Ai聊天中的聊天历史会自动带入",children:i.jsx(d,{checkedChildren:"开启",unCheckedChildren:"关闭",defaultValue:"1"==R.isHistory,onChange:e=>{R.isHistory=e?"1":"0",L({aiPipelinePointId:g,isHistory:e?"1":"0"})}})}),i.jsx("div",{style:{marginBottom:"10px"},children:i.jsx(P,{point:R,getDetail:D,inputVarList:A})}),i.jsx(n.Item,{label:"系统提示词",name:"systemPrompt",rules:[{required:!1}],children:i.jsx(l.TextArea,{placeholder:"系统提示词,可以使用{{变量名}}、{{变量名.子变量名}}、{{变量名[数组索引]}}的方式引用输入参数中的变量",showCount:!0,autoSize:{minRows:3,maxRows:5},defaultValue:R.systemPrompt,onChange:e=>{R.systemPrompt=e.target.value,L({aiPipelinePointId:g,systemPrompt:e.target.value})}})}),i.jsx(n.Item,{label:"用户输入",name:"userPrompt",rules:[{required:!0}],tooltip:"本次调用的用户角色输入内容",children:i.jsx(l.TextArea,{placeholder:"输入,可以使用{{变量名}}、{{变量名.子变量名}}、{{变量名[数组索引]}}的方式引用输入参数中的变量",showCount:!0,autoSize:{minRows:3,maxRows:5},defaultValue:R.userPrompt,onChange:e=>{R.userPrompt=e.target.value,L({aiPipelinePointId:g,userPrompt:e.target.value})}})}),i.jsx(u,{className:"mmm-margin-top-bottom-10",bordered:!1,color:"magenta",children:"当输出参数只有一个 且此参数是在结束节点关联的唯一一个输出 那么可以进行流式调用"}),i.jsx(w,{point:R,getDetail:D,inputVarList:A})]})})})]})}export{b as default};
