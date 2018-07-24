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
            var system;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: 
                    //this.addBack();
                    return [4 /*yield*/, this.addStar()];
                    case 1:
                        //this.addBack();
                        _a.sent();
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
        if (this.talkContent && this.talkContent.$parent) {
            this.removeChild(this.talkContent);
        }
        this.talkContent = new TalkContent(this.width, this.height, this);
        this.talkContent.init();
        this.addChild(this.talkContent);
    };
    TaxPage.prototype.addHore = function () {
        return __awaiter(this, void 0, void 0, function () {
            var img, button;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, GameConfig.createBitmapByName('success.png')];
                    case 1:
                        img = _a.sent();
                        img.width = 300 * 1.7;
                        img.height = 391 * 1.7;
                        img.x = this.width / 2 - img.width / 2;
                        img.y = this.height / 2 - img.height / 2;
                        this.addChild(img);
                        button = new eui.Button();
                        button.label = '分享朋友圈';
                        button.width = 236;
                        button.x = this.width / 2 - button.width / 2;
                        button.y = img.y + img.height + 20;
                        button.addEventListener('touchEnd', function () {
                            platform.saveImg();
                        }, this);
                        this.addChild(button);
                        return [2 /*return*/];
                }
            });
        });
    };
    TaxPage.prototype.saveData = function () {
    };
    TaxPage.prototype.passTax = function (score) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                console.log('关卡信息');
                console.log(GameConfig.nowTax, GameConfig.taxConfig.length - 1);
                if (GameConfig.nowTax === GameConfig.taxConfig.length - 1) {
                    this.addHore();
                    return [2 /*return*/];
                }
                platform.saveData(GameConfig.nowTax + 1);
                this.addPopClass(0, "\u6311\u6218\u4E0B\u4E00\u5173\u5427\uFF0C\u5956\u52B1\u4F60" + score / 2 + "\u91D1", '游戏通关');
                GameConfig.setCoin(score / 2);
                this.gameInf.changeCoin();
                if (this.gameBody && this.gameBody.$parent)
                    this.removeChild(this.gameBody);
                return [2 /*return*/];
            });
        });
    };
    TaxPage.prototype.gameOver = function (num) {
        console.log('结束了');
        this.addPopClass(1, '游戏失败了', '重新来一把吧');
        if (this.gameBody && this.gameBody.$parent)
            this.removeChild(this.gameBody);
        // this.success = ()=>{
        //     this.removeChildren();
        //     this.addImage();
        // }
    };
    /**
     * type 弹窗类型
     */
    TaxPage.prototype.addPopClass = function (type, label1, label2) {
        var _this = this;
        if (this.pop && this.pop.$parent) {
            this.removeChild(this.pop);
        }
        this.pop = new PopClass(0, 50, this.width, this.height, type, label1, label2);
        this.addChild(this.pop);
        this.pop.addEventListener(DateEvent.DATE, function (ev) { _this.popMethods(ev); }, this);
    };
    TaxPage.prototype.popMethods = function (ev) {
        return __awaiter(this, void 0, void 0, function () {
            var type, _a, res;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        type = ev._type;
                        _a = type;
                        switch (_a) {
                            case 'home': return [3 /*break*/, 1];
                            case 'next': return [3 /*break*/, 2];
                            case 'again': return [3 /*break*/, 3];
                            case 'share': return [3 /*break*/, 4];
                        }
                        return [3 /*break*/, 6];
                    case 1:
                        PageBus.gotoPage("index");
                        return [3 /*break*/, 7];
                    case 2:
                        console.log("next");
                        if (GameConfig.nowTax === GameConfig.maxTax) {
                            GameConfig.maxTax++;
                            GameConfig.nowTax = GameConfig.maxTax;
                        }
                        console.log(GameConfig.nowTax);
                        this.removeChildren();
                        GameConfig.state = 1;
                        this.addImage();
                        return [3 /*break*/, 7];
                    case 3:
                        console.log('again');
                        GameConfig.state = 1;
                        if (this.gameBody && this.gameBody.$parent)
                            this.removeChild(this.gameBody);
                        this.gameInf.resetInf();
                        this.addGameBody();
                        return [3 /*break*/, 7];
                    case 4:
                        console.log('分享');
                        return [4 /*yield*/, platform.shareAppMessage()];
                    case 5:
                        res = _b.sent();
                        console.log(res);
                        if (res.success) {
                            console.log('分享成功奖励1000金');
                            GameConfig.setCoin(1000);
                            this.gameInf.changeCoin();
                        }
                        return [3 /*break*/, 7];
                    case 6: return [2 /*return*/];
                    case 7:
                        if (this.pop.$parent)
                            this.removeChild(this.pop);
                        return [2 /*return*/];
                }
            });
        });
    };
    TaxPage.prototype.addMonster = function () {
        if (this.monsterClass && this.monsterClass.$parent)
            this.removeChild(this.monsterClass);
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