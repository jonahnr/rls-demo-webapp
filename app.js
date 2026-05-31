const lenses = [
  {
    id: "safety",
    title: "Safety risk",
    shortTitle: "Safety",
    chip: "Primary",
    domain: "Safety",
    heroWord: "safety",
    byWord: "site",
    eyebrow: "Safety operations",
    chartTitle: "Incident risk available to selected user",
    tableTitle: "Site safety events",
    valueHeader: "Risk score",
    valueKey: "riskScore",
    format: (value) => `${value}/100`,
    aggregateLabel: "Visible risk",
    aggregateHelp: "Risk score total across accessible site records.",
    maskedText: "Masked",
    narrative: "Start with the operational safety lens: incidents, near misses, hazards, and high-potential events by location.",
    description: "Incident risk and high-potential events by site.",
    insights: ["Prioritize sites with elevated exposure", "Protect sensitive incident details", "Compare locations from one governed model"],
    context: {
      safetyLead: "Sees all safety records across every site, including high-sensitivity events.",
      siteManager: "Sees Houston safety events only; other locations are removed before the report loads.",
      finance: "Finance can inspect cost data, but operational safety rows are blocked in this lens.",
      contractor: "Sees low-sensitivity partner-approved safety rows for Denver and Reno only."
    }
  },
  {
    id: "cost",
    title: "Safety cost",
    shortTitle: "Cost",
    chip: "Finance",
    domain: "Finance",
    heroWord: "cost exposure",
    byWord: "claim category",
    eyebrow: "Cost stewardship",
    chartTitle: "Safety-related cost available to selected user",
    tableTitle: "Safety cost exposure",
    valueHeader: "Cost exposure",
    valueKey: "costExposure",
    format: formatMoney,
    aggregateLabel: "Visible cost",
    aggregateHelp: "Claim, downtime, and remediation cost the viewer can inspect.",
    maskedText: "Masked",
    narrative: "Use governed finance rows to connect safety performance to claim reserves, downtime, and remediation spend.",
    description: "Financial impact of safety events without exposing restricted rows.",
    insights: ["Tie safety work to measurable cost", "Keep finance-only records controlled", "Support budget conversations with governed evidence"],
    context: {
      safetyLead: "Safety leadership does not automatically inherit finance detail, so restricted cost rows stay blocked.",
      siteManager: "The site manager can act on safety issues but cannot inspect finance-owned claim exposure.",
      finance: "Finance can compare cost exposure across all sites and claim categories.",
      contractor: "External partners do not see finance-owned safety cost records."
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
    format: (value) => `${value}`,
    aggregateLabel: "Visible actions",
    aggregateHelp: "Open items visible based on site scope and compliance entitlement.",
    maskedText: "Restricted",
    narrative: "Track audit findings, overdue controls, and corrective actions while keeping site scope intact.",
    description: "Audit findings and corrective-action ownership.",
    insights: ["See who owns overdue controls", "Separate audit visibility by role", "Prevent cross-site compliance leakage"],
    context: {
      safetyLead: "Sees compliance actions across all locations to coordinate readiness.",
      siteManager: "Sees Houston compliance actions that need local follow-up.",
      finance: "Finance rows are allowed in cost views, but compliance ownership is blocked here.",
      contractor: "External partners cannot see internal compliance actions unless explicitly entitled."
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
    eyebrow: "Safety analytics",
    chartTitle: "Leading indicator signal available to selected user",
    tableTitle: "Observation and training signals",
    valueHeader: "Signal score",
    valueKey: "leadingScore",
    format: (value) => `${value}`,
    aggregateLabel: "Visible signal",
    aggregateHelp: "Proactive signal strength from observations, training, and hazard capture.",
    maskedText: "Restricted",
    narrative: "Give safety teams analytics that show risk before incidents happen, without exposing every site or crew.",
    description: "Proactive signals from observations, training, and hazard trends.",
    insights: ["Spot weak signals before incidents", "Coach teams with scoped analytics", "Share leading metrics without overexposing rows"],
    context: {
      safetyLead: "Sees analytics signals across the operating footprint for proactive safety planning.",
      siteManager: "Sees Houston leading indicators for local coaching and intervention.",
      finance: "Finance does not receive crew-level leading indicator analytics.",
      contractor: "Partners see only low-sensitivity analytics for approved locations."
    }
  },
  {
    id: "predictive",
    title: "Predictive site risk",
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
    format: (value) => `${value}%`,
    aggregateLabel: "Forecast load",
    aggregateHelp: "Forecasted exposure score across visible intervention candidates.",
    maskedText: "Restricted",
    narrative: "Show how governed data makes AI-ready safety analytics usable by the right teams without broad data exposure.",
    description: "Forecasted exposure and intervention queues by site.",
    insights: ["Operationalize predictive analytics", "Govern AI-ready safety features", "Route interventions to the right audience"],
    context: {
      safetyLead: "Sees predictive risk queues across all sites to direct prevention strategy.",
      siteManager: "Sees Houston forecasts and recommended interventions only.",
      finance: "Finance cannot access model-driven site risk detail without analytics entitlement.",
      contractor: "Partners only see low-sensitivity predictions for approved partner sites."
    }
  }
];

const users = [
  {
    id: "safetyLead",
    name: "Jordan Lee",
    title: "Director of Safety",
    initials: "JL",
    role: "Safety leader",
    sites: ["Denver", "Houston", "Reno", "Tampa"],
    domains: ["Safety", "Compliance", "Analytics"],
    clearance: 3,
    purpose: "Companywide safety, compliance, and analytics access."
  },
  {
    id: "siteManager",
    name: "Andre Brooks",
    title: "Houston Site Manager",
    initials: "AB",
    role: "Site manager",
    sites: ["Houston"],
    domains: ["Safety", "Compliance", "Analytics"],
    clearance: 2,
    purpose: "Local site access for Houston operations and prevention work."
  },
  {
    id: "finance",
    name: "Maya Chen",
    title: "Finance Business Partner",
    initials: "MC",
    role: "Finance partner",
    sites: ["Denver", "Houston", "Reno", "Tampa"],
    domains: ["Finance"],
    clearance: 3,
    purpose: "Finance-owned safety cost and claim exposure access."
  },
  {
    id: "contractor",
    name: "Sam Rivera",
    title: "External Safety Partner",
    initials: "SR",
    role: "Partner",
    sites: ["Denver", "Reno"],
    domains: ["Safety", "Analytics"],
    clearance: 1,
    purpose: "Partner-approved low-sensitivity safety and analytics access."
  }
];

const records = [
  { name: "Forklift near miss", site: "Denver", domain: "Safety", riskScore: 72, costExposure: 48000, openActions: 4, leadingScore: 68, forecastScore: 73, sensitivity: 2, owner: "Operations" },
  { name: "Confined space permit gap", site: "Houston", domain: "Safety", riskScore: 91, costExposure: 125000, openActions: 7, leadingScore: 81, forecastScore: 88, sensitivity: 2, owner: "EHS" },
  { name: "PPE observation trend", site: "Reno", domain: "Safety", riskScore: 44, costExposure: 18000, openActions: 2, leadingScore: 74, forecastScore: 42, sensitivity: 1, owner: "Field Safety" },
  { name: "Chemical storage audit", site: "Tampa", domain: "Compliance", riskScore: 63, costExposure: 64000, openActions: 5, leadingScore: 49, forecastScore: 64, sensitivity: 2, owner: "Compliance" },
  { name: "Workers comp reserve", site: "Houston", domain: "Finance", riskScore: 69, costExposure: 310000, openActions: 3, leadingScore: 58, forecastScore: 71, sensitivity: 3, owner: "Finance" },
  { name: "Machine guarding finding", site: "Reno", domain: "Compliance", riskScore: 78, costExposure: 87000, openActions: 6, leadingScore: 52, forecastScore: 79, sensitivity: 2, owner: "Compliance" },
  { name: "Slip hazard cluster", site: "Denver", domain: "Safety", riskScore: 56, costExposure: 39000, openActions: 3, leadingScore: 64, forecastScore: 59, sensitivity: 1, owner: "Site Safety" },
  { name: "Ergonomics claims review", site: "Tampa", domain: "Finance", riskScore: 51, costExposure: 156000, openActions: 2, leadingScore: 45, forecastScore: 57, sensitivity: 3, owner: "Finance" },
  { name: "Emergency drill follow-up", site: "Houston", domain: "Compliance", riskScore: 38, costExposure: 22000, openActions: 8, leadingScore: 69, forecastScore: 41, sensitivity: 1, owner: "EHS" },
  { name: "Vehicle incident review", site: "Denver", domain: "Finance", riskScore: 84, costExposure: 204000, openActions: 5, leadingScore: 61, forecastScore: 82, sensitivity: 3, owner: "Risk" },
  { name: "Heat stress monitoring", site: "Tampa", domain: "Safety", riskScore: 67, costExposure: 52000, openActions: 4, leadingScore: 77, forecastScore: 69, sensitivity: 2, owner: "Field Safety" },
  { name: "Training overdue sample", site: "Reno", domain: "Compliance", riskScore: 46, costExposure: 15000, openActions: 9, leadingScore: 72, forecastScore: 48, sensitivity: 1, owner: "Learning" },
  { name: "Observation completion drift", site: "Houston", domain: "Analytics", riskScore: 62, costExposure: 36000, openActions: 4, leadingScore: 86, forecastScore: 66, sensitivity: 2, owner: "Analytics" },
  { name: "Supervisor coaching gap", site: "Denver", domain: "Analytics", riskScore: 58, costExposure: 28000, openActions: 3, leadingScore: 79, forecastScore: 61, sensitivity: 1, owner: "Analytics" },
  { name: "Night shift fatigue signal", site: "Reno", domain: "Analytics", riskScore: 76, costExposure: 74000, openActions: 6, leadingScore: 83, forecastScore: 84, sensitivity: 2, owner: "Analytics" },
  { name: "High-risk task forecast", site: "Houston", domain: "Analytics", riskScore: 88, costExposure: 118000, openActions: 5, leadingScore: 75, forecastScore: 91, sensitivity: 2, owner: "Data Science" },
  { name: "Contractor exposure pattern", site: "Denver", domain: "Analytics", riskScore: 48, costExposure: 22000, openActions: 2, leadingScore: 67, forecastScore: 53, sensitivity: 1, owner: "Data Science" }
];

const policies = [
  {
    id: "site",
    title: "Site scope",
    description: "Users only retrieve rows for locations assigned to their role or contract.",
    code: "row.site IN viewer.sites"
  },
  {
    id: "domain",
    title: "Data domain entitlement",
    description: "Each lens queries one governed domain: Safety, Finance, Compliance, or Analytics.",
    code: "row.domain = lens.domain AND row.domain IN viewer.domains"
  },
  {
    id: "sensitivity",
    title: "Sensitivity clearance",
    description: "High-potential incidents, claims, and model outputs are hidden or masked by clearance.",
    code: "row.sensitivity <= viewer.clearance"
  }
];

const state = {
  userId: "siteManager",
  lensId: "safety",
  rls: true,
  mask: true,
  showBlocked: false,
  view: "report"
};

const els = {
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
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0
  }).format(value);
}

