import { Client as WorklowClient } from "@upstash/workflow";
import config from "@/lib/config";
import { Client as QStashClient, resend } from "@upstash/qstash";

export const workflowClient = new WorklowClient({
    baseUrl: config.env.upstash.qstashUrl,
    token: config.env.upstash.qstashToken,
});


const qstashClient = new QStashClient({ token: config.env.upstash.qstashToken });

export const sendEmail= async ({email , subject, message}: 
  {email: string; subject: string; message: string})=>{
    await qstashClient.publishJSON({
        api: {
          name: "email",
          provider: resend({ token: config.env.resendToken }),
        },
        body: {
          from: "JS Mastery  <xinchao.qizapy.com>",
          to: [email],
          subject,
          html: message,
        },
      });
}
