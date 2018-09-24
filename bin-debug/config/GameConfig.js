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
        var url = GameConfig.domainUrl + name;
        var image = new eui.Image();
        egret.ImageLoader.crossOrigin = "anonymous";
        image.source = url;
        return image;
    };
    GameConfig.initData = function (data) {
        data = data.result;
        GameConfig.helperArr = data.helps;
        GameConfig.coin = data.coin;
        GameConfig.maxTax = data.maxTax;
        GameConfig.nowTax = GameConfig.maxTax;
    };
    GameConfig.initHelpArr = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = GameConfig;
                        return [4 /*yield*/, platform.getHelpStorage()];
                    case 1:
                        _a.helperArr = _b.sent();
                        if (!GameConfig.helperArr) {
                            GameConfig.helperArr = [1, 1, 1, 1, 1];
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    GameConfig.initCoin = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = GameConfig;
                        return [4 /*yield*/, platform.getCoinStorage()];
                    case 1:
                        _a.coin = _b.sent();
                        if (!GameConfig.coin) {
                            GameConfig.coin = 0;
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    GameConfig.initTax = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = GameConfig;
                        return [4 /*yield*/, platform.getTax()];
                    case 1:
                        _a.maxTax = _b.sent();
                        GameConfig.nowTax = GameConfig.maxTax;
                        if (!GameConfig.maxTax) {
                            GameConfig.maxTax = 0;
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    GameConfig.setHelpArr = function (num, index) {
        GameConfig.helperArr[index] += num;
        platform.setHelpStorage(GameConfig.helperArr);
    };
    GameConfig.setCoin = function (num) {
        GameConfig.coin += num;
        platform.setCoinStorage(GameConfig.coin);
    };
    GameConfig.SectionToChinese = function (section) {
        var strIns = '', chnStr = '';
        var unitPos = 0;
        var zero = true;
        while (section > 0) {
            var v = section % 10;
            if (v === 0) {
                if (!zero) {
                    zero = true;
                    chnStr = GameConfig.chnNumChar[v] + chnStr;
                }
            }
            else {
                zero = false;
                strIns = GameConfig.chnNumChar[v];
                strIns += GameConfig.chnUnitChar[unitPos];
                chnStr = strIns + chnStr;
            }
            unitPos++;
            section = Math.floor(section / 10);
        }
        return chnStr;
    };
    GameConfig.domainUrl = 'https://cangnanshi.com/bingo/';
    //static domainUrl = 'https://qqqdu.oss-cn-beijing.aliyuncs.com/bingo/'
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
    GameConfig.coin = 0;
    /* 道具数目 */
    GameConfig.helperArr = [1, 0, 0, 0, 0];
    GameConfig.helperPrice = [1999, 1999, 1999, 2888, 2888];
    GameConfig.helperSrc = ['1', 'hit', 'change', 'foot', 'time'];
    /* 星球种类 */
    GameConfig.bingosMax = 8;
    GameConfig.taxArr = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九'];
    // 无限模式初始化时间
    GameConfig.infiniteTime = 1220;
    GameConfig.infiniteRow = 7;
    GameConfig.infiniteCol = 7;
    GameConfig.infiniteBingoType = 7;
    // 速度
    GameConfig.infiniteColV = 100;
    // 当前关卡
    GameConfig.nowTax = 0;
    // 当前最强关卡
    GameConfig.maxTax = 14;
    // 第一关限定步数
    GameConfig.taxConfig = [];
    GameConfig.chnNumChar = ["零", "一", "二", "三", "四", "五", "六", "七", "八", "九"];
    GameConfig.chnUnitSection = ["", "万", "亿", "万亿", "亿亿"];
    GameConfig.chnUnitChar = ["", "十", "百", "千"];
    return GameConfig;
}());
__reflect(GameConfig.prototype, "GameConfig");
