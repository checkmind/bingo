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
    private arr = ['hit','shuffle']
    private text:egret.TextField
    public constructor(x,y,type,parents){
        super();
        this.x = x;
        this.y = y;
        this.parents = parents
        this.type = type
        this.addEventListener(egret.Event.ADDED_TO_STAGE,this.drawProps,this);
    }
    private async drawProps(){
        let sprite = new egret.Sprite();
        var rect = await this.createBitmapByName('rect_2.png')
        var hit = await this.createBitmapByName(`${this.arr[this.type]}.png`);
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
        this.text.text = "9";
        this.text.width = 40;
        this.text.x = rect.width-35;
        this.text.size = 20;
        this.text.y = 10;
        this.text.textAlign = 'center';
        sprite.addChild(shape);
        sprite.addChild(this.text);
        this.addChild(sprite);
    }   
    private async createBitmapByName(name: string) {
        let url = "https://raw.githubusercontent.com/checkmind/bingo/master/resource/assets/"+name;
         var image = new eui.Image();
         egret.ImageLoader.crossOrigin = "anonymous"
         image.source = url;
         return image;
    }
}