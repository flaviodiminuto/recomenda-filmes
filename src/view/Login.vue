<template>
  <div class="ui grid container middle aligned" style="height: 100%">
    <div class="column">
      <form class="ui form segment top attached green" action="">
        <div class="field ui left icon input fluid">
          <input type="text" name="Login" placeholder="Login">
          <i class="users icon"></i>
        </div>
        <div class="field ui left icon input fluid">
          <input type="text" name="Senha" placeholder="Senha">
          <i class="key icon"></i>
        </div>

        <button class="ui button fluid positive" type="submit">Entrar</button>
      </form>
      <div class="ui segment bottom attached">Ainda náo é cadastrado <a href="">Realizar cadastro</a>.</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Login'
}
</script>

<style scoped>

</style>
