/* ============================================================
   প্রতারক খোঁজি — main app logic (works on all pages)
   ============================================================ */

/* ---------- বাংলা সংখ্যা রূপান্তর ---------- */
const BN_DIGITS = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];
function toBn(str) {
  return String(str).replace(/[0-9]/g, (d) => BN_DIGITS[+d]);
}
function bnToEn(s) {
  return String(s).replace(/[০-৯]/g, (d) => String(BN_DIGITS.indexOf(d)));
}
const BN_MONTHS = ["জানুয়ারি", "ফেব্রুয়ারি", "মার্চ", "এপ্রিল", "মে", "জুন", "জুলাই", "আগস্ট", "সেপ্টেম্বর", "অক্টোবর", "নভেম্বর", "ডিসেম্বর"];
function formatBnDate(str) {
  const parts = bnToEn(str).split("-");
  if (parts.length !== 3) return toBn(str);
  return `${toBn(+parts[2])} ${BN_MONTHS[+parts[1] - 1]}, ${toBn(+parts[0])}`;
}
function reportCode(r) {
  return "#" + toBn(r.code || 1000 + r.id);
}
function icon(name, cls = "ic") {
  return `<svg class="${cls}" aria-hidden="true"><use href="#${name}"/></svg>`;
}
function bnMoney(n) {
  return "৳" + toBn(Math.round(n).toLocaleString("en-US"));
}
function maskPhone(phone) {
  const p = bnToEn(phone).replace(/\D/g, "");
  if (p.length >= 6) return p.slice(0, 4) + "••" + p.slice(-2);
  return phone;
}
function normalizeNum(phone) {
  return bnToEn(phone).replace(/[^\d]/g, "").replace(/^88/, "");
}
function riskLevel(r) {
  if (r.reportsCount >= 12) return { label: "উচ্চ ঝুঁকি", cls: "risk-high" };
  if (r.reportsCount >= 5) return { label: "মাঝারি ঝুঁকি", cls: "risk-mid" };
  return { label: "নিম্ন ঝুঁকি", cls: "risk-low" };
}
function statusBadge(r) {
  return r.status === "verified"
    ? `<span class="badge badge-verified">${icon("i-check")} যাচাই করা</span>`
    : `<span class="badge badge-pending">${icon("i-clock")} পর্যালোচনাধীন</span>`;
}

/* ---------- navbar ---------- */
const navbar = document.getElementById("navbar");
const hamburger = document.getElementById("hamburger");
window.addEventListener("scroll", () => {
  navbar.classList.toggle("scrolled", window.scrollY > 30);
});
hamburger.addEventListener("click", () => navbar.classList.toggle("open"));
document.querySelectorAll(".nav-links a").forEach((a) =>
  a.addEventListener("click", () => navbar.classList.remove("open"))
);

/* ---------- reveal on scroll ---------- */
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add("visible");
        revealObserver.unobserve(e.target);
      }
    });
  },
  { threshold: 0.12 }
);
document.querySelectorAll(".reveal:not(.visible)").forEach((el) => revealObserver.observe(el));

/* ============================================================
   HOMEPAGE: stat counters
   ============================================================ */
const statNums = document.querySelectorAll(".stat-num");
if (statNums.length) {
  function animateCount(el) {
    const target = +el.dataset.count;
    const dur = 1400;
    const start = performance.now();
    function tick(now) {
      const p = Math.min((now - start) / dur, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      el.textContent = toBn(Math.floor(target * eased)) + (p === 1 && target >= 1000 ? "+" : "");
      if (p < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }
  const statObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) { animateCount(e.target); statObserver.unobserve(e.target); }
      });
    },
    { threshold: 0.4 }
  );
  statNums.forEach((el) => statObserver.observe(el));
}

/* ============================================================
   HOMEPAGE: search
   ============================================================ */
