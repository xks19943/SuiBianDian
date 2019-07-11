/**
 * Created by clude on 6/13/17.
 */
class BaseLookup {
  constructor() {
    this._list = null;
  };

  getList() {
    if (this._lists) {
      return this._lists;
    } else {
      this._lists = this.generateList();
      return this._lists;
    }
  };

  generateList() { return []; }

  getListWithEmpty(emptyOption) {
    let list = this.getList();
    let emptySelection = Object.assign({Code: -1, DisplayName: '请选择'}, emptyOption || {});
    list.splice(0, 0, emptySelection);
    return list;
  }

  getEnums() {
    if (this._enums) {
      return this._enums;
    } else {
      this._enums = {};
      var list = this.getList();
      for (var k in list) {
        var item = list[k];
        this._enums[item.Code] = item;
      }
    }
    return this._enums;
  }

  getByCode(code) {
    if (code) {
      return this.getEnums()[code] || null;
    }
    return null;
  }

  getByCodes(codesArray) {
    var results = [];
    for (var k in codesArray) {
      results.push(this.getEnums()[codesArray[k]]);
    }
    return results;
  }

  getByMergedCode(mCode) {
    var rst = [];
    var lists = this.getList();
    lists.forEach((item) => {
      if ((item.Code & mCode) > 0) {
        rst.push(item);
      }
    });
    return rst;
  }

  getByJoinedCode(mCode) {
    var codes = [];
    if (mCode) {
      codes = mCode.split(',');
    }

    var rst = [];
    var lists = this.getList();
    lists.forEach(function(item) {
      if ((codes.indexOf(item.Code)) > -1) {
        rst.push(item);
      }
    });
    return rst;
  }

  getNamesList(codesArray) {
    var enums = this.getEnums();
    var results = [];
    for (var k in codesArray) {
      var code = codesArray[k];
      if (enums[code]) {
        results.push(enums[code].DisplayName);
      }
    }
    return results;
  };

  getNameByMergedCode (mCode) {
    var rst = [];
    var lists = this.getList();
    lists.forEach(function(item) {
      if ((item.Code & mCode) > 0) {
        rst.push(item.DisplayName);
      }
    });
    return rst.join(', ');
  }

  getShortNameByMergedCode(mCode) {
    var rst = [];
    var list = this.getList();
    list.forEach(function(item) {
      if ((item.Code & mCode) > 0) {
        rst.push(item.ShortName);
      }
    });
    return rst.join(', ');
  }

  getArrayByMergedCode(mCode) {
    var rst = [];
    var lists = this.getList();
    lists.forEach(function(item) {
      if ((item.Code & mCode) > 0) {
        rst.push(item);
      }
    });
    return rst;
  }

  getNameByJoinedCode(mCode) {
    var codes = [];
    if (mCode) {
      codes = mCode.split(',');
    }

    var rst = [];
    var lists = this.getList();
    lists.forEach(function(item) {
      if ((codes.indexOf(item.Code)) > -1) {
        rst.push(item.DisplayName);
      }
    });

    return rst.join(', ');
  }

  getUISelectionList(inList) {
    let newList = [];

    let list = inList || this.getList();
    for (let i in list) {
      let item = list[i];
      newList.push({
        name: item.DisplayName,
        value: item.Code,
        item: item,
        selected: false
      });
    }

    return newList;
  }

  toCheckSource(lists) {
    return new CheckHelper(lists || this.getList());
  }

}

class CheckHelper extends BaseLookup {
  constructor(lists, initValue) {
    super();
    this._lists = lists;
    if (initValue) {
      this.setSelected(initValue);
    }
  }

  setSelected(v) {
    this._lists.forEach(function(item) {
      if ((item.Code & v) === item.Code) {
        item.selected = true;
      }
    });
  }

  setUNSelect(v) {
    this._lists.forEach(function(item) {
      if ((item.Code & v) > 0) {
        item.selected = false;
      }
    });
  }

