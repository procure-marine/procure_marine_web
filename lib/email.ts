/**
 * Email Sending Utilities
 * 
 * This module handles sending order confirmation emails using Resend.
 * When a customer submits an order, an email is sent to the company
 * with all order details.
 */

'use server';

import { Resend } from 'resend';
import { OrderSubmission } from './types';

// Initialize Resend with API key from environment variables
// You'll need to set RESEND_API_KEY in your .env.local file
const resend = new Resend(process.env.RESEND_API_KEY);

/**
 * Generate a unique order reference number
 * Format: PM-YYYYMMDD-XXXX (PM = Procure Marine)
 * @returns Order reference string
 */
function generateOrderReference(): string {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const random = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
  
  return `PM-${year}${month}${day}-${random}`;
}

/**
 * Format price for display
 * @param amount - Price amount
 * @param currency - Currency code
 * @returns Formatted price string
 */
function formatPrice(amount: number, currency: string = 'USD'): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency,
  }).format(amount);
}

/**
 * Generate HTML email template for order submission
 * @param order - Order submission data
 * @param orderReference - Unique order reference number
 * @returns HTML email content
 */
function generateOrderEmailHTML(order: OrderSubmission, orderReference: string): string {
  // Calculate totals
  let subtotal = 0;
  let quoteItemsCount = 0;
  
  order.items.forEach(item => {
    if (item.product.price.type === 'fixed' && item.product.price.amount) {
      subtotal += item.product.price.amount * item.quantity;
    } else {
      quoteItemsCount += item.quantity;
    }
  });
  
  // Generate product rows HTML
  const productRows = order.items.map(item => {
    const price = item.product.price.type === 'fixed' && item.product.price.amount
      ? formatPrice(item.product.price.amount, item.product.price.currency)
      : 'Price on Request';
    
    const total = item.product.price.type === 'fixed' && item.product.price.amount
      ? formatPrice(item.product.price.amount * item.quantity, item.product.price.currency)
      : 'Price on Request';
    
    return `
      <tr>
        <td style="padding: 12px; border-bottom: 1px solid #e5e7eb;">
          <strong>${item.product.name}</strong><br>
          <span style="color: #6b7280; font-size: 14px;">Part No: ${item.product.partNumber}</span>
        </td>
        <td style="padding: 12px; border-bottom: 1px solid #e5e7eb; text-align: center;">${item.quantity}</td>
        <td style="padding: 12px; border-bottom: 1px solid #e5e7eb; text-align: right;">${price}</td>
        <td style="padding: 12px; border-bottom: 1px solid #e5e7eb; text-align: right;"><strong>${total}</strong></td>
      </tr>
    `;
  }).join('');
  
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>New Order Request - ${orderReference}</title>
    </head>
    <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 800px; margin: 0 auto; padding: 20px;">
      <div style="background-color: #003366; color: white; padding: 20px; text-align: center;">
        <h1 style="margin: 0;">New Order Request</h1>
        <p style="margin: 10px 0 0 0; font-size: 18px;">Reference: ${orderReference}</p>
      </div>
      
      <div style="background-color: #f8f9fa; padding: 20px; margin: 20px 0;">
        <h2 style="margin-top: 0; color: #003366;">Customer Information</h2>
        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="padding: 8px 0; width: 150px;"><strong>Name:</strong></td>
            <td style="padding: 8px 0;">${order.contact.fullName}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0;"><strong>Email:</strong></td>
            <td style="padding: 8px 0;"><a href="mailto:${order.contact.email}">${order.contact.email}</a></td>
          </tr>
          <tr>
            <td style="padding: 8px 0;"><strong>Phone:</strong></td>
            <td style="padding: 8px 0;"><a href="tel:${order.contact.phone}">${order.contact.phone}</a></td>
          </tr>
          ${order.contact.companyName ? `
          <tr>
            <td style="padding: 8px 0;"><strong>Company:</strong></td>
            <td style="padding: 8px 0;">${order.contact.companyName}</td>
          </tr>
          ` : ''}
        </table>
      </div>
      
      <div style="background-color: #f8f9fa; padding: 20px; margin: 20px 0;">
        <h2 style="margin-top: 0; color: #003366;">Delivery Information</h2>
        <p><strong>Location/Port:</strong> ${order.delivery.location}</p>
        ${order.delivery.notes ? `<p><strong>Notes:</strong> ${order.delivery.notes}</p>` : ''}
      </div>
      
      <div style="margin: 20px 0;">
        <h2 style="color: #003366;">Order Items</h2>
        <table style="width: 100%; border-collapse: collapse; background-color: white; border: 1px solid #e5e7eb;">
          <thead>
            <tr style="background-color: #f3f4f6;">
              <th style="padding: 12px; text-align: left; border-bottom: 2px solid #e5e7eb;">Product</th>
              <th style="padding: 12px; text-align: center; border-bottom: 2px solid #e5e7eb;">Quantity</th>
              <th style="padding: 12px; text-align: right; border-bottom: 2px solid #e5e7eb;">Unit Price</th>
              <th style="padding: 12px; text-align: right; border-bottom: 2px solid #e5e7eb;">Total</th>
            </tr>
          </thead>
          <tbody>
            ${productRows}
          </tbody>
        </table>
      </div>
      
      <div style="background-color: #f8f9fa; padding: 20px; margin: 20px 0;">
        <h3 style="margin-top: 0; color: #003366;">Order Summary</h3>
        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="padding: 8px 0; text-align: right;"><strong>Subtotal (Fixed Price Items):</strong></td>
            <td style="padding: 8px 0; text-align: right; width: 150px;">${formatPrice(subtotal)}</td>
          </tr>
          ${quoteItemsCount > 0 ? `
          <tr>
            <td style="padding: 8px 0; text-align: right;"><strong>Quote Items:</strong></td>
            <td style="padding: 8px 0; text-align: right; color: #ff9900;">${quoteItemsCount} item(s) on request</td>
          </tr>
          ` : ''}
          <tr style="border-top: 2px solid #003366;">
            <td style="padding: 12px 0; text-align: right; font-size: 18px;"><strong>Estimated Total:</strong></td>
            <td style="padding: 12px 0; text-align: right; font-size: 18px; color: #003366;">
              <strong>${formatPrice(subtotal)}${quoteItemsCount > 0 ? ' + Quote Items' : ''}</strong>
            </td>
          </tr>
        </table>
      </div>
      
      ${order.additionalNotes ? `
      <div style="background-color: #fff3cd; border-left: 4px solid #ffc107; padding: 15px; margin: 20px 0;">
        <h3 style="margin-top: 0; color: #856404;">Additional Notes</h3>
        <p style="margin: 0; white-space: pre-wrap;">${order.additionalNotes}</p>
      </div>
      ` : ''}
      
      <div style="margin-top: 30px; padding-top: 20px; border-top: 2px solid #e5e7eb; color: #6b7280; font-size: 14px;">
        <p><strong>Submitted:</strong> ${new Date(order.submittedAt).toLocaleString('en-US', {
          dateStyle: 'full',
          timeStyle: 'short'
        })}</p>
        <p style="margin-top: 20px;">
          <em>This is an automated order request from the Procure Marine website. 
          Please contact the customer to provide a formal quote and arrange payment and delivery.</em>
        </p>
      </div>
    </body>
    </html>
  `;
}

/**
 * Send order confirmation email
 * This is a Server Action that can be called from client components
 * 
 * @param order - Order submission data
 * @returns Object with success status and order reference or error message
 */
export async function sendOrderEmail(order: OrderSubmission): Promise<{
  success: boolean;
  orderReference?: string;
  error?: string;
}> {
  try {
    // Generate order reference
    const orderReference = generateOrderReference();
    
    // Generate email HTML
    const emailHTML = generateOrderEmailHTML(order, orderReference);
    
    // Send email using Resend
    // NOTE: Replace 'your-email@procuremarine.com' with your actual email
    const { data, error } = await resend.emails.send({
      from: 'Procure Marine Orders <orders@procuremarine.com>',
      to: ['sales@procuremarine.com'], // Replace with your actual email
      subject: `New Order Request - ${orderReference}`,
      html: emailHTML,
      // Also send a copy to the customer
      replyTo: order.contact.email,
    });
    
    if (error) {
      console.error('Error sending email:', error);
      return {
        success: false,
        error: 'Failed to send order email. Please try again or contact us directly.',
      };
    }
    
    console.log('Order email sent successfully:', data);
    
    return {
      success: true,
      orderReference,
    };
  } catch (error) {
    console.error('Unexpected error sending order email:', error);
    return {
      success: false,
      error: 'An unexpected error occurred. Please try again later.',
    };
  }
}
