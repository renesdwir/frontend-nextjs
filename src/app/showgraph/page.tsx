"use client";
import React, { useRef, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import toast, { Toaster } from "react-hot-toast";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);
export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top" as const,
    },
    title: {
      display: true,
      text: "Graph",
    },
  },
};
const labels = [""];
export const data = {
  labels,
  datasets: [
    {
      label: "Dataset",
      data: [0],
      backgroundColor: "rgb(59, 130, 246)",
    },
  ],
};
const GraphPage = () => {
  const [graphData, setGraphData] = useState(data);
  const enodebIdRef = useRef<HTMLInputElement | null>(null);
  const cellIdRef = useRef<HTMLInputElement | null>(null);
  const startDateRef = useRef<HTMLInputElement | null>(null);
  const endDateRef = useRef<HTMLInputElement | null>(null);
  const handleSubmit = async () => {
    const enodebIdValue = enodebIdRef.current?.value || "";
    const cellIdValue = cellIdRef.current?.value || "";
    const startDateValue = startDateRef.current?.value || "";
    const endDateValue = endDateRef.current?.value || "";
    const url = `http://localhost:3000/raw-data/graph?startDate=${startDateValue}&endDate=${endDateValue}&enodebId=${enodebIdValue}&cellId=${cellIdValue}`;

    try {
      let res = await fetch(url, {
        method: "GET",
      });
      let response = await res.json();
      if (response.error) {
        toast.error(response.error);
      } else {
        let resultTime: string[] = [];
        let availability: number[] = [];
        response?.forEach(
          (data: { resultTime: string; availability: number }) => {
            resultTime.push(data.resultTime);
            availability.push(data.availability);
          }
        );
        setGraphData({
          labels: resultTime,
          datasets: [
            {
              label: "Dataset",
              data: availability,
              backgroundColor: "rgb(59, 130, 246)",
            },
          ],
        });
        if (response.length < 1) {
          toast.error("Tidak Ada Data yang Tersedia");
        } else {
          toast.success("Data Berhasil ditampilkan");
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container mx-auto  p-4">
      <div className="border border-slate-200 p-5">
        <div className="grid grid-cols-1 lg:grid-cols-4 md:grid-cols-2 gap-5 ">
          <div className="shadow-sm border border-slate-200 rounded-md flex flex-col pt-2 px-4 py-4">
            <label htmlFor="enodebId" className="text-sm mb-1">
              enodebId
            </label>
            <input
              type="text"
              placeholder="enodebId"
              id="enodebId"
              ref={enodebIdRef}
              className="p-2 rounded-md border-slate-200 border"
            />
          </div>
          <div className="shadow-sm border border-slate-200 rounded-md flex flex-col pt-2 px-4 py-4">
            <label htmlFor="cellId" className="text-sm mb-1">
              cellId
            </label>
            <input
              type="text"
              placeholder="cellId"
              id="cellId"
              ref={cellIdRef}
              className="p-2 rounded-md border-slate-200 border"
            />
          </div>
          <div className="shadow-sm border border-slate-200 rounded-md flex flex-col pt-2 px-4 py-4">
            <label htmlFor="startDate" className="text-sm mb-1">
              startDate
            </label>
            <input
              type="text"
              placeholder="yyyy-mm-dd"
              id="startDate"
              ref={startDateRef}
              className="p-2 rounded-md border-slate-200 border"
            />
          </div>
          <div className="shadow-sm border border-slate-200 rounded-md flex flex-col pt-2 px-4 py-4">
            <label htmlFor="endDate" className="text-sm mb-1">
              endDate
            </label>
            <input
              type="text"
              placeholder="yyyy-mm-dd"
              id="endDate"
              ref={endDateRef}
              className="p-2 rounded-md border-slate-200 border"
            />
          </div>
        </div>
        <div className="flex flex-row-reverse">
          <button
            onClick={handleSubmit}
            className="mt-5  text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-10 py-2.5  focus:outline-none "
          >
            Search
          </button>
        </div>
      </div>
      <div className="h-80 flex justify-center">
        <Bar options={options} data={graphData} />
      </div>
    </div>
  );
};

export default GraphPage;
