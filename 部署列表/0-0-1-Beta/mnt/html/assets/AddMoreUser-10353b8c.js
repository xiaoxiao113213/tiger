import{r as e,j as s,F as t,B as r,c as d}from"./index-03adb9ee.js";import i from"./SelectGroupUser-e337efef.js";import{addGroupUser as l}from"./api-809209da.js";import"./index-405e7360.js";import"./SearchOutlined-f8f28aae.js";import"./DeleteOutlined-2f949a39.js";const a=a=>{e.useState("");const[o,c]=e.useState([]);return s.jsxs("div",{children:[s.jsx(t.Item,{children:s.jsx(r,{type:"primary",onClick:()=>{0!==o.length&&l({talkId:a.talkId,userIds:o.map((e=>e.id))}).then((e=>{d(e)||a.close()}))},children:"确定"})}),s.jsx(i,{selectedUsers:o,setSelectedUsers:c,excludeUserIds:a.excludeUserIds})]})};export{a as default};