const searchInput = document.getElementById("searchInput");
if (searchInput) {
  const searchBtn = document.getElementById("searchBtn");
  const searchResult = document.getElementById("searchResult");

  function doSearch() {
    const q = searchInput.value.trim();
    searchResult.innerHTML = "";
    if (!q) return;

    const qNum = normalizeNum(q);
    const qText = q.toLowerCase();
    const all = getAllReports();

    const matches = all.filter((r) => {
      if (qNum.length >= 4 && normalizeNum(r.phone).includes(qNum)) return true;
      return r.name.toLowerCase().includes(qText) || r.type.toLowerCase().includes(qText);
    });

    if (matches.length === 0) {
      searchResult.innerHTML = `
        <div class="result-card result-safe">
          <div class="result-icon">${icon("i-check-circle", "ic ic-big")}</div>
          <div>
            <h3>ডেটাবেজে পাওয়া যায়নি</h3>
            <p>"${q}" — এই তথ্য দিয়ে আমাদের কাছে এখন পর্যন্ত কোনো রিপোর্ট নেই। তবে সাবধান! লিস্টে না থাকা মানে নিরাপদ নয় — লেনদেনের আগে একটু ভেবে করুন, আর ঠকলে <a href="report.html">রিপোর্ট করুন</a>।</p>
          </div>
        </div>`;
    } else {
      const totalReports = matches.length;
      const verified = matches.filter((m) => m.status === "verified").length;
      const totalLoss = matches.reduce((s, m) => s + (+m.amount || 0), 0);
      searchResult.innerHTML = `
        <div class="result-card result-found">
          <div class="result-icon">${icon("i-alert", "ic ic-big")}</div>
          <div style="flex:1">
            <h3>সতর্ক হোন! ${toBn(totalReports)} টি রিপোর্ট পাওয়া গেছে</h3>
            <p><strong>${matches[0].name}</strong> (${maskPhone(matches[0].phone)}) — এই তথ্যের বিরুদ্ধে ${toBn(totalReports)} জন রিপোর্ট করেছেন, মোট ক্ষতি প্রায় ${bnMoney(totalLoss)}।</p>
            <div class="result-meta">
              ${verified > 0
                ? `<span class="result-chip">${icon("i-check")} ${toBn(verified)} টি যাচাই করা</span>`
                : `<span class="result-chip">${icon("i-clock")} যাচাই চলছে</span>`}
              <span class="result-chip">${icon("i-file")} ধরনঃ ${matches[0].type}</span>
            </div>
            <div style="margin-top:14px">
              <button class="btn btn-primary" style="padding:8px 18px;font-size:0.9rem" onclick="openModalById(${matches[0].id})">বিস্তারিত দেখুন</button>
            </div>
          </div>
        </div>`;
    }
    searchResult.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }
  searchBtn.addEventListener("click", doSearch);
  searchInput.addEventListener("keydown", (e) => { if (e.key === "Enter") doSearch(); });
  document.querySelectorAll(".tag").forEach((t) =>
    t.addEventListener("click", () => { searchInput.value = t.dataset.q === "bikash" ? "বিকাশ" : t.dataset.q; doSearch(); })
  );
}

/* ============================================================
   REPORTS GRID — homepage (preview) / reports page (full)
   ============================================================ */
