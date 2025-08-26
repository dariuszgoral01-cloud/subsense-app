#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Konfiguracja skanowania
const config = {
  // Rozszerzenia plików do skanowania
  extensions: ['.js', '.jsx', '.ts', '.tsx', '.json', '.md', '.sql', '.prisma', '.env.example'],
  
  // Foldery do pominięcia
  ignoreFolders: ['node_modules', '.next', '.git', 'dist', 'build', '.vercel'],
  
  // Pliki do pominięcia
  ignoreFiles: ['.DS_Store', 'package-lock.json', 'yarn.lock'],
  
  // Maksymalny rozmiar pliku w bajtach (100KB)
  maxFileSize: 100 * 1024
};

class ProjectScanner {
  constructor(rootPath = './') {
    this.rootPath = path.resolve(rootPath);
    this.report = {
      timestamp: new Date().toISOString(),
      projectPath: this.rootPath,
      structure: {},
      files: [],
      summary: {
        totalFiles: 0,
        totalLines: 0,
        fileTypes: {},
        largestFiles: []
      }
    };
  }

  shouldIgnore(itemPath, isDirectory) {
    const itemName = path.basename(itemPath);
    
    if (isDirectory) {
      return config.ignoreFolders.includes(itemName);
    }
    
    if (config.ignoreFiles.includes(itemName)) {
      return true;
    }
    
    const ext = path.extname(itemName);
    return !config.extensions.includes(ext);
  }

  countLines(content) {
    return content.split('\n').length;
  }

  scanDirectory(dirPath, relativePath = '') {
    const items = fs.readdirSync(dirPath);
    const structure = {};

    for (const item of items) {
      const fullPath = path.join(dirPath, item);
      const relativeItemPath = path.join(relativePath, item);
      const stat = fs.statSync(fullPath);

      if (stat.isDirectory()) {
        if (!this.shouldIgnore(fullPath, true)) {
          structure[item] = this.scanDirectory(fullPath, relativeItemPath);
        }
      } else {
        if (!this.shouldIgnore(fullPath, false) && stat.size <= config.maxFileSize) {
          try {
            const content = fs.readFileSync(fullPath, 'utf8');
            const lines = this.countLines(content);
            const ext = path.extname(item);

            const fileInfo = {
              path: relativeItemPath,
              size: stat.size,
              lines: lines,
              extension: ext,
              content: content,
              lastModified: stat.mtime.toISOString()
            };

            this.report.files.push(fileInfo);
            structure[item] = `FILE (${lines} lines, ${stat.size} bytes)`;

            // Update summary
            this.report.summary.totalFiles++;
            this.report.summary.totalLines += lines;
            this.report.summary.fileTypes[ext] = (this.report.summary.fileTypes[ext] || 0) + 1;

          } catch (error) {
            structure[item] = `ERROR: ${error.message}`;
          }
        }
      }
    }

    return structure;
  }

  generateReport() {
    console.log('🔍 Skanowanie projektu SubSense...');
    
    this.report.structure = this.scanDirectory(this.rootPath);
    
    // Sortuj pliki według rozmiaru
    this.report.summary.largestFiles = this.report.files
      .sort((a, b) => b.size - a.size)
      .slice(0, 10)
      .map(f => ({ path: f.path, size: f.size, lines: f.lines }));

    return this.report;
  }

  saveReport(outputPath = 'subsense-project-scan.json') {
    const report = this.generateReport();
    fs.writeFileSync(outputPath, JSON.stringify(report, null, 2));
    console.log(`✅ Raport zapisany: ${outputPath}`);
    return outputPath;
  }

