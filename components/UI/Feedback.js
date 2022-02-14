import classes from "./Feedback.module.css";

const Feedback = props => {
  let statusClass = "";
  if (props.feedback === "success") {
    statusClass = classes.success;
  }
  if (props.feedback === "fail") {
    statusClass = classes.fail;
  }
  const myClass = `${classes.feedback} ${statusClass}`;

  return (
    <div className={myClass}>
      <h3>{props.title}</h3>
      <p className={classes.feed}>{props.msg}</p>
    </div>
  );
};

export default Feedback;