const reportsGrid = document.getElementById("reportsGrid");
if (reportsGrid) {
  const isFullPage = !!document.getElementById("rpStatus"); /* reports.html */
  const loadMoreBtn = document.getElementById("loadMoreBtn");
  const rpCount = document.getElementById("rpCount");
  const PAGE_SIZE = isFullPage ? 9 : 6;
  let shown = PAGE_SIZE;
  let state = { status: "all", category: "all", q: "", sort: "recent" };

  function filteredList() {
    let list = [...getAllReports()];
    if (isFullPage) {
      if (state.status !== "all") list = list.filter((r) => r.status === state.status);
      if (state.category !== "all") list = list.filter((r) => r.type === state.category);
      if (state.q) {
        const qn = normalizeNum(state.q);
        const qt = state.q.toLowerCase();
        list = list.filter((r) =>
          r.name.toLowerCase().includes(qt) ||
          (qn.length >= 4 && normalizeNum(r.phone).includes(qn))
        );
      }
      if (state.sort === "reports") list.sort((a, b) => b.reportsCount - a.reportsCount);
      else if (state.sort === "loss") list.sort((a, b) => (b.amount || 0) - (a.amount || 0));
      else list.sort((a, b) => bnToEn(b.date).localeCompare(bnToEn(a.date)));
    } else {
      list.sort((a, b) => bnToEn(b.date).localeCompare(bnToEn(a.date)));
    }
    return list;
  }

  function renderReports() {
    const list = filteredList();
    const slice = list.slice(0, shown);
    reportsGrid.innerHTML = slice
      .map(
        (r, i) => `
        <div class="report-card" style="animation-delay:${i * 0.05}s" onclick="openModalById(${r.id})">
          <div class="rc-top">
            ${statusBadge(r)}
            <span class="rc-date">${icon("i-calendar")} ${formatBnDate(r.date)}</span>
          </div>
          <h3 class="rc-name">${r.name}</h3>
          <div class="rc-meta">
            <span class="phone">${icon("i-phone")} ${maskPhone(r.phone)}</span>
            <span class="reports">${icon("i-alert")} ${toBn(r.reportsCount)} রিপোর্ট</span>
          </div>
          <span class="rc-cat">ক্যাটাগরি: ${r.type}</span>
          <p class="rc-desc">${r.desc}</p>
          <div class="rc-foot">
            <span class="rc-id">রিপোর্ট ID: ${reportCode(r)}</span>
            <span class="rc-more">বিস্তারিত দেখুন ${icon("i-arrow")}</span>
          </div>
        </div>`
      )
      .join("");

    if (isFullPage) {
      const total = list.length;
      rpCount.innerHTML = `${icon("i-file")} <strong>${toBn(Math.min(shown, total))}</strong> টি দেখানো হচ্ছে — মোট <strong>${toBn(total)}</strong> টি রিপোর্ট`;
      loadMoreBtn.style.display = total > shown ? "inline-flex" : "none";
      loadMoreBtn.innerHTML = `আরও দেখুন ↓ (আরও ${toBn(total - shown)})`;
    } else {
      loadMoreBtn.style.display = "inline-flex";
      loadMoreBtn.innerHTML = `সব রিপোর্ট দেখুন (${toBn(list.length)}) ${icon("i-arrow")}`;
    }
  }

  if (isFullPage) {
    const rpSearch = document.getElementById("rpSearch");
    const rpCategory = document.getElementById("rpCategory");
    const rpSort = document.getElementById("rpSort");

    rpSearch.addEventListener("input", () => { state.q = rpSearch.value.trim(); shown = PAGE_SIZE; renderReports(); });
    rpCategory.innerHTML = `<option value="all">সব ক্যাটাগরি</option>` +
      SCAM_TYPES.map((t) => `<option value="${t}">${t}</option>`).join("");
    rpCategory.addEventListener("change", () => { state.category = rpCategory.value; shown = PAGE_SIZE; renderReports(); });
    rpSort.addEventListener("change", () => { state.sort = rpSort.value; shown = PAGE_SIZE; renderReports(); });

    document.querySelectorAll("#rpStatus .filter-btn").forEach((btn) =>
      btn.addEventListener("click", () => {
        document.querySelectorAll("#rpStatus .filter-btn").forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");
        state.status = btn.dataset.filter;
        shown = PAGE_SIZE;
        renderReports();
      })
    );
    loadMoreBtn.addEventListener("click", () => { shown += PAGE_SIZE; renderReports(); });
  } else {
    loadMoreBtn.addEventListener("click", () => { window.location.href = "reports.html"; });
  }
  renderReports();
}

/* ============================================================
   MODAL — professional case file + evidence gallery
   ============================================================ */
