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
    private propName = ['星球锁定','降维打击','道具三','道聚四']
    private rect;
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
        let text = new egret.TextField();
        text.text = this.propName[this.type];
        text.width = 100;
        text.y = 75;
        text.size = 16;
        text.textAlign = 'center';
        rect.height = rect.width = 100
        hit.width = hit.height = 70 
        hit.x = (rect.width - hit.width) /2
        sprite.addChild(rect);
        sprite.addChild(hit);
        sprite.addChild(text);
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
        this.nowNum = GameConfig.helperArr[this.type]
        this.addEventListener("touchEnd",()=>{
            // 如果点的是当前道具
            if(this.type+1 === +GameConfig.helper) {
                //移除方框
                
                GameConfig.helper = 0;
                this.removeRect();   
                return;
            }
            if(GameConfig.helperArr[this.type] === 0) {
                return;
            }
            platform.playButtonMusic();
            GameConfig.helper = this.type+1;
            this.addRect();
            this.setNum();
        },this)
        this.addFilter();
    }   
    //当前道具还剩下多少
    private nowNum = null;
    public setNum() {
        if(this.nowNum === GameConfig.helperArr[this.type]) {
            return;
        }
        this.removeRect();
        this.text.text = '' + GameConfig.helperArr[this.type]
        this.nowNum = GameConfig.helperArr[this.type]
        this.addFilter();
    }
    private async addRect(){
        this.rect =await GameConfig.createBitmapByName("rect_pop.png");
        this.rect.width = this.rect.height = 120;
        this.rect.x = this.x -10;
        this.rect.y = this.y - 10;
        this.addChild(this.rect);
        this.propTextMethods();
    }
    // 道具说明
    private propText:egret.TextField;
    private propTextMethods() {
        this.propText = new egret.TextField();
        this.propText.width = this.stage.stageWidth - 40;
        this.propText.y = this.y + 120;
        this.propText.text = '选择一种星球，我们的武器库会销毁该种类的所有星球！';
        this.propText.textAlign = 'center';
        this.addChild(this.propText)
    }
    private removePropText() {
        if(this.propText && this.propText.$parent)
            this.removeChild(this.propText)
    }
    private async removeRect() {
        if(this.rect && this.rect.$parent)
            this.removeChild(this.rect);
        this.removePropText()
    }
    private addFilter() {
        if(GameConfig.helperArr[this.type]>0){
            this.filters = null;
            return;
        }
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