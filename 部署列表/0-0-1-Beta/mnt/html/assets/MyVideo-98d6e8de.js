import{j as e,r as t,g as o}from"./index-10719960.js";import{R as i}from"./index-8d1eaab1.js";import{R as s}from"./index-2b7165f6.js";import{w as d,k as l}from"./blocknote-react-2291cc82.js";const r=d=>{const[l,r]=t.useState(""),n=o();t.useEffect((()=>{(async()=>{try{const e=`/devops-server/public/biz/download/0/${d.block.props.fileKey}?token=${n?.fileToken}`;r(e)}catch(e){}})()}),[d.block.props.fileKey]);return e.jsx("div",{className:"video-container",children:e.jsx(s,{defaultSize:{width:d.block.props.width||500,height:d.block.props.height||500},onResizeStop:(e,t,o,i)=>{d.editor.updateBlock(d.block,{type:"myVideo",props:{width:o.style.width,height:o.style.height}})},children:e.jsx(i,{url:l,width:"100%",height:"100%",controls:!0,id:d.block.id,pip:!1,config:{file:{attributes:{controlsList:"nodownload"}},soundcloud:{options:{show_artwork:!1}}}},d.block.id)})})},n=d({type:"myVideo",propSchema:{textAlignment:l.textAlignment,fileKey:{default:""},docTreeId:{default:0},fileName:{default:""},width:{default:500},height:{default:300}},content:"inline"},{render:t=>e.jsx("div",{ref:t.contentRef,children:e.jsx(r,{...t})})});export{n as MyVideo};
