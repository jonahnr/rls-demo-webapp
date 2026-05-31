const scenarios = [
  {
    id: "operational",
    title: "Operational analytics",
    eyebrow: "Featured",
    summary: "Safety, compliance, cost exposure, leading indicators, and predictive risk across operating sites.",
    users: [
      { id: "opsLead", name: "Jordan Lee", title: "Director of Operations", initials: "JL", sites: ["Denver", "Houston", "Reno", "Tampa"], domains: ["Operational", "Compliance", "Analytics"], clearance: 3 },
      { id: "siteManager", name: "Andre Brooks", title: "Houston Site Manager", initials: "AB", sites: ["Houston"], domains: ["Operational", "Compliance", "Analytics"], clearance: 2 },
      { id: "finance", name: "Maya Chen", title: "Finance Business Partner", initials: "MC", sites: ["Denver", "Houston", "Reno", "Tampa"], domains: ["Finance"], clearance: 3 },
      { id: "partner", name: "Sam Rivera", title: "External Operations Partner", initials: "SR", sites: ["Denver", "Reno"], domains: ["Operational", "Analytics"], clearance: 1 }
    ],
    lenses: [
      {
        id: "risk",
        title: "Operational risk",
        shortTitle: "Risk",
        chip: "Primary",
        domain: "Operational",
        heroWord: "operational risk",
        byWord: "site",
        eyebrow: "Operations",
        chartTitle: "Operational risk available to selected user",
        tableTitle: "Operational risk events",
        valueHeader: "Risk score",
        valueKey: "riskScore",
        aggregate: "average",
        format: (value) => `${value}/100`,
        aggregateLabel: "Avg visible risk",
        aggregateHelp: "Average risk score across accessible operational events.",
        narrative: "Start with operational risk: incidents, hazards, high-potential events, and site exposure.",
        description: "Risk events by site.",
        insights: ["Prioritize exposed sites", "Protect sensitive event detail", "Compare locations from one model"],
        context: {
          opsLead: "Sees operational risk across every site, including high-sensitivity events.",
          siteManager: "Sees Houston operational risk only; other sites are removed before the report loads.",
          finance: "Finance can inspect cost exposure, but operational event rows are blocked in this lens.",
          partner: "Sees low-sensitivity approved operational rows for Denver and Reno."
        }
      },
      {
        id: "cost",
        title: "Cost exposure",
        shortTitle: "Cost",
        chip: "Finance",
        domain: "Finance",
        heroWord: "cost exposure",
        byWord: "claim category",
        eyebrow: "Cost stewardship",
        chartTitle: "Cost exposure available to selected user",
        tableTitle: "Operational cost exposure",
        valueHeader: "Cost exposure",
        valueKey: "costExposure",
        aggregate: "sum",
        format: formatMoney,
        aggregateLabel: "Visible cost",
        aggregateHelp: "Claim, downtime, and remediation cost the viewer can inspect.",
        narrative: "Connect operational events to claim reserves, downtime, and remediation spend.",
        description: "Financial impact of operations.",
        insights: ["Tie prevention to cost", "Keep finance rows controlled", "Support budget conversations"],
        context: {
          opsLead: "Operational leaders do not automatically inherit finance detail, so cost rows stay blocked.",
          siteManager: "The site manager can act on risk but cannot inspect finance-owned exposure.",
          finance: "Finance can compare cost exposure across sites and categories.",
          partner: "External partners do not see finance-owned cost records."
        }
      },
      {
        id: "compliance",
        title: "Compliance readiness",
        shortTitle: "Compliance",
        chip: "Audit",
        domain: "Compliance",
        heroWord: "compliance",
        byWord: "control owner",
        eyebrow: "Governance readiness",
        chartTitle: "Open compliance actions available to selected user",
        tableTitle: "Compliance action register",
        valueHeader: "Open actions",
        valueKey: "openActions",
        aggregate: "sum",
        format: (value) => `${value}`,
        aggregateLabel: "Visible actions",
        aggregateHelp: "Open items visible based on site scope and compliance entitlement.",
        narrative: "Track audit findings, overdue controls, and corrective actions while keeping site scope intact.",
        description: "Audit and corrective actions.",
        insights: ["See overdue controls", "Separate audit visibility", "Prevent cross-site leakage"],
        context: {
          opsLead: "Sees compliance actions across all sites to coordinate readiness.",
          siteManager: "Sees Houston compliance actions that need local follow-up.",
          finance: "Finance rows are allowed in cost views, but compliance ownership is blocked here.",
          partner: "External partners cannot see internal compliance actions unless explicitly entitled."
        }
      },
      {
        id: "leading",
        title: "Leading indicators",
        shortTitle: "Leading",
        chip: "Analytics",
        domain: "Analytics",
        heroWord: "leading indicator",
        byWord: "crew",
        eyebrow: "Operational analytics",
        chartTitle: "Leading indicator signal available to selected user",
        tableTitle: "Observation and training signals",
        valueHeader: "Signal score",
        valueKey: "leadingScore",
        aggregate: "average",
        format: (value) => `${value}`,
        aggregateLabel: "Avg signal",
        aggregateHelp: "Average leading indicator score from accessible analytics rows.",
        narrative: "Show risk before incidents happen without exposing every site, crew, or model feature.",
        description: "Proactive operating signals.",
        insights: ["Spot weak signals", "Coach scoped teams", "Share metrics safely"],
        context: {
          opsLead: "Sees analytics signals across the operating footprint.",
          siteManager: "Sees Houston leading indicators for local coaching.",
          finance: "Finance does not receive crew-level indicator analytics.",
          partner: "Partners see low-sensitivity analytics for approved locations."
        }
      },
      {
        id: "predictive",
        title: "Predictive risk",
        shortTitle: "Predictive",
        chip: "AI-ready",
        domain: "Analytics",
        heroWord: "predictive risk",
        byWord: "site",
        eyebrow: "Advanced analytics",
        chartTitle: "Predicted risk available to selected user",
        tableTitle: "Predictive intervention queue",
        valueHeader: "Risk forecast",
        valueKey: "forecastScore",
        aggregate: "average",
        format: (value) => `${value}%`,
        aggregateLabel: "Avg forecast",
        aggregateHelp: "Average forecasted exposure across visible intervention candidates.",
        narrative: "Govern AI-ready operational analytics so only the right teams receive model-driven risk queues.",
        description: "Forecasted exposure queues.",
        insights: ["Operationalize prediction", "Govern model outputs", "Route interventions"],
        context: {
          opsLead: "Sees predictive risk queues across all sites.",
          siteManager: "Sees Houston forecasts and recommended interventions only.",
          finance: "Finance cannot access model-driven risk detail without analytics entitlement.",
          partner: "Partners see low-sensitivity predictions for approved partner sites."
        }
      }
    ],
    records: [
      { name: "Forklift near miss", site: "Denver", domain: "Operational", riskScore: 72, costExposure: 48000, openActions: 4, leadingScore: 68, forecastScore: 73, sensitivity: 2 },
      { name: "Confined space permit gap", site: "Houston", domain: "Operational", riskScore: 91, costExposure: 125000, openActions: 7, leadingScore: 81, forecastScore: 88, sensitivity: 2 },
      { name: "Line clearance observation", site: "Houston", domain: "Operational", riskScore: 64, costExposure: 41000, openActions: 3, leadingScore: 73, forecastScore: 62, sensitivity: 1 },
      { name: "Lockout verification miss", site: "Houston", domain: "Operational", riskScore: 82, costExposure: 96000, openActions: 5, leadingScore: 70, forecastScore: 86, sensitivity: 2 },
      { name: "PPE observation trend", site: "Reno", domain: "Operational", riskScore: 44, costExposure: 18000, openActions: 2, leadingScore: 74, forecastScore: 42, sensitivity: 1 },
      { name: "Slip hazard cluster", site: "Denver", domain: "Operational", riskScore: 56, costExposure: 39000, openActions: 3, leadingScore: 64, forecastScore: 59, sensitivity: 1 },
      { name: "Heat stress monitoring", site: "Tampa", domain: "Operational", riskScore: 67, costExposure: 52000, openActions: 4, leadingScore: 77, forecastScore: 69, sensitivity: 2 },
      { name: "Workers comp reserve", site: "Houston", domain: "Finance", riskScore: 69, costExposure: 310000, openActions: 3, leadingScore: 58, forecastScore: 71, sensitivity: 3 },
      { name: "Vehicle incident review", site: "Denver", domain: "Finance", riskScore: 84, costExposure: 204000, openActions: 5, leadingScore: 61, forecastScore: 82, sensitivity: 3 },
      { name: "Chemical storage audit", site: "Tampa", domain: "Compliance", riskScore: 63, costExposure: 64000, openActions: 5, leadingScore: 49, forecastScore: 64, sensitivity: 2 },
      { name: "Emergency drill follow-up", site: "Houston", domain: "Compliance", riskScore: 38, costExposure: 22000, openActions: 8, leadingScore: 69, forecastScore: 41, sensitivity: 1 },
      { name: "Observation completion drift", site: "Houston", domain: "Analytics", riskScore: 62, costExposure: 36000, openActions: 4, leadingScore: 86, forecastScore: 66, sensitivity: 2 },
      { name: "Near-miss reporting drop", site: "Houston", domain: "Analytics", riskScore: 71, costExposure: 42000, openActions: 4, leadingScore: 88, forecastScore: 76, sensitivity: 1 },
      { name: "High-risk task forecast", site: "Houston", domain: "Analytics", riskScore: 88, costExposure: 118000, openActions: 5, leadingScore: 75, forecastScore: 91, sensitivity: 2 },
      { name: "Permit exception forecast", site: "Houston", domain: "Analytics", riskScore: 79, costExposure: 88000, openActions: 4, leadingScore: 73, forecastScore: 83, sensitivity: 2 },
      { name: "Supervisor coaching gap", site: "Denver", domain: "Analytics", riskScore: 58, costExposure: 28000, openActions: 3, leadingScore: 79, forecastScore: 61, sensitivity: 1 },
      { name: "Night shift fatigue signal", site: "Reno", domain: "Analytics", riskScore: 76, costExposure: 74000, openActions: 6, leadingScore: 83, forecastScore: 84, sensitivity: 2 }
    ]
  },
  {
    id: "commercial",
    title: "Commercial analytics",
    eyebrow: "Second example",
    summary: "Revenue, customer health, margin, renewal risk, and pipeline analytics for non-operational audiences.",
    users: [
      { id: "revenueLead", name: "Elena Park", title: "VP Revenue", initials: "EP", sites: ["Enterprise", "Mid-Market", "Public Sector", "Channel"], domains: ["Revenue", "Customer", "Finance", "Analytics", "Product"], clearance: 3 },
      { id: "accountManager", name: "Noah Grant", title: "Enterprise Account Manager", initials: "NG", sites: ["Enterprise"], domains: ["Revenue", "Customer", "Analytics", "Product"], clearance: 2 },
      { id: "finance", name: "Maya Chen", title: "Finance Business Partner", initials: "MC", sites: ["Enterprise", "Mid-Market", "Public Sector", "Channel"], domains: ["Finance"], clearance: 3 },
      { id: "partner", name: "Sam Rivera", title: "Channel Partner", initials: "SR", sites: ["Channel"], domains: ["Revenue", "Product"], clearance: 1 }
    ],
    lenses: [
      {
        id: "pipeline",
        title: "Pipeline coverage",
        shortTitle: "Pipeline",
        chip: "Revenue",
        domain: "Revenue",
        heroWord: "pipeline",
        byWord: "segment",
        eyebrow: "Revenue analytics",
        chartTitle: "Pipeline coverage available to selected user",
        tableTitle: "Pipeline opportunities",
        valueHeader: "Pipeline value",
        valueKey: "pipelineValue",
        aggregate: "sum",
        format: formatMoney,
        aggregateLabel: "Visible pipeline",
        aggregateHelp: "Pipeline value the viewer is entitled to inspect.",
        narrative: "Show how RLS controls revenue reporting by segment, account ownership, and sensitivity.",
        description: "Pipeline by segment.",
        insights: ["Share performance safely", "Protect account details", "Compare segments cleanly"],
        context: {
          revenueLead: "Sees pipeline across all customer segments.",
          accountManager: "Sees Enterprise pipeline only; other segments are filtered out.",
          finance: "Finance sees margin and bookings data, but pipeline detail is blocked here.",
          partner: "Channel partners see approved channel opportunities only."
        }
      },
      {
        id: "health",
        title: "Customer health",
        shortTitle: "Health",
        chip: "Success",
        domain: "Customer",
        heroWord: "customer health",
        byWord: "segment",
        eyebrow: "Customer analytics",
        chartTitle: "Customer health available to selected user",
        tableTitle: "Customer health signals",
        valueHeader: "Health score",
        valueKey: "healthScore",
        aggregate: "average",
        format: (value) => `${value}/100`,
        aggregateLabel: "Avg health",
        aggregateHelp: "Average visible customer health score.",
        narrative: "Use governed access to share customer health without exposing every account.",
        description: "Customer health by segment.",
        insights: ["Spot retention pressure", "Protect named accounts", "Align success teams"],
        context: {
          revenueLead: "Sees health signals across all customer segments.",
          accountManager: "Sees Enterprise customer health signals only.",
          finance: "Finance does not receive named customer health signals in this lens.",
          partner: "Partners do not receive internal customer health records unless explicitly entitled."
        }
      },
      {
        id: "margin",
        title: "Margin exposure",
        shortTitle: "Margin",
        chip: "Finance",
        domain: "Finance",
        heroWord: "margin",
        byWord: "portfolio",
        eyebrow: "Financial governance",
        chartTitle: "Margin exposure available to selected user",
        tableTitle: "Margin exposure register",
        valueHeader: "Margin impact",
        valueKey: "marginImpact",
        aggregate: "sum",
        format: formatMoney,
        aggregateLabel: "Visible margin",
        aggregateHelp: "Margin impact visible to the selected user.",
        narrative: "Finance can use the same RLS framework to protect margin and pricing detail.",
        description: "Margin impact by portfolio.",
        insights: ["Protect pricing detail", "Share totals with leaders", "Control finance-only rows"],
        context: {
          revenueLead: "Revenue leadership can inspect finance-approved margin views.",
          accountManager: "Account managers do not automatically receive restricted margin rows.",
          finance: "Finance sees margin exposure across all segments.",
          partner: "Partners do not see internal margin exposure."
        }
      },
      {
        id: "renewal",
        title: "Renewal risk",
        shortTitle: "Renewal",
        chip: "Analytics",
        domain: "Analytics",
        heroWord: "renewal risk",
        byWord: "segment",
        eyebrow: "Predictive analytics",
        chartTitle: "Renewal risk available to selected user",
        tableTitle: "Renewal risk queue",
        valueHeader: "Risk forecast",
        valueKey: "renewalRisk",
        aggregate: "average",
        format: (value) => `${value}%`,
        aggregateLabel: "Avg renewal risk",
        aggregateHelp: "Average visible renewal risk forecast.",
        narrative: "Predictive analytics becomes easier to share when RLS governs who sees model outputs.",
        description: "Forecasted renewal exposure.",
        insights: ["Route save plays", "Govern model outputs", "Limit account exposure"],
        context: {
          revenueLead: "Sees renewal risk across all segments.",
          accountManager: "Sees Enterprise renewal risk for their segment.",
          finance: "Finance cannot see model-driven renewal queues without analytics entitlement.",
          partner: "Partners do not receive internal renewal risk forecasts."
        }
      },
      {
        id: "adoption",
        title: "Adoption signals",
        shortTitle: "Adoption",
        chip: "Product",
        domain: "Product",
        heroWord: "adoption",
        byWord: "account tier",
        eyebrow: "Product analytics",
        chartTitle: "Adoption signal available to selected user",
        tableTitle: "Product adoption signals",
        valueHeader: "Adoption score",
        valueKey: "adoptionScore",
        aggregate: "average",
        format: (value) => `${value}`,
        aggregateLabel: "Avg adoption",
        aggregateHelp: "Average visible adoption score.",
        narrative: "RLS lets teams share product analytics without exposing accounts outside scope.",
        description: "Usage and adoption signals.",
        insights: ["Find expansion paths", "Protect account usage", "Coordinate teams"],
        context: {
          revenueLead: "Sees adoption trends across all customer segments.",
          accountManager: "Sees Enterprise adoption signals only.",
          finance: "Finance does not receive product usage analytics in this lens.",
          partner: "Partners see approved channel adoption signals only."
        }
      }
    ],
    records: [
      { name: "Aster Health expansion", site: "Enterprise", domain: "Revenue", pipelineValue: 420000, healthScore: 0, marginImpact: 0, renewalRisk: 0, adoptionScore: 0, sensitivity: 2 },
      { name: "Corvus Energy platform", site: "Enterprise", domain: "Revenue", pipelineValue: 610000, healthScore: 0, marginImpact: 0, renewalRisk: 0, adoptionScore: 0, sensitivity: 2 },
      { name: "Delta Transit renewal", site: "Public Sector", domain: "Revenue", pipelineValue: 355000, healthScore: 0, marginImpact: 0, renewalRisk: 0, adoptionScore: 0, sensitivity: 2 },
      { name: "Harbor Media partner deal", site: "Channel", domain: "Revenue", pipelineValue: 135000, healthScore: 0, marginImpact: 0, renewalRisk: 0, adoptionScore: 0, sensitivity: 1 },
      { name: "Aster Health engagement", site: "Enterprise", domain: "Customer", pipelineValue: 0, healthScore: 82, marginImpact: 0, renewalRisk: 0, adoptionScore: 0, sensitivity: 2 },
      { name: "Corvus executive sponsor gap", site: "Enterprise", domain: "Customer", pipelineValue: 0, healthScore: 68, marginImpact: 0, renewalRisk: 0, adoptionScore: 0, sensitivity: 2 },
      { name: "Delta Transit service pulse", site: "Public Sector", domain: "Customer", pipelineValue: 0, healthScore: 74, marginImpact: 0, renewalRisk: 0, adoptionScore: 0, sensitivity: 2 },
      { name: "Harbor Media channel health", site: "Channel", domain: "Customer", pipelineValue: 0, healthScore: 79, marginImpact: 0, renewalRisk: 0, adoptionScore: 0, sensitivity: 1 },
      { name: "Enterprise discount review", site: "Enterprise", domain: "Finance", pipelineValue: 0, healthScore: 0, marginImpact: 260000, renewalRisk: 0, adoptionScore: 0, sensitivity: 3 },
      { name: "Channel rebate exposure", site: "Channel", domain: "Finance", pipelineValue: 0, healthScore: 0, marginImpact: 87000, renewalRisk: 0, adoptionScore: 0, sensitivity: 3 },
      { name: "Aster renewal forecast", site: "Enterprise", domain: "Analytics", pipelineValue: 0, healthScore: 84, marginImpact: 0, renewalRisk: 58, adoptionScore: 83, sensitivity: 2 },
      { name: "Corvus adoption drift", site: "Enterprise", domain: "Analytics", pipelineValue: 0, healthScore: 66, marginImpact: 0, renewalRisk: 63, adoptionScore: 61, sensitivity: 2 },
      { name: "Channel expansion signal", site: "Channel", domain: "Analytics", pipelineValue: 0, healthScore: 76, marginImpact: 0, renewalRisk: 34, adoptionScore: 82, sensitivity: 1 },
      { name: "Mid-market activation cohort", site: "Mid-Market", domain: "Analytics", pipelineValue: 0, healthScore: 71, marginImpact: 0, renewalRisk: 42, adoptionScore: 69, sensitivity: 1 },
      { name: "Aster workflow adoption", site: "Enterprise", domain: "Product", pipelineValue: 0, healthScore: 0, marginImpact: 0, renewalRisk: 0, adoptionScore: 83, sensitivity: 2 },
      { name: "Corvus feature adoption", site: "Enterprise", domain: "Product", pipelineValue: 0, healthScore: 0, marginImpact: 0, renewalRisk: 0, adoptionScore: 61, sensitivity: 2 },
      { name: "Channel expansion usage", site: "Channel", domain: "Product", pipelineValue: 0, healthScore: 0, marginImpact: 0, renewalRisk: 0, adoptionScore: 82, sensitivity: 1 },
      { name: "Mid-market activation usage", site: "Mid-Market", domain: "Product", pipelineValue: 0, healthScore: 0, marginImpact: 0, renewalRisk: 0, adoptionScore: 69, sensitivity: 1 }
    ]
  }
];

