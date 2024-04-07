import { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../../server/firebase";

import AccountCircleIcon from "@mui/icons-material/AccountCircle";

// const cals = [
//   { id: 1, name: "chokolokobangoshe" },
//   { id: 2, name: "na wetin dey haffen" },
//   { id: 3, name: "Senibo Dagogo Jack" },
//   { id: 4, name: "honourable nkagbara" },
// ];

function User() {
  const [user, loading, error] = useAuthState(auth);
  const [calendars, setCalendars] = useState([]);
  return (
    <div className="user-dashboard">
      <AccountCircleIcon
        color="disabled"
        style={{ width: "100px", height: "100px" }}
      />
      <p>{user.email}</p>
      {calendars.length > 0 ? (
        <div>
          <h2 style={{ textAlign: "center" }}>Your calendars</h2>
          <ul style={{ padding: "none", listStyle: "none" }}>
            {calendars.map((calendar) => (
              <li key={calendar.id} style={{ marginTop: "10px" }}>
                {calendar.name}
                <a href="" style={{ marginLeft: "25px" }}>
                  <button>View</button>
                </a>
                <a href="" style={{ marginLeft: "25px" }}>
                  <button>Editor</button>
                </a>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p>You have no calendars</p>
      )}
      <a href="">Create new calendar</a>
    </div>
  );
}

export default User;
