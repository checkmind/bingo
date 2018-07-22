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
            success: function (ev) {
                console.log(ev);
            },
            fail: function () {
            },
            complete: function () {
            }
        });
    };
    GameConfig.initHelpArr = function () {
        if (!window["wx"])
            return;
        wx.getStorage({
            key: "helpArr",
            success: function (ev) {
                console.log('拿到数据了');
                console.log(ev.data);
                var data = ev.data;
                if (data)
                    GameConfig.helperArr = [11, 10, 10, 10, 10];
                else
                    GameConfig.helperArr = [10, 10, 10, 10, 10];
            },
            fail: function () {
            },
            complete: function () {
            }
        });
    };
    GameConfig.initCoin = function () {
        if (!this["wx"])
            return;
        wx.getStorage({
            key: "coin",
            success: function (ev) {
                var data = ev.data;
                if (!data)
                    GameConfig.coin = 1000;
                else
                    GameConfig.coin = data;
            },
            fail: function () {
            },
            complete: function () {
            }
        });
    };
    GameConfig.setHelpArr = function (num, index) {
        GameConfig.helperArr[index] += num;
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
    GameConfig.setCoin = function (num) {
        GameConfig.coin += num;
        if (!this["wx"])
            return;
        wx.setStorage({
            key: "coin",
            data: GameConfig.coin,
            success: function () {
                console.log("set success");
            },
            fail: function () { },
            complete: function () { }
        });
    };
    GameConfig.getCoin = function () {
        wx.getStorage({
            key: "coin",
            success: function (ev) {
                var data = ev.data;
                GameConfig.coin = +data;
            },
            fail: function () {
            },
            complete: function () {
            }
        });
    };
    //static domainUrl = 'http://cangnanshi.com/bingo/'
    GameConfig.domainUrl = 'https://qqqdu.oss-cn-beijing.aliyuncs.com/bingo/';
    /* 即使不能消除也能交换顺序 */
    GameConfig.canChange = false;
    GameConfig.canChangeTime = 10;
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
    // 金钱
    GameConfig.coin = 500;
    GameConfig.minCoin = 10000;
    /* 道具数目 */
    GameConfig.helperArr = [1, 1, 1, 1, 1];
    GameConfig.helperPrice = [1000, 1000, 1000, 1000, 1000];
    GameConfig.helperSrc = ['1', 'hit', 'change', 'foot', 'time'];
    /* 星球种类 */
    GameConfig.bingosMax = 8;
    GameConfig.taxArr = ['一', '二', '三', '四', '五', '六', '七', '八'];
    // 无限模式初始化时间
    GameConfig.infiniteTime = 100;
    GameConfig.infiniteRow = 7;
    GameConfig.infiniteCol = 7;
    GameConfig.infiniteBingoType = 7;
    // 速度
    GameConfig.infiniteColV = 100;
    // 当前关卡
    GameConfig.nowTax = -1;
    // 当前最强关卡
    GameConfig.maxTax = 0;
    // 第一关限定步数
    GameConfig.taxConfig = [];
    return GameConfig;
}());
__reflect(GameConfig.prototype, "GameConfig");
//# sourceMappingURL=GameConfig.js.map