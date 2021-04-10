import { render, screen, cleanup } from '@testing-library/react';
import Login from '../components/Authentication/Login.component';

test('renders Login component', () => {
  render(<Login />);
  const element = screen.getByTestId("Login");
  expect(element).toBeInTheDocument();
});

afterEach(cleanup)
 
it('should take a snapshot of Login', () => {
    const { asFragment } = render(<Login />)
    expect(asFragment(<Login />)).toMatchSnapshot()
});

it('login button be disabled', () => {
    const { getByTestId } = render(<Login />); 
    expect(getByTestId('login-button')).toBeDisabled()
});