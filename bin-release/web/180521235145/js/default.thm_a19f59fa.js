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
})(eui.Skin);generateEUI.paths['resource/eui_skins/GetHelper.exml'] = window.skins.GetHelper = (function (_super) {
	__extends(GetHelper, _super);
	function GetHelper() {
		_super.call(this);
		this.skinParts = ["button1","button2","button3","labelDisplay","labelDisplay2"];
		
		this.height = 419;
		this.minHeight = 50;
		this.minWidth = 100;
		this.width = 331;
		this.elementsContent = [this.button1_i(),this.button2_i(),this.button3_i(),this.labelDisplay_i(),this.labelDisplay2_i()];
		this.states = [
			new eui.State ("up",
				[
				])
			,
			new eui.State ("down",
				[
					new eui.SetProperty("button1","source","resource/assets/helpBack.png"),
					new eui.SetProperty("button1","width",250),
					new eui.SetProperty("button1","height",363),
					new eui.SetProperty("button1","y",0),
					new eui.SetProperty("button1","horizontalCenter",0),
					new eui.SetProperty("button1","top",0),
					new eui.SetProperty("button2","source","resource/assets/ok.png"),
					new eui.SetProperty("button2","width",127.93),
					new eui.SetProperty("button2","height",43),
					new eui.SetProperty("button2","horizontalCenter",2),
					new eui.SetProperty("button2","top",284),
					new eui.SetProperty("button3","source","resource/assets/rect_2.png"),
					new eui.SetProperty("button3","horizontalCenter",-2),
					new eui.SetProperty("button3","top",42),
					new eui.SetProperty("labelDisplay","textColor",0xfffcfc),
					new eui.SetProperty("labelDisplay","size",20),
					new eui.SetProperty("labelDisplay","left",23),
					new eui.SetProperty("labelDisplay","right",23),
					new eui.SetProperty("labelDisplay","top",142),
					new eui.SetProperty("labelDisplay","bottom",160),
					new eui.SetProperty("labelDisplay","anchorOffsetX",0),
					new eui.SetProperty("labelDisplay2","textColor",0xfffcfc),
					new eui.SetProperty("labelDisplay2","size",20),
					new eui.SetProperty("labelDisplay2","anchorOffsetX",0),
					new eui.SetProperty("labelDisplay2","left",33),
					new eui.SetProperty("labelDisplay2","right",33),
					new eui.SetProperty("labelDisplay2","top",197),
					new eui.SetProperty("labelDisplay2","bottom",85),
					new eui.SetProperty("","width",250)
				])
			,
			new eui.State ("disabled",
				[
					new eui.SetProperty("button1","alpha",0.5),
					new eui.SetProperty("button2","alpha",0.5),
					new eui.SetProperty("button3","alpha",0.5)
				])
		];
	}
	var _proto = GetHelper.prototype;

	_proto.button1_i = function () {
		var t = new eui.Image();
		this.button1 = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 420;
		t.horizontalCenter = -1.5;
		t.scale9Grid = new egret.Rectangle(1,3,8,8);
		t.source = "resource/assets/helpBack.png";
		t.top = 0;
		t.width = 330;
		return t;
	};
	_proto.button2_i = function () {
		var t = new eui.Image();
		this.button2 = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 40;
		t.horizontalCenter = 1;
		t.scale9Grid = new egret.Rectangle(1,3,8,8);
		t.source = "resource/assets/ok.png";
		t.top = 338;
		t.width = 119;
		return t;
	};
	_proto.button3_i = function () {
		var t = new eui.Image();
		this.button3 = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 100;
		t.horizontalCenter = -1.5;
		t.scale9Grid = new egret.Rectangle(1,3,8,8);
		t.source = "resource/assets/rect_2.png";
		t.top = 113;
		t.width = 100;
		return t;
	};
	_proto.labelDisplay_i = function () {
		var t = new eui.Label();
		this.labelDisplay = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.blendMode = "add";
		t.bottom = 338;
		t.fontFamily = "Arial";
		t.height = 81;
		t.left = 85;
		t.right = 82;
		t.size = 20;
		t.strokeColor = 0xb72424;
		t.text = "二向箔";
		t.textAlign = "center";
		t.top = 39;
		t.verticalAlign = "middle";
		t.width = 236;
		return t;
	};
	_proto.labelDisplay2_i = function () {
		var t = new eui.Label();
		this.labelDisplay2 = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.blendMode = "add";
		t.bottom = 70;
		t.fontFamily = "Arial";
		t.height = 81;
		t.left = 31;
		t.right = 28;
		t.size = 20;
		t.strokeColor = 0xb72424;
		t.text = "对选中星球及其周围星球进行降维打击";
		t.textAlign = "center";
		t.top = 202;
		t.verticalAlign = "middle";
		t.width = 236;
		return t;
	};
	return GetHelper;
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
		t.blendMode = "normal";
		t.fontFamily = "Arial";
		t.height = 81;
		t.horizontalCenter = 0;
		t.maxWidth = 81;
		t.size = 30;
		t.strokeColor = 0xb72424;
		t.text = "时间： 60 ";
		t.textAlign = "center";
		t.verticalAlign = "middle";
		t.width = 236;
		t.wordWrap = false;
		t.y = 0;
		return t;
	};
	return ButtonSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/TitleSkin.exml'] = window.skins.TalkSkin = (function (_super) {
	__extends(TalkSkin, _super);
	function TalkSkin() {
		_super.call(this);
		this.skinParts = ["labelDisplay2","labelDisplay","button","button2"];
		
		this.height = 137;
		this.minHeight = 50;
		this.minWidth = 100;
		this.width = 335;
		this.elementsContent = [this.labelDisplay2_i(),this.labelDisplay_i(),this.button_i(),this.button2_i()];
	}
	var _proto = TalkSkin.prototype;

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
		
		this.height = 690;
		this.minHeight = 50;
		this.minWidth = 100;
		this.width = 452;
		this.elementsContent = [this.button_i(),this.labelDisplay2_i(),this.labelDisplay_i()];
	}
	var _proto = TalkSkin.prototype;

	_proto.button_i = function () {
		var t = new eui.Image();
		this.button = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 690;
		t.scale9Grid = new egret.Rectangle(1,3,8,8);
		t.source = "resource/assets/toast.png";
		t.width = 452;
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
		t.height = 46.57;
		t.lineSpacing = 8;
		t.size = 30;
		t.strokeColor = 0xfcf9f9;
		t.text = "第一宇宙";
		t.textAlign = "center";
		t.textColor = 0xf4e8e8;
		t.verticalAlign = "middle";
		t.width = 330.4;
		t.wordWrap = true;
		t.x = 67.3;
		t.y = 89;
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
		t.height = 316;
		t.lineSpacing = 8;
		t.size = 25;
		t.strokeColor = 0xfcf9f9;
		t.text = "  想不到你竟然这里厉害";
		t.textAlign = "left";
		t.textColor = 0xf4e8e8;
		t.verticalAlign = "top";
		t.verticalCenter = 82;
		t.width = 312.4;
		t.wordWrap = true;
		t.x = 70.3;
		return t;
	};
	return TalkSkin;
})(eui.Skin);