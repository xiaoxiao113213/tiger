import{r as e,j as t,F as s,Q as n,V as a,W as d,B as l,N as i}from"./index-10719960.js";/* empty css                 */import{dicValueApi as r}from"./dicApi-19a4777b.js";import o from"./indexRow-3c722ab8.js";import{P as c}from"./PlusOutlined-cc4f568a.js";import"./DeleteOutlined-91444ec2.js";const x=()=>{const[t,s]=e.useState(),[n,a]=e.useState(new Map),[d,l]=e.useState({});return e.useEffect((()=>{(async()=>{let e=await r({code:"mysql_index_fun"});s(e.data);let t={},n=new Map;e.data.forEach((e=>{t[e.value]={text:e.label},n.set(e.value,e)})),a(n),l(t)})()}),[]),{MysqlIndexFunList:t,MysqlIndexFunMap:n,MysqlIndexFunValueEnum:d}},u=()=>{const[t,s]=e.useState(),[n,a]=e.useState(new Map),[d,l]=e.useState({});return e.useEffect((()=>{(async()=>{let e=await r({code:"mysql_index_type"});s(e.data);let t={},n=new Map;e.data.forEach((e=>{t[e.value]={text:e.label},n.set(e.value,e)})),a(n),l(t)})()}),[]),{MysqlIndexTypeList:t,MysqlIndexTypeMap:n,MysqlIndexTypeValueEnum:d}},p=r=>{const{data:p,form:h,setData:y,tableCode:f,tagNum:j}=r,{MysqlIndexFunList:m}=x(),{MysqlIndexTypeList:g}=u();if(!(null!==m&&null!==g))return t.jsx("div",{children:"Loading..."});const[M,b]=e.useState();if(e.useEffect((()=>{"6"===j&&r.getFieldList().then((e=>{b(e.map((e=>({value:e.code,label:e.code}))))}))}),[j]),!M)return t.jsx("div",{});return t.jsx("div",{style:{},children:t.jsxs(s,{form:h,component:!1,children:[t.jsx(n,{onDragEnd:e=>{if(!e.destination)return;const t=[...p],[s]=t.splice(e.source.index,1);t.splice(e.destination.index,0,s),y(t)},children:t.jsx(a,{droppableId:"my-droppable1",children:e=>t.jsxs("table",{className:"my-table",ref:e.innerRef,...e.droppableProps,style:{width:"100%",tableLayout:"auto"},children:[t.jsx("thead",{children:t.jsxs("tr",{style:{backgroundColor:"#f0f0f0",height:"40px"},children:[t.jsx("th",{children:"索引名"}),t.jsx("th",{children:"字段"}),t.jsx("th",{children:"索引类型"}),t.jsx("th",{children:"索引方法"}),t.jsx("th",{children:"描述"}),t.jsx("th",{children:"操作"})]})}),t.jsxs("tbody",{children:[p.map(((e,s)=>t.jsx(d,{draggableId:e.id.toString(),index:s,children:(s,n)=>t.jsx("tr",{ref:s.innerRef,...s.draggableProps,...s.dragHandleProps,className:"my-row "+(n.isDragging?"my-dragging":""),children:t.jsx(o,{field:e,MysqlIndexFunList:m??[],MysqlIndexTypeList:g??[],form:h,fieldCodeList:M},e.id)})},e.id))),e.placeholder]})]})})}),t.jsxs(l,{style:{width:"100%"},type:"dashed",onClick:()=>y([...p,{id:i(9),indexType:"NORMAL",indexFun:"BTREE",name:f+"_"}]),children:[t.jsx(c,{}),"添加索引"]})]})})};export{p as default};
