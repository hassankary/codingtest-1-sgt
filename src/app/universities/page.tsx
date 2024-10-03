"use client";
import { useEffect, useState } from "react";
import { Button, Table } from "antd";
import { Input } from "antd";
import type { GetProps } from "antd";

interface University {
  alpha_two_code: string;
  country: string;
  domains: string[];
  name: string;
  "state-province": string | null;
  web_pages: string[];
}

type SearchProps = GetProps<typeof Input.Search>;

const { Search } = Input;

const columns = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Web Pages",
    dataIndex: "web_pages",
    key: "web_pages",
    render: (web_pages: string[]) => (
      <a href={web_pages[0]} target="_blank" rel="noopener noreferrer">
        {web_pages[0]}
      </a>
    ),
  },
  {
    title: "Country",
    dataIndex: "country",
    key: "country",
  },
];

const dataLoading = {
    alpha_two_code: "",
    country: "Loading...",
    domains: [""],
    name: "Loading...",
    "state-province": "",
    web_pages: ["Loading..."],
  };

export default function Universities() {
  const [data, setData] = useState<University[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [country, setCountry] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const getData = async (): Promise<void> => {
    setLoading(true);
    try {
      const res = await fetch(
        `http://universities.hipolabs.com/search?country=${country}&name=${name}`
      );

      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }

      const response = await res.json();
      setData(response);
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("An unexpected error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, [country, name]);

  useEffect(() => {
    if (error) {
      console.error("Error fetch data:", error);
    }
  }, [error]);

  const onSearchName: SearchProps["onSearch"] = (value) => {
    setName(value);
    setCurrentPage(1);
  };

  const onSearchCountry: SearchProps["onSearch"] = (value) => {
    setCountry(value);
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const resetFilter = () => {
    setName("");
    setCountry("");
    setCurrentPage(1);
  };

  return (
    <div className="bg-gradient-to-b from-foreground to-[#1677FF] ">

    <div className="min-h-screen container xl:max-w-7xl lg:px-[10%] mx-auto">
      <div className="flex justify-center py-10 font-bold font-sans text-2xl sm:text-3xl text-center text-black">
        <h1 className=" w-fit pb-2 border-b-2 border-b-[#1677FF]">
          Universities {country === "" ? "Around the World" : "in"}{" "}
          <span className=" capitalize">{country}</span>
        </h1>
      </div>
      <div className="p-4 mb-4">
        <div className="w-full sm:max-w-[350px] space-y-4">
          <Search
            placeholder="Name..."
            onSearch={onSearchName}
            enterButton
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="shadow-md"
          />
          <Search
            placeholder="Country..."
            onSearch={onSearchCountry}
            enterButton
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            className="shadow-md"
          />
          <Button
            onClick={resetFilter}
            type={"primary"}
            className="capitalize shadow-md"
          >
            Reset Filter
          </Button>
        </div>
      </div>
      <div className="mx-4 pb-10 overflow-x-auto">
        <Table
          dataSource={loading ? [dataLoading] : data.length > 0 ? data : []}
          columns={columns}
          rowKey={"web_pages"}
          pagination={{
            current: currentPage,
            onChange: handlePageChange,
          }}
          className={loading ? "animate-pulse" : ""}
        />
      </div>
    </div>
    </div>
  );
}
