import { NATIONALITY_CONFIG } from "@/constants/nationalityConfig";
import { UNIVERSITY_CONFIG, DEFAULT_UNIVERSITY_CONFIG } from "@/constants/universityConfig";

export interface StudentConfig {
  primaryAlert: any | null;
  secondaryAlert: any | null;
  additionalTasks: any[];
  priorityTask: any | null;
  locationNote: string | null;
  textOverrides: Record<string, boolean>;
}

export function getStudentConfig(nationality: string, university: string): StudentConfig {
  const natConfig = NATIONALITY_CONFIG[nationality] || NATIONALITY_CONFIG['Other'];
  let uniConfig = DEFAULT_UNIVERSITY_CONFIG;

  // Let's find the university config - it might not map 1:1 if the dropdown stores full names instead of acronyms.
  // Assuming the user's university state holds the full name or acronym. 
  // Let's do a loose match or just object lookup.
  const uniKeys = Object.keys(UNIVERSITY_CONFIG);
  const matchedKey = uniKeys.find(key => 
    university === key || UNIVERSITY_CONFIG[key].fullName === university
  );

  if (matchedKey) {
    uniConfig = { ...DEFAULT_UNIVERSITY_CONFIG, ...UNIVERSITY_CONFIG[matchedKey] } as any;
  }

  return {
    primaryAlert: uniConfig.universityAlert || null,
    secondaryAlert: {
      type: natConfig.alertType,
      title: natConfig.alertTitle,
      body: natConfig.alertBody,
      verifiedContent: natConfig.verifiedContent
    },
    additionalTasks: natConfig.additionalTasks || [],
    priorityTask: (uniConfig as any).priorityTask || null,
    locationNote: (uniConfig as any).locationNote || null,
    textOverrides: (uniConfig as any).overrides || {}
  };
}
