import{a as t}from"./index-10719960.js";const r="/devops-server/b";async function n(n){return t.post({url:`${r}/role/insert`,data:n})}async function e(n){return t.post({url:`${r}/role/update`,data:n})}async function a(n){return t.post({url:`${r}/role/del`,data:n})}async function o(n){return t.post({url:`${r}/role/getOne`,data:n})}async function u(n){return t.post({url:`${r}/role/getPage`,data:n})}async function s(n){return t.post({url:`${r}/role/getAll`,data:n})}async function l(n){return t.post({url:`${r}/role/updateDisabled`,data:n})}export{s as roleAllApi,a as roleDeleteApi,o as roleGetOneApi,u as rolePageApi,n as roleSaveApi,e as roleUpdateApi,l as roleUpdateDisabledApi};
