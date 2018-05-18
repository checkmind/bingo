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
    人物对话页面
**/
var TalkContent = (function (_super) {
    __extends(TalkContent, _super);
    function TalkContent(width, height, parents) {
        var _this = _super.call(this) || this;
        _this.image = new egret.Bitmap();
        _this.nowWords = 0;
        _this.x = 0;
        _this.y = 0;
        _this.width = width;
        _this.height = height;
        _this.parents = parents;
        _this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, _this.mouseDown, _this);
        return _this;
    }
    TalkContent.prototype.mouseDown = function () {
        this.nowWords++;
        var arr = TalkConfig.npcTalk[GameConfig.nowTax];
        this.showWhich(arr[this.nowWords]);
    };
    TalkContent.prototype.init = function () {
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.addImage, this);
    };
    TalkContent.prototype.addImage = function () {
        // this.addBack();
        this.showWhich(TalkConfig.npcTalk[GameConfig.nowTax][this.nowWords]);
        this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.addImage, this);
    };
    TalkContent.prototype.addGameBody = function () {
    };
    TalkContent.prototype.addBack = function () {
        /* 背景色设置 */
        var shape = new egret.Shape;
        shape.graphics.beginFill(0x000000, 0.9);
        shape.graphics.lineStyle(1, 0x000000);
        shape.graphics.drawRect(0, 0, this.width, this.height);
        shape.graphics.endFill();
        this.addChild(shape);
    };
    TalkContent.prototype.showWhich = function (obj) {
        if (!obj) {
            this.parents.success();
            this.removeChildren();
            if (this.$parent)
                this.parents.removeChild(this);
            return;
        }
        if (obj.type !== 1) {
            this.addNpc_2(obj.text);
        }
        else {
            this.addNpc_1(obj.text);
        }
    };
    TalkContent.prototype.addNpc_1 = function (words) {
        this.clearNpc();
        if (this.npc_1) {
            this.npc_1.label = words;
            this.addChild(this.npc_1);
            return;
        }
        this.npc_1 = new TaxButton();
        this.npc_1.skinName = "resource/eui_skins/TalkSkin.exml"; //假设Button.exml在resource文件夹下。
        this.npc_1.label = words;
        this.npc_1.y = this.height - this.npc_1.height;
        this.addChild(this.npc_1);
    };
    TalkContent.prototype.addNpc_2 = function (words) {
        this.clearNpc();
        if (this.npc_2) {
            this.npc_2.label = words;
            this.addChild(this.npc_2);
            return;
        }
        this.npc_2 = new TaxButton();
        this.npc_2.skinName = "resource/eui_skins/TalkSkin2.exml"; //假设Button.exml在resource文件夹下。
        this.npc_2.label = words;
        this.npc_2.y = this.height - this.npc_2.height;
        this.addChild(this.npc_2);
    };
    TalkContent.prototype.clearNpc = function () {
        this.npc_2 && this.npc_2.parent && this.npc_2.parent.removeChild(this.npc_2);
        this.npc_1 && this.npc_1.parent && this.npc_1.parent.removeChild(this.npc_1);
    };
    TalkContent.prototype.updataStep = function () {
    };
    TalkContent.prototype.createBitmapByName = function (name, width, height) {
        var result = new egret.Bitmap();
        var texture = RES.getRes(name);
        result.texture = texture;
        if (width)
            result.width = width;
        if (height)
            result.height = height;
        return result;
    };
    return TalkContent;
}(egret.Sprite));
__reflect(TalkContent.prototype, "TalkContent");
//# sourceMappingURL=TalkContent.js.map