import{r as e,j as r}from"./index-52537ad8.js";import{e as t}from"./index-f591dfb2.js";/* empty css                   */import{tableUpdateApi as n}from"./api-ba92b399.js";const o=o=>{const{data:s,id:i}=o,[a,l]=e.useState(!1),[d,u]=e.useState(s.remarks||"双击编辑文字"),c=e.useRef(null),f=t((e=>e.transform[2]));return e.useEffect((()=>{a&&c.current&&(c.current.style.height="auto",c.current.style.height=`${c.current.scrollHeight}px`)}),[d,a]),r.jsx("div",{onDoubleClick:()=>{l(!0)},style:{padding:"10px",border:"1px solid #ddd",borderRadius:"5px",backgroundColor:"#fff",transform:`scale(${1/f})`,transformOrigin:"center",fontSize:"14px",fontStyle:"italic",fontWeight:"bold"},children:a?r.jsx("textarea",{ref:c,value:d,onChange:e=>{u(e.target.value)},onBlur:()=>{l(!1),n({tableId:i,remarks:d})},autoFocus:!0,style:{minWidth:"266px",width:"100%",border:"none",outline:"none",resize:"none",overflow:"hidden"}}):r.jsx("span",{children:d.split("\n").map(((e,t)=>r.jsxs("span",{children:[e,r.jsx("br",{})]},t)))})})};export{o as TextNode};
