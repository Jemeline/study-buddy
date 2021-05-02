import { render, screen, fireEvent } from '@testing-library/react';
// import TutorDashboard from '../components/Dashboard/TutorDashboard.component';
import AdminDashboard from '../components/Dashboard/Admin/AdminDashboard.component';
import UserItem from '../components/Dashboard/Admin/UserItem';
import picture from '../components/study-buddy-tagline.png';
import AdminAd from '../components/Dashboard/Admin/AdminAd';

// test('renders Tutor Dashboard', () => {
//   render(<TutorDashboard />);
//   const element = screen.getByTestId("tutorDash");
//   expect(element).toBeInTheDocument();
// });

test('renders Admin Dashboard', () => {
  render(<AdminDashboard />);
  const element = screen.getByTestId("Admin-Dashboard");
  expect(element).toBeInTheDocument();
});

test('every element renders', () => {
  render(<AdminDashboard/>);
  expect(screen.getByTestId('CreateAdmin')).toBeInTheDocument();
  expect(screen.getByTestId('AdminGetUsers')).toBeInTheDocument();
  expect(screen.getByTestId('AdminViewAds')).toBeInTheDocument();
});

const user = {
  first: '',
  last: '',
  avatar: picture,
  email: '',
  role: '',
  phoneNumber: ''
}

test('can delete user', () => {
  render(<UserItem user={user}/>);
  fireEvent.click(screen.getByText('Edit'));
  expect(screen.getByText("Cancel")).toBeInTheDocument();
  expect(screen.getByText("Delete User")).toBeInTheDocument();
});

test('can delete user profile picture', () => {
  render(<UserItem user={user}/>);
  fireEvent.click(screen.getByText('Edit'));
  expect(screen.getByText("Cancel")).toBeInTheDocument();
  expect(screen.getByText("Delete User")).toBeInTheDocument();
  expect(screen.getByText("Delete Picture")).toBeInTheDocument();
});

test('can create admin', () => {
  render(<AdminDashboard/>);
  const button = screen.getByTestId('submit-admin-button');
  const emailInput = screen.getByTestId('admin-email-input');
  const passwordInput = screen.getByTestId('admin-password-input');
  const passwordConfirmInput = screen.getByTestId('admin-confirm-password-input');
  const fnameInput = screen.getByTestId('fname-input');
  const lnameInput = screen.getByTestId('lname-input');
  fireEvent.change(emailInput, { target: { value: "rtl@unittesting.com" } });
  fireEvent.change(passwordInput, { target: { value: "test" } });
  fireEvent.change(passwordConfirmInput, { target: { value: "test" } });
  fireEvent.change(fnameInput, { target: { value: "john" } });
  fireEvent.change(lnameInput, { target: { value: "doe" } });
  expect(button).toBeEnabled();
  fireEvent.click(button);
});

const ad = {
  "_id": "", 
  "tutorEmail": 'ad.tutorEmail',
  "text": "text",
  "courses": ['chem', 'eng'],
  "first": 'ad.first',
  "last": 'ad.last',
  "ratings": [1, 2]
}

test('can delete tutor add', () => {
  render(<AdminAd ad={ad}/>);
  fireEvent.click(screen.getByText('Edit'));
  expect(screen.getByText("Delete Ad")).toBeInTheDocument();
});

test('can clear tutor courses', () => {
  render(<AdminAd ad={ad}/>);
  fireEvent.click(screen.getByText('Edit'));
  expect(screen.getByText("Clear Courses")).toBeInTheDocument();
});

test('can submit tutor ad changes', () => {
  render(<AdminAd ad={ad}/>);
  fireEvent.click(screen.getByText('Edit'));
  expect(screen.getByText("Submit")).toBeInTheDocument();
});