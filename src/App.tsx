import Rail from './components/Rail';
import Hero from './components/Hero';
import ProjectsIndex from './components/ProjectsIndex';
import CaseStudySection from './components/CaseStudySection';
import MoreProjects from './components/MoreProjects';
import Toolkit from './components/Toolkit';
import { Approach, Contact } from './components/Closing';
import { caseStudies } from './data/projects';
import { sections } from './data/profile';
import { useRevealObserver } from './hooks';
import { useLang } from './i18n';
import { ui } from './i18n/ui';

/** Section numbering lives in one place so the rail and the page cannot disagree. */
const indexOf = (id: string) => sections.find((s) => s.id === id)?.index ?? '';

export default function App() {
  const { t } = useLang();
  useRevealObserver();

  return (
    <>
      <a className="skip" href="#projects">
        {t(ui.skip)}
      </a>

      <Rail />

      <main id="main">
        <Hero />
        <ProjectsIndex />

        {caseStudies.map((cs) => (
          <CaseStudySection key={cs.id} cs={cs} sectionIndex={indexOf(cs.id)} />
        ))}

        <MoreProjects />
        <Toolkit />
        <Approach />
        <Contact />
      </main>
    </>
  );
}
