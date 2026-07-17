// Sample household used to power the interactive dashboard demo.
// Everything here is fictional mock data — no real accounts are connected.

export const household = {
  familyName: 'The Rivera-Ortiz Family',
  address: 'Maple Street, Austin TX',
}

export const familyMembers = [
  {
    id: 'fm-1',
    name: 'Dani Rivera',
    role: 'Parent',
    initials: 'DR',
    color: 'cat4',
    note: 'Manages finances + school portal',
    voiceCloned: true,
    // speechSynthesis params used to *simulate* the cloned voice in this demo
    voice: { pitch: 1.25, rate: 1.0 },
    calendar: { provider: 'Google', account: 'dani.rivera@gmail.com', status: 'connected' },
  },
  {
    id: 'fm-2',
    name: 'Sam Ortiz',
    role: 'Parent',
    initials: 'SO',
    color: 'cat1',
    note: 'Handles pickups + groceries',
    voiceCloned: true,
    voice: { pitch: 0.8, rate: 0.95 },
    calendar: { provider: 'iCloud', account: 'sam@icloud.com', status: 'connected' },
  },
  {
    id: 'fm-3',
    name: 'Maya Rivera-Ortiz',
    role: 'Daughter, age 9',
    initials: 'MR',
    color: 'cat5',
    note: 'Soccer Tue/Fri · 4th grade, Oakview Elementary',
    voiceCloned: true,
    voice: { pitch: 1.6, rate: 1.1 },
    calendar: { provider: 'School Portal', account: 'Oakview Elementary', status: 'disconnected' },
  },
  {
    id: 'fm-4',
    name: 'Leo Rivera-Ortiz',
    role: 'Son, age 6',
    initials: 'LR',
    color: 'cat3',
    note: '1st grade, Oakview Elementary · allergic to peanuts',
    voiceCloned: false,
    voice: { pitch: 1.7, rate: 1.15 },
    calendar: { provider: 'School Portal', account: 'Oakview Elementary', status: 'disconnected' },
  },
  {
    id: 'fm-5',
    name: 'Biscuit',
    role: 'Dog',
    initials: '🐾',
    color: 'cat2',
    note: 'Vet checkup due next month',
    voiceCloned: false,
  },
]

export const parentsInLaws = [
  {
    id: 'pl-1',
    name: 'Carmen Ortiz',
    role: "Sam's mother",
    initials: 'CO',
    color: 'cat4',
    lastContact: '2026-07-09',
    note: 'Sunday call · birthday Sep 3',
    voiceCloned: true,
    voice: { pitch: 1.1, rate: 0.9 },
  },
  {
    id: 'pl-2',
    name: 'Robert Rivera',
    role: "Dani's father",
    initials: 'RR',
    color: 'cat1',
    lastContact: '2026-06-28',
    note: "Last visited 18 days ago · loves Leo's soccer games",
    voiceCloned: false,
  },
  {
    id: 'pl-3',
    name: 'Linda Rivera',
    role: "Dani's mother",
    initials: 'LR',
    color: 'cat3',
    lastContact: '2026-06-28',
    note: 'Ask about Thanksgiving hosting',
    voiceCloned: false,
  },
  {
    id: 'pl-4',
    name: 'Miguel Ortiz',
    role: "Sam's father",
    initials: 'MO',
    color: 'cat5',
    lastContact: '2026-05-30',
    note: 'Overdue for a call — 6+ weeks',
    voiceCloned: false,
  },
]

export const friends = [
  {
    id: 'fr-1',
    name: 'The Chens',
    role: 'Maya + Emma are best friends',
    initials: 'TC',
    color: 'cat5',
    lastContact: '2026-07-12',
    note: 'Dinner swap every other Friday',
  },
  {
    id: 'fr-2',
    name: 'Priya Nair',
    role: "Dani's college roommate",
    initials: 'PN',
    color: 'cat4',
    lastContact: '2026-06-20',
    note: 'Owes us a visit — mentioned coming in August',
  },
  {
    id: 'fr-3',
    name: 'The Okafors',
    role: 'Neighbors, carpool partners',
    initials: 'TO',
    color: 'cat1',
    lastContact: '2026-07-14',
    note: 'Carpool Mon/Wed for soccer practice',
  },
]

