import React, { useEffect, useState } from 'react';

const decodeRole = (token: string): string => {
    try {
      const base64Payload = token.split(".")[1];
      const decoded = JSON.parse(atob(base64Payload));
      return decoded?.role || "";
    } catch {
      return "";
    }
  };

const Profile: React.FC = () => {
    const [role, setRole] = useState("");
    
      useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
          setRole(decodeRole(token));
        }
      }, []);
      
    const renderProfileContent = () => {
        switch (role) {
            case 'viewer':
                return <p>Welcome, Viewer! You can browse the content.</p>;
            case 'admin':
                return <p>Welcome, Admin! You have full access to the system.</p>;
            case 'organizer':
                return <p>Welcome, Organizer! You can manage events and content.</p>;
            default:
                return <p>Invalid role</p>;
        }
    };

    return (
        <div>
            <h1>Profile</h1>
            {renderProfileContent()}
        </div>
    );
};

export default Profile;