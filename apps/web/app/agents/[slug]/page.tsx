import Link from "next/link";
import { notFound } from "next/navigation";
import { seededAgents } from "@kingsvarmo/shared";

export function generateStaticParams() {
  return seededAgents.map((agent) => ({ slug: agent.slug }));
}

export default async function AgentRunPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const agent = seededAgents.find((item) => item.slug === slug);

  if (!agent) {
    notFound();
  }

  return (
    <div className="container" style={{ paddingTop: 56, paddingBottom: 88 }}>
      <Link href="/agents" className="btn btn-ghost btn-sm" style={{ marginBottom: 28 }}>
        Back to agents
      </Link>

      <div style={{ display: "grid", gridTemplateColumns: "minmax(0, 1fr) 320px", gap: 28, alignItems: "start" }}>
        <section className="glass-lg" style={{ padding: 32 }}>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 18 }}>
            <span className="badge badge-teal">Published</span>
            {agent.supportedFormats.map((format) => (
              <span key={format} className="badge badge-muted">
                .{format}
              </span>
            ))}
          </div>

          <h1 style={{ fontSize: "clamp(2rem, 5vw, 3.4rem)", marginBottom: 16 }}>
            {agent.name}
          </h1>
          <p style={{ color: "var(--text-2)", lineHeight: 1.7, maxWidth: 720, marginBottom: 28 }}>
            {agent.description}
          </p>

          <div className="tx-panel" style={{ marginBottom: 24 }}>
            {agent.previewOutput}
          </div>

          <div className="callout callout-info">
            The interactive paid run flow is disabled for the static hackathon
            deployment. The local app keeps the wallet and upload workflow.
          </div>
        </section>

        <aside className="glass" style={{ padding: 24 }}>
          <p className="eyebrow" style={{ marginBottom: 16 }}>
            Run summary
          </p>
          <div className="cost-row">
            <span className="label">Creator</span>
            <span className="value">{agent.creatorName}</span>
          </div>
          <div className="cost-row">
            <span className="label">Price</span>
            <span className="value" style={{ color: "var(--teal)" }}>
              {agent.priceIn0G} OG
            </span>
          </div>
          <div className="cost-row">
            <span className="label">Runtime</span>
            <span className="value">~{Math.round(agent.runtimeEstimateSeconds / 60)} min</span>
          </div>
          <div className="cost-row">
            <span className="label">0G ref</span>
            <span className="value">indexed</span>
          </div>

          <Link href="/creator" className="btn btn-primary w-full mt-6" style={{ justifyContent: "center" }}>
            Publish your agent
          </Link>
        </aside>
      </div>
    </div>
  );
}
