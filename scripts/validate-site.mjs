import { readFile } from "node:fs/promises";

const requiredFiles = ["index.html", "styles.css", "app.js"];
const checks = [];

for (const file of requiredFiles) {
  const contents = await readFile(file, "utf8");
  checks.push([`${file} is not empty`, contents.trim().length > 0]);
}

const html = await readFile("index.html", "utf8");
const js = await readFile("app.js", "utf8");
const css = await readFile("styles.css", "utf8");

checks.push(["index.html links styles.css", html.includes('href="styles.css"')]);
checks.push(["index.html loads app.js", html.includes('src="app.js"')]);
checks.push(["RLS toggle exists", html.includes('id="rlsToggle"')]);
checks.push(["lens selector exists", html.includes('id="lensList"')]);
checks.push(["scenario selector exists", html.includes('id="scenarioList"')]);
checks.push(["scenario user and record data exists", js.includes("users: [") && js.includes("records: [")]);
checks.push(["five lenses per scenario exist", js.includes('id: "risk"') && js.includes('id: "pipeline"') && js.includes('id: "predictive"') && js.includes('id: "adoption"')]);
checks.push(["operational and commercial scenarios exist", js.includes('id: "operational"') && js.includes('id: "commercial"')]);
checks.push(["policy data exists", js.includes("const policies")]);
checks.push(["responsive styles exist", css.includes("@media")]);

const failures = checks.filter(([, passed]) => !passed);

if (failures.length) {
  console.error("Site validation failed:");
  for (const [name] of failures) {
    console.error(`- ${name}`);
  }
  process.exit(1);
}

console.log(`Site validation passed (${checks.length} checks).`);
