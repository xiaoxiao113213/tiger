import{F as e,r as t,j as a,e as r,I as s,C as n,b as l,S as i}from"./index-10719960.js";import{C as d,V as o}from"./ApiBo-d6e5478a.js";import{aiPipelinePointVarUpdateApi as m}from"./varApi-6204ca1d.js";const x=x=>{const{point:u,inputVarList:p,getDetail:c}=x,j=x.title||"输入变量：",[I]=e.useForm(),[f,h]=t.useState([]);t.useEffect((()=>{u&&h(u.varList.filter((e=>e.category==d.Input)).map(((e,t)=>({key:e.aiPipelinePointVarId.toString(),name:e.name,relatedId:e.relatedId,remarks:e.remarks,defaultValue:e.defaultValue}))))}),[u]),t.useEffect((()=>{const e={};for(let t in f)e[f[t].key+"_name"]=f[t].name,e[f[t].key+"_relatedId"]=f[t].relatedId,e[f[t].key+"_remarks"]=f[t].remarks,e[f[t].key+"_defaultValue"]=f[t].defaultValue;I.setFieldsValue(e)}),[f]);const y=[{title:"变量名",dataIndex:"name",width:"180px",editable:!1},{title:"变量值",dataIndex:"relatedId",width:"130px",editable:!0},{title:"默认值",dataIndex:"defaultValue",editable:!0},{title:"描述",dataIndex:"remarks",editable:!1}].map((e=>{if(!e.editable)return e;let t="text";"type"===e.dataIndex&&(t="select"),"remarks"!==e.dataIndex&&"defaultValue"!==e.dataIndex||(t="textArea");return{...e,onCell:a=>({record:a,inputType:t,dataIndex:e.dataIndex,title:e.title,editing:true})}}));return a.jsxs("div",{children:[a.jsx("div",{style:{display:"flex",marginBottom:"5px"},children:a.jsx("div",{children:j})}),a.jsx(e,{form:I,component:!1,onValuesChange:(e,t)=>{for(let a in e){const t=a.split("_"),r=t[0],s=t[1],n=e[a],l={aiPipelinePointVarId:parseInt(r),[s]:n,keyName:s};m(l)}},children:a.jsx(r,{components:{body:{cell:({editing:t,dataIndex:r,title:d,inputType:m,record:x,index:u,children:c,...j})=>{if("变量名"==d)return a.jsx("td",{...j,children:t?a.jsx(e.Item,{name:`${x.key}_${r}`,style:{margin:0},rules:[{required:!0,message:`请输入 ${d}！只能输入英文字符和数字，且以英文字符开头。`},{pattern:/^[a-zA-Z][a-zA-Z0-9]*$/,message:"只能输入英文字符和数字，且以英文字符开头。"}],children:a.jsx(s,{maxLength:20,showCount:!0})}):c});if("变量值"==d)return a.jsx("td",{...j,children:t?a.jsx(e.Item,{name:`${x.key}_${r}`,style:{margin:0},children:a.jsx(n,{options:p,placeholder:"Please select"})}):c});let I="number"===m?a.jsx(l,{}):a.jsx(s,{maxLength:20,showCount:!0});const f=x?.name;return"prompt"==f&&"默认值"==d||"negativePrompt"==f&&"默认值"==d?I=a.jsx(s.TextArea,{}):"seed"==f&&"默认值"==d?I=a.jsx(l,{max:4294967290,min:0}):"number"==f&&"默认值"==d?I=a.jsx(l,{min:1,max:4}):"size"==f&&"默认值"==d?I=a.jsx(i,{options:[{label:"1024*1024",value:"1024*1024"},{label:"720*1280",value:"720*1280"},{label:"1280*720",value:"1280*720"}]}):"select"===m?I=a.jsx(i,{options:o}):"textArea"===m&&(I=a.jsx(s.TextArea,{autoSize:{minRows:1,maxRows:6}})),a.jsx("td",{...j,children:t?a.jsx(e.Item,{name:x.key+"_"+r,style:{margin:0},rules:[{required:!1,message:`Please Input ${d}!`}],children:I}):c})}}},bordered:!0,dataSource:f,columns:y,rowClassName:"editable-row",pagination:!1})})]})};export{x as default};
