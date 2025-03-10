import{r as e,j as t,I as i,aG as s,T as l,a9 as r}from"./index-03adb9ee.js";import{riliGetOneApi as a}from"./api-bc6bd50e.js";import{F as o}from"./FileView-c1d4a884.js";import{C as n}from"./index-3585a1a3.js";import{L as m}from"./index-405e7360.js";import{S as d}from"./SearchOutlined-f8f28aae.js";import{d as c}from"./Title-06decefc.js";import{T as x}from"./Timeline-17fa9b43.js";import{P as p}from"./index-88ad5331.js";import"./Input-51214805.js";import"./TextArea-24b2fc1a.js";import"./index-a2b78009.js";import"./EditOutlined-d7a61630.js";const j=r=>{const[a,o]=e.useState(r.userList),[c,x]=e.useState("");return t.jsx("div",{style:{backgroundColor:"white",width:"100%"},children:t.jsx(n,{children:t.jsxs("div",{style:{flex:1,borderRight:"1px solid white",borderRadius:"10px",padding:"3px"},children:[t.jsx(i,{suffix:t.jsx(d,{onClick:()=>{o(r.userList.filter((e=>e.nickName.includes(c))))}}),style:{marginTop:"10px"},onChange:e=>{x(e.target.value)},onPressEnter:e=>{o(r.userList.filter((e=>e.nickName.includes(c))))},allowClear:!0}),t.jsx(m,{itemLayout:"horizontal",dataSource:a,renderItem:(e,i)=>t.jsx(m.Item,{className:"mmm-hover-pointer",children:t.jsx(m.Item.Meta,{avatar:t.jsx("div",{style:{marginLeft:"5px"},children:t.jsx(s,{style:{backgroundColor:"#2b87db",verticalAlign:"middle"},size:"large",src:e.avatar,children:e.nickName})}),title:t.jsxs("div",{style:{display:"flex",justifyContent:"space-between"},children:[t.jsx("span",{children:e.nickName}),0===e.type&&t.jsx(l,{color:"blue",children:"前"}),1===e.type&&t.jsx(l,{color:"blue",children:"后"})]}),description:t.jsx("div",{className:"mmm-ellipsis",children:e.remarks})})})})]})})})},u=i=>{if(!i.detail?.riliId)return t.jsx("div",{});const[s,n]=e.useState();return e.useEffect((()=>((async()=>{let e=await a({riliId:i.detail.riliId});n(e.data)})(),()=>{})),[]),s?t.jsxs("div",{children:[t.jsxs(p,{column:1,title:"",tooltip:"",children:[t.jsxs(p.Item,{label:"类型",tooltip:"",valueType:"text",children:[0===s.type&&t.jsx(l,{color:"blue",children:"日程"}),1===s.type&&t.jsx(l,{color:"blue",children:"任务"})]},"type"),t.jsx(p.Item,{label:"标题",tooltip:"",valueType:"text",children:s.name},"name"),t.jsxs(p.Item,{label:"status",tooltip:"",valueType:"text",children:["0"==s.status&&t.jsx(l,{color:"green",children:"待开始"}),"1"==s.status&&t.jsx(l,{color:"blue",children:"进行中"}),"2"==s.status&&t.jsx(l,{color:"red",children:"结束"})]},"status"),t.jsx(p.Item,{label:"描述",tooltip:"",valueType:"text",children:s.remarks},"remarks"),t.jsx(p.Item,{label:"开始时间",tooltip:"",valueType:"text",children:r(s.startTime).format("YYYY-MM-DD HH:mm")},"startTime"),t.jsx(p.Item,{label:"结束时间",tooltip:"",valueType:"text",children:r(s.endTime).format("YYYY-MM-DD HH:mm")},"endTime"),t.jsx(p.Item,{label:"创建人",tooltip:"",valueType:"text",children:s.createByAccount?.nickName},"createBy"),t.jsx(p.Item,{label:"创建时间",tooltip:"",valueType:"text",children:s.createTime},"createTime"),t.jsx(p.Item,{label:"附件",tooltip:"",valueType:"text",children:t.jsx(o,{fileList:s.fileList??[]})},"fileList"),t.jsx(c,{level:4,children:"参与人员"}),t.jsx(j,{userList:s.userList??[]})]}),t.jsx(x,{style:{marginTop:"20px"},items:s.commentList.map((e=>({children:`${e.createTime}【${e.createByAccount.nickName}】${e.content}`})))})]}):t.jsx("div",{})};export{u as default};
