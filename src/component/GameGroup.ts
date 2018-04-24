/* 
    游戏关卡页
**/
class GameGroup extends eui.Group{
    public width:number;
    public height:number;
    private image:egret.Bitmap = new egret.Bitmap();
    private parents;
    private group;
    private myScroller;
    public constructor(width,height,parent){
        super();
        this.x = 0;
        this.y = 0;
        this.width = width;
        this.height = height;
        this.parents = parent;
        this.group = new eui.Group();
        this.addEventListener(egret.Event.ADDED_TO_STAGE,this.addImage,this);
        
        
        
    }
  
    private addImage(){
        for(let i = 0;i<GameConfig.taxArr.length;i++)
            this.meau(i);
        this.addScroll();
    }



    private meau(num) {
        var button = new TaxButton();
        button.skinName="resource/eui_skins/toastSkin.exml" //假设Button.exml在resource文件夹下。
        button.label = `第${GameConfig.taxArr[num]}宇宙`;
        button.label2 = `  ${GameConfig.taxLabel[num]}`;
        button.width = 226;
        button.height = 345;
        button.x = (button.width+40)*num;
        button.y = (this.height - button.height) / 2;
        button.addEventListener(egret.TouchEvent.TOUCH_TAP,this.bindClickFn,this);
        this.group.addChild(button);
        if(num<=GameConfig.nowTax)
            return;
        let colorMatrix = [
            0.3,0.6,0,0,0,
            0.3,0.6,0,0,0,
            0.3,0.6,0,0,0,
            0,0,0,1,0
        ];
        var colorFlilter = new egret.ColorMatrixFilter(colorMatrix);
        button.filters = [colorFlilter];
    }
    private addScroll() {
        this.myScroller = new eui.Scroller();
        //注意位置和尺寸的设置是在Scroller上面，而不是容器上面
        this.myScroller.width = this.width;
        this.myScroller.height = this.height;
        this.myScroller.viewport = this.group;
        this.addChild(this.myScroller);
    
    }
    /* 给按钮绑定事件 */
    private bindClickFn(ev) {
        let x =  Math.floor((ev.stageX-this.x+this.myScroller.viewport.scrollH)/274);
        let y = Math.floor((ev.stageY-this.y)/344);
        if(y!=1 || x > GameConfig.nowTax)
            return;
        GameConfig.nowTax = x;
        PageBus.gotoPage("pageTax");
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