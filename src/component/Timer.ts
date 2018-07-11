/* 
    定时器
**/
class Timer extends eui.Group{
    public width:number;
    public height:number;
    private image:egret.Bitmap = new egret.Bitmap();
    private parents;
    private myScroller;
    public time = GameConfig.infiniteTime;
    private timer;
    private taxNum;
    public constructor(x,y,width,height,parents){
        super();
        this.x = width/2-236/2;
        this.y = y-100;
        this.parents = parents;
        if(GameConfig.nowTax!=-1)
            this.time = GameConfig.taxConfig[GameConfig.nowTax].time;
        this.addEventListener(egret.Event.ADDED_TO_STAGE,this.addImage,this);
    }
    private addImage(){
        this.taxNum = new TalkButton();
        this.taxNum.skinName="resource/eui_skins/timerSkin.exml"
        this.taxNum.width = 236;
        this.taxNum.height = 281;
        this.changeTimer();
        this.addChild(this.taxNum);
    }
    public resetTime() {
        clearInterval(this.timer);
        if(GameConfig.nowTax!=-1)
            this.time = GameConfig.taxConfig[GameConfig.nowTax].time;
        else 
            this.time = GameConfig.infiniteTime;
        this.changeTimer();
    }
    private changeTimer() {
       let str = `时间：${this.time}`
       this.taxNum.label = str;
       this.timer = setInterval(()=>{
           if(GameConfig.state != 1) {
               clearInterval(this.timer);
               return;
           }
           if(this.time ===0) {
               clearInterval(this.timer);
               this.parents.gameOver();
           }
           let str = `时间：${this.time--}`
           this.taxNum.label = str;
        },1000)
    }
}