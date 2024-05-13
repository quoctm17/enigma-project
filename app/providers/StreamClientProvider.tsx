'use client';

import { ReactNode, useEffect, useState } from 'react';
import { StreamVideoClient, StreamVideo } from '@stream-io/video-react-sdk';
import { tokenProvider } from '../actions/stream.actions';
import Loader from '../(routes)/meeting/_components/Loader';
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs';


const API_KEY = process.env.NEXT_PUBLIC_STREAM_API_KEY;

const StreamVideoProvider = ({ children }: { children: ReactNode }) => {
  const [videoClient, setVideoClient] = useState<StreamVideoClient>();
  const { user } = useKindeBrowserClient();

  useEffect(() => {
    if (!user) return;
    if (!API_KEY) throw new Error('Stream API key is missing');

    const client = new StreamVideoClient({
      apiKey: API_KEY,
      user: {
        id: user?.id,
        name: user?.given_name || '',
        image: user.picture || '',
      },
      tokenProvider,
    });

    setVideoClient(client);
  }, [user]);

  if (!videoClient) return <Loader />;

  return <StreamVideo client={videoClient}>{children}</StreamVideo>;
};

export default StreamVideoProvider;