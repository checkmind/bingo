/* 
**/
class GameBody extends egret.Sprite{
    public width:number;
    public height:number;
    private image:egret.Bitmap = new egret.Bitmap();
    private bingos = [];
    private row = 2;
    private col = 10;
    private clears = [];
    // 事件锁，需控制的事件完成后才能继续进行
    private lock:Boolean=true;
    private loack_2:Boolean = false;
    private clickLock:Boolean = false;
    static childW:number = 90;
    static childH:number = 90;
    private padding = 50;
    private bingoType = 4;
    // 分数
    
    private myScoreLabel;
    // 游戏是否结束
    private game = true;
    private a;
    // 交换栈
    private stackArr = [];
    // 产生新的bingos
    private newBingos = [];
    // 游戏信息
    private gameInf
    private parents;
    //消除速度
    public speed;
    public constructor(width,height,gameInf,parents){
        super();
        this.width = width;
        this.parents = parents;
        if(GameConfig.nowTax!==-1){
            GameBody.childH = GameBody.childW =  (this.width - this.padding) / GameConfig.taxConfig[GameConfig.nowTax].row;
            this.row = GameConfig.taxConfig[GameConfig.nowTax].row;
            this.col = GameConfig.taxConfig[GameConfig.nowTax].col;
            this.bingoType = GameConfig.taxConfig[GameConfig.nowTax].bingoType;    
            this.speed = 300;
        } else {
            GameBody.childH = GameBody.childW =  (this.width - this.padding) / GameConfig.infiniteRow;
            this.row = GameConfig.infiniteRow
            this.col = GameConfig.infiniteCol
            this.bingoType = GameConfig.infiniteBingoType
            this.speed = GameConfig.infiniteColV;
        }
        this.gameInf = gameInf;
        //this.x = (this.width - this.row*GameBody.childH) / 2
        this.x = this.padding/2;
        this.height = this.col*GameBody.childH
        this.y = 200;
        
        //this.y = 100;
        this.addEventListener(egret.Event.ADDED_TO_STAGE,this.drawDoors,this);
        this.touchEnabled = true;
        this.addEventListener(egret.TouchEvent.TOUCH_END, this.mouseDown, this);
        this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.mouseTap, this);
    }
    private initWinnerConfig() {
        let type = GameConfig.taxConfig[GameConfig.nowTax].checkType
    }
    private lastX = null
    private lastY = null
    private mouseDown(ev) {
        let x =  Math.floor((ev.stageX-this.x)/GameBody.childW);
        let y = Math.floor((ev.stageY-this.y)/GameBody.childH);
        let diffX = ev.stageX - this.lastX
        let diffY = ev.stageY - this.lastY
        console.log(diffX, diffY)
        let lastBingo = this.getObjSet(this.stackArr[0])        
        if(this.lock||this.loack_2)
            return;
        if(Math.abs(diffX) > Math.abs(diffY)) {
            if(diffX > 0) {
                x = lastBingo.x + 1
            } else if(diffX < 0) {
                x = lastBingo.x - 1
            }
        } else if(Math.abs(diffX) < Math.abs(diffY)){
            if(diffY > 0) {
                y = lastBingo.y + 1
            } else if(diffY < 0){
                y = lastBingo.y - 1
            }
        }
        if(this.exitObj(this.bingos,x,y)){
           // 栈里面已经有bingo了
           if(this.stackArr[0] && this.stackArr[0]!==this.bingos[x][y]) {
                if(this.checkChange(this.stackArr[0],this.bingos[x][y])) {
                    this.stackArr[0].chooseBingo();
                    this.bingos[x][y].chooseBingo();
                    this.stackArr.length = 0;
                }
           }
        }
    }
    /* 事件捕捉 */
    private mouseTap(ev) {
        let x =  Math.floor((ev.stageX-this.x)/GameBody.childW);
        let y = Math.floor((ev.stageY-this.y)/GameBody.childH);
        this.lastX = ev.stageX
        this.lastY = ev.stageY
        if(this.lock||this.loack_2)
            return;
        if(this.exitObj(this.bingos,x,y)){
           if(GameConfig.helper!==0) {
               this.useHlper(x,y);
               return;
           }
           this.bingos[x][y].chooseBingo();
           // 栈里面已经有bingo了
           if(this.stackArr[0] && this.stackArr[0]!==this.bingos[x][y]) {
               if(this.checkChange(this.stackArr[0],this.bingos[x][y])) {
                   this.stackArr[0].chooseBingo();
                   this.bingos[x][y].chooseBingo();
                   this.stackArr.length = 0;
               } else {
                   this.stackArr[0].removeChoosed();
                   this.stackArr.length = 0;
                   this.stackArr.push(this.bingos[x][y])
               }
           } else if(this.stackArr[0] && this.stackArr[0]===this.bingos[x][y]) {
               this.stackArr.length = 0;
           } else {
               this.stackArr.push(this.bingos[x][y])
           }
        }
    }
    private useHlper(x,y) {
        if(GameConfig.helperArr[GameConfig.helper-1]===0) {
            GameConfig.helper = 0;
            return;
        } 
        
        if(GameConfig.helperArr[GameConfig.helper-1]>=1) {
            GameConfig.setHelpArr(-1,GameConfig.helper-1);
        }
            
        switch(GameConfig.helper){
            // 清除相同的所有类别
            case 1:
                this.clearCommonBingo(x,y);
                this.gameInf.propsArr[GameConfig.helper-1].setNum();
                break;
            // 清除九宫格 
            case 2:
                this.clearHelper(x,y);
                this.gameInf.propsArr[GameConfig.helper-1].setNum();
                break;
            default:
                return true;
        }
        this.checkFun();
        GameConfig.helper = 0;
        return false
    }
    // 道具1
    private clearHelper(x,y) {
        this.saveClears(x+`,`+y)
        this.bingos.map((val,j)=>{
            return val.map((val2,i)=>{
                if(Math.abs(x-j)===1&&Math.abs(y-i)<=1){
                    this.saveClears(j+`,`+i)
                }
                if(Math.abs(y-i)===1&&Math.abs(x-j)<=1){
                    this.saveClears(j+`,`+i)
                }
                return val2;
            })
        })
    }
    // 道具2
    private clearCommonBingo(x,y) {
        this.saveClears(x+`,`+y)
        let type = this.bingos[x][y].type
        this.bingos.map((val,j)=>{
            return val.map((val2,i)=>{
                if(this.bingos[j][i] && this.bingos[j][i].type=== type){
                    this.saveClears(j+`,`+i)
                }
                return val2;
            })
        })
    }
    // 判断是否可以交换
    private checkChange(object_1,object_2) {
        let coord_1 = this.getObjSet(object_1);
        let coord_2 = this.getObjSet(object_2);
        let x = Math.abs(coord_1.x - coord_2.x) 
        let y = Math.abs(coord_1.y - coord_2.y)         
        // 两个在同一横线上
        if( x ===1 && y === 0 ) {
            // 一在二的右边
            if(coord_1.x - coord_2.x > 0) {
                this.changeObj(object_1,object_2,4,2)
                return true;
            // 一在二的左边
            } else {

                this.changeObj(object_1,object_2,2,4)
                return true;
            }
        }
        // 两个在同一竖线上
        if( y===1 && x ===0 ) {
            // 一在二的下边
            if(coord_1.y - coord_2.y > 0) {
                this.changeObj(object_1,object_2,1,3)
                return true;
            // 一在二的上边
            } else {
                this.changeObj(object_1,object_2,3,1)
                return true;
            }
        }
        return false;
    }
    // 交换两个对象 direction是方向 1 2 3 4对应上右下左 onoff 是否做监测
    private changeObj(object_1,object_2,dir_1,dir_2,onoff?) {
        this.loack_2 = true;
        let coord_1 = this.getObjSet(object_1);
        let coord_2 = this.getObjSet(object_2);
        let obj = this.bingos[coord_1.x][coord_1.y];
        this.bingos[coord_1.x][coord_1.y] = this.bingos[coord_2.x][coord_2.y] 
        this.bingos[coord_2.x][coord_2.y] = obj;
        let p1 = object_1.moveToDirection(dir_1)
        let p2 = object_2.moveToDirection(dir_2)
        
        Promise.all([p1,p2]).then(()=>{
            if(!onoff && !this.checkFun() && !GameConfig.canChange) {
                this.changeObj(object_2,object_1,dir_1,dir_2,true)  
                return;
            }
            this.loack_2 = false;
            this.gameInf.updataStep();
        })
    }
   
    private drawDoors(){
        //this.addBack();
        this.drawBingo();
        this.gameInf.updataScroe();
       // this.gameInf.updataStep();
        this.addMask();
        if(GameConfig.nowTax!=-1) {
            this.addDark();
            this.addType();
        }
    }
    
    private addBack() {
        /* 背景色设置 */
        var shape:egret.Shape = new egret.Shape;
        shape.graphics.beginFill(0x000000,.7)
        shape.graphics.lineStyle(1,0x000000) 
        shape.graphics.drawRect(0, 0, this.width-this.padding,this.col*GameBody.childH);
        shape.graphics.endFill();
        this.addChild(shape);
    }
    private addMask() {
        //画一个遮罩正方形
        var circle:egret.Shape = new egret.Shape();
        circle.graphics.beginFill(0x0000ff);
        circle.graphics.drawRect(this.x,this.y,this.width-this.padding,this.col*GameBody.childH);
        circle.graphics.endFill();
        this.$parent.addChild(circle);
        this.mask = circle;
    }
    // 星球变暗色 每隔三秒遍历一次
    private addDark() {
        if(!GameConfig.taxConfig[GameConfig.nowTax]["darkTime"]) {
            return;
        }
        let timer = setInterval(()=>{
            if(GameConfig.state == 2 || GameConfig.state ==0) {
                clearInterval(timer);
            }
            this.bingos.forEach((val)=>{
                val.forEach((val2)=>{
                    val2 && val2.beDark();
                })
            })
        },5000)
    }
    // 星球变成其他类型
    private addType() {
        if(!GameConfig.taxConfig[GameConfig.nowTax]["changeTime"]) {
            return;
        }
        let timer = setInterval(()=>{
            if(GameConfig.state == 2 || GameConfig.state ==0) {
                clearInterval(timer);
            }
            if(this.lock||this.loack_2)
                return;
            this.bingos.forEach((val)=>{
                val.forEach((val2)=>{
                    if(Math.floor(Math.random()*10)===2) {
                        val2 && val2.beType(this.ran());
                        setTimeout(()=>{
                            this.checkFun();
                        },this.speed+1)
                    } 
                })
            })
            this.checkFun();
        },5000)
    }
    public matrixes = [];
    private drawBingo() {
        for(let i = 0;i<this.row;i++) {
            let arrs = [];
            for(let j = 0;j<this.col;j++) {
                arrs.push(null);
                if(!this.judegeMatrix(i,j)) {
                    let wall = new Wall(i,j,0,this)
                    this.matrixes.push(wall)
                    this.addChildAt(wall,9)
                }
            }
            this.bingos.push(arrs);
        }
        //this.checkFun();
        this.updataGame();    
    }
    private addBingo() {
        if( this.bingos[0] )
        for(let k=0;k<this.bingos[0].length;k++) {
            if(this.bingos[0][k]){
                this.game = false;
               // return false;
            }
        }
        for(let i = 0;i<this.row;i++) {
                let ran = this.ran()
                let bingo:Bingo = new Bingo(i,-1,ran,this);
                this.addChildAt(bingo,0);
                this.newBingos.push(bingo);            
        }
        this.moveToBottom();
    }
    private moveToBottom() {
        // 移动到的坐标
        let x,y;
        this.newBingos.map((val,index)=> {
            x = index;
            let bottomCoord = this.getMyBottom(x,0)
            if(bottomCoord){
                y = bottomCoord.j;
            } else {
                y = this.col;
            }
            if(y>=1)
                val.moveToBottom(y-1);
            this.bingos[x][y-1] = val;
        })
        this.newBingos.length = 0;
        this.checkFun();
    }
    private lockCheck = false;
    private checkFun() {
        if(GameConfig.state!==1)
            return;
        this.checkBingos();
        if(this.clears.length ===0){
            this.lock = false;
            this.checkGameOver();
            return false;
        }
        this.lock = true;
        
        this.clearAll(()=>{
            this.updataGame();
        });
        return true;
    }
    private ran() {
        let end = 0;
        let start = this.bingoType;
		return Math.floor(Math.random()*(end-start)+start)
    }
    /* 检测是否能消除 */
    private checkBingos() {
        let that = this;
        this.bingos.forEach((val, x)=>{
            let onoff = false
            val.forEach((vals, y)=>{
                that.checkAround({x,y},false)
            })
        })
    }
    /* 检测周围有没有相同色号,第二个参数限定反向 1,2,3,4 t r b l */
    private checkAround(coord,direction) {
        let {
            x,y
        } = coord
        let obj = this.bingos[x][y]
        if(!obj)
            return
        let type = obj.type;
        if(type>=100)
            return;
        if(!direction) {
            /* 检测四个方向 */
            if(this.exitObj(this.bingos,x,y-1) &&this.bingos[x][y-1].type===type) {
                if(this.checkAround({x,y:y-1},1)){
                    this.saveClears(x+`,`+y)
                    this.saveClears(x+`,`+(y-1))
                }
            }
            if(this.exitObj(this.bingos,x+1,y) &&this.bingos[x+1][y].type===type) {
                if(this.checkAround({x:x+1,y},2)){
                    this.saveClears(x+`,`+y)
                    this.saveClears((x+1)+`,`+y)
                }
            }
            if(this.exitObj(this.bingos,x,y+1) &&this.bingos[x][y+1].type===type) {
                if(this.checkAround({x,y:y+1},3)){
                    this.saveClears(x+`,`+y)
                    this.saveClears(x+`,`+(y+1))
                }
            }
            if(this.exitObj(this.bingos,x-1,y) &&this.bingos[x-1][y].type===type) {
                if(this.checkAround({x:x-1,y},4)){
                    this.saveClears(x+`,`+y)
                    this.saveClears((x-1)+`,`+y)
                }
            }
            return;
        }
        switch(direction) {
            case 1:
                if(this.exitObj(this.bingos,x,y-1) && type===this.bingos[x][y-1].type){
                    this.saveClears(x+`,`+(y-1))
                    return true;
                }
                break;
            case 2:
                if(this.exitObj(this.bingos,x+1,y) && type===this.bingos[x+1][y].type){
                    this.saveClears((x+1)+`,`+y)
                    return true;
                }
                break;
            case 3:
                if(this.exitObj(this.bingos,x,y+1) && type===this.bingos[x][y+1].type){
                    this.saveClears(x+`,`+(y+1))
                    return true;
                }
                break;
            case 4:
                if(this.exitObj(this.bingos,x-1,y) && type===this.bingos[x-1][y].type){
                    this.saveClears((x-1)+`,`+y)
                    return true;
                }
                break;
            default:
                return false;
         }
    }
    /* 判断对象是否存在 */
    private exitObj(obj,x,y) {
        if(x<0 || y<0 || x>this.row || y>this.col || !obj[x] || !obj[x][y]  ){
            return false
        }
        return true;
    }
    /* 清除栈 */
    private saveClears(string) {
        for(let i = 0;i<this.clears.length;i++) {
            if(this.clears[i] === string)
               return;
        }
        this.clears.push(string);
    }
    /* 清除函数 */
     private clearAll(fn) {
        let pros = [];
        if(this.clears.length!==0) {
            platform.playClearMusic();
        }
        this.clears.map((val)=>{
            let i = +val.split(",")[0]
            let j = +val.split(",")[1]
            if(this.bingos[i] && this.bingos[i][j]) {
                pros.push(this.bingos[i][j].killSelf());
                this.gameInf.myScore += 50;
                delete this.bingos[i][j];
            }  
        })
        // 如果当前消除的个数大于7，则有几率触发道具生成
        if(this.clears.length>=7 && GameConfig.nowTax===-1) {
            this.gameInf.productHelper();
        }
        this.clears.length = 0;        
        return Promise.all(pros).then(()=>{
            fn();
            this.gameInf.updataScroe();
        })
    }
    private judegeMatrix(i, j) {
        let satus = true
        if(GameConfig.nowTax === -1) {
            return true
        }
        GameConfig.taxConfig[GameConfig.nowTax].matrix.map((val)=>{
            if(val.x === i && val.y === j) {
                satus = false
            }
        })
        return satus
    }
    /* 更新函数 */
    private updataGame() {
        // 游戏结束
        if(GameConfig.state == 2 || GameConfig.state ==0) {
                return
        }
        for(let i = 0;i<this.bingos.length;i++) {
			let now = this.bingos[i]
            let num = undefined; //这个参数记录当前j，辅助计算createNewBingos的下降距离
            for(let j = this.col-1;j>=0;j--) {
				// 当前没有方块，去上级拿
				if( !now[j] && this.judegeMatrix(i,j)) {
                    let topBingo = this.getMyTop(i,j-1) 
					if(topBingo){
                        topBingo.moveToBottom(j);
                        this.deleteBingos(topBingo)
                        this.bingos[i][j]  = topBingo;
					}
					else{  
                        if(isNaN(num)) {
                            num = j;
                            this.createNewBingos(i,j,1);
                        // 如果num是数字，说明前面有num下来.
                        } else {
                            // 这列第一个需要重新产生的
                            if(num===j)
                                this.createNewBingos(i,j,1);
                            else {
                                this.createNewBingos(i,j,num-j+1);
                            }
                        }
                        
                        continue;            
                    }
                // 当前有方块，记录下坐标
				} else {
                    
                }
			}
            num = undefined;
		}
        setTimeout(()=>{
            this.checkFun();
        },this.speed)
    }

    /* 檢查游戲是否真的結束包括时间、熵值、无解 */
    private checkGameOver() {
        /* 如果不在运行中，就结束游戏 */
        if(GameConfig.state !== 1) {
            return;
        }
        console.log('判断有没有解法')
        // 這邊簡單記錄一下bingos 没有解法了，就乱序
        if(!this.cloneBingos()){
            this.sortBingos()
            setTimeout(()=>{
                this.checkFun();
            },this.speed)
            return;
        }
        if(GameConfig.nowTax!==-1 && this.gameInf.myScore>=GameConfig.taxConfig[GameConfig.nowTax].myScore) {
            this.parents.passTax(this.gameInf.myScore);
            GameConfig.state = 2;
            return;
        }
        
    }
    private sortBingos() {
        let arr = [],set = []
        this.bingos.forEach((val,x)=>{
            val.forEach((val2,y)=>{
                if(val2) {
                    arr.push( val2 )
                    set.push({
                        x: x,
                        y: y
                    })
                }
            })
        });
        arr.sort(()=>{
            return Math.random()>.5 ? -1 : 1;
        })
        let i = 0
        this.bingos.forEach((val,x)=>{
            val.forEach((val2,y)=>{
                if(arr[i] && this.judegeMatrix(x,y)) {
                    this.bingos[x][y] = arr[i]
                    this.bingos[x][y].moveToSet(set[i].x,set[i].y)
                    i++ 
                }   
            })
        });
    }
    private cloneBingos() {
        let arr = [];
        let bingos = this.bingos
        for(let i = 0;i<bingos.length;i++) {
            let arr_1 = [];
            for(let j = 0;j<bingos[i].length;j++) {
                if(!this.judegeMatrix(i, j)) {
                    console.log('这个元素不用去检测')
                    console.log(i,j)
                    console.log(bingos[i][j])
                    console.log(bingos)
                    break;
                }
                if(this.checkLineExis(i,j))
                    return true;
            }
            arr.push(arr_1);
        }
        return false;
    }

    // 检查一行内三个对象是否存在 direction 对应0 1 2 3 上右下左
    private checkLineExis(i,j) {
        // 以下是根目录的地图编辑器生成
        let AllCoord = [
            // 向下交换后检测数组
            [{i:i-2,j:j+1},{i:i-1,j:j+1},{i:i,j:j},{i:i+1,j:j+1},{i:i+2,j:j+1}],
            [{i:i-2,j:j},{i:i-1,j:j},{i:i,j:j+1},{i:i+1,j:j},{i:i+2,j:j}],
            [{i:i,j:j-2},{i:i,j:j-1},{i:i,j:j+1}],
            [{i:i,j:j},{i:i,j:j+2},{i:i,j:j+3}],
            // 向右交换
            [{i:i,j:j-2},{i:i,j:j-1},{i:i+1,j:j},{i:i,j:j+1},{i:i,j:j+2}],
            [{i:i+1,j:j-2},{i:i+1,j:j-1},{i:i,j:j},{i:i+1,j:j+1},{i:i+1,j:j+2}],
            [{i:i-2,j:j},{i:i-1,j:j},{i:i+1,j:j}],
            [{i:i,j:j},{i:i+2,j:j},{i:i+3,j:j}]

        ]
        
        let checkType = arr=>{
            let now,
                add = 1,
                can = false;
            arr.map((val,index)=>{
                let {i,j} = val;
                
                let exitObj = this.exitObj(this.bingos,i,j);
                if(index!==0) {
                    // now属于不能被消除的100
                    if(exitObj && now<100 && now===this.bingos[i][j].type)
                        add++;
                    else
                        add = 1;
                }
                now = exitObj ? this.bingos[i][j].type:null;
                if(add>=3)
                    can = true;
            })
            return can;
        }
        for(let num = 0; num < 4; num++) {
            let judege = this.judegeMatrix(i+1,j);
            // 要交换的元素不存在
            if(judege){
                if(checkType(AllCoord[num]))
                    return true
            }
        }
        for(let num = 4; num < AllCoord.length; num++) {
            let judege = this.judegeMatrix(i,j+1);
            // 要交换的元素不存在
            if(judege){
                if(checkType(AllCoord[num]))
                    return true
            }
        }
        return false;
    }
    /************* 检查游戏函数ending************* */
    /*
     这列已经为空了，直接创建新的bingos。然后移动到对应位置
    **/
    private maxUncommon = 0;
    private createNewBingos(i:number,j:number,set:number) {
        let arr = [];
        let ran = this.ran()
        // config类型
        let config = GameConfig.taxConfig[GameConfig.nowTax]
        if(GameConfig.nowTax!==-1 && config.checkType=== 'uncommon'&&ran===3) {
            if(this.maxUncommon<config['uncommon']) {
                ran = 100;
                this.maxUncommon++;
            }
        }
        // 注释
        let bingo:Bingo = new Bingo(i,-set,ran,this);
        this.addChildAt(bingo,0);
        bingo.moveToBottom(j);
        this.bingos[i][j] = bingo;
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
    /* 得到下级方块 */
    private getMyBottom(i,j) {
        if(this.bingos[i][j]) {
            return {i,j}  
        }
        if(j>this.col)
            return false
        return this.getMyBottom(i,j+1)
    }
    /* 删除bingos里面的对象 */
    private deleteBingos(obj) {
        this.bingos.map((val, index)=>{
            val.map((val2, index2)=>{
                if(val2 === obj){
                    delete this.bingos[index][index2]
                 }
            })
        })
    }

     // 得到对象当前在二维数组的位置
    private getObjSet(obj) {
        let x,y;
        this.bingos.map((val, index)=>{
            val.map((val2, index2)=>{
                if(val2 === obj){
                    x = index;
                    y = index2;
                 }
            })
        })
        return {
            x,y
        }
    }
}