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
    }
    private ran(end:number, start:number) {
		return Math.floor(Math.random()*(end-start)+start)
    }
    /* 检测是否能消除 */
    private checkBingos() {
        let that = this;
        this.bingos.forEach((val, key)=>{
            let onoff = false
            val.forEach((vals, key)=>{
                that.checkAround(vals,false)
            })
        })
        this.clearAll();
        this.updataGame();
    }
    /* 检测周围有没有相同色号,第二个参数限定反向 1,2,3,4 t r b l */
    private checkAround(obj,direction) {
        let x = obj.coord.i;
        let y = obj.coord.j;
        let type = obj.type;
        
        if(!direction) {
            /* 检测四个方向 */
            if(this.exitObj(this.bingos,x,y-1) &&this.bingos[x][y-1].type===type) {
                if(this.checkAround(this.bingos[x][y-1],1)){
                    this.saveClears(obj)
                    this.saveClears(this.bingos[x][y-1])
                }
            }
            if(this.exitObj(this.bingos,x+1,y) &&this.bingos[x+1][y].type===type) {
                if(this.checkAround(this.bingos[x+1][y],2)){
                    this.saveClears(obj)
                    this.saveClears(this.bingos[x+1][y])
                }
            }
            if(this.exitObj(this.bingos,x,y+1) &&this.bingos[x][y+1].type===type) {
                if(this.checkAround(this.bingos[x][y+1],3)){
                    this.saveClears(obj)
                    this.saveClears(this.bingos[x][y+1])
                }
            }
            if(this.exitObj(this.bingos,x-1,y) &&this.bingos[x-1][y].type===type) {
                if(this.checkAround(this.bingos[x-1][y],4)){
                    this.saveClears(obj)
                    this.saveClears(this.bingos[x-1][y])
                }
            }
            return;
        }
        switch(direction) {
            case 1:
                if(this.exitObj(this.bingos,x,y-1) && type===this.bingos[x][y-1].type){
                    this.saveClears(this.bingos[x][y-1])
                    return true;
                }
                break;
            case 2:
                if(this.exitObj(this.bingos,x+1,y) && type===this.bingos[x+1][y].type){
                    this.saveClears(this.bingos[x+1][y])
                    return true;
                }
                break;
            case 3:
                if(this.exitObj(this.bingos,x,y+1) && type===this.bingos[x][y+1].type){
                    this.saveClears(this.bingos[x][y+1])
                    return true;
                }
                break;
            case 4:
                if(this.exitObj(this.bingos,x-1,y) && type===this.bingos[x-1][y].type){
                    this.saveClears(this.bingos[x-1][y])
                    return true;
                }
                break;
            default:
                return false;
         }
    }
    /* 判断对象是否存在 */
    private exitObj(obj,x,y) {
        if(x<0 || y<0 || x>this.row || y>this.row || !obj[x] || !obj[x][y]  ){
            return false
        }
        return true;
    }
    /* 清除栈 */
    private saveClears(obj) {
        let arr = [];
        for(let i = 0;i<this.clears.length;i++) {
            if(this.clears[i] === obj)
               return;
        }
        this.clears.push(obj);
    }
    /* 清除函数 */
    private clearAll() {
        this.clears.map((val)=>{
            let {
                i,j
            } = val.coord;
            if(this.bingos[i] && this.bingos[i][j]) {
                delete this.bingos[i][j];
            }  
            val&&val.killSelf&&val.killSelf();
        })
        this.clears.length = 0;
    }
    /* 更新函数 */
    private updataGame() {
        for(let i = 0;i<this.bingos.length;i++) {
			let now = this.bingos[i]
            for(let j = this.col-1;j>0;j--) {
				// 当前没有方块，去上级拿
				if( !now[j] ) {
                    let topBingo = this.getMyTop(i,j-1) 
					if(topBingo){
                        topBingo.moveToBottom(j);
                        now[j] = topBingo;
                        delete this.bingos[topBingo.coord.i][topBingo.coord.j];
					}
					else{
                        // let ran = this.ran(0,5)
                        // let bingo:Bingo = new Bingo(i-1,j,ran,{i, j});
                        // this.addChild(bingo);
						// now[j] = bingo                       
                    }
				}
			}
		}

    }
    /* 得到上级方块 */
    private getMyTop(i,j) {

        if(this.bingos[i][j]) {
            return this.bingos[i][j]  
        }
        if(j<0)
            return false
        return this.getMyTop(i,j-1)
    }
}