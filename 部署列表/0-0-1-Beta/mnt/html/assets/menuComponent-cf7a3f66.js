import{j as e,r as a,ay as t}from"./index-f2321b57.js";import{roleGetOneApi as i}from"./api-5c5bfeed.js";const d=d=>{if(!d.roleId)return e.jsx("div",{children:"loading"});const[s,n]=a.useState([]),[r,c]=a.useState([]);return a.useEffect((()=>((async()=>{let e=await i({id:d.roleId});c(d.application.menuList),n(e.data.menu)})(),()=>{})),[]),e.jsx("div",{children:e.jsx(t,{checkable:!0,defaultExpandedKeys:[],checkedKeys:s,onCheck:(e,a)=>{},treeData:r,fieldNames:{title:"name",key:"id",children:"children"}})})};export{d as default};
