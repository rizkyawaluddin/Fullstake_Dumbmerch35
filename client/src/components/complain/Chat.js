import React from "react";
import "../../assets/static/css/complain.css";
// import Image from "../../assets/img/profile-admin-circle-icon.png";

const Chat = ({ contact, user, messages, sendMessage }) => {
  console.log("Message: ", messages);
  console.log("user: ", user)
  return (
    <>
      {contact ? (
        <>
          <div id="chat-messages" className=" d-flex flex-column h-100 ">
            <div className="mt-auto">
              {messages?.map((item, index) => (
                <div key={index}>
                  <div className={`d-flex  ${item.idSender === user.id ? "justify-content-end" : "justify-content-start"} px-2 mb-2`}>
                    <div className={item.idSender === user.id ? "chat-me" : "chat-other"}>
                      <span className="">{item.message}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="col-12">
            <div className="input-group">
              <input placeholder="Send Message" className="form-control rounded border-0 py-2 bg-var-dark-gray text-light mb-3" onKeyPress={sendMessage} />
            </div>
          </div>
        </>
      ) : (
        <>
          <h2>Click Contact For Message</h2>
        </>
      )}
    </>
  );
};

export default Chat;
