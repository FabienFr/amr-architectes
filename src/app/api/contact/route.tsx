import { NextRequest, NextResponse } from "next/server";
import { formatError } from "@/lib/errors";
import { sendContactEmails } from "@/lib/emails";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();

    const type = formData.get("type") as string;
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const phone = formData.get("phone") as string;
    const message = formData.get("message") as string;
    const file = formData.get("file") as File | null;

    const attachments = [];

    if (file) {
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);

      attachments.push({
        filename: file.name,
        content: buffer,
      });
    }

    await sendContactEmails({
      type,
      name,
      email,
      phone,
      message,
      attachments,
      siteName: "AMR Architectes",
      notifyTo: "michael@amr-architectes.com",
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    const err = formatError(error);
    console.error("Erreur API contact :", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
