import { db } from "@/database/drizzle";
import { users } from "@/database/schema";
import { serve } from "@upstash/workflow/nextjs"
import { eq } from "drizzle-orm";
import {sendEmail} from '@/lib/workflow';
type UserState='non-active'|'active';


type InitialData = {
  email: string;
  fullName:string;
};


 const ONE_DAY_IN_MS=24*60*60*1000;
 const THREE_DAYS_IN_MS=3*ONE_DAY_IN_MS;
 const THIRTY_DAYS_IN_MS=30*ONE_DAY_IN_MS;

 const getUserState = async(email:string): Promise<UserState>=>{
   const user=await db.select().from(users).where(eq(users.email, email)).limit(1);
  if(user.length===0) return 'non-active';

  const lastACtivityDtae=new Date (user[0].lastActivityDate!);
  
  
  const now=new Date();


  const timeDifference=now.getTime()-lastACtivityDtae.getTime();
  
  if(timeDifference>THREE_DAYS_IN_MS && timeDifference<= THIRTY_DAYS_IN_MS){
    return 'non-active';
  }
  return'active';
 }
export const { POST } = serve<InitialData>(async (context) => {
  const { email, fullName } = context.requestPayload

  //welcome Email
  await context.run("new-signup", async () => {
    await sendEmail({
      email,subject:'chao mung den dien dan',
      message:`chao mung ${fullName}!`
    });
  });

  await context.sleep("wait-for-3-days", 60 * 60 * 24 * 3)

  while (true) {
    const state = await context.run("check-user-state", async () => {
      return await getUserState(email);
    })

    if (state === "non-active") {
      await context.run("send-email-non-active", async () => {
        await sendEmail({
          email,
          subject:"Bạn vẫn ở đây chứ ?",
          message:`Hi ${fullName}, chúng tôi nhớ bạn`,
        })
      })
    } else if (state === "active") {
      await context.run("send-email-active", async () => {
        await sendEmail(
          {
            email,
            subject:"Chào mừng quay trở lại",
            message:`Chào mừng quay trở lại  ${fullName}!`,
          }
        )
      })
    }

    await context.sleep("wait-for-1-month", 60 * 60 * 24 * 30)
  }
})



