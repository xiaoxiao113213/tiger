import{a as n}from"./index-10719960.js";const t="/devops-server";async function e(e){return n.post({url:`${t}/aiPipeline/insert`,data:e})}async function a(e){return n.post({url:`${t}/aiPipeline/update`,data:e})}async function i(e){return n.post({url:`${t}/aiPipeline/del`,data:e})}async function r(e){return n.post({url:`${t}/aiPipeline/getOne`,data:e})}async function u(e){return n.post({url:`${t}/aiPipeline/getPage`,data:e})}async function o(e){return n.post({url:`${t}/aiPipeline/getAll`,data:e})}async function s(e){return n.post({url:`${t}/aiPipeline/getPointAndEdge`,data:e})}async function l(e){return n.post({url:`${t}/aiPipeline/delEdge`,data:e})}async function p(e){return n.post({url:`${t}/aiPipeline/check`,data:e})}export{o as aiPipelineAllApi,i as aiPipelineDeleteApi,r as aiPipelineGetOneApi,u as aiPipelinePageApi,e as aiPipelineSaveApi,a as aiPipelineUpdateApi,p as checkApi,l as delEdgeApi,s as getPointAndEdgeApi};
