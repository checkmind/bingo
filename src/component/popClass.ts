/* 
    弹窗类
**/
class PopClass extends egret.Sprite{
    private image:egret.Bitmap = new egret.Bitmap();
    private img;
    public width:number;
    public height:number;
    public listen;
    public constructor(x,y,width,height){
        super();
        this.width = 502;
        this.height = 658;
        this.x = width/2 - this.width/2;
        this.y = height/2 - this.height/2;
        this.addEventListener(egret.Event.ADDED_TO_STAGE,this.drawProps,this);
    }
    private taxNum;
    private async drawProps(){
        this.taxNum = new TaxButton();
        this.taxNum.skinName="resource/eui_skins/EndingSkin.exml"       
        this.taxNum.label ='恭喜获得了奖励';
        this.addChild(this.taxNum)
        
        this.nextTax();
        this.againGame();
        this.homeGame();
    }   
    private async nextTax() {
        let sky:eui.Image = await GameConfig.createBitmapByName("next.png");
        sky.width = 47;
        sky.height = 47;
        sky.x = this.x + this.width - 87 - sky.width;
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
        sky.width = 47;
        sky.height = 47;
        sky.x = 60;
        sky.y =this.height - 120;
        this.addChild(sky);
    }
    private async homeGame() {
        let sky:any = await GameConfig.createBitmapByName("again.png");
        sky.width = 47;
        sky.height = 47;
        sky.x = this.width/2 - sky.width/2;
        sky.y =this.height - 120;
        this.addChild(sky);
    }
}