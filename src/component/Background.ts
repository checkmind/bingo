/* 
    道具类
**/
class Background extends egret.Sprite{
    private image:egret.Bitmap = new egret.Bitmap();
    private img;
    public width:number;
    public height:number;
    private role:egret.MovieClip;
    public constructor(x,y,width,height){
        super();
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.addEventListener(egret.Event.ADDED_TO_STAGE,this.addBack,this);
    }
    private async addBack() {
        this.addBackImage()
        this.addBoom();
    }
    /**
     * 添加背景图片
     */
    private async addBackImage() {
        let width = this.width+150;
        let imgHeight = width*1.78;
        let top = imgHeight - this.height;
        let left = width - this.width;
        let sky =await GameConfig.createBitmapByName("back_3.jpg");
        sky.width = width;
        sky.height = imgHeight;
        this.addChild(sky);
        var fn = ()=> {
            egret.Tween.get(sky)
        .to( {y:-top,x:-left}, 8*4000, egret.Ease.sineIn ).call(fn2);
        }
        var fn2 = ()=> {
            egret.Tween.get(sky)
        .to( {y:0,x:0}, 8*4000, egret.Ease.sineIn ).call(fn);
        }
        fn();
    }
    private addBoom() {
        var system = new particle.GravityParticleSystem(RES.getRes("newParticle2_png"), RES.getRes("newParticle2_json"));
        this.addChild(system);
        system.start();
        system.y = 200;
    }
}