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
    // 当前关卡
    static nowTax = -1;
    // 当前最强关卡
    static maxTax = 0;
    // 第一关限定步数
    static taxConfig = [
        {
        row: 7,
        checkType: 'uncommon',
        col: 7,
        uncommon: 4,
        // 每隔五秒钟没消除操作就失败 允许来回挪动 如果没有能消除的就打乱
        matrix: [],
        myScore: 1000,
        bingoType: 4,
        step: 0,
        // 限定时间 为0不限定
        time: 5,
        monster: true,
        //每隔一段时间星球会变暗
        darkTime: false,
        // 每隔一段时间星球会变成其他星球
        changeTime: true
        },{
        row: 4,
        col: 4,
        checkType: 'uncommon',
        // 目标分数
        myScore: 1500,
        // 限定步数
        step: 0,
        // 限定时间 为0不限定
        time: 60,
        // 类型
        bingoType: 4,
        // 最顶层放稀有星球 稀有星球需到底部
        uncommon: 0
    // 第二关限定时间
    },{
        row: 5,
        col: 5,
        checkType: 'uncommon',
        // 从下到上 宇宙会黑掉，这个是黑掉的时间
        darkTime: 10,
        myScore: 3800,
        bingoType: 4,
        step: 20,
        // 限定时间 为0不限定
        time: 0,
    },{
        row: 6,
        checkType: 'uncommon',
        col: 6,
        myScore: 3000,
        bingoType: 4,
        step: 20,
        // 限定时间 为0不限定
        time: 0,
    },{
        row: 7,
        checkType: 'uncommon',
        col: 7,
        // 十字陷阱，必须把同等星球放到规定的地方，这个允许来回挪动
        matrix: [],
        myScore: 4000,
        bingoType: 4,
        step: 0,
        // 限定时间 为0不限定
        time: 60,
    },{
        row: 7,
        checkType: 'uncommon',
        col: 7,
        // 每隔五秒钟没消除操作就失败 允许来回挪动 如果没有能消除的就打乱
        matrix: [],
        myScore: 5000,
        bingoType: 4,
        step: 0,
        // 限定时间 为0不限定
        time: 60,
        monster: true
    },{
        row: 7,
        checkType: 'uncommon',
        col: 7,
        // 每隔五秒钟星球会随机变化
        matrix: [],
        myScore: 6000,
        bingoType: 4,
        step: 0,
        // 限定时间 为0不限定
        time: 60
    },{
        row: 8,
        checkType: 'uncommon',
        col: 8,
        // 每隔五秒钟星球会随机变化
        matrix: [],
        myScore: 6000,
        bingoType: 5,
        step: 0,
        // 限定时间 为0不限定
        time: 60,
    },{
        row: 8,
        checkType: 'uncommon',
        col: 10,
        // 每隔五秒钟星球会随机变化
        matrix: [],
        myScore: 6500,
        bingoType: 6,
        step: 0,
        // 限定时间 为0不限定
        time: 50,
        monster: true
    },];
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
        GameConfig.helperArr = [0,0,0,0];
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