// imported from cc_framework
/**
 * 
 * Copyright 2007
 * 
 * Paulius Uza
 * http://www.uza.lt
 * 
 * Dan Florio
 * http://www.polygeek.com
 * 
 * Project website:
 * http://code.google.com/p/custom-context-menu/
 * 
 * --
 * RightClick for Flash Player. 
 * Version 0.6.2
 * Modified for MooTools
 * 
 */

var RightClick = new Class({
	
	Implements: [Events],
	
	FlashObjectID: null,
	FlashObject: null,
	FlashContainer: null,
	Cache: null,
	Callback: null,
	CallbackParams: null,
	
	log: function(data)
	{
		try
		{
			if(cc && cc.log) cc.log('RightClick: '+data);
		} catch(e){}
	},
	
	/**
	 *	Constructor
	 */ 
	initialize: function(options)
	{
		this.log('initialize');
		this.FlashObjectID = options.objectid;
		this.FlashContainerID = options.containerid;
		this.Cache = this.FlashObjectID;
		this.Callback = options.callback;
		if(options.callbackparams) this.CallbackParams = options.callbackparams;
		
		if(window.addEventListener)
		{
			this.log('Bind for gecko/webkit');
			//window.addEvent('mousedown', this.onGeckoMouse.bind(this));
			//window.addEvent('mousedown', this.bindGeckoMouse());
			window.addEventListener('mousedown', this.bindGeckoMouse(), true);
		}
		else
		{
			this.log('Bind for IE');
			$(this.FlashContainerID).onmouseup = function() { $(this.FlashContainerID).releaseCapture(); }
			document.oncontextmenu = function(){ if(window.event.srcElement.id == this.FlashObjectID) { return false; } else { this.Cache = "nan"; }}
			$(this.FlashContainerID).onmousedown = this.onIEMouse;
		}
	},
	
	/**
	 * GECKO / WEBKIT event overkill
	 * @param {Object} eventObject
	 */
	killEvents: function(eventObject)
	{
		this.log('killEvents');
		if(eventObject)
		{
			//eventObject = new Event(eventObject);
			eventObject.stopPropagation();
			eventObject.preventDefault();
			if(eventObject.preventCapture) eventObject.preventCapture();
		 	if(eventObject.preventBubble) eventObject.preventBubble();
		}
	},
	/**
	 * GECKO / WEBKIT call right click
	 * @param {Object} ev
	 */
	bindGeckoMouse: function(ev)
	{
		this.log('bindGeckoMouse');
		return function(ev)
		{
			this.log('onGeckoMouse');
			if(ev.button != 0)
			{
				this.killEvents(ev);
				if(ev.target.id == this.FlashObjectID && this.Cache == this.FlashObjectID)
				{
					this.call();
				}
				this.Cache = ev.target.id;
			}
		}.bind(this)
	},
	/**
	 * IE call right click
	 * @param {Object} ev
	 */
	onIEMouse: function()
	{
		this.log('onIEMouse');
		if(event.button > 1)
		{
			if(window.event.srcElement.id == this.FlashObjectID && this.Cache == this.FlashObjectID)
			{
				this.call(); 
			}
			$(this.FlashContainerID).setCapture();
			if(window.event.srcElement.id)
			{
				this.Cache = window.event.srcElement.id;
			}
		}
	},
	/**
	 * Main call to Flash External Interface
	 */
	call: function()
	{
		this.log('call');
		try
		{
			Swiff.remote($(this.FlashObjectID),this.callback,this.callbackParams);
		} catch(e){}
	}
});
var g=this,p=function(a,b){var c=a.split("."),d=g;c[0]in d||!d.execScript||d.execScript("var "+c[0]);for(var e;c.length&&(e=c.shift());)c.length||void 0===b?d=d[e]?d[e]:d[e]={}:d[e]=b},q=function(a,b){function c(){}c.prototype=b.prototype;a.o=b.prototype;a.prototype=new c;a.m=function(a,c,f){for(var n=Array(arguments.length-2),k=2;k<arguments.length;k++)n[k-2]=arguments[k];return b.prototype[c].apply(a,n)}};var r=function(a){if(Error.captureStackTrace)Error.captureStackTrace(this,r);else{var b=Error().stack;b&&(this.stack=b)}a&&(this.message=String(a))};q(r,Error);var aa=function(a,b){for(var c=a.split("%s"),d="",e=Array.prototype.slice.call(arguments,1);e.length&&1<c.length;)d+=c.shift()+e.shift();return d+c.join("%s")},t=String.prototype.trim?function(a){return a.trim()}:function(a){return a.replace(/^[\s\xa0]+|[\s\xa0]+$/g,"")},u=function(a,b){return a<b?-1:a>b?1:0};var w=function(a,b){b.unshift(a);r.call(this,aa.apply(null,b));b.shift()};q(w,r);var x=function(a,b,c){if(!a){var d="Assertion failed";if(b)var d=d+(": "+b),e=Array.prototype.slice.call(arguments,2);throw new w(""+d,e||[]);}};var ba=Array.prototype.forEach?function(a,b,c){x(null!=a.length);Array.prototype.forEach.call(a,b,c)}:function(a,b,c){for(var d=a.length,e="string"==typeof a?a.split(""):a,f=0;f<d;f++)f in e&&b.call(c,e[f],f,a)};var y;a:{var z=g.navigator;if(z){var A=z.userAgent;if(A){y=A;break a}}y=""}var B=function(a){return-1!=y.indexOf(a)};var ca=B("Opera"),C=B("Trident")||B("MSIE"),da=B("Edge"),D=B("Gecko")&&!(-1!=y.toLowerCase().indexOf("webkit")&&!B("Edge"))&&!(B("Trident")||B("MSIE"))&&!B("Edge"),E=-1!=y.toLowerCase().indexOf("webkit")&&!B("Edge"),ea=E&&B("Mobile"),F=function(){var a=g.document;return a?a.documentMode:void 0},G;
a:{var H="",I=function(){var a=y;if(D)return/rv\:([^\);]+)(\)|;)/.exec(a);if(da)return/Edge\/([\d\.]+)/.exec(a);if(C)return/\b(?:MSIE|rv)[: ]([^\);]+)(\)|;)/.exec(a);if(E)return/WebKit\/(\S+)/.exec(a);if(ca)return/(?:Version)[ \/]?(\S+)/.exec(a)}();I&&(H=I?I[1]:"");if(C){var J=F();if(null!=J&&J>parseFloat(H)){G=String(J);break a}}G=H}
var K=G,L={},M=function(a){if(!L[a]){for(var b=0,c=t(String(K)).split("."),d=t(String(a)).split("."),e=Math.max(c.length,d.length),f=0;0==b&&f<e;f++){var n=c[f]||"",k=d[f]||"",h=RegExp("(\\d*)(\\D*)","g"),l=RegExp("(\\d*)(\\D*)","g");do{var m=h.exec(n)||["","",""],v=l.exec(k)||["","",""];if(0==m[0].length&&0==v[0].length)break;b=u(0==m[1].length?0:parseInt(m[1],10),0==v[1].length?0:parseInt(v[1],10))||u(0==m[2].length,0==v[2].length)||u(m[2],v[2])}while(0==b)}L[a]=0<=b}},N=g.document,fa=N&&C?F()||
("CSS1Compat"==N.compatMode?parseInt(K,10):5):void 0;var O;if(!(O=!D&&!C)){var P;if(P=C)P=9<=Number(fa);O=P}O||D&&M("1.9.1");C&&M("9");var ga=B("Safari")&&!((B("Chrome")||B("CriOS"))&&!B("Edge")||B("Coast")||B("Opera")||B("Edge")||B("Silk")||B("Android"))&&!(B("iPhone")&&!B("iPod")&&!B("iPad")||B("iPad")||B("iPod"));var R=function(a){var b=window;if(ea&&ga&&b){b.focus();var c=0,d=null,d=b.setInterval(function(){a.closed||5==c?(b.clearInterval(d),Q(a)):(a.close(),c++)},150)}else a.close(),Q(a)},Q=function(a){if(!a.closed&&a.document&&a.document.body)if(a=a.document.body,x(null!=a,"goog.dom.setTextContent expects a non-null value for node"),"textContent"in a)a.textContent="Please close this window.";else if(3==a.nodeType)a.data="Please close this window.";else if(a.firstChild&&3==a.firstChild.nodeType){for(;a.lastChild!=
a.firstChild;)a.removeChild(a.lastChild);a.firstChild.data="Please close this window."}else{for(var b;b=a.firstChild;)a.removeChild(b);x(a,"Node cannot be null or undefined.");a.appendChild((9==a.nodeType?a:a.ownerDocument||a.document).createTextNode("Please close this window."))}};var ha=function(a){if(!a)return"";a=a.split("#")[0].split("?")[0];a=a.toLowerCase();0==a.indexOf("//")&&(a=window.location.protocol+a);/^[\w\-]*:\/\//.test(a)||(a=window.location.href);var b=a.substring(a.indexOf("://")+3),c=b.indexOf("/");-1!=c&&(b=b.substring(0,c));a=a.substring(0,a.indexOf("://"));if("http"!==a&&"https"!==a&&"chrome-extension"!==a&&"file"!==a&&"android-app"!==a)throw Error("Invalid URI scheme in origin");var c="",d=b.indexOf(":");if(-1!=d){var e=b.substring(d+1),b=b.substring(0,
d);if("http"===a&&"80"!==e||"https"===a&&"443"!==e)c=":"+e}return a+"://"+b+c};var ia=function(){function a(){e[0]=1732584193;e[1]=4023233417;e[2]=2562383102;e[3]=271733878;e[4]=3285377520;m=l=0}function b(a){for(var b=n,c=0;64>c;c+=4)b[c/4]=a[c]<<24|a[c+1]<<16|a[c+2]<<8|a[c+3];for(c=16;80>c;c++)a=b[c-3]^b[c-8]^b[c-14]^b[c-16],b[c]=(a<<1|a>>>31)&4294967295;a=e[0];for(var d=e[1],f=e[2],k=e[3],m=e[4],l,h,c=0;80>c;c++)40>c?20>c?(l=k^d&(f^k),h=1518500249):(l=d^f^k,h=1859775393):60>c?(l=d&f|k&(d|f),h=2400959708):(l=d^f^k,h=3395469782),l=((a<<5|a>>>27)&4294967295)+l+m+h+b[c]&4294967295,
m=k,k=f,f=(d<<30|d>>>2)&4294967295,d=a,a=l;e[0]=e[0]+a&4294967295;e[1]=e[1]+d&4294967295;e[2]=e[2]+f&4294967295;e[3]=e[3]+k&4294967295;e[4]=e[4]+m&4294967295}function c(a,c){if("string"===typeof a){a=unescape(encodeURIComponent(a));for(var e=[],d=0,k=a.length;d<k;++d)e.push(a.charCodeAt(d));a=e}c||(c=a.length);e=0;if(0==l)for(;e+64<c;)b(a.slice(e,e+64)),e+=64,m+=64;for(;e<c;)if(f[l++]=a[e++],m++,64==l)for(l=0,b(f);e+64<c;)b(a.slice(e,e+64)),e+=64,m+=64}function d(){var a=[],d=8*m;56>l?c(k,56-l):c(k,
64-(l-56));for(var h=63;56<=h;h--)f[h]=d&255,d>>>=8;b(f);for(h=d=0;5>h;h++)for(var n=24;0<=n;n-=8)a[d++]=e[h]>>n&255;return a}for(var e=[],f=[],n=[],k=[128],h=1;64>h;++h)k[h]=0;var l,m;a();return{reset:a,update:c,digest:d,digestString:function(){for(var a=d(),c="",b=0;b<a.length;b++)c+="0123456789ABCDEF".charAt(Math.floor(a[b]/16))+"0123456789ABCDEF".charAt(a[b]%16);return c}}};var ka=function(a,b,c){var d=[],d=[b,a];ba(c,function(a){d.push(a)});return ja(d.join(" "))},ja=function(a){var b=ia();b.update(a);return b.digestString().toLowerCase()};var la=function(a){var b=a||[];a=[];for(var c=0,d=b.length;c<d;++c){var e=String(b[c]||"");e&&a.push(e)}if(2>a.length)return null;b=a[0];c=gadgets.rpc.getOrigin(a[1]);if(c!==a[1])return null;a=a.slice(2);return(a=(c&&b?["session_state",ka(ha(c),b,a||[])].join(" "):null)||"")&&a.substr(14)||null},ma=function(a,b,c){this.i=String(a||"");this.f=String(b||"");this.a=String(c||"");this.b={};this.j=this.l=this.g=this.h="";this.c=null};
ma.prototype.evaluate=function(){var a={},b="";try{b=String(document.cookie||"")}catch(n){}for(var b=b.split("; ").join(";").split(";"),c=0,d=b.length;c<d;++c){var e=b[c],f=e.indexOf("=");-1!=f?a[e.substr(0,f)]=e.substr(f+1):a[e]=null}this.b=a;if(this.b.SID)if(this.f=this.f.split(".")[0].split("@")[0],this.g=String(this.b[0==this.i.indexOf("https://")?"SAPISID":"APISID"]||""))if(a=0==gadgets.rpc.getOrigin(String(window.location.href)).indexOf("https://")?"SAPISID":"APISID",this.h=String(this.b[a]||
"")){b=String(this.b.LSOLH||"").split(":");c=b.length;if(1==c||4==c)this.l=b[0];if(3==c||4==c)a=String(b[c-3]||""),b=String(b[c-1]||""),c=this.h,a?(d=[a],c&&d.push(c),c=ja(d.join(" ")).substr(0,4)):c=null,c===b&&(this.j=a);this.a&&(a=this.a.indexOf("."),-1!=a&&(a=this.a.substr(0,a)||"",this.a=a+"."+la([this.g,this.i,this.f,this.l,this.j,a]).substr(0,4)));a=la([this.g,this.i,this.f,this.a]);this.a&&(a=a+"."+this.a);this.c=a}else this.c="";else this.c=""};
var na=function(a,b,c){a=new ma(a,b,c);a.evaluate();return a},S=function(a,b,c){c=c||oa(this);var d=null;if(a){a=String(a);var e=a.indexOf(".");-1!=e&&(d=a.substr(e+1))}b=na(c,b,d).c;if(null==a||""==a)a=b==a;else if(null==b||b.length!=a.length)a=!1;else{d=c=0;for(e=a.length;d<e;++d)c|=a.charCodeAt(d)^b.charCodeAt(d);a=0==c}return a},T=function(a,b,c){c=c||oa(this);c=na(c);if(String(a)!=c.c)throw Error("Unauthorized request");b=String(b);a=parseInt(b,10);String(a)==b&&0<=a?(b=c.j)?(b=b.split("|"),
a=b.length<=a?null:b[a]||null):a=null:a=null;return a},oa=function(a){a=String(a.origin||"");if(!a)throw Error("RPC has no origin.");return a};p("checkSessionState",S);p("getVersionInfo",T);var U,V,W,X,Y,Z,pa=window,qa=(window.location.href||pa.location.href).match(/.*(\?|#|&)usegapi=([^&#]+)/)||[];
"1"===decodeURIComponent(qa[qa.length-1]||"")?(W=function(a,b,c,d,e,f){U.send(b,e,d,f||gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER)},X=function(a,b){U.register(a,b,gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER)},Y=function(a){var b=/^(?:https?:\/\/)?[0-9.\-A-Za-z]+(?::\d+)?/.exec(a),b=gapi.iframes.makeWhiteListIframesFilter([b?b[0]:null]);W("..","oauth2callback",gadgets.rpc.getAuthToken(".."),void 0,a,b)},V=function(){ra()},Z=function(){W("..","oauth2relayReady",gadgets.rpc.getAuthToken(".."));X("check_session_state",
sa);X("get_versioninfo",ta)}):(W=function(a,b,c,d,e){gadgets.rpc.call(a,b+":"+c,d,e)},X=function(a,b){gadgets.rpc.register(a,b)},Y=function(a){gadgets.rpc.getTargetOrigin("..")==gadgets.rpc.getOrigin(a)&&W("..","oauth2callback",gadgets.rpc.getAuthToken(".."),void 0,a)},V=function(){Z()},Z=function(){W("..","oauth2relayReady",gadgets.rpc.getAuthToken(".."));X("check_session_state",S);X("get_versioninfo",T)});
var ra=function(){var a=Z;window.gapi.load("gapi.iframes",function(){U=gapi.iframes.getContext().getParentIframe();a()})},ua=function(a){window.setTimeout(function(){Y(a)},1)},sa=function(a){var b,c;a&&(b=a.session_state,c=a.client_id);return S(b,c,U.getOrigin())},ta=function(a){return T(a.xapisidHash,a.sessionIndex,U.getOrigin())},va=!1,wa=!1,xa=function(){wa=!0;va&&V()};p("oauth2callback",ua);
p("oauth2verify",function(a,b){var c=window.open("javascript:void(0);",a),d;if(c&&!c.closed&&(d=c.oauth2callbackUrl))return window.timeoutMap=window.timeoutMap||{},window.realSetTimeout=window.realSetTimeout||window.setTimeout,window.setTimeout=function(a,b){try{var d=a,k=!1,h;a=function(){if(!k){k=!0;try{window.timeoutMap[String(h)]=void 0,delete window.timeoutMap[String(h)]}catch(a){}return d.call(this)}};var l=c.setTimeout(a,b);h=window.realSetTimeout(a,b);window.timeoutMap[String(h)]=l;return h}catch(m){}return window.realSetTimeout(a,
b)},window.realClearTimeout=window.realClearTimeout||window.clearTimeout,window.clearTimeout=function(a){try{var b=window.timeoutMap[String(a)];b&&c.clearTimeout(b)}catch(d){}try{window.timeoutMap[String(a)]=void 0,delete window.timeoutMap[String(a)]}catch(d){}window.realClearTimeout(a)},ua(String(d)),"keep_open"!=b&&R(c),!0;c&&!c.closed&&R(c);return!1});p("init",function(){va=!0;wa&&V()});window.addEventListener?window.addEventListener("load",xa,!1):window.attachEvent("onload",xa);
