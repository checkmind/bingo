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

    playPassMusic()

    playShootMusic()

    shareAppMessage(msg?:String): Promise<any>

    saveImg():Promise<any>

    passTax(tax:Number):Promise<any>

    getTax():Promise<any>

    getHelpStorage(): Promise<any>

    getCoinStorage(): Promise<any>

    setCoinStorage(num): Promise<any>

    setHelpStorage(num): Promise<any>

    showLoading()

    hideLoading()
}
class DebugPlatform implements Platform {
    showLoading() {

    }
    hideLoading() {

    }
    async getUserInfo() {
        return { nickName: "username" }
    }
    async login() {

    }
    async saveImg() {

    }
    // 分享小程序
    async shareAppMessage(msg?:String) {

    }
    // 得到本地道具信息
    async getHelpStorage() {

    }
    // 储存本地道具信息
    async setHelpStorage(obj) {

    }
    // 得到本地金钱信息
    async getCoinStorage() {

    }
    // 储存本地金钱信息
    async setCoinStorage(num) {

    }
    async saveData(data) {

    }
    async createInnerAudioContext () {

    }
    async playClearMusic() {

    }
    async playButtonMusic() {

    }
    async playShootMusic() {
        
    }
    async playPassMusic() {

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





