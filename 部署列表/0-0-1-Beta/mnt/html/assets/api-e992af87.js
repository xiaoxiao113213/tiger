import{a as t}from"./index-03adb9ee.js";const n="/devops-server";async function r(r){return t.post({url:`${n}/otherAccount/insert`,data:r})}async function o(r){return t.post({url:`${n}/otherAccount/update`,data:r})}async function c(r){return t.post({url:`${n}/otherAccount/del`,data:r})}async function e(r){return t.post({url:`${n}/otherAccount/getOne`,data:r})}async function u(r){return t.post({url:`${n}/otherAccount/getPage`,data:r})}async function a(r){return t.post({url:`${n}/otherAccount/getAll`,data:r})}export{a as otherAccountAllApi,c as otherAccountDeleteApi,e as otherAccountGetOneApi,u as otherAccountPageApi,r as otherAccountSaveApi,o as otherAccountUpdateApi};
