import axios from "axios";
import { useEffect, useState } from "react";

interface PaslonObj {
  id: number;
  name: string;
  visi: string;
  image: string;
  // party: PartyObj[];
}


export default function Home() {
  const [dataPaslon, setDataPaslon] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/v1/paslons").then((res) => {
      // console.log(res.data.paslons)
      setDataPaslon(res.data.paslons)
    })
  }, [])
  

  return (
    <>
      <div className="w-full h-min bg-white p-10">
        <h1 className="text-3xl text-center text-neutral-900 font-bold">
          PEMILU PRESIDEN
        </h1>
 
        <div className="w-full lg:w-3/4 mx-auto flex flex-col lg:flex-row gap-10 mt-10">
          {dataPaslon?.map((paslon: PaslonObj) => (
            <div
              key={paslon?.id}
              className="flex-1 bg-white w-full p-5 lg:p-10 rounded-2xl drop-shadow-md border border-neutral-100"
            >
              <img
                src="https://random.imagecdn.app/500/500"
                alt="paslon_profile"
                className="w-[75%] mx-auto rounded-2xl border-8 border-neutral-400"
              />
              <h1 className="text-2xl text-center text-neutral-900 font-bold mt-5">
                {paslon?.name}
              </h1>
              <h3 className="text-md text-center text-neutral-800 font-normal">
                {paslon?.visi}
              </h3>
              <h2 className="text-lg text-left text-neutral-900 font-semibold mt-10">
                Partai Pengusung:
              </h2>
              {/* <ul className="text-md text-left text-neutral-800 font-light list-inside list-disc">
                {paslon?.party?.map((party: PartyObj) => (
                  <li key={party?.id}>{party?.name}</li>
                ))}
              </ul> */}
            </div>
          ))}
        </div>
        {/* <div className="w-full lg:w-3/4 mx-auto flex flex-col lg:flex-row gap-10 mt-10">
          <div className="flex-[35%] bg-white w-full p-5 lg:p-10 rounded-2xl drop-shadow-md border border-neutral-100">
            <h1 className="text-xl text-left text-neutral-900 font-bold">
              Suara Saat Ini:
            </h1>
            <ul className="text-md text-left text-neutral-800 font-light list-inside list-disc">
              {paslon?.map((paslon: PaslonObj) => (
                <li key={paslon?.id}>
                  <span className="font-medium">{paslon?.name}</span>:{" "}
                  <span className="countdown">
                    <span
                      style={
                        {
                          "--value": voteCounts[paslon?.id],
                        } as React.CSSProperties
                      }
                    ></span>
                  </span>
                </li>
              ))}
            </ul>
          </div>
          <div className="flex-[65%] bg-white w-full p-5 lg:p-10 rounded-2xl drop-shadow-md border border-neutral-100">
            <h1 className="text-xl text-left text-neutral-900 font-bold">
              Masukkan nama:
            </h1>
            <input
              type="text"
              className="bg-white text-neutral-900 mt-1 border border-neutral-900 rounded-xl p-3"
              value={voterName}
              onChange={(e) => handleChange(e)}
            />
            <p className="text-sm text-left text-neutral-800 font-light mt-1">
              Pilih paslon menurut pilihan hati dan pikiranmu yang random,
              jangan pernah dibawa serius!
            </p>
            <div className="mt-5 flex flex-col lg:flex-row justify-between">
              <div className="grid lg:grid-cols-3 lg:grid-flow-row gap-10">
                {paslon?.map((paslon: PaslonObj) => (
                  <label key={paslon?.id} className="flex gap-2 items-center">
                    <input
                      className="radio radio-accent"
                      type="radio"
                      name="paslon"
                      value={paslon?.id}
                      id={paslon?.name}
                      onChange={radioHandler}
                    />
                    <span className="label-text text-md lg:text-xl text-neutral-900 font-bold">
                      {paslon?.name}
                    </span>
                  </label>
                ))}
              </div>
              <button
                className="btn btn-accent mt-10 lg:mt-0"
                onClick={(e) => handleVoteAdd.mutate(e)}
              >
                SUBMIT
              </button>
            </div>
          </div>
        </div> */}
      </div>
    </>
  );
}
