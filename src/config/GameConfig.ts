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
    static taxConfig = [{
        row: 4,
        col: 4,
        checkType: 'uncommon',
        // 目标分数
        myScore: 2000,
        // 限定步数
        step: 20,
        // 限定时间 为0不限定
        time: 0,
        // 类型
        bingoType: 4,
        // 最顶层放稀有星球 稀有星球需到底部
        uncommon: 0
    // 第二关限定时间
    },{
        row: 5,
        col: 5,
        checkType: 'uncommon',
        //uncommon: 4,
        // 从下到上 宇宙会黑掉，这个是黑掉的时间
        darkTime: 10,
        myScore: 3800,
        bingoType: 4,
        step: 0,
        // 限定时间 为0不限定
        time: 10,
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
        step: 20,
        // 限定时间 为0不限定
        time: 0,
    },{
        row: 7,
        checkType: 'uncommon',
        col: 7,
        // 每隔五秒钟没消除操作就失败 允许来回挪动 如果没有能消除的就打乱
        matrix: [],
        myScore: 5000,
        bingoType: 4,
        step: 20,
        // 限定时间 为0不限定
        time: 0,
    },{
        row: 8,
        checkType: 'uncommon',
        col: 8,
        // 每隔五秒钟星球会随机变化
        matrix: [],
        myScore: 6000,
        bingoType: 4,
        step: 20,
        // 限定时间 为0不限定
        time: 0,
    },{
        row: 8,
        checkType: 'uncommon',
        col: 9,
        // 每隔五秒钟星球会随机变化
        matrix: [],
        myScore: 7000,
        bingoType: 4,
        step: 20,
        // 限定时间 为0不限定
        time: 0,
    },{
        row: 8,
        checkType: 'uncommon',
        col: 10,
        // 每隔五秒钟星球会随机变化
        matrix: [],
        myScore: 8000,
        bingoType: 4,
        step: 20,
        // 限定时间 为0不限定
        time: 0,
    },];
    static generatorBingos() {

    }
    static async createBitmapByName(name: string) {
        let url = GameConfig.domainUrl+name;
        console.log(url)
         var image = new eui.Image();
         egret.ImageLoader.crossOrigin = "anonymous"
         image.source = url;
         console.log("source")
         return image;
    }
    public constructor(){
        
    }
}