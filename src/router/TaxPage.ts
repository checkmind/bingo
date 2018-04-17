/* 
    游戏页面
**/
class TaxPage extends egret.Sprite{
    public width:number;
    public height:number;
    private image:egret.Bitmap = new egret.Bitmap();
    private parents;
    private gameBody;
    private gameInf;
    private talkContent;
    public constructor(width,height){
        super();
        this.x = 0;
        this.y = 0;
        this.width = width;
        this.height = height;
        this.addEventListener(egret.Event.ADDED_TO_STAGE,this.addImage,this);
        
    }
  
    private addImage(){
        //this.addBack();
        
        this.addStar();
        this.addGameInf();
        
        this.addTalk();
    }
    // private system:particle.ParticleSystem;
    // private systemLeaf:particle.ParticleSystem;
    private addStar() {
        let sky = this.createBitmapByName("back_1_png",432*2,704*2);
        this.addChild(sky);
        // var system = new particle.GravityParticleSystem(RES.getRes("ballParticle_png"), RES.getRes("ballParticle_json"));
        // this.addChild(system);
        // system.start();
        // system.y = this.stage.$stageHeight / 2;
        // system.x = this.stage.stageWidth / 2;
        // system.emitterX = 0;
        // system.emitterY = 0;
        // system.scaleX = system.scaleY = 1.5;
    }
    
    private addGameBody() {
       this.gameBody = new GameBody(this.width,this.height,this.gameInf,this);
       this.addChild(this.gameBody)  
    }
    private addTalk() {
       this.talkContent = new TalkContent(this.width,this.height,this);
       this.talkContent.init();
       this.addChild(this.talkContent)  
    }
    private gameOver() {
        this.addChild(this.talkContent)
        this.talkContent.showWhich({
            type:1,
            text:'失败了？没事儿，再来一次'
        })
    }
    private beginGame() {
        this.removeChild(this.talkContent);
        this.addGameBody();
    }
    private addGameInf() {
       this.gameInf = new GameInf(this.width,this.height);
       this.addChild(this.gameInf)
       this.gameInf.backToPage = 'gameTax';
    }
    public updataStep() {
        this.gameInf.updataStep();
    }


    private createBitmapByName(name: string,width:any,height:any) {
        let result = new egret.Bitmap();
        let texture: egret.Texture = RES.getRes(name);
        result.texture = texture;
        if(width)
            result.width = width;
        if(height)
            result.height = height;
        return result;
    }
}