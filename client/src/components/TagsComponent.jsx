import React, { useState, useEffect } from "react";
import { getTagListUrl } from "../constants/urls";
import arrrowDown from "../assets/down-arrow.png";
import arrrowUp from "../assets/up-arrow.png";
import { Link, useParams } from "react-router-dom";

const fetchTagList = async () => {
  let response = await fetch(getTagListUrl);
  const data = await response.json();
  return data["data"];
};

const fetchQuestionByTag = async (tag) => {
  console.log("tag", tag);
  let response = await fetch(getTagListUrl + `/${tag}`);
  const data = await response.json();

  console.log(data["data"]);
  return data["data"];
};

const Tags = () => {
  const { tagName } = useParams();

  const [tagList, setTagList] = useState([]);

  const [questions, setQuestions] = useState([]);

  function formattedDate(createdAt) {
    const date = new Date(createdAt);
    const formattedDate = `${date.getDate()} ${date.toLocaleString("default", {
      month: "short",
    })} ${date.getFullYear()}`;
    return formattedDate;
  }

  useEffect(() => {
    fetchTagList().then((data) => {
      setTagList(data);
    });

    fetchQuestionByTag(tagName).then((data) => {
      setQuestions(data);
    });
  }, [tagName]);

  return (
    <div className="flex flex-col mx-36 justify-center items-center  bg-cover ">
      <div className="h-8" />
      <div className="text-gray-600 inline-flex w-full items-start justify-start text-[0.85rem] space-x-2">
        {tagList != null &&
          tagList.length > 0 &&
          tagList.map((tag) => (
            <Link
              to={`/tag/${tag}`}
              className="flex rounded-lg p-[0.35rem] px-2 h-fit w-fit text-[#215e93] bg-[#c8dff5]"
            >
              {tag}
            </Link>
          ))}
      </div>

      {/* Leave some blank space */}
      <div className="h-8" />

      {questions.map((question) => (
        <Link
          to={`/question/${question.id}`}
          className="w-full bg-opacity-50 bg-white"
        >
          <div className="border-gray-200 shadow-md border flex flex-row gap-8 rounded-lg p-4 mb-3 relative w-full">
            <div className="flex flex-col items-end  gap-4 justify-center  mr-2  w-[1rem]">
              <button
                className="text-gray-600 hover:text-gray-800 flex  flex-row focus:outline-none focus:text-gray-800"
                aria-label="Upvote"
              >
                <img
                  src={arrrowUp}
                  className="h-5 w-5 mx-2"
                  alt="up arrow"
                ></img>

                <span className="text-xs font-medium">{question.upvotes}</span>
              </button>
              <button
                className="text-gray-600 hover:text-gray-800 flex flex-row  focus:outline-none focus:text-gray-800"
                aria-label="Downvote"
              >
                <img
                  src={arrrowDown}
                  className="h-5 w-5 mx-2"
                  alt="up arrow"
                ></img>
                <span className="text-xs font-medium">
                  {question.downvotes}
                </span>
              </button>
            </div>
            <div className="flex flex-col gap-3 mb-2 w-full">
              <div className="items-start justify-start text-start">
                <div className="flex flex-row">
                  <h2 className="text-lg font-medium text-[#2C74B3] text-bold mr-2">
                    {question.title}
                    <span
                      className={`${
                        question.status === "OPEN"
                          ? "bg-[#a6f1c6] text-[#15452a]"
                          : "bg-[#fb919d] text-[#bc3646]"
                      } pb-1  mx-2 rounded-full px-2 py-1 text-xs font-medium`}
                    >
                      {question.status}
                    </span>
                  </h2>
                </div>
                <div className="text-gray-700 mb-2">{question.description}</div>
              </div>
              <div className="text-gray-600 inline-flex w-full items-start justify-start text-[0.85rem] space-x-2">
                {question.tag != null &&
                  question.tag.length > 0 &&
                  question.tag.map((tag) => (
                    <div
                      key={tag}
                      className="flex rounded-lg p-[0.35rem] px-2 h-fit w-fit text-[#215e93] bg-[#c8dff5]"
                    >
                      {tag}
                    </div>
                  ))}
              </div>

              <div className="text-gray-600 text-end items-end justify-end text-xs absolute bottom-3 right-5">
                {question.email} • Posted on{" "}
                {formattedDate(question.created_at)}
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default Tags;
