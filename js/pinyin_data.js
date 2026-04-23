// ============================================================
// PINYIN_DATA.JS – Bảng phiên âm Pinyin tiếng Trung
// Thanh mẫu (声母), Vận mẫu (韵母), và Thanh điệu
// ============================================================

const PINYIN_INITIALS = [
  { id:"b", ipa:"/p/",  vn:"bờ", example:"爸 bà (bố)", audio:"b", group:"môi" },
  { id:"p", ipa:"/pʰ/", vn:"phờ", example:"朋 péng (bạn)", audio:"p", group:"môi" },
  { id:"m", ipa:"/m/",  vn:"mờ", example:"妈 mā (mẹ)", audio:"m", group:"môi" },
  { id:"f", ipa:"/f/",  vn:"phờ (răng-môi)", example:"飞 fēi (bay)", audio:"f", group:"môi" },

  { id:"d", ipa:"/t/",  vn:"đờ", example:"大 dà (lớn)", audio:"d", group:"lưỡi" },
  { id:"t", ipa:"/tʰ/", vn:"thờ", example:"他 tā (anh ấy)", audio:"t", group:"lưỡi" },
  { id:"n", ipa:"/n/",  vn:"nờ", example:"你 nǐ (bạn)", audio:"n", group:"lưỡi" },
  { id:"l", ipa:"/l/",  vn:"lờ", example:"来 lái (đến)", audio:"l", group:"lưỡi" },

  { id:"g", ipa:"/k/",  vn:"gờ", example:"高 gāo (cao)", audio:"g", group:"cuống họng" },
  { id:"k", ipa:"/kʰ/", vn:"khờ", example:"看 kàn (xem)", audio:"k", group:"cuống họng" },
  { id:"h", ipa:"/x/",  vn:"hờ", example:"好 hǎo (tốt)", audio:"h", group:"cuống họng" },

  { id:"j", ipa:"/tɕ/",  vn:"gi (chờ nhẹ)", example:"家 jiā (nhà)", audio:"j", group:"mặt lưỡi" },
  { id:"q", ipa:"/tɕʰ/", vn:"chi (bật hơi)", example:"去 qù (đi)", audio:"q", group:"mặt lưỡi" },
  { id:"x", ipa:"/ɕ/",   vn:"xi (sì nhẹ)", example:"小 xiǎo (nhỏ)", audio:"x", group:"mặt lưỡi" },

  { id:"zh", ipa:"/ʈʂ/",  vn:"trờ (cong lưỡi)", example:"中 zhōng (giữa)", audio:"zh", group:"đầu lưỡi cong" },
  { id:"ch", ipa:"/ʈʂʰ/", vn:"chờ (cong lưỡi)", example:"吃 chī (ăn)", audio:"ch", group:"đầu lưỡi cong" },
  { id:"sh", ipa:"/ʂ/",   vn:"sờ (cong lưỡi)", example:"是 shì (là)", audio:"sh", group:"đầu lưỡi cong" },
  { id:"r",  ipa:"/ɻ/",   vn:"rờ (nhẹ)", example:"人 rén (người)", audio:"r", group:"đầu lưỡi cong" },

  { id:"z", ipa:"/ts/",  vn:"zờ (dzờ)", example:"在 zài (ở)", audio:"z", group:"đầu lưỡi thẳng" },
  { id:"c", ipa:"/tsʰ/", vn:"cờ (xờ bật hơi)", example:"次 cì (lần)", audio:"c", group:"đầu lưỡi thẳng" },
  { id:"s", ipa:"/s/",   vn:"sờ", example:"三 sān (ba)", audio:"s", group:"đầu lưỡi thẳng" },

  { id:"y", ipa:"/j/", vn:"y (i-ờ)", example:"要 yào (muốn)", audio:"y", group:"bán nguyên âm" },
  { id:"w", ipa:"/w/", vn:"u-ờ", example:"我 wǒ (tôi)", audio:"w", group:"bán nguyên âm" },
];

