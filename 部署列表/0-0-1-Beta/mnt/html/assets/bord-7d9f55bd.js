import{j as e,r as i,O as t,B as o,D as a}from"./index-f2321b57.js";import{R as s,u as r,a as n,b as l,c as p,i as d,C as c,B as m,M as j,P as u}from"./index-da2797ee.js";import{getPointAndEdgeApi as f,delEdgeApi as x}from"./api-c5b82438.js";import{A as g}from"./ApiBo-06fcdbd2.js";import{aiPipelinePointSaveApi as P,aiPipelinePointGetOneApi as y,updatePositionApi as h}from"./pointApi-9a147261.js";/* empty css              */import C from"./StartNode-de76e009.js";import I from"./EndNode-52a49cea.js";import{aiPipelineEdgeSaveApi as T}from"./edgeApi-c87f3469.js";import D from"./AiTextNode-02478e1a.js";import S from"./TextAi1Test-e58cab96.js";import k from"./AiTextToPicNode-a7ec38a8.js";import"./Title-c989167c.js";import"./Input-f009b856.js";import"./TextArea-47627076.js";import"./varApi-9218bc07.js";import"./DeleteOutlined-10e7bcc5.js";import"./endOutputForm-ce6fc05e.js";import"./dicApi-6905b9c5.js";import"./inputForm-7b0913e2.js";import"./outputForm-c0a3e741.js";import"./index-4bc102be.js";import"./FileUploadCom-3c65d1d1.js";import"./PlusOutlined-0e19b652.js";import"./utils-5a18e36f.js";import"./RightSquareTwoTone-e5897024.js";import"./Timeline-170fea38.js";import"./inputForm-62ee979a.js";import"./outputForm-469fe601.js";import"./ChatModelDic-878347d9.js";import"./api-a63184d2.js";const v={start:C,end:I,aiText:D,aiTextToPic:k},A=s=>{const{screenToFlowPosition:C}=r(),[I,D]=i.useState([]),[k,A]=i.useState([]),[b,w]=i.useState(!1),[O,E]=i.useState(t.close),F=e=>({id:e.aiPipelinePointId.toString(),data:{aiPipelineId:e.aiPipelineId,label:"213",point:e,schemaColor:"#91C4F2"},position:{x:e.x,y:e.y},type:e.type});i.useEffect((()=>{(async()=>{let e=await f({aiPipelineId:s.aiPipelineId}),i=e.data.points.map((e=>F(e)));D(i),A(e.data.edges.map((e=>({id:e.aiPipelineEdgeId.toString(),source:e.source.toString(),target:e.target.toString()}))))})()}),[]),i.useEffect((()=>{}),[I]);const N=(e,i)=>{e.dataTransfer.setData("application/reactflow",i),e.dataTransfer.effectAllowed="move"},B=i.useCallback((e=>{e.preventDefault(),e.dataTransfer.dropEffect="move"}),[]),z=i.useCallback((async e=>{e.preventDefault();const i=e.dataTransfer.getData("application/reactflow");if(void 0===i||!i)return;const t=C({x:e.clientX,y:e.clientY}),o=await P({aiPipelineId:s.aiPipelineId,x:t.x.toString(),y:t.y.toString(),type:i});if(1e3!==o.code)return;const a=o.data,r=F(a);D((e=>[...e,r]))}),[C]),M=i.useCallback((e=>{T({aiPipelineId:s.aiPipelineId,source:parseInt(e.source),target:parseInt(e.target)}).then((i=>{A((i=>n(e,i)))}))}),[]),q=i.useCallback((e=>{D((i=>l(e,i)))}),[]),G=i.useCallback((e=>{A((i=>p(e,i)))}),[]);return e.jsxs(g.Provider,{value:{reloadData:async e=>{const{data:i}=await y({aiPipelinePointId:e}),t=F(i);D((i=>i.filter((i=>i.id!==e.toString())).concat(t)))},setOpenDrawer:w,deleteNode:e=>{D((i=>i.filter((i=>i.id!=e))))}},children:[e.jsxs(d,{nodes:I,edges:k,onConnect:M,onNodesChange:q,onEdgesChange:G,onNodeDragStop:async(e,i,t)=>{b||h({x:i.position.x,y:i.position.y,aiPipelinePointId:i.id})},deleteKeyCode:["Backspace","Delete"],onBeforeDelete:async e=>(A((i=>i.filter((i=>!e.edges.find((e=>e.id===i.id)))))),e.edges.length>0&&e.edges.forEach((e=>{x({...e,aiPipelineId:s.aiPipelineId})})),!1),defaultEdgeOptions:{animated:!0},fitView:!0,snapGrid:[16,16],nodeTypes:v,minZoom:.01,maxZoom:6,preventScrolling:!0,zoomOnScroll:!0,zoomOnPinch:!0,zoomOnDoubleClick:!1,onDrop:z,onDragOver:B,children:[e.jsx(c,{}),e.jsx(m,{color:"#aaa",gap:16}),e.jsx(j,{pannable:!0,nodeColor:"#151414"}),e.jsxs(u,{position:"top-left",children:[e.jsx(o,{type:"link",onClick:()=>{},onDragStart:e=>N(e,"aiText"),draggable:!0,children:"文本Ai"}),e.jsx(o,{type:"link",onClick:()=>{},onDragStart:e=>N(e,"aiTextToPic"),draggable:!0,children:"文生图Ai"})]}),e.jsx(u,{position:"top-right",children:e.jsx(o,{type:"primary",style:{display:"block"},onClick:()=>{E(t.add)},children:"单次测试"})})]}),e.jsx(a,{title:"单测",open:O!==t.close,width:"70%",destroyOnClose:!0,maskClosable:!0,onClose:()=>E(t.close),footer:null,children:e.jsx("div",{children:e.jsx(S,{aiPipelineId:s.aiPipelineId})})})]})},b=i=>e.jsx("div",{style:{width:"100%",height:"calc(100vh - 110px)"},children:e.jsx(s,{children:e.jsx(A,{aiPipelineId:i.aiPipelineId,closeModal:i.closeModal})})});export{b as default};
