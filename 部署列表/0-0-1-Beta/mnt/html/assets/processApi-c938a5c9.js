import{a as t}from"./index-10719960.js";const r="/devops-server";async function s(s){return t.post({url:`${r}/process/insert`,data:s})}async function n(s){return t.post({url:`${r}/process/update`,data:s})}async function e(s){return t.post({url:`${r}/process/del`,data:s})}async function o(s){return t.post({url:`${r}/process/getOne`,data:s})}async function a(s){return t.post({url:`${r}/process/getPage`,data:s})}async function u(s){return t.post({url:`${r}/process/getAll`,data:s})}async function c(s){return t.post({url:`${r}/process/getStartSet`,data:s})}async function p(s){return t.post({url:`${r}/process/updateStartSet`,data:s})}async function i(s){return t.post({url:`${r}/process/getPointSet`,data:s})}async function d(s){return t.post({url:`${r}/process/updatePointSet`,data:s})}async function l(s){return t.post({url:`${r}/process/getStartFormField`,data:s})}async function f(s){return t.post({url:`${r}/process/updatePointScript`,data:s})}async function y(s){return t.post({url:`${r}/process/publish`,data:s})}async function $(){return t.post({url:`${r}/process/getUseProcess`})}async function g(s){return t.post({url:`${r}/process/getCanSubmitProcess`,data:s})}export{g as getCanSubmitProcessApi,$ as getMyUseProcess,i as getPointSetApi,l as getStartFormField,c as getStartSetApi,u as processAllApi,e as processDeleteApi,o as processGetOneApi,a as processPageApi,y as processPublish,s as processSaveApi,n as processUpdateApi,f as updatePointScript,d as updatePointSetApi,p as updateStartSetApi};
