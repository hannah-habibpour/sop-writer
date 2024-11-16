import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json(); // Extract JSON data from the request

    // Log the data or use it however you need
    console.log("Form data received:", body);

    return NextResponse.json(
      { message: "Form data received successfully!", data: body },
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
