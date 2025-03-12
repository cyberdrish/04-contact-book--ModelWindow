import React, { useEffect, useState } from "react";

interface Contact {
  name: string;
  city: string;
}
interface ContactFormProps {
  contacts: Contact[];
  setContacts: React.Dispatch<React.SetStateAction<Contact[]>>;
  name: string;
  setName: React.Dispatch<React.SetStateAction<string>>;
  city: string;
  setCity: React.Dispatch<React.SetStateAction<string>>;
  isEditing: Contact | undefined;
  setIsEditing: React.Dispatch<React.SetStateAction<Contact | undefined>>;
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isModel: boolean;
}
function ContactForm({
  contacts,
  setContacts,
  name,
  setName,
  city,
  setCity,
  setIsEditing,
  isEditing,
  isModalOpen,
  setIsModalOpen,
  isModel,
}: ContactFormProps) {
  const [isError, setIsError] = useState<boolean>(false);

  useEffect(() => {
    isEditing && (setName(isEditing.name), setCity(isEditing.city));
  }, [isEditing]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name === "" || city === "") {
      setIsError(true);
      return;
    }
    setContacts((oldVal) => [...oldVal, { name, city }]);
    resetedit();
  };
  const handleSubmitEdit = (e: React.FormEvent) => {
    e.preventDefault();
    setContacts((oldVal) =>
      oldVal.map((val) =>
        isEditing && val.name === isEditing.name && val.city === isEditing.city
          ? { ...val, name, city }
          : { ...val }
      )
    );

    resetedit();
  };
  const resetedit = () => {
    setCity("");
    setName("");
    setIsEditing(undefined);
    setIsError(false);
    setIsModalOpen(false);
  };

  return (
    <form
      style={{ border: "1px solid gray", padding: 10, borderRadius: "5px" }}
      onSubmit={(e) => (!isEditing ? handleSubmit(e) : handleSubmitEdit(e))}
    >
      <h2>Add a new contact</h2>
      <div style={{ display: "flex", gap: 40 }}>
        <div style={{ display: "flex", gap: 5 }}>
          <label>Name</label>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <input
              type="Text"
              value={isEditing ? (isModel ? name : "") : name}
              onChange={(e) => setName(e.target.value)}
            />
            {isError && name == "" && (
              <div style={{ color: "red", marginTop: 1 }}>Enter Name</div>
            )}
          </div>
        </div>
        <div style={{ display: "flex", gap: 5 }}>
          <label>City</label>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <input
              type="Text"
              value={isEditing ? (isModel ? city : "") : city}
              onChange={(e) => setCity(e.target.value)}
            />
            {isError && city == "" && (
              <div style={{ color: "red", marginTop: 1 }}>Enter City</div>
            )}
          </div>
        </div>
        {isEditing && isModel ? (
          <>
            <button>Save Edited Contact</button>
            <button type="reset" onClick={() => resetedit()}>
              Reset
            </button>
          </>
        ) : (
          <button>Add contact</button>
        )}
      </div>
    </form>
  );
}

export default ContactForm;
