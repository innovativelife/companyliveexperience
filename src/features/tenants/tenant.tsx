import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { Tenant, fetchTenants, tenantSelector } from "./tenantSlice";
// import "./user.css";
function TenantPage() {
  const [tenants, setTenants] = useState<Array<Tenant>>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | undefined>(undefined);
  const selectedTenants = useAppSelector(tenantSelector);
  const dispatch = useAppDispatch();
  useEffect(() => {
    setLoading(selectedTenants.loading);
    setError(selectedTenants.error);
    setTenants(selectedTenants.tenants);
  }, [selectedTenants]);
  function handleFetchUser() {
    dispatch(fetchTenants());
  }
  return (
    <div>
      {loading && <div>Loading...</div>}
      {error && <div>Error: {error}</div>}
      {tenants?.map((tenant) => (
        <li key={tenant.tenantId}>
          {tenant.tenantId} | {tenant.tenantName} | {tenant.customerName}
        </li>
      ))}
      <button className="btn" onClick={handleFetchUser}>
        Fetch
      </button>
    </div>
  );
}
export default TenantPage;
