import{r as e,i as t,a_ as n}from"./index-03adb9ee.js";function r(){for(var t=arguments.length,n=new Array(t),r=0;r<t;r++)n[r]=arguments[r];return e.useMemo((()=>e=>{n.forEach((t=>t(e)))}),n)}const o="undefined"!=typeof window&&void 0!==window.document&&void 0!==window.document.createElement;function i(e){const t=Object.prototype.toString.call(e);return"[object Window]"===t||"[object global]"===t}function a(e){return"nodeType"in e}function l(e){var t,n;return e?i(e)?e:a(e)&&null!=(t=null==(n=e.ownerDocument)?void 0:n.defaultView)?t:window:window}function s(e){const{Document:t}=l(e);return e instanceof t}function c(e){return!i(e)&&e instanceof l(e).HTMLElement}function u(e){return e instanceof l(e).SVGElement}function d(e){return e?i(e)?e.document:a(e)?s(e)?e:c(e)||u(e)?e.ownerDocument:document:document:document}const h=o?e.useLayoutEffect:e.useEffect;function f(t){const n=e.useRef(t);return h((()=>{n.current=t})),e.useCallback((function(){for(var e=arguments.length,t=new Array(e),r=0;r<e;r++)t[r]=arguments[r];return null==n.current?void 0:n.current(...t)}),[])}function v(t,n){void 0===n&&(n=[t]);const r=e.useRef(t);return h((()=>{r.current!==t&&(r.current=t)}),n),r}function g(t,n){const r=e.useRef();return e.useMemo((()=>{const e=t(r.current);return r.current=e,e}),[...n])}function p(t){const n=f(t),r=e.useRef(null),o=e.useCallback((e=>{e!==r.current&&(null==n||n(e,r.current)),r.current=e}),[]);return[r,o]}function b(t){const n=e.useRef();return e.useEffect((()=>{n.current=t}),[t]),n.current}let m={};function y(t,n){return e.useMemo((()=>{if(n)return n;const e=null==m[t]?0:m[t]+1;return m[t]=e,t+"-"+e}),[t,n])}function w(e){return function(t){for(var n=arguments.length,r=new Array(n>1?n-1:0),o=1;o<n;o++)r[o-1]=arguments[o];return r.reduce(((t,n)=>{const r=Object.entries(n);for(const[o,i]of r){const n=t[o];null!=n&&(t[o]=n+e*i)}return t}),{...t})}}const x=w(1),C=w(-1);function D(e){if(!e)return!1;const{KeyboardEvent:t}=l(e.target);return t&&e instanceof t}function E(e){if(function(e){if(!e)return!1;const{TouchEvent:t}=l(e.target);return t&&e instanceof t}(e)){if(e.touches&&e.touches.length){const{clientX:t,clientY:n}=e.touches[0];return{x:t,y:n}}if(e.changedTouches&&e.changedTouches.length){const{clientX:t,clientY:n}=e.changedTouches[0];return{x:t,y:n}}}return function(e){return"clientX"in e&&"clientY"in e}(e)?{x:e.clientX,y:e.clientY}:null}const R=Object.freeze({Translate:{toString(e){if(!e)return;const{x:t,y:n}=e;return"translate3d("+(t?Math.round(t):0)+"px, "+(n?Math.round(n):0)+"px, 0)"}},Scale:{toString(e){if(!e)return;const{scaleX:t,scaleY:n}=e;return"scaleX("+t+") scaleY("+n+")"}},Transform:{toString(e){if(e)return[R.Translate.toString(e),R.Scale.toString(e)].join(" ")}},Transition:{toString(e){let{property:t,duration:n,easing:r}=e;return t+" "+n+"ms "+r}}}),S="a,frame,iframe,input:not([type=hidden]):not(:disabled),select:not(:disabled),textarea:not(:disabled),button:not(:disabled),*[tabindex]";function M(e){return e.matches(S)?e:e.querySelector(S)}const k={display:"none"};function N(e){let{id:n,value:r}=e;return t.createElement("div",{id:n,style:k},r)}function T(e){let{id:n,announcement:r,ariaLiveType:o="assertive"}=e;return t.createElement("div",{id:n,style:{position:"fixed",width:1,height:1,margin:-1,border:0,padding:0,overflow:"hidden",clip:"rect(0 0 0 0)",clipPath:"inset(100%)",whiteSpace:"nowrap"},role:"status","aria-live":o,"aria-atomic":!0},r)}const A=e.createContext(null);const L={draggable:"\n    To pick up a draggable item, press the space bar.\n    While dragging, use the arrow keys to move the item.\n    Press space again to drop the item in its new position, or press escape to cancel.\n  "},O={onDragStart(e){let{active:t}=e;return"Picked up draggable item "+t.id+"."},onDragOver(e){let{active:t,over:n}=e;return n?"Draggable item "+t.id+" was moved over droppable area "+n.id+".":"Draggable item "+t.id+" is no longer over a droppable area."},onDragEnd(e){let{active:t,over:n}=e;return n?"Draggable item "+t.id+" was dropped over droppable area "+n.id:"Draggable item "+t.id+" was dropped."},onDragCancel(e){let{active:t}=e;return"Dragging was cancelled. Draggable item "+t.id+" was dropped."}};function B(r){let{announcements:o=O,container:i,hiddenTextDescribedById:a,screenReaderInstructions:l=L}=r;const{announce:s,announcement:c}=function(){const[t,n]=e.useState("");return{announce:e.useCallback((e=>{null!=e&&n(e)}),[]),announcement:t}}(),u=y("DndLiveRegion"),[d,h]=e.useState(!1);if(e.useEffect((()=>{h(!0)}),[]),function(t){const n=e.useContext(A);e.useEffect((()=>{if(!n)throw new Error("useDndMonitor must be used within a children of <DndContext>");return n(t)}),[t,n])}(e.useMemo((()=>({onDragStart(e){let{active:t}=e;s(o.onDragStart({active:t}))},onDragMove(e){let{active:t,over:n}=e;o.onDragMove&&s(o.onDragMove({active:t,over:n}))},onDragOver(e){let{active:t,over:n}=e;s(o.onDragOver({active:t,over:n}))},onDragEnd(e){let{active:t,over:n}=e;s(o.onDragEnd({active:t,over:n}))},onDragCancel(e){let{active:t,over:n}=e;s(o.onDragCancel({active:t,over:n}))}})),[s,o])),!d)return null;const f=t.createElement(t.Fragment,null,t.createElement(N,{id:a,value:l.draggable}),t.createElement(T,{id:u,announcement:c}));return i?n.createPortal(f,i):f}var z;function I(){}function P(t,n){return e.useMemo((()=>({sensor:t,options:null!=n?n:{}})),[t,n])}function F(){for(var t=arguments.length,n=new Array(t),r=0;r<t;r++)n[r]=arguments[r];return e.useMemo((()=>[...n].filter((e=>null!=e))),[...n])}!function(e){e.DragStart="dragStart",e.DragMove="dragMove",e.DragEnd="dragEnd",e.DragCancel="dragCancel",e.DragOver="dragOver",e.RegisterDroppable="registerDroppable",e.SetDroppableDisabled="setDroppableDisabled",e.UnregisterDroppable="unregisterDroppable"}(z||(z={}));const j=Object.freeze({x:0,y:0});function U(e,t){let{data:{value:n}}=e,{data:{value:r}}=t;return n-r}function K(e,t){let{data:{value:n}}=e,{data:{value:r}}=t;return r-n}function W(e,t,n){return void 0===t&&(t=e.left),void 0===n&&(n=e.top),{x:t+.5*e.width,y:n+.5*e.height}}const X=e=>{let{collisionRect:t,droppableRects:n,droppableContainers:r}=e;const o=W(t,t.left,t.top),i=[];for(const s of r){const{id:e}=s,t=n.get(e);if(t){const n=(a=W(t),l=o,Math.sqrt(Math.pow(a.x-l.x,2)+Math.pow(a.y-l.y,2)));i.push({id:e,data:{droppableContainer:s,value:n}})}}var a,l;return i.sort(U)};function Y(e,t){const n=Math.max(t.top,e.top),r=Math.max(t.left,e.left),o=Math.min(t.left+t.width,e.left+e.width),i=Math.min(t.top+t.height,e.top+e.height),a=o-r,l=i-n;if(r<o&&n<i){const n=t.width*t.height,r=e.width*e.height,o=a*l;return Number((o/(n+r-o)).toFixed(4))}return 0}const H=e=>{let{collisionRect:t,droppableRects:n,droppableContainers:r}=e;const o=[];for(const i of r){const{id:e}=i,r=n.get(e);if(r){const n=Y(r,t);n>0&&o.push({id:e,data:{droppableContainer:i,value:n}})}}return o.sort(K)};function q(e,t){return e&&t?{x:e.left-t.left,y:e.top-t.top}:j}function J(e){return function(t){for(var n=arguments.length,r=new Array(n>1?n-1:0),o=1;o<n;o++)r[o-1]=arguments[o];return r.reduce(((t,n)=>({...t,top:t.top+e*n.y,bottom:t.bottom+e*n.y,left:t.left+e*n.x,right:t.right+e*n.x})),{...t})}}const V=J(1);const _={ignoreTransform:!1};function G(e,t){void 0===t&&(t=_);let n=e.getBoundingClientRect();if(t.ignoreTransform){const{transform:t,transformOrigin:r}=l(e).getComputedStyle(e);t&&(n=function(e,t,n){const r=function(e){if(e.startsWith("matrix3d(")){const t=e.slice(9,-1).split(/, /);return{x:+t[12],y:+t[13],scaleX:+t[0],scaleY:+t[5]}}if(e.startsWith("matrix(")){const t=e.slice(7,-1).split(/, /);return{x:+t[4],y:+t[5],scaleX:+t[0],scaleY:+t[3]}}return null}(t);if(!r)return e;const{scaleX:o,scaleY:i,x:a,y:l}=r,s=e.left-a-(1-o)*parseFloat(n),c=e.top-l-(1-i)*parseFloat(n.slice(n.indexOf(" ")+1)),u=o?e.width/o:e.width,d=i?e.height/i:e.height;return{width:u,height:d,top:c,right:s+u,bottom:c+d,left:s}}(n,t,r))}const{top:r,left:o,width:i,height:a,bottom:s,right:c}=n;return{top:r,left:o,width:i,height:a,bottom:s,right:c}}function Q(e){return G(e,{ignoreTransform:!0})}function Z(e,t){const n=[];return e?function r(o){if(null!=t&&n.length>=t)return n;if(!o)return n;if(s(o)&&null!=o.scrollingElement&&!n.includes(o.scrollingElement))return n.push(o.scrollingElement),n;if(!c(o)||u(o))return n;if(n.includes(o))return n;const i=l(e).getComputedStyle(o);return o!==e&&function(e,t){void 0===t&&(t=l(e).getComputedStyle(e));const n=/(auto|scroll|overlay)/;return["overflow","overflowX","overflowY"].some((e=>{const r=t[e];return"string"==typeof r&&n.test(r)}))}(o,i)&&n.push(o),function(e,t){return void 0===t&&(t=l(e).getComputedStyle(e)),"fixed"===t.position}(o,i)?n:r(o.parentNode)}(e):n}function $(e){const[t]=Z(e,1);return null!=t?t:null}function ee(e){return o&&e?i(e)?e:a(e)?s(e)||e===d(e).scrollingElement?window:c(e)?e:null:null:null}function te(e){return i(e)?e.scrollX:e.scrollLeft}function ne(e){return i(e)?e.scrollY:e.scrollTop}function re(e){return{x:te(e),y:ne(e)}}var oe;function ie(e){return!(!o||!e)&&e===document.scrollingElement}function ae(e){const t={x:0,y:0},n=ie(e)?{height:window.innerHeight,width:window.innerWidth}:{height:e.clientHeight,width:e.clientWidth},r={x:e.scrollWidth-n.width,y:e.scrollHeight-n.height};return{isTop:e.scrollTop<=t.y,isLeft:e.scrollLeft<=t.x,isBottom:e.scrollTop>=r.y,isRight:e.scrollLeft>=r.x,maxScroll:r,minScroll:t}}!function(e){e[e.Forward=1]="Forward",e[e.Backward=-1]="Backward"}(oe||(oe={}));const le={x:.2,y:.2};function se(e,t,n,r,o){let{top:i,left:a,right:l,bottom:s}=n;void 0===r&&(r=10),void 0===o&&(o=le);const{isTop:c,isBottom:u,isLeft:d,isRight:h}=ae(e),f={x:0,y:0},v={x:0,y:0},g=t.height*o.y,p=t.width*o.x;return!c&&i<=t.top+g?(f.y=oe.Backward,v.y=r*Math.abs((t.top+g-i)/g)):!u&&s>=t.bottom-g&&(f.y=oe.Forward,v.y=r*Math.abs((t.bottom-g-s)/g)),!h&&l>=t.right-p?(f.x=oe.Forward,v.x=r*Math.abs((t.right-p-l)/p)):!d&&a<=t.left+p&&(f.x=oe.Backward,v.x=r*Math.abs((t.left+p-a)/p)),{direction:f,speed:v}}function ce(e){if(e===document.scrollingElement){const{innerWidth:e,innerHeight:t}=window;return{top:0,left:0,right:e,bottom:t,width:e,height:t}}const{top:t,left:n,right:r,bottom:o}=e.getBoundingClientRect();return{top:t,left:n,right:r,bottom:o,width:e.clientWidth,height:e.clientHeight}}function ue(e){return e.reduce(((e,t)=>x(e,re(t))),j)}const de=[["x",["left","right"],function(e){return e.reduce(((e,t)=>e+te(t)),0)}],["y",["top","bottom"],function(e){return e.reduce(((e,t)=>e+ne(t)),0)}]];class he{constructor(e,t){this.rect=void 0,this.width=void 0,this.height=void 0,this.top=void 0,this.bottom=void 0,this.right=void 0,this.left=void 0;const n=Z(t),r=ue(n);this.rect={...e},this.width=e.width,this.height=e.height;for(const[o,i,a]of de)for(const e of i)Object.defineProperty(this,e,{get:()=>{const t=a(n),i=r[o]-t;return this.rect[e]+i},enumerable:!0});Object.defineProperty(this,"rect",{enumerable:!1})}}class fe{constructor(e){this.target=void 0,this.listeners=[],this.removeAll=()=>{this.listeners.forEach((e=>{var t;return null==(t=this.target)?void 0:t.removeEventListener(...e)}))},this.target=e}add(e,t,n){var r;null==(r=this.target)||r.addEventListener(e,t,n),this.listeners.push([e,t,n])}}function ve(e,t){const n=Math.abs(e.x),r=Math.abs(e.y);return"number"==typeof t?Math.sqrt(n**2+r**2)>t:"x"in t&&"y"in t?n>t.x&&r>t.y:"x"in t?n>t.x:"y"in t&&r>t.y}var ge,pe;function be(e){e.preventDefault()}function me(e){e.stopPropagation()}!function(e){e.Click="click",e.DragStart="dragstart",e.Keydown="keydown",e.ContextMenu="contextmenu",e.Resize="resize",e.SelectionChange="selectionchange",e.VisibilityChange="visibilitychange"}(ge||(ge={})),function(e){e.Space="Space",e.Down="ArrowDown",e.Right="ArrowRight",e.Left="ArrowLeft",e.Up="ArrowUp",e.Esc="Escape",e.Enter="Enter"}(pe||(pe={}));const ye={start:[pe.Space,pe.Enter],cancel:[pe.Esc],end:[pe.Space,pe.Enter]},we=(e,t)=>{let{currentCoordinates:n}=t;switch(e.code){case pe.Right:return{...n,x:n.x+25};case pe.Left:return{...n,x:n.x-25};case pe.Down:return{...n,y:n.y+25};case pe.Up:return{...n,y:n.y-25}}};class xe{constructor(e){this.props=void 0,this.autoScrollEnabled=!1,this.referenceCoordinates=void 0,this.listeners=void 0,this.windowListeners=void 0,this.props=e;const{event:{target:t}}=e;this.props=e,this.listeners=new fe(d(t)),this.windowListeners=new fe(l(t)),this.handleKeyDown=this.handleKeyDown.bind(this),this.handleCancel=this.handleCancel.bind(this),this.attach()}attach(){this.handleStart(),this.windowListeners.add(ge.Resize,this.handleCancel),this.windowListeners.add(ge.VisibilityChange,this.handleCancel),setTimeout((()=>this.listeners.add(ge.Keydown,this.handleKeyDown)))}handleStart(){const{activeNode:e,onStart:t}=this.props,n=e.node.current;n&&function(e,t){if(void 0===t&&(t=G),!e)return;const{top:n,left:r,bottom:o,right:i}=t(e);$(e)&&(o<=0||i<=0||n>=window.innerHeight||r>=window.innerWidth)&&e.scrollIntoView({block:"center",inline:"center"})}(n),t(j)}handleKeyDown(e){if(D(e)){const{active:t,context:n,options:r}=this.props,{keyboardCodes:o=ye,coordinateGetter:i=we,scrollBehavior:a="smooth"}=r,{code:l}=e;if(o.end.includes(l))return void this.handleEnd(e);if(o.cancel.includes(l))return void this.handleCancel(e);const{collisionRect:s}=n.current,c=s?{x:s.left,y:s.top}:j;this.referenceCoordinates||(this.referenceCoordinates=c);const u=i(e,{active:t,context:n.current,currentCoordinates:c});if(u){const t=C(u,c),r={x:0,y:0},{scrollableAncestors:o}=n.current;for(const n of o){const o=e.code,{isTop:i,isRight:l,isLeft:s,isBottom:c,maxScroll:d,minScroll:h}=ae(n),f=ce(n),v={x:Math.min(o===pe.Right?f.right-f.width/2:f.right,Math.max(o===pe.Right?f.left:f.left+f.width/2,u.x)),y:Math.min(o===pe.Down?f.bottom-f.height/2:f.bottom,Math.max(o===pe.Down?f.top:f.top+f.height/2,u.y))},g=o===pe.Right&&!l||o===pe.Left&&!s,p=o===pe.Down&&!c||o===pe.Up&&!i;if(g&&v.x!==u.x){const e=n.scrollLeft+t.x,i=o===pe.Right&&e<=d.x||o===pe.Left&&e>=h.x;if(i&&!t.y)return void n.scrollTo({left:e,behavior:a});r.x=i?n.scrollLeft-e:o===pe.Right?n.scrollLeft-d.x:n.scrollLeft-h.x,r.x&&n.scrollBy({left:-r.x,behavior:a});break}if(p&&v.y!==u.y){const e=n.scrollTop+t.y,i=o===pe.Down&&e<=d.y||o===pe.Up&&e>=h.y;if(i&&!t.x)return void n.scrollTo({top:e,behavior:a});r.y=i?n.scrollTop-e:o===pe.Down?n.scrollTop-d.y:n.scrollTop-h.y,r.y&&n.scrollBy({top:-r.y,behavior:a});break}}this.handleMove(e,x(C(u,this.referenceCoordinates),r))}}}handleMove(e,t){const{onMove:n}=this.props;e.preventDefault(),n(t)}handleEnd(e){const{onEnd:t}=this.props;e.preventDefault(),this.detach(),t()}handleCancel(e){const{onCancel:t}=this.props;e.preventDefault(),this.detach(),t()}detach(){this.listeners.removeAll(),this.windowListeners.removeAll()}}function Ce(e){return Boolean(e&&"distance"in e)}function De(e){return Boolean(e&&"delay"in e)}xe.activators=[{eventName:"onKeyDown",handler:(e,t,n)=>{let{keyboardCodes:r=ye,onActivation:o}=t,{active:i}=n;const{code:a}=e.nativeEvent;if(r.start.includes(a)){const t=i.activatorNode.current;return(!t||e.target===t)&&(e.preventDefault(),null==o||o({event:e.nativeEvent}),!0)}return!1}}];class Ee{constructor(e,t,n){var r;void 0===n&&(n=function(e){const{EventTarget:t}=l(e);return e instanceof t?e:d(e)}(e.event.target)),this.props=void 0,this.events=void 0,this.autoScrollEnabled=!0,this.document=void 0,this.activated=!1,this.initialCoordinates=void 0,this.timeoutId=null,this.listeners=void 0,this.documentListeners=void 0,this.windowListeners=void 0,this.props=e,this.events=t;const{event:o}=e,{target:i}=o;this.props=e,this.events=t,this.document=d(i),this.documentListeners=new fe(this.document),this.listeners=new fe(n),this.windowListeners=new fe(l(i)),this.initialCoordinates=null!=(r=E(o))?r:j,this.handleStart=this.handleStart.bind(this),this.handleMove=this.handleMove.bind(this),this.handleEnd=this.handleEnd.bind(this),this.handleCancel=this.handleCancel.bind(this),this.handleKeydown=this.handleKeydown.bind(this),this.removeTextSelection=this.removeTextSelection.bind(this),this.attach()}attach(){const{events:e,props:{options:{activationConstraint:t,bypassActivationConstraint:n}}}=this;if(this.listeners.add(e.move.name,this.handleMove,{passive:!1}),this.listeners.add(e.end.name,this.handleEnd),this.windowListeners.add(ge.Resize,this.handleCancel),this.windowListeners.add(ge.DragStart,be),this.windowListeners.add(ge.VisibilityChange,this.handleCancel),this.windowListeners.add(ge.ContextMenu,be),this.documentListeners.add(ge.Keydown,this.handleKeydown),t){if(null!=n&&n({event:this.props.event,activeNode:this.props.activeNode,options:this.props.options}))return this.handleStart();if(De(t))return void(this.timeoutId=setTimeout(this.handleStart,t.delay));if(Ce(t))return}this.handleStart()}detach(){this.listeners.removeAll(),this.windowListeners.removeAll(),setTimeout(this.documentListeners.removeAll,50),null!==this.timeoutId&&(clearTimeout(this.timeoutId),this.timeoutId=null)}handleStart(){const{initialCoordinates:e}=this,{onStart:t}=this.props;e&&(this.activated=!0,this.documentListeners.add(ge.Click,me,{capture:!0}),this.removeTextSelection(),this.documentListeners.add(ge.SelectionChange,this.removeTextSelection),t(e))}handleMove(e){var t;const{activated:n,initialCoordinates:r,props:o}=this,{onMove:i,options:{activationConstraint:a}}=o;if(!r)return;const l=null!=(t=E(e))?t:j,s=C(r,l);if(!n&&a){if(Ce(a)){if(null!=a.tolerance&&ve(s,a.tolerance))return this.handleCancel();if(ve(s,a.distance))return this.handleStart()}return De(a)&&ve(s,a.tolerance)?this.handleCancel():void 0}e.cancelable&&e.preventDefault(),i(l)}handleEnd(){const{onEnd:e}=this.props;this.detach(),e()}handleCancel(){const{onCancel:e}=this.props;this.detach(),e()}handleKeydown(e){e.code===pe.Esc&&this.handleCancel()}removeTextSelection(){var e;null==(e=this.document.getSelection())||e.removeAllRanges()}}const Re={move:{name:"pointermove"},end:{name:"pointerup"}};class Se extends Ee{constructor(e){const{event:t}=e,n=d(t.target);super(e,Re,n)}}Se.activators=[{eventName:"onPointerDown",handler:(e,t)=>{let{nativeEvent:n}=e,{onActivation:r}=t;return!(!n.isPrimary||0!==n.button)&&(null==r||r({event:n}),!0)}}];const Me={move:{name:"mousemove"},end:{name:"mouseup"}};var ke;!function(e){e[e.RightClick=2]="RightClick"}(ke||(ke={}));class Ne extends Ee{constructor(e){super(e,Me,d(e.event.target))}}Ne.activators=[{eventName:"onMouseDown",handler:(e,t)=>{let{nativeEvent:n}=e,{onActivation:r}=t;return n.button!==ke.RightClick&&(null==r||r({event:n}),!0)}}];const Te={move:{name:"touchmove"},end:{name:"touchend"}};var Ae,Le;function Oe(t){let{acceleration:n,activator:r=Ae.Pointer,canScroll:o,draggingRect:i,enabled:a,interval:l=5,order:s=Le.TreeOrder,pointerCoordinates:c,scrollableAncestors:u,scrollableAncestorRects:d,delta:h,threshold:f}=t;const v=function(e){let{delta:t,disabled:n}=e;const r=b(t);return g((e=>{if(n||!r||!e)return Be;const o={x:Math.sign(t.x-r.x),y:Math.sign(t.y-r.y)};return{x:{[oe.Backward]:e.x[oe.Backward]||-1===o.x,[oe.Forward]:e.x[oe.Forward]||1===o.x},y:{[oe.Backward]:e.y[oe.Backward]||-1===o.y,[oe.Forward]:e.y[oe.Forward]||1===o.y}}}),[n,t,r])}({delta:h,disabled:!a}),[p,m]=function(){const t=e.useRef(null);return[e.useCallback(((e,n)=>{t.current=setInterval(e,n)}),[]),e.useCallback((()=>{null!==t.current&&(clearInterval(t.current),t.current=null)}),[])]}(),y=e.useRef({x:0,y:0}),w=e.useRef({x:0,y:0}),x=e.useMemo((()=>{switch(r){case Ae.Pointer:return c?{top:c.y,bottom:c.y,left:c.x,right:c.x}:null;case Ae.DraggableRect:return i}}),[r,i,c]),C=e.useRef(null),D=e.useCallback((()=>{const e=C.current;if(!e)return;const t=y.current.x*w.current.x,n=y.current.y*w.current.y;e.scrollBy(t,n)}),[]),E=e.useMemo((()=>s===Le.TreeOrder?[...u].reverse():u),[s,u]);e.useEffect((()=>{if(a&&u.length&&x){for(const e of E){if(!1===(null==o?void 0:o(e)))continue;const t=u.indexOf(e),r=d[t];if(!r)continue;const{direction:i,speed:a}=se(e,r,x,n,f);for(const e of["x","y"])v[e][i[e]]||(a[e]=0,i[e]=0);if(a.x>0||a.y>0)return m(),C.current=e,p(D,l),y.current=a,void(w.current=i)}y.current={x:0,y:0},w.current={x:0,y:0},m()}else m()}),[n,D,o,m,a,l,JSON.stringify(x),JSON.stringify(v),p,u,E,d,JSON.stringify(f)])}(class extends Ee{constructor(e){super(e,Te)}static setup(){return window.addEventListener(Te.move.name,e,{capture:!1,passive:!1}),function(){window.removeEventListener(Te.move.name,e)};function e(){}}}).activators=[{eventName:"onTouchStart",handler:(e,t)=>{let{nativeEvent:n}=e,{onActivation:r}=t;const{touches:o}=n;return!(o.length>1)&&(null==r||r({event:n}),!0)}}],function(e){e[e.Pointer=0]="Pointer",e[e.DraggableRect=1]="DraggableRect"}(Ae||(Ae={})),function(e){e[e.TreeOrder=0]="TreeOrder",e[e.ReversedTreeOrder=1]="ReversedTreeOrder"}(Le||(Le={}));const Be={x:{[oe.Backward]:!1,[oe.Forward]:!1},y:{[oe.Backward]:!1,[oe.Forward]:!1}};var ze,Ie;!function(e){e[e.Always=0]="Always",e[e.BeforeDragging=1]="BeforeDragging",e[e.WhileDragging=2]="WhileDragging"}(ze||(ze={})),function(e){e.Optimized="optimized"}(Ie||(Ie={}));const Pe=new Map;function Fe(e,t){return g((n=>e?n||("function"==typeof t?t(e):e):null),[t,e])}function je(t){let{callback:n,disabled:r}=t;const o=f(n),i=e.useMemo((()=>{if(r||"undefined"==typeof window||void 0===window.ResizeObserver)return;const{ResizeObserver:e}=window;return new e(o)}),[r]);return e.useEffect((()=>()=>null==i?void 0:i.disconnect()),[i]),i}function Ue(e){return new he(G(e),e)}function Ke(t,n,r){void 0===n&&(n=Ue);const[o,i]=e.useReducer((function(e){if(!t)return null;var o;if(!1===t.isConnected)return null!=(o=null!=e?e:r)?o:null;const i=n(t);if(JSON.stringify(e)===JSON.stringify(i))return e;return i}),null),a=function(t){let{callback:n,disabled:r}=t;const o=f(n),i=e.useMemo((()=>{if(r||"undefined"==typeof window||void 0===window.MutationObserver)return;const{MutationObserver:e}=window;return new e(o)}),[o,r]);return e.useEffect((()=>()=>null==i?void 0:i.disconnect()),[i]),i}({callback(e){if(t)for(const n of e){const{type:e,target:r}=n;if("childList"===e&&r instanceof HTMLElement&&r.contains(t)){i();break}}}}),l=je({callback:i});return h((()=>{i(),t?(null==l||l.observe(t),null==a||a.observe(document.body,{childList:!0,subtree:!0})):(null==l||l.disconnect(),null==a||a.disconnect())}),[t]),o}const We=[];function Xe(t,n){void 0===n&&(n=[]);const r=e.useRef(null);return e.useEffect((()=>{r.current=null}),n),e.useEffect((()=>{const e=t!==j;e&&!r.current&&(r.current=t),!e&&r.current&&(r.current=null)}),[t]),r.current?C(t,r.current):j}function Ye(t){return e.useMemo((()=>t?function(e){const t=e.innerWidth,n=e.innerHeight;return{top:0,left:0,right:t,bottom:n,width:t,height:n}}(t):null),[t])}const He=[];function qe(t){let{measure:n}=t;const[r,o]=e.useState(null),i=e.useCallback((e=>{for(const{target:t}of e)if(c(t)){o((e=>{const r=n(t);return e?{...e,width:r.width,height:r.height}:r}));break}}),[n]),a=je({callback:i}),l=e.useCallback((e=>{const t=function(e){if(!e)return null;if(e.children.length>1)return e;const t=e.children[0];return c(t)?t:e}(e);null==a||a.disconnect(),t&&(null==a||a.observe(t)),o(t?n(t):null)}),[n,a]),[s,u]=p(l);return e.useMemo((()=>({nodeRef:s,rect:r,setRef:u})),[r,s,u])}const Je=[{sensor:Se,options:{}},{sensor:xe,options:{}}],Ve={current:{}},_e={draggable:{measure:Q},droppable:{measure:Q,strategy:ze.WhileDragging,frequency:Ie.Optimized},dragOverlay:{measure:G}};class Ge extends Map{get(e){var t;return null!=e&&null!=(t=super.get(e))?t:void 0}toArray(){return Array.from(this.values())}getEnabled(){return this.toArray().filter((e=>{let{disabled:t}=e;return!t}))}getNodeFor(e){var t,n;return null!=(t=null==(n=this.get(e))?void 0:n.node.current)?t:void 0}}const Qe={activatorEvent:null,active:null,activeNode:null,activeNodeRect:null,collisions:null,containerNodeRect:null,draggableNodes:new Map,droppableRects:new Map,droppableContainers:new Ge,over:null,dragOverlay:{nodeRef:{current:null},rect:null,setRef:I},scrollableAncestors:[],scrollableAncestorRects:[],measuringConfiguration:_e,measureDroppableContainers:I,windowRect:null,measuringScheduled:!1},Ze={activatorEvent:null,activators:[],active:null,activeNodeRect:null,ariaDescribedById:{draggable:""},dispatch:I,draggableNodes:new Map,over:null,measureDroppableContainers:I},$e=e.createContext(Ze),et=e.createContext(Qe);function tt(){return{draggable:{active:null,initialCoordinates:{x:0,y:0},nodes:new Map,translate:{x:0,y:0}},droppable:{containers:new Ge}}}function nt(e,t){switch(t.type){case z.DragStart:return{...e,draggable:{...e.draggable,initialCoordinates:t.initialCoordinates,active:t.active}};case z.DragMove:return e.draggable.active?{...e,draggable:{...e.draggable,translate:{x:t.coordinates.x-e.draggable.initialCoordinates.x,y:t.coordinates.y-e.draggable.initialCoordinates.y}}}:e;case z.DragEnd:case z.DragCancel:return{...e,draggable:{...e.draggable,active:null,initialCoordinates:{x:0,y:0},translate:{x:0,y:0}}};case z.RegisterDroppable:{const{element:n}=t,{id:r}=n,o=new Ge(e.droppable.containers);return o.set(r,n),{...e,droppable:{...e.droppable,containers:o}}}case z.SetDroppableDisabled:{const{id:n,key:r,disabled:o}=t,i=e.droppable.containers.get(n);if(!i||r!==i.key)return e;const a=new Ge(e.droppable.containers);return a.set(n,{...i,disabled:o}),{...e,droppable:{...e.droppable,containers:a}}}case z.UnregisterDroppable:{const{id:n,key:r}=t,o=e.droppable.containers.get(n);if(!o||r!==o.key)return e;const i=new Ge(e.droppable.containers);return i.delete(n),{...e,droppable:{...e.droppable,containers:i}}}default:return e}}function rt(t){let{disabled:n}=t;const{active:r,activatorEvent:o,draggableNodes:i}=e.useContext($e),a=b(o),l=b(null==r?void 0:r.id);return e.useEffect((()=>{if(!n&&!o&&a&&null!=l){if(!D(a))return;if(document.activeElement===a.target)return;const e=i.get(l);if(!e)return;const{activatorNode:t,node:n}=e;if(!t.current&&!n.current)return;requestAnimationFrame((()=>{for(const e of[t.current,n.current]){if(!e)continue;const t=M(e);if(t){t.focus();break}}}))}}),[o,n,i,l,a]),null}const ot=e.createContext({...j,scaleX:1,scaleY:1});var it;!function(e){e[e.Uninitialized=0]="Uninitialized",e[e.Initializing=1]="Initializing",e[e.Initialized=2]="Initialized"}(it||(it={}));const at=e.memo((function(r){var i,a,s,c;let{id:u,accessibility:d,autoScroll:f=!0,children:p,sensors:b=Je,collisionDetection:m=H,measuring:w,modifiers:C,...D}=r;const R=e.useReducer(nt,void 0,tt),[S,M]=R,[k,N]=function(){const[t]=e.useState((()=>new Set)),n=e.useCallback((e=>(t.add(e),()=>t.delete(e))),[t]);return[e.useCallback((e=>{let{type:n,event:r}=e;t.forEach((e=>{var t;return null==(t=e[n])?void 0:t.call(e,r)}))}),[t]),n]}(),[T,L]=e.useState(it.Uninitialized),O=T===it.Initialized,{draggable:{active:I,nodes:P,translate:F},droppable:{containers:U}}=S,K=I?P.get(I):null,W=e.useRef({initial:null,translated:null}),X=e.useMemo((()=>{var e;return null!=I?{id:I,data:null!=(e=null==K?void 0:K.data)?e:Ve,rect:W}:null}),[I,K]),Y=e.useRef(null),[J,_]=e.useState(null),[Q,te]=e.useState(null),ne=v(D,Object.values(D)),oe=y("DndDescribedBy",u),ae=e.useMemo((()=>U.getEnabled()),[U]),le=(se=w,e.useMemo((()=>({draggable:{..._e.draggable,...null==se?void 0:se.draggable},droppable:{..._e.droppable,...null==se?void 0:se.droppable},dragOverlay:{..._e.dragOverlay,...null==se?void 0:se.dragOverlay}})),[null==se?void 0:se.draggable,null==se?void 0:se.droppable,null==se?void 0:se.dragOverlay]));var se;const{droppableRects:ce,measureDroppableContainers:de,measuringScheduled:fe}=function(t,n){let{dragging:r,dependencies:o,config:i}=n;const[a,l]=e.useState(null),{frequency:s,measure:c,strategy:u}=i,d=e.useRef(t),h=function(){switch(u){case ze.Always:return!1;case ze.BeforeDragging:return r;default:return!r}}(),f=v(h),p=e.useCallback((function(e){void 0===e&&(e=[]),f.current||l((t=>null===t?e:t.concat(e.filter((e=>!t.includes(e))))))}),[f]),b=e.useRef(null),m=g((e=>{if(h&&!r)return Pe;if(!e||e===Pe||d.current!==t||null!=a){const e=new Map;for(let n of t){if(!n)continue;if(a&&a.length>0&&!a.includes(n.id)&&n.rect.current){e.set(n.id,n.rect.current);continue}const t=n.node.current,r=t?new he(c(t),t):null;n.rect.current=r,r&&e.set(n.id,r)}return e}return e}),[t,a,r,h,c]);return e.useEffect((()=>{d.current=t}),[t]),e.useEffect((()=>{h||p()}),[r,h]),e.useEffect((()=>{a&&a.length>0&&l(null)}),[JSON.stringify(a)]),e.useEffect((()=>{h||"number"!=typeof s||null!==b.current||(b.current=setTimeout((()=>{p(),b.current=null}),s))}),[s,h,p,...o]),{droppableRects:m,measureDroppableContainers:p,measuringScheduled:null!=a}}(ae,{dragging:O,dependencies:[F.x,F.y],config:le.droppable}),ve=function(e,t){const n=null!==t?e.get(t):void 0,r=n?n.node.current:null;return g((e=>{var n;return null===t?null:null!=(n=null!=r?r:e)?n:null}),[r,t])}(P,I),ge=e.useMemo((()=>Q?E(Q):null),[Q]),pe=function(){const e=!1===(null==J?void 0:J.autoScrollEnabled),t="object"==typeof f?!1===f.enabled:!1===f,n=O&&!e&&!t;if("object"==typeof f)return{...f,enabled:n};return{enabled:n}}(),be=function(e,t){return Fe(e,t)}(ve,le.draggable.measure);!function(t){let{activeNode:n,measure:r,initialRect:o,config:i=!0}=t;const a=e.useRef(!1),{x:l,y:s}="boolean"==typeof i?{x:i,y:i}:i;h((()=>{if(!l&&!s||!n)return void(a.current=!1);if(a.current||!o)return;const e=null==n?void 0:n.node.current;if(!e||!1===e.isConnected)return;const t=q(r(e),o);if(l||(t.x=0),s||(t.y=0),a.current=!0,Math.abs(t.x)>0||Math.abs(t.y)>0){const n=$(e);n&&n.scrollBy({top:t.y,left:t.x})}}),[n,l,s,o,r])}({activeNode:I?P.get(I):null,config:pe.layoutShiftCompensation,initialRect:be,measure:le.draggable.measure});const me=Ke(ve,le.draggable.measure,be),ye=Ke(ve?ve.parentElement:null),we=e.useRef({activatorEvent:null,active:null,activeNode:ve,collisionRect:null,collisions:null,droppableRects:ce,draggableNodes:P,draggingNode:null,draggingNodeRect:null,droppableContainers:U,over:null,scrollableAncestors:[],scrollAdjustedTranslate:null}),xe=U.getNodeFor(null==(i=we.current.over)?void 0:i.id),Ce=qe({measure:le.dragOverlay.measure}),De=null!=(a=Ce.nodeRef.current)?a:ve,Ee=O?null!=(s=Ce.rect)?s:me:null,Re=Boolean(Ce.nodeRef.current&&Ce.rect),Se=q(Me=Re?null:me,Fe(Me));var Me;const ke=Ye(De?l(De):null),Ne=function(t){const n=e.useRef(t),r=g((e=>t?e&&e!==We&&t&&n.current&&t.parentNode===n.current.parentNode?e:Z(t):We),[t]);return e.useEffect((()=>{n.current=t}),[t]),r}(O?null!=xe?xe:ve:null),Te=function(t,n){void 0===n&&(n=G);const[r]=t,o=Ye(r?l(r):null),[i,a]=e.useReducer((function(){return t.length?t.map((e=>ie(e)?o:new he(n(e),e))):He}),He),s=je({callback:a});return t.length>0&&i===He&&a(),h((()=>{t.length?t.forEach((e=>null==s?void 0:s.observe(e))):(null==s||s.disconnect(),a())}),[t]),i}(Ne),Ae=function(e,t){let{transform:n,...r}=t;return null!=e&&e.length?e.reduce(((e,t)=>t({transform:e,...r})),n):n}(C,{transform:{x:F.x-Se.x,y:F.y-Se.y,scaleX:1,scaleY:1},activatorEvent:Q,active:X,activeNodeRect:me,containerNodeRect:ye,draggingNodeRect:Ee,over:we.current.over,overlayNodeRect:Ce.rect,scrollableAncestors:Ne,scrollableAncestorRects:Te,windowRect:ke}),Le=ge?x(ge,F):null,Be=function(t){const[n,r]=e.useState(null),o=e.useRef(t),i=e.useCallback((e=>{const t=ee(e.target);t&&r((e=>e?(e.set(t,re(t)),new Map(e)):null))}),[]);return e.useEffect((()=>{const e=o.current;if(t!==e){n(e);const a=t.map((e=>{const t=ee(e);return t?(t.addEventListener("scroll",i,{passive:!0}),[t,re(t)]):null})).filter((e=>null!=e));r(a.length?new Map(a):null),o.current=t}return()=>{n(t),n(e)};function n(e){e.forEach((e=>{const t=ee(e);null==t||t.removeEventListener("scroll",i)}))}}),[i,t]),e.useMemo((()=>t.length?n?Array.from(n.values()).reduce(((e,t)=>x(e,t)),j):ue(t):j),[t,n])}(Ne),Ie=Xe(Be),Ue=Xe(Be,[me]),Ge=x(Ae,Ie),Qe=Ee?V(Ee,Ae):null,Ze=X&&Qe?m({active:X,collisionRect:Qe,droppableRects:ce,droppableContainers:ae,pointerCoordinates:Le}):null,at=function(e,t){if(!e||0===e.length)return null;const[n]=e;return t?n[t]:n}(Ze,"id"),[lt,st]=e.useState(null),ct=function(e,t,n){return{...e,scaleX:t&&n?t.width/n.width:1,scaleY:t&&n?t.height/n.height:1}}(Re?Ae:x(Ae,Ue),null!=(c=null==lt?void 0:lt.rect)?c:null,me),ut=e.useCallback(((e,t)=>{let{sensor:r,options:o}=t;if(null==Y.current)return;const i=P.get(Y.current);if(!i)return;const a=e.nativeEvent,l=new r({active:Y.current,activeNode:i,event:a,options:o,context:we,onStart(e){const t=Y.current;if(null==t)return;const r=P.get(t);if(!r)return;const{onDragStart:o}=ne.current,i={active:{id:t,data:r.data,rect:W}};n.unstable_batchedUpdates((()=>{null==o||o(i),L(it.Initializing),M({type:z.DragStart,initialCoordinates:e,active:t}),k({type:"onDragStart",event:i})}))},onMove(e){M({type:z.DragMove,coordinates:e})},onEnd:s(z.DragEnd),onCancel:s(z.DragCancel)});function s(e){return async function(){const{active:t,collisions:r,over:o,scrollAdjustedTranslate:i}=we.current;let l=null;if(t&&i){const{cancelDrop:n}=ne.current;if(l={activatorEvent:a,active:t,collisions:r,delta:i,over:o},e===z.DragEnd&&"function"==typeof n){await Promise.resolve(n(l))&&(e=z.DragCancel)}}Y.current=null,n.unstable_batchedUpdates((()=>{M({type:e}),L(it.Uninitialized),st(null),_(null),te(null);const t=e===z.DragEnd?"onDragEnd":"onDragCancel";if(l){const e=ne.current[t];null==e||e(l),k({type:t,event:l})}}))}}n.unstable_batchedUpdates((()=>{_(l),te(e.nativeEvent)}))}),[P]),dt=e.useCallback(((e,t)=>(n,r)=>{const o=n.nativeEvent,i=P.get(r);if(null!==Y.current||!i||o.dndKit||o.defaultPrevented)return;const a={active:i};!0===e(n,t.options,a)&&(o.dndKit={capturedBy:t.sensor},Y.current=r,ut(n,t))}),[P,ut]),ht=function(t,n){return e.useMemo((()=>t.reduce(((e,t)=>{const{sensor:r}=t;return[...e,...r.activators.map((e=>({eventName:e.eventName,handler:n(e.handler,t)})))]}),[])),[t,n])}(b,dt);!function(t){e.useEffect((()=>{if(!o)return;const e=t.map((e=>{let{sensor:t}=e;return null==t.setup?void 0:t.setup()}));return()=>{for(const t of e)null==t||t()}}),t.map((e=>{let{sensor:t}=e;return t})))}(b),h((()=>{me&&T===it.Initializing&&L(it.Initialized)}),[me,T]),e.useEffect((()=>{const{onDragMove:e}=ne.current,{active:t,activatorEvent:r,collisions:o,over:i}=we.current;if(!t||!r)return;const a={active:t,activatorEvent:r,collisions:o,delta:{x:Ge.x,y:Ge.y},over:i};n.unstable_batchedUpdates((()=>{null==e||e(a),k({type:"onDragMove",event:a})}))}),[Ge.x,Ge.y]),e.useEffect((()=>{const{active:e,activatorEvent:t,collisions:r,droppableContainers:o,scrollAdjustedTranslate:i}=we.current;if(!e||null==Y.current||!t||!i)return;const{onDragOver:a}=ne.current,l=o.get(at),s=l&&l.rect.current?{id:l.id,rect:l.rect.current,data:l.data,disabled:l.disabled}:null,c={active:e,activatorEvent:t,collisions:r,delta:{x:i.x,y:i.y},over:s};n.unstable_batchedUpdates((()=>{st(s),null==a||a(c),k({type:"onDragOver",event:c})}))}),[at]),h((()=>{we.current={activatorEvent:Q,active:X,activeNode:ve,collisionRect:Qe,collisions:Ze,droppableRects:ce,draggableNodes:P,draggingNode:De,draggingNodeRect:Ee,droppableContainers:U,over:lt,scrollableAncestors:Ne,scrollAdjustedTranslate:Ge},W.current={initial:Ee,translated:Qe}}),[X,ve,Ze,Qe,P,De,Ee,ce,U,lt,Ne,Ge]),Oe({...pe,delta:F,draggingRect:Qe,pointerCoordinates:Le,scrollableAncestors:Ne,scrollableAncestorRects:Te});const ft=e.useMemo((()=>({active:X,activeNode:ve,activeNodeRect:me,activatorEvent:Q,collisions:Ze,containerNodeRect:ye,dragOverlay:Ce,draggableNodes:P,droppableContainers:U,droppableRects:ce,over:lt,measureDroppableContainers:de,scrollableAncestors:Ne,scrollableAncestorRects:Te,measuringConfiguration:le,measuringScheduled:fe,windowRect:ke})),[X,ve,me,Q,Ze,ye,Ce,P,U,ce,lt,de,Ne,Te,le,fe,ke]),vt=e.useMemo((()=>({activatorEvent:Q,activators:ht,active:X,activeNodeRect:me,ariaDescribedById:{draggable:oe},dispatch:M,draggableNodes:P,over:lt,measureDroppableContainers:de})),[Q,ht,X,me,M,oe,P,lt,de]);return t.createElement(A.Provider,{value:N},t.createElement($e.Provider,{value:vt},t.createElement(et.Provider,{value:ft},t.createElement(ot.Provider,{value:ct},p)),t.createElement(rt,{disabled:!1===(null==d?void 0:d.restoreFocus)})),t.createElement(B,{...d,hiddenTextDescribedById:oe}))})),lt=e.createContext(null),st="button";function ct(t){let{id:n,data:r,disabled:o=!1,attributes:i}=t;const a=y("Droppable"),{activators:l,activatorEvent:s,active:c,activeNodeRect:u,ariaDescribedById:d,draggableNodes:f,over:g}=e.useContext($e),{role:b=st,roleDescription:m="draggable",tabIndex:w=0}=null!=i?i:{},x=(null==c?void 0:c.id)===n,C=e.useContext(x?ot:lt),[D,E]=p(),[R,S]=p(),M=function(t,n){return e.useMemo((()=>t.reduce(((e,t)=>{let{eventName:r,handler:o}=t;return e[r]=e=>{o(e,n)},e}),{})),[t,n])}(l,n),k=v(r);h((()=>(f.set(n,{id:n,key:a,node:D,activatorNode:R,data:k}),()=>{const e=f.get(n);e&&e.key===a&&f.delete(n)})),[f,n]);return{active:c,activatorEvent:s,activeNodeRect:u,attributes:e.useMemo((()=>({role:b,tabIndex:w,"aria-disabled":o,"aria-pressed":!(!x||b!==st)||void 0,"aria-roledescription":m,"aria-describedby":d.draggable})),[o,b,w,x,m,d.draggable]),isDragging:x,listeners:o?void 0:M,node:D,over:g,setNodeRef:E,setActivatorNodeRef:S,transform:C}}function ut(){return e.useContext(et)}const dt={timeout:25};function ht(t){let{data:n,disabled:r=!1,id:o,resizeObserverConfig:i}=t;const a=y("Droppable"),{active:l,dispatch:s,over:c,measureDroppableContainers:u}=e.useContext($e),d=e.useRef({disabled:r}),f=e.useRef(!1),g=e.useRef(null),b=e.useRef(null),{disabled:m,updateMeasurementsFor:w,timeout:x}={...dt,...i},C=v(null!=w?w:o),D=je({callback:e.useCallback((()=>{f.current?(null!=b.current&&clearTimeout(b.current),b.current=setTimeout((()=>{u(Array.isArray(C.current)?C.current:[C.current]),b.current=null}),x)):f.current=!0}),[x]),disabled:m||!l}),E=e.useCallback(((e,t)=>{D&&(t&&(D.unobserve(t),f.current=!1),e&&D.observe(e))}),[D]),[R,S]=p(E),M=v(n);return e.useEffect((()=>{D&&R.current&&(D.disconnect(),f.current=!1,D.observe(R.current))}),[R,D]),h((()=>(s({type:z.RegisterDroppable,element:{id:o,key:a,disabled:r,node:R,rect:g,data:M}}),()=>s({type:z.UnregisterDroppable,key:a,id:o}))),[o]),e.useEffect((()=>{r!==d.current.disabled&&(s({type:z.SetDroppableDisabled,id:o,key:a,disabled:r}),d.current.disabled=r)}),[o,a,r,s]),{active:l,rect:g,isOver:(null==c?void 0:c.id)===o,node:R,over:c,setNodeRef:S}}export{R as C,at as D,pe as K,Ne as M,Se as P,P as a,ut as b,y as c,h as d,ht as e,ct as f,r as g,G as h,D as i,X as j,F as u};
