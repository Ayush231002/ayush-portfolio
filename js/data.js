/* ════════════════════════════════════════════════════════════
   data.js — all portfolio content (projects, case studies, skills)
   Edit copy & numbers here — no markup knowledge needed.
   ════════════════════════════════════════════════════════════ */

const PROJECTS = [

/* ━━━━━━━━━━━━━━ 01 · ELVORA BILLING SUITE (FLAGSHIP) ━━━━━━━━━━━━━━ */
{
  id:'elvora',
  num:'01',
  cats:['saas','cloud'],
  accent:'gold',
  hero:true,
  badge:'Flagship SaaS · Live Product',
  live:'https://billing.elvoraglobal.in/',
  name:'ELVORA Billing Suite',
  tag:'A production GST-compliant, multi-tenant billing & business management platform — invoicing, clients, vendors, inventory, expenses and subscriptions in one secure cloud workspace.',
  visual:'dash',
  tech:['Node.js','Express 5','PostgreSQL','JWT Auth','Razorpay','Google OAuth','GST APIs','Render'],
  stats:[{b:'25+',i:'DB Tables'},{b:'3',i:'Auth Methods'},{b:'LIVE',i:'In Production'}],
  meta:[
    {l:'Role',v:'Solo Full-Stack Engineer'},
    {l:'Type',v:'B2B SaaS · ERP'},
    {l:'Status',v:'Live in Production'},
    {l:'Deployment',v:'Cloud · Custom Domain'},
  ],
  pills:[{t:'Live Production',c:'teal'},{t:'Multi-Tenant SaaS',c:'gold'},{t:'GST Compliant',c:'cyan'},{t:'Payment-Ready',c:'violet'}],
  metrics:[
    {v:'25+',l:'Database Tables'},
    {v:'3',l:'Auth Methods'},
    {v:'~3s',l:'Signup Round-Trip'},
    {v:'14d',l:'Free Trial Engine'},
    {v:'4',l:'GST Providers'},
  ],
  blocks:[
    {t:'text',h:'Problem Statement',ps:[
      'Small and mid-size Indian businesses juggle GST-compliant invoicing, client ledgers, inventory, expenses and team access across spreadsheets and disconnected tools. Compliance errors are easy, visibility is poor, and nothing scales past one person.',
      'ELVORA was built as a single cloud workspace: <strong>sign up, verify your business identity (GST / PAN / Aadhaar), and start raising compliant invoices in minutes</strong> — with the platform handling tax logic, document numbering, and team permissions behind the scenes.'
    ]},
    {t:'text',h:'Business Use Case',ps:[
      'The platform targets the operational core of a trading or services business: raise GST invoices, track receivables by client, manage vendors and product catalogs, record expenses by branch, and monitor everything from a single dashboard. A subscription engine (free trial → paid plans via Razorpay) makes it a true commercial SaaS, not a demo.'
    ]},
    {t:'arch',h:'System Architecture',layers:[
      {name:'Client Layer',items:['Multi-page HTML/JS app','Auth & onboarding flows','Invoice builder UI','Dashboard & reports'],note:'Lightweight vanilla front end with a build step that bundles JS to dist/ — fast first paint, no framework overhead.'},
      {name:'Edge & Security',items:['Helmet security headers','CORS policy','Rate limiting','HttpOnly cookies'],note:'Hardened HTTP layer including a tuned Cross-Origin-Opener-Policy so Google Identity Services popups work without weakening isolation.'},
      {name:'API Layer',items:['Node.js + Express 5','REST endpoints','JWT middleware','Input validation'],note:'Modular route files per domain (auth, invoices, clients, onboarding, billing) with shared auth middleware.'},
      {name:'Service Layer',items:['GST provider manager','Email provider abstraction','Identity verification','Subscription engine'],note:'Pluggable providers: GST lookups fall back across 4 providers; email switches between SMTP, Brevo and Resend by config.'},
      {name:'Data Layer',items:['PostgreSQL (raw SQL)','Versioned migrations','gst_cache','Session store'],note:'No ORM — hand-written parameterised SQL. Idempotent startup migrations stamped in a schema_migrations table.'},
    ]},
    {t:'steps',h:'Core Workflow — From Signup to Invoice',steps:[
      {tt:'Account creation',d:'Email + password signup with an inline identity selector (GST / PAN / Aadhaar). A GSTIN triggers a silent, debounced auto-fetch that pre-fills the company profile.'},
      {tt:'OTP verification',d:'A one-time code is generated and emailed in the background (non-blocking) — the API responds in ~3 seconds instead of waiting on SMTP.'},
      {tt:'Workspace bootstrap',d:'On verification the platform creates the company record, applies verified GST identity, seeds the plan catalog and starts a 14-day full-feature trial — the user lands directly on the dashboard.'},
      {tt:'Business operations',d:'Clients, vendors, products, branches and expenses are managed per-workspace. Every row is scoped by owner, so team members share one tenant safely.'},
      {tt:'GST invoicing',d:'Invoices compute tax breakdowns and stay compliant with the verified business identity; documents are tied to the company profile fetched at signup.'},
      {tt:'Subscription lifecycle',d:'Trial countdown surfaces in the dashboard; Razorpay integration handles plan upgrades when the trial ends.'},
    ]},
    {t:'grid',h:'Product Modules',items:[
      {ic:'🧾',tt:'GST Invoice Engine',d:'Compliant invoice generation with tax logic, client linkage and document history.'},
      {ic:'👥',tt:'Client & Vendor CRM',d:'Ledger-style records for every counterparty, scoped per workspace.'},
      {ic:'📦',tt:'Product Catalog',d:'Reusable line items with pricing for fast invoice composition.'},
      {ic:'🏢',tt:'Branch Management',d:'Multi-branch businesses track operations and expenses per location.'},
      {ic:'💸',tt:'Expense Tracking',d:'Categorised spend recording feeding the dashboard analytics.'},
      {ic:'📊',tt:'Analytics Dashboard',d:'Revenue, receivables and activity at a glance, with trial status surfaced.'},
      {ic:'🔐',tt:'Team & Roles',d:'Owner-scoped multi-tenancy: members join a workspace under the owner\'s tenant.'},
      {ic:'💳',tt:'Subscription Billing',d:'Plan catalog, 14-day trial and Razorpay-powered upgrades.'},
    ]},
    {t:'list',h:'Security Engineering',items:[
      '<b>Three authentication paths</b> — email + password (2FA-aware), email OTP, and Google OAuth via Google Identity Services — all converging on one session model.',
      '<b>JWT access tokens + HttpOnly refresh cookies</b> so tokens never sit in localStorage; sessions tracked server-side in an auth_sessions table.',
      '<b>bcrypt password hashing</b>, rate-limited auth endpoints, and full GSTIN checksum validation (not just regex) before any identity is accepted.',
      '<b>Helmet security headers</b> with a deliberately scoped Cross-Origin-Opener-Policy — debugged a real-world GIS popup deadlock down to a single COOP header.',
      '<b>Transactional rollback on failed signups</b> — orphaned users, companies, subscriptions and branches are cleaned up atomically, keeping the tenant store consistent.',
    ]},
    {t:'stack',h:'Tech Stack',groups:[
      {g:'Backend',items:['Node.js','Express 5','REST API','JWT','bcryptjs']},
      {g:'Database',items:['PostgreSQL','Raw parameterised SQL','Versioned migrations','Query-level caching']},
      {g:'Integrations',items:['Razorpay','Google Identity Services','GST verification APIs','Firebase Admin']},
      {g:'Email Infra',items:['Nodemailer / SMTP','Brevo','Resend','Background OTP dispatch']},
      {g:'Frontend',items:['HTML5','Vanilla JS modules','Build-to-dist pipeline','Responsive CSS']},
      {g:'DevOps',items:['Render cloud hosting','Custom domain + TLS','Env-driven config','Startup auto-migrations']},
    ]},
    {t:'apis',h:'API Surface (Sample)',apis:[
      {m:'POST',p:'/api/auth/signup',d:'Create account + dispatch OTP'},
      {m:'POST',p:'/api/auth/verify-signup-otp',d:'Verify code → issue session'},
      {m:'POST',p:'/api/auth/google',d:'Google credential sign-in'},
      {m:'GET',p:'/api/auth/gst-preview',d:'Checksum-validated GSTIN lookup'},
      {m:'POST',p:'/api/invoices',d:'Create GST invoice'},
      {m:'GET',p:'/api/clients',d:'Workspace-scoped client list'},
      {m:'PUT',p:'/api/company',d:'Update business profile'},
      {m:'POST',p:'/api/billing/subscribe',d:'Razorpay plan upgrade'},
    ]},
    {t:'pairs',h:'Engineering Challenges Solved',pairs:[
      {c:'Google sign-in froze after account selection — the popup hung on accounts.google.com and the callback never fired.',s:'Traced it to helmet\'s default <b>Cross-Origin-Opener-Policy severing window.opener</b>. One header change (same-origin-allow-popups), verified with live header inspection — no auth logic touched.'},
      {c:'GST auto-fill silently failed: public lookup endpoints were dead, and the retry chain could block signup for up to 54 seconds.',s:'Rewrote the provider manager — <b>keyed provider with a 4.5s timeout, zero retries, cache-first reads</b>, and a preview endpoint that warms the cache so final verification is instant.'},
      {c:'Signup could hang 40+ seconds when the SMTP server was slow, killing conversion.',s:'Made email <b>fully non-blocking</b>: the API stores the OTP and responds immediately while delivery happens in the background with retry + backoff. Signup dropped to ~3 seconds.'},
      {c:'Failed signups leaked orphan workspaces (users, companies, subscriptions) into production data.',s:'Built an atomic <b>rollbackSignup()</b> that unwinds every related record; cleaned existing orphans from the production database.'},
    ]},
    {t:'list',h:'Automation & Reliability',items:[
      '<b>Self-migrating database</b> — idempotent schema setup runs at every startup and stamps versions into schema_migrations, so deploys never need manual SQL.',
      '<b>Plan catalog auto-seeding</b> — missing subscription plans are recreated automatically at boot.',
      '<b>Provider fallback chains</b> for GST and email keep user-facing flows alive even when a third-party API goes down.',
      '<b>gst_cache table</b> deduplicates external lookups — repeat verifications are served instantly and for free.',
    ]},
    {t:'shots',h:'Product Screens',shots:[
      {cap:'auth.html — multi-method sign-in with GST identity capture'},
      {cap:'Dashboard — revenue, receivables & trial status'},
      {cap:'Invoice builder — GST line items & tax breakdown'},
      {cap:'Clients module — workspace-scoped ledgers'},
    ]},
    {t:'road',h:'Roadmap',items:[
      'E-invoicing (IRN) and e-way bill generation directly from the invoice screen.',
      'Automated payment reminders and receivables ageing reports.',
      'AI assistant for natural-language queries over business data ("show unpaid invoices over 30 days").',
      'White-label theming so the platform can be resold to accountants and agencies.',
      'Export pipelines to Tally and accounting formats for CA workflows.',
    ]},
  ],
},

/* ━━━━━━━━━━━━━━ 02 · SENTINEL DEVICE INTELLIGENCE ━━━━━━━━━━━━━━ */
{
  id:'sentinel',
  num:'02',
  cats:['security'],
  accent:'cyan',
  badge:'Security Engineering',
  name:'SENTINEL — Device Intelligence',
  tag:'A defensive security dashboard that fingerprints devices, resolves IP geolocation, registers sessions and raises login alerts — the visibility layer every account system needs.',
  visual:'term',
  tech:['JavaScript','Fingerprinting','IP Intelligence','Geolocation API','Session Registry','UA Parsing'],
  stats:[{b:'12+',i:'Signals Captured'},{b:'<1s',i:'Detection Time'},{b:'24/7',i:'Monitoring Model'}],
  meta:[
    {l:'Role',v:'Designer & Developer'},
    {l:'Type',v:'Security Tooling'},
    {l:'Focus',v:'Defensive Monitoring'},
    {l:'Surface',v:'Web Sessions'},
  ],
  pills:[{t:'Cyber-Defense',c:'cyan'},{t:'Real-Time Signals',c:'teal'},{t:'Privacy-Aware',c:'violet'}],
  metrics:[
    {v:'12+',l:'Device Signals'},
    {v:'<1s',l:'Fingerprint Time'},
    {v:'4',l:'Alert Categories'},
    {v:'100%',l:'Client-Side Capture'},
  ],
  blocks:[
    {t:'text',h:'Problem Statement',ps:[
      'Most login systems are blind: they know a password matched, but not <strong>which device</strong>, <strong>from where</strong>, or <strong>whether this session looks like the user at all</strong>. Account takeover is usually visible in the signals — if anyone is collecting them.',
      'SENTINEL is a monitoring layer that captures device identity at the moment of authentication and turns it into a security timeline an admin can actually read.'
    ]},
    {t:'text',h:'Business Use Case',ps:[
      'Any product with user accounts — a SaaS platform, an internal tool, a billing system — gains an audit trail of who signed in, on what hardware, from which network and region. New-device and new-location events become alerts instead of silent risks, and support teams can answer "was this really you?" with evidence.'
    ]},
    {t:'grid',h:'Signal Capture Matrix',items:[
      {ic:'🌐',tt:'IP Detection',d:'Public IP resolution with ASN / ISP context for network-level identity.'},
      {ic:'📍',tt:'Geolocation Logic',d:'IP-based region resolution to flag impossible-travel and new-location logins.'},
      {ic:'🖥️',tt:'OS & Platform',d:'Operating system, version and architecture parsed from the user-agent and client hints.'},
      {ic:'🧭',tt:'Browser Profile',d:'Engine, version, language, and timezone — mismatches expose spoofing.'},
      {ic:'🆔',tt:'Device Fingerprint',d:'Composite hash from screen metrics, hardware concurrency, touch support and rendering entropy.'},
      {ic:'🔋',tt:'Hardware Hints',d:'Memory class, CPU cores, display density — stable traits that survive cookie clearing.'},
      {ic:'🔔',tt:'Login Alerts',d:'New device, new region, concurrent session and rapid-retry events raise flags.'},
      {ic:'🗂️',tt:'Session Registry',d:'Every active session listed with device, location and last-seen — revocable by an admin.'},
    ]},
    {t:'arch',h:'Monitoring Architecture',layers:[
      {name:'Capture',items:['Fingerprint script','UA & client hints','Screen / hardware probes'],note:'Runs at login in under a second; produces a stable composite device ID.'},
      {name:'Enrichment',items:['IP intelligence lookup','Geo resolution','Session correlation'],note:'Raw signals are joined into a device profile and compared against the user\'s history.'},
      {name:'Decision',items:['New-device rules','Location-change rules','Concurrency checks'],note:'Deterministic rules first — explainable alerts beat opaque scores for an admin audience.'},
      {name:'Surface',items:['Admin dashboard','Live session table','Alert timeline'],note:'Terminal-inspired UI: every event is a readable line, every session is one row.'},
    ]},
    {t:'steps',h:'Detection Workflow',steps:[
      {tt:'Authentication event',d:'A login triggers the capture script alongside the normal credential flow.'},
      {tt:'Fingerprint assembly',d:'A dozen browser and hardware signals are normalised and hashed into a device identity.'},
      {tt:'History comparison',d:'The fingerprint and resolved location are checked against the account\'s known devices.'},
      {tt:'Alert or admit',d:'A match extends the session quietly; a mismatch writes an alert and can require re-verification.'},
      {tt:'Admin visibility',d:'The monitoring dashboard streams events with severity colours and per-session revocation.'},
    ]},
    {t:'list',h:'Security & Privacy Posture',items:[
      '<b>Defensive by design</b> — built to protect account owners and give admins visibility, not to track users across sites.',
      '<b>Signals are hashed</b> into composite identifiers rather than stored as raw hardware data.',
      '<b>Deterministic, explainable rules</b> — every alert states exactly which signal changed.',
      '<b>Session revocation</b> closes the loop: detection without response is just logging.',
    ]},
    {t:'pairs',h:'Challenges Solved',pairs:[
      {c:'User-agent strings are unreliable and increasingly frozen by browsers, making naive parsing wrong.',s:'Blended <b>UA parsing with client hints and hardware probes</b>, so the composite fingerprint stays stable even as individual signals degrade.'},
      {c:'IP geolocation produces false "new location" alerts for mobile carriers and VPN users.',s:'Alerts use <b>region-level granularity plus device-match context</b> — a known device in a new city is informational; an unknown device is a flag.'},
    ]},
    {t:'shots',h:'Interface Screens',shots:[
      {cap:'Live monitor — streaming session events'},
      {cap:'Device profile — fingerprint breakdown'},
      {cap:'Alert timeline — severity-coded events'},
      {cap:'Session table — revoke & inspect'},
    ]},
    {t:'road',h:'Roadmap',items:[
      'Risk scoring layered on top of the deterministic rules (velocity, time-of-day patterns).',
      'WebAuthn step-up: a flagged session can be challenged with a hardware key or passkey.',
      'Webhook outputs so alerts feed Slack / email / SIEM pipelines.',
      'Integration into ELVORA Billing as its account-security layer.',
    ]},
  ],
},

/* ━━━━━━━━━━━━━━ 03 · POWER BI TRAINING & MENTORSHIP ━━━━━━━━━━━━━━ */
{
  id:'powerbi',
  num:'03',
  cats:['analytics'],
  accent:'violet',
  badge:'Education · Analytics',
  name:'Power BI Training & Mentorship',
  tag:'Designed and delivered a beginner-to-advanced Power BI program — taking students from raw Excel files to publishing interactive, DAX-driven business dashboards.',
  visual:'bi',
  tech:['Power BI','DAX','Power Query','Data Modeling','Excel','Business Intelligence'],
  stats:[{b:'6',i:'Curriculum Modules'},{b:'15+',i:'Dashboards Built'},{b:'B→A',i:'Beginner to Advanced'}],
  meta:[
    {l:'Role',v:'Trainer & Mentor'},
    {l:'Type',v:'Analytics Education'},
    {l:'Format',v:'Hands-On Projects'},
    {l:'Level',v:'Beginner → Advanced'},
  ],
  pills:[{t:'Mentorship',c:'violet'},{t:'Hands-On BI',c:'gold'},{t:'Project-Based',c:'teal'}],
  metrics:[
    {v:'6',l:'Modules Designed'},
    {v:'15+',l:'Dashboards Shipped'},
    {v:'100%',l:'Project-Based'},
    {v:'2',l:'Tracks (Biz + Tech)'},
  ],
  blocks:[
    {t:'text',h:'Why Teaching Is on My Project List',ps:[
      'Explaining a star schema to someone who opened Power BI yesterday is harder than building one. Designing this program forced me to <strong>decompose the entire BI workflow</strong> — ingestion, cleaning, modeling, DAX, storytelling — into steps a beginner can climb, and it sharpened every dashboard I build myself.',
      'The program is fully project-based: every student finishes with portfolio-grade dashboards built on real, messy datasets — not slide knowledge.'
    ]},
    {t:'steps',h:'Student Learning Flow',steps:[
      {tt:'Data foundations',d:'Excel fluency, data types, and what "clean data" actually means — fixing real messy exports.'},
      {tt:'Power Query mastery',d:'ETL inside Power BI: merges, appends, unpivots, parameterised queries and refresh-safe transformations.'},
      {tt:'Data modeling',d:'Star schemas, relationships, cardinality and why a flat table eventually breaks every report.'},
      {tt:'DAX from zero',d:'Calculated columns vs measures, CALCULATE, filter context, time intelligence — taught through business questions, not syntax.'},
      {tt:'Visual storytelling',d:'KPI design, drill-throughs, bookmarks, and dashboard layouts an executive can read in ten seconds.'},
      {tt:'Capstone & publishing',d:'Each student ships an end-to-end dashboard — modelled, measured, designed and published.'},
    ]},
    {t:'grid',h:'Dashboards Built in the Program',items:[
      {ic:'💰',tt:'Sales Performance',d:'Regional revenue, YoY growth and product mix with drill-down hierarchies.'},
      {ic:'📈',tt:'Financial KPIs',d:'Margin, variance and trend analysis with time-intelligence DAX.'},
      {ic:'👥',tt:'HR Analytics',d:'Headcount, attrition and hiring-funnel reporting.'},
      {ic:'📦',tt:'Inventory Health',d:'Stock ageing, reorder flags and supplier performance views.'},
      {ic:'🛒',tt:'E-Commerce Funnel',d:'Orders, returns and customer-cohort behaviour.'},
      {ic:'🎯',tt:'Executive Scorecard',d:'One-page company pulse combining every domain above.'},
    ]},
    {t:'list',h:'What Students Leave With',items:[
      '<b>A published portfolio</b> of interactive dashboards on real datasets.',
      '<b>DAX fluency</b> — measures, filter context and time intelligence applied to business questions.',
      '<b>ETL discipline</b> — Power Query habits that survive refresh schedules and schema drift.',
      '<b>Data-storytelling instincts</b> — knowing what an executive needs to see first.',
    ]},
    {t:'pairs',h:'Teaching Challenges Solved',pairs:[
      {c:'Beginners memorise DAX syntax but freeze the moment a real business question appears.',s:'Inverted the curriculum: <b>every concept enters through a question</b> ("why did margin drop in Q3?") and the formula is discovered as the answer.'},
      {c:'Students built beautiful dashboards on pre-cleaned CSVs, then collapsed on real exports.',s:'Switched all coursework to <b>deliberately messy data</b> — merged headers, mixed types, duplicates — so Power Query skills are forged on reality.'},
    ]},
    {t:'shots',h:'Program Artifacts',shots:[
      {cap:'Curriculum map — 6-module progression'},
      {cap:'Student capstone — sales dashboard'},
      {cap:'DAX workbook — measure library'},
      {cap:'Live session — data-modeling walkthrough'},
    ]},
    {t:'road',h:'Roadmap',items:[
      'Recorded micro-course version of the curriculum for self-paced learners.',
      'Advanced track: dataflows, incremental refresh and deployment pipelines.',
      'Public template gallery of the program\'s dashboard patterns.',
    ]},
  ],
},

/* ━━━━━━━━━━━━━━ 04 · CHURN PREDICTION (AI/ML) ━━━━━━━━━━━━━━ */
{
  id:'churn',
  num:'04',
  cats:['ai','analytics'],
  accent:'teal',
  badge:'Machine Learning',
  name:'Customer Churn Prediction',
  tag:'An ML early-warning system that flags at-risk customers before they leave — Random Forest on engineered behavioural features, tuned for recall where it counts.',
  visual:'ml',
  tech:['Python','Scikit-learn','Pandas','SMOTE','Random Forest','SQL'],
  stats:[{b:'87%',i:'Accuracy'},{b:'10K+',i:'Records'},{b:'5',i:'Churn Drivers'}],
  meta:[
    {l:'Role',v:'ML Engineer & Analyst'},
    {l:'Type',v:'Predictive Modeling'},
    {l:'Dataset',v:'10K+ Customer Records'},
    {l:'Output',v:'Risk-Scored Customers'},
  ],
  pills:[{t:'AI / ML',c:'teal'},{t:'Predictive',c:'cyan'},{t:'Explainable',c:'gold'}],
  metrics:[
    {v:'87%',l:'Model Accuracy'},
    {v:'10K+',l:'Records Analysed'},
    {v:'5',l:'Drivers Identified'},
    {v:'5×',l:'Cheaper than Acquisition'},
  ],
  blocks:[
    {t:'text',h:'Problem Statement',ps:[
      'A 27% monthly churn rate with zero early warning. Since retaining a customer costs roughly five times less than acquiring one, every silent departure was the most expensive kind of loss — preventable in hindsight, invisible in advance.'
    ]},
    {t:'steps',h:'ML Pipeline',steps:[
      {tt:'Exploratory analysis',d:'Deep EDA across 10K+ customer records: distributions, correlations, leakage checks and cohort patterns.'},
      {tt:'Feature engineering',d:'Behavioural features — usage decay, support-ticket cadence, tenure buckets, payment friction — engineered from raw event data.'},
      {tt:'Class imbalance',d:'Churners were a minority class; applied SMOTE oversampling so the model learns the pattern instead of the prior.'},
      {tt:'Model & tuning',d:'Random Forest selected after benchmarking; tuned via cross-validated grid search on precision-recall, not raw accuracy.'},
      {tt:'Evaluation for the business',d:'Optimised for recall on churners — a missed churner costs more than a false alarm — and validated with PR curves.'},
      {tt:'Driver extraction',d:'Feature importances distilled into 5 plain-language churn drivers leadership could act on immediately.'},
    ]},
    {t:'list',h:'AI Usage & Explainability',items:[
      '<b>Supervised classification</b> (Random Forest) chosen over black-box alternatives for inspectable feature importances.',
      '<b>Precision-recall trade-off</b> set deliberately: the model errs toward flagging, because retention outreach is cheap and churn is not.',
      '<b>Risk scores, not verdicts</b> — output ranks customers for human follow-up rather than automating decisions.',
    ]},
    {t:'pairs',h:'Challenges Solved',pairs:[
      {c:'Raw accuracy looked great early — because the model just predicted "no churn" for everyone.',s:'Rebuilt evaluation around <b>PR curves + SMOTE</b>; reported recall on the minority class as the headline metric.'},
      {c:'Several candidate features leaked future information and inflated validation scores.',s:'Audited every feature against the prediction timestamp and <b>rebuilt the set point-in-time correct</b>.'},
    ]},
    {t:'shots',h:'Artifacts',shots:[
      {cap:'PR curve — threshold selection'},
      {cap:'Feature importance — top churn drivers'},
    ]},
    {t:'road',h:'Roadmap',items:[
      'Gradient-boosted benchmark (XGBoost/LightGBM) with SHAP explanations.',
      'Scheduled scoring pipeline writing risk tiers back to the CRM.',
      'Uplift modeling: predict who is saveable, not just who is leaving.',
    ]},
  ],
},

/* ━━━━━━━━━━━━━━ 05 · AWS DATA PIPELINE ━━━━━━━━━━━━━━ */
{
  id:'pipeline',
  num:'05',
  cats:['cloud'],
  accent:'gold',
  badge:'Cloud Infrastructure',
  name:'AWS Automated Data Pipeline',
  tag:'Migrated fragile local data processing to a self-healing AWS pipeline — cron-scheduled, CloudWatch-monitored, and hands-off at 99% uptime.',
  visual:'cloud',
  tech:['AWS EC2','CloudWatch','Linux','Python','Cron','Bash'],
  stats:[{b:'99%',i:'Uptime'},{b:'0',i:'Manual Runs'},{b:'24/7',i:'Monitored'}],
  meta:[
    {l:'Role',v:'Cloud Data Engineer'},
    {l:'Type',v:'Infrastructure & Automation'},
    {l:'Platform',v:'AWS EC2 + CloudWatch'},
    {l:'Cadence',v:'Scheduled, Unattended'},
  ],
  pills:[{t:'Cloud-Native',c:'gold'},{t:'Self-Healing',c:'teal'},{t:'Observable',c:'cyan'}],
  metrics:[
    {v:'99%',l:'Pipeline Uptime'},
    {v:'0',l:'Manual Interventions'},
    {v:'~0%',l:'Unhandled Errors'},
    {v:'100%',l:'Run Observability'},
  ],
  blocks:[
    {t:'text',h:'Problem Statement',ps:[
      'Reporting depended on scripts running on a local machine: fragile, unscalable and silent in failure. A crashed job meant stale dashboards discovered days later — there were no alerts, no logs worth reading, and no recovery path.'
    ]},
    {t:'arch',h:'Pipeline Architecture',layers:[
      {name:'Compute',items:['AWS EC2 (Linux)','Hardened instance','Python runtime'],note:'Right-sized instance with the pipeline isolated from any personal machine.'},
      {name:'Orchestration',items:['Cron scheduling','Bash wrappers','Lock files'],note:'Deterministic schedules with overlap protection — a slow run can never stack onto the next.'},
      {name:'Processing',items:['Python ETL jobs','Pandas transforms','Structured error handling'],note:'Every stage wrapped in try/except with categorised exit codes for alerting.'},
      {name:'Observability',items:['CloudWatch metrics','Log streams','Failure alarms'],note:'Failures page immediately instead of surfacing as stale reports a week later.'},
    ]},
    {t:'list',h:'Automation Highlights',items:[
      '<b>Zero-touch operation</b> — scheduling, retries and alerting all run unattended.',
      '<b>Categorised failures</b> — transient errors retry with backoff; structural errors alarm immediately.',
      '<b>Idempotent runs</b> — re-execution after a failure cannot duplicate or corrupt output.',
    ]},
    {t:'pairs',h:'Challenges Solved',pairs:[
      {c:'Overlapping cron runs corrupted output when one job ran long.',s:'Added <b>lock-file guards</b> so a running pipeline blocks the next trigger cleanly.'},
      {c:'Failures were invisible until someone noticed stale numbers.',s:'<b>CloudWatch alarms on log patterns and exit codes</b> turned silent failure into an immediate notification.'},
    ]},
    {t:'shots',h:'Artifacts',shots:[
      {cap:'CloudWatch dashboard — run health'},
      {cap:'Pipeline logs — structured stages'},
    ]},
    {t:'road',h:'Roadmap',items:[
      'Containerise jobs and move scheduling to EventBridge.',
      'S3 + Athena landing zone for queryable raw history.',
      'Infrastructure-as-code (Terraform) for reproducible environments.',
    ]},
  ],
},

/* ━━━━━━━━━━━━━━ 06 · FINANCIAL ANALYTICS ━━━━━━━━━━━━━━ */
{
  id:'finance',
  num:'06',
  cats:['analytics'],
  accent:'violet',
  badge:'Business Intelligence',
  name:'Financial Performance Analytics',
  tag:'Replaced a 3-day manual month-end Excel grind with a governed Power BI model — automated refresh, row-level security, and drill-through any executive can drive.',
  visual:'fin',
  tech:['Power BI','DAX','SQL','Row-Level Security','Advanced Excel'],
  stats:[{b:'3d→2h',i:'Reporting Time'},{b:'RLS',i:'Governed Access'},{b:'AUTO',i:'Refresh'}],
  meta:[
    {l:'Role',v:'BI Developer'},
    {l:'Type',v:'Financial Reporting'},
    {l:'Cadence',v:'Automated Monthly'},
    {l:'Audience',v:'Executives & Finance'},
  ],
  pills:[{t:'Enterprise BI',c:'violet'},{t:'Governed',c:'gold'},{t:'Self-Serve',c:'teal'}],
  metrics:[
    {v:'3d→2h',l:'Month-End Cycle'},
    {v:'100%',l:'Refresh Automated'},
    {v:'RLS',l:'Row-Level Security'},
    {v:'3',l:'Drill Levels'},
  ],
  blocks:[
    {t:'text',h:'Problem Statement',ps:[
      'Month-end reporting consumed three or more days of manual Excel assembly. Stakeholders received static, delayed snapshots with no ability to drill into a region, product line or time period — every follow-up question meant another day of analyst time.'
    ]},
    {t:'steps',h:'Build Workflow',steps:[
      {tt:'SQL data model',d:'Cleaned and conformed source data into a reporting-grade SQL model — one trusted layer instead of per-report extracts.'},
      {tt:'DAX measure library',d:'Revenue, margin, variance and YoY measures built once, reused everywhere, version-controlled in the model.'},
      {tt:'Drill-through design',d:'Three navigation levels: executive summary → regional view → transaction detail.'},
      {tt:'Governance',d:'Row-level security so each manager sees exactly their scope from the same report.'},
      {tt:'Automation',d:'Scheduled refresh removed the human from the publishing loop entirely.'},
    ]},
    {t:'pairs',h:'Challenges Solved',pairs:[
      {c:'Every department computed "margin" differently, so meetings argued about numbers instead of decisions.',s:'Centralised definitions into a <b>single DAX measure library</b> — one formula, one truth, organisation-wide.'},
      {c:'Sharing one report with many managers risked exposing cross-regional financials.',s:'Implemented <b>row-level security roles</b> so access is filtered by identity, not by emailing filtered copies.'},
    ]},
    {t:'shots',h:'Artifacts',shots:[
      {cap:'Executive summary — KPI scorecard'},
      {cap:'Variance analysis — drill-through'},
    ]},
    {t:'road',h:'Roadmap',items:[
      'Forecast layer with rolling projections beside actuals.',
      'Anomaly flags on variance thresholds for proactive review.',
    ]},
  ],
},
];