// ————— Shared briefing: the couple's daily home surface —————
// Framed for two partners. Ownership is for coordination, never a scoreboard.
export const briefing = {
  viewer: { id: 'fm-1', name: 'Dani', initials: 'DR', color: 'cat4' },
  partner: { id: 'fm-2', name: 'Sam', initials: 'SO', color: 'cat1' },
  date: 'Thursday, July 16',
  handled: {
    count: 9,
    detail: '2 bills on autopay · calendars synced · groceries queued · movie picked',
  },
  today: [
    {
      id: 't-1',
      kind: 'call',
      title: 'Call the electrician about the panel',
      meta: 'before 5:00 PM',
      owner: 'sam',
      why: 'Dani asked last night — you delegated this in your voice',
      fromVoice: true,
    },
    {
      id: 't-2',
      kind: 'form',
      title: "Sign Maya's field-trip form",
      meta: 'due Friday',
      owner: 'you',
      why: 'From the Oakview school portal + Maya',
    },
    {
      id: 't-3',
      kind: 'bill',
      title: 'Pay the Amex — overdue 5 days',
      meta: '$312.50',
      owner: 'you',
      why: 'From the Family Finances sheet · this card isn\'t on autopay',
    },
  ],
  comingUp: [
    {
      id: 'c-1',
      kind: 'grocery',
      title: 'Milk & eggs run out around Thursday',
      why: "From the Jul 12 receipt · Thursday's dinner needs eggs",
      action: 'Add to Instacart',
    },
    {
      id: 'c-2',
      kind: 'warm',
      title: 'Miguel has been quiet for six weeks',
      why: 'Last call May 30 · his birthday is Sep 3',
      action: 'Plan a call',
      warm: true,
    },
    {
      id: 'c-3',
      kind: 'plan',
      title: 'Dinner with the Chens — Saturday',
      why: "Their turn to host · you offered to bring dessert",
      action: 'Add reminder',
    },
  ],
  // The occasional, gentle labor-balance check-in. Team framing, no numbers shown.
  balance: {
    message: "You've been carrying a lot, Dani.",
    detail:
      "You've owned most of this week's plans — the finances, the school stuff, the groceries. Sam's got room this week. Want to pass a few things his way?",
    lean: 0.72, // Dani's share of the week's load; rendered as a soft tilt, never a percentage
    reassurance: 'We balance the load — we don\'t keep score.',
  },
}

// ————— Voice reminders: first-person messages, delivered in the sender's cloned voice —————
export const voiceReminders = [
  {
    id: 'vr-1',
    fromId: 'fm-1',
    from: 'Dani',
    to: 'Sam',
    text: "Hey love — it's me. Don't forget to call the electrician about the panel today. They close at five.",
    time: '8:04 AM',
    context: 'Asked yesterday, 9:12 PM · kitchen',
    urgent: true,
  },
  {
    id: 'vr-2',
    fromId: 'fm-3',
    from: 'Maya',
    to: 'Dani',
    text: "Mom! My field trip form is due Friday. Pleeease sign it tonight — it's on the fridge.",
    time: '7:45 AM',
    context: 'From school portal + Maya, Tue',
    urgent: true,
  },
  {
    id: 'vr-3',
    fromId: 'fm-2',
    from: 'Sam',
    to: 'Dani',
    text: 'Reminder from me: the Amex is due today. Pay it from the joint account — I already moved the money.',
    time: '9:00 AM',
    context: 'From Family Finances sheet',
    urgent: false,
  },
  {
    id: 'vr-4',
    fromId: 'pl-1',
    from: 'Carmen',
    to: 'Everyone',
    text: "Mijo, it's Sunday — call your mother! I made tamales and I want to see the kids on video.",
    time: 'Sun 10:00 AM',
    context: 'Weekly ritual · recurring',
    urgent: false,
  },
]

// ————— Smart pantry: stock inferred from the last scanned grocery receipt —————
export const pantryMeta = {
  lastReceipt: { store: 'H-E-B', date: '2026-07-12', items: 24, total: 187.43 },
}

