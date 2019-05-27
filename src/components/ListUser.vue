<template lang="html">

  <section class="list-user">
    <h1>list-user Component</h1>
    <div>{{users}}</div>
  </section>

</template>

<script lang="js">

  export default  {
    name: 'list-user',
    props: [],
    mounted() {
      this.fetchUsers()
    },
    data() {
      return {
        users: []
      }
    },
    methods: {
      fetchUsers() {
        const baseURI = 'https://shrouded-bastion-36522.herokuapp.com/admin/user/list/all'
        this.$http.get(baseURI)
        .then((result) => {
          this.users = result.data
        })
      }
    },
    computed: {

    }
}
</script>

<style scoped lang="scss">
.list-user {
}
</style>
