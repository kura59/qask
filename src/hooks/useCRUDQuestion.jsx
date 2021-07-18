import { useCallback, useState } from "react";

//質問作成・更新・削除処理、テキストエリアの行可変処理用のカスタムフック
export const useCRUDQuestion = (
  dispatch,
  dispatchIn,
  dispatchSolved,
  question,
  onClose,
  isOpen,
  onCloseAlert,
  showMessage
) => {
  const [title, setTitle] = useState("");
  const [when, setWhen] = useState("");
  const [where, setWhere] = useState("");
  const [who, setWho] = useState("");
  const [what, setWhat] = useState("");
  const [why, setWhy] = useState("");
  const [how, setHow] = useState("");
  const [status, setStatus] = useState("");
  const [rowsWhere, setRowsWhere] = useState();
  const [rowsWhat, setRowsWhat] = useState();
  const [rowsWhy, setRowsWhy] = useState();
  const [rowsHow, setRowsHow] = useState();

  const onChangeRows = (val, type) => {
    const valLength = val.split("\n").length;
    switch (type) {
      case "where":
        setWhere(val);
        valLength > 3 ? setRowsWhere(valLength) : setRowsWhere(3);
        break;
      case "what":
        setWhat(val);
        valLength > 3 ? setRowsWhat(valLength) : setRowsWhat(3);
        break;
      case "why":
        setWhy(val);
        valLength > 3 ? setRowsWhy(valLength) : setRowsWhy(3);
        break;
      case "how":
        setHow(val);
        valLength > 3 ? setRowsHow(valLength) : setRowsHow(3);
        break;
    }
  };

  const onClickCreate = useCallback(() => {
    if (title === "") {
      showMessage({
        title: "タイトルを入力してください。",
        status: "error",
      });
    } else {
      switch (status) {
        case "1":
          dispatch({
            type: "CREATE",
            // qType: "new",
            // userId: user.id,
            title: title,
            when: when,
            where: where,
            who: who,
            what: what,
            why: why,
            how: how,
            status: status,
            setTitle: setTitle,
            setWhen: setWhen,
            setWhere: setWhere,
            setWho: setWho,
            setWhat: setWhat,
            setWhy: setWhy,
            setHow: setHow,
            setStatus: setStatus,
          });
          break;
        case "2":
          dispatchIn({
            type: "CREATE",
            // qType: "in",
            // userId: user.id,
            title: title,
            when: when,
            where: where,
            who: who,
            what: what,
            why: why,
            how: how,
            status: status,
            setTitle: setTitle,
            setWhen: setWhen,
            setWhere: setWhere,
            setWho: setWho,
            setWhat: setWhat,
            setWhy: setWhy,
            setHow: setHow,
            setStatus: setStatus,
          });
          break;
        case "3":
          dispatchSolved({
            type: "CREATE",
            // qType: "solved",
            // userId: user.id,
            title: title,
            when: when,
            where: where,
            who: who,
            what: what,
            why: why,
            how: how,
            status: status,
            setTitle: setTitle,
            setWhen: setWhen,
            setWhere: setWhere,
            setWho: setWho,
            setWhat: setWhat,
            setWhy: setWhy,
            setHow: setHow,
            setStatus: setStatus,
          });
          break;
      }
      onClose();
    }
  }, [question, title, when, where, who, what, why, how, status, isOpen]);

  const onClickUpdate = useCallback(() => {
    if (title === "") {
      showMessage({
        title: "タイトルを入力してください。",
        status: "error",
      });
    } else {
      switch (status) {
        case "1":
          switch (question.status) {
            case "1":
              dispatch({
                type: "UPDATE",
                // qType: "new",
                // userId: user.id,
                id: question.id,
                title: title,
                when: when,
                where: where,
                who: who,
                what: what,
                why: why,
                how: how,
                status: status,
              });
              break;
            case "2":
              dispatchIn({
                type: "DELETE",
                // qType: "in",
                // userId: user.id,
                id: question.id,
              });
              dispatch({
                type: "CREATE",
                // qType: "new",
                // userId: user.id,
                title: title,
                when: when,
                where: where,
                who: who,
                what: what,
                why: why,
                how: how,
                status: status,
                setTitle: setTitle,
                setWhen: setWhen,
                setWhere: setWhere,
                setWho: setWho,
                setWhat: setWhat,
                setWhy: setWhy,
                setHow: setHow,
                setStatus: setStatus,
              });
              break;
            case "3":
              dispatchSolved({
                type: "DELETE",
                // qType: "solved",
                // userId: user.id,
                id: question.id,
              });
              dispatch({
                type: "CREATE",
                // qType: "new",
                // userId: user.id,
                title: title,
                when: when,
                where: where,
                who: who,
                what: what,
                why: why,
                how: how,
                status: status,
                setTitle: setTitle,
                setWhen: setWhen,
                setWhere: setWhere,
                setWho: setWho,
                setWhat: setWhat,
                setWhy: setWhy,
                setHow: setHow,
                setStatus: setStatus,
              });
              break;
          }
          break;
        case "2":
          switch (question.status) {
            case "2":
              dispatchIn({
                type: "UPDATE",
                // qType: "in",
                // userId: user.id,
                id: question.id,
                title: title,
                when: when,
                where: where,
                who: who,
                what: what,
                why: why,
                how: how,
                status: status,
              });
              break;
            case "1":
              dispatch({
                type: "DELETE",
                // qType: "new",
                // userId: user.id,
                id: question.id,
              });
              dispatchIn({
                type: "CREATE",
                // qType: "in",
                // userId: user.id,
                title: title,
                when: when,
                where: where,
                who: who,
                what: what,
                why: why,
                how: how,
                status: status,
                setTitle: setTitle,
                setWhen: setWhen,
                setWhere: setWhere,
                setWho: setWho,
                setWhat: setWhat,
                setWhy: setWhy,
                setHow: setHow,
                setStatus: setStatus,
              });
              break;
            case "3":
              dispatchSolved({
                type: "DELETE",
                // qType: "solved",
                // userId: user.id,
                id: question.id,
              });
              dispatchIn({
                type: "CREATE",
                // qType: "in",
                // userId: user.id,
                title: title,
                when: when,
                where: where,
                who: who,
                what: what,
                why: why,
                how: how,
                status: status,
                setTitle: setTitle,
                setWhen: setWhen,
                setWhere: setWhere,
                setWho: setWho,
                setWhat: setWhat,
                setWhy: setWhy,
                setHow: setHow,
                setStatus: setStatus,
              });
              break;
          }
          break;
        case "3":
          switch (question.status) {
            case "3":
              dispatchSolved({
                type: "UPDATE",
                // qType: "solved",
                // userId: user.id,
                id: question.id,
                title: title,
                when: when,
                where: where,
                who: who,
                what: what,
                why: why,
                how: how,
                status: status,
              });
              break;
            case "1":
              dispatch({
                type: "DELETE",
                // qType: "new",
                // userId: user.id,
                id: question.id,
              });
              dispatchSolved({
                type: "CREATE",
                // qType: "solved",
                // userId: user.id,
                title: title,
                when: when,
                where: where,
                who: who,
                what: what,
                why: why,
                how: how,
                status: status,
                setTitle: setTitle,
                setWhen: setWhen,
                setWhere: setWhere,
                setWho: setWho,
                setWhat: setWhat,
                setWhy: setWhy,
                setHow: setHow,
                setStatus: setStatus,
              });
              break;
            case "2":
              dispatchIn({
                type: "DELETE",
                // qType: "in",
                // userId: user.id,
                id: question.id,
              });
              dispatchSolved({
                type: "CREATE",
                // qType: "solved",
                // userId: user.id,
                title: title,
                when: when,
                where: where,
                who: who,
                what: what,
                why: why,
                how: how,
                status: status,
                setTitle: setTitle,
                setWhen: setWhen,
                setWhere: setWhere,
                setWho: setWho,
                setWhat: setWhat,
                setWhy: setWhy,
                setHow: setHow,
                setStatus: setStatus,
              });
              break;
          }
          break;
      }
      onClose();
    }
  }, [question, title, when, where, who, what, why, how, status, isOpen]);

  const onClickDelete = () => {
    switch (status) {
      case "1":
        dispatch({
          type: "DELETE",
          // qType: "new",
          // userId: user.id,
          id: question.id,
        });
        break;
      case "2":
        dispatchIn({
          type: "DELETE",
          // qType: "in",
          // userId: user.id,
          id: question.id,
        });
        break;
      case "3":
        dispatchSolved({
          type: "DELETE",
          // qType: "solved",
          // userId: user.id,
          id: question.id,
        });
        break;
    }
    onCloseAlert();
    onClose();
  };

  return {
    title,
    when,
    where,
    who,
    what,
    why,
    how,
    status,
    rowsWhere,
    rowsWhat,
    rowsWhy,
    rowsHow,
    setTitle,
    setWhen,
    setWhere,
    setWho,
    setWhat,
    setWhy,
    setHow,
    setStatus,
    setRowsWhere,
    setRowsWhat,
    setRowsWhy,
    setRowsHow,
    onChangeRows,
    onClickCreate,
    onClickUpdate,
    onClickDelete,
  };
};
