define([],function(a){"use strict";var b=a("zmText"),c=window.zmNCenter||{},d={},e=b.get("notificationCenter","global");return d.moduleName="notificationCenter",d.ncount=0,d.companyName=(e||{}).companyName,d.uri=zmail.conPath+"/ncenter.do",d.streamsModuleName="streamsApp",d.streamuri=zmail.conPath+"/stream.do",d.streamTabName="zm_stream",d.popoutElmId="zmncpreview",d.workSpaceName="zmncenter",d.newNotification={tab:"/ncenter/newNotification/tab",popout:"/ncenter/newNotification/popout"},d.removeNotification={tab:"/ncenter/removeNotification/tab",popout:"/ncenter/removeNotification/popout"},d.stopEvents="/ncenter/stopEvents",d.topbarCloseEvent="zmTopBar/popover/close",d.topbarOpenEvent="zmTopBar/popover/open",d.hideMenuEvent="/mail/menuCreated",d.actionIconId="zm-notifications",d.popoutId="zm-notification-list",d.viewSelfData="viewSelfData",d.viewGroupData="viewGroupEntity",d.pagination="pagination",d.systemIcon=zmail.imgPath+"mail-icon.png",d.twitterImgUrl=function(a){if(a)return"https://twitter.com/"+a+"/profile_image?size=normal"},d.systemName=b.applyArgs(e.productName,{companyName:(a("zmail.globalI18N")||{}).companyName||e.companyName}),d.removePopoutPreview="/ncenter/closePreview",d.range=20,d.reconnect="zmailReconnect",d.closePopoutFromStreams="/streams/closePopOut",d.tabClose="/ncenter/internal/tabClose",d.gender={0:"FEMALE",1:"MALE",2:"COMMON"},d.types={addPost:"30",groupMember:["50","51"],sharedFolder:["52","53","54","60"],removeSelfFor:["23","31","49"],memberRoleChange:["109","150"],clearCount:"114",inviteUser:"29",addComment:"31",taskUser:["64"],mailReminder:["59"],dismiss:["175"],addTweet:["112"],suppressNotification:["170","72","34"],taskAssign:["58"]},d.formatter={showUsers:3,replacePatterns:{companyName:"{{companyName}}",productName:"{{productName}}",groupName:"{{groupName}}",entityName:"{{entityName}}",entityValue:"{{entityValue}}",entityAccess:"{{entityAccess}}",userName:"{{userName}}",tagName:"{{tagName}}",preposition:"{{preposition}}",wallName:"{{wallName}}",memberRole:"{{memberRole}}"}},d.css={streamIconHighlight:"SC_newActivity",popoutStyle:"width: 510px; opacity: 1",workSpaceClass:"SC_notification",tabIcon:"msi-notification",closeIcon:"msi-close",unread:"zmNotiUnRead",entityIcon:{1:"msi-mail",2:"msi-notes",3:"msi-task",4:"msi-calendar",6:"msi-status",9:"msi-mail",13:"msi-twitter"},actionIcon:{31:"msi-comment",36:"msi-comment",43:"msi-comment",25:"msi-mention",38:"msi-mention",44:"msi-mention",45:"msi-mention",23:"msi-love",49:"msi-love",29:"msi-invitee",50:"msi-addgroup"},list:{selection:"zmSLst"}},d.params={mode:"groupedlist",eType:"-1"},d.allowedDesktopNotificationTypes={streams:["25","29","38","44","45"],mail:["59"],task:[],notes:[]},d.notificationTypes={4:"MAIL_TYPE",23:"LIKE",24:"UNLIKE",25:"POST_MENTION",26:"UNLIKE_COMMENT",27:"UNSHARED",29:"INVITE",30:"ADD_POST",31:"ADD_COMMENT",32:"DELETE_POST",34:"DELETE_COMMENT",35:"DELETE_PRIVATE_COMMENT",36:"ADD_PRIVATE_COMMENT",37:"CHANGE_ENTITY",38:"COMMENT_MENTION",39:"BULK_UPDATE",40:"BULK_DELETE",41:"ADD_TASK",42:"REMINDER_TASK",43:"ADD_SHARE_COMMENT",44:"POST_GROUP_MENTION",45:"COMMENT_GROUP_MENTION",46:"ADD_EVENT",47:"UPDATE_EVENT",48:"DELETE_EVENT",49:"LIKE_COMMENT",50:"ADD_GROUP_MEMBER",51:"REMOVE_GROUP_MEMBER",52:"RESOURCE_SHARE",53:"SHAREPERM_CHANGE",54:"SHAREPERM_REMOVAL",55:"UPDATE_EVENT_STATUS_YES",56:"UPDATE_EVENT_STATUS_NO",57:"UPDATE_EVENT_STATUS_MAYBE",58:"TASK_ASSIGN",59:"MAIL_REMINDER",60:"ACCEPT_SHARE",61:"MAIL_SHARE",62:"ADD_ATTACHMENT",63:"CHANGE_TASK_DUE_DATE",64:"CHANGE_TASK_ASSIGNEE",65:"CHANGE_TASK_STATUS",66:"CHANGE_TASK_PRIORITY",67:"CHANGE_TASK_CATEGORY",68:"CHANGE_TASK_TITLE",69:"CHANGE_TASK_DESCRIPTION",70:"REMOVE_ATTACHMENT",71:"DRAFT_SHARE",72:"DRAFT_SHAREUPDATE",73:"DRAFT_MAILMENTION",74:"SHARE_UNSUBSCRIBE",75:"STREAM_GROUP_ENABLE",76:"STREAM_GROUP_DISABLE",77:"MAIL_STREAMS_ENABLE",78:"MAIL_STREAMS_DISABLE",79:"ADD_LINK",80:"CHANGE_LINK_CATEGORY",81:"CHANGE_LINK_TITLE",82:"CHANGE_LINK_DESCRIPTION",83:"CHANGE_LINK_URL",84:"MARK_LINK_FAV",85:"CALENDAR_REMINDER",86:"CALENDAR_REMINDER_MAILID_CHANGE",87:"CALENDAR_SHARING",88:"CALENDAR_UNSUBSCRIBE",89:"BIZ_SUB_ONLINE_RENEW_DUE_FEWDAY",90:"BIZ_SUB_ONLINE_RENEW_TDY",91:"BIZ_SUB_ONLINE_RENEW_OVERDUE",92:"BIZ_SUB_ONLINE_RENEW_OVERDUE_TDY",93:"BIZ_SUB_OFFLINE_RENEW_DUE_FEWDAY",94:"BIZ_SUB_OFFLINE_RENEW_TDY",95:"BIZ_SUB_OFFLINE_RENEW_OVERDUE",96:"BIZ_SUB_OFFLINE_RENEW_OVERDUE_TDY",97:"BIZ_SUB_PURCHASE_MORE",98:"BIZ_SUB_PURCHASE",99:"DOMAIN_NOT_VERIFIED",100:"DOMAINS_NOT_VERIFIED",101:"MAIL_HOSTING_NIL",102:"MX_NOT_POINTED_TO_ZOHO",103:"REG_DOMAIN_AUTO_RENEW",104:"REG_DOMAIN_MANUAL_RENEW",105:"ADD_SUBTASK",106:"EDIT_LINK",107:"LOCK_INVITES",108:"UNLOCK_INVITES",109:"GROUP_MEMBER_ROLE_CHANGE",110:"DOMAIN_SPF_MISSING",111:"DOMAIN_DKIM_MISSING",112:"ADD_TWEET",113:"INVITE_PERMISSION_REQUEST",150:"ADD_GROUP_MODERATOR",175:"DISMISS",301:"TASK_PICKUP",303:"TASK_COMPLETE",304:"TASK_REOPEN",305:"TASK_SET_REPEAT",306:"TASK_CHANGE_REPEAT",307:"TASK_SET_PRIORITY_HIGH",308:"TASK_SET_PRIORITY_MEDIUM",309:"TASK_SET_PRIORITY_LOW",310:"TASK_SET_DUE_DATE",311:"REMOVE_ASSIGNEE",312:"TASK_DUE_DATE_CLEAR"},c.constants=d,window.zmNCenter=c,c}),define([],function(a){"use strict";var b=a("zmText"),c=window.zmNCenter||{};return c.text=b.get("notificationCenter"),c.init=function(){c.core()},window.zmNCenter=c,c}),define([],function(a){"use strict";var b=a("_zm"),c=window.zmNCenter||{},d={},e=c.text;return d.nameWrapper=function(a){return["STRONG",{child:[["text",a]]}]},d.nameSeparator=["text",", "],d.textWrapper=function(a){return["text",a]},d.andWrapper=function(a,b){return[d.textWrapper(" "+e.common.and+" "),a?d.textWrapper(b+" "+e.common.others):d.nameWrapper(b)]},d.notificationItem=function(a){var c=b.getProperty(a,"photo"),d=b.getProperty(a,"framedText"),e=b.getProperty(a,"actionIcon"),f=b.getProperty(a,"timestamp"),g=b.getProperty(a,"ctime"),h=["DIV",{attrs:{"class":"zmL"},child:[["DIV",{attrs:{"class":"zmLst"},child:[["DIV",{attrs:{"class":"zmDtl"},child:[["DIV",{attrs:{"class":"zmImg"},child:[["IMG",{attrs:{src:c}}]]}],["DIV",{attrs:{"class":"zmFrm"},child:[["SPAN",{child:d}]]}],["DIV",{attrs:{"class":"zmSub"},child:[["I",{attrs:{"class":e}}],["SPAN",{attrs:{"class":"sum zmnTimer","zmn-time":g},child:[["text",f]]}]]}]]}]]}]]}];return b.getDOM(h)},d.eventNotificationItem=function(a){var c=a._eventData.title,d=a._eventData.remTime,e=a._eventData.stDate,f=["DIV",{attrs:{"class":"zmL"},child:[["DIV",{attrs:{"class":"zmLst"},child:[["DIV",{attrs:{"class":"zmDtl"},child:[["DIV",{attrs:{"class":"zmImg noBdr"},child:[["I",{attrs:{"class":"msi-remind"}}]]}],["DIV",{attrs:{"class":"zmFrm"},child:[["SPAN",{child:[["STRONG",{child:[["text",d],["H3",{child:[["text",c]]}]]}]]}]]}],["DIV",{attrs:{"class":"zmSub"},child:[["SPAN",{attrs:{"class":"sum"},child:[["text",e]]}]]}]]}]]}]]}];return b.getDOM(f)},d.systemNotificaitonItem=function(d,e){d=c.formatter.formatRebrandedText(d);var f,g=c.constants.systemIcon,h=(a("zmail.globalI18N")||{}).productName||c.constants.systemName,i=["DIV",{attrs:{"class":"zmL zm_urd"},child:[["DIV",{attrs:{"class":"zmLst"},child:[["DIV",{attrs:{"class":"zmDtl"},child:[["DIV",{attrs:{"class":"zmImg"},child:[["IMG",{attrs:{src:g}}]]}],["DIV",{attrs:{"class":"zmFrm"},child:[["SPAN",{child:[["text",h]]}]]}],["DIV",{attrs:{"class":"zmSub",style:"width: inherit"},child:[["SPAN",{attrs:{"class":"sum",style:"white-space: normal"},child:[["text",d]]}]]}]]}]]}]]}];return e&&(f=["SPAN",{attrs:{"class":"SC_lnk"},child:[["text",e]]}],i[1].child[0][1].child[0][1].child[2][1].child.push(f)),b.getDOM(i)},d.getDismissButton=function(a){return b.getDOM(["FONT",{child:[["text",a]],attrs:{"class":"SC_link SC_frt"}}])},d.getActionButton=function(a){return b.getDOM(["DIV",{attrs:{"class":"SC_PUbtm"},child:[["SPAN",{child:[["text",a]]}]]}])},d.seeAllBand=function(){return b.getDOM(["DIV",{attrs:{"class":"zmNotiSall"},child:[["SPAN",{child:[["text",e.common.seeAll]]}]]}])},d.emptyList=function(){return b.getDOM(["DIV",{attrs:{"class":"SC_nmsg"},child:[["text",e.common.noNotifications]]}])},d.popout=function(a){return b.getDOM(["DIV",{attrs:{id:a,"class":"SCS_popUp"}}])},c.views=d,window.zmNCenter=c,c}),define([],function(a){"use strict";var b,c=a("_zm"),d=a("zmAjq"),e=window.zmNCenter||{},f={},g=e.text||{},h=e.views||{},i=e.constants;return b=function(a){var b={t:"POST",u:a.u||i.uri,p:a.param,h:!a.hasOwnProperty("setHeader")||a.setHeader,fn:function(a,b){b.fn(a,b.args)}};a.callback&&(b.ep=a.callback),a.onerror&&(b.onerror=a.onerror),a.onnetfailure&&(b.onnetfailure=a.onnetfailure),d.XHR(b)},f.getEntityName=function(a){return g.entity[a]},f.loadActionText=function(){g.actionText={}},f.req=b,f.getActionText=function(a,b,c,d){var e=g.notificationTypes,f=i.notificationTypes[a],h=i.gender[b],j=c?"FOLLOWER":"OWNER",k=d?"PLURAL":h,l=[f,j,k],m=l.join("/");return e.hasOwnProperty(m)||(l.pop(),l.push("COMMON"),m=l.join("/")),e[m]||m},f.getUser=function(a,b){b=b||{};var c=b.nBy||[],d=c.filter(function(b,c,d){return"undefined"!=typeof b[a]})[0]||{},e={g:2,zid:"",nn:"",photo:"",eid:"",fn:""};f.isNotificationOf.addTweet(b.ntype)&&(d.fn=d.fn||d[a].split("@")[0],d.screenName=d.screenName||d[a].split("@")[1],e.photo=e.photo||i.twitterImgUrl(d.screenName)),d[a]&&(e.zid=a,e.fn=d.fn||d[a]),e.photo=e.photo||zmail.imgPath+"SC-Photo.png",e.isDummyObj=!0;var g=zmail.ContactBook.get({zuid:a,promise:!1,type:"org"});return g.length>0&&(e=g[0].attrs),e},f.getActionIcon=function(a,b){return i.css.actionIcon[a]||i.css.entityIcon[b]},f.getSummaryText=function(a,b){return b=b instanceof Array?b[0]:b,b=!a&&b&&b.trim().length>0?' : "'+b+'..."':""},f.getStreamIcon=function(){return c(".","msi-streams",c("#","topBar"))[0]},f.getBadgeCount=function(a){b({param:{mode:"count"},callback:{fn:a}})},f.resetBadgeCount=function(a,c){b({param:{mode:"reset",count:a},callback:{fn:c}})},f.paginate=function(a,b,d){var e=function(a,b,c){a.offsetHeight+a.scrollTop>=a.scrollHeight-50&&b(c)};c.bindReset(b,"scroll",e,[b,d,a])},f.folderShare=function(){var a,d,g,i,j=!1;return g=function(a){return c.getProperty(a,"folder.confirmationkey")},i=function(a,c,d,e,f){b({u:zmail.conPath+"/confirm.do",param:{mode:"sharedFolder",key:d,ownerZuid:c,shId:a},callback:{fn:e,args:f}})},d=function(a,b){if(!j){j=!0;var d=b.shId,e=b.owner,f=g(b);i(d,e,f,function(a,b){if(j=!1,a){var d=b[0];c.remove(d)}},[a,b])}},a=function(a,b){if(f.isNotificationOf.folderShare(a.ntype)){var i,j=g(a);j&&(i=h.getActionButton(e.text.label.accept),c.bind(i,"click",d,[i,a]),c.before(b.childNodes[0],i))}}}(),f.isNotificationOf={newMemberAddition:function(a){return i.types.groupMember.indexOf(a)>-1},folderShare:function(a){return i.types.sharedFolder.indexOf(a)>-1},removeSelf:function(a){return i.types.removeSelfFor.indexOf(a)>-1},memberRoleChange:function(a){return i.types.memberRoleChange.indexOf(a)>-1},inviteUser:function(a){return i.types.inviteUser===a},addComment:function(a){return i.types.addComment===a},taskUser:function(a){return i.types.taskUser.indexOf(a)>-1},mailReminder:function(a){return i.types.mailReminder.indexOf(a)>-1},taskAssign:function(a){return i.types.taskAssign.indexOf(a)>-1},clearCount:function(a){return a===i.types.clearCount},dismiss:function(a){return i.types.dismiss.indexOf(a)>-1},addTweet:function(a){return i.types.addTweet.indexOf(a)>-1}},f.isItemViewable=function(a){var b=a.ntype;return!!i.notificationTypes.hasOwnProperty(b)&&(f.isNotificationOf.removeSelf(b)&&a.nby.indexOf(zmail.zuid)>-1&&a.nby.splice(a.nby.indexOf(zmail.zuid),1),a.nby.length>0)},f.isItemClickable=function(a){return this.isEventNotification(a)||!(a.isDeleted||"true"===String(c.getProperty(a,"sysevent")))},f.isCommentBoxEmpty=function(a){if(a){var b=c("<","textArea",c(".","zm_mention",a)[0])[0];if(b&&"fixed"===c.attr(b,"data-type")&&""!==b.value)return!window.confirm(g.common.unpublishedContentWarning)}return!0},f.loadPreview=function(a){var b=a.data,c=a.previewElm,d=a.fixedComment,e=a.openType;this.isEventNotification(b)?this.notificationPreview.event(b,c):this.notificationPreview.stream(b,c,d,e)},f.notificationPreview={stream:function(b,c,d,e){var f,g=a("zmAppLoader"),h=b.group.id,j=b.eid,k=b.etype,l=b.group.isGroup?i.viewGroupData:i.viewSelfData,m=b.shId||"",n=b.ntype;return"59"===String(n)?void $.publish("ncenter/watchReminder",{mailID:b.eid,parentDOM:$(c)[0],isPopup:d,tId:b.tid}):(f=function(c,d,e){var f={gid:h,pid:j,etype:k,actionType:l,fixedComment:d,allComments:!0,elm:c,shId:m,ntype:n,group:b.group,markRead:!0,opentype:e};b.commentuuid&&(f.commentuuid=b.commentuuid),a("zmStreamsApp").events.openPost(f)},void g.load(i.streamsModuleName).done(function(){f(c,d,e)}))},event:function(a,b){ZCL_streamEve.streamEveNotificationPreview(a,b)}},f.workspace=function(b){var d,e,f,h=a("zmsuite"),j=b.name;return h.isWorkspaceAvailable(j)||(h.setWorkSpace(b.appConfig),d=h.getCenter()[0].getNodes(),d[0].push({left:[],right:[{actionArr:[{iconList:[i.css.closeIcon],data:"close",tooltip:g.common.close}]}]}),d[1].push({left:{leftHTML:b.appConfig.appname}}),d[0].setListener("click",function(a,c,d){"close"===d&&(h.closeWorkspace(j),b.destroy&&b.destroy())}),h.renderWorkSpace(),d=h.getCenter()[0].getNodes(),d[2].setListener("click",b.listingClick),e=h.getCenter()[1],f=e.getNodes()[0],c.addClass(f.$el.children(".SC_phd")[0],"SC_Sph"),f.push({text:"",rIcons:[[{tooltip:g.common.close,iconClass:i.css.closeIcon,data:"close"}]]}),f.setListener("click",function(a){"close"===a&&b.closePreview&&b.closePreview(e)})),h.showWorkSpace(j),d=h.getCenter(),{listArea:d[0].getNodes()[2].$el[0],previewCard:d[1]}},f.eventTimeRemaining=function(a,b){var c=b/1e3,d={unit:"millis",value:b,state:a};return c<60?(d.unit="seconds",d.value=c,d):(c/=60,c<60?(d.unit="minutes",d.value=c,d):(c/=60,c<24?(d.unit="hours",d.value=c,d):(c/=24,d.unit="days",d.value=c,d)))},f.isEventNotification=function(a){return"85"===String(c.getProperty(a,"ntype"))},f.parseJSON=function(a){c.getProperty(a,"folder")&&(a.folder="string"==typeof a.folder?$.parseJSON(a.folder):a.folder),c.getProperty(a,"group")&&(a.group="string"==typeof a.group?$.parseJSON(a.group):a.group),c.getProperty(a,"shgroup")&&(a.shgroup="string"==typeof a.shgroup?$.parseJSON(a.shgroup):a.shgroup),c.getProperty(a,"nBy")&&(a.nBy="string"==typeof a.nBy?$.parseJSON(a.nBy):a.nBy)},f.updateTime={start:function(a){return setInterval(function(){for(var b,d=c(".","zmnTimer",a),e=0,g=d.length;e<g;e++){b=d[e];var h=b.getAttribute("zmn-time");c.setTextContent(b,f.relativeTime(h),!0)}},5e3)},stop:function(a){clearInterval(a)}},f.relativeTime=function(b){return a("zmComponent").dateTimeUtil.relativeTime(b,"mm dd at hr:min")},f.showLoader=function(b){return a("zmComponent").loadingBand({container:b,type:i.pagination})},f.reconnect=function(){e.dataStore.cache.reset(),"undefined"!=typeof c.getProperty(e,"tab.list")&&e.tab.list.init(),"undefined"!=typeof c.getProperty(e,"popout.list")&&e.popout.list.init()},f.suppressNotification=function(a){return i.types.suppressNotification.indexOf(a)>-1},f.clearNotification=function(){var a,d,g,j=!1;return g=function(a,c,d,f,g){b({u:e.constants.uri||zmail.conPath+"/ncenter.do",param:{mode:"clear",entityType:9,notificationType:c,entityId:d},callback:{fn:f,args:g}})},d=function(a,b,c,d){if(d&&d.stopPropagation(),!j){j=!1;var e=c.etype,f=c.eid,h=c.ntype;g(e,h,f,function(a,b){j=!1,a&&($.publish(i.removeNotification.tab,c),$.publish(i.removeNotification.popout,c))},[b,c])}},a=function(a,b){if(f.isNotificationOf.mailReminder(a.ntype)){var g;g=h.getDismissButton(e.text.label.dismiss),c.bind(g,"click",d,[b,g,a]),c.after(c(".","zmSub",b)[0].childNodes[0],g)}}}(),e.helper=f,window.zmNCenter=e,e}),define([],function(a){"use strict";var b,c,d,e,f,g,h=a("_zm"),i=a("zmText"),j=a("$"),k=window.zmNCenter||{},l={},m=k.helper,n=k.constants,o=[],p=0;return c=function(){m.req({u:"/biz/bizApi.do",param:{mode:"bannerMsg"},setHeader:!1,callback:{fn:function(a){o=a,p=a.length,k.counter.increment(p)}}})},d={item:function(b){var c,d=k.constants.systemIcon,e=(a("zmail.globalI18N")||{}).productName||k.constants.systemName;return c=["DIV",{attrs:{"class":"zmL sysNoti"},child:[["DIV",{attrs:{"class":"zmLst"},child:[["DIV",{attrs:{"class":"zmDtl"},child:[["DIV",{attrs:{"class":"zmImg"},child:[["IMG",{attrs:{src:d}}]]}],["DIV",{attrs:{"class":"zmFrm"},child:[["SPAN",{child:[["text",e]]}]]}],["DIV",{attrs:{"class":"zmSub",style:"width: inherit"},child:[["SPAN",{attrs:{"class":"sum",style:"white-space: normal"},child:[["text",b]]}],["SPAN",{attrs:{style:"white-space: normal; display: block","class":"zmn-bactions"}}]]}]]}]]}]]}],h.getDOM(c)},action:function(a){var b,c=a.text,d=a.type;return b=["B"],"goto"===d&&(b=["SPAN",{attrs:{"class":"SC_lnk",style:"display:inline"},child:[["text",c]]}]),h.getDOM(b)}},f=function(a){for(var c=0;c<p;c++){var f=o[c],g=f.actions,h=d.item(b(f));e(h,g),a.appendChild(h)}},b=function(b){var c=b.type,d=(a("zmail.globalI18N")||{}).companyName||k.constants.companyName,e=(a("zmail.globalI18N")||{}).productName||k.constants.productName,f=j.extend({},b.placeholder,{companyName:d,productName:e}),g=[c,"OWNER","COMMON"].join("/");return g="notificationTypes."+g,i.get(n.moduleName,g,f)},e=function(a,b){for(var c=h(".","zmn-bactions",a)[0],e=0,f=b.length;e<f;e++){var i=b[e],j=d.action(i),k=i.uri,l=i.type;c.appendChild(j),"goto"===l&&g(j,k)}},g=function(a,b){h.bindReset(a,"click",function(a){window.open(a,"_blank")},[b])},l.getText=b,l.render=f,l.data=function(){return o},l.count=function(){return p},l.load=c,k.bizNotification=l,window.zmNCenter=k,k}),define([],function(){"use strict";var a,b,c,d,e,f,g,h=window.zmNCenter||{},i=h.helper,j=h.constants,k=!0,l=i.req,m=j.range||20;return b=function(){var a,b,c,d,e,f,g,h,i,j,k,l,n=0;return h={keys:[],values:{},hasNext:!0},a=function(a){for(var b=a>0?a:0,c=0,d=[],e=h.keys.length;c<e;c++)d.push(h.values[h.keys[b+c]]);return d},b=function(a){a=a||{};var b=a.nid,c=h.keys.indexOf(b);c>=0&&(h.keys.splice(c,1),delete h.values[b],n=n>0?n-1:n)},d=function(a,b){var d,e=a.nid;return h.keys.indexOf(e)<0?(h.keys.splice(b,0,e),h.values[e]=a,n++,d=a):d=c(a),d},c=function(a){var b,c=a.nid;b=h.values[c];var d=h.keys.indexOf(c);return b.nBy=b.nBy||[],b.nBy=b.nBy&&"string"==typeof b.nBy?$.parseJSON(b.nBy):b.nBy,a.nBy=a.nBy||[],a.nBy="string"==typeof a.nBy?$.parseJSON(a.nBy):a.nBy,b.nBy=a.nBy.concat(b.nBy),b.nby=b.nby&&"string"==typeof b.nby?b.nby.split(","):b.nby,a.nby=a.nby&&"string"==typeof a.nby?a.nby.split(","):a.nby||[],b.nby=a.nby.concat(b.nby),a.ncount=a.ncount||1,b.ncount="undefined"!=typeof b.ncount?b.ncount+a.ncount:b.ncount,b.commentuuid=b.commentuuid&&"string"==typeof b.commentuuid?b.commentuuid.split(","):b.commentuuid,b.commentuuid=a.commentuuid&&"string"==typeof a.commentuuid?a.commentuuid.split(","):a.commentuuid,b.ctime=a.ctime||b.ctime,b.memberzuid=a.memberzuid||b.memberzuid,h.values[c]=b,b.summary=a.summary||b.summary,d>0&&(h.keys.splice(d,1),h.keys.splice(0,0,c)),b},e=function(a){var b=a.length;h.hasNext=b>m;for(var c in a){var e=a[c];d(e,n)}},f=function(a){return d(a,0)},k=function(a){return h.keys.length>(a?m:1)},l=function(){return h.hasNext},g=function(){h.keys=[],h.values={},h.hasNext=!0,n=0},i=function(){return(h.values[h.keys[n-1]]||{}).nid},j=function(){return n},{data:h,reset:g,get:a,remove:b,merge:c,append:e,prepend:f,itemIndex:j,lastItem:i,hasData:k,hasNext:l}}(),f=function(){var a,b,c,d,e=!1;return b=function(a){e=!0,d=i.showLoader(a)},c=function(){e=!1,d()},a=function(){return e},{inProgress:a,initiated:b,completed:c}}(),c=function(a){var c=a.callback,e=a.initialLoad;if(e){if(b.hasData(e))return c(b.get(0),a),!1;b.hasNext()||b.reset()}else if(!e&&!b.hasNext()||f.inProgress())return!1;f.initiated(a.listInstance.listWrapper);var g={},h=b.itemIndex();g.mode=j.params.mode,g.range=m,g.isPrev=!1,g.entityType=j.params.eType,g.startIndex=h,l({param:g,callback:{fn:d,args:[c,a]},onerror:f.completed,onnetfailure:f.completed})},g=function(a){var b=[];return Array.isArray(a)&&(k||(k=!0),b=a),b},d=function(a,c){var d=g(a),e=c[0],h=c[1];b.append(d),e(d,h),f.completed()},e=function(a){zmail.hasOwnProperty("ncount")?a(j.ncount):l({param:{mode:"count"},callback:{fn:function(a,c){b.count=a.count,c(b.count)},args:a}})},a={cache:b,count:e,get:c,put:b.prepend,hasNext:b.hasNext},h.dataStore=a,window.zmNCenter=h,h}),define([],function(a){"use strict";var b=a("zmNCenter")||{},c=a("_zm"),d=a("zmail"),e=b.text,f=b.constants.allowedDesktopNotificationTypes||{},g=function(){var g=function(a){var b=f.streams,c=f.task,d=f.notes,e=f.mail;return b.indexOf(a)>-1||(e.indexOf(a)>-1||(c.indexOf(a)>-1||d.indexOf(a)>-1))},h=function(a){a=a||{};var c,d,f,g=a.nby,h=[],i=a.ncount,j=0,k=0,l=b.constants.formatter.showUsers,m=0,n={},o=[];for(g="string"==typeof g?[g]:g,j=g.length,d=0;d<j;d++)n.hasOwnProperty(g[d])||(n[g[d]]=!0,h.push(g[d]));for(j=h.length,m=i-l,f=j>l&&i>l&&m>0,k=f?l:j,d=0;d<k;d++)c=h[d],c=b.helper.getUser(c),h[d]=c,d>0&&o.push(","),o.push(b.formatter.formatSpecialUseCase(c.fn,{ntype:a.ntype}));if(f){var p=(f?m:g[l])+e.common.others;o=o.concat(p)}return o.push(" "),{txt:o,recent:h[0]}},i=function(g){g=g||{};var i,j=h(g),k=b.helper,l=b.formatter,m=[],n=g.etype,o=g.ntype,p=g.owner===d.zuid,q=g.shgroup||g.group,r="undefined"!=typeof q&&q.isGroup,s=j.count>1,t=k.isNotificationOf.folderShare(o),u=t?g.folder:void 0,v=k.isNotificationOf.memberRoleChange(o),w=k.isNotificationOf.newMemberAddition(o),x=k.isNotificationOf.inviteUser(o),y=k.isNotificationOf.addComment(o),z=k.isNotificationOf.taskUser(o),A=j.recent.g,B=j.recent.photo,C=k.getActionText(o,A,!p,s),D={entityName:k.getEntityName(n),groupName:r?q.name:""};if(w||v||x||y||z){var E=y?g.owner:g.memberzuid,F=E===d.zuid;D.memberName=F?e.common.you:k.getUser(E).fn}return t&&(D.entityAccess=c.getProperty(u,"role"),D.entityValue=c.getProperty(u,"fName")),v&&(D.memberRole=c.getProperty(g,"memberRole")||"moderator"),i=k.getSummaryText(s,g.summary),m=j.txt,m.push(l.formatActionText(C,D,!0)),m.push(i),{title:m.join(""),imgUrl:B,callback:function(){var c=a("zmList");if("59"===String(g.ntype)&&c)return b&&b.counter&&b.counter.decrement(),void c.getMailData({msgId:g.eid,tId:g.tid||g.eid,opentype:2,type:"lt",isRemainder:!0,src:"external"});if(f.streams.indexOf(g.ntype)>-1){var d={gid:g.group.id,pid:g.eid,etype:g.etype,actionType:g.group.isGroup?b.constants.viewGroupData:b.constants.viewSelfData,allComments:!0,shId:g.shId||"",ntype:g.ntype,group:g.group,markRead:!0};g.commentuuid&&(d.commentuuid=g.commentuuid),b&&b.counter&&b.counter.decrement();var e=a("zmUtil");e&&"function"==typeof e.loadStreamsInTab&&e.loadStreamsInTab(d)}}}},j=function(a){a=a||{};var b={title:"",msg:"",imgUrl:"",callback:void 0};g(a.ntype)&&(b=i(a),c.pushDesktopNotification(b))};return{show:j}}();return b.DesktopNotifier=g,b}),define([],function(a){"use strict";var b=a("$"),c=window.zmNCenter||{};c.wmsData=c.wmsData||[];var d,e,f,g,h,i,j,k=c.constants;return d=function(){j(),f(),g(),e()},j=function(){var a=c.text.common,d=b("#zm-notifications-popover");if(b("#zm-notifications-popover .zm-popover-content").addClass("SC_notification notiPopUp"),b("#zm-notification-header").text(a.title),d.width("450px"),!zmail.isInternalOrgUser){d.height("350px").css("bottom","auto");var e=b("#settings-app-nav-ico"),f="0px";e.length&&(f=document.body.offsetWidth-e[0].offsetLeft+"px",d.css("right",f))}b("#zm-notifications-popover").append(c.views.seeAllBand())},f=function(){var a=function(){b("#zm-notifications-popover .zm-popoverClose").click(),c.popout.preview.destroy()};b("#zm-notifications-popover .zmNotiSall").click(function(){a(),c.tab()}),b.unsubscribe(k.closePopoutFromStreams,a),b.subscribe(k.closePopoutFromStreams,a),c.popout()},g=function(){b.subscribe(k.reconnect,e),a("zmComponent").notifier.addHandler("streams",h)},e=function(){c.counter(),c.helper.reconnect()},i=function(a){if(a=a||{},!c.helper.suppressNotification(a.ntype)){var d=a.refList&&a.refList.split(",")||[];if(c.helper.isNotificationOf.dismiss(a.ntype))b.publish(k.removeNotification.tab,a),b.publish(k.removeNotification.popout,a),c.counter.decrement();else if(c.helper.isNotificationOf.clearCount(a.ntype))c.counter.reset(!0);else if(d.indexOf(zmail.zuid)>-1)return c.counter.increment(),!0}return!1},h=function(a,d){d=d||{};var e=d.data||{};i(e)&&(c.wmsData.push(e),c.helper.parseJSON(e),e=c.dataStore.put(e),c.DesktopNotifier.show(e),e.isWms=e.isWms||!0,b.publish(k.newNotification.tab,e),b.publish(k.newNotification.popout,e))},c.core=d,window.zmNCenter=c,c}),define([],function(a){"use strict";var b,c,d,e,f,g=a("zmText"),h=a("_zm"),i=window.zmNCenter||{},j={},k=i.views||{},l=i.helper||{},m=i.constants.formatter,n=k.textWrapper,o=k.nameWrapper,p=i.text;return j.stringReplaceAll=e=function(a,b,c){return a=a.replace(/[-\/\\^$*+?.()|[\]{}]/g,"\\$&"),b.replace(new RegExp(a,"gi"),c)},j.formatRebrandedText=b=function(b){var c=m.replacePatterns,d=(a("zmail.globalI18N")||{}).companyName||i.constants.companyName,f=(a("zmail.globalI18N")||{}).productName||i.constants.systemName;return b=e(c.companyName,b,d),b=e(c.productName,b,f)},j.formatActionText=c=function(a,c,d){c=c||{};var e,f=c.entityName,g=c.memberName,h=c.groupName,i=c.entityValue,j=c.entityAccess,k=c.memberRole,l=c.wallName,p=c.preposition?c.preposition+" ":"",q=m.replacePatterns,r=q.groupName,s=[];return a=a.replace(q.entityName,f),a=b(a),j&&(a=a.replace(q.entityAccess,j)),i&&(a=a.replace(q.entityValue,i)),g&&(a=a.replace(q.userName,g)),k&&(a=a.replace(q.memberRole,k)),l&&(a=a.replace(q.wallName,l)),a=a.replace(q.preposition,p),e=a.indexOf(r),d?a:(e>-1?(s.push(n(a.substring(0,e))),s.push(o(h)),s.push(n(a.substring(e+r.length)))):s.push(n(a)),s)},j.formatSpecialUseCase=d=function(a,b){return b=b||{},i.helper.isNotificationOf.mailReminder(b.ntype)?(g.get("notificationCenter","common")||{}).You:a},f=function(a,b,c){var e,f,g,h=[],i={},j=0,n=0,p=m.showUsers,q={},r=0,s=[];for(a="string"==typeof a?[a]:a,j=a.length,e=0;e<j;e++)q.hasOwnProperty(a[e])||(q[a[e]]=!0,s.push(a[e]));for(j=s.length,r=b-p,g=j>p&&b>p&&r>0,n=g?p:j,e=0;e<n;e++)f=s[e],f=l.getUser(f,c),s[e]=f,e>0&&h.push(k.nameSeparator),h.push(o(d(f.fn,c)));if(g){var t=k.andWrapper(g,g?r:a[p]);h=h.concat(t)}return i.recent=s[0],i.formatted=h,i.count=b,i},j.notificationItem=function(a){var b,d=[],e=a.etype,g=h.getProperty(i.text,"common.few_seconds_ago"),j=a.ctime,m=a.nby,o=a.ncount,q=a.ntype,r=a.owner===zmail.zuid,s=a.shgroup||a.group,t="undefined"!=typeof s&&s.isGroup,u=l.getActionIcon(q,e),v=f(m,o,{ntype:q,nBy:a.nBy}),w=v.recent.g,x=v.recent.photo,y=v.count>1,z=l.isNotificationOf.folderShare(q),A=z?a.folder:void 0,B=l.isNotificationOf.memberRoleChange(q),C=l.isNotificationOf.newMemberAddition(q),D=l.isNotificationOf.inviteUser(q),E=l.isNotificationOf.addComment(q),F=l.isNotificationOf.taskUser(q),G=l.getActionText(q,w,!r,y),H={entityName:l.getEntityName(e),groupName:t?s.name:"",preposition:t?"":h.getProperty(i.text,"common.your"),wallName:t?s.name:h.getProperty(i.text,"common.streams")};if(C||B||D||E||F){var I=E?a.owner:a.memberzuid,J=I===zmail.zuid;H.memberName=J?p.common.you:l.getUser(I).fn}return z&&(H.entityAccess=h.getProperty(A,"role"),H.entityValue=h.getProperty(A,"fName")),B&&(H.memberRole=h.getProperty(a,"folder.role")||"moderator"),d=v.formatted,b=l.getSummaryText(y,a.summary),d.push(n(" ")),d=d.concat(c(G,H)),d.push(n(b)),h.getProperty(a,"ctime")&&(g=l.relativeTime(a.ctime)),k.notificationItem({photo:x,framedText:d,actionIcon:u,timestamp:g,ctime:j})},j.eventNotificationItem=function(a){var b=a.summary[0];return a._eventData="string"==typeof b?$.parseJSON(b):b,b=a._eventData,b.remTime=this.eventTimeRemaining("0"===String(b.remType)?"start":"end",b.remTime),k.eventNotificationItem(a)},j.eventTimeRemaining=function(a,b){var c=p.eventNotification.timeRemaining,d=l.eventTimeRemaining(a,b),e=d.unit,f=d.value;return g.applyArgs(c[e][a],{value:f})},i.formatter=j,window.zmNCenter=i,i}),define([],function(a){"use strict";var b,c,d,e,f,g,h=window.zmNCenter||{},i=h.helper;return d=function(b){var c=a("zmsuite");c.topbarInitialized&&zmTopBar.updateNotificationsCount(b)},e=function(a){c+="undefined"==typeof a?1:Number(a),d(c)},f=function(a){c>0&&e(a||-1)},g=function(a){var b=function(a){c=0,d(c)};a?b():c>0&&i.resetBadgeCount(c,b)},b=function(){i.getBadgeCount(function(a){c=a.count,c+=h.bizNotification.count(),d(c)})},b.count=function(){return c},b.setCount=function(a){"number"==typeof a&&a>=0&&(c=a,d(c))},b.increment=e,b.decrement=f,b.reset=g,h.counter=b,window.zmNCenter=h,h}),define([],function(a){"use strict";var b,c=a("_zm"),d=a("$"),e=a("zmail"),f=window.zmNCenter||{},g=f.constants,h=f.helper,i=f.formatter,j=f.dataStore;return b=function(a){var b,k,l,m,n,o,p=this;this.listWrapper=a.parent,this.onPagination=a.onPagination,this.whenSelected=a.whenSelected,this.objToElMap={},n=function(a,b,d){var e=g.css.list.selection,f=arguments[3],h=c(".",e,a.parentNode)[0];f&&"function"==typeof f.stopPropagation&&f.stopPropagation(),c.removeClass(h,e),c.addClass(a,e),d.whenSelected(a,b)},l=function(a){return a=a||{},a.nid},m=function(a,b){var c,e,f=b.listWrapper.children,g=f.length,h=l(a),i=p.objToElMap[h];if(i)return i;for(c=0;c<g;++c)if(e=d(f[c]).data("zmsData")||{},h===e.nid)return a.nid=h||e.nid,f[c]},k=function(a,b){if(!h.isItemViewable(b))return!1;var e;return h.isEventNotification(b)?e=i.eventNotificationItem(b):(e=i.notificationItem(b),h.folderShare(b,c(".","zmSub",e)[0]),h.clearNotification(b,e)),e&&(h.isItemClickable(b)?c.bind(e,"click",n,[e,b,a]):c.addClass(e,"noPreview"),d(e).attr("id",b.nid),p.objToElMap[b.nid]=e),d(e).data("zmsData",b),e},this.addItem=function(a,b,e){c.remove(c(".","SC_nmsg",e.listWrapper)[0]);var f=m(b,e);f&&d(f).remove();var g=k(e,b);g&&(e.listWrapper.hasChildNodes()?c.before(e.listWrapper.firstChild,g):e.listWrapper.appendChild(g))},this.removeItem=function(a,b,c){b=b||{};var e=m(b,c),g=d(e).attr("id");g&&"undefined"!=typeof p.objToElMap[g]&&delete p.objToElMap[g],d(e).remove(),f.dataStore.cache.remove(b)},o=function(a,b){for(var c,d=0,e=a.length,f=document.createDocumentFragment(),g=b.listInstance;d<e;d++){c=a[d],c.isMail="4"===c.ntype,c.isDeleted="34"===c.ntype;var h=k(g,c);h&&f.appendChild(h)}g.listWrapper.appendChild(f),g.emptyList()},b=function(a){j.hasNext()&&(a.loadList(),"undefined"!=typeof onPagination&&a.onPagination())},this.emptyList=function(){this.listWrapper.hasChildNodes()||(this.listWrapper.innerHTML="",p.objToElMap={},this.listWrapper.appendChild(f.views.emptyList()),d(".zmNotiSall").hide())},this.reset=function(){this.listWrapper.innerHTML="",p.objToElMap={},h.updateTime.stop(this.timerUpdate)},this.loadList=function(a){var b=this;e.ContactBook.fetchProcess.done(function(){j.get({callback:o,listInstance:b,initialLoad:a})})},this.init=function(){this.reset(),this.timerUpdate=h.updateTime.start(this.listWrapper),f.bizNotification.render(this.listWrapper),this.loadList(!0),h.paginate(this,this.listWrapper,b)},this.init()},f.list=b,window.zmNCenter=f,f}),define([],function(a){"use strict";var b,c,d,e,f,g,h,i=a("$"),j=a("_zm"),k=window.zmNCenter||{},l=!1,m=k.constants;return b=function(){e=j("#",m.popoutId)},f=function(){i.unsubscribe(m.newNotification.popout,c.addItem),c&&c.reset(),delete k.popout.list},d=function(){c=new k.list({parent:e,whenSelected:function(a,b){k.popout.preview({fromElement:e,data:b})},onPagination:function(){}}),k.popout.list=c,i.unsubscribe(m.newNotification.popout),i.unsubscribe(m.removeNotification.popout),i.subscribe(m.newNotification.popout,g),i.subscribe(m.removeNotification.popout,h)},g=function(a,b){b=b||{},l&&b.isWms&&k.counter.decrement(),c.addItem(a,b,c)},h=function(a,b){c.removeItem(a,b,c)},k.popoutOpen=function(){l||(l=!0,k.counter.reset(),d())},k.popoutClose=function(){l&&(l=!1,f())},k.popout=b,window.zmNCenter=k,k}),define([],function(a){"use strict";var b=a("$"),c=a("_zm"),d=window.zmNCenter||{};d.popout=d.popout||{};var e,f,g,h,i,j,k,l=d.constants;return e=function(a){f=a.fromElement;var b=a.data,c="59"!==String(b.ntype);c&&(h(),i()),d.helper.loadPreview({data:b,previewElm:c?g:null,fixedComment:!0})},e.destroy=function(){
b.publish(l.removePopoutPreview,[{element:g}]),c.remove(g),g=void 0},h=function(){return g?g:(g=d.views.popout(l.popoutElmId),document.body.appendChild(g),c.setAttr(g,{style:l.css.popoutStyle}),j(),g)},i=function(){if(g){var a=f.getBoundingClientRect(),b=document.body.getBoundingClientRect().width-a.left,d=a.top-1,e=document.body.getBoundingClientRect().height,h=c("#","wmstoolbar"),i=h?h.getBoundingClientRect().height:0;g.style.top=d+"px",g.style.right=b+"px",g.style.maxHeight=e-(i+d+10)+"px"}},k=function(a){b.publish(l.stopEvents),c.stopEvents(a,!0)},j=function(){c.bind(g,"mousedown",k),c.bind(g,"mouseup",k),c.bind(window,"resize",e.destroy),b.publish(l.hideMenuEvent,[{element:g,waitForActiveMenuHandler:!0,activeMenu:{activeMenuHandler:function(){return a("zmStreamsApp").CommentModule.retainComment(g),!0}},menuHandler:function(){b.publish(l.removePopoutPreview,[{element:g}]),g=void 0}}])},d.popout.preview=e,window.zmNCenter=d,d}),define([],function(a){"use strict";var b,c,d,e,f,g,h,i,j=a("$"),k=a("_zm"),l=window.zmNCenter||{},m=l.text,n=l.constants;return b=function(){var b=l.helper.workspace({name:n.workSpaceName,appConfig:{appname:m.common.title,appId:n.workSpaceName,data:{CNodes:"3"},appIcon:n.css.tabIcon,hashKey:"notifications",hashChangeHandler:function(b,c){var d=this;a("zmUtil").debugLog("Notifications hash-url changed",c,d)},onDelete:function(a){var b=g.getNodes()[1].getDOMNode()[0];return j.publish(n.removePopoutPreview,[{element:b}]),!0}},destroy:function(){d()},listingClick:function(){},closePreview:function(a){j.publish(n.removePopoutPreview,[{element:a.$el}]),a.close()}});f=b.listArea,k.addClass(f,n.css.workSpaceClass),g=b.previewCard,e()},e=function(){c=new l.list({parent:f,whenSelected:function(a,b){var c,d="59"!==String(b.ntype);d&&(g.getNodes()[0].headerArr.text=[],g.show(),c=g.getNodes()[1].getDOMNode()[0],j.publish(n.removePopoutPreview,[{element:c}])),l.helper.loadPreview({data:b,previewElm:d?c:null,fixedComment:!1,openType:"preview"})},range:15}),l.tab.list=c,j.unsubscribe(n.newNotification.tab),j.unsubscribe(n.removeNotification.tab),j.subscribe(n.newNotification.tab,h),j.subscribe(n.removeNotification.tab,i)},h=function(a,b){b=b||{},c&&c.listWrapper&&c.listWrapper.children&&b.isWms&&l.counter.decrement(),c.addItem(a,b,c)},i=function(a,b){c.removeItem(a,b,c)},d=function(){g&&g.close(),j.unsubscribe(n.newNotification.tab),c&&c.reset(),delete l.tab.list},l.tab=b,window.zmNCenter=l,l});