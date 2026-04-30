import { Resend } from "resend";
import { NextRequest, NextResponse } from "next/server";

const FROM = "onboarding@resend.dev";
const TO = "joelbjos3ph@gmail.com";

const TYPE_LABELS: Record<string, string> = {
  financial_advisor: "Financial Advisor",
  property_agent: "Property Agent",
  interior_designer: "Interior Designer",
};

function row(label: string, value: string | number | undefined) {
  if (!value) return "";
  return `
    <tr>
      <td style="padding:8px 16px 8px 0;font-size:13px;font-weight:600;color:#64748b;width:180px;vertical-align:top;white-space:nowrap;">${label}</td>
      <td style="padding:8px 0;font-size:14px;color:#1e293b;">${value}</td>
    </tr>`;
}

function emailShell(title: string, rows: string) {
  return `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width"></head>
<body style="margin:0;padding:0;background:#f8fafc;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
  <div style="max-width:600px;margin:32px auto;background:#fff;border-radius:12px;overflow:hidden;border:1px solid #e2e8f0;">
    <div style="background:#4f46e5;padding:24px 32px;">
      <p style="margin:0;font-size:12px;font-weight:600;letter-spacing:0.1em;color:#c7d2fe;text-transform:uppercase;">MatchAdvisor</p>
      <h1 style="margin:6px 0 0;font-size:20px;font-weight:700;color:#fff;">${title}</h1>
    </div>
    <div style="padding:32px;">
      <table style="width:100%;border-collapse:collapse;">
        ${rows}
      </table>
    </div>
    <div style="padding:16px 32px;background:#f8fafc;border-top:1px solid #e2e8f0;">
      <p style="margin:0;font-size:12px;color:#94a3b8;">Sent by MatchAdvisor · notifications@matchadvisor.sg</p>
    </div>
  </div>
</body>
</html>`;
}

function confirmationEmail(firstName: string, bodyText: string) {
  return `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width"></head>
<body style="margin:0;padding:0;background:#f8fafc;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
  <div style="max-width:600px;margin:32px auto;background:#fff;border-radius:12px;overflow:hidden;border:1px solid #e2e8f0;">
    <div style="background:#4f46e5;padding:24px 32px;">
      <p style="margin:0;font-size:12px;font-weight:600;letter-spacing:0.1em;color:#c7d2fe;text-transform:uppercase;">MatchAdvisor</p>
    </div>
    <div style="padding:32px;font-size:15px;color:#1e293b;line-height:1.7;">
      <p style="margin:0 0 16px;">Hi ${firstName},</p>
      ${bodyText}
      <p style="margin:24px 0 4px;">Joel</p>
      <p style="margin:0;color:#64748b;font-size:13px;">Founder, MatchAdvisor<br>joelbjos3ph@gmail.com</p>
    </div>
    <div style="padding:16px 32px;background:#f8fafc;border-top:1px solid #e2e8f0;">
      <p style="margin:0;font-size:12px;color:#94a3b8;">Sent by MatchAdvisor · joelbjos3ph@gmail.com</p>
    </div>
  </div>
</body>
</html>`;
}

export async function POST(req: NextRequest) {
  const resend = new Resend(process.env.RESEND_API_KEY);
  const body = await req.json();

  const firstName = (body.name ?? "").split(" ")[0] || "there";

  let subject: string;
  let html: string;
  let confirmSubject: string;
  let confirmHtml: string;

  if (body.type === "professional") {
    const typeLabel = TYPE_LABELS[body.profession] ?? body.profession;
    subject = `New Professional Signup — ${body.name}`;
    html = emailShell(
      `New Professional Signup`,
      row("Name", body.name) +
      row("Email", body.email) +
      row("Phone", body.phone) +
      row("Profession", typeLabel) +
      row("Licence / Reg No.", body.licenceNumber) +
      row("Years of Experience", `${body.yearsOfExperience} years`) +
      row("Bio", body.bio)
    );
    confirmSubject = "Thanks for joining MatchAdvisor — we'll be in touch";
    confirmHtml = confirmationEmail(
      firstName,
      `<p style="margin:0 0 16px;">Thanks for applying to join MatchAdvisor as a verified professional. We've received your application and will review it within 48 hours.</p>
       <p style="margin:0;">We'll be in touch soon.</p>`
    );
  } else if (body.type === "consumer_lead") {
    const categoryLabel = TYPE_LABELS[body.category] ?? body.category;
    subject = `New Consumer Lead — ${categoryLabel}`;
    const d = body.details ?? {};

    let detailRows = "";
    if (body.category === "financial_advisor") {
      detailRows =
        row("Needs help with", Array.isArray(d.helpWith) ? d.helpWith.join(", ") : d.helpWith) +
        row("Age range", d.ageRange) +
        row("Monthly income", d.incomeRange) +
        row("Specific concerns", d.concerns || "None provided");
    } else if (body.category === "property_agent") {
      detailRows =
        row("Intent", d.intent === "buy" ? "Buy a property" : "Sell my property") +
        row("Property type", d.propertyType) +
        row(d.intent === "sell" ? "Est. property value" : "Budget range", d.budget) +
        row("Timeline", d.timeline === "urgent" ? "Urgent (within 1 month)" : d.timeline === "3months" ? "Within 3 months" : "Just exploring");
    } else if (body.category === "interior_designer") {
      detailRows =
        row("Property type", d.propertyType) +
        row("Renovation type", d.renoType === "full" ? "Full Renovation" : d.renoType === "partial" ? "Partial Renovation" : "ID Consultation") +
        row("Budget", d.budget) +
        row("Start date", d.startDate === "asap" ? "As soon as possible" : d.startDate === "1-3months" ? "1–3 months from now" : d.startDate === "3-6months" ? "3–6 months from now" : "More than 6 months away");
    }

    html = emailShell(
      `New ${categoryLabel} Lead`,
      row("Name", body.name) +
      row("Email", body.email) +
      row("Phone", body.phone) +
      detailRows
    );

    const professionalLabel =
      body.category === "financial_advisor"
        ? "a verified MAS-licensed financial advisor"
        : body.category === "property_agent"
        ? "a CEA-registered property agent"
        : "a verified interior designer";

    confirmSubject = "We've received your request — MatchAdvisor";
    confirmHtml = confirmationEmail(
      firstName,
      `<p style="margin:0 0 16px;">Thanks for reaching out. We've received your request and are personally reviewing it now.</p>
       <p style="margin:0 0 16px;">Based on what you've shared, we'll match you with ${professionalLabel} who fits your specific situation. You can expect to hear from us within 24 hours.</p>
       <p style="margin:0;">In the meantime, if you have any questions just reply to this email.</p>`
    );
  } else {
    return NextResponse.json({ error: "Unknown email type" }, { status: 400 });
  }

  const [notifyResult, confirmResult] = await Promise.all([
    resend.emails.send({ from: FROM, to: TO, subject, html }),
    resend.emails.send({ from: FROM, to: body.email, subject: confirmSubject, html: confirmHtml }),
  ]);

  const error = notifyResult.error ?? confirmResult.error;
  if (error) {
    console.error("[Resend error]", error);
    return NextResponse.json({ error }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
