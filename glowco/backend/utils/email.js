const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

/**
 * sendOrderConfirmation
 * Sends an HTML order confirmation email to the customer.
 */
const sendOrderConfirmation = async (email, customerName, order) => {
  const itemRows = order.items.map(item => `
    <tr>
      <td style="padding:8px 12px;border-bottom:1px solid #f0e8e0">${item.name}</td>
      <td style="padding:8px 12px;border-bottom:1px solid #f0e8e0;text-align:center">×${item.quantity}</td>
      <td style="padding:8px 12px;border-bottom:1px solid #f0e8e0;text-align:right">$${(item.price * item.quantity).toFixed(2)}</td>
    </tr>
  `).join('');

  const shortId = order._id.toString().slice(-6).toUpperCase();

  await transporter.sendMail({
    from:    `"GlowCo 🌸" <${process.env.EMAIL_USER}>`,
    to:      email,
    subject: `Order Confirmed — #GC-${shortId}`,
    html: `
      <!DOCTYPE html>
      <html>
      <body style="font-family:'Segoe UI',sans-serif;background:#fffbf7;margin:0;padding:20px">
        <div style="max-width:560px;margin:0 auto;background:#fff;border-radius:16px;overflow:hidden;border:1px solid #f0e8e0">
          <div style="background:#c97b63;padding:28px 32px;text-align:center">
            <h1 style="color:#fff;margin:0;font-size:24px;font-weight:400;font-family:Georgia,serif">🌸 GlowCo</h1>
            <p style="color:rgba(255,255,255,0.85);margin:8px 0 0;font-size:14px">Your order is confirmed!</p>
          </div>
          <div style="padding:28px 32px">
            <p style="color:#3d2c1e;font-size:15px">Hi ${customerName},</p>
            <p style="color:#8b6b57;font-size:14px;line-height:1.7">
              Thank you for your order! We're already preparing your skincare goodies. You'll receive another email when your order ships.
            </p>
            <div style="background:#fdeee8;border-radius:10px;padding:14px 18px;margin:20px 0">
              <p style="margin:0;font-size:13px;color:#3d2c1e">
                <strong>Order ID:</strong> #GC-${shortId}<br/>
                <strong>Date:</strong> ${new Date(order.createdAt).toLocaleDateString('en-IN', { day:'numeric', month:'long', year:'numeric' })}<br/>
                <strong>Status:</strong> Confirmed ✓
              </p>
            </div>
            <table style="width:100%;border-collapse:collapse;margin:20px 0">
              <thead>
                <tr style="background:#fdf8f5">
                  <th style="padding:10px 12px;text-align:left;font-size:12px;color:#8b6b57;text-transform:uppercase;letter-spacing:1px">Item</th>
                  <th style="padding:10px 12px;text-align:center;font-size:12px;color:#8b6b57;text-transform:uppercase;letter-spacing:1px">Qty</th>
                  <th style="padding:10px 12px;text-align:right;font-size:12px;color:#8b6b57;text-transform:uppercase;letter-spacing:1px">Price</th>
                </tr>
              </thead>
              <tbody>${itemRows}</tbody>
              <tfoot>
                <tr>
                  <td colspan="2" style="padding:10px 12px;text-align:right;font-size:14px;color:#8b6b57">Shipping</td>
                  <td style="padding:10px 12px;text-align:right;font-size:14px;color:#3d2c1e">${order.shippingCost === 0 ? 'FREE' : '$' + order.shippingCost.toFixed(2)}</td>
                </tr>
                <tr>
                  <td colspan="2" style="padding:10px 12px;text-align:right;font-weight:700;font-size:15px;color:#3d2c1e">Total</td>
                  <td style="padding:10px 12px;text-align:right;font-weight:700;font-size:16px;color:#c97b63">$${order.totalAmount.toFixed(2)}</td>
                </tr>
              </tfoot>
            </table>
            <div style="border-top:1px solid #f0e8e0;padding-top:20px;margin-top:20px">
              <p style="color:#8b6b57;font-size:13px;line-height:1.6">
                Questions? Reply to this email or contact us at <a href="mailto:support@glowco.com" style="color:#c97b63">support@glowco.com</a>
              </p>
            </div>
          </div>
          <div style="background:#fdf8f5;padding:16px 32px;text-align:center">
            <p style="color:#c4a899;font-size:12px;margin:0">© 2026 GlowCo · Clean Beauty · Cruelty Free 🌱</p>
          </div>
        </div>
      </body>
      </html>
    `,
  });
};

/**
 * sendWelcomeEmail — sent on new signup
 */
const sendWelcomeEmail = async (email, name) => {
  await transporter.sendMail({
    from:    `"GlowCo 🌸" <${process.env.EMAIL_USER}>`,
    to:      email,
    subject: `Welcome to GlowCo, ${name.split(' ')[0]}! 🌸`,
    html: `
      <div style="font-family:'Segoe UI',sans-serif;max-width:520px;margin:0 auto;padding:20px">
        <h2 style="color:#c97b63;font-family:Georgia,serif;font-weight:400">Welcome to GlowCo, ${name.split(' ')[0]}! 🌸</h2>
        <p style="color:#8b6b57;line-height:1.7">We're so excited to have you join the Glow community! Your journey to healthy, glowing skin starts here.</p>
        <p style="color:#8b6b57;line-height:1.7"><strong style="color:#3d2c1e">Don't forget:</strong> Take our Skin Quiz to get personalized product recommendations tailored just for you.</p>
        <a href="${process.env.FRONTEND_URL}/quiz" style="display:inline-block;background:#c97b63;color:#fff;text-decoration:none;padding:12px 28px;border-radius:24px;font-weight:600;margin-top:8px">Take Skin Quiz →</a>
        <p style="color:#c4a899;font-size:12px;margin-top:24px">GlowCo · Clean Beauty · hello@glowco.com</p>
      </div>
    `,
  });
};

module.exports = { sendOrderConfirmation, sendWelcomeEmail };