const policies = [
  { title: "Scope", description: "Users only retrieve rows for assigned sites, segments, or portfolios.", code: "row.scope IN viewer.scope" },
  { title: "Domain entitlement", description: "Each lens queries one governed domain such as Operational, Revenue, Customer, Finance, Analytics, or Product.", code: "row.domain = lens.domain AND row.domain IN viewer.domains" },
  { title: "Sensitivity clearance", description: "Restricted rows are hidden or masked by clearance level.", code: "row.sensitivity <= viewer.clearance" }
];

const state = {
  scenarioId: "operational",
  userId: "siteManager",
  lensId: "risk",
  rls: true,
  mask: true,
  showBlocked: false,
  view: "report"
};

const els = {
  scenarioList: document.querySelector("#scenarioList"),
  scenarioTitle: document.querySelector("#scenarioTitle"),
  userList: document.querySelector("#userList"),
  lensList: document.querySelector("#lensList"),
  lensTitle: document.querySelector("#lensTitle"),
  lensNarrative: document.querySelector("#lensNarrative"),
  viewerContext: document.querySelector("#viewerContext"),
  heroLensWord: document.querySelector("#heroLensWord"),
  heroByWord: document.querySelector("#heroByWord"),
  insightStrip: document.querySelector("#insightStrip"),
  rlsToggle: document.querySelector("#rlsToggle"),
  maskToggle: document.querySelector("#maskToggle"),
  blockedToggle: document.querySelector("#blockedToggle"),
  metrics: document.querySelector("#metrics"),
  reportRows: document.querySelector("#reportRows"),
  barChart: document.querySelector("#barChart"),
  policyGrid: document.querySelector("#policyGrid"),
  auditList: document.querySelector("#auditList"),
  heroMode: document.querySelector("#heroMode"),
  heroVisibleRows: document.querySelector("#heroVisibleRows"),
  heroSummary: document.querySelector("#heroSummary"),
  tablePill: document.querySelector("#tablePill"),
  tableTitle: document.querySelector("#tableTitle"),
  chartEyebrow: document.querySelector("#chartEyebrow"),
  chartTitle: document.querySelector("#chartTitle"),
  valueHeader: document.querySelector("#valueHeader"),
  resetDemo: document.querySelector("#resetDemo")
};

