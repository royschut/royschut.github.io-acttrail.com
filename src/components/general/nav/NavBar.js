import React from "react";
import { Avatar, Box, Typography } from "@material-ui/core";
import { useSelector } from "react-redux";

import NavButton from "./NavButton";
import { PAGES as P } from "../../../data/Constants";
import { selectUser } from "../../../redux/userSlice";

const mainNavData1 = [
  { label: "Dashboard", iconClass: "fas fa-tachometer-alt", p: P.DASHBOARD },
  { label: "Artists", iconClass: "fas fa-headphones", p: P.ARTIST },

  { label: "Events", iconClass: "fas fa-calendar-check", p: P.EVENT },
  { label: "Checklists", iconClass: "fas fa-tasks", p: P.CHECKLIST },
  { label: "Travel", iconClass: "fas fa-plane-departure", p: P.TRAVEL },
  { label: "Papers", iconClass: "fas fa-file-contract", p: P.PAPERS },
  { label: "Media", iconClass: "fas fa-photo-video", p: P.MEDIA },
];
const mainNavData = [
  { label: "Artists", iconClass: "fas fa-headphones", p: P.ARTIST },

  { label: "Events", iconClass: "fas fa-calendar-check", p: P.EVENT },
];
const settingsButton = {
  label: "Settings",
  iconClass: "fas fa-cog",
  p: P.SETTINGS,
};

export default function NavBar(props) {
  const userVO = useSelector(selectUser);

  return (
    <Box component="header" className="navBar">
      <Box className="avatar">
        <Avatar
          src="./img/0.jpg"
          alt="Profile"
          onClick={() => props.setCurPage(P.PROFILE)}
          style={{ cursor: "pointer" }}
        />
        <Typography variant="body2" gutterBottom style={{ paddingTop: 15 }}>
          {props.userVO.firstname}
        </Typography>
        {/* <Typography variant="subtitle2" gutterBottom>
          {props.userVO.team.name}
        </Typography> */}
      </Box>
      <nav>
        {mainNavData.map((m) => (
          <NavButton
            key={m.p}
            label={m.label}
            iconClass={m.iconClass}
            selected={m.p === props.curPage}
            onClick={(e) => props.setCurPage(m.p)}
          />
        ))}
      </nav>
      <NavButton
        label={settingsButton.label}
        iconClass={settingsButton.iconClass}
        selected={settingsButton.p === props.curPage}
        onClick={(e) => props.setCurPage(settingsButton.p)}
      />
    </Box>
  );
}
