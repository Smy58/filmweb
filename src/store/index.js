import { createStore } from 'vuex'
const url = 'https://api.themoviedb.org/3'
const apiKey = '?api_key=23b0e2d600066f0dfe8a79d11e61a4f9'
const language = 'language=ru'

export default createStore({
  state: {
    movieList: [],
    movieData: {},
    recommendations: [],
    movieVideo: [],
    movieCast: [],
    tvList: [],
    tvData: {},
    tvVideo: [],
    tvCast: [],
    tvRecommendations: [],
  },
  getters: {
    MOVIELIST(state){
      return state.movieList
    },
    MOVIEDATA(state) {
      return state.movieData
    },
    RECOMMENDATIONS(state) {
      return state.recommendations
    },
    MOVIEVIDEO(state) {
      return state.movieVideo
    },
    MOVIECAST(state) {
      return state.movieCast
    },
    TVLIST(state) {
      return state.tvList
    },
    TVDATA(state) {
      return state.tvData
    },
    TVVIDEO(state) {
      return state.tvVideo
    },
    TVCAST(state) {
      return state.tvCast
    },
    TVRECOMMENDATIONS(state) {
      return state.tvRecommendations
    },
  },
  mutations: {
    SET_MOVIE_LIST:(state, newlist) => {
      state.movieList = newlist;
    },
    SET_MOVIE:(state, mov) => {
      state.movieData = mov
    },
    SET_RECOMMENDATIONS:(state, newArr) => {
      state.recommendations = newArr
    },
    SET_MOVIE_VIDEO:(state, movVideo) => {
      // console.log(movVideo)
      state.movieVideo = movVideo
    },
    SET_MOVIE_CAST:(state, newCast) => {
      // console.log(newCast);
      state.movieCast = newCast
    },
    SET_TV_LIST:(state, newlist) => {
      // console.log(newlist);
      state.tvList = newlist
    },
    SET_TV:(state, tv) => {
      // console.log(tv);
      state.tvData = tv
    },
    SET_TV_VIDEO:(state, tvVid) => {
      // console.log(tvVid);
      state.tvVideo = tvVid
    },
    SET_TV_CAST:(state, newCast) => {
      // console.log(newCast);
      state.tvCast = newCast
    },
    SET_TV_RECOMMENDATIONS:(state, newRec) => {
      console.log(newRec);
      state.tvRecommendations = newRec
    }
  },
  actions: {
    GET_POPULAR_MOVIE_LIST_FROM_API({commit}) {
      return fetch(url + '/movie/popular' + apiKey + '&' + language)
        .then(res => res.json())
        .then(data => {
          commit('SET_MOVIE_LIST', data.results)
        })
    },
    GET_MOVIE_FROM_API({commit}, movieId) {
      return fetch(url + '/movie/' + movieId + apiKey + '&' + language)
        .then(res => res.json())
        .then(data => {
          commit('SET_MOVIE', data)
        })
    },
    GET_RECOMMENDATIONS_FROM_API({commit}, movieId) {
      return fetch(url + '/movie/' + movieId + '/recommendations' + apiKey + '&' + language)
        .then(res => res.json())
        .then(data => {
          commit('SET_RECOMMENDATIONS', data.results)
        })
    },
    GET_MOVIE_VIDEO_FROM_API({commit}, movieId) {
      return fetch(url + '/movie/' + movieId + '/videos' + apiKey + '&' + language)
        .then(res => res.json())
        .then(data => {
          commit('SET_MOVIE_VIDEO', data.results)
        })
    },
    GET_MOVIE_CAST_FROM_API({commit}, movieId) {
      return fetch(url + '/movie/' + movieId + '/credits' + apiKey + '&' + language)
        .then(res => res.json())
        .then(data => {
          commit('SET_MOVIE_CAST', data.cast)
        })
    },
    GET_POPULAR_TV_LIST_FROM_API({commit}) {
      return fetch(url + '/tv/top_rated' + apiKey + '&' + language)
        .then(res => res.json())
        .then(data => {
          commit('SET_TV_LIST', data.results)
        })
    },
    GET_TV_FROM_API({commit}, tvId) {
      return fetch(url + '/tv/' + tvId + apiKey + '&' + language)
        .then(res => res.json())
        .then(data => {
          commit('SET_TV', data)
        })
    },
    GET_TV_VIDEO_FROM_API({commit}, tvId) {
      return fetch(url + '/tv/' + tvId + '/videos' + apiKey + '&' + language)
        .then(res => res.json())
        .then(data => {
          commit('SET_TV_VIDEO', data.results)
        })
    },
    GET_TV_CAST_FROM_API({commit}, tvId) {
      return fetch(url + '/tv/' + tvId + '/credits' + apiKey + '&' + language)
        .then(res => res.json())
        .then(data => {
          commit('SET_TV_CAST', data.cast)
        })
    },
    GET_TV_RECOMMENDATIONS_FROM_API({commit}, tvId) {
      return fetch(url + '/tv/' + tvId + '/recommendations' + apiKey + '&' + language)
        .then(res => res.json())
        .then(data => {
          commit('SET_TV_RECOMMENDATIONS', data.results)
        })
    },

  },
  modules: {
  }
})
