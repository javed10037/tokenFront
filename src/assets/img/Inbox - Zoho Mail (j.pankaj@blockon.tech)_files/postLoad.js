define([],function(a){"use strict";var b=a("zmUtil"),c=a("zmAppLoader");return b.loadWms(),zmail.isWSEnabled&&c.load("websocket"),a("ZE_Init").init(),zmail.fromOtherService||(a("zmNCenter").init(),b.updateStreamUnread(),b.addClickHandlerForStreams(),c.load("updater",{forceLoad:!0,avoidCache:!0}).done(function(){var b=a("_updater");b&&"function"==typeof b.init&&b.init("5")})),b.addClickHandlerForMailTo(),b.addClickHandlerForTasks(),a("zmComponent").keybindings.registerAll({scope:"default",shortcuts:a("zmshCut")["default"]}),{}}),zmail.projectsInteg=function(a){"use strict";var b=zmText.get("preUtils","integration"),c="//projects."+zmail.zohoUrl,d=zmText.applyArgs(b.projects.noPortal,{link:"<a class='SC_link' target='_blank' href='"+c+"'>",companyName:zmail.globalI18N.companyName,closeLink:"</a>"}),e="<a id='helpDocLink' target='_blank' class='SC_thm cursorPointer'>"+b.projects.learnMore+"</a>",f={oldSettings:function(){var a=zmText.get("settings","misc");return"<ul><b>"+a.zohoprojectscap+'</b><li><label><i class="msi-uncheck" id="projinteg_switch"></i><span class="pl5" >'+a.enable_zohoprojects+'</span></label><div class="pt10"><div class="SC_select SC_op3 SC_nopntr" id="portalSelection"><select id="projectsPortal" required></select></div></div><div class="pt10 notes"><div id="errorMsgEle"><span></span></div><br/><span id="proj_description">'+b.projects.description+". "+e+"</span></div></li></ul>"},newSettings:function(){var a=zmail.imgPath+"project_integration.png";return'<div class="startup pln"><div class="SC_integrationBox"><img src="'+a+'" class="SC_integrationImg"><div class="SC_project SC_dyn" id="errorMsgEle"><span></span></div><div class="SC_integrationDiv"><h3>'+zmText.applyArgs(b.projects.title,{companyName:zmail.globalI18N.companyName})+'<div class="onoffButton"><div id="projinteg_switch" data-on="ON" data-off="OFF" class="sdiv sadiv"></div></div></h3><div class="SC_select SC_op3 SC_nopntr" id="portalSelection"><select id="projectsPortal" required></select></div><div id="proj_description">'+b.projects.description+". "+e+"</div></div></div>"}},g={fetchPortalsList:function(){var b=$.Deferred();return $.ajax({url:zmail.conPath+"/projects/portals/",type:"GET"}).done(function(c,d,e){200===e.status&&(a.portalsList=[],a.portalsData={},c.portals.forEach(function(b){a.portalsList.push({id:b.id_string,name:b.name}),a.portalsData[b.id_string]=b,b["default"]&&(a.portalsData.defaultPortalId=b.id_string)}),1===c.portals.length&&(a.portalsData.defaultPortalId=c.portals[0].id_string)),b.resolve()}).fail(function(){b.resolve()}),b},constructPortalsList:function(){var b="";return a.portalsList=a.portalsList||[],a.portalsList.forEach(function(c){b+='<option value="'+c.id+'"'+(a.portalsData[c.id]["default"]?"selected":"")+">"+c.name+"</option>"}),b},updateIntegrationStatus:function(a,b,c){zmAdHocSettings.setProjectInteg({enabled:b,id:a});var d=zmail.Settings.Platform.Components.SettingCardItemManager,e=d.get("zohoprojects-integ");e&&e.setProp("value",b?"Enabled":"Disabled");var f={key:"_settIntegration",info:{action:"projectsIntegration",portalId:a,status:b}};c||zmCrosstab.renew("zm_mail",f)},bindActions:function(b){b.$el.find("#projinteg_switch").bind("click",function(c){if($.isEmptyObject(a.portalsData))zmAdHocSettings.getProjectInteg().enabled?(g.updateIntegrationStatus("",!1),b.$el.find("#projinteg_switch").removeClass().addClass("sdiv sadiv"),b.$el.find("#portalSelection").addClass("SC_op3 SC_nopntr")):(b.$el.find("#errorMsgEle>span").html(d),b.$el.find(".SC_integrationImg").addClass("SC_dyn"),b.$el.find("#errorMsgEle").removeClass("SC_dyn"));else{var e=$(c.target),f=!0,h="msi-check",i="msi-uncheck";h="sdiv",i="sdiv sadiv",e.hasClass(i)?(e.removeClass().addClass(h),b.$el.find("#portalSelection").removeClass("SC_op3 SC_nopntr")):(f=!1,e.removeClass().addClass(i),b.$el.find("#portalSelection").addClass("SC_op3 SC_nopntr"));var j=b.$el.find("#projectsPortal").val();j&&g.checkAndUpdateSettings(j,f,b)}}),b.$el.find("#projectsPortal").bind("change",function(){var a=b.$el.find("#projectsPortal").val();g.checkAndUpdateSettings(a,!0,b)})},checkAndUpdateSettings:function(a,d,e){var f=zmail.projectsInteg.portalsData[a];if(f.project_count&&f.project_count.active)e.$el.find("#errorMsgEle").addClass("SC_dyn"),e.$el.find(".SC_integrationImg").removeClass("SC_dyn"),e.$el.find("#errorMsgEle>span").html(""),g.updateIntegrationStatus(a,d);else{var h=c+"/portal/"+f.name+"#allprojects",i=zmText.applyArgs(b.projects.noActiveProjects,{portalName:f.name,link:"<a class='SC_link' target='_blank' href='"+h+"'>",companyName:zmail.globalI18N.companyName,closeLink:"</a>"});e.$el.find(".SC_integrationImg").addClass("SC_dyn"),e.$el.find("#errorMsgEle>span").html(i),e.$el.find("#errorMsgEle").removeClass("SC_dyn")}},fillData:function(b){var c="https://www.zoho.com/mail/help/projects-integration.html";if(zmAdHocSettings.getProjectInteg().enabled){var e=a.portalsData[zmAdHocSettings.getProjectInteg().id].project_count,f="msi-check";f="sdiv",b.$el.find("#projinteg_switch").removeClass().addClass(f),b.$el.find("#portalSelection").removeClass("SC_op3 SC_nopntr"),(!e||e&&!e.active)&&g.checkAndUpdateSettings(zmAdHocSettings.getProjectInteg().id,!0,b)}$.isEmptyObject(a.portalsList)&&(c="https://www.zoho.com/projects/help/overview.html",b.$el.find("#errorMsgEle>span").html(d),b.$el.find(".SC_integrationImg").addClass("SC_dyn"),b.$el.find("#errorMsgEle").removeClass("SC_dyn"),b.$el.find("#projinteg_switch").addClass("SC_nopntr"),b.$el.find("#portalSelection").remove(),b.$el.find("#proj_description").css("font-size","15px")),b.$el.find("#projectsPortal").val(zmAdHocSettings.getProjectInteg().id),b.$el.find("#helpDocLink").attr("href",c)}},h={oldSettingsView:function(){function a(){this.$el=$(f.oldSettings()),g.bindActions(this)}return new a},newSettingsView:function(){function a(){this.$el=$(f.newSettings()),g.bindActions(this)}return new a}};return $.subscribe("settings/integrations/init",function(b,c){var d,e=$(_zm.getDOM(["DIV",{attrs:{"class":"SC_setInnerLft cl"}}]));c.isNewSettings?(d=h.newSettingsView(),e=$(_zm.getDOM(["li"]))):d=h.oldSettingsView(),e.append(d.$el),$.isEmptyObject(a.portalsList)?g.fetchPortalsList().done(function(){d.$el.find("#projectsPortal").append($(g.constructPortalsList())),g.fillData(d)}):(d.$el.find("#projectsPortal").append($(g.constructPortalsList())),g.fillData(d)),c.add({getView:function(){return e},index:-1})}),a.settings={view:h,util:{fetchPortalsList:g.fetchPortalsList,updateIntegrationStatus:g.updateIntegrationStatus}},a}(zmail.projectsInteg||{}),function(a){"use strict";function b(){var a=zmWidgets.getInstalledExtensionList();for(var b in a)if(/(Zoho[ ]?Desk)/i.test(a[b].appName)){k=a[b].pluginId,m=a[b].status,l=a[b].appId;break}}function c(){return'<div class="startup pln"><div class="SC_integrationBox"><div class="SC_project"><span>Desk integration enables you to manage tickets from mail</span></div><div class="SC_integrationDiv"><h3>Zoho Desk <div class="onoffButton"><div id="deskInteg_switch" data-on="ON" data-off="OFF" class="sdiv sadiv"></div></div></h3><div class="SC_select SC_op3 SC_nopntr" id="deskSelection"><select id="deskPortal" required></select></div></div></div></div>'}function d(){var a="";return j=j||[],j.forEach(function(b){a+='<option value="'+b.id+'"'+(b.isDefault?"selected":"")+">"+b.organizationName+"</option>"}),a}function e(){var a=$.Deferred();return n.fetchPortals().done(function(b){$.isEmptyObject(j)&&b?n.authenticateDesk().done(function(b){1===b[0]?n.fetchPortals().done(function(){a.resolve()}):a.resolve({error:"Unable to authenticate your desk account"})}):a.resolve()}),a}function f(){function a(){this.$el=$(c()),this.bindAction()}return a.prototype={bindAction:function(){var a=this;this.$el.find("#deskInteg_switch").bind("click",function(){var b=$(this);b.toggleClass("sadiv");var c=b.hasClass("sadiv"),d=c?2:1;c?a.$el.find("#deskSelection").addClass("SC_op3 SC_nopntr"):a.$el.find("#deskSelection").removeClass("SC_op3 SC_nopntr"),h?k&&n.updatePluginStatus(d).done(function(){zmWidgets.updateExtension(l,{status:d}),m=d}):$.isEmptyObject(j)||n.configureDeskPortal(a.$el.find("#deskPortal").val())}),this.$el.find("#deskPortal").bind("change",function(){n.changePortal($(this).val()).then(function(a){l&&zmWidgets.publishToWidget("deskPortalChange",a.data,l)})})}},new a}function g(a,c){b();var g=$(_zm.getDOM(["li"])),k=f().$el;g.append(k),void 0===j?e().done(function(a){k.find("#deskPortal").append($(d())),$.isEmptyObject(j)?(k.find("#deskPortal,#deskInteg_switch").addClass("SC_nopntr"),a&&k.find(".SC_project>span").text(a.error)):n.fetchActivePortal().done(function(a){$.isEmptyObject(a)||(h=a[0].integId,i=a[0].orgId,k.find("#deskPortal").val(i),1===m&&(k.find("#deskInteg_switch").removeClass("sadiv"),k.find("#deskSelection").removeClass("SC_op3 SC_nopntr")))})}):k.find("#deskPortal").append($(d())),c.add({getView:function(){return g},index:-1})}var h,i,j,k,l,m,n;n={fetchActivePortal:function(){var a=$.Deferred();return $.ajax({url:"/integPlatform/zohodeskAction.do",type:"POST",data:{action:"ZOHODESK_CONFIG",actionId:2,zmrcsr:zmAjq.getCookie("zmcsr")}}).done(function(b){1===b[0]?a.resolve(b[1].data):a.resolve()}).fail(function(){a.resolve()}),a},configureDeskPortal:function(a){$.ajax({url:"/integPlatform/zohodeskAction.do",type:"POST",data:{action:"ZOHODESK_CONFIG",actionId:1,orgId:a,zmrcsr:zmAjq.getCookie("zmcsr")}}).done(function(a,c,d){h=a[1].data.integId,i=a[1].data.orgId,zmWidgets.fetchInstalledPlugins({callback:b})})},fetchPortals:function(){var a=$.Deferred();return $.ajax({url:"/integPlatform/zohodeskAction.do",type:"GET",data:{action:"ZOHODESK_GET_ORG_ID"}}).done(function(b,c,d){j=[],1===b[0]&&b[1].data&&(b[1].data[0]&&(j=b[1].data),a.resolve(b[1].data))}).fail(function(){a.resolve()}),a},changePortal:function(a){var b=$.Deferred();return $.ajax({url:"/integPlatform/zohodeskAction.do",type:"POST",data:{action:"ZOHODESK_CONFIG",actionId:4,orgId:a,integId:h,zmrcsr:zmAjq.getCookie("zmcsr")}}).done(function(a){b.resolve(a[1])}).fail(function(){b.resolve()}),b},updatePluginStatus:function(a){return $.ajax({url:"/integPlatform/plugin/"+k+"/status?status="+a,type:"POST",data:{zmrcsr:zmAjq.getCookie("zmcsr")}})},authenticateDesk:function(){return $.ajax({url:"/integPlatform/zohodeskAction.do",type:"POST",data:{action:"ZOHODESK_CONFIG",actionId:0,zmrcsr:zmAjq.getCookie("zmcsr")}})}},zmail.isZohoDeskIntegEnabled&&$.subscribe("settings/integrations/init",g)}(),function(a){"use strict";a(zmail.Core.Namespaces.get)}(function(a){"use strict";var b=a("_"),c=a("zmail.Commander"),d=a("zmail.ValueTypeInferrer.TYPES");c.register([{name:"mail",group:"goto",description:["Go to Mail"],searchable:!0,action:function(){a("zmail.appList.appObj.mail").selectApp(),a("zmApp").showApp("m")}},{name:"new-mail",group:"goto-mail",description:["New Mail"],searchable:!0,action:function(){a("zmUtil").hideMenu(),a("zmUtil").compose()}},{name:"goto-folder",searchable:!1,description:["Go to Folder"],type:d.Folder.name,getDisplayValue:function(a){return a.path},action:function(c){this.execute("mail");var d=c;b.isObject(c)&&(d=c.id),a("zmList").showMailListing({fId:d})}},{name:"select-and-goto-folder",group:"goto-mail-folders",description:["Go to Folder"],searchable:!0,action:function(){var b=this;this.preventDefault(),b.setPlaceholder("Select Folder"),this.showList({provider:a("zmfolAction").getMailFolderPaths(),text:"path",filterProps:"path"}).then(function(a){b.execute("goto-folder",a),b.reset()})}},{name:"goto-mail-view",searchable:!1,description:["Go to View"],type:d.MailView.name,getDisplayValue:function(a){return a.name},action:function(c){this.execute("mail");var d=c;b.isObject(c)&&(d=c.id),a("zmList").showMailListing({fId:d})}},{name:"select-and-goto-mail-view",group:"goto-mail-view",description:["Go to View"],searchable:!0,action:function(){var a=this;this.preventDefault(),a.setPlaceholder("Select View"),this.showList({provider:d.MailView.supportedValues,text:"name",filterProps:"name"}).then(function(b){a.execute("goto-mail-view",b),a.reset()})}},{name:"goto-tag",searchable:!1,description:["Go to Tag"],type:d.Tag.name,getDisplayValue:function(a){return a.dispName},action:function(c){this.execute("mail");var d=c;b.isObject(c)&&(d=c.id),a("zmList").showMailListing({fId:d})}},{name:"select-and-goto-tag",group:"goto-mail-tag",description:["Go to Tag"],searchable:!0,action:function(){var a=this;this.preventDefault(),a.setPlaceholder("Select Tag Name"),this.showList({provider:b.toArray(zmail.labInfo),text:"dispName",filterProps:"dispName"}).then(function(b){a.execute("goto-tag",b),a.reset()})}},{name:"create-bookmark",description:["New Bookmark"],action:function(b){a("zmUtil").loadLink({mode:"create"})}},{name:"goto-saved-search",searchable:!1,description:["Go to Saved Search"],type:d.SavedSearch.name,getDisplayValue:function(a){return a.FN},action:function(b){var c=a("zmSearch");if(c&&c.processSavedSearch)return c.processSavedSearch({id:b.id,mode:"get"})}},{name:"create-bookmark-value",searchable:!1,description:["Add Bookmark"],type:d.Link.name,getDisplayValue:function(a){return a},action:function(b){a("zmUtil").loadLink({mode:"create",link:b})}},{name:"goto-streams-entity",searchable:!1,description:["Go to Link"],type:d.StreamsLink.name,getDisplayValue:function(a){return a},action:function(b){a("zmUtil").openStreamsUrl(b)}},{name:"calendar",group:"goto",description:["Go to Calendar"],searchable:!0,action:function(){a("zmail.appList.appObj.cal").selectApp(),a("zmApp").showApp("c")}},{name:"new-calendar-event",group:"goto-calendar",description:["New Event"],searchable:!0,action:function(){a("zmUtil").hideMenu(),a("zmApp").loadCalendar("/calendar/event")}},{name:"task",group:"goto",description:["Go to Task"],searchable:!0,action:function(){a("zmail.appList.appObj.task").selectApp(),a("zmApp").showApp("t")}},{name:"new-task",group:"goto-task",description:["New Task"],searchable:!0,action:function(){a("zmUtil").hideMenu(),a("zmUtil").loadTask({action:"addCTask",groupId:zmail.zuid})}},{name:"notes",group:"goto",description:["Go to Notes"],searchable:!0,action:function(){a("zmail.appList.appObj.notes").selectApp(),a("zmApp").showApp("n")}},{name:"new-notes",group:"goto-notes",description:["New Note"],searchable:!0,action:function(){a("zmUtil").hideMenu(),"n"===a("zmApp").currentApp?a("znNote").createInlineNotes():a("zmUtil").loadNotes("popup")}},{name:"streams",group:"goto",description:["Go to Streams Home"],searchable:!0,action:function(){return a("zmsuite").loadStreams()}},{name:"goto-streams-group",searchable:!1,description:["Go to Streams"],type:d.Group.name,getDisplayValue:function(a){return zmail.ContactBook.isGroup(a)?a.get("name"):a.name},action:function(c){var d=c;b.isObject(c)&&(d=c.id),a("zmsuite").loadStreams(d)}},{name:"select-and-goto-streams-group",group:"goto-streams",description:["Go to Streams Group"],searchable:!0,action:function(){var a=this;this.preventDefault(),a.setPlaceholder("Select Group Name"),this.showList({provider:zmail.ContactBook.getGroups().map(function(a){return a.attrs}),text:"name",filterProps:"name"}).then(function(b){a.execute("goto-streams-group",b),a.reset()})}},{name:"attachment",group:"goto",description:["Go to Attachment Viewer"],searchable:!0,action:function(){a("zmsuite").loadAttachView()}}])});