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

/* ---------- ডেমো প্রমাণ "স্ক্রিনশট" জেনারেটর (SVG) ---------- */

/* চ্যাট স্টাইল */
function evChat(label, name, accent) {
  return "data:image/svg+xml," + encodeURIComponent(
    `<svg xmlns='http://www.w3.org/2000/svg' width='340' height='480'>
      <rect width='340' height='480' rx='26' fill='#111'/>
      <rect x='10' y='10' width='320' height='460' rx='20' fill='#F4F1EC'/>
      <rect x='10' y='10' width='320' height='64' rx='20' fill='${accent}'/>
      <rect x='10' y='50' width='320' height='24' fill='${accent}'/>
      <circle cx='42' cy='42' r='16' fill='#fff' opacity='0.9'/>
      <text x='42' y='48' font-family='sans-serif' font-size='16' text-anchor='middle' fill='${accent}'>R</text>
      <text x='70' y='40' font-family='sans-serif' font-size='15' font-weight='bold' fill='#fff'>${name}</text>
      <text x='70' y='58' font-family='sans-serif' font-size='10' fill='#fff' opacity='0.8'>+৮৮০ ১XXXXXXXXX · ডেমো</text>
      <rect x='24' y='96' width='210' height='52' rx='14' fill='#fff'/>
      <text x='36' y='118' font-family='sans-serif' font-size='12' fill='#333'>ভাই, এডভান্স টাকা পাঠান</text>
      <text x='36' y='136' font-family='sans-serif' font-size='12' fill='#333'>কাল সকালেই পাঠিয়ে দিবো</text>
      <rect x='104' y='160' width='212' height='52' rx='14' fill='${accent}' opacity='0.16'/>
      <text x='116' y='182' font-family='sans-serif' font-size='12' fill='#333'>কবে পাবো ভাই? ৩ দিন হলো</text>
      <text x='116' y='200' font-family='sans-serif' font-size='12' fill='#333'>ফোনও ধরেন না</text>
      <rect x='24' y='224' width='190' height='52' rx='14' fill='#fff'/>
      <text x='36' y='246' font-family='sans-serif' font-size='12' fill='#333'>স্যার একটু সময় দেন</text>
      <text x='36' y='264' font-family='sans-serif' font-size='12' fill='#333'>কাল ঠিক আছে ইনশাআল্লাহ</text>
      <rect x='104' y='288' width='212' height='36' rx='14' fill='${accent}' opacity='0.16'/>
      <text x='116' y='311' font-family='sans-serif' font-size='12' fill='#333'>এখনো পাইনি, টাকা ফেরত চাই</text>
      <rect x='24' y='336' width='120' height='30' rx='12' fill='${accent}' opacity='0.16'/>
      <text x='36' y='356' font-family='sans-serif' font-size='11' fill='#999'>এই মেসেজ ডেলিভার হয়নি</text>
      <rect x='10' y='400' width='320' height='70' rx='20' fill='#111' opacity='0.03'/>
      <text x='170' y='448' font-family='sans-serif' font-size='15' font-weight='bold' text-anchor='middle' fill='${accent}'>${label}</text>
    </svg>`
  );
}

/* পেমেন্ট / রসিদ স্টাইল */
function evDoc(label, accent) {
  return "data:image/svg+xml," + encodeURIComponent(
    `<svg xmlns='http://www.w3.org/2000/svg' width='340' height='480'>
      <rect width='340' height='480' rx='26' fill='#111'/>
      <rect x='10' y='10' width='320' height='460' rx='20' fill='#fff'/>
      <rect x='10' y='10' width='320' height='70' rx='20' fill='${accent}'/>
      <rect x='10' y='60' width='320' height='20' fill='${accent}'/>
      <text x='170' y='52' font-family='sans-serif' font-size='18' font-weight='bold' text-anchor='middle' fill='#fff'>লেনদেন রসিদ (ডেমো)</text>
      <rect x='30' y='104' width='130' height='12' rx='6' fill='#E8E4DC'/>
      <rect x='30' y='126' width='280' height='14' rx='7' fill='#333' opacity='0.85'/>
      <rect x='30' y='150' width='230' height='10' rx='5' fill='#E8E4DC'/>
      <rect x='30' y='186' width='130' height='12' rx='6' fill='#E8E4DC'/>
      <rect x='30' y='210' width='200' height='14' rx='7' fill='${accent}'/>
      <rect x='30' y='246' width='130' height='12' rx='6' fill='#E8E4DC'/>
      <rect x='30' y='270' width='260' height='10' rx='5' fill='#E8E4DC'/>
      <rect x='30' y='290' width='180' height='10' rx='5' fill='#E8E4DC'/>
      <rect x='30' y='330' width='280' height='70' rx='14' fill='${accent}' opacity='0.08'/>
      <rect x='150' y='345' width='40' height='40' rx='8' fill='none' stroke='${accent}' stroke-width='3'/>
      <text x='170' y='372' font-family='sans-serif' font-size='20' text-anchor='middle' fill='${accent}'>৳</text>
      <rect x='30' y='420' width='280' height='1' fill='#E8E4DC'/>
      <text x='170' y='448' font-family='sans-serif' font-size='14' font-weight='bold' text-anchor='middle' fill='${accent}'>${label}</text>
    </svg>`
  );
}

