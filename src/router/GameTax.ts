/* 
    游戏关卡页
**/
class GameTax extends egret.Sprite{
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
  
    private async addImage(){
        this.addBack();
        this.addGroup();
        this.addReturn();
    }
    private shootRock(bingo) {
        let rock:Rock = new Rock({
            x1 : this.width / 2,
            y1 : this.height,
            x3 : bingo.x,
            y3 : bingo.y,
            width: 42,
            height: 100,
            time : 4000
        });
         this.addChildAt(rock,9)
         rock.shoot()
    }
    private addGroup() {
       let gameGroup = new GameGroup(this.width,this.height,this);
       this.addChild(gameGroup);   
    }

   
    private async addBack() {
        let back = new Background(0,0,this.width,this.height);
        this.addChild(back)
    }
    private async addReturn() { 
        let sky = await GameConfig.createBitmapByName("back.png");
        sky.width = sky.height = 40;
        sky.x = 20;
        sky.y = 50;
        sky.touchEnabled = true;
        sky.addEventListener('touchEnd',()=>{
            PageBus.gotoPage('index');
        },this);
        this.addChild(sky);
    }
}