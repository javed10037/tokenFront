!function(a){"use strict";a.call(zmail.Core.Namespaces.create("zmail.ContactBook.Utils"),zmail.Core.Namespaces.get)}(function(a){"use strict";var b=a("zmail.Utils.EmailValidator");this.isEmailID=function(){var a=b.validate.apply(this,arguments)||{};return a.status===!0};var c=/^\d+$/;this.isNumber=function(a){return c.test(a)},this.initials=function(a){a=a||"",a=$.trim(a);var b=a.split(/\s+/);return b.length>=2?b[0][0]+b[1][0]:(a=b[0],(a[0]||"")+(a[1]||""))},this.colorClasses=function(){var a=["avtrBg1","avtrBg2","avtrBg3","avtrBg4","avtrBg5","avtrBg6","avtrBg7"];return function(){return a[Math.floor(Math.random()*a.length)]}}()}),function(a){"use strict";a.call(zmail.Core.Namespaces.create("zmail.ContactBook.Constants"))}(function(){"use strict";this.CONTACTS_TYPES={ZOHO:"zoho",ZOHO_ORG:"org",PERSONAL:"personal",CRM:"crm"},this.CATEGORY_TYPES={ORG:"org",PERSONAL:"personal"},this.EVENTS={GROUP_ADDED:"CONTACT_BOOK_GROUP_ADDED",GROUP_REMOVED:"CONTACT_BOOK_GROUP_REMOVED",GROUP_CHANGED:"CONTACT_BOOK_GROUP_CHANGED",GROUP_MEMBERS_ADDED:"CONTACT_BOOK_GROUP_MEMBERS_ADDED",GROUP_MEMBERS_REMOVED:"CONTACT_BOOK_GROUP_MEMBERS_REMOVED",GROUP_MODERATORS_ADDED:"CONTACT_BOOK_GROUP_MODERATORS_ADDED",GROUP_MODERATORS_REMOVED:"CONTACT_BOOK_GROUP_MODERATORS_REMOVED"},this.MODES={MOST_USED:"500",ZUID:"zuid",EMAIL_ID:"200",CATEGORY_ID:"300",SEARCH:"query",STREAM_GROUPS:"groups",STREAM_GROUP_MEMBERS:"groupid",ORG_MEMBERS:"orgdata",IS_ORG:"isorg"}}),function(a){"use strict";a.call(zmail.Core.Namespaces.create("zmail.ContactBook.Templates"),zmail.Core.Namespaces.get)}(function(a){"use strict";var b=a("_");this.avatarInitials=function(a){var b=$("<span/>");return b.text(a),b},this._avatarImageLoader=function(){var a=null;return function(){return a||(a=zmail.Utils.Image.createThrottledLoader({storeRequests:!0,maxRequests:12})),a}}(),this.avatar=function(a){a=a||{};var c,d,e=a.$avatar||$("<div class='SC_avtr' />"),f=a.avatarBgColor;if(a.isValidPhoto===!0)c=a.$img||$("<img/>"),c.attr("src",a.photo),e.append(c);else if(a.isValidPhoto===!1)e.addClass(f),e.append(this.avatarInitials(a.initials));else{var g=a.onLoad||b.noop,h=a.onError||b.noop;c=$("<img style='visibility:hidden;' />");var i=this._avatarImageLoader();e.append(c),d=this.avatarInitials(a.initials),e.append(d),i.load(a.photo).done(function(){g(),d.remove(),c.attr("src",a.photo),c.removeAttr("style")}).fail(function(){h(),e.addClass(f),c.remove()})}return e},this.label=function(a){var b=$(["<span class='SC_crmStamp' />"].join(""));return b.text(a),b},this.card=function(a){var b=$([" <div class='zmConData' >","<div>","<strong class='js-name' />","</div>","<div>","<span class='js-desc'/>","</div>","</div>"].join(""));return a.name&&b.find(".js-name").text(a.name),a.nameLabel&&b.find(".js-name").parent().append(this.label(a.nameLabel)),a.desc&&b.find(".js-desc").text(a.desc),a.descLabel&&b.find(".js-desc").parent().append(this.label(a.descLabel)),b}}),function(a){"use strict";a.call(zmail.Core.Namespaces.create("zmail.ContactBook.Models.Logs"))}(function(){"use strict";var a=this.RequestLog=function(b){return this instanceof a?(b=b||{},this.logs=b.logs||{},void(this.delimiter=b.delimiter||"$:$")):new a(b)};a.prototype={hash:function(a){return[a.str||"",a.ids||"",a.typ||""].join(this.delimiter)},add:function(a){return a.hash=this.hash(a),this.logs[a.hash]=a,this},getLog:function(a){var b=this.hash(a);return this.logs[b]},getSuperSetLog:function(a){for(var b,c=a.str,d=c.length,e=1;e<d;e++)if(b=this.hash({str:c.substring(0,d-e),ids:a.ids,typ:a.typ}),b in this.logs)return this.logs[b]},get:function(a){var b=this.getLog(a);return b||(b=this.getSuperSetLog(a)),b}}}),function(a){"use strict";a.call(zmail.Core.Namespaces.create("zmail.ContactBook.Models.Entity"),zmail.Core.Namespaces.get)}(function(a){"use strict";var b=a("_"),c=a("zmail.zoid"),d=a("zmail.ContactBook.Utils"),e=a("zmail.ContactBook.Templates"),f=["fn","ln","fn_ln","fn_mn_ln","nn","mn"],g=["fn","ln","fn_ln","fn_mn_ln","nn","mn","eid"],h=["zid","eid","fn","mn","ln","nn","photo"],i=this.Contact=function(a){return this instanceof i?void this.init(a):new i(a)};i.prototype={defaults:function(){return{zid:void 0,eid:void 0,g:void 0,fn:"",mn:"",ln:"",nn:"",photo:void 0,isPrimary:void 0}},defineProperties:function(){var a,b,e,f,g=d.colorClasses(),h=this.attrs,i=this;return Object.defineProperties(this,{id:{get:function(){return h.zid||h.eid},enumerable:!1,configurable:!1},zoid:{get:function(){return e},set:function(a){e=a}},type:{get:function(){return b},set:function(a){b=a}},isValidPhoto:{get:function(){return f},set:function(a){f=a}},initials:{get:function(){return a}},isOrg:{get:function(){return i.zoid===c}},name:{get:function(){return[h.fn||"",h.mn||"",h.ln||""].join(" ").trim()||h.nn||""}},avatarBgColor:{get:function(){return g}}}),a=d.initials(this.name),this.photoOnLoad=this.photoOnLoad.bind(this),this.photoOnError=this.photoOnError.bind(this),this},get:function(a){return this.attrs[a]},avoidDuplicates:function(){var a=this.attrs,b={};return f.forEach(function(c){var d=a[c];d in b&&(a[c]=""),b[d]=1}),this},init:function(a){this.attrs={},a.fn=(a.fn||"").trim(),a.ln=(a.ln||"").trim(),a.mn=(a.mn||"").trim(),a.nn=(a.nn||"").trim(),a.eid=(a.eid||"").trim();var c=(a.fn||"").trim(),d=(a.mn||"").trim(),e=(a.ln||"").trim(),f="",g="";c&&e&&(f=c+" "+e),c&&d&&e&&(g=c+" "+d+" "+e),b.extend(this.attrs,this.defaults(),a,{fn_ln:f,fn_mn_ln:g}),this.defineProperties().avoidDuplicates()},equals:function(a){if(this===a)return!0;var c=this.attrs,d=a.attrs;return b(h).all(function(a){return c[a]===d[a]})},isPrimary:function(){return this.get("isPrimary")===!0},isMergeable:function(a){var c=this.attrs,d=a.attrs;return b(h).all(function(a){var e=c[a],f=d[a];return b.isEmpty(e)||b.isEmpty(f)||e===f})},merge:function(a){var c=this.attrs,d=a.attrs;return h.forEach(function(a){b.isEmpty(c[a])&&!b.isEmpty(d[a])&&(c[a]=d[a])}),this},toJSON:function(){return this.attrs},photo:function(a){if(a&&!b.isEmpty(this.attrs.photo)){var c=this.attrs.photo,d="?",e="API=true";return c.indexOf("?")!==-1&&(d="&"),c+d+e}return this.attrs.photo},photoOnLoad:function(){this.isValidPhoto=!0},photoOnError:function(){this.isValidPhoto=!1},avatar:function(a){return a=a||{},a=b.extend({isValidPhoto:this.isValidPhoto,onLoad:this.photoOnLoad,onError:this.photoOnError,photo:this.photo(!0),initials:this.initials,avatarBgColor:this.avatarBgColor},a),e.avatar(a)},view:function(a,c){c=c||{},c=b.extend({name:a&&this.getMatchingName(a)||this.name,desc:this.attrs.eid},c);var d=$("<div class='zmConWra' />");return d.append(this.avatar(c)),d.append(e.card(c)),d},_getMatchingName:function(a,b){a=a.toLowerCase();for(var c=this.attrs,d=0;d<g.length;d++){var e=c[g[d]]||"",f=e&&e.toLowerCase().indexOf(a);if(b&&0===f||!b&&f!==-1)return e}},getMatchingName:function(a){return!b.isEmpty(a)&&this._getMatchingName(a,!0)||this._getMatchingName(a)}}}),function(a){"use strict";a.call(zmail.Core.Namespaces.create("zmail.ContactBook.Models.Entity"),zmail.Core.Namespaces.get)}(function(a){"use strict";var b=a("_"),c=a("zmail.ContactBook.Templates"),d=a("zmail.ContactBook.Constants.CATEGORY_TYPES"),e=this.Category=function(a){return this instanceof e?void this.init(a):new e(a)};e.prototype={defaults:function(){return{attrs:{cid:void 0,cname:void 0,type:void 0}}},defineProperties:function(){var a=this.attrs;Object.defineProperties(this,{id:{get:function(){return a.cid},enumerable:!1,configurable:!1}})},init:function(a){b.extend(this,this.defaults()),b.extend(this.attrs,a),this.defineProperties()},get:function(a){return this.attrs[a]},isOrg:function(){return this.get("type")===d.ORG},set:function(a,b){return this.attrs[a]=b,this},view:function(a,d){return d=d||{},d=b.extend({name:this.get("cname"),nameLabel:"category"},d),c.card(d)}}}),function(a){"use strict";a.call(zmail.Core.Namespaces.create("zmail.ContactBook.Models.Entity"),zmail.Core.Namespaces.get)}(function(a){"use strict";var b=a("_"),c=a("zmail.ContactBook.Utils"),d=a("zmail.ContactBook.Templates"),e=this.Group=function(a){return this instanceof e?void this.init(a):new e(a)};e.prototype={defaults:function(){return{attrs:{}}},defineProperties:function(){var a,b=this.attrs,d=c.colorClasses(),e=c.initials(this.get("name"));Object.defineProperties(this,{id:{get:function(){return b.id},enumerable:!1,configurable:!1},isValidPhoto:{get:function(){return a},set:function(b){a=b}},initials:{get:function(){return e},set:function(a){e=a}},avatarBgColor:{get:function(){return d}}}),this.photoOnLoad=this.photoOnLoad.bind(this),this.photoOnError=this.photoOnError.bind(this)},init:function(a){b.extend(this,this.defaults()),b.extend(this.attrs,a),this.defineProperties()},get:function(a){return this.attrs[a]},set:function(a,b){return this.attrs[a]=b,"name"===a&&this.setInitials(),this},setInitials:function(){return this.initials=c.initials(this.get("name")),this},photo:function(a){if(a&&!b.isEmpty(this.attrs.photo)){var c=this.attrs.photo,d="?",e="API=true";return c.indexOf("?")!==-1&&(d="&"),c+d+e}return this.attrs.photo},photoOnLoad:function(){this.isValidPhoto=!0},photoOnError:function(){this.isValidPhoto=!1},avatar:function(a){return a=a||{},a=b.extend({isValidPhoto:this.isValidPhoto,onLoad:this.photoOnLoad,onError:this.photoOnError,photo:this.photo(!0),initials:this.initials,avatarBgColor:this.avatarBgColor},a),d.avatar(a)},view:function(a,c){c=c||{},c=b.extend({name:this.get("name"),desc:this.get("eid")},c);var e=$("<div class='zmConWra' />");return e.append(this.avatar(c)),e.append(d.card(c)),e},isEmailEnabled:function(){return!b.isEmpty(this.attrs.eid)}}}),function(a){"use strict";a.call(zmail.Core.Namespaces.create("zmail.ContactBook.Models.Entity.Collection"),zmail.Core.Namespaces.get)}(function(a){"use strict";var b=a("_"),c=a("zmail.Maps.IndexedMap"),d=a("zmail.Maps.DelimitedMap"),e=a("zmail.ContactBook.Models.Entity.Group"),f=this.GroupBook=function(){this.me={},this.idMap={},this.emailMap={},this.names=[],this.nameMap=new d({map:new c,delimitedNames:function(a){var b=a.split(/\s+/);return b.length>1&&b.push(a),b},get:function(a){return this.map.get(a)}})};f.prototype={handleInitialResponse:function(a){var c=a.groups||{};return this.me=a.me&&new e(a.me)||this.me,b.isEmpty(this.me)||(this.me.set("name","Home").setInitials(),this.addGroup(this.me)),this.order=a.order||[],this.order.forEach(function(a){this.addGroup(c[a])},this),this},addGroup:function(a){var b=a instanceof e?a:new e(a),c=b.get("eid"),d=b.get("id");this.idMap[d]=b;var f=b.get("name").toLowerCase();return this.nameMap.add(f,d),this.names.push(f),c&&(this.emailMap[c]=b,this.nameMap.add(c,d)),this},getGroup:function(a){return a instanceof e?a:this.idMap[a]||this.emailMap[a]},removeGroup:function(a){var b=this.getGroup(a);return b&&(delete this.idMap[b.id],delete this.emailMap[b.get("eid")],this.nameMap.remove(b.get("name"),a)),this},addMembers:function(a,c){var d=this.getGroup(a);if(d){b.isArray(c)||(c=[c]);var e=d.get("members");d.set("members",e.concat(c))}return this},removeMembers:function(a,c){var d=this.getGroup(a);if(!d)return this;b.isArray(c)||(c=[c]);var e=d.get("members");c.forEach(function(a){var b=e.indexOf(a);b!==-1&&e.splice(b,1)},this)},addModerator:function(a,c){var d=this.getGroup(a);if(d){b.isArray(c)||(c=[c]);var e=d.get("moderator");d.set("moderator",e.concat(c))}return this},removeModerator:function(a,c){var d=this.getGroup(a);if(!d)return this;b.isArray(c)||(c=[c]);var e=d.get("moderator");c.forEach(function(a){var b=e.indexOf(a);b!==-1&&e.splice(b,1)},this)},changeProps:function(a,b){var c=this.getGroup(a);if(c)for(var d in b)c.set(d,b[d]);return this},getGroupMembers:function(a){b.isArray(a)&&(a=[a]);var c=this;return a.reduce(function(a,b){var d=c.idMap[b];return d?a.concat(d.get("members")):a},[])},getGroups:function(a,c){c=c||{includeAllGroups:!0,includeEmailedGroups:!0};var d=this.idMap,e=this.emailMap,f={},g=[];return c.includeGroupHome||b.isEmpty(this.me)||(f[this.me.id]=1),(a||[]).reduce(function(a,b){if(!(b in f)){f[b]=1;var g=d[b]||e[b];g&&(c.includeAllGroups?a.push(g):c.includeEmailedGroups&&g.isEmailEnabled()&&a.push(d[b]))}return a},g)},has:function(a){return a in this.idMap||a in this.emailMap},get:function(a,c){b.isArray(a)||(a=[a]);var d,e=this.names,f=this;return d=c&&c.containsSearch?f.nameMap.get(a.reduce(function(a,b){return b=b.toLowerCase(),a.concat(e.filter(function(a){return a.indexOf(b)!==-1}))},[])):a.reduce(function(a,b){return f.has(b)?(a.push(b),a):a.concat(f.nameMap.get(b))},[]),this.getGroups(d,c)},getAll:function(a){var b=[];return a&&a.includeGroupHome&&b.push(this.me),b.concat(this.getGroups(this.order,a))}}}),function(a){"use strict";a.call(zmail.Core.Namespaces.create("zmail.ContactBook.Models.Entity.Collection"),zmail.Core.Namespaces.get)}(function(a){"use strict";var b=a("_"),c=a("zmail.Maps.IndexedMap"),d=a("zmail.ContactBook.Models.Entity.Category"),e=this.CategoryBook=function(){this.idMap={},this.nameMap=new c};e.prototype={add:function(a,c){if(c=c||{},!a)return this;b.isArray(a)||(a=[a]);var e=this.idMap,f=this.nameMap,g=c.type;return a.forEach(function(a){a.type=g;var b=new d(a);e[b.id]=b,f.add(b.get("cname"),b.id)}),this},getCategories:function(a){var b=this.idMap;return a.reduce(function(a,c){return a.push(b[c]),a},[])},has:function(a){return a in this.idMap},get:function(a){b.isArray(a)||(a=[a]);var c=this,d=a.reduce(function(a,b){return c.has(b)?(a.push(b),a):a.concat(c.nameMap.get(b))},[]);return this.getCategories(d)},getAll:function(){var a=this.nameMap.getAll();return this.getCategories(a)}}}),function(a){"use strict";a.call(zmail.Core.Namespaces.create("zmail.ContactBook.Models.Entity.Collection"),zmail.Core.Namespaces.get)}(function(a){"use strict";var b=a("_"),c=a("$.Deferred"),d=a("Backbone.ajax"),e=a("zmail.Maps.Map"),f=a("zmail.Maps.IndexedMap"),g=a("zmail.Maps.MapKeeper"),h=a("zmail.ContactBook.Utils"),i=a("zmail.ContactBook.Constants.MODES"),j=a("zmail.ContactBook.Constants.CONTACTS_TYPES"),k=a("zmail.ContactBook.Constants.CATEGORY_TYPES"),l=a("zmail.ContactBook.Models.Entity.Group"),m=a("zmail.ContactBook.Models.Entity.Contact"),n=a("zmail.ContactBook.Models.Entity.Category"),o=a("zmail.ContactBook.Models.Logs.RequestLog"),p=a("zmail.ContactBook.Models.Entity.Collection.GroupBook"),q=a("zmail.ContactBook.Models.Entity.Collection.CategoryBook"),r=["eid","fn","ln","fn_ln","fn_mn_ln","nn","mn","others"],s=["start","offset","contactType"],t=j.PERSONAL,u={ME:"me"},v=this.ContactBook=function(){var a=r.reduce(function(a,b){return b in a||(a[b]=new f),a},{});this.mapKeeper=new g(a),this.mostUsedMap=new e,this.idMap=new e,this.mostUsed=[],this.activeOrgMap={},this.addToActiveOrg=this.addToActiveOrg.bind(this),this.log=new o,this.categories=new q,this.categoryMap=new e,this.groups=new p,this.mostUsedFetched=new c,this.groupsFetched=new c,this.orgContactsFetched=new c,this.includeCRM=void 0};v.prototype={expected:1,url:zmail.conPath+"/getContactsAlias.do",isAdequate:function(a,b){var c=a.length,d=b.expected;return 0!==c&&c>=d},hasPagination:function(a){return!a||a.pagination!==!1},isMostUsedFetched:function(){return"resolved"===this.mostUsedFetched.state()},isGroupsFetched:function(){return"resolved"===this.groupsFetched.state()},isOrgContactsFetched:function(){return"resolved"===this.orgContactsFetched.state()},setDefaultContactType:function(a){return void 0===a.type&&(a.type=t),this},copyContactType:function(a,b){return void 0===a.type&&void 0!==b.type&&(a.type=b.type),this},indexContactObject:function(a){return this.idMap.add(a.id,a),this},indexContactAttrs:function(a){var b=a.toJSON(),c=a.id,d={},e=r.reduce(function(a,e){var f=b[e];return f&&(d[f.toLowerCase()]=1,a[e]={name:f,value:c}),a},{});this.mapKeeper.add(e);var f=this,g=b.fn.split(/\s+/).slice(1);return g.forEach(function(a){a=a.toLowerCase(),!a||a in d||(d[a]=1,f.mapKeeper.add({others:{name:a,value:c}}))}),this},index:function(a){var b=this.getContacts(a.id),c=!1,d=this;return b.forEach(function(b){b.equals(a)||b.isMergeable(a)?(c=!0,b.merge(a),d.copyContactType(b,a)):d.setDefaultContactType(b)}),c||this.indexContactObject(a).indexContactAttrs(a),this},set:function(a,c,d){var e=this;return a?(b.isArray(a)||(a=[a]),c=c||b.noop,a.forEach(function(a){a instanceof m||(a=new m(a),d===!0&&e.setDefaultContactType(a)),this.index(a),c(a)},this),this):this},getSpecialKeyContactIds:function(a){var b=(a.str||"").toLowerCase();return b===u.ME?(a.me=!0,[zmail.zuid]):[]},getIds:function(a){if(a.mode===i.CATEGORY_ID&&(a.eid=this.categoryMap.get(a.categoryid),a.eid.length&&(a.mode=i.EMAIL_ID)),a.mode===i.STREAM_GROUPS)return this.groups.getGroupMembers(a.groupid);if(a.mode===i.ZUID)return a.zuid;var b=this.getSpecialKeyContactIds(a);return b.concat(this.mapKeeper.get(a,r))},getContacts:function(a){return b.isString(a)&&(a=a.split(",")),a=a||[],this.idMap.get(a)},hasContact:function(a){return this.getContacts(a).length>0},has:function(a){if(b.isString(a))return this.hasContact(a);var c=this;return b(a).every(function(a){return c.hasContact(a)})},isContact:function(a){return a instanceof m},isGroup:function(a){return b.isString(a)?this.groups.has(a):a instanceof l},isCategory:function(a){return b.isString(a)?this.categories.has(a):a instanceof n},sort:function(a,b){var c=a.name.toUpperCase(),d=b.name.toUpperCase();return c<d?-1:c>d?1:0},filter:function(a,c){var d=c.type.reduce(function(a,b){return a[b]=!0,a},{}),e=c.str,f=c.me,g=this,h={},j={},k=function(a){return void 0===a||!(a in h)},l=function(a,c){c=c||h,void 0!==a&&(b.isArray(a)?a.forEach(function(a){void 0!==a&&(c[a]=1)}):c[a]=1)};c.excludeMe&&(l(zmail.zuid,j),this.getContacts(zmail.zuid).forEach(function(a){l(a.get("eid"),j)})),l(c.exclude,j);var m=c.excludeGroups;if(a=a.filter(function(a){var b=a.get("eid"),h=a.id,i=(b||"")+(h||"");return!(b in j||h in j)&&(m&&(g.groups.has(h)||g.groups.has(b))?(l(h),!1):!!k(i)&&(g.isContact(a)?!(c.includeOnlyPrimary&&!a.isPrimary())&&(!(!(a.type in d)||!f&&e&&!a.getMatchingName(e))&&(l(i),!0)):(l(i),!0)))}),c.mode===i.EMAIL_ID){var n=c.eid.reduce(function(a,b){return a[b]=1,a},{});a=a.filter(function(a){return a.get("eid")in n})}return void 0===c.offset&&c.offset>0&&(a=a.slice(c.offset,a.length)),c.sliceExpected&&(a=a.slice(0,c.expected)),a},sortResults:function(a,c){if(c.str){var d=0;a.forEach(function(a){a.attrs.usageRank&&d++});var e=a.splice(d,a.length-d);if(e.length){var f=[];if(c.prioritizeAllGroupMembers&&(f=zmail.ContactBook.getGroups().map(function(a){return a.id})),c.prioritizeGroupMembers)if(c.prioritizeGroupMembers.constructor!==Array&&(c.prioritizeGroupMembers=[c.prioritizeGroupMembers]),c.prioritizeAllGroupMembers){var g=f;f=c.prioritizeGroupMembers,f=f.concat(b.difference(g,f))}else f=c.prioritizeGroupMembers;f.length&&f.forEach(function(c){c=String(c);var d=zmail.ContactBook.getGroups(c)[0];if(d){var f=d.attrs.members||[],g=Object.keys(e.reduce(function(a,b){return b.attrs.zid&&(a[b.attrs.zid]=!0),a},{})),h=b.intersection(f,g),i=[];h.forEach(function(a){e.forEach(function(b,c){b.attrs.zid===a&&(b=e.splice(c,1),i.push(b[0]))})}),a=a.concat(i)}})}e.length&&c.prioritizeOrgMembers&&(e.forEach(function(a,b){if(a.attrs.zid){var c=void 0!==zmail.ContactBook.get({zuid:a.attrs.zid,type:["org"],promise:!1})[0];c&&(a=e.splice(b,1)[0],e.unshift(a))}}),a=a.concat(e)),e.length&&(a=a.concat(e))}return a},retrieveContacts:function(a){var b=this.getIds(a),c=[];return c=c.concat(this.mostUsedMap.get(b)),c=c.concat(this.getContacts(b)),a.str&&!a.excludeGroups&&a.includeGroupHome&&(c=c.concat(this.groups.me)),a.str&&!a.excludeGroups&&(a.includeAllGroups||a.includeEmailedGroups)&&(c=c.concat(this.groups.get(a.str,a))),a.str&&a.includeCategories&&(c=c.concat(this.categories.get(a.str))),c=this.filter(c,a),c=this.sortResults(c,a)},updateGroupsLog:function(){var a=this;this.groups.getAll().forEach(function(b){a.log.add({ids:b.id,pagination:!a.has(b.members)})})},getLogHash:function(a){var b={str:a.str||a.eid&&a.eid.join(",")||a.fn||a.mn||a.ln||a.nn||"",ids:a.zuid&&a.zuid.join(",")||a.categoryid&&a.categoryid.join(",")||a.groupid&&a.groupid.join(",")||"",typ:a.type||""},c=this.log.get(b),d=c&&c.str!==a.str,e=a.type.indexOf("crm")!==-1;return d&&e&&c.str&&c.str.length<3&&(c=null),c?c:(b.hash=this.log.hash(b),b)},parseQuery:function(a){var c=b.isString(a)?{str:a,expected:this.expected,eid:h.isEmailID(a)?a:void 0,groupid:this.groups.has(a)?a:void 0,categoryid:this.categories.has(a)?a:void 0}:a;c.str&&r.reduce(function(a,b){return a[b]||(a[b]=a.str),a},c);var d;if(void 0===c.expected&&(c.expected=this.expected),void 0===c.type?c.type=[j.PERSONAL,j.ZOHO_ORG]:c.type=b.isArray(c.type)?c.type:[c.type],b.isArray(c.eid)||h.isEmailID(c.eid||c.str)){var e=c.eid||c.str;c.eid=b.isArray(e)?e:[e],c.mode=i.EMAIL_ID,d=c.eid.length,c.expected=c.expected<d?d:c.expected}else if(b.isArray(c.categoryid)||this.categories.has(c.categoryid||c.str)){var f=c.categoryid||c.str;c.categoryid=b.isArray(f)?f:[f],c.mode=i.CATEGORY_ID}else if(b.isArray(c.groupid)||this.groups.has(c.groupid||c.str)){var g=c.groupid||c.str;c.groupid=b.isArray(g)?g:[g],c.mode=i.STREAM_GROUPS}else if(c.zuid){var k=c.zuid;c.zuid=b.isArray(k)?k:[k],c.mode=i.ZUID,d=c.zuid.length,c.expected=c.expected<d?d:c.expected}else c.mode=i.SEARCH;return c},request:function(a){var c=a.mode;if(c===i.MOST_USED&&!this.isMostUsedFetched()||c===i.STREAM_GROUPS&&!this.isGroupsFetched()||c===i.ORG_MEMBERS&&!this.isOrgContactsFetched())return{mode:c};if(c===i.ZUID)return{mode:c,zuids:b.isArray(a.zuid)?a.zuid.join(","):a.zuid};if(c===i.EMAIL_ID)return{mode:c,email:b.isArray(a.eid)?a.eid.join(","):a.eid};if(c===i.CATEGORY_ID)return{mode:c,cId:b.isArray(a.categoryid)?a.categoryid.join(","):a.categoryid};if(c===i.STREAM_GROUP_MEMBERS)return{mode:i.STREAM_GROUP_MEMBERS,groupid:b.isArray(a.groupid)?a.groupid.join(","):a.groupid};if(c===i.SEARCH){var d={mode:i.SEARCH,query:a.str||a.eid||a.fn||a.mn||a.ln||a.nn};return this.includeCRM!==!1&&a.type.indexOf("crm")!==-1&&zmail.isCRMServiceUser===!0&&(d.includeCRM=!0),s.reduce(function(b,c){return c in a&&(b[c]=a[c]),b},d)}return c===i.IS_ORG?{mode:i.IS_ORG,email:b.isArray(a.eid)?a.eid.join(","):a.eid}:void 0},responseHandler:function(c,d,e){var f,g,h,l,n=c.mode,o=this;if(n===i.ZUID||n===i.EMAIL_ID)e.pagination=!1,this.set(d.clist[n],this.addToActiveOrg);else if(n===i.STREAM_GROUP_MEMBERS)this.set(d.clist[i.ZUID],this.addToActiveOrg);else if(n===i.STREAM_GROUPS){if(_zm.isAllUnreadEnabled()){for(var p=d.me.scount,q=b.values(d.groups),r=0,s=q.length;r<s;r++)p+=q[r].scount;d.me.scount=p}this.groups.handleInitialResponse(d),this.groupsFetched.resolve()}else if(n===i.MOST_USED)h=d.clist&&d.clist.CONTACTS_USAGE_ORDER||[],h=b.isArray(h)?h:[h],g=function(a){o.mostUsed.push(a),o.mostUsedMap.add(a.id,a)},h.forEach(function(a,b){a.usageRank=b+1,o.set(a,g,!0)}),this.categories.add(d.catlist,{type:k.PERSONAL}),this.categories.add(d.orgcatlist,{type:k.ORG}),this.mostUsedFetched.resolve();else if(n===i.ORG_MEMBERS){h=d.zlist;var t=this.activeOrgMap,u=[];for(l in h){var v=h[l],w=new m(v);w.zoid=a("zmail.zoid"),w.type=j.ZOHO_ORG,t[w.get("zid")]=!0,t[w.get("eid")]=!0,u.push(w)}u.sort(this.sort),this.set(u),this.orgContactsFetched.resolve(),this.addToActiveOrg(this.mostUsed)}else if(n===i.SEARCH){h=d.clist;for(l in h)this.set(h[l],this.addToActiveOrg,!0);(d.crm||[]).forEach(function(a){a&&(a=new m(a),a.type=j.CRM,this.set(a))},this),c.type.indexOf("crm")!==-1&&c.str&&c.str.length>2&&(e.crmFetched=!0,void 0===o.includeCRM&&d.hasOwnProperty("crm")&&!d.crm.hasOwnProperty("Error")&&(o.includeCRM=!0))}else if(n===i.CATEGORY_ID){h=d.clist.concat(d.orgClist);var x,y=c.categoryid;f=function(a){var b=new m(a);o.set(b,o.addToActiveOrg),o.categoryMap.add(x,b.get("eid"))};for(l in h){x=y[l];var z=h[l][x]||[];z=b.isArray(z)?z:[z],z.forEach(f)}this.log.add({ids:c.categoryid,pagination:!1})}this.updateGroupsLog()},addToActiveOrg:function(a){b.isArray(a)||(a=[a]);var c=this.activeOrgMap;return a.forEach(function(a){a.get("zid")in c?c[a.get("eid")]=!0:c[a.get("eid")]=!1}),this},_isActiveOrg:function(a){var c,d=this.activeOrgMap,e=[];a=b.isArray(a)?a:[a];for(var f=0;f<a.length;f++){var g=a[f];if(g in d){if(c=d[g],c===!1)break}else e.push(g)}return{all:c,eid:e}},isActiveOrg:function(a){var b=c(),d=this,e=d._isActiveOrg(a);if(e.all===!1||e.all===!0&&0===e.eid.length)return b.resolve(e.all).promise();var f={eid:e.eid};return this.get(f).then(function(c){e=d._isActiveOrg(a),e=e===!1?e:0===e.eid.length,b.resolve(e)},b.reject),b.promise()},fetch:function(a){var b=c(),e=this.request(a);return e?d({data:e,url:this.url,type:"get"}).then(function(a){var c=1===a[0]?"resolve":"reject";b[c](a[1])},function(a){b.reject({networkError:0===a.readyState})}):b.reject(),b.promise()},fetchGroups:b.once(function(){var a={mode:i.STREAM_GROUPS},b=this,c=$.Deferred();return b.fetch(a).then(function(b){c.resolve(a,b)},function(){b.groupsFetched.reject(),c.reject()}),c.promise()}),processGroupsResponse:b.once(function(a,b){var c=this;c.responseHandler(a,b)}),fetchMostUsed:b.once(function(){var a={mode:i.MOST_USED},b=this,c=$.Deferred();return b.fetch(a).then(function(b){c.resolve(a,b)},function(){b.mostUsedFetched.reject(),c.reject()}),c.promise()}),processMostUsedResponse:b.once(function(a,b){var c=this;c.responseHandler(a,b)}),fetchOrgContacts:b.once(function(){var a={mode:i.ORG_MEMBERS},b=this,c=$.Deferred();return zmail.isOrg?(b.fetch(a).then(function(b){c.resolve(a,b)},function(){b.orgContactsFetched.reject(),c.reject()}),c.promise()):(b.orgContactsFetched.resolve(),c.resolve().promise())}),processOrgContactsResponse:b.once(function(a,b){var c=this;c.responseHandler(a,b)}),getCategories:function(a){return a?this.categories.get(a):this.categories.getAll()},getGroups:function(a,c){return void 0===a||b.isString(a)||void 0!==c||(c=a,a=void 0),a?this.groups.get(a,c):this.groups.getAll(c)},getActiveOrg:function(a){a=a||{},a=this.parseQuery(b.extend(a,{str:"",type:j.ZOHO_ORG}));var c=this.getContacts(this.mapKeeper.getAll(r));return c=this.filter(c,a),a.sort?c.sort(this.sort):c},getMostUsedContacts:function(a){if(!b.isEmpty(a)){var c=this.parseQuery(a),d=this.getIds(c);return this.mostUsedMap.get(d)}return this.mostUsed.slice()},get:function(a){var d=this;if(!b.isEmpty(a)){var e=this.parseQuery(a),f=this.retrieveContacts(e);if(e.promise===!1)return f;if(this.isAdequate(f,e))return c().resolve(f).promise();var g,h=this.getLogHash(e);if(h.deferred)return g=c(),h.deferred.then(function(){f=d.retrieveContacts(e),g.resolve(f)},g.reject),g.promise();var i=!1;return zmail.isCRMServiceUser&&e.type.indexOf("crm")!==-1&&e.str&&e.str.length>2&&h.crmFetched!==!0&&(i=!0),this.hasPagination(h)===!0||i?(g=h.deferred=c(),this.log.add(h),this.fetch(e).then(function(a){h.pagination=a.pagination,delete h.deferred,d.responseHandler(e,a,h),f=d.retrieveContacts(e),g.resolve(f)},function(a){a.networkError&&delete d.log.logs[h.hash],g.reject()}),g.promise()):c().resolve(f).promise()}}}}),function(a){"use strict";a.call(zmail.Core.Namespaces.create("zmail.ContactBook"),zmail.Core.Namespaces.get)}(function(a){"use strict";var b=a("_"),c=a("$.Deferred"),d=a("zmail.ContactBook.Constants.EVENTS"),e=a("zmail.ContactBook.Models.Entity.Collection.ContactBook"),f=a("$.subscribe");delete this.__namespace;var g=this,h=new e;["get","getActiveOrg","getContacts","getCategories","getGroups","getMostUsedContacts","fetchGroups","fetchMostUsed","fetchOrgContacts","isGroupsFetched","isMostUsedFetched","isOrgContactsFetched","isContact","isGroup","isCategory","set","isOrg","isActiveOrg","mostUsedFetched","groupsFetched","orgContactsFetched","groups","categories"].forEach(function(a){var c=h[a];c&&(b.isFunction(c)?g[a]=c.bind(h):g[a]=c)});var i=g.groups;f(d.GROUP_ADDED,function(a,b){i.addGroup(b.group)}),f(d.GROUP_REMOVED,function(a,b){i.removeGroup(b.id)}),f(d.GROUP_CHANGED,function(a,b){i.changeProps(b.id,b.props)}),f(d.GROUP_MEMBERS_ADDED,function(a,b){i.addMembers(b.id,b.members)}),f(d.GROUP_MEMBERS_REMOVED,function(a,b){i.removeMembers(b.id,b.members)}),f(d.GROUP_MODERATORS_ADDED,function(a,b){i.addModerator(b.id,b.moderators)}),f(d.GROUP_MODERATORS_REMOVED,function(a,b){i.removeModerator(b.id,b.moderators)}),g.fetchProcess=new c,this.initialize=function(){var a=g.fetchGroups(),b=g.fetchMostUsed(),c=g.fetchOrgContacts(),d=function(){a.always(function(a,d){a&&d&&h.processGroupsResponse(a,d),b.always(function(a,b){a&&b&&h.processMostUsedResponse(a,b),c.always(function(a,b){a&&b&&h.processOrgContactsResponse(a,b),g.fetchProcess.resolve()})})})};return $.when(a,b,c).always(d),g.fetchProcess.promise()}});