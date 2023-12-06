import { useEffect, useState } from "react";
import {
  Layout,
  Space,
} from "antd";
import { auth, rt_db } from "../firebase-config";
import { ref, get, child } from "firebase/database";
import { User, onAuthStateChanged } from "@firebase/auth";
import Login from "./Login";
import SettingsComponent from "../components/SettingsComponent";

//import { doc, getDoc, increment, updateDoc } from "firebase/firestore";

const { Header, Content } = Layout;

//const starCountRef = ref(rt_db, "displays/message");
//onValue(starCountRef, (snapshot) => {
//  const data = snapshot.val();
//  console.log("Message from server:", data);
//});

export default function Settings() {
  const [authUser, setAuthUser] = useState<User | null>(null);
  const [appLoading, setAppLoading] = useState(true);
  const [appLoadingText, setAppLoadingText] = useState(
    "loading data from server"
  );

  const [mode, setMode] = useState(["1", "1", "1", "1"]); //set this based on the server info
  const [textMessage, setTextMessage] = useState(["", "", "", ""]); //set this based on the server info
  const [color, setColor] = useState(["blue", "blue", "blue", "blue"]); //set this based on the server info

  useEffect(() => {
    get(child(ref(rt_db), `displays/`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.val();
          const data0 = data[1];
          const data1 = data[2];
          const data2 = data[3];
          const data3 = data[4];
          const mode = [data0.mode, data1.mode, data2.mode, data3.mode];
          const color = [data0.color, data1.color, data2.color, data3.color];
          const message = [
            data0.message,
            data1.message,
            data2.message,
            data3.message,
          ];
          setMode(mode);
          setColor(color);
          setTextMessage(message);
          setAppLoading(false);
          //console.log(data[1]);
        } else {
          setAppLoadingText("Error loading data from server. Contact admin");
          console.log("No data available");
        }
      })
      .catch((error) => {
        console.error(error);
      });
    const listen = onAuthStateChanged(auth, (user) => {
      if (user) {
        setAuthUser(user);
      } else {
        setAuthUser(null);
      }
    });
    return () => {
      listen();
    };
  }, []);

  return (
    <>
      {authUser ? (
        <Layout style={{ minHeight: "100vh", minWidth: "100vw" }}>
          <Header
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              textAlign: "center",
              color: "#fff",
              width: "100%",
              backgroundColor: "#cfd8dc",
              fontWeight: "400",
            }}
          >
            <h1>Displays</h1>
          </Header>

          <Content>
            <div
              style={{
                background: "#eceff1",
                padding: 24,
                minHeight: "calc(100vh - 114px)",
                color: "black",
              }}
            >
              {appLoading ? (
                appLoadingText
              ) : (
                <>
                  <Space
                    direction="vertical"
                    size="large"
                    style={{ display: "flex" }}
                  >
                    <SettingsComponent
                      number={1}
                      modeInit={mode[0]}
                      textMessageInit={textMessage[0]}
                      colorInit={color[0]}
                    />
                    <SettingsComponent
                      number={2}
                      modeInit={mode[1]}
                      textMessageInit={textMessage[1]}
                      colorInit={color[1]}
                    />
                    <SettingsComponent
                      number={3}
                      modeInit={mode[2]}
                      textMessageInit={textMessage[2]}
                      colorInit={color[2]}
                    />
                    <SettingsComponent
                      number={4}
                      modeInit={mode[3]}
                      textMessageInit={textMessage[3]}
                      colorInit={color[3]}
                    />
                  </Space>
                </>
              )}
            </div>
          </Content>
        </Layout>
      ) : (
        <Login />
      )}
    </>
  );
}
