import { useState, useEffect } from "react";
import { rt_db } from "../firebase-config";
import { ref, onValue } from "firebase/database";
import { useParams } from "react-router-dom";

export default function Display() {
  const { number } = useParams();
  const num = "displays/" + number;

  const [serverData, setServerData] = useState([
    "1",
    "blue",
    "Not connected to db",
  ]);

  const mainStyle = {
    width: "1280px",
    height: "1024px",
    backgroundColor: serverData[1],
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden", // Hide overflow to prevent text overflow
  };

  useEffect(() => {
    const starCountRef = ref(rt_db, num);
    const unsubscribe = onValue(starCountRef, (snapshot) => {
      const data = snapshot.val();
      const mode = data.mode;
      const color = data.color;
      const message = data.message;
      setServerData([mode, color, message]);
      
      const mainElement = document.getElementById("main");
      if (mainElement) {
        mainElement.style.transform = "rotate(180deg)";
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  // Check if the wakeLock API is supported
  if ("wakeLock" in navigator) {
    // Request a screen wake lock
    navigator.wakeLock
      .request("screen")
      .then(() => {
        console.log("Screen wake lock acquired");
      })
      .catch((err) => {
        console.error(`Failed to acquire screen wake lock: ${err}`);
      });
  } else {
    console.warn("Wake lock API is not supported");
  }

  return (
    <div>
      <main id="main" style={mainStyle}>
        <div
          style={{
            fontSize: `120px`,
            textAlign: "center",
          }}
        >
          {serverData[2]}
        </div>
      </main>
    </div>
  );
}