function formatMoney(value) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(value);
}

function getScenario() {
  return scenarios.find((scenario) => scenario.id === state.scenarioId);
}

function getUser() {
  return getScenario().users.find((user) => user.id === state.userId);
}

function getLens() {
  return getScenario().lenses.find((lens) => lens.id === state.lensId);
}

function evaluateRecord(record, user, lens) {
  const checks = {
    scope: user.sites.includes(record.site),
    domain: user.domains.includes(record.domain) && record.domain === lens.domain,
    sensitivity: record.sensitivity <= user.clearance
  };
  const allowed = state.rls ? checks.scope && checks.domain && checks.sensitivity : true;
  const masked = state.rls && state.mask && checks.scope && checks.domain && !checks.sensitivity;
  const visible = allowed || masked || !state.rls;
  const reasons = [];

  if (!checks.scope) reasons.push(`Scope blocked: ${record.site}`);
  if (!checks.domain) reasons.push(`Domain blocked: ${record.domain} for ${lens.title}`);
  if (!checks.sensitivity) reasons.push(`Sensitivity ${record.sensitivity} exceeds clearance ${user.clearance}`);
  if (!state.rls) reasons.push("RLS disabled for demo comparison");

  return { ...record, allowed, masked, visible, reasons: reasons.length ? reasons : ["Allowed by all active policies"] };
}

