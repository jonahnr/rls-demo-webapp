const users = [
  {
    id: "exec",
    name: "Maya Chen",
    title: "Chief Revenue Officer",
    initials: "MC",
    role: "Executive",
    regions: ["North", "South", "East", "West"],
    domains: ["Sales", "Finance"],
    clearance: 3,
    purpose: "Can compare companywide performance, including finance-adjusted revenue."
  },
  {
    id: "regional",
    name: "Andre Brooks",
    title: "West Regional Manager",
    initials: "AB",
    role: "Regional manager",
    regions: ["West"],
    domains: ["Sales"],
    clearance: 2,
    purpose: "Can manage the West pipeline but cannot inspect other regions."
  },
  {
    id: "analyst",
    name: "Priya Nair",
    title: "Sales Operations Analyst",
    initials: "PN",
    role: "Analyst",
    regions: ["North", "West"],
    domains: ["Sales"],
    clearance: 1,
    purpose: "Can see sales activity in assigned regions with sensitive values masked."
  },
  {
    id: "partner",
    name: "Sam Rivera",
    title: "External Partner",
    initials: "SR",
    role: "Partner",
    regions: ["North"],
    domains: ["Channel"],
    clearance: 0,
    purpose: "Can only see approved channel rows for one region."
  }
];

const rows = [
  { account: "Aster Health", region: "North", domain: "Sales", revenue: 420000, sensitivity: 1, owner: "Field Sales" },
  { account: "Brightline Foods", region: "South", domain: "Sales", revenue: 280000, sensitivity: 1, owner: "Field Sales" },
  { account: "Corvus Energy", region: "West", domain: "Sales", revenue: 610000, sensitivity: 2, owner: "Enterprise Sales" },
  { account: "Delta Transit", region: "East", domain: "Finance", revenue: 355000, sensitivity: 3, owner: "Finance" },
  { account: "Evergreen Retail", region: "West", domain: "Sales", revenue: 190000, sensitivity: 1, owner: "Field Sales" },
  { account: "ForgeBank", region: "North", domain: "Finance", revenue: 870000, sensitivity: 3, owner: "Finance" },
  { account: "Harbor Media", region: "North", domain: "Channel", revenue: 135000, sensitivity: 0, owner: "Partner Sales" },
  { account: "Ion Robotics", region: "West", domain: "Channel", revenue: 240000, sensitivity: 1, owner: "Partner Sales" },
  { account: "Juniper Labs", region: "East", domain: "Sales", revenue: 510000, sensitivity: 2, owner: "Enterprise Sales" },
  { account: "Keystone Apparel", region: "South", domain: "Channel", revenue: 95000, sensitivity: 0, owner: "Partner Sales" }
];

const policies = [
  {
    id: "region",
    title: "Region scope",
    description: "Users only retrieve rows for assigned operating regions.",
    code: "row.region IN viewer.regions"
  },
  {
    id: "domain",
    title: "Data domain entitlement",
    description: "Certified domains decide which governed data products a user can query.",
    code: "row.domain IN viewer.domains"
  },
  {
    id: "sensitivity",
    title: "Sensitivity clearance",
    description: "High-risk financial or account-level data is hidden or masked by clearance.",
    code: "row.sensitivity <= viewer.clearance"
  }
];

const state = {
  userId: "regional",
  rls: true,
  mask: true,
  showBlocked: false,
  view: "report"
};

