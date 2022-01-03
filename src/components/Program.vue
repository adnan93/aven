<template>
  <div>
    <b-card
      :class="[program.reminder ? 'reminder' : 'program']"
      img-src="https://picsum.photos/600/300/?image=25"
      img-alt="Image"
      img-top
      tag="article"
      style="max-width: 10rem"
    >
      <b-card-text>
        <h5>
          {{ program.PointsNeeded }}
          امتیاز
        </h5>
        <p>{{ program.Title }}</p>
        <h5>{{ program.Description }}</h5>

      </b-card-text>

      <v-btn
        class="btnsize"
        color="#bea44d"
        elevation="5"
        rounded
        small
        @click="UserLogin()"
        :disabled="program.reminder"
      >
        افزودن 
      </v-btn>
    </b-card>
  </div>
</template>

<script>
export default {
  name: "Program",
  props: {
    program: Object,
  },
};
</script>

<style scope>
.program {
  border: 3px solid #bea44d;

  margin-bottom: 1rem;
}

.reminder {
  border: 3px solid #b8b6b0 ;

  margin-bottom: 1rem;
}

.program h3 {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>