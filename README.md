# 🔒 Ciphera Security Scanner

![GitHub Actions](https://img.shields.io/badge/github%20actions-security--scan-blue)
![License](https://img.shields.io/badge/license-MIT-green)
![Open Source](https://img.shields.io/badge/open-source-success)

> A self-contained GitHub Action that automatically scans your code for security vulnerabilities and creates pull requests and issues for critical findings.

## 🌟 Why Ciphera?

Ciphera Security Scanner is different from other security tools:

- **No external services** - Everything runs on GitHub's servers
- **No signup required** - Just copy one file and you're done
- **Not noisy** - Limits findings to ~15 to avoid spam
- **Actionable** - Only reports critical/high severity issues that matter
- **Smart consolidation** - Groups duplicates so you don't get 100 alerts for the same issue
- **Free forever** - Works on GitHub's free tier

## ✨ Features

### 🚀 Automated Protection
- **Zero setup** required - just add the workflow file
- **Runs automatically** on every push to `main` or `master` branch
- **Creates pull requests** with detailed security findings
- **Creates GitHub issues** for critical vulnerabilities
- **Deletes old branches** - keeps your repo clean

### 🔍 Smart Detection
- **Semgrep integration** - industry-leading static analysis
- **Custom security checks** - detects secrets, eval, SQL injection
- **Consolidates duplicates** - groups similar findings
- **Prioritizes severity** - only shows critical/high issues
- **Limits findings** - max ~15 to avoid overwhelming developers

### 📊 What Gets Detected

#### 🚨 Critical Severity
- SQL injection vulnerabilities
- Command injection
- Insecure deserialization
- Path traversal attacks
- Arbitrary code execution

#### ⚠️ High Severity
- Hardcoded API keys, tokens, credentials
- Use of `eval()`, `Function()`, or similar dangerous functions
- Weak cryptographic practices
- Sensitive data in logs or error messages
- Insecure random number generation

#### ℹ️ Medium Severity
- Missing input validation
- Insecure configurations
- Outdated dependencies with known vulnerabilities

## 🚀 Quick Start (30 seconds)

### Step 1: Copy the Workflow File

Copy [`security-scan.yml`](security-scan.yml) to your repository at:

```
your-repo/.github/workflows/security-scan.yml
```

### Step 2: Commit and Push

```bash
git add .github/workflows/security-scan.yml
git commit -m "Add Ciphera security scanner"
git push origin main
```

### Step 3: You're Protected!

That's it! The scanner will now:
- ✅ Run automatically on every push
- ✅ Create PRs with findings
- ✅ Create issues for critical vulnerabilities
- ✅ Delete old PR branches to keep your repo clean

## 📖 How It Works

```
┌───────────────────────────────────────────────────────────────┐
│                     THE WORKFLOW                              │
├───────────────────────────────────────────────────────────────┤
│                                                                  │
│  1. Developer pushes code to main/master                         │
│         │                                                          │
│         ▼                                                          │
│  2. GitHub Action triggers automatically                         │
│         │                                                          │
│         ▼                                                          │
│  3. Security Scanner runs:                                      │
│     • Downloads and runs Semgrep (industry-leading scanner)       │
│     • Runs custom checks (secrets, eval, SQL injection patterns)   │
│     • Groups duplicate findings                                 │
│     • Limits to ~15 critical/high issues                        │
│         │                                                          │
│         ▼                                                          │
│  4. Creates Pull Request:                                      │
│     • Lists all findings with file, line number, severity       │
│     • Includes code snippets for each issue                      │
│     • Labels PR as "security" and "automated"                  │
│         │                                                          │
│         ▼                                                          │
│  5. (If critical issues found) Creates GitHub Issue:           │
│     • Alerts team immediately                                  │
│     • Lists all critical vulnerabilities                       │
│         │                                                          │
│         ▼                                                          │
│  6. Uploads results as artifact for download                    │
│                                                                  │
└───────────────────────────────────────────────────────────────┘
```

## 📝 Example Output

### Pull Request Example:

```markdown
## 🔒 Security Scan Results

**Repository:** username/repo
**Commit:** abc123def456

### Summary

- **Critical:** 2
- **High:** 5
- **Total Issues:** 7

### Findings

🚨 **SQL Injection Vulnerability**
- **File:** `src/database.ts`
- **Line:** 45
- **Severity:** CRITICAL

⚠️ **Hardcoded credential detected**
- **File:** `.env`
- **Line:** 3
- **Severity:** HIGH
```

## 🔧 Advanced Usage

### Only Run on Specific Branches

Edit the trigger in `security-scan.yml`:

```yaml
on:
  push:
    branches: [ main ]  # Only scan main branch
```

### Manual Scan Trigger

You can manually trigger a scan from the Actions tab in GitHub, or use the GitHub CLI:

```bash
gh workflow run security-scan.yml
```

### Adjust Maximum Findings

Edit this line in the workflow to change the limit:

```javascript
.slice(0, 15);  // Change 15 to your preferred number
```

### Change Severity Threshold

To only show CRITICAL issues:

```javascript
const criticalAndHigh = unique
  .filter(f => f.severity === 'CRITICAL')
  .slice(0, 15);
```

To include MEDIUM severity:

```javascript
const criticalAndHigh = unique
  .filter(f => ['CRITICAL', 'HIGH', 'MEDIUM'].includes(f.severity))
  .slice(0, 15);
```

### Add Custom Detection Patterns

Edit the custom checks section in the workflow:

```javascript
// Example: Check for console.log in production code
if (content.match(/console\.log\(/)) {
  findings.push({
    file: file,
    line: content.split('\n').findIndex(l => l.match(/console\.log\(/)) + 1,
    title: 'console.log statement detected',
    severity: 'LOW',
    code: 'Remove console.log before production'
  });
}
```

## 🎯 Use Cases

### For Open Source Projects
- Automatically scan pull requests for security issues
- Alert maintainers to critical vulnerabilities
- Build trust with users by showing security commitment

### For Private Repositories
- Catch security issues before they reach production
- Educate developers about security best practices
- Maintain security standards across teams

### For Enterprise Teams
- Enforce security policies automatically
- Reduce security review burden
- Track security debt over time

## 🔒 Security & Privacy

- **No data leaves GitHub** - All scanning happens on GitHub's servers
- **No external dependencies** - Uses only open-source tools (Semgrep)
- **No code storage** - We don't store or analyze your code externally
- **MIT Licensed** - Free to inspect, modify, and distribute

## 🛠️ Under the Hood

### Tools Used
- **Semgrep** - Static analysis engine with 2000+ built-in rules
- **GitHub Actions** - Workflow automation
- **Node.js** - Custom processing logic

### Performance
- **Fast** - Typical scan completes in 30-60 seconds
- **Efficient** - Only scans changed files when possible
- **Smart** - Caches results to avoid redundant work

## 📊 Comparison with Other Tools

| Feature | Ciphera | SonarCloud | Snyk | CodeQL |
|---------|---------|-----------|------|--------|
| Free for public repos | ✅ | ❌ | ✅* | ✅ |
| No signup required | ✅ | ❌ | ❌ | ❌ |
| Creates PRs automatically | ✅ | ❌ | ❌ | ❌ |
| Creates issues for critical | ✅ | ❌ | ❌ | ❌ |
| Limits findings to avoid spam | ✅ | ❌ | ❌ | ❌ |
| Runs entirely on GitHub | ✅ | ❌ | ❌ | ❌ |
| Open source | ✅ | ❌ | ❌ | ✅ |

_* Snyk has free tier for public repos_

## 🤝 Contributing

We welcome contributions! To contribute:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Commit your changes (`git commit -m 'Add amazing feature'`)
5. Push to the branch (`git push origin feature/amazing-feature`)
6. Open a Pull Request

## 📄 License

MIT License - see [LICENSE](LICENSE) file for details.

This means you can:
- ✅ Use in any project (personal or commercial)
- ✅ Modify the code
- ✅ Distribute it
- ✅ Sell it (if you want)

## 🌟 Acknowledgments

Built with:
- [Semgrep](https://semgrep.dev/) - Return-oriented static analysis
- [GitHub Actions](https://github.com/features/actions) - Workflow automation
- [Peter Evans/create-pull-request](https://github.com/peter-evans/create-pull-request) - PR creation action

## 📞 Support

- **Issues**: https://github.com/shanyukollipara/Ciphera-Labs/issues
- **Discussions**: https://github.com/shanyukollipara/Ciphera-Labs/discussions

## 🌟 Star Us!

If you find this tool useful, please consider giving us a star on GitHub!

---

**Made with ❤️ by [Ciphera Labs](https://github.com/shanyukollipara/Ciphera-Labs)**

*Secure your code, one commit at a time.*
