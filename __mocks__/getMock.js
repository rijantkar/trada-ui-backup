/**
 * getMock
 * @param {Object} jestImplementation jestImplementation
 * @param {Object} localServerImplementation localServerImplementation
 * @param {Object} callJestFn callJestFn
 * @param {Object} callLocalFn callLocalFn
 * @returns {Object} mock
 */
export const getMock = (
  jestImplementation,
  localServerImplementation,
  callJestFn = false,
  callLocalFn = false,
) => {
  const resolvedJestImplementation =
    process.env.NODE_ENV === 'jest' && callJestFn
      ? jestImplementation()
      : jestImplementation;
  const resolvedLocalServerImplementation = callLocalFn
    ? localServerImplementation()
    : localServerImplementation;
  return process.env.NODE_ENV === 'jest'
    ? jest.fn().mockImplementation(resolvedJestImplementation)
    : resolvedLocalServerImplementation || resolvedJestImplementation;
};

export default getMock;
