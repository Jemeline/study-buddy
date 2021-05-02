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

const user = {
    first: '',
    last: '',
    avatar: picture,
    email: '',
    role: '',
    phoneNumber: ''
  }

// test('renders Student Dashboard', () => {
//     render(<StudentDashboard/>);
//     const element = screen.getByTestId("Student-Dashboard");
//     expect(element).toBeInTheDocument();
// });

// test('every element renders', () => {
//     render(<StudentDashboard/>);
//     expect(screen.getByTestId('Help-Dashboard')).toBeInTheDocument();
//     expect(screen.getByTestId('Group-Dashboard')).toBeInTheDocument();
//     expect(screen.getByTestId('Profile-Dashboard')).toBeInTheDocument();
//     expect(screen.getByTestId('Suggested-Matches-Dashboard')).toBeInTheDocument();
//     expect(screen.getByTestId('ClassList-Dashboard')).toBeInTheDocument();
//     expect(screen.getByTestId('Calendar-Dashboard')).toBeInTheDocument();
//     expect(screen.getByTestId('Course-Dashboard')).toBeInTheDocument();
//     expect(screen.getByTestId('Invite-Dashboard')).toBeInTheDocument();
//     expect(screen.getByTestId('FindBuddy-Dashboard')).toBeInTheDocument();
//     expect(screen.getByTestId('Tutor-Dashboard')).toBeInTheDocument();
// });

// test('renders Student Dashboard', () => {
//     render(<ProfileDashboard/>);
//     expect(screen.getByTestId("Profile-Dashboard")).toBeInTheDocument();
// });

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

// test('renders Create Group Dashboard', () => {
//     render(<CreateGroupDashboard/>);
//     const element = screen.getByTestId("Group-Dashboard");
//     expect(element).toBeInTheDocument();
// });

// test('renders Create Group onClick', () => {
//     render(<CreateGroupDashboard/>);
//     const element = screen.getByTestId("Group-Dashboard");
//     expect(element).toBeEnabled();
// });

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

test('renders Invite Dashboard', () => {
    render(<InviteDashboard/>);
    const element = screen.getByTestId("Invite-Dashboard");
    expect(element).toBeInTheDocument();
});

test('renders Invite onClick', () => {
    render(<InviteDashboard/>);
    const element = screen.getByTestId("Invite-Dashboard");
    expect(element).toBeEnabled();
});

