(this["webpackJsonpspotify-fairpay"]=this["webpackJsonpspotify-fairpay"]||[]).push([[0],{42:function(t,e,n){},66:function(t,e,n){},72:function(t,e,n){"use strict";n.r(e);var r=n(0),a=n(1),i=n.n(a),c=n(31),s=n.n(c),o=(n(42),n(4)),u=n.n(o),d=n(9),l=n(34),h=n(2),p=n(12),f=n.n(p),j=n(32),b=n.n(j),m=n(36),O=function(){var t=window.crypto||window.msCrypto;return t.subtle||t.webkitSubtle},x=function(){var t=Object(d.a)(u.a.mark((function t(e){var n;return u.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(n=O().digest({name:"SHA-256"},(new TextEncoder).encode(e)),!window.msCrypto){t.next=3;break}return t.abrupt("return",new Promise((function(t,e){n.oncomplete=function(e){t(e.target.result)},n.onerror=function(t){e(t.error)},n.onabort=function(){e("The digest operation was aborted")}})));case 3:return t.next=5,n;case 5:return t.abrupt("return",t.sent);case 6:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}(),g=function(t){var e=new Uint8Array(t);return function(t){var e={"+":"-","/":"_","=":""};return t.replace(/[+/=]/g,(function(t){return e[t]}))}(window.btoa(String.fromCharCode.apply(String,Object(m.a)(Array.from(e)))))},y=function(t){for(var e="",n="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",r=n.length,a=0;a<t;a++)e+=n.charAt(Math.floor(Math.random()*r));return e},v=function(){var t=arguments.length>0&&void 0!==arguments[0]&&arguments[0];switch(window.location.host){case"dominickendrick.github.io":return"/spotify-fairpay"+(t?"/":"");default:return"/"}},w="ad2aef8b86924e66941a6c4344c4bf8a",k="https://accounts.spotify.com",S="".concat(window.location.protocol,"//").concat(window.location.host).concat(v(!0),"auth-callback"),_=function(){var t=Object(d.a)(u.a.mark((function t(){var e,n,r,a,i;return u.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return e=y((c=43,s=128,c=Math.ceil(c),s=Math.floor(s),Math.floor(Math.random()*(s-c+1))+c)),t.next=3,x(e);case 3:n=t.sent,r=g(n),a=y(12),sessionStorage.setItem("spotify-code-verifier",e),sessionStorage.setItem("spotify-state",a),(i=new URL(k+"/authorize")).searchParams.append("response_type","code"),i.searchParams.append("client_id",w),i.searchParams.append("redirect_uri",S),i.searchParams.append("scope","user-read-recently-played user-top-read"),i.searchParams.append("state",a),i.searchParams.append("code_challenge",r),i.searchParams.append("code_challenge_method","S256"),window.location.href=i.toString();case 17:case"end":return t.stop()}var c,s}),t)})));return function(){return t.apply(this,arguments)}}(),C=function(){var t=Object(d.a)(u.a.mark((function t(){var e,n,r,a;return u.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return e=new URL(window.location.href).searchParams,n=e.get("code"),e.get("state"),r=sessionStorage.getItem("spotify-code-verifier"),a={client_id:w,grant_type:"authorization_code",code:n,redirect_uri:S,code_verifier:r},k+"/api/token",console.log("token-verification"),t.abrupt("return",f.a.post("https://accounts.spotify.com/api/token",b.a.stringify(a),{headers:{"Content-Type":"application/x-www-form-urlencoded"}}));case 8:case"end":return t.stop()}}),t)})));return function(){return t.apply(this,arguments)}}(),N=function(){var t=sessionStorage.getItem("spotify-session-data");if(t)try{return JSON.parse(t)}catch(e){console.log("failed to parse storage data",e)}},P=n(15);function A(t){if(t&&t.artists){var e=t.artists.items.map((function(t,e){return Object(r.jsxs)("tr",{children:[Object(r.jsx)("td",{children:e+1}),Object(r.jsx)("td",{children:Object(r.jsx)("img",{className:"circle-image",src:t.images[2].url,alt:t.name})}),Object(r.jsx)("td",{children:t.name}),Object(r.jsx)("td",{children:t.popularity<50?"\u2714\ufe0e":""}),Object(r.jsx)("td",{children:t.popularity<50&&Object(r.jsxs)("div",{children:[Object(r.jsx)("a",{className:"actionLink",href:"https://artist.site",children:"Buy CD/Vinyl"}),Object(r.jsx)("a",{className:"actionLink",href:"https://artist.site",children:"Buy Digital"}),Object(r.jsx)("a",{className:"actionLink",href:"https://artist.site",children:"Join Patreon"})]})})]},t.id)}));return Object(r.jsxs)("table",{children:[Object(r.jsx)("thead",{children:Object(r.jsxs)("tr",{children:[Object(r.jsx)("th",{children:"#"}),Object(r.jsx)("th",{}),Object(r.jsx)("th",{children:"Artist"}),Object(r.jsx)("th",{children:"Specialist musician"}),Object(r.jsx)("th",{children:"Take Action"})]})}),Object(r.jsx)("tbody",{children:e})]})}return Object(r.jsx)("ul",{})}var M=n(33),L=n.n(M),T=function(t){if(t&&t.artists){var e=t.artists.items.filter((function(t){return t.popularity>50})),n=t.artists.items.length-e.length;return[e.length,n]}return[50,50]},B=function(t){return{data:t,backgroundColor:["#1db9a4","#1db954"],borderWidth:0}};function I(t){var e=Object(a.useRef)(null),n=Object(a.useState)(),i=Object(P.a)(n,2),c=i[0],s=i[1];return Object(a.useEffect)((function(){if(e){var n=function(t,e){if(t&&t.current)return new L.a(t.current,{type:"doughnut",data:{datasets:[B(T(e))],labels:["Popular artist","Specialist artist"]},options:{legend:{labels:{fontColor:"white"},position:"bottom"}}})}(e,t);n&&s(n)}}),[]),Object(a.useEffect)((function(){c&&c.data&&c.data.datasets&&(c.data.datasets[0]=B(T(t)),c.update())}),[t,c]),Object(r.jsxs)("div",{children:[Object(r.jsxs)("h2",{children:["Over ",2*T(t)[1],"% of your top 50 artists make specialist music."]}),Object(r.jsx)("canvas",{ref:e}),Object(r.jsx)("p",{children:"Most of these musicians do not recieve enough money from Spotify"}),Object(r.jsx)("p",{children:"You should consider:"}),Object(r.jsxs)("ol",{children:[Object(r.jsx)("li",{children:"Buying their music via Bandcamp/iTunes etc or on CD/Vinyl"}),Object(r.jsx)("li",{children:"Donating via Patreon or Spotify donate system"})]}),Object(r.jsx)("p",{children:"You can click the buttons on the table to take action for your favourite artists!"})]})}var E=function(){var t=Object(d.a)(u.a.mark((function t(e){var n,r,a,i,c,s;return u.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(!(n=N())){t.next=13;break}return r=n.access_token,a={headers:{Authorization:"Bearer ".concat(r)}},t.next=6,f.a.get("https://api.spotify.com/v1/me/top/artists?time_range=long_term&limit=50",a).then((function(t){return t.data})).catch(console.log);case 6:return i=t.sent,t.next=9,f.a.get("https://api.spotify.com/v1/me/player/recently-played?limit=50",a).then((function(t){return console.log("recently played",t.data.items),t.data})).catch(console.log);case 9:return c=t.sent,s=i.items.map((function(t){return t.listening_duration=D(t,c),t})),e({items:s}),t.abrupt("return",c);case 13:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}(),D=function(t,e){var n=e.items.find((function(e){return e.track.artists.find((function(e){return e.id===t.id}))}));return(null===n||void 0===n?void 0:n.track.duration_ms)?Math.round((null===n||void 0===n?void 0:n.track.duration_ms)/1e3/60):0};function J(){var t=Object(a.useState)({items:[]}),e=Object(P.a)(t,2),n=e[0],i=e[1];return Object(a.useEffect)((function(){E(i)}),[]),Object(r.jsxs)("div",{className:"App",children:[Object(r.jsx)("h1",{children:"Your Top Artists"}),Object(r.jsxs)("div",{className:"container",children:[Object(r.jsx)("div",{className:"col",children:Object(r.jsx)(I,{artists:n})}),Object(r.jsx)("div",{className:"col",children:Object(r.jsx)(A,{artists:n})})]})]})}n(66);function F(){return Object(r.jsx)("section",{className:"App",children:Object(r.jsxs)("div",{className:"homepage",children:[Object(r.jsx)("header",{className:"App-header"}),Object(r.jsx)("h1",{children:"Are you your favourite artists being paid enough for their music on spotify?"}),Object(r.jsx)("p",{children:"More people are listening to music via Spotify, but many musicians are not being paid enough for their work."}),Object(r.jsx)("p",{children:"Check to see if your favourite artists are getting their fair share of money."}),Object(r.jsx)("button",{className:"login-button",onClick:_,children:"Login to Spotify"})]})})}function z(){return Object(a.useEffect)((function(){function t(){return(t=Object(d.a)(u.a.mark((function t(){return u.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.abrupt("return",C());case 1:case"end":return t.stop()}}),t)})))).apply(this,arguments)}(function(){return t.apply(this,arguments)})().then((function(t){sessionStorage.setItem("spotify-session-data",JSON.stringify(t.data)),window.location.href="/top-artists"}))}),[]),Object(r.jsx)("p",{children:"Successfully Logged in"})}function R(){return Object(r.jsx)(J,{})}var U=function(){return Object(r.jsx)(l.a,{basename:v(!1),children:Object(r.jsx)("div",{children:Object(r.jsxs)(h.c,{children:[Object(r.jsx)(h.a,{exact:!0,path:"/",children:Object(r.jsx)(F,{})}),Object(r.jsx)(h.a,{path:"/auth-callback",children:Object(r.jsx)(z,{})}),Object(r.jsx)(h.a,{path:"/top-artists",children:Object(r.jsx)(R,{})})]})})})},Y=function(t){t&&t instanceof Function&&n.e(3).then(n.bind(null,73)).then((function(e){var n=e.getCLS,r=e.getFID,a=e.getFCP,i=e.getLCP,c=e.getTTFB;n(t),r(t),a(t),i(t),c(t)}))};s.a.render(Object(r.jsx)(i.a.StrictMode,{children:Object(r.jsx)(U,{})}),document.getElementById("root")),Y()}},[[72,1,2]]]);
//# sourceMappingURL=main.11d63585.chunk.js.map