const modalOverlay = document.getElementById("modalOverlay");
if (modalOverlay) {
  const modalContent = document.getElementById("modalContent");

  window.openModalById = function (id) {
    const r = getAllReports().find((x) => x.id === id);
    if (!r) return;

    const ev = (r.evidence || []).map((e) =>
      typeof e === "string" ? { label: "প্রমাণ স্ক্রিনশট", src: e } : e
    );
    const risk = riskLevel(r);
    const initial = (r.name.replace(/[^অ-সA-Za-z]/g, "").trim() || "প")[0];

    modalContent.innerHTML = `
      <button class="modal-close" aria-label="বন্ধ করুন" onclick="closeModal()">${icon("i-x")}</button>
      <div class="m-head">
        <div class="m-avatar">${initial}</div>
        <div class="m-head-info">
          <div class="m-head-top">${statusBadge(r)}<span class="m-risk ${risk.cls}">${icon("i-alert")} ${risk.label}</span></div>
          <h3 class="m-name">${r.name}</h3>
          <div class="m-sub">${icon("i-phone")} ${r.phone} &nbsp;·&nbsp; ${icon("i-pin")} ${r.district}</div>
        </div>
      </div>
      <span class="rc-cat m-cat-top">ক্যাটাগরি: ${r.type}</span>
      <div class="m-info-grid">
        ${mInfo("i-calendar", "ঘটনার তারিখ", formatBnDate(r.date))}
        ${mInfo("i-card", "ক্ষতির পরিমাণ", bnMoney(r.amount || 0))}
        ${mInfo("i-alert", "মোট রিপোর্ট", toBn(r.reportsCount) + " টি")}
        ${mInfo("i-file", "রিপোর্ট ID", reportCode(r))}
      </div>
      <div class="m-sec-title">${icon("i-file")} ঘটনার বিবরণ</div>
      <p class="m-desc">${r.desc}</p>
      ${ev.length ? `
        <div class="m-sec-title">${icon("i-image")} প্রমাণ স্ক্রিনশট (${toBn(ev.length)}টি)</div>
        <div class="m-gallery">
          ${ev.map((e, i) => `
            <div class="m-thumb" data-idx="${i}">
              <img src="${e.src}" alt="${e.label}" loading="lazy" />
              <span class="m-thumb-label">${e.label}</span>
              <span class="m-thumb-zoom">${icon("i-search")}</span>
            </div>`).join("")}
        </div>` : ""}
      <div class="m-sec-title">${icon("i-shield")} সতর্কতা</div>
      <p class="m-desc" style="margin-bottom:0">এই নম্বর/আইডির সাথে লেনদেন করবেন না। আপনিও ঠকে থাকলে রিপোর্ট করুন — রিপোর্ট যত বাড়বে, প্রমাণ তত শক্ত হবে।</p>
      <a href="report.html" class="btn btn-primary btn-block" style="margin-top:18px">এই প্রতারকের বিরুদ্ধে রিপোর্ট করুন ${icon("i-arrow")}</a>
    `;

    modalContent.querySelectorAll(".m-thumb").forEach((t) =>
      t.addEventListener("click", () => openLightbox(ev, +t.dataset.idx))
    );

    modalOverlay.classList.add("show");
    document.body.style.overflow = "hidden";
  };
  window.closeModal = function () {
    modalOverlay.classList.remove("show");
    document.body.style.overflow = "";
    closeLightbox();
  };
  modalOverlay.addEventListener("click", (e) => { if (e.target === modalOverlay) closeModal(); });
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") closeModal(); });

  function mInfo(ic, label, val) {
    return `<div class="m-info">${icon(ic)}<div><span class="m-info-label">${label}</span><span class="m-info-val">${val}</span></div></div>`;
  }

  /* ---------- evidence lightbox ---------- */
  let lbEl = null, lbItems = [], lbIdx = 0;
  function openLightbox(items, idx) {
    lbItems = items; lbIdx = idx;
    if (!lbEl) {
      lbEl = document.createElement("div");
      lbEl.className = "lightbox";
      lbEl.innerHTML = `
        <button class="lb-btn lb-close" aria-label="বন্ধ">${icon("i-x")}</button>
        <button class="lb-btn lb-prev" aria-label="আগেরটি">${icon("i-arrow")}</button>
        <img class="lb-img" alt="প্রমাণ" />
        <div class="lb-cap"></div>
        <button class="lb-btn lb-next" aria-label="পরেরটি">${icon("i-arrow")}</button>`;
      document.body.appendChild(lbEl);
      lbEl.querySelector(".lb-close").addEventListener("click", closeLightbox);
      lbEl.querySelector(".lb-prev").addEventListener("click", (e) => { e.stopPropagation(); lbShow(lbIdx - 1); });
      lbEl.querySelector(".lb-next").addEventListener("click", (e) => { e.stopPropagation(); lbShow(lbIdx + 1); });
      lbEl.addEventListener("click", (e) => { if (e.target === lbEl) closeLightbox(); });
      document.addEventListener("keydown", (e) => {
        if (!lbEl.classList.contains("show")) return;
        if (e.key === "Escape") closeLightbox();
        if (e.key === "ArrowLeft") lbShow(lbIdx - 1);
        if (e.key === "ArrowRight") lbShow(lbIdx + 1);
      });
    }
    lbEl.classList.add("show");
    lbShow(lbIdx);
  }
  function lbShow(i) {
    lbIdx = (i + lbItems.length) % lbItems.length;
    lbEl.querySelector(".lb-img").src = lbItems[lbIdx].src;
    lbEl.querySelector(".lb-cap").textContent = `${lbItems[lbIdx].label} — ${toBn(lbIdx + 1)}/${toBn(lbItems.length)}`;
  }
  function closeLightbox() {
    if (lbEl) lbEl.classList.remove("show");
  }
}

