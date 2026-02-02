import { sendConfirmationEmail } from "@/lib/email";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, name } = body;

    if (!email || !name) {
      return NextResponse.json(
        { error: "Email and name are required" },
        { status: 400 }
      );
    }

    await sendConfirmationEmail({ to: email, name });

    return NextResponse.json(
      { success: true, message: "Confirmation email sent successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error in send-email route:", error);
    return NextResponse.json(
      { error: "Failed to send email" },
      { status: 500 }
    );
  }
}
