/* 
**/
class Bingo extends egret.Sprite{
    public width:number = 48;
    public height:number = 48;
    private image:egret.Bitmap = new egret.Bitmap();
    public constructor(x,y){
        super();
        this.x = x;
        this.y = y;
        this.addEventListener(egret.Event.ADDED_TO_STAGE,this.drawDoors,this);
    }
    private drawDoors(){
        this.addImage();
    }
    private addImage(){
        var shape:egret.Shape = new egret.Shape;
        shape.graphics.beginFill(0xff0000 + Math.floor(Math.random() * 100) * (0xffffff / 100), 1);
        shape.graphics.lineStyle(2, 0xff0000 + Math.floor(Math.random() * 100) * (0xffffff / 100));
        shape.graphics.drawRect(this.x, this.y, this.width,this.height);
        shape.graphics.endFill();
        console.log("增加")
        this.addChild(shape);
    }
}