import { create } from 'zustand';

const useDefaultResumeStore = create((set) => ({
  defaultSkills: [],
  setDefaultSkills: (skills) => {
    console.log("Setting default skills in store:", skills);
    set({ defaultSkills: skills });
  },
  clearDefaultSkills: () => {
    console.log("Clearing default skills in store");
    set({ defaultSkills: [] });
  },
}));

export default useDefaultResumeStore; 
