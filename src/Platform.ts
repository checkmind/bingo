/** 
 * 平台数据接口。
 * 由于每款游戏通常需要发布到多个平台上，所以提取出一个统一的接口用于开发者获取平台数据信息
 * 推荐开发者通过这种方式封装平台逻辑，以保证整体结构的稳定
 * 由于不同平台的接口形式各有不同，白鹭推荐开发者将所有接口封装为基于 Promise 的异步形式
 */
declare interface Platform {

    getUserInfo(): Promise<any>;

    saveData(data): Promise<any>

    login(): Promise<any>
    
    createInnerAudioContext() :Promise<any>   

    playClearMusic() :Promise<any>

    playButtonMusic() :Promise<any>

    shareAppMessage(): Promise<any>

    saveImg():Promise<any>

    passTax(tax:Number):Promise<any>

    getTax():Promise<any>
}
class DebugPlatform implements Platform {
    async getUserInfo() {
        return { nickName: "username" }
    }
    async login() {

    }
    async saveImg() {

    }
    // 分享小程序
    async shareAppMessage() {

    }
    async saveData(data) {

    }
    async createInnerAudioContext () {
    //   let music =  wx.createInnerAudioContext()
    //   music.src = 'http://cangnanshi.com/bingo/music.mp3'
    //   music.play();
    }
    async playClearMusic() {
    //   let music =  wx.createInnerAudioContext()
    //   music.src = 'http://cangnanshi.com/bingo/clear.mp3'
    //   music.play();
    }
    async playButtonMusic() {
    //   let music =  wx.createInnerAudioContext()
    //   music.src = 'http://cangnanshi.com/bingo/button.mp3'
    //   music.play();
    }
    async passTax() {

    }
    async getTax() {

    }
}


if (!window.platform) {
    window.platform = new DebugPlatform();
}



declare let platform: Platform;

declare interface Window {

    platform: Platform
}





