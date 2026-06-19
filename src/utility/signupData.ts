/**
 * Signup Data Management Utility
 * Handles storage and retrieval of signup form data
 * 
 * TODO: When backend APIs are ready:
 * - Replace localStorage with API calls to backend database
 * - Add API endpoint to save signup data: POST /api/auth/signup-data
 * - Add API endpoint to retrieve signup data: GET /api/auth/signup-data/:id
 * - Add API endpoint to verify email during signup
 * - Add authentication tokens management
 */

import { SchoolInformationData } from "@/components/onboarding/school-information-step";
import { AdminAccountData } from "@/components/onboarding/admin-step";

export type SignupFormData = {
  id: string; // Unique identifier for this signup session
  createdAt: string; // ISO timestamp
  updatedAt: string; // ISO timestamp
  schoolInformation: SchoolInformationData | null;
  subdomain: string;
  branding: {
    primaryColor: string;
  };
  logo: {
    fileName: string;
    fileSize: number;
    fileType: string;
    // Note: File data stored as base64 string
    fileData: string | null;
  } | null;
  adminAccount: AdminAccountData | null;
  status: "in-progress" | "completed" | "submitted";
};

const STORAGE_KEY = "stonelearn_signup_data";
const SIGNUP_SESSIONS_KEY = "stonelearn_signup_sessions";

/**
 * Create a new signup session
 */
