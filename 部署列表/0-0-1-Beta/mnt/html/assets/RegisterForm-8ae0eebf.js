import{u as s,l as e,L as r,j as l,F as a,I as i,B as n,s as o}from"./index-1fe6dff8.js";import{ReturnButton as t}from"./ReturnButton-cf095390.js";function d(){const{t:d}=s(),m=o.signup,{loginState:c,backToLogin:g}=e();if(c!==r.REGISTER)return null;return l.jsxs(l.Fragment,{children:[l.jsx("div",{className:"mb-4 text-2xl font-bold xl:text-3xl",children:d("sys.login.signUpFormTitle")}),l.jsxs(a,{name:"normal_login",size:"large",initialValues:{remember:!0},onFinish:async s=>{await m(s),g()},children:[l.jsx(a.Item,{name:"username",rules:[{required:!0,message:d("sys.login.accountPlaceholder")}],children:l.jsx(i,{placeholder:d("sys.login.userName")})}),l.jsx(a.Item,{name:"email",rules:[{required:!0,message:d("sys.login.emaildPlaceholder")}],children:l.jsx(i,{placeholder:d("sys.login.email")})}),l.jsx(a.Item,{name:"password",rules:[{required:!0,message:d("sys.login.passwordPlaceholder")}],children:l.jsx(i.Password,{type:"password",placeholder:d("sys.login.password")})}),l.jsx(a.Item,{name:"confirmPassword",rules:[{required:!0,message:d("sys.login.confirmPasswordPlaceholder")},({getFieldValue:s})=>({validator:(e,r)=>r&&s("password")!==r?Promise.reject(new Error(d("sys.login.diffPwd"))):Promise.resolve()})],children:l.jsx(i.Password,{type:"password",placeholder:d("sys.login.confirmPassword")})}),l.jsx(a.Item,{children:l.jsx(n,{type:"primary",htmlType:"submit",className:"w-full",children:d("sys.login.registerButton")})}),l.jsxs("div",{className:"mb-2 text-xs text-gray",children:[l.jsx("span",{children:d("sys.login.registerAndAgree")}),l.jsx("a",{href:"./",className:"text-sm !underline",children:d("sys.login.termsOfService")})," & ",l.jsx("a",{href:"./",className:"text-sm !underline",children:d("sys.login.privacyPolicy")})]}),l.jsx(t,{onClick:g})]})]})}export{d as default};
