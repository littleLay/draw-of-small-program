//logs.js
const util = require('../../utils/util.js')

Page({
  data: {
    logs: [],
    flag: ['false', 'false', 'false', 'false']
  },
  changePen:function(e){
    var context = wx.createContext('worker-content');
    context.setStrokeStyle("#FFD700");
    context.setLineWidth(2);
  },
  moving:function(e){
    var i;
    const ctx = wx.createCanvasContext('worker-content');
    for(i = 0; i < 4; i++){
      if (this.data.flag[i] == 'true' && i == 1){
        // ctx.save();
        ctx.setLineWidth(2);
        // ctx.setFillStyle("#B8860B");
        ctx.moveTo(e.touches[0].x, e.touches[0].y);
        ctx.lineTo(e.touches[0].x + 1, e.touches[0].y + 1);
        ctx.save();
        ctx.restore();
        // console.log(e);
      }
      if (this.data.flag[i] == 'true' && i == 3){

      }
      
    }
    ctx.stroke();
    ctx.draw();
    
  },
  end:function(e){
    var i;
    const ctx = wx.createCanvasContext('worker-content');
    for(i = 0; i < 4; i++){
      if (this.data.flag[i] == 'true') {
        switch (i){
          case 0:
            // this.data.flag.splice(0, 1, 'true');
            ctx.setFontSize(20);
            ctx.fillText('20', e.changedTouches[0].x, e.changedTouches[0].y);
            // ctx.strokeText('20', e.changedTouches[0].x, e.changedTouches[0].y,100);
            ctx.draw();
            break;
          case 2:
            break;
          case 3:
            break;
        }
        break; 
      }
    }
    if (i == 4 && this.data.flag[3] == 'flase') {
          wx.showModal({
            title: '提示',
            content: '未选择工具',
          })
      } 
    console.log(this.data.flag);
  },
  changePen:function(e){
    if (this.data.flag[1] == 'false') {
      this.data.flag.splice(1, 1, 'true');
      for(var i = 0; i < 4; i++) {
        if (i != 1 && this.data.flag[i] == 'true') {
          this.data.flag.splice(i, 1, 'false');
        }
      }
    }
      // console.log(this.data.flag + "  text");
  },
  changeText:function(e){
    // console.log(e);
    if (this.data.flag[0] == 'false') {
      this.data.flag.splice(0, 1, 'true');
      for (var i = 0; i < 4; i++) {
        if (i != 0 && this.data.flag[i] == 'true') {
          this.data.flag.splice(i, 1, 'false');
        }
      }
    }
    console.log(this.data.flag);
    // var flag = this.data.flag;
    
  },
  changeEraser:function(e){

  },
  changeBucker:function(e){

  },
  changeSave:function(e){

  },
  onReady:function(e){
    
  },
  onLoad: function () {
    this.setData({
      logs: (wx.getStorageSync('logs') || []).map(log => {
        return util.formatTime(new Date(log))
      })
    })    
  }
})
