/* ============================================================
   Yuchen's Assistant — floating blob chat widget (front-end)
   Talks to /api/chat (serverless). Self-contained IIFE.
   ============================================================ */
(function () {
  "use strict";

  // ---- bilingual UI strings (UI follows the SITE language; replies follow
  //      whatever language the visitor types, handled server-side) ----
  const T = {
    en: {
      title: "Yuchen's Assistant",
      open: "Open chat assistant",
      close: "Close",
      dismiss: "Dismiss",
      placeholder: "Ask about Yuchen…",
      send: "Send",
      greeting: "Hi! I'm Yuchen's assistant ✨ Ask me about her work, skills, or how to get in touch.",
      hints: ["Chat with me ✨", "I can help with any questions about the portfolio 💬", "Anything you'd like to ask Yuchen?"],
      chips: [
        "What's her strongest project?",
        "Is she available for work?",
        "What can she do?",
        "What are her hobbies?",
        "她会中文吗？",
      ],
      error: "Oops, I'm a little tied up right now ✨ you can email Yuchen anytime at gaoyuchen2022uk@163.com.",
    },
    zh: {
      title: "高语辰的小助手",
      open: "打开聊天助手",
      close: "关闭",
      dismiss: "关闭提示",
      placeholder: "问问关于高语辰的事…",
      send: "发送",
      greeting: "你好！我是高语辰的小助手 ✨ 关于她的作品、能力或联系方式，都可以问我。",
      hints: ["可以和我对话哦 ✨", "我可以帮你解决对作品集的疑问哦 💬", "有什么想问问高语辰的嘛？"],
      chips: [
        "她最强的项目是哪个？",
        "她现在找工作吗？",
        "她能做什么？",
        "她平时有什么爱好？",
        "Does she speak English?",
      ],
      error: "哎呀，我这会儿有点忙不过来～你随时可以邮件高语辰：gaoyuchen2022uk@163.com ✨",
    },
  };

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  let lang = (document.documentElement.lang || "en").toLowerCase().startsWith("zh") ? "zh" : "en";
  const t = () => T[lang];

  // ---- offline brain: answers common questions from the portfolio/CV even with
  //      no serverless backend (static hosts). The live API is used first when
  //      available; this is the graceful fallback so the buttons always answer. ----
  const LOCAL_QA = [
    {
      keys: ["strong", "best", "most success", "successful", "favourite", "favorite", "impressive", "stand out", "最强", "最厉害", "最成功", "最好", "最出色", "最喜欢", "厉害", "最突出"],
      en: "Depends on the angle ✨ For data & research it's the Clarins strategy (a real 69-respondent study + full TOFU/MOFU/BOFU funnel) and her Landor (WPP) audit (quantitative gap analysis + heatmaps). For foresight, the Chinese Lifestyle Aesthetics 2035 forecast (STEPIC). For creative planning, the 绿马 × 携程 IP pitch. For real impact, Landor — her audit was adopted into the client's 2026 brand strategy. Which angle matters most to you?",
      zh: "要看哪个方面哦 ✨ 论分析与研究，是 Clarins 策略（真实 69 人调研＋完整 TOFU/MOFU/BOFU 漏斗）和她在朗涛 Landor（WPP）的竞品审计（定量差距分析＋热力图）；论前瞻预测，是《中式生活美学》2035 趋势预测（STEPIC）；论创意策划，是 绿马 × 携程 IP 提案；论真实影响，是朗涛——她的审计被客户采纳进 2026 品牌策略。你更看重哪个方面呢？",
    },
    {
      keys: ["available", "availab", "hire", "hiring", "join", "start date", "looking for a", "找工作", "在找", "工作吗", "入职", "可入职", "什么时候", "求职", "机会", "招"],
      en: "Yes — she's open to brand-strategy, consumer-insight and marketing roles, available from 23 June. Easiest way to reach her: gaoyuchen2022uk@163.com (WeChat: yuchen_L2827) ✨",
      zh: "在的～她正在寻找品牌策略、消费者洞察与市场营销相关的机会，最早 6 月 23 日可入职。联系方式：gaoyuchen2022uk@163.com（微信：yuchen_L2827）✨",
    },
    {
      keys: ["what can she do", "what does she do", "capab", "good at", "strength", "specialis", "specializ", "能做什么", "会做什么", "能力", "擅长", "技能", "会什么", "能干"],
      en: "She turns consumer & cultural insight into commercial strategy, across four areas ✨ Insight, Research & Data (surveys, netnography, Tableau/Power BI/SQL); Brand Strategy (positioning, competitive audit, funnels); Content & Culture (trend forecasting, IP creative); and AI & Intelligent Marketing (Claude/ChatGPT-accelerated research, multi-platform KOL). Bilingual EN/中文, bridging China and the West.",
      zh: "她把消费者与文化洞察转化为商业策略，主要四个方面 ✨ 洞察·研究·数据（问卷、网络民族志、Tableau/Power BI/SQL）；品牌策略（定位、竞品审计、漏斗）；内容与文化（趋势预测、IP 创意）；AI 与智能营销（Claude/ChatGPT 加速研究、多平台达人）。中英双语，连接中西市场。",
    },
    {
      keys: ["chinese", "english", "mandarin", "language", "bilingual", "speak", "中文", "英文", "英语", "双语", "语言", "会说"],
      en: "Both! She's fully bilingual — native 中文 and fluent English (written & spoken), and bicultural, so she can run strategy natively for brands moving between China and the West.",
      zh: "都会！她中英双语——中文母语，英语流利（书面与口语），且双文化背景，能为往返中西市场的品牌原生地做策略。",
    },
    {
      keys: ["contact", "reach", "email", "e-mail", "wechat", "phone", "get in touch", "联系", "邮箱", "邮件", "微信", "电话", "怎么找", "怎么联系"],
      en: "Easiest is email: gaoyuchen2022uk@163.com. Also WeChat yuchen_L2827 / phone +86 158 9597 2827. She's available from 23 June ✨",
      zh: "最方便是邮箱：gaoyuchen2022uk@163.com；也可微信 yuchen_L2827 / 电话 +86 158 9597 2827。最早 6 月 23 日可入职 ✨",
    },
    {
      keys: ["experience", "intern", "landor", "wpp", "unionpay", "huawei", "career", "经历", "实习", "工作经历", "履历", "朗涛", "银联", "华为"],
      en: "Her lead role: Landor (WPP) Strategy Consulting Intern (Shanghai, 2025) — her UnionPay competitive audit was adopted into the client's 2026 brand strategy, backed by a WPP China GM recommendation letter (plus a Huawei refresh). Also 3AM Entertainment (marketing, London — 200+ KOLs, +16% ROI), Nanjing Dahui Group (multi-platform influencer marketing), and UALCSSA President (17 events, 100% execution, 4 teams).",
      zh: "她的主推经历：朗涛 Landor（WPP）策略咨询实习（上海，2025）——银联竞品审计被客户采纳进 2026 品牌策略，并获 WPP 中国区总经理推荐信（另参与华为焕新）。此外有 3AM Entertainment 市场实习（伦敦，200+ 达人、ROI +16%）、南京大惠（多平台达人营销）、以及伦艺学联主席（17 场活动、100% 执行、4 个团队）。",
    },
    {
      keys: ["project", "portfolio", "case stud", "her work", "what work", "作品", "项目", "案例", "做过", "成果"],
      en: "Four featured projects ✨ 1) Clarins — China content-marketing strategy (69-respondent study → TOFU/MOFU/BOFU funnel); 2) The Rise of Chinese Lifestyle Aesthetics — a 2035 trend forecast; 3) 绿马 × 携程 — an IP-collaboration pitch; 4) WEBL — new-media content ops driving mall footfall. Want details on any one?",
      zh: "四个精选项目 ✨ 1）Clarins 中国内容营销策略（69 人调研 → TOFU/MOFU/BOFU 漏斗）；2）《中式生活美学的崛起》2035 趋势预测；3）绿马 × 携程 IP 联名提案；4）WEBL 新媒体内容运营（拉动商场客流）。想了解哪一个的细节？",
    },
    {
      keys: ["clarins", "娇韵诗"],
      en: "Clarins — China Content-Marketing Strategy (academic). She ran a real 69-respondent WeChat survey + secondary research, built personas and a content audit, and designed a full TOFU/MOFU/BOFU funnel. Key insight: Gen X women discover on Douyin (84.1%) but buy offline, and hero anti-ageing lines were under-promoted.",
      zh: "Clarins 中国内容营销策略（课程项目）。她做了真实的 69 人微信问卷＋二手研究，搭建用户画像与内容审计，并设计了完整的 TOFU/MOFU/BOFU 漏斗。关键洞察：X 世代女性在抖音种草（84.1%）但线下购买，明星抗老线宣传不足。",
    },
    {
      keys: ["lifestyle", "aesthetic", "forecast", "trend", "2035", "stepic", "生活美学", "趋势", "预测", "前瞻"],
      en: "The Rise of Chinese Lifestyle Aesthetics — a trend forecast (academic). STEPIC analysis + netnography (Reddit/Threads/Xiaohongshu/TikTok) + a 2035 scenario. Thesis: Chinese lifestyle aesthetics (tea ritual, wellness, slow living) as emerging luxury — 'participation over ownership.'",
      zh: "《中式生活美学的崛起》趋势预测（课程项目）。STEPIC 分析＋网络民族志（Reddit/Threads/小红书/TikTok）＋2035 情景。论点：中式生活美学（茶道、康养、慢生活）成为新兴奢侈——‘参与重于拥有’。",
    },
    {
      keys: ["绿马", "携程", "ctrip", "ip", "travel", "旅行", "联名"],
      en: "绿马 × 携程 (Ctrip) — a self-initiated IP-collaboration pitch. Brand-fit rationale, a festival emotion calendar, dual customer routes (parent-child 'Little Guardian' + high-net-worth 'Zen art healing'), 非遗 workshops, an in-app 'Guardian Zone', a KOL/UGC matrix, aligned to UN SDGs 4/8/11/17. A complete, pitch-ready concept.",
      zh: "绿马 × 携程——自发的 IP 联名提案。含品牌契合论证、节日情绪日历、双客群路线（亲子‘小骑士’＋高净值‘禅意艺境’）、非遗工坊、App‘绿马守护专区’、KOL/UGC 矩阵，并对接联合国 SDG 4/8/11/17。一份完整、可路演的方案。",
    },
    {
      keys: ["webl", "mall", "footfall", "nanjing", "real estate", "商场", "客流", "南京", "地产"],
      en: "WEBL — New-Media Content Ops at IST Aishang Tiandi mall, Nanjing (a real placement). She built monthly festival content calendars, amplified tenant promotions, and drove off-peak footfall, closing with a SWOT + reflection.",
      zh: "WEBL——南京 IST 爱尚天地商场新媒体内容运营（真实实习）。她搭建月度节庆内容日历、放大商户促销、拉动淡季客流，并以 SWOT 与复盘收尾。",
    },
    {
      keys: ["skill", "tool", "tableau", "power bi", "sql", "excel", "data", "技能", "工具", "数据", "软件"],
      en: "Skills span Business & Strategy (competitive analysis, consumer-insight research, strategic reporting), Data tools (Excel/Pivot+Lookup, Power BI, Tableau, SQL), Design (PowerPoint, Photoshop, Canva), AI (Claude, ChatGPT, Nation AI), and Languages (English + 中文).",
      zh: "技能涵盖业务与战略（竞品分析、消费者洞察、战略报告）、数据工具（Excel 透视表/查找、Power BI、Tableau、SQL）、设计（PowerPoint、Photoshop、Canva）、AI（Claude、ChatGPT、Nation AI）与语言（英语＋中文）。",
    },
    {
      keys: ["ai agent", "ai tool", "use ai", "uses ai", "using ai", "know ai", "ai skill", "artificial intelligence", "automation", "claude", "chatgpt", "gpt", "nation ai", "ygfinanceai", "用ai", "会用ai", "智能体", "人工智能", "ai 工具", "ai工具", "ai代理"],
      en: "Yes — she uses AI daily (Claude, ChatGPT, Nation AI) to speed up research, synthesis and reporting, and she's built her own conversational Finance AI Agents (Supplier Payment Inquiry + Internal Expense Reimbursement) — knowledge organisation, conversation-flow design, a KPI framework, and UAT testing. Try them at ygfinanceai.fun ✨",
      zh: "会的——她每天用 AI（Claude、ChatGPT、Nation AI）加速研究、整合与报告，还自己搭建了对话式金融 AI 智能体（供应商付款查询＋内部费用报销）：涵盖知识梳理、对话流程设计、KPI 框架与 UAT 测试。可在 ygfinanceai.fun 体验 ✨",
    },
    {
      keys: ["good fit", "fit for", "suitable", "right fit", "right person", "适合", "合适", "胜任", "对口"],
      en: "Strong fit for consumer / marketing / brand-strategy roles ✨ real consulting at Landor (WPP) with an adopted UnionPay audit, end-to-end consumer-insight work (Clarins: a 69-respondent study → funnel), trend forecasting, and data + AI fluency. Want me to point you to the most relevant project?",
      zh: "面向消费者／市场／品牌策略类岗位，她非常契合 ✨ 朗涛 Landor（WPP）真实咨询（银联审计被采纳）、端到端消费者洞察（Clarins：69 人调研→漏斗）、趋势预测，以及数据＋AI 能力。需要我推荐最相关的项目吗？",
    },
    {
      keys: ["interest", "hobby", "hobbies", "cook", "cooking", "food", "cuisine", "kitchen", "outside work", "for fun", "passion", "兴趣", "爱好", "做饭", "烹饪", "美食", "下厨", "厨", "生活热爱"],
      en: "Outside work she loves everyday life — especially cooking ✨ she's meticulous about picking the right cookware and ingredients for each occasion, and loves designing little things that make life easier for people around her. That same 'right tool for a real need, design around the person' instinct is exactly how she approaches human-centred, AI-assisted design — the very thread that runs through her conversational AI agents (see ygfinanceai.fun).",
      zh: "工作之外，她特别热爱生活——尤其是做饭 ✨ 会细致地为不同场景挑选合适的厨具与食材，也喜欢做些让身边人更省心的小设计。这种‘为真实需求选对工具、围绕人来设计’的直觉，正是她做以人为本、AI 助力设计的方式——同一条思路也贯穿她的对话式 AI 智能体（见 ygfinanceai.fun）。",
    },
    {
      keys: ["what role", "what roles", "what kind", "what position", "what job", "role type", "career direction", "open to", "open-minded", "what is she after", "what is she looking for", "求职方向", "找什么", "什么岗位", "岗位方向", "职位类型", "想找什么", "方向", "开放"],
      en: "She's open-minded and flexible about role type — happy to explore and adapt to the right fit ✨ Core directions: brand strategy, consumer insight, content & marketing, and increasingly AI-enabled roles (AI-assisted marketing, conversational-AI / agent design). For that AI / strategic-thinking / conversation-design / needs-insight side, see her finance AI agents at ygfinanceai.fun. Available from 23 June.",
      zh: "她对岗位类型很开放、也愿意尝试和适配——只要合适都乐意去试 ✨ 核心方向：品牌策略、消费者洞察、内容与市场营销，以及越来越多的 AI 相关岗位（AI 辅助营销、对话式 AI／智能体设计）。想看她在 AI／战略思考／对话设计／需求洞察方面的作品，可以看她的金融 AI 智能体：ygfinanceai.fun。最早 6 月 23 日可入职。",
    },
    {
      keys: ["who", "about", "introduce", "tell me about", "是谁", "介绍", "关于", "简介", "背景"],
      en: "Yuchen Gao (高语辰) is a bilingual brand strategist — a UAL Fashion Marketing student (GPA 3.9, graduating 2027) who turns cultural insight into commercial strategy across beauty, luxury, travel and lifestyle, bridging China and the West ✨",
      zh: "高语辰是一名中英双语品牌策略人——伦艺时尚营销在读（GPA 3.9，2027 毕业），擅长把文化洞察转化为商业策略，横跨美妆、奢侈品、旅行与生活方式，连接中西市场 ✨",
    },
  ];

  function localAnswer(text) {
    const q = (text || "").toLowerCase();
    let best = null, bestScore = 0;
    for (const item of LOCAL_QA) {
      let score = 0;
      for (const k of item.keys) if (q.indexOf(k.toLowerCase()) !== -1) score++;
      if (score > bestScore) { bestScore = score; best = item; }
    }
    return best ? (best[lang] || best.en) : null;
  }

  // conversation history sent to the API (role/content)
  const history = [];
  let open = false;
  let hintDismissed = false;
  let started = false; // first message sent (hides starter chips)
  let lastFocus = null;

  // ---- build DOM ----
  const root = document.getElementById("assistant-root") || (() => {
    const d = document.createElement("div");
    d.id = "assistant-root";
    document.body.appendChild(d);
    return d;
  })();

  const wrap = document.createElement("div");
  wrap.className = "asst";
  wrap.innerHTML = `
    <div class="asst__hint" id="asstHint" role="status">
      <span class="asst__hint-text" id="asstHintText"></span>
      <button class="asst__hint-x" id="asstHintX" aria-label="">✕</button>
    </div>
    <div class="asst__panel" id="asstPanel" role="dialog" aria-modal="true" aria-label="">
      <div class="asst__head">
        <span class="asst__avatar" aria-hidden="true"></span>
        <span class="asst__title" id="asstTitle"></span>
        <button class="asst__close" id="asstClose" aria-label="">✕</button>
      </div>
      <div class="asst__log" id="asstLog" aria-live="polite"></div>
      <div class="asst__chips" id="asstChips"></div>
      <form class="asst__input" id="asstForm">
        <textarea class="asst__field" id="asstField" rows="1" aria-label=""></textarea>
        <button class="asst__send" id="asstSend" type="submit" aria-label="">↑</button>
      </form>
    </div>
    <button class="asst__blob" id="asstBlob" aria-haspopup="dialog" aria-expanded="false" aria-label="">
      <span class="asst__blob-shape" aria-hidden="true"></span>
      <span class="asst__blob-glyph" aria-hidden="true">✦</span>
    </button>
  `;
  root.appendChild(wrap);

  const el = (id) => wrap.querySelector("#" + id);
  const blob = el("asstBlob"),
    panel = el("asstPanel"),
    hint = el("asstHint"),
    hintText = el("asstHintText"),
    hintX = el("asstHintX"),
    log = el("asstLog"),
    chips = el("asstChips"),
    form = el("asstForm"),
    field = el("asstField"),
    sendBtn = el("asstSend");

  // ---- apply language to static labels ----
  function applyLabels() {
    el("asstTitle").textContent = t().title;
    blob.setAttribute("aria-label", t().open);
    panel.setAttribute("aria-label", t().title);
    el("asstClose").setAttribute("aria-label", t().close);
    hintX.setAttribute("aria-label", t().dismiss);
    field.setAttribute("placeholder", t().placeholder);
    field.setAttribute("aria-label", t().placeholder);
    sendBtn.setAttribute("aria-label", t().send);
  }

  // ---- hint rotation ----
  let hintIdx = 0, hintTimer = null;
  function showHint() {
    if (hintDismissed || open) return;
    hint.classList.add("is-shown");
    hintText.textContent = t().hints[0];
    hintTimer = setInterval(() => {
      if (open || hintDismissed) return;
      hintIdx = (hintIdx + 1) % t().hints.length;
      hintText.style.opacity = "0";
      setTimeout(() => {
        hintText.textContent = t().hints[hintIdx];
        hintText.style.opacity = "1";
      }, reduceMotion ? 0 : 250);
    }, 4000);
  }
  function hideHint() { hint.classList.remove("is-shown"); }
  function dismissHint() {
    hintDismissed = true;
    hideHint();
    if (hintTimer) clearInterval(hintTimer);
  }

  // ---- render helpers ----
  function addBubble(role, text) {
    const row = document.createElement("div");
    row.className = "asst__row asst__row--" + (role === "user" ? "user" : "bot");
    row.innerHTML =
      (role === "user" ? "" : '<span class="asst__row-avatar" aria-hidden="true"></span>') +
      '<div class="asst__bubble"></div>';
    row.querySelector(".asst__bubble").textContent = text;
    log.appendChild(row);
    log.scrollTop = log.scrollHeight;
    return row;
  }
  function addTyping() {
    const row = document.createElement("div");
    row.className = "asst__row asst__row--bot";
    row.innerHTML =
      '<span class="asst__row-avatar" aria-hidden="true"></span>' +
      '<div class="asst__bubble"><span class="asst__typing"><span></span><span></span><span></span></span></div>';
    log.appendChild(row);
    log.scrollTop = log.scrollHeight;
    return row;
  }

  function renderChips() {
    chips.innerHTML = "";
    if (started) return;
    t().chips.forEach((c) => {
      const b = document.createElement("button");
      b.type = "button";
      b.className = "asst__chip";
      b.textContent = c;
      b.addEventListener("click", () => send(c));
      chips.appendChild(b);
    });
  }

  // ---- open / close ----
  function openPanel() {
    open = true;
    dismissHint();
    panel.classList.add("is-open");
    blob.setAttribute("aria-expanded", "true");
    if (!log.childElementCount) addBubble("bot", t().greeting);
    renderChips();
    lastFocus = document.activeElement;
    setTimeout(() => field.focus(), 50);
  }
  function closePanel() {
    open = false;
    panel.classList.remove("is-open");
    blob.setAttribute("aria-expanded", "false");
    if (lastFocus && lastFocus.focus) lastFocus.focus();
    else blob.focus();
  }
  blob.addEventListener("click", () => (open ? closePanel() : openPanel()));
  el("asstClose").addEventListener("click", closePanel);
  hintX.addEventListener("click", dismissHint);

  // Esc closes; basic focus trap inside the panel
  document.addEventListener("keydown", (e) => {
    if (!open) return;
    if (e.key === "Escape") { closePanel(); return; }
    if (e.key === "Tab") {
      const f = panel.querySelectorAll('button, textarea, [href], input, [tabindex]:not([tabindex="-1"])');
      if (!f.length) return;
      const first = f[0], last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    }
  });

  // ---- send a message ----
  async function send(text) {
    text = (text || "").trim();
    if (!text || sendBtn.disabled) return;
    if (!started) { started = true; renderChips(); }

    addBubble("user", text);
    history.push({ role: "user", content: text });
    field.value = "";
    autosize();
    sendBtn.disabled = true;
    const typing = addTyping();

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: history.slice(-8) }),
      });
      if (!res.ok) throw new Error("chat failed");
      const data = await res.json();
      const reply = (data && data.reply) ? data.reply : (localAnswer(text) || t().error);
      typing.remove();
      addBubble("bot", reply);
      history.push({ role: "assistant", content: reply });
    } catch (err) {
      // No live backend (e.g. static host) — answer common questions locally.
      console.error("assistant /api/chat error:", err);
      typing.remove();
      const reply = localAnswer(text) || t().error;
      addBubble("bot", reply);
      history.push({ role: "assistant", content: reply });
    } finally {
      sendBtn.disabled = false;
      if (open) field.focus();
    }
  }

  form.addEventListener("submit", (e) => { e.preventDefault(); send(field.value); });
  field.addEventListener("keydown", (e) => {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(field.value); }
  });

  function autosize() {
    field.style.height = "auto";
    field.style.height = Math.min(field.scrollHeight, 96) + "px";
  }
  field.addEventListener("input", autosize);

  // ---- react to site language toggle (watches <html lang>) ----
  new MutationObserver(() => {
    const next = (document.documentElement.lang || "en").toLowerCase().startsWith("zh") ? "zh" : "en";
    if (next !== lang) {
      lang = next;
      applyLabels();
      if (!started && open) {
        // refresh greeting + chips if the conversation hasn't started yet
        if (log.firstElementChild) { log.innerHTML = ""; addBubble("bot", t().greeting); }
        renderChips();
      } else {
        renderChips();
      }
      if (!hintDismissed && !open) { hintIdx = 0; hintText.textContent = t().hints[0]; }
    }
  }).observe(document.documentElement, { attributes: true, attributeFilter: ["lang"] });

  // ---- init ----
  applyLabels();
  renderChips();
  if (!reduceMotion) {
    setTimeout(() => { if (!open && !hintDismissed) showHint(); }, 600);
  } else {
    setTimeout(() => { if (!open && !hintDismissed) { hint.classList.add("is-shown"); hintText.textContent = t().hints[0]; } }, 600);
  }
})();
