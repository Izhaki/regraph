(window.webpackJsonp=window.webpackJsonp||[]).push([[13],{"33tr":function(n,t,e){"use strict";t.a=function(n){return{cx:n.center.x,cy:n.center.y,rx:n.rx,ry:n.ry}}},SQNZ:function(n,t,e){"use strict";e.d(t,"b",(function(){return o}));var r=function(n){return"none"!==n},o=function(n){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:1;return(r(n)?t:0)+.5};t.a=function(n,t){var e=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"none",r=arguments.length>3?arguments[3]:void 0,i=o(e,r);return[n-i,t-i]}},d9Pq:function(n,t,e){"use strict";e.r(t);var r=e("z3IF"),o=e("2Fjn"),i=e("mXGw"),c=e.n(i),a=e("/FXl"),s=e("qImK"),d=e("H3Hr"),h=e("8foj"),u=e("hsuq"),p=e("33tr"),l=e("RG6p"),m=c.a.createElement,x={fill:"none"},b=function(n){var t=n.box;return m("ellipse",Object(r.a)({},Object(p.a)(Object(l.a)(t)),{style:x}))},y=Object(d.a)({normalizeConnections:!0,autoConnectionId:!0,extractBoxesFromNodes:!0,layout:!0,autoViewportSize:!0,node:{type:function(n){var t=n.box;return m("rect",Object(r.a)({},t,{style:x}))}},connection:{type:h.a,strokeWidth:1,src:{marker:m(u.a,null)},dst:{marker:m(u.a,null)}}});e.d(t,"default",(function(){return j}));c.a.createElement;var f={},g="wrapper",w=Object(a.a)("h1",null,"Connection Anchors"),v=Object(a.a)(s.a,{code:"import React from 'react';\nimport { graph } from '@regraph/graph';\nimport { Line } from '@regraph/connections';\nimport { Triangle } from '@regraph/arrowheads';\nimport { fromRect, toSvgProps } from '@regraph/geo/ellipse';\n\nconst style = { fill: 'none' };\n\nconst Rect = ({ box }) => <rect {...box} style={style} />;\nconst Circle = ({ box }) => (\n  <ellipse {...toSvgProps(fromRect(box))} style={style} />\n);\n\nconst Graph = graph({\n  normalizeConnections: true,\n  autoConnectionId: true,\n  extractBoxesFromNodes: true,\n  layout: true,\n  autoViewportSize: true,\n  node: { type: Rect },\n  connection: {\n    type: Line,\n    strokeWidth: 1,\n    src: { marker: <Triangle /> },\n    dst: { marker: <Triangle /> },\n  },\n});\n\nexport default () => (\n  <Graph\n    nodes={[\n      { id: 'a', box: { x: 100, y: 50, width: 20, height: 20 } },\n      { id: 'b', box: { x: 150, y: 100, width: 20, height: 20 } },\n      { id: 'c', box: { x: 50, y: 100, width: 20, height: 20 }, type: Circle },\n    ]}\n    connections={[\n      {\n        src: { x: 110, y: 25, marker: null },\n        dst: { id: 'a', anchor: 'center' },\n      },\n      { src: { id: 'a', anchor: 'right' }, dst: { id: 'b', anchor: 'top' } },\n      { src: 'a', dst: 'b' },\n      { src: { id: 'a', anchor: 'bottom' }, dst: { id: 'b', anchor: 'left' } },\n      {\n        src: { id: 'a' },\n        dst: { id: 'c', anchor: 'chop-ellipse' },\n      },\n    ]}\n  />\n);\n",output:Object(a.a)((function(){return m(y,{nodes:[{id:"a",box:{x:100,y:50,width:20,height:20}},{id:"b",box:{x:150,y:100,width:20,height:20}},{id:"c",box:{x:50,y:100,width:20,height:20},type:b}],connections:[{src:{x:110,y:25,marker:null},dst:{id:"a",anchor:"center"}},{src:{id:"a",anchor:"right"},dst:{id:"b",anchor:"top"}},{src:"a",dst:"b"},{src:{id:"a",anchor:"bottom"},dst:{id:"b",anchor:"left"}},{src:{id:"a"},dst:{id:"c",anchor:"chop-ellipse"}}]})}),{mdxType:"Graph"}),path:"examples/connections/anchors/anchors.jsx",sourceOpen:!0,mdxType:"Example"});function j(n){var t=n.components,e=Object(o.a)(n,["components"]);return Object(a.a)(g,Object(r.a)({},f,e,{components:t,mdxType:"MDXLayout"}),w,v)}j.isMDXComponent=!0},hsuq:function(n,t,e){"use strict";var r=e("z3IF"),o=e("hDBU"),i=e("2Fjn"),c=e("mXGw"),a=e.n(c),s=e("PDtE"),d=e("SQNZ"),h=e("/F3D"),u=a.a.createElement,p=6,l=6,m=function(n){var t=n.id,e=n.width,a=void 0===e?p:e,m=n.height,x=void 0===m?l:m,b=n.stroke,y=void 0===b?"none":b,f=n.strokeWidth,g=n.rtl,w=n.className,v=Object(i.a)(n,["id","width","height","stroke","strokeWidth","rtl","className"]),j=Object(c.useMemo)((function(){var n=Object(d.a)(a,x,y,f),t=Object(o.a)(n,2);return function(n,t,e){var r=t/2;return[{x:0,y:-r},{x:e?-n:n,y:0},{x:0,y:r}]}(t[0],t[1],g).map(h.a)}),[x,g,y,f,a]);return u("polygon",Object(r.a)({id:t,points:j,className:Object(s.a)("regraph-arrowhead","regraph-arrowhead-triangle",w),stroke:y},v))};m.getMarkerProps=function(n){var t=n.width,e=void 0===t?p:t,r=n.height,o=void 0===r?l:r;return{width:e,height:o,viewBox:{x:n.rtl?-e:0,y:-o/2,width:e,height:o},anchor:{x:0,y:0},trim:e}},t.a=m},iKsx:function(n,t,e){(window.__NEXT_P=window.__NEXT_P||[]).push(["/examples/connections/anchors",function(){return e("d9Pq")}])}},[["iKsx",1,2,0,3,4,5]]]);