import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  stages: [
    { duration: '10s', target: 100 }, // Ramp up to 100 VUs
    { duration: '40s', target: 100 }, // Hold 100 VUs for 40s
    { duration: '10s', target: 0 },   # Ramp down
  ],
  thresholds: {
    http_req_failed: ['rate<0.01'],   // Error rate must be less than 1%
    http_req_duration: ['p(95)<2000'], // 95% of requests must complete below 2000ms
  },
};

const BASE_URL = __ENV.BASE_URL || 'https://muralimanokardk.github.io/RPAI';

export default function () {
  // 1. Target Home Page
  const resHome = http.get(`${BASE_URL}/`);
  check(resHome, {
    'home status is 200': (r) => r.status === 200,
  });

  // 2. Target Login Page
  const resLogin = http.get(`${BASE_URL}/login`);
  check(resLogin, {
    'login status is 200': (r) => r.status === 200,
  });

  // 3. Target Signup Page
  const resSignup = http.get(`${BASE_URL}/signup`);
  check(resSignup, {
    'signup status is 200': (r) => r.status === 200,
  });

  sleep(1);
}
