/* 
**/
class EntryGame extends egret.Sprite{
    public width:number;
    public height:number;
    private image:egret.Bitmap = new egret.Bitmap();
    private parents;
    public constructor(width,height,parent){
        super();
        this.x = 0;
        this.y = 0;
        this.width = width;
        this.height = height;
        this.parents = parent;
        this.addEventListener(egret.Event.ADDED_TO_STAGE,this.addImage,this);
        
    }
    private bitmap;
    private async addImage(){
        await this.addBlackHead();
        this.addBoom();
        await this.addTitle();
        this.addNPC();
        await this.addStarLand();
        this.meau();
        //this.createGameScene();
    }
    /**
     * 排行榜关闭按钮
     */
    private btnClose: eui.Button;

    /**
     * 创建场景界面
     * Create scene interface
     */
    // protected createGameScene(): void {

    //     this.btnClose = new eui.Button();
    //     this.btnClose.label = "btnClose!";
    //     this.btnClose.y = 35;
    //     this.btnClose.horizontalCenter = 0;
    //     this.addChild(this.btnClose);
    //     this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onButtonClick, this);

    //     // /**
    //     //  * 当前按钮会退出小游戏线程
    //     //  */
    //     // let close = new eui.Button();
    //     // close.y = 135;
    //     // close.label = '退出';
    //     // this.addChild(close);

    //     // close.addEventListener(egret.TouchEvent.TOUCH_TAP, () => {
    //     //     wx.exitMiniProgram({
    //     //         success: (res) => {
    //     //             console.log('退出成功', res);
    //     //         },
    //     //         fail: (err) => {
    //     //             console.log('退出失败', err);
    //     //         },
    //     //         complete: (res) => {

    //     //         }
    //     //     })
    //     // }, this);

    //     this.addEventListener(egret.TouchEvent.TOUCH_TAP, (evt: egret.TouchEvent) => {
    //         console.log('输出主域点击事件');
    //     }, this)
    // }

    private isdisplay = false;

