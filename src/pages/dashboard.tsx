// path-to-components/Dashboard.tsx
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import NavMenu from '@/components/NavMenu';
import { collection, doc, getDocs, query, where } from 'firebase/firestore';
import { db } from './firebase';
import Image from 'next/image';

// Define the Event interface
interface EventType {
    id: string;
    name: string;
    image: string;
    // Add other properties or adjust as needed
}

const Dashboard: React.FC = () => {
    const router = useRouter();
    const [isShowNav, setIsShowNav] = useState(true);
    const [events, setEvents] = useState<EventType[]>([]);
    const [user, setUser] = useState<any | null>(null);

    useEffect(() => {
        const handlePopstate = () => {
            setIsShowNav(true);
        };

        window.addEventListener('popstate', handlePopstate);

        return () => {
            window.removeEventListener('popstate', handlePopstate);
        };
    }, []);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                // Fetch events where user_id is '123abc'
                const userEventsRegistration = await getDocs(query(collection(db, 'event_registration'), where('user_id', '==', '123abc')));
                const eventsData: EventType[] = [];
                // Fetch all events to avoid querying the 'events' collection multiple times
                const allEvents = await getDocs(collection(db, 'events'));

                for (const eachUserEvent of userEventsRegistration.docs) {
                    const event_id = eachUserEvent.data().event_id;
                    // Find the event details using the event_id
                    const eventDetail = allEvents.docs.find((doc) => doc.id === event_id);

                    if (eventDetail) {
                        const eventData = eventDetail.data();
                        eventsData.push({
                            id: event_id,
                            name: eventData.name || 'Default Event Name',
                            image: eventData.image || 'Default Image URL',
                            // Add other properties as needed
                        });
                    }
                }

                setEvents(eventsData);
            } catch (error) {
                console.error('Error fetching events:', error);
            }
        };

        fetchEvents();
    }, []);

    return (
        <div>
            {isShowNav && <NavMenu />}

            <div className="flex flex-col items-center justify-center overflow-hidden pt-20 pb-12 lg:pt-[120px] lg:pb-[90px] text-white">
                <div className="w-3/4 p-4 flex flex-col items-center">
                    <h2 className="text-2xl font-bold mb-4">Events</h2>
                    {events.map((event) => (
                        <div key={event.id} className='bg-slate-100 p-0 rounded-3xl m-4'>
                            <div className='bg-slate-100 p-0 rounded-3xl m-4'>
                                <div>
                                    <Image
                                        className='h-auto max-w-full rounded-xl'
                                        src={event.image}
                                        alt=''
                                        layout="responsive"
                                        width={1080}
                                        height={1080}
                                    />
                                </div>
                                <h5 className='mb-2 text-2xl font-bold tracking-tight text-gray-900 pt-3 text-center '>{event.name}</h5>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
