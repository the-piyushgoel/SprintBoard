import { Link } from 'react-router-dom';
import { ROUTES } from '../utils/constants.js';
import Button from '../components/ui/Button.jsx';

const NotFound = () => {
  return (
    <div className="min-h-screen bg-surface-50 flex flex-col items-center justify-center p-6 text-center font-sans">
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[250px] h-[250px] bg-primary-100/50 blur-[70px] rounded-full pointer-events-none -z-10" />

      <div className="text-8xl font-black text-primary-600 tracking-wider mb-2">404</div>
      <h1 className="text-2xl sm:text-3xl font-extrabold text-surface-900 tracking-tight mb-4">
        Page Not Found
      </h1>
      <p className="text-sm sm:text-base text-surface-500 max-w-md leading-relaxed mb-8">
        We couldn't find the page you're looking for. It might have been moved, deleted, or never existed in the first place.
      </p>

      <Link to={ROUTES.LANDING}>
        <Button variant="primary" size="md" className="shadow-md">
          Go Back Home
        </Button>
      </Link>
    </div>
  );
};

export default NotFound;
