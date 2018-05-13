/* 
    游戏信息面板
**/
class GameInf extends egret.Sprite{
    public width:number;
    public height:number;
    private image:egret.Bitmap = new egret.Bitmap();
    private parents;
    private myScore:number = 0;
    private myScoreLabel;
    private taxNum;
    // 步数
    private myStep;
    private myStepNow=0;
    public backToPage = '';
    public constructor(width,height,){
        super();
        this.x = 0;
        this.y = 0;
        this.width = width;
        this.height = height;
        this.parents = parent;
        this.addEventListener(egret.Event.ADDED_TO_STAGE,this.addImage,this);
        
    }
  
    private addImage(){
        this.addTaxNum();
        this.updataScroe();
        //this.updataStep();
        this.addBack();
        //this.addTimer();
        this.addProps();
    }
    private addProps() {
        let props = new Prop(this.x,this.y,0,this);
        this.addChild(props);
    }
    private addTimer() {
        let time = new Timer();
        this.addChild(time);
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
        this.taxNum.x =(this.width - this.taxNum.width)-50;
        this.taxNum.y = 5;
        this.addChild(this.taxNum);
    }
    /* 更新成绩 */
    private updataScroe() {
        this.taxNum.label =`熵值：${this.myScore}`;
    }
    /* 更新步数 */
    // private updataStep() {
    //     if(!GameConfig.stepOnoff)
    //         return;
    //     if(this.myStep){
    //         this.myStep.text = `剩余步数：${GameConfig.maxStep - this.myStepNow}`;
    //         return;
    //     }
    //     this.myStep = new eui.Label();
    //     this.myStep.x = this.myScoreLabel.width+100;
    //     this.myStep.y = 20;
    //     this.myStep.size = 35;//设置文本字号
    //     this.myStep.bold = true;
    //     this.myStep.text = `剩余步数：${GameConfig.maxStep - this.myStepNow}`;
    //     this.myStep.enabled = true;
    //     this.addChild(this.myStep);
    // }
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