webpackJsonp([2],{"/EyM":function(e,t){},C2Gd:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o=n("QmSG"),s=n("mtWM"),r=n.n(s),a={props:{broker:Array},data:function(){return{flag:!0}},methods:{changeInOpen:function(e){console.log("nihao",e)}}},c={render:function(){var e=this.$createElement;return(this._self._c||e)("div")},staticRenderFns:[]};n("VU/8")(a,c,!1,function(e){n("/EyM")},"data-v-a348937c",null).exports;var i={name:"Brokers",data:function(){return{brokers:[["辉立",!0],["华泰",!0],["华赢",!0],["东财",!0],["尊嘉",!0],["富途",!0],["玖富",!0],["友信",!0],["东方",!0],["广发",!0],["华盛通",!0],["青石",!0],["佳兆业",!0],["方德",!0],["利弗莫尔",!0],["国都",!0],["复星",!0],["瑞丰",!0],["艾德",!0],["雪盈",!0],["老虎",!0]],rohs:!0}},methods:{changeInOpen:function(e,t){this.brokers[t][1]=e,console.log("nihao",this.brokers)},GetUrlParam:function(e){var t=new RegExp("(^|&)"+e+"=([^&]*)(&|$)"),n=window.location.search.substr(1).match(t);return null!=n?unescape(n[2]):null},getCode:function(){var e="https://open.weixin.qq.com/connect/oauth2/authorize?appid="+o.a.appid+"&redirect_uri="+encodeURIComponent("http://lgshuolicai.com/brokers")+"&response_type=code&scope=snsapi_base&state=1&connect_redirect=1#wechat_redirect";window.location.href=e,console.log("url",e);var t=this.GetUrlParam("code");return console.log("code：",t),t},getOpenId:function(e){var t=this;this.openid=localStorage.getItem("UserOpenid"),this.openid||(this.getCode(),r()({url:o.a.host+"/wx/getOpenid",method:"post",data:{code:e}}).then(function(e){console.log("getOpenid",e),localStorage.setItem("UserOpenid",e.data.openid),t.openid=e.data.openid}))}},mounted:function(){this.getOpenId()}},l={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"brokers"},[n("div",{staticClass:"header"},[e._v("\n    订阅港股额度通知\n  ")]),e._v(" "),n("div",{staticClass:"context"},[n("span",{staticClass:"open"},[e._v("打开订阅")]),e._v(" "),n("el-switch",{attrs:{"active-color":"#ff7700","inactive-color":"#dcdfe7"},model:{value:e.rohs,callback:function(t){e.rohs=t},expression:"rohs"}})],1),e._v(" "),e.rohs?n("div",{staticClass:"in-context"},e._l(e.brokers,function(t,o){return n("div",{key:o,staticClass:"broker"},[n("span",{staticClass:"in-open"},[e._v(e._s(t[0]))]),e._v(" "),n("div",{staticClass:"elswitch"},[n("el-switch",{attrs:{"active-color":"#ff7700","inactive-color":"#dcdfe7"},on:{change:function(t){return e.changeInOpen(t,o)}},model:{value:t[1],callback:function(n){e.$set(t,1,n)},expression:"broker[1]"}})],1)])}),0):e._e()])},staticRenderFns:[]};var d=n("VU/8")(i,l,!1,function(e){n("vJF0")},"data-v-42edfd9e",null);t.default=d.exports},vJF0:function(e,t){}});