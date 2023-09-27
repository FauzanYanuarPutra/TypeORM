import React from "react";

import { useQuery, useMutation } from "react-query";
import { API } from "../config/api";

interface PartyObj {
  id: number;
  name: string;
}

interface PaslonObj {
  id: number;
  name: string;
  visi: string;
  party: PartyObj[];
}

interface VoterObj {
  id: number;
  voter_name: string;
  paslon: {
    id: number;
    name: string;
    visi: string;
  };
}

export default function Home() {
  const [voteCounts, setVoteCounts] = React.useState<{
    [paslonId: number]: number;
  }>({});
  const [selectedPaslon, setSelectedPaslon] = React.useState<number | null>();
  const [voterName, setVoterName] = React.useState<string>();

  const radioHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log(event.target.value);
    setSelectedPaslon(parseInt(event.target.value));
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setVoterName(event.target.value);
  };

  const { data: paslon, refetch: paslonRefetch } = useQuery(
    "paslonCache",
    async () => {
      const response = await API.get("/paslons");
      return response.data.data;
    }
  );

  const { data: voter, refetch: voterRefetch } = useQuery(
    "voterCache",
    async () => {
      const response = await API.get("/votes");
      return response.data.data;
    }
  );

  const handleVoteAdd = useMutation(async (e: React.FormEvent) => {
    try {
      e.preventDefault();

      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const body = JSON.stringify({
        paslon_id: selectedPaslon,
        voter_name: voterName,
      });

      const response = await API.post("/vote", body, config);

      console.log(response);

      setSelectedPaslon(null);
      setVoterName("");
      paslonRefetch();
      voterRefetch();
    } catch (error: unknown) {
      console.error(error);
    }
  });

  React.useEffect(() => {
    const countVotes = () => {
      const counts: { [paslonId: number]: number } = {};

      voter?.forEach((voter: VoterObj) => {
        const paslonId = voter?.paslon?.id;

        if (counts[paslonId]) {
          counts[paslonId] = counts[paslonId] + 1;
        } else {
          counts[paslonId] = 1;
        }
      });

      setVoteCounts(counts);
    };

    countVotes();
    paslonRefetch();
    voterRefetch();
  }, [voter, paslonRefetch, voterRefetch]);

  return (
    <React.Fragment>
      <div className="w-full h-min bg-white p-10">
        <h1 className="text-3xl text-center text-neutral-900 font-bold">
          PEMILU PRESIDEN
        </h1>
        <div className="w-full lg:w-3/4 mx-auto flex flex-col lg:flex-row gap-10 mt-10">
          {paslon?.map((paslon: PaslonObj) => (
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
              <ul className="text-md text-left text-neutral-800 font-light list-inside list-disc">
                {paslon?.party?.map((party: PartyObj) => (
                  <li key={party?.id}>{party?.name}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="w-full lg:w-3/4 mx-auto flex flex-col lg:flex-row gap-10 mt-10">
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
        </div>
      </div>
    </React.Fragment>
  );
}