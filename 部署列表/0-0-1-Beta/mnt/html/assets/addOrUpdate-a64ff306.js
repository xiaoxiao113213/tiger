import{F as e,r as a,d as s,j as l,S as t,I as r,b as o,B as d,O as i,ae as n,af as m,ag as u,m as c}from"./index-f2321b57.js";import{T as h}from"./ApiBo-fe366348.js";const p=p=>{const[x]=e.useForm(),[j,w]=a.useState(s);return a.useEffect((()=>((async()=>{if(p.operateEnum===i.edit){let e=await n({machineId:p.detailId});w(e.data),x.setFieldsValue(e.data)}else x.setFieldsValue({port:22})})(),()=>{})),[]),l.jsx("div",{children:l.jsxs(e,{form:x,labelCol:{flex:"15%"},children:[l.jsx(e.Item,{label:"类型",name:"type",rules:[{required:!0}],children:l.jsx(t,{placeholder:"请选择",allowClear:!0,options:h})}),l.jsx(e.Item,{label:"描述",name:"remarks",rules:[{required:!0}],children:l.jsx(r.TextArea,{placeholder:"请输入",maxLength:200,showCount:!0,autoSize:{minRows:3,maxRows:5}})}),l.jsx(e.Item,{label:"机器连接地址",name:"host",rules:[{required:!0}],children:l.jsx(r,{placeholder:"请输入 host",maxLength:200,showCount:!0,autoComplete:"ds1"})}),l.jsx(e.Item,{label:"端口号",name:"port",rules:[{required:!0}],children:l.jsx(o,{placeholder:"请输入 port",autoComplete:"ds1"})}),l.jsx(e.Item,{label:"机器用户名",name:"username",rules:[{required:!0}],children:l.jsx(r,{placeholder:"请输入",maxLength:200,showCount:!0,autoComplete:"ds12"})}),l.jsx(e.Item,{label:"机器密码",name:"password",rules:[{required:!1}],children:l.jsx(r.Password,{placeholder:"请输入,更新的时候 不输入，就不会修改密码",maxLength:200,showCount:!0,autoComplete:"new-password"})}),l.jsxs(e.Item,{wrapperCol:{offset:8,span:16},style:{textAlign:"right"},children:[l.jsx(d,{type:"default",onClick:()=>{p.setAddOrUpdateModalFn(i.close)},style:{marginRight:20},children:"取消"}),l.jsx(d,{type:"primary",onClick:async()=>{if(!(await x.validateFields().catch((()=>!1))))return;const e=await(x?.getFieldsValue());let a;a=p.operateEnum===i.edit?await m({...e,machineId:p.detailId}):await u({...e}),1e3===a.code&&(c.success(a.msg),p.reloadTable(),p.setAddOrUpdateModalFn(i.close))},children:"确定"})]})]})})};export{p as default};