const PINYIN_FINALS = [
  // Đơn nguyên âm
  { id:"a",  ipa:"/a/",  vn:"a", example:"大 dà", group:"đơn" },
  { id:"o",  ipa:"/o/",  vn:"o", example:"我 wǒ", group:"đơn" },
  { id:"e",  ipa:"/ɤ/",  vn:"ơ", example:"和 hé", group:"đơn" },
  { id:"i",  ipa:"/i/",  vn:"i", example:"你 nǐ", group:"đơn" },
  { id:"u",  ipa:"/u/",  vn:"u", example:"不 bù", group:"đơn" },
  { id:"ü",  ipa:"/y/",  vn:"uy (tròn môi)", example:"去 qù", group:"đơn" },

  // Phức nguyên âm
  { id:"ai", ipa:"/ai/", vn:"ai", example:"来 lái", group:"phức" },
  { id:"ei", ipa:"/ei/", vn:"ây", example:"谁 shéi", group:"phức" },
  { id:"ao", ipa:"/au/", vn:"ao", example:"好 hǎo", group:"phức" },
  { id:"ou", ipa:"/ou/", vn:"âu", example:"走 zǒu", group:"phức" },

  // Vận mẫu mũi
  { id:"an",  ipa:"/an/",  vn:"an", example:"三 sān", group:"mũi" },
  { id:"en",  ipa:"/ən/",  vn:"ân", example:"人 rén", group:"mũi" },
  { id:"ang", ipa:"/aŋ/",  vn:"ang", example:"上 shàng", group:"mũi" },
  { id:"eng", ipa:"/əŋ/",  vn:"âng", example:"能 néng", group:"mũi" },
  { id:"ong", ipa:"/uŋ/",  vn:"ung", example:"中 zhōng", group:"mũi" },

  // Vận mẫu kết hợp phổ biến
  { id:"ia",   ipa:"/ia/",   vn:"i-a", example:"家 jiā", group:"kết hợp" },
  { id:"ie",   ipa:"/iɛ/",   vn:"i-ê", example:"写 xiě", group:"kết hợp" },
  { id:"iao",  ipa:"/iau/",  vn:"i-ao", example:"小 xiǎo", group:"kết hợp" },
  { id:"iu",   ipa:"/iou/",  vn:"i-u", example:"六 liù", group:"kết hợp" },
  { id:"ian",  ipa:"/iɛn/",  vn:"i-en", example:"天 tiān", group:"kết hợp" },
  { id:"in",   ipa:"/in/",   vn:"in", example:"今 jīn", group:"kết hợp" },
  { id:"iang", ipa:"/iaŋ/",  vn:"i-ang", example:"想 xiǎng", group:"kết hợp" },
  { id:"ing",  ipa:"/iŋ/",   vn:"inh", example:"名 míng", group:"kết hợp" },
  { id:"ua",   ipa:"/ua/",   vn:"u-a", example:"花 huā", group:"kết hợp" },
  { id:"uo",   ipa:"/uo/",   vn:"u-ô", example:"国 guó", group:"kết hợp" },
  { id:"uai",  ipa:"/uai/",  vn:"u-ai", example:"快 kuài", group:"kết hợp" },
  { id:"ui",   ipa:"/uei/",  vn:"u-ây", example:"回 huí", group:"kết hợp" },
  { id:"uan",  ipa:"/uan/",  vn:"u-an", example:"关 guān", group:"kết hợp" },
  { id:"un",   ipa:"/uən/",  vn:"u-ân", example:"春 chūn", group:"kết hợp" },
  { id:"uang", ipa:"/uaŋ/",  vn:"u-ang", example:"黄 huáng", group:"kết hợp" },
  { id:"üe",   ipa:"/yɛ/",   vn:"uy-ê", example:"月 yuè", group:"kết hợp" },
  { id:"üan",  ipa:"/yɛn/",  vn:"uy-en", example:"元 yuán", group:"kết hợp" },
  { id:"ün",   ipa:"/yn/",   vn:"uy-n", example:"云 yún", group:"kết hợp" },
];

