// stateとactionを受け取り、actionのtypeによってstateの更新方法を変える
export const QuestionReducer = (state, action) => {
  switch (action.type) {
    case "SELECT":
      return action.data;
    case "CREATE":
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
      return state_copy;
    case "DELETE":
      const newState = state.filter((q) => q.id !== action.id);
      if (newState.length !== 0) {
        return newState;
      } else {
        return null;
      }
  }
};
