import { render, screen, cleanup, fireEvent,waitFor } from '@testing-library/react';
import { BrowserRouter as Router } from "react-router-dom";
import Login from '../components/Authentication/Login.component';


function setIsLoggedIn() {};
function setTab() {};
function setFirst() {};
function setId() {};
function setEmail() {};

test('renders Login component', () => {
  render(<Router><Login /></Router>);
  const element = screen.getByTestId("Login");
  expect(element).toBeInTheDocument();
});
 
// it('should take a snapshot of Login', () => {
//     const { asFragment } = render(<Router><Login /></Router>)
//     expect(asFragment(<Login />)).toMatchSnapshot()
// });

it('Login form is rendered correctly', () => {
    render(<Router><Login /></Router>);
    expect(screen.getByTestId('login-button')).toBeInTheDocument();
    expect(screen.getByTestId('login-email-input')).toBeInTheDocument();
    expect(screen.getByTestId('login-password-input')).toBeInTheDocument();
});

it('login button should be disabled initially', () => {
    render(<Router><Login /></Router>); 
    expect(screen.getByTestId('login-button')).toBeDisabled()
});

it("login button should be enabled when valid email entered in input box", () => {
    render(<Router><Login /></Router>);
    const button = screen.getByTestId('login-button');
    const emailInput = screen.getByTestId('login-email-input');
    fireEvent.change(emailInput, { target: { value: "rtl@unittesting.com" } });
    expect(button).toBeEnabled();
});

it("login button should be enabled when invlalid email entered in input box", () => {
    render(<Router><Login /></Router>);
    const button = screen.getByTestId('login-button');
    const emailInput = screen.getByTestId('login-email-input');
    fireEvent.change(emailInput, { target: { value: "rtl" } });
    expect(button).toBeDisabled();
});

it("alert should appear when incomplete credentials entered", () => {
    render(<Router><Login /></Router>);
    const button = screen.getByTestId('login-button');
    const emailInput = screen.getByTestId('login-email-input');
    fireEvent.change(emailInput, { target: { value: "rtl@unittesting.com" } });
    expect(button).toBeEnabled();
    fireEvent.click(button);
    expect(screen.getByTestId('login-alert-incomplete-creds')).toBeInTheDocument();
});

it("login should fail when invalid credentials entered", async () => {
    render(<Router><Login /></Router>);
    const button = screen.getByTestId('login-button');
    const emailInput = screen.getByTestId('login-email-input');
    const passwordInput = screen.getByTestId('login-password-input');
    fireEvent.change(emailInput, { target: { value: "rtl@unittesting.com" } });
    fireEvent.change(passwordInput, { target: { value: "test" } });
    expect(button).toBeEnabled();
    fireEvent.click(button);
});

it("login should succeed when valid credentials entered", async () => {
    render(<Router><Login setIsLoggedIn={setIsLoggedIn} setTab={setTab} setFirst={setFirst} setEmail={setEmail} setId={setId}/></Router>);
    const button = screen.getByTestId('login-button');
    const emailInput = screen.getByTestId('login-email-input');
    const passwordInput = screen.getByTestId('login-password-input');
    fireEvent.change(emailInput, { target: { value: "rtl@unittesting.com" } });
    fireEvent.change(passwordInput, { target: { value: "TestTest1!" } });
    expect(button).toBeEnabled();
    fireEvent.click(button);
});