/* ============================================================
   প্রতারক খোঁজি — ডামি ডেটা
   এগুলো সম্পূর্ণ কাল্পনিক নমুনা ডেটা (ডেমোর জন্য)।
   বাস্তব কোনো ব্যক্তি বা নম্বরের সাথে মিল থাকলে সম্পূর্ণ কাকতালীয়।
   ============================================================ */

const SCAM_TYPES = [
  "অনলাইন শপিং প্রতারণা",
  "বিকাশ / নগদ ফিশিং",
  "চাকরির প্রতারণা",
  "ইনভেস্টমেন্ট স্ক্যাম",
  "কুরিয়ার প্রতারণা",
  "লটারি / গিফট স্ক্যাম",
];

/* SVG placeholder "screenshot" প্রমাণ */
function evidenceSVG(label, color) {
  return "data:image/svg+xml," + encodeURIComponent(
    `<svg xmlns='http://www.w3.org/2000/svg' width='320' height='220'>
      <rect width='320' height='220' rx='14' fill='${color}'/>
      <rect x='18' y='18' width='284' height='42' rx='10' fill='rgba(255,255,255,0.85)'/>
      <circle cx='40' cy='39' r='11' fill='${color}'/>
      <rect x='60' y='30' width='120' height='7' rx='3' fill='${color}'/>
      <rect x='60' y='43' width='80' height='6' rx='3' fill='${color}' opacity='0.6'/>
      <rect x='18' y='74' width='284' height='56' rx='10' fill='rgba(255,255,255,0.85)'/>
      <text x='160' y='107' font-family='sans-serif' font-size='14' text-anchor='middle' fill='#333'>${label}</text>
      <rect x='18' y='142' width='284' height='40' rx='10' fill='rgba(255,255,255,0.6)'/>
      <rect x='36' y='158' width='140' height='9' rx='4' fill='${color}' opacity='0.7'/>
    </svg>`
  );
}