export const pantry = [
  { id: 'p-1', name: 'Milk (whole, 1 gal)', status: 'out', source: 'Receipt · Jul 12', daysLeft: 0 },
  { id: 'p-2', name: 'Eggs (dozen)', status: 'low', source: 'Receipt · Jul 12', daysLeft: 1 },
  { id: 'p-3', name: "Leo's peanut-free granola bars", status: 'low', source: 'Receipt · Jul 12', daysLeft: 2 },
  { id: 'p-4', name: 'Chicken thighs (2 lb)', status: 'stocked', source: 'Receipt · Jul 12', daysLeft: 4 },
  { id: 'p-5', name: 'Spinach', status: 'stocked', source: 'Receipt · Jul 12', daysLeft: 3 },
  { id: 'p-6', name: 'Pasta (penne)', status: 'stocked', source: 'Receipt · Jul 12', daysLeft: 14 },
]

// Items "extracted" when the user uploads a new receipt photo in the demo
export const receiptParseResult = {
  store: 'Costco',
  date: '2026-07-16',
  total: 243.87,
  items: [
    { id: 'rp-1', name: 'Milk (whole, 2 gal)', status: 'stocked', source: 'Receipt · Jul 16', daysLeft: 8 },
    { id: 'rp-2', name: 'Eggs (24 ct)', status: 'stocked', source: 'Receipt · Jul 16', daysLeft: 12 },
    { id: 'rp-3', name: 'Ground beef (3 lb)', status: 'stocked', source: 'Receipt · Jul 16', daysLeft: 4 },
    { id: 'rp-4', name: 'Bananas', status: 'stocked', source: 'Receipt · Jul 16', daysLeft: 5 },
    { id: 'rp-5', name: 'Paper towels (12 pk)', status: 'stocked', source: 'Receipt · Jul 16', daysLeft: 60 },
  ],
}

// ————— Movie radar: finds forwarded from Instagram DMs + the family queue —————
// availability: onNetflix + where it actually streams/rents (mock data)
export const movieFinds = [
  {
    id: 'mf-1',
    title: 'The Wild Robot',
    from: '@priya.nair',
    note: '"Maya would LOVE this — cried twice 😭"',
    forwardedAt: '2h ago',
    runtime: '102 min',
    match: 96,
    availability: { onNetflix: true, where: 'Netflix' },
  },
  {
    id: 'mf-2',
    title: 'Paddington in Peru',
    from: '@the.okafors',
    note: '"Carpool crew movie night??"',
    forwardedAt: 'Yesterday',
    runtime: '106 min',
    match: 88,
    availability: { onNetflix: false, where: 'Disney+' },
  },
  {
    id: 'mf-3',
    title: 'Chef',
    from: '@sam.ortiz',
    note: '"Date night when the kids sleep over at mom\'s"',
    forwardedAt: 'Mon',
    runtime: '114 min',
    match: 74,
    adultsOnly: true,
    availability: { onNetflix: true, where: 'Netflix' },
  },
]

// Movies the demo "identifies" when a link is dropped — picked deterministically
// from the pasted URL so the same link always resolves to the same movie
export const linkResolvePool = [
  {
    title: 'KPop Demon Hunters',
    year: 2025,
    runtime: '96 min',
    match: 93,
    availability: { onNetflix: true, where: 'Netflix' },
    signal: 'caption + audio track',
  },
  {
    title: 'Flow',
    year: 2024,
    runtime: '85 min',
    match: 91,
    availability: { onNetflix: false, where: 'Max · rent on Prime $3.99' },
    signal: 'scene match, no caption',
  },
  {
    title: 'Inside Out 2',
    year: 2024,
    runtime: '97 min',
    match: 89,
    availability: { onNetflix: false, where: 'Disney+' },
    signal: 'caption hashtag',
  },
  {
    title: 'Enola Holmes',
    year: 2020,
    runtime: '123 min',
    match: 84,
    availability: { onNetflix: true, where: 'Netflix' },
    signal: 'creator voiceover',
  },
]

export const movieNight = {
  tonight: {
    title: 'The Mitchells vs. the Machines',
    runtime: '113 min',
    matchScore: 94,
    reason: 'Everyone rated animated + adventure highly · under 2 hrs for a school night',
  },
  dinnerReadyAt: '6:30 PM',
  note: 'Queued so playback starts the moment plates hit the table — no cold food waiting on trailers.',
}

