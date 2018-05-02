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
    function EntryGame(width, height, parent) {
        var _this = _super.call(this) || this;
        _this.image = new egret.Bitmap();
        _this.x = 0;
        _this.y = 0;
        _this.width = width;
        _this.height = height;
        _this.parents = parent;
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.addImage, _this);
        return _this;
    }
    EntryGame.prototype.addImage = function () {
        var sky = this.createBitmapByName("bg_png", this.width, this.height);
        //this.addChild(sky);
        sky.width = this.width;
        sky.height = this.height;
        this.addBlackHead();
        this.addBoom();
        this.addTitle();
        this.addNPC();
        this.addStarLand();
        this.meau();
    };
    EntryGame.prototype.addNPC = function () {
        var _this = this;
        var sky = this.createBitmapByName("npc_1_png", 256, 282);
        this.addChild(sky);
        sky.x = 100;
        sky.y = this.height - sky.height / 0.75;
        var fn = function () {
            egret.Tween.get(sky)
                .to({ y: _this.height - sky.height / 0.7 }, 3000, egret.Ease.sineIn).call(fn2);
        };
        var fn2 = function () {
            egret.Tween.get(sky)
                .to({ y: _this.height - sky.height / 0.75 }, 3000, egret.Ease.sineIn).call(fn);
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
        var system = new particle.GravityParticleSystem(RES.getRes("newParticle2_png"), RES.getRes("newParticle2_json"));
        this.addChild(system);
        system.start();
        // let sky = this.createBitmapByName("boom_png",this.width-50,(this.width-50)/0.736);
        // this.addChild(sky);
        // sky.x = 150;
        // sky.y = 40;
        // sky.scaleX = 0.8;
        // sky.scaleY = 0.8;
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
        var labelText = ['剧情模式', '无尽模式', '游戏帮助', '退出游戏'];
        var _loop_1 = function (i) {
            var button = new eui.Button();
            button.touchEnabled = true;
            button.x = this_1.width / 2;
            button.label = labelText[i];
            button.width = 236;
            button.height = 81;
            button.y = i * 90 + this_1.height / 2;
            //button.rotation = 10+i*2;
            button.enabled = true;
            this_1.addChild(button);
            button.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
                _this.bindClickFn(i);
            }, this_1, false, i);
        };
        var this_1 = this;
        for (var i = 0; i < skins.length; i++) {
            _loop_1(i);
        }
    };
    /* 给按钮绑定事件 */
    EntryGame.prototype.bindClickFn = function (i) {
        switch (i) {
            case 0:
                PageBus.gotoPage("gameTax");
                break;
            case 1:
                break;
            case 2:
                break;
            default:
                return;
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