export interface Scholarship {
  id: number;
  name: string;
  funding: string;
  deadline: string;
  amount: string;
  fields: string[];
  level: string;
  tag: string;
  color: string;
  overview: string;
  highlights: string[];
  url: string;
}

export interface CountryData {
  flag: string;
  name: string;
  heroImage: string;
  scholarshipCount: string;
  description: string;
  scholarships: Scholarship[];
}

export const countryScholarshipsMap: Record<string, CountryData> = {
  /* ─────────────────────────────────────
     UNITED KINGDOM
     ───────────────────────────────────── */
  "united-kingdom": {
    flag: "🇬🇧",
    name: "United Kingdom",
    heroImage: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=1600&q=80",
    scholarshipCount: "420+",
    description: "The UK is home to world-renowned universities like Oxford, Cambridge, and Imperial College London. British scholarships are among the most prestigious globally, offering fully-funded opportunities for international students.",
    scholarships: [
      {
        id: 1, name: "Chevening Scholarship", funding: "Fully Funded", deadline: "Nov 2025",
        amount: "Full tuition + £1,133/mo living", fields: ["All Fields"], level: "Masters",
        tag: "Most Popular", color: "#690B1B",
        overview: "Chevening is the UK government's global scholarship programme, funded by the Foreign, Commonwealth & Development Office and partner organisations. It offers full financial support for future leaders, influencers, and decision-makers to study one-year master's degrees at any UK university. Scholars are selected based on leadership potential, a strong academic background, and a genuine commitment to making a positive impact.",
        highlights: ["Full tuition fees covered", "Monthly living allowance of £1,133", "Economy class return airfare", "Thesis or dissertation grant", "Networking opportunities with 50,000+ alumni"],
        url: "https://www.chevening.org/scholarships/",
      },
      {
        id: 2, name: "Gates Cambridge Scholarship", funding: "Fully Funded", deadline: "Dec 2025",
        amount: "Full cost of study + stipend", fields: ["All Fields"], level: "PhD / Masters",
        tag: "Elite", color: "#3D0B69",
        overview: "The Gates Cambridge Scholarship is one of the most prestigious international scholarships in the world. Funded by the Bill & Melinda Gates Foundation, it enables outstanding applicants from outside the UK to pursue a postgraduate degree at the University of Cambridge. The programme focuses on academic excellence, leadership ability, and a commitment to improving the lives of others.",
        highlights: ["Full university fees and college fees", "Maintenance allowance (£18,744/year)", "Inbound airfare & visa costs", "Academic development funding", "Family allowance where applicable"],
        url: "https://www.gatescambridge.org/",
      },
      {
        id: 3, name: "Rhodes Scholarship", funding: "Fully Funded", deadline: "Oct 2025",
        amount: "Full tuition + generous stipend", fields: ["All Fields"], level: "Masters / PhD",
        tag: "Prestigious", color: "#1B3A5C",
        overview: "The Rhodes Scholarship is the oldest and perhaps most prestigious international scholarship, enabling students to study at the University of Oxford. Established in 1903, it seeks young leaders who demonstrate academic achievement, character, leadership, and a commitment to service. Rhodes Scholars become part of a lifelong global community of change-makers.",
        highlights: ["University & college fees fully covered", "Annual stipend of £18,180", "Settling-in allowance", "Health insurance via NHS", "Access to Rhodes House & global network"],
        url: "https://www.rhodeshouse.ox.ac.uk/scholarships/",
      },
      {
        id: 4, name: "Commonwealth Scholarship", funding: "Fully Funded", deadline: "Dec 2025",
        amount: "Full tuition + £1,236/mo", fields: ["Development Focus"], level: "Masters / PhD",
        tag: "Government", color: "#2D5016",
        overview: "Commonwealth Scholarships are for citizens of Commonwealth countries to pursue postgraduate study at UK universities. Funded by the UK Department for International Development, these scholarships target those who have the potential to make a positive impact on development in their home countries. Priority is given to candidates who can demonstrate how their studies will contribute to their country's development.",
        highlights: ["Approved airfare to the UK and return", "Full tuition fees", "Monthly stipend of £1,236 (London rate)", "Warm clothing allowance", "Study travel grant & thesis grant"],
        url: "https://cscuk.fcdo.gov.uk/scholarships/",
      },
      {
        id: 5, name: "Clarendon Scholarship – Oxford", funding: "Fully Funded", deadline: "Jan 2026",
        amount: "Full fees + generous living grant", fields: ["All Fields"], level: "Masters / PhD",
        tag: "University", color: "#8B4513",
        overview: "The Clarendon Fund provides over 140 scholarships every year to academically excellent graduate students from around the world. It is the largest scholarship scheme at the University of Oxford, covering full tuition and college fees along with a generous grant for living expenses. Awards are made on the basis of academic excellence and potential across all subject areas.",
        highlights: ["Full tuition and college fees", "Generous living expenses grant", "Covers all subject areas", "Over 140 awards annually", "Based purely on academic merit"],
        url: "https://www.ox.ac.uk/clarendon/",
      },
      {
        id: 6, name: "Think Big Scholarship – Bristol", funding: "Partially Funded", deadline: "Mar 2026",
        amount: "£5,000 – £20,000 tuition reduction", fields: ["All Fields"], level: "Bachelors / Masters",
        tag: "University", color: "#6B3A0A",
        overview: "The University of Bristol's Think Big Scholarships are available to international students who can demonstrate outstanding academic ability and the potential to be an ambassador for the university. The scholarship offers a tuition fee reduction and is available across most undergraduate and postgraduate taught programmes.",
        highlights: ["Up to £20,000 fee reduction", "Available for UG and PG programmes", "No separate application needed", "Multiple awards available", "Based on academic achievement"],
        url: "https://www.bristol.ac.uk/students/support/finances/scholarships/think-big/",
      },
    ],
  },

  /* ─────────────────────────────────────
     UNITED STATES
     ───────────────────────────────────── */
  "united-states": {
    flag: "🇺🇸",
    name: "United States",
    heroImage: "https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=1600&q=80",
    scholarshipCount: "380+",
    description: "The United States hosts more international students than any other country, with top-tier universities and a vast array of scholarship programmes spanning government, university, and private foundations.",
    scholarships: [
      {
        id: 1, name: "Fulbright Foreign Student Program", funding: "Fully Funded", deadline: "Oct 2025",
        amount: "$40,000+ per year", fields: ["All Fields"], level: "Masters / PhD",
        tag: "Prestigious", color: "#1B3A5C",
        overview: "The Fulbright Program is the flagship international educational exchange program sponsored by the U.S. government. It operates in over 160 countries and provides funding for graduate students, young professionals, and artists to study and conduct research in the United States. The program aims to increase mutual understanding between the people of the United States and other countries.",
        highlights: ["Full tuition coverage", "Monthly living stipend", "Round-trip airfare", "Health insurance provided", "Enrichment activities & networking"],
        url: "https://foreign.fulbrightonline.org/",
      },
      {
        id: 2, name: "Hubert H. Humphrey Fellowship", funding: "Fully Funded", deadline: "Sep 2025",
        amount: "Full tuition + living expenses", fields: ["Public Policy", "Management", "STEM"], level: "Non-Degree",
        tag: "Leadership", color: "#690B1B",
        overview: "The Humphrey Fellowship Program brings accomplished mid-career professionals from designated countries to the United States for a year of non-degree graduate study, leadership development, and professional collaboration. Fellows are placed at participating universities and gain practical experience through a professional affiliation.",
        highlights: ["Tuition & fees at host university", "Monthly maintenance allowance", "Accident & sickness coverage", "Book allowance", "Professional development funding"],
        url: "https://www.humphreyfellowship.org/",
      },
      {
        id: 3, name: "AAUW International Fellowships", funding: "Partially Funded", deadline: "Nov 2025",
        amount: "$18,000 – $30,000", fields: ["All Fields"], level: "Masters / PhD / Postdoc",
        tag: "Women Only", color: "#8B1A5C",
        overview: "The American Association of University Women (AAUW) International Fellowships are awarded for full-time study or research in the United States to women who are not U.S. citizens. These fellowships support women scholars pursuing academic work in the U.S. and are intended to build global connections through education.",
        highlights: ["$18,000 for Masters", "$20,000 for Doctoral", "$30,000 for Postdoctoral", "Open to all nationalities (women)", "No field restrictions"],
        url: "https://www.aauw.org/resources/programs/fellowships-grants/current-opportunities/international/",
      },
      {
        id: 4, name: "Knight-Hennessy Scholars – Stanford", funding: "Fully Funded", deadline: "Oct 2025",
        amount: "Full funding for up to 3 years", fields: ["All Fields"], level: "Masters / PhD / JD / MBA",
        tag: "Elite", color: "#3D0B69",
        overview: "Knight-Hennessy Scholars is Stanford University's flagship multidisciplinary scholarship programme. It develops a community of future global leaders by providing full funding for any graduate degree at Stanford. Scholars are selected for their independence of thought, purposeful leadership, and commitment to civic engagement.",
        highlights: ["Full tuition for any Stanford graduate degree", "Stipend for living & academic expenses", "Graduate fellowship for up to 3 years", "Leadership development programming", "Global travel & experiential learning"],
        url: "https://knight-hennessy.stanford.edu/",
      },
      {
        id: 5, name: "MasterCard Foundation Scholars", funding: "Fully Funded", deadline: "Varies",
        amount: "Full tuition + comprehensive support", fields: ["All Fields"], level: "Bachelors / Masters",
        tag: "Africa Focus", color: "#2D5016",
        overview: "The Mastercard Foundation Scholars Program provides comprehensive support to academically talented yet economically disadvantaged young people, primarily from Africa, to complete their education at leading universities in the US. The program goes beyond financial support, providing mentoring, career guidance, and transition support.",
        highlights: ["Full tuition and accommodation", "Books and supplies covered", "Travel costs included", "Mentorship and career services", "Transition support after graduation"],
        url: "https://mastercardfdn.org/all/scholars/",
      },
      {
        id: 6, name: "Rotary Peace Fellowship", funding: "Fully Funded", deadline: "May 2026",
        amount: "Full tuition + living + travel", fields: ["Peace & Conflict Resolution"], level: "Masters / Certificate",
        tag: "Peace Focus", color: "#1A3B6E",
        overview: "Each year, The Rotary Foundation awards up to 130 fully funded fellowships for dedicated leaders from around the world to study at one of Rotary's peace centers. Fellows study peace and development topics such as conflict resolution, mediation, and humanitarian assistance. The program aims to create a cadre of peacebuilders and community leaders.",
        highlights: ["Full tuition and fees", "Room and board", "Round-trip transportation", "Internship/field study expenses", "Access to Rotary's global network"],
        url: "https://www.rotary.org/en/our-programs/peace-fellowships",
      },
    ],
  },

  /* ─────────────────────────────────────
     GERMANY
     ───────────────────────────────────── */
  "germany": {
    flag: "🇩🇪",
    name: "Germany",
    heroImage: "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=1600&q=80",
    scholarshipCount: "310+",
    description: "Germany offers tuition-free education at most public universities and is home to some of Europe's most generous scholarship programmes. DAAD alone awards over 100,000 scholarships annually, making it a top destination for international students.",
    scholarships: [
      {
        id: 1, name: "DAAD Scholarship", funding: "Fully Funded", deadline: "Oct 2025",
        amount: "€934 – €1,300/month", fields: ["All Fields"], level: "Masters / PhD",
        tag: "Top Rated", color: "#2D5016",
        overview: "The German Academic Exchange Service (DAAD) is the world's largest funding organisation for international academic exchange. DAAD scholarships provide monthly stipends, health insurance, and travel grants for international students pursuing postgraduate degrees at German universities. Programmes vary by country and academic discipline.",
        highlights: ["Monthly stipend of €934 (Masters) or €1,300 (PhD)", "Health & accident insurance", "Travel allowance", "German language course funding", "Research grants available"],
        url: "https://www.daad.de/en/study-and-research-in-germany/scholarships/",
      },
      {
        id: 2, name: "Deutschlandstipendium", funding: "Partially Funded", deadline: "Varies by university",
        amount: "€300/month for 2 semesters", fields: ["All Fields"], level: "Bachelors / Masters",
        tag: "Merit-Based", color: "#690B1B",
        overview: "The Deutschlandstipendium (Germany Scholarship) supports high-achieving students of all nationalities studying at German universities. The scholarship is funded equally by the German federal government and private sponsors. It rewards academic excellence and also considers social engagement and personal background.",
        highlights: ["€300 per month tax-free", "Open to all nationalities", "Compatible with BAföG", "Mentoring by sponsors", "Available at 300+ universities"],
        url: "https://www.deutschlandstipendium.de/",
      },
      {
        id: 3, name: "Heinrich Böll Foundation Scholarship", funding: "Fully Funded", deadline: "Mar 2026",
        amount: "€934/month + tuition + allowances", fields: ["All Fields"], level: "Masters / PhD",
        tag: "Values-Based", color: "#1A3B6E",
        overview: "The Heinrich Böll Foundation awards scholarships to international students who are pursuing studies at German universities and share the foundation's values of ecology, democracy, solidarity, and non-violence. Scholars join a vibrant network and participate in seminars, workshops, and political education events.",
        highlights: ["Monthly stipend of up to €934", "Tuition fees covered", "Family and child allowances", "Health insurance subsidy", "Political education programme"],
        url: "https://www.boell.de/en/scholarships",
      },
      {
        id: 4, name: "Konrad-Adenauer-Stiftung Scholarship", funding: "Fully Funded", deadline: "Jul 2026",
        amount: "€934/month + benefits", fields: ["All Fields"], level: "Masters / PhD",
        tag: "Political", color: "#8B4513",
        overview: "The Konrad-Adenauer-Stiftung (KAS) awards scholarships to international students who demonstrate above-average academic performance, political and social engagement, and an interest in the values of democracy and a market economy. Scholars become part of a global alumni network spanning 120+ countries.",
        highlights: ["Monthly stipend of €934", "Study & research allowance", "Health insurance subsidy", "Networking with global alumni", "Seminars and workshops"],
        url: "https://www.kas.de/en/scholarships",
      },
      {
        id: 5, name: "Friedrich Ebert Foundation Scholarship", funding: "Fully Funded", deadline: "Varies",
        amount: "€850/month + additional support", fields: ["Social Sciences", "Political Studies"], level: "Masters / PhD",
        tag: "Social Focus", color: "#5C1B1B",
        overview: "The Friedrich Ebert Foundation provides scholarships to international students pursuing degrees in Germany who demonstrate social commitment and alignment with social democratic values. The foundation particularly supports students from developing countries and those who aim to make a positive contribution to society.",
        highlights: ["Monthly stipend of €850", "Tuition fee support", "Social engagement programme", "Mentoring and counselling", "Alumni network access"],
        url: "https://www.fes.de/en/scholarships",
      },
    ],
  },

  /* ─────────────────────────────────────
     CANADA
     ───────────────────────────────────── */
  "canada": {
    flag: "🇨🇦",
    name: "Canada",
    heroImage: "https://images.unsplash.com/photo-1517935706615-2717063c2225?w=1600&q=80",
    scholarshipCount: "280+",
    description: "Canada is known for its welcoming immigration policies, world-class universities, and generous scholarship programmes. From government-funded Vanier scholarships to university-specific awards, Canada offers diverse funding for international students.",
    scholarships: [
      {
        id: 1, name: "Vanier Canada Graduate Scholarship", funding: "Fully Funded", deadline: "Nov 2025",
        amount: "CAD $50,000/year for 3 years", fields: ["Health", "Natural Sciences", "Social Sciences", "Engineering"], level: "PhD",
        tag: "Most Prestigious", color: "#690B1B",
        overview: "The Vanier Canada Graduate Scholarships (Vanier CGS) program is designed to attract and retain world-class doctoral students by supporting students who demonstrate both leadership skills and a high standard of scholarly achievement. Named after Major-General Georges P. Vanier, the programme is valued at $50,000 per year for three years.",
        highlights: ["$50,000 annually for 3 years", "Open to Canadian & international students", "Covers health, natural, and social sciences", "Based on academic excellence & leadership", "Prestigious research credential"],
        url: "https://vanier.gc.ca/en/home-accueil.html",
      },
      {
        id: 2, name: "Trudeau Foundation Scholarship", funding: "Fully Funded", deadline: "Dec 2025",
        amount: "CAD $40,000/year + $20,000 travel", fields: ["Humanities", "Social Sciences"], level: "PhD",
        tag: "Leadership", color: "#1B3A5C",
        overview: "The Pierre Elliott Trudeau Foundation Doctoral Scholarships are among Canada's most prestigious. They support exceptional doctoral students whose research addresses issues of significant importance to Canadians. In addition to financial support, scholars receive mentorship from leading practitioners and become part of a vibrant intellectual community.",
        highlights: ["$40,000 annual stipend for 3 years", "$20,000 annual travel allowance", "Mentorship from renowned practitioners", "Networking with thought leaders", "Leadership development events"],
        url: "https://www.trudeaufoundation.ca/scholarships",
      },
      {
        id: 3, name: "Lester B. Pearson Scholarship – UofT", funding: "Fully Funded", deadline: "Nov 2025",
        amount: "Full tuition + residence + books for 4 years", fields: ["All Fields"], level: "Bachelors",
        tag: "Undergraduate", color: "#2D5016",
        overview: "The Lester B. Pearson International Scholarship Program at the University of Toronto recognizes outstanding international students entering their first year of undergraduate study. The award covers tuition, books, incidental fees, and full residence support for four years. It attracts top students from around the world.",
        highlights: ["Full tuition for 4 years", "Residence & living costs", "Books and incidental fees", "No field restrictions", "One of Canada's top UG awards"],
        url: "https://future.utoronto.ca/pearson/",
      },
      {
        id: 4, name: "Banting Postdoctoral Fellowships", funding: "Fully Funded", deadline: "Sep 2025",
        amount: "CAD $70,000/year for 2 years", fields: ["Health", "Natural Sciences", "Social Sciences"], level: "Postdoctoral",
        tag: "Research", color: "#3D0B69",
        overview: "The Banting Postdoctoral Fellowships program provides funding to the very best postdoctoral applicants, both nationally and internationally, who will positively contribute to Canada's economic, social, and research-based growth. It is one of the most competitive and well-funded postdoc fellowships globally.",
        highlights: ["$70,000 per year for 2 years", "Open to all nationalities", "Tenable at any Canadian university", "Builds research leadership", "Highly competitive & prestigious"],
        url: "https://banting.fellowships-bourses.gc.ca/en/home-accueil.html",
      },
      {
        id: 5, name: "University of British Columbia Awards", funding: "Partially Funded", deadline: "Jan 2026",
        amount: "CAD $10,000 – $40,000", fields: ["All Fields"], level: "Bachelors / Masters",
        tag: "University", color: "#6B3A0A",
        overview: "The University of British Columbia offers a range of merit-based and needs-based awards for international students. The International Major Entrance Scholarship (IMES) and other awards are designed to recognise outstanding academic achievement and community involvement. UBC is consistently ranked among Canada's top universities.",
        highlights: ["Up to $40,000 in entrance scholarships", "Renewable based on performance", "Additional needs-based aid", "Available across all faculties", "Research assistantships available"],
        url: "https://you.ubc.ca/financial-planning/scholarships-awards/international-scholarships/",
      },
    ],
  },

  /* ─────────────────────────────────────
     AUSTRALIA
     ───────────────────────────────────── */
  "australia": {
    flag: "🇦🇺",
    name: "Australia",
    heroImage: "https://images.unsplash.com/photo-1523482580672-f109ba8cb9be?w=1600&q=80",
    scholarshipCount: "240+",
    description: "Australia is one of the most popular study destinations in the world, with 7 universities in the global top 100. The Australian government and individual universities offer extensive scholarships for international students at all levels.",
    scholarships: [
      {
        id: 1, name: "Australia Awards Scholarships", funding: "Fully Funded", deadline: "Apr 2026",
        amount: "Full tuition + AUD $3,000+ stipend/mo", fields: ["Development Focus"], level: "Masters / PhD",
        tag: "Government", color: "#6B3A0A",
        overview: "Australia Awards Scholarships are long-term development awards administered by the Department of Foreign Affairs and Trade. They aim to contribute to the development needs of Australia's partner countries, in line with bilateral and regional agreements. Scholarships provide opportunities to study full-time at participating Australian universities.",
        highlights: ["Full tuition fees", "Return air travel", "Contribution to living expenses", "Introductory academic programme", "Overseas Student Health Cover"],
        url: "https://www.dfat.gov.au/people-to-people/australia-awards/australia-awards-scholarships",
      },
      {
        id: 2, name: "Research Training Program (RTP)", funding: "Fully Funded", deadline: "Varies",
        amount: "AUD $32,192/year stipend + tuition", fields: ["All Fields"], level: "Masters by Research / PhD",
        tag: "Research", color: "#1B3A5C",
        overview: "The Research Training Program (RTP) provides block grants to higher education providers to support both domestic and international students undertaking research doctorate and research master's degrees. RTP scholarships cover tuition fees, a living allowance, and a thesis allowance.",
        highlights: ["Full tuition fee offset", "Annual stipend of $32,192", "Thesis allowance", "Available at all Australian universities", "Up to 4 years for PhD"],
        url: "https://www.education.gov.au/research-training-program",
      },
      {
        id: 3, name: "Endeavour Leadership Program", funding: "Fully Funded", deadline: "Apr 2026",
        amount: "Up to AUD $272,500 total value", fields: ["All Fields"], level: "Masters / PhD / Postdoc",
        tag: "Leadership", color: "#690B1B",
        overview: "The Endeavour Leadership Program provides internationally competitive scholarships and fellowships to undertake study, research, and professional development in Australia. The programme supports high-achieving individuals from around the world and aims to build Australia's reputation for excellence in education and research.",
        highlights: ["Tuition fees up to $15,000/semester", "Travel allowance of $3,000", "Monthly stipend of $3,000", "Health insurance", "Establishment allowance"],
        url: "https://www.education.gov.au/endeavour-leadership-program",
      },
      {
        id: 4, name: "University of Melbourne Scholarships", funding: "Partially Funded", deadline: "Oct 2025",
        amount: "AUD $10,000 – full fee remission", fields: ["All Fields"], level: "Bachelors / Masters",
        tag: "University", color: "#2D5016",
        overview: "The University of Melbourne offers a comprehensive range of scholarships for international students, including the Melbourne International Undergraduate Scholarship and the Graduate Research Scholarships. These awards recognise academic excellence and can cover up to 100% of tuition fees.",
        highlights: ["Up to 100% fee remission", "Renewable based on GPA", "Available across all faculties", "Graduate research stipends", "Additional travel grants"],
        url: "https://scholarships.unimelb.edu.au/",
      },
      {
        id: 5, name: "Destination Australia Program", funding: "Partially Funded", deadline: "Varies",
        amount: "AUD $15,000/year", fields: ["All Fields"], level: "Bachelors / Masters / PhD",
        tag: "Regional", color: "#8B4513",
        overview: "The Destination Australia Program supports domestic and international students to study at regional Australian tertiary education providers. The program aims to grow and sustain the regions by attracting students to study in regional Australia, supporting regional economies and communities.",
        highlights: ["$15,000 per year", "Study in regional Australia", "Unique cultural experience", "Lower cost of living", "Available at regional institutions"],
        url: "https://www.education.gov.au/destination-australia",
      },
    ],
  },

  /* ─────────────────────────────────────
     NETHERLANDS
     ───────────────────────────────────── */
  "netherlands": {
    flag: "🇳🇱",
    name: "Netherlands",
    heroImage: "https://images.unsplash.com/photo-1534351590666-13e3e96b5017?w=1600&q=80",
    scholarshipCount: "180+",
    description: "The Netherlands boasts some of Europe's oldest and most innovative universities. With the majority of master's programmes taught in English and generous scholarship options, it's an increasingly popular destination for international students.",
    scholarships: [
      {
        id: 1, name: "Holland Scholarship", funding: "Partially Funded", deadline: "Feb 2026",
        amount: "€5,000 one-time", fields: ["All Fields"], level: "Bachelors / Masters",
        tag: "National", color: "#FF6600",
        overview: "The Holland Scholarship is a scholarship for international students from outside the European Economic Area (EEA) who want to do their bachelor's or master's at a participating Dutch research university or university of applied sciences. The scholarship is financed by the Dutch Ministry of Education, Culture and Science.",
        highlights: ["€5,000 one-time grant", "Open to non-EEA students", "Multiple participating universities", "First year of study", "Merit-based selection"],
        url: "https://www.studyinholland.nl/finances/scholarships/holland-scholarship",
      },
      {
        id: 2, name: "Orange Knowledge Programme", funding: "Fully Funded", deadline: "Varies",
        amount: "Full tuition + living + travel", fields: ["Development Focus"], level: "Masters / Short Course",
        tag: "Government", color: "#FF8C00",
        overview: "The Orange Knowledge Programme (OKP) is funded by the Dutch Ministry of Foreign Affairs and offers scholarships for mid-career professionals from a selected list of countries. The programme aims to contribute to sustainable and inclusive development by strengthening organisations in these countries through education and training.",
        highlights: ["Full tuition fees", "Monthly living allowance", "International travel costs", "Visa and insurance covered", "Targeted at developing countries"],
        url: "https://www.nuffic.nl/en/subjects/orange-knowledge-programme",
      },
      {
        id: 3, name: "Erasmus University Scholarship (EUR)", funding: "Partially Funded", deadline: "Nov 2025",
        amount: "€5,000 – €20,000/year", fields: ["All Fields"], level: "Masters",
        tag: "University", color: "#1B3A5C",
        overview: "Erasmus University Rotterdam offers scholarships to talented non-EEA students who have been admitted to one of its master's programmes. The Erasmus University Scholarship Programme (EUSP) awards range from partial tuition waivers to near-full funding, depending on the programme and the applicant's profile.",
        highlights: ["Up to €20,000 tuition waiver", "Merit-based selection", "Multiple programmes eligible", "Located in Rotterdam", "High employability outcomes"],
        url: "https://www.eur.nl/en/education/practical-matters/scholarships-finance/scholarships",
      },
      {
        id: 4, name: "University of Amsterdam Excellence Scholarships", funding: "Fully Funded", deadline: "Jan 2026",
        amount: "Full tuition + €1,000/mo stipend", fields: ["All Fields"], level: "Masters",
        tag: "Excellence", color: "#690B1B",
        overview: "The Amsterdam Excellence Scholarship (AES) is a full scholarship for exceptionally talented students from outside the EU/EEA. The scholarship covers tuition fees and provides a monthly stipend for living costs. It is one of the most competitive and generous university scholarships in the Netherlands.",
        highlights: ["Full tuition fee waiver", "€1,000 monthly living stipend", "Open to non-EU/EEA students", "All master's programmes eligible", "Highly competitive selection"],
        url: "https://www.uva.nl/en/education/master-s/scholarships-and-funding/amsterdam-excellence-scholarship/amsterdam-excellence-scholarship.html",
      },
    ],
  },

  /* ─────────────────────────────────────
     SWEDEN
     ───────────────────────────────────── */
  "sweden": {
    flag: "🇸🇪",
    name: "Sweden",
    heroImage: "https://images.unsplash.com/photo-1509356843151-3e7d96241e11?w=1600&q=80",
    scholarshipCount: "150+",
    description: "Sweden is a global leader in innovation and sustainability, with prestigious universities offering world-class education. The Swedish Institute and individual universities provide generous scholarships for students from around the world.",
    scholarships: [
      {
        id: 1, name: "Swedish Institute Scholarships (SISS)", funding: "Fully Funded", deadline: "Feb 2026",
        amount: "Full tuition + SEK 10,000/mo", fields: ["All Fields"], level: "Masters",
        tag: "Government", color: "#005BAA",
        overview: "The Swedish Institute Scholarships for Global Professionals (SISGP) are aimed at highly qualified students from eligible countries who wish to pursue a master's degree in Sweden. The scholarships cover tuition fees, living expenses, travel grants, and insurance. The programme targets future leaders committed to the UN Sustainable Development Goals.",
        highlights: ["Full tuition fees covered", "Living allowance of SEK 10,000/month", "Travel grant", "Insurance coverage", "Networking with SI network"],
        url: "https://si.se/en/apply/scholarships/swedish-institute-scholarships-for-global-professionals/",
      },
      {
        id: 2, name: "KTH Royal Institute Scholarships", funding: "Partially Funded", deadline: "Jan 2026",
        amount: "Full or partial tuition waiver", fields: ["Engineering", "Technology", "Science"], level: "Masters",
        tag: "University", color: "#1B3A5C",
        overview: "KTH Royal Institute of Technology in Stockholm offers a number of scholarships to fee-paying international students admitted to master's programmes. Scholarships range from partial to full tuition fee waivers and are awarded based on academic excellence. KTH is one of Europe's leading technical universities.",
        highlights: ["Up to 100% tuition fee waiver", "For non-EU/EEA students", "Engineering & technology focus", "Based on academic merit", "Located in Stockholm"],
        url: "https://www.kth.se/en/studies/fees-and-scholarships",
      },
      {
        id: 3, name: "Lund University Global Scholarship", funding: "Partially Funded", deadline: "Jan 2026",
        amount: "25% – 100% tuition reduction", fields: ["All Fields"], level: "Masters",
        tag: "University", color: "#2D5016",
        overview: "Lund University, one of Scandinavia's largest and most prestigious institutions, offers the Lund University Global Scholarship Programme to academically gifted students from countries outside the EU/EEA. The scholarships offer a reduction of 25%, 50%, 75%, or 100% of the tuition fee.",
        highlights: ["Up to 100% tuition reduction", "One of Sweden's top universities", "Multiple awards available", "All master's programmes eligible", "Scenic campus in southern Sweden"],
        url: "https://www.lunduniversity.lu.se/admissions/scholarships-and-awards/lund-university-global-scholarship",
      },
      {
        id: 4, name: "Uppsala University IPK Scholarships", funding: "Fully Funded", deadline: "Jan 2026",
        amount: "Full tuition fee waiver", fields: ["All Fields"], level: "Masters",
        tag: "University", color: "#690B1B",
        overview: "Uppsala University offers tuition fee waivers to a select number of outstanding non-EU/EEA students admitted to master's programmes. Uppsala is the oldest university in the Nordic countries, founded in 1477, and is consistently ranked among the world's top universities.",
        highlights: ["Full tuition fee waiver", "Oldest Nordic university", "All master's programmes", "Merit-based selection", "Strong research environment"],
        url: "https://www.uu.se/en/admissions/scholarships/uppsala-university-scholarships/",
      },
    ],
  },

  /* ─────────────────────────────────────
     JAPAN
     ───────────────────────────────────── */
  "japan": {
    flag: "🇯🇵",
    name: "Japan",
    heroImage: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=1600&q=80",
    scholarshipCount: "130+",
    description: "Japan combines cutting-edge technology with rich cultural heritage. The Japanese government's MEXT scholarship is one of the most comprehensive programmes worldwide, and individual universities offer additional funding for international students.",
    scholarships: [
      {
        id: 1, name: "MEXT Scholarship", funding: "Fully Funded", deadline: "Apr 2026",
        amount: "¥143,000 – ¥148,000/month + tuition", fields: ["All Fields"], level: "Bachelors / Masters / PhD",
        tag: "Government", color: "#BC002D",
        overview: "The MEXT (Ministry of Education, Culture, Sports, Science and Technology) Scholarship is the Japanese government's premier scholarship programme for international students. It provides full tuition coverage, a generous monthly stipend, and round-trip airfare. MEXT scholars study at some of Japan's finest universities and receive Japanese language training.",
        highlights: ["Full tuition exemption", "Monthly stipend of ¥143,000–¥148,000", "Round-trip airfare", "Japanese language preparatory education", "No age limit for research students"],
        url: "https://www.mext.go.jp/en/policy/education/highered/title02/detail02/sdetail02/1373897.htm",
      },
      {
        id: 2, name: "JASSO Scholarship", funding: "Partially Funded", deadline: "Varies",
        amount: "¥48,000 – ¥80,000/month", fields: ["All Fields"], level: "Bachelors / Masters / PhD",
        tag: "National", color: "#1B3A5C",
        overview: "The Japan Student Services Organization (JASSO) provides scholarships to privately financed international students studying at Japanese universities. The Monbukagakusho Honors Scholarship for Privately Financed International Students provides monthly stipends to students with excellent academic performance.",
        highlights: ["Monthly stipend of ¥48,000–¥80,000", "For privately funded students", "Based on academic performance", "Available at most universities", "Can combine with tuition reduction"],
        url: "https://www.jasso.go.jp/en/ryugaku/scholarship/index.html",
      },
      {
        id: 3, name: "University of Tokyo PEAK Fellowship", funding: "Fully Funded", deadline: "Nov 2025",
        amount: "Full tuition + ¥150,000/month", fields: ["Liberal Arts", "Sciences"], level: "Bachelors",
        tag: "Elite", color: "#3D0B69",
        overview: "The University of Tokyo's Programs in English at Komaba (PEAK) offers a unique English-language liberal arts education at Japan's top university. PEAK Fellows receive full tuition waivers and monthly stipends, making it one of the most generous undergraduate programmes in Asia.",
        highlights: ["Full tuition exemption", "Monthly living stipend of ¥150,000", "English-taught programme", "Japan's #1 university", "Housing support available"],
        url: "https://peak.c.u-tokyo.ac.jp/",
      },
      {
        id: 4, name: "ADB-Japan Scholarship Program", funding: "Fully Funded", deadline: "Varies",
        amount: "Full tuition + monthly allowance + travel", fields: ["Development Studies", "Economics", "Management", "Technology"], level: "Masters",
        tag: "Development", color: "#2D5016",
        overview: "The Asian Development Bank–Japan Scholarship Program (ADB-JSP) provides full scholarships for students from ADB developing member countries to pursue postgraduate studies at select universities in Asia and the Pacific. The program aims to build human capital in developing countries.",
        highlights: ["Full tuition and fees", "Monthly subsistence allowance", "Housing allowance", "Book and instructional material allowance", "Economy class air travel"],
        url: "https://www.adb.org/work-with-us/careers/japan-scholarship-program",
      },
      {
        id: 5, name: "JICA Training Programs", funding: "Fully Funded", deadline: "Varies",
        amount: "Full coverage", fields: ["Development", "Infrastructure", "Health"], level: "Short Course / Masters",
        tag: "Technical", color: "#6B3A0A",
        overview: "The Japan International Cooperation Agency (JICA) offers various long-term and short-term training programmes for professionals from developing countries. These programmes cover technical areas such as public health, infrastructure development, and environmental management, and include full funding for participants.",
        highlights: ["Full tuition and living costs", "Travel expenses covered", "Technical training focus", "Practical field experience", "Professional networking"],
        url: "https://www.jica.go.jp/english/our_work/types_of_assistance/tech/",
      },
    ],
  },
};
