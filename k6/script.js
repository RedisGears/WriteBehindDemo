import http from "k6/http";
import { check } from "k6";
let opt;

// TODO: Replace this with something more dynamic using env vars
if (__ENV.scenario == "dynamic") {
  opt = {
    vus: 1,
    stages: [
      { duration: "10s", target: 1 },
      { duration: "5s", target: 4 },
      { duration: "10s", target: 4 },
      { duration: "5s", target: 16 },
      { duration: "10s", target: 16 },
      { duration: "5s", target: 32 },
      { duration: "10s", target: 32 },
      { duration: "5s", target: 48 },
      { duration: "20s", target: 48 },
      { duration: "5s", target: 32 },
      { duration: "10s", target: 32 },
      { duration: "5s", target: 16 },
      { duration: "10s", target: 16 },
      { duration: "5s", target: 4 },
      { duration: "10s", target: 4 },
      { duration: "5s", target: 1 },
      { duration: "10s", target: 1 },
    ]
  };
} else {
  opt = {
    vus: 1,
    stages: [
      { duration: "10s", target: 1 },
      { duration: "5s", target: 2 },
      { duration: "10s", target: 2 },
      { duration: "5s", target: 4 },
      { duration: "10s", target: 4 },
      { duration: "5s", target: 8 },
      { duration: "10s", target: 8 },
      { duration: "5s", target: 12 },
      { duration: "10s", target: 12 },
      { duration: "5s", target: 16 },
      { duration: "10s", target: 16 },
      { duration: "5s", target: 24 },
      { duration: "10s", target: 24 },
      { duration: "5s", target: 32 },
      { duration: "10s", target: 32 },
      { duration: "5s", target: 48 },
      { duration: "10s", target: 48 },
    ]
  };
}
export let options = opt;

function post() {
  let target = __ENV.target || "null";
  let res = http.post(`http://app:8080/${target}`, {
    id: Math.floor(Math.random() * 1000000),
    temp: 36.7 + Math.random() * 5,
  });
  check(res, {
    "status is 200": (res) => res.status === 200,
  });
}

export default post;
