import { serve } from "@upstash/workflow/nextjs";
import { db } from "@/database/drizzle";
import { users } from "@/database/schema";
import { eq } from "drizzle-orm";
import { sendEmail } from "@/lib/workflow";

type UserState = "non-active" | "active";

type InitialData = {
  email: string;
  fullName: string;
};

const ONE_DAY_IN_MS = 24 * 60 * 60 * 1000;
const THREE_DAYS_IN_MS = 3 * ONE_DAY_IN_MS;
const THIRTY_DAYS_IN_MS = 30 * ONE_DAY_IN_MS;

const getUserState = async (email: string): Promise<UserState> => {
  const user = await db
    .select()
    .from(users)
    .where(eq(users.email, email))
    .limit(1);

  if (user.length === 0) return "non-active";

  const lastActivityDate = new Date(user[0].lastActivityDate!);
  const now = new Date();
  const timeDifference = now.getTime() - lastActivityDate.getTime();

  if (
    timeDifference > THREE_DAYS_IN_MS &&
    timeDifference <= THIRTY_DAYS_IN_MS
  ) {
    return "non-active";
  }

  return "active";
};

// Hàm tạo nội dung email đẹp hơn
const generateEmailContent = (title: string, message: string) => `
  <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
    <h2 style="color: #333;">${title}</h2>
    <p style="color: #555; font-size: 16px;">${message}</p>
    <br/>
    <p style="color: #777; font-size: 14px;">Trân trọng,<br/> Đội ngũ hỗ trợ Qizapy</p>
  </div>
`;

export const { POST } = serve<InitialData>(async (context) => {
  const { email, fullName } = context.requestPayload;

  // Gửi email chào mừng
  await context.run("new-signup", async () => {
    await sendEmail({
      email,
      subject: "🎉 Chào mừng bạn đến với Qizapy!",
      message: generateEmailContent(
        "Xin chào " + fullName + "!",
        "Chúng tôi rất vui khi bạn tham gia Qizapy. Hãy bắt đầu khám phá nền tảng ngay hôm nay!"
      ),
    });
  });

  await context.sleep("wait-for-3-days", 60 * 60 * 24 * 3);

  while (true) {
    const state = await context.run("check-user-state", async () => {
      return await getUserState(email);
    });

    if (state === "non-active") {
      await context.run("send-email-non-active", async () => {
        await sendEmail({
          email,
          subject: "🤔 Bạn vẫn ở đó chứ, " + fullName + "?",
          message: generateEmailContent(
            "Chúng tôi rất nhớ bạn!",
            `Bạn đã vắng mặt một thời gian. Hãy quay lại và tiếp tục khám phá Qizapy nhé!`
          ),
        });
      });
    } else if (state === "active") {
      await context.run("send-email-active", async () => {
        await sendEmail({
          email,
          subject: "🔥 Hoan nghênh sự trở lại của bạn!",
          message: generateEmailContent(
            "Chào mừng trở lại, " + fullName + "!",
            `Thật tuyệt khi thấy bạn quay lại Qizapy. Hãy tiếp tục hành trình ngay hôm nay!`
          ),
        });
      });
    }

    await context.sleep("wait-for-1-month", 60 * 60 * 24 * 30);
  }
});
