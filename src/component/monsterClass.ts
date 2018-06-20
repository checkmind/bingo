/* 
    道具类
**/
class MonsterClass extends egret.Sprite{
    private image:egret.Bitmap = new egret.Bitmap();
    private img;
    public width:number;
    public height:number;
    public constructor(x,y,width,height){
        super();
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.addEventListener(egret.Event.ADDED_TO_STAGE,this.drawProps,this);
    }
    private async drawProps(){
        this.addBlackShape();
    }   

    // 阴影
    private async addBlackShape() {
      this.img = await this.createBitmapByName("monster.gif")
      this.img.width = 100
      this.img.height = 100
      // 深度放到最大
      this.img.x = this.x+this.width-200;
      this.img.y = this.y;
      this.addChild(this.img);
      this.moveRandom();
    }
    private moveRandom() {
        let fn = ()=>{
            let random = Math.floor(Math.random()*1000)*2;
            egret.Tween
            .get(this.img)
            .to( this.generateStyle(), 10*random, egret.Ease.sineIn ).call(()=>{
                if(GameConfig.state ===0 || GameConfig.state ===2) {
                    return;
                }
                fn();
            });
        }
        fn();
    }
    private ran(end,start) {
		return Math.floor(Math.random()*(end-start)+start)
    }
    private generateStyle() {
        let minWidth = 100;
        let maxWidth = 300;
        let height = this.ran(maxWidth,minWidth) 
        let width = height;
        
        let maxX = this.width-width;
        let maxY = this.height-height;
        let minX = this.x;
        let minY = this.y-200;
        
        let x = this.ran(maxX,minX);
        let y = this.ran(maxY,minY);
        return {
            x,y,width,height
        }
    }
    private async createBitmapByName(name: string) {
        let url = GameConfig.domainUrl+name;
        var image = new eui.Image();
        egret.ImageLoader.crossOrigin = "anonymous"
        image.source = url;
        return image;
    }
}