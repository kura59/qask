// stateとactionを受け取り、actionのtypeによってstateの更新方法を変える
export const QuestionReducer = (state, action) => {
  switch (action.type) {
    // case "SELECT":
    //   return action.data;
    case "CREATE":
      action.setTitle("");
      action.setWhen("");
      action.setWhere("");
      action.setWho("");
      action.setWhat("");
      action.setWhy("");
      action.setHow("");
      action.setStatus("1");
      if (state) {
        const state_add = [
          ...state,
          {
            id: state.slice(-1)[0].id + 1,
            title: action.title,
            when: action.when,
            where: action.where,
            who: action.who,
            what: action.what,
            why: action.why,
            how: action.how,
            status: action.status,
          },
        ];
        // switch (action.qType) {
        //   case "new":
        //     await client
        //       .from("question_new")
        //       .update({ questions: state_add })
        //       .match({ user_id: action.userId });
        //     break;
        //   case "in":
        //     await client
        //       .from("question_in")
        //       .update({ questions: state_add })
        //       .match({ user_id: action.userId });
        //     break;
        //   case "new":
        //     await client
        //       .from("question_solved")
        //       .update({ questions: state_add })
        //       .match({ user_id: action.userId });
        //     break;
        //   default:
        //     break;
        // }
        return state_add;
      } else {
        const state_new = [
          {
            id: 1,
            title: action.title,
            when: action.when,
            where: action.where,
            who: action.who,
            what: action.what,
            why: action.why,
            how: action.how,
            status: action.status,
          },
        ];
        // switch (action.qType) {
        //   case "new":
        //     await client
        //       .from("question_new")
        //       .insert({ user_id: action.userId, questions: state_new });
        //     break;
        //   case "in":
        //     await client
        //       .from("question_in")
        //       .insert({ user_id: action.userId, questions: state_new });
        //     break;
        //   case "new":
        //     await client
        //       .from("question_solved")
        //       .insert({ user_id: action.userId, questions: state_new });
        //     break;
        //   default:
        //     break;
        // }
        return state_new;
      }
    case "UPDATE":
      const state_copy = state.slice();
      state_copy.map((q) => {
        if (q.id === action.id) {
          q.title = action.title;
          q.when = action.when;
          q.where = action.where;
          q.who = action.who;
          q.what = action.what;
          q.why = action.why;
          q.how = action.how;
          q.status = action.status;
        }
      });
      // switch (action.qType) {
      //   case "new":
      //     await client
      //       .from("question_new")
      //       .update({ questions: state_copy })
      //       .match({ user_id: action.userId });
      //     break;
      //   case "in":
      //     await client
      //       .from("question_in")
      //       .update({ questions: state_copy })
      //       .match({ user_id: action.userId });
      //     break;
      //   case "new":
      //     await client
      //       .from("question_solved")
      //       .update({ questions: state_copy })
      //       .match({ user_id: action.userId });
      //     break;
      //   default:
      //     break;
      // }
      return state_copy;
    case "DELETE":
      const newState = state.filter((q) => q.id !== action.id);
      // switch (action.qType) {
      //   case "new":
      //     await client
      //       .from("question_new")
      //       .update({ questions: newState })
      //       .match({ user_id: action.userId });
      //     break;
      //   case "in":
      //     await client
      //       .from("question_in")
      //       .update({ questions: newState })
      //       .match({ user_id: action.userId });
      //     break;
      //   case "new":
      //     await client
      //       .from("question_solved")
      //       .update({ questions: newState })
      //       .match({ user_id: action.userId });
      //     break;
      //   default:
      //     break;
      // }
      if (newState.length !== 0) {
        return newState;
      } else {
        return null;
      }
  }
};
