import{aU as e,r as t}from"./index-03adb9ee.js";function r(e,t){for(var r=0;r<t.length;r++){const a=t[r];if("string"!=typeof a&&!Array.isArray(a))for(const t in a)if("default"!==t&&!(t in e)){const r=Object.getOwnPropertyDescriptor(a,t);r&&Object.defineProperty(e,t,r.get?r:{enumerable:!0,get:()=>a[t]})}}return Object.freeze(Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}))}var a=Object.create,n=Object.defineProperty,i=Object.getOwnPropertyDescriptor,o=Object.getOwnPropertyNames,l=Object.getPrototypeOf,s=Object.prototype.hasOwnProperty,c=(e,t,r,a)=>{if(t&&"object"==typeof t||"function"==typeof t)for(let l of o(t))s.call(e,l)||l===r||n(e,l,{get:()=>t[l],enumerable:!(a=i(t,l))||a.enumerable});return e},p=(e,t,r)=>(((e,t,r)=>{t in e?n(e,t,{enumerable:!0,configurable:!0,writable:!0,value:r}):e[t]=r})(e,"symbol"!=typeof t?t+"":t,r),r),d={};((e,t)=>{for(var r in t)n(e,r,{get:t[r],enumerable:!0})})(d,{default:()=>b});var u,h=(u=d,c(n({},"__esModule",{value:!0}),u)),m=((e,t,r)=>(r=null!=e?a(l(e)):{},c(!t&&e&&e.__esModule?r:n(r,"default",{value:e,enumerable:!0}),e)))(t);const f="64px",g={};class b extends m.Component{constructor(){super(...arguments),p(this,"mounted",!1),p(this,"state",{image:null}),p(this,"handleKeyPress",(e=>{"Enter"!==e.key&&" "!==e.key||this.props.onClick()}))}componentDidMount(){this.mounted=!0,this.fetchImage(this.props)}componentDidUpdate(e){const{url:t,light:r}=this.props;e.url===t&&e.light===r||this.fetchImage(this.props)}componentWillUnmount(){this.mounted=!1}fetchImage({url:e,light:t,oEmbedUrl:r}){if(!m.default.isValidElement(t))if("string"!=typeof t){if(!g[e])return this.setState({image:null}),window.fetch(r.replace("{url}",e)).then((e=>e.json())).then((t=>{if(t.thumbnail_url&&this.mounted){const r=t.thumbnail_url.replace("height=100","height=480").replace("-d_295x166","-d_640");this.setState({image:r}),g[e]=r}}));this.setState({image:g[e]})}else this.setState({image:t})}render(){const{light:e,onClick:t,playIcon:r,previewTabIndex:a,previewAriaLabel:n}=this.props,{image:i}=this.state,o=m.default.isValidElement(e),l={display:"flex",alignItems:"center",justifyContent:"center"},s={preview:{width:"100%",height:"100%",backgroundImage:i&&!o?`url(${i})`:void 0,backgroundSize:"cover",backgroundPosition:"center",cursor:"pointer",...l},shadow:{background:"radial-gradient(rgb(0, 0, 0, 0.3), rgba(0, 0, 0, 0) 60%)",borderRadius:f,width:f,height:f,position:o?"absolute":void 0,...l},playIcon:{borderStyle:"solid",borderWidth:"16px 0 16px 26px",borderColor:"transparent transparent transparent white",marginLeft:"7px"}},c=m.default.createElement("div",{style:s.shadow,className:"react-player__shadow"},m.default.createElement("div",{style:s.playIcon,className:"react-player__play-icon"}));return m.default.createElement("div",{style:s.preview,className:"react-player__preview",onClick:t,tabIndex:a,onKeyPress:this.handleKeyPress,...n?{"aria-label":n}:{}},o?e:null,r||c)}}const y=r({__proto__:null,default:e(h)},[h]);export{y as P};
