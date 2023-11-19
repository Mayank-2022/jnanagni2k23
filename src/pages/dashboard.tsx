import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import NavMenu from '@/components/NavMenu';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from './firebase';
import Image from 'next/image';
import useAuthObserver from './../components/authObserver';

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
  const { user } = useAuthObserver(); // Destructure the user object
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
        if (user) {
          // Use the actual UID of the logged-in user
          const userEventsRegistration = await getDocs(query(collection(db, 'event_registration'), where('user_id', '==', user.uid)));
          const eventsData: EventType[] = [];
          const allEvents = await getDocs(collection(db, 'events'));

          for (const eachUserEvent of userEventsRegistration.docs) {
            const event_id = eachUserEvent.data().event_id;
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
        }
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };

    fetchEvents();
  }, [user]);
  

    return (
        <div>
            {isShowNav && <NavMenu />}

            <div className='bg-[#151515] pb-10'>
                <div className='md:px-12 xl:px-6'>
                    <div className='relative pt-36'>
                        <div className='lg:w-2/3 text-center mx-auto'>
                            <h1 className='text-white font-bold text-4xl md:text-6xl xl:text-7xl'>
                                Registered Events<span className='text-primary text-green-700'>.</span>
                            </h1>
                        </div>
                    </div>
                    <div className='mx-auto px-2 py-2 lg:px-10 lg:pt-12'>
                        <div className='container justify-center lg:max-w-[1300px]'>
                            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 '>
                                {events.map((event) => (
                                    <div className='bg-slate-100 p-3 rounded-3xl m-4'>
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

                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
