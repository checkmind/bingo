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
        var shape:egret.Shape = new egret.Shape;
        shape.graphics.beginFill(0x000000,.5)
        shape.graphics.lineStyle(1,0x000000) 
        shape.graphics.drawRect(0, 0, this.width-this.x,this.height);
        shape.graphics.endFill();
        this.addChild(shape);
        this.meau();
    }
    private meau() {
        var skins = ['ButtonModel1','ButtonModel2','ButtonMore','ButtonHelp']
        
        var button = new eui.Button();
        button.skinName = "../resource/skins/ButtonMore.exml";
        button.label = '漫游说明'
        this.addChild(button);
    }
}