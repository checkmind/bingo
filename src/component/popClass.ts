/* 
    道具类
**/
class PopClass extends egret.Sprite{
    private image:egret.Bitmap = new egret.Bitmap();
    private img;
    public width:number;
    public height:number;
    public constructor(x,y,width,height){
        super();
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.addEventListener(egret.Event.ADDED_TO_STAGE,this.drawProps,this);
    }
    private taxNum;
    private async drawProps(){
        this.taxNum = new TaxButton();
        this.taxNum.skinName="resource/eui_skins/EndingSkin.exml"       
        this.taxNum.label ='恭喜获得了奖励';
        this.addChild(this.taxNum)
    }   
    private async createBitmapByName(name: string) {
        let url = GameConfig.domainUrl+name;
        var image = new eui.Image();
        egret.ImageLoader.crossOrigin = "anonymous"
        image.source = url;
        return image;
    }
}