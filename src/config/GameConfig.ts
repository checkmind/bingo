/* 
**/
class GameConfig{
    //static domainUrl = 'http://cangnanshi.com/bingo/'
    static domainUrl = 'https://qqqdu.oss-cn-beijing.aliyuncs.com/bingo/'
    /* 即使不能消除也能交换顺序 */
    static canChange = false;
    static canChangeTime = 10;
    // GameBody 占据的y和高度
    static GameBodyY = 0;
    static GameBodyH = 0;
    /* 当前状态 
    * state :
    *   0 游戏还未开始
    *   1 游戏开始
    *   2 游戏结束
    *   3 游戏成功
    **/
    static state = 0;
    // 道具 1，清除 2，乱序 3，增加步数
    static helper = 0;
    /* 当前步数 */
    static stepOnoff = true;
    static maxStep = 20;  
    // 金钱
    static coin = 500;
    static minCoin = 10000;
    /* 道具数目 */
    static helperArr = [1,1,1,1,1];
    static helperPrice = [1000,1000,1000,1000,1000];
    static helperSrc = ['1','hit','change','foot','time']
    /* 星球种类 */
    static bingosMax = 8;
    static taxArr = ['一','二','三','四','五','六','七','八'];
    // 无限模式初始化时间
    static infiniteTime = 100;
    static infiniteRow = 7;
    static infiniteCol = 7;
    static infiniteBingoType = 7;
    // 速度
    static infiniteColV = 100;
    // 当前关卡
    static nowTax = -1;
    // 当前最强关卡
    static maxTax = 0;
     
    // 第一关限定步数
    static taxConfig = [];
    
    static generatorBingos() {

    }
    static async createBitmapByName(name: string) {
        let url = GameConfig.domainUrl+name;
         var image = new eui.Image();
         egret.ImageLoader.crossOrigin = "anonymous"
         image.source = url;
         return image;
    }
    static shareFun() {
        wx.shareAppMessage({
            title: "大夏天的，来消除几颗星球吧",
            imageUrl: '',
            query: '22',
            success(ev) {
                console.log(ev)
            },
            fail(){

            },
            complete() {
            }
        })
    }
    static initHelpArr() {
        if(!window["wx"])
            return;
        wx.getStorage({
            key: "helpArr",
            success(ev) {
                console.log('拿到数据了')
                console.log(ev.data);
                let data = ev.data;
                if(data)
                    GameConfig.helperArr = [11,10,10,10,10]
                    //GameConfig.helperArr = data.split("")
                else   
                    GameConfig.helperArr = [10,10,10,10,10]
            },
            fail() {

            },
            complete() {

            }
        })
    }
    static initCoin() {
        if(!this["wx"])
            return;
        wx.getStorage({
            key: "coin",
            success(ev) {
                let data = ev.data;
                if(!data)
                    GameConfig.coin = 1000
                else 
                    GameConfig.coin = data;
            },
            fail() {

            },
            complete() {

            }
        })
    }
    static setHelpArr(num,index) {
        GameConfig.helperArr[index] += num;
        let str = GameConfig.helperArr.join("");
        if(!this["wx"])
            return;
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
    static setCoin(num) {
        GameConfig.coin += num;
        if(!this["wx"])
            return;
        wx.setStorage({
            key: "coin",
            data: GameConfig.coin,
            success() {
                console.log("set success");
            },
            fail(){},
            complete(){}
        })
    }
    static getCoin() {
        wx.getStorage({
            key: "coin",
            success(ev) {
                let data = ev.data;
                GameConfig.coin = +data;
            },
            fail() {

            },
            complete() {

            }
        })
    }
    public constructor(){
        
    }
}