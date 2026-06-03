/* ============================================================
   Yuchen Gao (高语辰) — Portfolio · script.js
   Language dictionary + toggle, scroll reveal, nav state,
   work grid render, detail modals, mobile menu.
   ============================================================ */

/* ---------- 1 · I18N DICTIONARY ---------- */
const I18N = {
  en: {
    "nav.logo": "＋ Yuchen Gao.",
    "nav.about": "About", "nav.work": "Work", "nav.experience": "Experience",
    "nav.skills": "Skills", "nav.contact": "Contact",

    "hero.name": "Yuchen Gao.",
    "hero.positioning": "Bilingual brand strategist — turning cultural insight into commercial strategy.",
    "hero.viewWork": "View work", "hero.downloadCV": "Download CV",
    "hero.metaPortfolio": "Portfolio — 2026",

    "statement.a": "I turn culture into", "statement.b": "brand strategy", "statement.c": ".",
    "statement.sub": "Consumer insight, competitive audit and content built to move brands between China and the West.",

    "about.title": "About",
    "about.bio": "I'm Yuchen Gao, a Fashion Marketing & Content Creation student at UAL (GPA 3.9), graduating in 2027. I work where consumer insight meets brand strategy — and I'm bilingual and bicultural, so I can run strategy natively for brands moving between China and the West.",
    "about.bio2": "Beyond the analysis, I'm a structured problem-solver who pairs rigorous research with creative execution. As UALCSSA President I've led four cross-functional teams, negotiated brand partnerships and delivered 17 events at 100% execution — and I move fast with modern AI tools, equally at home turning data into strategy and strategy into a story that lands in two markets.",
    "about.chip1": "UAL · GPA 3.9", "about.chip2": "ex-Landor (WPP)",
    "about.chip3": "Bilingual EN/中文", "about.chip4": "Beauty · Luxury · Travel",

    "strengths.title": "Capabilities",
    "strengths.p1.title": "Insight, Research & Data",
    "strengths.p1.body": "Primary and secondary research — surveys, interviews and netnography — paired with structured data collection, quantitative analysis and visualisation that turn raw signals into decision-ready insight.",
    "strengths.p1.proof": "69-respondent survey; structured competitor database + 2 heatmaps; netnography across RED / Threads / TikTok; Tableau & Power BI.",
    "strengths.p2.title": "Brand Strategy", "strengths.p2.body": "Positioning, competitive audit, campaign architecture and funnel design.",
    "strengths.p2.proof": "Landor payments audit adopted into a client's 2026 brand strategy.",
    "strengths.p3.title": "Content & Culture", "strengths.p3.body": "Trend forecasting, content and IP creative.",
    "strengths.p3.proof": "STEPIC trend forecast; 绿马 × 携程 IP pitch.",
    "strengths.p4.title": "AI & Intelligent Marketing",
    "strengths.p4.body": "Practical, hands-on command of AI tools (Claude, ChatGPT, Nation AI) to accelerate research, synthesis and reporting — plus a working grasp of AI-driven, intelligent-terminal marketing: smart-channel content and multi-platform KOL distribution.",
    "strengths.p4.proof": "AI-accelerated competitive audits at Landor (WPP); multi-platform influencer marketing across Douyin / Kuaishou / RED.",

    "work.title": "Selected Work", "work.count": "4 projects",

    "experience.title": "Experience",
    "exp.1.date": "May–Aug 2025", "exp.1.role": "Strategy Consulting Intern — Landor (WPP)", "exp.1.meta": "Shanghai",
    "exp.1.line": "Competitive brand audit adopted into the client's 2026 brand strategy; recommendation letter from the WPP China GM.",
    "exp.2.date": "Sep 2024–Apr 2025", "exp.2.role": "Marketing Intern — 3AM Entertainment", "exp.2.meta": "London",
    "exp.2.line": "13 campaigns, 200+ KOLs, +16% operational ROI.",
    "exp.3.date": "2024", "exp.3.role": "New-Media Content Ops — IST Aishang Tiandi (Syntax Kaya)", "exp.3.meta": "Nanjing",
    "exp.3.line": "Festival content calendars driving off-peak footfall.",
    "exp.4.date": "Feb 2025–present", "exp.4.role": "President — UALCSSA", "exp.4.meta": "London",
    "exp.4.line": "17 large events, 100% execution, 4 cross-functional teams; partnerships incl. Haidilao, Panda, London Square.",

    "skills.title": "Skills",
    "skills.biz": "Business & Strategy", "skills.bizList": "Competitive analysis · Consumer-insight research · Strategic reporting · Cross-functional collaboration",
    "skills.data": "Data tools & models", "skills.dataList": "Excel (Pivot Table / Lookup) · Power BI · Tableau · SQL",
    "skills.design": "Design & presentation", "skills.designList": "PowerPoint · Adobe Photoshop · Canva",
    "skills.lang": "Languages", "skills.langList": "English (fluent, written & spoken) · 中文",
    "skills.recognition": "Recommendation & Certificates",
    "skills.rec1": "Recommendation letter — Landor (WPP) China GM",
    "skills.rec2": "Internship certificate — Nanjing Dahui Enterprise Group (Marketing)",

    "contact.title": "Let's work together.", "contact.wechat": "WeChat: yuchen_L2827",

    "footer.portfolio": "Portfolio 2026", "footer.available": "Available for work",

    "modal.background": "Background", "modal.objective": "Objective", "modal.contribution": "My contribution",
    "modal.outcome": "Outcome", "modal.proves": "What it proves",
    "modal.deck": "Full deck", "modal.deckHint": "Use ← → arrows, or tap the edges, to move through the slides.",
    "modal.prev": "Previous slide", "modal.next": "Next slide",
    "modal.confidential": "Deck omitted — client-confidential (UnionPay). Available on request."
  },
  zh: {
    "nav.logo": "＋ 高语辰.",
    "nav.about": "关于", "nav.work": "作品", "nav.experience": "经历",
    "nav.skills": "技能", "nav.contact": "联系",

    "hero.name": "高语辰.",
    "hero.positioning": "双语品牌策略师 —— 将文化洞察转化为商业策略。",
    "hero.viewWork": "查看作品", "hero.downloadCV": "下载简历",
    "hero.metaPortfolio": "作品集 — 2026",

    "statement.a": "把文化转化为", "statement.b": "品牌策略", "statement.c": "",
    "statement.sub": "以消费者洞察、竞品审计与内容，助力品牌往返于中国与西方市场。",

    "about.title": "关于",
    "about.bio": "我是高语辰，伦敦艺术大学时尚营销与内容创作专业在读（GPA 3.9），将于2027年完成学业。我专注于消费者洞察与品牌策略的结合，中英双语、双文化背景，能为往返中西市场的品牌原生地做策略。",
    "about.bio2": "除了分析能力，我更是一个结构化的问题解决者，既能做严谨研究，也能完成有创意的落地。作为伦艺学联主席，我带领四个跨职能团队、谈成品牌合作，并以100%执行率落地17场活动；同时善用现代AI工具高效工作——既能把数据转化为策略，也能把策略讲成在中西两个市场都立得住的故事。",
    "about.chip1": "UAL · GPA 3.9", "about.chip2": "前 Landor（WPP）",
    "about.chip3": "中英双语", "about.chip4": "美妆 · 奢侈品 · 旅行",

    "strengths.title": "能力",
    "strengths.p1.title": "洞察、研究与数据",
    "strengths.p1.body": "一手与二手研究——问卷、访谈与网络民族志；结合结构化的数据收集、定量分析与可视化，将原始信号转化为可决策的洞察。",
    "strengths.p1.proof": "69份问卷；结构化竞品数据库＋2份热力图；横跨小红书 / Threads / TikTok 的网络民族志；Tableau 与 Power BI。",
    "strengths.p2.title": "品牌策略", "strengths.p2.body": "定位、竞品审计、传播架构与漏斗设计。",
    "strengths.p2.proof": "Landor 支付行业审计被客户纳入2026品牌策略。",
    "strengths.p3.title": "内容与文化", "strengths.p3.body": "趋势预测、内容与IP创意。",
    "strengths.p3.proof": "STEPIC 趋势预测；绿马 × 携程 IP 提案。",
    "strengths.p4.title": "AI 与智能营销",
    "strengths.p4.body": "扎实的 AI 工具实战能力（Claude、ChatGPT、Nation AI），用于加速研究、整合与报告产出；并理解与实践 AI 驱动的智能终端营销——智能渠道内容与多平台达人分发。",
    "strengths.p4.proof": "Landor（WPP）AI 加速竞品审计；横跨抖音 / 快手 / 小红书的多平台达人营销。",

    "work.title": "精选作品", "work.count": "4 个项目",

    "experience.title": "经历",
    "exp.1.date": "2025年5–8月", "exp.1.role": "策略咨询实习生 — Landor（WPP）", "exp.1.meta": "上海",
    "exp.1.line": "竞品品牌审计被客户纳入2026品牌策略；获WPP中国区总经理推荐信。",
    "exp.2.date": "2024年9月–2025年4月", "exp.2.role": "市场营销实习生 — 3AM Entertainment", "exp.2.meta": "伦敦",
    "exp.2.line": "13个项目，200+ KOL，运营ROI +16%。",
    "exp.3.date": "2024", "exp.3.role": "新媒体内容运营 — 爱尚天地（Syntax Kaya）", "exp.3.meta": "南京",
    "exp.3.line": "节庆内容日历，拉动淡季客流。",
    "exp.4.date": "2025年2月–至今", "exp.4.role": "主席 — UALCSSA", "exp.4.meta": "伦敦",
    "exp.4.line": "17场大型活动，100%执行，4个跨职能团队；核心合作含海底捞、熊猫、London Square。",

    "skills.title": "技能",
    "skills.biz": "业务与战略", "skills.bizList": "竞品分析 · 消费者洞察研究 · 战略报告撰写 · 跨部门协作",
    "skills.data": "数据工具及模型", "skills.dataList": "Excel（Pivot Table / Lookup）· Power BI · Tableau · SQL",
    "skills.design": "设计与演示", "skills.designList": "PowerPoint · Adobe Photoshop · 可画 Canva",
    "skills.lang": "语言", "skills.langList": "英语（书面及口语流利）· 中文",
    "skills.recognition": "推荐与证书",
    "skills.rec1": "朗涛（WPP 集团）中国区总经理推荐信",
    "skills.rec2": "南京大惠企业集团发展有限公司市场部实习证明",

    "contact.title": "期待与你合作", "contact.wechat": "微信：yuchen_L2827",

    "footer.portfolio": "作品集 2026", "footer.available": "开放合作机会",

    "modal.background": "背景", "modal.objective": "目标", "modal.contribution": "我的贡献",
    "modal.outcome": "成果", "modal.proves": "证明了什么",
    "modal.deck": "完整方案", "modal.deckHint": "用 ← → 方向键或点击两侧切换幻灯片。",
    "modal.prev": "上一页", "modal.next": "下一页",
    "modal.confidential": "方案应客户保密要求未公开（银联），可应需提供。"
  }
};

