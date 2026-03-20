import assert from 'assert';
import http from 'http';
import app from '../src/server.js';

const PORT = 3001;
const BASE_URL = `http://localhost:${PORT}`;

// Helper to make HTTP requests
function makeRequest(method, path, body = null) {
  return new Promise((resolve, reject) => {
    const url = new URL(BASE_URL + path);
    const options = {
      hostname: url.hostname,
      port: url.port,
      path: url.pathname,
      method,
      headers: {
        'Content-Type': 'application/json'
      }
    };

    const req = http.request(options, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const parsed = data ? JSON.parse(data) : null;
          resolve({
            status: res.statusCode,
            body: parsed
          });
        } catch (e) {
          resolve({
            status: res.statusCode,
            body: data
          });
        }
      });
    });

    req.on('error', reject);

    if (body) {
      req.write(JSON.stringify(body));
    }

    req.end();
  });
}

let server;

async function runTests() {
  // Start server before tests
  await new Promise(resolve => {
    server = app.listen(PORT, resolve);
  });

  try {
    // Test: Valid user creation
    console.log('Test 1: Valid user creation...');
    const validRes = await makeRequest('POST', '/api/users', {
      email: 'user@example.com',
      name: 'John Doe',
      password: 'password123'
    });
    assert.strictEqual(validRes.status, 201, 'Should return 201 Created');
    assert(validRes.body.id, 'Should return user with id');
    assert.strictEqual(validRes.body.email, 'user@example.com', 'Should return user email');
    assert.strictEqual(validRes.body.name, 'John Doe', 'Should return user name');
    console.log('✓ Valid user creation passed');

    // Test: Invalid email format
    console.log('\nTest 2: Invalid email format...');
    const invalidEmailRes = await makeRequest('POST', '/api/users', {
      email: 'not-an-email',
      name: 'John Doe',
      password: 'password123'
    });
    assert.strictEqual(invalidEmailRes.status, 400, 'Should return 400 Bad Request');
    assert(invalidEmailRes.body.errors.email, 'Should have email error');
    assert.strictEqual(invalidEmailRes.body.errors.email, 'Must be a valid email');
    console.log('✓ Invalid email format passed');

    // Test: Name too short
    console.log('\nTest 3: Name validation - empty...');
    const emptyNameRes = await makeRequest('POST', '/api/users', {
      email: 'user@example.com',
      name: '',
      password: 'password123'
    });
    assert.strictEqual(emptyNameRes.status, 400, 'Should return 400 Bad Request');
    assert(emptyNameRes.body.errors.name, 'Should have name error');
    assert.strictEqual(emptyNameRes.body.errors.name, 'Must be 1-100 characters');
    console.log('✓ Empty name validation passed');

    // Test: Name too long
    console.log('\nTest 4: Name validation - too long...');
    const longNameRes = await makeRequest('POST', '/api/users', {
      email: 'user@example.com',
      name: 'a'.repeat(101),
      password: 'password123'
    });
    assert.strictEqual(longNameRes.status, 400, 'Should return 400 Bad Request');
    assert(longNameRes.body.errors.name, 'Should have name error');
    assert.strictEqual(longNameRes.body.errors.name, 'Must be 1-100 characters');
    console.log('✓ Long name validation passed');

    // Test: Password too short
    console.log('\nTest 5: Password validation - too short...');
    const shortPwdRes = await makeRequest('POST', '/api/users', {
      email: 'user@example.com',
      name: 'John Doe',
      password: 'pass123'
    });
    assert.strictEqual(shortPwdRes.status, 400, 'Should return 400 Bad Request');
    assert(shortPwdRes.body.errors.password, 'Should have password error');
    assert.strictEqual(shortPwdRes.body.errors.password, 'Must be at least 8 characters');
    console.log('✓ Short password validation passed');

    // Test: Password without number
    console.log('\nTest 6: Password validation - no number...');
    const noPwdNumRes = await makeRequest('POST', '/api/users', {
      email: 'user@example.com',
      name: 'John Doe',
      password: 'password'
    });
    assert.strictEqual(noPwdNumRes.status, 400, 'Should return 400 Bad Request');
    assert(noPwdNumRes.body.errors.password, 'Should have password error');
    assert.strictEqual(noPwdNumRes.body.errors.password, 'Must contain at least 1 number');
    console.log('✓ Password without number validation passed');

    // Test: Multiple validation errors
    console.log('\nTest 7: Multiple validation errors...');
    const multiErrorRes = await makeRequest('POST', '/api/users', {
      email: 'invalid-email',
      name: '',
      password: 'pass'
    });
    assert.strictEqual(multiErrorRes.status, 400, 'Should return 400 Bad Request');
    assert(multiErrorRes.body.errors.email, 'Should have email error');
    assert(multiErrorRes.body.errors.name, 'Should have name error');
    assert(multiErrorRes.body.errors.password, 'Should have password error');
    console.log('✓ Multiple validation errors passed');

    // Test: Valid with edge cases
    console.log('\nTest 8: Valid with edge case (max name length)...');
    const maxNameRes = await makeRequest('POST', '/api/users', {
      email: 'user@example.com',
      name: 'a'.repeat(100),
      password: 'password1'
    });
    assert.strictEqual(maxNameRes.status, 201, 'Should return 201 Created');
    console.log('✓ Max name length validation passed');

    // Test: Valid with minimal password
    console.log('\nTest 9: Valid with minimal password requirements...');
    const minPwdRes = await makeRequest('POST', '/api/users', {
      email: 'user@example.com',
      name: 'John',
      password: 'password1'
    });
    assert.strictEqual(minPwdRes.status, 201, 'Should return 201 Created');
    console.log('✓ Minimal password requirements passed');

    console.log('\n✅ All tests passed!');
  } catch (error) {
    console.error('❌ Test failed:', error.message);
    console.error(error.stack);
    process.exit(1);
  } finally {
    server.close();
  }
}

runTests();
