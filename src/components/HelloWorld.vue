<template>
  <div id="container">
    <h2 class="ui header">
      <img src="https://semantic-ui.com/images/icons/plugin.png">
      <div class="content">
        Vamos nos conhecer melhor
        <div class="sub header">Informe alguns filmes que você gosta</div>
      </div>
    </h2>
    ( {{filmes.length}} ) Filmes do gênero {{active.nome}}
    <sui-grid>
      <sui-grid-column :width="4">
        <sui-menu fluid vertical tabular>
          <a
            v-for="item in items"
            :key="item.id"
            is="sui-menu-item"
            :content="item.nome"
            :active="isActive(item)"
            @click="select(item)"
            style="alignment: left !important;"
          />
        </sui-menu>
      </sui-grid-column>
      <sui-grid-column stretched :width="12">
        <sui-segment>
          <sui-card-group :items-per-row="3">
            <sui-card v-for="filme in filmes" :key="filme.id">
              <sui-image src="https://image.freepik.com/vetores-gratis/icone-de-rolo-de-filme-bobina-de-filme-carretel-de-filme-realista-ilustracao-em-fundo-branco-grafico_15115-65.jpg" />
              <sui-card-content style="height: 7em">
                <sui-card-header>{{ filme.titulo }}</sui-card-header>
                <sui-card-meta>
                  <span v-for="genero in filme.generos" :key="genero.id">{{ genero.nome }}, </span>
                </sui-card-meta>
              </sui-card-content>
            </sui-card>
          </sui-card-group>
        </sui-segment>
      </sui-grid-column>
    </sui-grid>
  </div>
</template>

<script>
import axios from 'axios'

class Genero {
  constructor (id, nome) {
    this.id = id
    this.nome = nome
  }
}

const generos = [
  new Genero(0, 'Todos os Gêneros'),
  new Genero(2, 'Action'),
  new Genero(3, 'Adventure'),
  new Genero(4, 'Horror'),
  new Genero(5, 'Romance'),
  new Genero(20, 'Musical'),
  new Genero(6, 'War'),
  new Genero(7, 'Western'),
  new Genero(8, 'Documentary'),
  new Genero(9, 'Sci-Fi'),
  new Genero(10, 'Drama'),
  new Genero(11, 'Thriller'),
  new Genero(13, 'Crime'),
  new Genero(14, 'Fantasy'),
  new Genero(15, 'Animation'),
  new Genero(16, 'IMAX'),
  new Genero(17, 'Comedy'),
  new Genero(18, 'Mystery'),
  new Genero(19, 'Children'),
  new Genero(12, '(no genres listed)'),
  new Genero(1, 'Film-Noir')
]

export default {
  name: 'HelloWorld',
  data () {
    return {
      todos_os_filmes: [],
      filmes: [],
      items: generos,
      active: generos[0]
    }
  },
  mounted () {
    this.getFilmes()
  },
  methods: {
    isActive (name) {
      return this.active === name
    },
    select (genero) {
      this.active = genero
      if (genero === generos[0]) {
        this.filmes = this.todos_os_filmes.slice()
      } else {
        this.filtrar()
      }
    },
    getFilmes () {
      axios
        .get('https://fatec-recomenda.herokuapp.com/filmes/aleatorio/200')
        .then(response => {
          this.todos_os_filmes = response.data
          this.filmes = this.todos_os_filmes.slice()
        })
    },
    filtrar () {
      this.filmes = []
      for (let i = 0; i < this.todos_os_filmes.length; i++) {
        this.filtraFilmes(this.todos_os_filmes[i])
      }
    },
    filtraFilmes (filme) {
      for (let i = 0; i < filme.generos.length; i++) {
        if (filme.generos[i].nome === this.active.nome) {
          this.filmes.push(filme)
        }
      }
    }
  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

#container{
  padding: 30px;
}
</style>