function getUser() {
  return users.find((user) => user.id === state.userId);
}

function getLens() {
  return lenses.find((lens) => lens.id === state.lensId);
}

function evaluateRecord(record, user, lens) {
  const checks = {
    site: user.sites.includes(record.site),
    domain: user.domains.includes(record.domain) && record.domain === lens.domain,
    sensitivity: record.sensitivity <= user.clearance
  };
  const allowed = state.rls ? checks.site && checks.domain && checks.sensitivity : true;
  const canMask = state.rls && state.mask && checks.site && checks.domain && !checks.sensitivity;
  const visible = allowed || canMask || !state.rls;
  const reasons = [];

  if (!checks.site) reasons.push(`Site blocked: ${record.site}`);
  if (!checks.domain) reasons.push(`Domain blocked: ${record.domain} for ${lens.title}`);
  if (!checks.sensitivity) reasons.push(`Sensitivity ${record.sensitivity} exceeds clearance ${user.clearance}`);
  if (!state.rls) reasons.push("RLS disabled for demo comparison");

  return {
    ...record,
    allowed,
    masked: canMask,
    visible,
    reasons: reasons.length ? reasons : ["Allowed by all active policies"]
  };
}

function getEvaluatedRecords() {
  const user = getUser();
  const lens = getLens();
  return records.map((record) => evaluateRecord(record, user, lens));
}

