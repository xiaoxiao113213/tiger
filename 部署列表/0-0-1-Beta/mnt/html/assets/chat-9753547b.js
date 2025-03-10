import{r as e,A as t,_ as a,aJ as s,ad as i,g as r,O as o,j as n,I as l,as as c,B as d,h as u,D as p,m,aS as h,c as x,a9 as y,a5 as k,aT as f,M as g,by as v,a4 as T,am as j}from"./index-f2321b57.js";import{d as I,C as w}from"./index-dad91803.js";import{I as N}from"./index-7b466ea5.js";import A from"./GroupSetting-6ad87665.js";import{exitGroupApi as C}from"./api-2c0a7ca6.js";import{b}from"./ApiBo-be5b8d9e.js";import{R as M}from"./index-6eed5ad8.js";import{S as O}from"./SendOutlined-86da6479.js";import{P as S}from"./PlusCircleOutlined-4108a0a8.js";import{M as _}from"./MoreOutlined-609bba84.js";import"./AddMoreUser-a9765924.js";import"./SelectGroupUser-4f9e2d24.js";import"./index-b46dae5a.js";import"./SearchOutlined-8e8ecbf1.js";import"./DeleteOutlined-10e7bcc5.js";import"./RetweetOutlined-9d2a328f.js";import"./index-e51db6e5.js";import"./PlusCircleOutlined-a72eecfb.js";import"./MoreOutlined-49b0b054.js";var F=function(s,i){return e.createElement(t,a({},s,{ref:i,icon:O}))};
/**![send](data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTAiIGhlaWdodD0iNTAiIGZpbGw9IiNjYWNhY2EiIHZpZXdCb3g9IjY0IDY0IDg5NiA4OTYiIGZvY3VzYWJsZT0iZmFsc2UiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHN0eWxlIC8+PC9kZWZzPjxwYXRoIGQ9Ik05MzEuNCA0OTguOUw5NC45IDc5LjVjLTMuNC0xLjctNy4zLTIuMS0xMS0xLjJhMTUuOTkgMTUuOTkgMCAwMC0xMS43IDE5LjNsODYuMiAzNTIuMmMxLjMgNS4zIDUuMiA5LjYgMTAuNCAxMS4zbDE0Ny43IDUwLjctMTQ3LjYgNTAuN2MtNS4yIDEuOC05LjEgNi0xMC4zIDExLjNMNzIuMiA5MjYuNWMtLjkgMy43LS41IDcuNiAxLjIgMTAuOSAzLjkgNy45IDEzLjUgMTEuMSAyMS41IDcuMmw4MzYuNS00MTdjMy4xLTEuNSA1LjYtNC4xIDcuMi03LjEgMy45LTggLjctMTcuNi03LjItMjEuNnpNMTcwLjggODI2LjNsNTAuMy0yMDUuNiAyOTUuMi0xMDEuM2MyLjMtLjggNC4yLTIuNiA1LTUgMS40LTQuMi0uOC04LjctNS0xMC4yTDIyMS4xIDQwMyAxNzEgMTk4LjJsNjI4IDMxNC45LTYyOC4yIDMxMy4yeiIgLz48L3N2Zz4=) */const L=e.forwardRef(F);var E=(e=>(e.Text="0",e.File="1",e.System="2",e))(E||{});let D=Promise.resolve();const P=t=>{const{userMsg:a}=s(),{messages:O,prependMsgs:F,appendMsg:P,setTyping:R,resetList:Y,updateMsg:z,deleteMsg:H}=I.useMessages([]),W=i(),B=r(),[G,J]=e.useState(""),[U,q]=e.useState(o.close),[K,Q]=e.useState(!1),[V,$]=e.useState(null),X=e.useRef(null),Z=async(e,a,s)=>{if("text"===e){const e=a;if(e.length>1e3)return void m.error("消息长度不能超过1000");if(0===e.length)return void m.error("消息不能为空");const i=await h({talkId:t.nowTalk.talkId,text:e,type:E.Text});if(x(i))return;s?z(s,{_id:i.data,type:"text",content:{text:e,type:E.Text,sourceNickName:W?.nickName,sourceAvatar:W?.avatar,sourceType:"0",sourceId:W?.accountId},position:"right",hasTime:!1,createdAt:y().valueOf()}):P({_id:i.data,type:"text",content:{text:e,type:E.Text,sourceNickName:W?.nickName,sourceAvatar:W?.avatar,sourceType:"0",sourceId:W?.accountId},position:"right",hasTime:!1,createdAt:y().valueOf()})}else if("file"===e){const e=await h({talkId:t.nowTalk.talkId,file:a,type:E.File});if(x(e))return;s?z(s,{_id:e.data,type:"text",content:{text:a,type:E.File,sourceNickName:W?.nickName,sourceAvatar:W?.avatar,sourceType:"0",sourceId:W?.accountId},position:"right",hasTime:!1,createdAt:y().valueOf()}):P({_id:e.data,type:"text",content:{text:a,type:E.File,sourceNickName:W?.nickName,sourceAvatar:W?.avatar,sourceType:"0",sourceId:W?.accountId},position:"right",hasTime:!1,createdAt:y().valueOf()})}t.reloadTalkList()},ee=async e=>{const a=await f({talkId:t.nowTalk.talkId,talkMsgId:e,pageSize:30});if(0===a.data.length)return void J("没有更多了");a.data.length<30&&J("没有更多了");let s=a.data.map((e=>{let t="left";return"2"==e.sourceType||e.sourceId===W?.accountId&&(t="right"),{_id:e.talkMsgId,type:e.type===E.System?"system":"text",content:{text:e.text??e.file,type:e.type,sourceNickName:e.sourceNickName,sourceAvatar:e.sourceAvatar,sourceType:e.sourceType,sourceId:e.sourceId},position:t,hasTime:!1,user:{},createdAt:y(e.createTime).valueOf()}}));F(s)};e.useEffect((()=>(J(""),Y([]),ee(),()=>{})),[t.nowTalk.talkId]),e.useEffect((()=>{1===a.type&&(D=D.then((async()=>{await(async()=>{let e=null;O.length>0&&(e=O[O.length-1]._id);const a=await f({talkId:t.nowTalk.talkId,talkMsgIdAfter:e,pageSize:30});0===a.data.length&&J("没有更多了"),a.data.forEach((e=>{H(e.talkMsgId);let t="left";"2"==e.sourceType||e.sourceId===W?.accountId&&(t="right"),P({_id:e.talkMsgId,type:e.type===E.System?"system":"text",content:{text:e.text??e.file,type:e.type,sourceNickName:e.sourceNickName,sourceAvatar:e.sourceAvatar,sourceType:e.sourceType,sourceId:e.sourceId},position:t,hasTime:!1,user:{},createdAt:y(e.createTime).valueOf()})}))})()})))}),[a]);const te=e.useCallback((()=>ae()),[t.nowTalk.talkId]),ae=()=>{const[t,a]=e.useState("");return n.jsxs("div",{className:"input-area",children:[n.jsx("div",{style:{width:"100%"},children:n.jsx(l.TextArea,{value:t,className:"Input Input--outline Composer-input",autoFocus:!0,variant:"outlined",placeholder:"请输入消息 最多1000字",autoSize:{minRows:1,maxRows:6},onPressEnter:async e=>{13!==e.keyCode||e.shiftKey||(e.preventDefault(),t.trim()&&(await Z("text",t.trim()),a("")))},onChange:e=>{a(e.target.value)},maxLength:1e3})}),n.jsx("div",{style:{width:"30px",textAlign:"center",alignContent:"center"},children:n.jsx(c,{menu:{items:[{label:"上传文件",key:"1"}],onClick:({key:e})=>{"1"===e&&se()}},children:n.jsx("a",{children:n.jsx(S,{})})})}),n.jsx("div",{style:{textAlign:"center",alignContent:"center"},children:n.jsx(d,{type:"primary",onClick:async()=>{t.trim()&&(await Z("text",t.trim()),a(""))},children:n.jsx(L,{})})})]})},se=()=>{const e=document.createElement("input");e.type="file",e.accept="*/*",e.click(),e.onchange=async e=>{const t=e.target.files?.[0];t&&ie(t)}},ie=async e=>{const a=new FormData;a.append("file",e);const s=j();P({_id:s,type:"text",content:{text:e.name+"-上传中...",type:E.Text,sourceNickName:W?.nickName,sourceAvatar:W?.avatar,sourceType:"0",sourceId:W?.accountId},position:"right",hasTime:!1,createdAt:y().valueOf()});try{const e=await T(a,b.TempConvertFile,t.nowTalk.talkId);e&&e.data.fullPath?await Z("file",e.data,s):m.error("发送文件失败")}catch(i){z(s,{_id:s,type:"text",content:{text:e.name+"-上传失败",type:E.Text,sourceNickName:W?.nickName,sourceAvatar:W?.avatar,sourceType:"0",sourceId:W?.accountId},position:"right",hasTime:!1,createdAt:y().valueOf()})}},re=async e=>{const t=e.clipboardData?.items;if(t)for(const a of t)if("file"===a.kind){const t=a.getAsFile();t&&ie(t),e.preventDefault();break}};return e.useEffect((()=>(window.addEventListener("paste",re),()=>{window.removeEventListener("paste",re)})),[]),n.jsxs("div",{style:{height:"100%"},children:[n.jsx(w,{messagesRef:X,renderNavbar:()=>n.jsxs("div",{style:{backgroundColor:"#cedbe1",width:"calc(100% - 8px)",height:"48px",borderRadius:"10px",display:"flex",alignItems:"center",justifyContent:"space-between",padding:"0 16px",fontSize:"16px",fontWeight:"bold"},children:[n.jsxs("div",{style:{display:"flex",justifyContent:"flex-start"},children:[n.jsx("span",{style:{display:"flex",alignItems:"center"},children:n.jsx(N,{type:t.nowTalk.talkType,targetId:t.nowTalk.targetId,avatar:t.nowTalk.targetAvatar,nickName:t.nowTalk.title,size:"default"})}),n.jsxs("div",{style:{marginLeft:"20px"},children:[" ",t.nowTalk.title]})]}),n.jsx("div",{style:{cursor:"pointer"},children:n.jsx(u,{trigger:["hover"],placement:"leftTop",open:K,onOpenChange:Q,content:n.jsxs("div",{style:{textAlign:"right"},children:["1"===t.nowTalk.talkType&&n.jsxs("div",{children:[n.jsx("div",{children:n.jsx(d,{type:"link",onClick:()=>{q(o.add),Q(!1)},children:"群设置"})}),n.jsx("div",{children:n.jsx(d,{type:"link",onClick:()=>{g?.confirm({title:"是否确认退出",icon:null,onOk:async()=>{let e=await C({talkId:t.nowTalk.talkId});x(e)||(m.success(e.msg),t.reloadTalkList())}}),Q(!1)},children:"退出群聊"})})]}),n.jsx("div",{children:n.jsx(d,{type:"link",onClick:()=>{(async()=>{g.confirm({title:"确认清除",content:"清除后将无法恢复",icon:null,onOk:async()=>{let e=await v({talkId:t.nowTalk.talkId});x(e)||(m.success(e.msg),Y([]),t.reloadTalkList())}})})(),Q(!1)},children:"清空聊天记录"})})]}),children:n.jsx(_,{})})})]}),messages:O,renderMessageContent:e=>{const{content:t,position:a,createdAt:s}=e,i=V===e._id;let r="other";return t.type===E.File&&(!0===t.text.mimeType?.startsWith("image/")?r="image":!0===t.text.mimeType?.startsWith("video/")?r="video":!0===t.text.mimeType?.startsWith("audio/")&&(r="audio")),n.jsxs("div",{style:{display:"flex",alignItems:"center"},onMouseEnter:()=>$(e._id),onMouseLeave:()=>$(null),children:["left"===a&&n.jsx(N,{type:t.sourceType,avatar:t.sourceAvatar,nickName:t.sourceNickName,targetId:t.sourceId}),"right"===a&&i&&n.jsx("div",{style:{backgroundColor:"rgba(255, 255, 255, 0)",color:"#b39696"},children:y(s).format("YYYY-MM-DD HH:mm:ss")}),t.type===E.File&&"image"===r&&n.jsx(k,{src:t.text.fullPath+"?token="+B?.fileToken,width:100}),t.type===E.File&&"other"===r&&n.jsx("a",{href:t.text.fullPath+"?token="+B?.fileToken,children:t.text.fileName}),t.type===E.File&&"video"===r&&n.jsx("div",{style:{width:200,height:200},children:n.jsx(M,{url:t.text.fullPath+"?token="+B?.fileToken,width:"100%",height:"100%",controls:!0,id:e._id+"id",pip:!1,config:{file:{attributes:{controlsList:"nodownload"}},soundcloud:{options:{show_artwork:!1}}}},e._id+"key")}),t.type===E.File&&"audio"===r&&n.jsx("div",{style:{width:300,height:50},children:n.jsx(M,{url:t.text.fullPath+"?token="+B?.fileToken,width:"100%",height:"100%",controls:!0,id:e._id+"id",pip:!1,config:{file:{attributes:{controlsList:"nodownload"}},soundcloud:{options:{show_artwork:!1}}}},e._id+"key")}),t.type===E.Text&&n.jsx(I.Bubble,{style:{backgroundColor:"lightgreen"},children:n.jsx("div",{children:t.text})}),"left"===a&&i&&n.jsx("div",{style:{backgroundColor:"rgba(255, 255, 255, 0)",color:"#b39696"},children:y(s).format("YYYY-MM-DD HH:mm:ss")}),"right"===a&&n.jsx(N,{type:t.sourceType,avatar:t.sourceAvatar,nickName:t.sourceNickName,targetId:t.sourceId})]})},onSend:Z,loadMoreText:G,onRefresh:async()=>{},onScroll:e=>{if(0===e.currentTarget.scrollTop&&O.length){const e=O[0]?._id;ee(e).then((()=>{setTimeout((()=>{document.querySelector(`.Message[data-id='${e}']`)?.scrollIntoView({behavior:"auto",block:"center"})}),300)}))}},Composer:te}),n.jsx(p,{open:U!==o.close,width:"800px",onClose:()=>{q(o.close),t.reloadTalkList()},destroyOnClose:!0,children:n.jsx(A,{close:()=>{q(o.close),t.reloadTalkList()},talkId:t.nowTalk.talkId})})]})};export{P as default};
