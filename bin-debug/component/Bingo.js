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
**/
var Bingo = (function (_super) {
    __extends(Bingo, _super);
    function Bingo(x, y, type, parent) {
        var _this = _super.call(this) || this;
        _this.width = GameBody.childW;
        _this.height = GameBody.childH;
        _this.image = new egret.Bitmap();
        _this.colors = [0x1ca5fc, 0x295c9d, 0x990000, 0x7f0000];
        _this.x = x * (_this.width);
        _this.y = y * (_this.height);
        _this.parents = parent;
        _this.type = type;
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.drawDoors, _this);
        return _this;
    }
    Bingo.prototype.drawDoors = function () {
        //this.addRect();
        this.addImage();
        //this.addText();
        //this.addBlackHole();
    };
    Bingo.prototype.addRect = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this;
                        return [4 /*yield*/, GameConfig.createBitmapByName("rect.png")];
                    case 1:
                        _a.rect = _b.sent();
                        this.rect.width = this.width;
                        this.rect.height = this.height;
                        this.addChild(this.rect);
                        return [2 /*return*/];
                }
            });
        });
    };
    Bingo.prototype.addImage = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        if (!(this.type >= 100)) return [3 /*break*/, 2];
                        _a = this;
                        return [4 /*yield*/, GameConfig.createBitmapByName("100.png")];
                    case 1:
                        _a.img = _c.sent();
                        return [3 /*break*/, 4];
                    case 2:
                        _b = this;
                        return [4 /*yield*/, GameConfig.createBitmapByName((this.type + 1) + ".png")];
                    case 3:
                        _b.img = _c.sent();
                        _c.label = 4;
                    case 4:
                        this.img.width = this.width;
                        this.img.height = this.height;
                        this.addChild(this.img);
                        return [2 /*return*/];
                }
            });
        });
    };
    Bingo.prototype.addBlackHole = function (fn) {
        return __awaiter(this, void 0, void 0, function () {
            var sky, funcChange, iDirection;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.removeChild(this.img);
                        return [4 /*yield*/, GameConfig.createBitmapByName("blackhole.png")];
                    case 1:
                        sky = _a.sent();
                        sky.width = this.width;
                        sky.height = this.height;
                        sky.anchorOffsetX = this.width / 2;
                        sky.anchorOffsetY = this.width / 2;
                        sky.x = sky.width / 2;
                        sky.y = sky.width / 2;
                        funcChange = function () {
                            sky.rotation += 6 * iDirection;
                            if (sky.scaleX > 0.1) {
                                sky.scaleX -= 0.01;
                                sky.scaleY -= 0.01;
                            }
                        };
                        iDirection = 1;
                        //egret.Tween.get( sky ).to( {width:0,height:0}, 600, egret.Ease.sineIn )
                        this.addChild(sky);
                        egret.Tween.get(sky, { onChange: funcChange, onChangeObj: sky })
                            .to({}, 1000, egret.Ease.sineIn).call(fn);
                        return [2 /*return*/];
                }
            });
        });
    };
    Bingo.prototype.onAddToStage = function (evt) {
    };
    Bingo.prototype.addText = function () {
        var text = new egret.TextField();
        // text.text = this.type;
        text.x = this.width / 2 - text.textWidth / 2;
        text.y = this.height / 2 - text.textHeight / 2;
        this.addChild(text);
    };
    Bingo.prototype.killSelf = function () {
        var _this = this;
        return new Promise(function (resolve) {
            _this.addBlackHole(function () {
                _this.$parent.removeChild(_this);
                resolve();
            });
        });
    };
    // 交换位置
    Bingo.prototype.moveToDirection = function (direction) {
        var _this = this;
        var that = this;
        return new Promise(function (resolve) {
            var fn = function () {
                that.removeChoosed();
                resolve(true);
            };
            switch (direction) {
                case 1:
                    egret.Tween.get(_this).to({ x: _this.x, y: _this.y - _this.height }, 600, egret.Ease.sineIn).call(fn);
                    break;
                case 2:
                    egret.Tween.get(_this).to({ x: _this.x + _this.width, y: _this.y }, 600, egret.Ease.sineIn).call(fn);
                    break;
                case 3:
                    egret.Tween.get(_this).to({ x: _this.x, y: _this.y + _this.height }, 600, egret.Ease.sineIn).call(fn);
                    break;
                default:
                    egret.Tween.get(_this).to({ x: _this.x - _this.width, y: _this.y }, 600, egret.Ease.sineIn).call(fn);
                    break;
            }
        });
    };
    Bingo.prototype.moveToBottom = function (j) {
        /*** 本示例关键代码段开始 ***/
        var distance = j * (this.height);
        egret.Tween.get(this)
            .to({ x: this.x, y: distance }, 600, egret.Ease.sineIn);
    };
    Bingo.prototype.chooseBingo = function () {
        if (this.choosed) {
            this.removeChoosed();
            return;
        }
        // this.borderShape = new egret.Shape()
        // this.borderShape.graphics.lineStyle(2, 0xffffff);
        // this.borderShape.graphics.drawRect(0, 0, this.width,this.height);
        // this.borderShape.graphics.endFill();
        // this.addChild(this.borderShape);
        this.addRect();
        this.choosed = true;
    };
    Bingo.prototype.removeChoosed = function () {
        if (!this.choosed)
            return;
        if (this.rect.$parent)
            this.removeChild(this.rect);
        this.choosed = false;
    };
    return Bingo;
}(egret.Sprite));
__reflect(Bingo.prototype, "Bingo");
//# sourceMappingURL=Bingo.js.map