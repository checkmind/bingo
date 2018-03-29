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
        this.updataGame();
    };
    GameBody.prototype.ran = function (end, start) {
        return Math.floor(Math.random() * (end - start) + start);
    };
    /* 检测是否能消除 */
    GameBody.prototype.checkBingos = function () {
        var that = this;
        this.bingos.forEach(function (val, key) {
            var onoff = false;
            val.forEach(function (vals, key) {
                that.checkAround(vals, false);
            });
        });
    };
    /* 检测周围有没有相同色号,第二个参数限定反向 1,2,3,4 t r b l */
    GameBody.prototype.checkAround = function (obj, direction) {
        var x = obj.coord.i;
        var y = obj.coord.j;
        var type = obj.type;
        if (!direction) {
            /* 检测四个方向 */
            if (this.exitObj(this.bingos, x, y - 1) && this.bingos[x][y - 1].type === type) {
                if (this.checkAround(this.bingos[x][y - 1], 1)) {
                    this.saveClears(obj);
                    this.saveClears(this.bingos[x][y - 1]);
                }
            }
            if (this.exitObj(this.bingos, x + 1, y) && this.bingos[x + 1][y].type === type) {
                if (this.checkAround(this.bingos[x + 1][y], 2)) {
                    this.saveClears(obj);
                    this.saveClears(this.bingos[x + 1][y]);
                }
            }
            if (this.exitObj(this.bingos, x, y + 1) && this.bingos[x][y + 1].type === type) {
                if (this.checkAround(this.bingos[x][y + 1], 3)) {
                    this.saveClears(obj);
                    this.saveClears(this.bingos[x][y + 1]);
                }
            }
            if (this.exitObj(this.bingos, x - 1, y) && this.bingos[x - 1][y].type === type) {
                if (this.checkAround(this.bingos[x - 1][y], 4)) {
                    this.saveClears(obj);
                    this.saveClears(this.bingos[x - 1][y]);
                }
            }
            return;
        }
        switch (direction) {
            case 1:
                if (this.exitObj(this.bingos, x, y - 1) && type === this.bingos[x][y - 1].type) {
                    this.saveClears(this.bingos[x][y - 1]);
                    return true;
                }
                break;
            case 2:
                if (this.exitObj(this.bingos, x + 1, y) && type === this.bingos[x + 1][y].type) {
                    this.saveClears(this.bingos[x + 1][y]);
                    return true;
                }
                break;
            case 3:
                if (this.exitObj(this.bingos, x, y + 1) && type === this.bingos[x][y + 1].type) {
                    this.saveClears(this.bingos[x][y + 1]);
                    return true;
                }
                break;
            case 4:
                if (this.exitObj(this.bingos, x - 1, y) && type === this.bingos[x - 1][y].type) {
                    this.saveClears(this.bingos[x - 1][y]);
                    return true;
                }
                break;
            default:
                return false;
        }
    };
    /* 判断对象是否存在 */
    GameBody.prototype.exitObj = function (obj, x, y) {
        if (x < 0 || y < 0 || x > this.row || y > this.row || !obj[x] || !obj[x][y]) {
            return false;
        }
        return true;
    };
    /* 清除栈 */
    GameBody.prototype.saveClears = function (obj) {
        var arr = [];
        for (var i = 0; i < this.clears.length; i++) {
            if (this.clears[i] === obj)
                return;
        }
        this.clears.push(obj);
    };
    /* 清除函数 */
    GameBody.prototype.clearAll = function () {
        var _this = this;
        this.clears.map(function (val) {
            var _a = val.coord, i = _a.i, j = _a.j;
            if (_this.bingos[i] && _this.bingos[i][j]) {
                delete _this.bingos[i][j];
            }
            val && val.killSelf && val.killSelf();
        });
    };
    /* 更新函数 */
    GameBody.prototype.updataGame = function () {
        for (var i = this.bingos.length - 1; i >= 0; i--) {
            var now = this.bingos[i];
            for (var j = 0; j < now.length; j++) {
                // 当前没有方块，去上级拿
                if (!now[j]) {
                    if (this.bingos[i - 1]) {
                        now[j] = this.bingos[i - 1][j];
                        delete this.bingos[i - 1][j];
                    }
                    else {
                        var ran = this.ran(0, 5);
                        var bingo = new Bingo(i - 1, j, ran, { i: i, j: j });
                        this.addChild(bingo);
                        now[j] = bingo;
                    }
                }
            }
        }
    };
    return GameBody;
}(egret.Sprite));
__reflect(GameBody.prototype, "GameBody");
//# sourceMappingURL=GameBody.js.map