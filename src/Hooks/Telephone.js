import { useEffect } from "react";
import { GetCaller, GetCallerAdmin } from "./GetCaller";
import {
  allMerchantPayments,
  allPayments,
  setAdminWallet,
  setUserBalance,
} from "../Redux/reducer";
import { useDispatch, useSelector } from "react-redux";
import PostCaller from "./PostCaller";
export const useTelephone = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchUserBalance = async () => {
      const result = await PostCaller(
        {
          userId: _id,
        },
        "balance"
      );

      const userBalance = await result;
    };

    const fetchData = async () => {
      const query = {
        userId: _id,
      };
      const result = await GetCaller({
        route: "/transactions",
        query: query,
      });
      const userTransactions = await result;
    };

    const fetchDataAdmin = async () => {
      const query = {};
      const result = await GetCallerAdmin({
        route: "/transactions",
        query: query,
      });
      const userTransactions = await result;
    };
    const fetchWalletAdmin = async () => {
      const query = {};
      const result = await GetCallerAdmin({
        route: "/wallet",
        query: query,
      });
      const Wallet = await result;
    };
    const fetchMerchantVouchers = async () => {
      const query = {};
      const result = await GetCallerAdmin({
        route: "/vouchers",
        query: query,
      });
      const MerchantVouchers = await result;
    };

    // const interval = setInterval(() => {
    //   switch (role) {
    //     case "admin":
    //       break;
    //     case "user":
    //       break;
    //     default:
    //       break;
    //   }
    // }, 3000);

    return () => clearInterval(interval);
  }, []);

  // Return any additional data or functions you want to expose to the component using the hook
  return {};
};