const els = {
  userList: document.querySelector("#userList"),
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

function evaluateRow(row, user) {
  const checks = {
    region: user.regions.includes(row.region),
    domain: user.domains.includes(row.domain),
    sensitivity: row.sensitivity <= user.clearance
  };
  const allowed = state.rls ? checks.region && checks.domain && checks.sensitivity : true;
  const canMask = state.rls && state.mask && checks.region && checks.domain && !checks.sensitivity;
  const visible = allowed || canMask || !state.rls;
  const reasons = [];

  if (!checks.region) reasons.push(`Region blocked: ${row.region}`);
  if (!checks.domain) reasons.push(`Domain blocked: ${row.domain}`);
  if (!checks.sensitivity) reasons.push(`Sensitivity ${row.sensitivity} exceeds clearance ${user.clearance}`);
  if (!state.rls) reasons.push("RLS disabled for demo comparison");

  return {
    ...row,
    allowed,
    masked: canMask,
    visible,
    reasons: reasons.length ? reasons : ["Allowed by all active policies"]
  };
}

function getEvaluatedRows() {
  const user = getUser();
  return rows.map((row) => evaluateRow(row, user));
}

function renderUsers() {
  els.userList.innerHTML = users.map((user) => `
    <button class="user-card ${user.id === state.userId ? "active" : ""}" data-user="${user.id}" type="button">
      <span class="avatar">${user.initials}</span>
      <span>
        <h3>${user.name}</h3>
        <p>${user.title}</p>
        <small>${user.purpose}</small>
      </span>
    </button>
  `).join("");
}

function renderMetrics(evaluated) {
  const allowed = evaluated.filter((row) => row.allowed);
  const visible = evaluated.filter((row) => row.visible);
  const blocked = state.rls ? evaluated.filter((row) => !row.visible) : [];
  const masked = evaluated.filter((row) => row.masked);
  const revenue = visible.reduce((sum, row) => sum + (row.masked ? 0 : row.revenue), 0);

  const metricData = [
    ["Visible rows", `${visible.length}/${rows.length}`, state.rls ? "Report only returns approved records." : "All rows are exposed while RLS is off."],
    ["Visible revenue", formatMoney(revenue), masked.length ? `${masked.length} sensitive row values are masked.` : "No visible values require masking."],
    ["Blocked records", blocked.length, "Rows removed before the report renders."],
    ["Active policies", state.rls ? 3 : 0, state.rls ? "Region, domain, and clearance are active." : "Governance controls are bypassed."]
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
  els.heroVisibleRows.textContent = `${visible.length} of ${rows.length} rows visible`;
  els.heroSummary.textContent = state.rls
    ? `${blocked.length} records are blocked before the dashboard query returns.`
    : "Every governed row is visible, showing the risk RLS prevents.";
  els.tablePill.textContent = state.rls ? "Filtered by policy" : "Unrestricted";
}

function renderChart(evaluated) {
  const visible = evaluated.filter((row) => row.visible);
  const totals = ["North", "South", "East", "West"].map((region) => ({
    region,
    revenue: visible
      .filter((row) => row.region === region && !row.masked)
      .reduce((sum, row) => sum + row.revenue, 0)
  }));
  const max = Math.max(...totals.map((item) => item.revenue), 1);

  els.barChart.innerHTML = totals.map((item) => `
    <div class="bar-row">
      <strong>${item.region}</strong>
      <div class="bar-track"><div class="bar-fill" style="width: ${(item.revenue / max) * 100}%"></div></div>
      <span>${formatMoney(item.revenue).replace(".00", "")}</span>
    </div>
  `).join("");
}

function renderRows(evaluated) {
  const rowsToRender = evaluated.filter((row) => row.visible || state.showBlocked);

  els.reportRows.innerHTML = rowsToRender.map((row) => {
    const status = row.allowed ? "Allowed" : row.masked ? "Masked" : "Blocked";
    const tagClass = row.allowed ? "allowed" : row.masked ? "masked" : "blocked";
    const revenue = row.masked ? "Masked" : formatMoney(row.revenue);
    return `
      <tr class="${!row.visible ? "blocked" : ""}">
        <td>${row.account}</td>
        <td>${row.region}</td>
        <td>${row.domain}</td>
        <td>${revenue}</td>
        <td>Level ${row.sensitivity}</td>
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
  els.auditList.innerHTML = evaluated.map((row) => {
    const decision = row.allowed ? "Allow" : row.masked ? "Mask value" : "Deny row";
    const tagClass = row.allowed ? "allowed" : row.masked ? "masked" : "blocked";
    return `
      <article class="audit-item">
        <span class="tag ${tagClass}">${decision}</span>
        <div>
          <strong>${row.account}</strong>
          <small>${row.region} / ${row.domain} / sensitivity ${row.sensitivity}</small>
        </div>
        <small>${row.reasons.join("; ")}</small>
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
  const evaluated = getEvaluatedRows();
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
  const tabButton = event.target.closest("[data-view]");

  if (userButton) {
    state.userId = userButton.dataset.user;
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
  state.userId = "regional";
  state.rls = true;
  state.mask = true;
  state.showBlocked = false;
  state.view = "report";
  render();
});

render();
