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
    PageBus.pushPage = function (page) {
        var had;
        PageBus.pages.map(function (val, index) {
            if (val === page)
                had = true;
        });
        if (had)
            return;
        PageBus.pages.push(page);
        //PageBus.nowPage = page;
    };
    PageBus.gotoPage = function (index) {
        if (!PageBus.nowPage) {
            PageBus.nowPage = PageBus.pages[0];
        }
        console.log(PageBus.contain, PageBus.nowPage);
        PageBus.contain.removeChild(PageBus.nowPage);
        PageBus.contain.addChild(PageBus.pages[index]);
    };
    PageBus.pages = [];
    return PageBus;
}());
__reflect(PageBus.prototype, "PageBus");
//# sourceMappingURL=pageBus.js.map