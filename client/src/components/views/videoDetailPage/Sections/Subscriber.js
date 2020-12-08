import React from "react";
import { useEffect, useState } from "react";
import Axios from "axios";

function Subscriber(props) {
  const userTo = props.userTo;
  const userFrom = props.userFrom;

  const [subscribeNumber, setSubscribeNumber] = useState(0);
  const [subscribed, setSubscribed] = useState(false);

  useEffect(() => {
    let variable = {
      userTo: userTo,
      userFrom: userFrom,
    };

    Axios.post("/api/subscribe/subscribeNumber", variable).then((response) => {
      if (response.data.success) {
        setSubscribeNumber(response.data.subscribeNumber);
      } else {
        console.log("Failed :: get Subscribe Number.");
      }
    });

    Axios.post("/api/subscribe/subscribed", variable).then((response) => {
      if (response.data.success) {
        setSubscribed(response.data.isSubscribed);
      } else {
        console.log("Failed :: get Subscribed Info");
      }
    });
  }, []);

  return (
    <div>
      <button
        style={{
          backgroundColor: `${subscribed ? "#AAAAAA" : "#CC0000"}`,
          borderRadius: "4px",
          color: "white",
          padding: "10px 16px",
          fontWeight: "500",
          fontSize: "1rem",
          textTransform: "uppercase",
        }}
      >
        {subscribeNumber} {subscribed ? `subscribed` : `subscribe`}
      </button>
    </div>
  );
}

export default Subscriber;
