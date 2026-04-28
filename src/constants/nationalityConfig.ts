/*
LANDED — NATIONALITY RESEARCH TRACKER
=====================================
VERIFIED ✓
- Indian (attestation path confirmed)
- Pakistani (attestation path confirmed)  
- Bangladeshi (attestation path confirmed)
- Filipino (DFA authentication confirmed)
- American / British / German / French 
  (simplified process confirmed)

PENDING RESEARCH ⏳
Priority order for next research sprint:
1. Egyptian — largest cohort in UAE universities
2. Nigerian — specific processing time differences
3. Jordanian — travel document considerations
4. Syrian — travel document considerations
5. Palestinian — complex travel document situation
6. Iranian — specific banking/process considerations
7. Russian — verify current process post-2022
8. Somali — complex visa process
9. Kazakhstani — verify process

Research sources to use:
- gdrfa.gov.ae (Dubai visa authority)
- icp.gov.ae (Emirates ID / residency)
- mofa.gov.ae (attestation requirements)
- UAE Embassy websites in each country
- University Student Affairs offices (call directly)
- Student community validation (Reddit r/dubai, 
  university WhatsApp groups)

DO NOT add content to any nationality config 
without two independent verified sources.
*/
export const NATIONALITY_CONFIG: Record<string, any> = {
  Indian: {
    tier: "A_ATTESTATION",
    verifiedContent: true,
    alertType: "warning",
    alertTitle: "⚠ Action Required Before You Arrive",
    alertBody: "As an Indian student, you need to complete document attestation before your UAE student visa can be processed. This takes 3–6 weeks — start as soon as you receive your offer letter.",
    additionalTasks: [
      {
        id: "attestation_moe",
        title: "Attest documents at Indian Ministry of Education",
        description: "Your academic certificates must be attested by the Indian Ministry of Education (or state education board) before UAE visa processing.",
        timeline: "Allow 1–2 weeks",
        priority: "FIRST",
        badge: "For Indian students",
        badgeColor: "blue",
        source: "UAE GDRFA requirement for South Asian nationalities"
      },
      {
        id: "attestation_mofa_india",
        title: "Attest documents at Indian Ministry of External Affairs (MEA)",
        description: "After Ministry of Education attestation, documents must be attested by Indian MEA.",
        timeline: "Allow 1 week",
        priority: "HIGH",
        badge: "For Indian students",
        badgeColor: "blue",
        source: "UAE GDRFA requirement"
      },
      {
        id: "attestation_uae_embassy_india",
        title: "Attest documents at UAE Embassy in India",
        description: "Final pre-arrival attestation step. UAE Embassy locations in India: New Delhi (main), Mumbai, Chennai, Kolkata.",
        timeline: "Allow 1–2 weeks",
        priority: "HIGH",
        badge: "For Indian students",
        badgeColor: "blue",
        source: "UAE Embassy India — official requirement"
      }
    ],
    timelineWarning: "Add 4–6 weeks to your pre-arrival planning for attestation process",
    verificationSource: "UAE GDRFA, UAE Embassy India"
  },

  Pakistani: {
    tier: "A_ATTESTATION",
    verifiedContent: true,
    alertType: "warning",
    alertTitle: "⚠ Action Required Before You Arrive",
    alertBody: "As a Pakistani student, document attestation is required before UAE student visa processing. Start immediately after receiving your offer letter.",
    additionalTasks: [
      {
        id: "attestation_hec",
        title: "Attest documents at Higher Education Commission (HEC) Pakistan",
        description: "Academic certificates must be verified by HEC before further attestation.",
        timeline: "Allow 1–2 weeks",
        priority: "FIRST",
        badge: "For Pakistani students",
        badgeColor: "blue"
      },
      {
        id: "attestation_mofa_pak",
        title: "Attest at Pakistan Ministry of Foreign Affairs",
        description: "After HEC verification, MOFA attestation is required.",
        timeline: "Allow 1 week",
        priority: "HIGH",
        badge: "For Pakistani students",
        badgeColor: "blue"
      },
      {
        id: "attestation_uae_embassy_pak",
        title: "Attest at UAE Embassy in Pakistan",
        description: "UAE Embassy locations: Islamabad (main), Karachi.",
        timeline: "Allow 1–2 weeks",
        priority: "HIGH",
        badge: "For Pakistani students",
        badgeColor: "blue"
      }
    ],
    timelineWarning: "Add 4–6 weeks pre-arrival for attestation",
    verificationSource: "UAE GDRFA, UAE Embassy Pakistan"
  },

  Bangladeshi: {
    tier: "A_ATTESTATION",
    verifiedContent: true,
    alertType: "warning",
    alertTitle: "⚠ Action Required Before You Arrive",
    alertBody: "Bangladeshi students require document attestation before UAE visa processing.",
    additionalTasks: [
      {
        id: "attestation_bd_moe",
        title: "Attest at Bangladesh Ministry of Education",
        timeline: "Allow 1–2 weeks",
        priority: "FIRST",
        badge: "For Bangladeshi students",
        badgeColor: "blue"
      },
      {
        id: "attestation_bd_mofa",
        title: "Attest at Bangladesh Ministry of Foreign Affairs",
        timeline: "Allow 1 week",
        priority: "HIGH",
        badge: "For Bangladeshi students",
        badgeColor: "blue"
      },
      {
        id: "attestation_uae_embassy_bd",
        title: "Attest at UAE Embassy in Dhaka",
        timeline: "Allow 1–2 weeks",
        priority: "HIGH",
        badge: "For Bangladeshi students",
        badgeColor: "blue"
      }
    ],
    verificationSource: "UAE GDRFA"
  },

  Filipino: {
    tier: "A_ATTESTATION",
    verifiedContent: true,
    alertType: "warning",
    alertTitle: "⚠ Action Required Before You Arrive",
    alertBody: "Filipino students require document authentication (Red Ribbon / DFA Authentication) before UAE visa processing.",
    additionalTasks: [
      {
        id: "attestation_dfa",
        title: "Authenticate documents at DFA (Department of Foreign Affairs) Philippines",
        description: "Also known as Red Ribbon authentication. Required for academic certificates used in UAE visa applications.",
        timeline: "Allow 1–3 weeks",
        priority: "FIRST",
        badge: "For Filipino students",
        badgeColor: "blue"
      },
      {
        id: "attestation_uae_embassy_ph",
        title: "Attest at UAE Embassy in Manila",
        timeline: "Allow 1–2 weeks",
        priority: "HIGH",
        badge: "For Filipino students",
        badgeColor: "blue"
      }
    ],
    verificationSource: "UAE GDRFA, DFA Philippines"
  },

  Palestinian: {
    tier: "PENDING_RESEARCH",
    verifiedContent: false,
    alertType: "info",
    alertTitle: "ℹ Guidance Coming Soon",
    alertBody: `We're currently verifying the specific requirements for Palestinian students — travel document situations vary (Jordanian passport, PA travel document, etc.) and we want to give you accurate, confirmed steps. Your checklist shows the complete standard process. Contact your university's Student Affairs office for nationality-specific guidance — they handle this regularly and are your most reliable source.`
  },

  Iranian: {
    tier: "PENDING_RESEARCH",
    verifiedContent: false,
    alertType: "info",
    alertTitle: "ℹ Guidance Coming Soon",
    alertBody: `We're verifying specific requirements for Iranian students. Your checklist shows the standard UAE student process. Contact your university Student Affairs office for confirmed guidance specific to your situation.`
  },

  Nigerian: {
    tier: "PENDING_RESEARCH",
    verifiedContent: false,
    alertType: "info",
    alertTitle: "ℹ We're Verifying Your Requirements",
    alertBody: `We're confirming the specific visa processing timelines and requirements for Nigerian students. Contact your university's Student Affairs office — they process Nigerian student visas regularly and can give you confirmed timelines.`
  },

  Somali: {
    tier: "PENDING_RESEARCH",
    verifiedContent: false,
    alertType: "info",
    alertTitle: "ℹ Guidance Coming Soon",
    alertBody: `We're verifying requirements for Somali students. Your checklist shows the standard process. Contact your university Student Affairs office for confirmed guidance.`
  },

  Kazakhstani: {
    tier: "PENDING_RESEARCH",
    verifiedContent: false,
    alertType: "info",
    alertTitle: "ℹ Guidance Coming Soon",
    alertBody: `We're verifying specific requirements for Kazakhstani students. Standard checklist applies — contact your university for nationality-specific steps.`
  },

  Russian: {
    tier: "PENDING_RESEARCH",
    verifiedContent: false,
    alertType: "info",
    alertTitle: "ℹ Guidance Coming Soon",
    alertBody: `We're verifying requirements for Russian students. Standard checklist applies. Contact your university Student Affairs for confirmed guidance.`
  },

  Syrian: {
    tier: "PENDING_RESEARCH",
    verifiedContent: false,
    alertType: "info",
    alertTitle: "ℹ Check Your Travel Document",
    alertBody: `Travel document requirements can vary for Syrian students. Ensure your passport or travel document has sufficient validity. We're verifying specific steps — contact your university Student Affairs office for confirmed guidance.`
  },

  Egyptian: {
    tier: "PENDING_RESEARCH",
    verifiedContent: false,
    alertType: "info",
    alertTitle: "ℹ Guidance Coming Soon",
    alertBody: `We're verifying specific requirements for Egyptian students. Standard checklist applies. Contact your university for nationality-specific steps.`
  },

  Jordanian: {
    tier: "PENDING_RESEARCH",
    verifiedContent: false,
    alertType: "info",
    alertTitle: "ℹ Guidance Coming Soon",
    alertBody: `We're verifying specific requirements for Jordanian students. Standard checklist applies. Contact your university for nationality-specific steps.`
  },

  American: {
    tier: "B_SIMPLIFIED",
    verifiedContent: true,
    alertType: "success",
    alertTitle: "✓ Streamlined Process",
    alertBody: "US passport holders benefit from a simplified UAE student visa process. No pre-arrival document attestation required. Standard processing time: 2–3 weeks after university submission.",
    additionalTasks: [],
    verificationSource: "UAE GDRFA"
  },

  British: {
    tier: "B_SIMPLIFIED",
    verifiedContent: true,
    alertType: "success",
    alertTitle: "✓ Streamlined Process",
    alertBody: "UK passport holders benefit from a simplified UAE student visa process. No pre-arrival document attestation required.",
    additionalTasks: [],
    verificationSource: "UAE GDRFA"
  },

  German: {
    tier: "B_SIMPLIFIED",
    verifiedContent: true,
    alertType: "success",
    alertTitle: "✓ Streamlined Process",
    alertBody: "German passport holders benefit from a simplified UAE student visa process. No pre-arrival attestation required.",
    additionalTasks: []
  },

  French: {
    tier: "B_SIMPLIFIED",
    verifiedContent: true,
    alertType: "success",
    alertTitle: "✓ Streamlined Process",
    alertBody: "French passport holders benefit from a simplified UAE student visa process.",
    additionalTasks: []
  },

  Other: {
    tier: "C_OTHER",
    verifiedContent: false,
    alertType: "info",
    alertTitle: "ℹ Standard Checklist Applied",
    alertBody: `We're building detailed guidance for all nationalities. Your checklist shows the complete standard UAE student requirements — your process may have additional steps. 
    
    We recommend:
    → Contact your university Student Affairs office
    → Visit your nearest UAE Embassy website
    → Join your university's student community — fellow students from your country are your best resource`
  }
};
