import{F as e,r as l,d as a,j as r,I as d,B as s,O as t,Y as i,m as n}from"./index-10719960.js";import{tableFieldGetOneApi as c,tableFieldUpdateApi as u,tableFieldSaveApi as o}from"./api-48014ce1.js";const m=m=>{const[h]=e.useForm(),[x,j]=l.useState(a);return l.useEffect((()=>((async()=>{if(m.operateEnum===t.edit){let e=await c({tableFieldId:m.detailId});j(e.data),h.setFieldsValue(e.data)}else h.setFieldsValue(a())})(),()=>{})),[]),r.jsx("div",{children:r.jsxs(e,{form:h,labelCol:{flex:"10%"},wrapperCol:{flex:"90%"},children:[r.jsx(e.Item,{label:"tableFieldId",name:"tableFieldId",rules:[{required:!0}],children:r.jsx(d,{placeholder:"请输入"})}),r.jsx(e.Item,{label:"tableId",name:"tableId",rules:[{required:!0}],children:r.jsx(d,{placeholder:"请输入"})}),r.jsx(e.Item,{label:"databaseBoardId",name:"databaseBoardId",rules:[{required:!0}],children:r.jsx(d,{placeholder:"请输入"})}),r.jsx(e.Item,{label:"code",name:"code",rules:[{required:!0}],children:r.jsx(d,{placeholder:"请输入"})}),r.jsx(e.Item,{label:"desc",name:"desc",rules:[{required:!0}],children:r.jsx(d,{placeholder:"请输入"})}),r.jsx(e.Item,{label:"type",name:"type",rules:[{required:!0}],children:r.jsx(d,{placeholder:"请输入"})}),r.jsx(e.Item,{label:"length",name:"length",rules:[{required:!0}],children:r.jsx(d,{placeholder:"请输入"})}),r.jsx(e.Item,{label:"decimal",name:"decimal",rules:[{required:!0}],children:r.jsx(d,{placeholder:"请输入"})}),r.jsx(e.Item,{label:"flagNotNull",name:"flagNotNull",rules:[{required:!0}],children:r.jsx(d,{placeholder:"请输入"})}),r.jsx(e.Item,{label:"flagKey",name:"flagKey",rules:[{required:!0}],children:r.jsx(d,{placeholder:"请输入"})}),r.jsx(e.Item,{label:"defaultValue",name:"defaultValue",rules:[{required:!0}],children:r.jsx(d,{placeholder:"请输入"})}),r.jsx(e.Item,{label:"flagAutoIncrement",name:"flagAutoIncrement",rules:[{required:!0}],children:r.jsx(d,{placeholder:"请输入"})}),r.jsx(e.Item,{label:"flagUnsigned",name:"flagUnsigned",rules:[{required:!0}],children:r.jsx(d,{placeholder:"请输入"})}),r.jsxs(e.Item,{wrapperCol:{offset:8,span:16},style:{textAlign:"right"},children:[r.jsx(s,{type:"default",onClick:()=>{m.setAddOrUpdateModalFn(t.close)},style:{marginRight:20},children:"取消"}),r.jsx(s,{type:"primary",onClick:async()=>{if(!(await h.validateFields().catch((()=>!1))))return;const e=await(h?.getFieldsValue());let l;i(e),l=m.operateEnum===t.edit?await u({...e,tableFieldId:m.detailId}):await o({...e}),1e3===l.code&&(n.success(l.msg),m.reloadTable(),m.setAddOrUpdateModalFn(t.close))},children:"确定"})]})]})})};export{m as default};
