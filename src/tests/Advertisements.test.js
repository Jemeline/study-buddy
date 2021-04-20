import { fireEvent, render, screen } from '@testing-library/react';
import TutorAdList from '../components/Advertisements/TutorAdList';
import TutorAd from '../components/Advertisements/TutorAd';

const list = [{
  "_id": 0,
  "tutorEmail": "tutor@email.com",
  "text": "test ad text",
  "courses": "COMP-550"
}, {
  "_id": 1,
  "tutorEmail": "tutor2@email.com",
  "text": "another test ad",
  "courses": "COMP-523"
}];

test('renders Advertisement List for Students', () => {
  render(<TutorAdList isTutor={false} list={list} />);
  expect(screen.getByText("test ad text")).toBeInTheDocument();
});

test('renders Advertisement list for Tutors', () => {
  render(<TutorAdList isTutor={true} list={list} />);
  expect(screen.getByText("test ad text")).toBeInTheDocument();
});

test('renders Advertisement Edit mode', () => {
  render(<TutorAd isTutor={true} ad={list[0]} />);
  fireEvent.click(screen.getByText("Edit"));
  expect(screen.getByText("Submit")).toBeInTheDocument();
  expect(screen.getAllByRole("textbox")[0]).toBeInTheDocument();
});