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
var Bingo = (function (_super) {
    __extends(Bingo, _super);
    function Bingo(x, y) {
        var _this = _super.call(this) || this;
        _this.width = 48;
        _this.height = 48;
        _this.image = new egret.Bitmap();
        _this.x = x;
        _this.y = y;
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.drawDoors, _this);
        return _this;
    }
    Bingo.prototype.drawDoors = function () {
        this.addImage();
    };
    Bingo.prototype.addImage = function () {
        var shape = new egret.Shape;
        shape.graphics.beginFill(0xff0000 + Math.floor(Math.random() * 100) * (0xffffff / 100), 1);
        shape.graphics.lineStyle(2, 0xff0000 + Math.floor(Math.random() * 100) * (0xffffff / 100));
        shape.graphics.drawRect(this.x, this.y, this.width, this.height);
        shape.graphics.endFill();
        console.log("增加");
        this.addChild(shape);
    };
    return Bingo;
}(egret.Sprite));
__reflect(Bingo.prototype, "Bingo");
//# sourceMappingURL=Bingo.js.map