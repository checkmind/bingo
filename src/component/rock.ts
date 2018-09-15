class Rock extends egret.Sprite{
    public width;
    public height;
    public x1;
    public x2 = 400;
    public x3;
    public y1;
    public y2 = 300;
    public y3;
    public time;
    private ballsSet;
    private ball:MovieClass
    public constructor(obj:Object){
        super();
        Object.keys(obj).map((val)=>{
            this[val] = obj[val]
        })
        this.ballsSet = {
            x1: this.x1,
            y1: this.y1,
            x2: this.x2,
            y2: this.y2,
            x3: this.x3,
            y3: this.y3
        }
        console.log(this.ballsSet)
        this.addEventListener(egret.Event.ADDED_TO_STAGE,this.drawProps,this);
    }
    
    private rotate = 0;
    private drawProps() {
        // setTimeout(()=>{
        //     let movie = new MovieClass(this.x3, this.y3,42,100,'rank',this.rotate)
        //     movie.width = 42
        //     movie.height = 100;
        //     movie.x = this.x3
        //     movie.y = this.y3
        //     this.addChild(movie)
        // },this.time)
    }
    public get factor():number {
        return 0;
    }
    private isOne = false
    public set factor(value:number) {
            let oldx = this.ball.x;
            let oldy = this.ball.y;
            let ballSet = this.ballsSet
            let x = (1 - value) * (1 - value) * ballSet.x1 + 2 * value * (1 - value) * ballSet.x2 + value * value * ballSet.x3;
            let y = (1 - value) * (1 - value) * ballSet.y1 + 2 * value * (1 - value) * ballSet.y2 + value * value * ballSet.y3;
            if(x === this.ball.x && y === this.ball.y)
                return
            this.ball.x = x
            this.ball.y = y
            this.ball.rotation = this.getAngle(oldx,oldy,this.ball.x,this.ball.y)
            this.rotate = this.ball.rotation
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
    public async shoot() {
        this.ball = new MovieClass(this.x3, this.y3,42,100,'rank',this.rotate)
        this.ball.width = 42
        this.ball.height = 100;
        this.ball.x = this.x3
        this.ball.y = this.y3
        this.addChild(this.ball)
        egret.Tween.get(this,{loop:false},false,false).to({factor: 1}, this.time).call(()=>{
            console.log('ok')
            this.ball.x = this.x3
            this.ball.y = this.y3
            this.ball.playMovie()
        })
    }
}