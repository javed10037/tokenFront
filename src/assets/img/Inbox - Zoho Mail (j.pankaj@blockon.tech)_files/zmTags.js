define([],function(a,b){"use strict";var c=a("zmText"),d=a("zmAjq"),e=a("zmInit"),f=a("zmsuite"),g=a("zmail.Core.Namespaces"),h=g.create("zmlab"),i=c.get("zmTags","tags"),j="#96ccf5",k=function(b,c){return a("zmList").getRowInfo(b,c)},l=function(b,c,d){a("zmUtil").succErrMsg(b,c,d)},m=function(b){return a("zmUtil").getTagList(b)},n=function(b,c){a("zmUtil").hideMenu(b,c)},o=function(b,c){a("zmUtil").stopEvents(b,c)},p=function(b,c){var d=a("zmPreviewTemplate");for(var e in zmail.mailObj){var f=$.inArray(String(b),zmail.mailObj[e].TAG||[]),g=$.inArray(String(b),zmail.mailObj[e].TTAGS||[]);f!==-1&&("del"===c&&zmail.mailObj[e].TAG.splice(f,1),d.refreshLabelsForMail(e)),g!==-1&&("del"===c&&zmail.mailObj[e].TTAGS.splice(f,1),d.refreshLabelsForMail(e))}},q=function(a,b){var c=e.getListingDetObj();p(a,b),c.label===a&&("del"===b&&(""!==c.fId?e.foldView({folId:c.fId,reInitialize:!0}):(e.foldView({folId:zmail.folId.iId,reInitialize:!0}),zmail.mailLeft.selRow(String(zmail.folId.iId),"zmlTreeH"))),e.updateHeaderBand())},r=function(a){if(a&&a.id){var b,c,d=a.id,e="zmllabelH";b=zmail.mailLeft.getNodes()[0].getLayer(e),c=k(d,e),q(d,"del"),$.publish("label/deleted",{labelID:d}),b.deleteNode(c)}else a.e&&l("e",i.errors.processError)},s=function(a,b){var c,d,e,f,g,h,j,n,o="zmllabelH",p=zmail.labInfo,r="",s="";if("default"===b.accType&&zmail.accId!==zmail.defAccId&&(p=m(b.accType)),a.e)l("e",i.errors.processError);else{if(j=a.labelId||a.id,"a"===b.mode&&($.isEmptyObject(p)&&$("#zmllabelH .SC_ltl .SC_frt").show(),p[j]={}),e=p[j].system||"0",f=p[j].shId||"-1",p[j]={color:a.color||a.c,id:a.labelId||a.id,label:a.displayName||a.n,dispName:a.displayName||a.n,fav:"true",system:e,shId:f},"a"===b.mode&&$.publish("label/added",{label:p[j],info:a}),c=zmail.mailLeft.getNodes()[0].getLayer(o),d=k(j,o),d[j]||"default"!==b.accType||(d={}),h=a.seq,1!==h){var t=$("#zmllabel #"+j).prev();t.length&&(s=t.attr("id"))}"e"===b.mode&&(q(j,"upd"),$.publish("label/renamed",{label:p[j],info:a}),c.deleteNode(d));for(g in d){d[g].label=a.displayName||a.n,d[g].color=a.color||a.c,d[g].dispName=a.displayName||a.n;break}for(n=Object.keys(p),g=0;g<n.length;g++)if(n[g]===(a.labelId||a.id)){h=g+1;break}$.isEmptyObject(d)||(1!==h||$("#zmllabel .SC_tre").length?1===h?(r=$("#zmllabel .SC_tre").eq(0).attr("id"),c.insertNodeBefore(d,c.mapObject,r)):(r=$("#zmllabel .SC_tre").eq(h-2).attr("id"),r||(r=s),r?c.insertNodeAfter(d,c.mapObject,r):c.prependNode(d,c.mapObject)):(r="zmllabel",c.appendNode(d,c.mapObject))),p[j].se=h,zmail.accId===zmail.defAccId&&(zmail.labInfo=p,zmail.zohoAccLabInfo=$.extend({},p))}b.reqDoneClbk&&b.reqDoneClbk(!a.e,j)},t=function(a,b,c,e){var f={mode:a,accType:c},g={accId:zmail.accId,mode:a},i=zmail.labInfo,k=s;"default"===c&&(i=m(c),g.accId=zmail.defAccId),"d"!==a&&"m"!==a&&(g.name=b,"e"!==a?g.color=e.color||j:g.color=i[h.labelId].color),"a"!==a&&"m"!==a&&(g.labId=h.labelId),"d"===a?k=r:"m"===a&&(g.labIdArr=e.labIdArr,k=""),e&&"function"==typeof e.reqDoneClbk&&(f.reqDoneClbk=e.reqDoneClbk),d.XHR({u:zmail.conPath+"/lA.do",t:"POST",fn:k,p:g,csr:"s",ep:f})},u=function(b){var c=[],d={},e=[];if("selected"===b.type)e=a("zmUtil").getSelectedMails(),e[0].forEach(function(a){c.push({id:a,ttag:!1})}),e[1].forEach(function(a){c.push({id:a,ttag:!0})});else{if("list"!==b.type)return;c=b.list}if(c.length>=1){var f,g=(c[0].ttag?zmail.mailObj[c[0].id].TTAGS:zmail.mailObj[c[0].id].TAG)||[];for(f in zmail.labInfo)$.inArray(f,g)!==-1&&(d[f]="check");if(c.length>1)for(var h=1,i=c.length;h<i;h++){g=(c[h].ttag?zmail.mailObj[c[h].id].TTAGS:zmail.mailObj[c[h].id].TAG)||[];for(f in zmail.labInfo)$.inArray(f,g)!==-1?d[f]||(d[f]="partial"):d[f]&&(d[f]="partial")}}return d},v=function(a){var b,c,d,e="";for(a=a||{},b=["#e5e5e5","#f9baab","#f9d3a2","#fef86a","#d7f3b0","#c8e5fb","#e0ceef","#f6d0e6","#c4c4c4","#e07861","#ecb772","#f6e565","#badf88","#96ccf5","#b99fce","#e099c2","#808080","#ce232c","#dd902f","#d0c04b","#90ca40","#70abec","#a97ac6","#c26a9d","#000000","#9d1812","#a56016","#a69646","#5b8828","#4c76a2","#8343a0","#ba3682"],d=b.length,c=0;c<d;c++)e+=b[c]===a.selColor?"#000000"===b[c]?"<div class='sel black' style='background-color:"+b[c]+"'></div>":"<div class='sel' style='background-color:"+b[c]+"'></div>":"<div style='background-color:"+b[c]+"'></div>";return e},w={DEFAULT_COLOR:j,labelId:"",labelmov:function(a,b,c){var d,e,f,g,h,i=[];if(0===zmail.mailOpt.labSort){if(!c.id||"zmllabelH"!==c.id)for(e in c)h=e;for(g=zmail.mailLeft.getNodes()[0].getLayer("zmllabelH"),g.moveNode(b,g.mapObject,h),d=$("#zmllabel").find(".SC_tre"),f=d.length,e=0;e<f;e++)i.push(d[e].id);t(a,"","",{labIdArr:i})}},labelCreate:function(a,b,c){t("a",a,b,c)},labelreq:function(a,b,c){var d="";"d"!==a&&(d=$.trim($("#"+b).text())),(d.length||"d"===a)&&t(a,d),"e"!==a||c||$("#"+b).html(i.labels.editTag).attr("contentEditable",!1)},isValidLabel:function(a,b){var c=$.trim($("#"+a).text().toLowerCase());return!!w.isValidName(c,b)||($("#"+a).focus(),!1)},isValidName:function(b,c,d,e){var f,g=a("zmUtil"),j=zmail.labInfo;if("default"===d&&(j=m(d)),b=$.trim(b.toLowerCase()),!b.length)return l("e",i.errors.empty,e),!1;if(g.hasSpecialChars(b,"labelName"))return g.succErrMsg("e",i.errors.specialCharacters,e),!1;if(b.length>25)return l("e",i.errors.lengthExceeded,e),!1;if("info"===b||"important"===b||"follow-up"===b)return l("e",i.errors.retrictedWord,e),!1;for(f in j)if(("rename"!==c||h.labelId!==f)&&j[f].label.toLowerCase()===b)return l("e",i.errors.exists,e),!1;return!0},createColorPicker:function(a){var b;b=v(),h.labelId=a.parent()[0].id,f.showMenu({par:a,list:[{htm:b}],align:"colorpicker",ulClass:"SC_cp",clk:function(a,b){"DIV"===b.tagName&&(h.updateLabColor(a,b),n())}})},updateLabColor:function(a,b){var c=$(b);zmail.labInfo[h.labelId].color=h.convertRGBtoHex($(c).css("background-color")),zmail.zohoAccLabInfo[h.labelId]&&(zmail.zohoAccLabInfo[h.labelId].color=zmail.labInfo[h.labelId].color),h.labelreq("e",h.labelId,!0)},convertRGBtoHex:function(a){var b;if(a.indexOf("rgb")!==-1){a=a.replace(/rgb\(|\)/g,"").split(","),b=a.length;for(var c=0;c<b;c++)a[c]=parseInt(a[c]).toString(16),a[c]=1===a[c].length?"0"+a[c]:a[c];a="#"+a.join("")}return a},labelSelectionInfo:u,labelMenuHadler:function(a){a=a||"a";var b=$(this.activeMenu.activeMenuElement),c=b[0].id;return h.isValidLabel(c,"add")?(h.labelreq(a,c),!0):(b.focus(),!1)},showCreateTagPopUp:function(b){var c,d,e,g,k,l,p,q,r,s,u,w,x,y,z=a("zmsDialog"),A="",B=200;b=b||{},r=b.accType||"",u=m(r),g=b.mode||"new",w=f.getAppLeft().getNodes()[0].getLayer("zmllabelH").el,s=$(".zm_compose"),l=s.offset(),x=l.left+s.width(),y=w.position().top<0?$(".zm_compose").offset().top:w.offset().top,k=y+350-$(document.body).height(),k>0&&(y-=k),"rename"===g?(e=i.labels.editTag,A=u[h.labelId].label,q=u[h.labelId].color):"new"===g&&(e=i.labels.createTag,q=j),c={title:e,style:{width:B+"px","min-width":"168px","max-width":"168px"},posParent:{top:y+"px",left:x+"px"},customClass:"noanim",buttons:[{txt:i.labels.save,selected:!0,callback:function(){var a;a=$("#zm_createlabelpopup").find("input:first").val(),b.callback?b.callback("a",a,q):h.isValidName(a,g,r,{parElem:$("#zm_createlabelpopup")[0]})&&("new"===g?t("a",a,r,{color:q}):"rename"===g&&(u[h.labelId].color=q,t("e",a,r,{color:q})),z.remove())}},{isCancel:!0,txt:i.labels.cancel,callback:function(){z.remove()}}],closeaction:function(){$("#zm_createlabelpopup").remove()},afterDisplay:function(){$("#zm_createlabelpopup").find("input").focus()}},p=v({selColor:q}),d=$("<div id='zm_createlabelpopup'><ul><li><input type='text' maxlength = '25' class='SC_tiput' data-enableshortcuts='true'  placeholder = '"+i.labels.tagName+"''/></li><li><div>"+i.labels.tagColor+"</div><ul  class='SC_cp'><li>"+p+"</li></ul></div></li>"),d.find("input").val(A),d.find(".SC_cp").on("click","div",function(a){var b;o(a,!0),b=a.target||a.srcElement,b=$(b),q=b.css("background-color"),q=h.convertRGBtoHex(q),$("#zm_createlabelpopup").find(".sel").removeClass("sel black"),b.addClass("sel"),"#000000"===q&&b.addClass("black")}),$("#zm_createlabelpopup").length||$(document.body).append(d),z.create("zm_createlabelpopup",c),$("#zmsdialog_zm_createlabelpopup").mousedown(function(a){o(a,!0)}),$("#zmsdialog_zm_createlabelpopup").click(function(){n(!1,!0)})}};return $.extend(!0,h,w)});