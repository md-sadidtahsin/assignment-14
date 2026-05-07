import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  vus: 50,          // virtual users (you can bump to 100)
  duration: '30s',  // test duration
};

export default function () {
  const res = http.get('http://localhost:3000/users');

  check(res, {
    'status is 200': (r) => r.status === 200,
    'response time < 500ms': (r) => r.timings.duration < 500,
  });

  sleep(1);
}
