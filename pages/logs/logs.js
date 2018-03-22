//logs.js
const util = require('../../utils/util.js')

Page({
  data: {
    logs: [],
    flag: ['false', 'false', 'false', 'false'],
    "colorAll" : {
      "red": "#ff0000",
      "blue": "#00ffff",
      "orange": "#ff7500",
      "pink": "#ff1493",
      "black": "#000",
      "green": "#54ff9f",
      "gray": "	#ccc"
    },
    oldColor:"",
    oldpoint: [],
    "show" : "none",
    "x" : "",
    "y" : "",
    "text" : ""
  },
  moving:function(e){
    var i;
    const ctx = wx.createCanvasContext('worker-content');
    for(i = 0; i < 4; i++){
      if (this.data.flag[i] == 'true' && i == 1){
        ctx.setLineWidth(2);
        ctx.setStrokeStyle(this.data.oldColor);
        if(this.data.oldpoint.length == 0){
          var point = e.touches[0];
          this.data.oldpoint.push(point);
          // console.log(this.data.oldpoint);
        }else{
          var point = e.touches[0];
          // console.log(e.touches[0]);
          ctx.moveTo(this.data.oldpoint[0].x, this.data.oldpoint[0].y);
          console.log(this.data.oldpoint[0]);
          ctx.lineTo(e.touches[0].x, e.touches[0].y);
          this.data.oldpoint[0].x = e.touches[0].x;
          this.data.oldpoint[0].y = e.touches[0].y;
          ctx.stroke();
        }
      }
      if (this.data.flag[i] == 'true' && i == 3){
        console.log(this.data.flag);
        ctx.setLineWidth(10);
        ctx.setStrokeStyle("white");
        if (this.data.oldpoint.length == 0) {
          var point = e.touches[0];
          this.data.oldpoint.push(point);
          // console.log(this.data.oldpoint);
        } else {
          var point = e.touches[0];
          // console.log(e.touches[0]);
          ctx.moveTo(this.data.oldpoint[0].x, this.data.oldpoint[0].y);
          console.log(this.data.oldpoint[0]);
          ctx.lineTo(e.touches[0].x, e.touches[0].y);
          this.data.oldpoint[0].x = e.touches[0].x;
          this.data.oldpoint[0].y = e.touches[0].y;
          ctx.stroke();
        }
      }
      
    }
    ctx.draw(true); 
  },
  //TEXT的写执行
  write:function(e){
    console.log(e);
    const ctx = wx.createCanvasContext('worker-content');
    this.setData({
      text : e.detail.value,
      "show" : "none"
    });
    ctx.setFillStyle(this.data.oldColor);
    ctx.fillText(this.data.text, parseInt(this.data.x), parseInt(this.data.y));
    ctx.draw(true);
    // e.detail.value = "";
    this.setData({
      "text" : ""
    })
  },
  //在touch画布时绑定的事件
  start:function(e){
    var i;
    const ctx = wx.createCanvasContext('worker-content');
    ctx.setFontSize(20);
    // console.log(e.find("#text"));
    for(var i = 0; i < 4; i++){
      if(this.data.flag[i] == 'true' && i == 0){
        ctx.setFontSize(20);
        this.setData({
          "x": e.touches[0].x - 10 + "px",
          "y": e.touches[0].y - 10 + "px",
          "show": "block"
        })
        // console.log(this.data);
        // console.log(e.touches[0].x, e.touches[0].y);
        // console.log(e);
      }
    }
    ctx.draw(true);
  },
  //离开画布时绑定的事件
  end:function(e){
    var i;
    const ctx = wx.createCanvasContext('worker-content');
    // ctx.setFillStyle(this.data.oldColor);
    // console.log(typeof(this.data.oldColor));
    if(this.data.oldpoint.length != 0){
      this.data.oldpoint.pop();
    }
    // console.log(this.data.flag);
  },
  changePen:function(e){
    const ctx = wx.createCanvasContext('worker-content');
    if (this.data.flag[1] == 'false') {
      this.data.flag.splice(1, 1, 'true');
      for(var i = 0; i < 4; i++) {
        if (i != 1 && this.data.flag[i] == 'true') {
          this.data.flag.splice(i, 1, 'false');
        }
      }
    }
    // console.log(this.data.ctx);
    // console.log(this.data.flag + "  text");
  },
  changeText:function(e){
    console.log(e);
    const ctx = wx.createCanvasContext('worker-content');
    if (this.data.flag[0] == 'false') {
      this.data.flag.splice(0, 1, 'true');
      for (var i = 0; i < 4; i++) {
        if (i != 0 && this.data.flag[i] == 'true') {
          this.data.flag.splice(i, 1, 'false');
        }
      }
    }
    // console.log(this.data.flag);
  },
  changeEraser:function(e){
    const ctx = wx.createCanvasContext('worker-content');
    if (this.data.flag[3] == 'false') {
      this.data.flag.splice(3, 1, 'true');
      for (var i = 0; i < 4; i++) {
        if (i != 3 && this.data.flag[i] == 'true') {
          this.data.flag.splice(i, 1, 'false');
        }
      }
    }
    console.log(this.data.flag);
  },
  greenColor:function(e){
    this.setData({
      oldColor: "green"
    })
  },
  grayColor: function (e) {
    this.setData({
      oldColor: "gray"
    })
  },
  pinkColor: function (e) {
    this.setData({
      oldColor: "pink"
    })
  },
  blackColor: function (e) {
    this.setData({
      oldColor: "black"
    })
  },
  blueColor: function (e) {
    this.setData({
      oldColor: "blue"
    })
  },
  orangeColor: function (e) {
    this.setData({
      oldColor: "orange"
    })
  },
  redColor: function (e) {
    this.setData({
      oldColor: "red"
    })
  },
  changeBucket:function(e){
    const ctx = wx.createCanvasContext('worker-content');
    if (this.data.flag[2] == 'false') {
      this.data.flag.splice(2, 1, 'true');
      for (var i = 0; i < 4; i++) {
        if (i != 2 && this.data.flag[i] == 'true') {
          this.data.flag.splice(i, 1, 'false');
        }
      }
    }
    ctx.setFillStyle(this.data.oldColor);
    ctx.fillRect(0, 0, 356, 400);
    ctx.draw(true);
  },
  changeSave:function(e){
    const ctx = wx.createCanvasContext('worker-content');
    ctx.draw(true, setTimeout(function () {
      wx.canvasToTempFilePath({
        x: 0,
        y: 0,
        width: 406,
        height: 362,
        destWidth: 406,
        destHeight: 362,
        canvasId: 'worker-content',
        success: function (res) {
          wx.saveImageToPhotosAlbum({
            filePath: res.tempFilePath,
          })
        }
      })
    }, 100))
  },
  onReady:function(e){
    
  },
  clearcanvas:function(e){
    const ctx = wx.createCanvasContext('worker-content');
    ctx.setFillStyle('white');
    ctx.fillRect(0,0, 356, 403);
    ctx.draw(true);
  },
  returnmain:function(e){
    wx.redirectTo({
      url: '../index/index',
    })
  },
  onLoad: function () {
    this.setData({
      logs: (wx.getStorageSync('logs') || []).map(log => {
        return util.formatTime(new Date(log))
      })
    })
    const ctx = wx.createCanvasContext('worker-content');
    ctx.setFillStyle('white');
    ctx.fillRect(0, 0, 356, 403);
    ctx.draw(true);
  }
})