function getEvaluatedRecords() {
  const scenario = getScenario();
  const user = getUser();
  const lens = getLens();
  return scenario.records
    .filter((record) => record.domain === lens.domain)
    .map((record) => evaluateRecord(record, user, lens));
}

function summarizeValues(items, lens) {
  const values = items.filter((record) => !record.masked).map((record) => record[lens.valueKey]);
  if (!values.length) return 0;
  const total = values.reduce((sum, value) => sum + value, 0);
  return lens.aggregate === "average" ? Math.round(total / values.length) : total;
}

function renderScenarios() {
  const scenario = getScenario();
  els.scenarioTitle.textContent = scenario.title;
  els.scenarioList.innerHTML = scenarios.map((item) => `
    <button class="scenario-tab ${item.id === state.scenarioId ? "active" : ""}" data-scenario="${item.id}" type="button">
      <span>${item.eyebrow}</span>
      <strong>${item.title}</strong>
      <small>${item.summary}</small>
    </button>
  `).join("");
}

function renderUsers() {
  const lens = getLens();
  const user = getUser();
  els.viewerContext.textContent = lens.context[user.id];
  els.userList.innerHTML = getScenario().users.map((item) => `
    <button class="user-card ${item.id === state.userId ? "active" : ""}" data-user="${item.id}" type="button">
      <span class="avatar">${item.initials}</span>
      <span>
        <h3>${item.name}</h3>
        <p>${item.title}</p>
        <small>${lens.context[item.id]}</small>
      </span>
    </button>
  `).join("");
}

