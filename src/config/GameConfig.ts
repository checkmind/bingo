/* 
**/
class GameConfig{
    //static domainUrl = 'http://cangnanshi.com/bingo/'
    static domainUrl = 'https://qqqdu.oss-cn-beijing.aliyuncs.com/bingo/'
    /* 即使不能消除也能交换顺序 */
    static canChange = false;
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
    /* 道具数目 */
    static helperArr = [10,3,4,5];
    static helperSrc = ['1','hit','foot','change']
    /* 星球种类 */
    static bingosMax = 8;
    static taxArr = ['一','二','三','四','五','六','七','八'];
    // 无限模式初始化时间
    static infiniteTime = 60;
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
            success() {
            },
            fail(){

            },
            complete() {
            }
        })
    }
    static initHelpArr() {
        GameConfig.helperArr = [10,0,0,0];
        if(!this["wx"])
            return;
        wx.getStorage({
            key: "helpArr",
            success(ev) {
                let data = ev.data;
                GameConfig.helperArr = data.split("")
            },
            fail() {

            },
            complete() {

            }
        })
    }
    static setHelpArr(num,index) {
        GameConfig.helperArr[index] = num;
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
    public constructor(){
        
    }
}