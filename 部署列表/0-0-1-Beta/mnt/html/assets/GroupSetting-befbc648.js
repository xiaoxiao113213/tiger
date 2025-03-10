import{r as e,A as s,_ as t,F as r,O as a,ad as l,j as i,B as n,aG as o,T as d,I as c,K as m,D as u,M as j,c as x,m as f}from"./index-1fe6dff8.js";import{updateGroupNameApi as p,talkGetOneApi as I,transferGroupOwner as h,kickOutGroupApi as k}from"./api-818bd5ab.js";import y from"./AddMoreUser-19b113f0.js";import{L as v}from"./index-debe4a2e.js";import{R as g}from"./RetweetOutlined-9d2a328f.js";import{C}from"./index-80d88ab0.js";import{D as U}from"./DeleteOutlined-916130f1.js";import"./SelectGroupUser-1f7cf2e4.js";import"./SearchOutlined-fb74abfc.js";var b=function(r,a){return e.createElement(s,t({},r,{ref:a,icon:g}))};
/**![retweet](data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTAiIGhlaWdodD0iNTAiIGZpbGw9IiNjYWNhY2EiIHZpZXdCb3g9IjAgMCAxMDI0IDEwMjQiIGZvY3VzYWJsZT0iZmFsc2UiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTEzNiA1NTJoNjMuNmM0LjQgMCA4LTMuNiA4LThWMjg4LjdoNTI4LjZ2NzIuNmMwIDEuOS42IDMuNyAxLjggNS4yYTguMyA4LjMgMCAwMDExLjcgMS40TDg5MyAyNTUuNGM0LjMtNSAzLjYtMTAuMyAwLTEzLjJMNzQ5LjcgMTI5LjhhOC4yMiA4LjIyIDAgMDAtNS4yLTEuOGMtNC42IDAtOC40IDMuOC04LjQgOC40VjIwOUgxOTkuN2MtMzkuNSAwLTcxLjcgMzIuMi03MS43IDcxLjhWNTQ0YzAgNC40IDMuNiA4IDggOHptNzUyLTgwaC02My42Yy00LjQgMC04IDMuNi04IDh2MjU1LjNIMjg3Ljh2LTcyLjZjMC0xLjktLjYtMy43LTEuOC01LjJhOC4zIDguMyAwIDAwLTExLjctMS40TDEzMSA3NjguNmMtNC4zIDUtMy42IDEwLjMgMCAxMy4ybDE0My4zIDExMi40YzEuNSAxLjIgMy4zIDEuOCA1LjIgMS44IDQuNiAwIDguNC0zLjggOC40LTguNFY4MTVoNTM2LjZjMzkuNSAwIDcxLjctMzIuMiA3MS43LTcxLjhWNDgwYy0uMi00LjQtMy44LTgtOC4yLTh6IiAvPjwvc3ZnPg==) */const w=e.forwardRef(b),L=e=>{},O=e=>{},S=s=>{const[t]=r.useForm(),{close:g,talkId:b}=s,[S,F]=e.useState(void 0),[A,N]=e.useState(),[D,M]=e.useState(a.close),[R,z]=e.useState(""),B=l(),E=()=>{I({talkId:b}).then((e=>{F(e.data),t.setFieldsValue(e.data),z(e.data.title)}))},G=[{key:"1",label:"群成员",children:i.jsxs("div",{children:[i.jsx(n,{type:"primary",style:{marginBottom:"10px"},onClick:()=>{M(a.add)},children:"添加成员"}),i.jsx(v,{itemLayout:"horizontal",dataSource:S?.userList?.filter((e=>"0"===e.type)),renderItem:(e,s)=>i.jsx(v.Item,{onClick:()=>{N(e)},style:{cursor:"pointer",backgroundColor:A?.talkUserId===e.talkUserId?"#f0f0f0":""},children:i.jsx(v.Item.Meta,{avatar:i.jsx("div",{style:{marginLeft:"5px"},children:i.jsx(o,{style:{backgroundColor:"#2b87db",verticalAlign:"middle"},size:"large",src:e.userInfo.avatar,children:e.userInfo.nickName})}),title:i.jsxs("div",{style:{display:"flex",justifyContent:"space-between"},children:[i.jsx("span",{children:e.userInfo.nickName}),i.jsxs("span",{children:[e.talkUserId===S?.userList[0].talkUserId&&i.jsx(d,{color:"#108ee9",children:"群主"}),"0"===e.type&&i.jsx(d,{color:"#108ee9",children:"前"}),"1"===e.type&&i.jsx(d,{color:"#108ee9",children:"后"})]})]}),description:i.jsxs("div",{style:{display:"flex",justifyContent:"space-between"},children:[i.jsx("div",{className:"mmm-ellipsis",children:e.userInfo.remarks}),B?.accountId==S?.userList[0].userId&&i.jsxs("span",{children:[e.talkUserId!==S?.userList[0].talkUserId&&A?.talkUserId===e.talkUserId&&i.jsx(d,{color:"#108ee9",children:i.jsx(w,{onClick:()=>{A&&j?.confirm({title:"是否确认转让群主",icon:null,onOk:async()=>{let e=await h({talkId:b,userId:A?.userInfo.id});x(e)||(f.success(e.msg),E())}})}})}),A?.talkUserId===e.talkUserId&&i.jsx(d,{color:"#108ee9",children:i.jsx(U,{onClick:()=>{A&&j?.confirm({title:"是否确认踢出群聊",icon:null,onOk:async()=>{let e=await k({talkId:b,userId:A?.userInfo.id});x(e)||(f.success(e.msg),E())}})}})})]})]})})})})]})}];return e.useEffect((()=>{E()}),[]),i.jsxs("div",{className:"mmm-bgcolor",children:[i.jsx(C,{children:i.jsxs("div",{children:[i.jsx(r,{name:"basic",form:t,initialValues:{remember:!0},onFinish:L,onFinishFailed:O,autoComplete:"off",children:i.jsx(r.Item,{label:"群名称",name:"title",rules:[{required:!0,message:"请输入群名称"}],children:i.jsx(c,{onChange:e=>{z(e.target.value),p({talkId:b,title:e.target.value})}})})}),i.jsx(m,{defaultActiveKey:"1",items:G,onChange:e=>{}})]})}),i.jsx(u,{open:D!==a.close,width:"800px",onClose:()=>M(a.close),destroyOnClose:!0,children:i.jsx(y,{talkId:b,close:()=>M(a.close),excludeUserIds:S?.userList?.map((e=>e.userInfo.id))})})]})};export{S as default};
