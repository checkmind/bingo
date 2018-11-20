/* 
    道具类
**/
class Prop extends egret.Sprite{
    public width:number = 80;
    public height:number = 80;
    private image:egret.Bitmap = new egret.Bitmap();
    public type
    public parents
    private choosed
    private text:egret.TextField
    private propName = ['星球锁定','降维打击','粒子交换','增加步数','增加时间']
    private rect;
    private rect_2;
    private callback:Function;
    private vertexSrc =
            "attribute vec2 aVertexPosition;\n" +
            "attribute vec2 aTextureCoord;\n" +
            "attribute vec2 aColor;\n" +

            "uniform vec2 projectionVector;\n" +

            "varying vec2 vTextureCoord;\n" +
            "varying vec4 vColor;\n" +

            "const vec2 center = vec2(-1.0, 1.0);\n" +

            "void main(void) {\n" +
            "   gl_Position = vec4( (aVertexPosition / projectionVector) + center , 0.0, 1.0);\n" +
            "   vTextureCoord = aTextureCoord;\n" +
            "   vColor = vec4(aColor.x, aColor.x, aColor.x, aColor.x);\n" +
            "}";
    private fragmentSrc1 =
            "precision lowp float;\n" +
            "varying vec2 vTextureCoord;\n" +
            "varying vec4 vColor;\n" +
            "uniform sampler2D uSampler;\n" +

            "uniform float customUniform;\n" +

            "void main(void) {\n" +
            "vec2 uvs = vTextureCoord.xy;\n" +
            "vec4 fg = texture2D(uSampler, vTextureCoord);\n" +
            "fg.rgb += sin(customUniform + uvs.x * 2. + uvs.y * 2.) * 0.2;\n" +
            "gl_FragColor = fg * vColor;\n" +
            "}";
    
