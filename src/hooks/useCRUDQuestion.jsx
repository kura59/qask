import { useCallback, useState } from "react";
import { Auth } from "@supabase/ui";

//質問作成・更新・削除処理、テキストエリアの行可変処理用のカスタムフック branch
export const useCRUDQuestion = (
  dispatch,
  dispatchIn,
  dispatchSolved,
  question,
  onClose,
  isOpen,
  onCloseAlert,
  showMessage,
  questions,
  inQuestions,
  solvedQuestions,
  client
) => {
  const [detail, setDetail] = useState({
    title: "",
    when: "",
    what: "",
    who: "",
    task: "",
    done: "",
    image: "",
    hope: "",
    memo: "",
    status: "",
  });
  const [row, setRow] = useState({
    rowsWhat: 3,
    rowsTask: 3,
    rowsDone: 3,
    rowsImage: 3,
    rowsHope: 3,
    rowsMemo: 3,
  });

  const { user } = Auth.useUser();

  //テキストエリアの行可変処理
  const onChangeRows = (val, type) => {
    const valLength = val.split("\n").length;
    switch (type) {
      case "what":
        setDetail((prevDetail) => {
          return {
            ...prevDetail,
            what: val,
          };
        });
        setRow((prevRow) => {
          return {
            ...prevRow,
            rowsWhat: valLength > 3 ? valLength : 3,
          };
        });
        break;
      case "task":
        setDetail((prevDetail) => {
          return {
            ...prevDetail,
            task: val,
          };
        });
        setRow((prevRow) => {
          return {
            ...prevRow,
            rowsTask: valLength > 3 ? valLength : 3,
          };
        });
        break;
      case "done":
        setDetail((prevDetail) => {
          return {
            ...prevDetail,
            done: val,
          };
        });
        setRow((prevRow) => {
          return {
            ...prevRow,
            rowsDone: valLength > 3 ? valLength : 3,
          };
        });
        break;
      case "image":
        setDetail((prevDetail) => {
          return {
            ...prevDetail,
            image: val,
          };
        });
        setRow((prevRow) => {
          return {
            ...prevRow,
            rowsImage: valLength > 3 ? valLength : 3,
          };
        });
        break;
      case "hope":
        setDetail((prevDetail) => {
          return {
            ...prevDetail,
            hope: val,
          };
        });
        setRow((prevRow) => {
          return {
            ...prevRow,
            rowsHope: valLength > 3 ? valLength : 3,
          };
        });
        break;
      case "memo":
        setDetail((prevDetail) => {
          return {
            ...prevDetail,
            memo: val,
          };
        });
        setRow((prevRow) => {
          return {
            ...prevRow,
            rowsMemo: valLength > 3 ? valLength : 3,
          };
        });
        break;
    }
  };

  //ログインユーザーに紐づく情報がDBに登録されているかを参照する
  const selectQuestion = useCallback(
    async (dbName) => {
      return await client
        .from(dbName)
        .select("user_id")
        .match({ user_id: user.id });
    },
    [client, user.id]
  );

  //質問情報をユーザーに紐づけてDBに登録する
  const insertQuestion = useCallback(
    async (obj, dbName) => {
      await client.from(dbName).insert({ user_id: user.id, questions: obj });
    },
    [client, user.id]
  );

  //ユーザーに紐づくDBの質問情報を更新する
  const updateQuestion = useCallback(
    async (obj, dbName) => {
      await client
        .from(dbName)
        .update({ questions: obj })
        .match({ user_id: user.id });
    },
    [client, user.id]
  );

  //dispatchによる更新直後のstateを即時反映させて使用できなかったため、再定義用
  const redefinitionCreate = (state) => {
    if (state) {
      const state_add = [
        ...state,
        {
          id: state.slice(-1)[0].id + 1,
          ...detail,
        },
      ];
      return state_add;
    } else {
      const state_new = [
        {
          id: 1,
          ...detail,
        },
      ];
      return state_new;
    }
  };

  //dispatchによる更新直後のstateを即時反映させて使用できなかったため、再定義用
  const redefinitionUpdate = (state) => {
    const state_copy = state.slice();
    state_copy.map((q) => {
      if (q.id === question.id) {
        q.title = detail.title;
        q.when = detail.when;
        q.what = detail.what;
        q.who = detail.who;
        q.task = detail.task;
        q.done = detail.done;
        q.image = detail.image;
        q.hope = detail.hope;
        q.memo = detail.memo;
        q.status = detail.status;
      }
    });
    return state_copy;
  };

  //dispatchによる更新直後のstateを即時反映させて使用できなかったため、再定義用
  const redefinitionDelete = (state) => {
    const newState = state.filter((q) => q.id !== question.id);
    if (newState.length !== 0) {
      return newState;
    } else {
      return null;
    }
  };

  //「作成」クリック時の処理
  const onClickCreate = useCallback(async () => {
    if (detail.title === "") {
      showMessage({
        title: "タイトルを入力してください。",
        status: "error",
      });
    } else {
      switch (detail.status) {
        case "1":
          const userDataNew = await selectQuestion("question_new");
          dispatch({
            type: "CREATE",
            ...detail,
          });

          //dispatchによる更新が即時反映されないため、更新後のstateを再定義することで対応
          if (userDataNew.data.length === 0) {
            await insertQuestion(redefinitionCreate(questions), "question_new");
          } else {
            await updateQuestion(redefinitionCreate(questions), "question_new");
          }
          break;
        case "2":
          const userDataIn = await selectQuestion("question_in");
          dispatchIn({
            type: "CREATE",
            ...detail,
          });

          //dispatchによる更新が即時反映されないため、更新後のstateを再定義することで対応
          if (userDataIn.data.length === 0) {
            await insertQuestion(
              redefinitionCreate(inQuestions),
              "question_in"
            );
          } else {
            await updateQuestion(
              redefinitionCreate(inQuestions),
              "question_in"
            );
          }
          break;
        case "3":
          const userDataSolved = await selectQuestion("question_solved");
          dispatchSolved({
            type: "CREATE",
            ...detail,
          });

          //dispatchによる更新が即時反映されないため、更新後のstateを再定義することで対応
          if (userDataSolved.data.length === 0) {
            await insertQuestion(
              redefinitionCreate(solvedQuestions),
              "question_solved"
            );
          } else {
            await updateQuestion(
              redefinitionCreate(solvedQuestions),
              "question_solved"
            );
          }
          break;
      }
      setDetail((prevDetail) => {
        return {
          ...prevDetail,
          title: "",
          when: "",
          what: "",
          who: "",
          task: "",
          done: "",
          image: "",
          hope: "",
          memo: "",
          status: "1",
        };
      });
      onClose();
    }
  }, [question, detail, isOpen, questions, inQuestions, solvedQuestions]);

  //「更新」クリック時の処理
  const onClickUpdate = useCallback(async () => {
    if (detail.title === "") {
      showMessage({
        title: "タイトルを入力してください。",
        status: "error",
      });
    } else {
      switch (detail.status) {
        case "1":
          const userDataNew = await selectQuestion("question_new");
          switch (question.status) {
            case "1":
              dispatch({
                type: "UPDATE",
                id: question.id,
                ...detail,
              });
              //dispatchによる更新が即時反映されないため、更新後のstateを再定義することで対応
              await updateQuestion(
                redefinitionUpdate(questions),
                "question_new"
              );
              break;
            case "2":
              dispatchIn({
                type: "DELETE",
                id: question.id,
              });
              dispatch({
                type: "CREATE",
                ...detail,
              });
              //dispatchによる更新が即時反映されないため、更新後のstateを再定義することで対応
              await updateQuestion(
                redefinitionDelete(inQuestions),
                "question_in"
              );
              if (userDataNew.data.length === 0) {
                await insertQuestion(
                  redefinitionCreate(questions),
                  "question_new"
                );
              } else {
                await updateQuestion(
                  redefinitionCreate(questions),
                  "question_new"
                );
              }
              break;
            case "3":
              dispatchSolved({
                type: "DELETE",
                id: question.id,
              });
              dispatch({
                type: "CREATE",
                ...detail,
              });
              //dispatchによる更新が即時反映されないため、更新後のstateを再定義することで対応
              await updateQuestion(
                redefinitionDelete(solvedQuestions),
                "question_solved"
              );
              if (userDataNew.data.length === 0) {
                await insertQuestion(
                  redefinitionCreate(questions),
                  "question_new"
                );
              } else {
                await updateQuestion(
                  redefinitionCreate(questions),
                  "question_new"
                );
              }
              break;
          }
          break;
        case "2":
          const userDataIn = await selectQuestion("question_in");
          switch (question.status) {
            case "2":
              dispatchIn({
                type: "UPDATE",
                id: question.id,
                ...detail,
              });
              //dispatchによる更新が即時反映されないため、更新後のstateを再定義することで対応
              await updateQuestion(
                redefinitionUpdate(inQuestions),
                "question_in"
              );
              break;
            case "1":
              dispatch({
                type: "DELETE",
                id: question.id,
              });
              dispatchIn({
                type: "CREATE",
                ...detail,
              });
              //dispatchによる更新が即時反映されないため、更新後のstateを再定義することで対応
              await updateQuestion(
                redefinitionDelete(questions),
                "question_new"
              );
              if (userDataIn.data.length === 0) {
                await insertQuestion(
                  redefinitionCreate(inQuestions),
                  "question_in"
                );
              } else {
                await updateQuestion(
                  redefinitionCreate(inQuestions),
                  "question_in"
                );
              }
              break;
            case "3":
              dispatchSolved({
                type: "DELETE",
                id: question.id,
              });
              dispatchIn({
                type: "CREATE",
                ...detail,
              });
              //dispatchによる更新が即時反映されないため、更新後のstateを再定義することで対応
              await updateQuestion(
                redefinitionDelete(solvedQuestions),
                "question_solved"
              );
              if (userDataIn.data.length === 0) {
                await insertQuestion(
                  redefinitionCreate(inQuestions),
                  "question_in"
                );
              } else {
                await updateQuestion(
                  redefinitionCreate(inQuestions),
                  "question_in"
                );
              }
              break;
          }
          break;
        case "3":
          const userDataSolved = await selectQuestion("question_solved");
          switch (question.status) {
            case "3":
              dispatchSolved({
                type: "UPDATE",
                id: question.id,
                ...detail,
              });
              //dispatchによる更新が即時反映されないため、更新後のstateを再定義することで対応
              await updateQuestion(
                redefinitionUpdate(solvedQuestions),
                "question_solved"
              );
              break;
            case "1":
              dispatch({
                type: "DELETE",
                id: question.id,
              });
              dispatchSolved({
                type: "CREATE",
                ...detail,
              });
              //dispatchによる更新が即時反映されないため、更新後のstateを再定義することで対応
              await updateQuestion(
                redefinitionDelete(questions),
                "question_new"
              );
              if (userDataSolved.data.length === 0) {
                await insertQuestion(
                  redefinitionCreate(solvedQuestions),
                  "question_solved"
                );
              } else {
                await updateQuestion(
                  redefinitionCreate(solvedQuestions),
                  "question_solved"
                );
              }
              break;
            case "2":
              dispatchIn({
                type: "DELETE",
                id: question.id,
              });
              dispatchSolved({
                type: "CREATE",
                ...detail,
              });
              //dispatchによる更新が即時反映されないため、更新後のstateを再定義することで対応
              await updateQuestion(
                redefinitionDelete(inQuestions),
                "question_in"
              );
              if (userDataSolved.data.length === 0) {
                await insertQuestion(
                  redefinitionCreate(solvedQuestions),
                  "question_solved"
                );
              } else {
                await updateQuestion(
                  redefinitionCreate(solvedQuestions),
                  "question_solved"
                );
              }
              break;
          }
          break;
      }
      onClose();
    }
  }, [question, detail, isOpen, questions, inQuestions, solvedQuestions]);

  //削除アイコンクリックして、「削除」クリック時の処理
  const onClickDelete = useCallback(async () => {
    switch (detail.status) {
      case "1":
        dispatch({
          type: "DELETE",
          id: question.id,
        });
        //dispatchによる更新が即時反映されないため、更新後のstateを再定義することで対応
        await updateQuestion(redefinitionDelete(questions), "question_new");
        break;
      case "2":
        dispatchIn({
          type: "DELETE",
          id: question.id,
        });
        //dispatchによる更新が即時反映されないため、更新後のstateを再定義することで対応
        await updateQuestion(redefinitionDelete(inQuestions), "question_in");
        break;
      case "3":
        dispatchSolved({
          type: "DELETE",
          id: question.id,
        });
        //dispatchによる更新が即時反映されないため、更新後のstateを再定義することで対応
        await updateQuestion(
          redefinitionDelete(solvedQuestions),
          "question_solved"
        );
        break;
    }
    onCloseAlert();
    onClose();
  }, [question, detail, isOpen, questions, inQuestions, solvedQuestions]);

  return {
    detail,
    setDetail,
    row,
    setRow,
    onChangeRows,
    onClickCreate,
    onClickUpdate,
    onClickDelete,
  };
};
