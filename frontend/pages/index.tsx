import { Button } from "@nextui-org/react";
import Link from "next/link";

const Home = () => {
    return (
        <div style={{ textAlign: "center", padding: "2rem" }}>
            <h1 className="text-4xl font-bold mb-4">
                Welcome to the Smart Event Analytics Platform
            </h1>
            <Button
                color="primary"
                as={Link}
                href="/auth/login"
                style={{ fontSize: "1.25rem", padding: "0.75rem 1.5rem" }}
            >
                Get Started
            </Button>
        </div>
    );
};

export default Home;
