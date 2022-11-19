import "./App.css";
import {
  Datepicker,
  setOptions,
} from "@mobiscroll/react"; /* or import any other component */
import "@mobiscroll/react/dist/css/mobiscroll.min.css";
import { useState, useRef } from "react";
setOptions({
  theme: "ios",
  themeVariant: "light",
});

function App() {
  const [users, setUsers] = useState(["Martin", "Victor", "Mom"]);
  const [currentUser, setCurrentUser] = useState("Martin");
  const [maxHours, setMaxHours] = useState(92);
  const [userHours, setUserHours] = useState(0);
  let bool = false;
  const [martinHours, setMartinHours] = useState(0);
  const [victorHours, setVictorHours] = useState(0);
  const [momHours, setMomHours] = useState(0);
  const [percentAccurate, setPercentAccurate] = useState(false);
  let colors = {
    Martin: "#EB340D",
    Victor: "#09E0E7",
    Mom: "#E7D609",
  };
  const input1 = useRef();
  const input2 = useRef();
  const input3 = useRef();
  const dateRef = useRef();
  let optionItems = users.map((item) => <option key={item}>{item}</option>);

  const calculateHoursByPercentage = (num1, num2, num3) => {
    console.log(typeof num1);
    num1 = num1.replace(/[^a-zA-Z0-9 ]/g, "");
    num2 = num2.replace(/[^a-zA-Z0-9 ]/g, "");
    num3 = num3.replace(/[^a-zA-Z0-9 ]/g, "");
    let total = parseInt(num1) + parseInt(num2) + parseInt(num3);
    console.log(total);
    let percent1 = Math.floor(Number(((num1 / 100) * maxHours).toFixed(1)));
    let percent2 = Math.floor(Number(((num2 / 100) * maxHours).toFixed(1)));
    let percent3 = Math.floor(Number(((num3 / 100) * maxHours).toFixed(1)));

    if (total === 100) {
      setPercentAccurate(true);
      setMartinHours(percent1);
      setVictorHours(percent2);
      setMomHours(percent3);
    } else {
      console.log("there was an error");
    }
  };

  const handleChange = (e) => {
    setCurrentUser(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(dateRef);
    console.log(currentUser, userHours);
    if (maxHours - userHours > 0) {
      bool = false;

      switch (currentUser) {
        case "Martin":
          console.log("Martin is user");
          if (martinHours - userHours >= 0) {
            setMartinHours((hours) => hours - userHours);
            setMaxHours((maxHours) => Number(maxHours - userHours));
          }
          break;
        case "Victor":
          console.log("Victor is user");
          if (victorHours - userHours >= 0) {
            setVictorHours((hours) => hours - userHours);
            setMaxHours((maxHours) => Number(maxHours - userHours));
          }
          break;
        case "Mom":
          console.log("Mom is user");
          if (momHours - userHours >= 0) {
            setMomHours((hours) => hours - userHours);
            setMaxHours((maxHours) => Number(maxHours - userHours));
          }
          break;
        default:
      }
    } else {
      bool = true;
      console.log("cannot subtract more");
    }
  };
  const handleHours = (e) => {
    console.log(e.target.value);
    setUserHours(e.target.value);
  };
  return (
    <>
      <div className="App" style={{ background: colors[currentUser] }}>
        <h2>Selected user : {currentUser}</h2>
        <h2 className="hours">Total Hours Available : {maxHours}</h2>
        {bool ? <h2 className="errormessage">Max hours reached!!</h2> : ""}
        <select onChange={handleChange} value={currentUser} className="select">
          {optionItems}
        </select>
      </div>
      <div className="container">
        <div className="percentdiv">
          <h3>Input percentages (Make sure it totals 100%)</h3>

          <input ref={input1} placeholder="Martin's %" />
          <input ref={input2} placeholder="Victors's %" />
          <input ref={input3} placeholder="Mom's %" />
          <button
            onClick={() =>
              calculateHoursByPercentage(
                input1.current?.value,
                input2.current?.value,
                input3.current?.value
              )
            }
          >
            Get Hours
          </button>
        </div>
        {percentAccurate ? (
          <div className="eachpersonshours">
            <h3 style={{ background: colors["Martin"] }}>
              Martin's Hours: {martinHours}
            </h3>
            <h3 style={{ background: colors["Victor"] }}>
              Victors's Hours: {victorHours}
            </h3>
            <h3 style={{ background: colors["Mom"] }}>
              Moms's Hours: {momHours}
            </h3>
          </div>
        ) : (
          <div className="eachpersonshours">
            <h3> Please enter accurate percentages</h3>
          </div>
        )}
      </div>
      <Datepicker
        ref={dateRef}
        controls={["calendar"]}
        touchUi={true}
        display="inline"
        select="range"
        colors={colors[currentUser]}
      />

      <form>
        <h2>Input hours</h2>
        <input
          onChange={handleHours}
          className="hoursinput"
          placeholder={userHours}
        />
        <button className="submitbtn" onClick={handleSubmit}>
          Submit
        </button>
      </form>
    </>
  );
}

export default App;
