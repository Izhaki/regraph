(window.webpackJsonp=window.webpackJsonp||[]).push([[4],{"0XBy":function(a,e,t){var n=t("/1nD"),c=t("0Sp3")("iterator"),s=t("N9zW");a.exports=t("TaGV").isIterable=function(a){var e=Object(a);return void 0!==e[c]||"@@iterator"in e||s.hasOwnProperty(n(e))}},"1Ldg":function(a,e,t){"use strict";e.a=function(a){return{x:a.x+a.width/2,y:a.y+a.height/2}}},"1VIh":function(a,e,t){"use strict";var n=t("Rbzu"),c=t("hCWT"),s=t("K4BZ"),p=function(a){return"string"===typeof a},o=t("sKTV"),r=function(a,e){return a.connections.reduce(function(t,c){var s=e(a,c);return Object(o.b)(s)||t.push(Object(n.a)({},c,s)),t},[])};e.a=function(){var a=arguments.length>0&&void 0!==arguments[0]?arguments[0]:function(){var a=arguments.length>0&&void 0!==arguments[0]?arguments[0]:c.a;return function(e,t){var n=e.boxes,c=t.src,o=t.dst,r={};return p(c)&&Object(s.a)(n[c])&&(r.src=a(n[c])),p(o)&&Object(s.a)(n[o])&&(r.dst=a(n[o])),r}}();return function(e){return Object(n.a)({},e,{connections:r(e,a)})}}},"2agv":function(a,e,t){"use strict";var n=t("8Xl/"),c=t("/6KZ"),s=t("dCrc"),p=t("oICS"),o=t("Ng5M"),r=t("gou2"),u=t("ErhN"),m=t("VJcA");c(c.S+c.F*!t("Clx3")(function(a){Array.from(a)}),"Array",{from:function(a){var e,t,c,b,j=s(a),i="function"==typeof this?this:Array,O=arguments.length,N=O>1?arguments[1]:void 0,l=void 0!==N,k=0,d=m(j);if(l&&(N=n(N,O>2?arguments[2]:void 0,2)),void 0==d||i==Array&&o(d))for(t=new i(e=r(j.length));e>k;k++)u(t,k,l?N(j[k],k):j[k]);else for(b=d.call(j),t=new i;!(c=b.next()).done;k++)u(t,k,l?p(b,N,[c.value,k],!0):c.value);return t.length=k,t}})},"2xrT":function(a,e,t){a.exports=t("md7T")},"31MD":function(a,e,t){var n=t("/6KZ"),c=t("SvME")(!0);n(n.S,"Object",{entries:function(a){return c(a)}})},"6JBb":function(a,e,t){var n=t("/6KZ"),c=t("SvME")(!1);n(n.S,"Object",{values:function(a){return c(a)}})},"7X5e":function(a,e,t){a.exports=t("8/po")},"8/po":function(a,e,t){t("k/kI"),t("WwSA"),a.exports=t("0XBy")},"8ET1":function(a,e,t){a.exports=t("Vlwe")},"8foj":function(a,e,t){"use strict";var n=t("z3IF"),c=t("mXGw"),s=t.n(c),p=s.a.createElement,o={stroke:"#777",strokeWidth:2},r=s.a.memo(function(a){var e=a.id,t=a.src,r=a.dst,u=a.markerStart,m=a.markerEnd,b=a.selectable,j=a.styleAttrs,i=a.overlayStyleAttrs,O=function(a,e,t){var n="".concat(a,"-marker-end"),p=Object(c.useMemo)(function(){return t&&s.a.cloneElement(t,{id:n})},[t,n]),o="".concat(a,"-marker-start");return{MarkerStart:Object(c.useMemo)(function(){return e&&s.a.cloneElement(e,{id:o})},[e,o]),MarkerEnd:p,markerStartId:o,markerEndId:n}}(e,u,m),N=O.MarkerStart,l=O.MarkerEnd,k=O.markerStartId,d=O.markerEndId;return p("g",{id:e},p("line",Object(n.a)({className:"connection",x1:t.x,y1:t.y,x2:r.x,y2:r.y,markerStart:u&&"url(#".concat(k,")"),markerEnd:m&&"url(#".concat(d,")")},o,j)),N&&N,l&&l,b&&p("line",Object(n.a)({className:"connection-overlay",x1:t.x,y1:t.y,x2:r.x,y2:r.y},i)))});e.a=r},AXMb:function(a,e,t){t("31MD"),a.exports=t("TaGV").Object.entries},CcWs:function(a,e,t){"use strict";var n=t("hCWT"),c=t("K4BZ"),s=function(a,e){var t=a.p1,n=a.p2,c=e.p1,s=e.p2,p=(s.y-c.y)*(n.x-t.x)-(s.x-c.x)*(n.y-t.y);if(0!==p){var o=((s.x-c.x)*(t.y-c.y)-(s.y-c.y)*(t.x-c.x))/p,r=((n.x-t.x)*(t.y-c.y)-(n.y-t.y)*(t.x-c.x))/p;if(o>=0&&o<=1&&r>=0&&r<=1)return{x:t.x+o*(n.x-t.x),y:t.y+o*(n.y-t.y)}}},p=t("uUYM"),o=function(a){return{p1:Object(p.g)(a),p2:Object(p.h)(a)}},r=function(a){return{p1:Object(p.h)(a),p2:Object(p.c)(a)}},u=function(a){return{p1:Object(p.b)(a),p2:Object(p.c)(a)}},m=function(a){return{p1:Object(p.g)(a),p2:Object(p.b)(a)}},b=t("1Ldg"),j=function(a,e){var t=e.x,n=e.y,c=Object(b.a)(a),p=c.x,j=c.y,i=function(a){return{top:o(a),right:r(a),bottom:u(a),left:m(a)}}(a);p<=t&&delete i.left,p>=t&&delete i.right,j<=n&&delete i.top,j>=n&&delete i.bottom;var O={p1:c,p2:e};for(var N in i){var l=s(i[N],O);if(l)return l}},i=function(a){return"string"===typeof a};e.a=function(a,e){var t=a.boxes,s=e.src,p=e.dst,o={},r=t[s],u=t[p];if(!Object(c.a)(r)||!Object(c.a)(u))return o;var m=i(s)?Object(n.a)(r):s,b=i(p)?Object(n.a)(u):p;return o.src=j(r,b),o.dst=j(u,m),o}},ErhN:function(a,e,t){"use strict";var n=t("eOWL"),c=t("zJT+");a.exports=function(a,e,t){e in a?n.f(a,e,c(0,t)):a[e]=t}},Erm7:function(a,e,t){"use strict";var n=t("mXGw"),c=t.n(n).a.createElement;e.a=function(a){return function(e){return function(t){return c(e,a(t))}}}},K4BZ:function(a,e,t){"use strict";var n=function(a){return"number"===typeof a};e.a=function(a){return a&&n(a.x)&&n(a.y)&&n(a.width)&&n(a.height)}},Rbzu:function(a,e,t){"use strict";t.d(e,"a",function(){return m});var n=t("tvLF"),c=t.n(n),s=t("s4hn"),p=t.n(s),o=t("1qCV"),r=t.n(o),u=t("azxR");function m(a){for(var e=1;e<arguments.length;e++){var t=null!=arguments[e]?arguments[e]:{},n=r()(t);"function"===typeof p.a&&(n=n.concat(p()(t).filter(function(a){return c()(t,a).enumerable}))),n.forEach(function(e){Object(u.a)(a,e,t[e])})}return a}},SY1S:function(a,e,t){a.exports=t("UR6/")},SvME:function(a,e,t){var n=t("lBnu"),c=t("/Lgp"),s=t("T/1i"),p=t("kBaS").f;a.exports=function(a){return function(e){for(var t,o=s(e),r=c(o),u=r.length,m=0,b=[];u>m;)t=r[m++],n&&!p.call(o,t)||b.push(a?[t,o[t]]:o[t]);return b}}},T3Wj:function(a,e,t){(window.__NEXT_P=window.__NEXT_P||[]).push(["/demos/arrowheads",function(){return t("bhYv")}])},"UR6/":function(a,e,t){t("k/kI"),t("WwSA"),a.exports=t("uMC/")},Vlwe:function(a,e,t){t("WwSA"),t("2agv"),a.exports=t("TaGV").Array.from},ZC2r:function(a,e,t){"use strict";var n=t("z3IF"),c=t("Rbzu"),s=t("2xrT"),p=t.n(s),o=t("mXGw"),r=t.n(o),u=t("K4BZ"),m=t("s20r"),b=t.n(m);var j=t("8ET1"),i=t.n(j),O=t("7X5e"),N=t.n(O);function l(a){return function(a){if(b()(a)){for(var e=0,t=new Array(a.length);e<a.length;e++)t[e]=a[e];return t}}(a)||function(a){if(N()(Object(a))||"[object Arguments]"===Object.prototype.toString.call(a))return i()(a)}(a)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance")}()}var k=t("uUYM"),d=function(a){return function(e){return a.apply(void 0,l(e))}},f=d(Math.min),h=d(Math.max),g=r.a.createElement,v=p.a,y=Object.prototype.toString,x={x:0,y:0,width:0,height:0},w=function(a){return Object(u.a)(a)?a:Object(c.a)({},x,a)},M=function(a){var e=v(a).map(w);return 0===e.length?{width:0,height:0}:function(a){return e=f(a.map(k.f)),t=h(a.map(k.e)),n=h(a.map(k.a)),{x:c=f(a.map(k.d)),y:e,width:t-c,height:n-e};var e,t,n,c}(e)},E=function(a,e){var t=e.padding,n=Object(o.useMemo)(function(){return M(a)},[a]);return Object(o.useMemo)(function(){var a=[Object(k.e)(n),Object(k.a)(n)],e=a[0],c=a[1],s=function(a,e){return"function"===typeof e?e(a):"[object Object]"===y.call(e)?e:{right:0,bottom:0}}(n,t);return{width:e+s.right,height:c+s.bottom}},[n,t])};e.a=function(){var a=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return function(e){return function(t){var c=E(t.boxes,a),s=c.width,p=c.height;return g(e,Object(n.a)({},t,{width:s,height:p}))}}}},azxR:function(a,e,t){"use strict";t.d(e,"a",function(){return s});var n=t("hHgk"),c=t.n(n);function s(a,e,t){return e in a?c()(a,e,{value:t,enumerable:!0,configurable:!0,writable:!0}):a[e]=t,a}},bhYv:function(a,e,t){"use strict";t.r(e);var n=t("z3IF"),c=t("2Fjn"),s=t("mXGw"),p=t.n(s),o=t("SAVP"),r=(t("91U6"),t("sKTV")),u=t("Erm7"),m=t("1VIh"),b=t("CcWs"),j=t("ZC2r"),i=t("lpvu"),O=t("8foj"),N=t("hDBU"),l=function(a,e){var t=arguments.length>2&&void 0!==arguments[2]?arguments[2]:1;return a?e.map(function(a){return t-a}):e},k=p.a.createElement,d=Math.ceil,f=function(a){return function(e){var t=e.id,n=e.markerAnchor,s=Object(c.a)(e,["id","markerAnchor"]),p=s.width,o=s.height,r=s.tip,u=void 0===r?1:r,m=s.flip,b=l(m,[n,u]),j=Object(N.a)(b,2),i=j[0],O=j[1],f=i||O,h=d(o/2);return k("marker",{id:t,markerWidth:p,markerHeight:o,viewBox:"0 ".concat(-h," ").concat(p,", ").concat(o," "),refX:f*p,refY:"0",markerUnits:"strokeWidth",orient:"auto"},k(a,s))}},h=p.a.createElement,g=Math.ceil,v=function(a){var e=a.id,t=a.width,c=a.height,p=Object(s.useMemo)(function(){return function(a,e){var t=g(e/2);return{x1:a,y1:-t,x2:a,y2:t}}(t,c)},[c,t]);return h("line",Object(n.a)({id:e},p,{stroke:"#777",strokeWidth:2}))},y=function(a){var e=a.x,t=a.y;return"".concat(e,",").concat(t)},x=p.a.createElement,w=Math.ceil,M=function(a){var e=a.id,t=a.width,n=a.height,c=a.flip,p=Object(s.useMemo)(function(){return function(a,e,t){var n=l(t,[0,a],a),c=Object(N.a)(n,2),s=c[0],p=c[1],o=w(e/2);return[{x:p,y:0},{x:s,y:o},{x:s,y:-o}].map(y)}(t,n,c)},[n,c,t]);return x("polyline",{id:e,points:p,fill:"#777"})},E=p.a.createElement,T=Object(r.a)(Object(u.a)(Object(m.a)(b.a)),Object(j.a)({padding:function(a){return{right:a.x,bottom:a.y}}}))(i.a),S=f(v),C=f(M),A=function(){return E(T,{nodes:[{id:"ping"},{id:"pong"}],boxes:{ping:{x:50,y:40,width:20,height:20},pong:{x:150,y:40,width:20,height:20}},renderSvgNode:function(a){var e=a.id,t=a.box;return E("rect",Object(n.a)({key:e},t,{fill:"Chocolate"}))},connections:[{id:"ping->pong",src:"ping",dst:"pong"}],renderConnection:function(a){return E(O.a,Object(n.a)({key:a.id},a,{markerStart:E(S,{width:6,height:6,flip:!0}),markerEnd:E(C,{width:6,height:6})}))}})};t.d(e,"default",function(){return W});p.a.createElement;var V={},B="wrapper";function W(a){var e=a.components,t=Object(c.a)(a,["components"]);return Object(o.a)(B,Object(n.a)({},V,t,{components:e,mdxType:"MDXLayout"}),Object(o.a)("h1",null,"Arrowheads"),Object(o.a)("h2",null,"Render"),Object(o.a)(A,{mdxType:"Graph"}),Object(o.a)("h2",null,"Source"),Object(o.a)("pre",{className:"language-jsx"},Object(o.a)("code",Object(n.a)({parentName:"pre"},{className:"language-jsx"}),Object(o.a)("span",Object(n.a)({parentName:"code"},{className:"token keyword module"}),"import")," ",Object(o.a)("span",Object(n.a)({parentName:"code"},{className:"token maybe-class-name"}),"React")," ",Object(o.a)("span",Object(n.a)({parentName:"code"},{className:"token keyword module"}),"from")," ",Object(o.a)("span",Object(n.a)({parentName:"code"},{className:"token string"}),"'react'"),Object(o.a)("span",Object(n.a)({parentName:"code"},{className:"token punctuation"}),";"),"\n",Object(o.a)("span",Object(n.a)({parentName:"code"},{className:"token keyword module"}),"import")," ",Object(o.a)("span",Object(n.a)({parentName:"code"},{className:"token punctuation"}),"{"),"\n  ",Object(o.a)("span",Object(n.a)({parentName:"code"},{className:"token maybe-class-name"}),"Graph"),Object(o.a)("span",Object(n.a)({parentName:"code"},{className:"token punctuation"}),","),"\n  compose",Object(o.a)("span",Object(n.a)({parentName:"code"},{className:"token punctuation"}),","),"\n  withViewportSize",Object(o.a)("span",Object(n.a)({parentName:"code"},{className:"token punctuation"}),","),"\n  withLayout",Object(o.a)("span",Object(n.a)({parentName:"code"},{className:"token punctuation"}),","),"\n  connectionLayout",Object(o.a)("span",Object(n.a)({parentName:"code"},{className:"token punctuation"}),","),"\n  chopBox",Object(o.a)("span",Object(n.a)({parentName:"code"},{className:"token punctuation"}),","),"\n",Object(o.a)("span",Object(n.a)({parentName:"code"},{className:"token punctuation"}),"}")," ",Object(o.a)("span",Object(n.a)({parentName:"code"},{className:"token keyword module"}),"from")," ",Object(o.a)("span",Object(n.a)({parentName:"code"},{className:"token string"}),"'@regraph/graph'"),Object(o.a)("span",Object(n.a)({parentName:"code"},{className:"token punctuation"}),";"),"\n",Object(o.a)("span",Object(n.a)({parentName:"code"},{className:"token keyword module"}),"import")," ",Object(o.a)("span",Object(n.a)({parentName:"code"},{className:"token punctuation"}),"{")," ",Object(o.a)("span",Object(n.a)({parentName:"code"},{className:"token maybe-class-name"}),"Line")," ",Object(o.a)("span",Object(n.a)({parentName:"code"},{className:"token punctuation"}),"}")," ",Object(o.a)("span",Object(n.a)({parentName:"code"},{className:"token keyword module"}),"from")," ",Object(o.a)("span",Object(n.a)({parentName:"code"},{className:"token string"}),"'@regraph/connections'"),Object(o.a)("span",Object(n.a)({parentName:"code"},{className:"token punctuation"}),";"),"\n",Object(o.a)("span",Object(n.a)({parentName:"code"},{className:"token keyword module"}),"import")," ",Object(o.a)("span",Object(n.a)({parentName:"code"},{className:"token punctuation"}),"{")," ",Object(o.a)("span",Object(n.a)({parentName:"code"},{className:"token maybe-class-name"}),"Triangle"),Object(o.a)("span",Object(n.a)({parentName:"code"},{className:"token punctuation"}),",")," ",Object(o.a)("span",Object(n.a)({parentName:"code"},{className:"token maybe-class-name"}),"Perp"),Object(o.a)("span",Object(n.a)({parentName:"code"},{className:"token punctuation"}),",")," withMarker ",Object(o.a)("span",Object(n.a)({parentName:"code"},{className:"token punctuation"}),"}")," ",Object(o.a)("span",Object(n.a)({parentName:"code"},{className:"token keyword module"}),"from")," ",Object(o.a)("span",Object(n.a)({parentName:"code"},{className:"token string"}),"'@regraph/arrowheads'"),Object(o.a)("span",Object(n.a)({parentName:"code"},{className:"token punctuation"}),";"),"\n\n",Object(o.a)("span",Object(n.a)({parentName:"code"},{className:"token keyword"}),"const")," ",Object(o.a)("span",Object(n.a)({parentName:"code"},{className:"token maybe-class-name"}),"MyGraph")," ",Object(o.a)("span",Object(n.a)({parentName:"code"},{className:"token operator"}),"=")," ",Object(o.a)("span",Object(n.a)({parentName:"code"},{className:"token function"}),"compose"),Object(o.a)("span",Object(n.a)({parentName:"code"},{className:"token punctuation"}),"("),"\n  ",Object(o.a)("span",Object(n.a)({parentName:"code"},{className:"token function"}),"withLayout"),Object(o.a)("span",Object(n.a)({parentName:"code"},{className:"token punctuation"}),"("),Object(o.a)("span",Object(n.a)({parentName:"code"},{className:"token function"}),"connectionLayout"),Object(o.a)("span",Object(n.a)({parentName:"code"},{className:"token punctuation"}),"("),"chopBox",Object(o.a)("span",Object(n.a)({parentName:"code"},{className:"token punctuation"}),")"),Object(o.a)("span",Object(n.a)({parentName:"code"},{className:"token punctuation"}),")"),Object(o.a)("span",Object(n.a)({parentName:"code"},{className:"token punctuation"}),","),"\n  ",Object(o.a)("span",Object(n.a)({parentName:"code"},{className:"token function"}),"withViewportSize"),Object(o.a)("span",Object(n.a)({parentName:"code"},{className:"token punctuation"}),"("),Object(o.a)("span",Object(n.a)({parentName:"code"},{className:"token punctuation"}),"{")," ",Object(o.a)("span",Object(n.a)({parentName:"code"},{className:"token function-variable function"}),"padding"),Object(o.a)("span",Object(n.a)({parentName:"code"},{className:"token punctuation"}),":")," ",Object(o.a)("span",Object(n.a)({parentName:"code"},{className:"token punctuation"}),"("),Object(o.a)("span",Object(n.a)({parentName:"code"},{className:"token parameter"}),Object(o.a)("span",Object(n.a)({parentName:"span"},{className:"token punctuation"}),"{")," x",Object(o.a)("span",Object(n.a)({parentName:"span"},{className:"token punctuation"}),",")," y ",Object(o.a)("span",Object(n.a)({parentName:"span"},{className:"token punctuation"}),"}")),Object(o.a)("span",Object(n.a)({parentName:"code"},{className:"token punctuation"}),")")," ",Object(o.a)("span",Object(n.a)({parentName:"code"},{className:"token arrow operator"}),"=>")," ",Object(o.a)("span",Object(n.a)({parentName:"code"},{className:"token punctuation"}),"("),Object(o.a)("span",Object(n.a)({parentName:"code"},{className:"token punctuation"}),"{")," right",Object(o.a)("span",Object(n.a)({parentName:"code"},{className:"token punctuation"}),":")," x",Object(o.a)("span",Object(n.a)({parentName:"code"},{className:"token punctuation"}),",")," bottom",Object(o.a)("span",Object(n.a)({parentName:"code"},{className:"token punctuation"}),":")," y ",Object(o.a)("span",Object(n.a)({parentName:"code"},{className:"token punctuation"}),"}"),Object(o.a)("span",Object(n.a)({parentName:"code"},{className:"token punctuation"}),")")," ",Object(o.a)("span",Object(n.a)({parentName:"code"},{className:"token punctuation"}),"}"),Object(o.a)("span",Object(n.a)({parentName:"code"},{className:"token punctuation"}),")"),"\n",Object(o.a)("span",Object(n.a)({parentName:"code"},{className:"token punctuation"}),")"),Object(o.a)("span",Object(n.a)({parentName:"code"},{className:"token punctuation"}),"("),Object(o.a)("span",Object(n.a)({parentName:"code"},{className:"token maybe-class-name"}),"Graph"),Object(o.a)("span",Object(n.a)({parentName:"code"},{className:"token punctuation"}),")"),Object(o.a)("span",Object(n.a)({parentName:"code"},{className:"token punctuation"}),";"),"\n\n",Object(o.a)("span",Object(n.a)({parentName:"code"},{className:"token keyword"}),"const")," ",Object(o.a)("span",Object(n.a)({parentName:"code"},{className:"token maybe-class-name"}),"PerpMarker")," ",Object(o.a)("span",Object(n.a)({parentName:"code"},{className:"token operator"}),"=")," ",Object(o.a)("span",Object(n.a)({parentName:"code"},{className:"token function"}),"withMarker"),Object(o.a)("span",Object(n.a)({parentName:"code"},{className:"token punctuation"}),"("),Object(o.a)("span",Object(n.a)({parentName:"code"},{className:"token maybe-class-name"}),"Perp"),Object(o.a)("span",Object(n.a)({parentName:"code"},{className:"token punctuation"}),")"),Object(o.a)("span",Object(n.a)({parentName:"code"},{className:"token punctuation"}),";"),"\n",Object(o.a)("span",Object(n.a)({parentName:"code"},{className:"token keyword"}),"const")," ",Object(o.a)("span",Object(n.a)({parentName:"code"},{className:"token maybe-class-name"}),"TriangleMarker")," ",Object(o.a)("span",Object(n.a)({parentName:"code"},{className:"token operator"}),"=")," ",Object(o.a)("span",Object(n.a)({parentName:"code"},{className:"token function"}),"withMarker"),Object(o.a)("span",Object(n.a)({parentName:"code"},{className:"token punctuation"}),"("),Object(o.a)("span",Object(n.a)({parentName:"code"},{className:"token maybe-class-name"}),"Triangle"),Object(o.a)("span",Object(n.a)({parentName:"code"},{className:"token punctuation"}),")"),Object(o.a)("span",Object(n.a)({parentName:"code"},{className:"token punctuation"}),";"),"\n\n",Object(o.a)("span",Object(n.a)({parentName:"code"},{className:"token keyword module"}),"export")," ",Object(o.a)("span",Object(n.a)({parentName:"code"},{className:"token keyword module"}),"default")," ",Object(o.a)("span",Object(n.a)({parentName:"code"},{className:"token punctuation"}),"("),Object(o.a)("span",Object(n.a)({parentName:"code"},{className:"token punctuation"}),")")," ",Object(o.a)("span",Object(n.a)({parentName:"code"},{className:"token arrow operator"}),"=>")," ",Object(o.a)("span",Object(n.a)({parentName:"code"},{className:"token punctuation"}),"("),"\n  ",Object(o.a)("span",Object(n.a)({parentName:"code"},{className:"token tag"}),Object(o.a)("span",Object(n.a)({parentName:"span"},{className:"token tag"}),Object(o.a)("span",Object(n.a)({parentName:"span"},{className:"token punctuation"}),"<"),Object(o.a)("span",Object(n.a)({parentName:"span"},{className:"token class-name"}),"MyGraph")),"\n    ",Object(o.a)("span",Object(n.a)({parentName:"span"},{className:"token attr-name"}),"nodes"),Object(o.a)("span",Object(n.a)({parentName:"span"},{className:"token script language-javascript"}),Object(o.a)("span",Object(n.a)({parentName:"span"},{className:"token script-punctuation punctuation"}),"="),Object(o.a)("span",Object(n.a)({parentName:"span"},{className:"token punctuation"}),"{"),Object(o.a)("span",Object(n.a)({parentName:"span"},{className:"token punctuation"}),"["),Object(o.a)("span",Object(n.a)({parentName:"span"},{className:"token punctuation"}),"{")," id",Object(o.a)("span",Object(n.a)({parentName:"span"},{className:"token punctuation"}),":")," ",Object(o.a)("span",Object(n.a)({parentName:"span"},{className:"token string"}),"'ping'")," ",Object(o.a)("span",Object(n.a)({parentName:"span"},{className:"token punctuation"}),"}"),Object(o.a)("span",Object(n.a)({parentName:"span"},{className:"token punctuation"}),",")," ",Object(o.a)("span",Object(n.a)({parentName:"span"},{className:"token punctuation"}),"{")," id",Object(o.a)("span",Object(n.a)({parentName:"span"},{className:"token punctuation"}),":")," ",Object(o.a)("span",Object(n.a)({parentName:"span"},{className:"token string"}),"'pong'")," ",Object(o.a)("span",Object(n.a)({parentName:"span"},{className:"token punctuation"}),"}"),Object(o.a)("span",Object(n.a)({parentName:"span"},{className:"token punctuation"}),"]"),Object(o.a)("span",Object(n.a)({parentName:"span"},{className:"token punctuation"}),"}")),"\n    ",Object(o.a)("span",Object(n.a)({parentName:"span"},{className:"token attr-name"}),"boxes"),Object(o.a)("span",Object(n.a)({parentName:"span"},{className:"token script language-javascript"}),Object(o.a)("span",Object(n.a)({parentName:"span"},{className:"token script-punctuation punctuation"}),"="),Object(o.a)("span",Object(n.a)({parentName:"span"},{className:"token punctuation"}),"{"),Object(o.a)("span",Object(n.a)({parentName:"span"},{className:"token punctuation"}),"{"),"\n      ping",Object(o.a)("span",Object(n.a)({parentName:"span"},{className:"token punctuation"}),":")," ",Object(o.a)("span",Object(n.a)({parentName:"span"},{className:"token punctuation"}),"{")," x",Object(o.a)("span",Object(n.a)({parentName:"span"},{className:"token punctuation"}),":")," ",Object(o.a)("span",Object(n.a)({parentName:"span"},{className:"token number"}),"50"),Object(o.a)("span",Object(n.a)({parentName:"span"},{className:"token punctuation"}),",")," y",Object(o.a)("span",Object(n.a)({parentName:"span"},{className:"token punctuation"}),":")," ",Object(o.a)("span",Object(n.a)({parentName:"span"},{className:"token number"}),"40"),Object(o.a)("span",Object(n.a)({parentName:"span"},{className:"token punctuation"}),",")," width",Object(o.a)("span",Object(n.a)({parentName:"span"},{className:"token punctuation"}),":")," ",Object(o.a)("span",Object(n.a)({parentName:"span"},{className:"token number"}),"20"),Object(o.a)("span",Object(n.a)({parentName:"span"},{className:"token punctuation"}),",")," height",Object(o.a)("span",Object(n.a)({parentName:"span"},{className:"token punctuation"}),":")," ",Object(o.a)("span",Object(n.a)({parentName:"span"},{className:"token number"}),"20")," ",Object(o.a)("span",Object(n.a)({parentName:"span"},{className:"token punctuation"}),"}"),Object(o.a)("span",Object(n.a)({parentName:"span"},{className:"token punctuation"}),","),"\n      pong",Object(o.a)("span",Object(n.a)({parentName:"span"},{className:"token punctuation"}),":")," ",Object(o.a)("span",Object(n.a)({parentName:"span"},{className:"token punctuation"}),"{")," x",Object(o.a)("span",Object(n.a)({parentName:"span"},{className:"token punctuation"}),":")," ",Object(o.a)("span",Object(n.a)({parentName:"span"},{className:"token number"}),"150"),Object(o.a)("span",Object(n.a)({parentName:"span"},{className:"token punctuation"}),",")," y",Object(o.a)("span",Object(n.a)({parentName:"span"},{className:"token punctuation"}),":")," ",Object(o.a)("span",Object(n.a)({parentName:"span"},{className:"token number"}),"40"),Object(o.a)("span",Object(n.a)({parentName:"span"},{className:"token punctuation"}),",")," width",Object(o.a)("span",Object(n.a)({parentName:"span"},{className:"token punctuation"}),":")," ",Object(o.a)("span",Object(n.a)({parentName:"span"},{className:"token number"}),"20"),Object(o.a)("span",Object(n.a)({parentName:"span"},{className:"token punctuation"}),",")," height",Object(o.a)("span",Object(n.a)({parentName:"span"},{className:"token punctuation"}),":")," ",Object(o.a)("span",Object(n.a)({parentName:"span"},{className:"token number"}),"20")," ",Object(o.a)("span",Object(n.a)({parentName:"span"},{className:"token punctuation"}),"}"),Object(o.a)("span",Object(n.a)({parentName:"span"},{className:"token punctuation"}),","),"\n    ",Object(o.a)("span",Object(n.a)({parentName:"span"},{className:"token punctuation"}),"}"),Object(o.a)("span",Object(n.a)({parentName:"span"},{className:"token punctuation"}),"}")),"\n    ",Object(o.a)("span",Object(n.a)({parentName:"span"},{className:"token attr-name"}),"renderSvgNode"),Object(o.a)("span",Object(n.a)({parentName:"span"},{className:"token script language-javascript"}),Object(o.a)("span",Object(n.a)({parentName:"span"},{className:"token script-punctuation punctuation"}),"="),Object(o.a)("span",Object(n.a)({parentName:"span"},{className:"token punctuation"}),"{"),Object(o.a)("span",Object(n.a)({parentName:"span"},{className:"token punctuation"}),"("),Object(o.a)("span",Object(n.a)({parentName:"span"},{className:"token parameter"}),Object(o.a)("span",Object(n.a)({parentName:"span"},{className:"token punctuation"}),"{")," id",Object(o.a)("span",Object(n.a)({parentName:"span"},{className:"token punctuation"}),",")," box ",Object(o.a)("span",Object(n.a)({parentName:"span"},{className:"token punctuation"}),"}")),Object(o.a)("span",Object(n.a)({parentName:"span"},{className:"token punctuation"}),")")," ",Object(o.a)("span",Object(n.a)({parentName:"span"},{className:"token arrow operator"}),"=>")," ",Object(o.a)("span",Object(n.a)({parentName:"span"},{className:"token tag"}),Object(o.a)("span",Object(n.a)({parentName:"span"},{className:"token tag"}),Object(o.a)("span",Object(n.a)({parentName:"span"},{className:"token punctuation"}),"<"),"rect")," ",Object(o.a)("span",Object(n.a)({parentName:"span"},{className:"token attr-name"}),"key"),Object(o.a)("span",Object(n.a)({parentName:"span"},{className:"token script language-javascript"}),Object(o.a)("span",Object(n.a)({parentName:"span"},{className:"token script-punctuation punctuation"}),"="),Object(o.a)("span",Object(n.a)({parentName:"span"},{className:"token punctuation"}),"{"),"id",Object(o.a)("span",Object(n.a)({parentName:"span"},{className:"token punctuation"}),"}"))," ",Object(o.a)("span",Object(n.a)({parentName:"span"},{className:"token spread"}),Object(o.a)("span",Object(n.a)({parentName:"span"},{className:"token punctuation"}),"{"),Object(o.a)("span",Object(n.a)({parentName:"span"},{className:"token punctuation"}),"..."),Object(o.a)("span",Object(n.a)({parentName:"span"},{className:"token attr-value"}),"box"),Object(o.a)("span",Object(n.a)({parentName:"span"},{className:"token punctuation"}),"}"))," ",Object(o.a)("span",Object(n.a)({parentName:"span"},{className:"token attr-name"}),"fill"),Object(o.a)("span",Object(n.a)({parentName:"span"},{className:"token attr-value"}),Object(o.a)("span",Object(n.a)({parentName:"span"},{className:"token punctuation"}),"="),Object(o.a)("span",Object(n.a)({parentName:"span"},{className:"token punctuation"}),'"'),"Chocolate",Object(o.a)("span",Object(n.a)({parentName:"span"},{className:"token punctuation"}),'"'))," ",Object(o.a)("span",Object(n.a)({parentName:"span"},{className:"token punctuation"}),"/>")),Object(o.a)("span",Object(n.a)({parentName:"span"},{className:"token punctuation"}),"}")),"\n    ",Object(o.a)("span",Object(n.a)({parentName:"span"},{className:"token attr-name"}),"connections"),Object(o.a)("span",Object(n.a)({parentName:"span"},{className:"token script language-javascript"}),Object(o.a)("span",Object(n.a)({parentName:"span"},{className:"token script-punctuation punctuation"}),"="),Object(o.a)("span",Object(n.a)({parentName:"span"},{className:"token punctuation"}),"{"),Object(o.a)("span",Object(n.a)({parentName:"span"},{className:"token punctuation"}),"["),"\n      ",Object(o.a)("span",Object(n.a)({parentName:"span"},{className:"token punctuation"}),"{"),"\n        id",Object(o.a)("span",Object(n.a)({parentName:"span"},{className:"token punctuation"}),":")," ",Object(o.a)("span",Object(n.a)({parentName:"span"},{className:"token string"}),"'ping->pong'"),Object(o.a)("span",Object(n.a)({parentName:"span"},{className:"token punctuation"}),","),"\n        src",Object(o.a)("span",Object(n.a)({parentName:"span"},{className:"token punctuation"}),":")," ",Object(o.a)("span",Object(n.a)({parentName:"span"},{className:"token string"}),"'ping'"),Object(o.a)("span",Object(n.a)({parentName:"span"},{className:"token punctuation"}),","),"\n        dst",Object(o.a)("span",Object(n.a)({parentName:"span"},{className:"token punctuation"}),":")," ",Object(o.a)("span",Object(n.a)({parentName:"span"},{className:"token string"}),"'pong'"),Object(o.a)("span",Object(n.a)({parentName:"span"},{className:"token punctuation"}),","),"\n      ",Object(o.a)("span",Object(n.a)({parentName:"span"},{className:"token punctuation"}),"}"),Object(o.a)("span",Object(n.a)({parentName:"span"},{className:"token punctuation"}),","),"\n    ",Object(o.a)("span",Object(n.a)({parentName:"span"},{className:"token punctuation"}),"]"),Object(o.a)("span",Object(n.a)({parentName:"span"},{className:"token punctuation"}),"}")),"\n    ",Object(o.a)("span",Object(n.a)({parentName:"span"},{className:"token attr-name"}),"renderConnection"),Object(o.a)("span",Object(n.a)({parentName:"span"},{className:"token script language-javascript"}),Object(o.a)("span",Object(n.a)({parentName:"span"},{className:"token script-punctuation punctuation"}),"="),Object(o.a)("span",Object(n.a)({parentName:"span"},{className:"token punctuation"}),"{"),Object(o.a)("span",Object(n.a)({parentName:"span"},{className:"token parameter"}),"props")," ",Object(o.a)("span",Object(n.a)({parentName:"span"},{className:"token arrow operator"}),"=>")," ",Object(o.a)("span",Object(n.a)({parentName:"span"},{className:"token punctuation"}),"("),"\n      ",Object(o.a)("span",Object(n.a)({parentName:"span"},{className:"token tag"}),Object(o.a)("span",Object(n.a)({parentName:"span"},{className:"token tag"}),Object(o.a)("span",Object(n.a)({parentName:"span"},{className:"token punctuation"}),"<"),Object(o.a)("span",Object(n.a)({parentName:"span"},{className:"token class-name"}),"Line")),"\n        ",Object(o.a)("span",Object(n.a)({parentName:"span"},{className:"token attr-name"}),"key"),Object(o.a)("span",Object(n.a)({parentName:"span"},{className:"token script language-javascript"}),Object(o.a)("span",Object(n.a)({parentName:"span"},{className:"token script-punctuation punctuation"}),"="),Object(o.a)("span",Object(n.a)({parentName:"span"},{className:"token punctuation"}),"{"),"props",Object(o.a)("span",Object(n.a)({parentName:"span"},{className:"token punctuation"}),"."),Object(o.a)("span",Object(n.a)({parentName:"span"},{className:"token property-access"}),"id"),Object(o.a)("span",Object(n.a)({parentName:"span"},{className:"token punctuation"}),"}")),"\n        ",Object(o.a)("span",Object(n.a)({parentName:"span"},{className:"token spread"}),Object(o.a)("span",Object(n.a)({parentName:"span"},{className:"token punctuation"}),"{"),Object(o.a)("span",Object(n.a)({parentName:"span"},{className:"token punctuation"}),"..."),Object(o.a)("span",Object(n.a)({parentName:"span"},{className:"token attr-value"}),"props"),Object(o.a)("span",Object(n.a)({parentName:"span"},{className:"token punctuation"}),"}")),"\n        ",Object(o.a)("span",Object(n.a)({parentName:"span"},{className:"token attr-name"}),"markerStart"),Object(o.a)("span",Object(n.a)({parentName:"span"},{className:"token script language-javascript"}),Object(o.a)("span",Object(n.a)({parentName:"span"},{className:"token script-punctuation punctuation"}),"="),Object(o.a)("span",Object(n.a)({parentName:"span"},{className:"token punctuation"}),"{"),Object(o.a)("span",Object(n.a)({parentName:"span"},{className:"token tag"}),Object(o.a)("span",Object(n.a)({parentName:"span"},{className:"token tag"}),Object(o.a)("span",Object(n.a)({parentName:"span"},{className:"token punctuation"}),"<"),Object(o.a)("span",Object(n.a)({parentName:"span"},{className:"token class-name"}),"PerpMarker"))," ",Object(o.a)("span",Object(n.a)({parentName:"span"},{className:"token attr-name"}),"width"),Object(o.a)("span",Object(n.a)({parentName:"span"},{className:"token script language-javascript"}),Object(o.a)("span",Object(n.a)({parentName:"span"},{className:"token script-punctuation punctuation"}),"="),Object(o.a)("span",Object(n.a)({parentName:"span"},{className:"token punctuation"}),"{"),Object(o.a)("span",Object(n.a)({parentName:"span"},{className:"token number"}),"6"),Object(o.a)("span",Object(n.a)({parentName:"span"},{className:"token punctuation"}),"}"))," ",Object(o.a)("span",Object(n.a)({parentName:"span"},{className:"token attr-name"}),"height"),Object(o.a)("span",Object(n.a)({parentName:"span"},{className:"token script language-javascript"}),Object(o.a)("span",Object(n.a)({parentName:"span"},{className:"token script-punctuation punctuation"}),"="),Object(o.a)("span",Object(n.a)({parentName:"span"},{className:"token punctuation"}),"{"),Object(o.a)("span",Object(n.a)({parentName:"span"},{className:"token number"}),"6"),Object(o.a)("span",Object(n.a)({parentName:"span"},{className:"token punctuation"}),"}"))," ",Object(o.a)("span",Object(n.a)({parentName:"span"},{className:"token attr-name"}),"flip")," ",Object(o.a)("span",Object(n.a)({parentName:"span"},{className:"token punctuation"}),"/>")),Object(o.a)("span",Object(n.a)({parentName:"span"},{className:"token punctuation"}),"}")),"\n        ",Object(o.a)("span",Object(n.a)({parentName:"span"},{className:"token attr-name"}),"markerEnd"),Object(o.a)("span",Object(n.a)({parentName:"span"},{className:"token script language-javascript"}),Object(o.a)("span",Object(n.a)({parentName:"span"},{className:"token script-punctuation punctuation"}),"="),Object(o.a)("span",Object(n.a)({parentName:"span"},{className:"token punctuation"}),"{"),Object(o.a)("span",Object(n.a)({parentName:"span"},{className:"token tag"}),Object(o.a)("span",Object(n.a)({parentName:"span"},{className:"token tag"}),Object(o.a)("span",Object(n.a)({parentName:"span"},{className:"token punctuation"}),"<"),Object(o.a)("span",Object(n.a)({parentName:"span"},{className:"token class-name"}),"TriangleMarker"))," ",Object(o.a)("span",Object(n.a)({parentName:"span"},{className:"token attr-name"}),"width"),Object(o.a)("span",Object(n.a)({parentName:"span"},{className:"token script language-javascript"}),Object(o.a)("span",Object(n.a)({parentName:"span"},{className:"token script-punctuation punctuation"}),"="),Object(o.a)("span",Object(n.a)({parentName:"span"},{className:"token punctuation"}),"{"),Object(o.a)("span",Object(n.a)({parentName:"span"},{className:"token number"}),"6"),Object(o.a)("span",Object(n.a)({parentName:"span"},{className:"token punctuation"}),"}"))," ",Object(o.a)("span",Object(n.a)({parentName:"span"},{className:"token attr-name"}),"height"),Object(o.a)("span",Object(n.a)({parentName:"span"},{className:"token script language-javascript"}),Object(o.a)("span",Object(n.a)({parentName:"span"},{className:"token script-punctuation punctuation"}),"="),Object(o.a)("span",Object(n.a)({parentName:"span"},{className:"token punctuation"}),"{"),Object(o.a)("span",Object(n.a)({parentName:"span"},{className:"token number"}),"6"),Object(o.a)("span",Object(n.a)({parentName:"span"},{className:"token punctuation"}),"}"))," ",Object(o.a)("span",Object(n.a)({parentName:"span"},{className:"token punctuation"}),"/>")),Object(o.a)("span",Object(n.a)({parentName:"span"},{className:"token punctuation"}),"}")),"\n      ",Object(o.a)("span",Object(n.a)({parentName:"span"},{className:"token punctuation"}),"/>")),"\n    ",Object(o.a)("span",Object(n.a)({parentName:"span"},{className:"token punctuation"}),")"),Object(o.a)("span",Object(n.a)({parentName:"span"},{className:"token punctuation"}),"}")),"\n  ",Object(o.a)("span",Object(n.a)({parentName:"span"},{className:"token punctuation"}),"/>")),"\n",Object(o.a)("span",Object(n.a)({parentName:"code"},{className:"token punctuation"}),")"),Object(o.a)("span",Object(n.a)({parentName:"code"},{className:"token punctuation"}),";"),"\n")))}W.isMDXComponent=!0},hCWT:function(a,e,t){"use strict";var n=t("1Ldg");e.a=n.a},hDBU:function(a,e,t){"use strict";var n=t("s20r"),c=t.n(n);var s=t("SY1S"),p=t.n(s);function o(a,e){return function(a){if(c()(a))return a}(a)||function(a,e){var t=[],n=!0,c=!1,s=void 0;try{for(var o,r=p()(a);!(n=(o=r.next()).done)&&(t.push(o.value),!e||t.length!==e);n=!0);}catch(u){c=!0,s=u}finally{try{n||null==r.return||r.return()}finally{if(c)throw s}}return t}(a,e)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}()}t.d(e,"a",function(){return o})},lpvu:function(a,e,t){"use strict";var n=t("mXGw"),c=t.n(n),s=t("Rbzu"),p=t("W0B4"),o=t.n(p),r=c.a.createElement,u=function(a){var e=a.nodes,t=a.boxes,n=a.renderNode,p=a.graphProps,o=a.isHtml;return r(c.a.Fragment,null,e.map(function(a){var e=t[a.id];return n(Object(s.a)({},a,{box:e,isHtml:o}),p)}))};u.propTypes={boxes:o.a.object.isRequired,graphProps:o.a.object,isHtml:o.a.bool,nodes:o.a.array,renderNode:o.a.func.isRequired};var m=u,b=c.a.createElement,j=function(a){var e=a.connections,t=a.renderConnection,n=a.graphProps;return b(c.a.Fragment,null,e.map(function(a){return t(a,n)}))};j.propTypes={connections:o.a.array,graphProps:o.a.object,renderConnection:o.a.func.isRequired};var i=j,O=c.a.createElement,N=function(a,e){var t=arguments.length>2&&void 0!==arguments[2]&&arguments[2];return O(m,{nodes:e.nodes,boxes:e.boxes,renderNode:a,graphProps:e,isHtml:t})};e.a=function(a){var e=a.renderSvgNode,t=a.renderHtmlNode,n=a.renderConnection,c=a.width,s=a.height;return O("div",{style:{position:"relative",width:c,height:s},"data-regraph-graph":!0},O("svg",{style:{position:"relative",width:c,height:s}},n&&function(a){return O(i,{connections:a.connections,renderConnection:a.renderConnection,graphProps:a})}(a),e&&N(e,a)),t&&N(t,a,!0))}},md7T:function(a,e,t){t("6JBb"),a.exports=t("TaGV").Object.values},pL2a:function(a,e,t){a.exports=t("AXMb")},sKTV:function(a,e,t){"use strict";t.d(e,"a",function(){return m}),t.d(e,"b",function(){return b});t("Rbzu");var n=t("pL2a"),c=t.n(n),s=t("2xrT"),p=t.n(s),o=t("1qCV"),r=t.n(o),u=(t("K4BZ"),r.a),m=(p.a,c.a,function(){for(var a=arguments.length,e=new Array(a),t=0;t<a;t++)e[t]=arguments[t];return function(a){return e.reduceRight(function(a,e){return e(a)},a)}}),b=function(a){return void 0===a||null===a||(a.length?0===a.length:"object"===typeof a&&0===u(a).length)}},"uMC/":function(a,e,t){var n=t("ADe/"),c=t("VJcA");a.exports=t("TaGV").getIterator=function(a){var e=c(a);if("function"!=typeof e)throw TypeError(a+" is not iterable!");return n(e.call(a))}},uUYM:function(a,e,t){"use strict";t.d(e,"f",function(){return n}),t.d(e,"e",function(){return c}),t.d(e,"a",function(){return s}),t.d(e,"d",function(){return p}),t.d(e,"g",function(){return o}),t.d(e,"h",function(){return r}),t.d(e,"c",function(){return u}),t.d(e,"b",function(){return m});var n=function(a){return a.y},c=function(a){return a.x+a.width},s=function(a){return a.y+a.height},p=function(a){return a.x},o=function(a){return{x:p(a),y:n(a)}},r=function(a){return{x:c(a),y:n(a)}},u=function(a){return{x:c(a),y:s(a)}},m=function(a){return{x:p(a),y:s(a)}}}},[["T3Wj",1,0]]]);