import{u as s,k as e,r as a,l as r,n as l,L as n,j as i,F as o,I as t,o as m,p as d,q as c,B as u}from"./index-03adb9ee.js";function x(){const{t:x}=s();e();const[h,p]=a.useState(!1),{loginState:g,setLoginState:j}=r(),y=l();if(g!==n.LOGIN)return null;return i.jsxs(i.Fragment,{children:[i.jsx("div",{className:"mb-4 text-2xl font-bold xl:text-3xl",children:x("sys.login.signInFormTitle")}),i.jsxs(o,{name:"login",size:"large",initialValues:{remember:!0,username:"",password:""},onFinish:async({username:s,password:e})=>{p(!0);try{await y({username:s,password:e})}finally{p(!1)}},children:[i.jsx(o.Item,{name:"username",rules:[{required:!0,message:x("sys.login.accountPlaceholder")}],children:i.jsx(t,{placeholder:x("sys.login.userName")})}),i.jsx(o.Item,{name:"password",rules:[{required:!0,message:x("sys.login.passwordPlaceholder")}],children:i.jsx(t.Password,{type:"password",placeholder:x("sys.login.password")})}),i.jsx(o.Item,{children:i.jsx(m,{children:i.jsx(d,{span:12,children:i.jsx(o.Item,{name:"remember",valuePropName:"checked",noStyle:!0,children:i.jsx(c,{children:x("sys.login.rememberMe")})})})})}),i.jsx(o.Item,{children:i.jsx(u,{type:"primary",htmlType:"submit",className:"w-full",loading:h,children:x("sys.login.loginButton")})})]})]})}export{x as default};
