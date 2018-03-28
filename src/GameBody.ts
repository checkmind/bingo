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
        this.y = 50;
        this.width = width;
        this.height = height;
        this.addEventListener(egret.Event.ADDED_TO_STAGE,this.drawDoors,this);
    }
    private drawDoors(){
        this.addImage();
        this.drawBingo();
        this.$parent.stage.$stageWidth
    }
    private addImage(){
        var shape:egret.Shape = new egret.Shape;
        shape.graphics.beginFill(0xf2f2f2,.5)
        shape.graphics.lineStyle(1,0xf2f2f2)
        shape.graphics.drawRect(this.x, this.y, this.width,this.height);
        shape.graphics.endFill();
        this.addChild(shape);
    }
    private drawBingo() {
        for(let i = 0;i<10;i++) {
            for(let j = 0;j<10;j++) {
                let ran = this.ran(1,5)
                let bingo:Bingo = new Bingo(i,j,ran);
                this.addChild(bingo);
                this.bingos.push(bingo)
            }
        }
    }
    private ran(end:number, start:number) {
		return Math.floor(Math.random()*(end-start+1)+start)
    }
}