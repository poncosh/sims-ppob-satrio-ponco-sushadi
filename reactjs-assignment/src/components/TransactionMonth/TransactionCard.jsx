import React from "react";

export const TransactionCard = ({ data }) => {
  console.log(data);
  return (
    <div className="card w-100">
      <div className="card-body">
        <h5
          style={{
            color: data.transaction_type === "PAYMENT" ? "#f42619" : "green",
          }}
          className="card-title"
        >
          {data.transaction_type === "PAYMENT"
            ? `- ${new Intl.NumberFormat("id-ID", {
                style: "currency",
                currency: "IDR",
              }).format(data.total_amount)}`
            : `+ ${new Intl.NumberFormat("id-ID", {
                style: "currency",
                currency: "IDR",
              }).format(data.total_amount)}`}
        </h5>
        <p className="card-text text-secondary mb-0">{data.created_on}</p>
        <p style={{ position: "absolute", right: "15px", bottom: "20%" }}>
          {data.description}
        </p>
      </div>
    </div>
  );
};