// ————— Finance hub: credit cards synced from the family Google Sheet —————
export const financeMeta = {
  sheetName: 'Family Finances 2026',
  lastSync: '12 min ago',
  connected: true,
}

export const creditCards = [
  { id: 'cc-1', name: 'Amex Blue Cash', last4: '3007', amount: 312.5, dueDate: '2026-07-11', status: 'overdue', autopay: false, owner: 'Sam' },
  { id: 'cc-2', name: 'Chase Sapphire', last4: '4821', amount: 842.16, dueDate: '2026-07-18', status: 'due-soon', autopay: false, owner: 'Dani' },
  { id: 'cc-3', name: 'Citi Costco Visa', last4: '9944', amount: 243.87, dueDate: '2026-07-25', status: 'upcoming', autopay: true, owner: 'Joint' },
  { id: 'cc-4', name: 'Apple Card', last4: '1180', amount: 96.2, dueDate: '2026-07-31', status: 'upcoming', autopay: true, owner: 'Dani' },
]

export const bills = [
  { id: 'b-1', name: 'Oakview Elementary — field trip fee', amount: 45.0, dueDate: '2026-07-19', status: 'due-soon', autopay: false },
  { id: 'b-2', name: 'Austin Energy — electric', amount: 168.42, dueDate: '2026-07-22', status: 'upcoming', autopay: true },
  { id: 'b-3', name: 'Mortgage', amount: 2380.0, dueDate: '2026-08-01', status: 'upcoming', autopay: true },
]

export const spendByCategory = [
  { id: 'sc-1', label: 'Groceries', amount: 612, color: 'cat1' },
  { id: 'sc-2', label: 'Dining out', amount: 284, color: 'cat2' },
  { id: 'sc-3', label: 'Kids activities', amount: 195, color: 'cat3' },
  { id: 'sc-4', label: 'Subscriptions', amount: 86, color: 'cat4' },
  { id: 'sc-5', label: 'Household', amount: 143, color: 'cat5' },
]

export const monthlyBudget = {
  budget: 4800,
  spent: 3312,
  month: 'July',
}

export const calendarEvents = [
  {
    id: 'ce-1',
    title: 'Family dinner + movie night',
    type: 'dinner',
    date: '2026-07-16',
    time: '6:30 PM',
    attendees: ['fm-1', 'fm-2', 'fm-3', 'fm-4'],
  },
  {
    id: 'ce-2',
    title: 'Maya — soccer practice',
    type: 'activity',
    date: '2026-07-17',
    time: '4:00 PM',
    attendees: ['fm-3'],
    note: 'Sam is picking up — carpool with the Okafors',
  },
  {
    id: 'ce-3',
    title: 'Dinner with the Chens',
    type: 'outing',
    date: '2026-07-18',
    time: '7:00 PM',
    attendees: ['fm-1', 'fm-2', 'fm-3', 'fm-4', 'fr-1'],
    note: 'Their turn to host',
  },
  {
    id: 'ce-4',
    title: 'Visit Grandpa Robert',
    type: 'family',
    date: '2026-07-20',
    time: '11:00 AM',
    attendees: ['fm-1', 'fm-3', 'fm-4', 'pl-2'],
  },
]

export const voiceQueries = [
  'What are we forgetting this week?',
  'Who is picking up Maya from soccer on Friday?',
  'Do we have enough groceries for dinner tonight?',
  'How much did we spend eating out this month?',
  'When did we last visit my parents?',
  'Find a movie everyone in the family will enjoy during dinner.',
]

export const integrations = [
  { id: 'int-1', name: 'ElevenLabs', detail: 'Family voice clones' },
  { id: 'int-2', name: 'Instagram', detail: 'DM forwards → movie radar' },
  { id: 'int-3', name: 'Google Sheets', detail: 'Cards & due dates' },
  { id: 'int-4', name: 'Receipt OCR', detail: 'Photo → pantry stock' },
  { id: 'int-5', name: 'School Portal', detail: 'Oakview Elementary' },
  { id: 'int-6', name: 'Shared Calendars', detail: 'Google + iCloud' },
]
