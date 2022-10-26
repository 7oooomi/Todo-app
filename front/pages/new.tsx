import axios from "axios";
import type { GetServerSideProps, NextPage } from "next";
import React, { useState } from "react";
import Link from "next/link";
import styles from "../styles/Home.module.css";
import { FiChevronsLeft } from "react-icons/fi";

const New: NextPage = ({ data }: any) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");

  const handleClick = async (e: any) => {
    e.preventDefault();

    const data = {
      title: title,
      content: content,
      status: "false",
      categoryId: category,
    };

    await axios.post(`http://localhost:3000/new`, data).then((res) => {
      console.log("送信");
      console.log(res);
    });
  };

  return (
    <>
      <h1 className={styles.title}>New Task</h1>
      <button>
        <Link href="/">
          <FiChevronsLeft />
        </Link>
      </button>
      <form className={styles.list}>
        <div>
          <p>title</p>
          <input
            type="text"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setTitle(e.target.value)
            }
          ></input>
          <div>
            <p>content</p>
            <textarea
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                setContent(e.target.value)
              }
            ></textarea>
          </div>
          <p>category</p>
          <select
            value={category}
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
              setCategory(e.target.value)
            }
          >
            <option value="-----"></option>
            {data.map((item: { id: number; name: string }) => {
              return (
                <option key={item.id} value={item.id}>
                  {item.name}
                </option>
              );
            })}
          </select>
          <div>
            <p>
              <button onClick={handleClick}>New</button>
            </p>
          </div>
        </div>
      </form>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const res = await axios.get(`http://node:3000/new`);
  const json = await res.data;
  return {
    props: {
      data: json,
    },
  };
};

export default New;
