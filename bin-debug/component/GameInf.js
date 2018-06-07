var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
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
    游戏信息面板
**/
var GameInf = (function (_super) {
    __extends(GameInf, _super);
    function GameInf(width, height, parent) {
        var _this = _super.call(this) || this;
        _this.image = new egret.Bitmap();
        _this.myScore = 0;
        _this.propsArr = [];
        _this.backToPage = '';
        _this.hadProps = true;
        _this.x = 0;
        _this.y = 0;
        _this.width = width;
        _this.heights = height;
        _this.parents = parent;
        if (GameConfig.nowTax != -1)
            _this.maxStep = GameConfig.taxConfig[GameConfig.nowTax].step;
        else
            _this.maxStep = 0;
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.addImage, _this);
        return _this;
    }
    GameInf.prototype.addImage = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.addTaxNum();
                        this.updataScroe();
                        //this.updataStep();
                        return [4 /*yield*/, this.addBack()];
                    case 1:
                        //this.updataStep();
                        _a.sent();
                        this.addTimer();
                        this.addStep();
                        this.addProps();
                        return [2 /*return*/];
                }
            });
        });
    };
    // 重置各种 游戏信息
    GameInf.prototype.resetInf = function () {
        this.myScore = 0;
        this.updataScroe();
        if (GameConfig.nowTax == -1) {
            this.Timer.resetTime();
            return;
        }
        if (GameConfig.taxConfig[GameConfig.nowTax].time != 0)
            this.Timer.resetTime();
        if (GameConfig.taxConfig[GameConfig.nowTax].step != 0)
            this.StepClass.resetStep();
    };
    // 得到道具
    GameInf.prototype.getProps = function (type) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var sprite, shape, img, hit, taxNum;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.hadProps) {
                            return [2 /*return*/];
                        }
                        sprite = new egret.Sprite();
                        shape = new egret.Shape();
                        shape.graphics.beginFill(0x333, 0.5);
                        shape.graphics.drawRect(0, 0, this.width, this.height + 100);
                        shape.graphics.endFill();
                        this.hadProps = false;
                        img = GameConfig.helperSrc[type];
                        return [4 /*yield*/, GameConfig.createBitmapByName(img + '.png')];
                    case 1:
                        hit = _a.sent();
                        hit.width = hit.height = 100;
                        hit.x = this.width / 2 - hit.width / 2;
                        hit.y = this.height / 2 - hit.height / 2 - 50;
                        taxNum = new TaxButton();
                        taxNum.skinName = "resource/eui_skins/GetHelper.exml";
                        taxNum.label = '您获得了一块：“二向箔”';
                        taxNum.label2 = '使用它可以对一个星球及其周围八个星球进行降维打击';
                        taxNum.x = this.width / 2 - taxNum.width / 2;
                        taxNum.y = this.height / 2 - taxNum.height / 2;
                        sprite.addChild(shape);
                        sprite.addChild(taxNum);
                        sprite.addChild(hit);
                        this.$parent.addChild(sprite);
                        this.$parent.setChildIndex(this, 99999);
                        taxNum.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
                            GameConfig.helperArr[type] += 1;
                            _this.hadProps = true;
                            _this.propsArr[type].setNum();
                            if (sprite.$parent)
                                _this.$parent.removeChild(sprite);
                        }, this);
                        return [2 /*return*/];
                }
            });
        });
    };
    GameInf.prototype.addProps = function () {
        var maxType = GameConfig.helperArr.length;
        console.log(this.width / 2);
        // 整个盒子的宽度是  
        var moveX = this.width / 4 - 100 * maxType / 4 - 20;
        console.log(moveX);
        for (var type = 0; type < maxType; type++) {
            var props = new Prop(moveX + 60 * type, (790 + 40) / 2, type, this);
            this.propsArr.push(props);
            this.addChild(props);
        }
    };
    GameInf.prototype.addTimer = function () {
        if (GameConfig.nowTax !== -1 && GameConfig.taxConfig[GameConfig.nowTax].time === 0)
            return;
        this.Timer = new Timer(this.width, this.heights, this.width, this.height, this);
        this.addChild(this.Timer);
    };
    GameInf.prototype.addStep = function () {
        // 关卡不用限定步数
        if (this.maxStep === 0)
            return;
        this.StepClass = new StepClass(this.width, this.heights, this.width, this.height, this);
        this.addChild(this.StepClass);
        this.StepClass.changeStep(this.maxStep);
    };
    GameInf.prototype.gameOver = function () {
        console.log("gameover");
        this.parents.gameOver();
    };
    GameInf.prototype.addBack = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var sky;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, GameConfig.createBitmapByName("back.png")];
                    case 1:
                        sky = _a.sent();
                        sky.width = sky.height = 40;
                        sky.x = 20;
                        sky.y = 50;
                        sky.touchEnabled = true;
                        sky.addEventListener('touchEnd', function () {
                            PageBus.gotoPage(_this.backToPage);
                        }, this);
                        this.addChild(sky);
                        return [2 /*return*/];
                }
            });
        });
    };
    GameInf.prototype.addTaxNum = function () {
        this.taxNum = new TaxButton();
        this.taxNum.skinName = "resource/eui_skins/TitleSkin.exml";
        if (GameConfig.nowTax != -1)
            this.taxNum.label2 = '第' + GameConfig.taxArr[GameConfig.nowTax] + '宇宙';
        else
            this.taxNum.label2 = '无尽模式';
        this.taxNum.label = '熵值：0';
        this.taxNum.x = (this.width - this.taxNum.width) - 100;
        this.taxNum.y = 5;
        this.addChild(this.taxNum);
    };
    /* 更新成绩 */
    GameInf.prototype.updataScroe = function () {
        this.taxNum.label = "\u71B5\u503C\uFF1A" + this.myScore;
    };
    /* 更新步数 */
    GameInf.prototype.updataStep = function () {
        if (GameConfig.nowTax === -1)
            return;
        this.maxStep--;
        this.StepClass && this.StepClass.changeStep(this.maxStep);
    };
    return GameInf;
}(egret.Sprite));
__reflect(GameInf.prototype, "GameInf");
