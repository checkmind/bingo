/* 
    游戏信息面板
**/
class GameInf extends egret.Sprite{
    public width:number;
    public heights:number;
    private image:egret.Bitmap = new egret.Bitmap();
    private parents;
    public myScore:number = 0;
    private myScoreLabel;
    private taxNum;
    private Timer:Timer;
    // 步数
    private maxStep;
    private StepClass:StepClass;
    private propsArr = [];
    public backToPage = '';
    public constructor(width,height,parent){
        super();
        this.x = 0;
        this.y = 0;
        this.width = width;
        this.heights = height;
        this.parents = parent;
        if(GameConfig.nowTax!=-1)
            this.maxStep =  GameConfig.taxConfig[GameConfig.nowTax].step;
        else 
            this.maxStep = 0;
        this.addEventListener(egret.Event.ADDED_TO_STAGE,this.addImage,this);
    }
  
    private async addImage(){
        this.addTaxNum();
        this.updataScroe();
        //this.updataStep();
        await this.addBack();
        this.addTimer();
        this.addStep();
        this.addProps();
        //this.getProps(2);
        this.myCoin()
    }
    private coinText:egret.TextField;
    // 当前资金
    private async myCoin() {
        var sprite = new egret.Sprite();
        var coin = await GameConfig.createBitmapByName('coin.png')
        coin.width = coin.height = 50
        let height = this.height - coin.height - 50;
        coin.x = 40;
        coin.y = height;
        sprite.addChild(coin);
        this.coinText = new egret.TextField();
        this.coinText.width = 200;
        this.coinText.x = 100;
        this.coinText.y = height + 15;
        this.coinText.text = '99999金';
        this.coinText.textAlign = 'left';
        
        this.coinText.size = 20;
        sprite.addChild(this.coinText);
        this.addChild(sprite);
    }
    // 重置各种 游戏信息
    public resetInf() {
        this.myScore = 0;
        this.updataScroe();
        if(GameConfig.nowTax==-1){
            this.Timer.resetTime();
            this.propsArr.map((obj)=>{
                obj.init();
            })
            return;
        }
        if(GameConfig.taxConfig[GameConfig.nowTax].time!=0)
            this.Timer.resetTime();
        if(GameConfig.taxConfig[GameConfig.nowTax].step!=0)
            this.StepClass.resetStep();
    }
    private hadProps = true;
    // 随机生成道具
    public productHelper() {

    }
    // 得到道具
    public async getProps(type) {
        if(!this.hadProps) {
            return;
        }
        var sprite = new egret.Sprite();
        var shape:egret.Shape = new egret.Shape();
        shape.graphics.beginFill(0x333, 0.5);
        shape.graphics.drawRect(0,0,this.width,this.height+100);
        shape.graphics.endFill();

        this.hadProps = false;
        let img = GameConfig.helperSrc[type];
        var hit = await GameConfig.createBitmapByName(img+'.png')
        hit.width = hit.height = 100
        hit.x = this.width/2 - hit.width/2;
        hit.y = this.height/2 - hit.height/2 - 50;
        
        let taxNum = new TaxButton();
        taxNum.skinName="resource/eui_skins/GetHelper.exml"
        taxNum.label ='您获得了一块：“二向箔”';
        taxNum.label2 ='使用它可以对一个星球及其周围八个星球进行降维打击';
        taxNum.x =this.width/2 - taxNum.width/2;
        taxNum.y = this.height/2 - taxNum.height/2;

        sprite.addChild(shape);
        sprite.addChild(taxNum);
        sprite.addChild(hit);
        this.$parent.addChild(sprite);
        this.$parent.setChildIndex(this, 99999);
        taxNum.addEventListener(egret.TouchEvent.TOUCH_TAP,()=>{
            GameConfig.helperArr[type] += 1;
            this.hadProps = true;
            this.propsArr[type].setNum();
            if(sprite.$parent)
                this.$parent.removeChild(sprite);
        },this);
    }
    private addProps() {

        let maxType= GameConfig.helperArr.length;
        // 整个盒子的宽度是  
        let moveX = this.width/4 - 100*maxType/4 - 20
        let self = this;
        function clickButton() {
            console.log(self)
            self.propsArr.map((prop)=>{
                prop.removeRect()
            })
        }
        for(let type = 0;type<maxType;type++) {
          let props = new Prop(moveX+60*type,(790+40)/2,type,this,clickButton);
          this.propsArr.push(props);
          this.addChild(props);
        }
    }
    private addTimer() {
        if(GameConfig.nowTax!==-1&&GameConfig.taxConfig[GameConfig.nowTax].time===0)
            return;
        this.Timer = new Timer(this.width,this.heights,this.width,this.height,this);
        this.addChild(this.Timer);
    }
    private addStep(){
        // 关卡不用限定步数
        if(this.maxStep===0)
            return;
        this.StepClass = new StepClass(this.width,this.heights,this.width,this.height,this);
        this.addChild(this.StepClass);
        this.StepClass.changeStep(this.maxStep);
    }
    private gameOver() {
        this.parents.gameOver();
    }
    private async addBack() { 
        let sky =await GameConfig.createBitmapByName("back.png");
        sky.width = sky.height = 40;
        sky.x = 20;
        sky.y = 50;
        sky.touchEnabled = true;
        sky.addEventListener('touchEnd',()=>{
            PageBus.gotoPage(this.backToPage);
            GameConfig.state = 0;
        },this);
        this.addChild(sky);
    }
    private addTaxNum() {
        this.taxNum = new TaxButton();
        this.taxNum.skinName="resource/eui_skins/TitleSkin.exml"
        if(GameConfig.nowTax!=-1)
            this.taxNum.label2 ='第'+ GameConfig.taxArr[GameConfig.nowTax] + '宇宙';
        else
            this.taxNum.label2 ='无尽模式';        
        this.taxNum.label ='熵值：0';
        this.taxNum.x =(this.width - this.taxNum.width)-100;
        this.taxNum.y = 5;
        this.addChild(this.taxNum);
    }
    /* 更新成绩 */
    private updataScroe() {
        this.taxNum.label =`熵值：${this.myScore}`;
    }
    /* 更新步数 */
    private updataStep() {
        if(GameConfig.nowTax===-1)
            return;
        this.maxStep--;
        this.StepClass&&this.StepClass.changeStep(this.maxStep);
    }
}