const PINYIN_TONES = [
  { id:1, mark:"ā", name:"Thanh 1 – Ngang (阴平)", desc:"Giọng cao, đều, kéo dài. Như khi bạn hát nốt cao.", vn:"Như giọng \"a\" kéo dài đều", example:"妈 mā (mẹ)", color:"#60a5fa" },
  { id:2, mark:"á", name:"Thanh 2 – Lên (阳平)", desc:"Giọng đi lên từ trung bình lên cao. Như khi bạn hỏi lại \"Hả?\"", vn:"Như giọng hỏi \"Hả?\"", example:"麻 má (tê)", color:"#34d399" },
  { id:3, mark:"ǎ", name:"Thanh 3 – Xuống rồi lên (上声)", desc:"Giọng xuống thấp rồi vươn lên. Như khi bạn ngạc nhiên \"Ủa?\"", vn:"Như giọng \"Ủa?\" ngạc nhiên", example:"马 mǎ (ngựa)", color:"#fbbf24" },
  { id:4, mark:"à", name:"Thanh 4 – Xuống (去声)", desc:"Giọng từ cao xuống nhanh, dứt khoát. Như khi bạn quát \"Đi!\"", vn:"Như giọng quát \"Đi!\"", example:"骂 mà (chửi)", color:"#f87171" },
  { id:5, mark:"a", name:"Thanh nhẹ (轻声)", desc:"Nói nhẹ, ngắn, không nhấn. Thường ở âm tiết thứ 2 trong từ ghép.", vn:"Nói nhẹ, ngắn", example:"妈妈 māma (mẹ)", color:"#a78bfa" },
];

// Bảng kết hợp Thanh mẫu + Vận mẫu (pinyin table)
const PINYIN_COMBO_TABLE = {
  headers: ["a","o","e","i","u","ü","ai","ei","ao","ou","an","en","ang","eng","ong"],
  rows: [
    { initial:"b",  combos:["ba","bo","","bi","bu","","bai","bei","bao","","ban","ben","bang","beng",""] },
    { initial:"p",  combos:["pa","po","","pi","pu","","pai","pei","pao","pou","pan","pen","pang","peng",""] },
    { initial:"m",  combos:["ma","mo","me","mi","mu","","mai","mei","mao","mou","man","men","mang","meng",""] },
    { initial:"f",  combos:["fa","fo","","","fu","","","fei","","fou","fan","fen","fang","feng",""] },
    { initial:"d",  combos:["da","","de","di","du","","dai","dei","dao","dou","dan","den","dang","deng","dong"] },
    { initial:"t",  combos:["ta","","te","ti","tu","","tai","","tao","tou","tan","","tang","teng","tong"] },
    { initial:"n",  combos:["na","","ne","ni","nu","nü","nai","nei","nao","nou","nan","nen","nang","neng","nong"] },
    { initial:"l",  combos:["la","lo","le","li","lu","lü","lai","lei","lao","lou","lan","","lang","leng","long"] },
    { initial:"g",  combos:["ga","","ge","","gu","","gai","gei","gao","gou","gan","gen","gang","geng","gong"] },
    { initial:"k",  combos:["ka","","ke","","ku","","kai","kei","kao","kou","kan","ken","kang","keng","kong"] },
    { initial:"h",  combos:["ha","","he","","hu","","hai","hei","hao","hou","han","hen","hang","heng","hong"] },
    { initial:"j",  combos:["","","","ji","","ju","","","","","","","","",""] },
    { initial:"q",  combos:["","","","qi","","qu","","","","","","","","",""] },
    { initial:"x",  combos:["","","","xi","","xu","","","","","","","","",""] },
    { initial:"zh", combos:["zha","","zhe","zhi","zhu","","zhai","zhei","zhao","zhou","zhan","zhen","zhang","zheng","zhong"] },
    { initial:"ch", combos:["cha","","che","chi","chu","","chai","","chao","chou","chan","chen","chang","cheng","chong"] },
    { initial:"sh", combos:["sha","","she","shi","shu","","shai","shei","shao","shou","shan","shen","shang","sheng",""] },
    { initial:"r",  combos:["","","re","ri","ru","","","","rao","rou","ran","ren","rang","reng","rong"] },
    { initial:"z",  combos:["za","","ze","zi","zu","","zai","zei","zao","zou","zan","zen","zang","zeng","zong"] },
    { initial:"c",  combos:["ca","","ce","ci","cu","","cai","","cao","cou","can","cen","cang","ceng","cong"] },
    { initial:"s",  combos:["sa","","se","si","su","","sai","","sao","sou","san","sen","sang","seng","song"] },
    { initial:"y",  combos:["ya","yo","ye","yi","yu","","yai","","yao","you","yan","","yang","ying","yong"] },
    { initial:"w",  combos:["wa","wo","","","wu","","wai","wei","","","wan","wen","wang","weng",""] },
  ]
};
