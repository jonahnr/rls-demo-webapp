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
checks.push(["user and safety record data exists", js.includes("const users") && js.includes("const records")]);
checks.push(["five reporting lenses exist", js.includes('id: "safety"') && js.includes('id: "cost"') && js.includes('id: "compliance"') && js.includes('id: "leading"') && js.includes('id: "predictive"')]);
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
