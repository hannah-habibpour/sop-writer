import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { EmailTemplate } from "@/components/email-template";
import { generateStatement } from "@/utils/openai";
import { generatePDFBuffer } from "@/utils/generate-pdf";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  try {
    // Extract JSON data from the request
    const body = await req.json();

    console.log("Form data received:", body);

    // Generate the SOP using OpenAI
    const statement = await generateStatement(body);

    // Generate the PDF buffer
    const pdfBuffer = await generatePDFBuffer(statement);

    // attachmetn object
    const attachment = {
      content: pdfBuffer.toString("base64"),
      filename: "sop-writer.pdf",
      type: "application/pdf",
      disposition: "attachment",
    };

    // Send the email by calling the Resend API
    const { data, error } = await resend.emails.send({
      from: "Glovee <sop@glovee.io>",
      to: [body.email],
      subject: "Your SOP is ready!",
      react: EmailTemplate({ name: body["full-name"] }),
      attachments: [attachment],
    });

    if (error) {
      return NextResponse.json({ error }, { status: 500 });
    }

    return NextResponse.json(
      { message: "SOP emailed to you successfully!", data: data },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error processing form data:", error);
    return NextResponse.json(
      { message: "Error processing form data" },
      { status: 500 }
    );
  }
}
