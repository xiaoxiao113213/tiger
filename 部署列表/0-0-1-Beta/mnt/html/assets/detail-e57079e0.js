import{r as t,j as e,T as s,ab as i}from"./index-52537ad8.js";import{processInstanceGetOneApi as n}from"./processInstanceApi-5b2286a5.js";import{G as o}from"./ProcessInstanceStatusDic-f983cdae.js";import{F as r}from"./uilts-69ee15ee.js";import l from"./index-26e83972.js";import a from"./pointList-953588e7.js";import{P as c}from"./index-a5ca1b9c.js";import"./dicApi-f974ede5.js";import"./Bo-cc27e439.js";import"./index-ec1d06fe.js";import"./Timeline-03e196cc.js";import"./index-db240a57.js";import"./index-8d66853c.js";import"./EditOutlined-4076ffe0.js";const d=d=>{const[p,m]=t.useState(),[j,x]=t.useState([]),{processInstanceStatusMap:u,processInstanceStatusList:I}=o();return t.useEffect((()=>((async()=>{let t=await n({processInstanceId:d.detailId});m(t.data);const e=t.data.pointList.find((t=>t.type===r.startNode));if(!e)return;const s=t.data.pointFormList.find((t=>t.processInstancePointId===e.processInstancePointId));if(!s)return;const i=t.data.pointFieldList.filter((t=>t.processInstancePointFormId===s.processInstancePointFormId));x(i)})(),()=>{})),[]),p?e.jsxs("div",{style:{display:"flex"},children:[e.jsxs("div",{style:{flexGrow:1,minWidth:0},children:[e.jsxs(c,{column:2,title:"",tooltip:"",children:[e.jsx(c.Item,{label:"标题",tooltip:"",valueType:"text",children:p?.title},"title"),e.jsx(c.Item,{label:"状态",tooltip:"",children:(()=>{let t=u[p?.status];return e.jsx(s,{color:t?.color??"green",children:t?.label})})()},"status"),e.jsx(c.Item,{label:"申请人",tooltip:"",valueType:"text",children:p?.createByAccount?.account},"createBy"),e.jsx(c.Item,{label:"申请时间",tooltip:"",valueType:"text",children:p?.createTime},"createTime"),e.jsx(c.Item,{label:"结束时间",tooltip:"",valueType:"text",children:p?.endTime},"endTime")]}),e.jsx(i,{children:"表单"}),e.jsx(l,{initFieldBoList:j}),e.jsx(i,{})]}),e.jsx("div",{style:{width:"300px",flexShrink:0},children:e.jsx(a,{instanceDetail:p})})]}):null};export{d as default};
