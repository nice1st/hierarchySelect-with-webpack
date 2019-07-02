var ComponentModule =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/js/HierarchySelect.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/js/EventEmitter.js":
/*!********************************!*\
  !*** ./src/js/EventEmitter.js ***!
  \********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return EventEmitter; });\nclass EventEmitter {\r\n    \r\n    constructor() {\r\n        this.listeners = {};\r\n    }\r\n    \r\n    addListener(label, callback) {\r\n        if (!this.listeners.hasOwnProperty(label)) {\r\n            this.listeners[label] = [];\r\n        }\r\n        this.listeners[label].push(callback);\r\n    }\r\n    removeListener(label, callback) {\r\n        const listeners = this.listeners[label];\r\n        let i = -1;\r\n        for (let index = 0; index < listeners.length; index++) {\r\n            const listener = listeners[index];\r\n            if (typeof listener == \"function\" && listener === callback) {\r\n                i = index;\r\n                break;\r\n            }\r\n        }\r\n        if (i > -1) {\r\n            listeners.splice(i, 1);\r\n            this.listeners[label] = listeners;\r\n            return true;\r\n        }\r\n        else {\r\n            return false;\r\n        }\r\n    }\r\n    emit(label, ...arg) {\r\n        const listeners = this.listeners[label];\r\n        if (listeners && listeners.length > 0) {\r\n            for (let index = 0; index < listeners.length; index++) {\r\n                const listener = listeners[index];\r\n                listener.call(this, ...arg);\r\n            }\r\n        }\r\n    }\r\n}\n\n//# sourceURL=webpack://ComponentModule/./src/js/EventEmitter.js?");

/***/ }),

/***/ "./src/js/HierarchySelect.js":
/*!***********************************!*\
  !*** ./src/js/HierarchySelect.js ***!
  \***********************************/
