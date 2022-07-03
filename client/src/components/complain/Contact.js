import React from "react";
import Image from "../../assets/img/Hacking2.jpg";

const Contact = ({ dataContact, clickContact, contact }) => {
  return (
    <>
      {dataContact.length !== 0 && (
        <>
          {dataContact.map((item) => (
            <button key={item.id} onClick={() => clickContact(item)} className="container bg-transparent border-0 d-flex align-items-center mb-3">
              <img className="rounded-circle icon-profile-circle" src={Image} alt="Profile" />
              <div className="ms-3 text-start">
                <span className="d-block text-light fw-bold">{item.name}</span>
                <span className="d-block text-small  text-var-gray">{item.message}</span>
              </div>
            </button>
          ))}
        </>
      )}
    </>
  );
};

export default Contact;
