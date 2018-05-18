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
    游戏信息面板
**/
var GameInf = (function (_super) {
    __extends(GameInf, _super);
    function GameInf(width, height, parent) {
        var _this = _super.call(this) || this;
        _this.image = new egret.Bitmap();
        _this.myScore = 0;
        _this.backToPage = '';
        _this.x = 0;
        _this.y = 0;
        _this.width = width;
        _this.heights = height;
        _this.parents = parent;
        _this.maxStep = GameConfig.taxConfig[GameConfig.nowTax].step;
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.addImage, _this);
        return _this;
    }
    GameInf.prototype.addImage = function () {
        this.addTaxNum();
        this.updataScroe();
        //this.updataStep();
        this.addBack();
        this.addTimer();
        this.addStep();
        this.addProps();
    };
    // 重置各种 游戏信息
    GameInf.prototype.resetInf = function () {
        this.myScore = 0;
        this.updataScroe();
        if (GameConfig.taxConfig[GameConfig.nowTax].time != 0)
            this.Timer.resetTime();
        if (GameConfig.taxConfig[GameConfig.nowTax].step != 0)
            this.StepClass.resetStep();
    };
    GameInf.prototype.addProps = function () {
        var maxType = GameConfig.helperArr.length;
        console.log(this.width / 2);
        // 整个盒子的宽度是  
        var moveX = this.width / 4 - 100 * maxType / 4 - 20;
        console.log(moveX);
        for (var type = 0; type < maxType; type++) {
            var props = new Prop(moveX + 60 * type, (790 + 40) / 2, type, this);
            this.addChild(props);
        }
    };
    GameInf.prototype.addTimer = function () {
        if (GameConfig.taxConfig[GameConfig.nowTax].time === 0)
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
        var _this = this;
        var sky = this.createBitmapByName("back_png", 40, 40);
        sky.x = 20;
        sky.y = 50;
        sky.touchEnabled = true;
        sky.addEventListener('touchEnd', function () {
            PageBus.gotoPage(_this.backToPage);
        }, this);
        this.addChild(sky);
    };
    GameInf.prototype.addTaxNum = function () {
        this.taxNum = new TaxButton();
        this.taxNum.skinName = "resource/eui_skins/TitleSkin.exml";
        this.taxNum.label2 = '第' + GameConfig.taxArr[GameConfig.nowTax] + '宇宙';
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
        this.maxStep--;
        this.StepClass.changeStep(this.maxStep);
    };
    GameInf.prototype.createBitmapByName = function (name, width, height) {
        var result = new egret.Bitmap();
        var texture = RES.getRes(name);
        result.texture = texture;
        if (width)
            result.width = width;
        if (height)
            result.height = height;
        return result;
    };
    return GameInf;
}(egret.Sprite));
__reflect(GameInf.prototype, "GameInf");
//# sourceMappingURL=GameInf.js.map