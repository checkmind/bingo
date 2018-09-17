/* 
    游戏关卡页
**/
class GameGroup extends eui.Group{
    public width:number;
    public height:number;
    private image:egret.Bitmap = new egret.Bitmap();
    private parents;
    private group;
    private myScroller:eui.Scroller;
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
        for(let i = 0;i<GameConfig.taxConfig.length;i++)
            this.meau(i);
        this.addScroll();
    }

    

    private meau(num) {
        var button = new TaxButton();
        button.skinName="resource/eui_skins/toastSkin.exml" //假设Button.exml在resource文件夹下。
        button.label2 = `第${GameConfig.SectionToChinese(num+1)}宇宙`;
        if(num > GameConfig.maxTax) {
            button.label = `  ${TalkConfig.lockLabel}`;
        } else {
            button.label = `  ${TalkConfig.taxLabel[num]}`;
        }
        
        button.width = 226*2;
        button.height = 345*2;
        button.x = (button.width+80)*num;
        button.y = (this.height - button.height) / 2;
        button.addEventListener(egret.TouchEvent.TOUCH_TAP,this.bindClickFn,this);
        this.group.addChild(button);
        if(num<=GameConfig.maxTax)
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
        this.myScroller
        //注意位置和尺寸的设置是在Scroller上面，而不是容器上面
        this.myScroller.width = this.width;
        this.myScroller.height = this.height;
        
        this.myScroller.viewport = this.group;
        this.addChild(this.myScroller);
        let nowSet = (226*2+80)*GameConfig.nowTax - (this.width/2-226)
        this.myScroller.viewport.scrollH = GameConfig.maxTax==0?0:nowSet;
    
    }
    /* 给按钮绑定事件 */
    private bindClickFn(ev) {
        let x =  Math.floor((ev.stageX-this.x+this.myScroller.viewport.scrollH)/(452+80));
        //let y = Math.floor((ev.stageY-this.y)/(344*2));
        let buttonY = (this.height - 345*2) / 2
        if(ev.stageY<=this.y||ev.stageY>=buttonY+345*2)
            return;
        if(x > GameConfig.maxTax)
            return;    
        platform.playButtonMusic();
        GameConfig.nowTax = x;
        PageBus.gotoPage("pageTax");
        GameConfig.state = 1;
    }
}