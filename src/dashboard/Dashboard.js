import React from "react";
import { connect } from "react-redux";
import { toggleLocked, toggleClosed } from "../store/actions/index";

import Display from "../display/Display";
import Controls from "../controls/Controls";

const Dashboard = props => {
  return (
    <>
      <Display locked={props.locked} closed={props.closed} />
      <Controls
        locked={props.locked}
        closed={props.closed}
        toggleLocked={props.toggleLocked}
        toggleClosed={props.toggleClosed}
      />
    </>
  );
};

const mapStateToProps = state => ({
  locked: state.reducer.locked,
  closed: state.reducer.closed
});

const mapActionsToProps = {
  toggleLocked,
  toggleClosed
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(Dashboard);
