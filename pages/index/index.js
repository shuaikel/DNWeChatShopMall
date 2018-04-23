//index.js
//获取应用实例
const app = getApp()
var api = require('../../api/api.js')
Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),

    dateModel : {} ,
    BannerList :[],
    SeckillList : [],
    ActivityList : [],
    HotList : [],
    BannerpageList:[],
    RecommendList : [],

    productCategoryList: [{
      "ID": 0,
      "TenantID": 1,
      "Name": "首页",
      "Picture": "https://static.mammasay.com/image/20171102/6364522992248564746252872.jpg",
      "PageSize": 100,
      "ParentID": 0,
      "Level": 0,
      "Childs": null
    }],

    userSelectCheckCategoryIndex: 0,

    main_actionArray : ['商品分类','扫码积分','防伪追溯','露安适社区']
  },
  //事件处理函数
  bindViewTap: function() {
    // wx.navigateTo({
    //   url: '../logs/logs'
    // })
  },
  onLoad: function () {
    this.getProductCategoryInfo()
    this.getUserMainPageInfo()

  },
  // 获取商品分类类别
  getProductCategoryInfo : function(e){
    var date = new Date().getTime()
    api.apiForCategory({
      method: "POST",
      data: {
        TenantID: 1,
        ID: 0
      },
      query: {
        date: date
      },
      success: (res) => {
        var tempCategoryList = this.data.productCategoryList
        tempCategoryList = tempCategoryList.concat(res.data.Data)
        this.setData({ productCategoryList: tempCategoryList })
      }
    })
  },
  // 获取首页数据
  getUserMainPageInfo : function(e){
    var that = this
    var date = new Date().getTime()
    api.apiForMainPageDataSumInfo({
      query:{
        date : date
      },
      success:(res)=>{
        if(res.data.Code == 0){
          that.setData({ 
            BannerList: res.data.Data.BannerList,
            SeckillList: res.data.Data.Seckill.list,
            ActivityList: res.data.Data.ActivityList,
            HotList: res.data.Data.HotList,
            BannerpageList: res.data.Data.BannerpageList,
            RecommendList: res.data.Data.RecommendList})
        }
      }
    })
  },
  //  用户切换查看类别
  userSelectCategoryChangeAction:function(e){
    let index = e.currentTarget.dataset.index
    this.setData({ userSelectCheckCategoryIndex: index})
  }
})