/* ============================================================
   ANALYSIS PAGE
   ============================================================ */
const anStats = document.getElementById("anStats");
if (anStats) {
  const all = getAllReports();
  const total = all.length;
  const verified = all.filter((r) => r.status === "verified").length;
  const pending = total - verified;
  const totalLoss = all.reduce((s, r) => s + (+r.amount || 0), 0);
  const avgLoss = total ? totalLoss / total : 0;

  const tile = (ic, label, val) => `
    <div class="an-tile">
      <span class="an-tile-icon">${icon(ic)}</span>
      <div>
        <span class="an-tile-val">${val}</span>
        <span class="an-tile-label">${label}</span>
      </div>
    </div>`;
  anStats.innerHTML =
    tile("i-file", "মোট রিপোর্ট", toBn(total)) +
    tile("i-check-circle", "যাচাই করা প্রতারক", toBn(verified)) +
    tile("i-card", "মোট ক্ষতির পরিমাণ", bnMoney(totalLoss)) +
    tile("i-trend", "গড় ক্ষতি (প্রতি রিপোর্ট)", bnMoney(avgLoss));

  const bars = (entries, valFn, fmtFn) => {
    const max = Math.max(...entries.map((e) => valFn(e)), 1);
    return entries.map((e) => `
      <div class="an-bar-row">
        <span class="an-bar-label">${e[0]}</span>
        <div class="an-bar-track"><div class="an-bar-fill" style="width:${(valFn(e) / max) * 100}%"></div></div>
        <span class="an-bar-val">${fmtFn(e)}</span>
      </div>`).join("");
  };

  /* by category */
  const catCount = {};
  all.forEach((r) => { catCount[r.type] = (catCount[r.type] || 0) + 1; });
  const cats = Object.entries(catCount).sort((a, b) => b[1] - a[1]);
  document.getElementById("anCategories").innerHTML = bars(cats, (c) => c[1], (c) => toBn(c[1]));

  /* loss by category */
  const lossEl = document.getElementById("anLoss");
  if (lossEl) {
    const catLoss = {};
    all.forEach((r) => { catLoss[r.type] = (catLoss[r.type] || 0) + (+r.amount || 0); });
    const lossEntries = Object.entries(catLoss).sort((a, b) => b[1] - a[1]);
    lossEl.innerHTML = bars(lossEntries, (e) => e[1], (e) => bnMoney(e[1]));
  }

  /* status donut */
  const frac = total ? verified / total : 0;
  const C = 2 * Math.PI * 54;
  document.getElementById("anStatus").innerHTML = `
    <div class="an-donut-wrap">
      <svg viewBox="0 0 140 140" class="an-donut-svg">
        <circle cx="70" cy="70" r="54" fill="none" stroke="#F0EBDF" stroke-width="16"/>
        <circle cx="70" cy="70" r="54" fill="none" stroke="#E93649" stroke-width="16" stroke-linecap="round"
          stroke-dasharray="${C * frac} ${C}" transform="rotate(-90 70 70)"/>
        <text x="70" y="68" text-anchor="middle" class="an-donut-num">${toBn(total)}</text>
        <text x="70" y="88" text-anchor="middle" class="an-donut-cap">মোট রিপোর্ট</text>
      </svg>
      <ul class="an-legend">
        <li><span class="an-dot" style="background:#E93649"></span> যাচাই করা — <strong>${toBn(verified)}</strong></li>
        <li><span class="an-dot" style="background:#F0EBDF"></span> পর্যালোচনাধীন — <strong>${toBn(pending)}</strong></li>
      </ul>
    </div>`;

  /* monthly trend */
  const monthCount = {};
  all.forEach((r) => {
    const p = bnToEn(r.date).split("-");
    if (p.length === 3) {
      const key = p[0] + "-" + p[1];
      monthCount[key] = (monthCount[key] || 0) + 1;
    }
  });
  const months = Object.keys(monthCount).sort();
  const vals = months.map((m) => monthCount[m]);
  const W = 640, H = 230, PAD_X = 36, PAD_Y = 34;
  const maxV = Math.max(...vals, 1);
  const stepX = months.length > 1 ? (W - 2 * PAD_X) / (months.length - 1) : 0;
  const pts = vals.map((v, i) => [
    PAD_X + stepX * i,
    H - PAD_Y - ((H - 2 * PAD_Y) * v) / maxV,
  ]);
  const line = pts.map((p2) => `${p2[0].toFixed(1)},${p2[1].toFixed(1)}`).join(" ");
  const area = `M${pts[0][0]},${H - PAD_Y} ` + pts.map((p2) => `L${p2[0].toFixed(1)},${p2[1].toFixed(1)}`).join(" ") + ` L${pts[pts.length - 1][0]},${H - PAD_Y} Z`;
  const dots = pts.map((p2, i) => `
    <g>
      <circle cx="${p2[0]}" cy="${p2[1]}" r="5" fill="#E93649" stroke="#fff" stroke-width="2"/>
      <text x="${p2[0]}" y="${p2[1] - 12}" text-anchor="middle" class="an-trend-val">${toBn(vals[i])}</text>
    </g>`).join("");
  const labels = months.map((m, i) => {
    const [yy, mm] = m.split("-");
    return `<text x="${pts[i][0]}" y="${H - 8}" text-anchor="middle" class="an-trend-cap">${BN_MONTHS[+mm - 1]} ${toBn(yy)}</text>`;
  }).join("");
  document.getElementById("anTrend").innerHTML = `
    <svg viewBox="0 0 ${W} ${H}" class="an-trend-svg" preserveAspectRatio="none">
      <path d="${area}" fill="rgba(233,54,73,0.09)"/>
      <polyline points="${line}" fill="none" stroke="#E93649" stroke-width="3" stroke-linejoin="round" stroke-linecap="round"/>
      ${dots}${labels}
    </svg>`;

  /* by district (top 5) */
  const dCount = {};
  all.forEach((r) => {
    if (r.district && r.district !== "—") dCount[r.district] = (dCount[r.district] || 0) + 1;
  });
  const districts = Object.entries(dCount).sort((a, b) => b[1] - a[1]).slice(0, 5);
  document.getElementById("anDistricts").innerHTML = bars(districts, (d) => d[1], (d) => toBn(d[1]));

  /* top scammers */
  const top = [...all].sort((a, b) => b.reportsCount - a.reportsCount).slice(0, 3);
  document.getElementById("anTop").innerHTML = top.map((r, i) => `
    <div class="an-top-row">
      <span class="an-rank">${toBn(i + 1)}</span>
      <div class="an-top-info">
        <span class="an-top-name">${r.name}</span>
        <span class="an-top-sub">${maskPhone(r.phone)} · ${r.type}</span>
      </div>
      <span class="an-top-count">${icon("i-alert")} ${toBn(r.reportsCount)}</span>
    </div>`).join("");
}

