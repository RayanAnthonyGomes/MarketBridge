import { Link } from 'react-router-dom';
import './NotFound.css';

export default function NotFound() {
  return (
    <div className="not-found-page page-enter">
      <div className="not-found-content">
        <h1 className="not-found-code">404</h1>
        <h2>Page Not Found</h2>
        <p className="text-secondary">The page you're looking for doesn't exist or has been moved.</p>
        <Link to="/" className="btn btn-primary btn-lg mt-4">Back to Home</Link>
      </div>
    </div>
  );
}
