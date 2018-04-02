/* 
**/
class Bingo extends egret.Sprite{
    public width:number = GameBody.childW;
    public height:number = GameBody.childH;
    private image:egret.Bitmap = new egret.Bitmap();
    public type
    public coord
    public colors = [0x1ca5fc,0x295c9d,0x990000,0x7f0000]
    private choosed
    private borderShape:egret.Shape
    public constructor(x,y,type,coord){
        super();
        this.x = x*(this.width);
        this.y = y*(this.height);
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
    }
    public moveToDirection(direction) {
        if( GameBody.lock )
            return;
        GameBody.lock = true
        let that = this;
        let fn = () => {
            that.removeChoosed();
            
        }
        switch(direction) {
            case 1:
                egret.Tween.get( this ).to( {x:this.x,y:this.y-this.height}, 600, egret.Ease.sineIn ).call(fn);
                break;
            case 2:
                egret.Tween.get( this ).to( {x:this.x+this.width,y:this.y}, 600, egret.Ease.sineIn ).call(fn);
                break;
            case 3:
                egret.Tween.get( this ).to( {x:this.x,y:this.y+this.height}, 600, egret.Ease.sineIn ).call(fn);
                break;
            default:
                egret.Tween.get( this ).to( {x:this.x-this.width,y:this.y}, 600, egret.Ease.sineIn ).call(fn);
                break;
        }
        GameBody.lock = false;
    }
    public moveToBottom(j) {
        /*** 本示例关键代码段开始 ***/
        let distance = j * (this.height)
        egret.Tween.get( this )
            .to( {x:this.x,y:distance}, 600, egret.Ease.sineIn );
    }
    public chooseBingo() {
        if( this.choosed ) {
            this.removeChoosed();
            return;
        }
        this.borderShape = new egret.Shape()
        this.borderShape.graphics.lineStyle(2, 0xffffff);
        this.borderShape.graphics.drawRect(0, 0, this.width,this.height);
        this.borderShape.graphics.endFill();
        this.addChild(this.borderShape);
        this.choosed = true;
    }
    public removeChoosed() {
        if( !this.choosed )
            return;
        this.removeChild(this.borderShape)
        this.choosed = false;
    }
}