
import { ProfileCompletion } from './progressBar/ProfileCompletion'
import { UserProfile } from './UserCard/UserProfile'
import  ContactCard  from './contact/ContactCard'
import TabLayout from './rightContainer/TabLayout'
import { useUser } from '@clerk/clerk-react'
import { NavBarrr } from '../Navbar/NavBar'

const Profilelayout = () => {
    const { user, isLoaded, isSignedIn } = useUser();
    const userEmail = user?.emailAddresses?.[0]?.emailAddress;
    return (
        <div style={{ backgroundColor: "#f5f6f7" }}>
            <NavBarrr />
            <div className='max-w-[85em] flex flex-col gap-[1em] xl:gap-[2em] mx-auto w-[100%] py-[1em] px-3 sm:px-5 md:py-[2em] lg:py-[4em]'>
                <ProfileCompletion />
                <div className='flex flex-col lg:flex-row gap-[1em] xl:gap-[2em]'>
                    <div className='flex flex-col gap-[1em] xl:gap-[2em] w-full lg:w-1/3'>
                        <UserProfile />
                        <ContactCard />
                    </div>
                    <div className='w-full lg:w-2/3'>
                        <TabLayout />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profilelayout
