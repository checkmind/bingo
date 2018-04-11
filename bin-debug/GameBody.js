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
        _this.row = 2;
        _this.col = 10;
        _this.clears = [];
        // 事件锁，需控制的事件完成后才能继续进行
        _this.lock = true;
        _this.clickLock = false;
        // 游戏是否结束
        _this.game = true;
        // 交换栈
        _this.stackArr = [];
        // 产生新的bingos
        _this.newBingos = [];
        _this.x = 0;
        _this.y = 200;
        _this.width = width;
        _this.height = height - _this.y;
        _this.row = Math.floor(_this.width / GameBody.childW);
        _this.col = Math.floor(_this.height / GameBody.childH);
        _this.x = (_this.width - _this.row * GameBody.childH) / 2;
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.drawDoors, _this);
        _this.touchEnabled = true;
        _this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, _this.mouseDown, _this);
        return _this;
    }
    /* 事件捕捉 */
    GameBody.prototype.mouseDown = function (ev) {
        var x = Math.floor(ev.stageX / GameBody.childW);
        var y = Math.floor((ev.stageY - this.y) / GameBody.childH);
        if (this.lock)
            return;
        if (this.exitObj(this.bingos, x, y)) {
            this.bingos[x][y].chooseBingo();
            // 栈里面已经有bingo了
            if (this.stackArr[0] && this.stackArr[0] !== this.bingos[x][y]) {
                if (this.checkChange(this.stackArr[0], this.bingos[x][y])) {
                    this.stackArr[0].chooseBingo();
                    this.bingos[x][y].chooseBingo();
                    this.stackArr.length = 0;
                }
                else {
                    this.stackArr[0].removeChoosed();
                    this.stackArr.length = 0;
                    this.stackArr.push(this.bingos[x][y]);
                }
            }
            else if (this.stackArr[0] && this.stackArr[0] === this.bingos[x][y]) {
                this.stackArr.length = 0;
            }
            else {
                this.stackArr.push(this.bingos[x][y]);
            }
        }
    };
    // 判断是否可以交换
    GameBody.prototype.checkChange = function (object_1, object_2) {
        var coord_1 = this.getObjSet(object_1);
        var coord_2 = this.getObjSet(object_2);
        var x = Math.abs(coord_1.x - coord_2.x);
        var y = Math.abs(coord_1.y - coord_2.y);
        // 两个在同一横线上
        if (x === 1 && y === 0) {
            // 一在二的右边
            if (coord_1.x - coord_2.x > 0) {
                object_1.moveToDirection(4);
                object_2.moveToDirection(2);
                this.changeObj(object_1, object_2);
                return true;
                // 一在二的左边
            }
            else {
                object_1.moveToDirection(2);
                object_2.moveToDirection(4);
                this.changeObj(object_1, object_2);
                return true;
            }
        }
        // 两个在同一竖线上
        if (y === 1 && x === 0) {
            // 一在二的下边
            if (coord_1.y - coord_2.y > 0) {
                object_1.moveToDirection(1);
                object_2.moveToDirection(3);
                this.changeObj(object_1, object_2);
                return true;
                // 一在二的上边
            }
            else {
                object_1.moveToDirection(3);
                object_2.moveToDirection(1);
                this.changeObj(object_1, object_2);
                return true;
            }
        }
        return false;
    };
    // 交换两个对象 direction是方向 1 2 3 4对应上右下左
    GameBody.prototype.changeObj = function (object_1, object_2) {
        var _this = this;
        var coord_1 = this.getObjSet(object_1);
        var coord_2 = this.getObjSet(object_2);
        var obj = this.bingos[coord_1.x][coord_1.y];
        this.bingos[coord_1.x][coord_1.y] = this.bingos[coord_2.x][coord_2.y];
        this.bingos[coord_2.x][coord_2.y] = obj;
        setTimeout(function () {
            _this.checkFun();
        }, 1000);
    };
    GameBody.prototype.drawDoors = function () {
        //this.addImage();
        this.drawBingo();
    };
    GameBody.prototype.addImage = function () {
        var shape = new egret.Shape;
        shape.graphics.beginFill(0x000000, 1);
        shape.graphics.lineStyle(1, 0x000000);
        shape.graphics.drawRect(0, 0, this.width - this.x, this.height);
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
        this.checkFun();
    };
    GameBody.prototype.addBingo = function () {
        if (this.bingos[0])
            for (var k = 0; k < this.bingos[0].length; k++) {
                if (this.bingos[0][k]) {
                    console.log("游戏结束");
                    this.game = false;
                    // return false;
                }
            }
        for (var i = 0; i < this.row; i++) {
            var ran = this.ran(0, 5);
            var bingo = new Bingo(i, -1, ran, { i: i, j: 0 });
            this.addChild(bingo);
            this.newBingos.push(bingo);
        }
        this.moveToBottom();
    };
    GameBody.prototype.moveToBottom = function () {
        var _this = this;
        // 移动到的坐标
        var x, y;
        this.newBingos.map(function (val, index) {
            x = index;
            var bottomCoord = _this.getMyBottom(x, 0);
            if (bottomCoord) {
                y = bottomCoord.j;
            }
            else {
                y = _this.col;
            }
            if (y >= 1)
                val.moveToBottom(y - 1);
            _this.bingos[x][y - 1] = val;
        });
        this.newBingos.length = 0;
        this.checkFun();
    };
    GameBody.prototype.checkFun = function () {
        var _this = this;
        this.checkBingos();
        if (this.clears.length === 0) {
            this.lock = false;
            return;
        }
        this.clearAll();
        setTimeout(function () {
            _this.updataGame();
        }, 1000);
    };
    GameBody.prototype.ran = function (end, start) {
        return Math.floor(Math.random() * (end - start) + start);
    };
    /* 检测是否能消除 */
    GameBody.prototype.checkBingos = function () {
        var that = this;
        this.bingos.forEach(function (val, x) {
            var onoff = false;
            val.forEach(function (vals, y) {
                that.checkAround({ x: x, y: y }, false);
            });
        });
    };
    /* 检测周围有没有相同色号,第二个参数限定反向 1,2,3,4 t r b l */
    GameBody.prototype.checkAround = function (coord, direction) {
        var x = coord.x, y = coord.y;
        var obj = this.bingos[x][y];
        var type = obj.type;
        if (!direction) {
            /* 检测四个方向 */
            if (this.exitObj(this.bingos, x, y - 1) && this.bingos[x][y - 1].type === type) {
                if (this.checkAround({ x: x, y: y - 1 }, 1)) {
                    this.saveClears(x + "," + y);
                    this.saveClears(x + "," + (y - 1));
                }
            }
            if (this.exitObj(this.bingos, x + 1, y) && this.bingos[x + 1][y].type === type) {
                if (this.checkAround({ x: x + 1, y: y }, 2)) {
                    this.saveClears(x + "," + y);
                    this.saveClears((x + 1) + "," + y);
                }
            }
            if (this.exitObj(this.bingos, x, y + 1) && this.bingos[x][y + 1].type === type) {
                if (this.checkAround({ x: x, y: y + 1 }, 3)) {
                    this.saveClears(x + "," + y);
                    this.saveClears(x + "," + (y + 1));
                }
            }
            if (this.exitObj(this.bingos, x - 1, y) && this.bingos[x - 1][y].type === type) {
                if (this.checkAround({ x: x - 1, y: y }, 4)) {
                    this.saveClears(x + "," + y);
                    this.saveClears((x - 1) + "," + y);
                }
            }
            return;
        }
        switch (direction) {
            case 1:
                if (this.exitObj(this.bingos, x, y - 1) && type === this.bingos[x][y - 1].type) {
                    this.saveClears(x + "," + (y - 1));
                    return true;
                }
                break;
            case 2:
                if (this.exitObj(this.bingos, x + 1, y) && type === this.bingos[x + 1][y].type) {
                    this.saveClears((x + 1) + "," + y);
                    return true;
                }
                break;
            case 3:
                if (this.exitObj(this.bingos, x, y + 1) && type === this.bingos[x][y + 1].type) {
                    this.saveClears(x + "," + (y + 1));
                    return true;
                }
                break;
            case 4:
                if (this.exitObj(this.bingos, x - 1, y) && type === this.bingos[x - 1][y].type) {
                    this.saveClears((x - 1) + "," + y);
                    return true;
                }
                break;
            default:
                return false;
        }
    };
    /* 判断对象是否存在 */
    GameBody.prototype.exitObj = function (obj, x, y) {
        if (x < 0 || y < 0 || x > this.row || y > this.col || !obj[x] || !obj[x][y]) {
            return false;
        }
        return true;
    };
    /* 清除栈 */
    GameBody.prototype.saveClears = function (string) {
        for (var i = 0; i < this.clears.length; i++) {
            if (this.clears[i] === string)
                return;
        }
        this.clears.push(string);
    };
    /* 清除函数 */
    GameBody.prototype.clearAll = function () {
        var _this = this;
        this.clears.map(function (val) {
            var i = +val.split(",")[0];
            var j = +val.split(",")[1];
            if (_this.bingos[i] && _this.bingos[i][j]) {
                _this.bingos[i][j].killSelf();
                delete _this.bingos[i][j];
            }
        });
        this.clears.length = 0;
    };
    /* 更新函数 */
    GameBody.prototype.updataGame = function () {
        var _this = this;
        for (var i = 0; i < this.bingos.length; i++) {
            var now = this.bingos[i];
            var num = undefined; //这个参数记录当前j，辅助计算createNewBingos的下降距离
            for (var j = this.col - 1; j >= 0; j--) {
                // 当前没有方块，去上级拿
                if (!now[j]) {
                    var topBingo = this.getMyTop(i, j - 1);
                    if (topBingo) {
                        topBingo.moveToBottom(j);
                        this.deleteBingos(topBingo);
                        this.bingos[i][j] = topBingo;
                    }
                    else {
                        if (isNaN(num)) {
                            num = j;
                            this.createNewBingos(i, j, 1);
                            // 如果num是数字，说明前面有num下来.
                        }
                        else {
                            // 这列第一个需要重新产生的
                            if (num === j)
                                this.createNewBingos(i, j, 1);
                            else {
                                console.log(j, num, j - num + 1);
                                this.createNewBingos(i, j, num - j + 1);
                            }
                        }
                        continue;
                    }
                    // 当前有方块，记录下坐标
                }
                else {
                }
            }
            num = undefined;
        }
        setTimeout(function () {
            _this.checkFun();
        }, 1000);
    };
    /*
     这列已经为空了，直接创建新的bingos。然后移动到对应位置
    **/
    GameBody.prototype.createNewBingos = function (i, j, set) {
        var arr = [];
        // for(let n = 0;n<=j;n++) {
        //     let ran = this.ran(0,5)
        //     let bingo:Bingo = new Bingo(i,n-j-1,ran,{i, n});
        //     this.addChild(bingo);
        //     bingo.moveToBottom(n);
        //     this.bingos[i][j] = bingo;
        // }
        var ran = this.ran(0, 5);
        var bingo = new Bingo(i, -set, ran, { i: i, j: j });
        this.addChild(bingo);
        bingo.moveToBottom(j);
        this.bingos[i][j] = bingo;
    };
    /* 得到上级方块 */
    GameBody.prototype.getMyTop = function (i, j) {
        if (this.bingos[i][j]) {
            return this.bingos[i][j];
        }
        if (j < 0)
            return false;
        return this.getMyTop(i, j - 1);
    };
    /* 得到下级方块 */
    GameBody.prototype.getMyBottom = function (i, j) {
        if (this.bingos[i][j]) {
            return { i: i, j: j };
        }
        if (j > this.col)
            return false;
        return this.getMyBottom(i, j + 1);
    };
    /* 删除bingos里面的对象 */
    GameBody.prototype.deleteBingos = function (obj) {
        var _this = this;
        this.bingos.map(function (val, index) {
            val.map(function (val2, index2) {
                if (val2 === obj) {
                    delete _this.bingos[index][index2];
                }
            });
        });
    };
    // 得到对象当前在二维数组的位置
    GameBody.prototype.getObjSet = function (obj) {
        var x, y;
        this.bingos.map(function (val, index) {
            val.map(function (val2, index2) {
                if (val2 === obj) {
                    x = index;
                    y = index2;
                }
            });
        });
        return {
            x: x, y: y
        };
    };
    GameBody.childW = 90;
    GameBody.childH = 90;
    return GameBody;
}(egret.Sprite));
__reflect(GameBody.prototype, "GameBody");
