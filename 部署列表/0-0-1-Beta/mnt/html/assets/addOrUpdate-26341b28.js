import{F as e,r as a,d as s,j as l,R as t,I as r,B as d,O as i,m as c}from"./index-1fe6dff8.js";import{otherAccountGetOneApi as o,otherAccountUpdateApi as n,otherAccountSaveApi as u}from"./api-f6cf4490.js";import{G as p}from"./OtherAccountTypeDic-4853ea64.js";import"./dicApi-b68549fb.js";const m=m=>{const[h]=e.useForm(),[j,x]=a.useState(s),{OtherAccountTypeMap:f,OtherAccountTypeValueEnum:y,OtherAccountTypeList:w}=p();return a.useEffect((()=>((async()=>{if(m.operateEnum===i.edit){let e=await o({id:m.detailId});e.data.accountPassword=void 0,x(e.data),h.setFieldsValue(e.data)}else h.setFieldsValue(s())})(),()=>{})),[]),l.jsx("div",{children:l.jsxs(e,{form:h,labelCol:{flex:"10%"},wrapperCol:{flex:"90%"},children:[l.jsx(e.Item,{label:"类型",name:"type",rules:[{required:!0}],children:l.jsx(t.Group,{children:w.map((e=>l.jsxs(t,{value:e.value,children:[" ",e.label," "]},e.value)))})}),l.jsx(e.Item,{label:"账号名称",name:"accountName",rules:[{required:!0}],children:l.jsx(r,{placeholder:"请输入"})}),l.jsx(e.Item,{label:"密码",name:"accountPassword",rules:[{required:!1}],children:l.jsx(r,{placeholder:"请输入"})}),l.jsx(e.Item,{label:"备注",name:"remarks",rules:[{required:!1}],children:l.jsx(r,{placeholder:"请输入"})}),l.jsxs(e.Item,{wrapperCol:{offset:8,span:16},style:{textAlign:"right"},children:[l.jsx(d,{type:"default",onClick:()=>{m.setAddOrUpdateModalFn(i.close)},style:{marginRight:20},children:"取消"}),l.jsx(d,{type:"primary",onClick:async()=>{if(!(await h.validateFields().catch((()=>!1))))return;const e=h.getFieldsValue();let a;a=m.operateEnum===i.edit?await n({...e,id:m.detailId}):await u({...e}),1e3===a.code&&(c.success(a.msg),m.reloadTable(),m.setAddOrUpdateModalFn(i.close))},children:"确定"})]})]})})};export{m as default};
