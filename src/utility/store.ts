import { create } from 'zustand';

export type SchoolSetupData = {
  schoolName: string;
  schoolType: string;
  subdomain: string;
  primaryColor: string;
  logo?: string;
  adminFirstName: string;
  adminLastName: string;
  adminEmail: string;
};

// Define the type for the state within the store
type SchoolSetupState = {
  schoolSetupData: SchoolSetupData;
  // Actions to update the state
  setSchoolName: (name: string) => void;
  setSchoolType: (type: string) => void;
  setSubdomain: (subdomain: string) => void;
  setPrimaryColor: (color: string) => void;
  setLogo: (logo?: string) => void;
  setAdminFirstName: (name: string) => void;
  setAdminLastName: (name: string) => void;
  setAdminEmail: (email: string) => void;
  // A generic update function for convenience
  updateSchoolSetupData: (newData: Partial<SchoolSetupData>) => void;
  // Reset function
  resetSchoolSetupData: () => void;
};

// Initial state for the school setup data
const initialSchoolSetupData: SchoolSetupData = {
  schoolName: '',
  schoolType: '',
  subdomain: '',
  primaryColor: '#000000', // Default color
  logo: undefined,
  adminFirstName: '',
  adminLastName: '',
  adminEmail: '',
};

// Create the Zustand store
export const useSchoolSetupStore = create<SchoolSetupState>((set) => ({
  schoolSetupData: initialSchoolSetupData,

  setSchoolName: (name) =>
    set((state) => ({
      schoolSetupData: { ...state.schoolSetupData, schoolName: name },
    })),
  setSchoolType: (type) =>
    set((state) => ({
      schoolSetupData: { ...state.schoolSetupData, schoolType: type },
    })),
  setSubdomain: (subdomain) =>
    set((state) => ({
      schoolSetupData: { ...state.schoolSetupData, subdomain: subdomain },
    })),
  setPrimaryColor: (color) =>
    set((state) => ({
      schoolSetupData: { ...state.schoolSetupData, primaryColor: color },
    })),
  setLogo: (logo) =>
    set((state) => ({
      schoolSetupData: { ...state.schoolSetupData, logo: logo },
    })),
  setAdminFirstName: (name) =>
    set((state) => ({
      schoolSetupData: { ...state.schoolSetupData, adminFirstName: name },
    })),
  setAdminLastName: (name) =>
    set((state) => ({
      schoolSetupData: { ...state.schoolSetupData, adminLastName: name },
    })),
  setAdminEmail: (email) =>
    set((state) => ({
      schoolSetupData: { ...state.schoolSetupData, adminEmail: email },
    })),

  // A more flexible update function
  updateSchoolSetupData: (newData) =>
    set((state) => ({
      schoolSetupData: { ...state.schoolSetupData, ...newData },
    })),

  resetSchoolSetupData: () => set({ schoolSetupData: initialSchoolSetupData }),
}));
