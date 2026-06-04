import { z } from "zod";

const normalizeText = (value: unknown) => {
  if (typeof value !== "string") {
    return value;
  }

  return value.trim();
};

const normalizeUrl = (value: unknown) => {
  if (typeof value !== "string") {
    return value;
  }

  const trimmed = value.trim();
  if (!trimmed) {
    return trimmed;
  }

  return /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`;
};

const requiredText = (label: string, minLength = 1) =>
  z
    .string({ required_error: `${label} is required.` })
    .trim()
    .min(1, `${label} is required.`)
    .min(minLength, `${label} must be at least ${minLength} characters.`);

const requiredUrl = (label: string) =>
  z
    .string({ required_error: `${label} is required.` })
    .trim()
    .min(1, `${label} is required.`)
    .transform(normalizeUrl)
    .pipe(z.string().url(`Enter a valid ${label.toLowerCase()}.`));

export const startupStages = [
  "Idea",
  "MVP",
  "Early traction",
  "Growing",
] as const;

export const stepFieldNames = [
  ["first_name", "last_name", "email", "phone_number", "linkedin_url"],
  ["startup_name", "website_url", "current_stage", "startup_description", "target_customer"],
  ["main_challenge", "questions_for_room", "available_for_event", "additional_notes"],
] as const;

export const startupApplicationSchema = z.object({
  first_name: requiredText("First name"),
  last_name: requiredText("Last name"),
  email: z.preprocess(
    normalizeText,
    z
      .string()
      .min(1, "Email address is required.")
      .email("Enter a valid email address."),
  ),
  phone_number: requiredText("Phone number", 7),
  linkedin_url: requiredUrl("LinkedIn profile"),
  startup_name: requiredText("Startup name"),
  website_url: requiredUrl("Website"),
  current_stage: z.enum(startupStages, {
    required_error: "Please select the current stage.",
  }),
  startup_description: requiredText("What your startup does", 20),
  target_customer: requiredText("Target customer", 20),
  main_challenge: requiredText("Main challenge", 20),
  questions_for_room: requiredText("Questions for the room", 10).superRefine((value, ctx) => {
    const lines = value
      .split("\n")
      .map((line) => line.trim())
      .filter(Boolean);

    if (lines.length === 0) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "List at least one question for the room.",
      });
    }

    if (lines.length > 3) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Please keep this to a maximum of 3 questions.",
      });
    }
  }),
  available_for_event: z.enum(["yes", "no"], {
    required_error: "Please confirm whether you can attend the event.",
  }),
  additional_notes: z.preprocess(normalizeText, z.string().optional()).transform((value) => value || ""),
});

export type StartupApplicationFormValues = z.infer<typeof startupApplicationSchema>;

export const startupApplicationDefaultValues: StartupApplicationFormValues = {
  first_name: "",
  last_name: "",
  email: "",
  phone_number: "",
  linkedin_url: "",
  startup_name: "",
  website_url: "",
  current_stage: "Idea",
  startup_description: "",
  target_customer: "",
  main_challenge: "",
  questions_for_room: "",
  available_for_event: "yes",
  additional_notes: "",
};
