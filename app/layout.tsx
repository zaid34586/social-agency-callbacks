export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Nancy Social Agency - OAuth Callbacks</title>
        <meta name="description" content="AI-powered social media automation callbacks for Instagram & Facebook" />
      </head>
      <body style={{ fontFamily: 'system-ui', margin: 0, padding: 0 }}>
        {children}
      </body>
    </html>
  );
}