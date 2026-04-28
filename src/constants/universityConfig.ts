export const UNIVERSITY_CONFIG: Record<string, any> = {
  'NYUAD': {
    fullName: 'NYU Abu Dhabi',
    emirate: 'Abu Dhabi',
    jurisdiction: 'ADGDA',
    locationArea: 'Saadiyat Island, Abu Dhabi',
    overrides: {
      replaceGDRFAwithADGDA: true,
      replaceDubaiWithAbuDhabi: true
    },
    universityAlert: {
      title: '📋 NYUAD Manages Your Visa Process',
      body: 'NYU Abu Dhabi coordinates student visa processing directly through their admissions office. Contact your NYUAD admissions coordinator BEFORE taking any independent visa steps. Many NYUAD students have visa and insurance costs covered — confirm your package first.',
      type: 'info'
    },
    priorityTask: {
      id: 'nyuad_admissions_contact',
      title: 'Confirm visa process with NYUAD Admissions Coordinator',
      description: 'NYUAD manages student visas directly. Email admissions@nyu.edu or contact your dedicated admissions coordinator before starting any process independently.',
      priority: 'FIRST'
    }
  },

  'UOWD': {
    fullName: 'University of Wollongong Dubai',
    emirate: 'Dubai',
    jurisdiction: 'GDRFA',
    locationArea: 'Dubai Knowledge Park (DKP)',
    universityAlert: null,
    locationNote: 'Your campus is in Dubai Knowledge Park. Nearest service centers: Al Barsha and Knowledge Park area.'
  },

  'AUS': {
    fullName: 'American University of Sharjah',
    emirate: 'Sharjah',
    jurisdiction: 'Sharjah Immigration',
    locationArea: 'University City, Sharjah',
    universityAlert: {
      title: '📋 AUS is Located in Sharjah',
      body: 'American University of Sharjah is in Sharjah emirate — some processes differ from Dubai. Your Student Affairs team handles most visa coordination. Contact: studentaffairs@aus.edu',
      type: 'info'
    },
    overrides: {
      replaceDubaiWithSharjah: true
    }
  },

  'AUD': {
    fullName: 'American University in Dubai',
    emirate: 'Dubai',
    jurisdiction: 'GDRFA',
    locationArea: 'Al Sufouh, Dubai',
    universityAlert: {
      title: '📋 AUD Registrar Coordinates Visa Processing',
      body: "Contact AUD's Registrar office first — they coordinate student visa processing for all AUD students.",
      type: 'info'
    }
  },

  'HWU': {
    fullName: 'Heriot-Watt University Dubai',
    emirate: 'Dubai',
    jurisdiction: 'GDRFA',
    locationArea: 'Dubai International Academic City (DIAC)',
    locationNote: 'Your campus is in Dubai International Academic City. DIAC-area typing centers recommended.'
  },

  'MDX': {
    fullName: 'Middlesex University Dubai',
    emirate: 'Dubai',
    jurisdiction: 'GDRFA',
    locationArea: 'Dubai Knowledge Park (DKP)',
    locationNote: 'Located in Dubai Knowledge Park. Al Barsha typing centers are closest to campus.'
  }
};

export const DEFAULT_UNIVERSITY_CONFIG = {
  emirate: 'Dubai',
  jurisdiction: 'GDRFA',
  universityAlert: {
    title: '📋 Check With Your University First',
    body: 'Contact your university\'s Student Affairs office to confirm how they handle student visa sponsorship before starting any process independently.',
    type: 'info'
  }
};
