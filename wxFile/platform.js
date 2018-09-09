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
        music.loop = true
        music.play();
    }
    playClearMusic() {
        let music =  wx.createInnerAudioContext()
        music.src = 'http://cangnanshi.com/bingo/clear2.mp3'
        music.play();
    }
    playButtonMusic() {
        let music =  wx.createInnerAudioContext()
        music.src = 'http://cangnanshi.com/bingo/button.mp3'
        music.play();
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
    saveImg() {
        var imgSrc = "https://cangnanshi.com/bingo/success.png"
        let downFile = wx.downloadFile({
            url: imgSrc,
            filePath: '',
            header: {},
            success(res) {
                console.log(res.tempFilePath)
                wx.saveImageToPhotosAlbum({
                    filePath: res.tempFilePath,
                    success() {
                        wx.showToast({
                            title: '保存成功'
                        })
                    },
                    fail(err){
                        console.log(err);
                    }
                })

            },
            fail(res) {
                console.log(res)
            }
        })
        downFile.onProgressUpdate((res)=>{
            console.log(res)
        })
    }
    getHelpStorage() {
        return new Promise((resolve)=>{
            wx.getStorage({
                key: "helpArr",
                success(ev) {
                    console.log('道具是')
                    console.log(ev)
                    if(ev.data)
                        resolve(ev.data.split("_"))
                    else   
                        resolve([1,0,0,0])
                },
                fail() {

                },
                complete() {

                }
            })
        })
    }
    getCoinStorage() {
        return new Promise((resolve)=>{
            wx.getStorage({
                key: "coin",
                success(ev) {
                    let data = ev.data;
                    resolve(data)
                },
                fail() {

                },
                complete() {

                }
            })
        })
    }
    setCoinStorage(num) {
        wx.setStorage({
            key: "coin",
            data: num,
            success() {
                console.log("set success");
            },
            fail(){},
            complete(){}
        })
    }
    setHelpStorage(str) {
        wx.setStorage({
            key: "helpArr",
            data: str,
            success() {
                console.log("set success");
            },
            fail(){},
            complete(){}
        })
    }
    // 得到关卡数
    getTax() {
        console.log('得到关卡')
        return new Promise((resolve)=>{
            wx.getStorage({
                key: "maxTax",
                success(ev) {
                    console.log('关卡')
                    console.log(ev)
                    resolve && resolve(+ev.data)
                },
                fail() {

                },
                complete() {

                }
            })
        })
    }
    // 设置当前关卡
    passTax(num) {
        console.log('设置关卡')
       let tax = null;
       this.getTax().then((res)=>{
            tax = res
       })
       if(num <= tax)
            return;
        wx.setStorage({
            key: "maxTax",
            data: num,
            success() {
                console.log("set success");
            },
            fail(){},
            complete(){}
        })
    }
    shareAppMessage() {
        wx.shareAppMessage({
            title: "大夏天的，来消除几颗星球吧",
            imageUrl: 'https://cangnanshi.com/bingo/title.png',
            query: '',
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
wx.setStorage({
    key: "helpArr",
    data: '',
    success() {
        console.log("set success");
    },
    fail(){},
    complete(){}
})

window.platform = new WxgamePlatform();
