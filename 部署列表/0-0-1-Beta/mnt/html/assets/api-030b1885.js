import{a as t}from"./index-10719960.js";const a="/devops-server/b";async function n(n){return t.post({url:`${a}/application/insert`,data:n})}async function r(n){return t.post({url:`${a}/application/update`,data:n})}async function o(n){return t.post({url:`${a}/application/del`,data:n})}async function p(n){return t.post({url:`${a}/application/getOne`,data:n})}async function i(n){return t.post({url:`${a}/application/getPage`,data:n})}async function c(n){return t.post({url:`${a}/application/getAll`,data:n})}export{c as applicationAllApi,o as applicationDeleteApi,p as applicationGetOneApi,i as applicationPageApi,n as applicationSaveApi,r as applicationUpdateApi};
