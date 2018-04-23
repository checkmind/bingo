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
        // 第一关
        [{
                type: 1,
                text: '救世主，你醒了，我在这里等你很久了......'
            },
            {
                type: 2,
                text: '爱因斯坦？什么？？什么救世主，我正打《星球大爆炸》就突然被屏幕吸到这里来了，怎么回事儿？？？'
            }, {
                type: 1,
                text: "\u4F60\u5148\u542C\u6211\u6162\u6162\u9053\u6765\uFF0C\u6211\u4EEC\u7684\u4EEA\u8868\u76D1\u6D4B\u5230\u6700\u8FD1\u6709\u4E9B\u5B87\u5B99\u7684\u71B5\u8D8A\u6765\u8D8A\u9AD8\uFF0C\u4E0D\u6E05\u695A\u4EC0\u4E48\u539F\u56E0\u3002\u5982\u679C\u71B5\u7EE7\u7EED\u8FD9\u6837\u589E\u52A0\u4E0B\u53BB\uFF0C\u6050\u6015\u8FD9\u4E9B\u5B87\u5B99\u4F1A\u8FDB\u5165\u4E00\u4E2A\u6B7B\u5BC2\u7684\u6C38\u6052\u72B6\u6001\u3002"
            }, {
                type: 2,
                text: '什么？？什么熵？什么死寂？听上去很“玄幻啊”!?'
            }, {
                type: 1,
                text: '哦，我有些唐突了，你还只是个初中生，熵是衡量物质的混乱程度，对比星球而言就是星球的混乱程度，宇宙在不断膨胀，星球之间的距离一直在增加，熵也在增加。'
            }, {
                type: 1,
                text: '当宇宙中的熵达到极限大时，一切运动就会中止，这个完全静止的状态就称为死寂。如果宇宙进入了死寂状态，那生物也就不存在了。'
            }, {
                type: 2,
                text: '你，你是什么人！告诉我这些干什么！？还有，我为什么出现在这里？'
            }, {
                type: 1,
                text: '其实我不是爱因斯坦，用你们的话讲，我们是外星高级文明，维度也高过人类，通过脑电波在和你对话，你所处的这个地方也是我干扰你的脑电波臆造出来的。'
            }, {
                type: 1,
                text: '虽然我们的维度高过人类，但我们的文明发展的代价是熵的剧增，对于降低熵的思维没有三维低等文明活跃。因此在你们网络上发布了这款星球大爆炸游戏...'
            }, {
                type: 2,
                text: '等等！你不会要说我是被游戏筛选出来的吧！'
            }, {
                type: 1,
                text: '（思索一会儿......）先别说了，前面的全息屏幕熟悉吧，将相同的星球聚集在一起，让我看看你的实力吧。'
            },
        ],
        // 第二关
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
                // 第三关
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
            }], [{
                type: 1,
                text: '最后一关了'
            }]
    ];
    GameConfig.failWords = ['失败了？没关系再来一次！？', '除了实力还需要运气', '宇宙的熵越来越高了，降熵的速度都赶不上增熵了！', '运用你的智慧......'];
    GameConfig.nowTax = 0;
    GameConfig.taxConfig = [{
            row: 5,
            col: 5,
            checkType: 'uncommon',
            myScore: 1000
            // 最顶层放稀有星球 稀有星球需到底部
            //uncommon: 4 
        }, {
            row: 5,
            col: 5,
            checkType: 'uncommon',
            //uncommon: 4,
            // 从下到上 宇宙会黑掉，这个是黑掉的时间
            darkTime: 60,
            myScore: 2000
        }, {
            row: 6,
            checkType: 'uncommon',
            col: 6,
            myScore: 3000
        }, {
            row: 7,
            checkType: 'uncommon',
            col: 7,
            // 十字陷阱，必须把同等星球放到规定的地方，这个允许来回挪动
            matrix: [],
            myScore: 4000
        }, {
            row: 7,
            checkType: 'uncommon',
            col: 7,
            // 每隔五秒钟没消除操作就失败 允许来回挪动 如果没有能消除的就打乱
            matrix: [],
            myScore: 5000
        }, {
            row: 8,
            checkType: 'uncommon',
            col: 8,
            // 每隔五秒钟星球会随机变化
            matrix: [],
            myScore: 6000
        }, {
            row: 8,
            checkType: 'uncommon',
            col: 9,
            // 每隔五秒钟星球会随机变化
            matrix: [],
            myScore: 7000
        }, {
            row: 8,
            checkType: 'uncommon',
            col: 10,
            // 每隔五秒钟星球会随机变化
            matrix: [],
            myScore: 8000
        },];
    return GameConfig;
}());
__reflect(GameConfig.prototype, "GameConfig");
//# sourceMappingURL=GameConfig.js.map