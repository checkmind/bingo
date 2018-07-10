/* 
    游戏页面
**/
class TaxInfinite extends egret.Sprite{
    public width:number;
    public height:number;
    private image:egret.Bitmap = new egret.Bitmap();
    private parents;
    private gameBody;
    private gameInf:GameInf;
    private talkContent;
    private monsterClass:MonsterClass;
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

    private async addImage(){
        //this.addBack();
        await this.addStar();
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
    
    private async addStar() {
        let imgHeight = this.width*1.78;
        let top = imgHeight - this.height;
        let sky = await GameConfig.createBitmapByName("back_1.png");
        sky.width = this.width;
        sky.height = imgHeight;
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
       //this.addMonster();
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
            this.removeChild(this.gameBody);
            this.removeChild(this.gameInf);
            this.addGameInf();   
            this.addGameBody();
        }
    }
    private addMonster(){
        this.monsterClass = new MonsterClass(this.gameBody.x,this.gameBody.y,this.gameBody.width,this.gameBody.height);
        // 放到顶部
        this.addChild(this.monsterClass)
        this.setChildIndex(this.monsterClass, 99999);
    }
    // 点击完对话后的场景
    private success() {
        this.removeChild(this.talkContent);
        this.addGameBody();
    }
    private addGameInf() {
       this.gameInf = new GameInf(this.width,this.height,this);
       this.addChild(this.gameInf)
       this.gameInf.backToPage = 'index';
    }
    public updataStep() {
       // this.gameInf.updataStep();
    }
}