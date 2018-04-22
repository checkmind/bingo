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
        //this.addBack();
        var _this = this;
        this.addStar();
        this.addGameInf();
        this.addTalk();
        this.success = function () {
            _this.removeChild(_this.talkContent);
            _this.addGameBody();
        };
    };
    // private system:particle.ParticleSystem;
    // private systemLeaf:particle.ParticleSystem;
    TaxPage.prototype.addStar = function () {
        var sky = this.createBitmapByName("back_1_png", 432 * 2, 704 * 2);
        this.addChild(sky);
        // var system = new particle.GravityParticleSystem(RES.getRes("ballParticle_png"), RES.getRes("ballParticle_json"));
        // this.addChild(system);
        // system.start();
        // system.y = this.stage.$stageHeight / 2;
        // system.x = this.stage.stageWidth / 2;
        // system.emitterX = 0;
        // system.emitterY = 0;
        // system.scaleX = system.scaleY = 1.5;
    };
    TaxPage.prototype.addGameBody = function () {
        this.gameBody = new GameBody(this.width, this.height, this.gameInf, this);
        this.addChild(this.gameBody);
    };
    TaxPage.prototype.addTalk = function () {
        this.talkContent = new TalkContent(this.width, this.height, this);
        this.talkContent.init();
        this.addChild(this.talkContent);
    };
    TaxPage.prototype.passTax = function () {
        var _this = this;
        GameConfig.nowTax++;
        this.addChild(this.talkContent);
        this.talkContent.showWhich({
            type: 1,
            text: '真厉害，竟然通关了，果然没选错人'
        });
        this.success = function () {
            _this.removeChildren();
            _this.addImage();
        };
    };
    TaxPage.prototype.gameOver = function () {
        var _this = this;
        this.addChild(this.talkContent);
        this.talkContent.showWhich({
            type: 1,
            text: '失败了？没事儿，再来一次'
        });
        this.success = function () {
            _this.removeChild(_this.talkContent);
            _this.addGameBody();
        };
    };
    // 点击完对话后的场景
    TaxPage.prototype.success = function () {
        this.removeChild(this.talkContent);
        this.addGameBody();
    };
    TaxPage.prototype.addGameInf = function () {
        this.gameInf = new GameInf(this.width, this.height);
        this.addChild(this.gameInf);
        this.gameInf.backToPage = 'gameTax';
    };
    TaxPage.prototype.updataStep = function () {
        this.gameInf.updataStep();
    };
    TaxPage.prototype.createBitmapByName = function (name, width, height) {
        var result = new egret.Bitmap();
        var texture = RES.getRes(name);
        result.texture = texture;
        if (width)
            result.width = width;
        if (height)
            result.height = height;
        return result;
    };
    return TaxPage;
}(egret.Sprite));
__reflect(TaxPage.prototype, "TaxPage");
//# sourceMappingURL=TaxPage.js.map