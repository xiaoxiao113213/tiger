import{r as t,j as e,e as n}from"./index-52537ad8.js";import{u as o,a,D as s,C as r,P as x}from"./core.esm-26df07bf.js";import{r as g,S as d,v as i,u as L,a as m}from"./modifiers.esm-fa1886ad.js";const c=[{title:"Name",dataIndex:"name"},{title:"Age",dataIndex:"age"},{title:"Address",dataIndex:"address"}],y=t=>{const{attributes:n,listeners:o,setNodeRef:a,transform:s,transition:x,isDragging:g}=L({id:t["data-row-key"]}),d={...t.style,transform:r.Translate.toString(s),transition:x,cursor:"move",...g?{position:"relative",zIndex:9999}:{}};return e.jsx("tr",{...t,ref:a,style:d,...n,...o})},k=()=>{const[r,L]=t.useState([{key:"1",name:"John Brown",age:32,address:"Long text Long text Long text Long text Long text Long text Long text Long text Long text Long text Long text Long text Long text Long text Long text Long text Long text Long text Long text Long text Long text Long text Long text Long text Long text Long text Long text Long text Long text Long text Long text Long text"},{key:"2",name:"Jim Green",age:42,address:"London No. 1 Lake Park"},{key:"3",name:"Joe Black",age:32,address:"Sidney No. 1 Lake Park"}]),k=o(a(x,{activationConstraint:{distance:1}}));return e.jsx(s,{sensors:k,modifiers:[g],onDragEnd:({active:t,over:e})=>{t.id!==e?.id&&L((n=>{const o=n.findIndex((e=>e.key===t.id)),a=n.findIndex((t=>t.key===e?.id));return m(n,o,a)}))},children:e.jsx(d,{items:r.map((t=>t.key)),strategy:i,children:e.jsx(n,{components:{body:{row:y}},rowKey:"key",columns:c,dataSource:r})})})};export{k as default};