function renderLenses() {
  const lens = getLens();
  els.lensList.innerHTML = getScenario().lenses.map((item) => `
    <button class="lens-card ${item.id === state.lensId ? "active" : ""}" data-lens="${item.id}" type="button">
      <span class="lens-chip">${item.chip}</span>
      <strong>${item.shortTitle}</strong>
    </button>
  `).join("");
  els.lensTitle.textContent = lens.title;
  els.lensNarrative.textContent = lens.narrative;
  els.heroLensWord.textContent = lens.heroWord;
  els.heroByWord.textContent = lens.byWord;
  els.insightStrip.innerHTML = lens.insights.map((insight, index) => `
    <article class="insight-card">
      <span>Governed insight ${index + 1}</span>
      <strong>${insight}</strong>
    </article>
  `).join("");
}

function renderMetrics(evaluated) {
  const lens = getLens();
  const user = getUser();
  const visible = evaluated.filter((record) => record.visible);
  const blocked = state.rls ? evaluated.filter((record) => !record.visible) : [];
  const masked = evaluated.filter((record) => record.masked);
  const aggregate = summarizeValues(visible, lens);
  const scopeCount = new Set(visible.map((record) => record.site)).size;
  const scopeLabel = state.scenarioId === "operational" ? "Scopes in view" : "Segments in view";

  const metricData = [
    ["Visible records", `${visible.length}/${evaluated.length}`, state.rls ? "Denominator is scoped to this reporting lens." : "All rows in this lens are exposed while RLS is off."],
    [lens.aggregateLabel, lens.format(aggregate), masked.length ? `${masked.length} sensitive values are masked.` : lens.aggregateHelp],
    [scopeLabel, scopeCount, "Scope is inherited by every reporting lens."],
    ["Blocked records", blocked.length, "Rows removed before the dashboard query returns."]
  ];

  els.metrics.innerHTML = metricData.map(([label, value, help]) => `
    <article class="metric">
      <span>${label}</span>
      <strong>${value}</strong>
      <small>${help}</small>
    </article>
  `).join("");

  els.heroMode.textContent = state.rls ? "RLS enabled" : "RLS disabled";
  els.heroMode.previousElementSibling.classList.toggle("active", state.rls);
  els.heroVisibleRows.textContent = `${visible.length} of ${evaluated.length} rows visible`;
  els.heroSummary.textContent = state.rls
    ? `${blocked.length} records are blocked for ${user.name} in the ${lens.title.toLowerCase()} lens.`
    : "Every governed row is visible, showing the risk RLS prevents.";
  els.tablePill.textContent = state.rls ? "Filtered by policy" : "Unrestricted";
  els.chartEyebrow.textContent = lens.eyebrow;
  els.chartTitle.textContent = lens.chartTitle.replace("selected user", user.name);
  els.tableTitle.textContent = lens.tableTitle;
  els.valueHeader.textContent = lens.valueHeader;
}

