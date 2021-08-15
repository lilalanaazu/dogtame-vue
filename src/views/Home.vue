<template>
  <div class="home">
    <div class="container">
    <img alt="Dogtame logo" src="../assets/logo.png">
  </div>

<div>
<div>
  <b-carousel
    id="carousel-fade"
    style="text-shadow: 0px 0px 2px #000"
    fade
    indicators
    img-width="900"
    img-height="480"
  >
    <b-carousel-slide
      caption="Adogtame"
      img-src="https://www.blog.perrosygatosonline.com/wp-content/uploads/2019/10/perro-y-gato.jpeg"
    ></b-carousel-slide>
    <b-carousel-slide
      caption="Adogtame"
      img-src=" https://conejos.store/wp-content/uploads/2020/03/conejo-y-gato.jpg"
    ></b-carousel-slide>
    <b-carousel-slide
      caption="Adogtame"
      img-src="https://www.purina-latam.com/sites/g/files/auxxlc391/files/styles/social_share_large/public/01_%C2%BFQu%C3%A9-puedo-hacer-si-mi-gato-est%C3%A1-triste-.png?itok=w67Nhubc"
    ></b-carousel-slide>
  </b-carousel>
</div> 
</div>


  <img   class="info" src="../assets/info.png" fluid alt="Responsive image">

  <el-footer id="footer"> </el-footer>
  


</div>
</template>

<script>

export default {
  name: 'Home',
  components: {
    
  }
}
</script>


<style scoped>


  #footer{
    background-color: #99a9bf;
  }

  .info {
    max-width: 100%; height: auto;
  }

</style>