  getSelectedNames(v) {
    let rst = [];
    const list = this.getSelectedLists(v);
    list.forEach(function(item) {
      rst.push(item.DisplayName);
    });
    return rst;
  }

  getSelectedLists(v) {
    let rst = [];
    this._lists.forEach(function(item) {
      if (!v && v !== 0) {
        if (item.selected) {
          rst.push(item);
        }
      } else {
        if ((item.Code & v) > 0) {
          rst.push(item);
        }
      }
    });
    return rst;
  }

  getSelectedValue() {
    let v = 0;
    this._lists.forEach(function(item) {
      if (item.selected) {
        v = v | item.Code;
      }
    });
    return v;
  }
}

// LookUp - DataSourceType
class DataSourceType extends BaseLookup {
  constructor() {
    super();
    this.CONSUMER = {Code: '10', id: 10, DisplayName: 'Consumer '};
    this.BUSINESS = {Code: '20', id: 20, DisplayName: 'Business'};
    this.NEW_MOVER = {Code: '30', id: 30, DisplayName: 'New Mover '};
    this.OCCPUANT = {Code: '40', id: 40, DisplayName: 'Occpuant'};
    this.NEW_HOMEOWNER = {Code: '50', id: 50, DisplayName: 'New Homeowner'};
  };

  generateList() {
    return [
      this.CONSUMER,
      this.BUSINESS,
      this.NEW_MOVER,
      this.OCCPUANT,
      this.NEW_HOMEOWNER
    ];
  }
};

class StatusIntYNType extends BaseLookup {
  generateList() {
    return [
      {Code: 0, DisplayName: 'N'},
      {Code: 1, DisplayName: 'Y'}
    ];
  }
};

class StatusBoolYNType extends BaseLookup {
  generateList() {
    return [
      {Code: false, DisplayName: 'N'},
      {Code: true, DisplayName: 'Y'}
    ];
  }
};

class RoleType extends BaseLookup {
  generateList() {
    return [
      {Code: 1, DisplayName: '系统管理'},
      {Code: 2, DisplayName: '运营维护'}
    ];
  }
};

class BAStatusType extends BaseLookup {
  constructor() {
    super();
    this.ZUOFEI = {Code: '0', DisplayName: '作废'};
    this.CAOGAO = {Code: '10', DisplayName: '草稿'};
    this.DAISHENHE = {Code: '20', DisplayName: '待审核'};
    this.WUXIAO = {Code: '28', DisplayName: '无效'};
    this.DAIZHIXIN = {Code: '40', DisplayName: '待执行'};
    this.YOUXIAO = {Code: '41', DisplayName: '有效'};
    this.ZHIXINZHONG = {Code: '50', DisplayName: '执行中'};
    this.ZANTING = {Code: '55', DisplayName: '暂停'};
    this.JIESU = {Code: '60', DisplayName: '结束'};
    this.GUANBI = {Code: '99', DisplayName: '关闭'};
  };

  generateList() {
    return [
      this.ZUOFEI,
      this.CAOGAO,
      this.DAISHENHE,
      this.WUXIAO,
      this.DAIZHIXIN,
      this.YOUXIAO,
      this.ZHIXINZHONG,
      this.ZANTING,
      this.JIESU,
      this.GUANBI
    ];
  }
};

class TPCategoriesType extends BaseLookup {
  generateList() {
    return [
      {Code: '10', DisplayName: '粉丝激活'},
      {Code: '20', DisplayName: '活跃度提升'},
      {Code: '30', DisplayName: '忠诚度提升'},
      {Code: '40', DisplayName: '流失挽回'}
    ];
  }
};

class TPType extends BaseLookup {
  generateList() {
    return [
      {Code: '1', DisplayName: '满立减'},
      {Code: '2', DisplayName: '满送卷'},
      {Code: '3', DisplayName: '领卷'},
      {Code: '4', DisplayName: '会员折扣'},
      {Code: '5', DisplayName: '限时折扣'},
      {Code: '6', DisplayName: '会员日'}
    ];
  }
};

