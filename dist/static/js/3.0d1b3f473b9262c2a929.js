webpackJsonp([3],{"00e4":function(e,t){},"F6+w":function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r={name:"BrokerList",methods:{serUrl:function(e){console.log("url setUrl",e);var t={};if(/\?/.test(e)){for(var n=e.split("?")[1].split("&"),r=0;r<n.length;r++){var l=n[r].split("=");t[l[0]]=l[1]}return t}return null}},mounted:function(){console.log("urllll",window.location.href),this.serUrl(window.location.href)}},l={render:function(){var e=this.$createElement;return(this._self._c||e)("div",[this._v("\n 我是\n")])},staticRenderFns:[]};var o=n("VU/8")(r,l,!1,function(e){n("00e4")},"data-v-b87ec51c",null);t.default=o.exports}});