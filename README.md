# ⚡️ Node.js + TypeScript Starter Template

A professional-grade template to kickstart your Node.js + TypeScript projects with speed, structure, and style in just one command. Built with best practices, scalability, and maintainability in mind.

## 🧰 Features

-✅ TypeScript pre-configured — Ready to go with strict typing for robust code.

⚙️ ESLint + Prettier — Consistent code formatting & linting to keep your codebase clean.

🧹 Commitizen + Husky + lint-staged — Commit with confidence and maintain consistent commit messages.

🔒 Secure .env — Auto-generated with openssl for safer environment variable management.

🧭 Auto-created project structure — Organized structure for routes, controllers, models, and services.

🎯 Path aliases — Clean and readable imports using path aliases.

🔨 Custom tidy command — Lint, format, and make your code shine in one go.

📂 Test folder structure — Organized test folders for controllers, services, middlewares, and utils.

📂 Folder Structure

src/
├── config/
├── controllers/
├── middlewares/
├── models/
├── routes/
├── services/
├── utils/
├── validations/

tests/
├── controllers/
├── services/
├── middlewares/
├── utils/

public/

## 🚀 Getting Started

**Clone the repository**
git clone https://github.com/yourUserName/newNodeTemplate.git
cd newNodeTemplate
npm install
chmod +x init.sh
./init.sh

## 🧼 Lint & Format

---

1. Manual (long version)

npm run lint:fix && npm run format

2. The shortcut you deserve

tidy

3. Forgot to tidy up?

I got your back, boss — it runs automatically on commit 😎
(lens drop moment)

## 💬 Standardized Commits

Tired of messy commit messages? Or maybe you're still seeing things like fix stuff or yo arreglé eso que rompí jeje in your team history?

Let’s commit like PROs. 💼😎

This template comes with Commitizen + Husky + lint-staged all set up to guide you (or your team) to write beautiful, consistent commit messages.

It uses a custom format like:

const msg = `${answers.date} ${answers.version} ${answers.type}: ${answers.description} Jira/Trello: ${answers.jira} ReadyToRelease: ${answers.ready}`;

That means your commits will look like:

2025-04-14 v1.2.3 feat: Add login form component Jira: ABC-123 ReadyToRelease: ✅

Want to go even further? You could automate the ReadyToRelease field based on your test results.
This is just a base, go ahead and make it yours.

## 🕳️ Bypassing the rules

Need to make a quick commit and skip the checks (we won’t judge 👀)?
Use the --no-verify flag:

git commit -m "hotfix: emergency fix" --no-verify

```bash

```