class WeekType extends BaseLookup {
  generateList() {
    return [
      {Code: '0', DisplayName: '星期一'},
      {Code: '1', DisplayName: '星期二'},
      {Code: '2', DisplayName: '星期三'},
      {Code: '3', DisplayName: '星期四'},
      {Code: '4', DisplayName: '星期五'},
      {Code: '5', DisplayName: '星期六'},
      {Code: '6', DisplayName: '星期日'}
    ];
  }
};

class PeriodicType extends BaseLookup {
  generateList() {
    return [
      {Code: '0', DisplayName: '一次性活动'},
      {Code: '1', DisplayName: '周期性活动'}
    ];
  }
}

class SendViaType extends BaseLookup {
  generateList() {
    return [
      {Code: 'SMS', DisplayName: '短信'},
      {Code: 'WeChat', DisplayName: '公众号'},
      {Code: 'APP', DisplayName: 'APP推送'}
    ];
  }
};

class RegionLevelType extends BaseLookup {
  generateList() {
    return [
      {Code: '1', DisplayName: '大区', ShortName: 'REGION'},
      {Code: '2', DisplayName: '省份', ShortName: 'PROV'},
      {Code: '3', DisplayName: '城市', ShortName: 'CITY'},
      {Code: '4', DisplayName: '区/县', ShortName: 'COUNTY'},
      {Code: '5', DisplayName: '门店', ShortName: 'OUTLETS'}

    ];
  }
};

class GradeType extends BaseLookup {
  generateList() {
    return [
      {Code: '5', DisplayName: '钻石卡'},
      {Code: '4', DisplayName: '金卡'},
      {Code: '3', DisplayName: '普通卡'}
    ];
  }
};

class TaskType extends BaseLookup{
   generateList() {
     return [
       {code: '', DisplayName: '全部任务'},
       {code: 20, DisplayName: '促销类'},
       {code: 10, DisplayName: '关怀类'},
       {code: 90, DisplayName: '运营类'},
     ]
   }
}

class TaskOperationType extends BaseLookup {
    generateList() {
      return [
        {code: '1', DisplayName: '电话任务'},
        {code: '2', DisplayName: '短信任务'},
        {code: '3', DisplayName: '陈列任务'},
        {code: '4', DisplayName: '分享任务'},
      ]
    }
}

class PerformanceLevelType extends BaseLookup{
  generateList() {
    return [
      {code: 4, DisplayName: '新会员销售额'},
      {code: 5, DisplayName: '新会员数'},
      {code: 6, DisplayName: '老会员销售额'},
      {code: 7, DisplayName: '回头消费人数'}
    ]
  }
}

class RegionalAnalysisType extends BaseLookup{
  generateList() {
    return [
      {code: 1, DisplayName: '分区排行',isNormal:true},
      {code: 2, DisplayName: '门店排行',isNormal:true},
      {code: 3, DisplayName: '导购排行',isNormal:true},
    ]
  }
}

class RegionalPerformanceLevelType extends BaseLookup{
  generateList() {
    return [
      {code: 1, DisplayName: '新增会员数'},
      {code: 2, DisplayName: '会员消费占比'},
      {code: 3, DisplayName: '回头消费占比'},
      {code: 4, DisplayName: '回头率'}
    ]
  }
}

class GuidePerformanceLevelType extends BaseLookup{
  generateList() {
    return [
      {code: 1, DisplayName: '新增会员数'},
      {code: 2, DisplayName: '会员销售额'},
      {code: 3, DisplayName: '老会员销售额'},
      {code: 4, DisplayName: '复购额'}
    ]
  }
}

class NewVipCountDateType extends BaseLookup{
  generateList() {
    return [
      {code: 1, DisplayName: '昨日'},
      {code: 2, DisplayName: '上周'},
      {code: 3, DisplayName: '上月'},
      {code: 4, DisplayName: '本周至今'},
      {code: 5, DisplayName: '本月至今'},
    ]
  }
}

class HighFrequencyIndustryDateType extends BaseLookup{
  generateList() {
    return [
      {code: 1, DisplayName: '昨日'},
      {code: 2, DisplayName: '上周'},
      {code: 4, DisplayName: '本周至今'},
    ]
  }
}

