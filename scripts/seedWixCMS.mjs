import fs from "fs";

if (fs.existsSync(".env.local")) {
  const envContent = fs.readFileSync(".env.local", "utf8");
  for (const line of envContent.split("\n")) {
    const trimmed = line.trim();
    if (trimmed && !trimmed.startsWith("#") && trimmed.includes("=")) {
      const idx = trimmed.indexOf("=");
      const key = trimmed.slice(0, idx).trim();
      const val = trimmed.slice(idx + 1).trim();
      process.env[key] = val;
    }
  }
}

const WIX_API_KEY = process.env.WIX_API_KEY;
const WIX_SITE_ID = process.env.WIX_SITE_ID;

if (!WIX_API_KEY || !WIX_SITE_ID) {
  console.error("❌ Missing WIX_API_KEY or WIX_SITE_ID in environment.");
  process.exit(1);
}

const WIX_BASE_URL = "https://www.wixapis.com/wix-data/v2";

async function wixRequest(method, path, body = null) {
  const url = path.startsWith("http") ? path : `${WIX_BASE_URL}${path}`;
  const headers = {
    "Content-Type": "application/json",
    Authorization: WIX_API_KEY,
    "wix-site-id": WIX_SITE_ID,
  };

  const options = { method, headers };
  if (body) {
    options.body = JSON.stringify(body);
  }

  const res = await fetch(url, options);
  const text = await res.text();

  if (!res.ok) {
    let jsonErr;
    try {
      jsonErr = JSON.parse(text);
    } catch (e) {
      jsonErr = text;
    }
    throw new Error(`Wix API Error (${res.status} ${res.statusText}): ${JSON.stringify(jsonErr)}`);
  }

  return text ? JSON.parse(text) : {};
}

// Delete StaticData collection from Wix CMS as requested
async function deleteStaticDataCollection() {
  try {
    console.log("ℹ️ Removing StaticData collection from Wix CMS...");
    await wixRequest("DELETE", "/collections/StaticData");
    console.log("✅ Collection 'StaticData' deleted from Wix CMS.");
  } catch (err) {
    console.log(`ℹ️ StaticData collection notice: ${err.message}`);
  }
}

