import axios from "axios";
import type { GetServerSideProps, GetStaticProps, NextPage } from "next";
import Link from "next/link";
import styles from "../styles/Home.module.css";
import { FiPlus, FiTrash2, FiZoomIn } from "react-icons/fi";
import { Task } from "../type";

export const DelTask = (id: number, e: any) => {
  console.log(id);
  axios.delete(`http://localhost:3000/${id}`).then((res) => {
    console.log(res);
    console.log("削除");
  });
};

const Home: NextPage = ({ data }: any) => {
  return (
    <>
      {console.log(data)}
      <div>
        <h1 className={styles.title}>Todo Lists</h1>
        <div>
          <button>
            <Link href="/new">New</Link>
          </button>
        </div>
        <div className={styles.list}>
          {data.map((item: { id: number; title: string }) => {
            return (
              <div key={item.id}>
                <ul>
                  <div>{item.title}</div>

                  <button>
                    <Link
                      href={{
                        pathname: `/task/${item.id}`,
                        query: { id: item.id },
                      }}
                    >
                      <a>
                        <FiZoomIn />
                      </a>
                    </Link>
                  </button>
                  <button onClick={(e) => DelTask(item.id, e)}>
                    <FiTrash2 />
                  </button>
                </ul>

                <p></p>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const res = await axios.get("http://node:3000");
  const json = await res.data;
  const tasks = json.tasks;
  return {
    props: {
      data: tasks,
    },
  };
};
export default Home;
