import { render, screen} from '@testing-library/react';
import TutorDashboard from '../components/Dashboard/TutorDashboard.component';


test('renders Tutor Dashboard', () => {
    render(<TutorDashboard />);
    const element = screen.getByTestId("Tutor-Dashboard");
    expect(element).toBeInTheDocument();
});

test('renders My Ads', () => {
    render(<TutorDashboard />);
    const element = screen.getByTestId('My-Ads');
    expect(element).toBeInTheDocument();
});