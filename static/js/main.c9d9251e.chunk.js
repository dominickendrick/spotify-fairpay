(this["webpackJsonpspotify-fairpay"]=this["webpackJsonpspotify-fairpay"]||[]).push([[0],{42:function(e,t,r){},66:function(e,t,r){},72:function(e,t,r){"use strict";r.r(t);var n=r(0),a=r(1),s=r.n(a),c=r(32),i=r.n(c),o=(r(42),r(2)),u=r.n(o),p=r(5),f=r(34),l=r(3),d=r(10),h=r.n(d),j=r(15),b=r.n(j),m=r(36),x=function(){var e=window.crypto||window.msCrypto;return e.subtle||e.webkitSubtle},y=function(){var e=Object(p.a)(u.a.mark((function e(t){var r;return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(r=x().digest({name:"SHA-256"},(new TextEncoder).encode(t)),!window.msCrypto){e.next=3;break}return e.abrupt("return",new Promise((function(e,t){r.oncomplete=function(t){e(t.target.result)},r.onerror=function(e){t(e.error)},r.onabort=function(){t("The digest operation was aborted")}})));case 3:return e.next=5,r;case 5:return e.abrupt("return",e.sent);case 6:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),g=function(e){var t=new Uint8Array(e);return function(e){var t={"+":"-","/":"_","=":""};return e.replace(/[+/=]/g,(function(e){return t[e]}))}(window.btoa(String.fromCharCode.apply(String,Object(m.a)(Array.from(t)))))},v=function(e){for(var t="",r="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",n=r.length,a=0;a<e;a++)t+=r.charAt(Math.floor(Math.random()*n));return t},O=function(){var e=arguments.length>0&&void 0!==arguments[0]&&arguments[0],t=e?"/":"";switch(window.location.host){case"dominickendrick.github.io":return"/spotify-fairpay"+t;default:return"/"}},w="ad2aef8b86924e66941a6c4344c4bf8a",k="https://accounts.spotify.com",S="".concat(window.location.protocol,"//").concat(window.location.host).concat(O(!0),"auth-callback"),_=function(){var e=Object(p.a)(u.a.mark((function e(){var t,r,n,a,s;return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t=v((c=43,i=128,c=Math.ceil(c),i=Math.floor(i),Math.floor(Math.random()*(i-c+1))+c)),e.next=3,y(t);case 3:r=e.sent,n=g(r),a=v(12),sessionStorage.setItem("spotify-code-verifier",t),sessionStorage.setItem("spotify-state",a),(s=new URL(k+"/authorize")).searchParams.append("response_type","code"),s.searchParams.append("client_id",w),s.searchParams.append("redirect_uri",S),s.searchParams.append("scope","user-read-recently-played user-top-read"),s.searchParams.append("state",a),s.searchParams.append("code_challenge",n),s.searchParams.append("code_challenge_method","S256"),window.location.href=s.toString();case 17:case"end":return e.stop()}var c,i}),e)})));return function(){return e.apply(this,arguments)}}(),A=function(){var e=Object(p.a)(u.a.mark((function e(){var t,r,n,a,s,c,i,o;return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(t=new URL(window.location.href).searchParams,r=t.get("code"),n=t.get("state"),a=sessionStorage.getItem("spotify-code-verifier"),s=sessionStorage.getItem("spotify-state"),c={client_id:w,grant_type:"authorization_code",code:r,redirect_uri:S,code_verifier:a},k+"/api/token",n!==s){e.next=15;break}return e.next=10,h.a.post("https://accounts.spotify.com/api/token",b.a.stringify(c),{headers:{"Content-Type":"application/x-www-form-urlencoded"}});case 10:i=e.sent,o=N(i.data),sessionStorage.setItem("spotify-session-data",JSON.stringify(o)),e.next=16;break;case 15:return e.abrupt("return",Promise.reject("State did not match"));case 16:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),N=function(e){return e.expires_at=Date.now()+1e3*e.expires_in,e},P=r(12);function C(e){if(e&&e.artists){var t=e.artists.items.map((function(e,t){var r=e.popularity<50;return Object(n.jsxs)("tr",{children:[Object(n.jsx)("td",{className:"artist-position",children:t+1}),Object(n.jsx)("td",{className:"artist-image",children:Object(n.jsx)("img",{className:"circle-image",src:e.images[2]?e.images[2].url:"",alt:e.name})}),Object(n.jsx)("td",{className:"artist-name",children:e.name}),Object(n.jsx)("td",{className:"artist-popularity",children:r?"\u2714\ufe0e":""}),Object(n.jsx)("td",{children:r&&Object(n.jsx)("div",{children:Object(n.jsx)("a",{className:"actionLink",href:"https://www.google.com/search?q=".concat(e.name),children:"Help"})})})]},e.id)}));return Object(n.jsxs)("table",{children:[Object(n.jsx)("thead",{children:Object(n.jsxs)("tr",{children:[Object(n.jsx)("th",{children:"#"}),Object(n.jsx)("th",{}),Object(n.jsx)("th",{className:"artist-name-header",children:"Artist"}),Object(n.jsx)("th",{children:"Under funded"}),Object(n.jsx)("th",{})]})}),Object(n.jsx)("tbody",{children:t})]})}return Object(n.jsx)("ul",{})}var I=r(33),L=r.n(I),E=function(e){if(e&&e.artists){var t=e.artists.items.filter((function(e){return e.popularity>50})),r=e.artists.items.length-t.length;return[t.length,r]}return[0,0]},M=function(e){return{data:e.map((function(t){return[0,t/e.length*10]})),backgroundColor:["#a71db9","#1db9b9"],borderWidth:0,barPercentage:.9,xAxisID:"",yAxisID:""}};function z(e){var t=Object(a.useRef)(null),r=Object(a.useState)(),s=Object(P.a)(r,2),c=s[0],i=s[1];Object(a.useEffect)((function(){if(t){var r=function(e,t){if(e&&e.current)return new L.a(e.current,{type:"bar",data:{datasets:[M(E(t))],labels:["Mainstream","Under funded"]},options:{legend:{display:!1,labels:{fontColor:"white"},position:"bottom"},scales:{yAxes:[{ticks:{callback:function(e,t,r){return e+" %"}}}]}}})}(t,e);r&&i(r)}}),[]),Object(a.useEffect)((function(){c&&c.data&&c.data.datasets&&(c.data.datasets[0]=M(E(e)),c.update())}),[e,c]);var o=E(e),u=Object(P.a)(o,2),p=u[0],f=u[1],l=Math.floor(f/(p+f)*100);return Object(n.jsxs)("div",{children:[Object(n.jsxs)("h2",{children:["Over ",l,"% of your top ",U," artists are not paid enough by Spotify."]}),Object(n.jsx)("canvas",{ref:t}),Object(n.jsx)("p",{children:"Most of these musicians do not recieve enough money from Spotify's payment model."}),Object(n.jsxs)("p",{children:["As a fan of these musicians, ",Object(n.jsx)("em",{children:"you can help them by buying music and merchendise direct"})," alongside streaming their music."]}),Object(n.jsx)("p",{children:"Please ask yourself when the was the last time gave directly to your favourite under funded artist."}),Object(n.jsx)("p",{children:"Check your list below to help keep the music alive."})]})}var T=function(){var e=Object(p.a)(u.a.mark((function e(t){var r;return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return r={client_id:w,grant_type:"authorization_code",code:t},k+"/api/token",e.next=4,h.a.post("https://accounts.spotify.com/api/token",b.a.stringify(r),{headers:{"Content-Type":"application/x-www-form-urlencoded"}});case 4:return e.abrupt("return",e.sent);case 5:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),D=function(){var e=sessionStorage.getItem("spotify-session-data");if(e)try{return JSON.parse(e)}catch(t){console.log("failed to parse storage data",t)}}(),B=function(){return!!(D&&D.expires_at&&D.expires_at>=Date.now())},F=function(){var e=Object(p.a)(u.a.mark((function e(){var t,r,n;return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!D||!B()){e.next=3;break}return t=D.access_token,e.abrupt("return",Promise.resolve({headers:{Authorization:"Bearer ".concat(t)}}));case 3:if(!D||B()||!D.refresh_token){e.next=11;break}return console.log("session not active but have refresh token",B()),e.next=7,T(D.refresh_token);case 7:return r=e.sent,n=N(r.data),sessionStorage.setItem("spotify-session-data",JSON.stringify(n)),e.abrupt("return",Promise.resolve({headers:{Authorization:"Bearer ".concat(n.access_token)}}));case 11:return e.abrupt("return",Promise.reject("Failed to refresh access token, user needs to login again"));case 12:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),J=function(){var e=Object(p.a)(u.a.mark((function e(){return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",F().then((function(e){return e})).catch((function(e){_()})));case 1:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),U=20,V=function(){var e=Object(p.a)(u.a.mark((function e(t){var r;return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return"AIzaSyA9TnNyVDuilrsSdYIy9zxv_2B3XLjCVG4","https://kgsearch.googleapis.com/v1/entities:search",r={query:t,limit:10,indent:!0,key:"AIzaSyA9TnNyVDuilrsSdYIy9zxv_2B3XLjCVG4",types:"Person"},e.next=5,h.a.get("https://kgsearch.googleapis.com/v1/entities:search",{params:r}).then((function(e){return console.log("knowledge graph data for ".concat(t," is: "),e.data),e.data})).catch(console.log);case 5:return e.abrupt("return",e.sent);case 6:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),R=function(){var e=Object(p.a)(u.a.mark((function e(t,r){var n,a;return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,h.a.get("https://api.spotify.com/v1/me/top/artists?time_range=long_term&limit=".concat(U),r).then((function(e){return console.log("artists data",e.data),e.data})).catch(console.log);case 2:return n=e.sent,a=function(){var e=Object(p.a)(u.a.mark((function e(){return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",n.items.map(function(){var e=Object(p.a)(u.a.mark((function e(t){var r,n;return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,V(t.name);case 2:return r=e.sent,n=function(){if(r&&r.itemListElement&&r.itemListElement[0]&&r.itemListElement[0].result&&r.itemListElement[0].result.url){var e=r.itemListElement.find((function(e){return void 0!==e.result.url}));return null===e||void 0===e?void 0:e.result.url}},t.external_urls.website=n(),e.abrupt("return",t);case 6:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()));case 1:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),e.next=6,a().then(function(){var e=Object(p.a)(u.a.mark((function e(r){return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:Promise.all(r).then((function(e){t({items:e})}));case 1:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}());case 6:case"end":return e.stop()}}),e)})));return function(t,r){return e.apply(this,arguments)}}();function Y(){var e=Object(a.useState)({items:[]}),t=Object(P.a)(e,2),r=t[0],s=t[1],c=Object(a.useState)(),i=Object(P.a)(c,2),o=i[0],f=i[1];return Object(a.useEffect)((function(){(function(){var e=Object(p.a)(u.a.mark((function e(){var t;return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,J();case 2:(t=e.sent)&&f(t);case 4:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}})()()}),[]),Object(a.useEffect)((function(){o&&R(s,o)}),[o]),Object(n.jsxs)("div",{className:"App",children:[Object(n.jsx)("h1",{children:"Your Top Artists"}),Object(n.jsxs)("div",{className:"container",children:[Object(n.jsx)("div",{className:"col",children:Object(n.jsx)(z,{artists:r})}),Object(n.jsx)("div",{className:"col artists-list",children:Object(n.jsx)(C,{artists:r})})]})]})}r(66);function q(){return Object(n.jsx)("section",{className:"App",children:Object(n.jsxs)("div",{className:"homepage",children:[Object(n.jsx)("header",{className:"App-header"}),Object(n.jsx)("h1",{children:"Are you your favourite artists being paid enough for their music on spotify?"}),Object(n.jsx)("p",{children:"More people are listening to music via Spotify, but many musicians are not being paid enough for their work."}),Object(n.jsx)("p",{children:"Check to see if your favourite artists are getting their fair share of money."}),Object(n.jsx)("button",{className:"login-button",onClick:_,children:"Login to Spotify"})]})})}function G(){return Object(a.useEffect)((function(){function e(){return(e=Object(p.a)(u.a.mark((function e(){return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",A());case 1:case"end":return e.stop()}}),e)})))).apply(this,arguments)}(function(){return e.apply(this,arguments)})().then((function(e){window.location.href="".concat(O(!0),"top-artists")}))}),[]),Object(n.jsx)("p",{})}function H(){return Object(n.jsx)(Y,{})}var X=function(){return Object(n.jsx)(f.a,{basename:O(!1),children:Object(n.jsx)("div",{children:Object(n.jsxs)(l.c,{children:[Object(n.jsx)(l.a,{exact:!0,path:"/",children:Object(n.jsx)(q,{})}),Object(n.jsx)(l.a,{path:"/auth-callback",children:Object(n.jsx)(G,{})}),Object(n.jsx)(l.a,{path:"/top-artists",children:Object(n.jsx)(H,{})})]})})})},W=function(e){e&&e instanceof Function&&r.e(3).then(r.bind(null,73)).then((function(t){var r=t.getCLS,n=t.getFID,a=t.getFCP,s=t.getLCP,c=t.getTTFB;r(e),n(e),a(e),s(e),c(e)}))};i.a.render(Object(n.jsx)(s.a.StrictMode,{children:Object(n.jsx)(X,{})}),document.getElementById("root")),W()}},[[72,1,2]]]);
//# sourceMappingURL=main.c9d9251e.chunk.js.map