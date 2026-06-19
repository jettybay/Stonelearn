/**
 * useSignupData Hook
 * Provides access to signup data with React state management
 * 
 * TODO: When backend is ready:
 * - Add real-time sync with backend
 * - Add automatic saving on data changes
 * - Add error boundary for network issues
 */

"use client";

import { useCallback, useEffect, useState } from "react";
import {
  SignupFormData,
  getSignupData,
  saveSignupData,
  createSignupSession,
  setSchoolInformation,
  setSubdomain,
  setPrimaryColor,
  setLogoFile,
  setAdminAccount,
  submitSignupData,
  clearSignupData,
} from "@/utility/signupData";
import { SchoolInformationData } from "@/components/onboarding/school-information-step";
import { AdminAccountData } from "@/components/onboarding/admin-step";

type UseSignupDataReturn = {
  data: SignupFormData | null;
  isLoading: boolean;
  error: string | null;
  // Data update methods
  updateSchoolInformation: (data: SchoolInformationData) => void;
  updateSubdomain: (subdomain: string) => void;
  updatePrimaryColor: (color: string) => void;
  updateLogo: (file: File) => Promise<void>;
  updateAdminAccount: (data: AdminAccountData) => void;
  submit: () => Promise<{ success: boolean; message: string; error?: string }>;
  clear: () => void;
  refresh: () => void;
};

export function useSignupData(): UseSignupDataReturn {
  const [data, setData] = useState<SignupFormData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Initialize or load existing signup data
  useEffect(() => {
    try {
      setIsLoading(true);
      let signupData = getSignupData();
      
      // Create new session if none exists
      if (!signupData) {
        signupData = createSignupSession();
        saveSignupData(signupData);
      }
      
      setData(signupData);
      setError(null);
    } catch (err) {
      setError(String(err));
      console.error("Failed to load signup data:", err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const refresh = useCallback(() => {
    try {
      const signupData = getSignupData();
      setData(signupData);
      setError(null);
    } catch (err) {
      setError(String(err));
      console.error("Failed to refresh signup data:", err);
    }
  }, []);

  const updateSchoolInformation = useCallback(
    (schoolData: SchoolInformationData) => {
      try {
        const updated = setSchoolInformation(schoolData);
        setData(updated);
        setError(null);
      } catch (err) {
        setError(String(err));
        console.error("Failed to update school information:", err);
      }
    },
    []
  );

  const updateSubdomain = useCallback((subdomain: string) => {
    try {
      const updated = setSubdomain(subdomain);
      setData(updated);
      setError(null);
    } catch (err) {
      setError(String(err));
      console.error("Failed to update subdomain:", err);
    }
  }, []);

  const updatePrimaryColor = useCallback((color: string) => {
    try {
      const updated = setPrimaryColor(color);
      setData(updated);
      setError(null);
    } catch (err) {
      setError(String(err));
      console.error("Failed to update primary color:", err);
    }
  }, []);

  const updateLogo = useCallback(async (file: File) => {
    try {
      const updated = await setLogoFile(file);
      setData(updated);
      setError(null);
    } catch (err) {
      const errorMsg = String(err);
      setError(errorMsg);
      console.error("Failed to update logo:", err);
    }
  }, []);

  const updateAdminAccount = useCallback((adminData: AdminAccountData) => {
    try {
      const updated = setAdminAccount(adminData);
      setData(updated);
      setError(null);
    } catch (err) {
      setError(String(err));
      console.error("Failed to update admin account:", err);
    }
  }, []);

  const submit = useCallback(async () => {
    try {
      setIsLoading(true);
      const result = await submitSignupData();
      
      if (!result.success) {
        setError(result.error || result.message);
        return {
          success: false,
          message: result.message,
          error: result.error,
        };
      }

      if (result.data) {
        setData(result.data);
      }
      setError(null);
      
      return {
        success: true,
        message: result.message,
      };
    } catch (err) {
      const errorMsg = String(err);
      setError(errorMsg);
      console.error("Failed to submit signup data:", err);
      return {
        success: false,
        message: "Failed to submit signup data",
        error: errorMsg,
      };
    } finally {
      setIsLoading(false);
    }
  }, []);

  const clear = useCallback(() => {
    try {
      clearSignupData();
      setData(null);
      setError(null);
    } catch (err) {
      setError(String(err));
      console.error("Failed to clear signup data:", err);
    }
  }, []);

  return {
    data,
    isLoading,
    error,
    updateSchoolInformation,
    updateSubdomain,
    updatePrimaryColor,
    updateLogo,
    updateAdminAccount,
    submit,
    clear,
    refresh,
  };
}
