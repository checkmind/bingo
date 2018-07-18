/* 
 * 页面路由
**/
class PageBus{
    static pages = {};
    // 页面包含对象
    static contain;
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