import { useState } from "react";
import { rt_db } from "../firebase-config";
import { ref, update } from "firebase/database";
import { Input, Divider, ColorPicker, Tabs, Modal, Button, Card } from "antd";

interface SettingsComponentInterface {
  number: number;
  modeInit: string;
  textMessageInit: string;
  colorInit: string;
}

export default function SettingsComponent({
  number,
  modeInit,
  textMessageInit,
  colorInit,
}: SettingsComponentInterface) {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState(modeInit); //set this based on the server info

  const handleOk = async () => {
    setLoading(true);
    let modeBis = mode;
    if (mode == "1") {
      modeBis = "2";
    } else {
      modeBis = "1";
    }
    await update(ref(rt_db, num), {
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

  const num = "displays/"+number

  return (
    <Card title={`Écran ${number}`}>
      <>
        <Divider orientation="left">1. choisir un mode</Divider>
        <p>
          Vous pouvez choisir entre le mode text et image. Le mode text affiche
          du text avec un background de couleur unis. Le mode image affiche
          l'image choisie
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
                  <Divider orientation="left">2. choisir text</Divider>
                  <Input
                    placeholder="Entrez du text"
                    defaultValue={textMessageInit}
                    onChange={(e) => {
                      console.log("Text input: ", e.target.value);
                      update(ref(rt_db, num), {
                        message: e.target.value,
                      });
                    }}
                  />
                  <Divider orientation="left">3. choisir background</Divider>

                  <ColorPicker
                    defaultValue={colorInit}
                    onChange={(color) => {
                      console.log("Color: ", color.toHexString());
                      update(ref(rt_db, num), {
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
                  <Divider orientation="left">2. choisir images</Divider>
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
            Etes vous sur de changer l'écrans {number} vers le mode{" "}
            {mode == "1" ? "image" : "text"}?
          </p>
        </Modal>
      </>
    </Card>
  );
}
