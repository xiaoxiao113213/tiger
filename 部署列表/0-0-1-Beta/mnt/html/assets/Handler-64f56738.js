import{j as e,F as s,I as a,B as r,c as o}from"./index-1fe6dff8.js";import{approvalApi as n}from"./processInstanceApi-4791703b.js";const t=t=>e.jsx("div",{children:e.jsxs(s,{name:"basic",initialValues:{remember:!0},onFinish:async e=>{if(!t.processInstanceApprovalPeopleId)return;const s=await n({processInstanceApprovalPeopleId:t.processInstanceApprovalPeopleId,status:"2",reason:e.reason});o(s)||t.onClose()},autoComplete:"off",clearOnDestroy:!0,children:[e.jsx(s.Item,{label:"备注",name:"reason",rules:[{required:!1,message:""}],children:e.jsx(a.TextArea,{placeholder:"请输入备注"})}),e.jsx(s.Item,{wrapperCol:{offset:12,span:16},children:e.jsx(r,{type:"primary",htmlType:"submit",children:"Submit"})})]})});export{t as default};
