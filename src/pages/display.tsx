import { useState, useEffect } from "react";
import { rt_db } from "../firebase-config";
import { ref, onValue } from "firebase/database";
import { useParams } from 'react-router-dom';

export default function Display() {
  const { number } = useParams();
  const num = "displays/"+number

  //const [mode, setMode] = useState("1"); //set this based on the server info
  const [textMessage, setTextMessage] = useState("Not connected to db"); //set this based on the server info
  const [color, setColor] = useState("blue"); //set this based on the server info


  const mainStyle = {
    width: "1280px",
    height: "1024px",
    backgroundColor: color,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden", // Hide overflow to prevent text overflow
  };

  useEffect(() => {
    const starCountRef = ref(rt_db, num);
    const unsubscribe = onValue(starCountRef, (snapshot) => {
      const data = snapshot.val();
      //const mode = data.mode;
      const color = data.color;
      const message = data.message;
      //setMode(mode);
      setColor(color);
      setTextMessage(message);
      //console.log("Message from server:", data);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <div style={{rotate:"180deg"}}>
      <main id="main" style={mainStyle}>
        <div
          style={{
            fontSize: `120px`,
            textAlign: "center",
          }}
        >
          {textMessage}
        </div>
      </main>
    </div>
  );
}
