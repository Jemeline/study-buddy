import { render, screen, fireEvent, act } from '@testing-library/react';
import StudentDashboard from '../components/Dashboard/StudentDashboard.component';
import picture from '../components/study-buddy-tagline.png';

import ProfileDashboard from '../components/Dashboard/Student/ProfileDashboard.component';
import InviteDashboard from '../components/Dashboard/Student/InviteDashboard.component';
import FindAStudyBuddyDashboard from '../components/Dashboard/Student/FindAStudyBuddyDashboard.component';
import SuggestedTutorsDashboard from '../components/Dashboard/Student/SuggestedTutorsDashboard.component';
import CourseScheduleDashboard from '../components/Dashboard/Student/CourseScheduleDashboard.component';
import CalendarDashboard from '../components/Dashboard/Student/CalendarDashboard.component';
import StudentClassListDashboard from '../components/Dashboard/Student/StudentClassListDashboard.component';
import CreateGroupDashboard from '../components/Dashboard/Student/CreateGroupDashboard.component';
import SuggestedMatchesDashboard from '../components/Dashboard/Student/SuggestedMatchesDashboard.component';
import HelpCenterDashboard from '../components/Dashboard/Student/HelpCenterDashboard.component';


test('renders Help Center Dashboard', () => {
    render(<HelpCenterDashboard/>);
    const element = screen.getByTestId("Help-Dashboard");
    expect(element).toBeInTheDocument();
});

test('renders Help Center on click', () => {
    render(<HelpCenterDashboard/>);
    const element = screen.getByTestId("Help-Dashboard");
    expect(element).toBeEnabled();
});

test('renders Create Group Dashboard', () => {
    act(() => {
        render(<FindAStudyBuddyDashboard/>);
        const element = screen.getByTestId('FindBuddy-Dashboard');
        expect(element).toBeInTheDocument();
    });
});

test('renders Create Group onClick', () => {
    act(() => {
        render(<FindAStudyBuddyDashboard/>);
        const element = screen.getByTestId('FindBuddy-Dashboard');
        expect(element).toBeEnabled();
    });
});


