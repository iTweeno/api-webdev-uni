import { mockDeep, mockReset } from "jest-mock-extended";

import prisma from "./prisma_utils";

jest.mock("@prisma/client", () => ({
  __esModule: true,
  default: mockDeep(),
}));

const prismaMock = prisma;

beforeEach(() => {
  mockReset(prismaMock);
});

const createMockContext = () => {
  return {
    prisma: mockDeep(),
  };
};

export { prismaMock, createMockContext };
