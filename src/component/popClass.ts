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
    /**
     * type: 0 成功
     * type: 1 失败
     */
    public constructor(x,y,width,height,type){
        super();
        this.width = 502;
        this.height = 658;
        this.x = width/2 - this.width/2;
        this.y = height/2 - this.height/2;
        this.type = type;
        this.addEventListener(egret.Event.ADDED_TO_STAGE,this.drawProps,this);
    }
    private taxNum;
    private async drawProps(){
        this.taxNum = new TaxButton();
        this.taxNum.skinName="resource/eui_skins/EndingSkin.exml"       
        this.taxNum.label ='恭喜获得了奖励';
        this.addChild(this.taxNum)
        if(this.type===0)
            this.nextTax();
        this.againGame();
        this.homeGame();
    }   
    private async nextTax() {
        let sky:eui.Image = await GameConfig.createBitmapByName("next.png");
        sky.width = sky.height = this.buttonWidth;
        sky.x = this.x + this.width - 117 - sky.width;
        sky.y =this.height - 120;
        this.addChild(sky);
        sky.addEventListener('touchEnd',()=>{
            let dataEvent:DateEvent = new DateEvent('myPrivateEvent');
            dataEvent._type = 'next'; 
            console.log("next");
            this.dispatchEvent(dataEvent);
        },this);
    }
    private async againGame() {
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
    private async homeGame() {
        let sky:any = await GameConfig.createBitmapByName("again.png");
        sky.width = sky.height = this.buttonWidth;
        if(this.type===0)
            sky.x = this.width/2 - sky.width/2;
        else
            sky.x = this.x + this.width - 117 - sky.width;
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