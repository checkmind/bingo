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
    private ran(start, end) {
        return Math.floor(Math.random()*(end-start)+start)
    }
    private shootRock(bingo) {
        let rock:Rock = new Rock({
            x1 : this.width / 2,
            y1 : this.height,
            x2: this.ran(0, this.width),
            y2: this.height/2,
            x3 : bingo.x,
            y3 : bingo.y,
            width: 42,
            height: 100,
            time : 3000
        });
         this.addChildAt(rock,9)
         rock.shoot()
    }
    private async addImage(){
        this.addBack()
        this.addTalk()
        this.addProgress()
        platform.hideAdvise()
        //this.shootRock({x:40,y:40})
    }
    private addProgress() {
        const progress:Progress = new Progress(this.x, this.y, this.width, this.height)
        const loadImage:loadImages = new loadImages(()=>{
            console.log(loadImage.cont, loadImage.totalCont)
            progress.setMask(loadImage.cont,loadImage.totalCont)
            if(loadImage.cont === loadImage.totalCont) {
                this.removeChild(progress)
            }
        })
        this.addChildAt(progress, 9)
    }
    private async addBack() {
        let back = new Background(0,0,this.width,this.height);
        this.addChild(back)
    }
    
    private addGameBody() {
       this.gameBody = new GameBody(this.width,this.height,this.gameInf,this);
       this.addChild(this.gameBody)  
       console.log("关卡怪物")
       console.log(GameConfig.taxConfig[GameConfig.nowTax]["monster"])
       if(GameConfig.taxConfig[GameConfig.nowTax]["monster"])
         this.addMonster();
    }
    private async addPerfectPassImage() {
        let passImage = await GameConfig.createBitmapByName('pass.png')
        passImage.scaleX = .1;
        passImage.scaleY = .1;
        passImage.width = 300
        passImage.x = this.width/2
        passImage.y = 200
        this.addChild(passImage)
        egret.Tween.get( passImage ).to( { x: this.width/2 - passImage.width/2, scaleX: 1,scaleY: 1,y:this.height/3 }, 500, egret.Ease.sineIn ).call(()=>{
            setTimeout(()=>{
                this.removeChild(passImage)
            }, 1000)
        })
    }
    private addTalk() {
        if(this.talkContent && this.talkContent.$parent) {
            this.removeChild(this.talkContent);
        }
       this.talkContent = new TalkContent(this.width,this.height,this);
       this.talkContent.init();
       this.addChildAt(this.talkContent,2)  
    }
    private async addHore() {
        let img = await GameConfig.createBitmapByName('success.png');
        img.width = 300*1.7;
        img.height = 391*1.7;
        img.x = this.width/2-img.width/2;
        img.y = this.height/2 - img.height/2;
        this.addChild(img);
        let button:eui.Button =new eui.Button();
        button.label = '分享朋友圈';
        button.width = 236;
        button.x = this.width/2 - button.width/2;
        button.y = img.y + img.height + 20;
        button.addEventListener('touchEnd',()=>{
            platform.saveImg();
        },this)
        this.addChild(button);
    }
    public async passTax(score) {

        if(GameConfig.nowTax === GameConfig.taxConfig.length-1) {
            this.addHore();
            return;
        }
        if(GameConfig.nowTax === GameConfig.maxTax) {
            GameConfig.maxTax++;
            platform.passTax(GameConfig.maxTax);
            platform.saveData(GameConfig.maxTax)
        }
        if(GameConfig.nowTax === 0) 
            this.addPopClass(0,` 只要完美完成任务，就会触发动能武器攻击，帮你剔除更多的星球，奖励你${score/2}金`,'游戏通关'); 
        else
            this.addPopClass(0,`  快坐我的“兰博基基”赶往下个宇宙吧，这关表现的不错，奖励你${score/2}金`,'游戏通关');         
        GameConfig.setCoin(score/2);
        this.gameInf.changeCoin()
        if(this.gameBody && this.gameBody.$parent)
            this.removeChild(this.gameBody);
    }
    public gameOver(num?:Number) {
        console.log('结束了')
        this.addPopClass(1,'  游戏失败了，也许道具和运气能拯救你！！','重新挑战');
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
    private async popMethods(ev) {
        let type = ev._type
        switch(type){
            case 'home':
                PageBus.gotoPage("index");
                break;
            case 'next':
                
                GameConfig.nowTax++
                  
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
            case 'share':
                console.log('分享')
                let res = await platform.shareAppMessage();
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