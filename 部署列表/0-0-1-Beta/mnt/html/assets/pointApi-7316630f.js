import{a as t}from"./index-1fe6dff8.js";const n="/devops-server";async function r(r){return t.post({url:`${n}/processPoint/insert`,data:r})}async function s(r){return t.post({url:`${n}/processPoint/insertEnd`,data:r})}async function o(r){return t.post({url:`${n}/processPoint/updatePointName`,data:r})}async function e(r){return t.post({url:`${n}/processPoint/del`,data:r})}async function a(r){return t.post({url:`${n}/processPoint/getOne`,data:r})}async function c(r){return t.post({url:`${n}/processPoint/getPage`,data:r})}async function u(r){return t.post({url:`${n}/processPoint/getAll`,data:r})}export{u as processPointAllApi,e as processPointDeleteApi,a as processPointGetOneApi,c as processPointPageApi,r as processPointSaveApi,s as processPointSaveEndApi,o as processPointUpdateApi};
