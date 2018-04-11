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
        var sky = this.createBitmapByName("bg_png", this.width, this.height);
        //this.addChild(sky);
        sky.width = this.width;
        sky.height = this.height;
        this.addStarLand();
        this.addBlackHead();
        this.addBoom();
        this.addTitle();
        this.addNPC();
        this.meau();
    };
    EntryGame.prototype.addNPC = function () {
        var _this = this;
        var sky = this.createBitmapByName("npc_png", this.width - 50, (this.width - 50) / 1.12);
        this.addChild(sky);
        sky.x = -150;
        sky.y = this.height - sky.height / 1.2;
        var fn = function () {
            egret.Tween.get(sky)
                .to({ y: _this.height - sky.height / 1.5 }, 2000, egret.Ease.sineIn).call(fn2);
        };
        var fn2 = function () {
            egret.Tween.get(sky)
                .to({ y: _this.height - sky.height / 1.2 }, 2000, egret.Ease.sineIn).call(fn);
        };
        fn();
    };
    EntryGame.prototype.addTitle = function () {
        var sky = this.createBitmapByName("title_png", 500, 500);
        this.addChild(sky);
        sky.x = this.width / 2 - 300;
        sky.y = 90;
    };
    EntryGame.prototype.addBoom = function () {
        var sky = this.createBitmapByName("boom_png", this.width - 50, (this.width - 50) / 0.736);
        this.addChild(sky);
        sky.x = 150;
        sky.y = 40;
        sky.scaleX = 0.8;
        sky.scaleY = 0.8;
    };
    EntryGame.prototype.addBlackHead = function () {
        var sky = this.createBitmapByName("black2_png", 480, 485);
        this.addChild(sky);
        var funcChange = function () {
            sky.rotation += 1 * iDirection;
        };
        var iDirection = 1;
        //egret.Tween.get( sky ).to( {width:0,height:0}, 600, egret.Ease.sineIn )
        sky.x = this.width / 2 - sky.width / 1.5;
        sky.y = 40;
        sky.anchorOffsetX = sky.width / 2;
        sky.anchorOffsetY = sky.height / 2;
        this.addChild(sky);
        var fn = function () {
            egret.Tween.get(sky, { onChange: funcChange, onChangeObj: sky })
                .to({}, 20000, egret.Ease.sineIn).call(fn);
        };
        fn();
    };
    EntryGame.prototype.addStarLand = function () {
        var sky = this.createBitmapByName("starLand_png", this.width, null);
        this.addChild(sky);
        sky.width = this.width;
        sky.scaleY = 1.5;
        sky.scaleX = 1.5;
        sky.y = this.height - sky.height * 1.5;
    };
    EntryGame.prototype.meau = function () {
        var _this = this;
        var skins = ['ButtonModel1', 'ButtonModel2', 'ButtonMore', 'ButtonHelp'];
        var labelText = ['关卡模式', '无尽模式', '漫游说明', '游戏帮助'];
        var _loop_1 = function (i) {
            var button = new eui.Button();
            button.skinName = "../resource/skins/ButtonMore.exml";
            button.label = labelText[i];
            button.width = 300;
            button.y = i * 80 + this_1.height / 2;
            button.rotation = 10 + i * 2;
            this_1.addChild(button);
            button.addEventListener(eui.UIEvent.COMPLETE, function () {
                console.log(button);
                button.x = _this.width / 2;
            }, this_1);
        };
        var this_1 = this;
        for (var i = 0; i < skins.length; i++) {
            _loop_1(i);
        }
    };
    EntryGame.prototype.createBitmapByName = function (name, width, height) {
        var result = new egret.Bitmap();
        var texture = RES.getRes(name);
        result.texture = texture;
        if (width)
            result.width = width;
        if (height)
            result.height = height;
        return result;
    };
    return EntryGame;
}(egret.Sprite));
__reflect(EntryGame.prototype, "EntryGame");
//# sourceMappingURL=EntryGame.js.map