import{a as t}from"./index-52537ad8.js";const a="/devops-server";async function n(n){return t.post({url:`${a}/aiModel/insert`,data:n})}async function e(n){return t.post({url:`${a}/aiModel/update`,data:n})}async function r(n){return t.post({url:`${a}/aiModel/del`,data:n})}async function o(n){return t.post({url:`${a}/aiModel/getOne`,data:n})}async function u(n){return t.post({url:`${a}/aiModel/getPage`,data:n})}async function s(n){return t.post({url:`${a}/aiModel/getAll`,data:n})}export{s as aiModelAllApi,r as aiModelDeleteApi,o as aiModelGetOneApi,u as aiModelPageApi,n as aiModelSaveApi,e as aiModelUpdateApi};