    // 定时器对话
    private timeWordsText:egret.TextField;
    private buy
    // 道具说明
    private propText:egret.TextField;
    public constructor(x,y,type,parents,callback,buy?:Boolean){
        super();
        this.x = x;
        this.y = y;
        this.parents = parents
        this.type = type
        this.callback = callback;
        this.buy = buy ? true : false
        console.log("type")
        this.addEventListener(egret.Event.ADDED_TO_STAGE,this.drawProps,this);
    }
    //  增加渐变
    private addShader(rect) {
         
        if(GameConfig.helperArr[this.type]<=0){
            return;
        }
        let customFilter1 = new egret.CustomFilter(this.vertexSrc, this.fragmentSrc1, {
            customUniform: 0
        });
        this.rect_2.filters = [customFilter1];
        this.addEventListener(egret.Event.ENTER_FRAME, () => {
            customFilter1.uniforms.customUniform += 0.1;
            if (customFilter1.uniforms.customUniform > Math.PI * 2) {
                customFilter1.uniforms.customUniform = 0.0;
            }
        }, this);
    }
    private propIntro
    // 增加底部道具名称
    private addPropIntro(sprite) {
        this.propIntro = new egret.TextField();
        if(GameConfig.helperArr[this.type]>0 && !this.buy)
            this.propIntro.text = this.propName[this.type];
        else 
            this.propIntro.text = `售: ${GameConfig.helperPrice[this.type]}金`
        this.propIntro.width = 100;
        this.propIntro.y = 75;
        this.propIntro.size = 16;
        this.propIntro.textAlign = 'center';
        sprite.addChild(this.propIntro);
    }
    private async drawProps(){
        let sprite = new egret.Sprite();
        this.rect_2 = await GameConfig.createBitmapByName('rect_2.png')
        var hit = await GameConfig.createBitmapByName(`${GameConfig.helperSrc[this.type]}.png`);
        this.addPropIntro(sprite)
        this.rect_2.height = this.rect_2.width = 100
        hit.width = hit.height = 70 
        hit.x = (this.rect_2.width - hit.width) /2
        sprite.addChild(this.rect_2);
        this.addShader(this.rect_2);
        sprite.addChild(hit);
        sprite.x = this.x;
        sprite.y = this.y;
        var shape:egret.Shape = new egret.Shape();
        shape.graphics.beginFill(0xff0000, 1);
        shape.graphics.drawCircle(this.rect_2.width-15, 20, 20);
        shape.graphics.endFill();
        this.text = new egret.TextField();
        this.text.text =''+GameConfig.helperArr[this.type];

        this.text.width = 40;
        this.text.x = this.rect_2.width-35;
        this.text.size = 20;
        this.text.y = 10;
        this.text.textAlign = 'center';
        sprite.addChild(shape);
        sprite.addChild(this.text);
        this.addChild(sprite);
        this.touchEnabled = true;
        this.nowNum = GameConfig.helperArr[this.type]
        this.addEventListener("touchEnd",()=>{
            // 如果是购买道具就返回
            if(this.buy) {
                this.callback(this.type);
                this.addRect();
                return;
            }
            //道具使用无效
            if(this.type === 2 && GameConfig.canChange) {
                return;
            }
            this.callback(this.type);
            // 如果点的是当前道具
            if(this.type+1 === +GameConfig.helper) {
                //移除方框
                console.log('在这消失1')
                GameConfig.helper = 0;
                this.removeRect();   
                return;
            }
            platform.playButtonMusic();
            // 在游戏过程中购买道具
            if(GameConfig.helperArr[this.type] <= 0) {
                this.buyProp()
                this.propIntro.text = this.propName[this.type];
                return;
            }
            
            GameConfig.helper = this.type+1;
            this.addRect();
            //this.setNum();
            // 根据不同类型调用不同事件
            switch(this.type) {
                // 如果是任意交换道具
                case 2: 
                    if(!GameConfig.canChange)
                        this.changeProp()
                    GameConfig.setHelpArr(-1,this.type);    
                    this.setNum();
                    break;
                // 增加步数道具
                case 3:
                    console.log(GameConfig.nowTax)
                    if(GameConfig.nowTax==-1 || GameConfig.taxConfig[GameConfig.nowTax].step ===0){
                        this.unshowWords();                        
                        return;
                    }
                    //this.unshowWords('我两秒钟后就消失掉了');
                    GameConfig.helper = 0;
                    GameConfig.setHelpArr(-1,this.type);
                    this.setNum();
                    this.parents.updataStep(5);
                    break;
                //增加时间道具
                case 4:
                    if(GameConfig.nowTax!=-1 && GameConfig.taxConfig[GameConfig.nowTax].time ===0){
                        //this.unshowWords('在此场景是无用道具哦~~');                        
                        return;
                    }
                    this.unshowWords();
                    GameConfig.helper = 0;                  
                    GameConfig.setHelpArr(-1,this.type); 
                    this.parents.setTime(10);
                    this.setNum();
                    break;
                default :
                    return;
            }
        },this)
        this.addFilter();
    }   
    private buyProp() {
        if(GameConfig.coin < GameConfig.helperPrice[this.type]) {
            GameConfig.helperPrice[this.type]
            this.addTimeWords(`金币不够，可以去时间模式刷金币哦~~`)
            this.removePropText()
            return;
        }
        this.addShader(this.rect_2);
        GameConfig.setHelpArr(1,this.type);
        GameConfig.setCoin(-GameConfig.helperPrice[this.type]);
        this.parents.changeCoin();
        this.setNum();
        
        this.addTimeWords(`您花费了${GameConfig.helperPrice[this.type]}购买道具成功`)
        return;
    }
    //当前道具还剩下多少
    private nowNum = null;
    public setNum(save?:Boolean) {
        if(this.nowNum === GameConfig.helperArr[this.type]) {
            return;
        }
        !save && this.removeRect();
        this.text.text = '' + GameConfig.helperArr[this.type]
        if(GameConfig.helperArr[this.type]>0 && !this.buy)
            this.propIntro.text = this.propName[this.type];
        else 
            this.propIntro.text = `售: ${GameConfig.helperPrice[this.type]}金`
        this.nowNum = GameConfig.helperArr[this.type]
        this.addFilter();
    }
    private async addRect(){
        this.rect =await GameConfig.createBitmapByName("rect_pop.png");
        this.rect.width = this.rect.height = 120;
        this.rect.x = this.x -10;
        this.rect.y = this.y - 10;
        this.addChild(this.rect);
        this.propTextMethods(TalkConfig.propTalk[this.type]);
    }
    private propTextMethods(words) {
        if(this.propText && this.propText.$parent) {
            this.removeChild(this.propText);
        }
        this.propText = new egret.TextField();
        this.propText.width = GameConfig.width - 80;
        this.propText.y = this.y + 130;
        this.propText.text = words;
        this.propText.textAlign = 'center';
        this.propText.size = 20;
        this.propText.lineSpacing = 23;
        this.propText.x = -this.x + 40;
        if(this.timeWordsText && this.timeWordsText.$parent)
            this.removeChild(this.timeWordsText)
        this.addChild(this.propText)
    }
    
