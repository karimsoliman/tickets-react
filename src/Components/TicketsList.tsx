import React, { useCallback, useEffect, useState } from 'react';
import { Ticket } from '../types/Ticket';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

const TicketsList = () => {

    const [tickets, setTickets] = useState<Ticket[]>();
    const [isLoading, setIsLoading] = useState(false);
    const [pageNumber, setPageNumber] = useState(1);
    const [ticketsCount, setTicketsCount] = useState(0);

    const dataFetch = useCallback(async () => {
        setIsLoading(true);
        const data = await (
            await fetch(`/tickets?pageNumber=${pageNumber-1}`, {
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include'
            })
        ).json();

        setIsLoading(false);
        setTickets(data.payload);
        setTicketsCount(data.count);
    }, [pageNumber]);

    const handleClick = async (id: number) => {
        const response = await fetch(`/tickets?id=${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' }
        });
        if (response.ok) {
            dataFetch();
        }
    };

    useEffect(() => {
        // fetch data
        dataFetch();
    }, [dataFetch, setPageNumber]);

    const handleNextClick = useCallback(() => {
        setPageNumber(pageNumber + 1);
        dataFetch();
    }, [setPageNumber, dataFetch]);

    const handlePrevClick = useCallback(() => {
        setPageNumber(pageNumber - 1);
        dataFetch();
    }, [setPageNumber, dataFetch]);
    
    const disableNext = () => {
        console.log(pageNumber);
        if(ticketsCount < 5) return false;
        if(ticketsCount % 5 === 0 )
            return (pageNumber === ticketsCount / 5);
        if(ticketsCount % 5 > 0)
            return (pageNumber === (ticketsCount % 5 + 2));
    };

    if (isLoading)
        return (<FontAwesomeIcon icon={faSpinner} size='10x' spin />);
    if(ticketsCount === 0)
    {
        return (<>No Tickets Found, Please Add using the button above.</>);
    }
    else
        return (
            <div>
                <div className="album py-5 bg-light">
                    <div className="container">

                        <div className="row">
                            {tickets && tickets?.map((ticket, index) => (
                                <div key={index} className="col-md-4">
                                    <div className="card mb-4 box-shadow">
                                        <div style={{ marginTop: '5px', width: '100px', height: '100px', backgroundColor: ticket.color, alignSelf: 'center' }}></div>
                                        <div className="card-body">
                                            <p className="card-text">{ticket.phoneNumber}</p>
                                            <div className="text-right">
                                                <button type="button" disabled={ticket.color === 'red'} onClick={() => handleClick(ticket.id)} className="btn btn-sm btn-outline-secondary">Handle</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    {ticketsCount !== 0 && (
                             <nav aria-label="Page navigation" tabIndex={pageNumber}>
                             <ul className="pagination justify-content-center">
                                 <li className="page-item"><a className={pageNumber === 1 ? "page-link disabled" : "page-link"} onClick={handlePrevClick} href="#">Previous</a></li>
                                 <li className="page-item"><a className={disableNext() ? "page-link disabled" : "page-link" } onClick={handleNextClick} href="#">Next</a></li>
                             </ul>
                         </nav>
                    )}
                </div>
            </div>
        );
};

export default TicketsList;
