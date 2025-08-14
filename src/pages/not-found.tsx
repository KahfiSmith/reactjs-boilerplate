import { Link } from 'react-router-dom'
import { Button } from '../components/ui/button' // Adjust the import path as needed

export default function NotFoundPage() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1>
            <p className="text-lg mb-6">The page you are looking for does not exist.</p>
            <Button asChild variant="default">
                <Link to="/">Return to Home</Link>
            </Button>
        </div>
    )
}
