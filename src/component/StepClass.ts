/* 
    步数
**/
class StepClass extends eui.Group{
    public width:number;
    public height:number;
    private image:egret.Bitmap = new egret.Bitmap();
    private parents;
    private myScroller;
    public step = 0;
    private timer;
    private taxNum;
    public constructor(x,y,width,height,parents){
        super();
        this.x = width/2-236/2;
        this.y = y-100;
        this.step = GameConfig.taxConfig[GameConfig.nowTax].step;

        this.parents = parents;
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