import Link from "next/link";

const STEPS = [
  {
    title: "Create a free Sanity project",
    body: "Sign in at sanity.io/manage with Google and create a project. Name it Sudha Square and keep the default dataset name, production.",
  },
  {
    title: "Copy the project ID",
    body: "It is shown on the project's dashboard: a short string of letters and numbers, something like 7fk2p9xa.",
  },
  {
    title: "Add it to .env.local",
    body: "In the project root, create .env.local (copy .env.example) and paste the ID as NEXT_PUBLIC_SANITY_PROJECT_ID.",
  },
  {
    title: "Restart, then seed",
    body: "Stop and restart npm run dev, then run npm run seed to push the starter content into your new dataset.",
  },
];

/** Shown at /studio when Sanity has not been connected yet. */
export function StudioSetupNotice() {
  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#0b132b",
        color: "#f7f5f2",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "3rem 1.5rem",
        fontFamily: "ui-sans-serif, system-ui, sans-serif",
      }}
    >
      <div style={{ maxWidth: "38rem", width: "100%" }}>
        <p
          style={{
            fontFamily: "ui-sans-serif, system-ui, sans-serif",
            fontSize: "0.6875rem",
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "#c9a227",
          }}
        >
          Content Studio
        </p>
        <h1
          style={{
            fontFamily: "Georgia, serif",
            fontSize: "2rem",
            fontWeight: 500,
            marginTop: "1rem",
            lineHeight: 1.15,
          }}
        >
          Connect Sanity to start editing.
        </h1>
        <p
          style={{
            marginTop: "1rem",
            lineHeight: 1.65,
            color: "rgba(247,245,242,0.6)",
            fontWeight: 300,
          }}
        >
          The website is running on its built-in starter content, so everything
          renders correctly. Connecting Sanity replaces that with content you
          can edit here. It takes about five minutes and costs nothing.
        </p>

        <ol style={{ marginTop: "2.5rem", padding: 0, listStyle: "none" }}>
          {STEPS.map((step, i) => (
            <li
              key={step.title}
              style={{
                display: "flex",
                gap: "1.25rem",
                padding: "1.25rem 0",
                borderTop: "1px solid rgba(247,245,242,0.1)",
              }}
            >
              <span
                style={{
                  fontFamily: "ui-sans-serif, system-ui, sans-serif",
                  fontSize: "0.6875rem",
                  letterSpacing: "0.15em",
                  color: "#c9a227",
                  paddingTop: "0.2rem",
                }}
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <div>
                <p style={{ fontWeight: 500, fontSize: "0.95rem" }}>{step.title}</p>
                <p
                  style={{
                    marginTop: "0.35rem",
                    fontSize: "0.875rem",
                    lineHeight: 1.6,
                    color: "rgba(247,245,242,0.5)",
                    fontWeight: 300,
                  }}
                >
                  {step.body}
                </p>
              </div>
            </li>
          ))}
        </ol>

        <Link
          href="/"
          style={{
            display: "inline-block",
            marginTop: "2rem",
            fontFamily: "ui-sans-serif, system-ui, sans-serif",
            fontSize: "0.625rem",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: "rgba(247,245,242,0.55)",
            textDecoration: "none",
            border: "1px solid rgba(247,245,242,0.2)",
            borderRadius: "999px",
            padding: "0.85rem 1.5rem",
          }}
        >
          ← Back to the website
        </Link>
      </div>
    </main>
  );
}
