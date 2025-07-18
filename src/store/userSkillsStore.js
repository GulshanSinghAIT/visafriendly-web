import { create } from 'zustand';

const useUserSkillsStore = create((set) => ({
  skills: [],
  setSkills: (skills) => set({ skills }),
  addSkill: (skill) => set((state) => ({ 
    skills: [...state.skills, skill] 
  })),
  removeSkill: (skillId) => set((state) => ({
    skills: state.skills.filter(skill => skill.id !== skillId)
  })),
  clearSkills: () => set({ skills: [] }),
}));

export default useUserSkillsStore; 
