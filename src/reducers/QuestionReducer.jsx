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
            what: action.what,
            who: action.who,
            task: action.task,
            done: action.done,
            image: action.image,
            hope: action.hope,
            memo: action.memo,
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
            what: action.what,
            who: action.who,
            task: action.task,
            done: action.done,
            image: action.image,
            hope: action.hope,
            memo: action.memo,
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
          q.what = action.what;
          q.who = action.who;
          q.task = action.task;
          q.done = action.done;
          q.image = action.image;
          q.hope = action.hope;
          q.memo = action.memo;
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
