import type { Metadata } from "next";
import Reveal from "@/components/Reveal";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import ProjectEntry from "@/components/ProjectEntry";
import { PROJECTS } from "@/lib/content";

export const metadata: Metadata = {
  title: "Projects",
  description: "Everything I've built and shipped — the full list.",
};

export default function ProjectsPage() {
  return (
    <div className="wing wing--gallery">
      <SiteHeader />

      <main>
        <section className="page-hero container">
          <Reveal>
            <p className="page-hero__label label">
              all projects · {String(PROJECTS.length).padStart(2, "0")}
            </p>
            <h1>Projects</h1>
            <p className="page-hero__sub">
              Everything here is real, on GitHub, and written up by hand — the
              featured ones live on the front page, the rest live here.
            </p>
          </Reveal>
        </section>

        <section className="section">
          <div className="container">
            {PROJECTS.map((project) => (
              <ProjectEntry key={project.slug} project={project} />
            ))}
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
