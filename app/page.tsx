export default function Home() {
  return (
    <main style={{ padding: '2rem', fontFamily: 'system-ui', maxWidth: '600px', margin: '0 auto' }}>
      <h1>🤖 Nancy Social Agency</h1>
      <p>AI-powered social media automation for local businesses.</p>
      <hr style={{ margin: '2rem 0' }} />
      <h2>Callback Endpoints</h2>
      <ul>
        <li><a href="/api/health">Health Check</a></li>
        <li>Facebook Callback: <code>/api/callback/facebook</code></li>
        <li>Instagram Callback: <code>/api/callback/instagram</code></li>
        <li>Deauth: <code>/api/callback/facebook/deauth</code></li>
        <li>Data Deletion: <code>/api/callback/facebook/delete</code></li>
      </ul>
      <p style={{ color: '#666', fontSize: '0.9rem' }}>
        Configured for: <strong>agency.rivoxcloud.com</strong>
      </p>
    </main>
  )
}