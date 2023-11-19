// path-to-components/Dashboard.tsx
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import NavMenu from '@/components/NavMenu';
import { collection, getDocs, query, where } from 'firebase/firestore';
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
                const eventsCollection = collection(db, 'event_registration');
                const eventsQuery = query(eventsCollection, where('user_id', '==', '123abc'));
                const eventsSnapshot = await getDocs(eventsQuery);

                const eventsData: EventType[] = [];
                for (const doc of eventsSnapshot.docs) {
                    const eventData = doc.data();
                    // Use event_id to fetch detailed event information from the 'events' collection
                    const eventDetail = await fetchEventDetail(eventData.event_id);
                    eventsData.push({ id: eventData.event_id, name: eventDetail.name, image: eventDetail.image });
                }
                setEvents(eventsData);
            } catch (error) {
                console.error('Error fetching events:', error);
            }
        };

        const fetchEventDetail = async (event_id: string) => {
            try {
              const eventDoc = await getDocs(query(collection(db, 'events')));
              eventDoc.forEach((doc) => {
                // doc.data() is never undefined for query doc snapshots
                console.log(doc.id, " => ", doc.data());
              });
              
              console.log('event_id', event_id);
          
              // Check if the document exists
              if (!eventDoc.empty) {
                const eventData = eventDoc.docs[0].data();
                return {
                  name: eventData.name || 'Default Event Name',
                  image: eventData.image || 'Default Image URL',
                };
              } else {
                // If the document doesn't exist
                return { name: 'Default Event Name', image: 'Default Image URL' };
              }
            } catch (error) {
              console.error('Error fetching event detail:', error);
              return { name: 'Default Event Name', image: 'Default Image URL' };
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
                        <div key={event.id} className='bg-slate-100 p-3 rounded-3xl m-4'>
                            <div className="flex items-center justify-center"> {/* Centering the content */}
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
                                <h5 className='mb-2 text-2xl font-bold tracking-tight text-gray-900 pt-3 text-center'>{event.name}</h5>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
