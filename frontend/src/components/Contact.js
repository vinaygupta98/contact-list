import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
const API_URL = "http://localhost:4000/api/contact";

const Contact = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [contact, setContact] = useState({
    name: "dummay name",
    email: "dummaymail@demo.com",
    phone: 9876543210,
  });
  const [saving, setSaving] = useState(false);
  const handleChange = (event) => {
    const { name, value } = event.target;
    setContact((prev) => ({ ...prev, [name]: value }));
  };
  useEffect(() => {
    if (id) {
      const getById = async (id) => {
        const response = await fetch(API_URL + "/" + id);
        const result = await response.json();
        setContact(result.contact);
      };
      getById(id);
    }
  }, [id]);

  const handleSave = async (event) => {
    event.preventDefault();
    setSaving(true);
    if (id) {
      const response = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(contact),
      });
      const result = await response.json();
      if (result.success) {
        setTimeout(() => {
          toast.success(result.message);
          setSaving(false);
          navigate("/");
        }, 2000);
      } else {
        setSaving(false);
        //  toast.error("Some Error Occur While Saving.");
      }
    } else {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(contact),
      });
      const result = await response.json();
      if (result.success) {
        setTimeout(() => {
          toast.success(result.message);
          setSaving(false);
          navigate("/");
        }, 2000);
      } else {
        setSaving(false);
        toast.error("Some Error Occur While Saving.");
      }
    }
  };
  return (
    <div className='m-4'>
      <h2 className='mt-4 mb-4'>{id ? "Edit Contact" : "Add New Contact"}</h2>
      <div className=''>
        <form onSubmit={handleSave}>
          <div className='form-group mb-3'>
            <label className='mb-1 fw-bold fs-6'>
              Name <span className='text-danger'>*</span>
            </label>
            <input
              type='text'
              className='form-control'
              placeholder='Name'
              name='name'
              value={contact.name}
              onChange={handleChange}
            />
          </div>
          <div className='form-group mb-3'>
            <label className='mb-1 fw-bold'>
              Phone <span className='text-danger'>*</span>
            </label>
            <input
              type='number'
              className='form-control'
              placeholder='Phone'
              name='phone'
              value={contact.phone}
              onChange={handleChange}
            />
          </div>
          <div className='form-group mb-3'>
            <label className='mb-1 fw-bold'>
              Email <span className='text-danger'>*</span>
            </label>
            <input
              type='email '
              className='form-control'
              placeholder='Email'
              name='email'
              value={contact.email}
              onChange={handleChange}
            />
          </div>

          <button
            type='submit'
            disabled={saving}
            className='btn btn-primary'
            onSubmit={handleSave}
          >
            {saving ? "Saving..." : "Save"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
