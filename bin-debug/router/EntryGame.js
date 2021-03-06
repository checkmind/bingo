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
var EntryGame = (function (_super) {
    __extends(EntryGame, _super);
    function EntryGame(width, height, parent) {
        var _this = _super.call(this) || this;
        _this.image = new egret.Bitmap();
        /**
         * 创建场景界面
         * Create scene interface
         */
        // protected createGameScene(): void {
        //     this.btnClose = new eui.Button();
        //     this.btnClose.label = "btnClose!";
        //     this.btnClose.y = 35;
        //     this.btnClose.horizontalCenter = 0;
        //     this.addChild(this.btnClose);
        //     this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onButtonClick, this);
        //     // /**
        //     //  * 当前按钮会退出小游戏线程
        //     //  */
        //     // let close = new eui.Button();
        //     // close.y = 135;
        //     // close.label = '退出';
        //     // this.addChild(close);
        //     // close.addEventListener(egret.TouchEvent.TOUCH_TAP, () => {
        //     //     wx.exitMiniProgram({
        //     //         success: (res) => {
        //     //             console.log('退出成功', res);
        //     //         },
        //     //         fail: (err) => {
        //     //             console.log('退出失败', err);
        //     //         },
        //     //         complete: (res) => {
        //     //         }
        //     //     })
        //     // }, this);
        //     this.addEventListener(egret.TouchEvent.TOUCH_TAP, (evt: egret.TouchEvent) => {
        //         console.log('输出主域点击事件');
        //     }, this)
        // }
        _this.isdisplay = false;
        _this.x = 0;
        _this.y = 0;
        _this.width = width;
        _this.height = height;
        _this.parents = parent;
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.addImage, _this);
        return _this;
    }
    EntryGame.prototype.addImage = function () {
        return __awaiter(this, void 0, void 0, function () {
            var back, date, day, isShow;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        back = new Background(0, 0, this.width, this.height);
                        this.addChild(back);
                        return [4 /*yield*/, this.addTitle()];
                    case 1:
                        _a.sent();
                        this.addNPC();
                        return [4 /*yield*/, this.addStarLand()];
                    case 2:
                        _a.sent();
                        this.meau();
                        this.shootRock({
                            x: 200,
                            y: 200
                        });
                        return [4 /*yield*/, this.shareFn()];
                    case 3:
                        _a.sent();
                        date = new Date().getMonth() + 1;
                        day = new Date().getDate();
                        return [4 /*yield*/, platform.showAdvise()];
                    case 4:
                        isShow = _a.sent();
                        platform.setAdvise();
                        if (!(!isShow && +("" + date + day) >= 1110)) return [3 /*break*/, 6];
                        return [4 /*yield*/, this.addAdvis()];
                    case 5:
                        _a.sent();
                        _a.label = 6;
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    EntryGame.prototype.addAdvis = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var sprite, addWeapp, width, back, share, close;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        sprite = new egret.Sprite();
                        sprite.width = this.width;
                        sprite.height = this.height;
                        return [4 /*yield*/, GameConfig.createBitmapByName("advise.png")];
                    case 1:
                        addWeapp = _a.sent();
                        width = this.width - 50;
                        addWeapp.width = width;
                        addWeapp.height = width / 0.95;
                        addWeapp.x = (this.width - width) / 2;
                        addWeapp.y = (this.height - addWeapp.height) / 2;
                        back = new Background(0, 0, this.width, this.height);
                        sprite.addChild(back);
                        sprite.addChild(addWeapp);
                        share = new eui.Button();
                        share.y = this.height - 150;
                        share.x = this.width - share.width - 250;
                        share.label = '我要奖励';
                        sprite.addChild(share);
                        share.addEventListener('touchEnd', function () {
                            platform.shareAppMessage();
                            setTimeout(function () {
                                _this.removeChild(sprite);
                                _this.loadInf();
                            }, 3500);
                        }, this);
                        close = new eui.Button();
                        close.y = this.height - 150;
                        close.x = 40;
                        close.label = '不要奖励';
                        sprite.addChild(close);
                        close.addEventListener('touchEnd', function () {
                            console.log(1);
                            _this.removeChild(sprite);
                        }, this);
                        this.addChild(sprite);
                        return [2 /*return*/];
                }
            });
        });
    };
    EntryGame.prototype.loadInf = function () {
        return __awaiter(this, void 0, void 0, function () {
            var userInfo;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, platform.getUserInfo()];
                    case 1:
                        userInfo = _a.sent();
                        GameConfig.initData(userInfo);
                        return [2 /*return*/];
                }
            });
        });
    };
    EntryGame.prototype.shootRock = function (bingo) {
        var rock = new Rock({
            x1: this.width / 2,
            y1: this.height,
            x3: bingo.x,
            y3: bingo.y,
            width: this.width,
            height: this.height,
            time: 1000
        });
        this.addChild(rock);
    };
    EntryGame.prototype.shareFn = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this;
                        return [4 /*yield*/, GameConfig.createBitmapByName("shareBea.png")];
                    case 1:
                        _a.shareButton = _b.sent();
                        this.addChild(this.shareButton);
                        this.shareButton.width = 200;
                        this.shareButton.height = 200;
                        this.shareButton.x = 20;
                        console.log('share');
                        this.shareButton.y = this.height / 2;
                        this.shareButton.addEventListener("touchEnd", function () {
                            platform.shareAppMessage();
                        });
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * 关闭按钮和分享按钮
    */
    EntryGame.prototype.drawButton = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this;
                        return [4 /*yield*/, GameConfig.createBitmapByName("close.png")];
                    case 1:
                        _a.closeButton = _b.sent();
                        this.closeButton.width = 80;
                        this.closeButton.height = 80;
                        this.closeButton.x = this.width / 2 - this.closeButton.width / 2;
                        this.closeButton.y = this.height - this.closeButton.height - 20;
                        this.closeButton.addEventListener('touchEnd', function () {
                            _this.isdisplay = true;
                            _this.onButtonClick();
                        }, this);
                        this.addChild(this.closeButton);
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * 点击按钮
     * Click the button
     */
    EntryGame.prototype.onButtonClick = function () {
        return __awaiter(this, void 0, void 0, function () {
            var openDataContext, bitmapdata_1, texture;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        openDataContext = wx.getOpenDataContext();
                        if (!this.isdisplay) return [3 /*break*/, 1];
                        this.bitmap.parent && this.bitmap.parent.removeChild(this.bitmap);
                        this.rankingListMask.parent && this.rankingListMask.parent.removeChild(this.rankingListMask);
                        this.isdisplay = false;
                        this.removeChild(this.closeButton);
                        return [3 /*break*/, 3];
                    case 1:
                        // 增加关闭按钮和分享按钮
                        //处理遮罩，避免开放数据域事件影响主域。
                        this.rankingListMask = new egret.Shape();
                        this.rankingListMask.graphics.beginFill(0x000000, 1);
                        this.rankingListMask.graphics.drawRect(0, 0, this.stage.width, this.stage.height);
                        this.rankingListMask.graphics.endFill();
                        this.rankingListMask.alpha = 0.5;
                        this.rankingListMask.touchEnabled = true;
                        this.addChild(this.rankingListMask);
                        openDataContext.postMessage({
                            text: 'refresh',
                            year: (new Date()).getFullYear()
                        });
                        return [4 /*yield*/, this.drawButton()];
                    case 2:
                        _a.sent();
                        bitmapdata_1 = new egret.BitmapData(window["sharedCanvas"]);
                        bitmapdata_1.$deleteSource = false;
                        texture = new egret.Texture();
                        texture._setBitmapData(bitmapdata_1);
                        this.bitmap = new egret.Bitmap(texture);
                        this.bitmap.width = this.stage.stageWidth;
                        this.bitmap.height = this.stage.stageHeight;
                        this.addChild(this.bitmap);
                        egret.startTick(function (timeStarmp) {
                            egret.WebGLUtils.deleteWebGLTexture(bitmapdata_1.webGLTexture);
                            bitmapdata_1.webGLTexture = null;
                            return false;
                        }, this);
                        //主要示例代码结束            
                        this.isdisplay = true;
                        _a.label = 3;
                    case 3:
                        //发送消息
                        console.log("发送消息");
                        openDataContext.postMessage({
                            isDisplay: this.isdisplay,
                            text: 'hello',
                            year: (new Date()).getFullYear()
                        });
                        return [2 /*return*/];
                }
            });
        });
    };
    EntryGame.prototype.addNPC = function () {
        var _this = this;
        var sky = this.createBitmapByName("npc_1_png", 256, 282);
        this.addChild(sky);
        sky.x = 100;
        sky.y = this.height - sky.height / 0.75;
        var fn = function () {
            egret.Tween.get(sky)
                .to({ y: _this.height - sky.height / 0.7 }, 3000, egret.Ease.sineIn).call(fn2);
        };
        var fn2 = function () {
            egret.Tween.get(sky)
                .to({ y: _this.height - sky.height / 0.75 }, 3000, egret.Ease.sineIn).call(fn);
        };
        fn();
    };
    EntryGame.prototype.addTitle = function () {
        return __awaiter(this, void 0, void 0, function () {
            var sky;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, GameConfig.createBitmapByName("title.png")];
                    case 1:
                        sky = _a.sent();
                        sky.width = sky.height = 500;
                        this.addChild(sky);
                        sky.x = this.width / 2 - 300;
                        sky.y = 90;
                        return [2 /*return*/];
                }
            });
        });
    };
    EntryGame.prototype.addBoom = function () {
        var system = new particle.GravityParticleSystem(RES.getRes("newParticle2_png"), RES.getRes("newParticle2_json"));
        this.addChild(system);
        system.start();
        // let sky = this.createBitmapByName("boom_png",this.width-50,(this.width-50)/0.736);
        // this.addChild(sky);
        // sky.x = 150;
        // sky.y = 40;
        // sky.scaleX = 0.8;
        // sky.scaleY = 0.8;
        system.y = 200;
    };
    EntryGame.prototype.addBlackHead = function () {
        return __awaiter(this, void 0, void 0, function () {
            var sky, funcChange, iDirection, fn;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, GameConfig.createBitmapByName("black2.png")];
                    case 1:
                        sky = _a.sent();
                        sky.width = 480;
                        sky.height = 485;
                        this.addChild(sky);
                        funcChange = function () {
                            sky.rotation += 1 * iDirection;
                        };
                        iDirection = 1;
                        //egret.Tween.get( sky ).to( {width:0,height:0}, 600, egret.Ease.sineIn )
                        sky.x = this.width / 2 - sky.width / 1.5;
                        sky.y = 40;
                        sky.anchorOffsetX = sky.width / 2;
                        sky.anchorOffsetY = sky.height / 2;
                        this.addChild(sky);
                        fn = function () {
                            egret.Tween.get(sky, { onChange: funcChange, onChangeObj: sky })
                                .to({}, 20000, egret.Ease.sineIn).call(fn);
                        };
                        fn();
                        return [2 /*return*/];
                }
            });
        });
    };
    EntryGame.prototype.addStarLand = function () {
        return __awaiter(this, void 0, void 0, function () {
            var sky;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, GameConfig.createBitmapByName("starLand.png")];
                    case 1:
                        sky = _a.sent();
                        sky.width = this.width;
                        sky.height = this.width / 1.812;
                        this.addChild(sky);
                        sky.scaleY = 1.5;
                        sky.scaleX = 1.5;
                        sky.y = this.height - sky.height * 1.5;
                        return [2 /*return*/];
                }
            });
        });
    };
    EntryGame.prototype.meau = function () {
        var _this = this;
        var skins = ['ButtonModel1', 'ButtonModel2', 'ButtonMore', 'ButtonHelp'];
        var labelText = ['剧情模式', '时间模式', '商店', '排行榜'];
        var _loop_1 = function (i) {
            var button = new eui.Button();
            button.touchEnabled = true;
            button.x = this_1.width / 2;
            button.label = labelText[i];
            button.width = 236;
            button.height = 81;
            button.y = i * 90 + this_1.height / 2;
            //button.rotation = 10+i*2;
            button.enabled = true;
            this_1.addChild(button);
            button.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
                _this.bindClickFn(i);
                platform.playButtonMusic();
            }, this_1, false, i);
        };
        var this_1 = this;
        for (var i = 0; i < skins.length; i++) {
            _loop_1(i);
        }
    };
    EntryGame.prototype.saveData = function () {
        var openDataContext = wx.getOpenDataContext();
        openDataContext.postMessage({
            array: [1, 23],
            type: 'save',
            year: (new Date()).getFullYear()
        });
    };
    /* 给按钮绑定事件 */
    EntryGame.prototype.bindClickFn = function (i) {
        console.log(i);
        switch (i) {
            case 0:
                PageBus.gotoPage("gameTax");
                break;
            case 1:
                GameConfig.nowTax = -1;
                GameConfig.state = 1;
                PageBus.gotoPage("infinite");
                break;
            case 2:
                PageBus.gotoPage("gameShop");
                break;
            case 3:
                this.onButtonClick();
                break;
            default:
                GameConfig.setHelpArr(1, 0);
                return;
        }
    };
    EntryGame.prototype.createBitmapByName = function (name, width, height) {
        var result = new egret.Bitmap();
        var texture = RES.getRes(name);
        result.texture = texture;
        if (width)
            result.width = width;
        if (height)
            result.height = height;
        return result;
    };
    return EntryGame;
}(egret.Sprite));
__reflect(EntryGame.prototype, "EntryGame");
