import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const API_URL = "http://localhost:4000/api/contact";

const Home = () => {
  const [contacts, setContacts] = useState([]);
  const [search, setSearch] = useState("");
  let time;
  const getData = async (search) => {
    try {
      if (search !== "") {
        time = setTimeout(async () => {
          const response = await fetch(`${API_URL}?search=${search}`);
          const result = await response.json();
          if (result.success) {
            toast.success(result.message);
            setContacts(result.contacts);
          } else {
            toast.error(result.message);
            setContacts(result.contacts);
          }
        }, 2000);
      } else {
        const response = await fetch(API_URL);
        const result = await response.json();
        if (result.success) {
          toast.success(result.message);
          setContacts(result.contacts);
        } else {
          toast.error(result.message);
          setContacts(result.contacts);
        }
      }
    } catch (error) {
      // handle error
      toast.error("Network Error Occur");
    }
  };
  useEffect(() => {
    getData(search);
    return () => clearTimeout(time);
  }, [search]);

  const handleDelete = async (id) => {
    //   call for deleting item
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
      });
      const result = await response.json();
      if (result) {
        toast.success(result.message);
        setContacts(contacts.filter((a) => a._id !== id));
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  return (
    <div className='container-fluid'>
      <h2 className='mt-3 mb-3'> Home Page</h2>
      <input
        type='text'
        className='form-control'
        placeholder='Search'
        name='search'
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <div className='mt-3'>
        <Link to='/contact' className='btn btn-primary'>
          Add Contact
        </Link>
      </div>
      {contacts.length > 0 ? (
        <table className='table'>
          <thead>
            <tr>
              <th>SR no.</th>
              <th>Name</th>
              <th>Phone</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            {contacts.map((contact, index) => {
              return (
                <tr key={contact._id}>
                  <td>{index + 1}</td>
                  <td>{contact.name}</td>
                  <td>{contact.phone}</td>
                  <td>{contact.email}</td>
                  <td>
                    <Link
                      to={`/contact/${contact._id}`}
                      className='btn btn-primary'
                    >
                      Update
                    </Link>
                  </td>
                  <td>
                    <button
                      className='btn btn-outline-danger'
                      onClick={() => handleDelete(contact._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      ) : (
        <div className='container mt-5'>
          <h5>No Contact Found</h5>
          <p>Add Some to See Here</p>
        </div>
      )}
    </div>
  );
};

export default Home;
