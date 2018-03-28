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
        _this.bingos = [];
        _this.x = 0;
        _this.y = 50;
        _this.width = width;
        _this.height = height;
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.drawDoors, _this);
        return _this;
    }
    GameBody.prototype.drawDoors = function () {
        this.addImage();
        this.drawBingo();
        this.$parent.stage.$stageWidth;
    };
    GameBody.prototype.addImage = function () {
        var shape = new egret.Shape;
        shape.graphics.beginFill(0xf2f2f2, .5);
        shape.graphics.lineStyle(1, 0xf2f2f2);
        shape.graphics.drawRect(this.x, this.y, this.width, this.height);
        shape.graphics.endFill();
        this.addChild(shape);
    };
    GameBody.prototype.drawBingo = function () {
        for (var i = 0; i < 10; i++) {
            for (var j = 0; j < 10; j++) {
                var ran = this.ran(1, 5);
                var bingo = new Bingo(i, j, ran);
                this.addChild(bingo);
                this.bingos.push(bingo);
            }
        }
    };
    GameBody.prototype.ran = function (end, start) {
        return Math.floor(Math.random() * (end - start + 1) + start);
    };
    return GameBody;
}(egret.Sprite));
__reflect(GameBody.prototype, "GameBody");
//# sourceMappingURL=GameBody.js.map