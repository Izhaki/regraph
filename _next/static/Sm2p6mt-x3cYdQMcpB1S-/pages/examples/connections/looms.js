(window.webpackJsonp=window.webpackJsonp||[]).push([[15],{"33tr":function(n,t,e){"use strict";t.a=function(n){return{cx:n.center.x,cy:n.center.y,rx:n.rx,ry:n.ry}}},Hlz0:function(n,t,e){"use strict";e.r(t);var r=e("z3IF"),o=e("2Fjn"),c=e("mXGw"),s=e.n(c),i=e("/FXl"),a=e("qImK"),d=e("H3Hr"),p=e("8foj"),u=e("hsuq"),h=e("33tr"),l=e("RG6p"),m=s.a.createElement,x=Object(d.a)({normalizeConnections:!0,autoConnectionId:!0,looms:!0,extractBoxesFromNodes:!0,layout:!0,autoViewportSize:!0,connection:{type:p.a,strokeWidth:1,dst:{anchor:"chop-ellipse",marker:m(u.a,null)},src:{anchor:"chop-ellipse"}}}),f=function(n){var t=n.box;return m("ellipse",Object(h.a)(Object(l.a)(t)))},g=function(n,t){return{id:n,type:f,box:{x:50+100*t,y:40,width:30,height:30}}};e.d(t,"default",(function(){return j}));s.a.createElement;var w={},b="wrapper",v=Object(i.a)("h1",null,"Looms"),y=Object(i.a)(a.a,{code:"import React from 'react';\nimport { graph } from '@regraph/graph';\nimport { Line } from '@regraph/connections';\nimport { Triangle } from '@regraph/arrowheads';\nimport { fromRect, toSvgProps } from '@regraph/geo/ellipse';\n\nconst Graph = graph({\n  normalizeConnections: true,\n  autoConnectionId: true,\n  looms: true,\n  extractBoxesFromNodes: true,\n  layout: true,\n  autoViewportSize: true,\n  connection: {\n    type: Line,\n    strokeWidth: 1,\n    dst: { anchor: 'chop-ellipse', marker: <Triangle /> },\n    src: { anchor: 'chop-ellipse' },\n  },\n});\n\nconst Circle = ({ box }) => <ellipse {...toSvgProps(fromRect(box))} />;\n\nconst toNode = (id, index) => ({\n  id,\n  type: Circle,\n  box: { x: 50 + index * 100, y: 40, width: 30, height: 30 },\n});\n\nexport default () => (\n  <Graph\n    nodes={['1', '2', '3', '4'].map(toNode)}\n    connections={[\n      { src: '1', dst: '2' },\n      { src: '1', dst: '2' },\n      { src: '2', dst: '3' },\n      { src: '2', dst: '3' },\n      { src: '2', dst: '3' },\n      { src: '3', dst: '4' },\n      { src: '3', dst: '4' },\n      { src: '3', dst: '4' },\n      { src: '3', dst: '4' },\n    ]}\n  />\n);\n",output:Object(i.a)((function(){return m(x,{nodes:["1","2","3","4"].map(g),connections:[{src:"1",dst:"2"},{src:"1",dst:"2"},{src:"2",dst:"3"},{src:"2",dst:"3"},{src:"2",dst:"3"},{src:"3",dst:"4"},{src:"3",dst:"4"},{src:"3",dst:"4"},{src:"3",dst:"4"}]})}),{mdxType:"Graph"}),path:"examples/connections/looms/looms.jsx",mdxType:"Example"});function j(n){var t=n.components,e=Object(o.a)(n,["components"]);return Object(i.a)(b,Object(r.a)({},w,e,{components:t,mdxType:"MDXLayout"}),v,y)}j.isMDXComponent=!0},SQNZ:function(n,t,e){"use strict";e.d(t,"b",(function(){return o}));var r=function(n){return"none"!==n},o=function(n){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:1;return(r(n)?t:0)+.5};t.a=function(n,t){var e=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"none",r=arguments.length>3?arguments[3]:void 0,c=o(e,r);return[n-c,t-c]}},ZC58:function(n,t,e){(window.__NEXT_P=window.__NEXT_P||[]).push(["/examples/connections/looms",function(){return e("Hlz0")}])},hsuq:function(n,t,e){"use strict";var r=e("z3IF"),o=e("hDBU"),c=e("2Fjn"),s=e("mXGw"),i=e.n(s),a=e("PDtE"),d=e("SQNZ"),p=e("/F3D"),u=i.a.createElement,h=6,l=6,m=function(n){var t=n.id,e=n.width,i=void 0===e?h:e,m=n.height,x=void 0===m?l:m,f=n.stroke,g=void 0===f?"none":f,w=n.strokeWidth,b=n.rtl,v=n.className,y=Object(c.a)(n,["id","width","height","stroke","strokeWidth","rtl","className"]),j=Object(s.useMemo)((function(){var n=Object(d.a)(i,x,g,w),t=Object(o.a)(n,2);return function(n,t,e){var r=t/2;return[{x:0,y:-r},{x:e?-n:n,y:0},{x:0,y:r}]}(t[0],t[1],b).map(p.a)}),[x,b,g,w,i]);return u("polygon",Object(r.a)({id:t,points:j,className:Object(a.a)("regraph-arrowhead","regraph-arrowhead-triangle",v),stroke:g},y))};m.getMarkerProps=function(n){var t=n.width,e=void 0===t?h:t,r=n.height,o=void 0===r?l:r;return{width:e,height:o,viewBox:{x:n.rtl?-e:0,y:-o/2,width:e,height:o},anchor:{x:0,y:0},trim:e}},t.a=m}},[["ZC58",1,2,0,3,4,5]]]);