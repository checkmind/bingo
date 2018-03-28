/* 
**/
class GameBody extends egret.Sprite{
    public width:number;
    public height:number;
    private image:egret.Bitmap = new egret.Bitmap();
    private bingos = [];
    private row = 10;
    private col = 10;
    private clears = [];
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
        shape.graphics.drawRect(this.x, 0, this.width,this.height);
        shape.graphics.endFill();
        this.addChild(shape);
    }
    private drawBingo() {
        for(let i = 0;i<this.row;i++) {
            let arrs = [];
            for(let j = 0;j<this.col;j++) {
                let ran = this.ran(0,5)
                let bingo:Bingo = new Bingo(i,j,ran,{i, j});
                this.addChild(bingo);
                arrs.push(bingo);
            }
            this.bingos.push(arrs);
        }
        this.checkBingos();
        this.clearAll();
    }
    private ran(end:number, start:number) {
		return Math.floor(Math.random()*(end-start)+start)
    }
    /* 检测是否能消除 */
    private checkBingos() {
        let that = this;
        this.bingos.reverse().forEach((val, key)=>{
            let onoff = false
            val.forEach((val, key)=>{
                that.checkAround(val,false)
            })
        })
    }
    /* 检测周围有没有相同色号,第二个参数限定反向 1,2,3,4 t r b l */
    private checkAround(obj,direction) {
        let y = obj.coord.i;
        let x = obj.coord.j;
        let type = obj.type;
        if(!direction) {
            /* 检测四个方向 */
            if(this.exitObj(this.bingos,x,y-1) &&this.bingos[x][y-1].type===type) {
                console.log("上方有相同的")
                if(this.checkAround(this.bingos[x][y-1],1)){
                    this.saveClears(obj)
                    this.saveClears(this.bingos[x][y-2])
                    this.saveClears(this.bingos[x][y-1])
                }
            }
            return;
        }
        switch(direction) {
            case 1:
                if(this.exitObj(this.bingos,x,y-1) && obj.type===this.bingos[x][y-1].type)
                    return true;
            case 2:
                if(this.exitObj(this.bingos,x+1,y) && obj.type===this.bingos[x+1][y].type)
                    return true;
            case 3:
                if(this.exitObj(this.bingos,x,y+1) && obj.type===this.bingos[x][y+1].type)
                    return true;
            default:
                if(this.exitObj(this.bingos,x-1,y) && obj.type===this.bingos[x-1][y].type)
                    return true;
        }
        return false;
    }

    private exitObj(obj,x,y) {
        if(x<0 || y<0 || x>this.row || y>this.row || !obj[x] || !obj[x][y]  ){
            return false
        }
        return true;
    }

    private saveClears(obj) {
        let arr = [];
        for(let i = 0;i<this.clears.length;i++) {
            if(this.clears[i] === obj)
               return;
        }
        this.clears.push(obj);
        console.log(this.clears)
    }

    private clearAll() {
       
            this.clears.map(function(val,index){
                 setTimeout(()=>{
                    val&&val.killSelf&&val.killSelf();
                },500*index)
                
            })
        
    }
}