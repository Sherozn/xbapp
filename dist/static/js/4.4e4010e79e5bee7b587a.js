webpackJsonp([4],{FF7q:function(t,a,e){"use strict";Object.defineProperty(a,"__esModule",{value:!0});var n=e("mtWM"),o=e.n(n),s=e("QmSG"),i={data:function(){return{data:""}},methods:{submit:function(){this.data.length>1&&(console.log(this.data),o()({url:s.a.host+"/wx/addMenu",method:"get",params:this.data}).then(function(t){console.log("submit",t)}))}}},d={render:function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",[t._v("\n    菜单信息（仅支持json）：\n\t\t"),e("input",{directives:[{name:"model",rawName:"v-model",value:t.data,expression:"data"}],staticClass:"input",domProps:{value:t.data},on:{input:function(a){a.target.composing||(t.data=a.target.value)}}}),t._v(" "),e("div",{staticClass:"modal-footer btnConfirm",on:{click:t.submit}},[t._v("提交")])])},staticRenderFns:[]};var u=e("VU/8")(i,d,!1,function(t){e("sjbQ")},"data-v-7d0e3fc5",null);a.default=u.exports},sjbQ:function(t,a){}});