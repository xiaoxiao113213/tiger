import{j as e,F as l,R as s,I as a,b as r}from"./index-52537ad8.js";import{d as i}from"./TextArea-0027e4e6.js";import"./Input-33d09d13.js";const n=n=>{const t=n.isEditScope??!0;return e.jsxs("div",{children:[null!=n.initFieldBo.scope&&e.jsx(l.Item,{label:"作用域",name:"scope",rules:[{required:!0,message:"Please input"}],tooltip:{title:"全局：整个流水线可用 局部：仅当插件点可用"},children:e.jsxs(s.Group,{disabled:!t,children:[e.jsx(s,{value:1,children:" 全局 "}),e.jsx(s,{value:0,children:" 局部 "})]})}),e.jsx(l.Item,{label:"标签名称",name:"name",rules:[{required:!0,message:"Please input"}],children:e.jsx(a,{})}),e.jsx(l.Item,{label:"唯一标识",name:"keyName",tooltip:"用于脚本中，需以字母开头 仅支持特殊字符_  ",rules:[{required:!0,message:"Please input"}],children:e.jsx(a,{placeholder:"需以字母开头 仅支持特殊字符_ ",maxLength:12,showCount:!0,disabled:!0===n.initFieldBo.notEditKeyName})}),e.jsx(l.Item,{label:"是否必填",name:"notNull",rules:[{required:!0,message:"Please input"}],children:e.jsxs(s.Group,{children:[e.jsx(s,{value:1,children:" 必填 "}),e.jsx(s,{value:0,children:" 非必填 "})]})}),e.jsx(l.Item,{label:"数字的单位",name:"unit",rules:[{required:!1,message:"Please input"}],children:e.jsx(a,{placeholder:"单位 如：元、个、次、天等",allowClear:!0})}),e.jsx(l.Item,{label:"参数默认值",name:"value",rules:[{required:!1,message:"Please input"}],children:e.jsx(r,{placeholder:"请输入"})}),e.jsx(l.Item,{label:"参数说明",name:"desc",rules:[{required:!1,message:"Please input"}],children:e.jsx(i,{autoSize:{minRows:2},placeholder:"请输入"})})]})};export{n as default};
