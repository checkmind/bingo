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
    function Bingo(x, y, type, parent) {
        var _this = _super.call(this) || this;
        _this.width = GameBody.childW;
        _this.height = GameBody.childH;
        _this.image = new egret.Bitmap();
        _this.colors = [0x1ca5fc, 0x295c9d, 0x990000, 0x7f0000];
        _this.x = x * (_this.width);
        _this.y = y * (_this.height);
        _this.parents = parent;
        _this.type = type;
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.drawDoors, _this);
        return _this;
    }
    Bingo.prototype.drawDoors = function () {
        //this.addRect();
        this.addImage();
        //this.addText();
        //this.addBlackHole();
    };
    Bingo.prototype.addRect = function () {
        this.rect = this.createBitmapByName("rect_png");
        this.rect.width = this.width;
        this.rect.height = this.height;
        this.addChild(this.rect);
    };
    Bingo.prototype.addImage = function () {
        if (this.type >= 100) {
            this.img = this.createBitmapByName("100_png");
        }
        else {
            this.img = this.createBitmapByName((this.type + 1) + "_png");
        }
        this.img.width = this.width;
        this.img.height = this.height;
        this.addChild(this.img);
    };
    Bingo.prototype.addBlackHole = function (fn) {
        this.removeChild(this.img);
        var sky = this.createBitmapByName("blackhole_png");
        sky.width = this.width;
        sky.height = this.height;
        sky.anchorOffsetX = this.width / 2;
        sky.anchorOffsetY = this.width / 2;
        sky.x = sky.width / 2;
        sky.y = sky.width / 2;
        var funcChange = function () {
            sky.rotation += 6 * iDirection;
            if (sky.scaleX > 0.1) {
                sky.scaleX -= 0.01;
                sky.scaleY -= 0.01;
            }
        };
        var iDirection = 1;
        //egret.Tween.get( sky ).to( {width:0,height:0}, 600, egret.Ease.sineIn )
        this.addChild(sky);
        egret.Tween.get(sky, { onChange: funcChange, onChangeObj: sky })
            .to({}, 1000, egret.Ease.sineIn).call(fn);
    };
    Bingo.prototype.createBitmapByName = function (name) {
        var result = new egret.Bitmap();
        var texture = RES.getRes(name);
        result.texture = texture;
        return result;
    };
    Bingo.prototype.addText = function () {
        var text = new egret.TextField();
        // text.text = this.type;
        text.x = this.width / 2 - text.textWidth / 2;
        text.y = this.height / 2 - text.textHeight / 2;
        this.addChild(text);
    };
    Bingo.prototype.killSelf = function () {
        var _this = this;
        return new Promise(function (resolve) {
            _this.addBlackHole(function () {
                _this.$parent.removeChild(_this);
                resolve();
            });
        });
    };
    // 交换位置
    Bingo.prototype.moveToDirection = function (direction) {
        var _this = this;
        var that = this;
        return new Promise(function (resolve) {
            var fn = function () {
                that.removeChoosed();
                resolve(true);
            };
            switch (direction) {
                case 1:
                    egret.Tween.get(_this).to({ x: _this.x, y: _this.y - _this.height }, 600, egret.Ease.sineIn).call(fn);
                    break;
                case 2:
                    egret.Tween.get(_this).to({ x: _this.x + _this.width, y: _this.y }, 600, egret.Ease.sineIn).call(fn);
                    break;
                case 3:
                    egret.Tween.get(_this).to({ x: _this.x, y: _this.y + _this.height }, 600, egret.Ease.sineIn).call(fn);
                    break;
                default:
                    egret.Tween.get(_this).to({ x: _this.x - _this.width, y: _this.y }, 600, egret.Ease.sineIn).call(fn);
                    break;
            }
        });
    };
    Bingo.prototype.moveToBottom = function (j) {
        /*** 本示例关键代码段开始 ***/
        var distance = j * (this.height);
        egret.Tween.get(this)
            .to({ x: this.x, y: distance }, 600, egret.Ease.sineIn);
    };
    Bingo.prototype.chooseBingo = function () {
        if (this.choosed) {
            this.removeChoosed();
            return;
        }
        // this.borderShape = new egret.Shape()
        // this.borderShape.graphics.lineStyle(2, 0xffffff);
        // this.borderShape.graphics.drawRect(0, 0, this.width,this.height);
        // this.borderShape.graphics.endFill();
        // this.addChild(this.borderShape);
        this.addRect();
        this.choosed = true;
    };
    Bingo.prototype.removeChoosed = function () {
        if (!this.choosed)
            return;
        if (this.rect.$parent)
            this.removeChild(this.rect);
        this.choosed = false;
    };
    return Bingo;
}(egret.Sprite));
__reflect(Bingo.prototype, "Bingo");
//# sourceMappingURL=Bingo.js.map