

var api = require('../../../api/api.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    daoGouBaoBaseInfoModel: {},
    userMobilPhone:'',
    userNickName : '',
    userEmail: '',
    userChannelLists : ['医院','月子会所','游泳馆','母婴商店','超市','其它','佳贝艾特'],
    channelContainerHeight : 0,
    years: ['2018', '2017', '2016', '2015', '2014', '2013', '2012', '2011'],
    months : ['1','2','3','4','5','6','7','8','9','10','11','12'],
    days: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
    showModal : false,
    date: '2016-09-01',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getCurrentLoginBaseInfoAction()
  },

  // 获取当前登录导购的基本信息
  getCurrentLoginBaseInfoAction: function (e) {
    var date = new Date().getTime()
    var that = this
    api.apiForLoginUserBaseInfo({
      query: {
        date: date
      },
      success: (res) => {
        if (res.data.Code == 0) {
          that.setData({ daoGouBaoBaseInfoModel: res.data.Data })
        }
      }
    })
  },
 // 用户输入手机号码
  userInputMobilePhone:function(e){
    let mobile = e.detail.value
    this.setState({userMobilPhone:mobile});
  },
  // 用户输入昵称
  userInputNickName : function(e){
    let nickName = e.detail.value
    this.setState({ userNickName: nickName });
  },
  // 用户输入邮箱
  userInputEmailAction : function(e){
    let userEmail = e.detail.value
    this.setState({ userEmail: userEmail });
  },
  //  用户选择查看或者隐藏渠道
  userSelectChannelAction : function(e){
    this.setData({ channelContainerHeight: this.data.channelContainerHeight > 0?0:60})
  },
  // 用户选中渠道
  userSelectChannelItemAction : function(e){

  },
  // 用户选择生日
  bindUserBorthdayChangeAction:function(e){

  },
  // 用户生日
  userCheckBirthdayAction : function(e){
    let showModal = this.data.showModal
    this.setData({ showModal: showModal?false:true})
  },
  hiddenModelAction:function(e){
    let showModal = this.data.showModal
    this.setData({ showModal: showModal ? false : true })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  }
})