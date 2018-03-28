/* 
**/
class Bingo extends egret.Sprite{
    public width:number = 48;
    public height:number = 48;
    private image:egret.Bitmap = new egret.Bitmap();
    public type
    public constructor(x,y,type){
        super();
        this.x = x*this.width;
        this.y = y*this.height;
        this.type = type;
        console.log(this.x,this.y)
        this.addEventListener(egret.Event.ADDED_TO_STAGE,this.drawDoors,this);
    }
    private drawDoors(){
        this.addImage();
        this.addText();
    }
    private addImage(){
        var shape:egret.Shape = new egret.Shape;
        shape.graphics.beginFill(0x000000)
        shape.graphics.drawRect(this.x, this.y, this.width,this.height);
        shape.graphics.endFill();
        this.addChild(shape);
        console.log("增加")
        //this.addChild(shape);
    }
    private addText() {
        var text:egret.TextField = new egret.TextField();
        text.text = this.type;
        text.x = this.x +this.width/2 - text.textWidth/2;
        text.y = this.y + this.height/2 -text.textHeight/2;
        this.addChild(text);        
    }
}