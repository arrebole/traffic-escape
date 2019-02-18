<template>
  <div class="home">
    <div class="wallpaper">
      <header class="header-size black-veil"></header>
      <article class="flexCenter max-width">
        <section class="main-container">
          <h4>Black hole</h4>
          <div class="input-box">
            <input placeholder="道路千万条，安全第一条" type="text" v-model="inputText" @keyup.enter="transformer()" >
            <button class="home-btn" @click="transformer()">
              <span class="iconfont icon-fasong"></span>
            </button>
          </div>
          <div class="result">
            <p>{{ httpRes.message }}</p>
            <p>{{ httpRes.content }}</p>
          </div>
        </section>
      </article>
    </div>
  </div>
</template>


<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import api from "../api";

interface httpResult {
  code: number;
  message:string;
  content: string;
}

export default Vue.extend({
  data() {
    return {
      inputText: "",
      loading: false,
      httpRes: {
        code: 1,
        message:"",
        content: ""
      }
    };
  },

  methods: {
    transformer(): void {
      let s: string = this.inputText.trim();
      // 输入的长度为0 或 正在处理中则退出
      if (s.length == 0 || this.loading) {
        return;
      }
      this.loading = true;
      api.save(s).then(res => {
        this.changeDate(res.data);
      });
    },

    changeDate(data: httpResult) {
      this.httpRes.code = data.code;
      this.httpRes.message = data.message
      this.httpRes.content = data.content;
      this.loading = false;
    }
  }
});
</script>
