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
        
        let width = this.width+150;
        let imgHeight = width*1.78;
        let top = imgHeight - this.height;
        let left = width - this.width;
        let sky =await GameConfig.createBitmapByName("back_3.jpg");
        sky.width = width;
        sky.height = imgHeight;
        this.addChild(sky);
        //this.addStart();
        this.addBoom();
        var fn = ()=> {
            egret.Tween.get(sky)
        .to( {y:-top,x:-left}, 8*4000, egret.Ease.sineIn ).call(fn2);
        }
        var fn2 = ()=> {
            egret.Tween.get(sky)
        .to( {y:0,x:0}, 8*4000, egret.Ease.sineIn ).call(fn);
        }
        fn();
        //this.addSun();
    }
    private async addSun() {
        let sun = await GameConfig.createBitmapByName("sun.png");
        sun.height = sun.width = 200;
        sun.x = 50;
        sun.y = 80;
        this.addChild(sun)
        var fn = ()=> {
            egret.Tween.get(sun)
        .to( {y:90,x:50}, 4000, egret.Ease.sineIn ).call(fn2);
        }
        var fn2 = ()=> {
            egret.Tween.get(sun)
        .to( {y:80,x:50}, 4000, egret.Ease.sineIn ).call(fn);
        }
        fn();
    }
    private system:particle.ParticleSystem;
    private systemLeaf:particle.ParticleSystem;
    private addStart() {
        var system = new particle.GravityParticleSystem(RES.getRes("newParticle_png"), RES.getRes("newParticle_json"));
        this.addChild(system);
        console.log(system)
        console.log('以上')
        system.start();
    }
    private addBoom() {
        var system = new particle.GravityParticleSystem(RES.getRes("newParticle2_png"), RES.getRes("newParticle2_json"));
        this.addChild(system);
        system.start();
        // let sky = this.createBitmapByName("boom_png",this.width-50,(this.width-50)/0.736);
        // this.addChild(sky);
        // sky.x = 150;
        // sky.y = 40;
        // sky.scaleX = 0.8;
        // sky.scaleY = 0.8;
        system.y = 200;
    }
}