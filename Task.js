import Link from "next/link";
import Cookie from "universal-cookie";
import { useContext } from "react";

const cookie = new Cookie();

export default function Task({ task, taskDeleted }) {
  const deleteTask = async () => {
    await fetch(`${process.env.NEXT_PUBLIC_RESTAPI_URL}api/tasks/${task.id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `JWT ${cookie.get("access_token")}`,
      },
    }).then((res) => {
      if (res.status === 401) {
        alert("JWT Token not valid");
      }
    });
    taskDeleted();
  };
  return (
    <div>
      <span>{task.id}</span>
      {" : "}
      <Link href={`/tasks/${task.id}`}>
        <span className="cursor-pointer text-white border-b border-gray-500 hover:bg-gray-600">
          {task.title}
        </span>
      </Link>
    </div>
  );
}
