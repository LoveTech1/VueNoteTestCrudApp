import axios from "axios";
const BASE_URL = 'http://localhost:8000/api';
const token = 'Bearer 3|CsZUlz07QORKUC5iSdnMtYZm38Tx8MhB5cA8wQHg3f8cafa1';

async function getNotes(params, url = '') {
    try {
        const urls = url ? url : `${BASE_URL}/note`;
        const response = (await axios.get(`${urls}`, { params: params, headers: { Authorization: token} })).data;
        return response;
    } catch (error) {
        console.log(error);
    }  
}

const createNote = async (formdata) => {
    try {
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        };
        const response = await axios.post(`${BASE_URL}/note`, formdata, config);
        return response.data;
    } catch (error) {
        console.error('Error:', error);
    }
}

const editNotes = async (noteId, formdata) => {
    try {
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        };
        const response = await axios.put(`${BASE_URL}/note/${noteId}`, formdata, config);
        return response.data;
    } catch (error) {
        console.error('Error:', error);
    }
}

const deleteNote = async(noteId)=>{
    try {
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        };
        const response = await axios.delete(`${BASE_URL}/note/${noteId}`, config);
        return response.data;
        
    } catch (error) {
        console.error('Error:', error);
    }
}

export { createNote,editNotes,deleteNote,getNotes };

