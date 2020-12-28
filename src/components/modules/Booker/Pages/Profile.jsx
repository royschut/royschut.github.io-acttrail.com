import {
  Box,
  Grid,
  Icon,
  Typography,
} from "@material-ui/core";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import getFormData from "../../../../data/FormData";
import { requestNewBooker } from "../../../../redux/booker/dialogSlice";
import {
  isTeamDetailsLoaded,
  loadTeamDetails,
  selectBookers,
  selectUser,
  updateUser,
} from "../../../../redux/userSlice";
import CoolCard from "../../../general/CoolCard/CoolCard";
import ExpandPanel from "../../../general/CoolCard/ExpandPanel";
import IconBtn from "../../../general/nav/IconBtn";

export default function Profile(props) {
  const dispatch = useDispatch();

  const userVO = useSelector(selectUser);
  const teamsLoaded = useSelector(isTeamDetailsLoaded);
  const bookers = useSelector(selectBookers);

  const teamTitle = bookers.length > 0 ? bookers[0].name : "";

  const onUpdateUser = (obj) => dispatch(updateUser({ ...obj, id: userVO.id }));
  const addBooker = () =>
    dispatch(requestNewBooker({ team_id: userVO.team_id }));

  useEffect(() => {
    if (!teamsLoaded) dispatch(loadTeamDetails(userVO.id));
  }, [dispatch, teamsLoaded, userVO.id]);

  return (
    <Box m={5}>
      <Grid container spacing={5}>
        <Grid item md={5} xs={12}>
          <CoolCard
            title={userVO.firstname}
            featured
            headerIcon={"fas fa-user"}
            formData={getFormData({
              type: "user",
              obj: userVO,
              props: ["firstname", "lastname", "email"],
            })}
            onChange={(obj) => onUpdateUser(obj)}
          />
        </Grid>
        <Grid item md={7} xs={12}>
          <ExpandPanel
            title={teamTitle}
            headerIcon={"fas fa-users"}
            hasBackground
            controls={[
              <IconBtn
                label="Add booker"
                iconClass="fas fa-plus-square"
                size="small"
                onClick={(e) => addBooker()}
              />,
            ]}
          >
            {bookers.length > 0 && (
              <>
                <Typography variant="h6">Bookers:</Typography>
                {bookers.map((u) => (
                  <Typography style={{ margin: 20 }}>
                    <Icon className={"fas fa-user-tie"} fontSize="small" />
                    {`${u.firstname} ${u.lastname}`}
                  </Typography>
                ))}
              </>
            )}
          </ExpandPanel>
        </Grid>
      </Grid>
      {/* <Button onClick={(e) => dispatch(logout())}>Log out</Button> */}

      {/* <Button onClick={(e) => console.log(team, teamsLoaded)}>Show TEAM</Button> */}
    </Box>
  );
}
