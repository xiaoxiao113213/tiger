import{a as t}from"./index-1fe6dff8.js";const a="/devops-server";async function n(n){return t.post({url:`${a}/talk/insert`,data:n})}async function r(n){return t.post({url:`${a}/talk/addGroupUser`,data:n})}async function u(n){return t.post({url:`${a}/talk/transferGroupOwner`,data:n})}async function o(n){return t.post({url:`${a}/talk/kickOutGroup`,data:n})}async function e(n){return t.post({url:`${a}/talk/exitGroup`,data:n})}async function s(n){return t.post({url:`${a}/talk/updateGroupName`,data:n})}async function l(n){return t.post({url:`${a}/talk/del`,data:n})}async function c(n){return t.post({url:`${a}/talk/getOne`,data:n})}async function p(n){return t.post({url:`${a}/talk/getPage`,data:n})}async function d(n){return t.post({url:`${a}/talk/getAll`,data:n})}export{r as addGroupUser,e as exitGroupApi,o as kickOutGroupApi,d as talkAllApi,l as talkDeleteApi,c as talkGetOneApi,p as talkPageApi,n as talkSaveApi,u as transferGroupOwner,s as updateGroupNameApi};
