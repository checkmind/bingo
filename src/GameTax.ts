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
        let sky = this.createBitmapByName("bg_png",this.width,this.height);
        //this.addChild(sky);
        console.log("add all")
        sky.width = this.width;
        sky.height = this.height;
        this.meau();
    }



    private meau() {
        var skins = ['ButtonModel1','ButtonModel2','ButtonMore','ButtonHelp']
        var labelText = ['关卡模式','无尽模式','漫游说明','游戏帮助']

            let button = new eui.Image();
            button.touchEnabled = true;
            button.source = "image/uibg.png";
            button.width = 300;
            button.height = 300;
            this.addChild(button);
            //button.addEventListener(egret.TouchEvent.TOUCH_TAP,this.bindClickFn,this);
    }
    /* 给按钮绑定事件 */
    private bindClickFn() {
        PageBus.gotoPage(1);
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