/* 
    人物对话页面
**/
class TalkContent extends egret.Sprite{
    public width:number;
    public height:number;
    private image:egret.Bitmap = new egret.Bitmap();
    private parents;
    private gameBody;
    private gameInf;
    private npc_1;
    private npc_2;
    private nowWords = 0;
    public constructor(width,height,parents){
        super();
        this.x = 0;
        this.y = 0;
        this.width = width;
        this.height = height;
        this.parents = parents;
        this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.mouseDown, this);
    }
    private mouseDown() {
        this.nowWords++;
        let arr = GameConfig.npcTalk[GameConfig.nowTax]
        this.showWhich(arr[this.nowWords]);
    }
    public init() {
        console.log("调用了init")
        this.addEventListener(egret.Event.ADDED_TO_STAGE,this.addImage,this);
        
    }
    private addImage(){
       // this.addBack();
      console.log("调用了初始show")
      this.showWhich(GameConfig.npcTalk[GameConfig.nowTax][this.nowWords]);
      this.removeEventListener(egret.Event.ADDED_TO_STAGE,this.addImage,this);
    }
    
    private addGameBody() {
       
    }
    private addBack() {
        /* 背景色设置 */
        var shape:egret.Shape = new egret.Shape;
        shape.graphics.beginFill(0x000000,0.9)
        shape.graphics.lineStyle(1,0x000000) 
        shape.graphics.drawRect(0, 0, this.width,this.height);
        shape.graphics.endFill();
        this.addChild(shape);
    }

    public showWhich(obj:{type:number,text:string}) {
        console.log("传值是")
        console.log(obj)
        if(!obj) {
            this.parents.beginGame();
            this.removeChildren();
            if(this.$parent)
                this.parents.removeChild(this);
            return;
        }
        if(obj.type!==1) {
            this.addNpc_2(obj.text);
        } else {
            this.addNpc_1(obj.text);
        }
    }
    private addNpc_1(words:string) {           
        this.clearNpc();
        if(this.npc_1){
            this.npc_1.label = words;
            this.addChild(this.npc_1)
            return;
        }
        this.npc_1 = new TaxButton();
        this.npc_1.skinName="resource/eui_skins/TalkSkin.exml" //假设Button.exml在resource文件夹下。
        this.npc_1.label = words;
        this.npc_1.y = this.height - this.npc_1.height;
        this.addChild(this.npc_1);
    }
    private addNpc_2(words:string) {
        this.clearNpc();
        if(this.npc_2) {
            console.log(this.addNpc_2)
            this.npc_2.label = words;
            this.addChild(this.npc_2);
            return;
        }
        this.npc_2 = new TaxButton();
        this.npc_2.skinName="resource/eui_skins/TalkSkin2.exml" //假设Button.exml在resource文件夹下。
        this.npc_2.label = words;
        this.npc_2.y = this.height - this.npc_2.height;
        this.addChild(this.npc_2);
    }
    private clearNpc() {
        this.npc_2 && this.npc_2.parent && this.npc_2.parent.removeChild(this.npc_2);
        this.npc_1 && this.npc_1.parent && this.npc_1.parent.removeChild(this.npc_1);
    }
    public updataStep() {
       
    }


    private createBitmapByName(name: string,width:any,height:any) {
        let result = new egret.Bitmap();
        let texture: egret.Texture = RES.getRes(name);
        result.texture = texture;
        if(width)
            result.width = width;
        if(height)
            result.height = height;
        return result;
    }
}