/* 
    游戏关卡页
**/
class GameTax extends egret.Sprite{
    public width:number;
    public height:number;
    private image:egret.Bitmap = new egret.Bitmap();
    private parents;
    public constructor(width,height,parent){
        super();
        this.x = 0;
        this.y = 0;
        this.width = width;
        this.height = height;
        this.parents = parent;
        this.addEventListener(egret.Event.ADDED_TO_STAGE,this.addImage,this);
        
    }
  
    private addImage(){
        this.addBack();
        this.addGroup();
        this.addReturn();
    }
    private addGroup() {
       let gameGroup = new GameGroup(this.width,this.height,this);
       this.addChild(gameGroup);   
    }

   
    private addBack() { 
        let sky = this.createBitmapByName("back_1_png",this.width,this.width*1.78);
        this.addChild(sky);
        var fn = ()=> {
            egret.Tween.get(sky)
        .to( {y:-100}, 4*6000, egret.Ease.sineIn ).call(fn2);
        }
        var fn2 = ()=> {
            egret.Tween.get(sky)
        .to( {y:0}, 4*6000, egret.Ease.sineIn ).call(fn);
        }
        fn();
    }
    private addReturn() { 
        let sky = this.createBitmapByName("back_png",40,40);
        sky.x = 20;
        sky.y = 50;
        sky.touchEnabled = true;
        sky.addEventListener('touchEnd',()=>{
            PageBus.gotoPage('index');
        },this);
        this.addChild(sky);
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