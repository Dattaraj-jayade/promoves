import React from "react";
import { Col, Form, Modal, Row, message } from "antd";
import Button from "../../components/Button";
import { useDispatch } from "react-redux";
import { HideLoading, ShowLoading } from "../../redux/loadersSlice";
import { AddMovie, UpdateMovie } from "../../apicalls/movies";
import moment from "moment";
function MovieForm({
  showMovieFromModal,
  setShowMovieFormModal,
  setSelectedMovies,
  selectedMovie,
  getData,
  fromType,
}) {
  if (selectedMovie) {
    selectedMovie.releaseDate = moment(selectedMovie.releaseDate).format(
      "YYYY-MM-DD"
    );
  }
  const dispatch = useDispatch();
  const onFinish = async (values) => {
    try {
      dispatch(ShowLoading());
      let response = null;
      if (fromType === "add") {
        response = await AddMovie(values);
      } else {
        response = await UpdateMovie({
          ...values,
          movieId: selectedMovie._id,
        });
      }

      if (response.success) {
        getData();
        message.success(response.message);
        setShowMovieFormModal(false);
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
      open={showMovieFromModal}
      onCancel={() => {
        setShowMovieFormModal(false);
        setSelectedMovies(null);
      }}
      footer={null}
      width={800}
    >
      <Form layout="vertical" onFinish={onFinish} initialValues={selectedMovie}>
        <Row gutter={16}>
          <Col span={24}>
            <Form.Item
              label="Movie Name"
              name="title"
              rules={[{ required: true, message: "please Enter movie name!" }]}
            >
              <input type="text" />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              label="Movie Description"
              name="description"
              rules={[
                { required: true, message: "please Enter movie Description!" },
              ]}
            >
              <textarea type="text" />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              label="Movie Duration(Min)"
              name="duration"
              rules={[
                { required: true, message: "please Enter movie Duration!" },
              ]}
            >
              <input type="text" />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item label="Language" name="language">
              <select name="" id="">
                <option value="">Select Language</option>
                <option value="Marathi">Marathi Language</option>
                <option value="Hindi">Hindi Language</option>
                <option value="English">English Language</option>
              </select>
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              label="Movie Release date"
              name="releaseDate"
              rules={[
                { required: true, message: "please Enter movie Release date!" },
              ]}
            >
              <input type="date" />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item label="Genre" name="genre">
              <select name="" id="">
                <option value="">Select Genre</option>
                <option value="Action">Action</option>
                <option value="Comedy">Comedy</option>
                <option value="Romance">Romance</option>
              </select>
            </Form.Item>
          </Col>
          <Col span={16}>
            <Form.Item
              label="Poster URL"
              name="poster"
              rules={[
                { required: true, message: "please Enter movie Poster URL!" },
              ]}
            >
              <input type="text" />
            </Form.Item>
          </Col>
        </Row>
        <div className="flex justify-end gap-2">
          <Button
            title="Cancel"
            variant="outlined"
            type="button"
            onClick={() => {
              setShowMovieFormModal(false);
              setSelectedMovies(null);
            }}
          />
          <Button title="Save" type="submit" />
        </div>
      </Form>
    </Modal>
  );
}

export default MovieForm;
