<template>
  <div class="register-page">
    <div class="container">
      <div class="mb-5 text-center">
        <h1>{{ header }}</h1>
      </div>
    </div>
  </div>
</template>

<script>
import { activateUser } from '@/utils/http'

export default {
  beforeCreate () {
    this.$emit('childBusy')
  },
  created () {
    const { username } = this.$route.params
    const { token, cancel } = this.$route.query
    activateUser(username, token, cancel)
      .then(({ data: { status, user } }) => {
        console.log(status, user)
        if (status === 'cancelled') this.header = 'Thank you for helping us out'
        if (status === 'user verified') {
          this.header = 'Continue your registration here to use your account'
          this.user = user
        }
      })
      .catch(err => { console.log(err) })
      .finally(() => { this.$emit('childReady') })
  },
  data: () => ({
    user: null,
    header: 'Failed to verify user token'
  })
}
</script>

<style>

</style>
