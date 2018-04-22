var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/*
**/
var GameConfig = (function () {
    function GameConfig() {
    }
    GameConfig.generatorBingos = function () {
    };
    /* 即使不能消除也能交换顺序 */
    GameConfig.canChange = false;
    /* 当前状态
    * state :
    *   0 游戏还未开始
    *   1 游戏开始
    *   2 游戏结束
    *   3 游戏成功
    **/
    GameConfig.state = 0;
    /* 当前步数 */
    GameConfig.stepOnoff = true;
    GameConfig.maxStep = 20;
    /* 星球种类 */
    GameConfig.bingosMax = 8;
    GameConfig.taxArr = ['一', '二', '三', '四', '五', '六', '七', '八'];
    GameConfig.taxLabel = ['第一宇宙很强的',
        '第一宇宙很强的',
        '第一宇宙很强的',
        '第一宇宙很强的',
        '第一宇宙很强的',
        '第一宇宙很强的',
        '第一宇宙很强的',
        '第一宇宙很强的'];
    /* npc台词 */
    GameConfig.npcTalk = [
        [{
                type: 1,
                text: '救世主，你醒了，我在这里等你很久了......'
            },
        ],
        [{
                type: 1,
                text: '怎么样，跟你在地球玩的游戏一样吧，很简单，凑够三个以上相同星球，宇宙中的熵就会降低，只要你达到对应宇宙目标熵差，我们就可以接着拯救后面的宇宙'
            }, {
                type: 1,
                text: '屏幕上方是数值面板，每当熵值降为0的时候，这个宇宙的目标就达到了，当然不同的宇宙有不同的规则，我会一一给你介绍'
            }, {
                type: 2,
                text: '那当然，这游戏对我来说小菜一碟，哎，你还没告诉我你是什么人呢？！'
            }, {
                type: 1,
                text: '（目光转到另一边），哈哈哈，现实生活中可不比游戏，刚刚是第一宇宙，很平常的宇宙，现在是第二宇宙，你在降熵的同时，还要...沉默了'
            }, {
                type: 2,
                text: '还要什么？别再这个时候沉默啊！？？'
            }, {
                type: 1,
                text: '在第二宇宙有几四大犬星，十分巨大，以我们目前的技术不能控制它，所以你还要将其放到第二宇宙的最底部，我会在屏幕上方告知你它的外观。'
            }, {
                type: 1,
                text: '好了，开始吧。'
            }], [{
                type: 1,
                text: '又到了第三关了'
            }], [{
                type: 1,
                text: '第四关'
            }], [{
                type: 1,
                text: '第五关'
            }], [{
                type: 1,
                text: '第六关'
            }], [{
                type: 1,
                text: '第七关'
            }]
    ];
    GameConfig.failWords = ['失败了？没关系再来一次！？', '除了实力还需要运气', '宇宙的熵越来越高了，降熵的速度都赶不上增熵了！', '运用你的智慧......'];
    GameConfig.nowTax = 0;
    GameConfig.taxConfig = [{
            row: 5,
            col: 5,
            checkType: 'uncommon',
            // 最顶层放稀有星球 稀有星球需到底部
            uncommon: 4
        }, {
            row: 5,
            col: 5,
            checkType: 'uncommon',
            uncommon: 4,
            // 从下到上 宇宙会黑掉，这个是黑掉的时间
            darkTime: 60
        }, {
            row: 6,
            checkType: 'uncommon',
            col: 6,
        }, {
            row: 7,
            checkType: 'uncommon',
            col: 7,
            // 十字陷阱，必须把同等星球放到规定的地方，这个允许来回挪动
            matrix: [],
        }, {
            row: 7,
            checkType: 'uncommon',
            col: 7,
            // 每隔五秒钟没消除操作就失败 允许来回挪动 如果没有能消除的就打乱
            matrix: [],
        }, {
            row: 7,
            checkType: 'uncommon',
            col: 7,
            // 每隔五秒钟星球会随机变化
            matrix: [],
        },];
    return GameConfig;
}());
__reflect(GameConfig.prototype, "GameConfig");
//# sourceMappingURL=GameConfig.js.map