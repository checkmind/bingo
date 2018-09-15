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
var lalala = (function (_super) {
    __extends(lalala, _super);
    function lalala() {
        var _this = _super.call(this) || this;
        _this._label = "";
        return _this;
    }
    Object.defineProperty(lalala.prototype, "label", {
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
    lalala.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        if (this.labelDisplay) {
            this.labelDisplay.text = this._label;
        }
    };
    return lalala;
}(eui.Component));
__reflect(lalala.prototype, "lalala");
