import{a as n}from"./index-52537ad8.js";const t="/devops-server";async function e(e){return n.post({url:`${t}/pipelinePlugin/insert`,data:e})}async function i(e){return n.post({url:`${t}/pipelinePlugin/update`,data:e})}async function l(e){return n.post({url:`${t}/pipelinePlugin/del`,data:e})}async function a(e){return n.post({url:`${t}/pipelinePlugin/getOne`,data:e})}async function u(e){return n.post({url:`${t}/pipelinePlugin/getPage`,data:e})}async function r(e){return n.post({url:`${t}/pipelinePlugin/getAll`,data:e})}async function p(e){return n.post({url:`${t}/pipelinePluginDetail/getAll`,data:e})}async function s(e){return n.post({url:`${t}/pipelinePluginDetail/getOne`,data:e})}async function o(e){return n.post({url:`${t}/pipelinePluginDetail/getGlobalParamListByDetailId`,data:e})}async function c(e){return n.post({url:`${t}/pipelinePlugin/getAll`,data:e})}export{c as pipelinePluginAllApi,p as pipelinePluginDetailAllApi,s as pipelinePluginDetailGetOneApi,o as pipelinePluginDetailGlobalParamApi,r as pipeline_pluginAllApi,l as pipeline_pluginDeleteApi,a as pipeline_pluginGetOneApi,u as pipeline_pluginPageApi,e as pipeline_pluginSaveApi,i as pipeline_pluginUpdateApi};
