import { useState } from "react";
import ContactForm from "./components/ContactForm";
import Modal from "./ui/Modal";

interface Contact {
  name: string;
  city: string;
}

function App() {
  //should use uniqueId(crypto.randomUUID()) for this...
  const [name, setName] = useState<string>("");
  const [city, setCity] = useState<string>("");
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [isEditing, setIsEditing] = useState<Contact | undefined>();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  return (
    <>
      <div style={{ display: "grid", gridTemplateRows: "1fr,6fr" }}>
        <ContactForm
          contacts={contacts}
          setContacts={setContacts}
          setName={setName}
          name={name}
          setCity={setCity}
          city={city}
          isEditing={isEditing}
          setIsEditing={setIsEditing}
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          isModel={false}
        />
        <div>
          <h2>All Contacts:-</h2>
          {contacts &&
            contacts.map((val, i) => (
              <div
                key={i}
                style={{
                  border: "1px solid teal",
                  padding: 10,
                  borderRadius: "5px",
                  marginTop: 3,
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <div>
                  <h2>{val.name}</h2>
                  <div>{val.city}</div>
                </div>
                <button
                  style={{
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                  }}
                  onClick={() => (
                    setIsEditing({ ...val }), setIsModalOpen(true)
                  )}
                >
                  ✏️
                </button>
              </div>
            ))}
        </div>
        {/* Modal for editing contact */}
        {isModalOpen && (
          <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
            <ContactForm
              contacts={contacts}
              setContacts={setContacts}
              name={name}
              setName={setName}
              city={city}
              setCity={setCity}
              isEditing={isEditing}
              setIsEditing={setIsEditing}
              isModalOpen={true}
              setIsModalOpen={setIsModalOpen}
              isModel={true}
            />
          </Modal>
        )}
      </div>
    </>
  );
}

export default App;