/* ---------- 2 · PROJECT DATA (bilingual) ----------
   Each case study reads the way a hiring lead reads:
   Background → Objective → My contribution → Outcome → What it proves.
*/
const PROJECTS = [
  {
    slug: "clarins", slides: 33,
    tag: { en: "Academic project · Full strategy deliverable", zh: "学术项目 · 完整策略交付" },
    title: { en: "Clarins — China Content-Marketing Strategy", zh: "Clarins — 中国内容营销策略" },
    result: { en: "69-respondent study → segment-specific TOFU / MOFU / BOFU strategy.", zh: "69人样本调研 → 分人群的 TOFU / MOFU / BOFU 策略。" },
    background: { en: "Clarins, a French heritage skincare house, holds deep credibility but a widening communication gap with Chinese Gen X women (45–60): high-spend and loyal, yet under-served by modern beauty marketing.", zh: "法国传承护肤品牌Clarins口碑深厚，却与中国45–60岁X世代女性沟通断层——她们高消费、忠诚，却在现代美妆营销中被忽视。" },
    objective: { en: "Close that gap with a content strategy grounded in real consumer behaviour, not assumptions.", zh: "以真实消费者行为而非假设为基础，用内容策略弥合断层。" },
    contribution: { en: "I designed and ran a 69-respondent WeChat survey in Jiangsu, layered in secondary research and a competitor analysis, built the buyer persona and pen portrait, audited existing content, then designed a full TOFU/MOFU/BOFU campaign funnel with mockups and a content calendar.", zh: "我设计并执行了一份69人江苏微信问卷，叠加二手研究与竞品分析，搭建买家画像与人物速写，审计现有内容，并设计了完整的 TOFU/MOFU/BOFU 活动漏斗（含示意稿）与内容日历。" },
    outcome: { en: "Key insight — Gen X discover on Douyin (84.1%) but still purchase offline first-hand, while hero anti-ageing lines (Precious, Multi-Active) are under-promoted. The result: a clear, segment-specific content strategy.", zh: "关键洞察——X世代在抖音种草（84.1%），但仍首选线下一手购买，而明星抗老线（Precious、Multi-Active）宣传不足。最终形成清晰的分人群内容策略。" },
    proves: { en: "End-to-end content strategy, primary research, segmentation and funnel design — directly relevant to beauty and luxury brand roles.", zh: "端到端内容策略、一手研究、人群细分与漏斗设计——与美妆、奢侈品品牌岗位高度相关。" }
  },
  {
    slug: "lifestyle", slides: 23,
    tag: { en: "Academic project · Foresight", zh: "学术项目 · 前瞻" },
    title: { en: "The Rise of Chinese Lifestyle Aesthetics — Trend Forecast", zh: "中式生活美学的崛起 — 趋势预测" },
    result: { en: "STEPIC + a 2035 scenario; \"participation over ownership\" thesis.", zh: "STEPIC ＋ 2035情景；\"参与重于占有\"的论点。" },
    background: { en: "Younger luxury consumers increasingly seek emotional fulfilment and authenticity over the ownership of objects.", zh: "年轻奢侈品消费者日益追求情感满足与真实体验，而非物品的占有。" },
    objective: { en: "Identify where luxury is heading — and what it means for fashion marketing — through 2035.", zh: "判断奢侈品的走向，及其对2035年前时尚营销的意义。" },
    contribution: { en: "I led a STEPIC macro-driver analysis, ran netnography across Reddit, Threads, Xiaohongshu and TikTok, validated signals with Google Trends, distilled four themes — Emotional Refuge, Ritual-based Living, Quiet Sophistication, Alternative Modernity — and built a 2035 future scenario.", zh: "我主导STEPIC宏观驱动分析，开展跨 Reddit、Threads、小红书、TikTok 的网络民族志，用Google Trends验证信号，提炼出四大主题——情绪庇护、仪式化生活、安静的精致、另类现代性——并推演了2035情景。" },
    outcome: { en: "A clear thesis: Chinese lifestyle aesthetics — tea ritual, wellness, slow living — as emerging luxury, defined by 'participation over ownership'.", zh: "明确论点：中式生活美学——茶道、养生、慢生活——正成为新兴奢侈，核心是\"参与重于占有\"。" },
    proves: { en: "Strategic foresight, cultural analysis, research design and China⇄West translation — a senior-flavoured skill rare in juniors.", zh: "战略前瞻、文化分析、研究设计与中西转译——一项在初级人才中罕见的资深技能。" }
  },
  {
    slug: "lvma-ctrip", slides: 13,
    tag: { en: "Self-initiated · Creative pitch · Travel × Culture", zh: "自发项目 · 创意提案 · 旅行 × 文化" },
    title: { en: "绿马 × 携程 — IP-Collaboration Pitch", zh: "绿马 × 携程 — IP 联名提案" },
    result: { en: "Dual-route IP concept tying culture, commerce and SDGs.", zh: "双路线IP概念，连接文化、商业与可持续发展目标。" },
    background: { en: "Travel demand is shifting from sightseeing to emotional and cultural experience, yet no product fuses 'emotional healing + cultural heritage'.", zh: "旅行需求正从观光转向情绪与文化体验，但市场尚无\"情绪疗愈＋文化传承\"的融合产品。" },
    objective: { en: "Design an IP collaboration that fills that emotional-value gap and gives Ctrip a differentiated market position.", zh: "设计一个填补情绪价值空白、并为携程带来差异化市场定位的IP联名。" },
    contribution: { en: "I built the brand-fit rationale (绿马: safety, companionship, cultural symbiosis); a festival emotion calendar; two customer routes — parent-child 'Little Guardian' and high-net-worth 'Zen art healing'; 非遗 craft workshops; an in-app 'Guardian Zone'; a KOL/UGC distribution matrix; and alignment to UN SDGs 4 / 8 / 11 / 17.", zh: "我构建了品牌契合论证（绿马：平安、陪伴、文化共生）；节日情绪日历；两条客群路线——亲子\"小骑士\"与高净值\"禅意艺境\"；非遗工坊；App内\"绿马守护专区\"；KOL/UGC传播矩阵；并对接联合国SDG 4 / 8 / 11 / 17。" },
    outcome: { en: "A complete, pitch-ready concept spanning brand strategy, customer segmentation, product, channel and social impact.", zh: "一份完整、可路演的方案，涵盖品牌策略、客群细分、产品、渠道与社会价值。" },
    proves: { en: "Creative strategy and integrated thinking — I can build the pitch, segment the audience and tie it to commercial and ESG goals.", zh: "创意策略与整合思维——我能搭建提案、细分受众，并将其与商业及ESG目标绑定。" }
  },
  {
    slug: "webl", slides: 28,
    tag: { en: "Real placement · Commercial real-estate marketing", zh: "真实实践 · 商业地产营销" },
    title: { en: "WEBL — New-Media Content Ops (Nanjing)", zh: "WEBL — 新媒体内容运营（南京）" },
    result: { en: "Festival content calendars driving off-peak footfall.", zh: "节庆内容日历，拉动淡季客流。" },
    background: { en: "A placement running new-media content for IST Aishang Tiandi, a lifestyle shopping mall in Nanjing.", zh: "为南京生活方式购物中心 IST 爱尚天地运营新媒体内容的实习。" },
    objective: { en: "Sustain online engagement and offline footfall through off-peak periods.", zh: "在淡季维持线上互动与线下客流。" },
    contribution: { en: "I built monthly content calendars tied to festivals and campaigns, amplified tenant promotions across the mall's channels, and supported both online engagement and offline footfall — closing with a SWOT and reflection.", zh: "我搭建了结合节庆与活动的月度内容日历，在商场各渠道放大商户促销，带动线上互动与线下客流，并以 SWOT 与复盘收尾。" },
    outcome: { en: "Festival content calendars that drove off-peak footfall and lifted tenant visibility.", zh: "节庆内容日历拉动了淡季客流，并提升了商户曝光。" },
    proves: { en: "Applied content operations and commercial marketing in a real placement.", zh: "在真实实习中落地的内容运营与商业营销能力。" }
  }
];

