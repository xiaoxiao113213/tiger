import{j as e,T as t,K as i}from"./index-52537ad8.js";import{d as l}from"./TextArea-0027e4e6.js";import{P as s}from"./PipelineBuildStatus-7922b5e5.js";import a from"./index-26e83972.js";import{P as p}from"./index-a5ca1b9c.js";import"./Input-33d09d13.js";import"./Bo-cc27e439.js";import"./index-ec1d06fe.js";import"./index-8d66853c.js";import"./EditOutlined-4076ffe0.js";const r=r=>e.jsxs("div",{children:[e.jsxs(p,{column:2,title:"",tooltip:"",children:[e.jsx(p.Item,{label:"步骤名称",tooltip:"",valueType:"text",children:r.stepDetail.name},"name"),e.jsx(p.Item,{label:"构建状态",tooltip:"",valueType:"text",children:e.jsx(t,{children:s.get(r.stepDetail.buildStatus)})},"buildStatus"),e.jsx(p.Item,{label:"插件",tooltip:"",valueEnum:{0:{text:"否"},1:{text:"是"}},children:r.stepDetail.pipelinePluginId},"pipelinePluginId"),e.jsx(p.Item,{label:"版本",tooltip:"",valueEnum:{0:{text:"否"},1:{text:"是"}},children:r.stepDetail.pipelinePluginDetailId},"pipelinePluginDetailId"),e.jsx(p.Item,{label:"构建错误是否退出",tooltip:"",valueEnum:{0:{text:"不退"},1:{text:"退出"}},children:r.stepDetail.errorStop},"dockerFlag")]}),e.jsx(i,{defaultActiveKey:"1",items:[{label:"脚本",key:"1",children:e.jsx(l,{autoSize:!0,value:r.stepDetail.script,readOnly:!0})},{label:"参数",key:"2",children:e.jsx("div",{style:{backgroundColor:"rgb(176 225 128 / 13%)"},children:r.stepDetail.paramList&&e.jsx(a,{initFieldBoList:r.stepDetail.paramList})})}]})]});export{r as default};
