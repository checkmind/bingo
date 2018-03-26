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
var GameBody = (function (_super) {
    __extends(GameBody, _super);
    function GameBody(width, height) {
        var _this = _super.call(this) || this;
        _this.image = new egret.Bitmap();
        _this.x = 0;
        _this.y = 100;
        _this.width = width;
        _this.height = height - 100;
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.drawDoors, _this);
        return _this;
    }
    GameBody.prototype.drawDoors = function () {
        this.addImage();
    };
    GameBody.prototype.addImage = function () {
        var shape = new egret.Shape;
        shape.graphics.beginFill(0x0000, .5);
        shape.graphics.lineStyle(1, 0x333333);
        shape.graphics.drawRect(this.x, this.y, this.width, this.height);
        shape.graphics.endFill();
        console.log("增加");
        this.addChild(shape);
    };
    return GameBody;
}(egret.Sprite));
__reflect(GameBody.prototype, "GameBody");
//# sourceMappingURL=GameBody.js.map