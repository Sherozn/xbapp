webpackJsonp([5],{DZIS:function(e,t){},UbgK:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=a("Xxa5"),r=a.n(n),s=a("exGp"),o=a.n(s),l=a("QmSG"),i=a("mtWM"),c=a.n(i),u={name:"SendTemplate",data:function(){return{templates:"",as_type:0,user_types:["指定","全部"],brokers:["辉立","华泰","华赢","东财","尊嘉","富途","玖富","友信","有鱼","东方","广发","华盛通","青石","佳兆业","方德","利弗莫尔","国都","复星恒利","瑞丰","艾德","雪盈","老虎","耀才"],default_broker:0}},methods:{changeType:function(e){this.as_type=parseInt(e.target.value),console.log("as_type",this.as_type)},changeBroker:function(e){this.default_broker=parseInt(e.target.value),console.log("default_broker",this.default_broker)},submit:function(){var e=this;return o()(r.a.mark(function t(){return r.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:if(console.log("this.templates",e.templates),!(e.templates.length>10)){t.next=6;break}return t.next=4,c()({url:l.a.host+"/wx/send",method:"post",data:{as_type:e.as_type,broker:e.default_broker+10,templates:e.templates}}).then(function(e){console.log("res",e)});case 4:t.next=7;break;case 6:console.log("没有填写");case 7:case"end":return t.stop()}},t,e)}))()}},mounted:function(){}},p={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"brokers"},[a("div",{staticClass:"header"},[e._v("\n    发送模板\n  ")]),e._v(" "),a("div",{staticClass:"context"},[a("div",{staticClass:"row"},[a("span",[e._v("内容：")]),e._v(" "),a("textarea",{directives:[{name:"model",rawName:"v-model",value:e.templates,expression:"templates"}],staticClass:"text",attrs:{"active-color":"#ff7700","inactive-color":"#dcdfe7"},domProps:{value:e.templates},on:{input:function(t){t.target.composing||(e.templates=t.target.value)}}})]),e._v(" "),a("div",{staticClass:"row2"},[a("span",[e._v("券商名称：")]),e._v(" "),a("select",{directives:[{name:"model",rawName:"v-model",value:e.default_broker,expression:"default_broker"}],staticClass:"text",on:{change:[function(t){var a=Array.prototype.filter.call(t.target.options,function(e){return e.selected}).map(function(e){return"_value"in e?e._value:e.value});e.default_broker=t.target.multiple?a:a[0]},function(t){return e.changeBroker(t)}]}},e._l(e.brokers,function(t,n){return a("option",{key:n,domProps:{value:n}},[e._v(e._s(t))])}),0)]),e._v(" "),a("div",{staticClass:"row2"},[a("span",[e._v("用户范围：")]),e._v(" "),a("select",{directives:[{name:"model",rawName:"v-model",value:e.as_type,expression:"as_type"}],staticClass:"text",on:{change:[function(t){var a=Array.prototype.filter.call(t.target.options,function(e){return e.selected}).map(function(e){return"_value"in e?e._value:e.value});e.as_type=t.target.multiple?a:a[0]},function(t){return e.changeType(t)}]}},e._l(e.user_types,function(t,n){return a("option",{key:n,domProps:{value:n}},[e._v(e._s(t))])}),0)]),e._v(" "),a("div",{staticClass:"btnConfirm",on:{click:e.submit}},[e._v("提交")])])])},staticRenderFns:[]};var v=a("VU/8")(u,p,!1,function(e){a("DZIS")},"data-v-5bafb74e",null);t.default=v.exports}});