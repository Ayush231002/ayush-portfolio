/* Builds AyushJaiswal_CV.docx from portfolio content.
   Run: node .claude/build-cv.js  (from repo root) */
const fs = require('fs');
const path = require('path');
const {
  Document, Packer, Paragraph, TextRun, ExternalHyperlink,
  AlignmentType, LevelFormat, TabStopType, BorderStyle,
} = require(path.join(process.env.APPDATA, 'npm', 'node_modules', 'docx'));

/* ── palette / metrics ── */
const ACCENT = 'C97E1F';   // print-safe amber
const DARK   = '1A1C20';
const GRAY   = '5A5F6A';
const CONTENT = 10206;     // A4 11906 - margins (850×2)

/* ── helpers ── */
const t = (text, opts = {}) => new TextRun({ text, font: 'Arial', size: 20, color: DARK, ...opts });

const link = (text, url, opts = {}) => new ExternalHyperlink({
  children: [t(text, { color: '1155CC', underline: {}, ...opts })],
  link: url,
});

const sectionHead = (label) => new Paragraph({
  spacing: { before: 220, after: 110 },
  keepNext: true,
  border: { bottom: { style: BorderStyle.SINGLE, size: 8, color: ACCENT, space: 2 } },
  children: [t(label.toUpperCase(), { bold: true, size: 21, color: DARK, characterSpacing: 16 })],
});

const roleLine = (title, date) => new Paragraph({
  spacing: { before: 130, after: 20 },
  keepNext: true,
  tabStops: [{ type: TabStopType.RIGHT, position: CONTENT }],
  children: [t(title, { bold: true, size: 21 }), t('\t' + date, { size: 19, color: GRAY })],
});

const orgLine = (org) => new Paragraph({
  spacing: { after: 50 },
  keepNext: true,
  children: [t(org, { italics: true, size: 19, color: ACCENT })],
});

const bullet = (runs) => new Paragraph({
  numbering: { reference: 'cvb', level: 0 },
  spacing: { after: 50, line: 252 },
  children: runs.map(r => typeof r === 'string' ? t(r) : r),
});

const skillRow = (label, items) => new Paragraph({
  spacing: { after: 55, line: 252 },
  children: [t(label + ':  ', { bold: true }), t(items, { color: '33363D' })],
});

const B = (s) => t(s, { bold: true });

