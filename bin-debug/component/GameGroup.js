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
    游戏关卡页
**/
var GameGroup = (function (_super) {
    __extends(GameGroup, _super);
    function GameGroup(width, height, parent) {
        var _this = _super.call(this) || this;
        _this.image = new egret.Bitmap();
        _this.x = 0;
        _this.y = 0;
        _this.width = width;
        _this.height = height;
        _this.parents = parent;
        _this.group = new eui.Group();
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.addImage, _this);
        return _this;
    }
    GameGroup.prototype.addImage = function () {
        for (var i = 0; i < GameConfig.taxArr.length; i++)
            this.meau(i);
        this.addScroll();
    };
    GameGroup.prototype.meau = function (num) {
        var button = new TaxButton();
        button.skinName = "resource/eui_skins/ImageSkin.exml"; //假设Button.exml在resource文件夹下。
        button.label = "\u7B2C" + GameConfig.taxArr[num] + "\u5B87\u5B99";
        button.label2 = "  " + GameConfig.taxLabel[num];
        button.width = 274;
        button.height = 344;
        button.x = button.width * num;
        button.y = (this.height - button.height) / 2;
        button.addEventListener(egret.TouchEvent.TOUCH_TAP, this.bindClickFn, this);
        this.group.addChild(button);
        if (num <= GameConfig.nowTax)
            return;
        var colorMatrix = [
            0.3, 0.6, 0, 0, 0,
            0.3, 0.6, 0, 0, 0,
            0.3, 0.6, 0, 0, 0,
            0, 0, 0, 1, 0
        ];
        var colorFlilter = new egret.ColorMatrixFilter(colorMatrix);
        button.filters = [colorFlilter];
    };
    GameGroup.prototype.addScroll = function () {
        this.myScroller = new eui.Scroller();
        //注意位置和尺寸的设置是在Scroller上面，而不是容器上面
        this.myScroller.width = this.width;
        this.myScroller.height = this.height;
        this.myScroller.viewport = this.group;
        this.addChild(this.myScroller);
    };
    /* 给按钮绑定事件 */
    GameGroup.prototype.bindClickFn = function (ev) {
        var x = Math.floor((ev.stageX - this.x + this.myScroller.viewport.scrollH) / 274);
        var y = Math.floor((ev.stageY - this.y) / 344);
        if (y != 1 || x > GameConfig.nowTax)
            return;
        GameConfig.nowTax = x;
        PageBus.gotoPage("pageTax");
    };
    GameGroup.prototype.createBitmapByName = function (name, width, height) {
        var result = new egret.Bitmap();
        var texture = RES.getRes(name);
        result.texture = texture;
        if (width)
            result.width = width;
        if (height)
            result.height = height;
        return result;
    };
    return GameGroup;
}(eui.Group));
__reflect(GameGroup.prototype, "GameGroup");
//# sourceMappingURL=GameGroup.js.map