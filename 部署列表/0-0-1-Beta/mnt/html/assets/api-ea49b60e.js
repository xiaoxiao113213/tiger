import{a as t}from"./index-f2321b57.js";const e="/devops-server";async function a(a){return t.post({url:`${e}/tableField/insert`,data:a})}async function n(a){return t.post({url:`${e}/tableField/update`,data:a})}async function r(a){return t.post({url:`${e}/tableField/del`,data:a})}async function l(a){return t.post({url:`${e}/tableField/getOne`,data:a})}async function u(a){return t.post({url:`${e}/tableField/getPage`,data:a})}async function s(a){return t.post({url:`${e}/tableField/getAll`,data:a})}export{s as tableFieldAllApi,r as tableFieldDeleteApi,l as tableFieldGetOneApi,u as tableFieldPageApi,a as tableFieldSaveApi,n as tableFieldUpdateApi};
