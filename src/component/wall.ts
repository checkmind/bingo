/* 
**/
class Wall extends egret.Sprite{
    public width:number = GameBody.childW;
    public height:number = GameBody.childH;
    private image:egret.Bitmap = new egret.Bitmap();
    public type
    public parents:GameBody
    public colors = [0x1ca5fc,0x295c9d,0x990000,0x7f0000]
    private choosed
    private borderShape:egret.Shape
    public img
    public rect
    public constructor(x,y,type,parent){
        super();
        this.x = x*(this.width);
        this.y = y*(this.height);
        this.parents = parent
        this.type = type;
        this.addEventListener(egret.Event.ADDED_TO_STAGE,this.drawDoors,this);
        
    }
    private drawDoors(){
        //this.addImage();
    }
    private async addImage(){
        this.img =await GameConfig.createBitmapByName("rect.png");     
        this.img.width = this.width;
        this.img.height = this.height;
        this.addChild(this.img);
    }
}