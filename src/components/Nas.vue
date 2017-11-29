<template>
  <div class="main-container">
    <h3 class="text-center">Nas Storage</h3>

    <div class="wiki wiki-page">
      <p><strong>Guideline</strong></p>

      <p>Every employee of ASSIST has access to a storage location on a NAS device. To use this storage you can connect in various modes using login credentials from ZIMBRA email:</p>

      <p><em>surname.name<br>
        zimbra_password</em></p>

      <ol>
        <li>WEB - <a href="https://192.168.100.4:5001/webman/index.cgi">https://192.168.100.4:5001/webman/index.cgi</a> </li>
        <li>SFTP: 192.168.100.4:22</li>
        <li>WebDav: 192.168.100.4:5007</li>
        <li>afp://192.168.100.4</li>
      </ol>

      <p><strong>Folders instruction</strong></p>

      <ul>
        <li>home - your private files (50 GB), if you need more contact one let us know. </li>
        <li>ASSIST - company public documents</li>
        <li>Public - Anything else (i.e. iso files, big files that need to be shared) - everyone has r/w permissions and each action is logged. </li>
      </ul>

      <p><strong>Tips</strong></p>

      <p>Use the storage only from 192.168.100.0/24 network to achieve high transfer speed. <br>
        To connect to the NAS outside of the ASSIST you need a VPN account.</p>

    </div>
  </div>
</template>


<script>
  import Vue from 'vue';
  import Vuex from 'vuex';

  export default Vue.extend({

  });

</script>


<style>

</style>
