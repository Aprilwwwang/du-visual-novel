/**
 * 《你是我藏在教案下的一场大雨》 — Galgame 剧本
 * 严格依据剧本结构文档 v1.0
 * 4条路线 · 15个选择点 · 5种结局 + EX场景
 */

const STORY_SCRIPT = [

  // ============================================================
  // 第一幕  序幕 ——「被看见的代价」
  // Scene 01-03
  // ============================================================

  // --- Scene 01: 序幕·论坛炸了 ---
  { type: 'label', name: 'scene_01' },
  { type: 'bg', value: 'classroom' },
  { type: 'narration', text: '全市的论坛每隔一阵子就会炸一次。这次炸得格外彻底。' },
  { type: 'narration', text: '有人扒了个小号的图贴到校园墙。照片没有露脸，只有一截白得发青的小腿，和一只搭在烟灰色校服上的、骨骼分明的手指。窗台上的纸页被风吹起来一角，像一片枯叶落在初雪上。' },
  { type: 'narration', text: '评论区第一条就失控了。"对不起，我走错了。""这真的是我们学校的？救命——""有没有一种可能……是某个男老师？"' },
  { type: 'narration', text: '因为有人扒出了拍摄地点——是高二教学楼四层的窗台。纸页上的字迹经过辨认，是一篇必读课文。消息传遍教学楼只用了一个课间。' },
  { type: 'char_show', pos: 'center', name: 'shen', mood: 'defensive' },
  { type: 'narration', text: '【马兆隆的内心独白】' },
  { type: 'thought', speaker: '马兆隆', text: '我坐在最后一排，装睡。' },
  { type: 'thought', speaker: '马兆隆', text: '前面那个戴眼镜的女生——叫裴听——刚刚回头看了我一眼。然后转过去跟同桌说了句话。我没听清。只看到她的嘴型。像是在说——"他知道了。"' },
  { type: 'narration', text: '我知道她说的是什么事。' },
  { type: 'narration', text: '论坛上的照片，我已经看到了。那个烟灰色的尘袋。那截小腿上的旧疤。那是我的。' },
  { type: 'thought', speaker: '马兆隆', text: '但我没有反应。我早就学会了。' },

  // --- Scene 02: 许诺 ---
  { type: 'transition', effect: 'fade' },
  { type: 'char_hide_all' },
  { type: 'char_show', pos: 'right', name: 'lu', mood: 'neutral' },
  { type: 'narration', text: 'Scene 02 · 许诺' },
  { type: 'narration', text: '语文课。课堂骚动了一阵才安静下来。许诺站在讲台上，白衬衫，第二颗扣子开着。' },
  { type: 'narration', text: '他今年二十六岁，全校最年轻的优秀教师。讲台上讲《离骚》原文，温和得像一泓静水。教导主任都说——"小陆这人，稳当。"' },
  { type: 'thought', speaker: '马兆隆', text: '我不知道为什么。我总觉得那个"稳当"是装出来的。当然，也可能是我想多了。' },
  { type: 'thought', speaker: '马兆隆', text: '我只是隐隐约约觉得——他在看我的时候，目光比看别人多停半秒。' },
  { type: 'narration', text: '那天放学后，我无意间经过教师公寓楼下。许诺蹲在花坛边，在捡一本被风吹散的备课本。他抬头看到我，愣了一下。就一下。然后笑了。' },
  { type: 'dialogue', speaker: '许诺', text: '"马兆隆？放学了怎么还不回去？"' },

  // --- Scene 03: 天台 ---
  { type: 'transition', effect: 'fade' },
  { type: 'bg', value: 'rooftop' },
  { type: 'char_hide_all' },
  { type: 'char_show', pos: 'center', name: 'shen', mood: 'defensive' },
  { type: 'narration', text: 'Scene 03 · 天台' },
  { type: 'narration', text: '天台。风很大。我躲在挡风墙后面，捏着一支没点燃的烟。其实我不抽烟。只是把没着落的情绪放在烟里，一吸一吐。"呼"的一声，就散了。' },
  { type: 'narration', text: '天台的门"吱呀"响了一声。我迅速把烟藏进口袋。' },
  { type: 'char_hide', pos: 'center' },
  { type: 'char_show', pos: 'right', name: 'lu', mood: 'neutral' },
  { type: 'narration', text: '——是许诺。不是保安。' },
  { type: 'dialogue', speaker: '许诺', text: '"你在这里做什么？"' },
  { type: 'char_show', pos: 'center', name: 'shen', mood: 'mocking' },
  { type: 'dialogue', speaker: '马兆隆', text: '"陆老师也来天台？"' },
  { type: 'narration', text: '他的目光在我脚下停了一秒。那一秒，我想起自己藏起来的烟头。' },
  { type: 'dialogue', speaker: '许诺', text: '"上课时间不在教室，按旷课处理。"' },
  { type: 'narration', text: '他转身要走。' },
  { type: 'dialogue', speaker: '马兆隆', text: '"陆老师。你上次讲《爱莲说》，说周敦颐写\'出淤泥而不染，濯清涟而不妖\'——是说君子即使处在不干净的环境里，也要保持高洁。可是陆老师，如果一个人，他自己就不干净呢？他还有资格当君子吗？"' },

  // ============ CHOICE C01 ============
  { type: 'label', name: 'choice_c01' },
  { type: 'choice', choices: [
    { text: '沉默。让这句话自己散掉。', jump: 'c01_silent',
      flag: 'self_awareness', value_add: 0 },
    { text: '"人生不是算术题，不是非对即错。回去吧。"', jump: 'c01_answer',
      flag: 'self_awareness', value_add: 2 },
    { text: '"你自己觉得呢？"（把问题扔回给他）', jump: 'c01_throwback',
      flag: 'self_awareness', value_add: 1 }
  ] },

  { type: 'label', name: 'c01_silent' },
  { type: 'narration', text: '他没有回答。' },
  { type: 'narration', text: '我看着他转过身，走向楼梯口。经过我身边的时候，肩头几乎擦过我的胳膊。一阵很淡的洗衣液的味道。然后他走了。' },
  { type: 'thought', speaker: '马兆隆', text: '他什么都没说。但那个沉默不是拒绝。是——他不知道该怎么回答。' },
  { type: 'jump', label: 'end_scene_03' },

  { type: 'label', name: 'c01_answer' },
  { type: 'dialogue', speaker: '许诺', text: '"人生不是算术题，不是非对即错。回去上课。"' },
  { type: 'narration', text: '他说完就走了。脚步不快不慢，皮鞋踩在水泥地上，一下一下，很稳。' },
  { type: 'jump', label: 'end_scene_03' },

  { type: 'label', name: 'c01_throwback' },
  { type: 'dialogue', speaker: '许诺', text: '"你自己觉得呢？"' },
  { type: 'narration', text: '他转过身来看我。那双眼睛很安静，没有标准答案，没有说教。他真的在等我想。' },
  { type: 'jump', label: 'end_scene_03' },

  { type: 'label', name: 'end_scene_03' },
  { type: 'char_hide_all' },

  // ============================================================
  // 第二幕  分叉 ——「笔记本、名片、选择题」
  // Scene 04, 05-K, 05-X
  // ============================================================

  // --- Scene 04: 发卷子 ---
  { type: 'transition', effect: 'fade' },
  { type: 'bg', value: 'classroom' },
  { type: 'label', name: 'scene_04' },
  { type: 'narration', text: 'Scene 04 · 发卷子' },
  { type: 'narration', text: '下课。数学卷子发下来了。我——马兆隆——考了19分。' },
  { type: 'thought', speaker: '马兆隆', text: '我知道自己最后一道大题没写完。倒数第二道也没写完。但有一道题的思路是对的——那个解法，比标准答案还短一半。老师没看出来。不重要了。' },
  { type: 'narration', text: '下课铃响了。裴听站起来收拾书包，经过我座位的时候，脚步放慢了一秒。她没看我，只是不动声色地把一本笔记推到我桌角。那个夹子夹得很紧，像是怕掉了，又像是怕被人发现。' },
  { type: 'thought', speaker: '马兆隆', text: '我认得那个笔记本。这几个星期，我的抽屉里经常多出一本笔记。从来没留过名字。' },

  // ============ CHOICE C02 — ROUTE FORK ============
  { type: 'label', name: 'choice_c02' },
  { type: 'choice', choices: [
    { text: '翻开笔记本，仔细看她的解题思路。',
      jump: 'route_k_start', flag: 'route', value: 'pei_ting' },
    { text: '放进抽屉，没有翻开。趴在桌上睡了。',
      jump: 'route_a_start', flag: 'route', value: 'lu_yan' },
    { text: '拿着笔记走到第二排，还给裴苑——上次她的咖啡洒在我桌上。',
      jump: 'route_x_start', flag: 'route', value: 'pei_yuan' }
  ] },

  // ============================================================
  // 路线 K：裴听路线
  // Scene 05-K
  // ============================================================
  { type: 'label', name: 'route_k_start' },
  { type: 'narration', text: '【裴听路线 · 笔记本的传递】' },
  { type: 'char_show', pos: 'left', name: 'pei_ting', mood: 'quiet' },
  { type: 'narration', text: '我翻开了笔记本。' },
  { type: 'narration', text: '裴听的字很工整。每一个公式都标了来源，每一步推导都附了注释。她甚至把我上次在课堂上随口提的那个解法也写进去了——用红笔圈了三个字："马兆隆法。"' },
  { type: 'thought', speaker: '马兆隆', text: '她是第一个认真对待我那些"歪门邪道"的人。' },

  // Scene 05-K
  { type: 'transition', effect: 'fade' },
  { type: 'bg', value: 'classroom' },
  { type: 'label', name: 'scene_05k' },
  { type: 'narration', text: 'Scene 05-K · 笔记本上的对话' },
  { type: 'narration', text: '第二天，笔记本回到了我桌上。她在空白处用铅笔写了问题——那道题的第三步为什么可以跳过？我用钢笔写了回答。' },
  { type: 'narration', text: '第三天——笔记本又回来了。这次多了一张便利贴。' },
  { type: 'dialogue', speaker: '便利贴', text: '"你不是学不会。你只是没人好好教。"' },

  // ============ CHOICE C03-K ============
  { type: 'label', name: 'choice_c03k' },
  { type: 'choice', choices: [
    { text: '在笔记本上写："为什么帮我？"',
      jump: 'k_ask_why', flag: 'pei_ting_score', value: 80 },
    { text: '什么都没写。只在笔记本扉页画了一颗星星。',
      jump: 'k_star', flag: 'pei_ting_score', value: 50 }
  ] },

  { type: 'label', name: 'k_ask_why' },
  { type: 'narration', text: '次日。笔记本回来了。她在我那句"为什么帮我"下面，用很小的字写：' },
  { type: 'dialogue', speaker: '裴听', text: '"因为上次月考——你教我的那个解法，全班只有你一个人想到了。"' },
  { type: 'thought', speaker: '马兆隆', text: '她在看。她一直在看。不只是看成绩单——她在看我的思路。' },
  { type: 'jump', label: 'k_continue' },

  { type: 'label', name: 'k_star' },
  { type: 'narration', text: '笔记本第二天回来了。那颗星星旁边，她画了一颗更小的星星。像是某种心照不宣的信号。' },
  { type: 'thought', speaker: '马兆隆', text: '我们什么都没说。但笔记本每天都在传。那些公式和批注，比任何语言都诚实。' },

  { type: 'label', name: 'k_continue' },
  { type: 'narration', text: '后来笔记本传了几十次。她开始在上面留生活里的小事——"今天食堂的红豆包很好吃""晚自习窗外有猫在叫"。我在旁边画一只猫。她回画一只更胖的。' },
  { type: 'narration', text: '然后有一天——笔记本的最后一页写了一行字：' },
  { type: 'dialogue', speaker: '裴听', text: '"下学期，我不会再给你传笔记了。因为——你已经不需要了。"' },
  { type: 'narration', text: '后面夹着一片压干了的银杏叶。叶脉上用小字写了一个QQ号。' },
  { type: 'jump', label: 'act3_merge' },

  // ============================================================
  // 路线 X：裴苑路线
  // Scene 05-X
  // ============================================================
  { type: 'label', name: 'route_x_start' },
  { type: 'narration', text: '【裴苑路线 · 律师名片】' },
  { type: 'char_show', pos: 'right', name: 'pei_yuan', mood: 'neutral' },
  { type: 'narration', text: '我把笔记本拿到第二排。"裴苑。上次你咖啡洒我桌上，这本笔记本是你落下的。"' },
  { type: 'narration', text: '她抬头看我。没有表情。然后低头看了一眼笔记本。' },
  { type: 'dialogue', speaker: '裴苑', text: '"不是我的。"' },
  { type: 'thought', speaker: '马兆隆', text: '但她的手顿了一下。她认出那个笔记本了——只是没想到我会主动走过来。' },

  { type: 'transition', effect: 'fade' },
  { type: 'bg', value: 'campus' },
  { type: 'label', name: 'scene_05x' },
  { type: 'narration', text: 'Scene 05-X · 操场的对话' },
  { type: 'narration', text: '体育课自由活动。裴苑找到我。她很少主动跟人说话。' },
  { type: 'dialogue', speaker: '裴苑', text: '"上次照片的事，不是我干的。传播的人我大致知道是谁。我家里有法律顾问——那些截图涉及未成年人隐私泄露，发布者和传播者都涉嫌违法。"' },
  { type: 'narration', text: '她从口袋里掏出一张名片。放在两人之间的座位上。' },
  { type: 'dialogue', speaker: '裴苑', text: '"如果你需要，他会帮你。不需要任何费用。"' },

  // ============ CHOICE C03-X ============
  { type: 'label', name: 'choice_c03x' },
  { type: 'choice', choices: [
    { text: '"谢谢。不需要。"（把名片放回她桌上）',
      jump: 'x_refuse', flag: 'pei_yuan_card', value: 'decline' },
    { text: '沉默地把名片收进口袋。什么也没说。',
      jump: 'x_accept', flag: 'pei_yuan_card', value: 'accept' }
  ] },

  { type: 'label', name: 'x_refuse' },
  { type: 'narration', text: '裴苑看了我一眼。没说话。把名片收回去了。' },
  { type: 'narration', text: '我以为这件事就这么过了。但后来我才知道——她还是找了那个律师。以她自己的名义。' },
  { type: 'flag_set', flag: 'pei_yuan_triggered', value: true },
  { type: 'jump', label: 'x_continue' },

  { type: 'label', name: 'x_accept' },
  { type: 'narration', text: '我什么都没说。只是把名片折好，放进校服内袋里。' },
  { type: 'dialogue', speaker: '裴苑', text: '"你不想问我为什么？"' },
  { type: 'dialogue', speaker: '马兆隆', text: '"你自己会说。"' },
  { type: 'narration', text: '她愣了一下。然后嘴角动了一下——不是笑，是某种认可。' },
  { type: 'flag_set', flag: 'pei_yuan_triggered', value: true },

  { type: 'label', name: 'x_continue' },
  { type: 'narration', text: '后来裴海生被举报了。一封匿名信寄到了市场监管局。证据链很全——包括他非法倒卖处方药的聊天记录、转账截图。' },
  { type: 'narration', text: '署名栏是空的。但我认得那张证据清单的排版——和裴苑名片上那个律所的格式，一模一样。' },
  { type: 'jump', label: 'act3_merge' },

  // ============================================================
  // 路线 A：许诺路线（自渡）
  // Scenes 06, 07, 08
  // ============================================================
  { type: 'label', name: 'route_a_start' },
  { type: 'narration', text: '【自渡路线 · 河堤】' },
  { type: 'narration', text: '我没有翻开笔记本。也没有去找裴苑。我只是趴在桌上，闭上眼睛。' },
  { type: 'thought', speaker: '马兆隆', text: '不是不感激。是太累了。感激也需要力气。' },

  // --- Scene 06: 河堤 ---
  { type: 'transition', effect: 'fade' },
  { type: 'bg', value: 'riverbank' },
  { type: 'rain_start' },
  { type: 'label', name: 'scene_06' },
  { type: 'narration', text: 'Scene 06 · 河堤' },
  { type: 'narration', text: '那天晚上。学校后门外有一条河。十月的夜风冷得像刀子。我坐在河堤的台阶上，膝盖抵着下巴，把自己团成很小的一团。' },
  { type: 'narration', text: '手机里是裴海生发来的消息。他在问我——要不要仿制药。便宜很多。我没回。' },
  { type: 'narration', text: '然后我听到了脚步声。皮鞋踩在石板路上。不疾不徐。像是走了很久，又像是在犹豫。' },
  { type: 'char_show', pos: 'right', name: 'lu', mood: 'concerned' },
  { type: 'narration', text: '路灯的光打在他的白衬衫上。' },
  { type: 'dialogue', speaker: '许诺', text: '"你怎么在这里？"' },
  { type: 'dialogue', speaker: '马兆隆', text: '"陆老师住教师公寓。散步散到河堤？"' },
  { type: 'narration', text: '他沉默了一会儿。在我旁边的台阶上坐下来。一个人的距离。不多不少。' },
  { type: 'dialogue', speaker: '许诺', text: '"论坛的事，我跟年级组说了。你不必跟任何人解释。"' },

  // ============ CHOICE C04 ============
  { type: 'label', name: 'choice_c04' },
  { type: 'choice', choices: [
    { text: '把那盒牛奶喝了。',
      jump: 'c04_drink', flag: 'lu_token', value_add: 1 },
    { text: '"陆老师。你不必管我。"',
      jump: 'c04_push_away', flag: 'lu_token', value_add: 1 },
    { text: '"……谢谢。"',
      jump: 'c04_thanks', flag: 'lu_token', value_add: 1 }
  ] },

  { type: 'label', name: 'c04_drink' },
  { type: 'narration', text: '我拿起那盒牛奶。草莓味的。温的。插上吸管，喝了一口。甜的。喉咙里堵了什么东西。但我没让它出来。' },
  { type: 'narration', text: '许诺没有看我。他看着对岸的灯火。但我感觉到——他在等我喝完。' },
  { type: 'jump', label: 'c04_merge' },

  { type: 'label', name: 'c04_push_away' },
  // This choice triggers 许诺 inner monologue reveal
  { type: 'flag_set', flag: 'lu_inner_triggered', value: true },
  { type: 'dialogue', speaker: '马兆隆', text: '"陆老师。你不必管我。"' },
  { type: 'narration', text: '许诺转过头来看我。' },
  { type: 'dialogue', speaker: '许诺', text: '"我不是在管你。"' },
  { type: 'narration', text: '他顿了一下。' },
  { type: 'dialogue', speaker: '许诺', text: '"我只是——正好有盒牛奶。正好你在这里。"' },
  { type: 'narration', text: '他撒谎。我们俩都知道他在撒谎。但那个谎——太温柔了。' },
  { type: 'jump', label: 'c04_merge' },

  { type: 'label', name: 'c04_thanks' },
  { type: 'dialogue', speaker: '马兆隆', text: '"……谢谢。"' },
  { type: 'narration', text: '我说得很轻。他可能没听见。但他把牛奶往我这边推近了一点。这个动作太轻了，轻到像是无意。但我知道是有意的。' },
  { type: 'jump', label: 'c04_merge' },

  { type: 'label', name: 'c04_merge' },
  { type: 'rain_stop' },
  { type: 'char_hide_all' },
  { type: 'narration', text: '他起身走了。皮鞋声越来越远。我握着那盒温热的草莓牛奶，掌心被捂得很烫。' },
  { type: 'narration', text: '很多年之后我想起这个夜晚，想起他说的话——"你不必跟任何人解释。"他不只是在说论坛的事。他是在说——你的一切。' },

  // --- Scene 07: 许诺的房间 ---
  { type: 'transition', effect: 'fade' },
  { type: 'bg', value: 'night' },
  { type: 'label', name: 'scene_07' },
  { type: 'narration', text: 'Scene 07 · 许诺的房间' },
  { type: 'narration', text: '【系统提示：以下画面来自许诺的视角。马兆隆不知道这些。但在这条路线中——这些画面会以回忆的形式，在很久以后被你知晓。】' },
  { type: 'narration', text: '那是同一天晚上。许诺回到公寓，在黑暗里坐了二十分钟。' },
  { type: 'narration', text: '他跟自己承认了。他去河堤，不是因为散步。他在教室里看到马兆隆没有去吃晚饭。他在食堂门口站了五分钟，买了一盒草莓牛奶。然后穿过操场，出了后门。' },
  { type: 'narration', text: '他在河堤上看到马兆隆缩成一团的时候，心脏停了一拍。那一瞬间什么都没想，只想走过去。走到很近很近。' },

  { type: 'narration', text: '——后来宋知远问他："你碰过他没有？"' },
  { type: 'thought', speaker: '许诺', text: '"没有。什么都没有。"' },
  { type: 'narration', text: '但他又说——' },
  { type: 'thought', speaker: '许诺', text: '"我每天想。控制不住地想。"' },

  { type: 'narration', text: '那天晚上。许诺走进卫生间。水龙头开着。灰蓝色的尘袋被冲得湿透了。他把它装进黑色塑料袋，扎紧。扔进楼下的垃圾桶。' },
  { type: 'narration', text: '回房间之后，他在床头坐了很久。感觉自己被抽空了。' },
  { type: 'narration', text: '他把那个东西扔了。扔掉的不是尘袋。是他自己伸出去的那只手。' },
  { type: 'narration', text: '宋知远说："那就有救。你还知道让自己别过去——说明你还站在悬崖的这边。"' },
  { type: 'narration', text: '"我教你一件事——把你偷的东西还回去。还给那个孩子。还给他光。"' },

  // --- Scene 08: 沫沫支线 ---
  { type: 'transition', effect: 'fade' },
  { type: 'bg', value: 'campus' },
  { type: 'label', name: 'scene_08' },
  { type: 'narration', text: 'Scene 08 · 沫沫支线' },
  { type: 'narration', text: '那天放学后，我在走廊尽头撞见一个人。沫沫——班上最张扬的那个女生。她蹲在窗台下，哭。' },
  { type: 'dialogue', speaker: '沫沫', text: '"走开。"' },
  { type: 'thought', speaker: '马兆隆', text: '我本来想走。但她的校服袖子卷起来了。手腕上有几条很浅的红印。我认得那些印子。' },

  // ============ CHOICE C05 ============
  { type: 'label', name: 'choice_c05' },
  { type: 'choice', choices: [
    { text: '转身走开。', jump: 'c05_leave' },
    { text: '"你在哭什么？"', jump: 'c05_ask' },
    { text: '"有什么话，找校长说。摆这副样子给谁看。"', jump: 'c05_harsh' }
  ] },

  { type: 'label', name: 'c05_leave' },
  { type: 'narration', text: '我转身走了。有些事情，不是我的事。' },
  { type: 'narration', text: '但走到楼梯口的时候，我听到她站起来的声音。吸鼻子的声音。然后脚步声往反方向去了。' },
  { type: 'jump', label: 'scene_08_end' },

  { type: 'label', name: 'c05_ask' },
  { type: 'narration', text: '沫沫抬起头看我。眼眶红了一圈，但没哭出声。她在忍。' },
  { type: 'dialogue', speaker: '沫沫', text: '"你知道为什么——我之前要跟别人说马兆隆的事吗？因为不把矛头指向别人，别人就会指向我。在这个学校里，弱者只有一个位置。"' },
  { type: 'narration', text: '我看着她。然后说：' },
  { type: 'dialogue', speaker: '马兆隆', text: '"那个位置不好坐。我知道。"' },
  { type: 'narration', text: '她愣了很久。然后说了一句——' },
  { type: 'dialogue', speaker: '沫沫', text: '"对不起。"' },
  { type: 'jump', label: 'scene_08_end' },

  { type: 'label', name: 'c05_harsh' },
  { type: 'dialogue', speaker: '马兆隆', text: '"有什么话，找校长说。摆这副样子给谁看。"' },
  { type: 'narration', text: '沫沫猛地抬头。她的眼神很复杂——被刺到了，但也不完全是愤怒。' },
  { type: 'dialogue', speaker: '沫沫', text: '"你以为你是谁？你以为你熬过来了，就比我了不起？"' },
  { type: 'narration', text: '我看着她。然后笑了。不是嘲笑。是理解。' },
  { type: 'dialogue', speaker: '马兆隆', text: '"我没熬过来。我只是站起来了。你也能。"' },
  { type: 'narration', text: '她没说话。但那天以后——她没再参与过任何关于我的八卦。' },

  { type: 'label', name: 'scene_08_end' },
  { type: 'narration', text: '后来沫沫转学了。走之前给我发了一条私信。只有四个字。' },
  { type: 'dialogue', speaker: '沫沫', text: '"谢谢你，马兆隆。"' },
  { type: 'narration', text: '我没有回。但那条私信，我一直没删。' },
  { type: 'char_hide_all' },

  // --- 自渡路线: 发送照片选择 (Bad End gate) ---
  { type: 'transition', effect: 'fade' },
  { type: 'bg', value: 'night' },
  { type: 'label', name: 'scene_photo_choice' },
  { type: 'narration', text: '那天晚上。手机屏幕亮着。那个社交账号的私信还在闪。' },
  { type: 'narration', text: '"再发一张。""你上次那张真的好看。""给你钱。"' },
  { type: 'narration', text: '我看着自己的手机屏幕。那个灰蓝色的尘袋。那截小腿上的旧疤。' },
  { type: 'narration', text: '然后我想起那盒草莓牛奶。想起他说的——"你的世界比你以为的要好得多。"' },

  // ============ CHOICE: 发送照片? ============
  { type: 'label', name: 'choice_send_photo' },
  { type: 'choice', choices: [
    { text: '退出私信页面。把聊天记录全删了。', jump: 'photo_no' },
    { text: '按下发送键。', jump: 'photo_yes', flag: 'sent_photo', value: true }
  ] },

  { type: 'label', name: 'photo_no' },
  { type: 'flag_set', flag: 'self_awareness', value_add: 2 },
  { type: 'narration', text: '我退出私信页面。把那些聊天记录全删了。' },
  { type: 'narration', text: '手机屏幕暗了。我仰头靠在椅子上。天花板上的灯管嗡嗡响。' },
  { type: 'narration', text: '然后我穿上外套。去食堂。今天的晚饭是青椒肉丝。我吃了两份。' },
  { type: 'jump', label: 'act3_merge' },

  { type: 'label', name: 'photo_yes' },
  { type: 'narration', text: '我按了发送键。' },
  { type: 'narration', text: '照片被转发了无数次。私信涌进来——好奇的、污秽的、猎奇的。我盯着那些数字看了很久。没有感觉。' },
  { type: 'narration', text: '退出手机屏幕。窗外是灰蓝色的天空。像一件洗了太多次的旧衬衫。' },
  { type: 'jump', label: 'act3_merge' },

  // ============================================================
  // 第三幕  Act 3 Merge Point — Scene 09: 最后一课
  // ============================================================
  { type: 'label', name: 'act3_merge' },
  { type: 'transition', effect: 'fade' },
  { type: 'bg', value: 'classroom' },
  { type: 'char_hide_all' },
  { type: 'narration', text: '第三幕 · 最后一课' },

  { type: 'label', name: 'scene_09' },
  { type: 'narration', text: 'Scene 09 · 最后一课' },
  { type: 'narration', text: '学期最后一节语文课。许诺在黑板上写了一个学期的知识梳理。下课前五分钟，他放下粉笔。' },
  { type: 'dialogue', speaker: '许诺', text: '"这学期的课就到这里。下学期——会有一位新老师来接我的课。"' },
  { type: 'narration', text: '教室安静了一瞬。然后炸开了。"陆老师你要调走？""为什么？"' },
  { type: 'dialogue', speaker: '许诺', text: '"是教学安排上的调整。新老师也很优秀。"' },
  { type: 'narration', text: '我坐在最后一排。没说话。只是看着他。' },
  { type: 'narration', text: '下课铃响了。他拿起教案，走过我的座位。脚步没停。但他放在我桌上的那一页作文纸——最后一页——留了批注。' },
  { type: 'dialogue', speaker: '批注', text: '"你的世界——比你以为的要好得多。加油。"' },
  { type: 'narration', text: '没有署名。只有一个蓝色的对勾。' },

  // ============ CHOICE C06 ============
  { type: 'label', name: 'choice_c06' },
  { type: 'choice', choices: [
    { text: '把那一页撕下来，带走。', jump: 'c06_tear', flag: 'c06_choice', value: 'tear' },
    { text: '用手指描了一遍那些字，然后把本子合上。', jump: 'c06_trace', flag: 'c06_choice', value: 'trace' },
    { text: '拍了一张照片，然后把那页纸放回讲台上。', jump: 'c06_photo', flag: 'c06_choice', value: 'photo' }
  ] },

  { type: 'label', name: 'c06_tear' },
  { type: 'narration', text: '我把那一页撕下来了。折得很小。放进了校服内袋里。那个口袋，装过很多重要的东西。' },
  { type: 'jump', label: 'ending_dispatch' },

  { type: 'label', name: 'c06_trace' },
  { type: 'narration', text: '我没有撕。只是用手指描了一遍那些字。从"你的世界"到"加油"。指腹能感觉到纸的粗糙——那些笔迹有凹痕。他写字很用力。' },
  { type: 'jump', label: 'ending_dispatch' },

  { type: 'label', name: 'c06_photo' },
  { type: 'narration', text: '我拍了一张照片。然后把本子放回讲台上——留给下一个人发现。' },
  { type: 'narration', text: '很多年后，这张照片还躺在我的手机相册里。一个蓝色的对勾。没有署名。不需要署名。' },
  { type: 'jump', label: 'ending_dispatch' },

  // ============================================================
  // 结局分发 — 严格按照文档条件
  // ============================================================
  { type: 'label', name: 'ending_dispatch' },

  // Check: sent_photo with low self_awareness → Bad End
  { type: 'flag_check', flag: 'sent_photo', branches: [
    { value: true, label: 'check_bad_end_cond' }
  ], default: 'dispatch_by_route' },

  { type: 'label', name: 'check_bad_end_cond' },
  { type: 'flag_check', flag: 'self_awareness', branches: [
    { value: 0, label: 'ending_d' }
  ], default: 'dispatch_by_route' },

  // Route dispatch
  { type: 'label', name: 'dispatch_by_route' },
  { type: 'flag_check', flag: 'route', branches: [
    { value: 'pei_ting', label: 'ending_b_dispatch' },
    { value: 'pei_yuan', label: 'ending_c1' },
    { value: 'lu_yan', label: 'ending_a_dispatch' }
  ], default: 'scene_09' },

  // Route A: 自渡路线
  { type: 'label', name: 'ending_a_dispatch' },
  { type: 'flag_check', flag: 'self_awareness', branches: [
    { value: 0, label: 'ending_d' }
  ], default: 'ending_a1' },

  // Route B: 裴听路线
  { type: 'label', name: 'ending_b_dispatch' },
  { type: 'flag_check', flag: 'pei_ting_score', branches: [
    { value: 80, label: 'ending_b1' }
  ], default: 'ending_b2' },

  // ============================================================
  // ENDING A1: True End「我的世界不止一种颜色了」
  // 条件: 自渡路线 + 自知值 ≥ 1 + 未发送照片
  // ============================================================
  { type: 'label', name: 'ending_a1' },
  { type: 'transition', effect: 'fade' },
  { type: 'bg', value: 'campus' },
  { type: 'char_show', pos: 'center', name: 'shen', mood: 'softened' },
  { type: 'narration', text: '【True End · 我的世界不止一种颜色了】' },
  { type: 'narration', text: '很多年以后。马兆隆考上了大学。一所著名的重点大学。全省前百分之五。' },
  { type: 'narration', text: '母亲转到了一家省级医院，用上了医保目录里的新药。继父没再出现。裴海生被举报涉嫌非法经营——有人匿名给市场监管局写了一封信，附上了证据。' },
  { type: 'narration', text: '马兆隆知道那封信是谁写的。从来没去验证。' },
  { type: 'narration', text: '他后来寄了一张照片。没有署名，没有地址。信封上只写了"许诺收"。照片背面只有一行字——' },
  { type: 'dialogue', speaker: '马兆隆', text: '"陆老师。我的世界——不止一种颜色了。"' },
  { type: 'narration', text: '许诺在支教的山村小学收到了这张照片。他看了很久。很久很久。然后他把照片夹进那本语文教材里——《归去来兮辞》那一页的旁边。' },
  { type: 'narration', text: '窗外是远山。他笑了一下。' },
  { type: 'narration', text: '像是被渡过了一条很长很长的河。' },
  { type: 'narration', text: '—— 你是我藏在教案下的一场大雨 ——' },
  { type: 'ending', ending: 'true' },

  // ============================================================
  // ENDING B1: 裴听路线 Good End「笔记本上的春天」
  // 条件: 裴听路线 + C03-K选A(问"为什么") + 裴听积累值≥80
  // ============================================================
  { type: 'label', name: 'ending_b1' },
  { type: 'transition', effect: 'fade' },
  { type: 'bg', value: 'campus' },
  { type: 'char_show', pos: 'left', name: 'pei_ting', mood: 'gentle' },
  { type: 'narration', text: '【裴听路线 Good End · 笔记本上的春天】' },
  { type: 'narration', text: '开学了。新学期。裴听把最后一本笔记放在马兆隆桌上。跟以前一样——夹子夹着，标签贴着，红笔和黑笔。' },
  { type: 'narration', text: '但最后一页写的不再是数学题。' },
  { type: 'dialogue', speaker: '裴听的字', text: '"这学期——你不需要我的笔记了。因为你已经会了。"' },
  { type: 'narration', text: '笔记本里夹着一样东西——一片压平了的银杏叶。叶脉上用针尖刻了一个小小的手机号。没有名字。也不需要名字。' },
  { type: 'narration', text: '马兆隆把那片叶子举在阳光下看了很久。半透明的。叶脉的纹路像一条河。' },
  { type: 'narration', text: '他没有打那个电话——至少那个学期没有。但他把那片叶子收好了。很多年之后还收着。' },
  { type: 'narration', text: '—— 有些感情不需要被说破。笔记本上的那些字，已经说完了所有能说的话。 ——' },
  { type: 'ending', ending: 'good' },

  // ============================================================
  // ENDING B2: 裴听路线 Normal End「渡口」
  // 条件: 裴听路线 + C03-K选B(画星星)
  // ============================================================
  { type: 'label', name: 'ending_b2' },
  { type: 'transition', effect: 'fade' },
  { type: 'bg', value: 'campus' },
  { type: 'narration', text: '【裴听路线 Normal End · 渡口】' },
  { type: 'narration', text: '分班考试过后，裴听去了不同的班。笔记本被分到了别的楼层。他们见面的次数越来越少。' },
  { type: 'narration', text: '但她留下的那些知识点——马兆隆都会了。他期末数学考了87分。' },
  { type: 'narration', text: '高考结束后。他发了一条朋友圈——没有文字，只有一张刚拍的天空。一个没有名字的账号点了赞。头像是一只戴圆眼镜的小狗。' },
  { type: 'narration', text: '他知道那是谁。她也会一直往前走。' },
  { type: 'narration', text: '—— 有些相遇不是结果，是转折。一本笔记本，就够了。 ——' },
  { type: 'ending', ending: 'good' },

  // ============================================================
  // ENDING C1: 裴苑路线「末班火车」
  // 条件: 裴苑路线 + 触发裴苑支线事件
  // ============================================================
  { type: 'label', name: 'ending_c1' },
  { type: 'transition', effect: 'fade' },
  { type: 'bg', value: 'campus' },
  { type: 'char_show', pos: 'right', name: 'pei_yuan', mood: 'softened' },
  { type: 'narration', text: '【裴苑路线 End · 末班火车】' },
  { type: 'narration', text: '裴海生终究被调查了。裴苑没有亲口告诉马兆隆——是他自己查到的。市场监管局的案卷里，举报信的格式和裴苑那个律所一模一样。' },
  { type: 'narration', text: '毕业前他找到她。' },
  { type: 'dialogue', speaker: '马兆隆', text: '"为什么？"' },
  { type: 'dialogue', speaker: '裴苑', text: '"因为那个时候——你收下了名片。你本可以不收的。"' },
  { type: 'narration', text: '她后来去了法国留学。在车站送别的时候，她说了一句话。' },
  { type: 'dialogue', speaker: '裴苑', text: '"你不知道为什么在车站说这些。你不知道——有些人让你觉得这个世界不是全坏的。你是我见过第一个——受了那么多罪、还能站着把话说清楚的人。"' },
  { type: 'narration', text: '火车开了。她隔着车窗看了他一眼。那个眼神很安静。' },
  { type: 'narration', text: '—— 有些人的温暖不是火，是末班火车。它不会专门等你，但你赶上了。 ——' },
  { type: 'ending', ending: 'good' },

  // ============================================================
  // ENDING D: Bad End「一张删不掉的照片」
  // 条件: 自渡路线 + 发送照片 + 自知值 < 3(即自知值=0)
  // ============================================================
  { type: 'label', name: 'ending_d' },
  { type: 'transition', effect: 'fade' },
  { type: 'bg', value: 'night' },
  { type: 'rain_start' },
  { type: 'narration', text: '【Bad End · 一张删不掉的照片】' },
  { type: 'narration', text: '照片被转发了无数次。私信涌进来——好奇的、污秽的、猎奇的。他盯着那些数字看了很久。没有感觉。' },
  { type: 'narration', text: '退出手机屏幕。窗外是灰蓝色的天空。像一件洗了太多次的旧衬衫。' },
  { type: 'narration', text: '他本来也可以被好好对待的。' },
  { type: 'narration', text: '' },
  { type: 'narration', text: '—— 系统提示 ——' },
  { type: 'narration', text: '这不是结局。这是选择的重量。' },
  { type: 'narration', text: '那个对你说"这个世界不止一种颜色"的人，还站在原处。' },
  { type: 'narration', text: '你可以回到关键节点，为马兆隆选择另一条路。' },
  { type: 'choice', choices: [
    { text: '回到分叉点（Scene 04）重新选择路线', jump: 'scene_04' },
    { text: '回到天台（Scene 03）重新选择', jump: 'choice_c01' },
    { text: '回到标题画面', jump: 'scene_01' }
  ] },

  // ============================================================
  // EX 场景
  // ============================================================

  // --- EX-01: 许诺的梦 ---
  { type: 'label', name: 'ex01' },
  { type: 'bg', value: 'riverbank' },
  { type: 'narration', text: '【EXTRA · 许诺的梦】' },
  { type: 'narration', text: '那是一个很短的梦。' },
  { type: 'narration', text: '梦里没有声音。只有马兆隆在河堤上喝草莓牛奶的样子。他喝得很慢。眼睛里有光。' },
  { type: 'narration', text: '很好的光。很安静的光。' },
  { type: 'narration', text: '他只是喝牛奶。什么都没有发生。' },
  { type: 'narration', text: '许诺醒来的时候，心脏撞得胸腔生疼。他在黑暗中坐了很久。然后说了一句话——只有他自己听见。' },
  { type: 'narration', text: '"我知道那是夏天的事。没有夏天了。只有我自己知道。"' },
  { type: 'narration', text: '然后他起床。洗干净脸。拿出柜子里第二件扣好的衬衫。走进教室。' },
  { type: 'narration', text: '【许诺的梦 · 完】' },

  // --- EX-02: 继父离开的那天 ---
  { type: 'label', name: 'ex02' },
  { type: 'bg', value: 'hospital' },
  { type: 'narration', text: '【EXTRA · 继父离开的那天】' },
  { type: 'narration', text: '家里的电视机在原位开着。继父已经很久没回来了。' },
  { type: 'narration', text: '母亲在厨房里洗碗。背对着他。' },
  { type: 'dialogue', speaker: '马兆隆', text: '"妈。"' },
  { type: 'dialogue', speaker: '母亲', text: '"嗯。"' },
  { type: 'dialogue', speaker: '马兆隆', text: '"药吃了吗。"' },
  { type: 'dialogue', speaker: '母亲', text: '"吃了。"' },
  { type: 'narration', text: '她转过身。从围裙兜里掏出一沓钱。皱的。' },
  { type: 'dialogue', speaker: '母亲', text: '"生活费。去买药。去上个月那个药房。便宜。"' },
  { type: 'narration', text: '马兆隆接过钱。她没抬头。但手停了一下。' },
  { type: 'dialogue', speaker: '母亲', text: '"以后就我们俩了。"' },
  { type: 'narration', text: '他没有问。母亲也没有解释。继父不会再来了。他们都选择不说破。' },
  { type: 'narration', text: '这是他们之间唯一一件没有戳破的东西。' },
  { type: 'narration', text: '【继父离开的那天 · 完】' },

  // ============================================================
  { type: 'label', name: 'end' },
  { type: 'ending', ending: 'default' }
];

window.STORY_SCRIPT = STORY_SCRIPT;
