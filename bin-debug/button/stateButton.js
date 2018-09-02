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
var TaxButton = (function (_super) {
    __extends(TaxButton, _super);
    function TaxButton() {
        var _this = _super.call(this) || this;
        _this._label = "";
        _this._label2 = "";
        return _this;
    }
    Object.defineProperty(TaxButton.prototype, "label", {
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
    Object.defineProperty(TaxButton.prototype, "label2", {
        get: function () {
            return this._label2;
        },
        set: function (value) {
            this._label2 = value;
            if (this.labelDisplay2) {
                this.labelDisplay2.text = value;
            }
        },
        enumerable: true,
        configurable: true
    });
    TaxButton.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        if (this.labelDisplay) {
            this.labelDisplay.text = this._label;
        }
    };
    return TaxButton;
}(eui.Component));
__reflect(TaxButton.prototype, "TaxButton");
