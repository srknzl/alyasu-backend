(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-23f73d80"],{"1b9a":function(t,e,a){"use strict";a.r(e);var n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{attrs:{id:"editblog"}},[a("b-container",[a("b-row",[t.fetchLoading?a("b-col",{staticClass:"d-flex flex-column align-items-center justify-content-center"},[a("b-spinner",{attrs:{variant:"success"}})],1):t._e(),t.fetchLoading?t._e():a("b-col",{staticClass:"d-flex flex-column align-items-center justify-content-center"},[a("b-card",{staticClass:"mb-2",staticStyle:{"max-width":"40rem",width:"100%"},attrs:{"img-alt":"Resim","img-src":t.oldImage,tag:"article"}},[a("form",{ref:"form",on:{submit:function(e){return e.stopPropagation(),e.preventDefault(),t.handleSubmit(e)}}},[a("b-form-group",{attrs:{state:t.titleState,label:"Başlık: ","label-for":"name-input","invalid-feedback":"Başlık koymanız gerekiyor."}},[a("b-form-input",{attrs:{id:"name-input",state:t.titleState,required:""},model:{value:t.title,callback:function(e){t.title=e},expression:"title"}})],1),a("b-form-group",{attrs:{label:"İçerik: ","label-for":"content-input"}},[a("medium-editor",{attrs:{text:t.content,options:t.options,"custom-tag":"div"},on:{edit:t.processEditOperation}})],1),a("b-form-group",{attrs:{state:t.coverImageState,label:"Kapak Resmi:(Değiştirmemek için bir şey seçmeyin.) ","label-for":"cover-image-input"}},[a("b-form-file",{attrs:{id:"cover-image-input",accept:"image/*","browse-text":"Resim seçiniz.",placeholder:"Resim seçin veya sürekleyin.","drop-placeholder":"Bırakın."},model:{value:t.coverImageUrl,callback:function(e){t.coverImageUrl=e},expression:"coverImageUrl"}})],1),a("b-form-group",{attrs:{label:"Anahtar Kelimeler(5 tane idealdir): ","label-for":"keywords-input","invalid-feedback":"Anahtar kelimeleri virgülle ayrılmış şekilde giriniz."}},[a("b-form-tags",{attrs:{id:"keywords-input","tag-pills":"","tag-variant":"primary","remove-on-delete":"",separator:",","duplicate-tag-text":"Aynı kelime var",placeholder:"Enter veya virgülle ekleyin."},model:{value:t.keywords,callback:function(e){t.keywords=e},expression:"keywords"}})],1)],1),a("b-button-group",[a("b-button",{staticClass:"mr-2",attrs:{variant:"success"},on:{click:function(e){return e.preventDefault(),t.onSubmit(e)}}},[t.editLoading?a("b-spinner",{attrs:{variant:"danger",small:""}}):t._e(),t.editLoading?t._e():a("span",[t._v("Tamam")])],1),a("b-button",{attrs:{to:"/blog",variant:"danger"}},[t._v("Geri dön")])],1)],1)],1)],1)],1)],1)},r=[];a("d3b7");function i(t,e,a){return e in t?Object.defineProperty(t,e,{value:a,enumerable:!0,configurable:!0,writable:!0}):t[e]=a,t}a("96cf");var o,l=a("1da1"),s=a("bc3a"),c=a.n(s),d=a("4884"),u=a.n(d),m=(o={data:function(){return{options:{buttonLabels:"fontawesome",toolbar:{buttons:["h1","h2","h3","anchor","bold","italic","unorderedlist","orderedlist","table"]},extensions:{table:new MediumEditorTable},placeholder:!1},content:"",keywords:[],title:"",coverImageUrl:null,oldImage:"",editLoading:!1,fetchLoading:!1}},components:{"medium-editor":u.a},computed:{titleState:function(){return this.title.length>0}},created:function(){var t=this;this.fetchLoading=!0,c.a.get("/blog/blogEntries/"+this.$route.params.id).then((function(e){t.title=e.data.blogEntry.title,t.content=e.data.blogEntry.content,t.oldImage=e.data.blogEntry.coverImageUrl,t.keywords=e.data.blogEntry.keywords,t.fetchLoading=!1})).catch((function(e){t.$bvToast.toast("Bir hata oldu: "+JSON.stringify(e)),t.fetchLoading=!1}))}},i(o,"components",{"medium-editor":u.a}),i(o,"methods",{toBase64:function(t){return new Promise((function(e,a){var n=new FileReader;n.readAsDataURL(t),n.onload=function(){return e(n.result)},n.onerror=function(t){return a(t)}}))},processEditOperation:function(t){this.content=t.api.origElements.innerHTML},checkFormValidity:function(){var t=this.$refs.form.checkValidity();return t},onSubmit:function(){var t=this;return Object(l["a"])(regeneratorRuntime.mark((function e(){var a;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(t.checkFormValidity()){e.next=2;break}return e.abrupt("return");case 2:if(t.editLoading=!0,null!=t.coverImageUrl){e.next=7;break}c.a.put("/blog/editBlogEntry/"+t.$route.params.id,{content:t.content,coverImageUrl:t.oldImage,title:t.title,keywords:t.keywords}).then((function(e){t.$bvToast.toast(e.data.message),t.editLoading=!1})).catch((function(e){t.$bvToast.toast("Bir hata var. "+JSON.stringify(e)),t.editLoading=!1})),e.next=19;break;case 7:return e.prev=7,e.next=10,t.toBase64(t.coverImageUrl);case 10:a=e.sent,e.next=18;break;case 13:return e.prev=13,e.t0=e["catch"](7),t.$bvToast.toast("Bir hata var "+e.t0),t.editLoading=!1,e.abrupt("return");case 18:c.a.put("/blog/editBlogEntry/"+t.$route.params.id,{content:t.content,coverImageUrl:a,title:t.title,keywords:t.keywords}).then((function(e){t.$bvToast.toast(e.data.message),t.oldImage=a,t.editLoading=!1})).catch((function(e){t.$bvToast.toast("Bir hata var. "+JSON.stringify(e)),t.editLoading=!1}));case 19:case"end":return e.stop()}}),e,null,[[7,13]])})))()}}),o),b=m,g=(a("d7c1"),a("2877")),f=Object(g["a"])(b,n,r,!1,null,null,null);e["default"]=f.exports},c796:function(t,e,a){},d7c1:function(t,e,a){"use strict";var n=a("c796"),r=a.n(n);r.a}}]);
//# sourceMappingURL=chunk-23f73d80.4cf60e3a.js.map