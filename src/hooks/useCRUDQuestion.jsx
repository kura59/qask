import { useCallback, useState } from "react";
import { Auth } from "@supabase/ui";

//質問作成・更新・削除処理、テキストエリアの行可変処理用のカスタムフック
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
  const [title, setTitle] = useState("");
  const [when, setWhen] = useState("");
  const [what, setWhat] = useState("");
  const [who, setWho] = useState("");
  const [task, setTask] = useState("");
  const [done, setDone] = useState("");
  const [image, setImage] = useState("");
  const [hope, setHope] = useState("");
  const [memo, setMemo] = useState("");
  const [status, setStatus] = useState("");
  const [rowsWhat, setRowsWhat] = useState();
  const [rowsTask, setRowsTask] = useState();
  const [rowsDone, setRowsDone] = useState();
  const [rowsImage, setRowsImage] = useState();
  const [rowsHope, setRowsHope] = useState();
  const [rowsMemo, setRowsMemo] = useState();

  const { user } = Auth.useUser();

  //テキストエリアの行可変処理
  const onChangeRows = (val, type) => {
    const valLength = val.split("\n").length;
    switch (type) {
      case "what":
        setWhat(val);
        valLength > 3 ? setRowsWhat(valLength) : setRowsWhat(3);
        break;
      case "task":
        setTask(val);
        valLength > 3 ? setRowsTask(valLength) : setRowsTask(3);
        break;
      case "done":
        setDone(val);
        valLength > 3 ? setRowsDone(valLength) : setRowsDone(3);
        break;
      case "image":
        setImage(val);
        valLength > 3 ? setRowsImage(valLength) : setRowsImage(3);
        break;
      case "hope":
        setHope(val);
        valLength > 3 ? setRowsHope(valLength) : setRowsHope(3);
        break;
      case "memo":
        setMemo(val);
        valLength > 3 ? setRowsMemo(valLength) : setRowsMemo(3);
        break;
    }
  };

  //ログインユーザーに紐づく情報がDBに登録されているかを参照する
  const selectNewQuestion = useCallback(async () => {
    return await client
      .from("question_new")
      .select("user_id")
      .match({ user_id: user.id });
  }, []);

  //ログインユーザーに紐づく情報がDBに登録されているかを参照する
  const selectInQuestion = useCallback(async () => {
    return await client
      .from("question_in")
      .select("user_id")
      .match({ user_id: user.id });
  }, []);

  //ログインユーザーに紐づく情報がDBに登録されているかを参照する
  const selectSolvedQuestion = useCallback(async () => {
    return await client
      .from("question_solved")
      .select("user_id")
      .match({ user_id: user.id });
  }, []);

  //質問情報をユーザーに紐づけてDBに登録する
  const insertNewQuestion = useCallback(
    async (obj) => {
      await client
        .from("question_new")
        .insert({ user_id: user.id, questions: obj });
    },
    [questions]
  );

  //質問情報をユーザーに紐づけてDBに登録する
  const insertInQuestion = useCallback(
    async (obj) => {
      await client
        .from("question_in")
        .insert({ user_id: user.id, questions: obj });
    },
    [inQuestions]
  );

  //質問情報をユーザーに紐づけてDBに登録する
  const insertSolvedQuestion = useCallback(
    async (obj) => {
      await client
        .from("question_solved")
        .insert({ user_id: user.id, questions: obj });
    },
    [solvedQuestions]
  );

  //ユーザーに紐づくDBの質問情報を更新する
  const updateNewQuestion = useCallback(
    async (obj) => {
      await client
        .from("question_new")
        .update({ questions: obj })
        .match({ user_id: user.id });
    },
    [questions]
  );

  //ユーザーに紐づくDBの質問情報を更新する
  const updateInQuestion = useCallback(
    async (obj) => {
      await client
        .from("question_in")
        .update({ questions: obj })
        .match({ user_id: user.id });
    },
    [inQuestions]
  );

  //ユーザーに紐づくDBの質問情報を更新する
  const updateSolvedQuestion = useCallback(
    async (obj) => {
      await client
        .from("question_solved")
        .update({ questions: obj })
        .match({ user_id: user.id });
    },
    [solvedQuestions]
  );

  //dispatchによる更新直後のstateを即時反映させて使用できなかったため、再定義用
  const redefinitionCreate = (state) => {
    if (state) {
      const state_add = [
        ...state,
        {
          id: state.slice(-1)[0].id + 1,
          title: title,
          when: when,
          what: what,
          who: who,
          task: task,
          done: done,
          image: image,
          hope: hope,
          memo: memo,
          status: status,
        },
      ];
      return state_add;
    } else {
      const state_new = [
        {
          id: 1,
          title: title,
          when: when,
          what: what,
          who: who,
          task: task,
          done: done,
          image: image,
          hope: hope,
          memo: memo,
          status: status,
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
        q.title = title;
        q.when = when;
        q.what = what;
        q.who = who;
        q.task = task;
        q.done = done;
        q.image = image;
        q.hope = hope;
        q.memo = memo;
        q.status = status;
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
    if (title === "") {
      showMessage({
        title: "タイトルを入力してください。",
        status: "error",
      });
    } else {
      switch (status) {
        case "1":
          const userDataNew = await selectNewQuestion();
          dispatch({
            type: "CREATE",
            title: title,
            when: when,
            what: what,
            who: who,
            task: task,
            done: done,
            image: image,
            hope: hope,
            memo: memo,
            status: status,
          });

          //dispatchによる更新が即時反映されないため、更新後のstateを再定義することで対応
          if (userDataNew.data.length === 0) {
            await insertNewQuestion(redefinitionCreate(questions));
          } else {
            await updateNewQuestion(redefinitionCreate(questions));
          }
          break;
        case "2":
          const userDataIn = await selectInQuestion();
          dispatchIn({
            type: "CREATE",
            title: title,
            when: when,
            what: what,
            who: who,
            task: task,
            done: done,
            image: image,
            hope: hope,
            memo: memo,
            status: status,
          });

          //dispatchによる更新が即時反映されないため、更新後のstateを再定義することで対応
          if (userDataIn.data.length === 0) {
            await insertInQuestion(redefinitionCreate(inQuestions));
          } else {
            await updateInQuestion(redefinitionCreate(inQuestions));
          }
          break;
        case "3":
          const userDataSolved = await selectSolvedQuestion();
          dispatchSolved({
            type: "CREATE",
            title: title,
            when: when,
            what: what,
            who: who,
            task: task,
            done: done,
            image: image,
            hope: hope,
            memo: memo,
            status: status,
          });

          //dispatchによる更新が即時反映されないため、更新後のstateを再定義することで対応
          if (userDataSolved.data.length === 0) {
            await insertSolvedQuestion(redefinitionCreate(solvedQuestions));
          } else {
            await updateSolvedQuestion(redefinitionCreate(solvedQuestions));
          }
          break;
      }
      setTitle("");
      setWhen("");
      setWhat("");
      setWho("");
      setTask("");
      setDone("");
      setImage("");
      setHope("");
      setMemo("");
      setStatus("1");
      onClose();
    }
  }, [
    question,
    title,
    when,
    what,
    who,
    task,
    done,
    image,
    hope,
    memo,
    status,
    isOpen,
    questions,
    inQuestions,
    solvedQuestions,
  ]);

  //「更新」クリック時の処理
  const onClickUpdate = useCallback(async () => {
    if (title === "") {
      showMessage({
        title: "タイトルを入力してください。",
        status: "error",
      });
    } else {
      switch (status) {
        case "1":
          const userDataNew = await selectNewQuestion();
          switch (question.status) {
            case "1":
              dispatch({
                type: "UPDATE",
                id: question.id,
                title: title,
                when: when,
                what: what,
                who: who,
                task: task,
                done: done,
                image: image,
                hope: hope,
                memo: memo,
                status: status,
              });
              //dispatchによる更新が即時反映されないため、更新後のstateを再定義することで対応
              await updateNewQuestion(redefinitionUpdate(questions));
              break;
            case "2":
              dispatchIn({
                type: "DELETE",
                id: question.id,
              });
              dispatch({
                type: "CREATE",
                title: title,
                when: when,
                what: what,
                who: who,
                task: task,
                done: done,
                image: image,
                hope: hope,
                memo: memo,
                status: status,
              });
              //dispatchによる更新が即時反映されないため、更新後のstateを再定義することで対応
              await updateInQuestion(redefinitionDelete(inQuestions));
              if (userDataNew.data.length === 0) {
                await insertNewQuestion(redefinitionCreate(questions));
              } else {
                await updateNewQuestion(redefinitionCreate(questions));
              }
              break;
            case "3":
              dispatchSolved({
                type: "DELETE",
                id: question.id,
              });
              dispatch({
                type: "CREATE",
                title: title,
                when: when,
                what: what,
                who: who,
                task: task,
                done: done,
                image: image,
                hope: hope,
                memo: memo,
                status: status,
              });
              //dispatchによる更新が即時反映されないため、更新後のstateを再定義することで対応
              await updateSolvedQuestion(redefinitionDelete(solvedQuestions));
              if (userDataNew.data.length === 0) {
                await insertNewQuestion(redefinitionCreate(questions));
              } else {
                await updateNewQuestion(redefinitionCreate(questions));
              }
              break;
          }
          break;
        case "2":
          const userDataIn = await selectInQuestion();
          switch (question.status) {
            case "2":
              dispatchIn({
                type: "UPDATE",
                id: question.id,
                title: title,
                when: when,
                what: what,
                who: who,
                task: task,
                done: done,
                image: image,
                hope: hope,
                memo: memo,
                status: status,
              });
              //dispatchによる更新が即時反映されないため、更新後のstateを再定義することで対応
              await updateInQuestion(redefinitionUpdate(inQuestions));
              break;
            case "1":
              dispatch({
                type: "DELETE",
                id: question.id,
              });
              dispatchIn({
                type: "CREATE",
                title: title,
                when: when,
                what: what,
                who: who,
                task: task,
                done: done,
                image: image,
                hope: hope,
                memo: memo,
                status: status,
              });
              //dispatchによる更新が即時反映されないため、更新後のstateを再定義することで対応
              await updateNewQuestion(redefinitionDelete(questions));
              if (userDataIn.data.length === 0) {
                await insertInQuestion(redefinitionCreate(inQuestions));
              } else {
                await updateInQuestion(redefinitionCreate(inQuestions));
              }
              break;
            case "3":
              dispatchSolved({
                type: "DELETE",
                id: question.id,
              });
              dispatchIn({
                type: "CREATE",
                title: title,
                when: when,
                what: what,
                who: who,
                task: task,
                done: done,
                image: image,
                hope: hope,
                memo: memo,
                status: status,
              });
              //dispatchによる更新が即時反映されないため、更新後のstateを再定義することで対応
              await updateSolvedQuestion(redefinitionDelete(solvedQuestions));
              if (userDataIn.data.length === 0) {
                await insertInQuestion(redefinitionCreate(inQuestions));
              } else {
                await updateInQuestion(redefinitionCreate(inQuestions));
              }
              break;
          }
          break;
        case "3":
          const userDataSolved = await selectSolvedQuestion();
          switch (question.status) {
            case "3":
              dispatchSolved({
                type: "UPDATE",
                id: question.id,
                title: title,
                when: when,
                what: what,
                who: who,
                task: task,
                done: done,
                image: image,
                hope: hope,
                memo: memo,
                status: status,
              });
              //dispatchによる更新が即時反映されないため、更新後のstateを再定義することで対応
              await updateSolvedQuestion(redefinitionUpdate(solvedQuestions));
              break;
            case "1":
              dispatch({
                type: "DELETE",
                id: question.id,
              });
              dispatchSolved({
                type: "CREATE",
                title: title,
                when: when,
                what: what,
                who: who,
                task: task,
                done: done,
                image: image,
                hope: hope,
                memo: memo,
                status: status,
              });
              //dispatchによる更新が即時反映されないため、更新後のstateを再定義することで対応
              await updateNewQuestion(redefinitionDelete(questions));
              if (userDataSolved.data.length === 0) {
                await insertSolvedQuestion(redefinitionCreate(solvedQuestions));
              } else {
                await updateSolvedQuestion(redefinitionCreate(solvedQuestions));
              }
              break;
            case "2":
              dispatchIn({
                type: "DELETE",
                id: question.id,
              });
              dispatchSolved({
                type: "CREATE",
                title: title,
                when: when,
                what: what,
                who: who,
                task: task,
                done: done,
                image: image,
                hope: hope,
                memo: memo,
                status: status,
              });
              //dispatchによる更新が即時反映されないため、更新後のstateを再定義することで対応
              await updateInQuestion(redefinitionDelete(inQuestions));
              if (userDataSolved.data.length === 0) {
                await insertSolvedQuestion(redefinitionCreate(solvedQuestions));
              } else {
                await updateSolvedQuestion(redefinitionCreate(solvedQuestions));
              }
              break;
          }
          break;
      }
      // setTitle("");
      // setWhen("");
      // setWhat("");
      // setWho("");
      // setTask("");
      // setDone("");
      // setImage("");
      // setHope("");
      // setMemo("");
      // setStatus("1");
      onClose();
    }
  }, [
    question,
    title,
    when,
    what,
    who,
    task,
    done,
    image,
    hope,
    memo,
    status,
    isOpen,
    questions,
    inQuestions,
    solvedQuestions,
  ]);

  //削除アイコンクリックして、「削除」クリック時の処理
  const onClickDelete = useCallback(async () => {
    switch (status) {
      case "1":
        dispatch({
          type: "DELETE",
          id: question.id,
        });
        //dispatchによる更新が即時反映されないため、更新後のstateを再定義することで対応
        await updateNewQuestion(redefinitionDelete(questions));
        break;
      case "2":
        dispatchIn({
          type: "DELETE",
          id: question.id,
        });
        //dispatchによる更新が即時反映されないため、更新後のstateを再定義することで対応
        await updateInQuestion(redefinitionDelete(inQuestions));
        break;
      case "3":
        dispatchSolved({
          type: "DELETE",
          id: question.id,
        });
        //dispatchによる更新が即時反映されないため、更新後のstateを再定義することで対応
        await updateSolvedQuestion(redefinitionDelete(solvedQuestions));
        break;
    }
    onCloseAlert();
    onClose();
  }, [
    question,
    title,
    when,
    what,
    who,
    task,
    done,
    image,
    hope,
    memo,
    status,
    isOpen,
    questions,
    inQuestions,
    solvedQuestions,
  ]);

  return {
    title,
    when,
    what,
    who,
    task,
    done,
    image,
    hope,
    memo,
    status,
    rowsWhat,
    rowsTask,
    rowsDone,
    rowsImage,
    rowsHope,
    rowsMemo,
    setTitle,
    setWhen,
    setWhat,
    setWho,
    setTask,
    setDone,
    setImage,
    setHope,
    setMemo,
    setStatus,
    setRowsWhat,
    setRowsTask,
    setRowsDone,
    setRowsImage,
    setRowsHope,
    setRowsMemo,
    onChangeRows,
    onClickCreate,
    onClickUpdate,
    onClickDelete,
  };
};
