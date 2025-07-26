import React, { useState } from "react";
import { DemographicWrapper, NextButton } from "./styles";
import {
  Button,
  Cascader,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Radio,
  Select,
  Switch,
  TreeSelect,
} from "antd";
const Demographic = ({ setCurrentTab }) => {
  const [name, setName] = useState("");
  const [id, setId] = useState("");
  const [gender, setGender] = useState(1);
  const [dob, setDob] = useState("");

  const handleGenderChange = (e) => {
    setGender(e.target.value);
  };
  const handleChange = (value, field) => {
    if (field === "id") {
      setId(value);
    }
    if (field === "name") {
      setName(value);
    }
    if (field === "dob") {
      setDob(value);
    }
  };

  const handleNext = () => {
    setCurrentTab("2"); // Switch to FingerPrint tab
  };

  return (
    <DemographicWrapper>
      <Form
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 14 }}
        layout="horizontal"
        style={{ maxWidth: 600 }}
      >
        <Form.Item
          label="I.D"
          onChange={(e) => handleChange(e.target.value, "id")}
        >
          <Input value={id} />
        </Form.Item>
        <Form.Item
          label="Name"
          onChange={(e) => handleChange(e.target.value, "name")}
        >
          <Input value={name} />
        </Form.Item>
        <Form.Item label="Gender">
          <Radio.Group
            onChange={handleGenderChange}
            value={gender}
            options={[
              { value: 1, label: "Male" },
              { value: 2, label: "Female" },
            ]}
          />
        </Form.Item>
        <Form.Item label="D.O.B">
          <DatePicker
            style={{ width: "100%" }}
            value={dob}
            onChange={(date) => setDob(date, "dob")}
          />
        </Form.Item>
      </Form>
      <NextButton type="primary" onClick={handleNext}>
        Next
      </NextButton>
    </DemographicWrapper>
  );
};

export default Demographic;
