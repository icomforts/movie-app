<template>
  <div class="actor">
    <router-link class="homeIcon" to="/">
      <span></span>
    </router-link>
    <div
      class="backdrop"
      v-if="posterImage"
      :style="{
        '--BG': `url(${posterImage})`,
      }"
    >
      <div class="profile">
        <div class="name">
          {{ actorDetails.name }}
        </div>
        <div class="info">
          <div class="birthday">
            <label>生日</label>
            <span>
              {{ actorDetails.birthday }}
            </span>
          </div>
          <div class="born">
            <label>出生地</label>
            <span>
              {{ actorDetails.place_of_birth }}
            </span>
          </div>
          <div class="department">
            <label>成名於</label>
            <span>
              {{ actorDetails.known_for_department }}
            </span>
          </div>
        </div>

        <div class="biography">
          <label>簡介</label>
          <span v-if="actorDetails.biography">
            {{ actorDetails.biography }}
          </span>
          <span v-else> {{ actorDetails.name }}目前沒有簡介</span>
        </div>
      </div>
      <div class="slidesArea">
        <h2>知名作品</h2>
        <div class="slides">
          <div v-for="movie in casts" :key="movie.id">
            <div v-if="movie.backdrop_path">
              <PopularItem :data="movie" />
              <div class="title">
                {{ movie.name || movie.title }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import * as API from "@/request/request";
import PopularItem from "@/components/PopularItem.vue";

export default {
  props: ["id"],
  data() {
    return {
      actorDetails: {},
      casts: [],
    };
  },
  components: { PopularItem },
  created() {},
  computed: {
    posterImage: function() {
      return `https://www.themoviedb.org/t/p/w600_and_h900_face${this.actorDetails.profile_path}`;
    },
  },

  methods: {},
  mounted() {
    API.getActorDetails(this.id).then((res) => {
      this.actorDetails = res;
      console.log(res);
    });
    API.getActorMovies(this.id).then((res) => {
      const sort = res.cast.sort(function(a, b) {
        return a.vote_average - b.vote_average;
      });
      this.casts = sort.reverse().splice(0, 15);
      console.log(this.casts);
    });

    API.getExternalId(this.id).then((res) => {
      console.log(res);
    });
  },
};
</script>
<style lang="scss" scoped>
.actor {
  position: relative;
  flex-grow: 1;
  color: honeydew;
  display: flex;

  .homeIcon {
    position: absolute;
    top: 1.5rem;
    left: 2.5rem;
    z-index: 5;
    display: flex;
    justify-content: center;
    align-items: center;
    span {
      display: block;
      width: 25px;
      height: 25px;
      border-top: 4px solid honeydew;
      border-left: 4px solid honeydew;
      transform: rotate(-45deg);
      transition: all ease-in-out 0.1s;
      border-radius: 4px;
      &::after {
        content: "";
        display: block;
        width: 4px;
        border-radius: 4px;
        transform: rotate(-45deg) translate(15px, 4px);
        height: 45px;
        transition: all ease-in-out 0.1s;
        background-color: honeydew;
        left: 0;
        top: 0;
      }
      &:hover {
        border-color: rgb(54, 54, 54);
        &::after {
          background-color: rgb(54, 54, 54);
        }
      }
    }
  }
  .backdrop {
    width: 100%;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: repeat(2, 1fr);
    width: 100%;
    overflow: hidden;
    position: relative;
    background: linear-gradient(to bottom, #3b3c3f, #4865797d, #40496373);

    z-index: 2;

    &::before,
    &::after {
      display: block;
      content: "";
      width: 100%;
      height: 100%;
      position: absolute;
    }
    &::before {
      z-index: 0;
      background: var(--BG);
      background-position: 10% 20%;
      background-size: contain;
      background-repeat: no-repeat;
      opacity: 0.5;
      mix-blend-mode: lighten;
    }
    &::after {
      z-index: 2;
      mix-blend-mode: lighten;
      background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwBAMAAAClLOS0AAAAElBMVEUAAABUUlRERkRMSkxMTkxEQkT490VOAAAAAXRSTlMAQObYZgAAAoxJREFUOI0dlImR5DAIRRXDbgaAEwCcAOAEZE/+qczTdFf1JQH/otd4SJWWf5+m7GjR28Z0TZW38pLjj1aWJl9eWaGfaCq/y4y012hPhqySnnbXe7Q6ulK6nZeV5bpjhyo9xLj7apvFSk3zSXEmtEZmNngYbhWhkmKne7XalnDrYcZMNwMlwuQuj/ezS2dJmpjEFwLe7T7zWE0zo22icr4dNZnfOLUp72rNcA8vcx3Y8r3MZpYOPSAC6mfSGRQBD1sZyFPd9b0mohN70CQTSa6+Ik15RifUaCjWq6zp2/9T697e5VsRKGUl4I4WnWpOxVAI7FoMEsrp2gLUCgH9J84B8o1Sgrb+0auEdrpocIQzU94mHBmMuliIlFemt0s8w3mUe0ssLnaecjllDunTW20d33ZxkUOoSIJbrWxZiHjdhV190e5AzjwONn4ASvTCC5CcKfywuFMBe1QpYjG0x38nJYAcR26k54o8YiXqeC7Hcth54lfwSPlHOBfOE9F0rGguJsr1V+GroafdEC+3qK2HX8Qsf0lWEwX0J29Pkh2lmFB33wKZBB8Rlhpj5AVBd6mTMYBC4cZzKNb6SygJJ3dnNIqkHnuwVgvaoCFcomyI6c+QEvxq0tKEiQCe9QoS18kaKFMl7wqEqJ2A6XkQMejE1dEcu7G/g1JRmHMOkjGIvqXHErayVgdJIIJsGBw1LzaijlFdExOIInKEOZ/oReBCsDlepSPBvRCAj/n10gfjFIml8rVSUDz2ISKeDxmFuviLVSzJOCqxtXToeJpNJr9Pnij+LQ4A/cgXDyuATWyPkrJ1En1cvPk3sB8VfMLIvwO5CKu+uC1OFNLvvoe0h97ieKNjsUkc/zQ6V/0CAoboTZwdKY4AAAAASUVORK5CYII=);
      opacity: 1;
    }
    h2 {
      font-size: 2rem;
      letter-spacing: 0.19rem;
      text-align: left;
      margin-bottom: 1rem;
    }
    .profile,
    .slidesArea {
      padding-right: 10%;
    }
    .profile {
      grid-row: 1 / 2;
      grid-column: 2 / span 3;
      display: flex;
      flex-wrap: wrap;
      z-index: 5;
      .name {
        width: 100%;
        font-size: 4rem;
        display: flex;
        justify-content: flex-start;
        align-items: flex-start;
        font-weight: bolder;
        padding-top: 1rem;
      }
      .info,
      .biography {
        width: 50%;
        display: flex;
        align-items: flex-start;
        flex-direction: column;
        > div {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          &:nth-child(2) {
            margin: 1rem 0;
          }
        }
        span {
          margin: 1rem 0;
          font-size: 1.2rem;
          text-align: justify;
          font-weight: normal;
        }
        label {
          color: rgb(129, 139, 129);
          font-size: 1.2rem;
          font-weight: bolder;
        }
      }
      .info {
        padding-right: 1rem;
      }
      .biography span {
        font-size: 1rem;
        white-space: pre-line;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 10;
        -webkit-box-orient: vertical;
        overflow: hidden;
      }
    }
    .slidesArea {
      z-index: 5;
      grid-row: 2 / 3;
      grid-column: 2 / span 3;
      display: flex;
      flex-direction: column;
      justify-content: space-evenly;

      .title {
        margin-right: 1rem;
        padding: 0 1rem;
        word-break: break-all;
        white-space: pre-line;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
      }
    }
  }
}
</style>
