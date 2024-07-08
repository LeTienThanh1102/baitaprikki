import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import { useState } from "react";
import "./Side.scss";
import {
  BsDiamondFill,
  BsBagCheckFill,
  BsBarChart,
  BsBookmarkHeartFill,
  BsCalendarWeekFill,
  BsDropbox,
  BsEnvelopeArrowDown,
  BsBrightnessHigh,
} from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
function SiderBar() {
  const navigate = useNavigate();
  return (
    <div className="side-main">
      <Sidebar>
        <div
          style={{ display: "flex", flexDirection: "column", height: "100vh"}}
        >
          <div
            className="sidebar-header"
            onClick={() => {
              navigate("/");
            }}
          >
            <p className="sidebar-text">Quản lí: </p>
          </div>

          <div style={{ flex: 1, marginBottom: "32px"}}>
            <Menu>
              <SubMenu
                label="Features"
                icon={<BsBagCheckFill />}
                component={<Link to="/admin" />}
              >
                <MenuItem component={<Link to="/admin/manager" />}>
                  {" "}
                  Quản lí User
                </MenuItem>
                <MenuItem component={<Link to="/admin/manager-quizzer" />}>
                  {" "}
                  Quản lí bài Quick
                </MenuItem>
                <MenuItem component={<Link to="/admin/manager-questions" />}>
                  {" "}
                  Quản lí câu hỏi
                </MenuItem>
              </SubMenu>
              <SubMenu label="Maps" icon={<BsBarChart />}>
                <MenuItem> Google maps</MenuItem>
                <MenuItem> Open street maps</MenuItem>
              </SubMenu>
              <SubMenu label="Theme" icon={<BsBookmarkHeartFill />}>
                <MenuItem> Dark</MenuItem>
                <MenuItem> Light</MenuItem>
              </SubMenu>
              <SubMenu label="E-commerce" icon={<BsCalendarWeekFill />}>
                <MenuItem> Product</MenuItem>
                <MenuItem> Orders</MenuItem>
                <MenuItem> Credit card</MenuItem>
              </SubMenu>
            </Menu>
            <Menu className="side-ecomm">
              <MenuItem icon={<BsDropbox />}>Calendar</MenuItem>
              <MenuItem icon={<BsEnvelopeArrowDown />}>Documentation</MenuItem>
              <MenuItem icon={<BsBrightnessHigh />}>Examples</MenuItem>
            </Menu>
          </div>
        </div>
      </Sidebar>
    </div>
  );
}

export default SiderBar;
