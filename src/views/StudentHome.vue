<template>
    <div class="container">
        <div class="row">
            <div class="col-3">
                <div class="row justify-center">
                    <v-avatar color="indigo" size="100">
                        <span class="white--text headline">Your avatar</span>
                    </v-avatar>
                </div>
                <div class="row justify-center mt-5 mb-5">
                    Your Name / Username
                </div>
                <div class="row justify-center">
                    <div class="col">
                        STEM Meter
                    </div>
                    <div class="col">
                        <v-progress-linear
                            :color="red"
                            height="20px"
                            rounded
                            :value="50"
                        >
                        </v-progress-linear>
                    </div>
                </div>
                <hr>
                <div class="row justify-center mt-5">
                    Achievement Badges Here
                </div>
            </div>
            <div class="col-9">
                <hr>
                <div class="row justify-center">
                    Student Display Area Here
                </div>
            </div>
        </div>
    </div>
</template>

<script>

export default {
  //
  data: () => ({
  })
}
</script>
