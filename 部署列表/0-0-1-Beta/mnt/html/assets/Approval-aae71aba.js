import{j as e,F as s,R as r,I as a,B as n,m as l,c as t}from"./index-10719960.js";import{approvalApi as i}from"./processInstanceApi-0b945bb8.js";const o=o=>e.jsx("div",{children:e.jsxs(s,{name:"basic",initialValues:{remember:!0},onFinish:async e=>{if(!o.processInstanceApprovalPeopleId)return;if(!e.status)return void l.error("请选择类别");const s=await i({processInstanceApprovalPeopleId:o.processInstanceApprovalPeopleId,status:e.status,reason:e.reason});t(s)||o.onClose()},autoComplete:"off",clearOnDestroy:!0,children:[e.jsx(s.Item,{name:"status",label:"类别",required:!0,rules:[{required:!1,message:"请选择类别"}],initialValue:"2",children:e.jsxs(r.Group,{children:[e.jsx(r,{value:"2",children:"同意"}),e.jsx(r,{value:"3",children:"拒绝"})]})}),e.jsx(s.Item,{label:"原因",name:"reason",rules:[{required:!1,message:"Please input your username!"}],children:e.jsx(a.TextArea,{placeholder:"请输入原因"})}),e.jsx(s.Item,{wrapperCol:{offset:12,span:16},children:e.jsx(n,{type:"primary",htmlType:"submit",children:"Submit"})})]})});export{o as default};
