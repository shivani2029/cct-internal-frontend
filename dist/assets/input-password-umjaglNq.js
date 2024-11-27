import{A as w,C as f,r as l,j as e,D as v,p as j,q as C,s as y,I as b,t as P}from"./index-BED7r-nT.js";import{p as S}from"./AuthPages-Mm1D_yvt.js";const F="data:image/svg+xml,%3c?xml%20version='1.0'%20encoding='utf-8'?%3e%3c!--%20Uploaded%20to:%20SVG%20Repo,%20www.svgrepo.com,%20Generator:%20SVG%20Repo%20Mixer%20Tools%20--%3e%3csvg%20fill='%23000000'%20width='800px'%20height='800px'%20viewBox='0%200%2014%2014'%20role='img'%20focusable='false'%20aria-hidden='true'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20style='fill-rule:evenodd'%20d='M%2013,6.9999997%20C%2011.885345,4.8195117%209.6169996,3.3267484%207,3.3267484%20c%20-2.6169992,0%20-4.885345,1.4927633%20-5.9999999,3.6732513%20C%202.114655,9.1804887%204.3830008,10.673252%207,10.673252%20c%202.6169996,0%204.885345,-1.4927633%206,-3.6732523%20z%20m%20-6,2.448835%20c%201.3524539,0%202.4488345,-1.096381%202.4488345,-2.448835%200,-1.352454%20-1.0963806,-2.4488341%20-2.4488345,-2.4488341%20-1.3524539,0%20-2.4488344,1.0963801%20-2.4488344,2.4488341%200,1.352454%201.0963805,2.448835%202.4488344,2.448835%20z%20m%200,-1.224417%20c%200.6762273,0%201.2244172,-0.54819%201.2244172,-1.224418%200,-0.676227%20-0.5481899,-1.224417%20-1.2244172,-1.224417%20-0.6762269,0%20-1.2244172,0.54819%20-1.2244172,1.224417%200,0.676228%200.5481903,1.224418%201.2244172,1.224418%20z'/%3e%3c/svg%3e",L="data:image/svg+xml,%3c?xml%20version='1.0'%20encoding='utf-8'?%3e%3c!--%20Uploaded%20to:%20SVG%20Repo,%20www.svgrepo.com,%20Generator:%20SVG%20Repo%20Mixer%20Tools%20--%3e%3csvg%20fill='%23000000'%20width='800px'%20height='800px'%20viewBox='0%200%2014%2014'%20role='img'%20focusable='false'%20aria-hidden='true'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20d='m%2011.050789,4.6807995%20c%200.812763,0.612897%201.482232,1.405696%201.949211,2.3192%20-1.114655,2.180489%20-3.3830004,3.6732525%20-6,3.6732525%20-0.5944749,0%20-1.1709588,-0.07703%20-1.7200155,-0.221649%20L%206.365699,9.3658875%20c%200.2023064,0.0541%200.4149352,0.08295%200.634301,0.08295%201.3524539,0%202.4488345,-1.0963809%202.4488345,-2.448835%200,-0.219365%20-0.028841,-0.431994%20-0.082946,-0.634301%20L%2011.050789,4.6807995%20Z%20M%208.7200154,3.5483969%20C%208.1709586,3.4037765%207.5944748,3.3267482%207,3.3267482%20c%20-2.6169992,0%20-4.885345,1.4927633%20-5.9999999,3.6732513%200.4669791,0.913505%201.1364481,1.706304%201.9492117,2.319201%20l%201.6848998,-1.6849%20c%20-0.054102,-0.202306%20-0.082946,-0.414935%20-0.082946,-0.634301%200,-1.352454%201.0963805,-2.448834%202.4488344,-2.448834%200.219366,0%200.4319946,0.02884%200.6343008,0.08295%20L%208.7200154,3.5483969%20Z%20M%2010.896072,2.2381344%2011.761866,3.1039281%203.1039283,11.761866%202.2381346,10.896072%2010.896072,2.2381344%20Z'/%3e%3c/svg%3e",V=({name:n="password"})=>{const{control:d,setValue:h}=f(),[o,p]=l.useState(!1),[a,m]=l.useState({minLength:!1,hasNumber:!1,hasSpecialChar:!1,hasUppercase:!1,hasLowercase:!1}),[c,r]=l.useState(!1),u=s=>{const t=S.safeParse(s);return m({minLength:s.length>=8,hasNumber:/\d/.test(s),hasSpecialChar:/[@$!%*#?&]/.test(s),hasUppercase:/[A-Z]/.test(s),hasLowercase:/[a-z]/.test(s)}),t.success},g=s=>{u(s),h(n,s,{shouldValidate:!0})};return e.jsx(v,{name:n,control:d,render:({field:s,fieldState:t})=>{var i;return e.jsxs(j,{children:[e.jsx(C,{children:"Password"}),e.jsx(y,{children:e.jsx(b,{type:o?"text":"password",placeholder:"Enter your Password",...s,onChange:x=>g(x.target.value),onFocus:()=>r(!0),onBlur:()=>r(!1),icon:e.jsx("button",{onClick:()=>p(!o),onFocus:()=>r(!0),onBlur:()=>r(!1),className:"cursor-pointer",type:"button",children:e.jsx("img",{src:o?L:F,alt:"eyeIcon",width:20,height:20})})})}),!c&&e.jsx(P,{children:(i=t.error)==null?void 0:i.message}),c&&e.jsxs("ul",{className:"password-validation list-disc ",children:[e.jsx("span",{className:"font-semibold",children:"Password must contain:"}),e.jsx("li",{style:{color:a.minLength?"green":"red"},children:"At least 8 characters"}),e.jsx("li",{style:{color:a.hasNumber?"green":"red"},children:"Contains a number"}),e.jsx("li",{style:{color:a.hasSpecialChar?"green":"red"},children:"Contains a special character"}),e.jsx("li",{style:{color:a.hasUppercase?"green":"red"},children:"Contains an uppercase letter"}),e.jsx("li",{style:{color:a.hasLowercase?"green":"red"},children:"Contains a lowercase letter"})]})]})}})};V.propTypes={name:w.string};export{F as E,L as H,V as P};