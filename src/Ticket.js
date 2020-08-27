import React, { useState, useEffect } from 'react';
import './Ticket.css';

function Ticket({
  ticket, increase, reset, done, unDone,
}) {
  const [classTicket, setClassTicket] = useState('ticket');
  const [display, setDisplay] = useState('none');

  const hideClick = () => {
    setClassTicket('hiddenTicket');
    increase();
  };

  useEffect(() => {
    setClassTicket('ticket');
  }, [reset]);

  const newDate = (ticketCreationTime) => new Date(ticketCreationTime);

  const style = ticket.done
    ? {
      backgroundColor: 'red',
    }
    : {
      backgroundColor: 'green',
    };

  const showButton = () => {
    setDisplay('block');
  };
  const hideButton = () => {
    setDisplay('none');
  };

  return (
    <div id="container" onMouseOver={showButton} onMouseOut={hideButton}>
      <div className={classTicket}>
        <button
          style={{ display }}
          className="hideTicketButton"
          onClick={hideClick}
        >
          Hide
        </button>
        <h4>
          {ticket.title}
          {' '}
        </h4>
        <p className="content">{ticket.content}</p>
        <div>
          <p className="email">
            By&nbsp;
            <a style={{ textDecoration: 'none' }} href={`mailto:${ticket.userEmail}`}>{ticket.userEmail}</a>
            &nbsp;
            |
            &nbsp;
            {newDate(ticket.creationTime).toString()}
          </p>
        </div>

        <div className="labels">
          {ticket.labels !== undefined
            && ticket.labels.map((label) => (
              <span className="label">{label}</span>
            ))}
          {' '}
        </div>

        <br />

        <div
          style={style}
          className="doneBtn"
          onClick={
            ticket.done ? () => unDone(ticket.id) : () => done(ticket.id)
          }
        >
          {ticket.done ? 'unDone' : 'Done'}
        </div>
      </div>
    </div>
  );
}

export default Ticket;
