// custom-tab-bar/index.js
Component({

  /**
   * 页面的初始数据
   */
  data: {
    selected:null,
    showPopup:false,
	showWeight:false,
	showEat:false,
	hotOther:0,
	eatday:1500,
	weightday:120,
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
			showPopup:!this.data.showPopup,
			hotOther:wx.getStorageSync('today_input')
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
	OnSameDay(timestamp1, timestamp2) {
	  const date1 = new Date(timestamp1 * 1000); // 将时间戳转换为毫秒级别
	  const date2 = new Date(timestamp2 * 1000);
	
	  const year1 = date1.getFullYear();
	  const month1 = date1.getMonth();
	  const day1 = date1.getDate();
	
	  const year2 = date2.getFullYear();
	  const month2 = date2.getMonth();
	  const day2 = date2.getDate();
	
	  return year1 === year2 && month1 === month2 && day1 === day2;
	},
	saveweight(){
		let weighthistory=wx.getStorageSync('weighthistory')||[]
		this.setData({showWeight:false})
		const weightitem={Weight:this.data.weightday,Date:Date.now()}
		if(!weighthistory.length){
			weighthistory.unshift(weightitem)
			wx.setStorageSync('weighthistory',weighthistory)
		}else{
			let time1=weighthistory[0].Date;
			let time2=weightitem.Date;
			if(this.OnSameDay(time1,time2)){
				weighthistory[0]=weightitem
				wx.setStorageSync('weighthistory',weighthistory)
			}else{
				weighthistory.unshift(weightitem)
				wx.setStorageSync('weighthistory',weighthistory)
			}
		}
		console.log(this.data.weightday);
		console.log(weightitem);
	},
	saveEat(){
		let eathistory=wx.getStorageSync('eathistory')||[]
		this.setData({showEat:false})
		const eatitem={Eat:this.data.eatday,Date:Date.now()}
		if(!eathistory.length){
			eathistory.unshift(eatitem)
			wx.setStorageSync('eathistory',eathistory)
		}else{
			let time1=eathistory[0].Date;
			let time2=eatitem.Date;
			if(this.OnSameDay(time1,time2)){
				eathistory[0]=eatitem
				wx.setStorageSync('eathistory',eathistory)
			}else{
				eathistory.unshift(eatitem)
				wx.setStorageSync('eathistory',eathistory)
			}
		}
	},
    GoToNote(){
		this.setData({
			showPopup:!this.data.showPopup,
		})
      wx.navigateTo({
        url: '/subpkg/AddNote/AddNote',
      })
    },
    GotoSport(){
		this.setData({
			showPopup:!this.data.showPopup,
		})
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
	GoToEat(){
		this.setData({
			showEat:true,
			showPopup:!this.data.showPopup,
		})
	},
	 onClose() {
	    this.setData({ showWeight: false });
	  },
	  onCloseEat(){
		  this.setData({ showEat: false });
	  },
	  onChange(event) {
	      this.setData({weightday:event.detail})
	},
	onChangeEat(e){
		this.setData({eatday:e.detail})
	}
  }
  
})