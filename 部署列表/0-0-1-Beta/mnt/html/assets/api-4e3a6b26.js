import{a as e}from"./index-52537ad8.js";const t="/devops-server";async function a(a){return e.post({url:`${t}/projectRelease/insert`,data:a})}async function r(a){return e.post({url:`${t}/projectRelease/update`,data:a})}async function n(a){return e.post({url:`${t}/projectRelease/del`,data:a})}async function s(a){return e.post({url:`${t}/projectRelease/updateStatus`,data:a})}async function o(a){return e.post({url:`${t}/projectRelease/getOne`,data:a})}async function u(a){return e.post({url:`${t}/projectRelease/getPage`,data:a})}async function c(a){return e.post({url:`${t}/projectRelease/getAll`,data:a})}export{c as projectReleaseAllApi,n as projectReleaseDeleteApi,o as projectReleaseGetOneApi,u as projectReleasePageApi,a as projectReleaseSaveApi,r as projectReleaseUpdateApi,s as projectReleaseUpdateStatusApi};
