import{F as e,r as a,d as s,j as l,I as t,R as r,B as i,O as d,aM as n,Y as o,aN as c,aO as m,m as u}from"./index-1fe6dff8.js";import{G as p}from"./SystemConfigTypeDic-5d40cfe2.js";import"./dicApi-b68549fb.js";const x=x=>{const[j]=e.useForm(),[h,f]=a.useState(s),{SystemConfigTypeList:y}=p();return a.useEffect((()=>((async()=>{if(x.operateEnum===d.edit){let e=await n({id:x.detailId});f(e.data),j.setFieldsValue(e.data)}else j.setFieldsValue(s())})(),()=>{})),[]),l.jsx("div",{children:l.jsxs(e,{form:j,labelCol:{flex:"10%"},wrapperCol:{flex:"90%"},children:[l.jsx(e.Item,{label:"配置key",name:"key",rules:[{required:!0}],children:l.jsx(t,{placeholder:"请输入"})}),l.jsx(e.Item,{label:"类型",name:"type",rules:[{required:!0}],children:l.jsx(r.Group,{children:y.map((e=>l.jsxs(r,{value:e.value,children:[" ",e.label," "]})))})}),l.jsx(e.Item,{label:"描述",name:"remarks",rules:[{required:!0}],children:l.jsx(t.TextArea,{placeholder:"请输入",autoSize:{minRows:2}})}),l.jsx(e.Item,{label:"配置值",name:"value",rules:[{required:!0}],children:l.jsx(t.TextArea,{placeholder:"请输入",autoSize:{minRows:2}})}),l.jsxs(e.Item,{wrapperCol:{offset:8,span:16},style:{textAlign:"right"},children:[l.jsx(i,{type:"default",onClick:()=>{x.setAddOrUpdateModalFn(d.close)},style:{marginRight:20},children:"取消"}),l.jsx(i,{type:"primary",onClick:async()=>{if(!(await j.validateFields().catch((()=>!1))))return;const e=await(j?.getFieldsValue());let a;o(e),a=x.operateEnum===d.edit?await c({...e,id:x.detailId}):await m({...e}),1e3===a.code&&(u.success(a.msg),x.reloadTable(),x.setAddOrUpdateModalFn(d.close))},children:"确定"})]})]})})};export{x as default};