  printSummary() {
    const report = this.generateReport();
    
    console.log('\n📊 PODSUMOWANIE PROJEKTU SUBSENSE');
    console.log('================================');
    console.log(`📁 Ścieżka: ${report.projectPath}`);
    console.log(`📄 Pliki: ${report.summary.totalFiles}`);
    console.log(`📝 Linie kodu: ${report.summary.totalLines}`);
    console.log('\n📋 Typy plików:');
    
    Object.entries(report.summary.fileTypes).forEach(([ext, count]) => {
      console.log(`   ${ext}: ${count} plików`);
    });

    console.log('\n🔍 KLUCZOWE PLIKI DO ANALIZY:');
    console.log('============================');
    
    const keyFiles = [
      'components/add-subscription.tsx',
      'pages/api/subscriptions',
      'pages/dashboard',
      'prisma/schema.prisma',
      'package.json'
    ];

    keyFiles.forEach(keyFile => {
      const found = report.files.find(f => f.path.includes(keyFile));
      if (found) {
        console.log(`✅ ${found.path} (${found.lines} linii)`);
      } else {
        console.log(`❌ Nie znaleziono: ${keyFile}`);
      }
    });

    console.log('\n🎯 NASTĘPNE KROKI:');
    console.log('==================');
    console.log('1. Sprawdź czy wszystkie kluczowe pliki istnieją');
    console.log('2. Przeanalizuj integrację API endpoints');
    console.log('3. Zweryfikuj przepływ danych dashboard → API → baza');
    
    return report;
  }

  // Metoda do wygenerowania kompaktowego raportu dla Claude
  generateClaudeReport() {
    const report = this.generateReport();
    let claudeReport = `# SubSense Project Analysis\n\n`;
    
    claudeReport += `**Project Structure:**\n`;
    claudeReport += this.structureToString(report.structure);
    
    claudeReport += `\n\n**Key Files Content:**\n`;
    claudeReport += `========================\n\n`;
    
    // Priorytetowe pliki dla analizy
    const priorities = [
      'add-subscription.tsx',
      'subscriptions.js',
      'subscriptions.ts', 
      'dashboard',
      'schema.prisma',
      'package.json'
    ];
    
    priorities.forEach(priority => {
      const files = report.files.filter(f => 
        f.path.toLowerCase().includes(priority.toLowerCase())
      );
      
      files.forEach(file => {
        claudeReport += `## ${file.path}\n`;
        claudeReport += `\`\`\`${this.getLanguageFromExtension(file.extension)}\n`;
        claudeReport += file.content;
        claudeReport += `\n\`\`\`\n\n`;
      });
    });
    
    return claudeReport;
  }

  structureToString(obj, indent = 0) {
    let result = '';
    const spaces = '  '.repeat(indent);
    
    Object.entries(obj).forEach(([key, value]) => {
      if (typeof value === 'object') {
        result += `${spaces}📁 ${key}/\n`;
        result += this.structureToString(value, indent + 1);
      } else {
        result += `${spaces}📄 ${key}\n`;
      }
    });
    
    return result;
  }

  getLanguageFromExtension(ext) {
    const mapping = {
      '.js': 'javascript',
      '.jsx': 'jsx',
      '.ts': 'typescript', 
      '.tsx': 'tsx',
      '.json': 'json',
      '.prisma': 'prisma',
      '.md': 'markdown',
      '.sql': 'sql'
    };
    return mapping[ext] || 'text';
  }
}

// CLI Usage
if (require.main === module) {
  const args = process.argv.slice(2);
  const command = args[0] || 'summary';
  
  const scanner = new ProjectScanner();
  
  switch (command) {
    case 'summary':
      scanner.printSummary();
      break;
    case 'save':
      scanner.saveReport();
      break;
    case 'claude':
      const claudeReport = scanner.generateClaudeReport();
      fs.writeFileSync('subsense-for-claude.md', claudeReport);
      console.log('✅ Raport dla Claude zapisany: subsense-for-claude.md');
      console.log('📋 Skopiuj zawartość tego pliku i wklej w rozmowie z Claude');
      break;
    default:
      console.log('Użycie: node scanner.js [summary|save|claude]');
  }
}

module.exports = ProjectScanner;