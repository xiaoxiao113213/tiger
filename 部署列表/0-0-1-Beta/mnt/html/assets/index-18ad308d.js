import{r as e,i as t,F as r,j as i,B as s,D as o,m}from"./index-f2321b57.js";import n from"./formComponent-e31b7955.js";import l from"./index-1e1c35a0.js";import{C as a}from"./index-e51db6e5.js";import"./Title-c989167c.js";import"./Input-f009b856.js";import"./TextArea-47627076.js";import"./Bo-900708b2.js";import"./customerFieldNew-4b477ff0.js";import"./customerText-29c51ee6.js";import"./customerTextArea-c929063a.js";import"./customerSelect-e147971d.js";import"./MinusCircleOutlined-ede52421.js";import"./MinusCircleOutlined-47af1d51.js";import"./PlusOutlined-0e19b652.js";import"./customerMutSelect-b7b09c88.js";import"./CustomerFile-0ba717f3.js";import"./CustomerDate-a09fb913.js";import"./customerNumber-e3e13da1.js";import"./DeleteOutlined-10e7bcc5.js";import"./textSubmit-4229c5b2.js";import"./textAreaSubmit-14d30dcb.js";import"./SelectSubmit-d0c3571a.js";import"./MutSelectSubmit-d4556965.js";import"./FileSubmit-975998bf.js";import"./DateSubmit-41050df2.js";import"./NumberSubmit-9c6b3724.js";const p=()=>{const[p,u]=e.useState(!1),j=t.useRef(null),[c]=r.useForm(),[d,x]=e.useState([]);return i.jsxs(i.Fragment,{children:[i.jsx(s,{type:"primary",onClick:()=>{u(!0)},children:"Open Modal"}),i.jsx(a,{title:i.jsxs("div",{style:{display:"flex",justifyContent:"space-between"},children:[i.jsx("span",{children:"表单设计"}),i.jsx(s,{type:"primary",onClick:()=>u(!0),children:"设计表单"})]}),children:i.jsx(r,{form:c,validateTrigger:"false",onValuesChange:(e,t)=>{d.forEach((t=>{e.hasOwnProperty(t.id)&&(t.value=e[t.id])})),x(d)},children:d.map((e=>i.jsx(l,{initFieldBo:e},e.id)))})}),i.jsx(o,{title:"表单设计",open:p,onClose:()=>u(!1),extra:i.jsx(s,{onClick:()=>{const e=j.current?.getFieldList();if(!e)return;e.forEach((t=>{if(""===t.keyName)throw m.error("有字段的唯一标识为空"),new Error("有字段的唯一标识为空");const r=e.filter((e=>e.keyName===t.keyName));if(r.length>1)throw m.error(`有重复的唯一标识【${r[0].keyName}】`),new Error(`有重复的唯一标识【${r[0].keyName}】`)})),x(e);const t={};e.forEach((e=>{t[e.id]=e.value})),c.setFieldsValue(t),u(!1)},type:"primary",children:"确定"}),width:"100%",destroyOnClose:!0,keyboard:!1,children:i.jsx(n,{ref:j,initFormDesign:d})})]})};export{p as default};