/*! exports provided: HierarchySelect */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"HierarchySelect\", function() { return HierarchySelect; });\n/* harmony import */ var _EventEmitter__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./EventEmitter */ \"./src/js/EventEmitter.js\");\n/* harmony import */ var _Utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Utils */ \"./src/js/Utils.js\");\n\r\n\r\n\r\nclass HierarchySelect extends _EventEmitter__WEBPACK_IMPORTED_MODULE_0__[\"default\"] {\r\n\r\n  getDefaultOption() {\r\n    return {\r\n      \"title\": \"\",\r\n      \"isInit\": false,\r\n      \"url\": \"\", // url 이 있다면 fet 로 가져옴, 이때 부모객체가 있다면 인자로 넘김\r\n      \"data\": [],\r\n      \"dataByKey\": {},\r\n      \"keyField\": \"key\",\r\n      \"displayField\": \"name\",\r\n      \"pKeyField\": \"p_key\",\r\n      \"pJoinField\": \"\", // 부모객체의 어떤 필드와 조인 할까? default 는 null == keyField\r\n      \"parent\": [],\r\n      \"isShowNoDataLabel\": true,\r\n      \"noDataLabel\": \"No Data\",\r\n      \"requiredLabel\": \"Required select\",\r\n      \"firstOption\": {\r\n        \"enable\": true,\r\n        \"display\": \"전체\",\r\n        \"all\": true,\r\n      }\r\n    };\r\n  }\r\n\r\n  constructor($select, option) {\r\n    super();\r\n    this.$select = $select;\r\n    this.option = function mergeDeep(...objects) { // 인자 option 과 병합\r\n      const isObject = obj => obj && typeof obj === 'object';\r\n      \r\n      return objects.reduce((prev, obj) => {\r\n        Object.keys(obj).forEach(key => {\r\n          const pVal = prev[key];\r\n          const oVal = obj[key];\r\n          \r\n          if (Array.isArray(pVal) && Array.isArray(oVal)) {\r\n            prev[key] = pVal.concat(...oVal);\r\n          }\r\n          else if (isObject(pVal) && isObject(oVal)) {\r\n            prev[key] = mergeDeep(pVal, oVal);\r\n          }\r\n          else {\r\n            prev[key] = oVal;\r\n          }\r\n        });\r\n        \r\n        return prev;\r\n      }, {});\r\n    }(this.getDefaultOption(), option)\r\n  }\r\n\r\n  isInit() {\r\n    return this.option.isInit;\r\n  }\r\n\r\n  init() {\r\n    const f = function() {\r\n      for (let i = 0; i < this.option.parent.length; i++) {\r\n        const parent = this.option.parent[i];\r\n        if (parent.isInit() == false) {\r\n          return false;\r\n        }\r\n      }\r\n      return true;\r\n    }\r\n    \r\n    const interval = setInterval(function () { // 상위 select init 대기\r\n      if (f.call(this)) {\r\n        clearInterval(interval);\r\n        this.refresh();\r\n        this.addEventListener();\r\n        this.emit(\"init\");\r\n        this.option.isInit = true;\r\n      }\r\n    }.bind(this), 100);\r\n  }\r\n  \r\n  createOption() {\r\n    const result = [];\r\n    const allValues = [];\r\n    const datas = this.option.data;\r\n    \r\n    const parentSelecteds = this.getParentSelected();\r\n    for (let i = 0; i < datas.length; i++) {\r\n      const data = datas[i];\r\n\r\n      if (this.option.parent.length > 0 && parentSelecteds.findIndex(value => value.toString() == data[this.option.pKeyField].toString()) < 0) {\r\n        continue; // parent 가 있고 선택 된 값에 포함되지 않으면 스킵\r\n      }\r\n      \r\n      const $option = document.createElement(\"option\");\r\n      $option.value = data[this.option.keyField];\r\n      $option.textContent = data[this.option.displayField];\r\n      result.push($option);\r\n      allValues.push($option.value);\r\n    }\r\n    \r\n    if (this.option.firstOption.enable) {\r\n      const $option = document.createElement(\"option\");\r\n      $option.textContent = this.option.firstOption.display;\r\n      if (this.option.firstOption.all) {\r\n        $option.value = allValues.toString();\r\n      } else {\r\n        $option.value = \"\";\r\n      }\r\n      \r\n      result.unshift($option);\r\n    }\r\n    \r\n    if (result.length == 0) { // 리스트가 비었을 때\r\n      const $option = document.createElement(\"option\");\r\n      $option.disabled = true;\r\n      if (this.option.isShowNoDataLabel) {\r\n        if (this.option.parent.length == 0) { // 상위 객체가 없으면\r\n          $option.textContent = this.option.noDataLabel;\r\n        } else {\r\n          const parentTitles = this.getParentOption(\"title\");\r\n          if (this.getParentSelected().length > 0 || parentTitles.length == 0) { // 상위 객체를 선택했지만 데이터가 없을 때 or 상위 객체의 title 이 없을 때\r\n            $option.textContent = this.option.noDataLabel;\r\n          } else {\r\n            $option.textContent = this.option.requiredLabel + \": \" + parentTitles.join();\r\n          }\r\n        }\r\n      }\r\n      result.push($option);\r\n    }\r\n\r\n    return result;\r\n  }\r\n  \r\n  addOption(options) {\r\n    const $fragment = document.createDocumentFragment();\r\n    for (let i = 0; i < options.length; i++) {\r\n      const $option = options[i];\r\n      $fragment.append($option);\r\n    }\r\n    \r\n    this.$select.appendChild($fragment);\r\n  }\r\n  \r\n  addEventListener() {\r\n    for (let i = 0; i < this.option.parent.length; i++) {\r\n      const parent = this.option.parent[i];\r\n      parent.addListener(\"change\", function(e) {\r\n        this.refresh();\r\n      }.bind(this));\r\n    }\r\n    \r\n    this.$select.addEventListener(\"change\", function(e) {\r\n      this.emit(\"change\");\r\n    }.bind(this));\r\n  }\r\n  \r\n  refresh() {\r\n    if (this.option.url != undefined && this.option.url != \"\") {\r\n      this.refreshData(true);\r\n      return;\r\n    }\r\n    this.doRefresh();  \r\n  }\r\n  \r\n  doRefresh() {\r\n    this.$select.innerHTML = null;\r\n    this.addOption(this.createOption());\r\n    this.emit(\"change\");\r\n  }\r\n\r\n  refreshData(isDo) {\r\n    let param = \"\";\r\n    if (this.option.parent.length > 0) {\r\n      const parentSelected = this.getParentSelected();\r\n      param += \"?\" + this.option.pKeyField + \"=\" + parentSelected.toString();\r\n    }\r\n\r\n    const _self = this\r\n    fetch(this.option.url + param) // GET\r\n    .then(function(response) {\r\n      return response.json();\r\n    })\r\n    .then(function(json) {\r\n      _self.setData(json);\r\n      if (isDo) {\r\n        _self.doRefresh();\r\n      }\r\n    });\r\n  }\r\n  \r\n  setData(data) {\r\n    this.makeDataMapByKey(data);\r\n    this.option.data = data;\r\n  }\r\n\r\n  makeDataMapByKey(datas) {\r\n    const o = {};\r\n    for (let i = 0; i < datas.length; i++) {\r\n      const data = datas[i];\r\n      o[data[this.option.keyField]] = data;\r\n    }\r\n    \r\n    this.option.dataByKey = o;\r\n  }\r\n  \r\n  getSelectedKey() {\r\n    return this.$select.value;\r\n  }\r\n  \r\n  getSelectedKeys() {\r\n    if (this.$select.value != undefined && this.$select.value != \"\") {\r\n      if (this.option.firstOption.enable) {\r\n        return this.$select.value.split(\",\");\r\n      } else {\r\n        const selectedOptions = this.$select.querySelectorAll(\"option:checked\");\r\n        const result = [];\r\n        selectedOptions.forEach(option => {\r\n          result.push(option.value);\r\n        });\r\n        return result;\r\n      }\r\n    }\r\n\r\n    return [];\r\n  }\r\n  \r\n  getSelectedValues(key) {\r\n    let result = [];\r\n    const selectedKeys = this.getSelectedKeys();\r\n    for (let i = 0; i < selectedKeys.length; i++) {\r\n      const selectedKey = selectedKeys[i];\r\n      result.push(this.option.dataByKey[selectedKey][key]);\r\n    }\r\n\r\n    return result;\r\n  }\r\n  \r\n  getSelectedDatas() {\r\n    let result = [];\r\n    const selectedKeys = this.getSelectedKeys();\r\n    for (let i = 0; i < selectedKeys.length; i++) {\r\n      const selectedKey = selectedKeys[i];\r\n      result.push(this.option.dataByKey[selectedKey]);\r\n    }\r\n\r\n    return result;\r\n  }\r\n\r\n  getParentSelected() {\r\n    let result = [];\r\n\r\n    for (let j = 0; j < this.option.parent.length; j++) {\r\n      const parent = this.option.parent[j]; // parent\r\n      if (this.option.pJoinField != undefined && this.option.pJoinField != \"\") { // pJoinField 를 정의 했을 때\r\n        result = result.concat(parent.getSelectedValues(this.option.pJoinField)); // parent 의 data 에서 해당 field 를 가져옴\r\n      } else {\r\n        result = result.concat(parent.getSelectedKeys()); // 아닌 경우 parent 의 keyField 를 참고하여 가져옴\r\n      }\r\n    }\r\n\r\n    return result;\r\n  }\r\n  \r\n  getParentOption(prop) {\r\n    let result = [];\r\n  \r\n    for (let j = 0; j < this.option.parent.length; j++) {\r\n      const parent = this.option.parent[j]; // parent\r\n      if (!_Utils__WEBPACK_IMPORTED_MODULE_1__[\"Utils\"].isEmpty(parent.option[prop])) {\r\n        result.push(parent.option[prop]);\r\n      }\r\n    }\r\n  \r\n    return result;\r\n  }\r\n}\n\n//# sourceURL=webpack://ComponentModule/./src/js/HierarchySelect.js?");

/***/ }),

/***/ "./src/js/Utils.js":
/*!*************************!*\
  !*** ./src/js/Utils.js ***!
  \*************************/
/*! exports provided: Utils */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Utils\", function() { return Utils; });\nconst Utils = {\r\n  isEmpty: function(val) {\r\n    if (val === undefined){\r\n      return true;\r\n    }\r\n    \r\n    if (typeof (val) == 'function' || typeof (val) == 'number' || typeof (val) == 'boolean' || Object.prototype.toString.call(val) === '[object Date]') {\r\n      return false;\r\n    }\r\n    \r\n    if (val == null || val.length === 0) { // null or 0 length array\r\n      return true;\r\n    }\r\n\r\n    if (typeof (val) == \"object\") {\r\n      // empty object\r\n      var r = true;\r\n\r\n      for (var f in val) {\r\n        r = false;\r\n      }\r\n    \r\n      return r;\r\n    }\r\n    \r\n    return false;\r\n  }\r\n}\n\n//# sourceURL=webpack://ComponentModule/./src/js/Utils.js?");

/***/ })

/******/ });