(this.webpackJsonpsandbox=this.webpackJsonpsandbox||[]).push([[0],{13:function(t,e,n){},14:function(t,e,n){},16:function(t,e,n){"use strict";n.r(e);var c=n(1),s=n.n(c),r=n(6),i=n.n(r),a=(n(13),n.p+"static/media/logo.6ce24c58.svg"),o=(n(14),n(2)),u=n(3),j=n(7),d=n(5),l=n(4),b=n(0),h=function(t){Object(d.a)(n,t);var e=Object(l.a)(n);function n(){return Object(o.a)(this,n),e.apply(this,arguments)}return Object(u.a)(n,[{key:"render",value:function(){return Object(b.jsxs)("div",{id:"sandbox",children:[Object(b.jsx)("hr",{}),"Let's create",Object(b.jsx)("br",{}),Object(b.jsx)("br",{}),Object(b.jsx)("div",{id:"artImgDiv",children:Object(b.jsx)("img",{id:"artImg",src:"https://i.redd.it/ga8ce2xiljr21.jpg"})}),Object(b.jsxs)("div",{id:"answerButtons",children:[Object(b.jsx)("button",{id:"artButton",class:"button button1",children:"Art"}),Object(b.jsx)("button",{id:"notArtButton",class:"button button2",children:"Not Art"})]}),Object(b.jsx)("div",{id:"test"}),Object(b.jsx)("hr",{})]})}}]),n}(s.a.Component),p=n.p+"static/media/shrek.f3acf6cd.png",O=function(t){Object(d.a)(n,t);var e=Object(l.a)(n);function n(t){var c;return Object(o.a)(this,n),(c=e.call(this,t)).state={password:"swordfish",authorized:!1},c.authorize=c.authorize.bind(Object(j.a)(c)),c}return Object(u.a)(n,[{key:"authorize",value:function(t){var e=t.target.querySelector('input[type="password"]').value==this.state.password;e||(console.log("Wrong password, Fuck off "),document.querySelector("#title").innerHTML="This is my swamp, go away",document.querySelector(".App-logo").src=p,t.preventDefault());this.setState({authorized:e})}},{key:"removeSpinner",value:function(){document.querySelector(".App-logo").style.display="none",document.title="Sandbox"}},{key:"render",value:function(){var t=Object(b.jsxs)("form",{action:"#",onSubmit:this.authorize,children:[Object(b.jsx)("input",{type:"password",placeholder:"Password"}),Object(b.jsx)("input",{type:"submit"})]}),e=Object(b.jsxs)("ul",{children:[Object(b.jsx)(h,{}),Object(b.jsx)("li",{children:"client@example.com"}),Object(b.jsx)("li",{children:"555.555.5555"})]});return Object(b.jsxs)("div",{id:"authorization",children:[Object(b.jsx)("h1",{id:"title",children:this.state.authorized?"Welcome":"Enter the Password"}),this.state.authorized?e:t,this.state.authorized?this.removeSpinner():null]})}}]),n}(s.a.Component),x=function(t){Object(d.a)(n,t);var e=Object(l.a)(n);function n(t){var c;return Object(o.a)(this,n),(c=e.call(this,t)).state={date:new Date},c}return Object(u.a)(n,[{key:"render",value:function(){return Object(b.jsxs)("div",{children:[Object(b.jsx)("br",{}),this.state.date.toLocaleTimeString()]})}},{key:"componentDidMount",value:function(){var t=this;setInterval((function(){t.setState({date:new Date})}),1e3)}}]),n}(s.a.Component);var v=function(){return Object(b.jsx)("div",{className:"App",children:Object(b.jsxs)("header",{className:"App-header",children:[console.log(Object(b.jsx)(O,{})),Object(b.jsx)("img",{src:a,className:"App-logo",alt:"logo"}),Object(b.jsx)(O,{}),Object(b.jsx)(x,{})]})})},m=function(t){t&&t instanceof Function&&n.e(3).then(n.bind(null,17)).then((function(e){var n=e.getCLS,c=e.getFID,s=e.getFCP,r=e.getLCP,i=e.getTTFB;n(t),c(t),s(t),r(t),i(t)}))};i.a.render(Object(b.jsx)(s.a.StrictMode,{children:Object(b.jsx)(v,{})}),document.getElementById("root")),m()}},[[16,1,2]]]);
//# sourceMappingURL=main.eccd78a0.chunk.js.map