const REPORTS = [
  {
    id: 1,
    name: "রাহাত ট্রেডার্স (রাহাত হোসেন)",
    phone: "01712345678",
    type: "অনলাইন শপিং প্রতারণা",
    status: "verified",
    amount: 4500,
    date: "২০২৬-০৯-২৮",
    district: "ঢাকা",
    reportsCount: 14,
    desc: "ফেসবুক পেজে আইফোনের বক্স অর্ডার দিলে ৪৫০০ টাকা এডভান্স নিয়ে তারপর আর ফোন ধরে না। একই পেজ থেকে অন্তত ১৪ জন ক্রেতা ঠকিয়েছে।",
    evidence: [evidenceSVG("চ্যাট স্ক্রিনশট", "#e63946"), evidenceSVG("পেমেন্ট রসিদ", "#006a4e")]
  },
  {
    id: 2,
    name: "Tanvir Electronics",
    phone: "01898765432",
    type: "বিকাশ / নগদ ফিশিং",
    status: "verified",
    amount: 12000,
    date: "২০২৬-১০-০২",
    district: "চট্টগ্রাম",
    reportsCount: 9,
    desc: "নকল বিকাশ কাস্টমার কেয়ার বলে ফোন করে 'একাউন্ট ব্লক হচ্ছে' বলে OTP নিয়ে ১২ হাজার টাকা কেটে নিয়েছে।",
    evidence: [evidenceSVG("কল রেকর্ড", "#e63946")]
  },
  {
    id: 3,
    name: "BD Forex Pro (সাজিদ আহমেদ)",
    phone: "01611223344",
    type: "ইনভেস্টমেন্ট স্ক্যাম",
    status: "verified",
    amount: 60000,
    date: "২০২৬-০৯-১৫",
    district: "সিলেট",
    reportsCount: 21,
    desc: "মাসে ৩০% প্রফিটের লোভ দেখিয়ে ফরেক্স ইনভেস্টমেন্ট নামে ৬০ হাজার টাকা নিয়েছে। প্রথম মাসে ৫০০ টাকা রিটার্ন দিয়ে আস্থা বাড়িয়েছিল।",
    evidence: [evidenceSVG("একাউন্ট স্টেটমেন্ট", "#e63946"), evidenceSVG("হোয়াটসঅ্যাপ চ্যাট", "#006a4e")]
  },
  {
    id: 4,
    name: "Careers BD Jobs (সেবক)",
    phone: "01922334455",
    type: "চাকরির প্রতারণা",
    status: "pending",
    amount: 2500,
    date: "২০২৬-১০-০৫",
    district: "খুলনা",
    reportsCount: 4,
    desc: "ভুয়া অফার লেটার দেখিয়ে 'রেজিস্ট্রেশন ও মেডিকেল ফি' নামে ২৫০০ টাকা চেয়েছে। অফিসের ঠিকানা দিলে সেখানে কোনো অফিস নেই।",
    evidence: [evidenceSVG("অফার লেটার", "#b06a00")]
  },
  {
    id: 5,
    name: "মেসার্স জামাল এন্টারপ্রাইজ",
    phone: "01555667788",
    type: "কুরিয়ার প্রতারণা",
    status: "verified",
    amount: 850,
    date: "২০২৬-০৯-২০",
    district: "রাজশাহী",
    reportsCount: 7,
    desc: "পার্সেল আসার আগেই 'ডেলিভারি চার্জ' বিকাশে পাঠাতে বলে। টাকা পাঠানোর পর নম্বর বন্ধ। আসল কুরিয়ার কোম্পানির সাথে কোনো সম্পর্ক নেই।",
    evidence: [evidenceSVG("SMS স্ক্রিনশট", "#e63946")]
  },
  {
    id: 6,
    name: "Lucky Draw Winner BD",
    phone: "01334556677",
    type: "লটারি / গিফট স্ক্যাম",
    status: "verified",
    amount: 1200,
    date: "২০২৬-০৮-৩০",
    district: "বরিশাল",
    reportsCount: 11,
    desc: "'আপনি ৫০ হাজার টাকা জিতেছেন, প্রসেসিং ফি ১২০০ টাকা পাঠান' — সবাই ঠিক একই কথা শুনেছে। টাকা পাঠালে আর কোনো খোঁজ নেই।",
    evidence: [evidenceSVG("জিতের SMS", "#e63946")]
  },
  {
    id: 7,
    name: "Shopper Zone BD (আরিফ)",
    phone: "01799887766",
    type: "অনলাইন শপিং প্রতারণা",
    status: "pending",
    amount: 3200,
    date: "২০২৬-১০-০৮",
    district: "গাজীপুর",
    reportsCount: 3,
    desc: "থ্রি-পিস অর্ডার দিয়েছিলাম, এরপর অ্যাডমিট করে যে 'কাল পাঠাবো' — ২ সপ্তাহ পার হয়ে গেছে। এখন নম্বর ব্লক।",
    evidence: [evidenceSVG("অর্ডার কনফার্মেশন", "#b06a00")]
  },
  {
    id: 8,
    name: "Nagad Support Team (ভুয়া)",
    phone: "01443322110",
    type: "বিকাশ / নগদ ফিশিং",
    status: "verified",
    amount: 7500,
    date: "২০২৬-০৯-১০",
    district: "কুমিল্লা",
    reportsCount: 16,
    desc: "নগদের নাম ব্যবহার করে অ্যাপ 'আপডেট'-এর লিংক পাঠায়, সেখানে পিন দিলেই টাকা উধাও। অফিসিয়াল নগদ কখনো পিন চায় না।",
    evidence: [evidenceSVG("ফিশিং লিংক", "#e63946"), evidenceSVG("ট্রানজেকশন", "#006a4e")]
  },
  {
    id: 9,
    name: "Dream IT Solution (সাব্বির)",
    phone: "01866778899",
    type: "চাকরির প্রতারণা",
    status: "verified",
    amount: 15000,
    date: "২০২৬-০৮-২২",
    district: "মিরপুর, ঢাকা",
    reportsCount: 12,
    desc: "'ট্রেনিং শেষে চাকরি নিশ্চিত' বলে ১৫ হাজার টাকা কোর্স ফি নিয়েছে। কোর্স শেষে চাকরি নয়, বরং আরও টাকা চাওয়া শুরু।",
    evidence: [evidenceSVG("কোর্স ফি রসিদ", "#e63946")]
  },
  {
    id: 10,
    name: "Crypto BD King (জুবায়ের)",
    phone: "01699445511",
    type: "ইনভেস্টমেন্ট স্ক্যাম",
    status: "pending",
    amount: 30000,
    date: "২০২৬-১০-১১",
    district: "নারায়ণগঞ্জ",
    reportsCount: 6,
    desc: "USDT ট্রেডিং শেখানোর নামে সিগন্যাল গ্রুপে ঢুকিয়ে ব্যক্তিগত ওয়ালেটে টাকা পাঠাতে বলে। গ্রুপের অন্যরাও একই অভিযোগ করেছে।",
    evidence: [evidenceSVG("গ্রুপ চ্যাট", "#b06a00")]
  },
  {
    id: 11,
    name: "Stylehub BD (নীলা আক্তার)",
    phone: "01711229944",
    type: "অনলাইন শপিং প্রতারণা",
    status: "verified",
    amount: 1800,
    date: "২০২৬-০৯-০৫",
    district: "যশোর",
    reportsCount: 8,
    desc: "ছবিতে অরিজিনাল জামা দেখিয়ে চালানে নকল ও পুরনো কাপড় পাঠিয়েছে। রিটার্ন চাইলে অ্যাডমিট ব্লক করে দিয়েছে।",
    evidence: [evidenceSVG("প্রোডাক্ট ছবি মিল", "#e63946")]
  },
  {
    id: 12,
    name: "Daraz Lucky Winner (ভুয়া পেজ)",
    phone: "01911223366",
    type: "লটারি / গিফট স্ক্যাম",
    status: "pending",
    amount: 500,
    date: "২০২৬-১০-১২",
    district: "রংপুর",
    reportsCount: 5,
    desc: "Daraz-এর নামে নকল পেজ থেকে 'বিজয়ী' মেসেজ, ডেলিভারি ফি বিকাশে চায়। আসল ডারাজ কখনো এভাবে ফি চায় না।",
    evidence: [evidenceSVG("নকল পেজ স্ক্রিনশট", "#b06a00")]
  }
];

/* localStorage-এ ইউজারের পাঠানো ডেমো রিপোর্ট যুক্ত করা */
function getStoredReports() {
  try {
    return JSON.parse(localStorage.getItem("pk_reports") || "[]");
  } catch (e) { return []; }
}
function getAllReports() {
  const stored = getStoredReports().map((r) => ({ ...r, status: r.status || "pending" }));
  return [...stored, ...REPORTS];
}
