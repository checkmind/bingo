/* 
    步数
**/
class StepClass extends eui.Group{
    public width:number;
    public height:number;
    private image:egret.Bitmap = new egret.Bitmap();
    private parents;
    private group;
    private myScroller;
    public step = 0;
    private timer;
    private taxNum;
    public constructor(x,y,parents){
        super();
        this.x = x;
        this.y = y;
        this.step = GameConfig.taxConfig[GameConfig.nowTax].step;

        this.parents = parents;
        this.group = new eui.Group();
        this.addEventListener(egret.Event.ADDED_TO_STAGE,this.addImage,this);
    }
    private addImage(){
        this.taxNum = new TalkButton();
        this.taxNum.skinName="resource/eui_skins/timerSkin.exml"
        this.taxNum.width = 236;
        this.taxNum.height = 281;
        this.addChild(this.taxNum);
    }
    public resetStep() {
        console.log(GameConfig.nowTax);
        console.log(GameConfig.taxConfig[GameConfig.nowTax].step)
       this.step = GameConfig.taxConfig[GameConfig.nowTax].step;
    }
    public changeStep(step) {
        if(step ===0) {
            this.parents.gameOver();
        }
        let str = `步数：${step}`
        this.taxNum.label = str;
    }
}