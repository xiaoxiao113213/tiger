import{aU as e,r as t}from"./index-1fe6dff8.js";import{u as r,p as o}from"./index-d9bad433.js";function s(e,t){for(var r=0;r<t.length;r++){const o=t[r];if("string"!=typeof o&&!Array.isArray(o))for(const t in o)if("default"!==t&&!(t in e)){const r=Object.getOwnPropertyDescriptor(o,t);r&&Object.defineProperty(e,t,r.get?r:{enumerable:!0,get:()=>o[t]})}}return Object.freeze(Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}))}var n=Object.create,a=Object.defineProperty,i=Object.getOwnPropertyDescriptor,l=Object.getOwnPropertyNames,p=Object.getPrototypeOf,u=Object.prototype.hasOwnProperty,c=(e,t,r,o)=>{if(t&&"object"==typeof t||"function"==typeof t)for(let s of l(t))u.call(e,s)||s===r||a(e,s,{get:()=>t[s],enumerable:!(o=i(t,s))||o.enumerable});return e},d=(e,t,r)=>(((e,t,r)=>{t in e?a(e,t,{enumerable:!0,configurable:!0,writable:!0,value:r}):e[t]=r})(e,"symbol"!=typeof t?t+"":t,r),r),h={};((e,t)=>{for(var r in t)a(e,r,{get:t[r],enumerable:!0})})(h,{default:()=>P});var y,f=(y=h,c(a({},"__esModule",{value:!0}),y)),m=((e,t,r)=>(r=null!=e?n(p(e)):{},c(!t&&e&&e.__esModule?r:a(r,"default",{value:e,enumerable:!0}),e)))(t),g=r,b=o;class P extends m.Component{constructor(){super(...arguments),d(this,"callPlayer",g.callPlayer),d(this,"duration",null),d(this,"currentTime",null),d(this,"secondsLoaded",null),d(this,"mute",(()=>{})),d(this,"unmute",(()=>{})),d(this,"ref",(e=>{this.iframe=e}))}componentDidMount(){this.props.onMount&&this.props.onMount(this)}load(e){(0,g.getSDK)("https://widget.mixcloud.com/media/js/widgetApi.js","Mixcloud").then((e=>{this.player=e.PlayerWidget(this.iframe),this.player.ready.then((()=>{this.player.events.play.on(this.props.onPlay),this.player.events.pause.on(this.props.onPause),this.player.events.ended.on(this.props.onEnded),this.player.events.error.on(this.props.error),this.player.events.progress.on(((e,t)=>{this.currentTime=e,this.duration=t})),this.props.onReady()}))}),this.props.onError)}play(){this.callPlayer("play")}pause(){this.callPlayer("pause")}stop(){}seekTo(e,t=!0){this.callPlayer("seek",e),t||this.pause()}setVolume(e){}getDuration(){return this.duration}getCurrentTime(){return this.currentTime}getSecondsLoaded(){return null}render(){const{url:e,config:t}=this.props,r=e.match(b.MATCH_URL_MIXCLOUD)[1],o=(0,g.queryString)({...t.options,feed:`/${r}/`});return m.default.createElement("iframe",{key:r,ref:this.ref,style:{width:"100%",height:"100%"},src:`https://www.mixcloud.com/widget/iframe/?${o}`,frameBorder:"0",allow:"autoplay"})}}d(P,"displayName","Mixcloud"),d(P,"canPlay",b.canPlay.mixcloud),d(P,"loopOnEnded",!0);const O=s({__proto__:null,default:e(f)},[f]);export{O as M};
