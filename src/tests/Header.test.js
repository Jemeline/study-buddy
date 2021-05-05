import { render, screen, fireEvent} from '@testing-library/react';
import React, {useState} from 'react';
import Header from '../components/Navigation/Header.component';

test('renders Navigation Header', () => {
    render(<Header isLoggedIn={true} setIsLoggedIn={true}/>);
    const element = screen.getByTestId("Nav-Bar");
    expect(element).toBeInTheDocument();
});

// test('renders Help Center on click', () => {
//     render(<HelpCenterDashboard/>);
//     const element = screen.getByTestId("Help-Dashboard");
//     expect(element).toBeEnabled();
// });