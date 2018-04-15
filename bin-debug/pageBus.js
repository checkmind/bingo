var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/*
**/
var PageBus = (function () {
    function PageBus() {
    }
    PageBus.init = function (contain) {
        console.log(contain);
        PageBus.contain = contain;
    };
    PageBus.pushPage = function (Obj) {
        console.log(PageBus.pages, Obj);
        if (PageBus.pages[Obj.router])
            return;
        PageBus.pages[Obj.router] = Obj;
    };
    PageBus.gotoPage = function (router) {
        if (!PageBus.nowPage) {
            console.log(PageBus.pages['index']);
            PageBus.nowPage = PageBus.pages['index'];
        }
        console.log(PageBus.contain, PageBus.nowPage);
        PageBus.contain.removeChild(PageBus.nowPage['page']);
        PageBus.contain.addChild(PageBus.pages[router]['page']);
        PageBus.nowPage = PageBus.pages[router];
    };
    PageBus.pages = {};
    return PageBus;
}());
__reflect(PageBus.prototype, "PageBus");
//# sourceMappingURL=pageBus.js.map