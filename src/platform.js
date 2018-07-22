/**
 * 请在白鹭引擎的Main.ts中调用 platform.login() 方法调用至此处。
 */

class WxgamePlatform {

    name = 'wxgame'

    login() {
        return new Promise((resolve, reject) => {
            wx.login({
                success: (res) => {
                    resolve(res)
                }
            })
        })
    }

    getUserInfo() {
        return new Promise((resolve, reject) => {
            wx.getUserInfo({
                withCredentials: true,
                success: function (res) {
                    var userInfo = res.userInfo
                    var nickName = userInfo.nickName
                    var avatarUrl = userInfo.avatarUrl
                    var gender = userInfo.gender //性别 0：未知、1：男、2：女
                    var province = userInfo.province
                    var city = userInfo.city
                    var country = userInfo.country
                    resolve(userInfo);
                }
            })
        })
    }
    createInnerAudioContext () {
        let music =  wx.createInnerAudioContext()
        music.src = 'http://cangnanshi.com/bingo/music.mp3'
        //music.play();
    }
    playClearMusic() {
        let music =  wx.createInnerAudioContext()
        music.src = 'http://cangnanshi.com/bingo/clear.mp3'
        //music.play();
    }
    playButtonMusic() {
        let music =  wx.createInnerAudioContext()
        music.src = 'http://cangnanshi.com/bingo/button.mp3'
        //music.play();
    }
    saveData(data) {
        console.log('数据是')
        console.log(data);
        let openDataContext = wx.getOpenDataContext();
        openDataContext.postMessage({
            array: [data],
            type: 'save',
            year: (new Date()).getFullYear()
        });
    }
    shareAppMessage() {
        wx.shareAppMessage({
            title: "大夏天的，来消除几颗星球吧",
            imageUrl: '',
            query: '22',
            success() {
            },
            fail(){

            },
            complete() {
            }
        })
    }

    openDataContext = new WxgameOpenDataContext();
}

class WxgameOpenDataContext {

    createDisplayObject(type,width,height){
        const bitmapdata = new egret.BitmapData(sharedCanvas);
        bitmapdata.$deleteSource = false;
        const texture = new egret.Texture();
        texture._setBitmapData(bitmapdata);
        const bitmap = new egret.Bitmap(texture);
        bitmap.width = width;
        bitmap.height = height;

        egret.startTick((timeStarmp) => {
            egret.WebGLUtils.deleteWebGLTexture(bitmapdata.webGLTexture);
            bitmapdata.webGLTexture = null;
            return false;
        }, this);
        return bitmap;
    }


    postMessage(data){
        const openDataContext = wx.getOpenDataContext();
        openDataContext.postMessage(data);
    }
}


window.platform = new WxgamePlatform();
