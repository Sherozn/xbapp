webpackJsonp([4],{AQAz:function(e,t){},"F6+w":function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o=n("QmSG"),r=n("mtWM"),l=n.n(r),i={name:"BrokerList",methods:{serUrl:function(e){console.log("url setUrl",e);var t={};if(/\?/.test(e)){for(var n=e.split("?")[1].split("&"),o=0;o<n.length;o++){var r=n[o].split("=");t[r[0]]=r[1]}return t}return null},getOpenid:function(){var e=this.serUrl(window.location.href).code;console.log("code",e),l()({url:o.a.host+"/wx/getOpenid",method:"post",data:{code:e}}).then(function(e){console.log("getOpenid",e)})}},mounted:function(){console.log("urllll",window.location.href),this.getOpenid()}},s={render:function(){var e=this.$createElement;return(this._self._c||e)("div",[this._v("\n 我是\n")])},staticRenderFns:[]};var c=n("VU/8")(i,s,!1,function(e){n("AQAz")},"data-v-52dc881c",null);t.default=c.exports}});