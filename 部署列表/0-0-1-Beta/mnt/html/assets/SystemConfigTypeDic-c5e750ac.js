import{r as e}from"./index-52537ad8.js";import{dicValueApi as t}from"./dicApi-f974ede5.js";const a=()=>{const[a,s]=e.useState([]),[o,n]=e.useState(new Map),[p,i]=e.useState({});return e.useEffect((()=>{(async()=>{let e=await t({code:"system_config_type"});e.data.forEach((e=>e.value=parseInt(e.value))),s(e.data);let a={},o=new Map;e.data.forEach((e=>{a[e.value]={text:e.label},o.set(e.value,e)})),n(o),i(a)})()}),[]),{SystemConfigTypeList:a,SystemConfigTypeMap:o,SystemConfigTypeValueEnum:p}};export{a as G};
