/* 
    弹窗类
**/
class PopClass extends egret.Sprite{
    private image:egret.Bitmap = new egret.Bitmap();
    private img;
    public width:number;
    public height:number;
    public listen;
    private buttonWidth = 47;
    private type;
    private hadConstructor;
    private label1;
    private label2;
    private parentWidth
    /**
     * type: 0 成功
     * type: 1 失败
     */
    public constructor(x,y,width,height,type,label1,label2){
        super();
        this.width = 502;
        this.height = 658;
        this.x = width/2 - this.width/2;
        this.y = height/2 - this.height/2;
        this.type = type;
        this.label1 = label1;
        this.label2 = label2;
        this.parentWidth = width
        this.addEventListener(egret.Event.ADDED_TO_STAGE,this.drawProps,this);
    }
    private taxNum:TaxButton;
    private  drawProps(){
        if(this.hadConstructor)
            return;
        this.hadConstructor = true;
        this.taxNum = new TaxButton();
        this.taxNum.skinName="resource/eui_skins/EndingSkin.exml"       
        this.taxNum.label =this.label1;
        this.taxNum.label2 = this.label2;
        this.addChild(this.taxNum)
        if(this.type===0)
            this.nextTax(this.x);
        else 
            this.shareFriend();
        this.againGame(this.x);
        this.homeGame();
        this.scaleX = .1;
        this.scaleY = .1;
        this.x = this.parentWidth/2 - (this.width * .1)/2
        egret.Tween.get( this ).to( { x: this.parentWidth/2 - this.width/2, scaleX: 1,scaleY: 1 }, 300, egret.Ease.sineIn ).call(()=>{

        });
    }   
    //下一关
    private async nextTax(x) {
        let sky:eui.Image = await GameConfig.createBitmapByName("next.png");
        sky.width = sky.height = this.buttonWidth;
        sky.x = x + this.width - 117 - sky.width;
        sky.y =this.height - 120;
        this.addChild(sky);
        let fn = ()=>{
            let dataEvent:DateEvent = new DateEvent('myPrivateEvent');
            dataEvent._type = 'next'; 
            console.log("点击下一次了");
            this.dispatchEvent(dataEvent);
        }
        sky.addEventListener('touchEnd',fn,this);
    }
    private async shareFriend() {
        let sky:any = await GameConfig.createBitmapByName("share.png");
        sky.width = sky.height = this.buttonWidth;
        sky.x = this.width/2 - sky.width/2;
        sky.y =this.height - 120;
        this.addChild(sky);
        sky.addEventListener('touchEnd',()=>{
            let dataEvent:DateEvent = new DateEvent('myPrivateEvent');
            dataEvent._type = 'share'; 
            console.log("share");
            this.dispatchEvent(dataEvent);
        },this);
    }
    private async homeGame() {
        let sky:any = await GameConfig.createBitmapByName("home.png");
        sky.width = sky.height = this.buttonWidth;
        sky.x = 60;
        sky.y =this.height - 120;
        this.addChild(sky);
        sky.addEventListener('touchEnd',()=>{
            let dataEvent:DateEvent = new DateEvent('myPrivateEvent');
            dataEvent._type = 'home'; 
            console.log("next");
            this.dispatchEvent(dataEvent);
        },this);
    }
    private async againGame(x) {
        let sky:any = await GameConfig.createBitmapByName("again.png");
        sky.width = sky.height = this.buttonWidth;
        if(this.type===0)
            sky.x = this.width/2 - sky.width/2;
        else
            sky.x = x + this.width - 117 - sky.width;
        sky.y =this.height - 120;
        this.addChild(sky);
        sky.addEventListener('touchEnd',()=>{
            let dataEvent:DateEvent = new DateEvent('myPrivateEvent');
            dataEvent._type = 'again'; 
            console.log("next");
            this.dispatchEvent(dataEvent);
        },this);
    }
}