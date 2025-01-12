import React from 'react';
import Profile from '@/components/Profile';
import Navbar from '@/components/Navbar';

const ProfilePage: React.FC = () => {
    return (
        <div>
            <Navbar />
            <Profile />
        </div>
    );
};

export default ProfilePage;