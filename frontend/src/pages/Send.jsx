import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios"

function Send() {
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id")
  const name = searchParams.get("name")
  const [amount, setAmount] = useState(0)
  return (
    <div className="h-[100vh] w-full flex items-center justify-center">
      <div className="text-secondary w-[350px] rounded-lg border border-border">
        <div className="p-5 flex flex-col gap-2 items-center">
          <h1 className="text-2xl font-bold">Send Money</h1>
        </div>
        <div className="p-5 pt-0">
          
            <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <div className="px-4 py-2 bg-border rounded-[50%] flex flex-col justify-center">
                {name && name[0]}
              </div>
              <p className="text-lg">{name}</p>
            </div>
              <div className="flex gap-2 flex-col">
                <label htmlFor="email" className="text-sm font-medium">
                  Amount (in Rs)
                </label>
                <input
                  type="text"
                  onChange={(e) => {
                    setAmount(e.target.value)
                  }}
                  className="rounded-md px-3 py-2 text-sm bg-primary border border-border "
                  placeholder="Enter amount"
                />
              </div>
              <button
                onClick={async (e) => {
                  e.preventDefault();
                  const response = await axios.post(
                    "http://localhost:3000/api/v1/account/transfer", {
                      to: id,
                      amount: amount
                    },{
                      headers: {
                      Authorization: "bearer " + localStorage.getItem("token"),
                    }}
                  );
                }}
                className="text-sm font-medium bg-green-500 text-primary h-10 rounded-md hover:bg-hover"
              >
                Initiate Transfer
              </button>
            </div>
          
        </div>
      </div>
    </div>
  );
}

export default Send;
