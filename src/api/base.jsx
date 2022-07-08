import axios from 'axios';

const baseApiUrl = 'https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=8'

const api = axios.create({
  baseURL: baseApiUrl,
  headers: {
    'Content-Type': 'application/json',
  },
});


export default api;