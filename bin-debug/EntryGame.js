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
**/
var EntryGame = (function (_super) {
    __extends(EntryGame, _super);
    function EntryGame(width, height) {
        var _this = _super.call(this) || this;
        _this.image = new egret.Bitmap();
        _this.x = 0;
        _this.y = 0;
        _this.width = width;
        _this.height = height;
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.addImage, _this);
        return _this;
    }
    EntryGame.prototype.addImage = function () {
        var shape = new egret.Shape;
        shape.graphics.beginFill(0x000000, .5);
        shape.graphics.lineStyle(1, 0x000000);
        shape.graphics.drawRect(0, 0, this.width - this.x, this.height);
        shape.graphics.endFill();
        this.addChild(shape);
        this.meau();
    };
    EntryGame.prototype.meau = function () {
        var skins = ['ButtonModel1', 'ButtonModel2', 'ButtonMore', 'ButtonHelp'];
        var button = new eui.Button();
        button.skinName = "../resource/skins/ButtonMore.exml";
        button.label = '漫游说明';
        this.addChild(button);
    };
    return EntryGame;
}(egret.Sprite));
__reflect(EntryGame.prototype, "EntryGame");
//# sourceMappingURL=EntryGame.js.map