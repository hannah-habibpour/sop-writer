import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { EmailTemplate } from "@/components/email-template";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  try {
    const body = await req.json(); // Extract JSON data from the request

    // Log the data or use it however you need
    console.log("Form data received:", body);

    // Send an email using the Resend API
    const { data, error } = await resend.emails.send({
      from: "Acme <onboarding@resend.dev>",
      to: ["hana.habibpor@gmail.com"],
      subject: "SOP writer",
      react: EmailTemplate({ name: body.name }),
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
