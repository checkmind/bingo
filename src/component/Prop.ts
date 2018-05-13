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
    public constructor(x,y,type,parents){
        super();
        this.x = x;
        this.y = y;
        this.parents = parents
        this.type = type
        this.addEventListener(egret.Event.ADDED_TO_STAGE,this.drawProps,this);
    }
    private async drawProps(){
        var rect = await this.createBitmapByName('rect_2.png')
        var hit = await this.createBitmapByName('shuffle.png');
        rect.height = rect.width = hit.width = hit.height = 100
        this.addChild(rect);
        this.addChild(hit);
    }   
    private async createBitmapByName(name: string) {
        let url = "https://raw.githubusercontent.com/checkmind/bingo/master/resource/assets/"+name;
         var image = new eui.Image();
         egret.ImageLoader.crossOrigin = "anonymous"
         image.source = url;
         return image;
    }
}