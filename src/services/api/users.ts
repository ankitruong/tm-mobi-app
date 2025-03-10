import { BASE_URL, DEFAULT_TIMEOUT } from "@/config/constants";
import {
  ChangePasswordResponse,
  DeleteUserResponse,
  UploadProfileImageResponse,
  UserDetailsResponse,
  UserProfileDto,
  UserProfileResponse,
} from "@/interfaces/user";

export async function getUserDetails(
  authorizationToken: string,
): Promise<UserProfileResponse> {
  const url = `${BASE_URL}/users/profile`;

  const controller = new AbortController();

  const id = setTimeout(() => controller.abort(), DEFAULT_TIMEOUT);

  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-type": "application/json",
      authorization: `Bearer ${authorizationToken}`,
    },
    signal: controller.signal,
  });

  clearTimeout(id);

  if (!response.ok) {
    throw Error(
      "Something went wrong while fetching user details. Please try again later.",
    );
  }

  const data = await response.json();

  return data;
}

export async function updateUserProfile(
  payload: UserProfileDto,
  authorizationToken: string,
): Promise<UserDetailsResponse> {
  const url = `${BASE_URL}/users/updateUser`;
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), DEFAULT_TIMEOUT);

  const body = JSON.stringify({
    firstName: payload.firstName,
    lastName: payload.lastName,
  });

  const response = await fetch(url, {
    method: "POST",
    body: body,
    headers: {
      "Content-type": "application/json",
      authorization: `Bearer ${authorizationToken}`,
    },
    signal: controller.signal,
  });

  clearTimeout(id);

  if (!response.ok) {
    throw Error(
      "Something went wrong while updating user profile. Please try again later.",
    );
  }

  const data = await response.json();

  return data;
}

export async function changePassword(
  oldPassword: string,
  newPassword: string,
  authorizationToken: string,
): Promise<ChangePasswordResponse> {
  const url = `${BASE_URL}/users/change-password`;
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), DEFAULT_TIMEOUT);

  const body = JSON.stringify({
    newPassword,
    oldPassword,
  });

  const response = await fetch(url, {
    method: "POST",
    body: body,
    headers: {
      "Content-type": "application/json",
      authorization: `Bearer ${authorizationToken}`,
    },
    signal: controller.signal,
  });

  clearTimeout(id);

  if (!response.ok) {
    throw Error(
      "Something went wrong while changing password. Please try again later.",
    );
  }

  const data = await response.json();

  return data;
}

export async function deleteUserAccount(
  authorizationToken: string,
): Promise<DeleteUserResponse> {
  const url = `${BASE_URL}/users/deleteUser`;
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), DEFAULT_TIMEOUT);

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
      authorization: `Bearer ${authorizationToken}`,
    },
    signal: controller.signal,
  });

  clearTimeout(id);

  if (!response.ok) {
    throw Error(
      "Something went wrong while deleting user account. Please try again later.",
    );
  }

  const data = await response.json();

  return data;
}

export async function uploadProfileImage(
  formData: FormData,
  authorizationToken: string,
): Promise<UploadProfileImageResponse> {
  const url = `${BASE_URL}/users/upload-profile-picture`;
  const controller = new AbortController();

  const id = setTimeout(() => controller.abort(), DEFAULT_TIMEOUT);

  const response = await fetch(url, {
    method: "POST",
    body: formData,
    headers: {
      authorization: `Bearer ${authorizationToken}`,
      "Content-Type": "multipart/form-data",
    },
    signal: controller.signal,
  });

  clearTimeout(id);

  if (!response.ok) {
    throw Error(
      "Something went wrong while updating user profile. Please try again later.",
    );
  }

  const data = await response.json();

  return data;
}
