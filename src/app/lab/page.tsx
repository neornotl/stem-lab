"use client";
import NbShell from "@/components/nb/Shell";
import NotebookCursor from "@/components/nb/NotebookCursor";
import Masthead from "@/components/nb/Masthead";
import { Hypothesis, Experiments, Subjects } from "@/components/nb/LogEntries";
import { Findings, Protocol, Signup } from "@/components/nb/Records";
import { Notes, BackCover } from "@/components/nb/Appendix";

/**
 * /lab — "Sổ tay thí nghiệm" (The Experiment Notebook)
 *
 * An alternative design for CLB STEM-AI-ROBOTIC, built as a separate route so
 * the main site at "/" is left completely untouched. The whole page reads as
 * an open lab notebook / riso zine: warm engineering paper, a blue graph grid,
 * ballpoint-blue + stamp-red + marker-green inks, tape, stamps and margin notes.
 */
export default function LabPage() {
  return (
    <NbShell>
      <NotebookCursor />
      <Masthead />
      <main id="nb-main">
        <Hypothesis />
        <Experiments />
        <Subjects />
        <Findings />
        <Protocol />
        <Signup />
        <Notes />
      </main>
      <BackCover />
    </NbShell>
  );
}
