"use client";
import type { FormProps } from "antd";
import { Button, Checkbox, Form, Input } from "antd";
import { useRouter } from "next/navigation";

type FieldType = {
  username?: string;
  password?: string;
  remember?: string;
};

export default function LoginForm() {
  const router = useRouter();

  const onFinish: FormProps<FieldType>["onFinish"] = () => {
    router.push("/universities");
  };

  const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (
    errorInfo
  ) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Form
      className="flex flex-col justify-center items-center w-full mx-auto my-auto p-4 bg-slate-50 rounded-xl ring-1 ring-blue-500 overflow-hidden"
      name="basic"
      style={{ maxWidth: 400 }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <div className="w-full space-y-3">
        <div className="py-2 font-bold text-xl text-center">Login</div>
        <Form.Item<FieldType>
          name="username"
          rules={[{ required: true, message: "Please input your username!" }]}
        >
          <Input placeholder="username" className="flex w-full" />
        </Form.Item>
        <Form.Item<FieldType>
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password placeholder="password" />
        </Form.Item>
        <Form.Item<FieldType>
          name="remember"
          valuePropName="checked"
          wrapperCol={{ span: 16 }}
        >
          <Checkbox>Remember me</Checkbox>
        </Form.Item>
        <Form.Item wrapperCol={{ span: 16 }} className="flex justify-center">
          <Button type="primary" htmlType="submit" className="font-semibold">
            Login
          </Button>
        </Form.Item>
      </div>
    </Form>
  );
}
