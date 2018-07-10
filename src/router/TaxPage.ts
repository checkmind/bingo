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
        
        // this.success = ()=>{
        //     this.addGameInf();
        //     this.addGameBody();
        // }
        var system = new particle.GravityParticleSystem(RES.getRes("newParticle_png"), RES.getRes("newParticle_json"));
        this.addChild(system);
        system.start();
        
        this.addTalk();
        
    }
    
    private async addStar() {
        let imgHeight = this.width*1.78;
        let top = imgHeight - this.height;
        let sky =await GameConfig.createBitmapByName("back_1.png");
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
       console.log("关卡怪物")
       console.log(GameConfig.taxConfig[GameConfig.nowTax]["monster"])
       if(GameConfig.taxConfig[GameConfig.nowTax]["monster"])
         this.addMonster();
    }
   
    private addTalk() {
        if(this.talkContent && this.talkContent.$parent) {
            this.removeChild(this.talkContent);
        }
       this.talkContent = new TalkContent(this.width,this.height,this);
       this.talkContent.init();
       this.addChild(this.talkContent)  
    }
    private passTax() {
        console.log('通关了')
        this.addPopClass(0,'游戏通关','挑战下一关吧');
        if(this.gameBody && this.gameBody.$parent)
            this.removeChild(this.gameBody);
        // if(GameConfig.maxTax>=1) {
        //     this.success = ()=>{
        //         PageBus.gotoPage("gameTax");
        //     }
        //    return;
        // }
        // this.success = ()=>{
        //     this.removeChildren();
        //     this.addImage();
        // }
    }
    private gameOver() {
        console.log('结束了')
        this.addPopClass(1,'游戏失败了','重新来一把吧');
        if(this.gameBody && this.gameBody.$parent)
            this.removeChild(this.gameBody);
        // this.success = ()=>{
        //     this.removeChildren();
        //     this.addImage();
        // }
    }
    private pop:PopClass;
    /**
     * type 弹窗类型
     */
    private addPopClass(type,label1,label2) {
        if(this.pop && this.pop.$parent) {
            this.removeChild(this.pop)
        }
        
        this.pop = new PopClass(0,50,this.width,this.height,type,label1,label2);
        this.addChild(this.pop);
        this.pop.addEventListener(DateEvent.DATE,(ev)=>{this.popMethods(ev)},this)
    }
    private popMethods(ev) {
        let type = ev._type
        switch(type){
            case 'home':
                PageBus.gotoPage("index");
                break;
            case 'next':
                console.log("next")
                if(GameConfig.nowTax===GameConfig.maxTax){
                    GameConfig.maxTax++;
                    GameConfig.nowTax = GameConfig.maxTax
                }
                console.log(GameConfig.nowTax);
                this.removeChildren();
                    GameConfig.state = 1;
                this.addImage();
                break;
            case 'again':
                console.log('again')
                GameConfig.state = 1;
                if(this.gameBody && this.gameBody.$parent)
                    this.removeChild(this.gameBody)
                this.gameInf.resetInf();
                this.addGameBody();
                break;
            default:
                return;
        }
        if(this.pop.$parent)
            this.removeChild(this.pop);
    }
    private addMonster(){
        if(this.monsterClass&&this.monsterClass.$parent)
            this.removeChild(this.monsterClass)
        this.monsterClass = new MonsterClass(this.gameBody.x,this.gameBody.y,this.gameBody.width,this.gameBody.height);
        // 放到顶部
        this.addChild(this.monsterClass)
        this.setChildIndex(this.monsterClass, 99999);
    }
    // 点击完对话后的场景
    private success() {
        this.removeChild(this.talkContent);
        this.addGameInf();
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
}