import{F as e,r as t,j as a,e as i,f as n,I as r,C as s,b as l,S as d}from"./index-52537ad8.js";import{C as o,V as m}from"./ApiBo-a5a04398.js";import{aiPipelinePointVarUpdateApi as x,aiPipelinePointVarSaveApi as p,aiPipelinePointVarDeleteApi as c}from"./varApi-14a5ea59.js";import{D as u}from"./DeleteOutlined-104cbf00.js";const h=h=>{const{point:j,inputVarList:g,getDetail:I}=h,y=h.title||"输入变量：",[f]=e.useForm(),[k,P]=t.useState();t.useEffect((()=>{j&&P(j.varList.filter((e=>e.category==o.Input)).map(((e,t)=>({key:e.aiPipelinePointVarId.toString(),name:e.name,relatedId:e.relatedId,remarks:e.remarks}))))}),[j]),t.useEffect((()=>{const e={};for(let t in k)e[k[t].key+"_name"]=k[t].name,e[k[t].key+"_relatedId"]=k[t].relatedId,e[k[t].key+"_remarks"]=k[t].remarks;f.setFieldsValue(e)}),[k]);const b=[{title:"变量名",dataIndex:"name",width:"180px",editable:!0},{title:"变量值",dataIndex:"relatedId",width:"130px",editable:!0},{title:"描述",dataIndex:"remarks",editable:!0},{title:"",dataIndex:"operation",width:"30px",render:(e,t)=>"output"===t.name?a.jsx(a.Fragment,{}):a.jsx("div",{children:a.jsx(u,{onClick:()=>(async e=>{"output"!==e.name&&(await c({aiPipelinePointVarId:parseInt(e.key)}),h.getDetail())})(t)})})}].map((e=>{if(!e.editable)return e;let t="text";"type"===e.dataIndex&&(t="select"),"remarks"===e.dataIndex&&(t="textArea");return{...e,onCell:a=>({record:a,inputType:t,dataIndex:e.dataIndex,title:e.title,editing:!0})}}));return a.jsxs("div",{children:[a.jsxs("div",{style:{display:"flex",marginBottom:"5px"},children:[a.jsx("div",{children:y}),a.jsx("div",{style:{marginRight:"30px"},children:a.jsx("a",{onClick:()=>(async()=>{await p({aiPipelinePointId:j.aiPipelinePointId,name:n(),type:"string",remarks:"",category:o.Input}),h.getDetail()})(),children:a.jsx("img",{src:"/icons/加号.svg",alt:"icon",style:{width:16,height:16,display:"inline",marginRight:"5px"}})})})]}),a.jsx(e,{form:f,component:!1,onValuesChange:(e,t)=>{for(let a in e){const t=a.split("_"),i=t[0],n=t[1],r=e[a],s={aiPipelinePointVarId:parseInt(i),[n]:r,keyName:n};x(s)}},children:a.jsx(i,{components:{body:{cell:({editing:t,dataIndex:i,title:n,inputType:o,record:x,index:p,children:c,...u})=>{if("变量名"==n)return"output"===x.name?a.jsx("td",{class:"ant-table-cell",children:x.name}):a.jsx("td",{...u,children:t?a.jsx(e.Item,{name:`${x.key}_${i}`,style:{margin:0},rules:[{required:!0,message:`请输入 ${n}！只能输入英文字符和数字，且以英文字符开头。`},{pattern:/^[a-zA-Z][a-zA-Z0-9]*$/,message:"只能输入英文字符和数字，且以英文字符开头。"}],children:a.jsx(r,{maxLength:20,showCount:!0})}):c});if("变量值"==n)return a.jsx("td",{...u,children:t?a.jsx(e.Item,{name:`${x.key}_${i}`,style:{margin:0},children:a.jsx(s,{options:g,placeholder:"Please select"})}):c});let h="number"===o?a.jsx(l,{}):a.jsx(r,{maxLength:20,showCount:!0});return"select"===o&&(h=a.jsx(d,{options:m})),"textArea"===o&&(h=a.jsx(r.TextArea,{})),a.jsx("td",{...u,children:t?a.jsx(e.Item,{name:x.key+"_"+i,style:{margin:0},rules:[{required:!1,message:`Please Input ${n}!`}],children:h}):c})}}},bordered:!0,dataSource:k,columns:b,rowClassName:"editable-row",pagination:!1})})]})};export{h as default};
