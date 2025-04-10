import { afterAll, afterEach, beforeAll } from 'vitest';
import { cleanup } from '@testing-library/react';
import "@testing-library/jest-dom/vitest";
import { server } from './ShoppingCart-Frontend/frontend/__mocks__/node';
import { resetItemActionsState } from './ShoppingCart-Frontend/frontend/__mocks__/handlers';

beforeAll(() => {
  // Enable API mocking before all the tests.
  server.listen()
  console.log("Listening to a server...")
})

afterEach(() => {
  // Reset the request handlers between each test.
  // This way the handlers we add on a per-test basis
  // do not leak to other, irrelevant tests.
  server.resetHandlers()
  console.log("Resetting server handlers...")
  cleanup();
  resetItemActionsState();
  console.log("Cleaning up...");
})

afterAll(() => {
  // Finally, disable API mocking after the tests are done.
  server.close()
  console.log("Closing a server");
})