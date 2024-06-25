// {
//     code: '00',
//     desc: 'success',
//     success: true,
//     data: {
//       accountNumber: '0975349996',
//       amount: 5000,
//       description: 'CS12IO2PKZ1 Professional Plan',
//       reference: 'FT241779JK18',
//       transactionDateTime: '2024-06-25 14:27:00',
//       virtualAccountNumber: 'CAS0975349996',
//       counterAccountBankId: '',
//       counterAccountBankName: '',
//       counterAccountName: null,
//       counterAccountNumber: null,
//       virtualAccountName: '',
//       currency: 'VND',
//       orderCode: 424138,
//       paymentLinkId: '23504c0deff847acb3f3df31b03128fc',
//       code: '00',
//       desc: 'success'
//     },
//     signature: '4fc0f68b9f9d98d7fa74d46dc2ae3e74ecaf4e0d597684d6a3236c8e96816738'
//   }
// {
//     accountNumber: '0975349996',
//     amount: 5000,
//     description: 'CSQMRYYBLJ0 Professional Plan',
//     reference: 'FT24177DWJY2',
//     transactionDateTime: '2024-06-25 15:04:00',
//     virtualAccountNumber: 'CAS0975349996',
//     counterAccountBankId: '',
//     counterAccountBankName: '',
//     counterAccountName: null,
//     counterAccountNumber: null,
//     virtualAccountName: '',
//     currency: 'VND',
//     orderCode: 651687,
//     paymentLinkId: 'ce7bc85967ac40489b72fa175aaa0a95',
//     code: '00',
//     desc: 'success'
//   }
import { fetchMutation } from 'convex/nextjs';
import { payOS } from '@/lib/payos';
import { api } from '@/convex/_generated/api';

// NEXT POST request
export async function POST(request) {
    const body = await request.json();
    const webhookData = payOS.verifyPaymentWebhookData(body);
    console.log(webhookData);

    await fetchMutation(api.order.updateOrderStatusByPaymentCode, {
        paymentOrderCode: '' + webhookData.orderCode,
        status: 'PAID',
    });

    return new Response();
}

// NEXT GET request
export async function GET() {
    return new Response('Hello, Next.js!');
}
