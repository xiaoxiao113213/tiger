import{j as e,F as s,R as l,I as i}from"./index-10719960.js";import{d as a}from"./TextArea-8948f20d.js";import"./Input-f4f01092.js";const r=r=>{const n=r.isEditScope??!0;return e.jsxs("div",{children:[null!=r.initFieldBo.scope&&e.jsx(s.Item,{label:"作用域",name:"scope",rules:[{required:!0,message:"Please input"}],tooltip:{title:"全局：整个流水线可用 局部：仅当插件点可用"},children:e.jsxs(l.Group,{disabled:!n,children:[e.jsx(l,{value:1,children:" 全局 "}),e.jsx(l,{value:0,children:" 局部 "})]})}),e.jsx(s.Item,{label:"标签名称",name:"name",rules:[{required:!0,message:"Please input"}],children:e.jsx(i,{})}),e.jsx(s.Item,{label:"唯一标识",name:"keyName",tooltip:"用于脚本中，需以字母开头 仅支持特殊字符_  ",rules:[{required:!0,message:"Please input"}],children:e.jsx(i,{placeholder:"需以字母开头 仅支持特殊字符_ ",maxLength:12,showCount:!0,disabled:!0===r.initFieldBo.notEditKeyName})}),e.jsx(s.Item,{label:"是否必填",name:"notNull",rules:[{required:!0,message:"Please input"}],children:e.jsxs(l.Group,{children:[e.jsx(l,{value:1,children:" 必填 "}),e.jsx(l,{value:0,children:" 非必填 "})]})}),e.jsx(s.Item,{label:"参数说明",name:"desc",rules:[{required:!1,message:"Please input"}],children:e.jsx(a,{autoSize:{minRows:2},placeholder:"请输入"})})]})};export{r as default};
