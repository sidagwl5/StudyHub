import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import LinearProgress from "@material-ui/core/LinearProgress";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import { red, green, orange } from "@material-ui/core/colors";

const useStyles = (props) =>
  makeStyles(() => ({
    root: {
      position: "relative",
      width: "100%",
    },
    barColorPrimary: {
      backgroundColor: props.color,
    },
  }));

function LinearProgressWithLabel(props) {
  const mapper = {
    Pending: orange[500],
    Approved: green[300],
    Rejected: red[500],
  };
  const classes = useStyles({ color: mapper[props.title] })();
  return (
    <Box display="flex" alignItems="center">
      <Box minWidth={35}>
        <Typography
          style={{ color: "white" }}
          variant="body2"
          color="textSecondary"
        >
          {props.title}
        </Typography>
      </Box>
      <Box width="100%" mr={1}>
        <LinearProgress
          variant="determinate"
          value={props.progress}
          title={`${props.value}/${props.total}`}
          classes={{ barColorPrimary: classes.barColorPrimary }}
        />
      </Box>
      <Box minWidth={35}>
        <Typography
          style={{ color: "white" }}
          variant="body2"
          color="textSecondary"
        >{`${Math.round(props.progress)}%`}</Typography>
      </Box>
    </Box>
  );
}

LinearProgressWithLabel.propTypes = {
  value: PropTypes.number.isRequired,
};

export default function LinearWithValueLabel({ title, value, total }) {
  const [progress, setProgress] = React.useState(10);
  React.useEffect(() => {
    setProgress(total ? (value / total) * 100 : 0);
  }, [value]);

  return (
    <div style={{ width: "100%" }}>
      <LinearProgressWithLabel
        total={total}
        title={title}
        value={value}
        progress={progress}
      />
    </div>
  );
}
