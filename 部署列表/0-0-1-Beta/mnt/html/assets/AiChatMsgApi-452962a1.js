import{a as t}from"./index-52537ad8.js";const a="/devops-server";async function n(n){return t.post({url:`${a}/aiChatMsg/insert`,data:n})}async function r(n){return t.post({url:`${a}/aiChatMsg/update`,data:n})}async function s(n){return t.post({url:`${a}/aiChatMsg/del`,data:n})}async function u(n){return t.post({url:`${a}/aiChatMsg/getOne`,data:n})}async function e(n){return t.post({url:`${a}/aiChatMsg/getPage`,data:n})}async function o(n){return t.post({url:`${a}/aiChatMsg/getAll`,data:n})}async function i(n){return t.post({url:`${a}/aiChatMsg/clear`,data:n})}export{o as aiChatMsgAllApi,s as aiChatMsgDeleteApi,u as aiChatMsgGetOneApi,e as aiChatMsgPageApi,n as aiChatMsgSaveApi,r as aiChatMsgUpdateApi,i as clearMsgApi};
