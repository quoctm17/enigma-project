"use server";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { StreamClient } from "@stream-io/node-sdk";

const apiKey = process.env.NEXT_PUBLIC_STREAM_API_KEY;
const apiSecret = process.env.STREAM_SECRET_KEY;
// const user_id = "csb-user";
// const user = { id: user_id };

export const tokenProvider = async () => {

    const user = await getKindeServerSession().getUser();

    if (!user) {
        throw new Error('User is not logged in');
    }
    if (!apiKey) {
        throw new Error('No API key');
    }
    if (!apiSecret) {
        throw new Error('No API secret');
    }

    const client = new StreamClient(apiKey, apiSecret);

    const exp = Math.round(new Date().getTime() / 1000) + 3600;
    const issued = Math.floor(Date.now() / 1000);

    const token = client.createToken(user.id, exp, issued);
    return token;

    // const { token } = await fetch(
    //     "https://pronto.getstream.io/api/auth/create-token?" +
    //     new URLSearchParams({

    //     })
    // ).then((res) => res.json());
    // return token as string;
}
