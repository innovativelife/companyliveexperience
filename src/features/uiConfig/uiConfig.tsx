// import { useEffect, useState } from "react";
// import { useAppDispatch, useAppSelector } from "../../app/hooks";
// import { UiConfig, fetchUiConfigs, uiConfigSelector } from "./uiConfigSlice";
// // import "./user.css";
// function UiConfigPage() {
//   const [uiConfigs, setUiConfigs] = useState<Array<UiConfig>>([]);
//   const [loading, setLoading] = useState<boolean>(false);
//   const [error, setError] = useState<string | undefined>(undefined);
//   const selectedUiConfigs = useAppSelector(uiConfigSelector);
//   const dispatch = useAppDispatch();
//   useEffect(() => {
//     setLoading(selectedUiConfigs.loading);
//     setError(selectedUiConfigs.error);
//     setUiConfigs(selectedUiConfigs.uiConfigs);
//   }, [selectedUiConfigs]);
//   function handleFetchUiConfigs() {
//     dispatch(fetchUiConfigs());
//   }
//   {
//     console.log(uiConfigs);
//   }
//   return (
//     <div>
//       {loading && <div>Loading...</div>}
//       {error && <div>Error: {error}</div>}
//       {/* {uiConfigs?.map((config) => (
//         // <li key={config.index}>{config}</li>
//         <li>""Here</li>
//       ))} */}
//       <button className="btn" onClick={handleFetchUiConfigs}>
//         Fetch
//       </button>
//     </div>
//   );
// }
// export default UiConfigPage;
