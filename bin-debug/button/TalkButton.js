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
var TalkButton = (function (_super) {
    __extends(TalkButton, _super);
    function TalkButton() {
        var _this = _super.call(this) || this;
        _this._label = "";
        return _this;
    }
    Object.defineProperty(TalkButton.prototype, "label", {
        get: function () {
            return this._label;
        },
        set: function (value) {
            this._label = value;
            if (this.labelDisplay) {
                this.labelDisplay.text = value;
            }
        },
        enumerable: true,
        configurable: true
    });
    TalkButton.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        if (this.labelDisplay) {
            this.labelDisplay.text = this._label;
        }
    };
    return TalkButton;
}(eui.Component));
__reflect(TalkButton.prototype, "TalkButton");
