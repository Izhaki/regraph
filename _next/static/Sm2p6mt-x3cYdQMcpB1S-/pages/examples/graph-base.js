(window.webpackJsonp=window.webpackJsonp||[]).push([[20],{XRno:function(n,e,t){"use strict";t.r(e);var o=t("z3IF"),p=t("2Fjn"),i=t("mXGw"),r=t.n(i),a=t("/FXl"),c=t("qImK"),h=t("obYp"),s=t("8foj"),d=r.a.createElement,g=function(n){var e=n.box;return d("rect",e)};t.d(e,"default",(function(){return y}));r.a.createElement;var u={},x="wrapper",m=Object(a.a)("h1",null,"GraphBase"),w=Object(a.a)(c.a,{code:"import React from 'react';\nimport { GraphBase } from '@regraph/graph';\nimport { Line } from '@regraph/connections';\n\nconst Rect = ({ box }) => <rect {...box} />;\n\nexport default () => (\n  <GraphBase\n    width={220}\n    height={100}\n    nodes={[{ id: 'ping', type: Rect }, { id: 'pong', type: Rect }]}\n    boxes={{\n      ping: { x: 50, y: 40, width: 20, height: 20 },\n      pong: { x: 150, y: 40, width: 20, height: 20 },\n    }}\n    connections={[\n      {\n        id: 'ping->pong',\n        type: Line,\n        src: { x: 60, y: 50 },\n        dst: { x: 160, y: 50 },\n      },\n    ]}\n  />\n);\n",output:Object(a.a)((function(){return d(h.a,{width:220,height:100,nodes:[{id:"ping",type:g},{id:"pong",type:g}],boxes:{ping:{x:50,y:40,width:20,height:20},pong:{x:150,y:40,width:20,height:20}},connections:[{id:"ping->pong",type:s.a,src:{x:60,y:50},dst:{x:160,y:50}}]})}),{mdxType:"Graph"}),path:"examples/graph-base/index.jsx",sourceOpen:!0,mdxType:"Example"});function y(n){var e=n.components,t=Object(p.a)(n,["components"]);return Object(a.a)(x,Object(o.a)({},u,t,{components:e,mdxType:"MDXLayout"}),m,w)}y.isMDXComponent=!0},pqkZ:function(n,e,t){(window.__NEXT_P=window.__NEXT_P||[]).push(["/examples/graph-base",function(){return t("XRno")}])}},[["pqkZ",1,2,0,3,4]]]);