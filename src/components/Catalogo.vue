<template>
  <div id="container">
    <sui-button @click.native="toggle">Show Modal</sui-button>
    <img src="https://i.imgur.com/mXtHADt.png" height="100px" />
    <h2 class="ui header">
      <div class="content">
        Vamos nos conhecer melhor
      </div>
      <div class="sub header etapa">{{etapa[atual_lista_index]}}</div>
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
          />
        </sui-menu>
      </sui-grid-column>
      <sui-grid-column stretched :width="12">
        <sui-segment>
          <sui-card-group :items-per-row="3">
           <sui-card v-for="filme in filmes" :key="filme.id" @click="selectMovie($event, filme)">
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
<!--    MODAL DOS FILMES RECOMENDADOS-->
    <div>
      <sui-modal v-model="open">
        <sui-modal-header>Recomendação</sui-modal-header>
        <sui-modal-content image>

          <sui-modal-description>
            <sui-header>Recomendamos para você assistir</sui-header>
            <ul>
              <li v-for="filme_recomendado in recomendados" :key="filme_recomendado.id">{{filme_recomendado.titulo}}</li>
            </ul>
          </sui-modal-description>
        </sui-modal-content>
        <sui-modal-actions>
          <sui-button positive @click.native="toggle">
            OK
          </sui-button>
        </sui-modal-actions>
      </sui-modal>
    </div>
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

class Recomendacao {
  constructor (filmesMaisLegais, filmesNormais, filmesMenosLegais) {
    this.filmesMaisLegais = filmesMaisLegais
    this.filmesNormais = filmesNormais
    this.filmesMenosLegais = filmesMenosLegais
  }
}
const conducao = [
  'Informe alguns filmes que você gosta',
  'Informe alguns filmes que não gosta tanto assim',
  'Informe alguns filmes que você não gosta',
  'Bem vindo ao FarpasFlix'
]

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
  name: 'Catalogo',
  data () {
    return {
      todos_os_filmes: [],
      filmes: [],
      items: generos,
      active: generos[0],
      selecionados: [ [], [], [] ],
      atual_lista_index: 0,
      etapa: conducao,
      name: '',
      age: 0,
      open: false,
      recomendados: []
    }
  },
  mounted () {
    this.getFilmes()

    if (localStorage.name) {
      this.name = localStorage.name
    }
    if (localStorage.age) {
      this.age = localStorage.age
    }
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
    selectMovie (event, filme) {
      this.name = filme.titulo
      let ev = event.currentTarget
      let lista = this.selecionados[this.atual_lista_index]
      // todo - quando troca o genero o filme é desmarcado sem remover da lista
      if (this.atual_lista_index < 3) {
        ev.classList.toggle('shadow')
        if (lista.length < 5) {
          if (!this.removeSelecionadosList(filme)) { // se o filme ja nao estiver na lista
            lista.push(filme.id) // todo - correcao a verificacao nao é mais por filme mas por id do filme
            if (lista.length >= 5) {
              lista.forEach(this.removeExibidosList) // remove os filmes ja selecionados da lista
              this.atual_lista_index++
            }
          }
        }
        if (this.atual_lista_index >= 3) {
          this.filmes = this.todos_os_filmes // retorna a lista ao formato original, contendo todos os filmes
          this.recomendar()
        }
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
    },
    recomendar () {
      let recomendacao = new Recomendacao(this.selecionados[0], this.selecionados[2], this.selecionados[1])
      this.recomendados = []
      axios
        .post('https://fatec-recomenda.herokuapp.com/recomendacao', recomendacao)
        .then(response => {
          console.log(response.data)
          this.recomendados = response.data.filmes
        })
      this.toggle()
    },
    removeSelecionadosList (filme) {
      let arr = this.selecionados[this.atual_lista_index]
      for (var i = 0; i < arr.length; i++) {
        if (arr[i] === filme) {
          arr.splice(i, 1)
          return true
        }
      }
      return false
    },
    removeExibidosList (filme) {
      let arr = this.filmes
      for (var i = 0; i < arr.length; i++) {
        if (arr[i] === filme) {
          arr.splice(i, 1)
          return true
        }
      }
      return false
    },
    autenticado (value) {
      this.$cookies.set('facil', 1)
      return this.$cookies.get('facil') === '1'
    },
    toggle () {
      this.open = !this.open
      console.log('ABRINDO O MODAL')
    }
  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#container {
  background-color: #e7e7e7;
}

#container{
  padding: 30px;
}

.shadow{
  filter: brightness(70%);
}

</style>
