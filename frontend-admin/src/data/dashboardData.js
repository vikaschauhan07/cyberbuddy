import {
  AlertTriangle,
  BookOpenCheck,
  CircleHelp,
  FileText,
  Gauge,
  Globe,
  KeyRound,
  LayoutDashboard,
  LifeBuoy,
  Link2,
  LockKeyhole,
  MailWarning,
  MessageSquareWarning,
  Network,
  Newspaper,
  Radar,
  ShieldCheck,
  SlidersHorizontal,
  Smartphone,
  UserCog,
  UsersRound,
  Wifi,
} from 'lucide-react'

export const dashboardTabs = [
  { id: 'overview', label: 'Overview', icon: LayoutDashboard },
  { id: 'tools', label: 'Tools', icon: ShieldCheck },
  { id: 'content', label: 'Content', icon: SlidersHorizontal },
  { id: 'publishing', label: 'Publishing', icon: Newspaper },
  { id: 'support', label: 'Support', icon: LifeBuoy },
  { id: 'access', label: 'Access', icon: UserCog },
]

export const dashboardStats = [
  { label: 'Public tools', value: '12', detail: 'Active user-facing checks', icon: ShieldCheck },
  { label: 'Editable tools', value: '5', detail: 'Managed from content overrides', icon: SlidersHorizontal },
  { label: 'Content areas', value: '9', detail: 'Blogs, guides, legal, help, FAQ', icon: FileText },
  { label: 'MFA policy', value: '100%', detail: 'OTP required on every admin entry', icon: LockKeyhole },
]

export const toolGroups = [
  {
    title: 'Security checks',
    description: 'Core scanners and risk-scoring tools shown on the public frontend.',
    items: [
      { name: 'Network Security Test', path: '/tools/network-security', owner: 'Tool logic', status: 'Live', icon: Network },
      { name: 'URL Safety Scanner', path: '/tools/url-scanner', owner: 'Tool logic', status: 'Live', icon: Link2 },
      { name: 'Password Strength', path: '/tools/password-strength', owner: 'Tool logic', status: 'Live', icon: KeyRound },
      { name: 'Email Breach Checker', path: '/tools/email-breach', owner: 'Tool logic', status: 'Live', icon: MailWarning },
      { name: 'Browser Security Checker', path: '/tools/browser-security', owner: 'Client audit', status: 'Live', icon: Globe },
      { name: 'File Safety Checker', path: '/tools/file-safety', owner: 'Client audit', status: 'Live', icon: Radar },
    ],
  },
  {
    title: 'Education and privacy tools',
    description: 'Question-driven tools with admin-manageable copy, scoring, or checklists.',
    items: [
      { name: 'Phishing Awareness Quiz', path: '/tools/phishing-quiz', owner: 'Editable content', status: 'Managed', icon: AlertTriangle },
      { name: 'Account Security Score', path: '/tools/account-security-score', owner: 'Editable content', status: 'Managed', icon: Gauge },
      { name: 'Scam Message Analyzer', path: '/tools/scam-analyzer', owner: 'Editable patterns', status: 'Managed', icon: MessageSquareWarning },
      { name: 'WiFi Safety Checker', path: '/tools/wifi-safety', owner: 'Editable content', status: 'Managed', icon: Wifi },
      { name: 'Social Media Privacy', path: '/tools/social-privacy', owner: 'Editable checklists', status: 'Managed', icon: UsersRound },
      { name: 'Website Performance', path: '/tools/website-performance', owner: 'Client audit', status: 'Live', icon: Gauge },
    ],
  },
]

export const contentModules = [
  {
    title: 'Tool content overrides',
    description: 'Manage quiz questions, scoring models, recommendations, platform checklists, and scam patterns.',
    route: '/set-content',
    status: 'Ready to connect',
    icon: SlidersHorizontal,
    records: '5 editable tools',
  },
  {
    title: 'Landing page sections',
    description: 'Hero copy, trust bar, tool cards, CTA content, newsletter copy, and footer links.',
    route: '/',
    status: 'Needs admin editor',
    icon: LayoutDashboard,
    records: '1 landing surface',
  },
  {
    title: 'Static site pages',
    description: 'About, FAQ, safety tips, help center, report issue, privacy policy, and terms.',
    route: '/about',
    status: 'Needs admin editor',
    icon: CircleHelp,
    records: '7 pages',
  },
]

export const publishingModules = [
  {
    title: 'Blog management',
    description: 'Manage public blog posts across everyone, developer, and business categories.',
    route: '/blog',
    action: 'Open blog queue',
    icon: Newspaper,
    count: '3 categories',
  },
  {
    title: 'Guide management',
    description: 'Manage step-by-step security guides, levels, prerequisites, and learning outcomes.',
    route: '/guides',
    action: 'Open guide queue',
    icon: BookOpenCheck,
    count: '3 levels',
  },
]

export const supportModules = [
  {
    title: 'Reported issues',
    description: 'Triage incoming user reports from the public report issue page.',
    route: '/report-issue',
    priority: 'High',
    icon: AlertTriangle,
  },
  {
    title: 'Help center',
    description: 'Review support articles and help center navigation before publishing.',
    route: '/help',
    priority: 'Normal',
    icon: LifeBuoy,
  },
  {
    title: 'FAQ backlog',
    description: 'Keep common user questions aligned with product behavior and safety guidance.',
    route: '/faq',
    priority: 'Normal',
    icon: CircleHelp,
  },
]

export const accessModules = [
  {
    title: 'Admin users',
    description: 'Invite, suspend, and review privileged admins once backend identity is connected.',
    status: 'Backend required',
    icon: UserCog,
  },
  {
    title: 'MFA policy',
    description: 'OTP is mandatory after login and during password reset in the current prototype.',
    status: 'Enforced in UI',
    icon: Smartphone,
  },
  {
    title: 'Audit log',
    description: 'Review sign-ins, resets, content edits, and tool publishing events.',
    status: 'Prototype feed',
    icon: FileText,
  },
]
