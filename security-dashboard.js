#!/usr/bin/env node

/**
 * Local Security Dashboard
 * Run this locally to view security scan results
 *
 * Usage: node security-dashboard.js <path-to-repo>
 */

const fs = require('fs');
const path = require('path');
const http = require('http');

const PORT = 3001;

// Find security results
function findResults(repoPath) {
  const resultsPath = path.join(repoPath, 'security-results');

  if (!fs.existsSync(resultsPath)) {
    return null;
  }

  const findingsFile = path.join(resultsPath, 'final-findings.json');

  if (!fs.existsSync(findingsFile)) {
    return null;
  }

  return JSON.parse(fs.readFileSync(findingsFile, 'utf8'));
}

// Generate HTML dashboard
function generateDashboard(data) {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Security Scan Dashboard</title>
  <style>
    * { box-sizing: border-box; }
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      max-width: 1400px;
      margin: 0 auto;
      padding: 20px;
      background: #f5f5f5;
    }
    .header {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      padding: 30px;
      border-radius: 12px;
      margin-bottom: 30px;
    }
    .header h1 { margin: 0 0 10px 0; }
    .header p { margin: 0; opacity: 0.9; }
    .summary {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 20px;
      margin-bottom: 30px;
    }
    .card {
      background: white;
      padding: 25px;
      border-radius: 12px;
      box-shadow: 0 2px 10px rgba(0,0,0,0.1);
      text-align: center;
    }
    .card h3 { margin: 0 0 10px 0; color: #666; font-size: 14px; }
    .card .number { font-size: 48px; font-weight: bold; margin: 0; }
    .card.critical .number { color: #dc2626; }
    .card.high .number { color: #f59e0b; }
    .card.medium .number { color: #6366f1; }
    .card.low .number { color: #22c55e; }
    .card.total .number { color: #1f2937; }
    .findings {
      background: white;
      border-radius: 12px;
      box-shadow: 0 2px 10px rgba(0,0,0,0.1);
      overflow: hidden;
    }
    .findings-header {
      background: #f9fafb;
      padding: 20px;
      border-bottom: 1px solid #e5e7eb;
    }
    .findings-header h2 { margin: 0; }
    .finding {
      padding: 20px;
      border-bottom: 1px solid #e5e7eb;
      display: flex;
      gap: 15px;
      align-items: start;
    }
    .finding:last-child { border-bottom: none; }
    .finding-icon {
      width: 40px;
      height: 40px;
      border-radius: 8px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 20px;
      flex-shrink: 0;
    }
    .finding-icon.critical { background: #fee; }
    .finding-icon.high { background: #fef3c7; }
    .finding-content { flex: 1; }
    .finding-title {
      font-weight: 600;
      margin-bottom: 5px;
      color: #1f2937;
    }
    .finding-meta {
      font-size: 13px;
      color: #6b7280;
      margin-bottom: 8px;
    }
    .finding-code {
      background: #1f2937;
      color: #e5e7eb;
      padding: 12px;
      border-radius: 6px;
      font-family: 'Monaco', 'Menlo', monospace;
      font-size: 13px;
      overflow-x: auto;
    }
    .badge {
      display: inline-block;
      padding: 4px 10px;
      border-radius: 20px;
      font-size: 11px;
      font-weight: 600;
      text-transform: uppercase;
    }
    .badge.CRITICAL { background: #dc2626; color: white; }
    .badge.HIGH { background: #f59e0b; color: white; }
    .badge.MEDIUM { background: #6366f1; color: white; }
    .badge.LOW { background: #22c55e; color: white; }
    .empty {
      text-align: center;
      padding: 60px 20px;
      color: #9ca3af;
    }
    .empty-icon { font-size: 64px; margin-bottom: 20px; }
  </style>
</head>
<body>
  <div class="header">
    <h1>🔒 Security Scan Results</h1>
    <p>Security findings for your repository</p>
  </div>

  <div class="summary">
    <div class="card critical">
      <h3>Critical</h3>
      <p class="number">${data.critical || 0}</p>
    </div>
    <div class="card high">
      <h3>High</h3>
      <p class="number">${data.high || 0}</p>
    </div>
    <div class="card total">
      <h3>Total Issues</h3>
      <p class="number">${data.total || 0}</p>
    </div>
  </div>

  <div class="findings">
    <div class="findings-header">
      <h2>Findings Requiring Attention</h2>
    </div>
    ${data.findings && data.findings.length > 0 ? data.findings.map(f => `
      <div class="finding">
        <div class="finding-icon ${f.severity.toLowerCase()}">
          ${f.severity === 'CRITICAL' ? '🚨' : f.severity === 'HIGH' ? '⚠️' : 'ℹ️'}
        </div>
        <div class="finding-content">
          <div class="finding-title">
            <span class="badge ${f.severity}">${f.severity}</span>
            ${f.title}
          </div>
          <div class="finding-meta">
            📁 ${f.file} • line ${f.line}
          </div>
          ${f.code ? `<div class="finding-code"><code>${f.code.replace(/</g, '&lt;')}</code></div>` : ''}
        </div>
      </div>
    `).join('') : `
      <div class="empty">
        <div class="empty-icon">✅</div>
        <h3>No Critical or High Issues Found!</h3>
        <p>Your code passed the security scan successfully.</p>
      </div>
    `}
  </div>

  <script>
    // Auto-refresh every 30 seconds
    setTimeout(() => location.reload(), 30000);
  </script>
</body>
</html>
  `;
}

// Start server
function startServer(repoPath) {
  const data = findResults(repoPath);

  if (!data) {
    console.log('❌ No security scan results found!');
    console.log('Please run the security scan first, or specify a valid repository path.');
    console.log('');
    console.log('Usage: node security-dashboard.js <path-to-repo>');
    return;
  }

  const html = generateDashboard(data);

  const server = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(html);
  });

  server.listen(PORT, () => {
    console.log('');
    console.log('🔒 Security Dashboard Running!');
    console.log('');
    console.log(`   Open: http://localhost:${PORT}`);
    console.log('');
    console.log(`   Critical: ${data.critical}`);
    console.log(`   High: ${data.high}`);
    console.log(`   Total: ${data.total}`);
    console.log('');
    console.log('Press Ctrl+C to stop');
    console.log('');
  });
}

// CLI
const repoPath = process.argv[2] || process.cwd();

console.log('');
console.log('🔍 Scanning for security results...');
console.log(`   Path: ${repoPath}`);

startServer(repoPath);
