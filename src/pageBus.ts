/* 
 * 页面路由
**/
class PageBus{
    static pages = {};
    // 顶级父容器
    static contain;
    // 当前页面
    static nowPage;
    public constructor(){
            
    }
    static init(contain) {
        PageBus.contain = contain;
    }
    static pushPage(Obj:{router:string,page:any}) {
        if(PageBus.pages[Obj.router])
            return;
        PageBus.pages[Obj.router] = Obj;
    }
    static gotoPage(router) {
        if(!PageBus.nowPage) {
            PageBus.nowPage = PageBus.pages['index'];
        }
        PageBus.nowPage['page'].removeChildren();
        PageBus.contain.removeChild(PageBus.nowPage['page']);
        PageBus.contain.addChild(PageBus.pages[router]['page']);
        PageBus.nowPage = PageBus.pages[router]
    }
}