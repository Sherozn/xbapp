webpackJsonp([7],{KfFN:function(e,a){},s3nr:function(e,a,t){"use strict";Object.defineProperty(a,"__esModule",{value:!0});var s=t("mtWM"),r=t.n(s),n=t("QmSG"),o={data:function(){return{name:"",password:"",error:""}},methods:{login:function(){var e=this,a={name:this.name};r.a.get(n.a.host+"/user/login",{params:a}).then(function(a){console.log("res",a.data.user),a.data.user?a.data.user.password==e.password?(localStorage.setItem("Flag","isLogin"),localStorage.setItem("user-xbapp",a.data.user.id),e.$store.dispatch("userInfo",a.data.user),e.$router.replace("/admin")):e.error="密码错误，请确认后再输入":e.error="用户名错误，请确认后再输入"})}}},i={render:function(){var e=this,a=e.$createElement,t=e._self._c||a;return t("div",[t("div",{staticClass:"login"},[t("div",[t("label",{staticClass:"label"},[e._v("用户名：")]),e._v(" "),t("input",{directives:[{name:"model",rawName:"v-model",value:e.name,expression:"name"}],staticClass:"input title",domProps:{value:e.name},on:{input:function(a){a.target.composing||(e.name=a.target.value)}}})]),e._v(" "),t("div",[t("label",{staticClass:"label"},[e._v("密码：")]),e._v(" "),t("input",{directives:[{name:"model",rawName:"v-model",value:e.password,expression:"password"}],staticClass:"input title",staticStyle:{"margin-left":"14px"},attrs:{type:"password"},domProps:{value:e.password},on:{input:function(a){a.target.composing||(e.password=a.target.value)}}})]),e._v(" "),t("div",{staticClass:"error"},[e._v(" "+e._s(e.error))]),e._v(" "),t("div",{staticClass:"button",on:{click:e.login}},[e._v("登录")])])])},staticRenderFns:[]};var l=t("VU/8")(o,i,!1,function(e){t("KfFN")},"data-v-1048679b",null);a.default=l.exports}});