function renderChart(evaluated) {
  const lens = getLens();
  const visible = evaluated.filter((record) => record.visible);
  const scopes = [...new Set(getScenario().records.filter((record) => record.domain === lens.domain).map((record) => record.site))];
  const totals = scopes.map((scope) => ({
    scope,
    value: summarizeValues(visible.filter((record) => record.site === scope), lens)
  }));
  const max = Math.max(...totals.map((item) => item.value), 1);

  els.barChart.innerHTML = totals.map((item) => `
    <div class="bar-row">
      <strong>${item.scope}</strong>
      <div class="bar-track"><div class="bar-fill" style="width: ${(item.value / max) * 100}%"></div></div>
      <span>${lens.format(item.value)}</span>
    </div>
  `).join("");
}

function renderRows(evaluated) {
  const lens = getLens();
  const rowsToRender = evaluated.filter((record) => record.visible || state.showBlocked);

  els.reportRows.innerHTML = rowsToRender.map((record) => {
    const status = record.allowed ? "Allowed" : record.masked ? "Masked" : "Blocked";
    const tagClass = record.allowed ? "allowed" : record.masked ? "masked" : "blocked";
    const value = record.masked ? "Masked" : lens.format(record[lens.valueKey]);
    return `
      <tr class="${!record.visible ? "blocked" : ""}">
        <td>${record.name}</td>
        <td>${record.site}</td>
        <td>${record.domain}</td>
        <td>${value}</td>
        <td>Level ${record.sensitivity}</td>
        <td><span class="tag ${tagClass}">${status}</span></td>
      </tr>
    `;
  }).join("");
}

