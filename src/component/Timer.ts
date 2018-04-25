/* 
    游戏关卡页
**/
class Timer extends eui.Group{
    public width:number;
    public height:number;
    private image:egret.Bitmap = new egret.Bitmap();
    private parents;
    private group;
    private myScroller;
    private timer = 60;
    private taxNum;
    public constructor(){
        super();
        this.x = 0;
        this.y = 0;
        this.group = new eui.Group();
        this.addEventListener(egret.Event.ADDED_TO_STAGE,this.addImage,this);
    }
  
    private addImage(){
        this.taxNum = new TalkButton();
        this.taxNum.skinName="resource/eui_skins/timerSkin.exml"
        this.taxNum.width = 236;
        this.taxNum.height = 281;
        this.taxNum.label =this.timer;
        this.taxNum.x = 50;
        this.taxNum.y = 50;
        this.addChild(this.taxNum);
    }
}