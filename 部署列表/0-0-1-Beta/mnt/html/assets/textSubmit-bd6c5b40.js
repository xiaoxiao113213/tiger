import{j as i,r as e,F as l,I as t}from"./index-03adb9ee.js";const n=n=>{if(!n.initFieldBo)return i.jsx("div",{});let o="";1==n.initFieldBo.scope&&(o="（全局）");return e.useMemo((()=>i.jsx(i.Fragment,{children:i.jsx(l.Item,{label:n.initFieldBo.name+o,name:n.initFieldBo.id,rules:[{required:1==n.initFieldBo.notNull}],tooltip:n.initFieldBo.desc,initialValue:n.initFieldBo.value??"",children:i.jsx(t,{placeholder:"请输入"})})})),[n.initFieldBo])};export{n as default};
