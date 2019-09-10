(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("btoa"), require("svg2png"), require("react"), require("object-assign"), require("rvg.js"), require("deep-extend"));
	else if(typeof define === 'function' && define.amd)
		define("CardKitServer", ["btoa", "svg2png", "react", "object-assign", "rvg.js", "deep-extend"], factory);
	else if(typeof exports === 'object')
		exports["CardKitServer"] = factory(require("btoa"), require("svg2png"), require("react"), require("object-assign"), require("rvg.js"), require("deep-extend"));
	else
		root["CardKitServer"] = factory(root["btoa"], root["svg2png"], root["react"], root["object-assign"], root["rvg.js"], root["deep-extend"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_1__, __WEBPACK_EXTERNAL_MODULE_2__, __WEBPACK_EXTERNAL_MODULE_3__, __WEBPACK_EXTERNAL_MODULE_6__, __WEBPACK_EXTERNAL_MODULE_8__, __WEBPACK_EXTERNAL_MODULE_11__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	// Dependencies
	var btoa = __webpack_require__(1);
	var svg2png = __webpack_require__(2);
	var React = __webpack_require__(3);
	var ReactDOMServer = __webpack_require__(4);
	var Card = __webpack_require__(7);
	var CardKitRenderer = __webpack_require__(9);
	var helpers = __webpack_require__(12);

	/**
	 * @name CardKitServer
	 * @class Additional CardKit class used for rendering on the server
	 */

	var CardKitServer = function (_CardKitRenderer) {
	  _inherits(CardKitServer, _CardKitRenderer);

	  /**
	   * Constructor takes in an instance of CardKit and stores it for later user
	   *
	   * @param {CardKit} cardkit - An instance of CardKit
	   */
	  function CardKitServer(cardkit) {
	    _classCallCheck(this, CardKitServer);

	    // Ensure we're operating in a server environment
	    if (typeof document !== 'undefined') {
	      throw new Error('CardKitServer can only be used in a server environment');
	    }

	    return _possibleConstructorReturn(this, (CardKitServer.__proto__ || Object.getPrototypeOf(CardKitServer)).call(this, cardkit));
	  }

	  /**
	   * Renders the card as an SVG string <svg ..></svg>
	   *
	   * @return {string} The SVG string representation of the image
	   */


	  _createClass(CardKitServer, [{
	    key: 'renderToString',
	    value: function renderToString() {
	      var string = ReactDOMServer.renderToString(React.createFactory(Card)({
	        configuration: this.computeConfiguration()
	      }), {});

	      return string;
	    }

	    /**
	     * Renders the current configuration to an image
	     *
	     * @param {number} scale - The scale to output at
	     */

	  }, {
	    key: 'renderToImage',
	    value: function renderToImage() {
	      var scale = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 2;

	      // Get the SVG in string-form
	      var string = this.renderToString();

	      // Encode the string into a data URI
	      var uri = helpers.svgToBase64(string, btoa);

	      // Convert to png and fulfill promise
	      return svg2png(uri, {
	        width: this.computeConfiguration().card.width * scale,
	        height: this.computeConfiguration().card.height * scale
	      }).then(function (buffer) {
	        return buffer.toString('base64');
	      });
	    }
	  }]);

	  return CardKitServer;
	}(CardKitRenderer);

	module.exports = CardKitServer;

/***/ }),
/* 1 */
/***/ (function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_1__;

/***/ }),
/* 2 */
/***/ (function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_2__;

/***/ }),
/* 3 */
/***/ (function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_3__;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	if (true) {
	  module.exports = __webpack_require__(5);
	} else {
	  module.exports = require('./cjs/react-dom-server.browser.development.js');
	}


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

	/** @license React v16.9.0
	 * react-dom-server.browser.production.min.js
	 *
	 * Copyright (c) Facebook, Inc. and its affiliates.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 */

	'use strict';var l=__webpack_require__(6),m=__webpack_require__(3);function r(a){for(var b=a.message,d="https://reactjs.org/docs/error-decoder.html?invariant="+b,c=1;c<arguments.length;c++)d+="&args[]="+encodeURIComponent(arguments[c]);a.message="Minified React error #"+b+"; visit "+d+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings. ";return a}
	var t="function"===typeof Symbol&&Symbol.for,aa=t?Symbol.for("react.portal"):60106,v=t?Symbol.for("react.fragment"):60107,ba=t?Symbol.for("react.strict_mode"):60108,ca=t?Symbol.for("react.profiler"):60114,x=t?Symbol.for("react.provider"):60109,da=t?Symbol.for("react.context"):60110,ea=t?Symbol.for("react.concurrent_mode"):60111,fa=t?Symbol.for("react.forward_ref"):60112,A=t?Symbol.for("react.suspense"):60113,ha=t?Symbol.for("react.suspense_list"):60120,ia=t?Symbol.for("react.memo"):60115,ja=t?Symbol.for("react.lazy"):
	60116,ka=t?Symbol.for("react.fundamental"):60117;
	function B(a){if(null==a)return null;if("function"===typeof a)return a.displayName||a.name||null;if("string"===typeof a)return a;switch(a){case v:return"Fragment";case aa:return"Portal";case ca:return"Profiler";case ba:return"StrictMode";case A:return"Suspense";case ha:return"SuspenseList"}if("object"===typeof a)switch(a.$$typeof){case da:return"Context.Consumer";case x:return"Context.Provider";case fa:var b=a.render;b=b.displayName||b.name||"";return a.displayName||(""!==b?"ForwardRef("+b+")":"ForwardRef");
	case ia:return B(a.type);case ja:if(a=1===a._status?a._result:null)return B(a)}return null}var C=m.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;C.hasOwnProperty("ReactCurrentDispatcher")||(C.ReactCurrentDispatcher={current:null});C.hasOwnProperty("ReactCurrentBatchConfig")||(C.ReactCurrentBatchConfig={suspense:null});var la={};function D(a,b){for(var d=a._threadCount|0;d<=b;d++)a[d]=a._currentValue2,a._threadCount=d+1}
	function ma(a,b,d,c){if(c&&(c=a.contextType,"object"===typeof c&&null!==c))return D(c,d),c[d];if(a=a.contextTypes){d={};for(var f in a)d[f]=b[f];b=d}else b=la;return b}for(var E=new Uint16Array(16),G=0;15>G;G++)E[G]=G+1;E[15]=0;
	var na=/^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,oa=Object.prototype.hasOwnProperty,pa={},qa={};
	function ra(a){if(oa.call(qa,a))return!0;if(oa.call(pa,a))return!1;if(na.test(a))return qa[a]=!0;pa[a]=!0;return!1}function sa(a,b,d,c){if(null!==d&&0===d.type)return!1;switch(typeof b){case "function":case "symbol":return!0;case "boolean":if(c)return!1;if(null!==d)return!d.acceptsBooleans;a=a.toLowerCase().slice(0,5);return"data-"!==a&&"aria-"!==a;default:return!1}}
	function ta(a,b,d,c){if(null===b||"undefined"===typeof b||sa(a,b,d,c))return!0;if(c)return!1;if(null!==d)switch(d.type){case 3:return!b;case 4:return!1===b;case 5:return isNaN(b);case 6:return isNaN(b)||1>b}return!1}function I(a,b,d,c,f,e){this.acceptsBooleans=2===b||3===b||4===b;this.attributeName=c;this.attributeNamespace=f;this.mustUseProperty=d;this.propertyName=a;this.type=b;this.sanitizeURL=e}var J={};
	"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(a){J[a]=new I(a,0,!1,a,null,!1)});[["acceptCharset","accept-charset"],["className","class"],["htmlFor","for"],["httpEquiv","http-equiv"]].forEach(function(a){var b=a[0];J[b]=new I(b,1,!1,a[1],null,!1)});["contentEditable","draggable","spellCheck","value"].forEach(function(a){J[a]=new I(a,2,!1,a.toLowerCase(),null,!1)});
	["autoReverse","externalResourcesRequired","focusable","preserveAlpha"].forEach(function(a){J[a]=new I(a,2,!1,a,null,!1)});"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(a){J[a]=new I(a,3,!1,a.toLowerCase(),null,!1)});
	["checked","multiple","muted","selected"].forEach(function(a){J[a]=new I(a,3,!0,a,null,!1)});["capture","download"].forEach(function(a){J[a]=new I(a,4,!1,a,null,!1)});["cols","rows","size","span"].forEach(function(a){J[a]=new I(a,6,!1,a,null,!1)});["rowSpan","start"].forEach(function(a){J[a]=new I(a,5,!1,a.toLowerCase(),null,!1)});var K=/[\-:]([a-z])/g;function L(a){return a[1].toUpperCase()}
	"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(a){var b=a.replace(K,
	L);J[b]=new I(b,1,!1,a,null,!1)});"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(a){var b=a.replace(K,L);J[b]=new I(b,1,!1,a,"http://www.w3.org/1999/xlink",!1)});["xml:base","xml:lang","xml:space"].forEach(function(a){var b=a.replace(K,L);J[b]=new I(b,1,!1,a,"http://www.w3.org/XML/1998/namespace",!1)});["tabIndex","crossOrigin"].forEach(function(a){J[a]=new I(a,1,!1,a.toLowerCase(),null,!1)});
	J.xlinkHref=new I("xlinkHref",1,!1,"xlink:href","http://www.w3.org/1999/xlink",!0);["src","href","action","formAction"].forEach(function(a){J[a]=new I(a,1,!1,a.toLowerCase(),null,!0)});var ua=/["'&<>]/;
	function M(a){if("boolean"===typeof a||"number"===typeof a)return""+a;a=""+a;var b=ua.exec(a);if(b){var d="",c,f=0;for(c=b.index;c<a.length;c++){switch(a.charCodeAt(c)){case 34:b="&quot;";break;case 38:b="&amp;";break;case 39:b="&#x27;";break;case 60:b="&lt;";break;case 62:b="&gt;";break;default:continue}f!==c&&(d+=a.substring(f,c));f=c+1;d+=b}a=f!==c?d+a.substring(f,c):d}return a}
	function va(a,b){var d=J.hasOwnProperty(a)?J[a]:null;var c;if(c="style"!==a)c=null!==d?0===d.type:!(2<a.length)||"o"!==a[0]&&"O"!==a[0]||"n"!==a[1]&&"N"!==a[1]?!1:!0;if(c||ta(a,b,d,!1))return"";if(null!==d){a=d.attributeName;c=d.type;if(3===c||4===c&&!0===b)return a+'=""';d.sanitizeURL&&(b=""+b);return a+"="+('"'+M(b)+'"')}return ra(a)?a+"="+('"'+M(b)+'"'):""}var N=null,O=null,P=null,Q=!1,R=!1,T=null,U=0;function V(){if(null===N)throw r(Error(321));return N}
	function wa(){if(0<U)throw r(Error(312));return{memoizedState:null,queue:null,next:null}}function W(){null===P?null===O?(Q=!1,O=P=wa()):(Q=!0,P=O):null===P.next?(Q=!1,P=P.next=wa()):(Q=!0,P=P.next);return P}function xa(a,b,d,c){for(;R;)R=!1,U+=1,P=null,d=a(b,c);O=N=null;U=0;P=T=null;return d}function ya(a,b){return"function"===typeof b?b(a):b}
	function za(a,b,d){N=V();P=W();if(Q){var c=P.queue;b=c.dispatch;if(null!==T&&(d=T.get(c),void 0!==d)){T.delete(c);c=P.memoizedState;do c=a(c,d.action),d=d.next;while(null!==d);P.memoizedState=c;return[c,b]}return[P.memoizedState,b]}a=a===ya?"function"===typeof b?b():b:void 0!==d?d(b):b;P.memoizedState=a;a=P.queue={last:null,dispatch:null};a=a.dispatch=Aa.bind(null,N,a);return[P.memoizedState,a]}
	function Aa(a,b,d){if(!(25>U))throw r(Error(301));if(a===N)if(R=!0,a={action:d,next:null},null===T&&(T=new Map),d=T.get(b),void 0===d)T.set(b,a);else{for(b=d;null!==b.next;)b=b.next;b.next=a}}function Ba(){}
	var X=0,Ca={readContext:function(a){var b=X;D(a,b);return a[b]},useContext:function(a){V();var b=X;D(a,b);return a[b]},useMemo:function(a,b){N=V();P=W();b=void 0===b?null:b;if(null!==P){var d=P.memoizedState;if(null!==d&&null!==b){a:{var c=d[1];if(null===c)c=!1;else{for(var f=0;f<c.length&&f<b.length;f++){var e=b[f],h=c[f];if((e!==h||0===e&&1/e!==1/h)&&(e===e||h===h)){c=!1;break a}}c=!0}}if(c)return d[0]}}a=a();P.memoizedState=[a,b];return a},useReducer:za,useRef:function(a){N=V();P=W();var b=P.memoizedState;
	return null===b?(a={current:a},P.memoizedState=a):b},useState:function(a){return za(ya,a)},useLayoutEffect:function(){},useCallback:function(a){return a},useImperativeHandle:Ba,useEffect:Ba,useDebugValue:Ba,useResponder:function(a,b){return{props:b,responder:a}}},Da={html:"http://www.w3.org/1999/xhtml",mathml:"http://www.w3.org/1998/Math/MathML",svg:"http://www.w3.org/2000/svg"};
	function Ea(a){switch(a){case "svg":return"http://www.w3.org/2000/svg";case "math":return"http://www.w3.org/1998/Math/MathML";default:return"http://www.w3.org/1999/xhtml"}}
	var Fa={area:!0,base:!0,br:!0,col:!0,embed:!0,hr:!0,img:!0,input:!0,keygen:!0,link:!0,meta:!0,param:!0,source:!0,track:!0,wbr:!0},Ga=l({menuitem:!0},Fa),Y={animationIterationCount:!0,borderImageOutset:!0,borderImageSlice:!0,borderImageWidth:!0,boxFlex:!0,boxFlexGroup:!0,boxOrdinalGroup:!0,columnCount:!0,columns:!0,flex:!0,flexGrow:!0,flexPositive:!0,flexShrink:!0,flexNegative:!0,flexOrder:!0,gridArea:!0,gridRow:!0,gridRowEnd:!0,gridRowSpan:!0,gridRowStart:!0,gridColumn:!0,gridColumnEnd:!0,gridColumnSpan:!0,
	gridColumnStart:!0,fontWeight:!0,lineClamp:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,tabSize:!0,widows:!0,zIndex:!0,zoom:!0,fillOpacity:!0,floodOpacity:!0,stopOpacity:!0,strokeDasharray:!0,strokeDashoffset:!0,strokeMiterlimit:!0,strokeOpacity:!0,strokeWidth:!0},Ha=["Webkit","ms","Moz","O"];Object.keys(Y).forEach(function(a){Ha.forEach(function(b){b=b+a.charAt(0).toUpperCase()+a.substring(1);Y[b]=Y[a]})});
	var Ia=/([A-Z])/g,Ja=/^ms-/,Z=m.Children.toArray,Ka=C.ReactCurrentDispatcher,La={listing:!0,pre:!0,textarea:!0},Ma=/^[a-zA-Z][a-zA-Z:_\.\-\d]*$/,Na={},Oa={};function Pa(a){if(void 0===a||null===a)return a;var b="";m.Children.forEach(a,function(a){null!=a&&(b+=a)});return b}var Qa=Object.prototype.hasOwnProperty,Ra={children:null,dangerouslySetInnerHTML:null,suppressContentEditableWarning:null,suppressHydrationWarning:null};function Sa(a,b){if(void 0===a)throw r(Error(152),B(b)||"Component");}
	function Ta(a,b,d){function c(c,f){var e=f.prototype&&f.prototype.isReactComponent,g=ma(f,b,d,e),h=[],w=!1,p={isMounted:function(){return!1},enqueueForceUpdate:function(){if(null===h)return null},enqueueReplaceState:function(a,b){w=!0;h=[b]},enqueueSetState:function(a,b){if(null===h)return null;h.push(b)}},k=void 0;if(e)k=new f(c.props,g,p),"function"===typeof f.getDerivedStateFromProps&&(e=f.getDerivedStateFromProps.call(null,c.props,k.state),null!=e&&(k.state=l({},k.state,e)));else if(N={},k=f(c.props,
	g,p),k=xa(f,c.props,k,g),null==k||null==k.render){a=k;Sa(a,f);return}k.props=c.props;k.context=g;k.updater=p;p=k.state;void 0===p&&(k.state=p=null);if("function"===typeof k.UNSAFE_componentWillMount||"function"===typeof k.componentWillMount)if("function"===typeof k.componentWillMount&&"function"!==typeof f.getDerivedStateFromProps&&k.componentWillMount(),"function"===typeof k.UNSAFE_componentWillMount&&"function"!==typeof f.getDerivedStateFromProps&&k.UNSAFE_componentWillMount(),h.length){p=h;var q=
	w;h=null;w=!1;if(q&&1===p.length)k.state=p[0];else{e=q?p[0]:k.state;var y=!0;for(q=q?1:0;q<p.length;q++){var u=p[q];u="function"===typeof u?u.call(k,e,c.props,g):u;null!=u&&(y?(y=!1,e=l({},e,u)):l(e,u))}k.state=e}}else h=null;a=k.render();Sa(a,f);c=void 0;if("function"===typeof k.getChildContext&&(g=f.childContextTypes,"object"===typeof g)){c=k.getChildContext();for(var S in c)if(!(S in g))throw r(Error(108),B(f)||"Unknown",S);}c&&(b=l({},b,c))}for(;m.isValidElement(a);){var f=a,e=f.type;if("function"!==
	typeof e)break;c(f,e)}return{child:a,context:b}}
	var Ua=function(){function a(b,d){if(!(this instanceof a))throw new TypeError("Cannot call a class as a function");m.isValidElement(b)?b.type!==v?b=[b]:(b=b.props.children,b=m.isValidElement(b)?[b]:Z(b)):b=Z(b);b={type:null,domNamespace:Da.html,children:b,childIndex:0,context:la,footer:""};var c=E[0];if(0===c){var f=E;c=f.length;var e=2*c;if(!(65536>=e))throw r(Error(304));var h=new Uint16Array(e);h.set(f);E=h;E[0]=c+1;for(f=c;f<e-1;f++)E[f]=f+1;E[e-1]=0}else E[0]=E[c];this.threadID=c;this.stack=
	[b];this.exhausted=!1;this.currentSelectValue=null;this.previousWasTextNode=!1;this.makeStaticMarkup=d;this.suspenseDepth=0;this.contextIndex=-1;this.contextStack=[];this.contextValueStack=[]}a.prototype.destroy=function(){if(!this.exhausted){this.exhausted=!0;this.clearProviders();var a=this.threadID;E[a]=E[0];E[0]=a}};a.prototype.pushProvider=function(a){var b=++this.contextIndex,c=a.type._context,f=this.threadID;D(c,f);var e=c[f];this.contextStack[b]=c;this.contextValueStack[b]=e;c[f]=a.props.value};
	a.prototype.popProvider=function(){var a=this.contextIndex,d=this.contextStack[a],c=this.contextValueStack[a];this.contextStack[a]=null;this.contextValueStack[a]=null;this.contextIndex--;d[this.threadID]=c};a.prototype.clearProviders=function(){for(var a=this.contextIndex;0<=a;a--)this.contextStack[a][this.threadID]=this.contextValueStack[a]};a.prototype.read=function(a){if(this.exhausted)return null;var b=X;X=this.threadID;var c=Ka.current;Ka.current=Ca;try{for(var f=[""],e=!1;f[0].length<a;){if(0===
	this.stack.length){this.exhausted=!0;var h=this.threadID;E[h]=E[0];E[0]=h;break}var g=this.stack[this.stack.length-1];if(e||g.childIndex>=g.children.length){var H=g.footer;""!==H&&(this.previousWasTextNode=!1);this.stack.pop();if("select"===g.type)this.currentSelectValue=null;else if(null!=g.type&&null!=g.type.type&&g.type.type.$$typeof===x)this.popProvider(g.type);else if(g.type===A){this.suspenseDepth--;var F=f.pop();if(e){e=!1;var n=g.fallbackFrame;if(!n)throw r(Error(303));this.stack.push(n);
	f[this.suspenseDepth]+="\x3c!--$!--\x3e";continue}else f[this.suspenseDepth]+=F}f[this.suspenseDepth]+=H}else{var w=g.children[g.childIndex++],p="";try{p+=this.render(w,g.context,g.domNamespace)}catch(k){throw k;}finally{}f.length<=this.suspenseDepth&&f.push("");f[this.suspenseDepth]+=p}}return f[0]}finally{Ka.current=c,X=b}};a.prototype.render=function(a,d,c){if("string"===typeof a||"number"===typeof a){c=""+a;if(""===c)return"";if(this.makeStaticMarkup)return M(c);if(this.previousWasTextNode)return"\x3c!-- --\x3e"+
	M(c);this.previousWasTextNode=!0;return M(c)}d=Ta(a,d,this.threadID);a=d.child;d=d.context;if(null===a||!1===a)return"";if(!m.isValidElement(a)){if(null!=a&&null!=a.$$typeof){c=a.$$typeof;if(c===aa)throw r(Error(257));throw r(Error(258),c.toString());}a=Z(a);this.stack.push({type:null,domNamespace:c,children:a,childIndex:0,context:d,footer:""});return""}var b=a.type;if("string"===typeof b)return this.renderDOM(a,d,c);switch(b){case ba:case ea:case ca:case ha:case v:return a=Z(a.props.children),this.stack.push({type:null,
	domNamespace:c,children:a,childIndex:0,context:d,footer:""}),"";case A:throw r(Error(294));}if("object"===typeof b&&null!==b)switch(b.$$typeof){case fa:N={};var e=b.render(a.props,a.ref);e=xa(b.render,a.props,e,a.ref);e=Z(e);this.stack.push({type:null,domNamespace:c,children:e,childIndex:0,context:d,footer:""});return"";case ia:return a=[m.createElement(b.type,l({ref:a.ref},a.props))],this.stack.push({type:null,domNamespace:c,children:a,childIndex:0,context:d,footer:""}),"";case x:return b=Z(a.props.children),
	c={type:a,domNamespace:c,children:b,childIndex:0,context:d,footer:""},this.pushProvider(a),this.stack.push(c),"";case da:b=a.type;e=a.props;var h=this.threadID;D(b,h);b=Z(e.children(b[h]));this.stack.push({type:a,domNamespace:c,children:b,childIndex:0,context:d,footer:""});return"";case ka:throw r(Error(338));case ja:throw r(Error(295));}throw r(Error(130),null==b?b:typeof b,"");};a.prototype.renderDOM=function(a,d,c){var b=a.type.toLowerCase();c===Da.html&&Ea(b);if(!Na.hasOwnProperty(b)){if(!Ma.test(b))throw r(Error(65),
	b);Na[b]=!0}var e=a.props;if("input"===b)e=l({type:void 0},e,{defaultChecked:void 0,defaultValue:void 0,value:null!=e.value?e.value:e.defaultValue,checked:null!=e.checked?e.checked:e.defaultChecked});else if("textarea"===b){var h=e.value;if(null==h){h=e.defaultValue;var g=e.children;if(null!=g){if(null!=h)throw r(Error(92));if(Array.isArray(g)){if(!(1>=g.length))throw r(Error(93));g=g[0]}h=""+g}null==h&&(h="")}e=l({},e,{value:void 0,children:""+h})}else if("select"===b)this.currentSelectValue=null!=
	e.value?e.value:e.defaultValue,e=l({},e,{value:void 0});else if("option"===b){g=this.currentSelectValue;var H=Pa(e.children);if(null!=g){var F=null!=e.value?e.value+"":H;h=!1;if(Array.isArray(g))for(var n=0;n<g.length;n++){if(""+g[n]===F){h=!0;break}}else h=""+g===F;e=l({selected:void 0,children:void 0},e,{selected:h,children:H})}}if(h=e){if(Ga[b]&&(null!=h.children||null!=h.dangerouslySetInnerHTML))throw r(Error(137),b,"");if(null!=h.dangerouslySetInnerHTML){if(null!=h.children)throw r(Error(60));
	if(!("object"===typeof h.dangerouslySetInnerHTML&&"__html"in h.dangerouslySetInnerHTML))throw r(Error(61));}if(null!=h.style&&"object"!==typeof h.style)throw r(Error(62),"");}h=e;g=this.makeStaticMarkup;H=1===this.stack.length;F="<"+a.type;for(z in h)if(Qa.call(h,z)){var w=h[z];if(null!=w){if("style"===z){n=void 0;var p="",k="";for(n in w)if(w.hasOwnProperty(n)){var q=0===n.indexOf("--"),y=w[n];if(null!=y){if(q)var u=n;else if(u=n,Oa.hasOwnProperty(u))u=Oa[u];else{var S=u.replace(Ia,"-$1").toLowerCase().replace(Ja,
	"-ms-");u=Oa[u]=S}p+=k+u+":";k=n;q=null==y||"boolean"===typeof y||""===y?"":q||"number"!==typeof y||0===y||Y.hasOwnProperty(k)&&Y[k]?(""+y).trim():y+"px";p+=q;k=";"}}w=p||null}n=null;b:if(q=b,y=h,-1===q.indexOf("-"))q="string"===typeof y.is;else switch(q){case "annotation-xml":case "color-profile":case "font-face":case "font-face-src":case "font-face-uri":case "font-face-format":case "font-face-name":case "missing-glyph":q=!1;break b;default:q=!0}q?Ra.hasOwnProperty(z)||(n=z,n=ra(n)&&null!=w?n+"="+
	('"'+M(w)+'"'):""):n=va(z,w);n&&(F+=" "+n)}}g||H&&(F+=' data-reactroot=""');var z=F;h="";Fa.hasOwnProperty(b)?z+="/>":(z+=">",h="</"+a.type+">");a:{g=e.dangerouslySetInnerHTML;if(null!=g){if(null!=g.__html){g=g.__html;break a}}else if(g=e.children,"string"===typeof g||"number"===typeof g){g=M(g);break a}g=null}null!=g?(e=[],La[b]&&"\n"===g.charAt(0)&&(z+="\n"),z+=g):e=Z(e.children);a=a.type;c=null==c||"http://www.w3.org/1999/xhtml"===c?Ea(a):"http://www.w3.org/2000/svg"===c&&"foreignObject"===a?"http://www.w3.org/1999/xhtml":
	c;this.stack.push({domNamespace:c,type:b,children:e,childIndex:0,context:d,footer:h});this.previousWasTextNode=!1;return z};return a}(),Va={renderToString:function(a){a=new Ua(a,!1);try{return a.read(Infinity)}finally{a.destroy()}},renderToStaticMarkup:function(a){a=new Ua(a,!0);try{return a.read(Infinity)}finally{a.destroy()}},renderToNodeStream:function(){throw r(Error(207));},renderToStaticNodeStream:function(){throw r(Error(208));},version:"16.9.0"},Wa={default:Va},Xa=Wa&&Va||
	Wa;module.exports=Xa.default||Xa;


/***/ }),
/* 6 */
/***/ (function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_6__;

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	// Libraries
	var React = __webpack_require__(3);

	// RVG Elements

	var _require = __webpack_require__(8),
	    SVG = _require.SVG,
	    Text = _require.Text,
	    Rectangle = _require.Rectangle,
	    Circle = _require.Circle,
	    Ellipse = _require.Ellipse,
	    Line = _require.Line,
	    Path = _require.Path,
	    LinearGradient = _require.LinearGradient;

	var DraggableBase = function (_React$Component) {
	  _inherits(DraggableBase, _React$Component);

	  function DraggableBase(props) {
	    _classCallCheck(this, DraggableBase);

	    var _this = _possibleConstructorReturn(this, (DraggableBase.__proto__ || Object.getPrototypeOf(DraggableBase)).call(this, props));

	    _this.draggableProps = {};
	    if (_this.props.draggable) {
	      _this.draggableProps = {
	        'data-draggable': true,
	        style: {
	          cursor: 'move'
	        }
	      };
	    } else {
	      _this.draggableProps = {
	        style: {
	          'pointerEvents': 'none'
	        }
	      };
	    }
	    return _this;
	  }

	  return DraggableBase;
	}(React.Component);

	var Image = function (_DraggableBase) {
	  _inherits(Image, _DraggableBase);

	  function Image() {
	    _classCallCheck(this, Image);

	    return _possibleConstructorReturn(this, (Image.__proto__ || Object.getPrototypeOf(Image)).apply(this, arguments));
	  }

	  _createClass(Image, [{
	    key: 'render',
	    value: function render() {
	      var _props = this.props,
	          x = _props.x,
	          y = _props.y,
	          height = _props.height,
	          width = _props.width,
	          href = _props.href,
	          opacity = _props.opacity,
	          id = _props.id,
	          preserveAspectRatio = _props.preserveAspectRatio;


	      return React.createElement('image', _extends({
	        id: id,
	        xlinkHref: href,
	        x: x,
	        y: y,
	        height: height,
	        width: width,
	        preserveAspectRatio: preserveAspectRatio || "xMinYMin meet",
	        opacity: opacity
	      }, this.draggableProps));
	    }
	  }]);

	  return Image;
	}(DraggableBase);

	/**
	 * @name Card
	 * @class The Card React element
	 */

	var Card = function (_React$Component2) {
	  _inherits(Card, _React$Component2);

	  function Card() {
	    _classCallCheck(this, Card);

	    return _possibleConstructorReturn(this, (Card.__proto__ || Object.getPrototypeOf(Card)).apply(this, arguments));
	  }

	  _createClass(Card, [{
	    key: 'calculateYPosition',


	    /**
	     * Calculates the Y position of an element based on any attachments etc.
	     * @param {object} layers - The object of all layers
	     * @param {object} layer - The layer to calculate the Y position for
	     * @return {integer} The Y position
	     */
	    value: function calculateYPosition(layers, layer) {
	      // Get the layer's currently configured Y position
	      var attachYLayerPosition = this.getLayerValue(layers, layer, 'y');

	      console.log('calculateYPos', { layers: layers, layer: layer });

	      // If this is an object and has the attach property
	      if ((typeof attachYLayerPosition === 'undefined' ? 'undefined' : _typeof(attachYLayerPosition)) === 'object' && attachYLayerPosition.attach !== 'undefined') {
	        // Get the layer to attach to
	        // let attachYLayer = layers[layer.y.attach];
	        var attachYLayer = layers.find(function (l) {
	          console.log('finding...', l.name, layer.y.attach);
	          return l.name === layer.y.attach;
	        });
	        console.log({ attachYLayer: attachYLayer });

	        // Calculate the Y offset
	        var attachYLayerHeight = 0;
	        switch (attachYLayer.type) {
	          case 'text':
	            var attachYLayerText = attachYLayer.text.split('\n');
	            if (attachYLayer.text !== '') {
	              attachYLayerHeight = attachYLayerText.length * (this.getLayerValue(layers, attachYLayer, 'lineHeight') || this.getLayerValue(layers, attachYLayer, 'fontSize'));
	            }
	            break;
	          default:
	            if (typeof this.getLayerValue(layers, attachYLayer, 'height') !== 'undefined') {
	              attachYLayerHeight = this.getLayerValue(layers, attachYLayer, 'height');
	            }
	            break;
	        }

	        // Add any additionally configured offset value
	        var attachYLayerOffset = layer.y.offset || 0;

	        // Add them together and recursively call this function if the next layer has an attachment
	        attachYLayerPosition = attachYLayerHeight + this.calculateYPosition(layers, attachYLayer) + attachYLayerOffset;
	      }

	      // Return the value
	      return attachYLayerPosition;
	    }

	    /**
	     * Returns the value for a given layer property
	     * @param {object} layers - The object of all layers
	     * @param {object} layer - The layer to get the value for
	     * @param {object} key - The key of the value to get from the layer
	     *
	     * @return {mixed} The value of the property on the layer
	     */

	  }, {
	    key: 'getLayerValue',
	    value: function getLayerValue(layers, layer, key) {
	      if (typeof layer[key] === 'function') {
	        return layer[key](layers, this.refs.svg);
	      }
	      console.log('getLayerValue', layer[key]);
	      return layer[key];
	    }

	    /**
	     * Compute the gradient elements to render to the <defs> element
	     * @param {object} layers - The configuration object representing the layers that may require gradients
	     *
	     * @return {array} An array of React elements to render to the <defs> element
	     */

	  }, {
	    key: 'computeGradients',
	    value: function computeGradients(layers) {
	      var _this4 = this;

	      var array = [];
	      var layer = void 0,
	          gradient = void 0;

	      Object.keys(layers).forEach(function (key) {
	        layer = layers[key];

	        if (_this4.getLayerValue(layers, layer, 'gradient')) {
	          gradient = _this4.getLayerValue(layers, layer, 'gradient');

	          array.push(React.createElement(LinearGradient, { key: key,
	            name: key,
	            x1: 0, x2: 0,
	            y1: 0, y2: 1,
	            stops: gradient }));
	        }
	      });

	      return array;
	    }

	    /**
	     * Compute the layers to render on the Card
	     * @param {object} layers - The configuration object representing the layers to render
	     *
	     * @return {array} An array of React elements to render on the card
	     */

	  }, {
	    key: 'computeLayers',
	    value: function computeLayers(layers) {
	      var _this5 = this;

	      var array = [];
	      var layer = void 0;

	      // Iterate over the layers
	      Object.keys(layers).forEach(function (key) {
	        layer = layers[key];
	        console.log('layer key', { key: key, layers: layers, layer: layer });

	        // If the layer is hidden, ignore it
	        if (_this5.getLayerValue(layers, layer, 'hidden') === true) {
	          return;
	        };

	        // Setup an object to contain our layer data
	        var layerData = {};
	        var layout = _this5.props.configuration.name;
	        var layerOptions = _this5.props.configuration.template.layerItems[layout][key].settings;
	        console.log({ layerOptions: layerOptions });

	        // Iterate over the properties of the layer, and compute the value (handles getters, functions, and object implementations such as `y`)
	        Object.keys(layer).forEach(function (k) {
	          layerData[k] = _this5.getLayerValue(layers, layer, k);
	        });

	        // Make the fill value map to a gradient name, if a gradient has been configured
	        // See computeGradients() for the creation of gradient definitions
	        if (_this5.getLayerValue(layers, layer, 'gradient')) {
	          layerData.fill = 'url(#' + key + ')';
	        }

	        // Switch over the layer type to ensure we create the card correctly
	        switch (layer.type) {
	          case 'text':
	            // Split by newline
	            var text = layerData.text.split('\n');

	            array.push(React.createElement(
	              Text,
	              {
	                x: layerOptions.x || layerData.x,
	                y: layerOptions.y || _this5.calculateYPosition(layers, layerData),
	                fontFamily: layerData.fontFamily,
	                fontSize: layerData.fontSize,
	                fontWeight: layerData.fontWeight,
	                lineHeight: layerData.lineHeight,
	                textAnchor: layerData.textAnchor,
	                fill: layerOptions.fill || layerData.fill,
	                draggable: layerData.draggable,
	                transform: layerData.transform,
	                opacity: layerData.opacity,
	                smartQuotes: layerData.smartQuotes,
	                key: key
	              },
	              text
	            ));
	            break;
	          case 'image':
	            array.push(React.createElement(Image, {
	              x: layerOptions.x || layerData.x,
	              y: layerOptions.y || _this5.calculateYPosition(layers, layerData),
	              href: layerOptions.src || layerData.src,
	              height: layerOptions.height || layerData.height,
	              width: layerOptions.width || layerData.width,
	              draggable: layerData.draggable,
	              transform: layerData.transform,
	              opacity: layerOptions.opacity || layerData.opacity,
	              preserveAspectRatio: layerData.preserveAspectRatio,
	              key: key
	            }));
	            break;

	          case 'overlayImage':
	            array.push(React.createElement(Image, {
	              x: layerOptions.x || layerData.x,
	              y: layerOptions.y || _this5.calculateYPosition(layers, layerData),
	              href: layerOptions.src || layerData.src,
	              height: layerOptions.height || layerData.height,
	              width: layerOptions.width || layerData.width,
	              draggable: layerData.draggable,
	              transform: layerData.transform,
	              opacity: layerData.opacity,
	              preserveAspectRatio: layerData.preserveAspectRatio,
	              key: key
	            }));
	            break;

	          case 'cropped_image':
	            array.push(React.createElement(
	              'g',
	              { key: 'group-key-' + key },
	              React.createElement(
	                'defs',
	                null,
	                React.createElement(
	                  'clipPath',
	                  { id: 'crop-' + layerOptions.label },
	                  React.createElement('rect', {
	                    id: 'crop-rect-' + layerOptions.label,
	                    x: layerOptions.x,
	                    y: layerOptions.y,
	                    width: layerOptions.width,
	                    height: layerOptions.height
	                  })
	                )
	              ),
	              React.createElement(
	                'g',
	                { clipPath: 'url(#crop-' + layerOptions.label + ')' },
	                React.createElement('rect', {
	                  width: '100%',
	                  height: '100%',
	                  fill: '#ccc'
	                }),
	                React.createElement(Image, {
	                  id: 'image-cropped-' + layerOptions.label,
	                  x: layerData.x,
	                  y: _this5.calculateYPosition(layers, layerData),
	                  href: layerData.src,
	                  height: layerData.height,
	                  width: layerData.width,
	                  draggable: layerData.draggable,
	                  transform: layerData.transform,
	                  opacity: layerData.opacity,
	                  key: 'cropped-image-key-' + key
	                })
	              )
	            ));
	            break;

	          case 'cropped_image_circle':
	            array.push(React.createElement(
	              'g',
	              { key: 'group-key-' + key },
	              React.createElement(
	                'defs',
	                null,
	                React.createElement(
	                  'clipPath',
	                  { id: 'crop-' + layerOptions.label },
	                  React.createElement('circle', {
	                    id: 'crop-rect-' + layerOptions.label,
	                    cx: layerOptions.cx || 0,
	                    cy: layerOptions.cy || 0,
	                    r: layerOptions.r || 0
	                    // x={ layerOptions.x }
	                    // y={ layerOptions.y }
	                    // width={ layerOptions.width }
	                    // height={ layerOptions.height }
	                  })
	                )
	              ),
	              React.createElement(
	                'g',
	                { clipPath: 'url(#crop-' + layerOptions.label + ')' },
	                React.createElement('rect', {
	                  width: '100%',
	                  height: '100%',
	                  fill: '#ccc'
	                }),
	                React.createElement(Image, {
	                  id: 'image-cropped-' + layerOptions.label,
	                  x: layerData.x,
	                  y: _this5.calculateYPosition(layers, layerData),
	                  href: layerData.src,
	                  height: layerData.height,
	                  width: layerData.width,
	                  draggable: layerData.draggable,
	                  transform: layerData.transform,
	                  opacity: layerData.opacity,
	                  key: 'cropped-image-key-' + key
	                })
	              )
	            ));
	            break;

	          case 'clip_half_left':
	            array.push(React.createElement(
	              'g',
	              { key: 'group-key-' + key },
	              React.createElement(
	                'defs',
	                null,
	                React.createElement(
	                  'clipPath',
	                  { id: 'clip-half-left-' + layerOptions.label },
	                  React.createElement('rect', {
	                    id: 'rect-half-left-' + layerOptions.label,
	                    x: layerOptions.x,
	                    y: layerOptions.y,
	                    width: layerOptions.width,
	                    height: layerOptions.height
	                  })
	                )
	              ),
	              React.createElement(
	                'g',
	                { clipPath: 'url(#clip-half-left-' + layerOptions.label + ')' },
	                React.createElement('rect', {
	                  width: '100%',
	                  height: '100%',
	                  fill: '#ccc'
	                }),
	                React.createElement(Image, {
	                  id: 'image-half-left-' + layerOptions.label,
	                  x: layerData.x,
	                  y: _this5.calculateYPosition(layers, layerData),
	                  href: layerData.src,
	                  height: layerData.height,
	                  width: layerData.width,
	                  draggable: layerData.draggable,
	                  transform: layerData.transform,
	                  opacity: layerData.opacity,
	                  key: 'image-key-' + key
	                })
	              )
	            ));
	            break;

	          case 'clip_half_right':
	            array.push(React.createElement(
	              'g',
	              null,
	              React.createElement(
	                'defs',
	                null,
	                React.createElement(
	                  'clipPath',
	                  { id: 'clip-half-right' },
	                  React.createElement('rect', {
	                    id: 'rect-half-right',
	                    x: '51%',
	                    y: '0',
	                    width: '49%',
	                    height: '100%'
	                  })
	                )
	              ),
	              React.createElement(
	                'g',
	                { clipPath: 'url(#clip-half-right)' },
	                React.createElement('rect', {
	                  width: '100%',
	                  height: '100%',
	                  fill: '#bada55'
	                }),
	                React.createElement(Image, {
	                  id: 'image-half-right',
	                  x: layerData.x,
	                  y: _this5.calculateYPosition(layers, layerData),
	                  href: layerData.src,
	                  height: layerData.height,
	                  width: layerData.width,
	                  draggable: layerData.draggable,
	                  transform: layerData.transform,
	                  opacity: layerData.opacity,
	                  key: key
	                })
	              )
	            ));
	            break;

	          case 'rectangle':
	            array.push(React.createElement(Rectangle, {
	              x: layerOptions.x || layerData.x,
	              y: layerOptions.y || _this5.calculateYPosition(layers, layerData),
	              fill: layerOptions.fill || layerData.fill,
	              height: layerOptions.height || layerData.height,
	              width: layerOptions.width || layerData.width,
	              draggable: layerOptions.draggable || layerData.draggable,
	              transform: layerOptions.transform || layerData.transform,
	              key: key
	            }));
	            break;
	          case 'circle':
	            array.push(React.createElement(Circle, { x: layerData.x,
	              y: _this5.calculateYPosition(layers, layerData),
	              fill: layerData.fill,
	              radius: layerData.radius,
	              draggable: layerData.draggable,
	              transform: layerData.transform,
	              key: key }));
	            break;
	          case 'ellipse':
	            array.push(React.createElement(Ellipse, { x: layerData.x,
	              y: _this5.calculateYPosition(layers, layerData),
	              fill: layerData.fill,
	              radiusX: layerData.radiusX,
	              radiusY: layerData.radiusY,
	              draggable: layerData.draggable,
	              transform: layerData.transform,
	              key: key }));
	            break;
	          case 'line':
	            array.push(React.createElement(Line, { x: [layerData.x1, layerData.x2],
	              y: [layerData.y1, layerData.y2],
	              stroke: layerData.stroke || layerData.fill,
	              draggable: layerData.draggable,
	              transform: layerData.transform,
	              key: key }));
	            break;
	          case 'path':
	            array.push(React.createElement(Path, { d: layerData.path || layerData.d,
	              fill: layerData.fill,
	              draggable: layerData.draggable,
	              transform: layerData.transform,
	              key: key }));
	            break;
	        }
	      });

	      return array;
	    }

	    /**
	     * Compute the fonts needed for the card
	     * @param {object} fonts - The fonts to use when rendering this card
	     *
	     * @return {array} An array of React elements to render in the <defs /> element of the SVG
	     */

	  }, {
	    key: 'computeFonts',
	    value: function computeFonts() {
	      var fonts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

	      return Object.keys(fonts).map(function (key, index) {
	        var src = fonts[key];
	        var format = 'svg';
	        if (_typeof(fonts[key]) === 'object') {
	          src = fonts[key].src;
	          format = fonts[key].format || 'svg';
	        }

	        return React.createElement(
	          'style',
	          { key: index },
	          '@font-face {\n              font-family: \'' + key + '\';\n              src: url("' + src + '") format("' + format + '");\n              font-weight: normal;\n              font-style: normal;\n          }'
	        );
	      });
	    }

	    /**
	     * Renders the card
	     * @return {object} JSX for the React Component
	     */

	  }, {
	    key: 'render',
	    value: function render() {
	      // Grab our configuration
	      var _props$configuration = this.props.configuration,
	          card = _props$configuration.card,
	          fonts = _props$configuration.fonts,
	          layers = _props$configuration.layers;

	      console.log('card props', this.props);
	      // Compute layers, gradients and fonts
	      var layerArray = this.computeLayers(layers);
	      var gradientsArray = this.computeGradients(layers);
	      var fontsArray = this.computeFonts(fonts);

	      // Return
	      return React.createElement(
	        'div',
	        { className: 'card', ref: 'svg', style: { maxWidth: card.width, maxHeight: card.height } },
	        React.createElement(
	          SVG,
	          { height: card.height, width: card.width, fill: card.fill },
	          React.createElement(
	            'defs',
	            null,
	            fontsArray,
	            gradientsArray
	          ),
	          layerArray
	        )
	      );
	    }
	  }]);

	  return Card;
	}(React.Component);

	Card.propTypes = {
	  configuration: React.PropTypes.shape({
	    card: React.PropTypes.object,
	    fonts: React.PropTypes.object,
	    layers: React.PropTypes.object
	  })

	  // Export
	};module.exports = Card;

/***/ }),
/* 8 */
/***/ (function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_8__;

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	// Dependencies
	var CardKit = __webpack_require__(10);

	/**
	 * @name CardKitRenderer
	 * @class
	 */

	var CardKitRenderer = function () {

	  /**
	   * Constructor takes in an instance of CardKit and stores it for later user
	   *
	   * @param {CardKit} cardkit - An instance of CardKit
	   */
	  function CardKitRenderer(cardkit) {
	    _classCallCheck(this, CardKitRenderer);

	    // Ensure we recieve a CardKit object
	    if (!cardkit) {
	      throw new Error('An instance of CardKit was not provided');
	    }

	    // Validate the instance of CardKit supplied is good
	    if (!(cardkit instanceof CardKit) && cardkit.constructor.name !== 'CardKit') {
	      throw new Error('Invalid CardKit object provided');
	    }

	    this.cardkit = cardkit;

	    this.cardkit.addRenderer(this);
	  }

	  /**
	   * Re-render
	   */


	  _createClass(CardKitRenderer, [{
	    key: 'rerender',
	    value: function rerender() {
	      return;
	    }

	    /**
	     * Compute the configuration of the supplied CardKit object
	     *
	     * @param {object} options - The options to compute the configuration with
	     *
	     * @return {object} The configuration object
	     */

	  }, {
	    key: 'computeConfiguration',
	    value: function computeConfiguration() {
	      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

	      return this.cardkit.computeConfiguration(options);
	    }
	  }]);

	  return CardKitRenderer;
	}();

	module.exports = CardKitRenderer;

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var deepExtend = __webpack_require__(11);

	/**
	 * @name CardKit
	 * @class Core CardKit class used for managing a single card instance
	 */

	var CardKit = function () {

	  /**
	   * Constructor takes in the configuration and stores it for later user
	   *
	   * @param {object} configuration - The configuration object to initialise the CardKit image with.
	   * @param {object} options - The additional options for use
	   */
	  function CardKit(configuration) {
	    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

	    _classCallCheck(this, CardKit);

	    if (!configuration) {
	      throw new Error('A configuration object was not provided');
	    }

	    if (!this._isValidConfiguration(configuration)) {
	      throw new Error('Invalid configuration object provided');
	    }

	    // Store the configuration
	    this.configuration = configuration;

	    // Configure the options
	    this._configureOptions(options);

	    // Setup an empty array of renderers
	    this.renderers = [];
	  }

	  /**
	   * Configures the supplied options on this instance of CardKit
	   *
	   * @param {object} options - The options to configure
	   */


	  _createClass(CardKit, [{
	    key: '_configureOptions',
	    value: function _configureOptions(options) {
	      if (options) {
	        if (options.templates) {
	          if (!this._isValidTemplatesConfiguration(options.templates)) {
	            throw new Error('Invalid templates configuration object provided');
	          }
	          this.templates = options.templates;
	        } else {
	          this.templates = null;
	        }

	        if (options.themes) {
	          if (!this._isValidThemesConfiguration(options.themes)) {
	            throw new Error('Invalid themes configuration object provided');
	          }
	          this.themes = options.themes;
	        } else {
	          this.themes = null;
	        }
	        if (options.layouts) {
	          if (!this._isValidLayoutsConfiguration(options.layouts)) {
	            throw new Error('Invalid layouts configuration object provided');
	          }
	          this.layouts = options.layouts;
	        } else {
	          this.layouts = null;
	        }

	        if (options.defaultLayout) {
	          this.defaultLayout = options.defaultLayout;
	        } else {
	          this.defaultLayout = null;
	        }
	      }
	    }

	    /**
	     * Validates the provided configuration object
	     *
	     * @param {object} configuration - The configuration object to validate
	     *
	     * @return {boolean} Is the configuration object valid
	     */

	  }, {
	    key: '_isValidConfiguration',
	    value: function _isValidConfiguration(configuration) {
	      return (typeof configuration === 'undefined' ? 'undefined' : _typeof(configuration)) === 'object' && // Should be an object
	      typeof configuration.card !== 'undefined' && // Should have a card property
	      _typeof(configuration.card) === 'object' && // Card property should be an object
	      typeof configuration.card.height !== 'undefined' && // Should have a height
	      typeof configuration.card.width !== 'undefined'; // Should have a width
	    }

	    /**
	     * Validates the provided templates configuration object
	     *
	     * @param {object} configuration - The templates configuration object to validate
	     *
	     * @return {boolean} Is the templates configuration object valid
	     */

	  }, {
	    key: '_isValidTemplatesConfiguration',
	    value: function _isValidTemplatesConfiguration(templates) {
	      return (typeof templates === 'undefined' ? 'undefined' : _typeof(templates)) === 'object'; // Should be an object
	    }

	    /**
	     * Validates the provided themes configuration object
	     *
	     * @param {object} configuration - The themes configuration object to validate
	     *
	     * @return {boolean} Is the themes configuration object valid
	     */

	  }, {
	    key: '_isValidThemesConfiguration',
	    value: function _isValidThemesConfiguration(themes) {
	      return (typeof themes === 'undefined' ? 'undefined' : _typeof(themes)) === 'object'; // Should be an object
	    }

	    /**
	     * Validates the provided layouts configuration object
	     *
	     * @param {object} configuration - The layouts configuration object to validate
	     *
	     * @return {boolean} Is the layouts configuration object valid
	     */

	  }, {
	    key: '_isValidLayoutsConfiguration',
	    value: function _isValidLayoutsConfiguration(layouts) {
	      return (typeof layouts === 'undefined' ? 'undefined' : _typeof(layouts)) === 'object'; // Should be an object
	    }

	    /**
	     * Validates the supplied renderer
	     *
	     * @param {object} renderer - The renderer to validate
	     *
	     * @return {boolean} If the renderer is valid
	     */

	  }, {
	    key: '_isValidRenderer',
	    value: function _isValidRenderer(renderer) {
	      return renderer.cardkit === this;
	    }

	    /**
	     * Compute the configuration
	     *
	     * @param {object} options - Any options (e.g. a specific theme and / or layout) to use when computing the configuration
	     *
	     * @return {object} The computed configuration
	     */

	  }, {
	    key: 'computeConfiguration',
	    value: function computeConfiguration() {
	      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

	      // Get the base configuration
	      var configuration = Object.assign({}, this.configuration);

	      // If we got options supplied
	      if (options) {
	        if (options.template && typeof this.templates[options.template] !== 'undefined') {
	          // Get the template based on the name and merge it onto the base configuration
	          configuration = deepExtend(configuration, this.templates[options.template]);
	        }

	        if (options.theme && typeof this.themes[options.theme] !== 'undefined') {
	          // Get the theme based on the name and merge it onto the base configuration
	          configuration = deepExtend(configuration, this.themes[options.theme]);
	        }

	        if (options.layout && typeof this.layouts[options.layout] !== 'undefined') {
	          // Get the layout based on the name and merge it onto the base configuration
	          configuration = deepExtend(configuration, this.layouts[options.layout]);
	        }

	        if (options.activeLayout && typeof this.layoutsactiveLayout !== 'undefined') {
	          // Get the default layout (image size) to render nad add into the base configuration
	          configuration = deepExtend(configuration, this.layoutsactiveLayout);
	        }
	      }

	      // Return the computed configuration
	      return configuration;
	    }

	    /**
	     * Updates the configuration, and optionally rerenders the image (if previously rendered)
	     *
	     * @param {object} configuration - The configuration object to update to
	     * @param {object} options - Any options to supply (templates, themes, layouts)
	     * @param {boolean} rerender - Whether or not to attempt to rerender the image
	     */

	  }, {
	    key: 'updateConfiguration',
	    value: function updateConfiguration(configuration) {
	      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {
	        layouts: null,
	        templates: null,
	        themes: null
	        // defaultTemplate: '4x3',
	      };
	      var rerender = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

	      this.configuration = configuration;

	      this._configureOptions(options);

	      if (rerender) {
	        var renderers = this.getRenderers();

	        renderers.forEach(function (renderer) {
	          switch (renderer.constructor.name) {
	            case 'CardKitDOM':
	              renderer.rerender();
	              break;
	          }
	        });
	      }
	    }

	    /**
	     * Get the renderers
	     *
	     * @return {array} The configured renderers
	     */

	  }, {
	    key: 'getRenderers',
	    value: function getRenderers() {
	      return this.renderers;
	    }

	    /**
	     * Add a renderer
	     *
	     * @param {object} renderer - A renderer to add
	     */

	  }, {
	    key: 'addRenderer',
	    value: function addRenderer(renderer) {
	      if (!this._isValidRenderer(renderer)) {
	        throw new Error('Invalid renderer object provided');
	      }

	      this.renderers.push(renderer);
	    }
	  }]);

	  return CardKit;
	}();

	// Export it


	module.exports = CardKit;

	// Add it to the window object if we have one
	if (typeof window !== 'undefined') {
	  window.CardKit = CardKit;
	}

/***/ }),
/* 11 */
/***/ (function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_11__;

/***/ }),
/* 12 */
/***/ (function(module, exports) {

	'use strict';

	module.exports = {
	  /**
	   * Converts the supplied string into a slug and returns it
	   *
	   * @param {string} string - The string to slugify
	   * @return {string} The slugified string
	   */
	  slugify: function slugify(string) {
	    return string.toString() // Convert to a string
	    .toLowerCase() // Convert to lowercase
	    .replace(/\s+/g, '-') // Replace spaces with -
	    .replace(/[^\w-]+/g, '') // Remove all non-word chars
	    .replace(/--+/g, '-') // Replace multiple - with single -
	    .replace(/^-+/, '') // Trim - from start of text
	    .replace(/-+$/, ''); // Trim - from end of text
	  },

	  /**
	   * Converts an SVG string into its base64 encoded equivalent
	   *
	   * @param {string} svg - The SVG to convert
	   * @param {object} btoa - The btoa method to use (either pass in a node-compatible version, or window.btoa)
	   *
	   * @return {string} The SVG in base64
	   */
	  svgToBase64: function svgToBase64(svg, btoa) {
	    return btoa(unescape(encodeURIComponent(svg)));
	  },

	  /**
	   * Capitalises the first letter of a string
	   *
	   * @param {string} string - Capitalise the first string
	   *
	   * @return {string} The string with its first letter capitalised
	   */
	  capitaliseFirstLetter: function capitaliseFirstLetter(string) {
	    return string.charAt(0).toUpperCase() + string.slice(1);
	  }
	};

/***/ })
/******/ ])
});
;