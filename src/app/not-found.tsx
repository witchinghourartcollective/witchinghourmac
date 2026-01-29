export default function NotFound() {
  return (
    <main
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "2rem",
        textAlign: "center",
      }}
    >
      <pre style={{ fontFamily: "monospace" }}>
{`
\\   |   /
 \\  |  /
  \\ | /
   \\ /
   /|\\
  / | \\
 /  |  \\
/   |   \\
`}
      </pre>

      <h1 style={{ letterSpacing: "0.3em", fontSize: "0.8rem" }}>
        PAGE NOT FOUND
      </h1>

      <p style={{ opacity: 0.6, fontSize: "0.75rem" }}>
        The signal did not resolve.
      </p>
    </main>
  );
}

