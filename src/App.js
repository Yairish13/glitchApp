import React, { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';
import Ticket from './Ticket';
import SearchInput from './SearchInput';

function App() {
  const [tickets, setTickets] = useState([]);
  const [searchInput, setSearchInput] = useState('');
  const [counter, setCounter] = useState(0);
  const [reset, setReset] = useState(0);

  const increase = () => {
    setCounter(counter + 1);
  };

  const restore = () => {
    setReset(reset + 1);
    setCounter(0);
  };

  const getTheTickets = async () => {
    try {
      const res = await axios.get('api/tickets');
      setTickets(res.data);
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getTheTickets();
  }, []);

  useEffect(() => {
    const search = async () => {
      const searchList = await axios.get(`/api/tickets?searchText=${searchInput}`);
      setTickets(searchList.data);
    };
    search();
  }, [searchInput]);

  const done = async (id) => {
    try {
      const done = await axios.post(`/api/tickets/${id}/done`);
      getTheTickets();
    } catch (error) {
      console.log(error);
    }
  };

  const unDone = async (id) => {
    try {
      const undone = await axios.post(`/api/tickets/${id}/undone`);
      getTheTickets();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <main>
        <div className="hidenNreset">

          <h1>Tickets Manager</h1>
          <p>
            Showing
            {tickets.length}
            {' '}
            results
            {' '}
          </p>
          {counter > 0
     && (
       <>
         <span id="hideTicketsCounter">{counter}</span>
         <span>
           {' '}
           hidden tickets
           <button id="restoreHideTickets" onClick={restore}>Restore</button>
         </span>
       </>
     )}

          <SearchInput searchInput={searchInput} setSearchInput={setSearchInput} />

        </div>
        <div className="Ticketsmap">
          {tickets.map((ticket, index) => (
            <Ticket
              ticket={ticket}
              key={index}
              increase={increase}
              reset={reset}
              done={done}
              unDone={unDone}
            />
          ))}
        </div>
      </main>
    </>
  );
}

export default App;
