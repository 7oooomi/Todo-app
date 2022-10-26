import type { GetServerSideProps, NextPage } from "next";
import { useRouter } from "next/router";
import Link from "next/link";
import axios from "axios";
import { useState } from "react";
import styles from "../../styles/Home.module.css";
import { FiChevronsLeft } from "react-icons/fi";

const Task: NextPage = ({ data }: any) => {
  const router = useRouter();

  const [title, setTitle] = useState(`${data[0].title}`);
  const [content, setContent] = useState(`${data[0].content}`);

  const handleClick = async (e: any) => {
    e.preventDefault();

    const task = {
      title: title,
      content: content,
      status: "false",
      categoryId: `${data[0].categories.id}`,
    };

    await axios.put(`http://localhost:3000/${data[0].id}`, task).then((res) => {
      console.log("送信");
      console.log(res);
    });
  };

  return (
    <>
      {console.log(data)}
      <h1 className={styles.title}>Task</h1>
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
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          ></input>
          <div>
            <p>content</p>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
            ></textarea>
          </div>
          <p>category:</p>
          {data[0].categories.name}
          <div>
            <p>
              <button onClick={handleClick}>Updata</button>
            </p>
          </div>
        </div>
      </form>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const id = context.query.id;
  const res = await axios.get(`http://node:3000/to/${id}`);
  const json = await res.data;
  return {
    props: {
      data: json,
    },
  };
};

export default Task;
