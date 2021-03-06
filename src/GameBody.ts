/* 
**/
class GameBody extends egret.Sprite{
    public width:number;
    public height:number;
    public bingos = [];
    private row = 2;
    private col = 10;
    private clears = [];
    // 事件锁，需控制的事件完成后才能继续进行
    private lock:Boolean=true;
    private loack_2:Boolean = false;
    static childW:number = 90;
    static childH:number = 90;
    private padding = 50;
    private bingoType = 4;
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
        platform.hideAdvise()
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
        this.height = this.col*GameBody.childH + 180
        this.y = height/2 - this.height/2 - 40
        
        //this.y = 100;
        this.addEventListener(egret.Event.ADDED_TO_STAGE,this.drawDoors,this);
        this.touchEnabled = true;
        this.addEventListener(egret.TouchEvent.TOUCH_END, this.mouseDown, this);
        this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.mouseTap, this);
    }
    private lastX = null
    private lastY = null
    private mouseDown(ev) {
        let x =  Math.floor((ev.stageX-this.x)/GameBody.childW);
        let y = Math.floor((ev.stageY-this.y)/GameBody.childH);
        let diffX = ev.stageX - this.lastX
        let diffY = ev.stageY - this.lastY
        let lastBingo = this.getObjSet(this.stackArr[0])        
        if(this.lock||this.loack_2)
            return;
        x = lastBingo.x;
        y = lastBingo.y;
        if(Math.abs(diffX) - Math.abs(diffY) > 10) {
            if(diffX > 0) {
                x = lastBingo.x + 1
            } else if(diffX < 0) {
                x = lastBingo.x - 1
            }
        } else if( -Math.abs(diffX) + Math.abs(diffY) > 10){
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
                GameRules.clearCommonBingo(x,y, this);
                this.gameInf.propsArr[GameConfig.helper-1].setNum();
                break;
            // 清除九宫格 
            case 2:
                GameRules.clearHelper(x,y,this);
                this.gameInf.propsArr[GameConfig.helper-1].setNum();
                break;
            default:
                return true;
        }
        this.checkFun();
        GameConfig.helper = 0;
        return false
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
        if(!this.exitObj(this.bingos,coord_1.x,coord_1.y) || !this.exitObj(this.bingos,coord_2.x,coord_2.y)) {
            this.stackArr = []
            this.loack_2 = false
            return
        }
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
        this.addBack();
        this.drawBingo();
        this.gameInf.updataScroe();
        if(GameConfig.nowTax!=-1) {
            GameRules.addDark(this);
            GameRules.addType(this);
        }
    }
    private addBack() {
        /* 背景色设置 */
        var shape:egret.Shape = new egret.Shape;
        shape.graphics.beginFill(0x000000,0)
        shape.graphics.drawRect(-this.padding, -this.padding, this.width+this.padding*2,this.height);
        shape.graphics.endFill();
        this.addChild(shape);
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
        this.updataGame();    
    }
    private checkFun() {
        if(GameConfig.state!==1)
            return;
        this.checkBingos();
        console.log(this.clears)
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
                this.nowBingo = null
                this.saveNowBingo({x,y})
            })
        })
    }
    // 记录一下当前元素
    private nowBingo = null
    private nowBingoSet = {x:null, y:null}
    private saveNowBingo(coord) {
        let {
            x,y
        } = coord
        if(!this.exitObj(this.bingos,x,y)) {
            return
        }
        this.nowBingo = this.bingos[x][y]
        this.nowBingoSet = this.getObjSet(this.nowBingo)
        // 正确的坐标
        if(this.nowBingo.type >= 100) {
            return
        }
        // 检测下边
        this.check2Method({x: x+1, y},1)
        // 检测右边
        this.check2Method({x, y: y+1},2)
    }
    // 连成3个就消除
    private checkNum = 2
    /**
     * 检测函数
     * parm 元素坐标以及方向,通常是右边和下边
     */
    private check2Method(coord, direction) {
        const {
            x,y
        } = coord
        
        if(!this.exitObj(this.bingos, x, y)) {
            return
        }
        const obj = this.bingos[x][y]
        const type = obj.type
        // 大于 100 的元素不会被检测，并且type不相等就跳出递归
        if(type>=100 || type !== this.nowBingo.type) {
            return
        }
        // 如果是下边
        if(direction === 1) {
            if(x-this.nowBingoSet.x >= this.checkNum) {
                for(let i = 0;i<=x - this.nowBingoSet.x; i++) {
                    this.saveClears(`${this.nowBingoSet.x + i}, ${this.nowBingoSet.y}`)
                }
            }
            this.check2Method({x: x+1, y},1)
        // 如果是右边
        } else if( direction === 2 ) {
            if( y-this.nowBingoSet.y >= this.checkNum ) {
                for(let i = 0;i<=y - this.nowBingoSet.y; i++) {
                    this.saveClears(`${this.nowBingoSet.x},${this.nowBingoSet.y + i}`)
                }
            }
            this.check2Method({x, y: y+1},2)
        } else {}
    }
    /* 判断对象是否存在 */
    private exitObj(obj,x,y) {
        if(x<0 || y<0 || x>this.row || y>this.col || !obj[x] || !obj[x][y]  ){
            return false
        }
        return true;
    }
    /* 清除栈 */
    public saveClears(string) {
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
    // 已经奖励过了
    private hadBingo = false
    /* 檢查游戲是否真的結束包括时间、熵值、无解 */
    private checkGameOver() {
        /* 如果不在运行中，就结束游戏 */
        if(GameConfig.state !== 1) {
            return;
        }
        // 這邊簡單記錄一下bingos 没有解法了，就乱序
        if(!this.cloneBingos()){
            GameRules.sortBingos(this)
            setTimeout(()=>{
                this.checkFun();
            },this.speed)
            return;
        }
        if(GameConfig.nowTax!==-1 && this.gameInf.myScore>=GameConfig.taxConfig[GameConfig.nowTax].myScore) {
            if(this.hadBingo) {
                // 延迟通关
                setTimeout(() => {
                    this.parents.passTax(this.gameInf.myScore);
                    GameConfig.state = 2;    
                }, 1000)
            } else {
                this.lock = true
                GameRules.addBoard(this)
            }
        }
        
    }
    
    private cloneBingos() {
        let arr = [];
        let bingos = this.bingos
        for(let i = 0;i<bingos.length;i++) {
            let arr_1 = [];
            for(let j = 0;j<bingos[i].length;j++) {
                if(!this.judegeMatrix(i, j)) {
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