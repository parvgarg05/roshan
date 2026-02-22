import twilio from 'twilio';
import type { Order } from '@/types';
import { formatCurrency } from './utils';

const getEnv = (key: string) => process.env[key] || '';

// Singleton Twilio client
let twilioClient: twilio.Twilio | null = null;

function getClient() {
    if (!twilioClient) {
        const sid = getEnv('TWILIO_ACCOUNT_SID');
        const token = getEnv('TWILIO_AUTH_TOKEN');
        if (sid && token) {
            twilioClient = twilio(sid, token);
        }
    }
    return twilioClient;
}

const FROM_PHONE = getEnv('TWILIO_PHONE_NUMBER');

/**
 * Sends a WhatsApp or SMS confirmation via Twilio.
 * Automatically handles formatting Indian numbers.
 */
export async function sendWhatsAppConfirmation(
    order: Order,
    customer: { name: string; phone: string }
) {
    const client = getClient();
    if (!client || !FROM_PHONE) {
        console.warn('⚠️ [Twilio] Credentials missing. Skipping WhatsApp/SMS for order:', order.id);
        return false;
    }

    // Ensure phone number has country code for Twilio
    let toPhone = customer.phone;
    if (!toPhone.startsWith('+')) {
        toPhone = `+91${toPhone}`; // Default to India
    }

    // If using WhatsApp, Twilio requires the "whatsapp:" prefix for *both* to and from
    const isWhatsApp = FROM_PHONE.startsWith('whatsapp:');
    const toParam = isWhatsApp ? `whatsapp:${toPhone}` : toPhone;

    const shortId = order.id.slice(-8).toUpperCase();
    const totalStr = formatCurrency(order.totalPaise / 100);

    const message = `Namaste ${customer.name}! 🪔

Thank you for your order from L.Roshanlal Ji Sweets.
Order ID: #${shortId}
Total: ${totalStr}

Your fresh mithai is being prepared and will be delivered shortly to ${order.city}.

If you have questions, reply or call us at 7055513961.
Have a sweet day! 🍬`;

    try {
        const messageResponse = await client.messages.create({
            body: message,
            from: FROM_PHONE,
            to: toParam,
        });
        console.log('✅ [Twilio] Message sent to', toPhone, messageResponse.sid);
        return true;
    } catch (error) {
        console.error('❌ [Twilio] Failed to send message:', error);
        return false;
    }
}