/* SMS / নোটিফিকেশন স্টাইল */
function evSMS(label, accent) {
  return "data:image/svg+xml," + encodeURIComponent(
    `<svg xmlns='http://www.w3.org/2000/svg' width='340' height='480'>
      <rect width='340' height='480' rx='26' fill='#111'/>
      <rect x='10' y='10' width='320' height='460' rx='20' fill='#F7F5F0'/>
      <rect x='26' y='60' width='288' height='54' rx='16' fill='#fff'/>
      <text x='40' y='84' font-family='sans-serif' font-size='12' font-weight='bold' fill='#333'>বিকাশ (ডেমো নোটিফিকেশন)</text>
      <text x='40' y='102' font-family='sans-serif' font-size='11' fill='#777'>আপনার একাউন্ট থেকে ৳X,XXX টাকা...</text>
      <rect x='26' y='126' width='288' height='54' rx='16' fill='#fff'/>
      <text x='40' y='150' font-family='sans-serif' font-size='12' font-weight='bold' fill='#333'>+৮৮০ ১XXXXXXXXX</text>
      <text x='40' y='168' font-family='sans-serif' font-size='11' fill='#777'>স্যার, একাউন্ট ব্লক হচ্ছে। OTP টা বলেন...</text>
      <rect x='26' y='192' width='288' height='54' rx='16' fill='#fff'/>
      <text x='40' y='216' font-family='sans-serif' font-size='12' font-weight='bold' fill='${accent}'>সতর্কতা</text>
      <text x='40' y='234' font-family='sans-serif' font-size='11' fill='#777'>অ্যাপ কখনো OTP বা পিন জিজ্ঞেস করে না</text>
      <rect x='26' y='266' width='288' height='54' rx='16' fill='#fff'/>
      <text x='40' y='290' font-family='sans-serif' font-size='12' font-weight='bold' fill='#333'>+৮৮০ ১XXXXXXXXX</text>
      <text x='40' y='308' font-family='sans-serif' font-size='11' fill='#777'>আপনি বিজয়ী! প্রসেসিং ফি পাঠান...</text>
      <text x='170' y='448' font-family='sans-serif' font-size='15' font-weight='bold' text-anchor='middle' fill='${accent}'>${label}</text>
    </svg>`
  );
}

const EV = {
  chat: (label, name) => evChat(label, name, "#E93649"),
  doc: (label) => evDoc(label, "#E93649"),
  sms: (label) => evSMS(label, "#B06A00"),
};

