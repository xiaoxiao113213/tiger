import{f as t}from"./index-03adb9ee.js";function e(t,e,i,l){return t.x=e,t.y=i,i>l?{x:e,y:i,globalY:i}:{x:e,y:i,globalY:l}}function i(t,l,o,s){t.x=l,t.y=o;let a=s;if(t.sonStageList&&t.sonStageList.length>0){let e={x:l,y:o,globalY:s};t.sonStageList.forEach(((t,a)=>{e=0===a?i(t,l+200,o,s):i(t,e.x,e.globalY+60,e.globalY)})),s<e.globalY&&(a=e.globalY)}else a<o&&(a=o);if(t.stepList&&t.stepList.length>0){let i={x:l,y:o,globalY:a};return t.stepList.forEach(((t,s)=>{i=0===s?e(t,l+30,o+60,a):e(t,i.x,i.y+60,i.globalY)})),i.globalY>a&&(a=i.globalY),{x:l,y:i.y,globalY:a}}return o>a&&(a=o),{x:l,y:o,globalY:a}}function l(t){return"step-"+t}function o(t){return"stage-"+t}function s(e,i,a,d){let r=(g=e.id,u=e.name,b=e.x,y=e.y,h=e.buildStatus,{id:o(g),position:{x:b,y:y},style:{width:100,height:40,fill:"#5bdeea",stroke:"#5ba6ea",lineWidth:0,radius:3},data:{label:u,bgColor:n(h),buildStatus:h},type:"stageNode"});var g,u,b,y,h;if(a.push(r),e.x===i.x){const l={id:t(),source:i.id,target:o(e.id)};d.push(l)}else{const l={id:t(),source:i.id,target:o(e.id)};d.push(l)}if(e.stepList&&e.stepList.length>0&&e.stepList.forEach((i=>{let s=function(t,e,i,o,s){return{id:l(t),position:{x:i,y:o},style:{width:100,height:40,fill:"#bd68dc",stroke:"#c22323",lineWidth:0,radius:20},data:{label:e,bgColor:n(s),buildStatus:s},type:"stepNode"}}(i.id,i.name,i.x,i.y,i.buildStatus);a.push(s);const r={id:t(),source:o(e.id),sourceHandle:"b",target:l(i.id)};d.push(r)})),e.sonStageList&&e.sonStageList.length>0){let t={id:o(e.id),x:e.x,y:e.y};e.sonStageList.forEach((e=>{s(e,t,a,d)}))}}function a(t){let e={x:300,y:100,globalY:100};t.forEach(((t,l)=>{e=i(t,e.x,0===l?e.y:e.globalY+60,e.globalY)}));let l={id:"start",position:{x:100,y:100},style:{width:100,height:40,fill:"#6ae7b1",stroke:"#6ae7b1",lineWidth:0,radius:3},data:{label:"Start"},type:"startNode"},o=[l],a=[],n={id:l.id,x:l.position.x,y:l.position.y};return t.forEach((t=>{s(t,n,o,a)})),{nodes:o,edges:a,y:e.globalY+40}}function n(t){return 7===t?"#FFD700":8===t?"#1E90FF":9===t?"#FFA500":27===t?"#32CD32":28===t?"#FF4500":29===t?"#800080":30===t?"#808080":void 0}export{a as buildData,n as getPipelineStatusColor};
