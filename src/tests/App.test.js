import { render, screen, cleanup } from '@testing-library/react';
import App from '../App';

test('renders App component', () => {
  render(<App />);
  const element = screen.getByTestId("App");
  expect(element).toBeInTheDocument();
});

afterEach(cleanup)
 
it('should take a snapshot', () => {
    const { asFragment } = render(<App />)
    
    expect(asFragment(<App />)).toMatchSnapshot()
});