import{N as e,a9 as a,g as t}from"./index-10719960.js";var r=(e=>(e[e.year=0]="year",e[e.yearMonth=1]="yearMonth",e[e.yearMonthDay=2]="yearMonthDay",e[e.yearMonthDayHour=3]="yearMonthDayHour",e[e.yearMonthDayHourMinuteSecond=4]="yearMonthDayHourMinuteSecond",e[e.hourMinuteSecond=5]="hourMinuteSecond",e))(r||{}),u=(e=>(e[e.text=1]="text",e[e.number=2]="number",e[e.textArea=3]="textArea",e[e.select=4]="select",e[e.mutSelect=5]="mutSelect",e[e.file=6]="file",e[e.date=7]="date",e[e.password=8]="password",e[e.account=9]="account",e))(u||{});const l=r=>{if(r.id=e(10),r.formFieldId=e(10),5===r.type)r.value=JSON.parse(r.value);else if(7===r.type)r.value&&(r.value=a(r.value));else if(6===r.type)if(null!=r.value&&""!=r.value){const e=JSON.parse(r.value),a=t()?.fileToken??"",u=e.map((e=>({data:e,uid:e.fileKey,name:e.fileName,status:"done",url:"/devops-server/public/biz/download/0/"+e.fileKey+"?token="+a})));r.value=u}else r.value=[]},n=(e,r)=>{if(5===e.type)return JSON.parse(r);if(7!==e.type){if(6===e.type){if(null!=r&&""!=r){const e=JSON.parse(r),a=t()?.fileToken??"";return e.map((e=>({data:e,uid:e.fileKey,name:e.fileName,status:"done",url:"/devops-server/public/biz/download/0/"+e.fileKey+"?token="+a})))}return[]}return r}return r?a(r):void 0},y=(e,t)=>t?5===e.type?JSON.stringify(t):7===e.type?a(t).format("YYYY-MM-DD HH:mm:ss"):6===e.type?JSON.stringify(t.map((e=>e.data))):t:t,i=(e,t)=>{null!=t[e.keyName]&&null!=t[e.keyName]&&(5===e.type?t[e.keyName]=JSON.stringify(t[e.keyName]):7===e.type?t[e.keyName]=a(t[e.keyName]).format("YYYY-MM-DD HH:mm:ss"):6===e.type&&(t[e.keyName]=JSON.stringify(t[e.keyName].map((e=>e.data)))))},o=e=>{5===e.type?e.value=JSON.stringify(e.value??[]):7===e.type?e.value&&(e.value=a(e.value).format("YYYY-MM-DD HH:mm:ss")):6===e.type&&(e.value=JSON.stringify(e.value?.map((e=>e.data))))};export{r as DateTypeEnum,u as FormFieldTypeEnum,i as clientToServerValue,y as clientToServerValue1,o as clientToServerValueItem,l as serverToClientValue,n as serverToClientValue1};
