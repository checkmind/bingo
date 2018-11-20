/* 
    时间模式
**/
class TaxTimerFast extends egret.Sprite{
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
    private async addImage(){
        this.addBack();
        this.success = ()=>{
            this.removeChild(this.talkContent);
            this.addGameBody();
        }
        this.addGameInf();
        this.addTalk();
        platform.hideAdvise()
    }
    
    private async addBack() {
        let back = new Background(0,0,this.width,this.height);
        this.addChild(back)
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
    private gameOver() {
        this.addPopClass(1,'游戏失败了','重新来一把吧');
        if(this.gameBody && this.gameBody.$parent)
            this.removeChild(this.gameBody);
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
    // 点击完对话后的场景
    private success() {
        this.removeChild(this.talkContent);
        this.addGameInf();
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