/* 
**/
class GameBody extends egret.Sprite{
    public width:number;
    public height:number;
    private image:egret.Bitmap = new egret.Bitmap();
    private bingos = [];
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
        this.drawBingo();
        this.$parent.stage.$stageWidth
    }
    private addImage(){
        var shape:egret.Shape = new egret.Shape;
        shape.graphics.beginFill(0x0000,.5)
        shape.graphics.lineStyle(1,0x333333)
        shape.graphics.drawRect(this.x, this.y, this.width,this.height-100);
        shape.graphics.endFill();
        this.addChild(shape);
    }
    private drawBingo() {
        for(let i = 0;i<10;i++) {
            for(let j = 0;j<10;j++) {
                let ran = this.ran(1,5)
                let bingo:Bingo = new Bingo(40*i,40*j,ran);
                this.addChild(bingo);
                this.bingos.push(bingo)
            }
        }
    }
    private ran(end:number, start:number) {
		return Math.floor(Math.random()*(end-start+1)+start)
    }
}