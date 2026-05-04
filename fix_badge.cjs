const fs = require('fs');
let content = fs.readFileSync('src/constants/nationalityConfig.ts', 'utf8');
content = content.replace(/badgeColor: "blue"/g, 'badgeColor: "amber"');
fs.writeFileSync('src/constants/nationalityConfig.ts', content, 'utf8');

let dashboard = fs.readFileSync('src/pages/Dashboard.tsx', 'utf8');
dashboard = dashboard.replace(/badgeColor === 'blue'/g, "badgeColor === 'amber'");
fs.writeFileSync('src/pages/Dashboard.tsx', dashboard, 'utf8');