/* ---------- 2b · EXPERIENCE DATA (from CV, bilingual) ---------- */
const EXPERIENCE = [
  {
    type: "edu",
    org:  { en: "University of the Arts London", zh: "伦敦艺术大学" },
    role: { en: "BA Fashion Marketing & Content Creation · GPA 3.9", zh: "时尚营销与内容创作（GPA 3.9）" },
    loc:  { en: "London, UK", zh: "伦敦，英国" },
    date: { en: "Sep 2024 – Jul 2027", zh: "2024年9月 – 2027年7月" },
    bullets: [
      { text: { en: "Core courses: Brand Marketing, International Marketing Strategy, Digital Marketing & Content Creation, Consumer Behaviour & Data Analysis, Industry Transformation & Future Trends.", zh: "核心课程：品牌营销、国际营销策略、数字营销与内容创作、消费者行为与数据分析、行业转型与未来趋势。" } }
    ]
  },
  {
    org:  { en: "Landor (WPP)", zh: "Landor（WPP）" },
    role: { en: "Strategy Consulting Intern", zh: "策略咨询实习生" },
    loc:  { en: "Shanghai, China", zh: "上海，中国" },
    date: { en: "May – Aug 2025", zh: "2025年5月 – 2025年8月" },
    bullets: [
      { lead: { en: "UnionPay competitive brand audit", zh: "银联竞品品牌审计" },
        text: { en: "ran market intelligence and desk research across the payments sector, collected multi-dimensional competitor data and built a structured database (supporting 2 client proposals); built a comparison framework, quantified UnionPay's gap versus Alipay and WeChat Pay, and produced 2 heatmaps pinpointing 5 core optimisation directions.", zh: "开展支付赛道的市场情报与案头研究，收集多维竞品数据并搭建结构化数据库（支撑2次提案）；构建对比框架，定量分析银联与支付宝、微信支付的差距，输出2份热力图，明确5个核心优化方向。" } },
      { lead: { en: "Insight synthesis & report delivery", zh: "洞察整合与报告交付" },
        text: { en: "turned analysis into actionable strategy and co-wrote the brand-positioning, user-insight and optimisation chapters — the report was adopted by the UnionPay team as a core reference for its 2026 brand strategy.", zh: "将分析结论转化为可落地策略，参与撰写品牌定位、用户洞察与优化建议三大章节；报告获银联项目组采纳，成为其2026年品牌策略调整的核心参考。" } },
      { lead: { en: "Huawei brand refresh", zh: "华为品牌焕新" },
        text: { en: "used a comparison framework and Tableau to break down positioning differences and deliver actionable recommendations; ran AI-assisted research (ChatGPT, Claude, Nation AI) to compress research and reporting cycles; coordinated Landor design and WPP marketing teams against weekly milestones.", zh: "运用对比分析框架与Tableau拆解定位差异、输出可落地建议；以AI辅助调研（ChatGPT、Claude、Nation AI）缩短案头研究与报告周期；协同朗涛设计与WPP市场团队推进周度里程碑。" } }
    ],
    note: { en: "Backed by a recommendation letter from the WPP China GM.", zh: "并获WPP中国区总经理推荐信背书。" }
  },
  {
    org:  { en: "3AM Entertainment", zh: "3AM Entertainment" },
    role: { en: "Marketing Intern", zh: "市场部实习生" },
    loc:  { en: "London, UK", zh: "伦敦，英国" },
    date: { en: "Sep 2024 – Apr 2025", zh: "2024年9月 – 2025年4月" },
    bullets: [
      { text: { en: "Produced 13 creative proposals and ran offline events (gallery, KTV, bar, product launches), driving 650+ new community members and building reusable execution templates.", zh: "产出13份创意提案，统筹画廊、KTV、酒吧、产品发布等线下活动，带动社群新增650+用户，沉淀可复用执行模板。" } },
      { text: { en: "Developed 200+ London store-visit KOL/KOC partnerships, lifting brand exposure and awareness in the target market.", zh: "对接200+伦敦探店类KOL/KOC合作推广，提升品牌在目标市场的曝光与知名度。" } },
      { text: { en: "Built detailed event budgets and controlled venue and material costs, improving operational ROI by 16% without compromising quality.", zh: "制定精细化活动预算，严控场地与物料成本，在保障质量前提下将运营ROI提升16%。" } }
    ]
  },
  {
    org:  { en: "Nanjing Dahui Group (Nanjing Da Pai Dang)", zh: "南京大惠企业集团（南京大排档）" },
    role: { en: "Business Development Intern", zh: "商务部实习生" },
    loc:  { en: "Nanjing, China", zh: "南京，中国" },
    date: { en: "Jul – Aug 2024", zh: "2024年7月 – 2024年8月" },
    bullets: [
      { text: { en: "Analysed food-sector trends, formats and sales data across Douyin, Kuaishou, Video Accounts and Taobao; used influencers' track records to flag category-fit risks early, avoiding ineffective collaborations and saving high slot fees.", zh: "分析抖音/快手/视频号/淘宝美食赛道趋势、玩法及销售数据，结合达人历史带货表现提前识别品类适配风险，规避无效合作、节省高额坑位费。" } },
      { text: { en: "Liaised with influencers and MCN agencies on negotiation, scheduling, client relations and deal-making; coordinated multi-platform influencer resources to land brand collaborations and optimise budget efficiency.", zh: "对接达人及MCN机构，支持合作洽谈、排期跟进、客情维护与商务谈判；统筹多平台达人资源，高效落地品牌合作、优化预算效率。" } }
    ]
  },
  {
    org:  { en: "UAL Chinese Students & Scholars Association (UALCSSA)", zh: "伦敦艺术大学中国学联（UALCSSA）" },
    role: { en: "President", zh: "主席" },
    loc:  { en: "London, UK", zh: "伦敦，英国" },
    date: { en: "Feb 2025 – present", zh: "2025年2月 – 至今" },
    bullets: [
      { text: { en: "Led partnerships with Haidilao, Panda Takeaway, EasyTransfer and London Square — independent proposals, custom terms and long-term comms mechanisms; secured sponsorship in funds and resources to power the annual programme.", zh: "主导海底捞、熊猫外卖、易思汇、London Square 等核心伙伴合作，独立提案、定制条款并建立长期沟通机制；统筹赞助资源，争取资金与物资支持，保障年度活动推进。" } },
      { text: { en: "Ran the full lifecycle of large cross-university events and managed 4 cross-functional teams — delivering 17 major events (yacht party, Beijing forum and more) at 100% execution and markedly raising the association's UK-wide profile.", zh: "统筹跨院校大型活动全流程，管理4个跨职能团队，分工、进度与突发处置并行；成功落地17场大型活动（游艇派对、北京论坛等），100%顺利执行，显著提升学联全英影响力。" } }
    ]
  }
];

