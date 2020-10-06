import { Box, Collapse, Fade, Paper } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import Footer from "../Footer";

import LandPanel from "./LandPanel";
import LandSub from "./LandSub";
import Showcase from "./Showcase";
import SignView from "./SignView/SignView";

const VS_LANDING = 1;
const VS_SIGNIN = 2;
const VS_SIGNUP = 3;

export default function Landing(props) {
  const [viewState, setViewState] = useState(VS_LANDING);

  const [animationActive, setAnimationActive] = useState(false);
  const animTime = 1000;

  const [landPanel, setLandPanel] = useState(true);
  const setPanel = (open) => {
    setAnimationActive(true);
    setLandPanel(open);
    setTimeout(() => {
      setAnimationActive(false);
    }, animTime * 0.5);
  };

  // function handleScroll() {}
  // useEffect(() => {
  //   window.addEventListener("scroll", handleScroll);
  //   return () => window.removeEventListener("scroll", handleScroll);
  // }, []);

  return (
    <Paper style={{ borderRadius: 0 }} elevation={0}>
      <Collapse in={landPanel} collapsedHeight={100} timeout={animTime * 0.7}>
        <LandPanel
          animTime={animTime}
          fadeIn={landPanel}
          resetLanding={() => {
            setPanel(true);
            setViewState(VS_LANDING);
          }}
          signUp={() => {
            setViewState(VS_SIGNUP);
            setPanel(false);
          }}
          signIn={() => {
            setViewState(VS_SIGNIN);
            setPanel(false);
            props.signIn();
          }}
          discover={() => setPanel(false)}
        />
      </Collapse>
      <Collapse
        in={viewState === VS_LANDING && landPanel}
        timeout={animTime * 0.3}
      >
        <LandSub
          animTime={animTime}
          fadeIn={viewState === VS_LANDING && landPanel}
          nextStep={() => setPanel(false)}
        />
      </Collapse>
      <Collapse in={!landPanel} timeout={100}>
        <Fade in={!landPanel && !animationActive} timeout={animTime * 1.4}>
          <Box>
            {viewState === VS_LANDING && <Showcase />}
            {(viewState === VS_SIGNIN || viewState === VS_SIGNUP) && (
              <SignView
                viewState={viewState}
                setViewState={(VS) => setViewState(VS)}
                signIn={(creds) => props.signIn(creds)}
              />
            )}
          </Box>
        </Fade>
      </Collapse>
      <Footer
        home={() => {
          setViewState(VS_LANDING);
          setPanel(true);
        }}
        signUp={() => {
          setViewState(VS_SIGNUP);
          setPanel(false);
        }}
      />
    </Paper>
  );
}
