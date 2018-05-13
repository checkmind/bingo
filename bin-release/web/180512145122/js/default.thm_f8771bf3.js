window.skins={};
function __extends(d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() {
            this.constructor = d;
        }
    __.prototype = b.prototype;
    d.prototype = new __();
};
window.generateEUI = {};
generateEUI.paths = {};
generateEUI.styles = undefined;
generateEUI.skins = {"eui.Button":"resource/eui_skins/ButtonSkin.exml","eui.label":"resource/eui_skins/TextSkin.exml","eui.Image":"resource/eui_skins/ImageSkin.exml"}
generateEUI.paths['resource/eui_skins/ButtonSkin.exml'] = window.skins.ButtonSkin = (function (_super) {
	__extends(ButtonSkin, _super);
	function ButtonSkin() {
		_super.call(this);
		this.skinParts = ["button","labelDisplay"];
		
		this.height = 81;
		this.minHeight = 50;
		this.minWidth = 100;
		this.width = 236;
		this.elementsContent = [this.button_i(),this.labelDisplay_i()];
		this.states = [
			new eui.State ("up",
				[
				])
			,
			new eui.State ("down",
				[
					new eui.SetProperty("button","source","resource/assets/button.png"),
					new eui.SetProperty("labelDisplay","textColor",0xfffcfc),
					new eui.SetProperty("labelDisplay","size",35)
				])
			,
			new eui.State ("disabled",
				[
					new eui.SetProperty("button","alpha",0.5)
				])
		];
	}
	var _proto = ButtonSkin.prototype;

	_proto.button_i = function () {
		var t = new eui.Image();
		this.button = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 81;
		t.left = 0;
		t.scale9Grid = new egret.Rectangle(1,3,8,8);
		t.source = "resource/assets/button.png";
		t.top = 0;
		t.width = 236;
		return t;
	};
	_proto.labelDisplay_i = function () {
		var t = new eui.Label();
		this.labelDisplay = t;
		t.blendMode = "add";
		t.bottom = 1;
		t.fontFamily = "Arial";
		t.height = 81;
		t.left = 1;
		t.right = -1;
		t.size = 30;
		t.strokeColor = 0xb72424;
		t.text = "漫游说明";
		t.textAlign = "center";
		t.top = -1;
		t.verticalAlign = "middle";
		t.width = 236;
		return t;
	};
	return ButtonSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/ImageSkin.exml'] = window.skins.TextSkin = (function (_super) {
	__extends(TextSkin, _super);
	function TextSkin() {
		_super.call(this);
		this.skinParts = ["button","labelDisplay","labelDisplay2"];
		
		this.height = 346;
		this.minHeight = 50;
		this.minWidth = 100;
		this.width = 275;
		this.elementsContent = [this.button_i(),this.labelDisplay_i(),this.labelDisplay2_i()];
	}
	var _proto = TextSkin.prototype;

	_proto.button_i = function () {
		var t = new eui.Image();
		this.button = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 344.08;
		t.left = 0;
		t.scale9Grid = new egret.Rectangle(1,3,8,8);
		t.source = "resource/assets/tax.png";
		t.top = -1;
		t.width = 274.73;
		return t;
	};
	_proto.labelDisplay_i = function () {
		var t = new eui.Label();
		this.labelDisplay = t;
		t.bold = true;
		t.bottom = 307;
		t.fontFamily = "KaiTi";
		t.left = 15;
		t.right = 22;
		t.size = 20;
		t.text = "第一宇宙";
		t.textAlign = "center";
		t.textColor = 0x0a0707;
		t.top = 6;
		t.verticalAlign = "middle";
		return t;
	};
	_proto.labelDisplay2_i = function () {
		var t = new eui.Label();
		this.labelDisplay2 = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.bold = true;
		t.bottom = 127;
		t.fontFamily = "KaiTi";
		t.left = 46;
		t.right = 57;
		t.size = 25;
		t.text = "  第一宇宙的萨芬水af232dsfdsafdsfsdafdsfa";
		t.textAlign = "left";
		t.textColor = 0x112663;
		t.top = 87;
		t.verticalAlign = "top";
		t.wordWrap = true;
		return t;
	};
	return TextSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/progross.exml'] = window.skins.ProgressSkin = (function (_super) {
	__extends(ProgressSkin, _super);
	function ProgressSkin() {
		_super.call(this);
		this.skinParts = ["button","button2","labelDisplay2"];
		
		this.height = 36;
		this.minHeight = 50;
		this.minWidth = 100;
		this.width = 206;
		this.elementsContent = [this.button_i(),this.button2_i(),this.labelDisplay2_i()];
	}
	var _proto = ProgressSkin.prototype;

	_proto.button_i = function () {
		var t = new eui.Image();
		this.button = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 36;
		t.left = 0;
		t.scale9Grid = new egret.Rectangle(1,3,8,8);
		t.source = "resource/assets/progress.png";
		t.top = -1;
		t.width = 206;
		return t;
	};
	_proto.button2_i = function () {
		var t = new eui.Image();
		this.button2 = t;
		t.anchorOffsetX = 200;
		t.anchorOffsetY = 0;
		t.bottom = 12;
		t.height = 12;
		t.right = 6;
		t.scale9Grid = new egret.Rectangle(1,3,8,8);
		t.source = "resource/assets/bar.png";
		t.width = 50;
		return t;
	};
	_proto.labelDisplay2_i = function () {
		var t = new eui.Label();
		this.labelDisplay2 = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.bold = true;
		t.bottom = 127;
		t.fontFamily = "KaiTi";
		t.left = 46;
		t.right = 57;
		t.size = 25;
		t.text = "  第一宇宙的萨芬水af232dsfdsafdsfsdafdsfa";
		t.textAlign = "left";
		t.textColor = 0x112663;
		t.top = 87;
		t.verticalAlign = "top";
		t.visible = false;
		t.wordWrap = true;
		return t;
	};
	return ProgressSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/skillSkin.exml'] = window.skins.TalkSkin = (function (_super) {
	__extends(TalkSkin, _super);
	function TalkSkin() {
		_super.call(this);
		this.skinParts = ["image_2","image_1"];
		
		this.height = 50;
		this.minHeight = 50;
		this.minWidth = 100;
		this.width = 50;
		this.elementsContent = [this.image_2_i(),this.image_1_i()];
	}
	var _proto = TalkSkin.prototype;

	_proto.image_2_i = function () {
		var t = new eui.Image();
		this.image_2 = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 50;
		t.left = 0;
		t.scale9Grid = new egret.Rectangle(1,3,8,8);
		t.source = "resource/assets/shuffle.png";
		t.visible = false;
		t.width = 50;
		t.y = -4;
		return t;
	};
	_proto.image_1_i = function () {
		var t = new eui.Image();
		this.image_1 = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 50;
		t.left = -1;
		t.scale9Grid = new egret.Rectangle(1,3,8,8);
		t.source = "resource/assets/rect_2.png";
		t.width = 50;
		t.y = 1;
		return t;
	};
	return TalkSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/TalkSkin.exml'] = window.skins.TalkSkin = (function (_super) {
	__extends(TalkSkin, _super);
	function TalkSkin() {
		_super.call(this);
		this.skinParts = ["labelDisplay3","labelDisplay2","labelDisplay","button","labelDisplay4"];
		
		this.height = 1300;
		this.minHeight = 50;
		this.minWidth = 100;
		this.width = 700;
		this.elementsContent = [this.labelDisplay3_i(),this.labelDisplay2_i(),this.labelDisplay_i(),this.button_i(),this.labelDisplay4_i()];
	}
	var _proto = TalkSkin.prototype;

	_proto.labelDisplay3_i = function () {
		var t = new eui.Label();
		this.labelDisplay3 = t;
		t.alpha = 0.1;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.background = true;
		t.backgroundColor = 0x070707;
		t.bold = true;
		t.border = true;
		t.borderColor = 0xf9f5f4;
		t.bottom = -106;
		t.fontFamily = "KaiTi";
		t.left = 0;
		t.right = 1;
		t.size = 25;
		t.text = "";
		t.textAlign = "left";
		t.textColor = 0x112663;
		t.top = -1;
		t.verticalAlign = "top";
		t.wordWrap = true;
		return t;
	};
	_proto.labelDisplay2_i = function () {
		var t = new eui.Label();
		this.labelDisplay2 = t;
		t.alpha = 1;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.background = true;
		t.backgroundColor = 0xe0dbdb;
		t.bold = true;
		t.border = true;
		t.borderColor = 0xf9f5f4;
		t.bottom = 1;
		t.fontFamily = "KaiTi";
		t.height = 200;
		t.left = -6;
		t.right = -44;
		t.size = 25;
		t.text = "";
		t.textAlign = "left";
		t.textColor = 0x112663;
		t.top = 1118;
		t.verticalAlign = "top";
		t.wordWrap = true;
		return t;
	};
	_proto.labelDisplay_i = function () {
		var t = new eui.Label();
		this.labelDisplay = t;
		t.alpha = 1;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.background = false;
		t.backgroundColor = 0x000000;
		t.bold = true;
		t.bottom = 39;
		t.fontFamily = "KaiTi";
		t.left = 196;
		t.lineSpacing = 8;
		t.right = 105;
		t.size = 20;
		t.strokeColor = 0xfcf9f9;
		t.text = "  第一宇宙的萨芬水af232dsfdsafdsfsdafdsfa";
		t.textAlign = "left";
		t.textColor = 0x140505;
		t.top = 1147;
		t.verticalAlign = "justify";
		t.wordWrap = true;
		return t;
	};
	_proto.button_i = function () {
		var t = new eui.Image();
		this.button = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 257.08;
		t.left = -6;
		t.scale9Grid = new egret.Rectangle(1,3,8,8);
		t.source = "resource/assets/npc_1.png";
		t.top = 1041;
		t.width = 205.26;
		return t;
	};
	_proto.labelDisplay4_i = function () {
		var t = new eui.Label();
		this.labelDisplay4 = t;
		t.alpha = 1;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.background = false;
		t.backgroundColor = 0xe0dbdb;
		t.bold = true;
		t.border = false;
		t.borderColor = 0xf9f5f4;
		t.bottom = 14;
		t.fontFamily = "KaiTi";
		t.left = 475;
		t.right = 105;
		t.size = 25;
		t.text = "点击继续";
		t.textAlign = "right";
		t.textColor = 0x112663;
		t.top = 1259;
		t.verticalAlign = "top";
		t.wordWrap = true;
		return t;
	};
	return TalkSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/TalkSkin2.exml'] = window.skins.TalkSkin = (function (_super) {
	__extends(TalkSkin, _super);
	function TalkSkin() {
		_super.call(this);
		this.skinParts = ["labelDisplay3","labelDisplay2","labelDisplay4","labelDisplay","button"];
		
		this.height = 1300;
		this.minHeight = 50;
		this.minWidth = 100;
		this.width = 700;
		this.elementsContent = [this.labelDisplay3_i(),this.labelDisplay2_i(),this.labelDisplay4_i(),this.labelDisplay_i(),this.button_i()];
	}
	var _proto = TalkSkin.prototype;

	_proto.labelDisplay3_i = function () {
		var t = new eui.Label();
		this.labelDisplay3 = t;
		t.alpha = 0.1;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.background = true;
		t.backgroundColor = 0x070707;
		t.bold = true;
		t.border = true;
		t.borderColor = 0xf9f5f4;
		t.bottom = -106;
		t.fontFamily = "KaiTi";
		t.left = 0;
		t.right = 1;
		t.size = 25;
		t.text = "";
		t.textAlign = "left";
		t.textColor = 0x112663;
		t.top = -1;
		t.verticalAlign = "top";
		t.wordWrap = true;
		return t;
	};
	_proto.labelDisplay2_i = function () {
		var t = new eui.Label();
		this.labelDisplay2 = t;
		t.alpha = 1;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.background = true;
		t.backgroundColor = 0xe0dbdb;
		t.bold = true;
		t.border = true;
		t.borderColor = 0xf9f5f4;
		t.bottom = 1;
		t.fontFamily = "KaiTi";
		t.height = 200;
		t.left = -6;
		t.right = -44;
		t.size = 25;
		t.text = "";
		t.textAlign = "left";
		t.textColor = 0x112663;
		t.top = 1118;
		t.verticalAlign = "top";
		t.wordWrap = true;
		return t;
	};
	_proto.labelDisplay4_i = function () {
		var t = new eui.Label();
		this.labelDisplay4 = t;
		t.alpha = 1;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.background = true;
		t.backgroundColor = 0xe0dbdb;
		t.bold = true;
		t.border = false;
		t.borderColor = 0xf9f5f4;
		t.bottom = 14;
		t.fontFamily = "KaiTi";
		t.left = 31;
		t.right = 549;
		t.size = 25;
		t.text = "点击继续";
		t.textAlign = "right";
		t.textColor = 0x112663;
		t.top = 1259;
		t.verticalAlign = "top";
		t.wordWrap = true;
		return t;
	};
	_proto.labelDisplay_i = function () {
		var t = new eui.Label();
		this.labelDisplay = t;
		t.alpha = 1;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.background = false;
		t.backgroundColor = 0xe5e3e3;
		t.bold = true;
		t.bottom = 40;
		t.fontFamily = "KaiTi";
		t.left = 31;
		t.lineSpacing = 8;
		t.right = 203;
		t.size = 20;
		t.strokeColor = 0xfcf9f9;
		t.text = "  第一宇宙的萨芬水af2jdsajfdlsk;ajfdslkajfdsklafjslkajfdsjlak;fdsafdsafdsf32dsfdsafdsfsdafdsfa";
		t.textAlign = "center";
		t.textColor = 0x140505;
		t.top = 1148;
		t.verticalAlign = "justify";
		t.wordWrap = true;
		return t;
	};
	_proto.button_i = function () {
		var t = new eui.Image();
		this.button = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 243;
		t.left = 460;
		t.scale9Grid = new egret.Rectangle(1,3,8,8);
		t.source = "resource/assets/npc_2.png";
		t.top = 1042;
		t.width = 135.36;
		return t;
	};
	return TalkSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/TextSkin.exml'] = window.skins.TextSkin = (function (_super) {
	__extends(TextSkin, _super);
	function TextSkin() {
		_super.call(this);
		this.skinParts = ["labelDisplay"];
		
		this.minHeight = 50;
		this.minWidth = 100;
		this.elementsContent = [this.labelDisplay_i()];
	}
	var _proto = TextSkin.prototype;

	_proto.labelDisplay_i = function () {
		var t = new eui.Label();
		this.labelDisplay = t;
		t.bottom = 5;
		t.fontFamily = "Arial";
		t.left = 3;
		t.right = 13;
		t.size = 40;
		t.text = "5465445464564";
		t.textAlign = "center";
		t.top = 11;
		t.verticalAlign = "middle";
		return t;
	};
	return TextSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/timerSkin.exml'] = window.skins.ButtonSkin = (function (_super) {
	__extends(ButtonSkin, _super);
	function ButtonSkin() {
		_super.call(this);
		this.skinParts = ["button","labelDisplay"];
		
		this.height = 81;
		this.minHeight = 50;
		this.minWidth = 100;
		this.width = 236;
		this.elementsContent = [this.button_i(),this.labelDisplay_i()];
		this.states = [
			new eui.State ("up",
				[
				])
			,
			new eui.State ("down",
				[
					new eui.SetProperty("button","source","resource/assets/button.png"),
					new eui.SetProperty("labelDisplay","textColor",0xfffcfc),
					new eui.SetProperty("labelDisplay","size",35)
				])
			,
			new eui.State ("disabled",
				[
					new eui.SetProperty("button","alpha",0.5)
				])
		];
	}
	var _proto = ButtonSkin.prototype;

	_proto.button_i = function () {
		var t = new eui.Image();
		this.button = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 81;
		t.left = 0;
		t.scale9Grid = new egret.Rectangle(1,3,8,8);
		t.source = "resource/assets/timer.png";
		t.top = 0;
		t.width = 236;
		return t;
	};
	_proto.labelDisplay_i = function () {
		var t = new eui.Label();
		this.labelDisplay = t;
		t.blendMode = "add";
		t.fontFamily = "Arial";
		t.height = 81;
		t.horizontalCenter = 0;
		t.maxWidth = 81;
		t.size = 30;
		t.strokeColor = 0xb72424;
		t.text = "60 : 59";
		t.textAlign = "center";
		t.verticalAlign = "middle";
		t.verticalCenter = 0;
		t.width = 236;
		return t;
	};
	return ButtonSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/TitleSkin.exml'] = window.skins.TalkSkin = (function (_super) {
	__extends(TalkSkin, _super);
	function TalkSkin() {
		_super.call(this);
		this.skinParts = ["rotate","labelDisplay2","labelDisplay","button","button2"];
		
		this.height = 137;
		this.minHeight = 50;
		this.minWidth = 100;
		this.width = 335;
		this.rotate_i();
		this.elementsContent = [this.labelDisplay2_i(),this.labelDisplay_i(),this.button_i(),this.button2_i()];
		
		eui.Binding.$bindProperties(this, ["button2"],[0],this._TweenItem1,"target")
		eui.Binding.$bindProperties(this, [20],[],this._Object1,"rotation")
		eui.Binding.$bindProperties(this, [40],[],this._Object2,"rotation")
		eui.Binding.$bindProperties(this, [60],[],this._Object3,"rotation")
		eui.Binding.$bindProperties(this, [80],[],this._Object4,"rotation")
		eui.Binding.$bindProperties(this, [100],[],this._Object5,"rotation")
		eui.Binding.$bindProperties(this, [120],[],this._Object6,"rotation")
		eui.Binding.$bindProperties(this, [140],[],this._Object7,"rotation")
		eui.Binding.$bindProperties(this, [160],[],this._Object8,"rotation")
		eui.Binding.$bindProperties(this, [180],[],this._Object9,"rotation")
		eui.Binding.$bindProperties(this, [200],[],this._Object10,"rotation")
	}
	var _proto = TalkSkin.prototype;

	_proto.rotate_i = function () {
		var t = new egret.tween.TweenGroup();
		this.rotate = t;
		t.items = [this._TweenItem1_i()];
		return t;
	};
	_proto._TweenItem1_i = function () {
		var t = new egret.tween.TweenItem();
		this._TweenItem1 = t;
		t.paths = [this._Wait1_i(),this._Set1_i(),this._Wait2_i(),this._Set2_i(),this._Wait3_i(),this._Set3_i(),this._Wait4_i(),this._Set4_i(),this._Wait5_i(),this._Set5_i(),this._Wait6_i(),this._Set6_i(),this._Wait7_i(),this._Set7_i(),this._Wait8_i(),this._Set8_i(),this._Wait9_i(),this._Set9_i(),this._Wait10_i(),this._Set10_i()];
		return t;
	};
	_proto._Wait1_i = function () {
		var t = new egret.tween.Wait();
		t.duration = 100;
		return t;
	};
	_proto._Set1_i = function () {
		var t = new egret.tween.Set();
		t.props = this._Object1_i();
		return t;
	};
	_proto._Object1_i = function () {
		var t = {};
		this._Object1 = t;
		return t;
	};
	_proto._Wait2_i = function () {
		var t = new egret.tween.Wait();
		t.duration = 100;
		return t;
	};
	_proto._Set2_i = function () {
		var t = new egret.tween.Set();
		t.props = this._Object2_i();
		return t;
	};
	_proto._Object2_i = function () {
		var t = {};
		this._Object2 = t;
		return t;
	};
	_proto._Wait3_i = function () {
		var t = new egret.tween.Wait();
		t.duration = 100;
		return t;
	};
	_proto._Set3_i = function () {
		var t = new egret.tween.Set();
		t.props = this._Object3_i();
		return t;
	};
	_proto._Object3_i = function () {
		var t = {};
		this._Object3 = t;
		return t;
	};
	_proto._Wait4_i = function () {
		var t = new egret.tween.Wait();
		t.duration = 100;
		return t;
	};
	_proto._Set4_i = function () {
		var t = new egret.tween.Set();
		t.props = this._Object4_i();
		return t;
	};
	_proto._Object4_i = function () {
		var t = {};
		this._Object4 = t;
		return t;
	};
	_proto._Wait5_i = function () {
		var t = new egret.tween.Wait();
		t.duration = 100;
		return t;
	};
	_proto._Set5_i = function () {
		var t = new egret.tween.Set();
		t.props = this._Object5_i();
		return t;
	};
	_proto._Object5_i = function () {
		var t = {};
		this._Object5 = t;
		return t;
	};
	_proto._Wait6_i = function () {
		var t = new egret.tween.Wait();
		t.duration = 100;
		return t;
	};
	_proto._Set6_i = function () {
		var t = new egret.tween.Set();
		t.props = this._Object6_i();
		return t;
	};
	_proto._Object6_i = function () {
		var t = {};
		this._Object6 = t;
		return t;
	};
	_proto._Wait7_i = function () {
		var t = new egret.tween.Wait();
		t.duration = 100;
		return t;
	};
	_proto._Set7_i = function () {
		var t = new egret.tween.Set();
		t.props = this._Object7_i();
		return t;
	};
	_proto._Object7_i = function () {
		var t = {};
		this._Object7 = t;
		return t;
	};
	_proto._Wait8_i = function () {
		var t = new egret.tween.Wait();
		t.duration = 100;
		return t;
	};
	_proto._Set8_i = function () {
		var t = new egret.tween.Set();
		t.props = this._Object8_i();
		return t;
	};
	_proto._Object8_i = function () {
		var t = {};
		this._Object8 = t;
		return t;
	};
	_proto._Wait9_i = function () {
		var t = new egret.tween.Wait();
		t.duration = 100;
		return t;
	};
	_proto._Set9_i = function () {
		var t = new egret.tween.Set();
		t.props = this._Object9_i();
		return t;
	};
	_proto._Object9_i = function () {
		var t = {};
		this._Object9 = t;
		return t;
	};
	_proto._Wait10_i = function () {
		var t = new egret.tween.Wait();
		t.duration = 100;
		return t;
	};
	_proto._Set10_i = function () {
		var t = new egret.tween.Set();
		t.props = this._Object10_i();
		return t;
	};
	_proto._Object10_i = function () {
		var t = {};
		this._Object10 = t;
		return t;
	};
	_proto.labelDisplay2_i = function () {
		var t = new eui.Label();
		this.labelDisplay2 = t;
		t.alpha = 1;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.background = false;
		t.backgroundColor = 0xe5e3e3;
		t.bold = true;
		t.fontFamily = "KaiTi";
		t.height = 30.57;
		t.lineSpacing = 8;
		t.size = 20;
		t.strokeColor = 0xfcf9f9;
		t.text = "第一宇宙";
		t.textAlign = "center";
		t.textColor = 0xf4e8e8;
		t.verticalAlign = "middle";
		t.width = 117.4;
		t.wordWrap = true;
		t.x = 30;
		t.y = 55;
		return t;
	};
	_proto.labelDisplay_i = function () {
		var t = new eui.Label();
		this.labelDisplay = t;
		t.alpha = 1;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.background = false;
		t.backgroundColor = 0xe5e3e3;
		t.bold = true;
		t.fontFamily = "KaiTi";
		t.height = 43;
		t.lineSpacing = 8;
		t.size = 22;
		t.strokeColor = 0xfcf9f9;
		t.text = "熵值：10";
		t.textAlign = "center";
		t.textColor = 0xf4e8e8;
		t.verticalAlign = "middle";
		t.width = 149.4;
		t.wordWrap = true;
		t.x = 164;
		t.y = 46;
		return t;
	};
	_proto.button_i = function () {
		var t = new eui.Image();
		this.button = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 143;
		t.left = 0;
		t.scale9Grid = new egret.Rectangle(1,3,8,8);
		t.source = "resource/assets/name.png";
		t.width = 335.36;
		t.y = -2;
		return t;
	};
	_proto.button2_i = function () {
		var t = new eui.Image();
		this.button2 = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 139;
		t.horizontalCenter = -80;
		t.left = 11;
		t.scale9Grid = new egret.Rectangle(1,3,8,8);
		t.source = "resource/assets/cir.png";
		t.verticalCenter = 2;
		t.width = 139;
		return t;
	};
	return TalkSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/toastSkin.exml'] = window.skins.TalkSkin = (function (_super) {
	__extends(TalkSkin, _super);
	function TalkSkin() {
		_super.call(this);
		this.skinParts = ["button","labelDisplay2","labelDisplay"];
		
		this.height = 345;
		this.minHeight = 50;
		this.minWidth = 100;
		this.width = 226;
		this.elementsContent = [this.button_i(),this.labelDisplay2_i(),this.labelDisplay_i()];
	}
	var _proto = TalkSkin.prototype;

	_proto.button_i = function () {
		var t = new eui.Image();
		this.button = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 345;
		t.scale9Grid = new egret.Rectangle(1,3,8,8);
		t.source = "resource/assets/toast.png";
		t.width = 226;
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto.labelDisplay2_i = function () {
		var t = new eui.Label();
		this.labelDisplay2 = t;
		t.alpha = 1;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.background = false;
		t.backgroundColor = 0xe5e3e3;
		t.bold = true;
		t.fontFamily = "KaiTi";
		t.height = 30.57;
		t.lineSpacing = 8;
		t.size = 20;
		t.strokeColor = 0xfcf9f9;
		t.text = "第一宇宙";
		t.textAlign = "center";
		t.textColor = 0xf4e8e8;
		t.verticalAlign = "middle";
		t.width = 117.4;
		t.wordWrap = true;
		t.x = 48.6;
		t.y = 39.93;
		return t;
	};
	_proto.labelDisplay_i = function () {
		var t = new eui.Label();
		this.labelDisplay = t;
		t.alpha = 1;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.background = false;
		t.backgroundColor = 0xe5e3e3;
		t.bold = true;
		t.fontFamily = "KaiTi";
		t.height = 180;
		t.lineSpacing = 8;
		t.size = 16;
		t.strokeColor = 0xfcf9f9;
		t.text = "  想不到你竟然这里厉害";
		t.textAlign = "left";
		t.textColor = 0xf4e8e8;
		t.verticalAlign = "top";
		t.verticalCenter = 35.5;
		t.width = 159.4;
		t.wordWrap = true;
		t.x = 33.3;
		return t;
	};
	return TalkSkin;
})(eui.Skin);