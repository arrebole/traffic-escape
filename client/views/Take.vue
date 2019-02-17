<template>
  <div id="Take">
    <div v-if="notfound" class="take-notfound">
      <h1>没有找到任何内容</h1>
    </div>
    <div v-else class="take-content">
      <h1>累计 {{ count }} 次交易</h1>

      <div class="container-url" v-if="haveUrl">
        解析到的链接：
        <a class="content-url" v-for="(item, index) in contentUrls" :href="item" :key="index">
          {{ item }}
        </a>
  
      </div>
      <p>
        交易内容:
        <span class="take-content-core">{{ content }}</span>
      </p>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import api from "../api";
interface httpRes {
  code: number;
  message: string;
  count: number;
  content: string;
}

interface mydata {
  notfound: boolean;
  hash: string;
  code: number;
  count: number;
  message: string;
  content: string;
  contentUrls: any;
  haveUrl: boolean;
}

export default Vue.extend({
  data(): mydata {
    return {
      notfound: true,
      hash: "",
      code: 1,
      count: 0,
      message: "",
      content: "",
      contentUrls: [],
      haveUrl: false
    };
  },
  created() {
    this.hash = this.$route.params.hash;
    api.take(this.hash).then(res => {
      if (res.data.code == 1) {
        this.notfound = true;
      }
      this.refresh(res.data);
      this.analyze();
    });
  },
  methods: {
    // 更新数据
    refresh(data: httpRes) {
      this.count = data.count;
      this.content = data.content;
      this.notfound = false;
    },
    // 匹配链接
    analyze() {
      var text = this.content;
      var patt = new RegExp("(https://pan.baidu.com/s/)+.{23}", "g");
      var url = text.match(patt);
      if (url != null) {
        this.haveUrl = true;
        this.contentUrls = url;
      }
    }
  }
});
</script>
