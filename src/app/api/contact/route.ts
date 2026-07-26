import { NextResponse } from "next/server";

interface ContactRequestBody {
  name: string;
  email: string;
  phone?: string;
  message: string;
}

export async function POST(request: Request) {
  try {
    const body: ContactRequestBody = await request.json();

    const { name, email, phone, message } = body;

    // Validate required fields
    const errors: string[] = [];

    if (!name || typeof name !== "string" || name.trim().length === 0) {
      errors.push("Name is required");
    }

    if (!email || typeof email !== "string" || email.trim().length === 0) {
      errors.push("Email is required");
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      errors.push("Please provide a valid email address");
    }

    if (!message || typeof message !== "string" || message.trim().length === 0) {
      errors.push("Message is required");
    }

    if (errors.length > 0) {
      return NextResponse.json({ error: errors.join(". ") }, { status: 400 });
    }

    // Log form data (placeholder for Resend/nodemailer integration)
    console.log("[Contact Form Submission]", {
      name: name.trim(),
      email: email.trim(),
      phone: phone?.trim() || null,
      message: message.trim(),
      timestamp: new Date().toISOString(),
    });

    // Return success response with CORS headers
    return NextResponse.json(
      {
        success: true,
        message: "Thank you for your message. We will get back to you shortly.",
      },
      {
        status: 200,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "POST, OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type, Authorization",
        },
      }
    );
  } catch (error) {
    console.error("[Contact Form Error]", error);

    if (error instanceof SyntaxError) {
      return NextResponse.json(
        { error: "Invalid JSON in request body" },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: "An unexpected error occurred. Please try again later." },
      { status: 500 }
    );
  }
}
