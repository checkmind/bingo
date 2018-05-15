var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/*
**/
var GameConfig = (function () {
    function GameConfig() {
    }
    GameConfig.generatorBingos = function () {
    };
    /* 即使不能消除也能交换顺序 */
    GameConfig.canChange = false;
    /* 当前状态
    * state :
    *   0 游戏还未开始
    *   1 游戏开始
    *   2 游戏结束
    *   3 游戏成功
    **/
    GameConfig.state = 0;
    // 道具 1，清除 2，乱序 3，增加步数
    GameConfig.helper = 0;
    /* 当前步数 */
    GameConfig.stepOnoff = true;
    GameConfig.maxStep = 20;
    /* 道具数目 */
    GameConfig.helperArr = [10, 3, 4];
    /* 星球种类 */
    GameConfig.bingosMax = 8;
    GameConfig.taxArr = ['一', '二', '三', '四', '五', '六', '七', '八'];
    // 当前关卡
    GameConfig.nowTax = 0;
    // 当前最强关卡
    GameConfig.maxTax = 0;
    GameConfig.taxConfig = [{
            row: 5,
            col: 5,
            checkType: 'uncommon',
            // 目标分数
            myScore: 2000,
            // 限定步数
            step: 20,
            // 限定时间 为0不限定
            time: 0,
            // 类型
            bingoType: 5,
            // 最顶层放稀有星球 稀有星球需到底部
            uncommon: 5
        }, {
            row: 5,
            col: 5,
            checkType: 'uncommon',
            //uncommon: 4,
            // 从下到上 宇宙会黑掉，这个是黑掉的时间
            darkTime: 60,
            myScore: 3800,
            bingoType: 4,
            step: 25,
            // 限定时间 为0不限定
            time: 0,
        }, {
            row: 6,
            checkType: 'uncommon',
            col: 6,
            myScore: 3000,
            bingoType: 4,
            step: 20,
            // 限定时间 为0不限定
            time: 0,
        }, {
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
        }, {
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
        }, {
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
        }, {
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
        }, {
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
    return GameConfig;
}());
__reflect(GameConfig.prototype, "GameConfig");
//# sourceMappingURL=GameConfig.js.map