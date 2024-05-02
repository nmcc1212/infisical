// Code generated by automation script, DO NOT EDIT.
// Automated by pulling database and generating zod schema
// To update. Just run npm run generate:schema
// Written by akhilmhdh.

import { z } from "zod";

import { TImmutableDBKeys } from "./models";

export const AccessApprovalRequestsReviewersSchema = z.object({
  id: z.string().uuid(),
  memberUserId: z.string().uuid(),
  status: z.string(),
  requestId: z.string().uuid(),
  createdAt: z.date(),
  updatedAt: z.date()
});

export type TAccessApprovalRequestsReviewers = z.infer<typeof AccessApprovalRequestsReviewersSchema>;
export type TAccessApprovalRequestsReviewersInsert = Omit<
  z.input<typeof AccessApprovalRequestsReviewersSchema>,
  TImmutableDBKeys
>;
export type TAccessApprovalRequestsReviewersUpdate = Partial<
  Omit<z.input<typeof AccessApprovalRequestsReviewersSchema>, TImmutableDBKeys>
>;