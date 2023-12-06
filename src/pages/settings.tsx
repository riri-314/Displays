import { useEffect, useState } from "react";
import { Layout, Input, Divider, ColorPicker, Tabs, Modal, Button } from "antd";
import { auth, rt_db } from "../firebase-config";
import { ref, update, get, child } from "firebase/database";
import { User, onAuthStateChanged } from "@firebase/auth";
import Login from "./Login";

//import { doc, getDoc, increment, updateDoc } from "firebase/firestore";

const { Header, Content } = Layout;

//const starCountRef = ref(rt_db, "displays/message");
//onValue(starCountRef, (snapshot) => {
//  const data = snapshot.val();
//  console.log("Message from server:", data);
//});

export default function Settings() {
  const [authUser, setAuthUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const [appLoading, setAppLoading] = useState(true);
  const [appLoadingText, setAppLoadingText] = useState(
    "loading data from server"
  );
  const [open, setOpen] = useState(false);

  const [mode, setMode] = useState("1"); //set this based on the server info
  const [textMessage, setTextMessage] = useState(""); //set this based on the server info
  const [color, setColor] = useState("blue"); //set this based on the server info

  useEffect(() => {
    get(child(ref(rt_db), `displays/`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.val();
          const mode = data.mode;
          const color = data.color;
          const message = data.message;
          setMode(mode);
          setColor(color);
          setTextMessage(message);
          setAppLoading(false);
          console.log(mode, color, message);
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

  const handleOk = async () => {
    setLoading(true);
    let modeBis = mode;
    if (mode == "1") {
      modeBis = "2";
    } else {
      modeBis = "1";
    }
    await update(ref(rt_db, "displays"), {
      mode: modeBis,
    });
    setMode((prev) => {
      if (prev == "1") {
        return "2";
      } else {
        return "1";
      }
    });
    setLoading(false);
    setOpen(false);
  };

  const handleCancel = () => {
    setOpen(false);
    setLoading(false);
  };

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
                background: "#fff",
                padding: 24,
                minHeight: "calc(100vh - 114px)",
                color: "black",
              }}
            >
              {appLoading ? (
                appLoadingText
              ) : (
                <>
                  <Divider orientation="left">1. choisir un mode</Divider>
                  <p>
                    Vous pouvez choisir entre le mode text et image. Le mode
                    text affiche du text avec un background de couleur unis. Le
                    mode image affiche l'image choisie
                  </p>

                  <Tabs
                    onChange={(e) => {
                      console.log("Tabs: ", e);
                      setOpen(true);
                    }}
                    activeKey={mode}
                    centered
                    type="card"
                    size="large"
                    items={[
                      {
                        label: "Text",
                        key: "1",
                        children: (
                          <>
                            <Divider orientation="left">
                              2. choisir text
                            </Divider>
                            <Input
                              placeholder="Entrez du text"
                              defaultValue={textMessage}
                              onChange={(e) => {
                                console.log("Text input: ", e.target.value);
                                update(ref(rt_db, "displays"), {
                                  message: e.target.value,
                                });
                              }}
                            />
                            <Divider orientation="left">
                              3. choisir background
                            </Divider>

                            <ColorPicker
                              defaultValue={color}
                              onChange={(color) => {
                                console.log("Color: ", color.toHexString());
                                update(ref(rt_db, "displays"), {
                                  color: color.toHexString(),
                                });
                              }}
                            />
                          </>
                        ),
                      },
                      {
                        label: "Image",
                        key: "2",
                        children: (
                          <>
                            <Divider orientation="left">
                              2. choisir images
                            </Divider>
                          </>
                        ),
                      },
                    ]}
                  />
                  <Modal
                    open={open}
                    title="Attention"
                    onOk={handleOk}
                    onCancel={handleCancel}
                    footer={[
                      <Button key="back" onClick={handleCancel}>
                        Retour
                      </Button>,
                      <Button
                        key="submit"
                        type="primary"
                        loading={loading}
                        onClick={handleOk}
                      >
                        Appliquer
                      </Button>,
                    ]}
                  >
                    <p>
                      Etes vous sur de changer les écrans vers le mode{" "}
                      {mode == "1" ? "image" : "text"}?
                    </p>
                  </Modal>
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

//<Switch
//checkedChildren="Image"
//unCheckedChildren="Text"
//defaultChecked
///>
//<Segmented
//options={["Image", "Text"]}
//value={value}
//onChange={setValue}
///>

//items={new Array(2).fill(null).map((_, i) => {
//  const id = String(i + 1);
//  return {
//    label: `Card Tab ${id}`,
//    key: id,
//    children: (
//      <>
//        <Divider orientation="left">2. choisir text</Divider>
//        <Input
//          placeholder="Basic usage"
//          onChange={(e) =>
//            console.log("Text input: ", e.target.value)
//          }
//        />
//        <Divider orientation="left">
//          3. choisir background
//        </Divider>
//
//        <ColorPicker value={color} onChange={setColor} />
//      </>
//    ),
//  };
//})}
