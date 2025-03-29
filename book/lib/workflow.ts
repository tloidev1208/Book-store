import { Client as WorklowClient } from "@upstash/workflow";
import config from "@/lib/config";

export const workflowClient = new WorklowClient({
    baseUrl: config.env.upstash.qstashUrl,
    token: config.env.upstash.qstashToken,
});