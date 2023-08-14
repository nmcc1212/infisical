import express, { Request, Response } from "express";
import { getInviteOnlySignup, getRedisUrl, getSecretScanningGitAppId, getSecretScanningPrivateKey, getSecretScanningWebhookSecret, getSmtpConfigured } from "../../config";

const router = express.Router();

router.get(
  "/status",
  async (req: Request, res: Response) => {
    res.status(200).json({
      date: new Date(),
      message: "Ok",
      emailConfigured: await getSmtpConfigured(),
      secretScanningConfigured: await getSecretScanningGitAppId() && await getSecretScanningWebhookSecret() && await getSecretScanningPrivateKey(),
      inviteOnlySignup: await getInviteOnlySignup(),
      redisConfigured: await getRedisUrl() !== "" && await getRedisUrl() !== undefined
    })
  }
);

export default router