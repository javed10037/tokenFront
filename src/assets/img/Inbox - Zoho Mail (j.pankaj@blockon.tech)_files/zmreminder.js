window.zmWatch=function(){"use strict";var a={},b=function(a,b,c){a.accId=zmail.accId,zmAjq.XHR({u:zmail.conPath+"/watch.do",t:"POST",fn:c,p:a,ep:b})},c=function(){var a=zmText.get("zmreminder");return a}(),d={getTxt:function(){var a=['<tr id="zmWatch_type_{{cmpId}}">','<td class="ZM_SCType">','<label data-val="zm_watchType_3"><i class="msi-unoption"></i>','<span data-tooltip="'+c.watch.response_tooltip+'">'+c.watch.response+"</span>","</label>",'<label data-val="zm_watchType_2">','<i class="msi-unoption"></i>','<span data-tooltip="'+c.watch.noreply_tooltip+'">',c.watch.noreply+"</span></label>",'<label data-val="zm_watchType_1">','<i class="msi-unoption"></i>','<span data-tooltip="'+c.watch.regardless_tooltip+'">',c.watch.regardless+"</span></label>","</td>","</tr>"],b=['<tr id="zmWatch_header_{{cmpId}}">',"<td>",'<div id="zmWatch_clear_{{cmpId}}" class="SC_frt SC_link SC_dyn SC_thm">',c.watch.clear+"</div><b>",c.watch.remind+"</b></td>","</tr>"],d=['<tr id="zmWatch_desc_{{cmpId}}">',"<td>",'<textarea id="zmWatch_txtdesc_{{cmpId}}"',' placeholder="'+c.watch.adddes+'"',' class="SC_tiput" style="resize: none;">',"</textarea>","</td>","</tr>"],e=['<tr id="zmWatch_option_{{cmpId}}">',"<td>",'<div class="SC_dib">','<div class="SC_dib" ','data-val="zm_reminderDate" ','data-tooltip="'+c.watch.remindon+'">','<input class="SC_input" type="textbox" data-type="date" readonly>',"</div>",'<div class="SC_dib" data-val="zm_reminderTime">','<input class="SC_input" type="textbox" data-type="time">',"</div>",'<div class="SC_dib" data-val="zm_reminderMode">','<div class="SC_select" data-tooltip="'+c.watch.remindmode+'">',"<select>",'<option value="0">'+c.watch.bynotif+"</option>",'<option value="1">'+c.watch.bymail+"</option>","</select>","</div>","</div>","</div>",'<div class="SC_mt10 checkBox" data-val="zm_reminderType_1">','<i class="msi-uncheck"></i>','<label data-tooltip="'+c.watch.remindrecip_tooltip+'">',c.watch.remindrecip+"</label>","</div>","</td>","</tr>"],f=['<tr id="zmWatch_editor_{{cmpId}}" class="SC_dyn">','<td><div id="zmWatch_editor_load_{{cmpId}}" class="zmCE">',"</div></td></tr>"],g=["<tr><td>",'<div class="SC_PUbtm">','<span id="zmWatch_save_{{cmpId}}">'+c.watch.addrem+"</span>",'<span id="zmWatch_close_{{cmpId}}">'+c.buttons.close+"</span>","</div>","</td></tr>"],h={};return h.header=b,h.type=a,h.desc=d,h.editor=f,h.option=e,h.button=g,h},getWatchTxt:function(a){var b=zmWatch.getTxt(a),c=[],d=[],e=[];b.type&&(c=b.type),b.option&&(d=b.option),b.editor&&(e=b.editor);var f=['<div id="zmWatch_{{cmpId}}">','<table class="SC_schd">',"<tbody>",c.join(""),d.join(""),e.join(""),"</tbody>","</table>","</div>"];return f.join("")},showWatch:function(b){var c={},d=!1;if(!zmUtil.isChildWindow()&&"compose_tab"===b.openWatch){var e=zmComp.getObj(b.msgId);e.RMOBJ&&!$.isEmptyObject(e.RMOBJ)&&(c=e.RMOBJ),e._reminder_draft&&(d=!0)}var f=b.msgId;a[f]||(a[f]={}),$.isEmptyObject(c)||(a[f]._load_type||(a[f]._load_type="drafted"),a[f]._draft_obj=c,d&&(a[f]._reminder_draft=d)),a[f].openWatch=b.openWatch,a[f].dialogType=b.loadType,a[f].calleeObj=b,zmWatch.watchDialog(f)},updateDialog:function(a){var b=a.config.cmpId;a.$els.$positionWrapper.addClass("SC_PopTop"),a.$els.$positionWrapper.css("top","150px"),zmWatch.triggerWatch(b),"undefined"!=typeof window.event&&zmUtil.stopEvents(window.event)},modifyDialog:function(b){var d=b.config.cmpId;a[d]._dDialog=b;var e=['<span class="sel" id="zmWatch_save_'+d+'">'+c.watch.addrem+"</span>",'<span data-val="Cancel" id="zmWatch_close_'+d+'">'+c.buttons.close,"</span>",'<label  data-val="Cancel" id="zmWatch_clear_'+d+'" ','class="SC_frt SC_link SC_dyn SC_thm">'+c.watch.clear+"</label>"],f=['<div id="zmWatch_error_band_'+d+'" class="SC_msg SC_emsg SC_dyn"><span>','<font  id="zmWatch_server_error_'+d+'"></font>','<i id="zmWatch_error_close_'+d+'" class="msi-close"></i></span></div>'];b.$els.$contentWrapper.before(f.join("")),b.$els.$content.attr("id","zmwatch_center_"+d),b.$els.$buttonContainer.html(e.join(""))},watchDialog:function(b){var d=[{attrs:'id="zmWatch_save_'+b+'" data-watch="add"',callback:function(){zmsDialog.remove()}}],e=zmWatch.loadWatch(b);a[b]._watchDOM=e;var f={};f.title=c.watch.remind,f.cmpId=b,f.openWatch=a[b].openWatch;var g='<h3><i class="msi-mail SC_thm"></i><label id="zm_reminder_dialog_title_'+b+'">';g+="</label></h3>";var h=$("<div/>");h.append(g),h.append(e),f.$content=h,f.buttons=d,f.ignoreMouseDown=!1,f.dialogDidMount=function(a){var d=a.config.cmpId,e=a.config.openWatch,f="";if(zmail.mailObj&&zmail.mailObj[d]&&zmail.mailObj[d].SB&&(f=zmail.mailObj[d].SB),e&&"compose_tab"===e){f=c.nosubject;var g=zmComp.getSubject(b);g&&""!==$.trim(g)&&(f=$.trim(g))}f=_zm.unescapeTags(f),$("#zm_reminder_dialog_title_"+d).text(f),zmWatch.updateDialog(a)},f.dialogWillMount=function(a){zmWatch.modifyDialog(a)},Dialog["new"](f)},listDialog:function(b,d){var e=b.msgId;a[e]||(a[e]={}),a[e].openWatch=b.openWatch,a[e].dialogType=b.loadType,a[e].calleeObj=b,a[e]._dDialog=d;var f=$("<label/>");f.text(c.watch.clear),f.attr("id","zmWatch_clear_"+e),f.addClass("SC_frt SC_link SC_thm SC_dyn"),d.getButtonContainer().append(f);var g=zmWatch.loadWatch(e);d.getCenterElem(d.configOption.tabs[0].tabName).append(g),a[e]._watchDOM=g,zmWatch.triggerWatch(e)},listDOM:function(a){var b,c,d=zmCenterListing.mailObjectAPI.getViewObject(a);return d?b=d.$element:(c=zmsuite.getCenter("zm_Container")[0].getNodes()[2].$el,c.length&&(b=c.find("#"+a))),b},updateWatch:function(b,d){var e=d.cmpId,f="",g=d.watchMode,h=zmWatch.listDOM(e);if("success"===b.stat)"a"!==g&&"u"!==g||(zmail.mailObj&&zmail.mailObj[e]&&(zmail.mailObj[e].RMOBJ=d.RMOBJ,a[e].reminder=!0),"a"===g&&(f=c.errors.watchadd),"u"===g&&(f=c.errors.watchupd),$("#zmprv_header_"+e+"_remind*").removeClass("SC_dyn"),h.length&&!h.find(".SC_mdata").length&&h.find(".zmDtl").prepend('<div class="SC_mdata"></div>')),"d"===g&&($("#zmprv_header_"+e+"_remind*").addClass("SC_dyn"),h.length&&h.find(".SC_mdata").length&&h.find(".SC_mdata").remove(),zmail.mailObj&&zmail.mailObj[e]&&delete zmail.mailObj[e].RMOBJ,f=c.errors.watchrem),zmWatch.closeWatch(e),zmWatch.hideWatch(e),_zm.succErrMsg("s",f);else{$("#zmWatch_save_"+e).off("click").on("click",function(){zmWatch.addWatch(e,$(this))});var i=$("#zmWatch_save_"+e).attr("vtxt");$("#zmWatch_save_"+e).text(i),"a"===d.watchMode&&(b.emsg?zmWatch.errorShow(e,b.emsg):_zm.succErrMsg("e",c.errors.probadd)),"d"===d.watchMode&&(b.emsg?zmWatch.errorShow(e,b.emsg):_zm.succErrMsg("e",c.errors.probrem)),"u"===d.watchMode&&(b.emsg?zmWatch.errorShow(e,b.emsg):_zm.succErrMsg("e",c.errors.probupd))}},errorShow:function(b,c){a[b]&&a[b]._dDialog&&"header_all"===a[b].openWatch?a[b]._dDialog.showSuccErrMsg("e",c):($("#zmWatch_error_band_"+b).removeClass("SC_dyn"),$("#zmWatch_server_error_"+b).text(c),$("#zmWatch_error_close_"+b).off("click").on("click",function(){$("#zmWatch_error_band_"+b).addClass("SC_dyn")}))},errorHide:function(a){$("#zmWatch_error_band_"+a).addClass("SC_dyn")},getWatchType:function(b){return a[b].WT},setWatchType:function(b,c){a[b].WT=c},getReminderType:function(b){return a[b].RMT},setReminderType:function(b,c){a[b].RMT=c},getReminderMode:function(b){return a[b].RMM},setReminderMode:function(b,c){a[b].RMM=c},getReminderDesc:function(b){return a[b].RMDSC},setReminderDesc:function(b,c){a[b].RMDSC=c},getReminderDate:function(b){return a[b].RMD},setReminderDate:function(b,c){a[b].RMD=c},getEditor:function(b){return a[b].editor},setEditor:function(b,c){a[b].editor=c},allowWatch:function(b){var c,d=!1;return a[b]&&a[b].WT&&(c=a[b].WT),1!==c&&2!==c&&3!==c||(d=!0),d},loadWatch:function(a){var b=zmWatch.getWatchTxt(a);return b=b.replace(/{{cmpId}}/g,a),$(b)},getHours:function(a){var b=zmWatch.getWatchDateEle(a)._time_elm,c=b.val();c=$.trim(c);var d=c.split(" "),e=d[1],f=d[0].split(":"),g=f[0];return"pm"===e&&(g=String(parseInt(f[0])+12)),g+":"+f[1]},getCurrentDate:function(){var a,b,c,d,e=zmWatch.getCurrentDateObj();return e&&(a=e.getDate(),b=e.getMonth()+1,c=e.getFullYear(),a<10&&(a="0"+a),b<10&&(b="0"+b)),"dd/mm/yyyy"===zmail.userDateFormat.toLowerCase()?d=a+"/"+b+"/"+c:"mm/dd/yyyy"===zmail.userDateFormat.toLowerCase()&&(d=b+"/"+a+"/"+c),d},getCurrentDateObj:function(a){var b=new Date,c=a||zmail.timeZoneOffset,d=b.getTime()+6e4*b.getTimezoneOffset(),e=new Date(d+c);return e},getCurrentTime:function(){var a=new Date;a.setMinutes(a.getMinutes()+30);var b=zmWatch.getCurrentDate(),c=String(a.getHours()),d=String(a.getMinutes()),e=c.length>1?c:"0"+a.getHours(),f=d.length>1?d:"0"+a.getMinutes(),g=e+":"+f;return{date:b,time:g}},bindDatePicker:function(a,b){var c;if("undefined"!=typeof ZEVENTS){var d=zmail.userDateFormat.toUpperCase(),e=zmWatch.getCurrentDate();void 0!==a&&(c=ZEVENTS(a).picker("date",{dform:d,wkst:0,mode:"popup",update:"yes",range:[e,""],minhgt:251}).on("dateclick",function(){b&&b(this.getDate().getDateBy(d))}).bind())}return c},bindTimePicker:function(a){var b;return"undefined"!=typeof ZEVENTS&&void 0!==a&&(b=ZEVENTS(a).picker("time",{tform:"HH:mm ss"}).bind()),b},triggerWatch:function(a){zmWatch.clearWatchElem(a,"trigger"),zmWatch.loadEditor(a)},addWatchTheme:function(b){if("compose_tab"===a[b].openWatch){var c=a[b].calleeObj.elem;c.addClass("SC_thm")}},clearWatchTheme:function(b){if("compose_tab"===a[b].openWatch){var c=a[b].calleeObj.elem;c.removeClass("SC_thm")}},showWatchClear:function(b){$("#zmWatch_clear_"+b).removeClass("SC_dyn"),$("#zmWatch_clear_"+b).off("click").on("click",function(){a[b].reminder?zmWatch.deleteReminder(b):a[b].clear_reminder?(zmWatch.clearWatchTheme(b),zmWatch.setCmpModified(b),zmWatch.setAvoidWatch(b,!0),a[b]._load_type="reupdate",a[b]&&"list"===a[b].dialogType?a[b]._dDialog.$el.remove():a[b]._dDialog.remove()):zmWatch.clearReminder(b)})},hideWatchClear:function(a){$("#zmWatch_clear_"+a).addClass("SC_dyn")},clearWatchElem:function(b,d){var e=a[b]._watchDOM,f=e.find("tr#zmWatch_type_"+b),g=f.find('label[data-val^="zm_watchType_"]'),h=g.filter('label[data-val="zm_watchType_3"]');h.find("i").eq(0).removeClass().addClass("msi-unoption");var i=g.filter('label[data-val="zm_watchType_2"]');i.find("i").eq(0).removeClass().addClass("msi-unoption");var j=g.filter('label[data-val="zm_watchType_1"]');j.find("i").eq(0).removeClass().addClass("msi-unoption");var k=g.filter('label[data-val="zm_watchType_3"]').find("span").get(0),l=g.filter('label[data-val="zm_watchType_2"]').find("span").get(0),m=g.filter('label[data-val="zm_watchType_1"]').find("span").get(0);k&&zmComponent.tooltip({elm:k,text:c.watch.response_tooltip,arrow:"top"}),l&&zmComponent.tooltip({elm:l,text:c.watch.noreply_tooltip,arrow:"top"}),m&&zmComponent.tooltip({elm:m,text:c.watch.regardless_tooltip,arrow:"top"});var n=e.find("tr#zmWatch_option_"+b),o=n.find('div[data-val="zm_reminderType_1"]');o.find("i").eq(0).removeClass().addClass("msi-uncheck");var p=n.find('div[data-val="zm_reminderType_1"]').find("label").get(0);p&&zmComponent.tooltip({elm:p,text:c.watch.remindrecip_tooltip,arrow:"top"});var q=n.find('div[data-val="zm_reminderDate"]');q.find("input").eq(0).val(zmWatch.getCurrentTime().date);var r=n.find('div[data-val="zm_reminderDate"]').find("input").get(0);r&&zmComponent.tooltip({elm:r,text:c.watch.remindon,arrow:"top"});var s=n.find('div[data-val="zm_reminderTime"]').find("input").eq(0);s.val(zmWatch.getCurrentTime().time);var t=n.find('div[data-val="zm_reminderMode"]'),u=t.find("select").find('option[value="1"]');u.attr("selected","selected");var v=n.find("div[data-val='zm_reminderMode']").find("select").eq(0);v.removeAttr("disabled");var w=u.get(0);w&&zmComponent.tooltip({elm:w,text:c.watch.remindmode,arrow:"top"}),zmWatch.hide(n),zmWatch.errorHide(b),zmWatch.hideWatchClear(b);var x=e.find("tr#zmWatch_editor_"+b);if(zmWatch.hide(x),"clear"===d){var y=g.filter('label[data-val="zm_watchType_3"]').find("i").eq(0);y.removeClass().addClass("msi-option");var z="<div><br/></div>";zmWatch.getEditor(b).setContent(z)}},updateWatchType:function(b){var d,e;try{var f={},g=!0,h=a[b].openWatch;"compose_tab"===h&&(g=!1);var i="";g&&zmList.isRMOBJ(b)?(f=$.extend({},zmail.mailObj[b].RMOBJ),a[b].reminder=!0,i="remove_list"):"drafted"===a[b]._load_type&&a[b]._reminder_draft?(f=a[b]._draft_obj,a[b].clear_reminder=!0,i="clear_drafted"):"compose_saved"===a[b]._load_type&&(f.WT=a[b].WT,f.RMDSC=a[b].RMDSC,f.RMM=a[b].RMM,f.RMT=a[b].RMT,f.RMD=a[b].RMD,a[b].clear_reminder=!0,i="clear_saved"),d=zmWatch.getCurrentTime().date,e=zmWatch.getCurrentTime().time;var j="",k=0,l=d+" "+e,m=3,n=0;f&&(f.WT&&(m=f.WT),f.RMDSC&&(j=f.RMDSC),"undefined"!=typeof f.RMM&&(k=f.RMM),"undefined"!=typeof f.RMT&&(n=f.RMT),f.RMD&&(l=f.RMD),3===f.WT&&(n=0));var o=!0,p=!0,q=a[b]._watchDOM,r=q.find("tr#zmWatch_type_"+b),s=r.find('label[data-val^="zm_watchType_"]'),t=q.find("tr#zmWatch_option_"+b),u=q.find("tr#zmWatch_editor_"+b);r.off("click").on("click",function(a){a=a||window.event;var c=a.target||a.srcElement,d=$(c).parents().filter('label[data-val^="zm_watchType"]').eq(0),e=d.attr("data-val");if("zm_watchType_1"===e||"zm_watchType_2"===e||"zm_watchType_3"===e){var f=s.filter('label[data-val="zm_watchType_3"]').find("i").eq(0),g=s.filter('label[data-val="zm_watchType_2"]').find("i").eq(0),h=s.filter('label[data-val="zm_watchType_1"]').find("i").eq(0);f.removeClass().addClass("msi-unoption"),g.removeClass().addClass("msi-unoption"),h.removeClass().addClass("msi-unoption");var i=s.filter('label[data-val="'+e+'"]').find("i").eq(0);if(i.addClass("msi-option"),"zm_watchType_3"===e&&(zmWatch.hide(t),zmWatch.hide(u)),"zm_watchType_2"===e||"zm_watchType_1"===e){zmWatch.show(t);var j=t.find('div[data-val="zm_reminderType_1"]').find("i").eq(0);j.hasClass("msi-check")&&zmWatch.show(u)}zmWatch.showWatchClear(b)}});var v=t.find("div[data-val='zm_reminderType_1']");v.off("click").on("click",function(){var a=$(this).find("i").eq(0);a.hasClass("msi-uncheck")?(a.removeClass().addClass("msi-check"),zmWatch.show(u),setTimeout(function(){zmWatch.getEditor(b).squireInstance.focus()},100)):(zmWatch.hide(u),a.removeClass().addClass("msi-uncheck"))}),1===n&&v.find("i").eq(0).removeClass().addClass("msi-check");var w=t.find('div[data-val="zm_reminderMode"]');0===k?w.find("select").find('option[value="0"]').attr("selected","selected"):w.find("select").find('option[value="1"]').attr("selected","selected");var x=s.filter('label[data-val="zm_watchType_'+m+'"]');x.find("i").eq(0).removeClass().addClass("msi-option"),2!==m&&1!==m||(p=!1,n&&(o=!1)),p?zmWatch.hide(t):zmWatch.show(t),d=zmWatch.getCurrentTime().date,e=zmWatch.getCurrentTime().time;var y=t.find("div[data-val='zm_reminderDate']").find("input").get(0),z=t.find("div[data-val='zm_reminderTime']").find("input").get(0);zmWatch.bindTimePicker(z),l||(l=d+" "+e);var A=zmWatch.getUpdateDate(b,l);if(d=A[0],e=A[1],t.find('div[data-val="zm_reminderDate"]').find("input").eq(0).val(d),t.find('div[data-val="zm_reminderTime"]').find("input").eq(0).val(e),zmWatch.bindDatePicker(y),zmWatch.showWatchClear(b),i||zmWatch.hideWatchClear(b),"compose_tab"===a[b].openWatch?($("#zmWatch_save_"+b).text("Add"),$("#zmWatch_save_"+b).off("click").on("click",function(){zmWatch.cmpWatch(b)}),$("#zmWatch_close_"+b).text("Cancel"),a[b].clear_reminder&&($("#zmWatch_save_"+b).text(c.watch.updrem),$("#zmWatch_clear_"+b).text(c.watch.remrem)),$("#zmWatch_clear_"+b).text(c.watch.close),$("#zmWatch_close_"+b).off("click").on("click",function(){zmWatch.closeWatch(b)})):($("#zmWatch_save_"+b).off("click").on("click",function(){zmWatch.addWatch(b,$(this))}),a[b].reminder&&($("#zmWatch_save_"+b).text(c.watch.updrem),$("#zmWatch_clear_"+b).text(c.watch.remrem)),$("#zmWatch_close_"+b).off("click").on("click",function(){zmWatch.closeWatch(b),zmWatch.hideWatch(b)})),o)zmWatch.hide(u);else{zmWatch.show(u);try{var B=j+"<div><br/></div>";zmWatch.getEditor(b).setContent(B),setTimeout(function(){zmWatch.getEditor(b).squireInstance.focus()},100)}catch(C){zmUtil.debugLog(C)}}}catch(C){zmUtil.debugLog(C)}},getToolbar:function(){var a=[[["bold","Bold (Ctrl+B)","zei-bold"],["italic","Italic (Ctrl+I)","zei-italic"],["underline","Underline (Ctrl+U)","zei-underline"],["strikethrough","Strikethrough","zei-strike"]],[["fontfamily","Font","zei-fontfamily"]],[["fontsize","Font Size","zei-arrow"]],[["forecolor","Font color","zei-textclr"],["backcolor","Background Color","zei-bgclr"]],[["link","Insert Link","zei-link"]],[["quote","Insert Quote","zei-quote"],["removeformat","Remove Formatting","zei-removeformat"]],[["spellcheck","Check Spelling","zei-spellCheck"]]];return a},loadEditor:function(b){var c=a[b]._watchDOM.find("tr#zmWatch_editor_"+b);c.removeClass("SC_dyn");var d=zmWUtil.getfontFamily(zmail.mailOpt.ff);"Default"!==d&&(ZE_Init.defaultFontFamily=d),zmail.mailOpt.fs&&(ZE_Init.defaultFontSize=zmail.mailOpt.fs+"pt");var e="";ZE_Init.needEditorFocus=!1,ZE_Init.toolbarOrder=zmWatch.getToolbar();var f=ZE.create({id:"zmWatch_editor_load_"+b,avoidPlainText:!0,content:e});zmWatch.setEditor(b,f);try{var g=function(a){return function(){zmWatch.postEditorLoad(a)}};zmWatch.getEditor(b).afterEditorLoad(g(b))}catch(h){zmUtil.debugLog("Editor load ",h)}},postEditorLoad:function(b){var c=a[b]._watchDOM.find("tr#zmWatch_editor_"+b);c.find(".zmCE").height("200px");var d=c.find(".ze_SCmb").outerHeight(),e=200-(d+4);c.find(".ze_area").height(e+"px"),ZE_Init.inlineImage=zmWUtil.editorInlineImage,zmWatch.updateWatchType(b,"trigger")},getWatchDate:function(a){var b="",c=zmWatch.getWatchDateEle(a)._date_elm,d=zmWatch.getWatchDateEle(a)._time_elm;if(zmWatch.getReminderDate(a)&&c&&d){var e=$(c).val(),f=$(d).val();b=e+" "+f}return b},show:function(a){a.removeClass("SC_dyn")},hide:function(a){a.addClass("SC_dyn")},getUpdateDate:function(a,b){var c="",d="";if(b){var e=b.split(" ");c=e[0];var f=e[1];f=f.split(":"),d=f[0]+":"+f[1]}return[c,d]},deleteReminder:function(a){var c={accId:zmUtil.getZohoAccId(),mymId:a,actType:"watch",watchMode:"d"};c.watchType=zmail.mailObj[a].RMOBJ.WT;var d={};d.cmpId=a,d.watchMode=c.watchMode,b(c,d,zmWatch.updateWatch)},clearReminder:function(a){zmWatch.clearWatchTheme(a),zmWatch.clearWatchElem(a,"clear"),zmWatch.hideWatchClear(a)},closeWatch:function(b){a[b]&&"list"===a[b].dialogType?a[b]._dDialog.$el.remove():a[b]._dDialog.remove()},cmpWatch:function(b){try{var c,d=a[b]._watchDOM,e=d.find("tr#zmWatch_type_"+b);if(e.find("i.msi-option").length){var f=e.find("i.msi-option").closest("label").eq(0);c=f.attr("data-val").split("_")[2]}if(!c)return zmWatch.errorShow(b,"Please select any reminder type"),!1;var g=zmWatch.getRMOBJ(b);if(!g)return!1;a[b]._load_type="compose_saved",zmWatch.setRMOBJ(b,g),zmWatch.closeWatch(b),zmWatch.addWatchTheme(b)}catch(h){zmUtil.debugLog(h)}},setRMOBJ:function(a,b){zmWatch.setWatchType(a,b.WT),zmWatch.setReminderDesc(a,b.RMDSC),zmWatch.setReminderDate(a,b.RMD),zmWatch.setReminderType(a,b.RMT),zmWatch.setReminderMode(a,b.RMM),zmWatch.setCmpModified(a),zmWatch.setModified(a,!0),zmWatch.setAvoidWatch(a,!1)},getRMOBJ:function(b){try{var c={};if(a[b]._watchDOM){var d,e=a[b]._watchDOM,f=e.find("tr#zmWatch_type_"+b),g=e.find("tr#zmWatch_option_"+b);if(f.find("i.msi-option").length){var h=f.find("i.msi-option").closest("label");d=h.eq(0).attr("data-val").split("_")[2],d=parseInt(d)}var i=g.find('div[data-val="zm_reminderMode"]'),j=i.find("option:selected").val();j=parseInt(j);var k=g.find('div[data-val="zm_reminderDate"]').find("input").eq(0),l=k.val(),m=g.find('div[data-val="zm_reminderTime"]').find("input").eq(0),n=m.val();if(!n&&""===$.trim(n))return zmWatch.errorShow(b,"Time field is empty! Please provide the time"),!1;if(n&&!zmWUtil.isValidateTime(n))return zmWatch.errorShow(b,"Please provide the valid time"),!1;if(n){n=$.trim(n);var o=n.split(":")[0];1===o.length&&(n="0"+n)}l=l+" "+n;var p=zmWatch.getEditor(b).getContent(),q=0,r=g.find('div[data-val="zm_reminderType_1"]').find("i").eq(0);r.hasClass("msi-check")&&(q=1),c.WT=d,c.RMM=j,c.RMD=l,c.RMDSC=p,c.RMT=q}return c}catch(s){zmUtil.debugLog(s)}},addWatch:function(c,d){var e,f=a[c]._watchDOM,g=f.find("tr#zmWatch_type_"+c);if(g.find("i.msi-option").length){var h=g.find("i.msi-option").closest("label").eq(0);e=h.attr("data-val").split("_")[2]}if(!e)return zmWatch.errorShow(c,"Please select any reminder type"+c),!1;var i={accId:zmUtil.getZohoAccId(),mymId:c,actType:"watch",watchMode:"a"};a[c]&&a[c].reminder&&(i.watchMode="u");var j=zmWatch.getRMOBJ(c);if(!j)return!1;a[c]._load_type="list_saved",zmWatch.setRMOBJ(c,j),i.watchType=zmWatch.getWatchType(c),i.reminderMode=0,i.reminderDesc=zmWatch.getReminderDesc(c);var k=i.watchType;!k||1!==k&&2!==k||(i.reminderType=zmWatch.getReminderType(c),i.reminderMode=zmWatch.getReminderMode(c),i.rDate=zmWatch.getReminderDate(c)+":00");var l={};l.cmpId=c,l.RMOBJ=zmWatch.getRMOBJ(c),l.watchMode=i.watchMode,d.attr("vtxt",d.html()),d.text("Loading ..."),$("#zmWatch_save_"+c).off("click"),b(i,l,zmWatch.updateWatch)},resetWatch:function(b){var c=!1;a[b]&&!a[b].reminder&&(c=!0),c&&zmWatch.clearWatchTheme(b),zmWatch.clearWatchElem(b),zmWatch.hideWatchClear(b),delete a[b]},setCmpModified:function(a){"undefined"!=typeof zmComp&&zmComp.getCurrentCompId()&&zmComp.setModified(a,1)},setModified:function(b,c){a[b]._modified_draft=c},getModified:function(b){var c=!1;return a[b]&&a[b]._modified_draft&&(c=!0),c},setAvoidWatch:function(b,c){a[b]._avoidWatch=c},getAvoidWatch:function(b){var c=!1;return a[b]&&a[b]._avoidWatch&&(c=!0),c},hideWatch:function(a){zmWatch.resetWatch(a)},getWatchObj:a};return d}(),window.zmWUtil=function(){"use strict";var a={editorInlineImage:function(a,b){var c="/mail/ImageSignature?fileName="+b.fileName;c+="&accountId="+b.aId+"&storeName="+b.storeName,c+="c"===b.frm?"&frm=c":"&frm=s",a(c)},isValidateTime:function(a){var b=/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/;return!(""===a||""!==a&&!a.match(b))},addWatchTheme:function(a){$(zmsuite.getCenter(a)[0].getNodes()[0].$el).find("[data-event='watch']").addClass("SC_thm")},getfontFamily:function(a){var b="";switch(a){case"Arial":b="Arial,Helvetica,sans-serif";break;case"Courier":b="Courier New,Courier,monospace";break;case"Georgia":b="Georgia,Times New Roman,Times,serif";break;case"Tahoma":b="Tahoma,Arial,Helvetica,sans-serif";break;case"Times":b="Times New Roman,Times,serif";break;case"Trebuchet":b="Trebuchet ms,Arial,Helvetica,sans-serif";break;case"Verdana":b="Verdana,Arial,Helvetica,sans-serif";break;case"Comic Sans MS":b="Comic Sans MS";break;case"Serif":b="Serif";break;case"Default":b="Default";break;case"Calibri":b="Calibri,Arial,Verdana,sans-serif";break;case"MS Mincho":case"MS Gothic":case"MS PMincho":case"MS PGothic":b=a}return b}};return a}();