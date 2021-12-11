// @ts-nocheck
import { useEffect, useState, useRef } from "react";
import "./App.css";
import Counter from "./Counter.tsx";

function App(props) {
  const [count, setCount] = useState(9999);
  const [mostSignificant, setMostSignificant] = useState(
    window.location.search.substr(1).includes("mostSignificant")
  );

  const [thin, setThin] = useState(false);
  const inc = useRef(0);

  const randomCount = async () => {
    const ee = await fetch(
      "https://zambrero.xchangefusion.com/api/product/getdonationbyid/2"
    );

    const e = await ee.json();
    if (window.location.search.substr(1).includes("debug")) {
      e.TotalItemCount = 99999997 + inc.current;
    }
    inc.current += 1;
    if (e.TotalItemCount.toString().length === 8) {
      setThin(false);
      if (mostSignificant) {
        setCount(e.TotalItemCount.toString().slice(0, 4));
      } else {
        setCount(e.TotalItemCount.toString().slice(4));
      }
    } else if (e.TotalItemCount.toString().length === 9) {
      setThin(true);
      if (mostSignificant) {
        setCount(e.TotalItemCount.toString().slice(0, 4));
      } else {
        setCount(e.TotalItemCount.toString().slice(4));
      }
    } else if (e.TotalItemCount.toString().length === 10) {
      setThin(true);
      if (mostSignificant) {
        setCount(e.TotalItemCount.toString().slice(0, 5));
      } else {
        setCount(e.TotalItemCount.toString().slice(5));
      }
    } else {
      setThin(false);
      setCount("9999");
    }
  };

  useEffect(() => {
    const nowMillis = new Date().getMilliseconds();
    setTimeout(() => {
      setInterval(() => {
        randomCount();
      }, 2000);
    }, 1000 - nowMillis);
  }, []);

  return (
    <div className="body">
      <Counter count={count} thinner={thin} />
    </div>
  );
}

export default App;
