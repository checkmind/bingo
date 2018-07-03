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
    游戏页面
**/
var TaxPage = (function (_super) {
    __extends(TaxPage, _super);
    function TaxPage(width, height) {
        var _this = _super.call(this) || this;
        _this.image = new egret.Bitmap();
        _this.x = 0;
        _this.y = 0;
        _this.width = width;
        _this.height = height;
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.addImage, _this);
        return _this;
    }
    TaxPage.prototype.addImage = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var system;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: 
                    //this.addBack();
                    return [4 /*yield*/, this.addStar()];
                    case 1:
                        //this.addBack();
                        _a.sent();
                        this.success = function () {
                            _this.addGameInf();
                            _this.addGameBody();
                        };
                        system = new particle.GravityParticleSystem(RES.getRes("newParticle_png"), RES.getRes("newParticle_json"));
                        this.addChild(system);
                        system.start();
                        this.addTalk();
                        return [2 /*return*/];
                }
            });
        });
    };
    TaxPage.prototype.addStar = function () {
        return __awaiter(this, void 0, void 0, function () {
            var imgHeight, top, sky, fn, fn2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        imgHeight = this.width * 1.78;
                        top = imgHeight - this.height;
                        return [4 /*yield*/, GameConfig.createBitmapByName("back_1.png")];
                    case 1:
                        sky = _a.sent();
                        sky.width = this.width;
                        sky.height = imgHeight;
                        this.addChild(sky);
                        fn = function () {
                            egret.Tween.get(sky)
                                .to({ y: -top }, 8 * 6000, egret.Ease.sineIn).call(fn2);
                        };
                        fn2 = function () {
                            egret.Tween.get(sky)
                                .to({ y: 0 }, 8 * 6000, egret.Ease.sineIn).call(fn);
                        };
                        fn();
                        return [2 /*return*/];
                }
            });
        });
    };
    TaxPage.prototype.addGameBody = function () {
        this.gameBody = new GameBody(this.width, this.height, this.gameInf, this);
        this.addChild(this.gameBody);
        console.log("关卡怪物");
        console.log(GameConfig.taxConfig[GameConfig.nowTax]["monster"]);
        if (GameConfig.taxConfig[GameConfig.nowTax]["monster"])
            this.addMonster();
    };
    TaxPage.prototype.addTalk = function () {
        this.talkContent = new TalkContent(this.width, this.height, this);
        this.talkContent.init();
        this.addChild(this.talkContent);
    };
    TaxPage.prototype.passTax = function () {
        var _this = this;
        GameConfig.state = 0;
        this.addPopClass(0);
        this.removeChild(this.gameBody);
        // if(GameConfig.maxTax>=1) {
        //     this.success = ()=>{
        //         PageBus.gotoPage("gameTax");
        //     }
        //    return;
        // }
        this.success = function () {
            _this.removeChildren();
            _this.addImage();
        };
    };
    TaxPage.prototype.gameOver = function () {
        var _this = this;
        GameConfig.state = 2;
        this.addPopClass(1);
        this.removeChild(this.gameBody);
        this.success = function () {
            _this.removeChildren();
            _this.addImage();
        };
    };
    /**
     * type 弹窗类型
     */
    TaxPage.prototype.addPopClass = function (type) {
        var _this = this;
        console.log("add pop class");
        if (!this.pop)
            this.pop = new PopClass(0, 50, this.width, this.height, type);
        this.addChild(this.pop);
        this.pop.addEventListener(DateEvent.DATE, function (ev) {
            var type = ev._type;
            switch (type) {
                case 'home':
                    PageBus.gotoPage("index");
                    break;
                case 'next':
                    console.log("next");
                    if (GameConfig.nowTax === GameConfig.maxTax) {
                        GameConfig.maxTax++;
                        GameConfig.nowTax = GameConfig.maxTax;
                    }
                    console.log(GameConfig.nowTax);
                    _this.removeChildren();
                    GameConfig.state = 1;
                    _this.addImage();
                    break;
                case 'again':
                    console.log('again');
                    GameConfig.state = 1;
                    _this.gameInf.resetInf();
                    _this.addGameBody();
                    break;
                default:
                    return;
            }
            if (_this.pop.$parent)
                _this.removeChild(_this.pop);
        }, this);
    };
    TaxPage.prototype.addMonster = function () {
        this.monsterClass = new MonsterClass(this.gameBody.x, this.gameBody.y, this.gameBody.width, this.gameBody.height);
        // 放到顶部
        this.addChild(this.monsterClass);
        this.setChildIndex(this.monsterClass, 99999);
    };
    // 点击完对话后的场景
    TaxPage.prototype.success = function () {
        this.removeChild(this.talkContent);
        this.addGameInf();
        this.addGameBody();
    };
    TaxPage.prototype.addGameInf = function () {
        this.gameInf = new GameInf(this.width, this.height, this);
        this.addChild(this.gameInf);
        this.gameInf.backToPage = 'gameTax';
    };
    TaxPage.prototype.updataStep = function () {
        // this.gameInf.updataStep();
    };
    return TaxPage;
}(egret.Sprite));
__reflect(TaxPage.prototype, "TaxPage");
//# sourceMappingURL=TaxPage.js.map