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
    static coin = 0;
    /* 道具数目 */
    static helperArr = [1,0,0,0,0];
    static helperPrice = [1999,1999,1999,2888,2888];
    static helperSrc = ['1','hit','change','foot','time']
    /* 星球种类 */
    static bingosMax = 8;
    static taxArr = ['零','一','二','三','四','五','六','七','八','九'];
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
    static async initHelpArr() {
        GameConfig.helperArr = await platform.getHelpStorage();
        if(!GameConfig.helperArr) {
            GameConfig.helperArr = [100,100,100,100,100]  
        }
    }
    static async initCoin() {
        GameConfig.coin = await platform.getCoinStorage();
        if(!GameConfig.coin) {
            GameConfig.coin = 0
        }
    }
    static setHelpArr(num,index) {
        GameConfig.helperArr[index] += num;
        let str = GameConfig.helperArr.join("");
        platform.setHelpStorage(str)
    }
    static setCoin(num) {
        GameConfig.coin += num;
        platform.setCoinStorage(GameConfig.coin)
    }
    
    static async initTax() {
        GameConfig.maxTax = await platform.getTax(); 
        if(!GameConfig.maxTax) {
            GameConfig.maxTax = 0
        }
    }
    static chnNumChar = ["零","一","二","三","四","五","六","七","八","九"];
    static chnUnitSection = ["","万","亿","万亿","亿亿"];
    static chnUnitChar = ["","十","百","千"];

    static SectionToChinese(section){
        var strIns = '', chnStr = '';
        var unitPos = 0;
        var zero = true;
        while(section > 0){
            var v = section % 10;
            if(v === 0){
                if(!zero){
                    zero = true;
                    chnStr = GameConfig.chnNumChar[v] + chnStr;
                }
            }else{
                zero = false;
                strIns = GameConfig.chnNumChar[v];
                strIns += GameConfig.chnUnitChar[unitPos];
                chnStr = strIns + chnStr;
            }
            unitPos++;
            section = Math.floor(section / 10);
        }
        return chnStr;
    }
    public constructor(){
        
    }
}