'use client';

import { useState } from 'react';
import { StreamCall, StreamTheme } from '@stream-io/video-react-sdk';
import { useParams } from 'next/navigation';
import { Loader } from 'lucide-react';
import { useGetCallById } from '@/app/_hooks/useGetCallById';
import MeetingSetup from '../_components/MeetingSetup';
import MeetingRoom from '../_components/MeetingRoom';
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs';
import Alert from '../_components/Alert';

const MeetingPage = () => {
  const { id } = useParams();
  const { user } = useKindeBrowserClient();
  const { call, isCallLoading } = useGetCallById(id);
  const [isSetupComplete, setIsSetupComplete] = useState(false);

  if (isCallLoading) return <Loader />;

  if (!call) return (
    <p className="text-center text-3xl font-bold text-enm-main-text">
      Call Not Found
    </p>
  );

  // get more info about custom call type:  https://getstream.io/video/docs/react/guides/configuring-call-types/
  const notAllowed = call.type === 'invited' && (!user || !call.state.members.find((m) => m.user.id === user.id));

  if (notAllowed) return <Alert title="You are not allowed to join this meeting" />;

  return (
    <main className="h-screen w-full">
      <StreamCall call={call}>
        <StreamTheme>

          {!isSetupComplete ? (
            <MeetingSetup setIsSetupComplete={setIsSetupComplete} />
          ) : (
            <MeetingRoom />
          )}
        </StreamTheme>
      </StreamCall>
    </main>
  );
};

export default MeetingPage;