    private addTimeWords (words) {
        if(this.timeWordsText && this.timeWordsText.$parent)
            this.removeChild(this.timeWordsText)
        this.timeWordsText = new egret.TextField();
        this.timeWordsText.width = GameConfig.width - 80;
        this.timeWordsText.y = this.y + 130;
        this.timeWordsText.text = words;
        this.timeWordsText.textAlign = 'center';
        this.timeWordsText.size = 20;
        this.timeWordsText.lineSpacing = 23;
        this.timeWordsText.x = -this.x + 40;
        let timer = setTimeout(()=>{
            clearTimeout(timer);
            if(this.timeWordsText.$parent)
                this.removeChild(this.timeWordsText)
        },1000)
        this.addChild(this.timeWordsText)
    }
    //初始化道具
    public init() {
        GameConfig.helper = 0;
        this.removeRect()
        // this.removeBar();
    }
    // 两秒钟后消失的话
    private unshowWords() {
        setTimeout(()=>{
            this.removeRect();
        },2000)
    }
    //  任意交换道具方法
    private changeProp() {
        let time = GameConfig.canChangeTime;
        this.setNum(true);
        GameConfig.helper = 0;
        GameConfig.canChange = true
        this.addBar();
        let inter = setInterval(()=>{
            time--;
            if(this.stone){
                this.stone.mask = this.addMask((90-(time)*10),10)
            }
            if(time === 0) {
                GameConfig.canChange = false
                clearInterval(inter);
                this.removeBar();
                this.removeRect();
            }
        },1000)
    }
    
    private stoneBar:egret.Shape
    private stone:egret.Shape
    private maskBack:egret.Shape;
    private async addBar() {
        this.addStoneBar();
        this.addStone();
    }
    private removeBar() {
        if(this.stone && this.stone.$parent)
            this.removeChild(this.stone);
        if(this.stoneBar && this.stoneBar.$parent)
            this.removeChild(this.stoneBar);
    }
    private async addStoneBar() {
        this.stoneBar = new egret.Shape();
        this.stoneBar.graphics.beginFill(0xdc5354 + Math.floor(Math.random() * 100) * (0xffffff / 100), 1);
        this.stoneBar.graphics.lineStyle(2, 0xff0000 + Math.floor(Math.random() * 100) * (0xffffff / 100));
        this.stoneBar.graphics.drawRect(this.x + 5, this.y + 60, 90, 10);
        this.stoneBar.graphics.endFill();
        this.addChild(this.stoneBar)
    }
    private async addStone() {
        this.stone = new egret.Shape();
        this.stone.graphics.beginFill(0xff0000);
        this.stone.graphics.drawRect(this.x + 5, this.y + 60, 90, 10);
        this.stone.graphics.endFill();
        this.addChild(this.stone);
        this.stone.mask = this.addMask(0,0)
    }
    private addMask(width,height) {
        //画一个遮罩正方形
        if(this.maskBack){
            this.removeChild(this.maskBack)
            this.maskBack = null;
        }
        this.maskBack = new egret.Shape();
        this.maskBack.graphics.beginFill(0x000000,1);
        this.maskBack.graphics.drawRect(this.x + 5,this.y + 60,width,height);
        this.maskBack.graphics.endFill();
        
        this.addChild(this.maskBack);
        return this.maskBack;
    }
    private removePropText() {
        if(this.propText && this.propText.$parent)
            this.removeChild(this.propText)
    }
    private async removeRect() {
        if(this.rect && this.rect.$parent)
            this.removeChild(this.rect);
        this.removePropText()
    }
    private addFilter() {
        if(GameConfig.helperArr[this.type]>0){
            this.filters = null;
            return;
        }
        if(this.rect_2)
            this.rect_2.filters = null;
        let colorMatrix = [
            0.3,0.6,0,0,0,
            0.3,0.6,0,0,0,
            0.3,0.6,0,0,0,
            0,0,0,1,0
        ];
        var colorFlilter = new egret.ColorMatrixFilter(colorMatrix);
        this.filters = [colorFlilter];
    }
}