/* 
**/
class EntryGame extends egret.Sprite{
    public width:number;
    public height:number;
    private image:egret.Bitmap = new egret.Bitmap();

    public constructor(width,height){
        super();
        this.x = 0;
        this.y = 0;
        this.width = width;
        this.height = height;
        this.addEventListener(egret.Event.ADDED_TO_STAGE,this.addImage,this);
        
    }
  
    private addImage(){
        let sky = this.createBitmapByName("bg_png",this.width,this.height);
        //this.addChild(sky);
        sky.width = this.width;
        sky.height = this.height;
        this.addStarLand();
        this.addBlackHead();
        this.addBoom();
        this.addTitle();
        this.addNPC();
        this.meau();
    }
    private addNPC() {
        let sky = this.createBitmapByName("npc_png",this.width-50,(this.width-50)/1.12);
        this.addChild(sky);
        sky.x = -150;
        sky.y = this.height - sky.height/1.2;
        var fn = ()=> {
            egret.Tween.get(sky)
            .to( {y:this.height - sky.height/1.5}, 2000, egret.Ease.sineIn ).call(fn2);
        }
        var fn2 = ()=> {
            egret.Tween.get(sky)
            .to( {y:this.height - sky.height/1.2}, 2000, egret.Ease.sineIn ).call(fn);
        }
        fn();
    }
    private addTitle() {
        let sky = this.createBitmapByName("title_png",500,500);
        this.addChild(sky);
        sky.x = this.width/2-300;
        sky.y = 90;
    }
    private addBoom() {
        let sky = this.createBitmapByName("boom_png",this.width-50,(this.width-50)/0.736);
        this.addChild(sky);
        sky.x = 150;
        sky.y = 40;
        sky.scaleX = 0.8;
        sky.scaleY = 0.8;
    }
    private addBlackHead() {
        let sky = this.createBitmapByName("black2_png",480,485);
        this.addChild(sky);
        var funcChange = ():void=>{
            sky.rotation += 1 * iDirection;
        }
        var iDirection:number = 1;  
        //egret.Tween.get( sky ).to( {width:0,height:0}, 600, egret.Ease.sineIn )
        sky.x = this.width/2 - sky.width/1.5;
        sky.y = 40;
        sky.anchorOffsetX = sky.width/2
        sky.anchorOffsetY = sky.height/2;
        this.addChild(sky);
        var fn = function() {
            egret.Tween.get( sky, { onChange:funcChange, onChangeObj:sky } )
            .to( {}, 20000, egret.Ease.sineIn ).call(fn);
        }
        fn();
        
        
    }
    private addStarLand() {
        let sky = this.createBitmapByName("starLand_png",this.width,null);
        this.addChild(sky);
        sky.width = this.width;
        sky.scaleY = 1.5;
        sky.scaleX = 1.5;
        sky.y =  this.height - sky.height*1.5;
    }
    private meau() {
        var skins = ['ButtonModel1','ButtonModel2','ButtonMore','ButtonHelp']
        var labelText = ['关卡模式','无尽模式','漫游说明','游戏帮助']
        for(let i = 0;i<skins.length;i++) {
            let button = new eui.Button();
            button.skinName = `../resource/skins/ButtonMore.exml`;
            
            button.addEventListener(eui.UIEvent.COMPLETE,()=>{
                console.log(button)
                button.x = this.width/2;
                button.label = labelText[i];
                button.width = 300;
                button.y = i * 80 + this.height/2;
                button.rotation = 10+i*2;
                this.addChild(button);
            },this)
     }  
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