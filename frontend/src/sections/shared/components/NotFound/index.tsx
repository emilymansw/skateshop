import { Link, useLocation } from 'react-router-dom';
import { Container } from '../../UI/SharedUI';

export const NotFound = () => {
  const location = useLocation();
  return (
    <Container>
      <h2>PAGE NOT FOUND</h2>
      <p>
        Sorry can't find the page you are looking for click{' '}
        <Link to={location.pathname.includes('admin') ? '/admin' : '/'}>
          HERE
        </Link>{' '}
        to go back to home page.
      </p>
    </Container>
  );
};
