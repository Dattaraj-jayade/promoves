import React from "react";
import { Tabs } from "antd";
import { UseSelector, useDispatch } from "react-redux";
import PageTitle from "../../components/PageTitle";
import TheatresList from "./TheatresList";
import Bookings from "./Bookings";
function Profile() {
  return (
    <div>
      <PageTitle title="profile" />

      <Tabs defaultActiveKey="1">
        <Tabs.TabPane tab="Booking" key="1" style={{ color: "white" }}>
          <Bookings />
        </Tabs.TabPane>
        <Tabs.TabPane tab="Theatres" key="2" style={{ color: "white" }}>
          <TheatresList />
        </Tabs.TabPane>
      </Tabs>
    </div>
  );
}

export default Profile;
