import EventEmitter from './EventEmitter'
import {Utils} from './Utils'

export class HierarchySelect extends EventEmitter {

  getDefaultOption() {
    return {
      "title": "",
      "isInit": false,
      "url": "", // url 이 있다면 fet 로 가져옴, 이때 부모객체가 있다면 인자로 넘김
      "data": [],
      "dataByKey": {},
      "keyField": "key",
      "displayField": "name",
      "pKeyField": "p_key",
      "pJoinField": "", // 부모객체의 어떤 필드와 조인 할까? default 는 null == keyField
      "parent": [],
      "isShowNoDataLabel": true,
      "noDataLabel": "No Data",
      "requiredLabel": "Required select",
      "firstOption": {
        "enable": true,
        "display": "전체",
        "all": true,
      }
    };
  }

  constructor($select, option) {
    super();
    this.$select = $select;
    this.option = function mergeDeep(...objects) { // 인자 option 과 병합
      const isObject = obj => obj && typeof obj === 'object';
      
      return objects.reduce((prev, obj) => {
        Object.keys(obj).forEach(key => {
          const pVal = prev[key];
          const oVal = obj[key];
          
          if (Array.isArray(pVal) && Array.isArray(oVal)) {
            prev[key] = pVal.concat(...oVal);
          }
          else if (isObject(pVal) && isObject(oVal)) {
            prev[key] = mergeDeep(pVal, oVal);
          }
          else {
            prev[key] = oVal;
          }
        });
        
        return prev;
      }, {});
    }(this.getDefaultOption(), option)
  }

  isInit() {
    return this.option.isInit;
  }

  init() {
    const f = function() {
      for (let i = 0; i < this.option.parent.length; i++) {
        const parent = this.option.parent[i];
        if (parent.isInit() == false) {
          return false;
        }
      }
      return true;
    }
    
    const interval = setInterval(function () { // 상위 select init 대기
      if (f.call(this)) {
        clearInterval(interval);
        this.refresh();
        this.addEventListener();
        this.emit("init");
        this.option.isInit = true;
      }
    }.bind(this), 100);
  }
  
  createOption() {
    const result = [];
    const allValues = [];
    const datas = this.option.data;
    
    const parentSelecteds = this.getParentSelected();
    for (let i = 0; i < datas.length; i++) {
      const data = datas[i];

      if (this.option.parent.length > 0 && parentSelecteds.findIndex(value => value.toString() == data[this.option.pKeyField].toString()) < 0) {
        continue; // parent 가 있고 선택 된 값에 포함되지 않으면 스킵
      }
      
      const $option = document.createElement("option");
      $option.value = data[this.option.keyField];
      $option.textContent = data[this.option.displayField];
      result.push($option);
      allValues.push($option.value);
    }
    
    if (this.option.firstOption.enable) {
      const $option = document.createElement("option");
      $option.textContent = this.option.firstOption.display;
      if (this.option.firstOption.all) {
        $option.value = allValues.toString();
      } else {
        $option.value = "";
      }
      
      result.unshift($option);
    }
    
    if (result.length == 0) { // 리스트가 비었을 때
      const $option = document.createElement("option");
      $option.disabled = true;
      if (this.option.isShowNoDataLabel) {
        if (this.option.parent.length == 0) { // 상위 객체가 없으면
          $option.textContent = this.option.noDataLabel;
        } else {
          const parentTitles = this.getParentOption("title");
          if (this.getParentSelected().length > 0 || parentTitles.length == 0) { // 상위 객체를 선택했지만 데이터가 없을 때 or 상위 객체의 title 이 없을 때
            $option.textContent = this.option.noDataLabel;
          } else {
            $option.textContent = this.option.requiredLabel + ": " + parentTitles.join();
          }
        }
      }
      result.push($option);
    }

    return result;
  }
  
  addOption(options) {
    const $fragment = document.createDocumentFragment();
    for (let i = 0; i < options.length; i++) {
      const $option = options[i];
      $fragment.append($option);
    }
    
    this.$select.appendChild($fragment);
  }
  
  addEventListener() {
    for (let i = 0; i < this.option.parent.length; i++) {
      const parent = this.option.parent[i];
      parent.addListener("change", function(e) {
        this.refresh();
      }.bind(this));
    }
    
    this.$select.addEventListener("change", function(e) {
      this.emit("change");
    }.bind(this));
  }
  
  refresh() {
    if (this.option.url != undefined && this.option.url != "") {
      this.refreshData(true);
      return;
    }
    this.doRefresh();  
  }
  
  doRefresh() {
    this.$select.innerHTML = null;
    this.addOption(this.createOption());
    this.emit("change");
  }

  refreshData(isDo) {
    let param = "";
    if (this.option.parent.length > 0) {
      const parentSelected = this.getParentSelected();
      param += "?" + this.option.pKeyField + "=" + parentSelected.toString();
    }

    const _self = this
    fetch(this.option.url + param) // GET
    .then(function(response) {
      return response.json();
    })
    .then(function(json) {
      _self.setData(json);
      if (isDo) {
        _self.doRefresh();
      }
    });
  }
  
  setData(data) {
    this.makeDataMapByKey(data);
    this.option.data = data;
  }

  makeDataMapByKey(datas) {
    const o = {};
    for (let i = 0; i < datas.length; i++) {
      const data = datas[i];
      o[data[this.option.keyField]] = data;
    }
    
    this.option.dataByKey = o;
  }
  
  getSelectedKey() {
    return this.$select.value;
  }
  
  getSelectedKeys() {
    if (this.$select.value != undefined && this.$select.value != "") {
      if (this.option.firstOption.enable) {
        return this.$select.value.split(",");
      } else {
        const selectedOptions = this.$select.querySelectorAll("option:checked");
        const result = [];
        selectedOptions.forEach(option => {
          result.push(option.value);
        });
        return result;
      }
    }

    return [];
  }
  
  getSelectedValues(key) {
    let result = [];
    const selectedKeys = this.getSelectedKeys();
    for (let i = 0; i < selectedKeys.length; i++) {
      const selectedKey = selectedKeys[i];
      result.push(this.option.dataByKey[selectedKey][key]);
    }

    return result;
  }
  
  getSelectedDatas() {
    let result = [];
    const selectedKeys = this.getSelectedKeys();
    for (let i = 0; i < selectedKeys.length; i++) {
      const selectedKey = selectedKeys[i];
      result.push(this.option.dataByKey[selectedKey]);
    }

    return result;
  }

  getParentSelected() {
    let result = [];

    for (let j = 0; j < this.option.parent.length; j++) {
      const parent = this.option.parent[j]; // parent
      if (this.option.pJoinField != undefined && this.option.pJoinField != "") { // pJoinField 를 정의 했을 때
        result = result.concat(parent.getSelectedValues(this.option.pJoinField)); // parent 의 data 에서 해당 field 를 가져옴
      } else {
        result = result.concat(parent.getSelectedKeys()); // 아닌 경우 parent 의 keyField 를 참고하여 가져옴
      }
    }

    return result;
  }
  
  getParentOption(prop) {
    let result = [];
  
    for (let j = 0; j < this.option.parent.length; j++) {
      const parent = this.option.parent[j]; // parent
      if (!Utils.isEmpty(parent.option[prop])) {
        result.push(parent.option[prop]);
      }
    }
  
    return result;
  }
}