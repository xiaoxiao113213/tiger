import{a as e}from"./index-52537ad8.js";const n="/devops-server";async function t(t){return e.post({url:`${n}/aiPipelineEdge/insert`,data:t})}async function a(t){return e.post({url:`${n}/aiPipelineEdge/update`,data:t})}async function i(t){return e.post({url:`${n}/aiPipelineEdge/del`,data:t})}async function r(t){return e.post({url:`${n}/aiPipelineEdge/getOne`,data:t})}async function u(t){return e.post({url:`${n}/aiPipelineEdge/getPage`,data:t})}async function s(t){return e.post({url:`${n}/aiPipelineEdge/getAll`,data:t})}export{s as aiPipelineEdgeAllApi,i as aiPipelineEdgeDeleteApi,r as aiPipelineEdgeGetOneApi,u as aiPipelineEdgePageApi,t as aiPipelineEdgeSaveApi,a as aiPipelineEdgeUpdateApi};