/* ── document ── */
const doc = new Document({
  styles: { default: { document: { run: { font: 'Arial', size: 20, color: DARK } } } },
  numbering: {
    config: [{
      reference: 'cvb',
      levels: [{
        level: 0, format: LevelFormat.BULLET, text: '▪', alignment: AlignmentType.LEFT,
        style: { run: { color: ACCENT }, paragraph: { indent: { left: 300, hanging: 180 } } },
      }],
    }],
  },
  sections: [{
    properties: {
      page: {
        size: { width: 11906, height: 16838 }, // A4
        margin: { top: 700, bottom: 700, left: 850, right: 850 },
      },
    },
    children: [

      /* ───── HEADER ───── */
      new Paragraph({
        spacing: { after: 40 },
        children: [t('AYUSH Jaiswal', { bold: true, size: 42, characterSpacing: 20 })],
      }),
      new Paragraph({
        spacing: { after: 90 },
        children: [t('Software Engineer  ·  AI Automation  ·  Data Science  ·  SaaS & Cloud', { size: 21, color: ACCENT, bold: true })],
      }),
      new Paragraph({
        spacing: { after: 40 },
        children: [
          t('Kanpur, India (open to relocate)   |   ', { size: 19, color: GRAY }),
          link('ayushJaiswal121004@gmail.com', 'mailto:ayushJaiswal121004@gmail.com', { size: 19 }),
          t('   |   ', { size: 19, color: GRAY }),
          link('linkedin.com/in/ayushjaiswal2310', 'https://www.linkedin.com/in/ayushjaiswal2310/', { size: 19 }),
        ],
      }),
      new Paragraph({
        spacing: { after: 60 },
        border: { bottom: { style: BorderStyle.SINGLE, size: 4, color: 'D9DBDF', space: 4 } },
        children: [
          link('github.com/Ayush231002', 'https://github.com/Ayush231002', { size: 19 }),
          t('   |   Portfolio: ', { size: 19, color: GRAY }),
          link('ayush231002.github.io/ayush-portfolio', 'https://ayush231002.github.io/ayush-portfolio/', { size: 19 }),
          t('   |   Live product: ', { size: 19, color: GRAY }),
          link('billing.elvoraglobal.in', 'https://billing.elvoraglobal.in/', { size: 19 }),
        ],
      }),

      /* ───── SUMMARY ───── */
      sectionHead('Professional Summary'),
      new Paragraph({
        spacing: { after: 40, line: 256 },
        children: [
          t('Software engineer who designs, builds and operates production systems end-to-end. Shipped a '),
          B('live multi-tenant GST billing SaaS'),
          t(' solo — REST API, three-path authentication, payment subscriptions, cloud deployment with TLS and monitoring — now serving real businesses. Equally strong on the data side: ML pipelines, automated AWS infrastructure and executive Power BI dashboards, plus hands-on experience '),
          B('training students in analytics'),
          t('. Currently pursuing an MSc in Data Science alongside full-time building.'),
        ],
      }),

      /* ───── SKILLS ───── */
      sectionHead('Technical Skills'),
      skillRow('Languages', 'Python, JavaScript (ES6+), SQL'),
      skillRow('Backend & APIs', 'Node.js, Express.js, REST APIs, JWT, OAuth 2.0, PostgreSQL, MongoDB, Razorpay'),
      skillRow('Cloud & DevOps', 'AWS EC2, CloudWatch, NGINX, PM2, Linux, Render, Firebase, TLS/SSL, Git/GitHub'),
      skillRow('Data & BI', 'Power BI, DAX, Power Query, Advanced Excel, Pandas, NumPy, Scikit-learn'),
      skillRow('AI & Automation', 'Claude AI, OpenAI APIs, AI agents, prompt engineering, workflow automation'),
      skillRow('Frontend & Tools', 'React, Tailwind CSS, HTML5/CSS3, Postman, VS Code'),

      /* ───── EXPERIENCE ───── */
      sectionHead('Experience'),

      roleLine('SaaS Developer (Solo Builder) — ELVORA Billing Suite', '2025 – Present'),
      orgLine('Independent product · Live at billing.elvoraglobal.in'),
      bullet([t('Architected and shipped a '), B('multi-tenant GST billing platform'), t(' end-to-end: Node.js / Express 5 REST API, PostgreSQL (25+ tables) with idempotent versioned migrations, deployed to the cloud on a custom domain with TLS.')]),
      bullet([t('Built '), B('three-path authentication'), t(' (password, email OTP, Google OAuth) on JWT access tokens + HttpOnly refresh cookies, with rate limiting, hardened security headers and server-side session tracking.')]),
      bullet([t('Integrated '), B('GST identity verification'), t(' through a multi-provider fallback chain with full checksum validation and response caching; auto-fills verified company profiles at signup.')]),
      bullet([t('Cut signup round-trip from '), B('40+ seconds to ~3 seconds'), t(' by making OTP email dispatch non-blocking with background retry; built atomic signup rollback that eliminated orphaned tenant data in production.')]),
      bullet([t('Implemented '), B('Razorpay subscription billing'), t(' with a 14-day trial engine and self-seeding plan catalog; debugged a Google sign-in popup deadlock to a single Cross-Origin-Opener-Policy header.')]),

      roleLine('Power BI Trainer & Mentor', '2024 – Present'),
      orgLine('Analytics mentorship program'),
      bullet([t('Designed and deliver a '), B('6-module beginner-to-advanced curriculum'), t(' (Excel foundations, Power Query, data modeling, DAX, visual storytelling, capstone); fully project-based on real messy datasets.')]),
      bullet([t('Students have shipped '), B('15+ published dashboards'), t(' across sales, finance, HR and inventory domains.')]),

      roleLine('Power BI Developer (Freelance)', '2024 – Present'),
      orgLine('Project-based engagements'),
      bullet([t('Built financial and sales dashboards on governed SQL models with centralized DAX measure libraries and row-level security; cut manual reporting effort by '), B('~60%'), t(' and a month-end cycle from '), B('3 days to 2 hours'), t('.')]),

      roleLine('Cloud Data Engineer (Self-Directed)', '2024'),
      orgLine('AWS infrastructure projects'),
      bullet([t('Migrated fragile local ETL to '), B('AWS EC2'), t(' with cron scheduling, lock-file overlap protection and CloudWatch alarms — '), B('99% pipeline uptime'), t(' with zero manual runs.')]),

      roleLine('Data Analyst Intern', '2023 – 2024'),
      orgLine('DUCAT Foundation'),
      bullet([t('Delivered end-to-end analytics and ML models across classification and regression tasks using Python and Pandas.')]),

      /* ───── PROJECTS ───── */
      sectionHead('Selected Projects'),

      roleLine('SENTINEL — Device Intelligence & Session Security', 'Security tooling'),
      bullet([t('Defensive monitoring dashboard: '), B('device fingerprinting'), t(' (12+ browser/hardware signals), IP and geolocation enrichment, session registry with admin revocation, and deterministic new-device / new-location login alerts.')]),

      roleLine('Customer Churn Prediction', 'Machine learning'),
      bullet([t('Random Forest with SMOTE on '), B('10K+ customer records'), t('; '), B('87% accuracy'), t(' tuned for recall via precision-recall curves; distilled 5 plain-language churn drivers for leadership action.')]),

      roleLine('Financial Performance Analytics', 'Business intelligence'),
      bullet([t('Replaced a 3-day manual month-end Excel process with a governed Power BI model — '), B('automated refresh'), t(', row-level security and 3-level drill-through from executive summary to transaction detail.')]),

      /* ───── EDUCATION ───── */
      sectionHead('Education'),
      roleLine('MSc, Data Science (Online Mode)', '2024 – 2026 (pursuing)'),
      orgLine('Chandigarh University'),
      bullet([t('Specialization in applied machine learning, statistical modeling and big-data analytics.')]),
      roleLine('BCA, Computer Applications', '2020 – 2023'),
      orgLine('CSJM University, Kanpur'),
      bullet([t('Data structures, databases, algorithms and software engineering with applied data-science modules.')]),

      /* ───── CERTIFICATIONS ───── */
      sectionHead('Certifications'),
      bullet([B('AWS Cloud Practitioner'), t(' — Amazon Web Services, 2024')]),
      bullet([B('Power BI Data Analyst'), t(' — Microsoft, 2023')]),
      bullet([B('Data Science with Python'), t(' — YBI Foundation, 2023')]),
      bullet([B('Python for Data Analysis'), t(' — Coursera, 2023')]),
    ],
  }],
});

Packer.toBuffer(doc).then(buf => {
  fs.writeFileSync(path.join(__dirname, '..', 'AyushJaiswal_CV.docx'), buf);
  console.log('OK: AyushJaiswal_CV.docx written');
});
