'use server';

import { payOS } from '@/lib/payos';
import { CheckoutRequestType } from '@payos/node/lib/type';

export async function createPaymentLink(formData: CheckoutRequestType) {
    try {
        const paymentLinkRes = await payOS.createPaymentLink(formData);
        return {
            error: 0,
            message: 'Success',
            data: {
                bin: paymentLinkRes.bin,
                checkoutUrl: paymentLinkRes.checkoutUrl,
                accountNumber: paymentLinkRes.accountNumber,
                accountName: paymentLinkRes.accountName,
                amount: paymentLinkRes.amount,
                description: paymentLinkRes.description,
                orderCode: paymentLinkRes.orderCode,
                qrCode: paymentLinkRes.qrCode,
                buyerEmail: formData.buyerEmail,
            },
        };
    } catch (error) {
        console.log(error);
        return {
            error: -1,
            message: 'fail',
            data: null,
        };
    }
}
