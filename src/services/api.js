import axios from "axios";
import { ACCESSKEY } from "../accesskey/key";

export const fetchResults = async (query, page, signal) => {
    const response = await axios.get("https://api.unsplash.com/search/photos", {
        headers:{
            Authorization: `Client-ID ${ACCESSKEY}`
        },
        params:{
        query: query,
        page: page,
        per_page: 12,
        },
        signal: signal,
    })
    return response.data;
}