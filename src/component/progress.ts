/* 
    弹窗类
**/
class Progress extends egret.Sprite{
  public width:number;
  public height:number;
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
      this.addEventListener(egret.Event.ADDED_TO_STAGE,this.addBar,this);
  }
  private stoneBar
  private stone
  private maskBack
  private async addBar() {
    this.addStoneBar();
    this.addStone();
  }
  private async addStone() {
      // if(this.stone)
      //     this.removeChild(this.stone);
      this.stone = await GameConfig.createBitmapByName("stone.png");
      this.stone.width  = 314;
      this.stone.height = 29;
      this.stone.x = this.stage.stageWidth/2 - this.stone.width/2-5;
      this.stone.y = this.stage.stageHeight/2 - this.stone.height/2;
      this.addChild(this.stone);
      this.stone.mask = this.addMask(0,0)
  }
  private async addStoneBar() {
      this.stoneBar = await GameConfig.createBitmapByName("stoneBar.png");
      this.stoneBar.width = 374;
      this.stoneBar.height = 48;
      this.stoneBar.x = this.stage.stageWidth/2 - this.stoneBar.width/2;
      this.stoneBar.y = this.stage.stageHeight/2 - this.stoneBar.height/2;
      this.addChild(this.stoneBar)
  }
  private addMask(width,height) {
    //画一个遮罩正方形
    if(this.maskBack){
        this.removeChild(this.maskBack)
        this.maskBack = null;
    }
    this.maskBack = new egret.Shape();
    this.maskBack.graphics.beginFill(0x0000ff,1);
    this.maskBack.graphics.drawRect(this.stone.x,this.stone.y,width,height);
    this.maskBack.graphics.endFill();
    
    this.addChild(this.maskBack);
    return this.maskBack;
  }
}