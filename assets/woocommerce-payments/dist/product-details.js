(()=>{var e={};e.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"==typeof window)return window}}(),(()=>{var t;e.g.importScripts&&(t=e.g.location+"");var r=e.g.document;if(!t&&r&&(r.currentScript&&(t=r.currentScript.src),!t)){var o=r.getElementsByTagName("script");if(o.length)for(var n=o.length-1;n>-1&&(!t||!/^http(s?):/.test(t));)t=o[n--].src}if(!t)throw new Error("Automatic publicPath is not supported in this browser");t=t.replace(/#.*$/,"").replace(/\?.*$/,"").replace(/\/[^\/]+$/,"/"),e.p=t})(),e.p=window.wcpayAssets.url,(()=>{"use strict";const e=e=>"undefined"!=typeof wcpayConfig?wcpayConfig[e]:t(e),t=e=>{let t=null;if("undefined"!=typeof wcpay_upe_config)t=wcpay_upe_config;else{if("object"!=typeof wc||void 0===wc.wcSettings)return null;t=wc.wcSettings.getSetting("woocommerce_payments_data")||{}}return t[e]||null},r=e=>"object"==typeof wcpayExpressCheckoutParams&&wcpayExpressCheckoutParams.hasOwnProperty(e)?wcpayExpressCheckoutParams[e]:"object"==typeof wcpayPaymentRequestParams&&wcpayPaymentRequestParams.hasOwnProperty(e)?wcpayPaymentRequestParams[e]:null,o=e=>r("wc_ajax_url").toString().replace("%%endpoint%%","wcpay_"+e),n=e=>r(e),a=e=>o(e),i=(e,t,r="wcpay_")=>e.toString().replace("%%endpoint%%",r+t),c=["color","padding","paddingTop","paddingRight","paddingBottom","paddingLeft"],s=["fontFamily","fontSize","lineHeight","letterSpacing","fontWeight","fontVariation","textDecoration","textShadow","textTransform","-webkit-font-smoothing","-moz-osx-font-smoothing","transition"],l=["backgroundColor","border","borderTop","borderRight","borderBottom","borderLeft","borderRadius","borderWidth","borderColor","borderStyle","borderTopWidth","borderTopColor","borderTopStyle","borderRightWidth","borderRightColor","borderRightStyle","borderBottomWidth","borderBottomColor","borderBottomStyle","borderLeftWidth","borderLeftColor","borderLeftStyle","borderTopLeftRadius","borderTopRightRadius","borderBottomRightRadius","borderBottomLeftRadius","outline","outlineOffset","boxShadow"],u={".Label":[...c,...s],".Input":[...c,...s,...l],".Error":[...c,...s,...l],".Tab":[...c,...s,...l],".TabIcon":[...c],".TabLabel":[...c,...s],".Block":[...c.slice(1),...l.slice(1)],".Container":[...l]},d={".Label":u[".Label"],".Label--floating":[...u[".Label"],"transform"],".Input":[...u[".Input"],"outlineColor","outlineWidth","outlineStyle"],".Error":u[".Error"],".Tab":["backgroundColor","color","fontFamily"],".Tab--selected":["outlineColor","outlineWidth","outlineStyle","backgroundColor","color",l],".TabIcon":u[".TabIcon"],".TabIcon--selected":["color"],".TabLabel":u[".TabLabel"],".Block":u[".Block"],".Container":u[".Container"]};function h(e){return h="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},h(e)}var p=/^\s+/,f=/\s+$/;function m(e,t){if(t=t||{},(e=e||"")instanceof m)return e;if(!(this instanceof m))return new m(e,t);var r=function(e){var t,r,o,n={r:0,g:0,b:0},a=1,i=null,c=null,s=null,l=!1,u=!1;return"string"==typeof e&&(e=function(e){e=e.replace(p,"").replace(f,"").toLowerCase();var t,r=!1;if(R[e])e=R[e],r=!0;else if("transparent"==e)return{r:0,g:0,b:0,a:0,format:"name"};return(t=D.rgb.exec(e))?{r:t[1],g:t[2],b:t[3]}:(t=D.rgba.exec(e))?{r:t[1],g:t[2],b:t[3],a:t[4]}:(t=D.hsl.exec(e))?{h:t[1],s:t[2],l:t[3]}:(t=D.hsla.exec(e))?{h:t[1],s:t[2],l:t[3],a:t[4]}:(t=D.hsv.exec(e))?{h:t[1],s:t[2],v:t[3]}:(t=D.hsva.exec(e))?{h:t[1],s:t[2],v:t[3],a:t[4]}:(t=D.hex8.exec(e))?{r:B(t[1]),g:B(t[2]),b:B(t[3]),a:W(t[4]),format:r?"name":"hex8"}:(t=D.hex6.exec(e))?{r:B(t[1]),g:B(t[2]),b:B(t[3]),format:r?"name":"hex"}:(t=D.hex4.exec(e))?{r:B(t[1]+""+t[1]),g:B(t[2]+""+t[2]),b:B(t[3]+""+t[3]),a:W(t[4]+""+t[4]),format:r?"name":"hex8"}:!!(t=D.hex3.exec(e))&&{r:B(t[1]+""+t[1]),g:B(t[2]+""+t[2]),b:B(t[3]+""+t[3]),format:r?"name":"hex"}}(e)),"object"==h(e)&&(V(e.r)&&V(e.g)&&V(e.b)?(t=e.r,r=e.g,o=e.b,n={r:255*F(t,255),g:255*F(r,255),b:255*F(o,255)},l=!0,u="%"===String(e.r).substr(-1)?"prgb":"rgb"):V(e.h)&&V(e.s)&&V(e.v)?(i=O(e.s),c=O(e.v),n=function(e,t,r){e=6*F(e,360),t=F(t,100),r=F(r,100);var o=Math.floor(e),n=e-o,a=r*(1-t),i=r*(1-n*t),c=r*(1-(1-n)*t),s=o%6;return{r:255*[r,i,a,a,c,r][s],g:255*[c,r,r,i,a,a][s],b:255*[a,a,c,r,r,i][s]}}(e.h,i,c),l=!0,u="hsv"):V(e.h)&&V(e.s)&&V(e.l)&&(i=O(e.s),s=O(e.l),n=function(e,t,r){var o,n,a;function i(e,t,r){return r<0&&(r+=1),r>1&&(r-=1),r<1/6?e+6*(t-e)*r:r<.5?t:r<2/3?e+(t-e)*(2/3-r)*6:e}if(e=F(e,360),t=F(t,100),r=F(r,100),0===t)o=n=a=r;else{var c=r<.5?r*(1+t):r+t-r*t,s=2*r-c;o=i(s,c,e+1/3),n=i(s,c,e),a=i(s,c,e-1/3)}return{r:255*o,g:255*n,b:255*a}}(e.h,i,s),l=!0,u="hsl"),e.hasOwnProperty("a")&&(a=e.a)),a=E(a),{ok:l,format:e.format||u,r:Math.min(255,Math.max(n.r,0)),g:Math.min(255,Math.max(n.g,0)),b:Math.min(255,Math.max(n.b,0)),a}}(e);this._originalInput=e,this._r=r.r,this._g=r.g,this._b=r.b,this._a=r.a,this._roundA=Math.round(100*this._a)/100,this._format=t.format||r.format,this._gradientType=t.gradientType,this._r<1&&(this._r=Math.round(this._r)),this._g<1&&(this._g=Math.round(this._g)),this._b<1&&(this._b=Math.round(this._b)),this._ok=r.ok}function g(e,t,r){e=F(e,255),t=F(t,255),r=F(r,255);var o,n,a=Math.max(e,t,r),i=Math.min(e,t,r),c=(a+i)/2;if(a==i)o=n=0;else{var s=a-i;switch(n=c>.5?s/(2-a-i):s/(a+i),a){case e:o=(t-r)/s+(t<r?6:0);break;case t:o=(r-e)/s+2;break;case r:o=(e-t)/s+4}o/=6}return{h:o,s:n,l:c}}function b(e,t,r){e=F(e,255),t=F(t,255),r=F(r,255);var o,n,a=Math.max(e,t,r),i=Math.min(e,t,r),c=a,s=a-i;if(n=0===a?0:s/a,a==i)o=0;else{switch(a){case e:o=(t-r)/s+(t<r?6:0);break;case t:o=(r-e)/s+2;break;case r:o=(e-t)/s+4}o/=6}return{h:o,s:n,v:c}}function y(e,t,r,o){var n=[j(Math.round(e).toString(16)),j(Math.round(t).toString(16)),j(Math.round(r).toString(16))];return o&&n[0].charAt(0)==n[0].charAt(1)&&n[1].charAt(0)==n[1].charAt(1)&&n[2].charAt(0)==n[2].charAt(1)?n[0].charAt(0)+n[1].charAt(0)+n[2].charAt(0):n.join("")}function _(e,t,r,o){return[j(N(o)),j(Math.round(e).toString(16)),j(Math.round(t).toString(16)),j(Math.round(r).toString(16))].join("")}function w(e,t){t=0===t?0:t||10;var r=m(e).toHsl();return r.s-=t/100,r.s=H(r.s),m(r)}function S(e,t){t=0===t?0:t||10;var r=m(e).toHsl();return r.s+=t/100,r.s=H(r.s),m(r)}function k(e){return m(e).desaturate(100)}function v(e,t){t=0===t?0:t||10;var r=m(e).toHsl();return r.l+=t/100,r.l=H(r.l),m(r)}function C(e,t){t=0===t?0:t||10;var r=m(e).toRgb();return r.r=Math.max(0,Math.min(255,r.r-Math.round(-t/100*255))),r.g=Math.max(0,Math.min(255,r.g-Math.round(-t/100*255))),r.b=Math.max(0,Math.min(255,r.b-Math.round(-t/100*255))),m(r)}function x(e,t){t=0===t?0:t||10;var r=m(e).toHsl();return r.l-=t/100,r.l=H(r.l),m(r)}function M(e,t){var r=m(e).toHsl(),o=(r.h+t)%360;return r.h=o<0?360+o:o,m(r)}function T(e){var t=m(e).toHsl();return t.h=(t.h+180)%360,m(t)}function A(e,t){if(isNaN(t)||t<=0)throw new Error("Argument to polyad must be a positive number");for(var r=m(e).toHsl(),o=[m(e)],n=360/t,a=1;a<t;a++)o.push(m({h:(r.h+a*n)%360,s:r.s,l:r.l}));return o}function q(e){var t=m(e).toHsl(),r=t.h;return[m(e),m({h:(r+72)%360,s:t.s,l:t.l}),m({h:(r+216)%360,s:t.s,l:t.l})]}function I(e,t,r){t=t||6,r=r||30;var o=m(e).toHsl(),n=360/r,a=[m(e)];for(o.h=(o.h-(n*t>>1)+720)%360;--t;)o.h=(o.h+n)%360,a.push(m(o));return a}function P(e,t){t=t||6;for(var r=m(e).toHsv(),o=r.h,n=r.s,a=r.v,i=[],c=1/t;t--;)i.push(m({h:o,s:n,v:a})),a=(a+c)%1;return i}m.prototype={isDark:function(){return this.getBrightness()<128},isLight:function(){return!this.isDark()},isValid:function(){return this._ok},getOriginalInput:function(){return this._originalInput},getFormat:function(){return this._format},getAlpha:function(){return this._a},getBrightness:function(){var e=this.toRgb();return(299*e.r+587*e.g+114*e.b)/1e3},getLuminance:function(){var e,t,r,o=this.toRgb();return e=o.r/255,t=o.g/255,r=o.b/255,.2126*(e<=.03928?e/12.92:Math.pow((e+.055)/1.055,2.4))+.7152*(t<=.03928?t/12.92:Math.pow((t+.055)/1.055,2.4))+.0722*(r<=.03928?r/12.92:Math.pow((r+.055)/1.055,2.4))},setAlpha:function(e){return this._a=E(e),this._roundA=Math.round(100*this._a)/100,this},toHsv:function(){var e=b(this._r,this._g,this._b);return{h:360*e.h,s:e.s,v:e.v,a:this._a}},toHsvString:function(){var e=b(this._r,this._g,this._b),t=Math.round(360*e.h),r=Math.round(100*e.s),o=Math.round(100*e.v);return 1==this._a?"hsv("+t+", "+r+"%, "+o+"%)":"hsva("+t+", "+r+"%, "+o+"%, "+this._roundA+")"},toHsl:function(){var e=g(this._r,this._g,this._b);return{h:360*e.h,s:e.s,l:e.l,a:this._a}},toHslString:function(){var e=g(this._r,this._g,this._b),t=Math.round(360*e.h),r=Math.round(100*e.s),o=Math.round(100*e.l);return 1==this._a?"hsl("+t+", "+r+"%, "+o+"%)":"hsla("+t+", "+r+"%, "+o+"%, "+this._roundA+")"},toHex:function(e){return y(this._r,this._g,this._b,e)},toHexString:function(e){return"#"+this.toHex(e)},toHex8:function(e){return function(e,t,r,o,n){var a=[j(Math.round(e).toString(16)),j(Math.round(t).toString(16)),j(Math.round(r).toString(16)),j(N(o))];return n&&a[0].charAt(0)==a[0].charAt(1)&&a[1].charAt(0)==a[1].charAt(1)&&a[2].charAt(0)==a[2].charAt(1)&&a[3].charAt(0)==a[3].charAt(1)?a[0].charAt(0)+a[1].charAt(0)+a[2].charAt(0)+a[3].charAt(0):a.join("")}(this._r,this._g,this._b,this._a,e)},toHex8String:function(e){return"#"+this.toHex8(e)},toRgb:function(){return{r:Math.round(this._r),g:Math.round(this._g),b:Math.round(this._b),a:this._a}},toRgbString:function(){return 1==this._a?"rgb("+Math.round(this._r)+", "+Math.round(this._g)+", "+Math.round(this._b)+")":"rgba("+Math.round(this._r)+", "+Math.round(this._g)+", "+Math.round(this._b)+", "+this._roundA+")"},toPercentageRgb:function(){return{r:Math.round(100*F(this._r,255))+"%",g:Math.round(100*F(this._g,255))+"%",b:Math.round(100*F(this._b,255))+"%",a:this._a}},toPercentageRgbString:function(){return 1==this._a?"rgb("+Math.round(100*F(this._r,255))+"%, "+Math.round(100*F(this._g,255))+"%, "+Math.round(100*F(this._b,255))+"%)":"rgba("+Math.round(100*F(this._r,255))+"%, "+Math.round(100*F(this._g,255))+"%, "+Math.round(100*F(this._b,255))+"%, "+this._roundA+")"},toName:function(){return 0===this._a?"transparent":!(this._a<1)&&(L[y(this._r,this._g,this._b,!0)]||!1)},toFilter:function(e){var t="#"+_(this._r,this._g,this._b,this._a),r=t,o=this._gradientType?"GradientType = 1, ":"";if(e){var n=m(e);r="#"+_(n._r,n._g,n._b,n._a)}return"progid:DXImageTransform.Microsoft.gradient("+o+"startColorstr="+t+",endColorstr="+r+")"},toString:function(e){var t=!!e;e=e||this._format;var r=!1,o=this._a<1&&this._a>=0;return t||!o||"hex"!==e&&"hex6"!==e&&"hex3"!==e&&"hex4"!==e&&"hex8"!==e&&"name"!==e?("rgb"===e&&(r=this.toRgbString()),"prgb"===e&&(r=this.toPercentageRgbString()),"hex"!==e&&"hex6"!==e||(r=this.toHexString()),"hex3"===e&&(r=this.toHexString(!0)),"hex4"===e&&(r=this.toHex8String(!0)),"hex8"===e&&(r=this.toHex8String()),"name"===e&&(r=this.toName()),"hsl"===e&&(r=this.toHslString()),"hsv"===e&&(r=this.toHsvString()),r||this.toHexString()):"name"===e&&0===this._a?this.toName():this.toRgbString()},clone:function(){return m(this.toString())},_applyModification:function(e,t){var r=e.apply(null,[this].concat([].slice.call(t)));return this._r=r._r,this._g=r._g,this._b=r._b,this.setAlpha(r._a),this},lighten:function(){return this._applyModification(v,arguments)},brighten:function(){return this._applyModification(C,arguments)},darken:function(){return this._applyModification(x,arguments)},desaturate:function(){return this._applyModification(w,arguments)},saturate:function(){return this._applyModification(S,arguments)},greyscale:function(){return this._applyModification(k,arguments)},spin:function(){return this._applyModification(M,arguments)},_applyCombination:function(e,t){return e.apply(null,[this].concat([].slice.call(t)))},analogous:function(){return this._applyCombination(I,arguments)},complement:function(){return this._applyCombination(T,arguments)},monochromatic:function(){return this._applyCombination(P,arguments)},splitcomplement:function(){return this._applyCombination(q,arguments)},triad:function(){return this._applyCombination(A,[3])},tetrad:function(){return this._applyCombination(A,[4])}},m.fromRatio=function(e,t){if("object"==h(e)){var r={};for(var o in e)e.hasOwnProperty(o)&&(r[o]="a"===o?e[o]:O(e[o]));e=r}return m(e,t)},m.equals=function(e,t){return!(!e||!t)&&m(e).toRgbString()==m(t).toRgbString()},m.random=function(){return m.fromRatio({r:Math.random(),g:Math.random(),b:Math.random()})},m.mix=function(e,t,r){r=0===r?0:r||50;var o=m(e).toRgb(),n=m(t).toRgb(),a=r/100;return m({r:(n.r-o.r)*a+o.r,g:(n.g-o.g)*a+o.g,b:(n.b-o.b)*a+o.b,a:(n.a-o.a)*a+o.a})},m.readability=function(e,t){var r=m(e),o=m(t);return(Math.max(r.getLuminance(),o.getLuminance())+.05)/(Math.min(r.getLuminance(),o.getLuminance())+.05)},m.isReadable=function(e,t,r){var o,n,a,i,c,s=m.readability(e,t);switch(n=!1,(a=r,"AA"!==(i=((a=a||{level:"AA",size:"small"}).level||"AA").toUpperCase())&&"AAA"!==i&&(i="AA"),"small"!==(c=(a.size||"small").toLowerCase())&&"large"!==c&&(c="small"),o={level:i,size:c}).level+o.size){case"AAsmall":case"AAAlarge":n=s>=4.5;break;case"AAlarge":n=s>=3;break;case"AAAsmall":n=s>=7}return n},m.mostReadable=function(e,t,r){var o,n,a,i,c=null,s=0;n=(r=r||{}).includeFallbackColors,a=r.level,i=r.size;for(var l=0;l<t.length;l++)(o=m.readability(e,t[l]))>s&&(s=o,c=m(t[l]));return m.isReadable(e,c,{level:a,size:i})||!n?c:(r.includeFallbackColors=!1,m.mostReadable(e,["#fff","#000"],r))};var R=m.names={aliceblue:"f0f8ff",antiquewhite:"faebd7",aqua:"0ff",aquamarine:"7fffd4",azure:"f0ffff",beige:"f5f5dc",bisque:"ffe4c4",black:"000",blanchedalmond:"ffebcd",blue:"00f",blueviolet:"8a2be2",brown:"a52a2a",burlywood:"deb887",burntsienna:"ea7e5d",cadetblue:"5f9ea0",chartreuse:"7fff00",chocolate:"d2691e",coral:"ff7f50",cornflowerblue:"6495ed",cornsilk:"fff8dc",crimson:"dc143c",cyan:"0ff",darkblue:"00008b",darkcyan:"008b8b",darkgoldenrod:"b8860b",darkgray:"a9a9a9",darkgreen:"006400",darkgrey:"a9a9a9",darkkhaki:"bdb76b",darkmagenta:"8b008b",darkolivegreen:"556b2f",darkorange:"ff8c00",darkorchid:"9932cc",darkred:"8b0000",darksalmon:"e9967a",darkseagreen:"8fbc8f",darkslateblue:"483d8b",darkslategray:"2f4f4f",darkslategrey:"2f4f4f",darkturquoise:"00ced1",darkviolet:"9400d3",deeppink:"ff1493",deepskyblue:"00bfff",dimgray:"696969",dimgrey:"696969",dodgerblue:"1e90ff",firebrick:"b22222",floralwhite:"fffaf0",forestgreen:"228b22",fuchsia:"f0f",gainsboro:"dcdcdc",ghostwhite:"f8f8ff",gold:"ffd700",goldenrod:"daa520",gray:"808080",green:"008000",greenyellow:"adff2f",grey:"808080",honeydew:"f0fff0",hotpink:"ff69b4",indianred:"cd5c5c",indigo:"4b0082",ivory:"fffff0",khaki:"f0e68c",lavender:"e6e6fa",lavenderblush:"fff0f5",lawngreen:"7cfc00",lemonchiffon:"fffacd",lightblue:"add8e6",lightcoral:"f08080",lightcyan:"e0ffff",lightgoldenrodyellow:"fafad2",lightgray:"d3d3d3",lightgreen:"90ee90",lightgrey:"d3d3d3",lightpink:"ffb6c1",lightsalmon:"ffa07a",lightseagreen:"20b2aa",lightskyblue:"87cefa",lightslategray:"789",lightslategrey:"789",lightsteelblue:"b0c4de",lightyellow:"ffffe0",lime:"0f0",limegreen:"32cd32",linen:"faf0e6",magenta:"f0f",maroon:"800000",mediumaquamarine:"66cdaa",mediumblue:"0000cd",mediumorchid:"ba55d3",mediumpurple:"9370db",mediumseagreen:"3cb371",mediumslateblue:"7b68ee",mediumspringgreen:"00fa9a",mediumturquoise:"48d1cc",mediumvioletred:"c71585",midnightblue:"191970",mintcream:"f5fffa",mistyrose:"ffe4e1",moccasin:"ffe4b5",navajowhite:"ffdead",navy:"000080",oldlace:"fdf5e6",olive:"808000",olivedrab:"6b8e23",orange:"ffa500",orangered:"ff4500",orchid:"da70d6",palegoldenrod:"eee8aa",palegreen:"98fb98",paleturquoise:"afeeee",palevioletred:"db7093",papayawhip:"ffefd5",peachpuff:"ffdab9",peru:"cd853f",pink:"ffc0cb",plum:"dda0dd",powderblue:"b0e0e6",purple:"800080",rebeccapurple:"663399",red:"f00",rosybrown:"bc8f8f",royalblue:"4169e1",saddlebrown:"8b4513",salmon:"fa8072",sandybrown:"f4a460",seagreen:"2e8b57",seashell:"fff5ee",sienna:"a0522d",silver:"c0c0c0",skyblue:"87ceeb",slateblue:"6a5acd",slategray:"708090",slategrey:"708090",snow:"fffafa",springgreen:"00ff7f",steelblue:"4682b4",tan:"d2b48c",teal:"008080",thistle:"d8bfd8",tomato:"ff6347",turquoise:"40e0d0",violet:"ee82ee",wheat:"f5deb3",white:"fff",whitesmoke:"f5f5f5",yellow:"ff0",yellowgreen:"9acd32"},L=m.hexNames=function(e){var t={};for(var r in e)e.hasOwnProperty(r)&&(t[e[r]]=r);return t}(R);function E(e){return e=parseFloat(e),(isNaN(e)||e<0||e>1)&&(e=1),e}function F(e,t){(function(e){return"string"==typeof e&&-1!=e.indexOf(".")&&1===parseFloat(e)})(e)&&(e="100%");var r=function(e){return"string"==typeof e&&-1!=e.indexOf("%")}(e);return e=Math.min(t,Math.max(0,parseFloat(e))),r&&(e=parseInt(e*t,10)/100),Math.abs(e-t)<1e-6?1:e%t/parseFloat(t)}function H(e){return Math.min(1,Math.max(0,e))}function B(e){return parseInt(e,16)}function j(e){return 1==e.length?"0"+e:""+e}function O(e){return e<=1&&(e=100*e+"%"),e}function N(e){return Math.round(255*parseFloat(e)).toString(16)}function W(e){return B(e)/255}var U,$,z,D=($="[\\s|\\(]+("+(U="(?:[-\\+]?\\d*\\.\\d+%?)|(?:[-\\+]?\\d+%?)")+")[,|\\s]+("+U+")[,|\\s]+("+U+")\\s*\\)?",z="[\\s|\\(]+("+U+")[,|\\s]+("+U+")[,|\\s]+("+U+")[,|\\s]+("+U+")\\s*\\)?",{CSS_UNIT:new RegExp(U),rgb:new RegExp("rgb"+$),rgba:new RegExp("rgba"+z),hsl:new RegExp("hsl"+$),hsla:new RegExp("hsla"+z),hsv:new RegExp("hsv"+$),hsva:new RegExp("hsva"+z),hex3:/^#?([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,hex6:/^#?([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/,hex4:/^#?([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,hex8:/^#?([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/});function V(e){return!!D.CSS_UNIT.exec(e)}const K=e=>{const t=e.match(/^rgba\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(0?(\.\d+)?|1?(\.0+)?)\s*\)$/);if(t){const r=t[4]||1;e=`rgb(${t.slice(1,4).map((e=>Math.round(e*r+255*(1-r)))).join(", ")})`}return e},G={default:{hiddenContainer:"#wcpay-hidden-div",hiddenInput:"#wcpay-hidden-input",hiddenInvalidInput:"#wcpay-hidden-invalid-input",hiddenValidActiveLabel:"#wcpay-hidden-valid-active-label"},classicCheckout:{appendTarget:".woocommerce-billing-fields__field-wrapper",upeThemeInputSelector:"#billing_first_name",upeThemeLabelSelector:".woocommerce-checkout .form-row label",rowElement:"p",validClasses:["form-row"],invalidClasses:["form-row","woocommerce-invalid","woocommerce-invalid-required-field"],backgroundSelectors:["li.wc_payment_method .wc-payment-form","li.wc_payment_method .payment_box","#payment","#order_review","form.checkout","body"],headingSelectors:["h1","h2","h3","h4","h5","h6"],buttonSelectors:["#place_order"],linkSelectors:["a"]},blocksCheckout:{appendTarget:"#contact-fields",upeThemeInputSelector:".wc-block-components-text-input #email",upeThemeLabelSelector:".wc-block-components-text-input label",rowElement:"div",validClasses:["wc-block-components-text-input","is-active"],invalidClasses:["wc-block-components-text-input","has-error"],alternateSelectors:{appendTarget:"#billing.wc-block-components-address-form",upeThemeInputSelector:"#billing-first_name",upeThemeLabelSelector:".wc-block-components-checkout-step__description"},backgroundSelectors:["#payment-method .wc-block-components-radio-control-accordion-option","#payment-method","form.wc-block-checkout__form",".wc-block-checkout","body"],headingSelectors:["h1","h2","h3","h4","h5","h6"],buttonSelectors:[".wc-block-components-checkout-place-order-button"],linkSelectors:["a"],containerSelectors:[".wp-block-woocommerce-checkout-order-summary-block"]},bnplProductPage:{appendTarget:".product .cart .quantity",upeThemeInputSelector:".product .cart .quantity .qty",upeThemeLabelSelector:".product .cart .quantity label",rowElement:"div",validClasses:["input-text"],invalidClasses:["input-text","has-error"],backgroundSelectors:["#payment-method-message","#main > .product > div.summary.entry-summary","#main > .product","#main","body"],headingSelectors:["h1","h2","h3","h4","h5","h6"],buttonSelectors:[".single_add_to_cart_button"],linkSelectors:["a"]},bnplClassicCart:{appendTarget:".cart .quantity",upeThemeInputSelector:".cart .quantity .qty",upeThemeLabelSelector:".cart .quantity label",rowElement:"div",validClasses:["input-text"],invalidClasses:["input-text","has-error"],backgroundSelectors:["#payment-method-message","#main .entry-content .cart_totals","#main .entry-content","#main","body"],headingSelectors:["h1","h2","h3","h4","h5","h6"],buttonSelectors:[".checkout-button"],linkSelectors:["a"],containerSelectors:[".shop_table"]},bnplCartBlock:{appendTarget:".wc-block-cart .wc-block-components-quantity-selector",upeThemeInputSelector:".wc-block-cart .wc-block-components-quantity-selector .wc-block-components-quantity-selector__input",upeThemeLabelSelector:".wc-block-components-text-input",rowElement:"div",validClasses:["wc-block-components-text-input"],invalidClasses:["wc-block-components-text-input","has-error"],backgroundSelectors:[".wc-block-components-bnpl-wrapper",".wc-block-components-order-meta",".wc-block-components-totals-wrapper",".wp-block-woocommerce-cart-order-summary-block",".wp-block-woocommerce-cart-totals-block",".wp-block-woocommerce-cart .wc-block-cart",".wp-block-woocommerce-cart","body"],headingSelectors:["h1","h2","h3","h4","h5","h6"],buttonSelectors:[".wc-block-cart__submit-button"],linkSelectors:["a"],containerSelectors:[".wp-block-woocommerce-cart-line-items-block"]},wooPayClassicCheckout:{appendTarget:".woocommerce-billing-fields__field-wrapper",upeThemeInputSelector:"#billing_first_name",upeThemeLabelSelector:".woocommerce-checkout .form-row label",rowElement:"p",validClasses:["form-row"],invalidClasses:["form-row","woocommerce-invalid","woocommerce-invalid-required-field"],backgroundSelectors:["#customer_details","#order_review","form.checkout","body"],headingSelectors:["h1","h2","h3","h4","h5","h6"],buttonSelectors:["#place_order"],linkSelectors:["a"],containerSelectors:[".woocommerce-checkout-review-order-table"]},updateSelectors:function(e){return e.hasOwnProperty("alternateSelectors")&&(Object.entries(e.alternateSelectors).forEach((t=>{const[r,o]=t;document.querySelector(e[r])||(e[r]=o)})),delete e.alternateSelectors),e},getSelectors:function(e){let t=this.blocksCheckout;switch(e){case"blocks_checkout":t=this.blocksCheckout;break;case"shortcode_checkout":t=this.classicCheckout;break;case"bnpl_product_page":t=this.bnplProductPage;break;case"bnpl_classic_cart":t=this.bnplClassicCart;break;case"bnpl_cart_block":t=this.bnplCartBlock;break;case"woopay_shortcode_checkout":t=this.wooPayClassicCheckout}return{...this.default,...this.updateSelectors(t)}}},J={getHiddenContainer:function(e){const t=document.createElement("div");return t.setAttribute("id",this.getIDFromSelector(e)),t.style.border=0,t.style.clip="rect(0 0 0 0)",t.style.height="1px",t.style.margin="-1px",t.style.overflow="hidden",t.style.padding="0",t.style.position="absolute",t.style.width="1px",t},createRow:function(e,t=[]){const r=document.createElement(e);return t.length&&r.classList.add(...t),r},appendClone:function(e,t,r){const o=document.querySelector(t);if(o){const t=o.cloneNode(!0);t.id=this.getIDFromSelector(r),t.value="",e.appendChild(t)}},getIDFromSelector:function(e){return e.startsWith("#")||e.startsWith(".")?e.slice(1):e},init:function(e){const t=G.getSelectors(e),r=document.querySelector(t.appendTarget),o=document.querySelector(t.upeThemeInputSelector);if(!r||!o)return;document.querySelector(t.hiddenContainer)&&this.cleanup();const n=this.getHiddenContainer(t.hiddenContainer);r.appendChild(n);const a=this.createRow(t.rowElement,t.validClasses);n.appendChild(a);const i=this.createRow(t.rowElement,t.invalidClasses);n.appendChild(i),this.appendClone(a,t.upeThemeInputSelector,t.hiddenInput),this.appendClone(a,t.upeThemeLabelSelector,t.hiddenValidActiveLabel),this.appendClone(i,t.upeThemeInputSelector,t.hiddenInvalidInput),this.appendClone(i,t.upeThemeLabelSelector,t.hiddenInvalidInput),document.querySelector(t.hiddenInput).style.transition="none"},cleanup:function(){const e=document.querySelector(G.default.hiddenContainer);e&&e.remove()}},Q=(e,t,r=null)=>{if(!document.querySelector(e))return{};const o=d[t],n=document.querySelector(e),a=window.getComputedStyle(n),i={};for(let e=0;e<a.length;e++){const t=a[e].replace(/-([a-z])/g,(function(e){return e[1].toUpperCase()}));if(o.includes(t)){let r=a.getPropertyValue(a[e]);"color"===t&&(r=K(r)),i[t]=r}}if(".Input"===t||".Tab--selected"===t){const e=((e,t="solid",r)=>e&&r?[e,t,r].join(" "):"")(i.outlineWidth,i.outlineStyle,i.outlineColor);""!==e&&(i.outline=e),delete i.outlineWidth,delete i.outlineColor,delete i.outlineStyle}const c=a.getPropertyValue("text-indent");return"0px"!==c&&"0px"===i.paddingLeft&&"0px"===i.paddingRight&&(i.paddingLeft=c,i.paddingRight=c),".Block"===t&&(i.backgroundColor=r),i},X=()=>{const e=[],t=document.styleSheets,r=["fonts.googleapis.com","fonts.gstatic.com","fast.fonts.com","use.typekit.net"];for(let o=0;o<t.length;o++){if(!t[o].href)continue;const n=new URL(t[o].href);-1!==r.indexOf(n.hostname)&&e.push({cssSrc:t[o].href})}return e},Y=(e,t=!1)=>{const r=G.getSelectors(e);J.init(e);const o=Q(r.hiddenInput,".Input"),n=Q(r.hiddenInvalidInput,".Input"),a=Q(r.upeThemeLabelSelector,".Label"),i=Q(r.upeThemeInputSelector,".Tab"),c=Q(r.hiddenInput,".Tab--selected"),s=(e=>{const t=Object.assign({},e);if(!e.backgroundColor||!e.color)return e;const r=((e,t)=>{const r={backgroundColor:e,color:t},o=m(e),n=m(t);if(!o.isValid()||!n.isValid())return{backgroundColor:"",color:""};const a=o.getBrightness()>50?m(o).darken(7):m(o).lighten(7),i=m.mostReadable(a,[n],{includeFallbackColors:!0});return r.backgroundColor=a.toRgbString(),r.color=i.toRgbString(),r})(e.backgroundColor,e.color);return t.backgroundColor=r.backgroundColor,t.color=r.color,t})(i),l={color:s.color},u={color:c.color},d=(e=>{let t=null,r=0;for(;!t&&r<e.length;){const o=document.querySelector(e[r]);if(!o){r++;continue}const n=window.getComputedStyle(o).backgroundColor;n&&m(n).getAlpha()>0&&(t=n),r++}return t||"#ffffff"})(r.backgroundSelectors),h=Q(r.headingSelectors,".Label"),p=Q(r.upeThemeLabelSelector,".Block",d),f=Q(r.buttonSelectors,".Input"),g=Q(r.linkSelectors,".Label"),b=Q(r.containerSelectors,".Container"),y="blocks_checkout"===e;let _={variables:{colorBackground:d,colorText:a.color,fontFamily:a.fontFamily,fontSizeBase:a.fontSize},theme:(w=d,m(w).getBrightness()>125?"stripe":"night"),labels:y?"floating":"above",rules:JSON.parse(JSON.stringify({".Input":o,".Input--invalid":n,".Label":a,".Block":p,".Tab":i,".Tab:hover":s,".Tab--selected":c,".TabIcon:hover":l,".TabIcon--selected":u,".Text":a,".Text--redirect":a}))};var w;return y&&(_=((e,t)=>{if(e.rules[".Label--floating"]=t,e.rules[".Label--floating"].transform&&"none"!==e.rules[".Label--floating"].transform){const t=e.rules[".Label--floating"].transform.match(/matrix\((.+)\)/);if(t&&t[1]){const r=t[1].split(", "),o=(parseFloat(r[0])+parseFloat(r[3]))/2,n=parseFloat(e.rules[".Label--floating"].lineHeight),a=Math.floor(n*o);e.rules[".Label--floating"].lineHeight=`${a}px`,e.rules[".Label--floating"].fontSize=`${a}px`}delete e.rules[".Label--floating"].transform}if(e.rules[".Input"].paddingTop&&(e.rules[".Input"].paddingTop=`calc(${e.rules[".Input"].paddingTop} - ${e.rules[".Label--floating"].lineHeight} - 4px - 1px)`),e.rules[".Input"].paddingBottom){var r;const t=parseFloat(e.rules[".Input"].paddingBottom);e.rules[".Input"].paddingBottom=t-1+"px";const o=null!==(r=e.rules[".Label"].marginTop)&&void 0!==r?r:"0";e.rules[".Label"].marginTop=`${Math.floor((t-1)/3)}px`,e.rules[".Label--floating"].marginTop=o}return e})(_,Q(r.hiddenValidActiveLabel,".Label--floating"))),t&&(_.rules={..._.rules,".Heading":h,".Button":f,".Link":g,".Container":b}),J.cleanup(),_};class Z{constructor(e,t){this.options=e,this.stripe=null,this.stripePlatform=null,this.request=t,this.isWooPayRequesting=!1}createStripe(e,t,r="",o=[]){const n={locale:t};return r&&(n.stripeAccount=r),o&&(n.betas=o),new Stripe(e,n)}getStripeForUPE(e){return this.options.forceNetworkSavedCards=t("paymentMethodsConfig")[e].forceNetworkSavedCards,this.getStripe()}getStripe(e=!1){const{publishableKey:t,accountId:r,forceNetworkSavedCards:o,locale:n,isStripeLinkEnabled:a}=this.options;if(o&&!e)return this.stripePlatform||(this.stripePlatform=this.createStripe(t,n)),this.stripePlatform;if(!this.stripe){let e=["card_country_event_beta_1"];a&&(e=e.concat(["link_autofill_modal_beta_1"])),this.stripe=this.createStripe(t,n,r,e)}return this.stripe}loadStripe(e=!1){return new Promise((t=>{try{t(this.getStripe(e))}catch(e){t({error:e})}}))}confirmIntent(t,r){const o=t.match(/#wcpay-confirm-(pi|si):(.+):(.+):(.+)$/);if(!o)return!0;const a="si"===o[1];let i=o[2];const c=o[3],s=o[4],l=t.indexOf("order-pay"),u=l>-1&&t.substring(l).match(/\d+/);return u&&(i=u[0]),(()=>{const{locale:t,publishableKey:r}=this.options,o=e("accountIdForIntentConfirmation");return a?this.getStripe().handleNextAction({clientSecret:c}):o?this.createStripe(r,t,o).confirmCardPayment(c):this.getStripe(!0).handleNextAction({clientSecret:c})})().then((t=>{var o;const a=t.paymentIntent&&t.paymentIntent.id||t.setupIntent&&t.setupIntent.id||t.error&&t.error.payment_intent&&t.error.payment_intent.id||t.error.setup_intent&&t.error.setup_intent.id,c=null!==(o=n("ajax_url"))&&void 0!==o?o:e("ajaxUrl");return[this.request(c,{action:"update_order_status",order_id:i,_ajax_nonce:s,intent_id:a,payment_method_id:r||null}),t.error]})).then((([e,t])=>{if(t)throw t;return e.then((e=>{const t="string"==typeof e?JSON.parse(e):e;if(t.error)throw t.error;return t.return_url}))}))}setupIntent(t){return this.request(e("ajaxUrl"),{action:"create_setup_intent","wcpay-payment-method":t,_ajax_nonce:e("createSetupIntentNonce")}).then((e=>{if(!e.success)throw e.data.error;return"succeeded"===e.data.status?e.data:this.getStripe().confirmCardSetup(e.data.client_secret).then((e=>{const{setupIntent:t,error:r}=e;if(r)throw r;return t}))}))}saveUPEAppearance(t,r){return this.request(e("ajaxUrl"),{elements_location:r,appearance:JSON.stringify(t),action:"save_upe_appearance",_ajax_nonce:e("saveUPEAppearanceNonce")}).then((e=>e.data)).catch((e=>{throw e.message?e:new Error(e.statusText)}))}paymentRequestCalculateShippingOptions(e){return this.request(a("get_shipping_options"),{security:n("nonce")?.shipping,is_product_page:n("is_product_page"),...e})}paymentRequestUpdateShippingDetails(e){return this.request(a("update_shipping_method"),{security:n("nonce")?.update_shipping,shipping_method:[e.id],is_product_page:n("is_product_page")})}paymentRequestGetCartDetails(){return this.request(a("get_cart_details"),{security:n("nonce")?.get_cart_details})}paymentRequestAddToCart(e){return this.request(a("add_to_cart"),{security:n("nonce")?.add_to_cart,...e})}paymentRequestEmptyCart(e){return this.request(a("empty_cart"),{security:n("nonce")?.empty_cart,booking_id:e})}paymentRequestGetSelectedProductData(e){return this.request(a("get_selected_product_data"),{security:n("nonce")?.get_selected_product_data,...e})}paymentRequestCreateOrder(e){return this.request(a("create_order"),{_wpnonce:n("nonce")?.checkout,...e})}expressCheckoutECECalculateShippingOptions(e){return this.request(o("get_shipping_options"),{security:r("nonce")?.shipping,is_product_page:r("is_product_page"),...e})}expressCheckoutECECreateOrder(e){return this.request(o("create_order"),{_wpnonce:r("nonce")?.checkout,...e})}expressCheckoutECEPayForOrder(e,t){return this.request(o("pay_for_order"),{_wpnonce:r("nonce")?.pay_for_order,order:e,...t})}initWooPay(t,r){if(!this.isWooPayRequesting){this.isWooPayRequesting=!0;const o=e("wcAjaxUrl"),n=e("initWooPayNonce"),a=document.querySelector(".wp-block-woocommerce-checkout")?"blocks_checkout":document.querySelector(".woocommerce-billing-fields")?"woopay_shortcode_checkout":document.querySelector(".wp-block-woocommerce-cart")?"bnpl_cart_block":document.querySelector(".woocommerce-cart-form")?"bnpl_classic_cart":document.querySelector(".single-product")?"bnpl_product_page":void 0;return this.request(i(o,"init_woopay"),{_wpnonce:n,appearance:e("isWooPayGlobalThemeSupportEnabled")?Y(a,!0):null,email:t,user_session:r,order_id:e("order_id"),key:e("key"),billing_email:e("billing_email")}).finally((()=>{this.isWooPayRequesting=!1}))}}expressCheckoutAddToCart(t){const r=e("wcAjaxUrl"),o=e("addToCartNonce");return this.request(i(r,"add_to_cart"),{security:o,...t})}paymentRequestPayForOrder(e,t){return this.request(a("pay_for_order"),{_wpnonce:n("nonce")?.pay_for_order,order:e,...t})}pmmeGetCartData(){return fetch(`${t("storeApiURL")}/cart`,{method:"GET",credentials:"same-origin",headers:{"Content-Type":"application/json"}}).then((e=>{if(!e.ok)throw new Error(e.statusText);return e.json()}))}}function ee(e,t="",r){for(const o in e){const n=e[o],a=t?t+"["+o+"]":o;"string"==typeof n||"number"==typeof n?r.append(a,n):"object"==typeof n&&ee(n,a,r)}return r}async function te(e,t,r){const o=ee(t,"",new FormData),n=await fetch(e,{method:"POST",body:o,...r});return await n.json()}const re={bnplProductPage:{configKey:"upeBnplProductPageAppearance",appearanceKey:"bnpl_product_page"},bnplClassicCart:{configKey:"upeBnplClassicCartAppearance",appearanceKey:"bnpl_classic_cart"}};async function oe(e,r){const{configKey:o,appearanceKey:n}=re[r],a=t(o);return a?Promise.resolve(a):await e.saveUPEAppearance(Y(n),n)}const ne=async()=>{const{productVariations:e,country:t,locale:r,accountId:o,publishableKey:n,paymentMethods:a,currencyCode:i,isCart:c,isCartBlock:s,cartTotal:l,minimumOrderAmount:u}=window.wcpayStripeSiteMessaging;let d,h="bnplProductPage";const p=parseInt(u,10)||0,f=document.getElementById("payment-method-message");let m;if(c||s?(d=parseInt(l,10)||0,h="bnplClassicCart"):(d=parseInt(e.base_product.amount,10)||0,d<p&&f.style.setProperty("display","none")),!s){const e=new Z({publishableKey:n,accountId:o,locale:r},te),c={amount:d,currency:i||"USD",paymentMethodTypes:a||[],countryCode:t},s={appearance:await oe(e,h),fonts:X()};m=e.getStripe().elements(s).create("paymentMethodMessaging",c),m.mount("#payment-method-message")}function g(e,t){const r=e.slice(-2),o=parseFloat(e);switch(r){case"em":return o*t+"px";case"px":return e;default:return"0px"}}const b=document.querySelector(".price")||document.querySelector(".wp-block-woocommerce-product-price"),y=document.querySelector(".cart_totals .shop_table");if(b||y){const e=b||y,t=window.getComputedStyle(e);let r=t.marginBottom;const o=parseFloat(t.fontSize),n=parseFloat(window.getComputedStyle(document.documentElement).fontSize);let a;r.endsWith("em")?r=g(r,o):r.endsWith("rem")&&(r=g(r,n)),f.style.setProperty("--wc-bnpl-margin-bottom",r),c||(a=document.createElement("div"),a.classList.add("pmme-loading"),f.prepend(a)),m.on("ready",(()=>{if(c){f.classList.add("ready");const e=document.querySelector(".cart-collaterals");if(getComputedStyle(e).getPropertyValue("--wc-bnpl-height").trim())return;const t=document.getElementById("payment-method-message"),o=document.querySelector(".cart_totals .__PrivateStripeElement");setTimeout((()=>{const n=window.getComputedStyle(t),a=parseFloat(n.height),i=parseFloat(r),c=a+i,s=window.getComputedStyle(o),l=parseFloat(s.height);e.style.setProperty("--wc-bnpl-height",c+"px"),e.style.setProperty("--wc-bnpl-container-height",l-12+"px"),e.style.setProperty("--wc-bnpl-loader-margin",i+2+"px"),t.style.setProperty("--wc-bnpl-margin-bottom","-4px")}),2e3)}else a?.remove()}))}return m};jQuery((async function(e){if(!window.wcpayStripeSiteMessaging||window.wcpayStripeSiteMessaging.isCartBlock)return;const{productVariations:t,productId:r,isCart:o}=window.wcpayStripeSiteMessaging;let n,a;if(!o){const{amount:e,currency:o}=t[r];n=e||0,a=o}const c=e(".quantity input[type=number]"),s=await ne(),l=Object.keys(t).length>1,u=e=>{const t=parseInt(e,10);return isNaN(t)?0:t},d=(e,t,r=1)=>{const o=u(e)*u(r);o<=0||!t||s.update({amount:o,currency:t})},h=()=>{d(n,a,c.val())};c.on("change",(r=>{let o=n;const i=e('input[name="variation_id"]').val();l&&t.hasOwnProperty(i)&&(o=t[i]?.amount),d(o,a,r.target.value)})),e(document.body).on("updated_cart_totals",(()=>{e("#payment-method-message").before('<div class="pmme-loading"></div>'),e("#payment-method-message").hide(),te(i(window.wcpayStripeSiteMessaging.wcAjaxUrl,"get_cart_total"),{security:window.wcpayStripeSiteMessaging.nonce}).then((t=>{window.wcpayStripeSiteMessaging.cartTotal=t.total,ne().then((()=>{setTimeout((()=>{e(".pmme-loading").remove(),e("#payment-method-message").show(),e("#payment-method-message").addClass("pmme-updated")}),1e3)}))}))})),l&&(e(".single_variation_wrap").on("show_variation",((e,r)=>{t[r.variation_id]&&d(t[r.variation_id].amount,a,c.val())})),e(".variations").on("change",(e=>{""===e.target.value&&h()})),e(".reset_variations").on("click",h))}))})()})();