/* ============================================================
   REPORT PAGE: report form
   ============================================================ */
const uploadBox = document.getElementById("uploadBox");
if (uploadBox) {
  const fileInput = document.getElementById("fEvidence");
  const uploadPreview = document.getElementById("uploadPreview");
  let evidenceFiles = [];

  uploadBox.addEventListener("click", () => fileInput.click());
  fileInput.addEventListener("change", () => {
    evidenceFiles = Array.from(fileInput.files).slice(0, 4);
    uploadPreview.innerHTML = "";
    evidenceFiles.forEach((f) => {
      const img = document.createElement("img");
      img.src = URL.createObjectURL(f);
      uploadPreview.appendChild(img);
    });
  });

  document.getElementById("reportForm").addEventListener("submit", (e) => {
    e.preventDefault();

    const stored = getStoredReports();
    const report = {
      id: Date.now(),
      code: 2000 + stored.length + 1,
      name: document.getElementById("fName").value.trim(),
      phone: document.getElementById("fPhone").value.trim(),
      type: document.getElementById("fType").value,
      amount: +document.getElementById("fAmount").value || 0,
      date: toBn(document.getElementById("fDate").value || new Date().toISOString().slice(0, 10)),
      district: "—",
      reportsCount: 1,
      status: "pending",
      desc: document.getElementById("fDesc").value.trim(),
      evidence: evidenceFiles.map((f) => URL.createObjectURL(f)),
    };
    if (!report.name || !report.phone || !report.desc) return;

    stored.unshift(report);
    localStorage.setItem("pk_reports", JSON.stringify(stored));

    e.target.reset();
    uploadPreview.innerHTML = "";
    evidenceFiles = [];
    const success = document.getElementById("formSuccess");
    success.classList.add("show");
    setTimeout(() => success.classList.remove("show"), 8000);
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}
