import { Project } from '@/features/projects/types';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import projectsData from '@/data/initialProjectsData.json';

interface ProjectsState {
  projects: Project[];
  hasHydrated: boolean;
  setHasHydrated: (value: boolean) => void;
  setProjects: (projects: Project[]) => void;
  addProject: (project: Project) => void;
  updateProject: (project: Project) => void;
  removeProject: (id: string) => void;
}

export const useProjectsStore = create<ProjectsState>()(
  persist(
    (set) => ({
      projects: [],
      hasHydrated: false,
      setHasHydrated: (value) => set({ hasHydrated: value }),
      setProjects: (projects) => set({ projects }),
      addProject: (project) => set((state) => ({ projects: [...state.projects, project] })),
      updateProject: (project) =>
        set((state) => ({
          projects: state.projects.map((p) => (p.id === project.id ? project : p)),
        })),
      removeProject: (id) =>
        set((state) => ({
          projects: state.projects.filter((p) => p.id !== id),
        })),
    }),
    {
      name: 'project',
      onRehydrateStorage: () => (state) => {
        if (!state) return;

        if (state.projects.length === 0) {
          state.setProjects(projectsData);
        }

        state.setHasHydrated(true);
      },
    }
  )
);
