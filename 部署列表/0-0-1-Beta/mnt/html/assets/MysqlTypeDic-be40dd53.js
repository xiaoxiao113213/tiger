import{r as e}from"./index-10719960.js";import{dicValueApi as t}from"./dicApi-19a4777b.js";const a=()=>{const[a,s]=e.useState(),[l,p]=e.useState(new Map),[y,o]=e.useState({});return e.useEffect((()=>{(async()=>{let e=await t({code:"Mysql_type"});s(e.data);let a={},l=new Map;e.data.forEach((e=>{a[e.value]={text:e.label},l.set(e.value,e)})),p(l),o(a)})()}),[]),{MysqlTypeList:a,MysqlTypeMap:l,MysqlTypeValueEnum:y}};export{a as M};
