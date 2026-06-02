const SESSION_KEY = 'cs.admin.session.v1'

let cachedSession

export function readSession() {
  if (cachedSession !== undefined) return cachedSession
  try {
    const raw = window.sessionStorage.getItem(SESSION_KEY)
    cachedSession = raw ? JSON.parse(raw) : null
  } catch {
    cachedSession = null
  }
  return cachedSession
}

export function writeSession(session) {
  cachedSession = session
  window.sessionStorage.setItem(SESSION_KEY, JSON.stringify(session))
}

export function clearSession() {
  cachedSession = null
  window.sessionStorage.removeItem(SESSION_KEY)
}
