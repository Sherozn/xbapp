webpackJsonp([4],{"1HZc":function(t,e){},"7xmY":function(t,e){},"80Vc":function(t,e){},NHnr:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var s=n("7+uW"),i=n("zL8q"),a=n.n(i),r=(n("tvR6"),{render:function(){var t=this.$createElement,e=this._self._c||t;return e("div",{attrs:{id:"app"}},[e("router-view")],1)},staticRenderFns:[]});var o=n("VU/8")({name:"App"},r,!1,function(t){n("1HZc")},null,null).exports,c=n("/ocq"),l=n("mtWM"),u=n.n(l),p=n("QmSG"),d={render:function(){this.$createElement;this._self._c;return this._m(0)},staticRenderFns:[function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"search-warper"},[e("form",{attrs:{action:""}},[e("input",{attrs:{type:"text",placeholder:"搜索产品"}}),this._v(" "),e("i",{staticClass:"iconfont icon-search"})])])}]};var f=n("VU/8")({},d,!1,function(t){n("h9yJ")},"data-v-713a2a6f",null).exports,v={name:"Banner",props:{banners:Array},data:function(){return{swiperOption:{spaceBetween:30,centeredSlides:!0,autoplay:{delay:3e3,disableOnInteraction:!1},pagination:{el:".swiper-pagination",clickable:!0}}}}},m={render:function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"banner"},[e("swiper",{attrs:{options:this.swiperOption}},[this._l(this.banners,function(t,n){return e("swiper-slide",{key:n},[e("a",{attrs:{href:t[1]}},[e("img",{attrs:{src:t[0]}})])])}),this._v(" "),e("div",{staticClass:"swiper-pagination",attrs:{slot:"pagination"},slot:"pagination"})],2)],1)},staticRenderFns:[]};var h=n("VU/8")(v,m,!1,function(t){n("QRpf")},"data-v-f03a2076",null).exports,_={name:"",props:{quickEntrance:Array}},g={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"quick-entrance"},[n("div",{staticClass:"swiper-wrapper"},[n("div",{staticClass:"swiper-slide"},[t._l(t.quickEntrance,function(e){return[n("a",{staticClass:"item",attrs:{tag:"div",href:e[2]}},[n("img",{attrs:{src:e[1]}}),t._v(" "),n("span",[t._v(t._s(e[0]))])])]})],2)])])},staticRenderFns:[]};var y=n("VU/8")(_,g,!1,function(t){n("OnG4")},"data-v-9feb6268",null).exports,C=n("Xxa5"),b=n.n(C),x=n("exGp"),w=n.n(x),E=n("GQaK"),k={props:["items"],data:function(){return{items_index:0}},mounted:function(){this.init()},beforeDestroy:function(){this.bs.destroy()},methods:{init:function(){this.bs=new E.a(this.$refs.scroll1,{scrollX:!0,click:!0,probeType:3}),this._registerHooks(["scroll","scrollEnd"],function(t){})},_registerHooks:function(t,e){var n=this;t.forEach(function(t){n.bs.on(t,e)})},changeitem:function(t){console.log("i的值",t),this.items_index=t,this.$emit("asTypeF",t)}}},T={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{ref:"scroll1",staticClass:"scroll-wrapper1"},[n("div",{staticClass:"scroll-content1"},t._l(t.items,function(e,s){return n("div",{key:s,staticClass:"scroll-item"},[n("div",{staticClass:"scroll-item border",style:s==t.items_index?"border:1px solid #ff7700;color:#ff7700;":"",on:{click:function(e){return t.changeitem(s)}}},[t._v(t._s(e))])])}),0)])},staticRenderFns:[]};var I=n("VU/8")(k,T,!1,function(t){n("Y/w8")},"data-v-6650ece8",null).exports,U={props:{products:Array}},$={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"goods-list"},t._l(t.products,function(e,s){return n("a",{key:s,staticClass:"item",attrs:{href:e.buyUrl}},[n("div",{staticClass:"left"},[n("img",{attrs:{src:e.imgUrl}})]),t._v(" "),n("div",{staticClass:"right"},[n("div",{staticClass:"title"},[t._v("\n                "+t._s(e.name)+"\n            ")]),t._v(" "),n("div",{staticClass:"content"},[t._v("\n                "+t._s(e.note)+"\n            ")]),t._v(" "),n("div",{staticClass:"price-and-user"},[n("div",{staticClass:"price"},[n("span",{staticClass:"_price"},[n("i",[t._v("￥")]),t._v(t._s(e.price))]),t._v(" "),n("span",{staticClass:"sell-num"},[t._v("起")])]),t._v(" "),n("div",{staticClass:"btn"},[n("a",{attrs:{href:e.buyUrl}},[n("div",{staticClass:"buy"},[t._v("购买")])]),t._v(" "),n("a",{directives:[{name:"show",rawName:"v-show",value:e.testUrl,expression:"product.testUrl"}],attrs:{href:e.testUrl}},[n("div",{staticClass:"test"},[t._v("测评")])])])]),t._v(" "),n("div",{staticClass:"line"})])])}),0)},staticRenderFns:[]};var F=n("VU/8")(U,$,!1,function(t){n("tjr4")},"data-v-58ab07e2",null).exports,H={props:{types:Array,typeItem:Array},data:function(){return{items:["重疾险","寿险","医疗险","意外险","年金险","旅行意外险","家财险"],type_index:0,offsetTop:0,products:[],items_index:0}},components:{TypeItem:I,GoodsList:F},mounted:function(){this.getProductType(),this.init()},beforeDestroy:function(){this.bs.destroy()},destroyed:function(){window.removeEventListener("scroll",this.handleScroll)},methods:{init:function(){this.bs=new E.a(this.$refs.scroll,{scrollX:!0,click:!0,probeType:3}),this._registerHooks(["scroll","scrollEnd","touchend"],function(t){})},_registerHooks:function(t,e){var n=this;t.forEach(function(t){n.bs.refresh(),n.bs.on(t,e)})},changeindex:function(t){this.type_index=t,this.typeItem&&(this.items=this.typeItem[t]),this.items_index=0,this.getProductType()},getProductType:function(){var t=this;return w()(b.a.mark(function e(){var n;return b.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:n={type1:t.type_index,type2:t.items_index,user_id:t.$route.params.id},u.a.get(p.a.host+"/productType/getType",{params:n}).then(function(e){t.products=e.data.products,console.log("products",t.products)});case 2:case"end":return e.stop()}},e,t)}))()},getAsTypeF:function(t){this.items_index=t,this.getProductType()}}},R={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n("div",{staticClass:"header"},[n("div",{staticClass:"searchBar",attrs:{id:"searchBar"}},[n("div",{ref:"scroll",staticClass:"scroll-wrapper"},[n("div",{staticClass:"scroll-content"},t._l(t.types,function(e,s){return n("div",{key:s,staticClass:"scroll-item"},[n("div",{staticClass:"scroll-item",style:parseInt(e[0])==t.type_index?"background-color:#ffbd00;font-size:16px;color:#000000;padding:0 10px;":"padding:0 10px;",on:{click:function(n){return t.changeindex(e[0])}}},[t._v(t._s(e[1]))])])}),0)])]),t._v(" "),t.typeItem?[n("TypeItem",{attrs:{items:t.items},on:{asTypeF:t.getAsTypeF}})]:t._e()],2),t._v(" "),n("div",{staticClass:"goods-list"},[n("GoodsList",{attrs:{products:t.products}})],1)])},staticRenderFns:[]};var q={render:function(){this.$createElement;this._self._c;return this._m(0)},staticRenderFns:[function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"footer"},[n("div",{staticClass:"item"},[n("span",{staticClass:"iconfont icon-home"}),t._v(" "),n("span",[t._v("首页")])]),t._v(" "),n("div",{staticClass:"item"},[n("span",{staticClass:"iconfont icon-tuijian"}),t._v(" "),n("span",[t._v("推荐")])]),t._v(" "),n("div",{staticClass:"item"},[n("span",{staticClass:"iconfont icon-category"}),t._v(" "),n("span",[t._v("分类")])]),t._v(" "),n("div",{staticClass:"item"},[n("span",{staticClass:"iconfont icon-chat"}),t._v(" "),n("span",[t._v("聊天")])]),t._v(" "),n("div",{staticClass:"item"},[n("span",{staticClass:"iconfont icon-wo"}),t._v(" "),n("span",[t._v("个人中心")])])])}]};var L={name:"Home",components:{Search:f,Banner:h,QuickEntrance:y,Type:n("VU/8")(H,R,!1,function(t){n("80Vc")},"data-v-332908fb",null).exports,Footer:n("VU/8")({},q,!1,function(t){n("7xmY")},"data-v-6109b80d",null).exports},data:function(){return{types:[],typeItem:[],banners:[],quickEntrance:[]}},methods:{getHomeData:function(){console.log("我开始请求后端，请求的链接是：",p.a.host+"/data/getData"),console.log("当前的user_id是：",this.$route.params.id),u.a.get(p.a.host+"/data/getData",{params:{user_id:this.$route.params.id}}).then(this._getHomeData)},_getHomeData:function(t){console.log("res",t),this.types=t.data.types,this.typeItem=t.data.typeItem,this.banners=t.data.banners,this.quickEntrance=t.data.quickEntrance}},mounted:function(){this.getHomeData()}},V={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n("div",{staticClass:"header"},[n("Banner",{attrs:{banners:t.banners}}),t._v(" "),t.quickEntrance?[n("QuickEntrance",{attrs:{quickEntrance:t.quickEntrance}})]:t._e()],2),t._v(" "),n("Type",{attrs:{types:t.types,typeItem:t.typeItem}})],1)},staticRenderFns:[]};var A=n("VU/8")(L,V,!1,function(t){n("T2Rm")},"data-v-25463d2e",null).exports;s.default.use(c.a);var Q=new c.a({routes:[{path:"/user/:id",name:"Home",component:A,meta:{isLogin:!1}},{path:"/login",name:"Login",component:function(t){return n.e(2).then(function(){var e=[n("s3nr")];t.apply(null,e)}.bind(this)).catch(n.oe)},meta:{isLogin:!1}},{path:"/admin",name:"Admin",component:function(t){return n.e(1).then(function(){var e=[n("pMgH")];t.apply(null,e)}.bind(this)).catch(n.oe)},meta:{isLogin:!0}},{path:"/types",name:"ProductType",component:function(t){return n.e(0).then(function(){var e=[n("YLVr")];t.apply(null,e)}.bind(this)).catch(n.oe)},meta:{isLogin:!0}}]}),D=n("NYxO");s.default.use(D.a);var G=new D.a.Store({state:{userinfo:[]},getters:{userinfo:function(t){return t.userinfo}},mutations:{setUserInfo:function(t,e){t.userinfo=e}},actions:{userInfo:function(t,e){(0,t.commit)("setUserInfo",e)}}}),S=(n("cjdf"),n("m0iu"),n("muQq"),n("7QTg")),O=n.n(S);n("v2ns");s.default.use(a.a),s.default.use(O.a),s.default.config.productionTip=!1,Q.beforeEach(function(t,e,n){var s=localStorage.getItem("Flag"),i=localStorage.getItem("user-xbapp");console.log("getFlag",s),"isLogin"===s&&i?(G.state.isLogin=!0,n()):(console.log("to",t.path),t.meta.isLogin?n({path:"/login"}):n())}),Q.afterEach(function(t){window.scroll(0,0)}),new s.default({el:"#app",router:Q,store:G,components:{App:o},template:"<App/>"})},OnG4:function(t,e){},QRpf:function(t,e){},QmSG:function(t,e,n){"use strict";var s={host:"http://lgshuolicai.com:3303"};e.a=s},T2Rm:function(t,e){},"Y/w8":function(t,e){},cjdf:function(t,e){},h9yJ:function(t,e){},m0iu:function(t,e){},muQq:function(t,e){},tjr4:function(t,e){},tvR6:function(t,e){},v2ns:function(t,e){}},["NHnr"]);