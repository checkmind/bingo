/* 
    弹窗类
**/
class Progress extends egret.Sprite{
  public width:number;
  public height:number;
  public constructor(x,y,width,height){
      super();
      this.width = width;
      this.height = height;
      this.x = width/2 - this.width/2;
      this.y = height/2 - this.height/2;
      this.addEventListener(egret.Event.ADDED_TO_STAGE,this.addBar,this);
  }
  private stoneBar
  private stone
  private maskBack
  public textField
  private async addBar() {
    this.addBack();
    this.addStoneBar();
    this.addStone();
    this.addText();
  }
  private addBack() {
    /* 背景色设置 */
    var shape:egret.Shape = new egret.Shape;
    shape.graphics.beginFill(0x000000,.5)
    shape.graphics.drawRect(0, 0, this.width, this.height);
    shape.graphics.endFill();
    this.addChild(shape);
 }
  private addText() {
    this.textField = new egret.TextField();
    this.addChild(this.textField);
    this.textField.y = this.stage.stageHeight/2 + 60;
    this.textField.width = 480;
    this.textField.x = this.stage.stageWidth/2 - 480/2;
    this.textField.height = 29;
    this.textField.textAlign = "center";
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
    return this.maskBack
  }
  public setMask(current, total) {
    let price = 314 / total;
    if(this.stone){
        this.stone.mask = this.addMask((current+1)*price,29)
    }
    let num = Math.floor(((current+1)/total)*100);
    if(num>100)
        num = 100;
    this.textField.text = `正在搬运星球: ${num}%`;
  }
}