/* ---------- 3 · LANGUAGE TOGGLE ---------- */
let currentLang = "zh";

function applyLang(lang){
  currentLang = lang;
  document.documentElement.lang = lang === "zh" ? "zh" : "en";

  document.querySelectorAll("[data-i18n]").forEach(el => {
    const key = el.getAttribute("data-i18n");
    const val = I18N[lang][key];
    if (val !== undefined){
      el.classList.add("lang-fade");
      el.textContent = val;
      requestAnimationFrame(() => el.classList.remove("lang-fade"));
    }
  });

  // toggle visual state
  document.querySelector(".lang-en").classList.toggle("is-active", lang === "en");
  document.querySelector(".lang-zh").classList.toggle("is-active", lang === "zh");

  renderWork();
  renderExperience();
  syncAboutPortrait();
}

/* Keep the About portrait the same height as the text block (top at (02),
   bottom level with the Download-CV button) at its native 4:5 ratio — no crop.
   Iterates because the photo's width affects how the text wraps. */
function syncAboutPortrait(){
  const body = document.querySelector(".about__body");
  const portrait = document.querySelector(".portrait");
  if (!body || !portrait) return;
  if (window.matchMedia("(max-width: 680px)").matches){
    portrait.style.width = ""; portrait.style.height = "";
    return;
  }
  for (let i = 0; i < 3; i++){
    const h = body.offsetHeight;
    portrait.style.height = h + "px";
    portrait.style.width = Math.round(h * 0.8) + "px";
  }
}

