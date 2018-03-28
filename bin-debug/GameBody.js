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
        _this.row = 10;
        _this.col = 10;
        _this.clears = [];
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
        shape.graphics.drawRect(this.x, 0, this.width, this.height);
        shape.graphics.endFill();
        this.addChild(shape);
    };
    GameBody.prototype.drawBingo = function () {
        for (var i = 0; i < this.row; i++) {
            var arrs = [];
            for (var j = 0; j < this.col; j++) {
                var ran = this.ran(0, 5);
                var bingo = new Bingo(i, j, ran, { i: i, j: j });
                this.addChild(bingo);
                arrs.push(bingo);
            }
            this.bingos.push(arrs);
        }
        this.checkBingos();
        this.clearAll();
    };
    GameBody.prototype.ran = function (end, start) {
        return Math.floor(Math.random() * (end - start) + start);
    };
    /* 检测是否能消除 */
    GameBody.prototype.checkBingos = function () {
        var that = this;
        this.bingos.reverse().forEach(function (val, key) {
            var onoff = false;
            val.forEach(function (val, key) {
                that.checkAround(val, false);
            });
        });
    };
    /* 检测周围有没有相同色号,第二个参数限定反向 1,2,3,4 t r b l */
    GameBody.prototype.checkAround = function (obj, direction) {
        var y = obj.coord.i;
        var x = obj.coord.j;
        var type = obj.type;
        if (!direction) {
            /* 检测四个方向 */
            if (this.exitObj(this.bingos, x, y - 1) && this.bingos[x][y - 1].type === type) {
                console.log("上方有相同的");
                if (this.checkAround(this.bingos[x][y - 1], 1)) {
                    this.saveClears(obj);
                    this.saveClears(this.bingos[x][y - 2]);
                    this.saveClears(this.bingos[x][y - 1]);
                }
            }
            return;
        }
        switch (direction) {
            case 1:
                if (this.exitObj(this.bingos, x, y - 1) && obj.type === this.bingos[x][y - 1].type)
                    return true;
            case 2:
                if (this.exitObj(this.bingos, x + 1, y) && obj.type === this.bingos[x + 1][y].type)
                    return true;
            case 3:
                if (this.exitObj(this.bingos, x, y + 1) && obj.type === this.bingos[x][y + 1].type)
                    return true;
            default:
                if (this.exitObj(this.bingos, x - 1, y) && obj.type === this.bingos[x - 1][y].type)
                    return true;
        }
        return false;
    };
    GameBody.prototype.exitObj = function (obj, x, y) {
        if (x < 0 || y < 0 || x > this.row || y > this.row || !obj[x] || !obj[x][y]) {
            return false;
        }
        return true;
    };
    GameBody.prototype.saveClears = function (obj) {
        var arr = [];
        for (var i = 0; i < this.clears.length; i++) {
            if (this.clears[i] === obj)
                return;
        }
        this.clears.push(obj);
        console.log(this.clears);
    };
    GameBody.prototype.clearAll = function () {
        this.clears.map(function (val, index) {
            setTimeout(function () {
                val && val.killSelf && val.killSelf();
            }, 500 * index);
        });
    };
    return GameBody;
}(egret.Sprite));
__reflect(GameBody.prototype, "GameBody");
//# sourceMappingURL=GameBody.js.map