Page({

  /**
   * 页面的初始数据
   */
  data: {
    modalName: '',
    components: [{
      id: 0,
      name: "视图容器"
    }, {
      id: 1,
      name: "可滚动视图区域"
    }, {
      id: 3,
      name: "滑块视图容器"
    }, {
      id: 4,
      name: "可移动的视图容器，在页面中可以拖拽滑动"
    }, {
      id: 5,
      name: "覆盖在原生组件之上的文本视图"
    }]
  },

  gotoItem: function (id) {
    let url = ''
    wx.navigateTo({
      url: url,
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
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