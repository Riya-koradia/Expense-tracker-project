import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { callApiAction } from "../../store/actions/commonAction";
import { callSnackBar } from "../../store/actions/snackbarAction";
import { SNACK_BAR_VARIANTS } from "../../utils/constants";

import { getUserStatisticsApi } from "../../apis/expense.api";
import DashboardListUi from "./DashboardListUi";

const DashboardListController = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [statistics, setStatistics] = useState([]);

  const fetchStatistics = () => {
    setLoading(true);
    dispatch(
      callApiAction(
        async () => await getUserStatisticsApi(),
        (response) => {
          if (response) {
            setStatistics(response);
          } else {
            setStatistics([]);
          }
          setLoading(false);
          console.log("STATISTICS:", response);

        },
        (err) => {
          setLoading(false);
          dispatch(callSnackBar("Failed to load statistics", SNACK_BAR_VARIANTS.error));
        }
      )
    );
  };

  useEffect(() => {
    fetchStatistics();
  }, []);

  return <DashboardListUi loading={loading} data={statistics} />;
};

export default DashboardListController;
