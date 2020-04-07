import { ensureArray, isObject } from '@regraph/core/';

/*
In the case of an array of compound policies, converts:
[
  {start: ()=>1, end: ()=>2},
  {start: ()=>3, end: ()=>4},
]
To (an array with named properties):
[
  start: [()=>1, ()=>3],
  end: [()=>2, ()=>4]
]
Which makes itteration easier for consumers.
For non-compund policies, simply pushes them to the array.
*/
const collectPolicies = policies =>
  ensureArray(policies).reduce((acc, policy) => {
    if (isObject(policy)) {
      Object.entries(policy).forEach(([key, value]) => {
        acc[key] = acc[key] || [];
        acc[key].push(value);
      });
    } else {
      acc.push(policy);
    }
    return acc;
  }, []);

export default function getPoliciesFactory(getEditPolicies) {
  let getPolicies = () => {
    throw new Error(
      'Calling getEditPolicies while constructing the store is not allowed'
    );
  };

  const enablePolicies = ({ dispatch, getState }) => {
    getPolicies = (target, policyName) => {
      const targetPolicies = getEditPolicies(target) || {};
      const policy = targetPolicies[policyName];
      if (policy) {
        return collectPolicies(policy(dispatch, getState));
      }
      return undefined;
    };
  };

  return {
    getPolicies: (...args) => getPolicies(...args),
    enablePolicies,
  };
}
