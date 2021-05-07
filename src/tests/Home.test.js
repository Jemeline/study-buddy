import Home from '../components/Home.component';
import { render, screen, fireEvent} from '@testing-library/react';

test('renders Home page component', () => {
    render(<Home />);
    const element = screen.getByTestId("Home");
    expect(element).toBeInTheDocument();
});

test('Renders Login/Register Button', () => {
    render(<Home />);
    const button = screen.getByTestId("Login-Register");
    expect(button).toBeInTheDocument();
});


