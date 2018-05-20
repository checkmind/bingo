/* 
    道具类
**/
class Prop extends egret.Sprite{
    public width:number = 80;
    public height:number = 80;
    private image:egret.Bitmap = new egret.Bitmap();
    public type
    public parents
    private choosed
    private text:egret.TextField
    public constructor(x,y,type,parents){
        super();
        this.x = x;
        this.y = y;
        this.parents = parents
        this.type = type
        console.log("type")
        this.addEventListener(egret.Event.ADDED_TO_STAGE,this.drawProps,this);
    }
    
    private async drawProps(){
        let sprite = new egret.Sprite();
        var rect = await GameConfig.createBitmapByName('rect_2.png')
        var hit = await GameConfig.createBitmapByName(`${GameConfig.helperSrc[this.type]}.png`);
        rect.height = rect.width = hit.width = hit.height = 100
        sprite.addChild(rect);
        sprite.addChild(hit);
        sprite.x = this.x;
        sprite.y = this.y;
        var shape:egret.Shape = new egret.Shape();
        shape.graphics.beginFill(0xff0000, 1);
        shape.graphics.drawCircle(rect.width-15, 20, 20);
        shape.graphics.endFill();
        this.text = new egret.TextField();
        this.text.text =''+GameConfig.helperArr[this.type];
        this.text.width = 40;
        this.text.x = rect.width-35;
        this.text.size = 20;
        this.text.y = 10;
        this.text.textAlign = 'center';
        sprite.addChild(shape);
        sprite.addChild(this.text);
        this.addChild(sprite);
        this.touchEnabled = true;
        this.addEventListener("touchEnd",()=>{
            // 有道具正在使用
            if(GameConfig.helper!=0)
                return;    
            platform.playButtonMusic();
            GameConfig.helper = this.type+1;
            this.setNum();
            console.log("更改了type"+this.type)
        },this)
        this.addFilter();
    }   
    public setNum() {
        console.log("setNum")
        console.log(GameConfig.helper)
        this.text.text = '' + GameConfig.helperArr[this.type]
        this.addFilter();
    }
    private addFilter() {
        if(GameConfig.helperArr[this.type]>0)
            return;
        console.log("增加滤镜")
        let colorMatrix = [
            0.3,0.6,0,0,0,
            0.3,0.6,0,0,0,
            0.3,0.6,0,0,0,
            0,0,0,1,0
        ];
        var colorFlilter = new egret.ColorMatrixFilter(colorMatrix);
        this.filters = [colorFlilter];
    }
}