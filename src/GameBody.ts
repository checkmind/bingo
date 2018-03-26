/* 
**/
class GameBody extends egret.Sprite{
    public width:number;
    public height:number;
    private image:egret.Bitmap = new egret.Bitmap();
    private bingo
    public constructor(width,height){
        super();
        this.x = 0;
        this.y = 100;
        this.width = width;
        this.height = height-100;
        this.addEventListener(egret.Event.ADDED_TO_STAGE,this.drawDoors,this);
    }
    private drawDoors(){
        this.addImage();
    }
    private addImage(){
        var shape:egret.Shape = new egret.Shape;
        shape.graphics.beginFill(0x0000,.5)
        shape.graphics.lineStyle(1,0x333333)
        shape.graphics.drawRect(this.x, this.y, this.width,this.height);
        shape.graphics.endFill();
        this.addChild(shape);
    }
}