const fs = require('fs');

function processFile(filename) {
  let code = fs.readFileSync(filename, 'utf8');
  
  if (!code.includes('useCurrency')) {
    code = code.replace(/import \{ useOnboarding \} from "@\/context\/OnboardingContext";/, 'import { useOnboarding } from "@/context/OnboardingContext";\nimport { useCurrency } from "@/hooks/useCurrency";');
    
    // Inject useCurrency
    code = code.replace(/const \{ state \} = useOnboarding\(\);/, 'const { state } = useOnboarding();\n  const { formatAmt, currencyCode } = useCurrency();');
  }

  // Replace text literals
  code = code.replace(/\$\{([a-zA-Z\._]+)\.toLocaleString\(\)\}\s+AED/g, '${formatAmt($1)} ${currencyCode}');
  
  code = code.replace(/([A-Z_a-z]+)\.toLocaleString\(\)\s+AED/g, '{formatAmt($1)} {currencyCode}');

  code = code.replace(/\{([A-Z_a-z]+)\.toLocaleString\(\)\}\s+AED/g, '{formatAmt($1)} {currencyCode}');
  
  code = code.replace(/>\{([A-Z_a-z]+)\.toLocaleString\(\)\}\s*AED</g, '>{formatAmt($1)} {currencyCode}<');
  code = code.replace(/>([0-9~–\.-]*)\{([A-Z_a-z]+)\.toLocaleString\(\)\}([0-9~–\.-]*)\s*AED</g, '>$1{formatAmt($2)}$3 {currencyCode}<');
  code = code.replace(/>~\{([A-Z_a-z]+)\.toLocaleString\(\)\}–\{([A-Z_a-z]+)\.toLocaleString\(\)\}\s*AED</g, '>~{formatAmt($1)}–{formatAmt($2)} {currencyCode}<');

  // Specific hardcoded constants
  code = code.replace(/~\{COSTS.([A-Z_]+)\}-\{COSTS.([A-Z_]+)\}\s+AED/g, '~{formatAmt(COSTS.$1)}–{formatAmt(COSTS.$2)} {currencyCode}');
  code = code.replace(/~\{COSTS.([A-Z_]+)\}\s+AED/g, '~{formatAmt(COSTS.$1)} {currencyCode}');
  code = code.replace(/\{COSTS.([A-Z_]+)\.toLocaleString\(\)\}\s+AED/g, '{formatAmt(COSTS.$1)} {currencyCode}');
  
  code = code.replace(/>\{COSTS.([A-Z_]+)\.toLocaleString\(\)\}\s+AED</g, '>{formatAmt(COSTS.$1)} {currencyCode}<');
  
  code = code.replace(/costs\.\s*AED/, 'costs. {currencyCode}'); // Handle text

  // manual replacements matching exact AED strings:
  // e.g. "55 AED" -> "{formatAmt(55)} {currencyCode}"
  // e.g. "15 AED" -> "{formatAmt(15)} {currencyCode}"
  code = code.replace(/\b15 AED\b/g, '{formatAmt(15)} {currencyCode}');
  code = code.replace(/\b55 AED\b/g, '{formatAmt(55)} {currencyCode}');
  
  // Specific span classes with AED
  code = code.replace(/>AED<\/span>/g, '>{currencyCode}</span>');

  fs.writeFileSync(filename, code);
}

processFile('src/pages/BudgetPlanner.tsx');
processFile('src/components/cost/CostEstimator.tsx');
