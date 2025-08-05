import React from "react";
import { FormWrapper, StyledForm } from "../style";
import { DatePicker, Form, Input, Radio } from "antd";
import ButtonReusable from "../../../Components/Buttons/ButtonReusable";
import useGlobalContext from "../../../contexts/Global/useGlobalContext";
import dayjs from "dayjs";
import InputWithLabel from "../../../Components/InputWithLabel/InputWithLabel";
const AddDemographicData = ({ fromEdit }) => {
  const {
    setId,
    setName,
    setGender,
    setDob,
    formData,
    setCaseId,
    setCurrentTab,
  } = useGlobalContext();

  const { id, name, gender, dob } = formData;

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
    if (field === "caseId") {
      setCaseId(value);
    }
  };

  const handleNext = () => {
    setCurrentTab("3");
  };

  return (
    <FormWrapper>
      <StyledForm
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 14 }}
        layout="horizontal"
        // style={{ maxWidth: 600 }}
      >
        <>
          <InputWithLabel
            label={"I.D"}
            value={id}
            disabled={fromEdit}
            onChange={(e) => handleChange(e.target.value, "id")}
          />

          <InputWithLabel
            value={name}
            onChange={(e) => handleChange(e.target.value, "name")}
            label="Name"
          />

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
              value={dob !== "" ? dayjs(dob) : ""}
              onChange={(date) => handleChange(date, "dob")}
            />
          </Form.Item>
        </>
      </StyledForm>
    </FormWrapper>
  );
};

export default AddDemographicData;