export function createSignupSession(): SignupFormData {
  return {
    id: generateSessionId(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    schoolInformation: null,
    subdomain: "",
    branding: {
      primaryColor: "#722F37",
    },
    logo: null,
    adminAccount: null,
    status: "in-progress",
  };
}

/**
 * Generate a unique session ID
 */
function generateSessionId(): string {
  return `signup_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * Save signup data to localStorage
 * 
 * TODO: Replace with API call when backend is ready:
 * const response = await fetch('/api/auth/signup-data', {
 *   method: 'POST',
 *   headers: { 'Content-Type': 'application/json' },
 *   body: JSON.stringify(data)
 * });
 */
export function saveSignupData(data: SignupFormData): void {
  try {
    const updated = {
      ...data,
      updatedAt: new Date().toISOString(),
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    
    // Also maintain a list of all sessions for retrieval
    const sessions = getAllSignupSessions();
    if (!sessions.find((s) => s.id === data.id)) {
      sessions.push({ id: data.id, createdAt: data.createdAt });
    }
    localStorage.setItem(SIGNUP_SESSIONS_KEY, JSON.stringify(sessions));
  } catch (error) {
    console.error("Failed to save signup data:", error);
  }
}

/**
 * Retrieve current signup data from localStorage
 * 
 * TODO: Replace with API call when backend is ready:
 * const response = await fetch(`/api/auth/signup-data/${sessionId}`);
 * const data = await response.json();
 */
export function getSignupData(): SignupFormData | null {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error("Failed to retrieve signup data:", error);
    return null;
  }
}

/**
 * Get all signup sessions
 */
export function getAllSignupSessions(): Array<{ id: string; createdAt: string }> {
  try {
    const sessions = localStorage.getItem(SIGNUP_SESSIONS_KEY);
    return sessions ? JSON.parse(sessions) : [];
  } catch (error) {
    console.error("Failed to retrieve signup sessions:", error);
    return [];
  }
}

/**
 * Retrieve a specific signup session by ID
 * 
 * TODO: When backend is ready, fetch from database
 */
export function getSignupDataById(id: string): SignupFormData | null {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) return null;
    const parsed = JSON.parse(data);
    return parsed.id === id ? parsed : null;
  } catch (error) {
    console.error("Failed to retrieve signup data by ID:", error);
    return null;
  }
}

/**
 * Update specific fields in signup data
 */
export function updateSignupData(
  updates: Partial<SignupFormData>
): SignupFormData | null {
  const current = getSignupData();
  if (!current) {
    console.warn("No existing signup data found");
    return null;
  }

  const updated: SignupFormData = {
    ...current,
    ...updates,
    id: current.id, // Don't allow ID changes
    createdAt: current.createdAt, // Don't allow creation date changes
    updatedAt: new Date().toISOString(),
  };

  saveSignupData(updated);
  return updated;
}

/**
 * Add school information to signup data
 */
export function setSchoolInformation(
  data: SchoolInformationData
): SignupFormData | null {
  return updateSignupData({ schoolInformation: data });
}

/**
 * Add subdomain to signup data
 */
export function setSubdomain(subdomain: string): SignupFormData | null {
  return updateSignupData({ subdomain });
}

/**
 * Add branding color to signup data
 */
export function setPrimaryColor(color: string): SignupFormData | null {
  return updateSignupData({
    branding: { primaryColor: color },
  });
}

/**
 * Add logo file to signup data
 * Converts file to base64 for storage
 * 
 * TODO: When backend is ready:
 * - Upload file directly to storage service (S3, etc.)
 * - Store only the file reference/URL in signup data
 */
export async function setLogoFile(file: File): Promise<SignupFormData | null> {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = () => {
      const base64Data = reader.result as string;
      const updated = updateSignupData({
        logo: {
          fileName: file.name,
          fileSize: file.size,
          fileType: file.type,
          fileData: base64Data,
        },
      });
      resolve(updated);
    };
    reader.onerror = () => {
      console.error("Failed to read logo file");
      resolve(null);
    };
    reader.readAsDataURL(file);
  });
}

/**
 * Add admin account to signup data
 */
export function setAdminAccount(
  data: AdminAccountData
): SignupFormData | null {
  return updateSignupData({ adminAccount: data });
}

/**
 * Mark signup as completed
 * 
 * TODO: When backend is ready:
 * - Send final submission to backend
 * - Create user account with provided data
 * - Generate authentication token
 * - Return token for login
 */
export async function submitSignupData(): Promise<{
  success: boolean;
  message: string;
  data?: SignupFormData;
  error?: string;
}> {
  const data = getSignupData();
  
  if (!data) {
    return {
      success: false,
      message: "No signup data found",
      error: "SESSION_NOT_FOUND",
    };
  }

  // Validate all required fields are filled
  if (
    !data.schoolInformation ||
    !data.subdomain ||
    !data.adminAccount ||
    !data.logo
  ) {
    return {
      success: false,
      message: "Incomplete signup data. Please complete all steps.",
      error: "INCOMPLETE_DATA",
    };
  }

  try {
    // TODO: Replace with actual backend API call
    // const response = await fetch('/api/auth/signup', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({
    //     schoolInformation: data.schoolInformation,
    //     subdomain: data.subdomain,
    //     branding: data.branding,
    //     logoFile: {
    //       fileName: data.logo.fileName,
    //       fileType: data.logo.fileType,
    //       fileData: data.logo.fileData,
    //     },
    //     adminAccount: {
    //       firstName: data.adminAccount.firstName,
    //       lastName: data.adminAccount.lastName,
    //       email: data.adminAccount.email,
    //       phone: data.adminAccount.phone,
    //       password: data.adminAccount.password,
    //     }
    //   })
    // });
    // 
    // if (!response.ok) {
    //   throw new Error(await response.text());
    // }
    // 
    // const result = await response.json();
    // localStorage.setItem('auth_token', result.token);
    // return { success: true, message: 'Signup completed successfully', data: result };

    // Temporary: mark as submitted in localStorage
    const submitted = updateSignupData({ status: "submitted" });
    return {
      success: true,
      message: "Signup data captured successfully. Ready for backend submission.",
      data: submitted || undefined,
    };
  } catch (error) {
    return {
      success: false,
      message: "Failed to submit signup data",
      error: String(error),
    };
  }
}

/**
 * Clear signup data (logout or reset)
 */
export function clearSignupData(): void {
  try {
    localStorage.removeItem(STORAGE_KEY);
    console.log("Signup data cleared");
  } catch (error) {
    console.error("Failed to clear signup data:", error);
  }
}

/**
 * Export signup data as JSON for debugging
 */
export function exportSignupDataAsJSON(): string {
  const data = getSignupData();
  if (!data) return "{}";
  
  // Remove large file data from export preview
  const exportData = {
    ...data,
    logo: data.logo ? {
      fileName: data.logo.fileName,
      fileSize: data.logo.fileSize,
      fileType: data.logo.fileType,
      hasFileData: !!data.logo.fileData,
    } : null,
  };
  
  return JSON.stringify(exportData, null, 2);
}
