import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendOrderConfirmationEmail({
  to,
  productName,
  price,
  downloadLink,
}: {
  to: string;
  productName: string;
  price: string;
  downloadLink: string;
}) {
  if (!process.env.RESEND_API_KEY || process.env.RESEND_API_KEY === 'placeholder') {
    console.log('RESEND_API_KEY is missing, skipping email.');
    return { success: false, error: 'RESEND_API_KEY is missing' };
  }

  try {
    // In a real scenario, we'd use a verified domain.
    // For development, Resend allows sending to the owner's email from 'onboarding@resend.dev'.
    const from = process.env.EMAIL_FROM || 'onboarding@resend.dev';

    // Since we're using HTML templates, we'll do a simple string replacement for now.
    // In production, using a library like 'react-email' is better.
    const html = `
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
        body { font-family: 'Geist', 'Inter', sans-serif; background-color: #050505; color: #FFFFFF; margin: 0; padding: 0; }
        .container { max-width: 600px; margin: 0 auto; background-color: #171717; border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 8px; overflow: hidden; }
        .header { padding: 0; }
        .header img { width: 100%; display: block; }
        .content { padding: 40px; }
        .footer { padding: 20px; text-align: center; font-size: 12px; color: #94A3B8; }
        h1 { color: #FFFFFF; font-size: 24px; margin-bottom: 20px; }
        p { color: #94A3B8; font-size: 16px; line-height: 1.6; }
        .button { display: inline-block; padding: 12px 24px; background: linear-gradient(to right, #3B82F6, #2DD4BF); color: #FFFFFF; text-decoration: none !important; border-radius: 8px; font-weight: bold; margin-top: 20px; }
        .order-details { margin-top: 30px; border-top: 1px solid rgba(255, 255, 255, 0.1); padding-top: 20px; }
        .order-item { display: flex; justify_content: space-between; margin-bottom: 10px; }
        .item-name { font-weight: bold; color: #FFFFFF; }
        .item-price { color: #F59E0B; }
    </style>
</head>
<body>
    <div class="container">
        <div class="content">
            <h1>Your Forge Is Ready.</h1>
            <p>Thank you for choosing EtherForge. Your digital assets have been generated and are ready for download.</p>
            
            <div class="order-details">
                <div class="order-item">
                    <span class="item-name">${productName}</span>
                    <span class="item-price">${price}</span>
                </div>
            </div>

            <a href="${downloadLink}" class="button">Access Your Assets</a>
            <p>If you have any questions, simply reply to this email.</p>
        </div>
        <div class="footer">
            &copy; 2026 EtherForge. All rights reserved. <br>
            Empowering autonomy through AI creation.
        </div>
    </div>
</body>
</html>
    `;

    const { data, error } = await resend.emails.send({
      from,
      to,
      subject: `Order Confirmed: ${productName} - EtherForge`,
      html,
    });

    if (error) {
      console.error('Resend error:', error);
      return { success: false, error };
    }

    return { success: true, data };
  } catch (err) {
    console.error('Resend catch error:', err);
    return { success: false, error: err };
  }
}

export async function sendWelcomeEmail({ to }: { to: string }) {
  if (!process.env.RESEND_API_KEY || process.env.RESEND_API_KEY === 'placeholder') {
    console.log('RESEND_API_KEY is missing, skipping welcome email.');
    return { success: false, error: 'RESEND_API_KEY is missing' };
  }

  try {
    const from = process.env.EMAIL_FROM || 'onboarding@resend.dev';
    const html = `
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
        body { font-family: 'Geist', 'Inter', sans-serif; background-color: #050505; color: #FFFFFF; margin: 0; padding: 0; }
        .container { max-width: 600px; margin: 0 auto; background-color: #171717; border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 8px; overflow: hidden; }
        .content { padding: 40px; }
        .footer { padding: 20px; text-align: center; font-size: 12px; color: #94A3B8; }
        h1 { color: #FFFFFF; font-size: 24px; margin-bottom: 20px; }
        p { color: #94A3B8; font-size: 16px; line-height: 1.6; }
        .button { display: inline-block; padding: 12px 24px; background: linear-gradient(to right, #3B82F6, #2DD4BF); color: #FFFFFF; text-decoration: none !important; border-radius: 8px; font-weight: bold; margin-top: 20px; }
    </style>
</head>
<body>
    <div class="container">
        <div class="content">
            <h1>Welcome to the Forge.</h1>
            <p>You've just taken the first step towards total digital autonomy.</p>
            <p>At EtherForge, we build systems that build wealth. Stay tuned for exclusive drops, AI toolkits, and productivity frameworks designed for the modern solopreneur.</p>
            <a href="${process.env.NEXT_PUBLIC_SITE_URL || 'https://etherforge.io'}" class="button">Explore the Catalog</a>
        </div>
        <div class="footer">
            &copy; 2026 EtherForge. All rights reserved.
        </div>
    </div>
</body>
</html>
    `;

    const { data, error } = await resend.emails.send({
      from,
      to,
      subject: 'Welcome to EtherForge - The Future of Digital Products',
      html,
    });

    if (error) return { success: false, error };
    return { success: true, data };
  } catch (err) {
    return { success: false, error: err };
  }
}