function renderPolicies() {
  els.policyGrid.innerHTML = policies.map((policy) => `
    <article class="policy-card ${state.rls ? "active" : ""}">
      <p class="eyebrow">${state.rls ? "Active" : "Inactive"}</p>
      <h3>${policy.title}</h3>
      <p>${policy.description}</p>
      <code>${state.rls ? policy.code : "Policy paused in demo"}</code>
    </article>
  `).join("");
}

function renderAudit(evaluated) {
  els.auditList.innerHTML = evaluated.map((record) => {
    const decision = record.allowed ? "Allow" : record.masked ? "Mask value" : "Deny row";
    const tagClass = record.allowed ? "allowed" : record.masked ? "masked" : "blocked";
    return `
      <article class="audit-item">
        <span class="tag ${tagClass}">${decision}</span>
        <div>
          <strong>${record.name}</strong>
          <small>${record.site} / ${record.domain} / sensitivity ${record.sensitivity}</small>
        </div>
        <small>${record.reasons.join("; ")}</small>
      </article>
    `;
  }).join("");
}

function renderTabs() {
  document.querySelectorAll(".tab").forEach((tab) => tab.classList.toggle("active", tab.dataset.view === state.view));
  document.querySelectorAll(".view").forEach((view) => view.classList.toggle("active", view.id === `${state.view}View`));
}

