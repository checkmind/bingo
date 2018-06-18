var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
/*
**/
var GameConfig = (function () {
    function GameConfig() {
    }
    GameConfig.generatorBingos = function () {
    };
    GameConfig.createBitmapByName = function (name) {
        return __awaiter(this, void 0, void 0, function () {
            var url, image;
            return __generator(this, function (_a) {
                url = GameConfig.domainUrl + name;
                image = new eui.Image();
                egret.ImageLoader.crossOrigin = "anonymous";
                image.source = url;
                return [2 /*return*/, image];
            });
        });
    };
    GameConfig.shareFun = function () {
        wx.shareAppMessage({
            title: "大夏天的，来消除几颗星球吧",
            imageUrl: '',
            query: '22',
            success: function () {
            },
            fail: function () {
            },
            complete: function () {
            }
        });
    };
    GameConfig.initHelpArr = function () {
        GameConfig.helperArr = [0, 0, 0, 0];
        if (!this["wx"])
            return;
        wx.getStorage({
            key: "helpArr",
            success: function (ev) {
                var data = ev.data;
                GameConfig.helperArr = data.split("");
            },
            fail: function () {
            },
            complete: function () {
            }
        });
    };
    GameConfig.setHelpArr = function (num, index) {
        GameConfig.helperArr[index] = num;
        var str = GameConfig.helperArr.join("");
        if (!this["wx"])
            return;
        wx.setStorage({
            key: "helpArr",
            data: str,
            success: function () {
                console.log("set success");
            },
            fail: function () { },
            complete: function () { }
        });
    };
    //static domainUrl = 'http://cangnanshi.com/bingo/'
    GameConfig.domainUrl = 'https://qqqdu.oss-cn-beijing.aliyuncs.com/bingo/';
    /* 即使不能消除也能交换顺序 */
    GameConfig.canChange = false;
    // GameBody 占据的y和高度
    GameConfig.GameBodyY = 0;
    GameConfig.GameBodyH = 0;
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
    GameConfig.helperArr = [10, 3, 4, 5];
    GameConfig.helperSrc = ['1', 'hit', 'foot', 'change'];
    /* 星球种类 */
    GameConfig.bingosMax = 8;
    GameConfig.taxArr = ['一', '二', '三', '四', '五', '六', '七', '八'];
    // 无限模式初始化时间
    GameConfig.infiniteTime = 60;
    GameConfig.infiniteRow = 7;
    GameConfig.infiniteCol = 7;
    GameConfig.infiniteBingoType = 7;
    // 当前关卡
    GameConfig.nowTax = -1;
    // 当前最强关卡
    GameConfig.maxTax = 0;
    // 第一关限定步数
    GameConfig.taxConfig = [
        {
            row: 7,
            checkType: 'uncommon',
            col: 7,
            uncommon: 4,
            // 每隔五秒钟没消除操作就失败 允许来回挪动 如果没有能消除的就打乱
            matrix: [],
            myScore: 5000,
            bingoType: 4,
            step: 0,
            // 限定时间 为0不限定
            time: 10,
            monster: true,
            //每隔一段时间星球会变暗
            darkTime: false,
            // 每隔一段时间星球会变成其他星球
            changeTime: true
        }, {
            row: 4,
            col: 4,
            checkType: 'uncommon',
            // 目标分数
            myScore: 2000,
            // 限定步数
            step: 0,
            // 限定时间 为0不限定
            time: 60,
            // 类型
            bingoType: 4,
            // 最顶层放稀有星球 稀有星球需到底部
            uncommon: 0
            // 第二关限定时间
        }, {
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
            step: 0,
            // 限定时间 为0不限定
            time: 60,
        }, {
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
        }, {
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
        }, {
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
        }, {
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
        },
    ];
    return GameConfig;
}());
__reflect(GameConfig.prototype, "GameConfig");
//# sourceMappingURL=GameConfig.js.map