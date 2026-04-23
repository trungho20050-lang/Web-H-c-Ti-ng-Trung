// ============================================================
// DATA.JS - Dữ liệu từ vựng tiếng Trung
// ============================================================

const _default_VOCABULARY_DATA = {
  numbers: {
    name: "Số đếm",
    icon: "",
    color: "#6C63FF",
    words: [
      { hanzi: "零", pinyin: "líng", meaning: "Số không", example: "零度 (líng dù) - Không độ", tone: 2 },
      { hanzi: "一", pinyin: "yī", meaning: "Số một", example: "一个 (yī gè) - Một cái", tone: 1 },
      { hanzi: "二", pinyin: "èr", meaning: "Số hai", example: "二月 (èr yuè) - Tháng hai", tone: 4 },
      { hanzi: "三", pinyin: "sān", meaning: "Số ba", example: "三天 (sān tiān) - Ba ngày", tone: 1 },
      { hanzi: "四", pinyin: "sì", meaning: "Số bốn", example: "四季 (sì jì) - Bốn mùa", tone: 4 },
      { hanzi: "五", pinyin: "wǔ", meaning: "Số năm", example: "五月 (wǔ yuè) - Tháng năm", tone: 3 },
      { hanzi: "六", pinyin: "liù", meaning: "Số sáu", example: "六月 (liù yuè) - Tháng sáu", tone: 4 },
      { hanzi: "七", pinyin: "qī", meaning: "Số bảy", example: "七月 (qī yuè) - Tháng bảy", tone: 1 },
      { hanzi: "八", pinyin: "bā", meaning: "Số tám", example: "八月 (bā yuè) - Tháng tám", tone: 1 },
      { hanzi: "九", pinyin: "jiǔ", meaning: "Số chín", example: "九月 (jiǔ yuè) - Tháng chín", tone: 3 },
      { hanzi: "十", pinyin: "shí", meaning: "Số mười", example: "十月 (shí yuè) - Tháng mười", tone: 2 },
      { hanzi: "百", pinyin: "bǎi", meaning: "Trăm", example: "一百 (yī bǎi) - Một trăm", tone: 3 },
    ]
  },
  greetings: {
    name: "Chào hỏi",
    icon: "",
    color: "#FF6584",
    words: [
      { hanzi: "你好", pinyin: "nǐ hǎo", meaning: "Xin chào", example: "你好！很高兴认识你。- Xin chào! Rất vui được gặp bạn.", tone: null },
      { hanzi: "再见", pinyin: "zài jiàn", meaning: "Tạm biệt", example: "明天见！(míng tiān jiàn) - Hẹn gặp lại ngày mai!", tone: null },
      { hanzi: "谢谢", pinyin: "xiè xie", meaning: "Cảm ơn", example: "非常感谢！(fēi cháng gǎn xiè) - Cảm ơn rất nhiều!", tone: null },
      { hanzi: "对不起", pinyin: "duì bu qǐ", meaning: "Xin lỗi", example: "对不起，我迟到了。- Xin lỗi, tôi đến trễ.", tone: null },
      { hanzi: "没关系", pinyin: "méi guān xi", meaning: "Không sao", example: "没关系，下次注意。- Không sao, lần sau chú ý nhé.", tone: null },
      { hanzi: "请问", pinyin: "qǐng wèn", meaning: "Xin hỏi", example: "请问，图书馆在哪里？- Xin hỏi, thư viện ở đâu?", tone: null },
      { hanzi: "好的", pinyin: "hǎo de", meaning: "Được rồi", example: "好的，我明白了。- Được rồi, tôi hiểu rồi.", tone: null },
      { hanzi: "早上好", pinyin: "zǎo shang hǎo", meaning: "Chào buổi sáng", example: "早上好！今天天气怎么样？- Chào buổi sáng! Hôm nay thời tiết thế nào?", tone: null },
      { hanzi: "晚上好", pinyin: "wǎn shang hǎo", meaning: "Chào buổi tối", example: "晚上好！你吃晚饭了吗？- Chào buổi tối! Bạn ăn tối chưa?", tone: null },
      { hanzi: "晚安", pinyin: "wǎn ān", meaning: "Ngủ ngon", example: "晚安！明天见。- Ngủ ngon! Hẹn gặp ngày mai.", tone: null },
    ]
  },
  family: {
    name: "Gia đình",
    icon: "‍‍‍",
    color: "#43C6AC",
    words: [
      { hanzi: "爸爸", pinyin: "bà ba", meaning: "Bố", example: "我爸爸是老师。- Bố tôi là giáo viên.", tone: null },
      { hanzi: "妈妈", pinyin: "mā ma", meaning: "Mẹ", example: "我妈妈很漂亮。- Mẹ tôi rất đẹp.", tone: null },
      { hanzi: "哥哥", pinyin: "gē ge", meaning: "Anh trai", example: "我哥哥比我高。- Anh trai tôi cao hơn tôi.", tone: null },
      { hanzi: "姐姐", pinyin: "jiě jie", meaning: "Chị gái", example: "我姐姐在北京工作。- Chị gái tôi làm việc ở Bắc Kinh.", tone: null },
      { hanzi: "弟弟", pinyin: "dì di", meaning: "Em trai", example: "我弟弟今年八岁。- Em trai tôi năm nay 8 tuổi.", tone: null },
      { hanzi: "妹妹", pinyin: "mèi mei", meaning: "Em gái", example: "我妹妹很可爱。- Em gái tôi rất dễ thương.", tone: null },
      { hanzi: "爷爷", pinyin: "yé ye", meaning: "Ông nội", example: "爷爷喜欢喝茶。- Ông nội thích uống trà.", tone: null },
      { hanzi: "奶奶", pinyin: "nǎi nai", meaning: "Bà nội", example: "奶奶做的菜很好吃。- Món ăn bà nội nấu rất ngon.", tone: null },
      { hanzi: "儿子", pinyin: "ér zi", meaning: "Con trai", example: "他有一个儿子。- Anh ấy có một con trai.", tone: null },
      { hanzi: "女儿", pinyin: "nǚ ér", meaning: "Con gái", example: "她的女儿很聪明。- Con gái cô ấy rất thông minh.", tone: null },
    ]
  },
  colors: {
    name: "Màu sắc",
    icon: "",
    color: "#F093FB",
    words: [
      { hanzi: "红色", pinyin: "hóng sè", meaning: "Màu đỏ", example: "她穿着红色的裙子。- Cô ấy mặc váy đỏ.", tone: null },
      { hanzi: "蓝色", pinyin: "lán sè", meaning: "Màu xanh dương", example: "天空是蓝色的。- Bầu trời màu xanh dương.", tone: null },
      { hanzi: "绿色", pinyin: "lǜ sè", meaning: "Màu xanh lá", example: "草地是绿色的。- Bãi cỏ màu xanh lá.", tone: null },
      { hanzi: "黄色", pinyin: "huáng sè", meaning: "Màu vàng", example: "向日葵是黄色的。- Hoa hướng dương màu vàng.", tone: null },
      { hanzi: "白色", pinyin: "bái sè", meaning: "Màu trắng", example: "雪是白色的。- Tuyết màu trắng.", tone: null },
      { hanzi: "黑色", pinyin: "hēi sè", meaning: "Màu đen", example: "夜晚是黑色的。- Đêm tối màu đen.", tone: null },
      { hanzi: "紫色", pinyin: "zǐ sè", meaning: "Màu tím", example: "薰衣草是紫色的。- Hoa oải hương màu tím.", tone: null },
      { hanzi: "橙色", pinyin: "chéng sè", meaning: "Màu cam", example: "橙子是橙色的。- Quả cam màu cam.", tone: null },
      { hanzi: "粉色", pinyin: "fěn sè", meaning: "Màu hồng", example: "樱花是粉色的。- Hoa anh đào màu hồng.", tone: null },
      { hanzi: "金色", pinyin: "jīn sè", meaning: "Màu vàng kim", example: "金色代表财富。- Màu vàng kim tượng trưng cho sự giàu có.", tone: null },
    ]
  },
  food: {
    name: "Đồ ăn",
    icon: "",
    color: "#F7971E",
    words: [
      { hanzi: "米饭", pinyin: "mǐ fàn", meaning: "Cơm trắng", example: "我喜欢吃米饭。- Tôi thích ăn cơm.", tone: null },
      { hanzi: "面条", pinyin: "miàn tiáo", meaning: "Mì sợi", example: "北京烤鸭配面条很好吃。- Vịt quay Bắc Kinh ăn với mì rất ngon.", tone: null },
      { hanzi: "饺子", pinyin: "jiǎo zi", meaning: "Bánh sủi cảo", example: "过年要吃饺子。- Ngày Tết phải ăn sủi cảo.", tone: null },
      { hanzi: "包子", pinyin: "bāo zi", meaning: "Bánh bao", example: "早餐吃包子很常见。- Ăn bánh bao buổi sáng rất phổ biến.", tone: null },
      { hanzi: "炒饭", pinyin: "chǎo fàn", meaning: "Cơm chiên", example: "扬州炒饭很有名。- Cơm chiên Dương Châu rất nổi tiếng.", tone: null },
      { hanzi: "火锅", pinyin: "huǒ guō", meaning: "Lẩu", example: "冬天吃火锅很舒服。- Ăn lẩu mùa đông rất thoải mái.", tone: null },
      { hanzi: "茶", pinyin: "chá", meaning: "Trà", example: "中国人喜欢喝茶。- Người Trung Quốc thích uống trà.", tone: null },
      { hanzi: "水", pinyin: "shuǐ", meaning: "Nước", example: "每天要多喝水。- Mỗi ngày cần uống nhiều nước.", tone: null },
      { hanzi: "汤", pinyin: "tāng", meaning: "Canh/Súp", example: "妈妈做的汤很鲜。- Canh mẹ nấu rất ngon.", tone: null },
      { hanzi: "点心", pinyin: "diǎn xīn", meaning: "Bánh ngọt/Dim sum", example: "香港点心很好吃。- Dim sum Hồng Kông rất ngon.", tone: null },
    ]
  },
  travel: {
    name: "Du lịch",
    icon: "️",
    color: "#4facfe",
    words: [
      { hanzi: "飞机", pinyin: "fēi jī", meaning: "Máy bay", example: "我坐飞机去北京。- Tôi đi máy bay đến Bắc Kinh.", tone: null },
      { hanzi: "火车", pinyin: "huǒ chē", meaning: "Tàu hỏa", example: "高铁很快。- Tàu cao tốc rất nhanh.", tone: null },
      { hanzi: "酒店", pinyin: "jiǔ diàn", meaning: "Khách sạn", example: "这家酒店很豪华。- Khách sạn này rất sang trọng.", tone: null },
      { hanzi: "地图", pinyin: "dì tú", meaning: "Bản đồ", example: "请给我看看地图。- Cho tôi xem bản đồ được không?", tone: null },
      { hanzi: "护照", pinyin: "hù zhào", meaning: "Hộ chiếu", example: "出国要带护照。- Ra nước ngoài phải mang hộ chiếu.", tone: null },
      { hanzi: "博物馆", pinyin: "bó wù guǎn", meaning: "Bảo tàng", example: "故宫博物馆很有名。- Bảo tàng Cố Cung rất nổi tiếng.", tone: null },
      { hanzi: "景点", pinyin: "jǐng diǎn", meaning: "Điểm tham quan", example: "这个景点很受欢迎。- Điểm tham quan này rất được yêu thích.", tone: null },
      { hanzi: "购物", pinyin: "gòu wù", meaning: "Mua sắm", example: "我喜欢去商场购物。- Tôi thích đi mua sắm ở trung tâm thương mại.", tone: null },
      { hanzi: "签证", pinyin: "qiān zhèng", meaning: "Visa", example: "去中国需要申请签证。- Đi Trung Quốc cần xin visa.", tone: null },
      { hanzi: "旅游", pinyin: "lǚ yóu", meaning: "Du lịch", example: "我很喜欢旅游。- Tôi rất thích du lịch.", tone: null },
    ]
  }
};

