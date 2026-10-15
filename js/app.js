/* ============================================================
   প্রতারক খোঁজি — main app logic
   ============================================================ */

/* ---------- বাংলা সংখ্যা রূপান্তর ---------- */
const BN_DIGITS = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];
function toBn(str) {
  return String(str).replace(/[0-9]/g, (d) => BN_DIGITS[+d]);
}
/* SVG স্প্রাইট আইকন হেল্পার */
function icon(name, cls = "ic") {
  return `<svg class="${cls}" aria-hidden="true"><use href="#${name}"/></svg>`;
}

function maskPhone(phone) {
  const p = phone.replace(/\D/g, "");
  if (p.length >= 6) return p.slice(0, 4) + "••" + p.slice(-2);
  return phone;
}
function normalizeNum(phone) {
  return phone.replace(/[^\d]/g, "").replace(/^88/, "");
}

/* বাংলা তারিখ: "২৮ সেপ্টেম্বর, ২০২৬" */
const BN_MONTHS = ["জানুয়ারি","ফেব্রুয়ারি","মার্চ","এপ্রিল","মে","জুন","জুলাই","আগস্ট","সেপ্টেম্বর","অক্টোবর","নভেম্বর","ডিসেম্বর"];
function bnToEn(s) {
  return String(s).replace(/[০-৯]/g, (d) => String(BN_DIGITS.indexOf(d)));
}
function formatBnDate(str) {
  const parts = bnToEn(str).split("-");
  if (parts.length !== 3) return toBn(str);
  return `${toBn(+parts[2])} ${BN_MONTHS[+parts[1] - 1]}, ${toBn(+parts[0])}`;
}
function reportCode(r) {
  return "#" + toBn(r.code || 1000 + r.id);
}

