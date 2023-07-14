// custom-tab-bar/index.js
Component({

  /**
   * 页面的初始数据
   */
  data: {
    selected:null,
    showPopup:false,
	showWeight:false,
	popupAnimationClass: '',
	currentValue: 100,
    list:[
      {
        'pagePath':"/pages/home/home",
        "text": "首页",
        "iconPath": "/static/image/home.png",
        "selectedIconPath": "/static/image/home2.png"
      },
      {
        "pagePath": "/pages/message/message",
        "text": "消息",
        "iconPath": "/static/image/message_light.png",
        "selectedIconPath": "/static/image/message_fill.png"
      },
      {
        "pagePath": "/pages/add/add",
        "text": "添加",
        "iconPath": "/static/image/add (1).png",
        "selectedIconPath": "/static/image/add.png"
      },
      {
        "pagePath": "/pages/shops/shops",
        "text": "购物",
        "iconPath": "/static/image/shopping.png",
        "selectedIconPath": "/static/image/shopping-fill.png"
      },
      {
        "pagePath": "/pages/user/user",
        "text": "用户",
        "iconPath": "/static/image/user (2).png",
        "selectedIconPath": "/static/image/user-filling.png"
      }
    ]
  },
  methods:{
    switchTab(e){
      const {index,url}=e.currentTarget.dataset;
      if(this.data.selected==index || index==undefined)return
      if(url=='/pages/add/add'){
        this.setData({
			showPopup:!this.data.showPopup
		})
        return
      }
      wx.switchTab({
        url,
      })
      this.setData({
        selected: index
      })
    },
    GoToNote(){
      wx.navigateTo({
        url: '/subpkg/AddNote/AddNote',
      })
    },
    GotoSport(){
      wx.navigateTo({
        url: '/subpkg/AddSport/AddSport',
      })
    },
	GoToWeight(){
		this.setData({
			showWeight:true,
			showPopup:!this.data.showPopup,
		})
	},
	 onClose() {
	    this.setData({ showWeight: false });
	  },
	  onChange(event) {
	      console.log(event.detail);
	    },
  }
  
})