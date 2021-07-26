import axios from "axios";
import router from "../router/index";
const apiKey = process.env.VUE_APP_API_KEY;
const lang = "zh-TW";
const API = axios.create({
    baseURL: `https://api.themoviedb.org/3`,
    headers: { "Content-Type": "application/json" },
});
API.interceptors.response.use(
    function(response) {
        return response;
    },
    function(error) {
        if (error.response) {
            router.push("/");
        }
        return Promise.reject(error);
    }
);
const getPopular = async() => {
    try {
        const res = await API.get(
            `/movie/popular?api_key=${apiKey}&language=${lang}&page=1`
        );
        return res.data;
    } catch (err) {
        throw new Error(err);
    }
};
const getUpComing = async() => {
    try {
        const res = await API.get(
            `/movie/upcoming?api_key=${apiKey}&language=${lang}&page=1`
        );
        return res.data;
    } catch (err) {
        throw new Error(err);
    }
};
const getGenres = async() => {
    try {
        const res = await API.get(
            `/genre/movie/list?api_key=${apiKey}&language=${lang}
            `
        );
        return res.data;
    } catch (err) {
        throw new Error(err);
    }
};
const getMovieDetails = async(movie_id) => {
    try {
        const res = await API.get(
            `/movie/${movie_id}?api_key=${apiKey}&language=${lang}`
        );
        return res.data;
    } catch (err) {
        throw new Error(err);
    }
};
const getMovieActors = async(movie_id) => {
    try {
        const res = await API.get(
            `/movie/${movie_id}/credits?api_key=${apiKey}&language=${lang}`
        );
        return res.data;
    } catch (err) {
        throw new Error(err);
    }
};
const getMovieImages = async(movie_id) => {
    try {
        const res = await API.get(`/movie/${movie_id}/images?api_key=${apiKey}`);
        return res.data;
    } catch (err) {
        throw new Error(err);
    }
};
const getActorDetails = async(actor_id) => {
    try {
        const res = await API.get(
            `/person/${actor_id}?api_key=${apiKey}&language=en`
        );
        return res.data;
    } catch (err) {
        throw new Error(err);
    }
};
const getActorMovies = async(actor_id) => {
    try {
        const res = await API.get(
            `/person/${actor_id}/movie_credits?api_key=${apiKey}&language=${lang}`
        );
        return res.data;
    } catch (err) {
        throw new Error(err);
    }
};
const getActorImages = async(actor_id) => {
    try {
        const res = await API.get(
            `/person/${actor_id}/tagged_images?api_key=${apiKey}&language=${lang}&page-1`
        );
        return res.data;
    } catch (err) {
        throw new Error(err);
    }
};
const getExternalId = async(actor_id) => {
    try {
        const res = await API.get(
            `/person/${actor_id}/external_ids?api_key=${apiKey}&language=${lang}`
        );
        return res.data;
    } catch (err) {
        throw new Error(err);
    }
};

function removeEmpty(obj) {
    for (var propName in obj) {
        if (obj[propName] === null || obj[propName] === undefined) {
            delete obj[propName];
        }
    }
    return obj;
}
const searchMoviess = async(search) => {
    try {
        let queryString = Object.keys(removeEmpty(search))
            .map((key) => key + "=" + search[key])
            .join("&");
        const res = await API.get(
            `/discover/movie?api_key=${apiKey}&language=${lang}&include_adult=false&include_video=false&page=1&with_watch_monetization_types=flatrate&${queryString}`
        );
        return res.data;
    } catch (err) {
        throw new Error(err);
    }
};
const searchMovies = async(keyword, page) => {
    try {
        const res = await API.get(
            `/search/movie?api_key=${apiKey}&language=${lang}&query=${keyword}&page=${page}&include_adult=false`
        );
        return res.data;
    } catch (err) {
        throw new Error(err);
    }
};
export {
    getPopular,
    getGenres,
    getMovieDetails,
    getMovieActors,
    getMovieImages,
    getUpComing,
    getActorDetails,
    getActorMovies,
    getActorImages,
    getExternalId,
    searchMovies,
    searchMoviess,
};