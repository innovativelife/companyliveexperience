import { RootState } from "../app/store";

const useDynamicAuth = import.meta.env.VITE_USE_DYNAMIC_AUTH === 'true';
const devTenantId = import.meta.env.VITE_DEV_TENANT_ID;
const devUserId = import.meta.env.VITE_DEV_USER_UID;

export const getAuthInfo = (getState: () => unknown) => {
  if (useDynamicAuth) {
    const state = getState() as RootState;
    return {
        //Why not state.auth.user.tenantId???
      tenantId: state.auth.tenantId,
      userId: state.auth.employeeUID,
    };
  } else {
    return {
      tenantId: devTenantId,
      userId: devUserId,
    };
  }
};
