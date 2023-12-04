import { useState } from "react";
import {
  Layout,
  Input,
  Divider,
  //Dropdown,
  //Button,
  //Menu,
  //Spin,
  //Switch,
  //Segmented,
  ColorPicker,
  theme,
  Tabs,
  Modal,
  Button,
} from "antd";
//import { DownOutlined } from "@ant-design/icons";
import type { Color } from "antd/es/color-picker";
import { db } from "./firebase-config";
import { doc, getDoc, increment, updateDoc } from "firebase/firestore";


const { Header, Content } = Layout;

const App = () => {
  const [loading, setLoading] = useState(false);
  //const [value, setValue] = useState<string | number>("Text");
  const [open, setOpen] = useState(false);

  const { token } = theme.useToken();
  const [color, setColor] = useState<Color | string>(token.colorPrimary);


  const handleOk = async () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setOpen(false);
    }, 3000);
  };

  const handleCancel = () => {
    setOpen(false);
    setLoading(false);
  };

  return (
    <Layout style={{ minHeight: "100vh", minWidth: "100vw" }}>
      <Header
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          color: "#fff",
          width: "100%",
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
          <Divider orientation="left">1. choisir un mode</Divider>
          <p>
            Vous pouvez choisir entre le mode text et image. Le mode text
            affiche du text avec un background de couleur unis. Le mode image
            affiche l'image choisie
          </p>
          <Button onClick={async () => {const testRef = doc(db, "collTest", "yqP9AmHTaUWjPgLMPvfR");  console.log("Magic button clicked"); const dooc = await getDoc(testRef); console.log(dooc.data()); }}></Button>
          <Button onClick={async () => {const testRef = doc(db, "collTest", "yqP9AmHTaUWjPgLMPvfR");  console.log("Magic button 2 clicked"); await updateDoc(testRef, {number: increment(1)}) }}></Button>

          <Tabs
            onChange={(e) => {
              console.log("Tabs: ", e);
              setOpen(true);
            }}
            defaultActiveKey="1"
            activeKey="2"
            centered
            type="card"
            size="large"
            items={new Array(2).fill(null).map((_, i) => {
              const id = String(i + 1);
              return {
                label: `Card Tab ${id}`,
                key: id,
                children: (
                  <>
                    <Divider orientation="left">2. choisir text</Divider>
                    <Input
                      placeholder="Basic usage"
                      onChange={(e) =>
                        console.log("Text input: ", e.target.value)
                      }
                    />
                    <Divider orientation="left">3. choisir background</Divider>

                    <ColorPicker value={color} onChange={setColor} />
                  </>
                ),
              };
            })}
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
            <p>Etes vous sur de changer les écrans vers le mode XXX?</p>
          </Modal>
        </div>
      </Content>
    </Layout>
  );
};

export default App;

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
