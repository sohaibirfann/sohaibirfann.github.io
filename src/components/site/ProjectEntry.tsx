import Reveal from "@/components/shared/Reveal";
import type { Project } from "@/lib/content";

export default function ProjectEntry({ project }: { project: Project }) {
  return (
    <Reveal as="article" className="project">
      <div className="project__head">
        <h3>
          <a
            href={project.site ?? project.repo}
            target="_blank"
            rel="noreferrer"
          >
            {project.name}
          </a>
        </h3>
        <span className="project__year label">{project.year}</span>
      </div>
      <p className="project__tagline">{project.tagline}</p>
      <div className="project__body">
        <div>
          <div className="prose">
            {project.story.map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </div>
          <ul className="project__details">
            {project.details.map((d, i) => (
              <li key={i}>{d}</li>
            ))}
          </ul>
        </div>
        {project.image && (
          <figure className="project__figure">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={project.image.src}
              alt={project.image.alt}
              loading="lazy"
            />
            {project.image.caption && (
              <figcaption className="label">
                {project.image.caption}
              </figcaption>
            )}
          </figure>
        )}
      </div>
      <div className="project__meta label">
        <span className="project__tech">{project.tech.join(" · ")}</span>
        {project.site && (
          <a
            className="m-link project__repo"
            href={project.site}
            target="_blank"
            rel="noreferrer"
          >
            Visit site ↗
          </a>
        )}
        <a
          className="m-link project__repo"
          href={project.repo}
          target="_blank"
          rel="noreferrer"
        >
          View source ↗
        </a>
      </div>
    </Reveal>
  );
}
