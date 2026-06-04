import { createServerFn } from "@tanstack/react-start";
import { env } from "cloudflare:workers";

import { startupApplicationSchema } from "@/features/startup-application/schema";

export const submitStartupApplication = createServerFn({ method: "POST" })
  .inputValidator(startupApplicationSchema)
  .handler(async ({ data }) => {
    if (!env.DB) {
      throw new Error("Cloudflare D1 binding `DB` is not configured.");
    }

    const statement = env.DB.prepare(
      `
        INSERT INTO startup_applications (
          first_name,
          last_name,
          email,
          phone_number,
          linkedin_url,
          startup_name,
          website_url,
          current_stage,
          startup_description,
          target_customer,
          main_challenge,
          questions_for_room,
          available_for_event,
          additional_notes
        )
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `,
    );

    const result = await statement
      .bind(
        data.first_name,
        data.last_name,
        data.email,
        data.phone_number,
        data.linkedin_url,
        data.startup_name,
        data.website_url,
        data.current_stage,
        data.startup_description,
        data.target_customer,
        data.main_challenge,
        data.questions_for_room,
        data.available_for_event === "yes" ? 1 : 0,
        data.additional_notes || null,
      )
      .run();

    if (!result.success) {
      throw new Error("Failed to save the startup application.");
    }

    return {
      success: true as const,
      applicationId: result.meta.last_row_id ?? null,
    };
  });
