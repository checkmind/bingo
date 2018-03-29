/* 
**/
class Bingo extends egret.Sprite{
    public width:number = 48;
    public height:number = 48;
    private image:egret.Bitmap = new egret.Bitmap();
    public type
    public coord
    public colors = [0x1ca5fc,0x295c9d,0x990000,0x7f0000]
    public constructor(x,y,type,coord){
        super();
        this.x = x*(this.width+10);
        this.y = y*(this.height+10);
        this.coord = coord
        this.type = type;
        this.addEventListener(egret.Event.ADDED_TO_STAGE,this.drawDoors,this);
    }
    private drawDoors(){
        this.addImage();
        this.addText();
    }
    private addImage(){
        var shape:egret.Shape = new egret.Shape();
        shape.graphics.beginFill(this.colors[this.type])
        shape.graphics.drawRect(0, 0, this.width,this.height);
        shape.graphics.endFill();
        this.addChild(shape);
    }
    private addText() {
        var text:egret.TextField = new egret.TextField();
        // text.text = this.type;
        text.text = this.coord.i+''+this.coord.j;
        text.x = this.width/2 - text.textWidth/2;
        text.y = this.height/2 -text.textHeight/2;
        this.addChild(text);        
    }
    public killSelf() {
        this.$parent.removeChild(this);

        var shape:egret.Shape = new egret.Shape()
        shape.graphics.lineStyle(2, 0xffffff);
        shape.graphics.drawRect(0, 0, this.width,this.height);
        shape.graphics.endFill();
        this.addChild(shape);
    }
}