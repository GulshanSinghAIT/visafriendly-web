import React, { useState, useEffect } from "react";
import { TableCell } from "./TableCell.jsx";
import { StatusBadge } from "./StatusBadge.jsx";
import styles from "./PaymentHistory.module.css";
import { useUser } from "@clerk/clerk-react";
import axios from "axios";

export const PaymentHistoryTable = () => {
  const { user, isSignedIn } = useUser();
  const [data, setData] = useState([]);
  const [sortOrder, setSortOrder] = useState("asc");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPaymentHistory = async () => {
      if (!isSignedIn || !user) {
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/pricing/payment-history`,
          {
            params: {
              email: user.emailAddresses[0].emailAddress,
            },
          }
        );

        setData(response.data.paymentHistory);
      } catch (err) {
        console.error("Error fetching payment history:", err);
        setError(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPaymentHistory();
  }, [isSignedIn, user]);

  const sortData = () => {
    const sortedData = [...data].sort((a, b) => {
      const dateA = new Date(a.billingDate);
      const dateB = new Date(b.billingDate);
      return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
    });
    setData(sortedData);
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  const handleDownloadInvoice = async (invoicePdfLink) => {
    if (!invoicePdfLink) {
      alert("Invoice not available");
      return;
    }

    try {
      const response = await axios.get(invoicePdfLink, {
        responseType: "blob",
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "invoice.pdf");
      document.body.appendChild(link);
      link.click();
    } catch (error) {
      console.error("Error downloading invoice:", error);
      alert("Failed to download invoice");
    }
  };

  if (isLoading) {
    return (
      <div className={styles.container}>
        <h1 className={styles.title}>Payment History</h1>
        <div>Loading payment history...</div>
      </div>
    );
  }

  if (error || !data.length) {
    return (
      <div className={styles.container}>
        <h1 className={styles.title}>Payment History</h1>
        <div>No payment history found</div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Payment History</h1>
      <div className={styles.table} role="table" aria-label="Payment History">
        <div className={styles.tableBody}>
          <div className={styles.tableContent}>
            <div className={styles.columnContainer} role="rowgroup">
              <div className={styles.headerCell} role="columnheader">
                Invoice
              </div>
              {data.map((payment, index) => (
                <TableCell key={`invoice-${index}`} role="cell">
                  <img
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/13f2f4880506ed183e56b481ba8dcee86f1fcc42cd71d63f9d1a31245770df1e?placeholderIfAbsent=true&apiKey=${REACT_APP_BUILDER_SUBSCRIPTION_KEY}"
                    alt=""
                    className={styles.invoiceIcon}
                  />
                  <span>{`Invoice#${payment.id}`}</span>
                </TableCell>
              ))}
            </div>

            <div className={styles.columnContainer} role="rowgroup">
              <div className={styles.headerCell} role="columnheader">
                Plan
              </div>
              {data.map((payment, index) => (
                <TableCell key={`plan-${index}`} role="cell">
                  {payment.plan}
                </TableCell>
              ))}
            </div>

            <div className={styles.columnContainer} role="rowgroup">
              <div className={styles.headerCell} role="columnheader">
                Amount
              </div>
              {data.map((payment, index) => (
                <TableCell key={`amount-${index}`} role="cell">
                  {`$ ${payment.amount}`}
                </TableCell>
              ))}
            </div>

            <div className={styles.columnContainer} role="rowgroup">
              <div className={styles.headerCell} role="columnheader">
                Status
              </div>
              {data.map((payment, index) => (
                <TableCell key={`status-${index}`} role="cell">
                  <StatusBadge status={payment.status} />
                </TableCell>
              ))}
            </div>

            <div className={styles.columnContainer} role="rowgroup">
              <div
                className={`${styles.headerCell} ${styles.sortable}`}
                role="columnheader"
                onClick={sortData}
              >
                Billing Date
                <img
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/e97e83b43b83b2ab5c1aad5a45e34b445561c3ae0872ee2fe168efbdc35ff70b?placeholderIfAbsent=true&apiKey=${REACT_APP_BUILDER_SUBSCRIPTION_KEY}"
                  alt="Sort"
                  className={styles.sortIcon}
                />
              </div>
              {data.map((payment, index) => (
                <TableCell key={`date-${index}`} role="cell">
                  {new Date(payment.billingDate).toISOString().split("T")[0]}
                </TableCell>
              ))}
            </div>

            <div className={styles.columnContainer} role="rowgroup">
              <div className={styles.headerCell} role="columnheader">
                Action
              </div>
              {data.map((payment, index) => (
                <TableCell key={`action-${index}`} role="cell">
                  <button
                    className={styles.downloadLink}
                    onClick={() =>
                      handleDownloadInvoice(payment.invoicePdfLink)
                    }
                  >
                    <img
                      src="https://cdn.builder.io/api/v1/image/assets/TEMP/cbe011c27fe45416a12734e9154d8ebe4af32a5696e6dc45339e792995ff46d7?placeholderIfAbsent=true&apiKey=${REACT_APP_BUILDER_SUBSCRIPTION_KEY}"
                      alt=""
                      className={styles.invoiceIcon}
                    />
                    <span>Download</span>
                  </button>
                </TableCell>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
