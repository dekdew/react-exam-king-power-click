import { Input, Form, Row, Col, Select, DatePicker, Radio, Button } from "antd";
import CountryPhoneInput from "antd-country-phone-input";
import countryList from "react-select-country-list";
import { memo, useCallback, useMemo, useState } from "react";
import NumberFormat from "react-number-format";
import thaiIdCard from "thai-id-card";
import { useRegisterContext } from "../stores/RegisterContext";
import moment from "moment";

const RegisterForm = ({
  defaultValue,
  onUpdated = () => {},
}: {
  defaultValue?: any;
  onUpdated?: any;
}) => {
  const [loading, setLoading] = useState(false);
  const { register, updateById } = useRegisterContext();
  const nationalityOptions = useMemo(() => countryList().getData(), []);
  const [form] = Form.useForm();

  const onFinish = useCallback(
    async (values: any) => {
      setLoading(true);

      // const data = {
      //   key: new Date().valueOf(),
      //   title: values?.title,
      //   firstName: values?.firstName,
      //   lastName: values?.lastName,
      //   birthday: values?.birthday,
      //   nationality: values?.nationality,
      //   citizenId: values?.citizenId?.replaceAll(" ", ""),
      //   gender: values?.gender,
      //   mobilePhone: values?.mobilePhone?.phone,
      //   passportNo: values?.passportNo,
      //   expectedSalary: parseFloat(values?.expectedSalary?.replaceAll(",", "")),
      // };

      if (defaultValue) {
        await updateById(values?.key, values);
        onUpdated();
      } else {
        const data = { ...values, key: new Date().valueOf() };

        await register(data);
      }

      form.resetFields();

      setLoading(false);
    },
    [defaultValue, form, onUpdated, register, updateById]
  );

  const onFinishFailed = useCallback((errorInfo: any) => {
    console.log("Failed:", errorInfo);
  }, []);

  const inputNumberValidator = (rule: any, value: any) => {
    const min = rule.min;
    const max = rule.max;
    const message = rule.message;

    try {
      if (value) {
        value = parseFloat(value.replaceAll(",", ""));
        if (min !== null && value < min) throw new Error(message);
        if (max !== null && value > max) throw new Error(message);
        if (isNaN(value)) throw new Error(message);
      }
      return Promise.resolve();
    } catch (err) {
      return Promise.reject(err);
    }
  };

  const inputPhoneValidator = (rule: any, value: any) => {
    const message = rule.message;
    try {
      if (!value?.phone) throw new Error(message);
      if (value?.phone?.length < 9) throw new Error(message);
      return Promise.resolve();
    } catch (err) {
      return Promise.reject(err);
    }
  };

  const inputIDValidator = (rule: any, value: any) => {
    const message = rule.message;
    try {
      if (value) {
        if (!thaiIdCard.verify(value.replaceAll(" ", "")))
          throw new Error(message);
      }
      return Promise.resolve();
    } catch (err) {
      return Promise.reject(err);
    }
  };

  return (
    <Form
      form={form}
      initialValues={
        defaultValue
          ? { ...defaultValue, birthday: moment(defaultValue?.birthday) }
          : {
              mobilePhone: {
                short: "TH",
              },
            }
      }
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
      <Row gutter={[10, 5]}>
        <Form.Item name="key" />
        <Col span={24} lg={4}>
          <Form.Item
            label="Title"
            name="title"
            rules={[
              {
                required: true,
                message: "Please input your title!",
              },
            ]}
          >
            <Select disabled={loading}>
              <Select.Option value="Mr.">Mr.</Select.Option>
              <Select.Option value="Mrs.">Mrs.</Select.Option>
              <Select.Option value="Ms.">Ms.</Select.Option>
            </Select>
          </Form.Item>
        </Col>

        <Col span={24} lg={10}>
          <Form.Item
            label="First name"
            name="firstName"
            rules={[
              {
                required: true,
                message: "Please input your first name!",
              },
            ]}
          >
            <Input disabled={loading} />
          </Form.Item>
        </Col>

        <Col span={24} lg={10}>
          <Form.Item
            label="Last name"
            name="lastName"
            rules={[
              { required: true, message: "Please input your last name!" },
            ]}
          >
            <Input disabled={loading} />
          </Form.Item>
        </Col>

        <Col span={24} lg={6}>
          <Form.Item
            label="Birthday"
            name="birthday"
            rules={[{ required: true, message: "Please input your birthday!" }]}
          >
            <DatePicker
              placeholder="MM/DD/YYYY"
              format="MM/DD/YYYY"
              disabledDate={(current) => {
                return current && current > moment().endOf("day");
              }}
              style={{ width: "100%" }}
              disabled={loading}
              // defaultValue={
              //   defaultValue ? moment(defaultValue?.birthday) : undefined
              // }
            />
          </Form.Item>
        </Col>

        <Col span={24} lg={18}>
          <Form.Item
            label="Nationality"
            name="nationality"
            rules={[
              {
                required: true,
                message: "Please input your nationality!",
              },
            ]}
          >
            <Select
              showSearch
              placeholder="-- Please Select --"
              disabled={loading}
            >
              {nationalityOptions?.map((option) => (
                <Select.Option key={option.value} value={option.label}>
                  {option.label}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Col>

        <Col span={24} lg={24}>
          <Form.Item
            label="Citizen ID"
            name="citizenId"
            rules={[
              {
                required: true,
                message: "Please input your citizen ID!",
              },
              {
                validator: inputIDValidator,
                message: "Incorrect citizen ID!",
              },
            ]}
          >
            <NumberFormat
              customInput={Input}
              format="# #### ##### ## #"
              disabled={loading}
            />
          </Form.Item>
        </Col>

        <Col span={24} lg={24}>
          <Form.Item
            label="Gender"
            name="gender"
            rules={[{ required: true, message: "Please input your gender!" }]}
          >
            <Radio.Group disabled={loading}>
              <Radio value="Male">Male</Radio>
              <Radio value="Female">Female</Radio>
              <Radio value="Unisex">Unisex</Radio>
            </Radio.Group>
          </Form.Item>
        </Col>

        <Col span={24} lg={24}>
          <Form.Item
            label="Mobile phone"
            name="mobilePhone"
            rules={[
              {
                required: true,
                validator: inputPhoneValidator,
                message: "Please input your mobile phone!",
              },
            ]}
          >
            <CountryPhoneInput
              maxLength={10}
              size="small"
              onInput={({ target }: any) => {
                target.value = target.value
                  .replace(/[^0-9.]/g, "")
                  .replace(/(\..*?)\..*/g, "$1");
              }}
              disabled={loading}
            />
          </Form.Item>
        </Col>

        <Col span={24} lg={24}>
          <Form.Item label="Passport No." name="passportNo">
            <Input disabled={loading} />
          </Form.Item>
        </Col>

        <Col span={24} md={20}>
          <Form.Item
            label="Expected Salary"
            name="expectedSalary"
            rules={[
              {
                required: true,
                message: "Please input your expected salary!",
              },
              {
                min: 0,
                max: Infinity,
                validator: inputNumberValidator,
                message: "Your expected salary must be more than 0!",
              },
            ]}
          >
            <NumberFormat
              customInput={Input}
              thousandSeparator
              suffix=" THB"
              disabled={loading}
            />
          </Form.Item>
        </Col>

        <Col span={24} md={4} style={{ textAlign: "right" }}>
          <Button loading={loading} type="primary" htmlType="submit">
            {defaultValue ? "Update" : "Submit"}
          </Button>
        </Col>
      </Row>
    </Form>
  );
};

export default memo(RegisterForm);
