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
    游戏关卡页
**/
var GameTax = (function (_super) {
    __extends(GameTax, _super);
    function GameTax(width, height, parent) {
        var _this = _super.call(this) || this;
        _this.image = new egret.Bitmap();
        _this.x = 0;
        _this.y = 0;
        _this.width = width;
        _this.height = height;
        _this.parents = parent;
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.addImage, _this);
        return _this;
    }
    GameTax.prototype.addImage = function () {
        return __awaiter(this, void 0, void 0, function () {
            var hadAddWeapp;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.addBack();
                        this.addGroup();
                        this.addReturn();
                        return [4 /*yield*/, platform.hadAddWeapp()];
                    case 1:
                        hadAddWeapp = _a.sent();
                        platform.drawAdvise();
                        if (!!hadAddWeapp) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.drawAddMyweapp()];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    GameTax.prototype.drawAddMyweapp = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var addWeapp;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, GameConfig.createBitmapByName("add.png")];
                    case 1:
                        addWeapp = _a.sent();
                        addWeapp.width = this.width;
                        addWeapp.height = this.height;
                        this.addChild(addWeapp);
                        addWeapp.addEventListener('touchEnd', function () {
                            _this.removeChild(addWeapp);
                        }, this);
                        return [2 /*return*/];
                }
            });
        });
    };
    GameTax.prototype.shootRock = function (bingo) {
        var rock = new Rock({
            x1: this.width / 2,
            y1: this.height,
            x3: bingo.x,
            y3: bingo.y,
            width: 42,
            height: 100,
            time: 4000
        });
        this.addChildAt(rock, 9);
        rock.shoot();
    };
    GameTax.prototype.addGroup = function () {
        var gameGroup = new GameGroup(this.width, this.height, this);
        this.addChild(gameGroup);
    };
    GameTax.prototype.addBack = function () {
        return __awaiter(this, void 0, void 0, function () {
            var back;
            return __generator(this, function (_a) {
                back = new Background(0, 0, this.width, this.height);
                this.addChild(back);
                return [2 /*return*/];
            });
        });
    };
    GameTax.prototype.addReturn = function () {
        return __awaiter(this, void 0, void 0, function () {
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
                            PageBus.gotoPage('index');
                        }, this);
                        this.addChild(sky);
                        return [2 /*return*/];
                }
            });
        });
    };
    return GameTax;
}(egret.Sprite));
__reflect(GameTax.prototype, "GameTax");
