import{i as e,r as a,O as s,j as l,aa as d,h as t,B as i,a3 as n,D as o,M as r,c,m}from"./index-52537ad8.js";import{KeyIcon as j}from"./KeyIcon-b74b704d.js";/* empty css                   */import x from"./TableTag-132f4293.js";import{tableDeleteApi as h,tableCopyApi as b}from"./api-ba92b399.js";import{M as p}from"./MoreOutlined-d09fbb75.js";const u=e.createContext({reloadTableData:e=>{},setOpenDrawer:e=>{},deleteTable:e=>{}}),y=e=>{const{data:y,selected:v}=e,f=e.id,g=y.databaseBoardId,[k,_]=a.useState(s.close),{reloadTableData:C,setOpenDrawer:T,deleteTable:O}=a.useContext(u),I=()=>{_(s.close),T(!1),C(f)},M=async()=>{r?.confirm({title:"是否确认删除",icon:null,onOk:async()=>{let e=await h({tableId:f});c(e)||(m.success(e.msg),_(s.close),T(!1),O(f))}})},N=async()=>{let e=await b({tableId:f});c(e)||C(e.data)},w=a.useMemo((()=>l.jsx(d,{trigger:"hover",title:y.description??"",children:l.jsx("div",{children:l.jsxs("div",{className:"table",style:{backgroundColor:v?"#d4dee6":"white"},onDoubleClick:()=>{_(s.add),T(!0)},children:[l.jsxs("div",{style:{backgroundColor:y.schemaColor,display:"flex"},className:"table__name",children:[l.jsx("div",{style:{flex:10},children:y.name}),l.jsx("div",{style:{color:"blue",flex:1,cursor:"default"},children:l.jsx(t,{trigger:"click",placement:"rightTop",content:l.jsxs("div",{children:[l.jsx("div",{children:l.jsx(i,{type:"link",onClick:()=>{_(s.add),T(!0)},hidden:n("databaseBoard:edit"),children:"修改"})}),l.jsx("div",{children:l.jsx(i,{type:"link",onClick:M,hidden:n("databaseBoard:edit"),children:"删除"})}),l.jsx("div",{children:l.jsx(i,{type:"link",onClick:N,hidden:n("databaseBoard:edit"),children:"复制"})})]}),children:l.jsx(p,{})})})]}),l.jsx("div",{className:"table__columns",children:y.columns.map(((e,a)=>l.jsxs("div",{className:"column-name__inner",children:[l.jsxs("div",{className:"column-name__name",style:{display:"flex",alignItems:"center"},children:[e.name,"  ",e.key&&l.jsx(j,{})]}),l.jsx("div",{className:"column-name__type",children:e.type})]},a)))})]},f)})})),[y,v]);return l.jsxs(l.Fragment,{children:[w,l.jsx(o,{title:"表结构",open:k!==s.close,width:"100%",destroyOnClose:!0,maskClosable:!1,keyboard:!0,onClose:I,footer:null,children:l.jsx("div",{children:l.jsx(x,{tableId:f,databaseBoardId:g,closeTableTagModal:I})})},"1222232")]})},v=Object.freeze(Object.defineProperty({__proto__:null,TableNode:y},Symbol.toStringTag,{value:"Module"}));export{u as M,y as T,v as a};
