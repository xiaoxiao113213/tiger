import{r as e,j as t}from"./index-1fe6dff8.js";import{P as o}from"./index-9cc62199.js";import s from"./NodeInspector-e6a5849e.js";import r from"./ChangeLogger-a9ab502b.js";import i from"./ViewportLogger-357d27cf.js";function c(){const[c,a]=e.useState(!0),[g,l]=e.useState(!0),[d,j]=e.useState(!0);return t.jsxs("div",{className:"react-flow__devtools",children:[t.jsxs(o,{position:"top-left",children:[t.jsx(n,{setActive:a,active:c,title:"Toggle Node Inspector",children:"Node Inspector"}),t.jsx(n,{setActive:l,active:g,title:"Toggle Change Logger",children:"Change Logger"}),t.jsx(n,{setActive:j,active:d,title:"Toggle Viewport Logger",children:"Viewport Logger"})]}),g&&t.jsx(r,{}),c&&t.jsx(s,{}),d&&t.jsx(i,{})]})}function n({active:e,setActive:o,children:s,...r}){return t.jsx("button",{onClick:()=>o((e=>!e)),className:e?"active":"",...r,children:s})}export{c as default};