document.getElementById("langToggle").addEventListener("click", () => {
  applyLang(currentLang === "en" ? "zh" : "en");
});

/* ---------- 4 · WORK GRID ---------- */
function renderWork(){
  const grid = document.getElementById("workGrid");
  grid.innerHTML = "";
  PROJECTS.forEach((p, i) => {
    const card = document.createElement("article");
    card.className = "work-card reveal";
    card.setAttribute("role", "button");
    card.setAttribute("tabindex", "0");
    card.setAttribute("aria-label", p.title[currentLang]);
    card.innerHTML = `
      <div class="work-card__media" data-label="${escapeHtml(p.title[currentLang])}">
        <img src="${p.cover || `assets/work/${p.slug}/cover.jpg`}" alt="${escapeHtml(p.title[currentLang])}" loading="lazy"
             onerror="this.classList.add('img--missing')" />
        <span class="work-card__arrow" aria-hidden="true">↗</span>
      </div>
      <h3 class="work-card__title">${escapeHtml(p.title[currentLang])}</h3>
      <p class="work-card__result">${escapeHtml(p.result[currentLang])}</p>
      <span class="work-card__tag">${escapeHtml(p.tag[currentLang])}</span>
    `;
    const open = () => openModal(i);
    card.addEventListener("click", open);
    card.addEventListener("keydown", e => { if (e.key === "Enter" || e.key === " "){ e.preventDefault(); open(); } });
    grid.appendChild(card);
  });
  observeReveals();
}