function renderUsers() {
  const lens = getLens();
  els.viewerContext.textContent = lens.context[getUser().id];
  els.userList.innerHTML = users.map((user) => `
    <button class="user-card ${user.id === state.userId ? "active" : ""}" data-user="${user.id}" type="button">
      <span class="avatar">${user.initials}</span>
      <span>
        <h3>${user.name}</h3>
        <p>${user.title}</p>
        <small>${lens.context[user.id]}</small>
      </span>
    </button>
  `).join("");
}

function renderLenses() {
  const lens = getLens();
  els.lensList.innerHTML = lenses.map((item) => `
    <button class="lens-card ${item.id === state.lensId ? "active" : ""}" data-lens="${item.id}" type="button">
      <span class="lens-chip">${item.chip}</span>
      <strong>${item.shortTitle}</strong>
      <small>${item.description}</small>
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
  const visible = evaluated.filter((record) => record.visible);
  const blocked = state.rls ? evaluated.filter((record) => !record.visible) : [];
  const masked = evaluated.filter((record) => record.masked);
  const aggregate = visible.reduce((sum, record) => sum + (record.masked ? 0 : record[lens.valueKey]), 0);
  const siteCount = new Set(visible.map((record) => record.site)).size;

  const metricData = [
    ["Visible records", `${visible.length}/${records.length}`, state.rls ? "Report only returns approved site records." : "All rows are exposed while RLS is off."],
    [lens.aggregateLabel, lens.format(aggregate), masked.length ? `${masked.length} sensitive values are masked.` : lens.aggregateHelp],
    ["Sites in view", siteCount, "Location scope is inherited by every reporting lens."],
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
  els.heroVisibleRows.textContent = `${visible.length} of ${records.length} rows visible`;
  els.heroSummary.textContent = state.rls
    ? `${blocked.length} records are blocked for ${getUser().name} in the ${lens.title.toLowerCase()} lens.`
    : "Every governed row is visible, showing the risk RLS prevents.";
  els.tablePill.textContent = state.rls ? "Filtered by policy" : "Unrestricted";
  els.chartEyebrow.textContent = lens.eyebrow;
  els.chartTitle.textContent = lens.chartTitle;
  els.tableTitle.textContent = lens.tableTitle;
  els.valueHeader.textContent = lens.valueHeader;
}

function renderChart(evaluated) {
  const lens = getLens();
  const visible = evaluated.filter((record) => record.visible);
  const totals = ["Denver", "Houston", "Reno", "Tampa"].map((site) => ({
    site,
    value: visible
      .filter((record) => record.site === site && !record.masked)
      .reduce((sum, record) => sum + record[lens.valueKey], 0)
  }));
  const max = Math.max(...totals.map((item) => item.value), 1);

  els.barChart.innerHTML = totals.map((item) => `
    <div class="bar-row">
      <strong>${item.site}</strong>
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
    const value = record.masked ? lens.maskedText : lens.format(record[lens.valueKey]);
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
  document.querySelectorAll(".tab").forEach((tab) => {
    tab.classList.toggle("active", tab.dataset.view === state.view);
  });
  document.querySelectorAll(".view").forEach((view) => {
    view.classList.toggle("active", view.id === `${state.view}View`);
  });
}

function render() {
  const evaluated = getEvaluatedRecords();
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

document.addEventListener("click", (event) => {
  const userButton = event.target.closest("[data-user]");
  const lensButton = event.target.closest("[data-lens]");
  const tabButton = event.target.closest("[data-view]");

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
  state.userId = "siteManager";
  state.lensId = "safety";
  state.rls = true;
  state.mask = true;
  state.showBlocked = false;
  state.view = "report";
  render();
});

render();
