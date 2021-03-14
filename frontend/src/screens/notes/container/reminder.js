import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { remindUserAboutNotes } from "../../../store/actions/notes";

const Reminder = ({ reminder, id }) => {
  const [timeLeft, setTimeLeft] = useState(null);
  const [milliSecondsLeft, setMilliSecondsLeft] = useState(null);
  const dispatch = useDispatch();

  const find = (milliSeconds) => {
    const label = milliSeconds / (3600 * 24 * 1000);
    const daysLeft = Math.floor(label);
    const hoursLeft = Math.floor((label - daysLeft) * 24);
    const minutesLeft = Math.floor(((label - daysLeft) * 24 - hoursLeft) * 60);
    const secondsLeft = Math.floor(
      (((label - daysLeft) * 24 - hoursLeft) * 60 - minutesLeft) * 60
    );
    setTimeLeft(`${daysLeft}D ${hoursLeft}H ${minutesLeft}M ${secondsLeft}S`);
    setMilliSecondsLeft(milliSeconds);
  };

  useEffect(() => {
    if (milliSecondsLeft > 0) {
      setTimeout(() => find(milliSecondsLeft - 1000), 1000);
    } 
    
    else if (milliSecondsLeft !== null) {
      dispatch(remindUserAboutNotes(id));
    }
  }, [milliSecondsLeft]);

  useEffect(() => {
    if (reminder) {
      const date = new Date(reminder);
      const now = new Date();
      const milliSecondsLeft = date - now;
      find(milliSecondsLeft);
    }
  }, [reminder]);
  return timeLeft;
};

export default Reminder;
