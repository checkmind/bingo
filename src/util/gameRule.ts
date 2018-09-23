/* 
    这里放一些关卡特定效果, 这里所有的方法都是注入到GameBody里面的
**/
class GameRules{
    // 道具2方法
    static clearHelper(x:number, y:number, self) {
        self.saveClears(x+`,`+y)
        self.bingos.map((val,j)=>{
            return val.map((val2,i)=>{
                if(Math.abs(x-j)===1&&Math.abs(y-i)<=1){
                    self.saveClears(j+`,`+i)
                }
                if(Math.abs(y-i)===1&&Math.abs(x-j)<=1){
                    self.saveClears(j+`,`+i)
                }
                return val2;
            })
        })
    }
    // 道具1 方法
    static clearCommonBingo(x:number, y:number, self) {
        self.saveClears(x+`,`+y)
        let type = self.bingos[x][y].type
        self.bingos.map((val,j)=>{
            return val.map((val2,i)=>{
                if(self.bingos[j][i] && self.bingos[j][i].type=== type){
                    self.saveClears(j+`,`+i)
                }
                return val2;
            })
        })
    }
    // 星球变暗色 每隔三秒遍历一次
    static addDark(self) {
        if(!GameConfig.taxConfig[GameConfig.nowTax]["darkTime"]) {
            return;
        }
        let timer = setInterval(()=>{
            if(GameConfig.state == 2 || GameConfig.state ==0) {
                clearInterval(timer);
            }
            self.bingos.forEach((val)=>{
                val.forEach((val2)=>{
                    val2 && val2.beDark();
                })
            })
        },5000)
    }
    // 星球变成其他类型
    static addType(self) {
        if(!GameConfig.taxConfig[GameConfig.nowTax]["changeTime"]) {
            return;
        }
        let timer = setInterval(()=>{
            if(GameConfig.state == 2 || GameConfig.state ==0) {
                clearInterval(timer);
            }
            if(self.lock||self.loack_2)
                return;
            self.bingos.forEach((val)=>{
                val.forEach((val2)=>{
                    if(Math.floor(Math.random()*10)===2) {
                        val2 && val2.beType(self.ran());
                        setTimeout(()=>{
                            self.checkFun();
                        },self.speed+1)
                    } 
                })
            })
            self.checkFun();
        },5000)
    }
    // 没有解法乱序
    static sortBingos(self) {
        let arr = [],set = []
        self.bingos.forEach((val,x)=>{
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
        self.bingos.forEach((val,x)=>{
            val.forEach((val2,y)=>{
                if(arr[i] && self.judegeMatrix(x,y)) {
                    self.bingos[x][y] = arr[i]
                    self.bingos[x][y].moveToSet(set[i].x,set[i].y)
                    i++ 
                }   
            })
        });
    }
    // 发射导弹
    static shootBingos(self) {
        let set = []
        self.bingos.forEach((val,x)=>{
            val.forEach((val2,y)=>{
                const exit = self.exitObj(self.bingos,x,y);
                if(exit && val2.canClear()) {
                    set.push({
                        x: x,
                        y: y
                    })
                }
            })
        });
        setTimeout(()=>{
            self.checkFun();  
        },3000)
        set.map((val, index) => {
            let arr = [{x: 0,y: 1},{x: 1,y: 0},{x: 0,y: 0},{x: 1,y: 1},]
            let obj = self.bingos[val.x][val.y]
            self.saveClears(val.x+`,`+val.y)
            self.parents.shootRock({
                x: obj.x + self.x + GameBody.childW/2,
                y: obj.y + self.y + GameBody.childH/2,
            })
        })
    }
    // 显示出飞船
    static async addBoard(self) {
        const sky = await GameConfig.createBitmapByName("borad.png");
        sky.width = sky.height = 300;
        self.addChild(sky);
        sky.x = -400
        sky.y = self.height - 320
        const fn1 = () => {
            egret.Tween.get( sky ).to( { x:-400 }, 500, egret.Ease.sineIn ).call(()=>{
                GameRules.shootBingos(self)
                self.hadBingo = true
                self.removeChild(sky)
            });  
        }
        egret.Tween.get( sky ).to( { x:0 }, 2000, egret.Ease.sineIn ).call(()=>{
            setTimeout(fn1, 1000)
        });
    }
    public constructor(){
        
    }
}