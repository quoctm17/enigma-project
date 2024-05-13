/* eslint-disable camelcase */
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

import HomeCard from './HomeCard';
import MeetingModal from './MeetingModal';
import { Call, useStreamVideoClient } from '@stream-io/video-react-sdk';
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs';
import { toast } from 'sonner';
import { Textarea } from '@/components/ui/textarea';
import ReactDatePicker from 'react-datepicker';
import { Input } from '@/components/ui/input';


const MeetingTypeList = () => {
    const router = useRouter();
    const [meetingState, setMeetingState] = useState<
        'isScheduleMeeting' | 'isJoiningMeeting' | 'isInstantMeeting' | undefined
    >(undefined);
    const user = useKindeBrowserClient();
    const client = useStreamVideoClient()
    const [values, setValues] = useState({
        dateTime: new Date(),
        description: '',
        link: '',
    });
    const [callDetails, setCallDetails] = useState<Call | null>(null);


    const creatingMeeting = async () => {
        if (!client || !user) return;

        try {
            if (!values.dateTime) {
                toast.error('Please select a date and time');
                return;
            }
            const id = crypto.randomUUID();
            const call = client.call('default', id);
            if (!call) throw new Error('Failed to create meeting');
            const startsAt =
                values.dateTime.toISOString() || new Date(Date.now()).toISOString();
            const description = values.description || 'Instant Meeting';
            await call.getOrCreate({
                data: {
                    starts_at: startsAt,
                    custom: {
                        description,
                    },
                },
            });
            setCallDetails(call);
            if (!values.description) {
                router.push(`/meeting/${call.id}`);
            }
            toast.success('Meeting Created');
        } catch (error) {
            console.log(error);
            toast('Failed to create meeting')
        }
    }

    const meetingLink = `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${callDetails?.id}`
    return (
        <section className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
            <HomeCard
                img="/add-meeting.svg"
                title="New Meeting"
                description="Start an instant meeting"
                className='bg-orange-500'
                handleClick={() => setMeetingState('isInstantMeeting')}
            />
            <HomeCard
                img="/join-meeting.svg"
                title="Join Meeting"
                description="via invitation link"
                className="bg-sky-400"
                handleClick={() => setMeetingState('isJoiningMeeting')}
            />
            <HomeCard
                img="/schedule.svg"
                title="Schedule Meeting"
                description="Plan your meeting"
                className="bg-purple-600"
                handleClick={() => setMeetingState('isScheduleMeeting')}
            />
            <HomeCard
                img="/recordings.svg"
                title="View Recordings"
                description="Recordings"
                className="bg-yellow-600"
                handleClick={() => router.push('/meeting/recordings')}
            />

            {!callDetails ? (
                <MeetingModal
                    isOpen={meetingState === 'isScheduleMeeting'}
                    onClose={() => setMeetingState(undefined)}
                    title="Create Meeting"
                    handleClick={creatingMeeting}
                >
                    <div className="flex flex-col gap-2.5">
                        <label className="text-base font-normal leading-[22.4px] text-enm-main-text">
                            Add a description
                        </label>
                        <Textarea
                            className="border-none bg-enm-neutral focus-visible:ring-0 focus-visible:ring-offset-0"
                            onChange={(e) =>
                                setValues({ ...values, description: e.target.value })
                            }
                        />
                    </div>
                    <div className="flex w-full flex-col gap-2.5">
                        <label className="text-base font-normal leading-[22.4px] text-enm-main-text">
                            Select Date and Time
                        </label>
                        <ReactDatePicker
                            selected={values.dateTime}
                            onChange={(date) => setValues({ ...values, dateTime: date! })}
                            showTimeSelect
                            timeFormat="HH:mm"
                            timeIntervals={15}
                            timeCaption="time"
                            dateFormat="MMMM d, yyyy h:mm aa"
                            className="w-full rounded bg-enm-neutral p-2 focus:outline-none"
                        />
                    </div>

                </MeetingModal>
            ) : (<MeetingModal
                isOpen={meetingState === 'isScheduleMeeting'}
                onClose={() => setMeetingState(undefined)}
                title="Meeting Created"
                className='text-center'
                handleClick={() => {
                    navigator.clipboard.writeText(meetingLink);
                    toast.success('Link Copied');
                }}
                image='/checked.svg'
                buttonIcon='/copy.svg'
                buttonText='Copy Meeting Link'
            />)}
            <MeetingModal
                isOpen={meetingState === 'isJoiningMeeting'}
                onClose={() => setMeetingState(undefined)}
                title="Type the link here"
                className="text-center"
                buttonText="Join Meeting"
                handleClick={() => router.push(values.link)}
            >
                <Input
                    placeholder="Meeting link"
                    onChange={(e) => setValues({ ...values, link: e.target.value })}
                    className="border-none bg-enm-neutral focus-visible:ring-0 focus-visible:ring-offset-0"
                />
            </MeetingModal>
            <MeetingModal
                isOpen={meetingState === 'isInstantMeeting'}
                onClose={() => setMeetingState(undefined)}
                title="Start an Instant Meeting"
                className='text-center'
                buttonText='Start Meeting'
                handleClick={creatingMeeting}
            />
        </section>
    );
};

export default MeetingTypeList;