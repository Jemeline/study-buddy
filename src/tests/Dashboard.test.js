import { render, screen } from '@testing-library/react';
import TutorDashboard from '../components/Dashboard/TutorDashboard.component';
import AdminDashboard from '../components/Dashboard/AdminDashboard.component';

test('renders Tutor Dashboard', () => {
  render(<TutorDashboard />);
  const element = screen.getByText("Tutor Dashboard");
  expect(element).toBeInTheDocument();
});

test('renders Admin Dashboard', () => {
  render(<AdminDashboard />);
  const element = screen.getByText("Admin Dashboard");
  expect(element).toBeInTheDocument();
});
