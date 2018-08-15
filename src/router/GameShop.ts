/* 
    无尽模式
**/
class GameShop extends egret.Sprite{
    public width:number;
    public height:number;
    private image:egret.Bitmap = new egret.Bitmap();
    private parents;
    private gameBody;
    private gameInf:GameInf;
    private talkContent;
    private monsterClass:MonsterClass;
    private check = 0;
    private propsArr = []
    public constructor(width,height){
        super();
        this.x = 0;
        this.y = 0;
        this.width = width;
        this.height = height;
        this.addEventListener(egret.Event.ADDED_TO_STAGE,this.addImage,this);
    }
    
    private async addImage(){
       this.addBackground()
       this.addProps()
       this.myCoin();
       this.addBack()
       this.addButton()
    }
    private addButton() {
       let button = new eui.Button();
        button.touchEnabled = true;
        
        button.label = '购买';
        button.width = 236;
        button.x = this.width/2 - button.width / 2;
        button.height = 81;
        button.y = this.height - 200;
        //button.rotation = 10+i*2;
        button.enabled = true;
        this.addChild(button);
        button.addEventListener(egret.TouchEvent.TOUCH_TAP,()=>{
            this.propsArr[this.check].buyProp()
            platform.playButtonMusic();
        },this,false); 
    }
    
    private addProps() {

        let maxType= GameConfig.helperArr.length;
        // 整个盒子的宽度是  
        let moveX = this.width/4 - 100*maxType/4 - 20
        let self = this;
        function clickButton(index) {
            self.propsArr.forEach((prop, key)=>{
                prop.removeRect()
            })
            self.check = index
        }
        for(let type = 0; type<maxType; type++) {
          let props = new Prop(moveX+60*type,100,type,this,clickButton,true);
          this.propsArr.push(props);
          this.addChild(props);
        }
        this.propsArr[0].addRect();
    }
    private async addBack() { 
        let sky =await GameConfig.createBitmapByName("back.png");
        sky.width = sky.height = 40;
        sky.x = 20;
        sky.y = 50;
        sky.touchEnabled = true;
        sky.addEventListener('touchEnd',()=>{
            PageBus.gotoPage('index');
            GameConfig.state = 0;
        },this);
        this.addChild(sky);
    }
    private async addBackground() {
        let back = new Background(0,0,this.width,this.height);
        this.addChild(back)
    }
    private coinText
    private async myCoin() {
        var sprite = new egret.Sprite();
        var coin = await GameConfig.createBitmapByName('coin.png')
        coin.width = coin.height = 50
        let height = this.height - coin.height - 50;
        coin.x = 0;
        coin.y = 0;
        sprite.addChild(coin);
        this.coinText = new egret.TextField();
        this.coinText.width = 200;
        this.coinText.x = 60;
        this.coinText.y = 0 + 15;
        this.coinText.text = GameConfig.coin + '';
        this.coinText.textAlign = 'left';
    
        this.coinText.size = 20;
        sprite.x = 40;
        sprite.y = height;
        sprite.addChild(this.coinText);
        this.addChild(sprite);
        this.changeCoin()
    }
    public changeCoin() {
        this.coinText.text = `${GameConfig.coin}金`
    }
}
