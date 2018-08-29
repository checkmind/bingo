class Rock extends egret.Sprite{
    private parents
    public constructor(x,y,type,parent){
        super();
        this.x = x*(this.width);
        this.y = y*(this.height);
        this.parents = parent
        this.addEventListener(egret.Event.ADDED_TO_STAGE,this.drawDoors,this);
    }
    private drawDoors() {
      
    }
    public get factor():number {
        return 0;
    }
    private balls = [];
    private ballsSet = [{
        x1: 100,
        y1: 100,
        x2: 200,
        y2: 300,
        x3: 400,
        y3: 500
    }]
    public set factor(value:number) {
        this.balls.map((ball,index)=>{
            let oldx = ball.x;
            let oldy = ball.y;
            let ballSet = this.ballsSet[index]
            ball.x = (1 - value) * (1 - value) * ballSet.x1 + 2 * value * (1 - value) * ballSet.x2 + value * value * ballSet.x3;
            ball.y = (1 - value) * (1 - value) * ballSet.y1 + 2 * value * (1 - value) * ballSet.y2 + value * value * ballSet.y3;
            ball.rotation = this.getAngle(oldx,oldy,ball.x,ball.y)
        })
    }
    private getAngle(px,py,mx,my){//获得人物中心和鼠标坐标连线，与y轴正半轴之间的夹角
        var x = Math.abs(px-mx);
        var y = Math.abs(py-my);
        var z = Math.sqrt(Math.pow(x,2)+Math.pow(y,2));
        var cos = y/z;
        var radina = Math.acos(cos);//用反三角函数求弧度
        var angle = Math.floor(180/(Math.PI/radina));//将弧度转换成角度

        if(mx>px&&my>py){//鼠标在第四象限
            angle = 180 - angle;
        }

        if(mx==px&&my>py){//鼠标在y轴负方向上
            angle = 180;
        }

        if(mx>px&&my==py){//鼠标在x轴正方向上
            angle = 90;
        }

        if(mx<px&&my>py){//鼠标在第三象限
            angle = 180+angle;
        }

        if(mx<px&&my==py){//鼠标在x轴负方向
            angle = 270;
        }

        if(mx<px&&my<py){//鼠标在第二象限
            angle = 360 - angle;
        }
        return angle;
    }
    private async testRank() {
        for(let i = 0;i<4;i++) {
            let ball = await GameConfig.createBitmapByName('rank.png')
            ball.width = 84 / 2
            ball.height = 200 / 2;
            this.addChild(ball)
            this.balls.push(ball)
            this.ballsSet.push({
                x1: 100*Math.random()*5,
                y1: 100*Math.random()*5,
                x2: 200*Math.random()*5,
                y2: 300*Math.random()*5,
                x3: 400,
                y3: 500
            })
        }
        egret.Tween.get(this).to({factor: 1}, 2000);
    }
}