import{a as t}from"./index-f2321b57.js";const e="/devops-server";async function n(n){return t.post({url:`${e}/docTree/getOne`,data:n})}async function r(n){return t.post({url:`${e}/docTree/getAllTree`,data:n})}async function o(n){return t.post({url:`${e}/docTree/insert`,data:n})}async function a(n){return t.post({url:`${e}/docTree/del`,data:n})}async function c(n){return t.post({url:`${e}/docTree/exitsDocTree`,data:n})}async function u(n){return t.post({url:`${e}/docTree/updateName`,data:n})}async function s(n){return t.post({url:`${e}/docTree/updateLocation`,data:n})}async function d(n){return t.post({url:`${e}/docTree/updateLocationToFirst`,data:n})}async function i(n){return t.post({url:`${e}/docTreeContent/getOne`,data:n})}async function p(n){return t.post({url:`${e}/docTreeContent/update`,data:n})}export{o as addDocTreeApi,a as delDocTreeApi,c as existDocTreeApi,i as getDocTreeContentApi,n as getDocTreeDetailApi,r as getDocTreeListApi,p as updateDocTreeContentApi,u as updateDocTreeNameApi,d as updateLocationToFirstApi,s as updateTreeLocationApi};
