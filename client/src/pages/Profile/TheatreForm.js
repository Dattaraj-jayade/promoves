import { Form, Modal, message } from "antd";
import React from "react";
import Button from "../../components/Button";
import { useDispatch, useSelector } from "react-redux";
import { HideLoading, ShowLoading } from "../../redux/loadersSlice";
import { AddTheatre, UpdateTheatre } from "../../apicalls/theatres";

function TheatreForm({
  showTheatreFormModal,
  setShowTheatreFormModal,
  fromType,
  setFormType,
  selectedTheatre,
  setSelectedTheatre,
  getData,
}) {
  const { user } = useSelector((state) => state.users);
  const dispatch = useDispatch();
  const onFinish = async (values) => {
    values.owner = user._id;
    try {
      dispatch(ShowLoading());
      let response = null;
      if (fromType === "add") {
        response = await AddTheatre(values);
      } else {
        values.theatreId = selectedTheatre._id;
        response = await UpdateTheatre(values);
      }

      if (response.success) {
        message.success(response.message);
        setShowTheatreFormModal(false);
        setSelectedTheatre(null);
        getData();
      } else {
        message.error(response.message);
      }
      dispatch(HideLoading());
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  };
  return (
    <Modal
      title={fromType === "add" ? "Add Movie" : "Edit Movie"}
      open={showTheatreFormModal}
      onCancel={() => {
        setShowTheatreFormModal(false);
        setSelectedTheatre(null);
      }}
      footer={null}
      width={800}
    >
      <Form
        layout="vertical"
        onFinish={onFinish}
        initialValues={selectedTheatre}
      >
        <Form.Item
          label="Name"
          name="name"
          rules={[{ required: true, message: "please Enter Theatre name!" }]}
        >
          <input type="text" />
        </Form.Item>
        <Form.Item
          label="Address"
          name="address"
          rules={[{ required: true, message: "please Enter Address!" }]}
        >
          <textarea type="text" />
        </Form.Item>
        <div className="flex gap-1">
          <Form.Item
            label="Phone Number"
            name="phone"
            rules={[{ required: true, message: "please Enter Phone Number!" }]}
          >
            <input type="text" />
          </Form.Item>
          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: "please Enter Email!" }]}
          >
            <input type="text" />
          </Form.Item>
        </div>
        <div className="flex justify-end gap-2">
          <Button
            title="Cancel"
            variant="outlined"
            type="button"
            onClick={() => {
              setShowTheatreFormModal(false);
              setSelectedTheatre(null);
            }}
          />
          <Button title="Save" type="submit" />
        </div>
      </Form>
    </Modal>
  );
}

export default TheatreForm;
