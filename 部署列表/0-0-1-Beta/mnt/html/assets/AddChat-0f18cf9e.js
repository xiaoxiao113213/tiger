import{r as e,j as s,F as t,B as r,c as i}from"./index-f2321b57.js";import{talkSaveApi as d}from"./api-2c0a7ca6.js";import o from"./SelectUser-261437e7.js";import"./index-e51db6e5.js";import"./index-b46dae5a.js";import"./SearchOutlined-8e8ecbf1.js";const a=a=>{const[c,l]=e.useState(void 0);return s.jsxs("div",{children:[s.jsx(t.Item,{children:s.jsx(r,{type:"primary",onClick:()=>{void 0!==c&&d({title:"",type:"0",userIds:[c?.id]}).then((e=>{i(e)||(a.setNowTalkId(e.data),a.close())}))},children:"确定"})}),s.jsx(o,{selectedUser:c,setSelectedUser:l})]})};export{a as default};
