!function(){"use strict";var a,b,c,d=zmail.Core.Namespaces.create("zmReader"),e={},f=["Lato","Open Sans","Arial","Courier New","Verdana","Georgia","Comic Sans Ms"],g=["Lato","Open Sans","arial","courier new","Verdana","georgia","Comic Sans MS"],h={},i=zmText.get("zmReader"),j=function(a){try{return zmUtil.textReadTime(a)}catch(b){return zmUtil.debugLog(b),""}},k=function(){return zmAdHocSettings.getNightMode()},l=function(){try{h.drop(),c.hideTools(),e.readerElem.outerHTML="",a="",e={}}catch(b){document.getElementsByClassName("SC_Pop SC_rdrPop")[0].outerHTML="",zmUtil.debugLog(b)}},m=function(b){if(!("prev"===b&&a.handler.hasPrev()||"next"===b&&a.handler.hasNext()))return!1;e.contentElm.innerHTML="";var c=zmComponent.loadingBand({container:e.contentElm,type:"pagination"}),d=$.Deferred();$.when(d).done(function(a){c(),e.contentElm.innerHTML=a.content,e.headerElm.childNodes[1].textContent=zmUtil.replaceHtmlInSubject(a.title),a.readTime&&(e.headerElm.childNodes[2].textContent=j(a.content))}),a.handler.fetchMail(b,d),a.handler.hasPrev()?e.prevIcon.style.display="block":e.prevIcon.style.display="none",a.handler.hasNext()?e.nxtIcon.style.display="block":e.nxtIcon.style.display="none"},n={};n.settList=["font","fontFamily","nightMode","lineSpacing"],n.updKey=function(a,b){return!(!b||n.settList.indexOf(a)===-1)&&(zmail.readerSett[a]=b,!0)},n.get=function(a){return n.settList.indexOf(a)!==-1&&zmail.readerSett[a]},n.init=function(a){var b={font:a.font,fontFamily:a.ff,nightMode:a.nm,lineSpacing:a.lineSpacing};zmail.readerSett=b};var o=function(){e.readerElem.classList.remove("zmNightMode"),e.readerElem.classList.add("zmDefaultMode"),n.updKey("nightMode","0"),c.turnOffNitMode()},p=function(){e.readerElem.classList.add("zmNightMode"),e.readerElem.classList.remove("zmDefaultMode"),n.updKey("nightMode","1"),c.tureOnNitMode()},q=function(){zmail.Printer.print({title:a.title,content:e.readerElem.querySelector(".SC_RdrCont").innerHTML,css:[]})},r=function(){b||(b=document.createElement("style"),e.readerElem.querySelector(".SC_RdrCont").appendChild(b)),b.innerHTML=".zm_rdrCont * {font-size:"+n.get("font")+"px !important; font-family:"+g[n.get("fontFamily")]+" !important; line-height:"+n.get("lineSpacing")+" !important}"};h.scope="zmReader",h.keys=[{uid:"close",keyStr:"esc",actions:[function(){l()}]},{uid:"prev",keyStr:"leftArrow",actions:[function(){m("prev")}]},{uid:"next",keyStr:"rightArrow",actions:[function(){m("next")}]}],h.drop=function(){zmComponent.keybindings.dropScope(h.scope),zmComponent.keybindings.setScope(h.prevScope)},h.init=function(){h.prevScope=zmComponent.keybindings.getScope();var a={shortcuts:h.keys,scope:h.scope};zmComponent.keybindings.registerAll(a),zmComponent.keybindings.setScope(h.scope)};var s=function(){var a=function(a){this.width=a.width,this.minVal=a.minValue,this.maxVal=a.maxValue,this.currVal=a.initialPos,this.onChange=a.onChange,this.leftClass=a.lIconClass||"",this.rightClass=a.rIconClass||"",this.leftText=a.leftText||"",this.rightText=a.rightText||"",this.decimals=a.decimals||0,this.adjustVal=a.adjustVal||1},b=function(a,b){var c,d,e=b,f=a.clientX-e.elemRef.getBoundingClientRect().left+6;return d=e.minVal+f/e.pixelsPerSlot,d=Math.max(e.minVal,d),d=Math.min(d,e.maxVal),d=d.toFixed(e.decimals),c=100*(f/e.elemRef.offsetWidth).toFixed(2),{barWidth:c,value:Number(d),pinPosition:f}},c=function(a,c){var d=c,e=b(a,c);d.pinPosition=e.pinPosition,d.elemRef.querySelector(".SC_thm").textContent=e.value,d.currVal=e.value,d.elemRef.querySelector(".SC_sldrRng").style.width=e.barWidth+"%",d.onChange(d.currVal)},d=function(a,b){var c,d=b;"increment"===a?(c=d.currVal+d.adjustVal,c=Number(c.toFixed(d.decimals)),c<=d.maxVal&&(d.pinPosition+=d.decimals?d.pixelsPerSlot/10:d.pixelsPerSlot,d.currVal=c)):"decrement"===a&&(c=d.currVal-d.adjustVal,c=Number(c.toFixed(d.decimals)),c>=d.minVal&&(d.pinPosition-=d.decimals?d.pixelsPerSlot/10:d.pixelsPerSlot,d.currVal=c)),d.elemRef.querySelector(".SC_thm").textContent=d.currVal,d.elemRef.querySelector(".SC_sldrRng").style.width=100*(d.pinPosition/d.elemRef.offsetWidth).toFixed(2)+"%",d.onChange(d.currVal)};return a.prototype.build=function(){var a=this,b=document.createElement("div");b.className="SC_sldrSel";var e=a.width/(a.maxVal-a.minVal),f=Math.round((a.currVal-a.minVal)*e)+6;a.pinPosition=f,f=f/a.width*100,a.pixelsPerSlot=e,b.innerHTML='<span class="SC_slider"><i class="'+a.leftClass+' SC_sldrLeft">'+a.leftText+'</i><span class="SC_sldrRng" style="width:'+f+'%;"><span id="slider-pin"></span></span><i class="'+a.rightClass+' SC_sldrRight">'+a.rightText+'</i></span><span class="SC_thm">'+a.currVal+"</span></div>";var g=function(b){c(b,a)};return b.querySelector(".SC_slider").addEventListener("mousedown",function(d){c(d,a),b.addEventListener("mousemove",g)}),b.querySelector(".SC_slider").addEventListener("mouseup",function(a){b.removeEventListener("mousemove",g)}),b.querySelector(".SC_sldrLeft").addEventListener("mousedown",function(b){d("decrement",a),b.stopPropagation()}),b.querySelector(".SC_sldrRight").addEventListener("mousedown",function(b){d("increment",a),b.stopPropagation()}),a.elemRef=b,b},{construct:function(b){var c=new a(b);return c.build()}}}();c=function(){var a,b={},c={};c.font={template:'<li><b class="js-icon-selector"><div class="SC_hd"></div><span><i class="msi-txt" title ="'+i.reader.fontOpt+'">AA</i></span></b></li>'},c.nightMode={template:'<li><b class="js-icon-selector"><div class="SC_hd"></div><span><i title ="'+i.reader.nmOn+'" class="msi-nightMode"></i></span></b></li>'},c.print={template:'<li><b class="js-icon-selector"><div class="SC_hd"></div><span><i title ="'+i.reader.print+'" class="msi-print"></i></span></b></li>'},c.font.loadOptions=function(b){var c,d=function(){var a=function(){var a="";return f.forEach(function(b,c){a+="<em data-id="+c+' style="font-family:'+g[c]+'";>'+b+"</em>"}),a},b=document.createElement("div");b.innerHTML="<label>"+i.reader.ff+"</label>";var c=document.createElement("div");return c.className="fontSettings",c.innerHTML=a(),c.children[n.get("fontFamily")].className="sel",c.addEventListener("click",function(a){var b=a.target||a.srcElement;"EM"===b.tagName&&(b.parentElement.querySelector(".sel").className="",b.className="sel",n.updKey("fontFamily",b.dataset.id),r())}),b.appendChild(c),b},e=function(){var a=document.createElement("div");a.innerHTML="<label>"+i.reader.fs+"</label>";var b=s.construct({width:190,minValue:10,maxValue:48,initialPos:n.get("font"),onChange:function(a){n.updKey("font",a),r()},lIconClass:"msi-txt sml",rIconClass:"msi-txt big",leftText:"AA",rightText:"AA",decimals:0,adjustVal:1});return a.appendChild(b),a},h=function(){var a=document.createElement("div");a.innerHTML="<label>"+i.reader.spacing+"</label>";var b=s.construct({width:190,minValue:1,maxValue:4,initialPos:n.get("lineSpacing"),onChange:function(a){n.updKey("lineSpacing",a),r()},lIconClass:"msi-superCompact",rIconClass:"msi-compact",leftText:"",rightText:"",decimals:1,adjustVal:.1});return a.appendChild(b),a},j=[e,h,d],k=document.createElement("div");j.forEach(function(a,b){c=document.createElement("li"),c.appendChild(a()),k.appendChild(c)});var l={par:b,liDom:$(k.children),showArrow:!0,ulClass:"SC_RdrSettings",onHide:function(){a=""}};"1"===n.get("nightMode")&&(l.spanClass="zmNightMode"),a=zmUtil.isChildWindow()?zmWindow.showMenu(l):zmsuite.showMenu(l)};var d=function(a){var b=a.srcElement||a.target;b=b.closest("li").querySelector("i");var d=b.className;switch(d){case"msi-nightMode":b.className="msi-dayMode",b.title=i.reader.nmOff,p();break;case"msi-dayMode":b.className="msi-nightMode",b.title=i.reader.nmOn,o();break;case"msi-close":l();break;case"msi-print":q();break;case"msi-txt":c.font.loadOptions(b)}};return b.hideTools=function(){a&&(a.remove(),a="")},b.tureOnNitMode=function(){a&&a.$el.addClass("zmNightMode")},b.turnOffNitMode=function(){a&&a.$el.removeClass("zmNightMode")},b.elemRef="",b.toolsTemplate=function(){var a=document.createElement("div");a.className="SCmb";var e="<ul>";return Object.keys(c).forEach(function(a,b){e+=c[a].template}),e+="</ul>",a.innerHTML=e,a.addEventListener("click",d),b.elemRef=a,a},b}();var t=function(a){var b=e.headerElm.classList.contains("SC_fxdHdr");this.scrollTop>=20&&!b?e.headerElm.classList.add("SC_fxdHdr"):this.scrollTop<20&&b&&e.headerElm.classList.remove("SC_fxdHdr")},u=function(){var b="SC_Pop SC_rdrPop wht";e.readerElem=document.createElement("div"),"1"===n.get("nightMode")&&(b+=" zmNightMode"),e.readerElem.className=b,e.headerElm=document.createElement("div"),e.headerElm.className="SC_phd SC_RdrIcons",e.headerElm.appendChild(c.toolsTemplate());var d=document.createElement("h1");d.textContent=a.title,e.headerElm.appendChild(d);var f=document.createElement("span");f.className="sum",f.textContent=a.readTime,e.headerElm.appendChild(f),e.contentElm=document.createElement("div"),e.contentElm.className="zm_rdrCont zmPCon zmPCnt",e.contentElm.innerHTML=a.content;var g='<div class="SC_pe"><div class="SC_PU"><div class="SC_PUcen"><div class="SC_RdrCont"></div></div></div></div>';e.readerElem.innerHTML=g;var h=document.createElement("div");h.className="SCmb puClose",h.innerHTML='<ul><li><b class="js-icon-selector"><div class="SC_hd"></div><span><i title ="'+i.reader.close+'" class="msi-close"></i></span></b></li></ul>',h.addEventListener("click",l);var j=e.readerElem.querySelector(".SC_PU");j.insertBefore(h,j.getElementsByClassName("SC_PUcen")[0]),e.readerElem.querySelector(".SC_RdrCont").appendChild(e.headerElm),e.readerElem.querySelector(".SC_RdrCont").appendChild(e.contentElm),document.body.appendChild(e.readerElem),a.handler&&a.handler.isConversation()&&(e.prevIcon=document.createElement("div"),e.prevIcon.className="SC_npIco SC_prevMsg",e.prevIcon.title=i.menus.prev,a.handler.hasPrev()||(e.prevIcon.style.display="none"),e.prevIcon.innerHTML='<i class="msi-prevH"></i>',e.prevIcon.addEventListener("click",function(a){m("prev",e.prevIcon)}),e.readerElem.querySelector(".SC_RdrCont").appendChild(e.prevIcon),e.nxtIcon=document.createElement("div"),e.nxtIcon.className="SC_npIco SC_nxtMsg",e.nxtIcon.title=i.menus.next,a.handler.hasNext()||(e.nxtIcon.style.display="none"),e.nxtIcon.innerHTML='<i class="msi-nextH"></i>',e.nxtIcon.addEventListener("click",function(a){m("next",e.nxtIcon)}),e.readerElem.querySelector(".SC_RdrCont").appendChild(e.nxtIcon)),e.readerElem.querySelector(".SC_PUcen").addEventListener("scroll",t),e.contentElm.addEventListener("click",function(a){var b=a.target||a.srcElement;return"IMG"===b.nodeName&&zmPreviewTemplate.slideZImages($(b)),!1})},v=function(){zmAdHocSettings.subscribeNightModeChange(function(a,b){n.updKey("nightMode",b.value)})},w=function(d){try{if(e.readerElem="",b="",a=d,!a.title||!a.content)return;a.title=zmUtil.replaceHtmlInSubject(a.title),a.readTime||(a.readTime=j(a.content)),u(),r(),"1"===n.get("nightMode")&&(c.elemRef.querySelector(".msi-nightMode").title=i.reader.nmOff,c.elemRef.querySelector(".msi-nightMode").className="msi-dayMode"),h.init()}catch(f){zmUtil.debugLog(f)}};d.load=w,v(),n.init({font:14,ff:0,nm:k(),lineSpacing:1.5})}();