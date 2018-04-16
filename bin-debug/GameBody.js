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
    function GameBody(width, height, gameInf) {
        var _this = _super.call(this) || this;
        _this.image = new egret.Bitmap();
        _this.bingos = [];
        _this.row = 2;
        _this.col = 10;
        _this.clears = [];
        // 事件锁，需控制的事件完成后才能继续进行
        _this.lock = true;
        _this.loack_2 = false;
        _this.clickLock = false;
        // 游戏是否结束
        _this.game = true;
        // 交换栈
        _this.stackArr = [];
        // 产生新的bingos
        _this.newBingos = [];
        _this.width = width;
        GameBody.childH = GameBody.childW = (_this.width - 100) / GameConfig.row;
        _this.row = GameConfig.row;
        _this.col = GameConfig.col;
        _this.gameInf = gameInf;
        //this.x = (this.width - this.row*GameBody.childH) / 2
        _this.x = 50;
        _this.y = (height - GameConfig.col * GameBody.childH) / 2;
        _this.height = height - _this.y;
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.drawDoors, _this);
        _this.touchEnabled = true;
        _this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, _this.mouseDown, _this);
        return _this;
    }
    /* 事件捕捉 */
    GameBody.prototype.mouseDown = function (ev) {
        var x = Math.floor((ev.stageX - this.x) / GameBody.childW);
        var y = Math.floor((ev.stageY - this.y) / GameBody.childH);
        if (this.lock || this.loack_2)
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
                this.changeObj(object_1, object_2, 4, 2);
                return true;
                // 一在二的左边
            }
            else {
                this.changeObj(object_1, object_2, 2, 4);
                return true;
            }
        }
        // 两个在同一竖线上
        if (y === 1 && x === 0) {
            // 一在二的下边
            if (coord_1.y - coord_2.y > 0) {
                this.changeObj(object_1, object_2, 1, 3);
                return true;
                // 一在二的上边
            }
            else {
                this.changeObj(object_1, object_2, 3, 1);
                return true;
            }
        }
        return false;
    };
    // 交换两个对象 direction是方向 1 2 3 4对应上右下左 onoff 是否做监测
    GameBody.prototype.changeObj = function (object_1, object_2, dir_1, dir_2, onoff) {
        var _this = this;
        this.loack_2 = true;
        var coord_1 = this.getObjSet(object_1);
        var coord_2 = this.getObjSet(object_2);
        var obj = this.bingos[coord_1.x][coord_1.y];
        this.bingos[coord_1.x][coord_1.y] = this.bingos[coord_2.x][coord_2.y];
        this.bingos[coord_2.x][coord_2.y] = obj;
        var p1 = object_1.moveToDirection(dir_1);
        var p2 = object_2.moveToDirection(dir_2);
        Promise.all([p1, p2]).then(function () {
            if (!onoff && !_this.checkFun() && !GameConfig.canChange) {
                _this.changeObj(object_2, object_1, dir_1, dir_2, true);
                return;
            }
            _this.loack_2 = false;
            _this.gameInf.myStepNow++;
            // this.gameInf.updataStep();
        });
    };
    GameBody.prototype.drawDoors = function () {
        this.addBack();
        this.drawBingo();
        this.gameInf.updataScroe();
        // this.gameInf.updataStep();
        this.addMask();
    };
    GameBody.prototype.addBack = function () {
        /* 背景色设置 */
        var shape = new egret.Shape;
        shape.graphics.beginFill(0x000000, .7);
        shape.graphics.lineStyle(1, 0x000000);
        shape.graphics.drawRect(0, 0, this.width - 100, this.row * GameBody.childH);
        shape.graphics.endFill();
        this.addChild(shape);
    };
    GameBody.prototype.addMask = function () {
        //画一个遮罩正方形
        var circle = new egret.Shape();
        circle.graphics.beginFill(0x0000ff);
        circle.graphics.drawRect(this.x, this.y, this.width - 100, this.row * GameBody.childH);
        circle.graphics.endFill();
        this.$parent.addChild(circle);
        this.mask = circle;
    };
    GameBody.prototype.drawBingo = function () {
        for (var i = 0; i < this.row; i++) {
            var arrs = [];
            for (var j = 0; j < this.col; j++) {
                arrs.push(null);
            }
            this.bingos.push(arrs);
        }
        //this.checkFun();
        this.updataGame();
    };
    GameBody.prototype.addBingo = function () {
        if (this.bingos[0])
            for (var k = 0; k < this.bingos[0].length; k++) {
                if (this.bingos[0][k]) {
                    this.game = false;
                    // return false;
                }
            }
        for (var i = 0; i < this.row; i++) {
            var ran = this.ran(0, 5);
            var bingo = new Bingo(i, -1, ran, this);
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
            this.checkGameOver();
            return false;
        }
        this.lock = true;
        this.clearAll(function () {
            _this.updataGame();
        });
        return true;
    };
    GameBody.prototype.ran = function (end, start) {
        start = GameConfig.bingosMax;
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
    GameBody.prototype.clearAll = function (fn) {
        var _this = this;
        var pros = [];
        this.clears.map(function (val) {
            var i = +val.split(",")[0];
            var j = +val.split(",")[1];
            if (_this.bingos[i] && _this.bingos[i][j]) {
                pros.push(_this.bingos[i][j].killSelf());
                _this.gameInf.myScore += 50;
                delete _this.bingos[i][j];
            }
        });
        this.clears.length = 0;
        return Promise.all(pros).then(function () {
            fn();
            _this.gameInf.updataScroe();
        });
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
    /* 檢查游戲是否真的結束 */
    GameBody.prototype.checkGameOver = function () {
        // 這邊簡單記錄一下bingos
        if (!this.cloneBingos())
            console.log("游戏结束了");
    };
    GameBody.prototype.cloneBingos = function () {
        var arr = [];
        var bingos = this.bingos;
        for (var i = 0; i < bingos.length; i++) {
            var arr_1 = [];
            for (var j = 0; j < bingos[i].length; j++) {
                var type = bingos[i][j].type;
                if (this.checkLineExis(i, j))
                    return true;
                // arr_1.push({
                //     type: bingos[i][j].type
                // })
            }
            arr.push(arr_1);
        }
        return false;
    };
    GameBody.prototype.checkRightBottom = function (x, y) {
        var bingos = this.bingos;
        // 首先检测和右边交换能不能消除 
        var exit_l_1 = this.exitObj(bingos, x + 2, y);
        var exit_l_2 = this.exitObj(bingos, x + 3, y);
        if (exit_l_1 && exit_l_2) {
            if (bingos[x][y].type === bingos[x + 2][y].type === bingos[x + 3][y].type)
                return true;
        }
        // 再检测和下面交换能不能消除
        var exit_r_1 = this.exitObj(bingos, x, y + 2);
        var exit_r_2 = this.exitObj(bingos, x, y + 3);
        if (exit_r_1 && exit_r_2) {
            if (bingos[x][y].type === bingos[x][y + 2].type === bingos[x][y + 3].type)
                return true;
        }
        return false;
    };
    // 检查一行内三个对象是否存在 direction 对应0 1 2 3 上右下左
    GameBody.prototype.checkLineExis = function (i, j) {
        var _this = this;
        console.log(i, j);
        /* 这个是向下i，j对象向下交换后的横坐标线 */
        var arr_1 = [{
                i: i - 2,
                j: j + 1
            }, {
                i: i - 1,
                j: j + 1
            }, { i: i, j: j }, {
                i: i + 1,
                j: j + 1
            }, {
                i: i + 2,
                j: j + 1
            }];
        /* 这个是向下i，j对象向下交换后的纵坐标线 */
        var arr_2 = [{ i: i, j: j }, {
                i: i,
                j: j + 2
            }, {
                i: i,
                j: j + 3
            }];
        /* 这个是向右i，j对象交换后的横坐标线 */
        var arr_3 = [{
                i: i + 1,
                j: j - 2
            }, {
                i: i + 1,
                j: j - 1
            }, { i: i, j: j }, {
                i: i + 1,
                j: j + 1
            }, {
                i: i + 1,
                j: j + 2
            }];
        /* 这个是向右i，j对象交换后的纵坐标线 */
        var arr_4 = [{
                i: i, j: j
            }, {
                i: i + 2,
                j: j
            }, {
                i: i + 3,
                j: j
            }];
        var checkType = function (arr) {
            var now, add = 1, can = false;
            arr.map(function (val, index) {
                var i = val.i, j = val.j;
                var exitObj = _this.exitObj(_this.bingos, i, j);
                if (index !== 0) {
                    if (exitObj && now === _this.bingos[i][j].type)
                        add++;
                    else
                        add = 1;
                }
                now = exitObj ? _this.bingos[i][j].type : null;
                if (add >= 3)
                    can = true;
            });
            return can;
        };
        if (checkType(arr_1))
            return true;
        if (checkType(arr_2))
            return true;
        if (checkType(arr_3))
            return true;
        if (checkType(arr_4))
            return true;
        return false;
    };
    /************* 检查游戏函数ending************* */
    /*
     这列已经为空了，直接创建新的bingos。然后移动到对应位置
    **/
    GameBody.prototype.createNewBingos = function (i, j, set) {
        var arr = [];
        var ran = this.ran(0, 5);
        var bingo = new Bingo(i, -set, ran, this);
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
//# sourceMappingURL=GameBody.js.map