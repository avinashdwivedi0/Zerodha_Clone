import React from "react";
import { Link } from "react-router-dom";

const Funds = () => {
  return (
    <>
      <div className="funds">
        <div className="funds-intro">
          <span className="funds-kicker">ACCOUNT BALANCE</span>
          <p>Move money securely with UPI or bank transfer.</p>
        </div>
        <div className="funds-actions">
          <Link className="btn btn-green" to="#add-funds">+ Add funds</Link>
          <Link className="btn btn-blue" to="#withdraw">Withdraw</Link>
        </div>
      </div>

      <div className="funds-overview">
        <div className="funds-balance-card">
          <span>
            <span className="funds-card-icon">Rs</span>
            <p>Equity balance</p>
          </span>

          <div className="table funds-table">
            <div className="data">
              <p>Available margin</p>
              <p className="imp colored">4,043.10</p>
            </div>
            <div className="data">
              <p>Used margin</p>
              <p className="imp">3,757.30</p>
            </div>
            <div className="data">
              <p>Available cash</p>
              <p className="imp">4,043.10</p>
            </div>
            <hr />
            <div className="data">
              <p>Opening balance</p>
              <p>4,043.10</p>
            </div>
            <div className="data">
              <p>Opening balance</p>
              <p>3736.40</p>
            </div>
            <div className="data">
              <p>Payin</p>
              <p>4064.00</p>
            </div>
            <div className="data">
              <p>SPAN</p>
              <p>0.00</p>
            </div>
            <div className="data">
              <p>Delivery margin</p>
              <p>0.00</p>
            </div>
            <div className="data">
              <p>Exposure</p>
              <p>0.00</p>
            </div>
            <div className="data">
              <p>Options premium</p>
              <p>0.00</p>
            </div>
            <hr />
            <div className="data">
              <p>Collateral (Liquid funds)</p>
              <p>0.00</p>
            </div>
            <div className="data">
              <p>Collateral (Equity)</p>
              <p>0.00</p>
            </div>
            <div className="data">
              <p>Total Collateral</p>
              <p>0.00</p>
            </div>
          </div>
        </div>

        <div className="commodity funds-commodity">
          <span className="commodity-icon">*</span>
          <span className="funds-kicker">COMMODITY</span>
          <h3>Explore commodity trading</h3>
          <p>You don't have a commodity account yet. Open one to trade commodities from the same dashboard.</p>
          <Link className="btn btn-blue" to="#open-account">Open commodity account</Link>
        </div>
      </div>
    </>
  );
};

export default Funds;
