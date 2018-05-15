/* 
    游戏页面
**/
class TaxPage extends egret.Sprite{
    public width:number;
    public height:number;
    private image:egret.Bitmap = new egret.Bitmap();
    private parents;
    private gameBody;
    private gameInf:GameInf;
    private talkContent;
    public constructor(width,height){
        super();
        this.x = 0;
        this.y = 0;
        this.width = width;
        this.height = height;
        this.addEventListener(egret.Event.ADDED_TO_STAGE,this.addImage,this);
        
    }
    
    private system:particle.ParticleSystem;
    private systemLeaf:particle.ParticleSystem;

    private addImage(){
        //this.addBack();
        try{
        this.addStar();
        } catch(e){
            console.log("报错")
            console.log(e)
        }
        
        this.success = ()=>{
            this.removeChild(this.talkContent);
            this.addGameBody();
        }
        var system = new particle.GravityParticleSystem(RES.getRes("newParticle_png"), RES.getRes("newParticle_json"));
        this.addChild(system);
        system.start();
        this.addGameInf();
        this.addTalk();
    }
    
    private addStar() {
        let imgHeight = this.width*1.78;
        let top = imgHeight - this.height;
        let sky = this.createBitmapByName("back_1_png",this.width,imgHeight);
        this.addChild(sky);

        var fn = ()=> {
            egret.Tween.get(sky)
        .to( {y:-top}, 8*6000, egret.Ease.sineIn ).call(fn2);
        }
        var fn2 = ()=> {
            egret.Tween.get(sky)
        .to( {y:0}, 8*6000, egret.Ease.sineIn ).call(fn);
        }
        fn();
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
    private passTax() {
        if(GameConfig.nowTax===GameConfig.maxTax){
            GameConfig.maxTax++;
            GameConfig.nowTax = GameConfig.maxTax
        }

        this.addChild(this.talkContent)
        this.talkContent.showWhich({
            type:1,
            text:'真厉害，竟然通关了，果然没选错人'
        })
        
        if(GameConfig.maxTax>=1) {
            this.success = ()=>{
                PageBus.gotoPage("gameTax");
            }
           return;
        }
        this.success = ()=>{
            this.removeChildren();
            this.addImage();
        }
    }
    private gameOver() {
        this.addChild(this.talkContent)
        this.talkContent.showWhich({
            type:1,
            text:'失败了？没事儿，再来一次'
        })
        this.success = ()=>{
            this.removeChild(this.talkContent);
            this.removeChild(this.gameBody)
            this.gameInf.resetInf();
            this.addGameBody();
        }
    }

    // 点击完对话后的场景
    private success() {
        this.removeChild(this.talkContent);
        this.addGameBody();
    }
    private addGameInf() {
       this.gameInf = new GameInf(this.width,this.height,this);
       this.addChild(this.gameInf)
       this.gameInf.backToPage = 'gameTax';
    }
    public updataStep() {
       // this.gameInf.updataStep();
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