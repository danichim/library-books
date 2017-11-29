const actions = {
  addBook: ({ commit }, book) => commit('addBook', book),
  deleteBook: ({ commit }) => commit('deleteBook'),
}


export default actions;