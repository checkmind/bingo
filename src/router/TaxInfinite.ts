/* 
    无尽模式
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
    
    private async addImage(){
        await this.addBack();
        this.success = ()=>{
            this.removeChild(this.talkContent);
            this.addGameInf();
            this.addGameBody();
        }
        this.addTalk();
        this.addProgress()
        platform.hideAdvise()
    }
    private addProgress() {
        const progress:Progress = new Progress(this.x, this.y, this.width, this.height)
        const loadImage:loadImages = new loadImages(()=>{
            progress.setMask(loadImage.cont,loadImage.totalCont)
            if(loadImage.cont === loadImage.totalCont) {
                this.removeChild(progress)
            }
        })
        this.addChild(progress)
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
        let score = this.gameInf.myScore
        if(score>=2000){
            this.addPopClass(1,`你表现的还可以，emmmm，那就奖励你${score/2}金`,'游戏结束');
            GameConfig.setCoin(score/2);
            this.gameInf.changeCoin()
        } else 
            this.addPopClass(1,`继续加油吧，注意要经常使用道具哦`,'游戏结束');
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
    private async popMethods(ev) {
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
                console.log('初始化信息')
                this.gameInf.resetInf();
                this.addGameBody();
                break;
            case 'share':
                console.log('分享')
                let res = await platform.shareAppMessage();
                console.log(res);
                if(res.success) {
                    console.log('分享成功奖励1000金')
                    GameConfig.setCoin(1000);
                    this.gameInf.changeCoin()
                }
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