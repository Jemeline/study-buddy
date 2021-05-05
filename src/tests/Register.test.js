import { render, screen, fireEvent} from '@testing-library/react';
import Register from '../components/Authentication/Register.component';
import AuthenticationHome from '../components/Authentication/AuthenticationHome.component';

function setIsLoggedIn() {};
function setTab() {};
function setFirst() {};
function setId() {};
function setEmail() {};

test('renders Authentication component', () => {
    render(<AuthenticationHome />);
    const element = screen.getByTestId("Authentication");
    expect(element).toBeInTheDocument();
});

test('renders All Authentication sub components', () => {
    render(<AuthenticationHome />);
    const element = screen.getByTestId("Tabs");
    expect(element).toBeInTheDocument();
});

// test('renders Register component', () => {
//     render(<AuthenticationHome />);
//     const button = screen.getByTestId("Register");
//     fireEvent.click(button);
//     expect(screen.getByTestId("Register")).toBeInTheDocument();
// });