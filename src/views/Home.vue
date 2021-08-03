<template>
  <div class="home">
    <div class="container">
    <img alt="Dogtame logo" src="../assets/logo.png">
    </div>

<b-carousel
    id="carousel-fade"
    style="text-shadow: 0px 0px 2px #000"
    fade
    indicators
    img-width="10"
    img-height="480"
  >
    <b-carousel-slide
      caption="Dogtame"
      img-src="https://lh3.googleusercontent.com/proxy/VU9kvbVYHQXYFWBoISAtUZoYwIeFUB7H9cfzUERzWk1WNEqlSZK5GRyfTlNUoithuYD6m25dy9F7mtqatSjixIPrGAT6YshjG8QCW6kKW9k6Loqggh9LAqImqWyUwalSx3ba3MRMCpU_zjiZ5dqCaUIwoI3Khgvayha5iZ7WYQJrSv44T3j5voDc2JulQxf-w7yq7WrWFmVlvMlRCSoUpA"
    ></b-carousel-slide>
    <b-carousel-slide
      caption="Dogtame"
      img-src="https://soyfotografodeperros.com/wp-content/uploads/2019/10/Cachorros-1.jpg"
    ></b-carousel-slide>
    <b-carousel-slide
      caption="Dogtame"
      img-src="https://www.homecenter.com.co/static/landing/guiasdecompra/Guias_de_compra_2/img/cosas-que-debes-saber-antes-de-adoptar-un-conejo/conejillo.jpg"
    ></b-carousel-slide>
  </b-carousel>



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

.el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 200px;
    margin: 0;
  }

  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }

  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }

  #footer{
    background-color: #99a9bf;
  }

  .info {
    max-width: 100%; height: auto;
  }

</style>