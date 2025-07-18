import React from "react";
import "./ApplicationProgressOverview.css";

export function ApplicationProgressOverview(props) {
  const { value, setValue } = React.useContext(props.context);
  const stats = [
    {
      icon: "./images/file.png  ",
      label: "Jobs Applied",
      value: "20",
    },
    {
      icon: "./images/users-2.png",
      label: "Jobs Interviewing",
      value: "20",
    },
    {
      icon: "./images/file-check.png",
      label: "Jobs Selected",
      value: "56",
    },
    {
      icon: "./images/file-x.png",
      label: "Rejected",
      value: "512",
    },
  ];

  const styles = [
    { background: "linear-gradient(90deg, #2563EB -500%, #fff 50%)" },
    { background: "linear-gradient(90deg, #FFD900 -500%, #fff 50%)" },
    { background: "linear-gradient(90deg, #00FF04 -500%, #fff 50%)" },
    { background: "linear-gradient(90deg, #FF0000 -500%, #fff 50%)" },
  ];
  const stat = ["stat-card", "stat-card", "stat-card", "stat-card"];
  const [styleName, setStyleName] = React.useState(stat);
  function countUpdate(label, index) {
    if (label === "Jobs Interviewing") {
      setValue("Interviewing");
      let newstyle = styleName;

      if (styleName[index] === "stat-card-I") {
        newstyle[index] = "stat-card";
        setValue("All");
      } else {
        newstyle = stat;
        newstyle[index] = "stat-card-I";
      }
      setStyleName(newstyle);
    } else if (label === "Jobs Selected") {
      setValue("Selected");
      let newstyle = styleName;
      if (styleName[index] === "stat-card-S") {
        setValue("All");
        newstyle[index] = "stat-card";
      } else {
        newstyle = stat;
        newstyle[index] = "stat-card-S";
      }
      setStyleName(newstyle);
    } else if (label === "Jobs Applied") {
      setValue("Applied");

      let newstyle = styleName;
      if (styleName[index] === "stat-card-A") {
        setValue("All");
        newstyle[index] = "stat-card";
      } else {
        newstyle = stat;
        newstyle[index] = "stat-card-A";
      }
      setStyleName(newstyle);
    } else if (label === "Rejected") {
      setValue("Rejected");
      let newstyle = styleName;
      if (styleName[index] === "stat-card-R") {
        setValue("All");
        newstyle[index] = "stat-card";
      } else {
        newstyle = stat;
        newstyle[index] = "stat-card-R";
      }
      setStyleName(newstyle);
    }
  }

  return (
    <div className="application-progress">
      {stats.map((stat, index) => (
        <div
          onClick={countUpdate.bind(this, stat.label, index)}
          style={styles[index]}
          key={index}
          className={styleName[index]}
        >
          <div className="stat-content">
            <div className="stat-header">
              <div className="icon-wrapper">
                <img src={stat.icon} alt="" className="stat-icon" />
              </div>
            </div>
            <span className="stat-label">{stat.label}</span>
          </div>
          <div className="valueDiv">
            <span className="stat-value">{stat.value}</span>
          </div>
        </div>
      ))}
    </div>
  );
}