    /**
     * 排行榜遮罩，为了避免点击开放数据域影响到主域，在主域中建立一个遮罩层级来屏蔽点击事件.</br>
     * 根据自己的需求来设置遮罩的 alpha 值 0~1.</br>
     * 
     */
    private rankingListMask: egret.Shape;
    private shareButton;
    private shareMyCirle;
    private closeButton;
    /** 
     * 关闭按钮和分享按钮
    */
    private async drawButton() {
        this.shareButton = await GameConfig.createBitmapByName("share.png");
        //this.addChild(this.shareButton);
        this.shareButton.width = 207;
        this.shareButton.height = 80;
        this.shareButton.x = 20;
        this.shareButton.y = this.height - this.shareButton.height - 20;
        this.shareButton.addEventListener("touchEnd",()=>{
            wx.shareAppMessage({
                title: "大夏天的，来消除几颗星球吧",
                imageUrl: '',
                query: '22',
                success() {
                },
                fail(){

                },
                complete() {
                }
            })
        })

        this.shareMyCirle = await GameConfig.createBitmapByName("share.png");
        //this.addChild(this.shareMyCirle);
        this.shareMyCirle.width = 207;
        this.shareMyCirle.height = 80;
        this.shareMyCirle.x = this.width - this.shareMyCirle.width - 20;
        this.shareMyCirle.y = this.height - this.shareMyCirle.height - 20;
        this.shareMyCirle.addEventListener("touchEnd",()=>{
            wx.shareAppMessage({
                title: "大夏天的，来消除几颗星球吧",
                imageUrl: '',
                query: '22',
                success() {
                },
                fail(){

                },
                complete() {
                }
            })
        })

        this.closeButton = await GameConfig.createBitmapByName("close.png");
        this.closeButton.width = 80;
        this.closeButton.height = 80;
        this.closeButton.x = this.width /2 - this.closeButton.width/2;
        this.closeButton.y = this.height - this.closeButton.height - 20;
        this.closeButton.addEventListener('touchEnd',()=>{
            this.isdisplay = true;
            this.onButtonClick();
        },this);
        this.addChild(this.closeButton);
    }
    /**
     * 点击按钮
     * Click the button
     */
    private async onButtonClick() {
        let openDataContext = wx.getOpenDataContext();
        if (this.isdisplay) {
            this.bitmap.parent && this.bitmap.parent.removeChild(this.bitmap);
            this.rankingListMask.parent && this.rankingListMask.parent.removeChild(this.rankingListMask);
            this.isdisplay = false;
            this.removeChild(this.closeButton);
           
        } else {
            // 增加关闭按钮和分享按钮
            
            //处理遮罩，避免开放数据域事件影响主域。
            this.rankingListMask = new egret.Shape();
            this.rankingListMask.graphics.beginFill(0x000000, 1);
            this.rankingListMask.graphics.drawRect(0, 0, this.stage.width, this.stage.height);
            this.rankingListMask.graphics.endFill();
            this.rankingListMask.alpha = 0.5;
            this.rankingListMask.touchEnabled = true;
            this.addChild(this.rankingListMask);
            openDataContext.postMessage({
                text: 'refresh',
                year: (new Date()).getFullYear()
            });
            await this.drawButton();
            //简单实现，打开这关闭使用一个按钮。
            //this.addChild(this.btnClose);
            //主要示例代码开始
            const bitmapdata = new egret.BitmapData(window["sharedCanvas"]);
            bitmapdata.$deleteSource = false;
            const texture = new egret.Texture();
            texture._setBitmapData(bitmapdata);
            this.bitmap = new egret.Bitmap(texture);
            this.bitmap.width = this.stage.stageWidth;
            this.bitmap.height = this.stage.stageHeight;
            this.addChild(this.bitmap);

            egret.startTick((timeStarmp: number) => {
                egret.WebGLUtils.deleteWebGLTexture(bitmapdata.webGLTexture);
                bitmapdata.webGLTexture = null;
                return false;
            }, this);
            //主要示例代码结束            
            this.isdisplay = true;
        }
        //发送消息
        console.log("发送消息")
        openDataContext.postMessage({
            isDisplay: this.isdisplay,
            text: 'hello',
            year: (new Date()).getFullYear()
        });
    }
    private addNPC() {
        let sky = this.createBitmapByName("npc_1_png",256,282);
        this.addChild(sky);
        sky.x = 100;
        sky.y = this.height - sky.height/0.75;
        var fn = ()=> {
            egret.Tween.get(sky)
            .to( {y:this.height - sky.height/0.7}, 3000, egret.Ease.sineIn ).call(fn2);
        }
        var fn2 = ()=> {
            egret.Tween.get(sky)
            .to( {y:this.height - sky.height/0.75}, 3000, egret.Ease.sineIn ).call(fn);
        }
        fn();
    }
    private async addTitle() {
        let sky = await GameConfig.createBitmapByName("title.png");
        sky.width = sky.height = 500;
        this.addChild(sky);
        sky.x = this.width/2-300;
        sky.y = 90;
    }
    private system:particle.ParticleSystem;
    private systemLeaf:particle.ParticleSystem;
    private addBoom() {
        var system = new particle.GravityParticleSystem(RES.getRes("newParticle2_png"), RES.getRes("newParticle2_json"));
        this.addChild(system);
        system.start();
        // let sky = this.createBitmapByName("boom_png",this.width-50,(this.width-50)/0.736);
        // this.addChild(sky);
        // sky.x = 150;
        // sky.y = 40;
        // sky.scaleX = 0.8;
        // sky.scaleY = 0.8;
        system.y = 200;
    }
    private async addBlackHead() {
        let sky =await GameConfig.createBitmapByName("black2.png");
        sky.width = 480;
        sky.height = 485;
        this.addChild(sky);
        var funcChange = ():void=>{
            sky.rotation += 1 * iDirection;
        }
        var iDirection:number = 1;  
        //egret.Tween.get( sky ).to( {width:0,height:0}, 600, egret.Ease.sineIn )
        sky.x = this.width/2 - sky.width/1.5;
        sky.y = 40;
        sky.anchorOffsetX = sky.width/2
        sky.anchorOffsetY = sky.height/2;
        this.addChild(sky);
        var fn = function() {
            egret.Tween.get( sky, { onChange:funcChange, onChangeObj:sky } )
            .to( {}, 20000, egret.Ease.sineIn ).call(fn);
        }
        fn();
        
        
    }
    private async addStarLand() {
        let sky =await GameConfig.createBitmapByName("starLand.png");
        sky.width = this.width;
        sky.height = this.width/1.812;
        this.addChild(sky);
        sky.scaleY = 1.5;
        sky.scaleX = 1.5;
        sky.y =  this.height - sky.height*1.5;
    }
    private meau() {
        var skins = ['ButtonModel1','ButtonModel2','ButtonMore','ButtonHelp']
        var labelText = ['剧情模式','无尽模式','时间模式','排行榜']
        for(let i = 0;i<skins.length;i++) {
            let button = new eui.Button();
            button.touchEnabled = true;
            button.x = this.width/2;
            button.label = labelText[i];
            button.width = 236;
            button.height = 81;
            button.y = i * 90 + this.height/2;
            //button.rotation = 10+i*2;
            button.enabled = true;
            this.addChild(button);
            button.addEventListener(egret.TouchEvent.TOUCH_TAP,()=>{
                this.bindClickFn(i);
                platform.playButtonMusic();
            },this,false,i);
        }  
    }
    private saveData() {
        let openDataContext = wx.getOpenDataContext();
        openDataContext.postMessage({
            array: [1,23],
            type: 'save',
            year: (new Date()).getFullYear()
        });
    }
    /* 给按钮绑定事件 */
    private bindClickFn(i) {
        console.log(i);
        switch(i) {
            case 0:
                PageBus.gotoPage("gameTax");
                break;
            case 1:
                GameConfig.nowTax = -1;
                GameConfig.state = 1;
                PageBus.gotoPage("infinite")
                break;
            case 2:
                break;
            case 3:
                this.onButtonClick();
                break;
            default:
                GameConfig.setHelpArr(1,0);
                return;
        }
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