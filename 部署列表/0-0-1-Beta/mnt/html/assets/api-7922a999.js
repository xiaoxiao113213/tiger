import{a as t}from"./index-1fe6dff8.js";const r="/devops-server";async function n(n){return t.post({url:`${r}/project/insert`,data:n})}async function e(n){return t.post({url:`${r}/project/update`,data:n})}async function o(n){return t.post({url:`${r}/project/del`,data:n})}async function a(n){return t.post({url:`${r}/project/getOne`,data:n})}async function u(n){return t.post({url:`${r}/project/getPage`,data:n})}async function s(n){return t.post({url:`${r}/project/getAll`,data:n})}async function c(n){return t.post({url:`${r}/projectCustomField/getAll`,data:n})}async function p(n){return t.post({url:`${r}/projectCustomField/insert`,data:n})}async function i(n){return t.post({url:`${r}/projectPermission/update`,data:n})}async function d(n){return t.post({url:`${r}/projectPermission/getOne`,data:n})}export{s as projectAllApi,c as projectCustomFieldAllApi,p as projectCustomFieldSaveApi,o as projectDeleteApi,a as projectGetOneApi,u as projectPageApi,d as projectPermissionGetApi,i as projectPermissionUpdateApi,n as projectSaveApi,e as projectUpdateApi};
