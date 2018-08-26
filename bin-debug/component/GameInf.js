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
                        //this.getProps(2);
                        this.myCoin();
                        this.myGoal();
                        return [2 /*return*/];
                }
            });
        });
    };
    // 当前资金
    GameInf.prototype.myCoin = function () {
        return __awaiter(this, void 0, void 0, function () {
            var sprite, coin, height;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        sprite = new egret.Sprite();
                        return [4 /*yield*/, GameConfig.createBitmapByName('coin.png')];
                    case 1:
                        coin = _a.sent();
                        coin.width = coin.height = 50;
                        height = this.height - coin.height - 50;
                        coin.x = 0;
                        coin.y = 0;
                        sprite.addChild(coin);
                        this.coinText = new egret.TextField();
                        this.coinText.width = 200;
                        this.coinText.x = 60;
                        this.coinText.y = 0 + 15;
                        this.coinText.text = GameConfig.coin + '';
                        this.coinText.textAlign = 'left';
                        this.coinText.size = 20;
                        sprite.x = 40;
                        sprite.y = height + 80;
                        sprite.addChild(this.coinText);
                        this.addChild(sprite);
                        this.changeCoin();
                        return [2 /*return*/];
                }
            });
        });
    };
    GameInf.prototype.changeCoin = function () {
        this.coinText.text = GameConfig.coin + "\u91D1";
    };
    // 重置各种 游戏信息
    GameInf.prototype.resetInf = function () {
        this.myScore = 0;
        this.updataScroe();
        if (GameConfig.nowTax == -1) {
            this.Timer.resetTime();
            this.propsArr.map(function (obj) {
                obj.init();
            });
            return;
        }
        if (GameConfig.taxConfig[GameConfig.nowTax].time != 0)
            this.Timer.resetTime();
        if (GameConfig.taxConfig[GameConfig.nowTax].step != 0)
            this.StepClass.resetStep();
    };
    // 随机生成道具
    GameInf.prototype.productHelper = function () {
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
        // 整个盒子的宽度是  
        var moveX = this.width / 4 - 100 * maxType / 4 - 20;
        var self = this;
        function clickButton(index) {
            self.propsArr.forEach(function (prop, key) {
                if (2 !== key) {
                    prop.removeRect();
                }
            });
        }
        for (var type = 0; type < maxType; type++) {
            var props = new Prop(moveX + 60 * type, this.height / 2 - 100, type, this, clickButton);
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
                            GameConfig.state = 0;
                        }, this);
                        this.addChild(sky);
                        return [2 /*return*/];
                }
            });
        });
    };
    GameInf.prototype.addTaxNum = function () {
        this.taxNum = new egret.TextField();
        this.taxNum.width = 200;
        this.taxNum.height = 50;
        if (GameConfig.nowTax === -1)
            this.taxNum.x = this.width / 2 - this.taxNum.width / 2;
        else
            this.taxNum.x = 140;
        this.taxNum.y = 60;
        this.taxNum.lineSpacing = 50;
        this.taxNum.text = '当前降熵：0';
        this.taxNum.size = 25;
        this.taxNum.textAlign = 'center';
        this.addChild(this.taxNum);
    };
    GameInf.prototype.myGoal = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (GameConfig.nowTax == -1)
                    return [2 /*return*/];
                this.goalText = new egret.TextField();
                this.goalText.width = 200;
                this.goalText.height = 50;
                this.goalText.lineSpacing = 50;
                this.goalText.x = 360;
                this.goalText.y = 60;
                this.goalText.text = "\u76EE\u6807\u71B5\u503C\uFF1A" + GameConfig.taxConfig[GameConfig.nowTax].myScore;
                this.goalText.textAlign = 'left';
                this.goalText.size = 25;
                this.addChild(this.goalText);
                return [2 /*return*/];
            });
        });
    };
    /* 更新成绩 */
    GameInf.prototype.updataScroe = function () {
        this.taxNum.text = "\u5F53\u524D\u964D\u71B5\uFF1A" + this.myScore;
    };
    /* 更新步数 */
    GameInf.prototype.updataStep = function (step) {
        if (GameConfig.nowTax === -1)
            return;
        if (!step)
            this.maxStep--;
        else
            this.maxStep += step;
        this.StepClass && this.StepClass.changeStep(this.maxStep);
    };
    /* 设置时间 */
    GameInf.prototype.setTime = function (num) {
        this.Timer.setTime(num);
    };
    return GameInf;
}(egret.Sprite));
__reflect(GameInf.prototype, "GameInf");
//# sourceMappingURL=GameInf.js.map