import{r as e,O as t,d as s,j as o,D as a,aE as i}from"./index-52537ad8.js";import r from"./updatePassword-ce53d114.js";import{L as n}from"./index-db240a57.js";const d=()=>{const[d,l]=e.useState(t.close),[c,m]=e.useState(s),j=[{title:"账户密码",description:o.jsx(o.Fragment,{}),actions:[o.jsx("a",{onClick:()=>{l(t.edit)},children:"修改"},"Modify")]}];return e.useEffect((()=>((async()=>{let e=await i();m(e.data.user)})(),()=>{})),[]),o.jsxs(o.Fragment,{children:[o.jsx(n,{itemLayout:"horizontal",dataSource:j,renderItem:e=>o.jsx(n.Item,{actions:e.actions,children:o.jsx(n.Item.Meta,{title:e.title,description:e.description})})}),o.jsx(a,{title:"修改密码",open:d!==t.close,width:"50%",destroyOnClose:!0,maskClosable:!1,onClose:()=>l(t.close),footer:null,children:o.jsx("div",{children:o.jsx(r,{operateEnum:d,setAddOrUpdateModalFn:l})})})]})};export{d as default};