/* ---------- navbar ---------- */
const navbar = document.getElementById("navbar");
const hamburger = document.getElementById("hamburger");
window.addEventListener("scroll", () => {
  navbar.classList.toggle("scrolled", window.scrollY > 30);
});
hamburger.addEventListener("click", () => navbar.classList.toggle("open"));
document.querySelectorAll('.nav-links a').forEach(a =>
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
function observeReveals() {
  document.querySelectorAll(".reveal:not(.visible)").forEach((el) => revealObserver.observe(el));
}
observeReveals();

/* ---------- stat counters ---------- */
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
document.querySelectorAll(".stat-num").forEach((el) => statObserver.observe(el));

/* ---------- search ---------- */
const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");
const searchResult = document.getElementById("searchResult");

function doSearch() {
  const q = searchInput.value.trim();
  searchResult.innerHTML = "";
  if (!q) return;

  const qNum = normalizeNum(q);
  const qText = q.toLowerCase();
  const all = getAllReports();

  /* একই নম্বরের সব রিপোর্ট একত্রে */
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
          <p>"${q}" — এই তথ্য দিয়ে আমাদের কাছে এখন পর্যন্ত কোনো রিপোর্ট নেই। তবে সাবধান! লিস্টে না থাকা মানে নিরাপদ নয় — লেনদেনের আগে একটু ভেবে করুন, আর ঠকলে <a href="#report">রিপোর্ট করুন</a>।</p>
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
          <p><strong>${matches[0].name}</strong> (${maskPhone(matches[0].phone)}) — এই তথ্যের বিরুদ্ধে ${toBn(totalReports)} জন রিপোর্ট করেছেন, মোট ক্ষতি প্রায় ৳${toBn(totalLoss.toLocaleString("en-US"))}।</p>
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

/* ---------- reports grid ---------- */
const reportsGrid = document.getElementById("reportsGrid");
const loadMoreBtn = document.getElementById("loadMoreBtn");
let currentFilter = "all";
let visibleCount = 6;

function renderReports() {
  const all = getAllReports();
  let list = all;
  if (currentFilter !== "all") list = list.filter((r) => r.status === currentFilter);

  const shown = list.slice(0, visibleCount);
  reportsGrid.innerHTML = shown
    .map(
      (r, i) => `
      <div class="report-card" style="animation-delay:${i * 0.06}s" onclick="openModalById(${r.id})">
        <div class="rc-top">
          <span class="badge ${r.status === "verified" ? "badge-verified" : "badge-pending"}">
            ${r.status === "verified"
              ? `${icon("i-check")} যাচাই করা`
              : `${icon("i-clock")} পর্যালোচনাধীন`}
          </span>
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

  loadMoreBtn.style.display = list.length > visibleCount ? "inline-flex" : "none";
  loadMoreBtn.textContent = `আরও দেখুন ↓ (মোট ${toBn(list.length)})`;
}
loadMoreBtn.addEventListener("click", () => { visibleCount += 6; renderReports(); });
document.querySelectorAll(".filter-btn").forEach((btn) =>
  btn.addEventListener("click", () => {
    document.querySelectorAll(".filter-btn").forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    currentFilter = btn.dataset.filter;
    visibleCount = 6;
    renderReports();
  })
);
renderReports();

/* ---------- modal ---------- */
const modalOverlay = document.getElementById("modalOverlay");
const modalContent = document.getElementById("modalContent");

window.openModalById = function (id) {
  const r = getAllReports().find((x) => x.id === id);
  if (!r) return;
  const evidenceImgs = (r.evidence || [])
    .map((src) => `<img src="${src}" alt="প্রমাণ স্ক্রিনশট" onclick="window.open('${src}')" />`)
    .join("");
  modalContent.innerHTML = `
    <button class="modal-close" onclick="closeModal()">${icon("i-x")}</button>
    <span class="rc-type">${r.type}</span>
    <h3 style="margin-top:10px">${r.name}</h3>
    <div class="m-phone">${icon("i-phone")} ${r.phone}</div>
    <div class="m-chips">
      <span class="m-chip">${r.status === "verified" ? icon("i-check") + " যাচাই করা" : icon("i-clock") + " যাচাই চলছে"}</span>
      <span class="m-chip">${icon("i-pin")} ${r.district}</span>
      <span class="m-chip">${icon("i-calendar")} ${toBn(r.date)}</span>
      <span class="m-chip">${icon("i-card")} ক্ষতি ৳${toBn((r.amount || 0).toLocaleString("en-US"))}</span>
      <span class="m-chip">${icon("i-alert")} ${toBn(r.reportsCount)} রিপোর্ট</span>
    </div>
    <p class="m-desc">${r.desc}</p>
    ${evidenceImgs ? `<div class="m-section-title">প্রমাণ স্ক্রিনশট</div><div class="m-evidence">${evidenceImgs}</div>` : ""}
    <div class="m-section-title">সতর্কতা</div>
    <p class="m-desc" style="margin-bottom:6px">এই নম্বর/আইডির সাথে লেনদেন করবেন না। আপনিও ঠকে থাকলে নিচের বাটনে রিপোর্ট করুন — রিপোর্ট যত বাড়বে, প্রমাণ তত শক্ত হবে।</p>
    <a href="#report" class="btn btn-primary" onclick="closeModal()">এই প্রতারকের বিরুদ্ধে রিপোর্ট করুন</a>
  `;
  modalOverlay.classList.add("show");
  document.body.style.overflow = "hidden";
};
window.closeModal = function () {
  modalOverlay.classList.remove("show");
  document.body.style.overflow = "";
};
modalOverlay.addEventListener("click", (e) => { if (e.target === modalOverlay) closeModal(); });
document.addEventListener("keydown", (e) => { if (e.key === "Escape") closeModal(); });

/* ---------- report form ---------- */
const uploadBox = document.getElementById("uploadBox");
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

  const report = {
    id: Date.now(),
    code: 2000 + getStoredReports().length + 1,
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

  const stored = getStoredReports();
  stored.unshift(report);
  localStorage.setItem("pk_reports", JSON.stringify(stored));

  e.target.reset();
  uploadPreview.innerHTML = "";
  evidenceFiles = [];
  document.getElementById("formSuccess").classList.add("show");
  setTimeout(() => document.getElementById("formSuccess").classList.remove("show"), 6000);

  visibleCount = 12;
  renderReports();
  document.getElementById("reports").scrollIntoView({ behavior: "smooth" });
});
