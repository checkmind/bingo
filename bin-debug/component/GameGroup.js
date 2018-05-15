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
        button.skinName = "resource/eui_skins/toastSkin.exml"; //假设Button.exml在resource文件夹下。
        button.label2 = "\u7B2C" + TalkConfig.taxArr[num] + "\u5B87\u5B99";
        button.label = "  " + TalkConfig.taxLabel[num];
        button.width = 226 * 2;
        button.height = 345 * 2;
        button.x = (button.width + 80) * num;
        button.y = (this.height - button.height) / 2;
        button.addEventListener(egret.TouchEvent.TOUCH_TAP, this.bindClickFn, this);
        this.group.addChild(button);
        if (num <= GameConfig.maxTax)
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
        this.myScroller;
        //注意位置和尺寸的设置是在Scroller上面，而不是容器上面
        this.myScroller.width = this.width;
        this.myScroller.height = this.height;
        this.myScroller.viewport = this.group;
        this.addChild(this.myScroller);
        var nowSet = (226 * 2 + 80) * GameConfig.maxTax - (this.width / 2 - 226);
        this.myScroller.viewport.scrollH = GameConfig.maxTax == 0 ? 0 : nowSet;
    };
    /* 给按钮绑定事件 */
    GameGroup.prototype.bindClickFn = function (ev) {
        var x = Math.floor((ev.stageX - this.x + this.myScroller.viewport.scrollH) / (452 + 80));
        //let y = Math.floor((ev.stageY-this.y)/(344*2));
        console.log(ev.stageY, this.y + 345 * 2, this.y);
        var buttonY = (this.height - 345 * 2) / 2;
        if (ev.stageY <= this.y || ev.stageY >= buttonY + 345 * 2)
            return;
        if (x > GameConfig.maxTax)
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