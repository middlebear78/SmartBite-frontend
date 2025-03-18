// services/authServices.ts
import { API_BASE_URL } from "@env";

interface GoogleAuthResponse {
  user: any;
  tokens?: {
    refresh: string;
    access: string;
  };
  exists?: boolean;
  needs_google_link?: boolean;
}

export const checkGoogleUser = async (userData: {
  email: string;
  google_id: string;
  given_name?: string;
  family_name?: string;
  picture?: string;
}): Promise<GoogleAuthResponse> => {
  const response = await fetch(`${API_BASE_URL}/auth/google/check-user/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });

  if (!response.ok) {
    throw new Error(await response.text());
  }

  return response.json();
};

export const registerGoogleUser = async (userData: {
  email: string;
  google_id: string;
  given_name?: string;
  family_name?: string;
  picture?: string;
}): Promise<GoogleAuthResponse> => {
  const response = await fetch(`${API_BASE_URL}/auth/google/register/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });

  if (!response.ok) {
    throw new Error(await response.text());
  }

  return response.json();
};

export const loginGoogleUser = async (userData: {
  email: string;
  google_id: string;
}): Promise<GoogleAuthResponse> => {
  const response = await fetch(`${API_BASE_URL}/auth/google/login/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });

  if (!response.ok) {
    throw new Error(await response.text());
  }

  return response.json();
};
