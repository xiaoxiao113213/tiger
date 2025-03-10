import{aU as e,r as t}from"./index-52537ad8.js";import{u as s,p as r}from"./index-294f19a5.js";function i(e,t){for(var s=0;s<t.length;s++){const r=t[s];if("string"!=typeof r&&!Array.isArray(r))for(const t in r)if("default"!==t&&!(t in e)){const s=Object.getOwnPropertyDescriptor(r,t);s&&Object.defineProperty(e,t,s.get?s:{enumerable:!0,get:()=>r[t]})}}return Object.freeze(Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}))}var n=Object.create,o=Object.defineProperty,a=Object.getOwnPropertyDescriptor,h=Object.getOwnPropertyNames,l=Object.getPrototypeOf,p=Object.prototype.hasOwnProperty,d=(e,t,s,r)=>{if(t&&"object"==typeof t||"function"==typeof t)for(let i of h(t))p.call(e,i)||i===s||o(e,i,{get:()=>t[i],enumerable:!(r=a(t,i))||r.enumerable});return e},u=(e,t,s)=>(((e,t,s)=>{t in e?o(e,t,{enumerable:!0,configurable:!0,writable:!0,value:s}):e[t]=s})(e,"symbol"!=typeof t?t+"":t,s),s),c={};((e,t)=>{for(var s in t)o(e,s,{get:t[s],enumerable:!0})})(c,{default:()=>w});var y,f=(y=c,d(o({},"__esModule",{value:!0}),y)),m=((e,t,s)=>(s=null!=e?n(l(e)):{},d(!t&&e&&e.__esModule?s:o(s,"default",{value:e,enumerable:!0}),e)))(t),v=s,E=r;const P="undefined"!=typeof navigator,g=P&&"MacIntel"===navigator.platform&&navigator.maxTouchPoints>1,b=P&&(/iPad|iPhone|iPod/.test(navigator.userAgent)||g)&&!window.MSStream,S=P&&/^((?!chrome|android).)*safari/i.test(navigator.userAgent)&&!window.MSStream,L=/www\.dropbox\.com\/.+/,O=/https:\/\/watch\.cloudflarestream\.com\/([a-z0-9]+)/;class w extends m.Component{constructor(){super(...arguments),u(this,"onReady",((...e)=>this.props.onReady(...e))),u(this,"onPlay",((...e)=>this.props.onPlay(...e))),u(this,"onBuffer",((...e)=>this.props.onBuffer(...e))),u(this,"onBufferEnd",((...e)=>this.props.onBufferEnd(...e))),u(this,"onPause",((...e)=>this.props.onPause(...e))),u(this,"onEnded",((...e)=>this.props.onEnded(...e))),u(this,"onError",((...e)=>this.props.onError(...e))),u(this,"onPlayBackRateChange",(e=>this.props.onPlaybackRateChange(e.target.playbackRate))),u(this,"onEnablePIP",((...e)=>this.props.onEnablePIP(...e))),u(this,"onDisablePIP",(e=>{const{onDisablePIP:t,playing:s}=this.props;t(e),s&&this.play()})),u(this,"onPresentationModeChange",(e=>{if(this.player&&(0,v.supportsWebKitPresentationMode)(this.player)){const{webkitPresentationMode:t}=this.player;"picture-in-picture"===t?this.onEnablePIP(e):"inline"===t&&this.onDisablePIP(e)}})),u(this,"onSeek",(e=>{this.props.onSeek(e.target.currentTime)})),u(this,"mute",(()=>{this.player.muted=!0})),u(this,"unmute",(()=>{this.player.muted=!1})),u(this,"renderSourceElement",((e,t)=>"string"==typeof e?m.default.createElement("source",{key:t,src:e}):m.default.createElement("source",{key:t,...e}))),u(this,"renderTrack",((e,t)=>m.default.createElement("track",{key:t,...e}))),u(this,"ref",(e=>{this.player&&(this.prevPlayer=this.player),this.player=e}))}componentDidMount(){this.props.onMount&&this.props.onMount(this),this.addListeners(this.player);const e=this.getSource(this.props.url);e&&(this.player.src=e),(b||this.props.config.forceDisableHls)&&this.player.load()}componentDidUpdate(e){this.shouldUseAudio(this.props)!==this.shouldUseAudio(e)&&(this.removeListeners(this.prevPlayer,e.url),this.addListeners(this.player)),this.props.url===e.url||(0,v.isMediaStream)(this.props.url)||this.props.url instanceof Array||(this.player.srcObject=null)}componentWillUnmount(){this.player.removeAttribute("src"),this.removeListeners(this.player),this.hls&&this.hls.destroy()}addListeners(e){const{url:t,playsinline:s}=this.props;e.addEventListener("play",this.onPlay),e.addEventListener("waiting",this.onBuffer),e.addEventListener("playing",this.onBufferEnd),e.addEventListener("pause",this.onPause),e.addEventListener("seeked",this.onSeek),e.addEventListener("ended",this.onEnded),e.addEventListener("error",this.onError),e.addEventListener("ratechange",this.onPlayBackRateChange),e.addEventListener("enterpictureinpicture",this.onEnablePIP),e.addEventListener("leavepictureinpicture",this.onDisablePIP),e.addEventListener("webkitpresentationmodechanged",this.onPresentationModeChange),this.shouldUseHLS(t)||e.addEventListener("canplay",this.onReady),s&&(e.setAttribute("playsinline",""),e.setAttribute("webkit-playsinline",""),e.setAttribute("x5-playsinline",""))}removeListeners(e,t){e.removeEventListener("canplay",this.onReady),e.removeEventListener("play",this.onPlay),e.removeEventListener("waiting",this.onBuffer),e.removeEventListener("playing",this.onBufferEnd),e.removeEventListener("pause",this.onPause),e.removeEventListener("seeked",this.onSeek),e.removeEventListener("ended",this.onEnded),e.removeEventListener("error",this.onError),e.removeEventListener("ratechange",this.onPlayBackRateChange),e.removeEventListener("enterpictureinpicture",this.onEnablePIP),e.removeEventListener("leavepictureinpicture",this.onDisablePIP),e.removeEventListener("webkitpresentationmodechanged",this.onPresentationModeChange),this.shouldUseHLS(t)||e.removeEventListener("canplay",this.onReady)}shouldUseAudio(e){return!e.config.forceVideo&&(!e.config.attributes.poster&&(E.AUDIO_EXTENSIONS.test(e.url)||e.config.forceAudio))}shouldUseHLS(e){return!!(S&&this.props.config.forceSafariHLS||this.props.config.forceHLS)||!b&&!this.props.config.forceDisableHls&&(E.HLS_EXTENSIONS.test(e)||O.test(e))}shouldUseDASH(e){return E.DASH_EXTENSIONS.test(e)||this.props.config.forceDASH}shouldUseFLV(e){return E.FLV_EXTENSIONS.test(e)||this.props.config.forceFLV}load(e){const{hlsVersion:t,hlsOptions:s,dashVersion:r,flvVersion:i}=this.props.config;if(this.hls&&this.hls.destroy(),this.dash&&this.dash.reset(),this.shouldUseHLS(e)&&(0,v.getSDK)("https://cdn.jsdelivr.net/npm/hls.js@VERSION/dist/hls.min.js".replace("VERSION",t),"Hls").then((t=>{if(this.hls=new t(s),this.hls.on(t.Events.MANIFEST_PARSED,(()=>{this.props.onReady()})),this.hls.on(t.Events.ERROR,((e,s)=>{this.props.onError(e,s,this.hls,t)})),O.test(e)){const t=e.match(O)[1];this.hls.loadSource("https://videodelivery.net/{id}/manifest/video.m3u8".replace("{id}",t))}else this.hls.loadSource(e);this.hls.attachMedia(this.player),this.props.onLoaded()})),this.shouldUseDASH(e)&&(0,v.getSDK)("https://cdnjs.cloudflare.com/ajax/libs/dashjs/VERSION/dash.all.min.js".replace("VERSION",r),"dashjs").then((t=>{this.dash=t.MediaPlayer().create(),this.dash.initialize(this.player,e,this.props.playing),this.dash.on("error",this.props.onError),parseInt(r)<3?this.dash.getDebug().setLogToBrowserConsole(!1):this.dash.updateSettings({debug:{logLevel:t.Debug.LOG_LEVEL_NONE}}),this.props.onLoaded()})),this.shouldUseFLV(e)&&(0,v.getSDK)("https://cdn.jsdelivr.net/npm/flv.js@VERSION/dist/flv.min.js".replace("VERSION",i),"flvjs").then((t=>{this.flv=t.createPlayer({type:"flv",url:e}),this.flv.attachMediaElement(this.player),this.flv.on(t.Events.ERROR,((e,s)=>{this.props.onError(e,s,this.flv,t)})),this.flv.load(),this.props.onLoaded()})),e instanceof Array)this.player.load();else if((0,v.isMediaStream)(e))try{this.player.srcObject=e}catch(n){this.player.src=window.URL.createObjectURL(e)}}play(){const e=this.player.play();e&&e.catch(this.props.onError)}pause(){this.player.pause()}stop(){this.player.removeAttribute("src"),this.dash&&this.dash.reset()}seekTo(e,t=!0){this.player.currentTime=e,t||this.pause()}setVolume(e){this.player.volume=e}enablePIP(){this.player.requestPictureInPicture&&document.pictureInPictureElement!==this.player?this.player.requestPictureInPicture():(0,v.supportsWebKitPresentationMode)(this.player)&&"picture-in-picture"!==this.player.webkitPresentationMode&&this.player.webkitSetPresentationMode("picture-in-picture")}disablePIP(){document.exitPictureInPicture&&document.pictureInPictureElement===this.player?document.exitPictureInPicture():(0,v.supportsWebKitPresentationMode)(this.player)&&"inline"!==this.player.webkitPresentationMode&&this.player.webkitSetPresentationMode("inline")}setPlaybackRate(e){try{this.player.playbackRate=e}catch(t){this.props.onError(t)}}getDuration(){if(!this.player)return null;const{duration:e,seekable:t}=this.player;return e===1/0&&t.length>0?t.end(t.length-1):e}getCurrentTime(){return this.player?this.player.currentTime:null}getSecondsLoaded(){if(!this.player)return null;const{buffered:e}=this.player;if(0===e.length)return 0;const t=e.end(e.length-1),s=this.getDuration();return t>s?s:t}getSource(e){const t=this.shouldUseHLS(e),s=this.shouldUseDASH(e),r=this.shouldUseFLV(e);if(!(e instanceof Array||(0,v.isMediaStream)(e)||t||s||r))return L.test(e)?e.replace("www.dropbox.com","dl.dropboxusercontent.com"):e}render(){const{url:e,playing:t,loop:s,controls:r,muted:i,config:n,width:o,height:a}=this.props,h=this.shouldUseAudio(this.props)?"audio":"video",l={width:"auto"===o?o:"100%",height:"auto"===a?a:"100%"};return m.default.createElement(h,{ref:this.ref,src:this.getSource(e),style:l,preload:"auto",autoPlay:t||void 0,controls:r,muted:i,loop:s,...n.attributes},e instanceof Array&&e.map(this.renderSourceElement),n.tracks.map(this.renderTrack))}}u(w,"displayName","FilePlayer"),u(w,"canPlay",E.canPlay.file);const I=i({__proto__:null,default:e(f)},[f]);export{I as F};
