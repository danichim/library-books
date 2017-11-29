<template>
  <footer class="footer">
    <div class="container">
      <div class="footer-social">
        <img src="../assets/logo-assist.png" alt="" width="100" style="margin-top:30px;">
      </div>
    </div>
  </footer>
</template>

<script>

  import Vue from 'vue';

  export default Vue.extend({
    components: {  }
  });
</script>

<style>
  .footer {
    height: 120px;
    color: #a4aebd;
    width: 100%;
    z-index: 1000;
    margin-top: -120px;
    position: absolute;
    bottom: 0;
    background-color: #324057;
  }

  .footer * {
    word-spacing: 0
  }

  .footer .container {
    width: 100%;
    box-sizing: border-box
  }

  .footer .footer-main {
    font-size: 0;
    padding-top: 40px;
    display: inline-block
  }

  .footer .footer-main .footer-main-title {
    line-height: 1;
    font-size: 22px;
    margin: 0
  }

  .footer .footer-main .footer-main-link {
    display: inline-block;
    margin: 12px 18px 0 0;
    line-height: 1;
    font-size: 12px;
    color: #768193
  }

  .footer .footer-main .footer-main-link a {
    color: #768193;
    text-decoration: none
  }

  .footer .footer-social {
    float: right;
    line-height: 68px;
    opacity: 0.8;
    background-color: #fff;
  }

  .footer .footer-social .elementdoc {
    transition: .3s;
    display: inline-block;
    line-height: 32px;
    text-align: center;
    color: #8d99ab;
    background-color: transparent;
    width: 32px;
    height: 32px;
    font-size: 32px;
    vertical-align: middle
  }

  .footer .footer-social .elementdoc:hover {
    transform: scale(1.2)
  }

  .footer .footer-social .doc-icon-weixin {
    margin-right: 36px
  }

  .footer .footer-social .doc-icon-weixin:hover {
    color: #fff
  }

  .footer .footer-social .doc-icon-github {
    margin-right: 0
  }

  .footer .footer-social .doc-icon-github:hover {
    color: #fff
  }

  .footer-popover {
    padding: 0;
    min-width: 120px;
    line-height: normal;
    box-shadow: 0 0 11px 0 rgba(174, 187, 211, .24)
  }

  .footer-popover .footer-popover-title {
    border-bottom: 1px solid #eaeefb;
    height: 30px;
    line-height: 30px;
    text-align: center;
    color: #99a9bf;
    background-color: #f8f9fe
  }

  .footer-popover img {
    width: 100px;
    height: 100px;
    margin: 10px
  }

  @media (max-width:768px) {
    .footer .footer-social {
      display: none
    }
  }
</style>
