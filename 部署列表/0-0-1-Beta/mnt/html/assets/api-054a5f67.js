import{a as t}from"./index-1fe6dff8.js";const e="/devops-server/b";async function a(a){return t.post({url:`${e}/message/insert`,data:a})}async function s(a){return t.post({url:`${e}/message/update`,data:a})}async function n(a){return t.post({url:`${e}/message/updateRead`,data:a})}async function r(a){return t.post({url:`${e}/message/del`,data:a})}async function u(a){return t.post({url:`${e}/message/getOne`,data:a})}async function o(a){return t.post({url:`${e}/message/getPage`,data:a})}async function c(a){return t.post({url:`${e}/message/getAll`,data:a})}export{c as messageAllApi,r as messageDeleteApi,u as messageGetOneApi,o as messagePageApi,a as messageSaveApi,s as messageUpdateApi,n as messageUpdateReadApi};
