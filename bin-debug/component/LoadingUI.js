//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-present, Egret Technology.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////
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
var LoadingUI = (function (_super) {
    __extends(LoadingUI, _super);
    function LoadingUI() {
        var _this = _super.call(this) || this;
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.createView, _this);
        return _this;
    }
    LoadingUI.prototype.createView = function () {
        this.addBack();
        this.addBar();
        this.textField = new egret.TextField();
        this.addChild(this.textField);
        this.textField.y = this.stage.stageHeight / 2 + 60;
        this.textField.width = 480;
        this.textField.x = this.stage.stageWidth / 2 - 480 / 2;
        this.textField.height = 29;
        this.textField.textAlign = "center";
        // #a31818
    };
    LoadingUI.prototype.addBar = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.addStoneBar();
                this.addStone();
                return [2 /*return*/];
            });
        });
    };
    LoadingUI.prototype.addStone = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        // if(this.stone)
                        //     this.removeChild(this.stone);
                        _a = this;
                        return [4 /*yield*/, this.getUrl("stone.png")];
                    case 1:
                        // if(this.stone)
                        //     this.removeChild(this.stone);
                        _a.stone = _b.sent();
                        this.stone.width = 314;
                        this.stone.height = 29;
                        this.stone.x = this.stage.stageWidth / 2 - this.stone.width / 2 - 5;
                        this.stone.y = this.stage.stageHeight / 2 - this.stone.height / 2;
                        this.addChild(this.stone);
                        this.stone.mask = this.addMask(0, 0);
                        return [2 /*return*/];
                }
            });
        });
    };
    LoadingUI.prototype.addBack = function () {
        var back = new egret.Shape();
        back.graphics.beginFill(0x666666);
        back.graphics.drawRect(0, 0, this.stage.stageWidth, this.stage.stageHeight);
        back.graphics.endFill();
        this.addChild(back);
    };
    LoadingUI.prototype.addMask = function (width, height) {
        //画一个遮罩正方形
        if (this.maskBack) {
            this.removeChild(this.maskBack);
            this.maskBack = null;
        }
        this.maskBack = new egret.Shape();
        this.maskBack.graphics.beginFill(0x0000ff, 1);
        this.maskBack.graphics.drawRect(this.stone.x, this.stone.y, width, height);
        this.maskBack.graphics.endFill();
        this.addChild(this.maskBack);
        return this.maskBack;
    };
    LoadingUI.prototype.addStoneBar = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this;
                        return [4 /*yield*/, this.getUrl("stoneBar.png")];
                    case 1:
                        _a.stoneBar = _b.sent();
                        this.stoneBar.width = 374;
                        this.stoneBar.height = 48;
                        this.stoneBar.x = this.stage.stageWidth / 2 - this.stoneBar.width / 2;
                        this.stoneBar.y = this.stage.stageHeight / 2 - this.stoneBar.height / 2;
                        this.addChild(this.stoneBar);
                        return [2 /*return*/];
                }
            });
        });
    };
    LoadingUI.prototype.getUrl = function (url) {
        var textTrue = new egret.Texture();
        var il = new egret.ImageLoader();
        il.crossOrigin = 'anonymous';
        il.load(GameConfig.domainUrl + url);
        return new Promise(function (resolve) {
            il.once(egret.Event.COMPLETE, function (event) {
                var imageLoader = event.currentTarget;
                var texture = new egret.Texture();
                texture._setBitmapData(imageLoader.data);
                var bmp = new egret.Bitmap(texture);
                resolve(bmp);
            }, false);
        });
    };
    LoadingUI.prototype.onProgress = function (current, total) {
        var price = 314 / total;
        if (this.stone) {
            this.stone.mask = this.addMask((current + 1) * price, 29);
        }
        var num = Math.floor(((current + 1) / total) * 100);
        if (num > 100)
            num = 100;
        this.textField.text = "\u6B63\u5728\u642C\u8FD0\u661F\u7403: " + num + "%";
    };
    return LoadingUI;
}(egret.Sprite));
__reflect(LoadingUI.prototype, "LoadingUI", ["RES.PromiseTaskReporter"]);
//# sourceMappingURL=LoadingUI.js.map