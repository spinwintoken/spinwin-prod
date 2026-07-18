import { serve } from "https://deno.land/std/http/server.ts";
import { Resend } from "npm:resend";

serve(async (req) => {
  try {
    const { to, subject, message } = await req.json();

    const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

    await resend.emails.send({
      from: "noreply@spinwintoken.com",
      to,
      subject,
      html: `<p>${message}</p>`
    });

    return new Response(JSON.stringify({ status: "sent" }), {
      headers: { "Content-Type": "application/json" }
    });

  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
});

