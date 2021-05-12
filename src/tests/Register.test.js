import { render, screen, fireEvent} from '@testing-library/react';
import { BrowserRouter as Router } from "react-router-dom";
import Register from '../components/Authentication/Register.component';
import AuthenticationHome from '../components/Authentication/AuthenticationHome.component';

function setIsLoggedIn() {};
function setTab() {};
function setFirst() {};
function setId() {};
function setEmail() {};

test('renders Authentication component', () => {
    render(<Router><AuthenticationHome /></Router>);
    const element = screen.getByTestId("Authentication");
    expect(element).toBeInTheDocument();
});

test('renders All Authentication sub components', () => {
    render(<Router><AuthenticationHome /></Router>);
    const element = screen.getByTestId("Tabs");
    expect(element).toBeInTheDocument();
});

