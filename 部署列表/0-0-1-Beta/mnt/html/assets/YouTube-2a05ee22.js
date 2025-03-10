import{aU as e,r as t}from"./index-52537ad8.js";import{u as a,p as r}from"./index-294f19a5.js";function o(e,t){for(var a=0;a<t.length;a++){const r=t[a];if("string"!=typeof r&&!Array.isArray(r))for(const t in r)if("default"!==t&&!(t in e)){const a=Object.getOwnPropertyDescriptor(r,t);a&&Object.defineProperty(e,t,a.get?a:{enumerable:!0,get:()=>r[t]})}}return Object.freeze(Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}))}var s=Object.create,n=Object.defineProperty,l=Object.getOwnPropertyDescriptor,i=Object.getOwnPropertyNames,p=Object.getPrototypeOf,y=Object.prototype.hasOwnProperty,c=(e,t,a,r)=>{if(t&&"object"==typeof t||"function"==typeof t)for(let o of i(t))y.call(e,o)||o===a||n(e,o,{get:()=>t[o],enumerable:!(r=l(t,o))||r.enumerable});return e},u=(e,t,a)=>(((e,t,a)=>{t in e?n(e,t,{enumerable:!0,configurable:!0,writable:!0,value:a}):e[t]=a})(e,"symbol"!=typeof t?t+"":t,a),a),d={};((e,t)=>{for(var a in t)n(e,a,{get:t[a],enumerable:!0})})(d,{default:()=>v});var h,f=(h=d,c(n({},"__esModule",{value:!0}),h)),P=((e,t,a)=>(a=null!=e?s(p(e)):{},c(!t&&e&&e.__esModule?a:n(a,"default",{value:e,enumerable:!0}),e)))(t),m=a,g=r;const b=/[?&](?:list|channel)=([a-zA-Z0-9_-]+)/,T=/user\/([a-zA-Z0-9_-]+)\/?/,w=/youtube-nocookie\.com/;class v extends P.Component{constructor(){super(...arguments),u(this,"callPlayer",m.callPlayer),u(this,"parsePlaylist",(e=>{if(e instanceof Array)return{listType:"playlist",playlist:e.map(this.getID).join(",")};if(b.test(e)){const[,t]=e.match(b);return{listType:"playlist",list:t.replace(/^UC/,"UU")}}if(T.test(e)){const[,t]=e.match(T);return{listType:"user_uploads",list:t}}return{}})),u(this,"onStateChange",(e=>{const{data:t}=e,{onPlay:a,onPause:r,onBuffer:o,onBufferEnd:s,onEnded:n,onReady:l,loop:i,config:{playerVars:p,onUnstarted:y}}=this.props,{UNSTARTED:c,PLAYING:u,PAUSED:d,BUFFERING:h,ENDED:f,CUED:P}=window.YT.PlayerState;if(t===c&&y(),t===u&&(a(),s()),t===d&&r(),t===h&&o(),t===f){const e=!!this.callPlayer("getPlaylist");i&&!e&&(p.start?this.seekTo(p.start):this.play()),n()}t===P&&l()})),u(this,"mute",(()=>{this.callPlayer("mute")})),u(this,"unmute",(()=>{this.callPlayer("unMute")})),u(this,"ref",(e=>{this.container=e}))}componentDidMount(){this.props.onMount&&this.props.onMount(this)}getID(e){return!e||e instanceof Array||b.test(e)?null:e.match(g.MATCH_URL_YOUTUBE)[1]}load(e,t){const{playing:a,muted:r,playsinline:o,controls:s,loop:n,config:l,onError:i}=this.props,{playerVars:p,embedOptions:y}=l,c=this.getID(e);if(t)return b.test(e)||T.test(e)||e instanceof Array?void this.player.loadPlaylist(this.parsePlaylist(e)):void this.player.cueVideoById({videoId:c,startSeconds:(0,m.parseStartTime)(e)||p.start,endSeconds:(0,m.parseEndTime)(e)||p.end});(0,m.getSDK)("https://www.youtube.com/iframe_api","YT","onYouTubeIframeAPIReady",(e=>e.loaded)).then((t=>{this.container&&(this.player=new t.Player(this.container,{width:"100%",height:"100%",videoId:c,playerVars:{autoplay:a?1:0,mute:r?1:0,controls:s?1:0,start:(0,m.parseStartTime)(e),end:(0,m.parseEndTime)(e),origin:window.location.origin,playsinline:o?1:0,...this.parsePlaylist(e),...p},events:{onReady:()=>{n&&this.player.setLoop(!0),this.props.onReady()},onPlaybackRateChange:e=>this.props.onPlaybackRateChange(e.data),onPlaybackQualityChange:e=>this.props.onPlaybackQualityChange(e),onStateChange:this.onStateChange,onError:e=>i(e.data)},host:w.test(e)?"https://www.youtube-nocookie.com":void 0,...y}))}),i),y.events}play(){this.callPlayer("playVideo")}pause(){this.callPlayer("pauseVideo")}stop(){document.body.contains(this.callPlayer("getIframe"))&&this.callPlayer("stopVideo")}seekTo(e,t=!1){this.callPlayer("seekTo",e),t||this.props.playing||this.pause()}setVolume(e){this.callPlayer("setVolume",100*e)}setPlaybackRate(e){this.callPlayer("setPlaybackRate",e)}setLoop(e){this.callPlayer("setLoop",e)}getDuration(){return this.callPlayer("getDuration")}getCurrentTime(){return this.callPlayer("getCurrentTime")}getSecondsLoaded(){return this.callPlayer("getVideoLoadedFraction")*this.getDuration()}render(){const{display:e}=this.props,t={width:"100%",height:"100%",display:e};return P.default.createElement("div",{style:t},P.default.createElement("div",{ref:this.ref}))}}u(v,"displayName","YouTube"),u(v,"canPlay",g.canPlay.youtube);const O=o({__proto__:null,default:e(f)},[f]);export{O as Y};
