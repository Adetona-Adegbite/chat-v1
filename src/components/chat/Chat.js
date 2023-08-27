import {
  addDoc,
  collection,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  where,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { auth, db } from "../../firebase-config";
import "../../styles/styles.css";

export default function Chat(props) {
  const [newMessage, setNewMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const messageCollectionRef = collection(db, "messages");
  useEffect(() => {
    const queryMessages = query(
      messageCollectionRef,
      where("room", "==", props.room),
      orderBy("createdAt")
    );
    const unsubscribe = onSnapshot(queryMessages, (snapshot) => {
      let messages = [];
      snapshot.forEach((doc) => {
        messages.push({ ...doc.data(), id: doc.id });
        // console.log(doc.data().createdAt.toDate());
      });
      setMessages(messages);
    });
    return () => unsubscribe();
  }, []);
  const submitHandler = async (e) => {
    e.preventDefault();
    if (newMessage === "") return;
    await addDoc(messageCollectionRef, {
      text: newMessage,
      createdAt: serverTimestamp(),
      user: auth.currentUser.displayName,
      room: props.room,
    });
    setNewMessage("");
    // console.log(messages.createdAt.toDate());
  };
  return (
    <div className="chat-box">
      <div className="header">
        <h1>Room: {props.room}</h1>
      </div>
      <div>
        {messages.map((message) => {
          return (
            <div className="chats">
              <h3>{message.user}</h3>
              <h4>{message.text}</h4>
              <p>
                {message.createdAt.toDate().toLocaleTimeString().toString()}
              </p>
            </div>
          );
        })}
      </div>
      <form className="chat-form" onSubmit={submitHandler}>
        <input
          placeholder="Send a Message"
          onChange={(e) => setNewMessage(e.target.value)}
          value={newMessage}
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
}
