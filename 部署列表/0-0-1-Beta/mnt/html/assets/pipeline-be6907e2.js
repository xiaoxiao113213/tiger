import{a as n}from"./index-10719960.js";const t="/devops-server";async function e(e){return n.post({url:`${t}/pipeline/insert`,data:e})}async function i(e){return n.post({url:`${t}/pipeline/disabled`,data:e})}async function r(e){return n.post({url:`${t}/pipeline/del`,data:e})}async function a(e){return n.post({url:`${t}/pipeline/update`,data:e})}async function p(e){return n.post({url:`${t}/pipeline/updateOtherSetting`,data:e})}async function u(e){return n.post({url:`${t}/pipeline/getOne`,data:e})}async function s(e){return n.post({url:`${t}/pipeline/getPage`,data:e})}async function o(e){return n.post({url:`${t}/pipeline/getAll`,data:e})}async function l(e){return n.post({url:`${t}/pipelinePermission/update`,data:e})}async function c(e){return n.post({url:`${t}/pipelinePermission/getOne`,data:e})}export{o as pipelineAllApi,r as pipelineDeleteApi,u as pipelineGetOneApi,s as pipelinePageApi,c as pipelinePermissionGetApi,l as pipelinePermissionUpdateApi,e as pipelineSaveApi,a as pipelineUpdateApi,i as pipelineUpdateDisabledApi,p as pipelineUpdateOtherApi};