class LowFrequencyIndustryDateType extends BaseLookup{
  generateList() {
    return [
      {code: 1, DisplayName: '昨日'},
      {code: 2, DisplayName: '上月'},
      {code: 4, DisplayName: '本月至今'},
    ]
  }
}

class DeliveryDateType extends BaseLookup{
  generateList() {
    return [
      {code: 1, DisplayName: '今天'},
      {code: 2, DisplayName: '本周'},
      {code: 3, DisplayName: '本月'},
      {code: 4, DisplayName: '三个月'}
    ]
  }
}

class BusinessType extends BaseLookup{
  generateList() {
    return [
      {code: 1, DisplayName: '品类排行'},
      {code: 2, DisplayName: '畅销排行'}
    ]
  }
}

class ClassAnalyseType extends BaseLookup{
  generateList(){
    return[
      {code:1,DisplayName:'畅销单品',isNormal:true},
      {code:2,DisplayName:'畅销组合',isNormal:true},
      {code:3,DisplayName:'滞销单品',isNormal:true}
    ]
  }
}

class PerformanceShopOpenTimeType extends BaseLookup{
  generateList() {
    return [
      {code: 0, DisplayName: '全部'},
      {code: 1, DisplayName: '3个月内'},
      {code: 2, DisplayName: '半年内'},
      {code: 3, DisplayName: '1年内'},
      {code: 4, DisplayName: '2年内'},
      {code: 5, DisplayName: '2年以前'}
    ]
  }
}

class MemberPortraitType extends BaseLookup{
  generateList() {
    return [
      {code: 1, DisplayName: '区域'},
      {code: 2, DisplayName: '年龄'},
      {code: 3, DisplayName: '性别'},
      {code: 4, DisplayName: '等级'},
      {code: 5, DisplayName: '职业'}
    ]
  }
}

class PortraitPerformanceType extends BaseLookup{
  generateList() {
    return [
      {code: 1, DisplayName: '总会员数'}
    ]
  }
}

class AssistantType extends BaseLookup{
  generateList() {
    return [
      {code: 0, DisplayName: '全部'},
      {code: 10, DisplayName: '在职'},
      {code: 30, DisplayName: '调店中'},
      {code: 60, DisplayName: '离职'},
      {code: 50, DisplayName: '休假'}
    ]
  }
}


const lookups = {
  BaseLookUp: new BaseLookup(),
  DataSourceType: new DataSourceType(),
  StatusIntYNType: new StatusIntYNType(),
  StatusBoolYNType: new StatusBoolYNType(),
  RoleType: new RoleType(),
  BAStatusType: new BAStatusType(),
  TPCategoriesType: new TPCategoriesType(),
  TPType: new TPType(),
  WeekType: new WeekType(),
  PeriodicType: new PeriodicType(),
  SendViaType: new SendViaType(),
  GradeType: new GradeType(),
  TaskType:new TaskType(),
  TaskOperationType: new TaskOperationType(),
  PerformanceLevelType:new PerformanceLevelType(),
  RegionalAnalysisType:new RegionalAnalysisType(),
  RegionalPerformanceLevelType:new RegionalPerformanceLevelType(),
  GuidePerformanceLevelType:new GuidePerformanceLevelType(),
  NewVipCountDateType:new NewVipCountDateType(),
  LowFrequencyIndustryDateType:new LowFrequencyIndustryDateType(),
  HighFrequencyIndustryDateType:new HighFrequencyIndustryDateType(),
  MemberPortraitType:new MemberPortraitType(),
  PortraitPerformanceType:new PortraitPerformanceType(),
  AssistantType:new AssistantType(),
  DeliveryDateType: new DeliveryDateType(),
  PerformanceShopOpenTimeType: new PerformanceShopOpenTimeType(),
  ClassAnalyseType: new ClassAnalyseType(),
  BusinessType: new BusinessType()
};

module.exports = lookups;

// export default lookups;
