import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Alert, Button, Card, Form, Input, Space } from "antd";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase-config";
import { useState } from "react";

export default function Login() {
  const [error, setError] = useState("");

  const onFinish = (values: any) => {
    console.log("Received values of form: ", values);

    signInWithEmailAndPassword(auth, values.username, values.password)
      .then((userCredential) => {
        setError("");
        console.log(userCredential);
      })
      .catch((error) => {
        console.log(error.code);
        if (error.code == "auth/invalid-credential") {
          setError("Invalide email and or password");
          //console.log("wrong password")
        } else if (error.code == "auth/user-not-found") {
          setError("User not found");
        } else if (error.code == "auth/too-many-requests") {
          setError("Try later. Too many requests");
        } else if (error.code == "auth/invalid-email") {
          setError("Invalide email and or password");
        } else {
          setError("Error signing in");
        }
      });
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        width: "100vw",
        backgroundColor: "whitesmoke",
      }}
    >
      <Space direction="vertical">
        {error && <Alert message={error} type="error" />}
        <Card title="Se connecter" style={{ width: 300, textAlign: "center" }}>
          <Form
            name="normal_login"
            className="login-form"
            initialValues={{ remember: true }}
            onFinish={onFinish}
          >
            <Form.Item
              name="username"
              rules={[
                { required: true, message: "Please input your Username!" },
              ]}
            >
              <Input
                prefix={<UserOutlined className="site-form-item-icon" />}
                placeholder="Adresse mail"
              />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                { required: true, message: "Please input your Password!" },
              ]}
            >
              <Input
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="Mot de passe"
              />
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="login-form-button"
                style={{ width: "100%" }}
              >
                Connection
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </Space>
    </div>
  );
}
