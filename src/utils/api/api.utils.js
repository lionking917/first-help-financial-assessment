import axios from "axios";

const TICKET_MASTER_EVENT_API_URL = 'https://app.ticketmaster.com/discovery/v2/events.json?size=20&apikey=';
export const fetchTicketMasterEvents = async () => {
    const response = await axios.get(TICKET_MASTER_EVENT_API_URL + process.env.REACT_APP_TICKET_MASTER_API_KEY);

    return response.data._embedded.events.map(event => {
        return {
            id: event.id,
            imageUrl: event.images && event.images.length > 0 ? event.images[0].url : '',
            name: event.name,
            price: event.priceRanges && event.priceRanges.length > 0 ? event.priceRanges[0].min : 0
        }
    })
};