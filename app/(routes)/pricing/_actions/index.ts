'use server';

import { payOS } from '@/lib/payos';

export async function createPaymentLink(formData: any) {
    const { description, returnUrl, cancelUrl, amount } = formData;
    const body = {
        orderCode: Number(String(new Date().getTime()).slice(-6)),
        amount,
        description,
        cancelUrl,
        returnUrl,
    };

    try {
        const paymentLinkRes = await payOS.createPaymentLink(body);
        console.log(body.cancelUrl);
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
