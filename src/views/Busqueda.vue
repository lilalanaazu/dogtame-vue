<template>
    
    <div>

<b-card-group>
    <b-card title="Title" img-src="https://placekitten.com/g/300/450" img-alt="Image" img-top>
      <b-card-text>
          <div>
              {{info}}
        </div>
     This card has supporting text below as a natural lead-in to additional content.
      </b-card-text>
      <template #footer>
     
        <b-button variant="outline-secondary">Agregar a Favoritos</b-button>
      </template>
    </b-card>

    <b-card title="Title" img-src="https://placekitten.com/g/300/450" img-alt="Image" img-top>
      <b-card-text>
        This card has supporting text below as a natural lead-in to additional content.
      </b-card-text>
      <template #footer>
      
         <b-button variant="outline-secondary">Agregar a Favoritos</b-button>
      </template>
    </b-card>

    <b-card title="Title" img-src="https://placekitten.com/g/300/450" img-alt="Image" img-top>
      <b-card-text>
        This is a wider card with supporting text below as a natural lead-in to additional content.
        This card has even longer content than the first to show that equal height action.
      </b-card-text>
      <template #footer>
    
         <b-button variant="outline-secondary"> Agregar a Favoritos</b-button>
      </template>
    </b-card>


    <b-card-group>
    <b-card title="Title" img-src="https://placekitten.com/g/300/450" img-alt="Image" img-top>
      <b-card-text>
        This is a wider card with supporting text below as a natural lead-in to additional content.
        This content is a little bit longer.
      </b-card-text>
      <template #footer>
        
         <b-button variant="outline-secondary">Agregar a Favoritos</b-button>
      </template>
    </b-card>

    <b-card title="Title" img-src="https://placekitten.com/g/300/450" img-alt="Image" img-top>
      <b-card-text>
        This card has supporting text below as a natural lead-in to additional content.
      </b-card-text>
      <template #footer>
      
         <b-button variant="outline-secondary">Agregar a Favoritos</b-button>
      </template>
    </b-card>

    <b-card title="Title" img-src="https://placekitten.com/g/300/450" img-alt="Image" img-top>
      <b-card-text>
        This is a wider card with supporting text below as a natural lead-in to additional content.
        This card has even longer content than the first to show that equal height action.
      </b-card-text>
      <template #footer>
     
         <b-button variant="outline-secondary">Agregar a Favoritos</b-button>
      </template>
    </b-card>
  </b-card-group>
  </b-card-group>


    </div>

</template>

<script>
export default {
    name: "Busqueda",
    data() {
        return {
            info: null
        }
    },
    mounted() {
        axios
        .get('https://dog.ceo/api/breeds/image/random')
        .then(response => (this.info = response))
    }
    
}
</script>