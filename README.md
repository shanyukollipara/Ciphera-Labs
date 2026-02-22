# 🔒 Ciphera Security Scanner

![GitHub Actions](https://img.shields.io/badge/github%20actions-security--scan-blue)
![License](https://img.shields.io/badge/license-MIT-green)

> A self-contained GitHub Action that scans your code for security vulnerabilities.

## ✨ Features

- **Zero Setup** - Just add the workflow file
- **Automatic** - Runs on every push to main/master
- **Creates PRs** - Pull requests with findings
- **Creates Issues** - For critical vulnerabilities
- **Free Forever** - Runs on GitHub's free tier

## 🚀 Quick Start

### Step 1: Copy `security-scan.yml` to your repo at `.github/workflows/security-scan.yml`

### Step 2: Push

```bash
git add .github/workflows/security-scan.yml
git commit -m "Add Ciphera security scanner"
git push origin main
```

### Done! It will now scan every push automatically.

## 📋 What Gets Detected

- 🚨 SQL injection, Command injection
- ⚠️ Hardcoded credentials, eval() usage
- ⚠️ Weak cryptography, data exposure

## 📄 License

MIT License - Free for any project!

---

**Made with ❤️ by Ciphera Labs**
