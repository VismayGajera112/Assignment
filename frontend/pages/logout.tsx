import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { Button, Card, Spacer } from '@nextui-org/react';
import '../styles/globals.css';

const Logout: React.FC = () => {
    const router = useRouter();

    useEffect(() => {
        // Clear user session or token here
        localStorage.removeItem('token');
        // Redirect to login page after logout
        setTimeout(() => {
            router.push('/login');
        }, 3000);
    }, [router]);

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <Card
                style={{
                    padding: '20px',
                    maxWidth: '400px',
                    width: '100%',
                    textAlign: 'center',
                }}
            >
                <h4 style={{ margin: 0, fontWeight: 'bold' }}>You have been logged out</h4>
                <Spacer y={0.5} />
                <p style={{ margin: 0 }}>Thank you for visiting. You will be redirected to the login page shortly.</p>
                <Spacer y={1} />
                <Button color="primary" onPress={() => router.push('/login')}>
                    Go to Login
                </Button>
            </Card>
        </div>
    );
};

export default Logout;