function escapeHtml(s){
  return s.replace(/[&<>"']/g, c => ({ "&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;" }[c]));
}

/* ---------- 4b · EXPERIENCE TIMELINE ---------- */
function renderExperience(){
  const tl = document.getElementById("timeline");
  if (!tl) return;
  tl.innerHTML = "";
  EXPERIENCE.forEach(item => {
    const li = document.createElement("li");
    li.className = "timeline__row reveal" + (item.type === "edu" ? " timeline__row--edu" : "");
    const bullets = (item.bullets || []).map(b => {
      const lead = b.lead ? `<strong>${escapeHtml(b.lead[currentLang])} — </strong>` : "";
      return `<li>${lead}${escapeHtml(b.text[currentLang])}</li>`;
    }).join("");
    const note = item.note ? `<p class="timeline__note">${escapeHtml(item.note[currentLang])}</p>` : "";
    li.innerHTML = `
      <div class="timeline__date">${escapeHtml(item.date[currentLang])}</div>
      <div class="timeline__body">
        <h3>${escapeHtml(item.role[currentLang])} <span class="timeline__org">— ${escapeHtml(item.org[currentLang])}</span></h3>
        <p class="muted timeline__loc">${escapeHtml(item.loc[currentLang])}</p>
        <ul class="timeline__bullets">${bullets}</ul>
        ${note}
      </div>`;
    tl.appendChild(li);
  });
  observeReveals();
}

/* ---------- 5 · MODAL ---------- */
const modal = document.getElementById("modal");
const modalContent = document.getElementById("modalContent");
let lastFocused = null;
let deck = null; // active slide-viewer state: { slug, total, index }

function deckMarkup(p, t){
  if (p.confidential && !p.slides){
    return `<p class="modal__confidential">${t["modal.confidential"]}</p>`;
  }
  if (!p.slides) return "";
  return `
    <div class="deck" id="deck">
      <div class="deck__head">
        <h4>${t["modal.deck"]} · ${p.slides}</h4>
        <span class="deck__counter"><span id="deckNow">1</span> / ${p.slides}</span>
      </div>
      <div class="deck__stage">
        <button class="deck__nav deck__nav--prev" id="deckPrev" aria-label="${t["modal.prev"]}">‹</button>
        <div class="deck__frame">
          <img id="deckImg" src="assets/work/${p.slug}/slides/slide-01.jpg" alt="${escapeHtml(p.title[currentLang])} — slide 1" />
        </div>
        <button class="deck__nav deck__nav--next" id="deckNext" aria-label="${t["modal.next"]}">›</button>
      </div>
      <p class="deck__hint muted">${t["modal.deckHint"]}</p>
    </div>`;
}

function pad2(n){ return n < 10 ? "0" + n : "" + n; }

function showSlide(idx){
  if (!deck) return;
  deck.index = Math.max(0, Math.min(deck.total - 1, idx));
  const n = deck.index + 1;
  const img = document.getElementById("deckImg");
  img.src = `assets/work/${deck.slug}/slides/slide-${pad2(n)}.jpg`;
  img.alt = `${deck.title} — slide ${n}`;
  document.getElementById("deckNow").textContent = n;
  document.getElementById("deckPrev").disabled = deck.index === 0;
  document.getElementById("deckNext").disabled = deck.index === deck.total - 1;
}

function openModal(i){
  const p = PROJECTS[i];
  const t = I18N[currentLang];
  modalContent.innerHTML = `
    <span class="modal__tag">${escapeHtml(p.tag[currentLang])}</span>
    <h3 class="modal__title" id="modalTitle">${escapeHtml(p.title[currentLang])}</h3>
    <p class="modal__result">${escapeHtml(p.result[currentLang])}</p>
    ${deckMarkup(p, t)}
    <div class="modal__block"><h4>${t["modal.background"]}</h4><p>${escapeHtml(p.background[currentLang])}</p></div>
    <div class="modal__block"><h4>${t["modal.objective"]}</h4><p>${escapeHtml(p.objective[currentLang])}</p></div>
    <div class="modal__block"><h4>${t["modal.contribution"]}</h4><p>${escapeHtml(p.contribution[currentLang])}</p></div>
    <div class="modal__block"><h4>${t["modal.outcome"]}</h4><p>${escapeHtml(p.outcome[currentLang])}</p></div>
    <div class="modal__block"><h4>${t["modal.proves"]}</h4><p>${escapeHtml(p.proves[currentLang])}</p></div>
  `;

  // wire up the slide viewer if this project has a deck
  if (p.slides){
    deck = { slug: p.slug, total: p.slides, index: 0, title: p.title[currentLang] };
    document.getElementById("deckPrev").addEventListener("click", () => showSlide(deck.index - 1));
    document.getElementById("deckNext").addEventListener("click", () => showSlide(deck.index + 1));
    showSlide(0);
  } else {
    deck = null;
  }

  lastFocused = document.activeElement;
  modal.classList.add("is-open");
  modal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
  modal.scrollTop = 0;
  modal.querySelector(".modal__panel").scrollTop = 0;
  modal.querySelector(".modal__close").focus();
}

function closeModal(){
  modal.classList.remove("is-open");
  modal.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
  deck = null;
  if (lastFocused) lastFocused.focus();
}

modal.querySelectorAll("[data-close]").forEach(el => el.addEventListener("click", closeModal));
document.addEventListener("keydown", e => {
  if (!modal.classList.contains("is-open")) return;
  if (e.key === "Escape") closeModal();
  else if (deck && e.key === "ArrowLeft")  { e.preventDefault(); showSlide(deck.index - 1); }
  else if (deck && e.key === "ArrowRight") { e.preventDefault(); showSlide(deck.index + 1); }
});

/* ---------- 6 · NAV STATE ---------- */
const nav = document.getElementById("nav");
function onScroll(){ nav.classList.toggle("is-solid", window.scrollY > 80); }
window.addEventListener("scroll", onScroll, { passive: true });
onScroll();

/* ---------- 7 · MOBILE MENU ---------- */
const hamburger = document.getElementById("hamburger");
const overlayMenu = document.getElementById("overlayMenu");
function toggleMenu(open){
  document.body.classList.toggle("menu-open", open);
  hamburger.setAttribute("aria-expanded", String(open));
  overlayMenu.setAttribute("aria-hidden", String(!open));
}
hamburger.addEventListener("click", () => toggleMenu(!document.body.classList.contains("menu-open")));
overlayMenu.querySelectorAll("a").forEach(a => a.addEventListener("click", () => toggleMenu(false)));

/* ---------- 8 · SCROLL REVEAL ---------- */
let io;
function observeReveals(){
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const els = document.querySelectorAll(".reveal:not(.is-visible)");
  if (reduce){ els.forEach(el => el.classList.add("is-visible")); return; }
  if (!io){
    io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting){ entry.target.classList.add("is-visible"); io.unobserve(entry.target); }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -8% 0px" });
  }
  els.forEach(el => io.observe(el));
}

/* ---------- 9 · INIT ---------- */
let _aboutResize;
window.addEventListener("resize", () => { clearTimeout(_aboutResize); _aboutResize = setTimeout(syncAboutPortrait, 120); }, { passive: true });
if (document.fonts && document.fonts.ready) document.fonts.ready.then(syncAboutPortrait);

applyLang("zh");
observeReveals();
syncAboutPortrait();
