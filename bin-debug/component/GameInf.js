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
    function GameInf(width, height) {
        var _this = _super.call(this) || this;
        _this.image = new egret.Bitmap();
        _this.myScore = 0;
        _this.myStepNow = 0;
        _this.backToPage = '';
        _this.x = 0;
        _this.y = 0;
        _this.width = width;
        _this.height = height;
        _this.parents = parent;
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.addImage, _this);
        return _this;
    }
    GameInf.prototype.addImage = function () {
        this.addTaxNum();
        this.updataScroe();
        //this.updataStep();
        this.addBack();
        this.addTimer();
    };
    GameInf.prototype.addTimer = function () {
        var time = new Timer();
        this.addChild(time);
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
        this.taxNum.x = (this.width - this.taxNum.width) - 50;
        this.taxNum.y = 5;
        this.addChild(this.taxNum);
    };
    /* 更新成绩 */
    GameInf.prototype.updataScroe = function () {
        this.taxNum.label = "\u71B5\u503C\uFF1A" + this.myScore;
    };
    /* 更新步数 */
    // private updataStep() {
    //     if(!GameConfig.stepOnoff)
    //         return;
    //     if(this.myStep){
    //         this.myStep.text = `剩余步数：${GameConfig.maxStep - this.myStepNow}`;
    //         return;
    //     }
    //     this.myStep = new eui.Label();
    //     this.myStep.x = this.myScoreLabel.width+100;
    //     this.myStep.y = 20;
    //     this.myStep.size = 35;//设置文本字号
    //     this.myStep.bold = true;
    //     this.myStep.text = `剩余步数：${GameConfig.maxStep - this.myStepNow}`;
    //     this.myStep.enabled = true;
    //     this.addChild(this.myStep);
    // }
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