const VOCABULARY_DATA = JSON.parse(localStorage.getItem('nhim_data')) || _default_VOCABULARY_DATA;

// Lấy tất cả từ vựng dạng mảng phẳng
function getAllWords() {
  const allWords = [];
  for (const [topicKey, topic] of Object.entries(VOCABULARY_DATA)) {
    topic.words.forEach(word => {
      allWords.push({ ...word, topic: topicKey, topicName: topic.name });
    });
  }
  return allWords;
}

// Progress tracking
const PROGRESS_KEY = 'chinese_learning_progress';

function getProgress() {
  const saved = localStorage.getItem(PROGRESS_KEY);
  return saved ? JSON.parse(saved) : {};
}

function saveProgress(progress) {
  localStorage.setItem(PROGRESS_KEY, JSON.stringify(progress));
}

function markWordKnown(topicKey, wordIndex, known) {
  const progress = getProgress();
  if (!progress[topicKey]) progress[topicKey] = {};
  progress[topicKey][wordIndex] = known;
  saveProgress(progress);
}

function isWordKnown(topicKey, wordIndex) {
  const progress = getProgress();
  return progress[topicKey] && progress[topicKey][wordIndex] === true;
}

function getTopicStats(topicKey) {
  const topic = VOCABULARY_DATA[topicKey];
  if (!topic) return { total: 0, known: 0 };
  const progress = getProgress();
  const topicProgress = progress[topicKey] || {};
  const known = Object.values(topicProgress).filter(v => v === true).length;
  return { total: topic.words.length, known };
}

function getTotalStats() {
  let total = 0, known = 0;
  for (const topicKey of Object.keys(VOCABULARY_DATA)) {
    const stats = getTopicStats(topicKey);
    total += stats.total;
    known += stats.known;
  }
  return { total, known };
}
