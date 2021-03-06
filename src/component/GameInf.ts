/* 
    游戏信息面板
**/
class GameInf extends egret.Sprite{
    public width:number;
    public heights:number;
    private parents;
    public myScore:number = 0;
    private taxNum;
    private Timer:Timer;
    // 步数
    private maxStep;
    private StepClass:StepClass;
    private propsArr = [];
    public backToPage = '';
    private coinText:egret.TextField;
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
        this.myGoal()
    }
    
    // 当前资金
    private async myCoin() {
        var sprite = new egret.Sprite();
        var coin = await GameConfig.createBitmapByName('coin.png')
        coin.width = coin.height = 50
        let height = this.height - coin.height - 50;
        coin.x = 0;
        coin.y = 0;
        sprite.addChild(coin);
        this.coinText = new egret.TextField();
        this.coinText.width = 200;
        this.coinText.x = 60;
        this.coinText.y = 0 + 15;
        this.coinText.text = GameConfig.coin + '';
        this.coinText.textAlign = 'left';
    
        this.coinText.size = 20;
        sprite.x = 40;
        sprite.y = height + 80;
        sprite.addChild(this.coinText);
        this.addChild(sprite);
        this.changeCoin()
    }
    public changeCoin() {
        this.coinText.text = `${GameConfig.coin}金`
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
        function clickButton(index) {
            self.propsArr.forEach((prop, key)=>{
                prop.removeRect()
            })
        }
        for(let type = 0;type<maxType;type++) {
          let props = new Prop(moveX+60*type,this.height/2 - 100,type,this,clickButton);
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
    public checkGameover() {
        if(GameConfig.taxConfig[GameConfig.nowTax].myScore > this.myScore)
            this.gameOver()
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
        this.taxNum = new egret.TextField();
        this.taxNum.width = 200;
        this.taxNum.height = 50;
        
        if(GameConfig.nowTax===-1)
           this.taxNum.x = this.width/2 - this.taxNum.width/2;
        else
           this.taxNum.x = 140; 
        this.taxNum.y = 60;
        this.taxNum.lineSpacing = 50;
        this.taxNum.text = '当前降熵：0'
        this.taxNum.size = 25;
        this.taxNum.textAlign = 'center';
        this.addChild(this.taxNum);
    }
    // 游戏目标
    private goalText:egret.TextField
    private async myGoal() {
        if(GameConfig.nowTax == -1)
            return
        this.goalText = new egret.TextField();
        this.goalText.width = 200;
        this.goalText.height = 50;
        this.goalText.lineSpacing = 50;
        this.goalText.x = 360;
        this.goalText.y = 60;
        this.goalText.text = `目标熵值：${ GameConfig.taxConfig[GameConfig.nowTax].myScore }`;
        this.goalText.textAlign = 'left';
        this.goalText.size = 25;
        this.addChild(this.goalText);
    }
    /* 更新成绩 */
    private updataScroe() {
        this.taxNum.text =`当前降熵：${this.myScore}`;
    }
    /* 更新步数 */
    public updataStep(step?:number) {
        if(GameConfig.nowTax===-1)
            return;
        if(!step)
            this.maxStep--;
        else
            this.maxStep += step;
        this.StepClass&&this.StepClass.changeStep(this.maxStep);
    }
    /* 设置时间 */
    public setTime(num) {
        this.Timer.setTime(num);
    }
}