function render() {
  const evaluated = getEvaluatedRecords();
  renderScenarios();
  renderLenses();
  renderUsers();
  renderMetrics(evaluated);
  renderChart(evaluated);
  renderRows(evaluated);
  renderPolicies();
  renderAudit(evaluated);
  renderTabs();
  els.rlsToggle.checked = state.rls;
  els.maskToggle.checked = state.mask;
  els.blockedToggle.checked = state.showBlocked;
}

function switchScenario(scenarioId) {
  const scenario = scenarios.find((item) => item.id === scenarioId);
  state.scenarioId = scenario.id;
  state.userId = scenario.users[1].id;
  state.lensId = scenario.lenses[0].id;
  render();
}

document.addEventListener("click", (event) => {
  const scenarioButton = event.target.closest("[data-scenario]");
  const userButton = event.target.closest("[data-user]");
  const lensButton = event.target.closest("[data-lens]");
  const tabButton = event.target.closest("[data-view]");

  if (scenarioButton) switchScenario(scenarioButton.dataset.scenario);
  if (userButton) {
    state.userId = userButton.dataset.user;
    render();
  }
  if (lensButton) {
    state.lensId = lensButton.dataset.lens;
    render();
  }
  if (tabButton) {
    state.view = tabButton.dataset.view;
    render();
  }
});

els.rlsToggle.addEventListener("change", () => {
  state.rls = els.rlsToggle.checked;
  render();
});

els.maskToggle.addEventListener("change", () => {
  state.mask = els.maskToggle.checked;
  render();
});

els.blockedToggle.addEventListener("change", () => {
  state.showBlocked = els.blockedToggle.checked;
  render();
});

els.resetDemo.addEventListener("click", () => {
  state.scenarioId = "operational";
  state.userId = "siteManager";
  state.lensId = "risk";
  state.rls = true;
  state.mask = true;
  state.showBlocked = false;
  state.view = "report";
  render();
});

render();
