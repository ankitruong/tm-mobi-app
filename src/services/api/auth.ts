import { BASE_URL, DEFAULT_TIMEOUT } from "@/config/constants";
import { supabase } from "@/config/initSupabase";
import { ChangePasswordRequest } from "@/interfaces/auth";
import { AuthChangeEvent, Session } from "@supabase/supabase-js";
import * as AppleAuthentication from "expo-apple-authentication";
import { makeRedirectUri } from "expo-auth-session";
import * as WebBrowser from "expo-web-browser";

export async function loginWithEmailPassword(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  return { data, error };
}

export async function resendConfirmationEmail(email: string) {
  return supabase.auth.resend({
    type: "signup",
    email: email,
  });
}

export async function updateUser(firstName: string, lastName: string) {
  const { data, error } = await supabase.auth.updateUser({
    data: {
      firstName,
      lastName,
      full_name: `${firstName} ${lastName}`,
    },
  });
  return { data, error };
}

export async function signOutUser() {
  const { error } = await supabase.auth.signOut();
  return error;
}

export async function getUser() {
  return await supabase.auth.getUser();
}

export async function getSession() {
  return await supabase.auth.getSession();
}

export async function signInAnonymously() {
  return await supabase.auth.signInAnonymously();
}

export function onAuthStateChange(
  callback: (event: AuthChangeEvent, session: Session | null) => void,
) {
  return supabase.auth.onAuthStateChange(callback);
}

export async function reauthenticate() {
  return await supabase.auth.reauthenticate();
}

export async function changePassword({ password, otp }: ChangePasswordRequest) {
  return await supabase.auth.updateUser({ password, nonce: otp });
}

export async function signUpWithEmailPassword({
  email,
  password,
  firstName,
  lastName,
  captchaToken,
}: {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  captchaToken: string;
}) {
  const url = `${BASE_URL}/auth/signup`;

  const controller = new AbortController();

  const id = setTimeout(() => controller.abort(), DEFAULT_TIMEOUT);

  const body = JSON.stringify({
    firstName,
    lastName,
    email,
    password,
    captcha: captchaToken,
  });

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
      authorization: "some-authorizations",
    },
    body: body,
    signal: controller.signal,
  });

  clearTimeout(id);

  const result = await response.json();

  if (!response.ok) {
    return { data: null, error: result };
  } else {
    return { data: result.data, error: null };
  }
}

export async function loginWithGoogle() {
  const returnUrl = makeRedirectUri({
    path: "auth",
  });

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: returnUrl,
    },
  });

  if (data.url) {
    // Linking.openURL(data.url);
    const result = await WebBrowser.openAuthSessionAsync(data.url, returnUrl);
    // If the user successfully signs in
    // we will have access to an accessToken and an refreshToken
    // and then we'll use setSession (https://supabase.com/docs/reference/javascript/auth-setsession)
    // to create a Supabase-session using these token
    if (result.type === "success") {
      const url = result.url;
      const params = url.split("#")[1];
      const accessToken = params.split("&")[0].split("=")[1];
      const refreshToken = params.split("&")[4].split("=")[1];

      const { error: userError } = await supabase.auth.setSession({
        access_token: accessToken,
        refresh_token: refreshToken,
      });

      if (error) {
        return { data: null, error: userError };
      }

      const user = await getUser();

      return {
        ...user,
        data: {
          ...user.data,
          session: {
            access_token: accessToken,
            refresh_token: refreshToken,
          },
        },
      };
    }
  }
  return { data: null, error };
}

export async function loginWithTwitter() {
  const returnUrl = makeRedirectUri({
    path: "auth",
  });

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "twitter",
    options: {
      redirectTo: returnUrl,
    },
  });

  if (data.url) {
    // Linking.openURL(data.url);
    const result = await WebBrowser.openAuthSessionAsync(data.url);
    if (result.type === "success") {
      const url = result.url;
      const params = url.split("#")[1];
      const accessToken = params.split("&")[0].split("=")[1];
      const refreshToken = params.split("&")[4].split("=")[1];

      const { error: userError } = await supabase.auth.setSession({
        access_token: accessToken,
        refresh_token: refreshToken,
      });
      if (error) {
        return { data: null, error: userError };
      }
      const user = await getUser();
      return {
        ...user,
        data: {
          ...user.data,
          session: {
            access_token: accessToken,
            refresh_token: refreshToken,
          },
        },
      };
    }
  }
  return { data: null, error };
}

export async function loginWithDiscord() {
  const returnUrl = makeRedirectUri({
    path: "auth",
  });

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "discord",
    options: {
      redirectTo: returnUrl,
    },
  });

  if (data.url) {
    // Linking.openURL(data.url);
    const result = await WebBrowser.openAuthSessionAsync(data.url);
    if (result.type === "success") {
      const url = result.url;
      const params = url.split("#")[1];
      if (!params) {
        return {
          data: null,
          error: new Error("Authorization cancelled by user."),
        };
      }
      const accessToken = params.split("&")[0].split("=")[1];
      const refreshToken = params.split("&")[5].split("=")[1];

      const { error: userError } = await supabase.auth.setSession({
        access_token: accessToken,
        refresh_token: refreshToken,
      });
      if (error) {
        return { data: null, error: userError };
      }
      const user = await getUser();
      return {
        ...user,
        data: {
          ...user.data,
          session: {
            access_token: accessToken,
            refresh_token: refreshToken,
          },
        },
      };
    }
  }
  return { data: null, error };
}

export async function loginWithApple() {
  try {
    const credential = await AppleAuthentication.signInAsync({
      requestedScopes: [
        AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
        AppleAuthentication.AppleAuthenticationScope.EMAIL,
      ],
    });

    // Sign in via Supabase Auth.
    if (credential.identityToken) {
      const { error, data } = await supabase.auth.signInWithIdToken({
        provider: "apple",
        token: credential.identityToken,
      });

      if (error) {
        return { data: null, error: error };
      }

      return { data, error };
    }
    throw new Error("No identify token");
  } catch (e: unknown) {
    if (e instanceof Error && e?.message === "User already registered") {
      // handle that the user canceled the sign-in flow
      return { data: null, error: e };
    } else {
      // handle other errors
      return { data: null, error: e };
    }
  }
}

export async function signUpOrLogIn(
  email: string,
  password: string,
  highestPlan: string,
) {
  try {
    const response = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          firstName: "Astrobot Society",
          lastName: "Member",
          full_name: "Astrobot Society",
          subscribedPlanName:
            highestPlan === "BASIC" ? "ADVANCED" : highestPlan,
        },
      },
    });

    if (response.error?.message === "User already registered") {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) {
        return { data: null, error: error };
      }
      return { data: data, error: null };
    }
    return { data: response.data, error: null };
  } catch (error) {
    return { data: null, error: error };
  }
}

export async function getUserPlan(address: string) {
  const url = `${BASE_URL}/userplan`;

  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), DEFAULT_TIMEOUT);
  const body = JSON.stringify({
    address: address,
  });

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
      authorization: "some-authorizations",
    },
    body: body,
    signal: controller.signal,
  }).then((data) => data.json());

  clearTimeout(id);

  return response;
}

export const nftUserCreate = async (address: string) => {
  const url = `${BASE_URL}/auth/nftlogin`;

  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), DEFAULT_TIMEOUT);
  const body = JSON.stringify({
    address: address,
  });

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
      authorization: "some-authorizations",
    },
    body: body,
    signal: controller.signal,
  });

  clearTimeout(id);

  const result = await response.json();

  if (!response.ok) {
    return { data: null, error: result };
  } else {
    return { data: result, error: null };
  }
};