/* ━━━━━━━━━━ PLATFORMS & TOOLS ━━━━━━━━━━ */
const TOOLS = [
  {ic:'☁️', g:'Cloud & Infrastructure', d:'Provisioning, deployment, monitoring',
   items:['AWS EC2','CloudWatch','NGINX','PM2','Linux','Render','Firebase','SSL / Let’s Encrypt']},
  {ic:'⚙️', g:'Backend Engineering', d:'APIs, auth, data layers',
   items:['Node.js','Express.js','REST APIs','JWT','OAuth 2.0','PostgreSQL','MongoDB','Razorpay']},
  {ic:'🖥️', g:'Frontend', d:'Interfaces and responsive UI',
   items:['JavaScript (ES6+)','React','Tailwind CSS','HTML5 / CSS3','Responsive Design']},
  {ic:'📊', g:'Data & Analytics', d:'Modeling, BI, machine learning',
   items:['Python','Pandas / NumPy','SQL','Power BI','DAX','Power Query','Advanced Excel','Scikit-learn']},
  {ic:'🤖', g:'AI & Automation', d:'Agents, APIs, workflow automation',
   items:['Claude AI','OpenAI APIs','AI Agents','Prompt Engineering','Workflow Automation']},
  {ic:'🧰', g:'Developer Tools', d:'Daily engineering workflow',
   items:['Git / GitHub','VS Code','Postman','npm','Cron / Bash','Web3Forms']},
];

/* ━━━━━━━━━━ CERTIFICATIONS ━━━━━━━━━━
   Add new certs here. `url` = verification link;
   defaults to LinkedIn profile when no direct link exists. */
const VERIFY_FALLBACK = 'https://www.linkedin.com/in/ayushjaiswal2310/';
const CERTS = [
  {n:'AWS Cloud Practitioner', org:'Amazon Web Services', yr:'2024', logo:'AWS',
   tags:['Cloud','EC2','IAM'], url:''},
  {n:'Power BI Data Analyst', org:'Microsoft', yr:'2023', logo:'MS',
   tags:['Power BI','DAX','Modeling'], url:''},
  {n:'Data Science with Python', org:'YBI Foundation', yr:'2023', logo:'YBI',
   tags:['Python','ML','Pandas'], url:''},
  {n:'Python for Data Analysis', org:'Coursera', yr:'2023', logo:'CO',
   tags:['Python','EDA','NumPy'], url:''},
];
