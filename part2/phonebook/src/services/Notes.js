import axios from "axios";

const baseUrl = "http://localhost:3001/persons";

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const deletePerson = async (id) => {
  const response = await axios.delete(`${baseUrl}/${id}`);
  return response.data;
};

const updateContact = async (id, contact) => {
  const response = await axios.put(`${baseUrl}/${id}`, contact);
  return response.data;
};

const createContact = async (contact) => {
  const response = await axios.post(baseUrl, contact);
  return response.data;
};

const NoteService = {
  getAll: getAll,
  createContact: createContact,
  updateContact: updateContact,
  deletePerson: deletePerson
};

export default NoteService;