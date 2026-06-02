import { useMemo, useState } from 'react'
import { ExternalLink, LogOut, ShieldCheck } from 'lucide-react'
import { consoleMetrics, recentEvents } from '../data/authFlow'
import {
  accessModules,
  contentModules,
  dashboardStats,
  dashboardTabs,
  publishingModules,
  supportModules,
  toolGroups,
} from '../data/dashboardData'

function SectionCard({ item, metaKey = 'status' }) {
  const Icon = item.icon

  return (
    <article className="section-card">
      <span className="section-icon">
        <Icon size={20} aria-hidden="true" />
      </span>
      <div>
        <div className="section-card-head">
          <h3>{item.title}</h3>
          <span>{item[metaKey]}</span>
        </div>
        <p>{item.description}</p>
        {item.route && (
          <a className="inline-link" href={`http://127.0.0.1:5173${item.route}`}>
            Public route
            <ExternalLink size={14} aria-hidden="true" />
          </a>
        )}
      </div>
    </article>
  )
}

function OverviewTab() {
  return (
    <div className="dashboard-grid">
      <section className="dashboard-panel wide" aria-labelledby="overview-title">
        <div className="panel-heading">
          <div>
            <p className="eyebrow">Command center</p>
            <h2 id="overview-title">Everything that needs admin ownership</h2>
          </div>
          <span className="live-pill">Mapped from frontend</span>
        </div>
        <div className="ops-map">
          <div>
            <strong>Tools</strong>
            <span>12 public tools, 5 editable through content overrides.</span>
          </div>
          <div>
            <strong>Publishing</strong>
            <span>Blog and guide workflows need review, draft, and publish controls.</span>
          </div>
          <div>
            <strong>Support</strong>
            <span>Reports, FAQ, help center, and safety pages belong in one queue.</span>
          </div>
        </div>
      </section>

      <section className="dashboard-panel" aria-labelledby="activity-title">
        <div className="panel-heading compact">
          <div>
            <p className="eyebrow">Audit stream</p>
            <h2 id="activity-title">Recent security events</h2>
          </div>
          <span className="live-pill">Live</span>
        </div>
        <div className="event-list">
          {recentEvents.map((event) => (
            <article className={`event-row ${event.tone}`} key={event.title}>
              <div>
                <strong>{event.title}</strong>
                <p>{event.detail}</p>
              </div>
              <time>{event.time}</time>
            </article>
          ))}
        </div>
      </section>
    </div>
  )
}

function ToolsTab() {
  return (
    <div className="tab-stack">
      {toolGroups.map((group) => (
        <section className="dashboard-panel" key={group.title}>
          <div className="panel-heading compact">
            <div>
              <p className="eyebrow">Tool inventory</p>
              <h2>{group.title}</h2>
              <p>{group.description}</p>
            </div>
          </div>
          <div className="tool-table">
            {group.items.map((tool) => {
              const Icon = tool.icon
              return (
                <article className="tool-row" key={tool.path}>
                  <span className="section-icon">
                    <Icon size={18} aria-hidden="true" />
                  </span>
                  <div>
                    <strong>{tool.name}</strong>
                    <small>{tool.path}</small>
                  </div>
                  <span>{tool.owner}</span>
                  <span className={tool.status === 'Managed' ? 'status-pill managed' : 'status-pill'}>
                    {tool.status}
                  </span>
                </article>
              )
            })}
          </div>
        </section>
      ))}
    </div>
  )
}

function ContentTab() {
  return (
    <div className="management-grid">
      {contentModules.map((item) => (
        <SectionCard item={item} key={item.title} metaKey="records" />
      ))}
    </div>
  )
}

function PublishingTab() {
  return (
    <div className="management-grid two-col">
      {publishingModules.map((item) => (
        <SectionCard item={item} key={item.title} metaKey="count" />
      ))}
    </div>
  )
}

function SupportTab() {
  return (
    <div className="management-grid">
      {supportModules.map((item) => (
        <SectionCard item={item} key={item.title} metaKey="priority" />
      ))}
    </div>
  )
}

function AccessTab() {
  return (
    <div className="management-grid">
      {accessModules.map((item) => (
        <SectionCard item={item} key={item.title} />
      ))}
    </div>
  )
}

export default function AdminConsole({ session, onSignOut }) {
  const [activeTab, setActiveTab] = useState('overview')
  const activeTabLabel = useMemo(
    () => dashboardTabs.find((tab) => tab.id === activeTab)?.label || 'Overview',
    [activeTab],
  )

  return (
    <main className="console-page">
      <header className="console-header dashboard-header">
        <div>
          <p className="eyebrow">CyberSafeBuddy Admin</p>
          <h1>Dashboard</h1>
        </div>
        <button className="ghost-action dark" onClick={onSignOut} type="button">
          <LogOut size={17} aria-hidden="true" />
          Sign out
        </button>
      </header>

      <section className="session-band" aria-label="Current session">
        <div className="session-icon">
          <ShieldCheck size={30} aria-hidden="true" />
        </div>
        <div>
          <span>Authenticated as {session.email}</span>
          <strong>{session.role}</strong>
        </div>
        <time dateTime={session.mfaVerifiedAt}>
          MFA verified {new Date(session.mfaVerifiedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </time>
      </section>

      <section className="metric-grid" aria-label="Admin metrics">
        {dashboardStats.map((metric) => {
          const Icon = metric.icon
          return (
            <article className="metric-card" key={metric.label}>
              <span className="metric-icon">
                <Icon size={20} aria-hidden="true" />
              </span>
              <div>
                <span>{metric.label}</span>
                <strong>{metric.value}</strong>
                <small>{metric.detail}</small>
              </div>
            </article>
          )
        })}
      </section>

      <section className="dashboard-shell" aria-label="Admin dashboard workspace">
        <nav className="dashboard-tabs" aria-label="Dashboard sections">
          {dashboardTabs.map((tab) => {
            const Icon = tab.icon
            return (
              <button
                aria-current={activeTab === tab.id ? 'page' : undefined}
                className={activeTab === tab.id ? 'active' : ''}
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                type="button"
              >
                <Icon size={17} aria-hidden="true" />
                {tab.label}
              </button>
            )
          })}
        </nav>

        <div className="dashboard-content">
          <div className="workspace-title">
            <p className="eyebrow">Workspace</p>
            <h2>{activeTabLabel}</h2>
          </div>
          {activeTab === 'overview' && <OverviewTab />}
          {activeTab === 'tools' && <ToolsTab />}
          {activeTab === 'content' && <ContentTab />}
          {activeTab === 'publishing' && <PublishingTab />}
          {activeTab === 'support' && <SupportTab />}
          {activeTab === 'access' && <AccessTab />}
        </div>
      </section>

      <section className="activity-panel compact-panel" aria-label="Operations summary">
        <div className="panel-heading compact">
          <div>
            <p className="eyebrow">Next backend work</p>
            <h2>Connect dashboard actions to real admin services</h2>
          </div>
          <span className="live-pill">Prototype</span>
        </div>
        <div className="event-list">
          {consoleMetrics.map((metric) => (
            <article className="event-row neutral" key={metric.label}>
              <div>
                <strong>{metric.label}</strong>
                <p>{metric.trend}</p>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  )
}
