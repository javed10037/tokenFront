window.zmStreamsApp.PostActions=function(a){"use strict";var b=zmStreamsApp.constants.notifications;a.init=function(b,c){var d;void 0===b.streamsEnabled&&(b.streamsEnabled=!0),a.collection||(a.collection=new a.models.PostsCollection({}));var e=a.collection;if(b.id.indexOf("#")===-1){var f=b.groupId?b.groupId:zmail.zuid;b.id=f+"#"+b.id}var g=new a.models.Post(b);g=e.add(g,{silent:!0,merge:!0});var h=new a.views.Post({model:g});return d=h.$el,c&&$(c).append(d),d};var c=function(b){var c=a.collection,d=[];return b.eid.indexOf("#")===-1&&b.group&&b.group.id&&"1"!==b.entityId&&(b.eid=b.group.id+"#"+b.eid),c&&c.models&&(d=_.find(c.models,function(a){return a.id===b.eid})),d};return a.removeViews=function(a){var b,d;_.each(a,function(a){b=$(a).data();var e=c({eid:b.id});e&&(d=e.getView(b.postactionviewid),e.removeView(d.cid),d.onClose())})},a.getActivityLogs=function(a,b,d){var e={eid:a.id,group:a.gnrl?a.gnrl.group:a.groupId,elem:d[0],isSeeMore:!1},f=c(e);b?(e.isSeeMore=!0,f.trigger("change:activityLog",e)):f.getActivity(e)},a.updateInviteeForMail=function(a){var b=c(a);b&&b.addRemoveInvite(a.inviteeList,"addInvitee"===a.type)},a.getPostTemplate=function(b){b.isPrint=!0;var c=a.template.actionData(b);$(b.elm).append(c)},a.getSharedMail=function(b,c,d){d.comment.id=b;var e=d.commentuuid;e instanceof Array&&(e=e[0]);var f=_zm.getDOM(["DIV",{attrs:{"class":"SCS_postWra",id:"zms_"+b}}]);c.appendChild(f),d.elm=f;var g={shId:d.shId,shOwner:d.comment.shOwner,isSharedFolder:!0,id:b,groupId:d.comment.shOwner,etype:"1",sharedUsers:d.sharedUsers};a.init(g,f);var h={comments:d.comment,shId:d.shId,shOwner:d.comment.shOwner,isSharedFolder:!0,id:b,groupId:d.comment.shOwner,etype:"1"};d.fixedComment&&(h.fixedComment=!0),zmStreamsApp.CommentModule.init(h,$(f),e)},"undefined"!=typeof zmComponent&&zmComponent.notifier&&zmComponent.notifier.addHandler("streams",function(a,d){d=d.data||{},d=_zm.copyOf(d),"string"==typeof d.group&&(d.group=$.parseJSON(d.group));var e=c(d),f=d.ntype;if(!_.isEmpty(e)&&d.nby!==zmail.zuid){var g=f===b.like,h=f===b.unlike;if(g||h){var i=e.get("likes");i=g?i+1:i-1;var j=e.get("likeList")||{};if(g){var k=j.hasOwnProperty(d.nby);if(k)i-=1;else{var l=_.isArray(d.nBy)?d.nBy[0]:JSON.parse(d.nBy)[0],m=l[d.nby]||"";j[d.nby]=m}}else delete j[d.nby];e.set("likeList",j),e.set("likes",i),e.trigger("change:like")}var n=f===b.invite,o=f===b.unshared;if(n||o){var p=e.get("invitee");e.set("inviteeList",d.followList.split(",")),p=n?p+1:p-1,e.set("invitee",p),e.trigger("change:InviteeList")}if(f===b.lock_invites||f===b.unlock_invites){var q=e.get("showinvite");e.set("showinvite",!q),e.set("lockInvites",f===b.lock_invites),e.trigger("change:lockInvites")}var r=f===b.add_comment||f===b.comment_group_mention||f===b.comment_mention;if(r){var s=e.get("inviteeList"),t=e.get("invitee"),u=d.followList.split(",");t=s.length<u.length?t+1:t-1,e.set("invitee",t),e.set("inviteeList",u),e.trigger("change:InviteeList")}f===b.delete_post&&e.set("isDeleted",!0)}}),a}(zmStreamsApp.PostActions||Zmail.App.extend({})),window.zmStreamsApp.PostActions.template=function(){"use strict";var a=zmStreamsApp.i18ntext.streams.activitylog,b=zmText.get("streams"),c={},d={1:a.invited,2:a.removed,100:a.sharedemail,200:a.createnote,300:a.createtask,400:a.createevent,600:a.poststatus,1000:a.postlink,202:a.changetitle,203:a.modifycontent,204:a.addattach,205:a.removeattach,206:a.changebackground,301:a.changetitle,302:a.changedesc,303:a.changepriority,305:a.assigntask,306:a.changecategory,307:a.setduedt,308:a.setstart,309:a.setremind,311:a.addattach,312:a.removeattach,313:a.subtask,sharedDraft:a.shareddraft,sentEmail:a.sentemail,207:a.changecategory};return c.showInviteeList=function(a){a=a||[],_.isArray(a)||(a=Object.keys(a));var c,d,e,f=a.length,g=[],h=[];if(f){var i=1===f?b.common.labels.viewShare:zmText.applyArgs(b.common.labels.viewShares,{count:f});d=["SPAN",{attrs:{"class":"SC_lnk SCShowinvite"},child:[["text",i]]}],f=f>10?10:f,c=zmStreamsApp.util.getContactDetails(a);for(var j in c)e=c[j].fn||c[j].name,g.push(["IMG",{attrs:{src:c[j].photo,title:e}}]);h=["DIV",{attrs:{"class":"mailSLWra"},child:[["DIV",{attrs:{"class":"mailSharedList"},child:[["UL",{child:[["LI",{child:g}]]}],d]}]]}]}return _zm.getDOM(h)},c.actionData=function(a){var d=String(a.by),e=a.invitee,f=a.likes,g=a.groupId,h=a.shGroup,i=function(a){return a=parseInt(a),a=!isNaN(a)&&a>0?a:""};e=i(e),f=i(f);var j=f?"contentLiked":"",k=f?"contentLiked":"display:none",l=a.like?" contentILiked":"",m=b.common.labels.sendPrivateOwner,n=a.lockInvites?"msi-invite msi-Dinvitee":"msi-invite msi-Ainvitee inviteeColor",o=a.pvtcmts&&a.pvtcmts.privateToPost,p=b.common.labels.showPrivateComments,q=d===zmail.zuid||a.disableComment||"13"===a.etype?[]:["SPAN",{attrs:{"class":"SndPrv SndPrvO",style:o?"display:none":""},child:[["text",m]]}],r="13"!==a.etype?["SPAN",{attrs:{"class":"SndPrv ShwPrv zmShowV",style:o?"":"display:none"},child:[["I",{attrs:{"class":"msi-comment"}}],["text",p]]}]:[],s=zmCont.getGroup(g),t=s&&s.moderator&&s.moderator.indexOf(zmail.zuid)!==-1,u=a.streamsEnabled===!1?"pointerEventsNone":"",v=a.isOwner||t||zmail.zuid===a.by?" lockInviteClass":" cursorDefault";v=v+" "+u;var w=a.inviteeList;w&&!_.isArray(w)&&(w=Object.keys(w));var x=w&&w.length?"":" SC_dyn",y=a.lockInvites===!1||a.isOwner||zmail.zuid===a.by,z=c.getFontDOM(w.length,y,a.isPrint),A=e&&!a.isPrint?c.showImageInvite(w,h):[],B=a.isPrint?[]:["SPAN",{attrs:{"class":"SC_SDot dispDot"+x}}],C=["DIV",{attrs:{"class":"SCSpostAct"},child:[["DIV",{attrs:{"class":"SCS_postAct"},child:[["DIV",{attrs:{"class":l+" "+j},child:[["I",{attrs:{"class":"msi-love "+u}}],["FONT",{attrs:{style:k},child:[["text",f]]}],["SPAN",{attrs:{"class":"SC_SDot"}}],["I",{attrs:{"class":String(n)+v}}],B,A,z]}],q,r]}]]}];return _zm.getDOM(C)},c.activityLogs=function(b,d,e){var f=b.length>5&&!e.isSeeMore?["SPAN",{attrs:{"class":"SC_lnk SC_seemore"},child:[["text",a.seeall]]}]:[],g=c.activityLogDetails(b,d,e),h=[["DIV",{attrs:{"class":"SCS_activitiyFeed"},child:[["B",{attrs:{"class":"cursorPointer timeline"},child:[["text",a.timeline]]}],g,f]}]];return _zm.getDOM(h)},c.activityLogDetails=function(b,c,e){var f,g,h,i,j=e.isSeeMore,k=e.groupId,l=["UL",{child:[]}],m="";for(var n in b){switch(g=["LI",{child:[]}],h=b[n],c=h.invitees,i=zmStreamsApp.util.getNameOfInvitee(h.by,c,h.name),g[1].child.push(["SPAN",{child:[["text",i]]}]),m=e.isDraft&&100===h.activityType?d.sharedDraft:e.etype!==zmStreamsApp.PostApp.constants.streamTypeName.mail||e.shared||100!==h.activityType?d[h.activityType]:d.sentEmail,m=void 0===m?" ":" "+m+" ",h.activityType){case 305:f=h.activityMessage.split(","),m+=zmStreamsApp.util.getNameOfInvitee(f[1],c,h.name);break;case 1:case 2:f=h.activityMessage,m+=zmStreamsApp.util.getNameOfInvitee(f,c,h.name);break;case 301:m+=h.activityMessage.split(",")[1];break;case 202:m+=h.activityMessage;break;case 206:m+=znBox.getConstantsValues(h.activityMessage,"color");break;case 308:case 307:var o=h.activityMessage.split(",");m=o[1]?m+o[1]:a.remduedt;break;case 306:var p=zmtCom.getProjectName(k,h.activityMessage.split(",")[1]);p?m+=p:m=" "+a.removecategory;break;case 303:m+=zmtCom.getPriorityByValue(parseInt(h.activityMessage.split(",")[1]));break;case 304:var q=h.activityMessage.split(","),r=zmtCom.getStatusByValue(q[1]);m+="2"===q[0]&&"3"===q[1]?zmText.applyArgs(a.taskcomp,{status:r}):zmText.applyArgs(a.taskreop,{status:r});break;case 316:var s=h.activityMessage.split(","),t=zmtCom.getStatusByValue(s[1]);m+="2"===s[0]&&"3"===s[1]?zmText.applyArgs(a.subtaskcomp,{status:t}):zmText.applyArgs(a.subtaskreop,{status:t});break;case 207:var u=h.activityMessage;m+=u}g[1].child.push(["text",m]);var v=new Date(h.on),w=Date.parse(v)?zmStreamsApp.util.getHourAndTime(parseInt(h.time)):"";if(g[1].child.push(["SPAN",{child:[["text",h.on+" "+w]]}]),l[1].child.push(g),"4"===n&&!j)break}return l},c.showImageInvite=function(a,b){var c,d,e=[],f=[],g=0,h="",i=zmStreamsApp.util.getContactDetails(a),j=b&&!$.isEmptyObject(b)?_.pluck(b,"id"):[],k=b&&!$.isEmptyObject(b)?_.pluck(b,"name"):[];for(var l in i)if(c=i[l],c.isDummyObj?(d=j.indexOf(l),c.photo=d!==-1?zmail.defaultGroupPhoto:c.photo,h=d!==-1?k[d]:""):(h=c.fn||c.name,h=h||""),e.push(["IMG",{attrs:{src:c.photo,name:h,"class":"imgList"}}]),g++,3===g)break;return f=["UL",{attrs:{"class":"invitedList clicktoLoad imageList"},child:[["LI",{child:e}]]}]},c.getFontDOM=function(a,b,c,d){var e="",f=3;d=d||"";var g=a>f?a-f:"";(b||g)&&(e="+"+g),c&&(e=a||""),d="clicktoLoad fontClass SC_thm zm_shrnk "+d;var h=["FONT",{attrs:{"class":d},child:[["text",e]]}];return h},c}(),zmStreamsApp.PostActions=function(a){"use strict";return a}(zmStreamsApp.PostActions||Zmail.App.extend({})),zmStreamsApp.PostActions.models=function(a){"use strict";var b=zmText.get("streams");return a.Post=Zmail.Model.extend({getActivity:function(a){this.sync("getActivity",this,a)},like:function(a,c){var d=this,e=a?"getLikes":"like";this.sync(e,this,{elem:c,error:function(){d.get("isDeleted")&&_zm.succErrMsg("e",b.common.messages.deletedPost),c.removeClass("zmLockLike")}})},lockInvites:function(){this.sync("lockInvites",this,{})},addRemoveInvite:function(a,b){this.sync("invitee",this,{zuids:a,atype:b?"addInvitee":"unInvite"})},setView:function(a,b){var c=this.get("views");c=c||{},c[a]=b,this.set("views",c)},getView:function(a){var b=this.get("views");return b[a]},removeView:function(a){var b=this.get("views");delete b[a],_.isEmpty(b)&&this.trigger("destroy",this)},fetchInvitees:function(a){a.list?this.set({inviteeList:a.list,shGroup:a.shgroup,inviteeUsers:a.users}):this.sync("getInvitees",this,{})},updateModel:function(a,b,c,d){var e=this.data;if("like"===c){var f=e.like,g=b.get("likes"),h=b.get("likeList")||{},i=h.hasOwnProperty(zmail.zuid);if(b.set("like",f),f&&!i||!f&&i){if(g=f?g+1:g-1,f){var j=zmStreamsApp.util.getContactDetails([zmail.zuid])[zmail.zuid];h[zmail.zuid]=j.fn}else delete h[zmail.zuid];b.set("likeList",h),b.set("likes",g)}else b.trigger("change:like")}else if("getLikes"===c){var k=b.get("likeList"),l=a.users;k&&_.size(k)&&$.extend(l,k),b.set("likeList",l),b.set("likes",_.size(l)),b.trigger("change:liked",l,d)}else if("lockInvites"===c){var m=b.get("lockInvites");b.get("by")!==zmail.zuid&&b.set("showinvite",m),b.set("lockInvites",!m)}else if("invitee"===c){var n="addInvitee"===e.actionType,o=String(e.fZuid).split(","),p=b.get("inviteeList")||{};if(n){var q,r=o.length;for(q=0;q<r;q++)p[o[q]]=zmail.zuid}else delete p[o];b.set("invitee",Object.keys(p).length),b.set("inviteeList",p),"1"===String(b.get("etype"))&&zmStreamsApp.CommentModule.updateInvitees({eid:b.id,type:e.actionType,inviteeList:o.join(",")}),b.trigger("change:InviteeList")}else if("getActivity"===c){var s=zmStreamsApp.util.orderComments(a.list,a.order);b.set("activityLog",s,{silent:!0}),b.trigger("change:activityLog",d)}},url:zmail.conPath+"/post.do",serialized:function(a,c){var d=this;c.callback=d.updateModel;var e={entityId:d.id,entityType:d.get("etype"),streamsView:!0,groupId:d.get("groupId")};c.extraParam={elem:c.elem,isSeeMore:c.isSeeMore},c.success=function(b){c.callback(b,d,a,c.extraParam)},"like"===a?(e.mode="like",e.like=!d.get("like"),e.actionType=e.like?"like":"unlike",e.authorZuid=d.get("by")):"getLikes"===a?(e.mode="like",e.actionType=d.get("actionType"),c.error=function(){d.get("isDeleted")&&_zm.succErrMsg("e",b.common.messages.deletedPost)}):"invitee"===a?(e.mode="invite",e.actionType=c.atype,e.fZuid=c.zuids,this.get("postUuid")&&(e.cdate=d.get("postUuid")),c.error=function(){d.get("isDeleted")&&_zm.succErrMsg("e",b.common.messages.deletedPost)}):"getInvitees"===a?(e.mode="invite",e.actionType=d.get("actionType"),c.success=""):"lockInvites"===a?(e.mode="lockinvites",e.actionType=d.get("lockInvites")?"unlockInvites":"lockInvites",c.error=function(){d.get("isDeleted")&&_zm.succErrMsg("e",b.common.messages.deletedPost)}):"getActivity"===a&&(e.mode="activity",e.actionType=d.get("groupId")===zmail.zuid?"viewSelfData":"viewGroupEntity");var f=e.entityId;return f&&f.indexOf("#")!==-1&&(e.entityId=f.substring(f.indexOf("#")+1,f.length)),e}}),a.PostsCollection=Zmail.Collection.extend({model:a.Post}),a}(zmStreamsApp.PostActions.models),zmStreamsApp.PostActions=function(a){"use strict";return a}(zmStreamsApp.PostActions||Zmail.App.extend({})),zmStreamsApp.PostActions.views=function(a){"use strict";var b=zmText.get("streams");return a.Post=Zmail.View.extend({template:zmStreamsApp.PostActions.template,events:{"click .msi-love":function(a){var b=$(a.currentTarget);b.hasClass("zmLockLike")||b.hasClass("pointerEventsNone")||(b.toggleClass("zmLockLike"),this.applyLike(b))},"click .msi-love + font":function(a){var b=this.model.get("likeList")||{},c=a.currentTarget,d=_.size(b);d&&this.model.get("likes")===d?this.likeCount(b,{elem:c}):this.model.like(!0,c)},"click .lockInviteClass":function(){this.model.lockInvites()},"click .clicktoLoad":"addinvitee","click .msi-invitee + font":"showInvitee","click .SndPrvO":"addPrivateToOwner","click .ShwPrv":"showHidePrivateComments","click .SCShowinvite":"showInviteeList","click .SC_seemore":function(a){var b=$(a.currentTarget).parents(".SCSpostAct");zmStreamsApp.PostActions.getActivityLogs(this.model,!0,b)},"click .timeline":function(a){var b=$(a.currentTarget);b.next().toggle(),b.parent().find(".SC_seemore").toggle()}},applyLike:function(a){var c=this.model,d=c.get("like"),e=a.next().text(),f=a.parent(),g=c.get("likeList")||{};if(""===e&&(e=0),e=parseInt(e),d)f.removeClass("contentILiked"),zmComponent.tooltip({elm:a[0],text:b.streams.tooltip.likePost,arrow:"top"}),e&&(e-=1),_.size(g)&&delete g[zmail.zuid];else{f.addClass("contentILiked"),zmComponent.tooltip({elm:a[0],text:b.streams.tooltip.unlikePost,arrow:"top"}),e+=1;var h=zmStreamsApp.util.getContactDetails([zmail.zuid])[zmail.zuid];g[zmail.zuid]=h.fn}e<=0?(e="",a.next().hide(),f.removeClass("contentLiked")):(a.next().show(),f.addClass("contentLiked")),c.set("likeList",g),c.set("likes",e),a.next().text(e),this.model.like("",a)},like:function(){var a=this.model,c=this.$el,d=c.find(".msi-love"),e=d.parent();d.removeClass("zmLockLike"),a.get("like")&&!e.hasClass("contentILiked")?(e.addClass("contentILiked "),zmComponent.tooltip({elm:d[0],text:b.streams.tooltip.unlikePost,arrow:"top"})):!a.get("like")&&e.hasClass("contentILiked")&&(e.removeClass("contentILiked "),zmComponent.tooltip({elm:d[0],text:b.streams.tooltip.likePost,arrow:"top"}));var f=a.get("likes")||"",g=e.children("font:first");f=parseInt(f)<=0?"":f,g.text(f),f&&!e.hasClass("contentLiked")?(g.show(),e.addClass("contentLiked")):!f&&e.hasClass("contentLiked")&&(g.hide(),e.removeClass("contentLiked"))},showInviteeList:function(){var a=this.model.get("sharedUsers");_.isArray(a)||(a=Object.keys(a)),zmStreamsApp.util.showMembersDialog(a,b.common.labels.folderShareList)},addPrivateToOwner:function(a){var b=a.currentTarget,c=$(b).data("commentView"),d=$(b).parents(".SCS_postWra"),e=d.siblings(".sc_cmdv");e.length||(e=d.children(".sc_cmdv").length?d.children(".sc_cmdv"):$(b).parents(".SCS-post").children(".sc_cmdv")),$(b).hide(),zmStreamsApp.CommentModule.sendPrivateToOwner(this.model.id,e,c)},showHidePrivateComments:function(a){var c=a.currentTarget,d=$(c).parents(".SCS_postWra"),e=d.siblings(".sc_cmdv");e.length||(e=d.children(".sc_cmdv").length?d.children(".sc_cmdv"):$(c).parents(".SCS-post").children(".sc_cmdv"));var f=$(e).find("ul.pvtOwn");f.length&&("none"===f[0].style.display?(f[0].style.display="",c.childNodes[1].textContent=b.common.labels.hidePrivateComments):(f[0].style.display="none",c.childNodes[1].textContent=b.common.labels.showPrivateComments))},likeCount:function(a,b){a=a||{};var c,d=this.$el.find(".msi-love").next(),e=[];for(var f in a)c=zmStreamsApp.util.getContactDetails([f])[f],c.isDummyObj&&(c.fn=a[f]),e.push(c);e.length?($(d).text(e.length),zmStreamsApp.util.createPopup({items:e,parent:b.elem,ulclass:"SC_Pr",parentClass:"SC_Slke",type:"oneLine"})):$(d).text("")},addinvitee:function(a){var c=this,d=a.currentTarget,e=c.model.get("isDeleted");if(!$(d).hasClass("clicktoLoad")||$(d).hasClass("locked")||e)e&&_zm.succErrMsg("e",b.common.messages.deletedPost);else{$(d).addClass("locked");var f={items:c.model.get("inviteeList"),shGroup:c.model.get("shGroup"),parent:d,isOwner:c.model.get("isOwner"),type:"invitee_popup",invite:!0};this.model.sync("getInvitees",c.model,{}).done(function(a){return a=a[1],$.isEmptyObject(a)||c.model.fetchInvitees(a),!(!_.size(a.list)&&!c.model.get("streamsEnabled"))&&(f.items=a.list,f.shGroup=a.shgroup,f.users=a.users,f.showInvite=c.model.get("showinvite")&&c.model.get("streamsEnabled"),f.dialogDidMount=function(a){c.bindInvitee(c,a.$els.$contentWrapper)},f.showInvite&&(f.buttons=[{name:b.common.labels.invite,callback:function(a){var b=$(a.$els.$contentWrapper).find("input"),d=zmAutoFill.getAddress(b,"id");d&&c.model.addRemoveInvite(d,!0),zmStreamsApp.util.hideMenu(),a.remove()}},{name:b.common.labels.cancel,callback:function(a){a.remove(),zmStreamsApp.util.hideMenu()},isCancel:!0}]),zmStreamsApp.util.createDialog(f),void $(d).removeClass("locked"))})}},bindInvitee:function(a,b){var c=$(b).find(".zm_sgst"),d=a.model.get("inviteeList"),e=a.model.get("groupId"),f=a.model.get("mentionList"),g=[];d&&!_.isArray(d)&&(g=Object.keys(d));var h=a.model.get("by");zmStreamsApp.util.isGroupMember(h,e)&&g.push(h),f&&!_.isArray(f)&&(f=Object.keys(f)),g=_.union(g,f);var i={contentArray:"org:"+e,compare:["fn","","nn","eid"],LType:"3",OType:"2",display:"fn",eliminateAt:!0,restrict:g,groupId:!0,addtolist:!0};zmAutoFill.setAutofill(i,c),zmAutoFill.resizeInput(c),$(b).find(".SC_cs .msi-close").click(function(){var b=$(this).parent(),d=$(b).data("uid");$(b).parent().remove(),a.model.addRemoveInvite(d),g=_.without(g,String(d)),i.restrict=g,zmAutoFill.setAutofill(i,c)})},showInvitee:function(a){var b=this.model,c=a.currentTarget,d={items:b.get("inviteeList"),shGroup:b.get("shGroup"),parent:c,ulclass:"SC_Phr SC_P2r",type:"invitee_popup",parentClass:"SC_Sinv"};if(this.model.get("inviteeList"))zmStreamsApp.util.createPopup(d);else{var e=this;this.model.sync("getInvitees",b,{}).done(function(a){a=a[1],$.isEmptyObject(a)||e.model.fetchInvitees(a),d.items=a.list,d.shGroup=a.shgroup,zmStreamsApp.util.createPopup(d)})}},lockInvitee:function(){var a=this.model,c=a.get("id"),d=this.$el,e=d.find(".msi-invite"),f=a.get("lockInvites");f?e.filter(".msi-invite").removeClass("msi-Ainvitee inviteeColor").addClass("msi-Dinvitee"):e.filter(".msi-invite").removeClass("msi-Dinvitee").addClass("msi-Ainvitee inviteeColor");var g=e.filter(".msi-invite");g.hasClass("cursorDefault")?g.hasClass("msi-Dinvitee")&&zmComponent.tooltip({elm:g[0],text:b.streams.tooltip.ownerdeny,arrow:"top"}):g.hasClass("lockInviteClass")&&(g.hasClass("msi-Ainvitee")?zmComponent.tooltip({elm:g[0],text:b.common.labels.denyInvites,arrow:"top"}):g.hasClass("msi-Dinvitee")&&zmComponent.tooltip({elm:g[0],text:b.common.labels.allowInvites,arrow:"top"}));var h=zmStreamsApp.PostApp?zmStreamsApp.PostApp.models.posts:[];if(_.size(h)&&(h=h.get(c)||{},_.size(h))){h.get("myact").showinvite=a.get("showinvite");var i=zmStreamsApp.util.getMentionList(h);zmStreamsApp.CommentModule.setMentions(c,i)}a.trigger("change:InviteeList")},activityLog:function(a){var b=$(a.elem).find(".SCSpostAct").length?$(a.elem).find(".SCSpostAct"):$(a.elem).filter(".SCSpostAct"),c=this.model,d=c.get("activityLog");if(d.length){$(b).find(".SCS_activitiyFeed").remove();var e={isSeeMore:a.isSeeMore,groupId:c.get("groupId"),isDraft:c.get("isDraft"),etype:c.get("etype"),shared:c.get("shared")};$(b).prepend(this.template.activityLogs(d,c.get("shGroup"),e))}},inviteeCount:function(){var a=this.model,c=this.template,d=this.$el,e=d.find(".msi-invite"),f=$(e).next(),g=a.get("invitee"),h=a.get("inviteeList");h&&!_.isArray(h)&&(h=Object.keys(h)),g||h.length?$(f).removeClass("SC_dyn"):$(f).addClass("SC_dyn");var i=[];h.length&&h[0].length&&(i=_zm.getDOM(c.showImageInvite(h))),$(d).find(".imageList").remove(),$(d).find(".fontClass").remove();var j=a.get("isOwner")||!a.get("lockInvites")||a.get("by")===zmail.zuid,k=_zm.getDOM(c.getFontDOM(h.length,j)),l=$(d).find(".msi-invite").parent();l.append(i),l.append(k);var m=$(k).filter(".fontClass"),n=$(i).filter(".imageList"),o=a.get("showinvite")?b.streams.tooltip.addviewinvite:b.streams.tooltip.viewinvite;if(m.length&&zmComponent.tooltip({elm:m[0],text:o,arrow:"top"}),n.length)for(var p,q=n.find(".imgList"),r=0;r<q.length;r++)p=$(q[r]).attr("name"),$(q[r]).length&&p&&zmComponent.tooltip({elm:q[r],text:p,arrow:"top"})},initialize:function(){this.render(),this.listenTo(this.model,"change:like",this.like),this.listenTo(this.model,"change:liked",this.likeCount),this.listenTo(this.model,"change:InviteeList",this.inviteeCount),this.listenTo(this.model,"change:lockInvites",this.lockInvitee),this.listenTo(this.model,"change:activityLog",this.activityLog)},addTitle:function(){var a=this.$el,c=$(a).find(".msi-love");c.length&&(this.model.get("like")?zmComponent.tooltip({elm:c[0],text:b.streams.tooltip.unlikePost,arrow:"top"}):zmComponent.tooltip({elm:c[0],text:b.streams.tooltip.likePost,arrow:"top"}));var d=$(a).find(".msi-invite");d.hasClass("cursorDefault")?d.hasClass("msi-Dinvitee")&&zmComponent.tooltip({elm:d[0],text:b.streams.tooltip.ownerdeny,arrow:"top"}):d.hasClass("lockInviteClass")&&(d.hasClass("msi-Ainvitee")?zmComponent.tooltip({elm:d[0],text:b.common.labels.denyInvites,arrow:"top"}):d.hasClass("msi-Dinvitee")&&zmComponent.tooltip({elm:d[0],text:b.common.labels.allowInvites,arrow:"top"}));var e=$(a).find(".fontClass"),f=$(a).find(".imageList");if(this.model.get("showinvite")?e.length&&zmComponent.tooltip({elm:e[0],text:b.streams.tooltip.addviewinvite,arrow:"top"}):e.length&&zmComponent.tooltip({elm:e[0],text:b.streams.tooltip.viewinvite,arrow:"top"}),f.length)for(var g,h=f.find(".imgList"),i=0;i<h.length;i++)g=$(h[i]).attr("name"),$(h[i]).length&&g&&zmComponent.tooltip({elm:h[i],text:g,arrow:"top"})},onClose:function(){this.remove()},render:function(){var a=this.model,b=a.get("lockInvites");if(void 0===b){var c=a.get("id");c.indexOf("#")===-1&&(c=a.get("groupId")+"#"+c),b=zmStreamsApp.CommentModule.getLockValue(c),a.set("lockInvites",b)}var d,e=this.cid;return d=a.get("isSharedFolder")?this.template.showInviteeList(a.get("sharedUsers")):this.template.actionData(a.toJSON()),this.$el=$(d),this.addTitle(),$(d).attr("data-postActionViewId",e).attr("data-id",a.id),this.model.setView(e,this),this}}),a}(zmStreamsApp.PostActions.views);