import{r as e,j as r,i as t,F as s,I as a,m as n}from"./index-1fe6dff8.js";import{P as l}from"./PlusCircleOutlined-1ccc4556.js";import"./PlusCircleOutlined-a72eecfb.js";const i=".variableModule{width:600px}.variableModule :global .ant-input{border:1px solid #eceef1;border-top:none}.insertBtnBox{display:flex;align-items:center;padding:4px 12px;gap:4px;height:32px;background:#f8f9fa;border-bottom:1px solid #eceef1;color:#0084ff}\n",o=/\[X(.*?)\]/g,c=["[X1]","[X2]","[X3]","[X4]","[X5]"],u=({value:u,label:d,name:x,variableChange:f})=>{const[m,p]=e.useState(""),h=e.useRef(null),[b,g]=e.useState([]);e.useEffect((()=>{const e=u.match(o)||[];p(u),g(e)}),[u]);const j=()=>{const e=(()=>{if(0===b.length)return 1;const e=b.map((e=>{const r=e.match(/\d/);if(Array.isArray(r)&&r.length>0)return Number(r[0])}));return[1,2,3,4,5].filter((r=>!e.includes(r)))[0]})(),r=h?.current?.resizableTextArea?.textArea,t=r?.selectionStart||0,s=`${m.substr(0,t)}[X${e}]${m.substr(t)}`,a=s.match(o)||[];p(s),g(a),f?.(s),setTimeout((()=>{h?.current?.focus()}))};return r.jsx(t.Fragment,{children:r.jsx(s.Item,{label:d,name:x,children:r.jsxs("div",{className:i.variableModule,children:[r.jsxs("div",{className:i.insertBtnBox,children:[r.jsx(l,{style:{cursor:"pointer"},onClick:j}),r.jsx("span",{style:{cursor:"pointer"},onClick:j,children:"插入变量"})]}),r.jsx(a.TextArea,{value:m,ref:h,onChange:e=>{const r=e?.target?.value,t=r.match(/\[X([^[\]]*?)\]/g)||[];if(!t.every((e=>c.includes(e))))return n.error("不能对变量标志中进行插入变量！");const s=b.filter((e=>!t.includes(e)));let a=r;s.length>0&&(a=m.replace(s[0],"")),g(t),p(a),f?.(a)}})]})})})};export{c as VARIABLE_ARRAY,o as VARIABLE_REG,u as default};
