webpackJsonp([2],{"/EyM":function(e,t){},C2Gd:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o=n("Xxa5"),r=n.n(o),s=n("exGp"),a=n.n(s),c=n("QmSG"),i=n("mtWM"),d=n.n(i),l=(n("cTR8"),{name:"Brokers",data:function(){return{brokers:["辉立","华泰","华赢","东财","尊嘉","富途","玖富","友信","有鱼","东方","广发","华盛通","青石","佳兆业","方德","利弗莫尔","国都","复星恒利","瑞丰","艾德","雪盈","老虎","耀才"],brokers_status:[!0,!0,!0,!0,!0,!0,!0,!0,!0,!0,!0,!0,!0,!0,!0,!0,!0,!0,!0,!0,!0,!0,!0],nos:[],rohs:!1,openid:"",code:"",broker_id:0}},methods:{GetUrlParam:function(e){var t=new RegExp("(^|&)"+e+"=([^&]*)(&|$)"),n=window.location.search.substr(1).match(t);return null!=n?unescape(n[2]):null},getCode:function(){var e=this;return a()(r.a.mark(function t(){var n,o;return r.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:if(e.openid=localStorage.getItem("UserOpenid"),console.log("this.openid",e.openid),e.openid&&"undefined"!==e.openid){t.next=18;break}if(e.code=e.GetUrlParam("code"),console.log("code：",e.code),null!=e.code&&""!==e.code){t.next=13;break}n="http://lgshuolicai.com/brokers",o="https://open.weixin.qq.com/connect/oauth2/authorize?appid="+c.a.appid+"&redirect_uri="+encodeURIComponent(n)+"&response_type=code&scope=snsapi_base&state=1&connect_redirect=1#wechat_redirect",window.location.href=o,console.log("url",o),console.log("code：",e.code),t.next=16;break;case 13:return console.log("去获取用户信息"),t.next=16,d()({url:c.a.host+"/wx/getOpenid",method:"post",data:{code:e.code}}).then(function(t){console.log("getOpenid",t),localStorage.setItem("UserOpenid",t.data.openid),e.openid=t.data.openid,e.getOrder()});case 16:t.next=19;break;case 18:e.getOrder();case 19:case"end":return t.stop()}},t,e)}))()},getOrder:function(){var e=this;return a()(r.a.mark(function t(){return r.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return console.log("this.openid getOrder",e.openid),t.next=3,d.a.get(c.a.host+"/wx/getOrder",{params:{openid:e.openid}}).then(function(t){if("200"===t.data.state){if(e.rohs=t.data.brokers.isOrder,e.broker_id=t.data.brokers.id,t.data.brokers.nos){e.nos=JSON.parse("["+t.data.brokers.nos+"]");for(var n=0,o=e.nos.length;n<o;)e.brokers_status[e.nos[n]-10]=!1,n++}console.log("this.brokers_status",e.brokers_status)}else console.log("error",t)});case 3:case"end":return t.stop()}},t,e)}))()},changeOrder:function(){console.log("this.rohs",this.rohs),d()({url:c.a.host+"/wx/changeOrder",method:"post",data:{isOrder:this.rohs,broker_id:this.broker_id}}).then(function(e){console.log("changeOrder",e)})},changeInOpen:function(e,t){this.brokers_status[t]=e,t+=10;var n=this.nos.indexOf(t);console.log("ind",n),e?n>-1&&this.nos.splice(n,1):-1==n&&this.nos.push(t),console.log("this.nos",this.nos),d()({url:c.a.host+"/wx/changeInOpen",method:"post",data:{nos:this.nos.join(","),broker_id:this.broker_id}}).then(function(e){console.log("changeInOpen",e)})}},mounted:function(){this.getCode()}}),u={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"brokers"},[n("div",{staticClass:"header"},[e._v("\n    订阅港股额度通知\n  ")]),e._v(" "),n("div",{staticClass:"context"},[n("span",{staticClass:"open"},[e._v("打开订阅")]),e._v(" "),n("el-switch",{attrs:{"active-color":"#ff7700","inactive-color":"#dcdfe7"},on:{change:function(t){return e.changeOrder()}},model:{value:e.rohs,callback:function(t){e.rohs=t},expression:"rohs"}})],1),e._v(" "),e.rohs?n("div",{staticClass:"in-context"},e._l(e.brokers,function(t,o){return n("div",{key:o,staticClass:"broker"},[n("span",{staticClass:"in-open"},[e._v(e._s(t))]),e._v(" "),n("div",{staticClass:"elswitch"},[n("el-switch",{attrs:{"active-color":"#ff7700","inactive-color":"#dcdfe7"},on:{change:function(t){return e.changeInOpen(t,o)}},model:{value:e.brokers_status[o],callback:function(t){e.$set(e.brokers_status,o,t)},expression:"brokers_status[index]"}})],1)])}),0):e._e()])},staticRenderFns:[]};var h=n("VU/8")(l,u,!1,function(e){n("I916")},"data-v-30e1d6be",null);t.default=h.exports},I916:function(e,t){},cTR8:function(e,t,n){"use strict";n("mtWM");var o={props:{broker:Array},data:function(){return{flag:!0}},methods:{changeInOpen:function(e){console.log("nihao",e)}}},r={render:function(){var e=this.$createElement;return(this._self._c||e)("div")},staticRenderFns:[]};n("VU/8")(o,r,!1,function(e){n("/EyM")},"data-v-a348937c",null).exports}});