import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { EmailTemplate } from "@/components/email-template";

import { generateStatement } from "@/utils/openai";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  try {
    // Extract JSON data from the request
    const body = await req.json();

    console.log("Form data received:", body);

    // Generate the SOP using OpenAI
    const statement = await generateStatement(body);

    // Generate the .txt file
    const fileContent = JSON.stringify(statement);
    const fileName = `sop-writer-${Date.now()}.txt`;

    // Convert content to a Buffer
    const fileBuffer = Buffer.from(fileContent, "utf-8");

    // attachmetn object
    const attachment = {
      content: fileBuffer.toString("base64"),
      filename: fileName,
      type: "text/plain",
      disposition: "attachment",
    };

    // Send the email by calling the Resend API
    const { data, error } = await resend.emails.send({
      from: "Acme <onboarding@resend.dev>",
      to: ["hana.habibpor@gmail.com"],
      subject: "SOP writer",
      react: EmailTemplate({ name: body.name }),
      attachments: [attachment],
    });

    if (error) {
      return NextResponse.json({ error }, { status: 500 });
    }

    return NextResponse.json(
      { message: "Form data received successfully!", data: data },
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
