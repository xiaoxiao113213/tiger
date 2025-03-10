import{r as e,i as t}from"./index-03adb9ee.js";function r(){return r=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var n in r)Object.prototype.hasOwnProperty.call(r,n)&&(e[n]=r[n])}return e},r.apply(this,arguments)}function n(e,t){(null==t||t>e.length)&&(t=e.length);for(var r=0,n=new Array(t);r<t;r++)n[r]=e[r];return n}function a(e,t){var r="undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(r)return(r=r.call(e)).next.bind(r);if(Array.isArray(e)||(r=function(e,t){if(e){if("string"==typeof e)return n(e,t);var r=Object.prototype.toString.call(e).slice(8,-1);return"Object"===r&&e.constructor&&(r=e.constructor.name),"Map"===r||"Set"===r?Array.from(e):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?n(e,t):void 0}}(e))||t&&e&&"number"==typeof e.length){r&&(e=r);var a=0;return function(){return a>=e.length?{done:!0}:{done:!1,value:e[a++]}}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var i;!function(e){e.Hour="Hour",e.QuarterDay="Quarter Day",e.HalfDay="Half Day",e.Day="Day",e.Week="Week",e.Month="Month",e.Year="Year"}(i||(i={}));var o={},s=function(e,t){void 0===t&&(t={});var r=JSON.stringify([e,t]),n=o[r];return n||(n=new Intl.DateTimeFormat(e,t),o[r]=n),n},l=function(e,t,r){return new Date(e.getFullYear()+("year"===r?t:0),e.getMonth()+("month"===r?t:0),e.getDate()+("day"===r?t:0),e.getHours()+("hour"===r?t:0),e.getMinutes()+("minute"===r?t:0),e.getSeconds()+("second"===r?t:0),e.getMilliseconds()+("millisecond"===r?t:0))},c=function(e,t){var r=["millisecond","second","minute","hour","day","month","year"],n=function(e){var n=r.indexOf(t);return r.indexOf(e)<=n};return new Date(e.getFullYear(),n("year")?0:e.getMonth(),n("month")?1:e.getDate(),n("day")?0:e.getHours(),n("hour")?0:e.getMinutes(),n("minute")?0:e.getSeconds(),n("second")?0:e.getMilliseconds())},u=function(e,t,r){for(var n,o=e[0].start,s=e[0].start,u=a(e);!(n=u()).done;){var d=n.value;d.start<o&&(o=d.start),d.end>s&&(s=d.end)}switch(t){case i.Year:o=l(o,-1,"year"),o=c(o,"year"),s=l(s,1,"year"),s=c(s,"year");break;case i.Month:o=l(o,-1*r,"month"),o=c(o,"month"),s=l(s,1,"year"),s=c(s,"year");break;case i.Week:o=c(o,"day"),o=l(f(o),-7*r,"day"),s=c(s,"day"),s=l(s,1.5,"month");break;case i.Day:o=c(o,"day"),o=l(o,-1*r,"day"),s=c(s,"day"),s=l(s,19,"day");break;case i.QuarterDay:o=c(o,"day"),o=l(o,-1*r,"day"),s=c(s,"day"),s=l(s,66,"hour");break;case i.HalfDay:o=c(o,"day"),o=l(o,-1*r,"day"),s=c(s,"day"),s=l(s,108,"hour");break;case i.Hour:o=c(o,"hour"),o=l(o,-1*r,"hour"),s=c(s,"day"),s=l(s,1,"day")}return[o,s]},d=function(e,t,r){for(var n=new Date(e),a=[n];n<t;){switch(r){case i.Year:n=l(n,1,"year");break;case i.Month:n=l(n,1,"month");break;case i.Week:n=l(n,7,"day");break;case i.Day:n=l(n,1,"day");break;case i.HalfDay:n=l(n,12,"hour");break;case i.QuarterDay:n=l(n,6,"hour");break;case i.Hour:n=l(n,1,"hour")}a.push(n)}return a},h=function(e,t){var r=s(t,{month:"long"}).format(e);return r=r.replace(r[0],r[0].toLocaleUpperCase())},g=function(e,t,r){var n=s(t,{weekday:r}).format(e);return n=n.replace(n[0],n[0].toLocaleUpperCase())},f=function(e){var t=e.getDay(),r=e.getDate()-t+(0===t?-6:1);return new Date(e.setDate(r))},m=function(e){var t=new Date(e.valueOf()),r=(t.getDay()+6)%7;t.setDate(t.getDate()-r+3);var n=t.valueOf();t.setMonth(0,1),4!==t.getDay()&&t.setMonth(0,1+(4-t.getDay()+7)%7);var a=(1+Math.ceil((n-t.valueOf())/6048e5)).toString();return 1===a.length?"0"+a:a},v="_3_ygE",y="_1nBOt",x="_2eZzQ",p="_WuQ0f",k=function(e){var r=e.headerHeight,n=e.fontFamily,a=e.fontSize,i=e.rowWidth;return t.createElement("div",{className:v,style:{fontFamily:n,fontSize:a}},t.createElement("div",{className:y,style:{height:r-2}},t.createElement("div",{className:p,style:{minWidth:i}}," Name"),t.createElement("div",{className:x,style:{height:.5*r,marginTop:.2*r}}),t.createElement("div",{className:p,style:{minWidth:i}}," From"),t.createElement("div",{className:x,style:{height:.5*r,marginTop:.25*r}}),t.createElement("div",{className:p,style:{minWidth:i}}," To")))},E="_3ZbQT",b="_34SS0",w="_3lLk3",T="_nI1Xw",S="_2QjE6",C="_2TfEi",D={},W={weekday:"short",year:"numeric",month:"long",day:"numeric"},N=function(r){var n=r.rowHeight,a=r.rowWidth,i=r.tasks,o=r.fontFamily,s=r.fontSize,l=r.locale,c=r.onExpanderClick,u=e.useMemo((function(){return function(e){return function(t,r){var n=t.toString(),a=D[n];return a||(a=t.toLocaleDateString(e,r),D[n]=a),a}}(l)}),[l]);return t.createElement("div",{className:E,style:{fontFamily:o,fontSize:s}},i.map((function(e){var r="";return!1===e.hideChildren?r="▼":!0===e.hideChildren&&(r="▶"),t.createElement("div",{className:b,style:{height:n},key:e.id+"row"},t.createElement("div",{className:w,style:{minWidth:a,maxWidth:a},title:e.name},t.createElement("div",{className:T},t.createElement("div",{className:r?S:C,onClick:function(){return c(e)}},r),t.createElement("div",null,e.name))),t.createElement("div",{className:w,style:{minWidth:a,maxWidth:a}}," ",u(e.start,W)),t.createElement("div",{className:w,style:{minWidth:a,maxWidth:a}}," ",u(e.end,W)))})))},H="_3T42e",M="_29NTg",F="_25P-K",L="_3gVAq",R=function(r){var n=r.task,a=r.rowHeight,i=r.rtl,o=r.svgContainerHeight,s=r.svgContainerWidth,l=r.scrollX,c=r.scrollY,u=r.arrowIndent,d=r.fontSize,h=r.fontFamily,g=r.headerHeight,f=r.taskListWidth,m=r.TooltipContent,v=e.useRef(null),y=e.useState(0),x=y[0],p=y[1],k=e.useState(0),E=k[0],b=k[1];return e.useEffect((function(){if(v.current){var e,t=1.1*v.current.offsetHeight,r=1.1*v.current.offsetWidth,d=n.index*a-c+g;if(i)(e=n.x1-1.5*u-r-l)<0&&(e=n.x2+1.5*u-l),r+e>s&&(e=s-r,d+=a);else r+(e=n.x2+1.5*u+f-l)>f+s&&(e=n.x1+f-1.5*u-l-r),e<f&&(e=s+f-r,d+=a);t+d-c>o-c&&(d=o-t),p(d),b(e)}}),[v,n,u,l,c,g,f,a,o,s,i]),t.createElement("div",{ref:v,className:E?F:L,style:{left:E,top:x}},t.createElement(m,{task:n,fontSize:d,fontFamily:h}))},_=function(e){var r=e.task,n=e.fontSize,a={fontSize:n,fontFamily:e.fontFamily};return t.createElement("div",{className:H,style:a},t.createElement("b",{style:{fontSize:n+6}},r.name+": "+r.start.getDate()+"-"+(r.start.getMonth()+1)+"-"+r.start.getFullYear()+" - "+r.end.getDate()+"-"+(r.end.getMonth()+1)+"-"+r.end.getFullYear()),r.end.getTime()-r.start.getTime()!=0&&t.createElement("p",{className:M},"Duration: "+~~((r.end.getTime()-r.start.getTime())/864e5)+" day(s)"),t.createElement("p",{className:M},!!r.progress&&"Progress: "+r.progress+" %"))},O="_1eT-t",j=function(r){var n=r.scroll,a=r.ganttHeight,i=r.ganttFullHeight,o=r.headerHeight,s=r.rtl,l=r.onScroll,c=e.useRef(null);return e.useEffect((function(){c.current&&(c.current.scrollTop=n)}),[n]),t.createElement("div",{style:{height:a,marginTop:o,marginLeft:s?"":"-1rem"},className:O,onScroll:l,ref:c},t.createElement("div",{style:{height:i,width:1}}))},P=function(r){var n=r.headerHeight,a=r.fontFamily,i=r.fontSize,o=r.rowWidth,s=r.rowHeight,l=r.scrollY,c=r.tasks,u=r.selectedTask,d=r.setSelectedTask,h=r.onExpanderClick,g=r.locale,f=r.ganttHeight,m=r.taskListRef,v=r.horizontalContainerClass,y=r.TaskListHeader,x=r.TaskListTable,p=e.useRef(null);e.useEffect((function(){p.current&&(p.current.scrollTop=l)}),[l]);var k={headerHeight:n,fontFamily:a,fontSize:i,rowWidth:o},E={rowHeight:s,rowWidth:o,fontFamily:a,fontSize:i,tasks:c,locale:g,selectedTaskId:u?u.id:"",setSelectedTask:d,onExpanderClick:h};return t.createElement("div",{ref:m},t.createElement(y,Object.assign({},k)),t.createElement("div",{ref:p,className:v,style:f?{height:f}:{}},t.createElement(x,Object.assign({},E))))},Y="_2dZTy",z="_3rUKi",I="_RuwuK",X=function(e){for(var r,n=e.tasks,i=e.dates,o=e.rowHeight,s=e.svgWidth,c=e.columnWidth,u=e.todayColor,d=e.rtl,h=0,g=[],f=[t.createElement("line",{key:"RowLineFirst",x:"0",y1:0,x2:s,y2:0,className:z})],m=a(n);!(r=m()).done;){var v=r.value;g.push(t.createElement("rect",{key:"Row"+v.id,x:"0",y:h,width:s,height:o,className:Y})),f.push(t.createElement("line",{key:"RowLine"+v.id,x:"0",y1:h+o,x2:s,y2:h+o,className:z})),h+=o}for(var y=new Date,x=0,p=[],k=t.createElement("rect",null),E=0;E<i.length;E++){var b=i[E];p.push(t.createElement("line",{key:b.getTime(),x1:x,y1:0,x2:x,y2:h,className:I})),(E+1!==i.length&&b.getTime()<y.getTime()&&i[E+1].getTime()>=y.getTime()||0!==E&&E+1===i.length&&b.getTime()<y.getTime()&&l(b,b.getTime()-i[E-1].getTime(),"millisecond").getTime()>=y.getTime())&&(k=t.createElement("rect",{x:x,y:0,width:c,height:h,fill:u})),d&&E+1!==i.length&&b.getTime()>=y.getTime()&&i[E+1].getTime()<y.getTime()&&(k=t.createElement("rect",{x:x+c,y:0,width:c,height:h,fill:u})),x+=c}return t.createElement("g",{className:"gridBody"},t.createElement("g",{className:"rows"},g),t.createElement("g",{className:"rowLines"},f),t.createElement("g",{className:"ticks"},p),t.createElement("g",{className:"today"},k))},A=function(e){return t.createElement("g",{className:"grid"},t.createElement(X,Object.assign({},e)))},B="_9w8d5",K="_1rLuZ",Q="_2q1Kt",U="_35nLX",V=function(e){var r=e.value,n=e.x1Line,a=e.y1Line,i=e.y2Line,o=e.xText,s=e.yText;return t.createElement("g",{className:"calendarTop"},t.createElement("line",{x1:n,y1:a,x2:n,y2:i,className:K,key:r+"line"}),t.createElement("text",{key:r+"text",y:s,x:o,className:Q},r))},G=function(e){var r=e.dateSetup,n=e.locale,a=e.viewMode,o=e.rtl,l=e.headerHeight,c=e.columnWidth,u=e.fontFamily,d=e.fontSize,f=[],v=[];switch(r.viewMode){case i.Year:var y=function(){for(var e=[],n=[],a=.5*l,i=0;i<r.dates.length;i++){var s=r.dates[i],u=s.getFullYear();if(n.push(t.createElement("text",{key:s.getFullYear(),y:.8*l,x:c*i+.5*c,className:B},u)),0===i||s.getFullYear()!==r.dates[i-1].getFullYear()){var d=s.getFullYear().toString(),h=void 0;h=o?(6+i+s.getFullYear()+1)*c:(6+i-s.getFullYear())*c,e.push(t.createElement(V,{key:d,value:d,x1Line:c*i,y1Line:0,y2Line:l,xText:h,yText:.9*a}))}}return[e,n]}();f=y[0],v=y[1];break;case i.Month:var x=function(){for(var e=[],a=[],i=.5*l,s=0;s<r.dates.length;s++){var u=r.dates[s],d=h(u,n);if(a.push(t.createElement("text",{key:d+u.getFullYear(),y:.8*l,x:c*s+.5*c,className:B},d)),0===s||u.getFullYear()!==r.dates[s-1].getFullYear()){var g=u.getFullYear().toString(),f=void 0;f=o?(6+s+u.getMonth()+1)*c:(6+s-u.getMonth())*c,e.push(t.createElement(V,{key:g,value:g,x1Line:c*s,y1Line:0,y2Line:i,xText:f,yText:.9*i}))}}return[e,a]}();f=x[0],v=x[1];break;case i.Week:var p=function(){for(var e=[],a=[],i=1,s=.5*l,u=r.dates,d=u.length-1;d>=0;d--){var g=u[d],f="";0!==d&&g.getMonth()===u[d-1].getMonth()||(f=h(g,n)+", "+g.getFullYear());var v="W"+m(g);a.push(t.createElement("text",{key:g.getTime(),y:.8*l,x:c*(d+ +o),className:B},v)),f&&(d!==u.length-1&&e.push(t.createElement(V,{key:f,value:f,x1Line:c*d+i*c,y1Line:0,y2Line:s,xText:c*d+c*i*.5,yText:.9*s})),i=0),i++}return[e,a]}();f=p[0],v=p[1];break;case i.Day:var k=function(){for(var e,a,i=[],o=[],s=.5*l,u=r.dates,d=0;d<u.length;d++){var f=u[d],m=g(f,n,"short")+", "+f.getDate().toString();if(o.push(t.createElement("text",{key:f.getTime(),y:.8*l,x:c*d+.5*c,className:B},m)),d+1!==u.length&&f.getMonth()!==u[d+1].getMonth()){var v=h(f,n);i.push(t.createElement(V,{key:v+f.getFullYear(),value:v,x1Line:c*(d+1),y1Line:0,y2Line:s,xText:c*(d+1)-.5*(e=f.getMonth(),a=f.getFullYear(),new Date(a,e+1,0).getDate()*c),yText:.9*s}))}}return[i,o]}();f=k[0],v=k[1];break;case i.QuarterDay:case i.HalfDay:var E=function(){for(var e=[],d=[],f=a===i.HalfDay?2:4,m=.5*l,v=r.dates,y=0;y<v.length;y++){var x=v[y],p=s(n,{hour:"numeric"}).format(x);if(d.push(t.createElement("text",{key:x.getTime(),y:.8*l,x:c*(y+ +o),className:B,fontFamily:u},p)),0===y||x.getDate()!==v[y-1].getDate()){var k=g(x,n,"short")+", "+x.getDate()+" "+h(x,n);e.push(t.createElement(V,{key:k+x.getFullYear(),value:k,x1Line:c*y+f*c,y1Line:0,y2Line:m,xText:c*y+f*c*.5,yText:.9*m}))}}return[e,d]}();f=E[0],v=E[1];break;case i.Hour:var b=function(){for(var e=[],a=[],i=.5*l,d=r.dates,f=0;f<d.length;f++){var m=d[f],v=s(n,{hour:"numeric"}).format(m);if(a.push(t.createElement("text",{key:m.getTime(),y:.8*l,x:c*(f+ +o),className:B,fontFamily:u},v)),0!==f&&m.getDate()!==d[f-1].getDate()){var y=d[f-1],x=g(y,n,"long")+", "+y.getDate()+" "+h(y,n),p=(m.getHours()-24)/2;e.push(t.createElement(V,{key:x+y.getFullYear(),value:x,x1Line:c*f,y1Line:0,y2Line:i,xText:c*(f+p),yText:.9*i}))}}return[e,a]}();f=b[0],v=b[1]}return t.createElement("g",{className:"calendar",fontSize:d,fontFamily:u},t.createElement("rect",{x:0,y:0,width:c*r.dates.length,height:l,className:U}),v," ",f)};function Z(e,t){try{var r=e()}catch(n){return t(n)}return r&&r.then?r.then(void 0,t):r}"undefined"==typeof Symbol||(Symbol.iterator||(Symbol.iterator=Symbol("Symbol.iterator"))),"undefined"==typeof Symbol||(Symbol.asyncIterator||(Symbol.asyncIterator=Symbol("Symbol.asyncIterator")));var J=function(e){var r,n,a=e.taskFrom,i=e.taskTo,o=e.rowHeight,s=e.taskHeight,l=e.arrowIndent;if(e.rtl){var c=$(a,i,o,s,l);r=c[0],n=c[1]}else{var u=q(a,i,o,s,l);r=u[0],n=u[1]}return t.createElement("g",{className:"arrow"},t.createElement("path",{strokeWidth:"1.5",d:r,fill:"none"}),t.createElement("polygon",{points:n}))},q=function(e,t,r,n,a){var i=e.index>t.index?-1:1,o=t.y+n/2,s=e.x2+2*a,l=s<t.x1?"":"H "+(t.x1-a),c=s>t.x1?a:t.x1-e.x2-a;return["M "+e.x2+" "+(e.y+n/2)+" \n  h "+a+" \n  v "+i*r/2+" \n  "+l+"\n  V "+o+" \n  h "+c,t.x1+","+o+" \n  "+(t.x1-5)+","+(o-5)+" \n  "+(t.x1-5)+","+(o+5)]},$=function(e,t,r,n,a){var i=e.index>t.index?-1:1,o=t.y+n/2,s=e.x1-2*a,l=s>t.x2?"":"H "+(t.x2+a),c=s<t.x2?-a:t.x2-e.x1+a;return["M "+e.x1+" "+(e.y+n/2)+" \n  h "+-a+" \n  v "+i*r/2+" \n  "+l+"\n  V "+o+" \n  h "+c,t.x2+","+o+" \n  "+(t.x2+5)+","+(o+5)+" \n  "+(t.x2+5)+","+(o-5)]},ee=function(e,t,r,n,a,i,o,s,l,c,u,d,h,g,f,m,v,y,x){var p;switch(e.type){case"milestone":p=re(e,t,r,n,a,i,o,s,y,x);break;case"project":p=te(e,t,r,n,a,i,o,s,l,g,f,m,v);break;default:p=te(e,t,r,n,a,i,o,s,l,c,u,d,h)}return p},te=function(e,t,n,a,i,o,s,l,c,u,d,h,g){var f,m;c?(m=ae(e.start,n,a),f=ae(e.end,n,a)):(f=ne(e.start,n,a),m=ne(e.end,n,a));var v=e.type;"task"===v&&m-f<2*l&&(v="smalltask",m=f+2*l);var y=oe(f,m,e.progress,c),x=y[0],p=y[1],k=ie(t,i,o),E="project"===e.type?e.hideChildren:void 0,b=r({backgroundColor:h,backgroundSelectedColor:g,progressColor:u,progressSelectedColor:d},e.styles);return r({},e,{typeInternal:v,x1:f,x2:m,y:k,index:t,progressX:p,progressWidth:x,barCornerRadius:s,handleWidth:l,hideChildren:E,height:o,barChildren:[],styles:b})},re=function(e,t,n,a,i,o,s,l,c,u){var d=ne(e.start,n,a),h=ie(t,i,o),g=d-.5*o,f=d+.5*o,m=o/1.414,v=r({backgroundColor:c,backgroundSelectedColor:u,progressColor:"",progressSelectedColor:""},e.styles);return r({},e,{end:e.start,x1:g,x2:f,y:h,index:t,progressX:0,progressWidth:0,barCornerRadius:s,handleWidth:l,typeInternal:e.type,progress:0,height:m,hideChildren:void 0,barChildren:[],styles:v})},ne=function(e,t,r){var n=t.findIndex((function(t){return t.getTime()>=e.getTime()}))-1;return n*r+(e.getTime()-t[n].getTime())/(t[n+1].getTime()-t[n].getTime())*r},ae=function(e,t,r){var n=ne(e,t,r);return n+=r},ie=function(e,t,r){return e*t+(t-r)/2},oe=function(e,t,r,n){var a=(t-e)*r*.01;return[a,n?t-a:e]},se=function(e,t,r){return[e-5,t+r,e+5,t+r,e,t+r-8.66].join(",")},le=function(e,t,r){var n=Math.round((e-r.x1)/t)*t,a=r.x1+n;return[a,a+r.x2-r.x1]},ce=function(e,t,r,n,a){var i=new Date((e-t)/n*a+r.getTime());return i=new Date(i.getTime()+6e4*(i.getTimezoneOffset()-r.getTimezoneOffset()))},ue=function(e,t,r,n,a,i,o){var s;if("milestone"===r.type)s=he(e,t,r,n,a,i);else s=de(e,t,r,n,a,i,o);return s},de=function(e,t,n,a,i,o,s){var l=r({},n),c=!1;switch(t){case"progress":if(l.progress=s?function(e,t){if(e>=t.x2)return 0;if(e<=t.x1)return 100;var r=t.x2-t.x1;return Math.round(100*(t.x2-e)/r)}(e,n):function(e,t){if(e>=t.x2)return 100;if(e<=t.x1)return 0;var r=t.x2-t.x1;return Math.round(100*(e-t.x1)/r)}(e,n),c=l.progress!==n.progress){var u=oe(l.x1,l.x2,l.progress,s),d=u[0],h=u[1];l.progressWidth=d,l.progressX=h}break;case"start":var g=function(e,t,r){e>=r.x2-2*r.handleWidth&&(e=r.x2-2*r.handleWidth);var n=Math.round((e-r.x1)/t)*t;return r.x1+n}(e,a,n);if(l.x1=g,c=l.x1!==n.x1){s?l.end=ce(g,n.x1,n.end,a,i):l.start=ce(g,n.x1,n.start,a,i);var f=oe(l.x1,l.x2,l.progress,s),m=f[0],v=f[1];l.progressWidth=m,l.progressX=v}break;case"end":var y=function(e,t,r){e<=r.x1+2*r.handleWidth&&(e=r.x1+2*r.handleWidth);var n=Math.round((e-r.x2)/t)*t;return r.x2+n}(e,a,n);if(l.x2=y,c=l.x2!==n.x2){s?l.start=ce(y,n.x2,n.start,a,i):l.end=ce(y,n.x2,n.end,a,i);var x=oe(l.x1,l.x2,l.progress,s),p=x[0],k=x[1];l.progressWidth=p,l.progressX=k}break;case"move":var E=le(e-o,a,n),b=E[0],w=E[1];if(c=b!==n.x1){l.start=ce(b,n.x1,n.start,a,i),l.end=ce(w,n.x2,n.end,a,i),l.x1=b,l.x2=w;var T=oe(l.x1,l.x2,l.progress,s),S=T[0],C=T[1];l.progressWidth=S,l.progressX=C}}return{isChanged:c,changedTask:l}},he=function(e,t,n,a,i,o){var s=r({},n),l=!1;if("move"===t){var c=le(e-o,a,n),u=c[0],d=c[1];(l=u!==n.x1)&&(s.start=ce(u,n.x1,n.start,a,i),s.end=s.start,s.x1=u,s.x2=d)}return{isChanged:l,changedTask:s}};function ge(e){var t=e.filter((function(e){return e.hideChildren&&"project"===e.type}));if(t.length>0)for(var r=function(r){var n=t[r],a=fe(e,n);e=e.filter((function(e){return-1===a.indexOf(e)}))},n=0;t.length>n;n++)r(n);return e}function fe(e,t){var r=[];r="project"!==t.type?e.filter((function(e){return e.dependencies&&-1!==e.dependencies.indexOf(t.id)})):e.filter((function(e){return e.project&&e.project===t.id}));var n=[];return r.forEach((function(t){n.push.apply(n,fe(e,t))})),r=r.concat(r,n)}var me=function(e,t){var r=e.displayOrder||Number.MAX_VALUE,n=t.displayOrder||Number.MAX_VALUE;return r>n?1:r<n?-1:0},ve="_KxSXS",ye="_3w_5u",xe="_31ERP",pe=function(e){var r=e.x,n=e.y,a=e.width,i=e.height,o=e.isSelected,s=e.progressX,l=e.progressWidth,c=e.barCornerRadius,u=e.styles,d=e.onMouseDown;return t.createElement("g",{onMouseDown:d},t.createElement("rect",{x:r,width:a,y:n,height:i,ry:c,rx:c,fill:o?u.backgroundSelectedColor:u.backgroundColor,className:xe}),t.createElement("rect",{x:s,width:l,y:n,height:i,ry:c,rx:c,fill:o?u.progressSelectedColor:u.progressColor}))},ke=function(e){var r=e.x,n=e.y,a=e.width,i=e.height,o=e.barCornerRadius,s=e.onMouseDown;return t.createElement("rect",{x:r,y:n,width:a,height:i,className:ye,ry:o,rx:o,onMouseDown:s})},Ee=function(e){var r=e.progressPoint,n=e.onMouseDown;return t.createElement("polygon",{className:ye,points:r,onMouseDown:n})},be=function(e){var r=e.task,n=e.isProgressChangeable,a=e.isDateChangeable,i=e.rtl,o=e.onEventStart,s=e.isSelected,l=se(+!i*r.progressWidth+r.progressX,r.y,r.height),c=r.height-2;return t.createElement("g",{className:ve,tabIndex:0},t.createElement(pe,{x:r.x1,y:r.y,width:r.x2-r.x1,height:r.height,progressX:r.progressX,progressWidth:r.progressWidth,barCornerRadius:r.barCornerRadius,styles:r.styles,isSelected:s,onMouseDown:function(e){a&&o("move",r,e)}}),t.createElement("g",{className:"handleGroup"},a&&t.createElement("g",null,t.createElement(ke,{x:r.x1+1,y:r.y+1,width:r.handleWidth,height:c,barCornerRadius:r.barCornerRadius,onMouseDown:function(e){o("start",r,e)}}),t.createElement(ke,{x:r.x2-r.handleWidth-1,y:r.y+1,width:r.handleWidth,height:c,barCornerRadius:r.barCornerRadius,onMouseDown:function(e){o("end",r,e)}})),n&&t.createElement(Ee,{progressPoint:l,onMouseDown:function(e){o("progress",r,e)}})))},we=function(e){var r=e.task,n=e.isProgressChangeable,a=e.isDateChangeable,i=e.onEventStart,o=e.isSelected,s=se(r.progressWidth+r.x1,r.y,r.height);return t.createElement("g",{className:ve,tabIndex:0},t.createElement(pe,{x:r.x1,y:r.y,width:r.x2-r.x1,height:r.height,progressX:r.progressX,progressWidth:r.progressWidth,barCornerRadius:r.barCornerRadius,styles:r.styles,isSelected:o,onMouseDown:function(e){a&&i("move",r,e)}}),t.createElement("g",{className:"handleGroup"},n&&t.createElement(Ee,{progressPoint:s,onMouseDown:function(e){i("progress",r,e)}})))},Te="_RRr13",Se="_2P2B1",Ce=function(e){var r=e.task,n=e.isDateChangeable,a=e.onEventStart,i=e.isSelected,o="rotate(45 "+(r.x1+.356*r.height)+" \n    "+(r.y+.85*r.height)+")";return t.createElement("g",{tabIndex:0,className:Te},t.createElement("rect",{fill:i?r.styles.backgroundSelectedColor:r.styles.backgroundColor,x:r.x1,width:r.height,y:r.y,height:r.height,rx:r.barCornerRadius,ry:r.barCornerRadius,transform:o,className:Se,onMouseDown:function(e){n&&a("move",r,e)}}))},De="_1KJ6x",We="_2RbVy",Ne="_2pZMF",He=function(e){var r=e.task,n=e.isSelected,a=n?r.styles.backgroundSelectedColor:r.styles.backgroundColor,i=n?r.styles.progressSelectedColor:r.styles.progressColor,o=r.x2-r.x1,s=[r.x1,r.y+r.height/2-1,r.x1,r.y+r.height,r.x1+15,r.y+r.height/2-1].join(","),l=[r.x2,r.y+r.height/2-1,r.x2,r.y+r.height,r.x2-15,r.y+r.height/2-1].join(",");return t.createElement("g",{tabIndex:0,className:De},t.createElement("rect",{fill:a,x:r.x1,width:o,y:r.y,height:r.height,rx:r.barCornerRadius,ry:r.barCornerRadius,className:We}),t.createElement("rect",{x:r.progressX,width:r.progressWidth,y:r.y,height:r.height,ry:r.barCornerRadius,rx:r.barCornerRadius,fill:i}),t.createElement("rect",{fill:a,x:r.x1,width:o,y:r.y,height:r.height/2,rx:r.barCornerRadius,ry:r.barCornerRadius,className:Ne}),t.createElement("polygon",{className:Ne,points:s,fill:a}),t.createElement("polygon",{className:Ne,points:l,fill:a}))},Me="_3zRJQ",Fe="_3KcaM",Le=function(n){var a=r({},n),i=a.task,o=a.arrowIndent,s=a.isDelete,l=a.taskHeight,c=a.isSelected,u=a.rtl,d=a.onEventStart,h=e.useRef(null),g=e.useState(t.createElement("div",null)),f=g[0],m=g[1],v=e.useState(!0),y=v[0],x=v[1];e.useEffect((function(){switch(i.typeInternal){case"milestone":m(t.createElement(Ce,Object.assign({},n)));break;case"project":m(t.createElement(He,Object.assign({},n)));break;case"smalltask":m(t.createElement(we,Object.assign({},n)));break;default:m(t.createElement(be,Object.assign({},n)))}}),[i,c]),e.useEffect((function(){h.current&&x(h.current.getBBox().width<i.x2-i.x1)}),[h,i]);var p,k;return t.createElement("g",{onKeyDown:function(e){if("Delete"===e.key)s&&d("delete",i,e);e.stopPropagation()},onMouseEnter:function(e){d("mouseenter",i,e)},onMouseLeave:function(e){d("mouseleave",i,e)},onDoubleClick:function(e){d("dblclick",i,e)},onClick:function(e){d("click",i,e)},onFocus:function(){d("select",i)}},f,t.createElement("text",{x:(p=i.x2-i.x1,k=i.barChildren.length>0,y?i.x1+.5*p:u&&h.current?i.x1-h.current.getBBox().width-o*+k-.2*o:i.x1+p+o*+k+.2*o),y:i.y+.5*l,className:y?Me:Fe,ref:h},i.name))},Re=function(r){var n,a=r.tasks,i=r.dates,o=r.ganttEvent,s=r.selectedTask,l=r.rowHeight,c=r.columnWidth,u=r.timeStep,d=r.svg,h=r.taskHeight,g=r.arrowColor,f=r.arrowIndent,m=r.fontFamily,v=r.fontSize,y=r.rtl,x=r.setGanttEvent,p=r.setFailedTask,k=r.setSelectedTask,E=r.onDateChange,b=r.onProgressChange,w=r.onDoubleClick,T=r.onClick,S=r.onDelete,C=null==d||null===(n=d.current)||void 0===n?void 0:n.createSVGPoint(),D=e.useState(0),W=D[0],N=D[1],H=e.useState(0),M=H[0],F=H[1],L=e.useState(!1),R=L[0],_=L[1];e.useEffect((function(){var e=i[1].getTime()-i[0].getTime()-60*i[1].getTimezoneOffset()*1e3+60*i[0].getTimezoneOffset()*1e3;N(u*c/e)}),[c,i,u]),e.useEffect((function(){var e=function(e){try{var t;if(!o.changedTask||!C||null==d||!d.current)return Promise.resolve();e.preventDefault(),C.x=e.clientX;var r=C.matrixTransform(null==d||null===(t=d.current.getScreenCTM())||void 0===t?void 0:t.inverse()),n=ue(r.x,o.action,o.changedTask,W,u,M,y),a=n.isChanged,i=n.changedTask;return a&&x({action:o.action,changedTask:i}),Promise.resolve()}catch(s){return Promise.reject(s)}};R||"move"!==o.action&&"end"!==o.action&&"start"!==o.action&&"progress"!==o.action||null==d||!d.current||(d.current.addEventListener("mousemove",e),d.current.addEventListener("mouseup",(function t(r){try{var n,a=function(){f||p(s)},i=o.action,s=o.originalSelectedTask,l=o.changedTask;if(!(l&&C&&null!=d&&d.current&&s))return Promise.resolve();r.preventDefault(),C.x=r.clientX;var c=C.matrixTransform(null==d||null===(n=d.current.getScreenCTM())||void 0===n?void 0:n.inverse()),h=ue(c.x,i,l,W,u,M,y).changedTask,g=s.start!==h.start||s.end!==h.end||s.progress!==h.progress;d.current.removeEventListener("mousemove",e),d.current.removeEventListener("mouseup",t),x({action:""}),_(!1);var f=!0,m=function(){if(("move"===i||"end"===i||"start"===i)&&E&&g){var e=Z((function(){return Promise.resolve(E(h,h.barChildren)).then((function(e){void 0!==e&&(f=e)}))}),(function(){f=!1}));if(e&&e.then)return e.then((function(){}))}else{var t=function(){if(b&&g){var e=Z((function(){return Promise.resolve(b(h,h.barChildren)).then((function(e){void 0!==e&&(f=e)}))}),(function(){f=!1}));if(e&&e.then)return e.then((function(){}))}}();if(t&&t.then)return t.then((function(){}))}}();return Promise.resolve(m&&m.then?m.then(a):a())}catch(v){return Promise.reject(v)}})),_(!0))}),[o,W,M,b,u,E,d,R,C,y,p,x]);var O=function(e,t,r){try{return Promise.resolve(function(){if(r)return function(){if(function(e){return void 0!==e.key}(r)){var n=function(){if("delete"===e){var r=function(){if(S){var r=Z((function(){return Promise.resolve(S(t)).then((function(r){void 0!==r&&r&&x({action:e,changedTask:t})}))}),(function(e){}));if(r&&r.then)return r.then((function(){}))}}();if(r&&r.then)return r.then((function(){}))}}();if(n&&n.then)return n.then((function(){}))}else if("mouseenter"===e)o.action||x({action:e,changedTask:t,originalSelectedTask:t});else if("mouseleave"===e)"mouseenter"===o.action&&x({action:""});else if("dblclick"===e)w&&w(t);else if("click"===e)T&&T(t);else if("move"===e){var a;if(null==d||!d.current||!C)return;C.x=r.clientX;var i=C.matrixTransform(null===(a=d.current.getScreenCTM())||void 0===a?void 0:a.inverse());F(i.x-t.x1),x({action:e,changedTask:t,originalSelectedTask:t})}else x({action:e,changedTask:t,originalSelectedTask:t})}();"select"===e&&k(t.id)}())}catch(n){return Promise.reject(n)}};return t.createElement("g",{className:"content"},t.createElement("g",{className:"arrows",fill:g,stroke:g},a.map((function(e){return e.barChildren.map((function(r){return t.createElement(J,{key:"Arrow from "+e.id+" to "+a[r.index].id,taskFrom:e,taskTo:a[r.index],rowHeight:l,taskHeight:h,arrowIndent:f,rtl:y})}))}))),t.createElement("g",{className:"bar",fontFamily:m,fontSize:v},a.map((function(e){return t.createElement(Le,{task:e,arrowIndent:f,taskHeight:h,isProgressChangeable:!!b&&!e.isDisabled,isDateChangeable:!!E&&!e.isDisabled,isDelete:!e.isDisabled,onEventStart:O,key:e.id,isSelected:!!s&&e.id===s.id,rtl:y})}))))},_e="_CZjuD",Oe="_2B2zv",je="_3eULf",Pe=function(n){var a=n.gridProps,i=n.calendarProps,o=n.barProps,s=n.ganttHeight,l=n.scrollY,c=n.scrollX,u=e.useRef(null),d=e.useRef(null),h=e.useRef(null),g=r({},o,{svg:u});return e.useEffect((function(){d.current&&(d.current.scrollTop=l)}),[l]),e.useEffect((function(){h.current&&(h.current.scrollLeft=c)}),[c]),t.createElement("div",{className:_e,ref:h,dir:"ltr"},t.createElement("svg",{xmlns:"http://www.w3.org/2000/svg",width:a.svgWidth,height:i.headerHeight,fontFamily:o.fontFamily},t.createElement(G,Object.assign({},i))),t.createElement("div",{ref:d,className:Oe,style:s?{height:s,width:a.svgWidth}:{width:a.svgWidth}},t.createElement("svg",{xmlns:"http://www.w3.org/2000/svg",width:a.svgWidth,height:o.rowHeight*o.tasks.length,fontFamily:o.fontFamily,ref:u},t.createElement(A,Object.assign({},a)),t.createElement(Re,Object.assign({},g)))))},Ye="_2k9Ys",ze="_19jgW",Ie=function(r){var n=r.scroll,a=r.svgWidth,i=r.taskListWidth,o=r.rtl,s=r.onScroll,l=e.useRef(null);return e.useEffect((function(){l.current&&(l.current.scrollLeft=n)}),[n]),t.createElement("div",{dir:"ltr",style:{margin:o?"0px "+i+"px 0px 0px":"0px 0px 0px "+i+"px"},className:Ye,onScroll:s,ref:l},t.createElement("div",{style:{width:a},className:ze}))},Xe=function(n){var a=n.tasks,o=n.headerHeight,s=void 0===o?50:o,l=n.columnWidth,c=void 0===l?60:l,h=n.listCellWidth,g=void 0===h?"155px":h,f=n.rowHeight,m=void 0===f?50:f,v=n.ganttHeight,y=void 0===v?0:v,x=n.viewMode,p=void 0===x?i.Day:x,E=n.preStepsCount,b=void 0===E?1:E,w=n.locale,T=void 0===w?"en-GB":w,S=n.barFill,C=void 0===S?60:S,D=n.barCornerRadius,W=void 0===D?3:D,H=n.barProgressColor,M=void 0===H?"#a3a3ff":H,F=n.barProgressSelectedColor,L=void 0===F?"#8282f5":F,O=n.barBackgroundColor,Y=void 0===O?"#b8c2cc":O,z=n.barBackgroundSelectedColor,I=void 0===z?"#aeb8c2":z,X=n.projectProgressColor,A=void 0===X?"#7db59a":X,B=n.projectProgressSelectedColor,K=void 0===B?"#59a985":B,Q=n.projectBackgroundColor,U=void 0===Q?"#fac465":Q,V=n.projectBackgroundSelectedColor,G=void 0===V?"#f7bb53":V,Z=n.milestoneBackgroundColor,J=void 0===Z?"#f1c453":Z,q=n.milestoneBackgroundSelectedColor,$=void 0===q?"#f29e4c":q,te=n.rtl,re=void 0!==te&&te,ne=n.handleWidth,ae=void 0===ne?8:ne,ie=n.timeStep,oe=void 0===ie?3e5:ie,se=n.arrowColor,le=void 0===se?"grey":se,ce=n.fontFamily,ue=void 0===ce?"Arial, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue":ce,de=n.fontSize,he=void 0===de?"14px":de,fe=n.arrowIndent,ve=void 0===fe?20:fe,ye=n.todayColor,xe=void 0===ye?"rgba(252, 248, 227, 0.5)":ye,pe=n.viewDate,ke=n.TooltipContent,Ee=void 0===ke?_:ke,be=n.TaskListHeader,we=void 0===be?k:be,Te=n.TaskListTable,Se=void 0===Te?N:Te,Ce=n.onDateChange,De=n.onProgressChange,We=n.onDoubleClick,Ne=n.onClick,He=n.onDelete,Me=n.onSelect,Fe=n.onExpanderClick,Le=e.useRef(null),Re=e.useRef(null),_e=e.useState((function(){var e=u(a,p,b),t=e[0],r=e[1];return{viewMode:p,dates:d(t,r,p)}})),Ye=_e[0],ze=_e[1],Xe=e.useState(void 0),Ae=Xe[0],Be=Xe[1],Ke=e.useState(0),Qe=Ke[0],Ue=Ke[1],Ve=e.useState(0),Ge=Ve[0],Ze=Ve[1],Je=e.useState(y),qe=Je[0],$e=Je[1],et=e.useState([]),tt=et[0],rt=et[1],nt=e.useState({action:""}),at=nt[0],it=nt[1],ot=e.useMemo((function(){return m*C/100}),[m,C]),st=e.useState(),lt=st[0],ct=st[1],ut=e.useState(null),dt=ut[0],ht=ut[1],gt=Ye.dates.length*c,ft=tt.length*m,mt=e.useState(0),vt=mt[0],yt=mt[1],xt=e.useState(-1),pt=xt[0],kt=xt[1],Et=e.useState(!1),bt=Et[0],wt=Et[1];e.useEffect((function(){var e;e=(e=Fe?ge(a):a).sort(me);var t=u(e,p,b),r=t[0],n=t[1],i=d(r,n,p);re&&(i=i.reverse(),-1===pt&&kt(i.length*c)),ze({dates:i,viewMode:p}),rt(function(e,t,r,n,a,i,o,s,l,c,u,d,h,g,f,m,v,y){var x=e.map((function(e,x){return ee(e,x,t,r,n,a,i,o,s,l,c,u,d,h,g,f,m,v,y)}));return x=x.map((function(e){for(var t=e.dependencies||[],r=function(r){var n=x.findIndex((function(e){return e.id===t[r]}));-1!==n&&x[n].barChildren.push(e)},n=0;n<t.length;n++)r(n);return e}))}(e,i,c,m,ot,W,ae,re,M,L,Y,I,A,K,U,G,J,$))}),[a,p,b,m,W,c,ot,ae,M,L,Y,I,A,K,U,G,J,$,re,pt,Fe]),e.useEffect((function(){if(p===Ye.viewMode&&(pe&&!Ae||pe&&(null==Ae?void 0:Ae.valueOf())!==pe.valueOf())){var e=Ye.dates,t=e.findIndex((function(t,r){return pe.valueOf()>=t.valueOf()&&r+1!==e.length&&pe.valueOf()<e[r+1].valueOf()}));if(-1===t)return;Be(pe),kt(c*t)}}),[pe,c,Ye.dates,Ye.viewMode,p,Ae,Be]),e.useEffect((function(){var e=at.changedTask,t=at.action;if(e)if("delete"===t)it({action:""}),rt(tt.filter((function(t){return t.id!==e.id})));else if("move"===t||"end"===t||"start"===t||"progress"===t){var r=tt.find((function(t){return t.id===e.id}));if(r&&(r.start.getTime()!==e.start.getTime()||r.end.getTime()!==e.end.getTime()||r.progress!==e.progress)){var n=tt.map((function(t){return t.id===e.id?e:t}));rt(n)}}}),[at,tt]),e.useEffect((function(){dt&&(rt(tt.map((function(e){return e.id!==dt.id?e:dt}))),ht(null))}),[dt,tt]),e.useEffect((function(){g||Ue(0),Re.current&&Ue(Re.current.offsetWidth)}),[Re,g]),e.useEffect((function(){Le.current&&Ze(Le.current.offsetWidth-Qe)}),[Le,Qe]),e.useEffect((function(){$e(y?y+s:a.length*m+s)}),[y,a,s,m]),e.useEffect((function(){var e,t=function(e){if(e.shiftKey||e.deltaX){var t=e.deltaX?e.deltaX:e.deltaY,r=pt+t;r<0?r=0:r>gt&&(r=gt),kt(r),e.preventDefault()}else if(y){var n=vt+e.deltaY;n<0?n=0:n>ft-y&&(n=ft-y),n!==vt&&(yt(n),e.preventDefault())}wt(!0)};return null===(e=Le.current)||void 0===e||e.addEventListener("wheel",t,{passive:!1}),function(){var e;null===(e=Le.current)||void 0===e||e.removeEventListener("wheel",t)}}),[Le,vt,pt,y,gt,re,ft]);var Tt=function(e){var t=tt.find((function(t){return t.id===e})),r=tt.find((function(e){return!!lt&&e.id===lt.id}));Me&&(r&&Me(r,!1),t&&Me(t,!0)),ct(t)},St={columnWidth:c,svgWidth:gt,tasks:a,rowHeight:m,dates:Ye.dates,todayColor:xe,rtl:re},Ct={dateSetup:Ye,locale:T,viewMode:p,headerHeight:s,columnWidth:c,fontFamily:ue,fontSize:he,rtl:re},Dt={tasks:tt,dates:Ye.dates,ganttEvent:at,selectedTask:lt,rowHeight:m,taskHeight:ot,columnWidth:c,arrowColor:le,timeStep:oe,fontFamily:ue,fontSize:he,arrowIndent:ve,svgWidth:gt,rtl:re,setGanttEvent:it,setFailedTask:ht,setSelectedTask:Tt,onDateChange:Ce,onProgressChange:De,onDoubleClick:We,onClick:Ne,onDelete:He},Wt={rowHeight:m,rowWidth:g,fontFamily:ue,fontSize:he,tasks:tt,locale:T,headerHeight:s,scrollY:vt,ganttHeight:y,horizontalContainerClass:Oe,selectedTask:lt,taskListRef:Re,setSelectedTask:Tt,onExpanderClick:function(e){Fe&&void 0!==e.hideChildren&&Fe(r({},e,{hideChildren:!e.hideChildren}))},TaskListHeader:we,TaskListTable:Se};return t.createElement("div",null,t.createElement("div",{className:je,onKeyDown:function(e){e.preventDefault();var t=vt,r=pt,n=!0;switch(e.key){case"Down":case"ArrowDown":t+=m,n=!1;break;case"Up":case"ArrowUp":t-=m,n=!1;break;case"Left":case"ArrowLeft":r-=c;break;case"Right":case"ArrowRight":r+=c}n?(r<0?r=0:r>gt&&(r=gt),kt(r)):(t<0?t=0:t>ft-y&&(t=ft-y),yt(t)),wt(!0)},tabIndex:0,ref:Le},g&&t.createElement(P,Object.assign({},Wt)),t.createElement(Pe,{gridProps:St,calendarProps:Ct,barProps:Dt,ganttHeight:y,scrollY:vt,scrollX:pt}),at.changedTask&&t.createElement(R,{arrowIndent:ve,rowHeight:m,svgContainerHeight:qe,svgContainerWidth:Ge,fontFamily:ue,fontSize:he,scrollX:pt,scrollY:vt,task:at.changedTask,headerHeight:s,taskListWidth:Qe,TooltipContent:Ee,rtl:re,svgWidth:gt}),t.createElement(j,{ganttFullHeight:ft,ganttHeight:y,headerHeight:s,scroll:vt,onScroll:function(e){vt===e.currentTarget.scrollTop||bt?wt(!1):(yt(e.currentTarget.scrollTop),wt(!0))},rtl:re})),t.createElement(Ie,{svgWidth:gt,taskListWidth:Qe,scroll:pt,rtl:re,onScroll:function(e){pt===e.currentTarget.scrollLeft||bt?wt(!1):(kt(e.currentTarget.scrollLeft),wt(!0))}}))};export{Xe as G,i as V};
