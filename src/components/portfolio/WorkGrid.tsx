"use client";

import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import { AnimatePresence, MotionConfig, motion } from "motion/react";
import { useState } from "react";
import { projectCategories, projects } from "@/data/projects";
import type { ProjectCategory } from "@/types/content";
import { ProjectCard } from "./ProjectCard";
import styles from "./WorkGrid.module.css";

type Filter = "All" | ProjectCategory;

export function WorkGrid() {
  const [filter, setFilter] = useState<Filter>("All");
  const visible =
    filter === "All" ? projects : projects.filter((p) => p.categories.includes(filter));

  return (
    <MotionConfig reducedMotion="user">
      <ToggleButtonGroup
        exclusive
        value={filter}
        onChange={(_, value: Filter | null) => value && setFilter(value)}
        aria-label="Filter projects by category"
        className={styles.filters}
      >
        {(["All", ...projectCategories] as Filter[]).map((category) => (
          <ToggleButton key={category} value={category} className={styles.filter}>
            {category}
          </ToggleButton>
        ))}
      </ToggleButtonGroup>

      <p className="visually-hidden" role="status">
        Showing {visible.length} {visible.length === 1 ? "project" : "projects"}
        {filter === "All" ? "" : ` in ${filter}`}
      </p>

      <motion.ul layout className={styles.grid} data-assemble>
        <AnimatePresence mode="popLayout" initial={false}>
          {visible.map((project) => (
            <motion.li
              key={project.slug}
              layout
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            >
              <ProjectCard project={project} headingLevel="h2" />
            </motion.li>
          ))}
        </AnimatePresence>
      </motion.ul>
    </MotionConfig>
  );
}