/* ---------- রিপোর্ট ডেটা ----------
[name, phone, typeIdx, status, amount, date, district, reportsCount, desc, evidence] */
const RAW = [
  ["রাহাত ট্রেডার্স (রাহাত হোসেন)", "01712345678", 0, "verified", 4500, "2026-09-28", "ঢাকা", 14, "ফেসবুক পেজে আইফোনের বক্স অর্ডার দিলে ৪৫০০ টাকা এডভান্স নিয়ে তারপর আর ফোন ধরে না। একই পেজ থেকে অন্তত ১৪ জন ক্রেতা ঠকিয়েছে।", [["chat", "চ্যাট স্ক্রিনশট", "রাহাত ট্রেডার্স"], ["doc", "পেমেন্ট রসিদ"]]],
  ["Tanvir Electronics", "01898765432", 1, "verified", 12000, "2026-10-02", "চট্টগ্রাম", 9, "নকল বিকাশ কাস্টমার কেয়ার বলে ফোন করে 'একাউন্ট ব্লক হচ্ছে' বলে OTP নিয়ে ১২ হাজার টাকা কেটে নিয়েছে।", [["sms", "OTP কল রেকর্ড"], ["doc", "ট্রানজেকশন রসিদ"]]],
  ["BD Forex Pro (সাজিদ আহমেদ)", "01611223344", 3, "verified", 60000, "2026-09-15", "সিলেট", 21, "মাসে ৩০% প্রফিটের লোভ দেখিয়ে ফরেক্স ইনভেস্টমেন্ট নামে ৬০ হাজার টাকা নিয়েছে। প্রথম মাসে ৫০০ টাকা রিটার্ন দিয়ে আস্থা বাড়িয়েছিল।", [["chat", "হোয়াটসঅ্যাপ চ্যাট", "BD Forex Pro"], ["doc", "একাউন্ট স্টেটমেন্ট"]]],
  ["Careers BD Jobs (সেবক)", "01922334455", 2, "pending", 2500, "2026-10-05", "খুলনা", 4, "ভুয়া অফার লেটার দেখিয়ে 'রেজিস্ট্রেশন ও মেডিকেল ফি' নামে ২৫০০ টাকা চেয়েছে। অফিসের ঠিকানা দিলে সেখানে কোনো অফিস নেই।", [["doc", "ভুয়া অফার লেটার"]]],
  ["মেসার্স জামাল এন্টারপ্রাইজ", "01555667788", 4, "verified", 850, "2026-09-20", "রাজশাহী", 7, "পার্সেল আসার আগেই 'ডেলিভারি চার্জ' বিকাশে পাঠাতে বলে। টাকা পাঠানোর পর নম্বর বন্ধ। আসল কুরিয়ার কোম্পানির সাথে কোনো সম্পর্ক নেই।", [["sms", "ডেলিভারি চার্জ SMS"]]],
  ["Lucky Draw Winner BD", "01334556677", 5, "verified", 1200, "2026-08-30", "বরিশাল", 11, "'আপনি ৫০ হাজার টাকা জিতেছেন, প্রসেসিং ফি ১২০০ টাকা পাঠান' — সবাই ঠিক একই কথা শুনেছে। টাকা পাঠালে আর কোনো খোঁজ নেই।", [["sms", "জিতের SMS"]]],
  ["Shopper Zone BD (আরিফ)", "01799887766", 0, "pending", 3200, "2026-10-08", "গাজীপুর", 3, "থ্রি-পিস অর্ডার দিয়েছিলাম, এরপর অ্যাডমিট করে যে 'কাল পাঠাবো' — ২ সপ্তাহ পার হয়ে গেছে। এখন নম্বর ব্লক।", [["chat", "অর্ডার চ্যাট", "Shopper Zone BD"]]],
  ["Nagad Support Team (ভুয়া)", "01443322110", 1, "verified", 7500, "2026-09-10", "কুমিল্লা", 16, "নগদের নাম ব্যবহার করে অ্যাপ 'আপডেট'-এর লিংক পাঠায়, সেখানে পিন দিলেই টাকা উধাও। অফিসিয়াল নগদ কখনো পিন চায় না।", [["sms", "ফিশিং লিংক SMS"], ["doc", "ট্রানজেকশন রসিদ"]]],
  ["Dream IT Solution (সাব্বির)", "01866778899", 2, "verified", 15000, "2026-08-22", "ঢাকা", 12, "'ট্রেনিং শেষে চাকরি নিশ্চিত' বলে ১৫ হাজার টাকা কোর্স ফি নিয়েছে। কোর্স শেষে চাকরি নয়, বরং আরও টাকা চাওয়া শুরু।", [["doc", "কোর্স ফি রসিদ"], ["chat", "কনসালটেশন চ্যাট", "Dream IT"]]],
  ["Crypto BD King (জুবায়ের)", "01699445511", 3, "pending", 30000, "2026-10-11", "নারায়ণগঞ্জ", 6, "USDT ট্রেডিং শেখানোর নামে সিগন্যাল গ্রুপে ঢুকিয়ে ব্যক্তিগত ওয়ালেটে টাকা পাঠাতে বলে। গ্রুপের অন্যরাও একই অভিযোগ করেছে।", [["chat", "সিগন্যাল গ্রুপ চ্যাট", "Crypto BD King"]]],
  ["Stylehub BD (নীলা আক্তার)", "01711229944", 0, "verified", 1800, "2026-09-05", "যশোর", 8, "ছবিতে অরিজিনাল জামা দেখিয়ে চালানে নকল ও পুরনো কাপড় পাঠিয়েছে। রিটার্ন চাইলে অ্যাডমিট ব্লক করে দিয়েছে।", [["chat", "অর্ডার চ্যাট", "Stylehub BD"], ["doc", "ডেলিভারি রসিদ"]]],
  ["Daraz Lucky Winner (ভুয়া পেজ)", "01911223366", 5, "pending", 500, "2026-10-12", "রংপুর", 5, "Daraz-এর নামে নকল পেজ থেকে 'বিজয়ী' মেসেজ, ডেলিভারি ফি বিকাশে চায়। আসল ডারাজ কখনো এভাবে ফি চায় না।", [["sms", "নকল পেজ মেসেজ"]]],
  ["Gadget House BD (ইমরান)", "01766554433", 0, "verified", 6800, "2026-04-18", "ময়মনসিংহ", 9, "এয়ারবাড অর্ডার দিয়ে অ্যাডভান্স নিয়েছিল, পাঠিয়েছিল খেলনা মানের নকল প্রোডাক্ট। রিফান্ড দিচ্ছিল না, পেজও বদলে ফেলেছে।", [["chat", "প্রোডাক্ট কমপ্লেইন চ্যাট", "Gadget House"], ["doc", "পেমেন্ট রসিদ"]]],
  ["bKash Helpline ১৬২৪৭ (ভুয়া)", "01822334400", 1, "verified", 21000, "2026-05-06", "ঢাকা", 19, "বিকাশের হেল্পলাইন নম্বর নকল করে ফোন করে 'কাস্টমার পয়েন্ট আপগ্রেড' বলে OTP নিয়ে ২১ হাজার টাকা নিয়েছে।", [["sms", "OTP কল রেকর্ড"], ["doc", "কাট হওয়া টাকার রসিদ"]]],
  ["Faizan Store (ফয়সাল)", "01933445566", 0, "pending", 2900, "2026-06-14", "বগুড়া", 4, "ক্যাশ অন ডেলিভারি বলে অর্ডার দিলাম, ডেলিভারি ম্যান এসে আগেই বিকাশে টাকা নিয়ে নিল আর বক্সে পাথর দিয়ে গেল।", [["doc", "ডেলিভারি স্লিপ"]]],
  ["Prime Job Consultancy", "01611-223344-ভুয়া", 2, "verified", 8000, "2026-05-28", "চট্টগ্রাম", 13, "'দুবাই ভিসা ও চাকরি নিশ্চিত' বলে ভিসা প্রসেসিং ফি নিয়ে পরে সবাইকে গুম হয়ে গেছে। দলিলগুলো সব ভুয়া।", [["doc", "ভুয়া এগ্রিমেন্ট কপি"]]],
  ["Rocket Cash Loan App", "01445566778", 1, "pending", 5500, "2026-07-09", "কুষ্টিয়া", 6, "লোন অ্যাপে নিবন্ধন ফি নামে টাকা কেটে নিয়ে লোন দেয় না। অ্যাপটি গুগল প্লেস্টোরে নেই, শুধু APK লিংক দেয়।", [["doc", "অ্যাপ পেমেন্ট রসিদ"]]],
  ["BD Courier Hub (ভুয়া)", "01755443322", 4, "verified", 1400, "2026-06-02", "ফেনী", 8, "'আপনার পার্সেল আটকে আছে, কাস্টম ফি দিন' বলে টাকা নেয়। আসল কুরিয়ার কোম্পানির এমন কোনো পার্সেল ছিলই না।", [["sms", "কাস্টম ফি SMS"]]],
  ["Taka Double Scheme (রুবেল)", "01833445599", 3, "verified", 45000, "2026-04-25", "পাবনা", 17, "'১০ দিনে টাকা দ্বিগুণ' স্কিমে প্রথম দুই দফায় রিটার্ন দিয়ে বিশ্বাস বাড়িয়েছে, তারপর ৪৫ হাজার নিয়ে গায়েব।", [["chat", "স্কিম গ্রুপ চ্যাট", "Taka Double"], ["doc", "স্কিম রসিদ"]]],
  ["Mobile Recharge Offer BD", "01335566777", 5, "pending", 600, "2026-07-21", "দিনাজপুর", 5, "'৫০০ টাকা রিচার্জ পাবেন, শুধু ৬০০ টাকা প্রসেসিং ফি' — অ্যাডমিন প্যানেলে ঢুকিয়ে একাউন্ট হ্যাক করার চেষ্টা করে।", [["sms", "রিচার্জ অফার SMS"]]],
  ["Fashion Corner BD (তানিয়া)", "01788996655", 0, "verified", 2400, "2026-08-08", "টাঙ্গাইল", 7, "প্রি-অর্ডার নামে টাকা নিয়ে গ্রুপ থেকে বের করে দিয়েছে। ২০ জনের বেশি ক্রেতা একই অভিযোগ করেছে।", [["chat", "গ্রুপ চ্যাট", "Fashion Corner"]]],
  ["eSewa Verify Team (ভুয়া)", "01677228811", 1, "verified", 9800, "2026-07-30", "সিলেট", 10, "'KYC একাউন্ট ভেরিফাই' বলে পুরনো পিন আর OTP নিয়ে টাকা সরিয়ে নিয়েছে। পরের দিন একাউন্ট খালি।", [["doc", "একাউন্ট স্টেটমেন্ট"]]],
  ["Tech Park Training (রাশেদ)", "01955667700", 2, "pending", 12000, "2026-09-02", "রাজশাহী", 4, "'৬ মাসের ফ্রিল্যান্সিং কোর্স, আয় নিশ্চিত' বলে কোর্স ফি নিয়েছে। ক্লাস শুরুর আগেই পেজ গুম।", [["doc", "কোর্স এনরোলমেন্ট রসিদ"]]],
  ["Crypto Mining BD (আসিফ)", "01811229933", 3, "verified", 85000, "2026-06-20", "ঢাকা", 15, "'ক্লাউড মাইনিং প্যাকেজ' বিক্রি করে ডলার নিয়েছে, ড্যাশবোর্ডে ফেক প্রফিট দেখাত। উইথড্র করতে গেলেই একাউন্ট ব্লক।", [["chat", "সাপোর্ট চ্যাট", "Crypto Mining BD"], ["doc", "উইথড্র রিজেকশন স্ক্রিন"]]],
  ["Steadfast Delivery Fake (ভুয়া)", "01966778811", 4, "pending", 950, "2026-10-13", "গাজীপুর", 3, "স্টেডফাস্টের নামে ফোন করে 'পার্সেলের কাস্টম চার্জ' চায়। আসল কুরিয়ার কখনো আগে টাকা চায় না।", [["sms", "কাস্টম চার্জ SMS"]]],
  ["Biman Ticket Offer (ভুয়া এজেন্ট)", "01744332200", 5, "verified", 6500, "2026-05-15", "খুলনা", 12, "বিমানের কনফার্ম টিকিট বলে অর্ধেক ভাড়া এডভান্স নিয়ে PNR দিয়েছে যেটা এয়ারলাইনের সিস্টেমে নেই।", [["doc", "ভুয়া টিকিট কপি"], ["chat", "এজেন্ট চ্যাট", "Biman Offer"]]],
  ["FB Market Deal (সজীব)", "01555998877", 0, "pending", 5200, "2026-08-27", "নারায়ণগঞ্জ", 4, "মার্কেটপ্লেসে পুরনো ফোন কিনতে গিয়ে 'ডেলিভারি ম্যানকে বিকাশে দিন' বলে টাকা নিয়ে আর ফোন আসেনি।", [["chat", "মার্কেটপ্লেস চ্যাট", "সজীব"]]],
  ["Roshon Traders (ভুয়া)", "01633991100", 4, "verified", 1800, "2026-09-12", "যশোর", 6, "কুরিয়ার হারানোর ভান করে 'ইনস্যুরেন্স ক্লেইম ফি' নেয়। রসিদে কোম্পানির কোনো লোগোও নেই।", [["doc", "ভুয়া রসিদ কপি"]]],
  ["Skill Earn BD (মিলন)", "01877665500", 3, "verified", 25000, "2026-07-04", "বরিশাল", 11, "'ফ্রিল্যান্সিং টুলস কিনলে মাসে ৫০ হাজার ইনকাম' বলে টুলস বিক্রি করেছে যেগুলো নাকাল ও ফ্রি।", [["chat", "সেলস চ্যাট", "Skill Earn BD"], ["doc", "পেমেন্ট রসিদ"]]],
  ["Dubai Visa Point (নাসির)", "01722993388", 2, "pending", 18000, "2026-10-10", "চট্টগ্রাম", 5, "'৭ দিনে দুবাই ভিসা' বলে অ্যাডভান্স নিয়েছে, ২ মাস পরেও ভিসা নেই। অফিস ঠিকানাও ভুয়া বলে জানা গেছে।", [["doc", "ভিসা আবেদন রসিদ"]]],
];

const REPORTS = RAW.map((r, i) => ({
  id: i + 1,
  code: 1000 + i + 1,
  name: r[0],
  phone: r[1],
  type: SCAM_TYPES[r[2]],
  status: r[3],
  amount: r[4],
  date: r[5],
  district: r[6],
  reportsCount: r[7],
  desc: r[8],
  evidence: r[9].map((e) => {
    const [kind, label, name] = e;
    return { label, src: kind === "chat" ? EV.chat(label, name) : kind === "doc" ? EV.doc(label) : EV.sms(label) };
  }),
}));

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