const countryScholarshipsData = {
  "united-kingdom": {
    flag: "🇬🇧",
    name: "United Kingdom",
    heroImage: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=1600&q=80",
    description: "The UK is home to world-renowned universities like Oxford, Cambridge, and Imperial College London. British scholarships are among the most prestigious globally, offering fully-funded opportunities for international students.",
    scholarships: [
      {
        id: 1, name: "Chevening Scholarship", funding: "Fully Funded", deadline: "Nov 2025",
        amount: "Full tuition + £1,133/mo living", fields: ["All Fields"], level: "Masters",
        tag: "Most Popular", color: "#690B1B", featured: true,
        overview: "Chevening is the UK government's global scholarship programme, funded by the Foreign, Commonwealth & Development Office and partner organisations. It offers full financial support for future leaders to study one-year master's degrees at any UK university.",
        highlights: ["Full tuition fees covered", "Monthly living allowance of £1,133", "Economy class return airfare", "Thesis or dissertation grant", "Networking with 50,000+ alumni"],
        url: "https://www.chevening.org/scholarships/",
      },
      {
        id: 2, name: "Gates Cambridge Scholarship", funding: "Fully Funded", deadline: "Dec 2025",
        amount: "Full cost of study + stipend", fields: ["All Fields"], level: "PhD / Masters",
        tag: "Elite", color: "#3D0B69", featured: true,
        overview: "The Gates Cambridge Scholarship is one of the most prestigious international scholarships in the world. Funded by the Bill & Melinda Gates Foundation, it enables outstanding applicants to pursue a postgraduate degree at the University of Cambridge.",
        highlights: ["Full university and college fees", "Maintenance allowance (£18,744/year)", "Inbound airfare & visa costs", "Academic development funding", "Family allowance where applicable"],
        url: "https://www.gatescambridge.org/",
      },
      {
        id: 3, name: "Rhodes Scholarship", funding: "Fully Funded", deadline: "Oct 2025",
        amount: "Full tuition + generous stipend", fields: ["All Fields"], level: "Masters / PhD",
        tag: "Prestigious", color: "#1B3A5C", featured: false,
        overview: "The Rhodes Scholarship is the oldest and perhaps most prestigious international scholarship, enabling students to study at the University of Oxford. Established in 1903, it seeks young leaders who demonstrate academic achievement and leadership.",
        highlights: ["University & college fees fully covered", "Annual stipend of £18,180", "Settling-in allowance", "Health insurance via NHS", "Access to Rhodes House"],
        url: "https://www.rhodeshouse.ox.ac.uk/scholarships/",
      },
      {
        id: 4, name: "Commonwealth Scholarship", funding: "Fully Funded", deadline: "Dec 2025",
        amount: "Full tuition + £1,236/mo", fields: ["Development Focus"], level: "Masters / PhD",
        tag: "Government", color: "#2D5016", featured: false,
        overview: "Commonwealth Scholarships are for citizens of Commonwealth countries to pursue postgraduate study at UK universities. Funded by the UK FCDO, these scholarships target candidates who will contribute to development in their home countries.",
        highlights: ["Approved airfare to the UK and return", "Full tuition fees", "Monthly stipend of £1,236", "Warm clothing allowance", "Study travel grant"],
        url: "https://cscuk.fcdo.gov.uk/scholarships/",
      },
      {
        id: 5, name: "Clarendon Scholarship – Oxford", funding: "Fully Funded", deadline: "Jan 2026",
        amount: "Full fees + generous living grant", fields: ["All Fields"], level: "Masters / PhD",
        tag: "University", color: "#8B4513", featured: false,
        overview: "The Clarendon Fund provides over 140 scholarships every year to academically excellent graduate students from around the world at the University of Oxford.",
        highlights: ["Full tuition and college fees", "Generous living expenses grant", "Covers all subject areas", "Over 140 awards annually", "Based purely on academic merit"],
        url: "https://www.ox.ac.uk/clarendon/",
      },
      {
        id: 6, name: "Think Big Scholarship – Bristol", funding: "Partially Funded", deadline: "Mar 2026",
        amount: "£5,000 – £20,000 tuition reduction", fields: ["All Fields"], level: "Bachelors / Masters",
        tag: "University", color: "#6B3A0A", featured: false,
        overview: "The University of Bristol's Think Big Scholarships are available to international students who can demonstrate outstanding academic ability and leadership potential.",
        highlights: ["Up to £20,000 fee reduction", "Available for UG and PG programmes", "No separate application needed", "Multiple awards available", "Based on academic achievement"],
        url: "https://www.bristol.ac.uk/students/support/finances/scholarships/think-big/",
      },
    ],
  },
  "united-states": {
    flag: "🇺🇸",
    name: "United States",
    heroImage: "https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=1600&q=80",
    description: "The United States hosts more international students than any other country, with top-tier universities and a vast array of scholarship programmes spanning government, university, and private foundations.",
    scholarships: [
      {
        id: 1, name: "Fulbright Foreign Student Program", funding: "Fully Funded", deadline: "Oct 2025",
        amount: "$40,000+ per year", fields: ["All Fields"], level: "Masters / PhD",
        tag: "Prestigious", color: "#1B3A5C", featured: true,
        overview: "The Fulbright Program is the flagship international educational exchange program sponsored by the U.S. government. It operates in over 160 countries and provides funding for graduate students to study and conduct research in the United States.",
        highlights: ["Full tuition coverage", "Monthly living stipend", "Round-trip airfare", "Health insurance provided", "Enrichment activities & networking"],
        url: "https://foreign.fulbrightonline.org/",
      },
      {
        id: 2, name: "Hubert H. Humphrey Fellowship", funding: "Fully Funded", deadline: "Sep 2025",
        amount: "Full tuition + living expenses", fields: ["Public Policy", "Management", "STEM"], level: "Non-Degree",
        tag: "Leadership", color: "#690B1B", featured: false,
        overview: "The Humphrey Fellowship Program brings accomplished mid-career professionals to the United States for a year of non-degree graduate study, leadership development, and professional collaboration.",
        highlights: ["Tuition & fees at host university", "Monthly maintenance allowance", "Accident & sickness coverage", "Book allowance", "Professional development funding"],
        url: "https://www.humphreyfellowship.org/",
      },
      {
        id: 3, name: "AAUW International Fellowships", funding: "Partially Funded", deadline: "Nov 2025",
        amount: "$18,000 – $30,000", fields: ["All Fields"], level: "Masters / PhD / Postdoc",
        tag: "Women Only", color: "#8B1A5C", featured: false,
        overview: "The American Association of University Women International Fellowships are awarded for full-time study or research in the United States to women who are not U.S. citizens.",
        highlights: ["$18,000 for Masters", "$20,000 for Doctoral", "$30,000 for Postdoctoral", "Open to all nationalities (women)", "No field restrictions"],
        url: "https://www.aauw.org/resources/programs/fellowships-grants/current-opportunities/international/",
      },
      {
        id: 4, name: "Knight-Hennessy Scholars – Stanford", funding: "Fully Funded", deadline: "Oct 2025",
        amount: "Full funding for up to 3 years", fields: ["All Fields"], level: "Masters / PhD / JD / MBA",
        tag: "Elite", color: "#3D0B69", featured: true,
        overview: "Knight-Hennessy Scholars is Stanford University's flagship multidisciplinary scholarship programme. It develops a community of future global leaders by providing full funding for any graduate degree at Stanford.",
        highlights: ["Full tuition for any Stanford graduate degree", "Stipend for living & academic expenses", "Graduate fellowship for up to 3 years", "Leadership development programming", "Global travel"],
        url: "https://knight-hennessy.stanford.edu/",
      },
      {
        id: 5, name: "MasterCard Foundation Scholars", funding: "Fully Funded", deadline: "Varies",
        amount: "Full tuition + comprehensive support", fields: ["All Fields"], level: "Bachelors / Masters",
        tag: "Africa Focus", color: "#2D5016", featured: false,
        overview: "The Mastercard Foundation Scholars Program provides comprehensive support to academically talented young people, primarily from Africa, to complete their education at leading universities in the US.",
        highlights: ["Full tuition and accommodation", "Books and supplies covered", "Travel costs included", "Mentorship and career services", "Transition support"],
        url: "https://mastercardfdn.org/all/scholars/",
      },
      {
        id: 6, name: "Rotary Peace Fellowship", funding: "Fully Funded", deadline: "May 2026",
        amount: "Full tuition + living + travel", fields: ["Peace Focus"], level: "Masters / Certificate",
        tag: "Peace Focus", color: "#1A3B6E", featured: false,
        overview: "The Rotary Foundation awards fully funded fellowships for dedicated leaders from around the world to study peace and conflict resolution at partner universities in the US and globally.",
        highlights: ["Full tuition and fees", "Room and board", "Round-trip transportation", "Internship/field study expenses", "Global Rotary network"],
        url: "https://www.rotary.org/en/our-programs/peace-fellowships",
      },
    ],
  },
  "germany": {
    flag: "🇩🇪",
    name: "Germany",
    heroImage: "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=1600&q=80",
    description: "Germany offers tuition-free education at most public universities and is home to some of Europe's most generous scholarship programmes. DAAD alone awards over 100,000 scholarships annually.",
    scholarships: [
      {
        id: 1, name: "DAAD Scholarship", funding: "Fully Funded", deadline: "Sep 2025",
        amount: "€934 – €1,300/month", fields: ["All Fields"], level: "Masters / PhD",
        tag: "Top Rated", color: "#2D5016", featured: true,
        overview: "The German Academic Exchange Service (DAAD) provides monthly stipends, health insurance, and travel grants for international students pursuing postgraduate degrees at German universities.",
        highlights: ["Monthly stipend of €934 (Masters) or €1,300 (PhD)", "Health & accident insurance", "Travel allowance", "German language course funding", "Research grants"],
        url: "https://www.daad.de/en/study-and-research-in-germany/scholarships/",
      },
      {
        id: 2, name: "Deutschlandstipendium", funding: "Partially Funded", deadline: "Varies",
        amount: "€300/month", fields: ["All Fields"], level: "Bachelors / Masters",
        tag: "Merit-Based", color: "#690B1B", featured: false,
        overview: "The Deutschlandstipendium supports high-achieving students of all nationalities studying at German universities, funded equally by the German federal government and private sponsors.",
        highlights: ["€300 per month tax-free", "Open to all nationalities", "Compatible with BAföG", "Mentoring by sponsors", "Available at 300+ universities"],
        url: "https://www.deutschlandstipendium.de/",
      },
      {
        id: 3, name: "Heinrich Böll Foundation Scholarship", funding: "Fully Funded", deadline: "Mar 2026",
        amount: "€934/month + tuition + allowances", fields: ["All Fields"], level: "Masters / PhD",
        tag: "Values-Based", color: "#1A3B6E", featured: false,
        overview: "The Heinrich Böll Foundation awards scholarships to international students pursuing studies at German universities who share the foundation's values of ecology, democracy, and solidarity.",
        highlights: ["Monthly stipend of up to €934", "Tuition fees covered", "Family and child allowances", "Health insurance subsidy", "Political education programme"],
        url: "https://www.boell.de/en/scholarships",
      },
      {
        id: 4, name: "Konrad-Adenauer-Stiftung Scholarship", funding: "Fully Funded", deadline: "Jul 2026",
        amount: "€934/month + benefits", fields: ["All Fields"], level: "Masters / PhD",
        tag: "Political", color: "#8B4513", featured: false,
        overview: "The Konrad-Adenauer-Stiftung awards scholarships to international students who demonstrate above-average academic performance and social engagement.",
        highlights: ["Monthly stipend of €934", "Study & research allowance", "Health insurance subsidy", "Networking with global alumni", "Seminars and workshops"],
        url: "https://www.kas.de/en/scholarships",
      },
      {
        id: 5, name: "Friedrich Ebert Foundation Scholarship", funding: "Fully Funded", deadline: "Varies",
        amount: "€850/month + support", fields: ["Social Sciences", "Political Studies"], level: "Masters / PhD",
        tag: "Social Focus", color: "#5C1B1B", featured: false,
        overview: "The Friedrich Ebert Foundation provides scholarships to international students pursuing degrees in Germany who demonstrate social commitment.",
        highlights: ["Monthly stipend of €850", "Tuition fee support", "Social engagement programme", "Mentoring and counselling", "Alumni network access"],
        url: "https://www.fes.de/en/scholarships",
      },
    ],
  },
  "canada": {
    flag: "🇨🇦",
    name: "Canada",
    heroImage: "https://images.unsplash.com/photo-1517935706615-2717063c2225?w=1600&q=80",
    description: "Canada is known for its welcoming immigration policies, world-class universities, and generous scholarship programmes across government, university, and private foundations.",
    scholarships: [
      {
        id: 1, name: "Vanier Canada Graduate Scholarship", funding: "Fully Funded", deadline: "Nov 2025",
        amount: "CAD $50,000/year for 3 years", fields: ["Health", "STEM", "Social Sciences"], level: "PhD",
        tag: "Most Prestigious", color: "#690B1B", featured: true,
        overview: "The Vanier CGS program attracts world-class doctoral students by supporting students who demonstrate both leadership skills and scholarly achievement.",
        highlights: ["$50,000 annually for 3 years", "Open to Canadian & international students", "Covers health, natural, and social sciences", "Based on academic excellence & leadership", "Prestigious research credential"],
        url: "https://vanier.gc.ca/en/home-accueil.html",
      },
      {
        id: 2, name: "Trudeau Foundation Scholarship", funding: "Fully Funded", deadline: "Dec 2025",
        amount: "CAD $40,000/year + $20,000 travel", fields: ["Humanities", "Social Sciences"], level: "PhD",
        tag: "Leadership", color: "#1B3A5C", featured: false,
        overview: "The Pierre Elliott Trudeau Foundation Doctoral Scholarships support exceptional doctoral students whose research addresses issues of significant importance to Canadians.",
        highlights: ["$40,000 annual stipend for 3 years", "$20,000 annual travel allowance", "Mentorship from renowned practitioners", "Networking with thought leaders", "Leadership development events"],
        url: "https://www.trudeaufoundation.ca/scholarships",
      },
      {
        id: 3, name: "Lester B. Pearson Scholarship – UofT", funding: "Fully Funded", deadline: "Nov 2025",
        amount: "Full tuition + residence + books", fields: ["All Fields"], level: "Bachelors",
        tag: "Undergraduate", color: "#2D5016", featured: false,
        overview: "The Lester B. Pearson International Scholarship at the University of Toronto recognizes outstanding international students entering undergraduate study.",
        highlights: ["Full tuition for 4 years", "Residence & living costs", "Books and incidental fees", "No field restrictions", "Top UG award"],
        url: "https://future.utoronto.ca/pearson/",
      },
      {
        id: 4, name: "Banting Postdoctoral Fellowships", funding: "Fully Funded", deadline: "Sep 2025",
        amount: "CAD $70,000/year for 2 years", fields: ["STEM", "Health", "Social Sciences"], level: "Postdoctoral",
        tag: "Research", color: "#3D0B69", featured: false,
        overview: "The Banting Postdoctoral Fellowships program provides funding to top postdoctoral applicants globally contributing to research-based growth.",
        highlights: ["$70,000 per year for 2 years", "Open to all nationalities", "Tenable at any Canadian university", "Builds research leadership", "Highly competitive"],
        url: "https://banting.fellowships-bourses.gc.ca/en/home-accueil.html",
      },
      {
        id: 5, name: "University of British Columbia Awards", funding: "Partially Funded", deadline: "Jan 2026",
        amount: "CAD $10,000 – $40,000", fields: ["All Fields"], level: "Bachelors / Masters",
        tag: "University", color: "#6B3A0A", featured: false,
        overview: "UBC offers merit-based and needs-based entrance awards for international students recognising academic achievement and community involvement.",
        highlights: ["Up to $40,000 entrance scholarships", "Renewable based on performance", "Additional needs-based aid", "Available across all faculties", "Research assistantships"],
        url: "https://you.ubc.ca/financial-planning/scholarships-awards/international-scholarships/",
      },
    ],
  },
  "australia": {
    flag: "🇦🇺",
    name: "Australia",
    heroImage: "https://images.unsplash.com/photo-1523482580672-f109ba8cb9be?w=1600&q=80",
    description: "Australia is one of the most popular study destinations globally, with world-renowned research universities and generous government and institution scholarships.",
    scholarships: [
      {
        id: 1, name: "Australia Awards Scholarships", funding: "Fully Funded", deadline: "Apr 2026",
        amount: "Full tuition + AUD $3,000+ stipend/mo", fields: ["Development Focus"], level: "Masters / PhD",
        tag: "Government", color: "#6B3A0A", featured: true,
        overview: "Australia Awards Scholarships are long-term development awards administered by the Department of Foreign Affairs and Trade for partner countries.",
        highlights: ["Full tuition fees", "Return air travel", "Contribution to living expenses", "Introductory academic programme", "Overseas Student Health Cover"],
        url: "https://www.dfat.gov.au/people-to-people/australia-awards/australia-awards-scholarships",
      },
      {
        id: 2, name: "Research Training Program (RTP)", funding: "Fully Funded", deadline: "Varies",
        amount: "AUD $32,192/year stipend + tuition", fields: ["All Fields"], level: "Masters by Research / PhD",
        tag: "Research", color: "#1B3A5C", featured: false,
        overview: "The Research Training Program (RTP) provides funding for domestic and international students undertaking research doctorate and master's degrees in Australia.",
        highlights: ["Full tuition fee offset", "Annual stipend of $32,192", "Thesis allowance", "Available at all Australian universities", "Up to 4 years for PhD"],
        url: "https://www.education.gov.au/research-training-program",
      },
      {
        id: 3, name: "Endeavour Leadership Program", funding: "Fully Funded", deadline: "Apr 2026",
        amount: "Up to AUD $272,500 total value", fields: ["All Fields"], level: "Masters / PhD / Postdoc",
        tag: "Leadership", color: "#690B1B", featured: false,
        overview: "The Endeavour Leadership Program provides internationally competitive scholarships and fellowships for study and research in Australia.",
        highlights: ["Tuition fees up to $15,000/semester", "Travel allowance of $3,000", "Monthly stipend of $3,000", "Health insurance", "Establishment allowance"],
        url: "https://www.education.gov.au/endeavour-leadership-program",
      },
      {
        id: 4, name: "University of Melbourne Scholarships", funding: "Partially Funded", deadline: "Oct 2025",
        amount: "AUD $10,000 – full fee remission", fields: ["All Fields"], level: "Bachelors / Masters",
        tag: "University", color: "#2D5016", featured: false,
        overview: "The University of Melbourne offers international undergraduate and graduate research scholarships covering up to 100% of tuition fees.",
        highlights: ["Up to 100% fee remission", "Renewable based on GPA", "Available across all faculties", "Graduate research stipends", "Additional travel grants"],
        url: "https://scholarships.unimelb.edu.au/",
      },
    ],
  },
  "netherlands": {
    flag: "🇳🇱",
    name: "Netherlands",
    heroImage: "https://images.unsplash.com/photo-1534351590666-13e3e96b5017?w=1600&q=80",
    description: "The Netherlands boasts innovative universities with extensive English-taught master's degrees and generous funding for international scholars.",
    scholarships: [
      {
        id: 1, name: "Holland Scholarship", funding: "Partially Funded", deadline: "Feb 2026",
        amount: "€5,000 one-time", fields: ["All Fields"], level: "Bachelors / Masters",
        tag: "National", color: "#FF6600", featured: false,
        overview: "The Holland Scholarship is for international students from outside the EEA pursuing a bachelor's or master's at participating Dutch research universities.",
        highlights: ["€5,000 one-time grant", "Open to non-EEA students", "Multiple participating universities", "First year of study", "Merit-based selection"],
        url: "https://www.studyinholland.nl/finances/scholarships/holland-scholarship",
      },
      {
        id: 2, name: "Orange Knowledge Programme", funding: "Fully Funded", deadline: "Varies",
        amount: "Full tuition + living + travel", fields: ["Development Focus"], level: "Masters / Short Course",
        tag: "Government", color: "#FF8C00", featured: false,
        overview: "Funded by the Dutch Ministry of Foreign Affairs, OKP offers full scholarships for mid-career professionals from target developing nations.",
        highlights: ["Full tuition fees", "Monthly living allowance", "International travel costs", "Visa and insurance covered", "Targeted at developing countries"],
        url: "https://www.nuffic.nl/en/subjects/orange-knowledge-programme",
      },
      {
        id: 3, name: "University of Amsterdam Excellence", funding: "Fully Funded", deadline: "Jan 2026",
        amount: "Full tuition + €1,000/mo stipend", fields: ["All Fields"], level: "Masters",
        tag: "Excellence", color: "#690B1B", featured: true,
        overview: "The Amsterdam Excellence Scholarship is a full scholarship for exceptionally talented non-EU/EEA master's students at the University of Amsterdam.",
        highlights: ["Full tuition fee waiver", "€1,000 monthly living stipend", "Open to non-EU/EEA students", "All master's programmes eligible", "Highly competitive selection"],
        url: "https://www.uva.nl/en/education/master-s/scholarships-and-funding/amsterdam-excellence-scholarship/amsterdam-excellence-scholarship.html",
      },
    ],
  },
  "sweden": {
    flag: "🇸🇪",
    name: "Sweden",
    heroImage: "https://images.unsplash.com/photo-1509356843151-3e7d96241e11?w=1600&q=80",
    description: "Sweden offers world-leading research, sustainability focus, and generous government and university funding schemes.",
    scholarships: [
      {
        id: 1, name: "Swedish Institute Scholarships (SISGP)", funding: "Fully Funded", deadline: "Feb 2026",
        amount: "Full tuition + SEK 10,000/mo", fields: ["All Fields"], level: "Masters",
        tag: "Government", color: "#005BAA", featured: true,
        overview: "The Swedish Institute Scholarships for Global Professionals cover full tuition, living expenses, travel grants, and insurance for master's studies in Sweden.",
        highlights: ["Full tuition fees covered", "Living allowance of SEK 10,000/month", "Travel grant", "Insurance coverage", "Networking with SI network"],
        url: "https://si.se/en/apply/scholarships/swedish-institute-scholarships-for-global-professionals/",
      },
      {
        id: 2, name: "KTH Royal Institute Scholarships", funding: "Partially Funded", deadline: "Jan 2026",
        amount: "Full or partial tuition waiver", fields: ["STEM", "Technology"], level: "Masters",
        tag: "University", color: "#1B3A5C", featured: false,
        overview: "KTH Royal Institute of Technology offers tuition fee waivers for outstanding fee-paying international master's students in engineering and tech.",
        highlights: ["Up to 100% tuition fee waiver", "For non-EU/EEA students", "Engineering & technology focus", "Based on academic merit", "Located in Stockholm"],
        url: "https://www.kth.se/en/studies/fees-and-scholarships",
      },
      {
        id: 3, name: "Lund University Global Scholarship", funding: "Partially Funded", deadline: "Jan 2026",
        amount: "25% – 100% tuition reduction", fields: ["All Fields"], level: "Masters",
        tag: "University", color: "#2D5016", featured: false,
        overview: "Lund University awards partial to full tuition fee waivers to academically gifted non-EU/EEA students across all master's degree programmes.",
        highlights: ["Up to 100% tuition reduction", "One of Sweden's top universities", "Multiple awards available", "All master's programmes eligible", "Scenic campus"],
        url: "https://www.lunduniversity.lu.se/admissions/scholarships-and-awards/lund-university-global-scholarship",
      },
    ],
  },
  "japan": {
    flag: "🇯🇵",
    name: "Japan",
    heroImage: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=1600&q=80",
    description: "Japan combines high-tech education, safety, and rich culture. The government's MEXT scholarship is among the world's most generous fully-funded awards.",
    scholarships: [
      {
        id: 1, name: "MEXT Scholarship", funding: "Fully Funded", deadline: "Apr 2026",
        amount: "¥143,000 – ¥148,000/mo + tuition", fields: ["All Fields"], level: "Bachelors / Masters / PhD",
        tag: "Government", color: "#BC002D", featured: true,
        overview: "The MEXT Scholarship is Japan's premier government scholarship for international students, covering full tuition, monthly stipend, round-trip flight, and language training.",
        highlights: ["Full tuition exemption", "Monthly stipend of ¥143,000–¥148,000", "Round-trip airfare", "Japanese language preparatory education", "No age limit for research"],
        url: "https://www.mext.go.jp/en/policy/education/highered/title02/detail02/sdetail02/1373897.htm",
      },
      {
        id: 2, name: "JASSO Scholarship", funding: "Partially Funded", deadline: "Varies",
        amount: "¥48,000 – ¥80,000/month", fields: ["All Fields"], level: "Bachelors / Masters / PhD",
        tag: "National", color: "#1B3A5C", featured: false,
        overview: "The JASSO Honors Scholarship supports privately funded international students showing strong academic performance at Japanese institutions.",
        highlights: ["Monthly stipend of ¥48,000–¥80,000", "For privately funded students", "Based on academic performance", "Available at most universities", "Tuition reduction compatible"],
        url: "https://www.jasso.go.jp/en/ryugaku/scholarship/index.html",
      },
      {
        id: 3, name: "University of Tokyo PEAK Fellowship", funding: "Fully Funded", deadline: "Nov 2025",
        amount: "Full tuition + ¥150,000/month", fields: ["Liberal Arts", "Sciences"], level: "Bachelors",
        tag: "Elite", color: "#3D0B69", featured: false,
        overview: "UTokyo PEAK Fellows receive full tuition waivers and living stipends for English-taught liberal arts degree programmes at Japan's flagship university.",
        highlights: ["Full tuition exemption", "Monthly living stipend of ¥150,000", "English-taught programme", "Japan's #1 university", "Housing support"],
        url: "https://peak.c.u-tokyo.ac.jp/",
      },
    ],
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// COLLECTION CREATION HELPER
// ─────────────────────────────────────────────────────────────────────────────

async function ensureCollection(collectionId, displayName, fields) {
  try {
    await wixRequest("GET", `/collections/${collectionId}`);
    console.log(`✅ Collection '${collectionId}' already exists.`);
  } catch (err) {
    console.log(`ℹ️ Creating collection '${collectionId}'...`);
    const payload = {
      collection: {
        id: collectionId,
        displayName,
        fields,
        permissions: {
          read: "ANYONE",
          insert: "ADMIN",
          update: "ADMIN",
          remove: "ADMIN",
        },
      },
    };
    try {
      await wixRequest("POST", "/collections", payload);
      console.log(`✅ Collection '${collectionId}' created!`);
    } catch (createErr) {
      if (createErr.message && (createErr.message.includes("409") || createErr.message.includes("already exists"))) {
        console.log(`✅ Collection '${collectionId}' already exists (409).`);
      } else {
        console.warn(`⚠️ Collection creation warning for '${collectionId}': ${createErr.message}`);
      }
    }
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// SEEDING LOGIC
// ─────────────────────────────────────────────────────────────────────────────

async function seedWixCMS() {
  console.log("🚀 Starting Wix CMS bootstrapping and seeding...");

  // Delete StaticData collection from Wix CMS as requested by user
  await deleteStaticDataCollection();

  // 1. Ensure `Scholarships` collection
  await ensureCollection("Scholarships", "Scholarships", [
    { key: "name", id: "name", displayName: "Name", type: "TEXT" },
    { key: "slug", id: "slug", displayName: "Slug", type: "TEXT" },
    { key: "country", id: "country", displayName: "Country", type: "TEXT" },
    { key: "countrySlug", id: "countrySlug", displayName: "Country Slug", type: "TEXT" },
    { key: "countryFlag", id: "countryFlag", displayName: "Country Flag", type: "TEXT" },
    { key: "heroImage", id: "heroImage", displayName: "Hero Image", type: "TEXT" },
    { key: "funding", id: "funding", displayName: "Funding Type", type: "TEXT" },
    { key: "deadline", id: "deadline", displayName: "Deadline", type: "TEXT" },
    { key: "amount", id: "amount", displayName: "Amount", type: "TEXT" },
    { key: "fields", id: "fields", displayName: "Fields", type: "TEXT" },
    { key: "level", id: "level", displayName: "Level", type: "TEXT" },
    { key: "tag", id: "tag", displayName: "Tag", type: "TEXT" },
    { key: "color", id: "color", displayName: "Color", type: "TEXT" },
    { key: "overview", id: "overview", displayName: "Overview", type: "TEXT" },
    { key: "highlights", id: "highlights", displayName: "Highlights", type: "TEXT" },
    { key: "url", id: "url", displayName: "URL", type: "TEXT" },
    { key: "featured", id: "featured", displayName: "Featured", type: "BOOLEAN" },
  ]);

  // 2. Ensure `Deadlines` collection
  await ensureCollection("Deadlines", "Deadlines", [
    { key: "title", id: "title", displayName: "Title", type: "TEXT" },
    { key: "scholarshipSlug", id: "scholarshipSlug", displayName: "Scholarship Slug", type: "TEXT" },
    { key: "country", id: "country", displayName: "Country", type: "TEXT" },
    { key: "countrySlug", id: "countrySlug", displayName: "Country Slug", type: "TEXT" },
    { key: "deadlineDate", id: "deadlineDate", displayName: "Deadline Date", type: "TEXT" },
    { key: "urgency", id: "urgency", displayName: "Urgency", type: "TEXT" },
    { key: "status", id: "status", displayName: "Status", type: "TEXT" },
    { key: "notes", id: "notes", displayName: "Notes", type: "TEXT" },
  ]);

  // Fetch existing items in Scholarships to avoid duplicate insertion
  let existingScholarshipSlugs = new Set();
  try {
    const qRes = await wixRequest("POST", "/items/query", {
      dataCollectionId: "Scholarships",
      query: { paging: { limit: 100 } },
    });
    const items = qRes.dataItems || qRes.items || [];
    for (const it of items) {
      const data = it.data || it;
      if (data.slug) existingScholarshipSlugs.add(data.slug);
    }
    console.log(`ℹ️ Found ${existingScholarshipSlugs.size} existing items in 'Scholarships'.`);
  } catch (e) {
    console.warn(`⚠️ Could not query existing items in Scholarships: ${e.message}`);
  }

  // Insert Scholarships & Deadlines
  let insertedCount = 0;
  let deadlineCount = 0;

  for (const [cSlug, cData] of Object.entries(countryScholarshipsData)) {
    for (const s of cData.scholarships) {
      const sSlug = `${cSlug}-${s.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")}`;
      const itemData = {
        name: s.name,
        slug: sSlug,
        country: cData.name,
        countrySlug: cSlug,
        countryFlag: cData.flag,
        heroImage: cData.heroImage,
        funding: s.funding,
        deadline: s.deadline,
        amount: s.amount,
        fields: JSON.stringify(s.fields),
        level: s.level,
        tag: s.tag,
        color: s.color,
        overview: s.overview,
        highlights: JSON.stringify(s.highlights),
        url: s.url,
        featured: s.featured || false,
      };

      if (!existingScholarshipSlugs.has(sSlug)) {
        try {
          await wixRequest("POST", "/items", {
            dataCollectionId: "Scholarships",
            dataItem: { data: itemData },
          });
          insertedCount++;
          console.log(`➕ Inserted Scholarship: ${s.name} (${cData.name})`);
        } catch (insErr) {
          console.error(`❌ Error inserting scholarship ${s.name}: ${insErr.message}`);
        }
      }

      // Seed Deadlines collection entry
      try {
        const deadlineItem = {
          title: `${s.name} Application Deadline`,
          scholarshipSlug: sSlug,
          country: cData.name,
          countrySlug: cSlug,
          deadlineDate: s.deadline,
          urgency: s.deadline.includes("2025") ? "Closing Soon" : "Upcoming",
          status: "Active",
          notes: `Official deadline for ${s.name}. Check requirements before applying.`,
        };
        await wixRequest("POST", "/items", {
          dataCollectionId: "Deadlines",
          dataItem: { data: deadlineItem },
        });
        deadlineCount++;
      } catch (dErr) {
        // Suppress deadline errors if duplicate
      }
    }
  }

  console.log(`✨ Processed ${insertedCount} new scholarships and ${deadlineCount} deadlines into Wix CMS.`);
  console.log("🎉 Wix CMS bootstrapping completed successfully!");
}

seedWixCMS().catch((err) => {
  console.error("❌ Seeding failed:", err);
  process.exit(1);
});
