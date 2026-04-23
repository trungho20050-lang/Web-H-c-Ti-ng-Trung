// ============================================================
// HSK2_DATA.JS – 150 từ vựng HSK 2 chuẩn (phiên bản cũ 6 cấp)
// Nguồn: Giáo trình HSK chuẩn quốc tế
// ============================================================

const _default_HSK2_VOCABULARY = [
  // Đại từ / Từ hỏi
  { id: 1,  hanzi: "那",    pinyin: "nà",       meaning: "kia, đó",               type: "đại từ",    example: "那是什么？ - Đó là cái gì?" },
  { id: 2,  hanzi: "这",    pinyin: "zhè",      meaning: "này, đây",              type: "đại từ",    example: "这是我的书。 - Đây là sách của tôi." },
  { id: 3,  hanzi: "自己",  pinyin: "zìjǐ",     meaning: "bản thân, tự mình",     type: "đại từ",    example: "自己做。 - Tự mình làm." },
  { id: 4,  hanzi: "为什么",pinyin: "wèishénme",meaning: "tại sao, vì sao",       type: "từ hỏi",    example: "你为什么哭？ - Bạn tại sao khóc?" },
  { id: 5,  hanzi: "怎么",  pinyin: "zěnme",    meaning: "như thế nào, làm sao",  type: "từ hỏi",    example: "这个怎么做？ - Cái này làm thế nào?" },

  // Thời gian
  { id: 6,  hanzi: "以前",  pinyin: "yǐqián",   meaning: "trước đây, trước kia",  type: "thời gian", example: "以前我住在北京。 - Trước đây tôi sống ở Bắc Kinh." },
  { id: 7,  hanzi: "以后",  pinyin: "yǐhòu",    meaning: "sau này, sau đó",       type: "thời gian", example: "以后再说。 - Để sau nói." },
  { id: 8,  hanzi: "的时候",pinyin: "de shíhou",meaning: "khi, lúc",              type: "thời gian", example: "吃饭的时候。 - Lúc ăn cơm." },
  { id: 9,  hanzi: "刚才",  pinyin: "gāngcái",  meaning: "vừa rồi, mới đây",     type: "thời gian", example: "刚才他来了。 - Vừa rồi anh ấy đến." },
  { id: 10, hanzi: "已经",  pinyin: "yǐjīng",   meaning: "đã, rồi",               type: "phó từ",    example: "我已经吃了。 - Tôi đã ăn rồi." },
  { id: 11, hanzi: "还",    pinyin: "hái",      meaning: "vẫn còn, nữa",          type: "phó từ",    example: "还有吗？ - Còn nữa không?" },
  { id: 12, hanzi: "就",    pinyin: "jiù",      meaning: "liền, ngay, thì",       type: "phó từ",    example: "我就来。 - Tôi đến ngay." },
  { id: 13, hanzi: "快",    pinyin: "kuài",     meaning: "nhanh, mau",            type: "tính từ",   example: "快一点！ - Nhanh lên!" },
  { id: 14, hanzi: "慢",    pinyin: "màn",      meaning: "chậm",                  type: "tính từ",   example: "走得很慢。 - Đi rất chậm." },
  { id: 15, hanzi: "早",    pinyin: "zǎo",      meaning: "sớm, buổi sáng",        type: "tính từ",   example: "你来得很早。 - Bạn đến rất sớm." },

  // Gia đình & Con người
  { id: 16, hanzi: "丈夫",  pinyin: "zhàngfu",  meaning: "chồng",                 type: "danh từ",   example: "她的丈夫很帅。 - Chồng cô ấy rất đẹp trai." },
  { id: 17, hanzi: "妻子",  pinyin: "qīzi",     meaning: "vợ",                    type: "danh từ",   example: "我的妻子是老师。 - Vợ tôi là giáo viên." },
  { id: 18, hanzi: "孩子",  pinyin: "háizi",    meaning: "trẻ em, con cái",       type: "danh từ",   example: "孩子们喜欢玩。 - Trẻ em thích chơi." },
  { id: 19, hanzi: "哥哥",  pinyin: "gēge",     meaning: "anh trai",              type: "danh từ",   example: "我哥哥很高。 - Anh trai tôi rất cao." },
  { id: 20, hanzi: "姐姐",  pinyin: "jiějie",   meaning: "chị gái",               type: "danh từ",   example: "姐姐在家。 - Chị gái ở nhà." },
  { id: 21, hanzi: "弟弟",  pinyin: "dìdi",     meaning: "em trai",               type: "danh từ",   example: "弟弟很可爱。 - Em trai rất dễ thương." },
  { id: 22, hanzi: "妹妹",  pinyin: "mèimei",   meaning: "em gái",                type: "danh từ",   example: "妹妹喜欢唱歌。 - Em gái thích hát." },
  { id: 23, hanzi: "男人",  pinyin: "nánrén",   meaning: "đàn ông",               type: "danh từ",   example: "那个男人是谁？ - Người đàn ông đó là ai?" },
  { id: 24, hanzi: "女人",  pinyin: "nǚrén",    meaning: "phụ nữ",                type: "danh từ",   example: "那个女人很漂亮。 - Người phụ nữ đó rất đẹp." },
  { id: 25, hanzi: "男孩",  pinyin: "nánhái",   meaning: "bé trai",               type: "danh từ",   example: "那个男孩很聪明。 - Cậu bé đó rất thông minh." },
  { id: 26, hanzi: "女孩",  pinyin: "nǚhái",    meaning: "bé gái",                type: "danh từ",   example: "那个女孩叫小明。 - Cô bé đó tên là Tiểu Minh." },

  // Nơi chốn & Địa điểm
  { id: 27, hanzi: "房间",  pinyin: "fángjiān", meaning: "phòng",                 type: "danh từ",   example: "我的房间很大。 - Phòng tôi rất rộng." },
  { id: 28, hanzi: "附近",  pinyin: "fùjìn",    meaning: "gần đây, lân cận",      type: "danh từ",   example: "附近有超市吗？ - Gần đây có siêu thị không?" },
  { id: 29, hanzi: "外面",  pinyin: "wàimiàn",  meaning: "bên ngoài",             type: "danh từ",   example: "外面下雨。 - Bên ngoài trời mưa." },
  { id: 30, hanzi: "旁边",  pinyin: "pángbiān", meaning: "bên cạnh",              type: "danh từ",   example: "学校旁边有银行。 - Bên cạnh trường có ngân hàng." },
  { id: 31, hanzi: "超市",  pinyin: "chāoshì",  meaning: "siêu thị",              type: "danh từ",   example: "我去超市买东西。 - Tôi đến siêu thị mua đồ." },
  { id: 32, hanzi: "公司",  pinyin: "gōngsī",   meaning: "công ty",               type: "danh từ",   example: "他在公司工作。 - Anh ấy làm việc ở công ty." },
  { id: 33, hanzi: "公园",  pinyin: "gōngyuán", meaning: "công viên",             type: "danh từ",   example: "我去公园散步。 - Tôi đến công viên đi dạo." },
  { id: 34, hanzi: "机场",  pinyin: "jīchǎng",  meaning: "sân bay",               type: "danh từ",   example: "去机场接朋友。 - Đến sân bay đón bạn." },
  { id: 35, hanzi: "银行",  pinyin: "yínháng",  meaning: "ngân hàng",             type: "danh từ",   example: "我去银行取钱。 - Tôi đến ngân hàng rút tiền." },

  // Thức ăn & Đồ uống
  { id: 36, hanzi: "鸡蛋",  pinyin: "jīdàn",    meaning: "trứng gà",              type: "danh từ",   example: "早饭吃鸡蛋。 - Bữa sáng ăn trứng." },
  { id: 37, hanzi: "鱼",    pinyin: "yú",       meaning: "cá",                    type: "danh từ",   example: "我喜欢吃鱼。 - Tôi thích ăn cá." },
  { id: 38, hanzi: "肉",    pinyin: "ròu",      meaning: "thịt",                  type: "danh từ",   example: "我不吃肉。 - Tôi không ăn thịt." },
  { id: 39, hanzi: "西瓜",  pinyin: "xīguā",    meaning: "dưa hấu",               type: "danh từ",   example: "夏天吃西瓜。 - Mùa hè ăn dưa hấu." },
  { id: 40, hanzi: "牛奶",  pinyin: "niúnǎi",   meaning: "sữa bò",                type: "danh từ",   example: "每天喝牛奶。 - Mỗi ngày uống sữa." },
  { id: 41, hanzi: "咖啡",  pinyin: "kāfēi",    meaning: "cà phê",                type: "danh từ",   example: "我喜欢喝咖啡。 - Tôi thích uống cà phê." },
  { id: 42, hanzi: "面包",  pinyin: "miànbāo",  meaning: "bánh mì",               type: "danh từ",   example: "早饭吃面包。 - Bữa sáng ăn bánh mì." },
  { id: 43, hanzi: "水果",  pinyin: "shuǐguǒ",  meaning: "hoa quả, trái cây",     type: "danh từ",   example: "多吃水果。 - Ăn nhiều hoa quả." },
  { id: 44, hanzi: "蔬菜",  pinyin: "shūcài",   meaning: "rau củ",                type: "danh từ",   example: "多吃蔬菜。 - Ăn nhiều rau." },
  { id: 45, hanzi: "饺子",  pinyin: "jiǎozi",   meaning: "bánh sủi cảo",          type: "danh từ",   example: "过年吃饺子。 - Tết ăn sủi cảo." },

  // Động từ thông dụng
  { id: 46, hanzi: "想",    pinyin: "xiǎng",    meaning: "muốn, nghĩ",            type: "động từ",   example: "我想去北京。 - Tôi muốn đi Bắc Kinh." },
  { id: 47, hanzi: "喜欢",  pinyin: "xǐhuan",   meaning: "thích",                 type: "động từ",   example: "我喜欢音乐。 - Tôi thích âm nhạc." },
  { id: 48, hanzi: "爱",    pinyin: "ài",       meaning: "yêu, yêu thích",        type: "động từ",   example: "我爱你。 - Tôi yêu bạn." },
  { id: 49, hanzi: "帮",    pinyin: "bāng",     meaning: "giúp, giúp đỡ",         type: "động từ",   example: "帮我一下。 - Giúp tôi một chút." },
  { id: 50, hanzi: "找",    pinyin: "zhǎo",     meaning: "tìm",                   type: "động từ",   example: "我找我的钥匙。 - Tôi tìm chìa khóa của tôi." },
  { id: 51, hanzi: "等",    pinyin: "děng",     meaning: "đợi, chờ",              type: "động từ",   example: "请等一下。 - Vui lòng đợi một chút." },
  { id: 52, hanzi: "问",    pinyin: "wèn",      meaning: "hỏi",                   type: "động từ",   example: "我问老师。 - Tôi hỏi thầy giáo." },
  { id: 53, hanzi: "告诉",  pinyin: "gàosu",    meaning: "nói cho biết, thông báo",type: "động từ",  example: "告诉我！ - Nói cho tôi biết!" },
  { id: 54, hanzi: "认识",  pinyin: "rènshi",   meaning: "quen biết, nhận ra",    type: "động từ",   example: "我认识他。 - Tôi quen biết anh ấy." },
  { id: 55, hanzi: "知道",  pinyin: "zhīdào",   meaning: "biết",                  type: "động từ",   example: "我知道。 - Tôi biết." },
  { id: 56, hanzi: "觉得",  pinyin: "juéde",    meaning: "cảm thấy, cho là",      type: "động từ",   example: "我觉得很好。 - Tôi cảm thấy rất tốt." },
  { id: 57, hanzi: "希望",  pinyin: "xīwàng",   meaning: "hi vọng, mong muốn",    type: "động từ",   example: "我希望你好。 - Tôi hi vọng bạn khỏe." },
  { id: 58, hanzi: "相信",  pinyin: "xiāngxìn", meaning: "tin tưởng",             type: "động từ",   example: "我相信你。 - Tôi tin bạn." },
  { id: 59, hanzi: "需要",  pinyin: "xūyào",    meaning: "cần, cần thiết",        type: "động từ",   example: "我需要帮助。 - Tôi cần giúp đỡ." },
  { id: 60, hanzi: "准备",  pinyin: "zhǔnbèi",  meaning: "chuẩn bị",              type: "động từ",   example: "准备好了吗？ - Chuẩn bị xong chưa?" },
  { id: 61, hanzi: "开始",  pinyin: "kāishǐ",   meaning: "bắt đầu",               type: "động từ",   example: "开始上课了。 - Bắt đầu lên lớp rồi." },
  { id: 62, hanzi: "结束",  pinyin: "jiéshù",   meaning: "kết thúc",              type: "động từ",   example: "比赛结束了。 - Trận đấu kết thúc rồi." },
  { id: 63, hanzi: "完成",  pinyin: "wánchéng",  meaning: "hoàn thành",           type: "động từ",   example: "作业完成了。 - Bài tập hoàn thành rồi." },
  { id: 64, hanzi: "休息",  pinyin: "xiūxi",    meaning: "nghỉ ngơi",             type: "động từ",   example: "休息一下吧。 - Nghỉ một chút đi." },
  { id: 65, hanzi: "锻炼",  pinyin: "duànliàn", meaning: "tập thể dục, rèn luyện",type: "động từ",   example: "每天锻炼身体。 - Mỗi ngày tập thể dục." },
  { id: 66, hanzi: "游览",  pinyin: "yóulǎn",   meaning: "tham quan, du ngoạn",   type: "động từ",   example: "游览北京。 - Tham quan Bắc Kinh." },
  { id: 67, hanzi: "旅游",  pinyin: "lǚyóu",    meaning: "du lịch",               type: "động từ",   example: "我们去旅游吧。 - Chúng ta đi du lịch đi." },
  { id: 68, hanzi: "唱歌",  pinyin: "chànggē",  meaning: "hát (bài)",             type: "động từ",   example: "她喜欢唱歌。 - Cô ấy thích hát." },
  { id: 69, hanzi: "跳舞",  pinyin: "tiàowǔ",   meaning: "nhảy múa",              type: "động từ",   example: "她会跳舞。 - Cô ấy biết nhảy." },
  { id: 70, hanzi: "画画",  pinyin: "huà huà",  meaning: "vẽ tranh",              type: "động từ",   example: "我喜欢画画。 - Tôi thích vẽ tranh." },

  // Động từ di chuyển & Hành động
  { id: 71, hanzi: "走",    pinyin: "zǒu",      meaning: "đi bộ, đi",             type: "động từ",   example: "我们走路吧。 - Chúng ta đi bộ đi." },
  { id: 72, hanzi: "跑",    pinyin: "pǎo",      meaning: "chạy",                  type: "động từ",   example: "每天早上跑步。 - Mỗi sáng chạy bộ." },
  { id: 73, hanzi: "站",    pinyin: "zhàn",     meaning: "đứng",                  type: "động từ",   example: "请站起来。 - Vui lòng đứng lên." },
  { id: 74, hanzi: "进",    pinyin: "jìn",      meaning: "vào, đi vào",           type: "động từ",   example: "请进！ - Mời vào!" },
  { id: 75, hanzi: "出",    pinyin: "chū",      meaning: "ra, đi ra",             type: "động từ",   example: "出来！ - Ra ngoài!" },
  { id: 76, hanzi: "送",    pinyin: "sòng",     meaning: "tặng, tiễn",            type: "động từ",   example: "送你一份礼物。 - Tặng bạn một món quà." },
  { id: 77, hanzi: "拿",    pinyin: "ná",       meaning: "lấy, cầm",              type: "động từ",   example: "拿一杯水。 - Lấy một ly nước." },
  { id: 78, hanzi: "放",    pinyin: "fàng",     meaning: "đặt, để",               type: "động từ",   example: "放在桌子上。 - Đặt trên bàn." },
  { id: 79, hanzi: "带",    pinyin: "dài",      meaning: "mang theo, dẫn",        type: "động từ",   example: "带手机出门。 - Mang theo điện thoại ra ngoài." },
  { id: 80, hanzi: "穿",    pinyin: "chuān",    meaning: "mặc (quần áo)",         type: "động từ",   example: "穿裙子。 - Mặc váy." },

  // Học tập & Trường học
  { id: 81, hanzi: "上课",  pinyin: "shàngkè",  meaning: "lên lớp, học",          type: "động từ",   example: "我们去上课。 - Chúng ta đi học." },
  { id: 82, hanzi: "下课",  pinyin: "xiàkè",    meaning: "tan học, ra lớp",       type: "động từ",   example: "下课了！ - Tan học rồi!" },
  { id: 83, hanzi: "考试",  pinyin: "kǎoshì",   meaning: "kỳ thi",                type: "danh từ",   example: "明天考试。 - Ngày mai thi." },
  { id: 84, hanzi: "练习",  pinyin: "liànxí",   meaning: "luyện tập",             type: "động từ",   example: "练习说话。 - Luyện tập nói chuyện." },
  { id: 85, hanzi: "作业",  pinyin: "zuòyè",    meaning: "bài tập về nhà",        type: "danh từ",   example: "做作业。 - Làm bài tập." },
  { id: 86, hanzi: "汉语",  pinyin: "Hànyǔ",    meaning: "tiếng Hán, tiếng Trung",type: "danh từ",   example: "学汉语。 - Học tiếng Trung." },
  { id: 87, hanzi: "字",    pinyin: "zì",       meaning: "chữ",                   type: "danh từ",   example: "写汉字。 - Viết chữ Hán." },
  { id: 88, hanzi: "课",    pinyin: "kè",       meaning: "tiết học, bài học",     type: "danh từ",   example: "今天几节课？ - Hôm nay mấy tiết học?" },

  // Sức khỏe & Cơ thể
  { id: 89, hanzi: "身体",  pinyin: "shēntǐ",   meaning: "cơ thể, sức khỏe",     type: "danh từ",   example: "身体健康。 - Sức khỏe tốt." },
  { id: 90, hanzi: "头",    pinyin: "tóu",      meaning: "đầu",                   type: "danh từ",   example: "头很疼。 - Đầu rất đau." },
  { id: 91, hanzi: "眼睛",  pinyin: "yǎnjing",  meaning: "mắt",                   type: "danh từ",   example: "闭上眼睛。 - Nhắm mắt lại." },
  { id: 92, hanzi: "耳朵",  pinyin: "ěrduo",    meaning: "tai",                   type: "danh từ",   example: "耳朵疼。 - Tai đau." },
  { id: 93, hanzi: "手",    pinyin: "shǒu",     meaning: "tay",                   type: "danh từ",   example: "洗手。 - Rửa tay." },
  { id: 94, hanzi: "脸",    pinyin: "liǎn",     meaning: "mặt",                   type: "danh từ",   example: "洗脸。 - Rửa mặt." },
  { id: 95, hanzi: "疼",    pinyin: "téng",     meaning: "đau",                   type: "tính từ",   example: "头很疼。 - Đầu rất đau." },
  { id: 96, hanzi: "生病",  pinyin: "shēngbìng",meaning: "bị bệnh",               type: "động từ",   example: "他生病了。 - Anh ấy bị bệnh rồi." },
  { id: 97, hanzi: "感冒",  pinyin: "gǎnmào",   meaning: "cảm cúm",               type: "danh từ",   example: "我感冒了。 - Tôi bị cảm cúm rồi." },
  { id: 98, hanzi: "药",    pinyin: "yào",      meaning: "thuốc",                 type: "danh từ",   example: "吃药吧。 - Uống thuốc đi." },
  { id: 99, hanzi: "健康",  pinyin: "jiànkāng", meaning: "khỏe mạnh, sức khỏe",  type: "tính từ",   example: "身体健康。 - Cơ thể khỏe mạnh." },

  // Quần áo & Đồ vật
  { id: 100, hanzi: "衣服", pinyin: "yīfu",     meaning: "quần áo",               type: "danh từ",   example: "买衣服。 - Mua quần áo." },
  { id: 101, hanzi: "裤子", pinyin: "kùzi",     meaning: "quần",                  type: "danh từ",   example: "穿新裤子。 - Mặc quần mới." },
  { id: 102, hanzi: "裙子", pinyin: "qúnzi",    meaning: "váy",                   type: "danh từ",   example: "她穿了一条裙子。 - Cô ấy mặc một cái váy." },
  { id: 103, hanzi: "鞋",   pinyin: "xié",      meaning: "giày",                  type: "danh từ",   example: "买一双鞋。 - Mua một đôi giày." },
  { id: 104, hanzi: "手机", pinyin: "shǒujī",   meaning: "điện thoại di động",    type: "danh từ",   example: "用手机打电话。 - Dùng điện thoại gọi điện." },
  { id: 105, hanzi: "照片", pinyin: "zhàopiàn", meaning: "ảnh, bức ảnh",          type: "danh từ",   example: "看照片。 - Xem ảnh." },
  { id: 106, hanzi: "礼物", pinyin: "lǐwù",     meaning: "quà, món quà",          type: "danh từ",   example: "送礼物。 - Tặng quà." },
  { id: 107, hanzi: "票",   pinyin: "piào",     meaning: "vé",                    type: "danh từ",   example: "买电影票。 - Mua vé xem phim." },
  { id: 108, hanzi: "地图", pinyin: "dìtú",     meaning: "bản đồ",                type: "danh từ",   example: "看地图。 - Xem bản đồ." },

  // Phương tiện giao thông
  { id: 109, hanzi: "自行车",pinyin: "zìxíngchē",meaning: "xe đạp",              type: "danh từ",   example: "骑自行车。 - Đi xe đạp." },
  { id: 110, hanzi: "公共汽车",pinyin:"gōnggòng qìchē",meaning:"xe buýt",        type: "danh từ",   example: "坐公共汽车。 - Đi xe buýt." },
  { id: 111, hanzi: "地铁", pinyin: "dìtiě",    meaning: "tàu điện ngầm, metro",  type: "danh từ",   example: "坐地铁上班。 - Đi metro đi làm." },
  { id: 112, hanzi: "船",   pinyin: "chuán",    meaning: "thuyền, tàu",           type: "danh từ",   example: "坐船过河。 - Đi thuyền qua sông." },
  { id: 113, hanzi: "路",   pinyin: "lù",       meaning: "đường, con đường",      type: "danh từ",   example: "走这条路。 - Đi con đường này." },

  // Tính từ
  { id: 114, hanzi: "高",   pinyin: "gāo",      meaning: "cao",                   type: "tính từ",   example: "那栋楼很高。 - Tòa nhà đó rất cao." },
  { id: 115, hanzi: "矮",   pinyin: "ǎi",       meaning: "thấp, lùn",             type: "tính từ",   example: "他比我矮。 - Anh ấy thấp hơn tôi." },
  { id: 116, hanzi: "长",   pinyin: "cháng",    meaning: "dài",                   type: "tính từ",   example: "头发很长。 - Tóc rất dài." },
  { id: 117, hanzi: "短",   pinyin: "duǎn",     meaning: "ngắn",                  type: "tính từ",   example: "裤子太短了。 - Quần ngắn quá." },
  { id: 118, hanzi: "重",   pinyin: "zhòng",    meaning: "nặng",                  type: "tính từ",   example: "这个行李很重。 - Hành lý này rất nặng." },
  { id: 119, hanzi: "轻",   pinyin: "qīng",     meaning: "nhẹ",                   type: "tính từ",   example: "这个包很轻。 - Túi này rất nhẹ." },
  { id: 120, hanzi: "胖",   pinyin: "pàng",     meaning: "béo, mập",              type: "tính từ",   example: "他有点胖。 - Anh ấy hơi béo." },
  { id: 121, hanzi: "瘦",   pinyin: "shòu",     meaning: "gầy",                   type: "tính từ",   example: "她太瘦了。 - Cô ấy quá gầy." },
  { id: 122, hanzi: "聪明", pinyin: "cōngming", meaning: "thông minh",            type: "tính từ",   example: "这个孩子很聪明。 - Đứa bé này rất thông minh." },
  { id: 123, hanzi: "努力", pinyin: "nǔlì",     meaning: "cố gắng, chăm chỉ",    type: "tính từ",   example: "努力学习。 - Cố gắng học." },
  { id: 124, hanzi: "可爱", pinyin: "kě'ài",    meaning: "đáng yêu, dễ thương",   type: "tính từ",   example: "宝宝很可爱。 - Em bé rất dễ thương." },
  { id: 125, hanzi: "有名", pinyin: "yǒumíng",  meaning: "nổi tiếng",             type: "tính từ",   example: "那个演员很有名。 - Diễn viên đó rất nổi tiếng." },
  { id: 126, hanzi: "有意思",pinyin:"yǒu yìsi", meaning: "thú vị, hay",           type: "tính từ",   example: "这本书很有意思。 - Quyển sách này rất thú vị." },
  { id: 127, hanzi: "容易", pinyin: "róngyì",   meaning: "dễ dàng",               type: "tính từ",   example: "这道题很容易。 - Bài tập này rất dễ." },
  { id: 128, hanzi: "难",   pinyin: "nán",      meaning: "khó",                   type: "tính từ",   example: "中文很难。 - Tiếng Trung rất khó." },
  { id: 129, hanzi: "正确", pinyin: "zhèngquè", meaning: "đúng, chính xác",       type: "tính từ",   example: "答案正确。 - Câu trả lời đúng." },

  // Phó từ & Liên từ
  { id: 130, hanzi: "非常", pinyin: "fēicháng",  meaning: "rất, cực kỳ",          type: "phó từ",    example: "非常好！ - Rất tốt!" },
  { id: 131, hanzi: "一点", pinyin: "yīdiǎn",    meaning: "một chút, chút",       type: "phó từ",    example: "等一点。 - Đợi một chút." },
  { id: 132, hanzi: "一定", pinyin: "yīdìng",    meaning: "nhất định, chắc chắn", type: "phó từ",    example: "一定可以的。 - Nhất định được." },
  { id: 133, hanzi: "可能", pinyin: "kěnéng",    meaning: "có thể, có lẽ",        type: "phó từ",    example: "可能下雨。 - Có thể trời mưa." },
  { id: 134, hanzi: "当然", pinyin: "dāngrán",   meaning: "tất nhiên, dĩ nhiên",  type: "phó từ",    example: "当然可以！ - Tất nhiên được!" },
  { id: 135, hanzi: "其实", pinyin: "qíshí",     meaning: "thực ra, thật ra",     type: "phó từ",    example: "其实我不知道。 - Thực ra tôi không biết." },
  { id: 136, hanzi: "只",   pinyin: "zhǐ",       meaning: "chỉ, chỉ có",          type: "phó từ",    example: "只有一个。 - Chỉ có một cái." },
  { id: 137, hanzi: "再",   pinyin: "zài",       meaning: "lại, thêm lần nữa",    type: "phó từ",    example: "再来一次。 - Làm lại một lần nữa." },
  { id: 138, hanzi: "一边…一边",pinyin:"yībiān…yībiān",meaning:"vừa…vừa",        type: "liên từ",   example: "一边吃饭一边看书。 - Vừa ăn vừa đọc sách." },
  { id: 139, hanzi: "虽然…但是",pinyin:"suīrán…dànshì",meaning:"tuy…nhưng",      type: "liên từ",   example: "虽然贵但是好。 - Tuy đắt nhưng tốt." },
  { id: 140, hanzi: "如果", pinyin: "rúguǒ",     meaning: "nếu như",              type: "liên từ",   example: "如果下雨就不去。 - Nếu mưa thì không đi." },

  // Lượng từ & Giới từ
  { id: 141, hanzi: "次",   pinyin: "cì",       meaning: "lần (lượng từ)",        type: "lượng từ",  example: "去过一次。 - Đã đến một lần." },
  { id: 142, hanzi: "张",   pinyin: "zhāng",    meaning: "tờ, tấm (lượng từ)",   type: "lượng từ",  example: "一张照片。 - Một tấm ảnh." },
  { id: 143, hanzi: "件",   pinyin: "jiàn",     meaning: "cái (lượng từ cho đồ vật/việc)", type: "lượng từ", example: "一件衣服。 - Một cái áo." },
  { id: 144, hanzi: "条",   pinyin: "tiáo",     meaning: "cái (dài), sợi",        type: "lượng từ",  example: "一条鱼。 - Một con cá." },
  { id: 145, hanzi: "位",   pinyin: "wèi",      meaning: "vị (lượng từ người lịch sự)", type: "lượng từ", example: "一位老师。 - Một vị giáo viên." },
  { id: 146, hanzi: "向",   pinyin: "xiàng",    meaning: "về phía, hướng về",     type: "giới từ",   example: "向左走。 - Đi về bên trái." },
  { id: 147, hanzi: "从",   pinyin: "cóng",     meaning: "từ (nơi, thời gian)",   type: "giới từ",   example: "从北京来。 - Từ Bắc Kinh đến." },
  { id: 148, hanzi: "对",   pinyin: "duì",      meaning: "đúng, với, đối với",    type: "giới từ",   example: "对我很好。 - Rất tốt với tôi." },
  { id: 149, hanzi: "比",   pinyin: "bǐ",       meaning: "so với, hơn",           type: "giới từ",   example: "我比他高。 - Tôi cao hơn anh ấy." },
  { id: 150, hanzi: "把",   pinyin: "bǎ",       meaning: "trợ từ chủ động (把...)",type: "giới từ",   example: "把书放这里。 - Đặt sách ở đây." },
];

const HSK2_VOCABULARY = JSON.parse(localStorage.getItem('nhim_hsk2')) || _default_HSK2_VOCABULARY;

// Export for use in other modules
if (typeof module !== 'undefined') module.exports = HSK2_VOCABULARY;
