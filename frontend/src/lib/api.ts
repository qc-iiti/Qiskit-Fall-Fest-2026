// Thin client for the NestJS backend. All form submissions go through here
// rather than talking to Supabase directly from the browser.

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

export class ApiError extends Error {
  status: number;
  constructor(message: string, status: number) {
    super(message);
    this.status = status;
  }
}

async function post<T>(path: string, body: unknown): Promise<T> {
  const res = await fetch(`${API_URL}${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    const message =
      (Array.isArray(data?.message) ? data.message.join(", ") : data?.message) ||
      "Something went wrong. Please try again.";
    throw new ApiError(message, res.status);
  }

  return data as T;
}

export type RegistrationPayload = {
  fullName: string;
  email: string;
  phone: string;
  institution: string;
  yearOfStudy: string;
  attendanceMode: "in-person" | "online";
  experienceLevel: "beginner" | "intermediate" | "advanced";
  interests: string[];
  hearAboutUs?: string;
};

export type HackathonRegistrationPayload = {
  teamName: string;
  track?: string;
  attendanceMode: "in-person" | "online";
  problemStatement?: string;
  leader: {
    fullName: string;
    email: string;
    phone: string;
    institution: string;
  };
  members: {
    fullName: string;
    email: string;
    institution: string;
  }[];
  githubUrl?: string;
  agreedToRules: boolean;
};

export function submitRegistration(payload: RegistrationPayload) {
  return post<{ id: string }>("/registrations", payload);
}

export function submitHackathonRegistration(payload: HackathonRegistrationPayload) {
  return post<{ id: string }>("/hackathon-registrations", payload);
}
