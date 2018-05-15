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
    public backToPage = '';
    public constructor(width,height,parent){
        super();
        this.x = 0;
        this.y = 0;
        this.width = width;
        this.heights = height;
        this.parents = parent;
        this.maxStep =  GameConfig.taxConfig[GameConfig.nowTax].step;
        this.addEventListener(egret.Event.ADDED_TO_STAGE,this.addImage,this);
    }
  
    private addImage(){
        this.addTaxNum();
        this.updataScroe();
        //this.updataStep();
        this.addBack();
        //this.addTimer();
        this.addStep();
        this.addProps(0);
        this.addProps(1);
        this.addProps(2);
    }
    // 重置各种 游戏信息
    public resetInf() {
        this.myScore = 0;
        this.updataScroe();
      //  this.Timer.time = 60;
      //  this.Timer.resetTime();
      this.StepClass.resetStep();
    }
    private addProps(type) {
        
        let props = new Prop(20+60*type,this.heights/2-80,type,this);
        this.addChild(props);
    }
    private addTimer() {
        this.Timer = new Timer(this.width-250,this.heights-150,this);
        this.addChild(this.Timer);
    }
    private addStep(){
        this.StepClass = new StepClass(this.width-250,this.heights-150,this);
        this.addChild(this.StepClass);
        this.StepClass.changeStep(this.maxStep);
    }
    private gameOver() {
        console.log("gameover");
        this.parents.gameOver();
    }
    private addBack() { 
        let sky = this.createBitmapByName("back_png",40,40);
        sky.x = 20;
        sky.y = 50;
        sky.touchEnabled = true;
        sky.addEventListener('touchEnd',()=>{
            PageBus.gotoPage(this.backToPage);
        },this);
        this.addChild(sky);
    }
    private addTaxNum() {
        this.taxNum = new TaxButton();
        this.taxNum.skinName="resource/eui_skins/TitleSkin.exml"
        this.taxNum.label2 ='第'+ GameConfig.taxArr[GameConfig.nowTax] + '宇宙';
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
        this.maxStep--;
        this.StepClass.changeStep(this.maxStep);
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