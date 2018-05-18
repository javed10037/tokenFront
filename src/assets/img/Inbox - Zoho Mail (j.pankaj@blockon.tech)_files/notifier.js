define([],function(a,b){"use strict";var c=a("zmComponent"),d=a("zmail.Framework.Utils.PUBSUB"),e={},f=new d,g={push:function(a,b){g.handle(a,b)},addHandler:function(a,b){f._subscribeHandler(a,b),e[a]=e[a]>-1?e[a]+1:1},removeHandler:function(a,b){f._unsubscribeHandler(a,b),b[a]>0&&(b[a]-=1)},commonHandler:function(b){window.console.log("unhandled notification : ",b),b.error?a("zmUtil").updOutbox(b):b.shareId?a("zmshare").shNotify(b):b.bulk||b.sweep?a("zmmailAct").notifyBulkAction(b):a("zmmailAct").doActions("newm","chat",b)},handle:function(a,b){b=b||{};var c=b.module||a.module||"";e[c]>0?f.publish(c,{data:a,opts:b}):g.commonHandler(a,b)}};return c.notifier={__handlers:e,push:g.push,addHandler:g.addHandler,removeHandler:g.removeHandler},c}),define([],function(a){"use strict";var b,c,d,e,f=a("zmComponent"),g=a("_zm"),h=[],i=[],j=0,k={new_notification:function(a){return["DIV",{attrs:{"class":"SC_newmail"},child:[["UL",{attrs:{"class":"SC_P2r"},child:[["LI",{child:[["DIV",{child:[["SPAN",{child:[["text",a.sender]]}],["SPAN",{child:[["text",a.subject]]}]]}]]}]]}]]}]}},l={newNotification:function(a){var b={};b.subject=a.SB||"",b.sender=a.SN||"";var c=f.htmlizer(k.new_notification(b));return c}},m={start:function(){return j<b?void m.create():void(j=j>b?0:j)},add2Q:function(a){a.elm=l.newNotification(a),h.push(a),d=d||setInterval(function(){m.start()},1e3)},popFromQ:function(a){m.destroy(a)},addElm2Parent:function(a){var b=c.firstChild;b?g.before(b,a):g.append(c,a)},create:function(){if(h.length>0){var a=h.shift(),b=a.elm;i.push(a),m.action(b,a),m.addElm2Parent(b),j++,f.soundNotifier.play("mail"),setTimeout(function(){m.popFromQ(b)},4e3)}else clearInterval(d),d=void 0},action:function(a,b){f.bind({elm:a,ev:"click",fn:e,args:[b]})},destroy:function(a){g.addClass(a,"SC_hde"),setTimeout(function(){g.remove(a)},200),j=j>0?j-1:0}},n=function(a){return c=a&&a.parent||document.body,b=a&&a.notifications2Display||2,e=a&&a.openMail||function(a){window.console.log("open mail for this notification : ",a)},{push:function(a){m.add2Q(a)},nobj:function(){return f.debug?i:""}}};return f.mailNotifier=function(a){return n(a)},f}),define([],function(a,b){"use strict";var c,d=a("zmail.Core.Namespaces"),e=d.create("zmComponent.soundNotifier"),f={},g=["mail","stream"],h=".mp3",i={},j=1,k=0,l="undefined"!=typeof window.Audio&&"function"==typeof window.Audio,m={1:"Bell",2:"Electric",3:"Cue",4:"Wink",5:"Ting"},n=[k];Object.keys(m).forEach(function(a){n.push(Number(a))});var o=function(a){var b;if(m.hasOwnProperty(a)&&l)return b=m[a]+h,new Audio(zmail.mediaPath+b)},p=function(a){var b,c=i[a];return b=m.hasOwnProperty(c)?m[c]+h:m[j]+h,new Audio(zmail.mediaPath+b)},q=function(a){"undefined"!=typeof f[a]&&(f[a].pause(),f[a].currentTime=0)},r=function(a,b){g.indexOf(a)>-1&&(i[a]=b||k,b&&l&&(f[a]=p(a)))},s=function(){c=zmail.Settings.MailSuite.Settings.General.MailSoundNotifier.Setting,r("mail",c.get()),c.on("props.change",function(a){a=a||{},a.changed.hasOwnProperty("value")&&r("mail",a.changed.value)})};return e.play=a("_").throttle(function(b){var c=a("zmUtil").getWindowVisibilityStatus();c=c<=0;try{if(!c||!i[b]||!l)return;"undefined"==typeof f[b]?f[b]=p(b):q(b),f[b].play()}catch(d){}},500),e.stop=function(a){"undefined"!=typeof f[a]&&f[a].pause()},e.initialize=s,e._allowedValues=n,e.soundCodesMap=m,e._getAudioObject=o,e._isSupported=l,e});