import{j as e,F as l,R as s,I as i,ab as r,B as a,S as n}from"./index-1fe6dff8.js";import{d as t}from"./TextArea-08e23fd4.js";import{M as d}from"./MinusCircleOutlined-7f40363e.js";import{P as o}from"./PlusOutlined-73232e7a.js";import"./Input-f98aea5e.js";import"./MinusCircleOutlined-47af1d51.js";const m=m=>{const u=m.isEditScope??!0;return e.jsxs("div",{children:[null!=m.initFieldBo.scope&&e.jsx(l.Item,{label:"作用域",name:"scope",rules:[{required:!0,message:"Please input"}],tooltip:{title:"全局：整个流水线可用 局部：仅当插件点可用"},children:e.jsxs(s.Group,{disabled:!u,children:[e.jsx(s,{value:1,children:" 全局 "}),e.jsx(s,{value:0,children:" 局部 "})]})}),e.jsx(l.Item,{label:"标签名称",name:"name",rules:[{required:!0,message:"Please input"}],children:e.jsx(i,{})}),e.jsx(l.Item,{label:"唯一标识",name:"keyName",tooltip:"用于脚本中，需以字母开头 仅支持特殊字符_  ",rules:[{required:!0,message:"Please input"}],children:e.jsx(i,{placeholder:"需以字母开头 仅支持特殊字符_ ",maxLength:12,showCount:!0,disabled:!0===m.initFieldBo.notEditKeyName})}),e.jsx(l.Item,{label:"是否必填",name:"notNull",rules:[{required:!0,message:"Please input"}],children:e.jsxs(s.Group,{children:[e.jsx(s,{value:1,children:" 必填 "}),e.jsx(s,{value:0,children:" 非必填 "})]})}),e.jsx(r,{children:"可选值"}),e.jsx(l.List,{name:"optional",children:(s,{add:r,remove:n})=>e.jsxs(e.Fragment,{children:[s.map((({key:s,name:r,...a})=>e.jsxs("div",{style:{display:"flex",width:"100%"},children:[e.jsx(l.Item,{...a,name:[r,"label"],rules:[{required:!0,message:"请输入标签"}],style:{flex:2},children:e.jsx(i,{placeholder:"请输入标签"})}),e.jsx(l.Item,{...a,name:[r,"value"],rules:[{required:!0,message:"请输入标签对应的值"}],style:{flex:2,marginLeft:"8px"},children:e.jsx(i,{placeholder:"请输入标签对应的值"})}),e.jsx("div",{style:{flex:1,textAlign:"center"},children:e.jsx(d,{onClick:()=>n(r)})})]},s))),e.jsx(l.Item,{children:e.jsx(a,{type:"dashed",onClick:()=>r({label:"",value:""}),block:!0,icon:e.jsx(o,{}),children:"添加可选值"})})]})}),e.jsx(r,{}),e.jsx("br",{}),e.jsx(l.Item,{label:"参数默认值",name:"value",rules:[{required:!1,message:"Please input"}],children:e.jsx(n,{options:m.initFieldBo.optional,allowClear:!0,mode:"multiple",placeholder:"请选择"})}),e.jsx(l.Item,{label:"参数说明",name:"desc",rules:[{required:!1,message:"Please input"}],children:e.jsx(t,{autoSize:{minRows:2},placeholder:"请输入"})})]})};export{m as default};
